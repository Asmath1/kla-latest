import React, { useMemo, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FILTER_REGISTRY } from "./filterRegistry";
import { fetchConstituencies, fetchKlaList, fetchKlaSessions } from "../../services/MasterService";
import "./common.css";

const Filter = ({
  filterKeys = [],
  onFiltersChange,
  overrides = {},
  className = "row filt",
  radioClassName = "col-lg-3 col-md-3 mb2 radio-button",
  labelClassName = "heading-color ff-heading fw500 mb0",
  selectClassName = "session-select form-style1 selectM",
  multiselectClassName = "bootselect-multiselect",
  selectPickerClassName = "selectpicker",
}) => {
  const [masterOverrides, setMasterOverrides] = React.useState({});
  const [searchInputs, setSearchInputs] = useState({}); // Separate state for search inputs
  const searchTimeoutRef = useRef({}); // Store timeout IDs for debouncing

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
            const [klaList, constituencies] = await Promise.all([
              fetchKlaList().catch(() => []),
              fetchConstituencies().catch(() => []),
            ]);

            if (cancelled) return;

            const klaOptions = (klaList || []).map((k) => ({ value: k.id, label: k.languages?.[0]?.name || `KLA ${k.id}` }));
            const constituencyOptions = (constituencies || []).map((c) => ({ value: c.entitle || c.name || c.id, label: c.entitle || c.name }));

            const overridesObj = {};
            if (klaOptions.length) overridesObj.KLA = { options: klaOptions };
            if (constituencyOptions.length) overridesObj.CONSTITUENCY = { options: constituencyOptions };

            setMasterOverrides(overridesObj);
      } catch (err) {
        console.error("Failed loading master filters", err);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  

  const resolvedFilters = useMemo(() => {
    return filterKeys
      .map((key) => {
        const base = FILTER_REGISTRY[key];
        if (!base) return null;
        // apply masterOverrides first, then caller-provided overrides
        const override = { ...(masterOverrides[key] || {}), ...(overrides[key] || {}) };
        const merged = { ...base, ...override };

        if (merged.type === "select" || merged.type === "radio") {
          merged.options = (merged.options || []).map((opt) =>
            typeof opt === "string" ? { value: opt, label: opt } : opt
          );
        }
        return merged;
      })
      .filter(Boolean);
  }, [filterKeys, overrides, masterOverrides]);

  const [values, setValues] = useState(() => {
    const init = {};
    resolvedFilters.forEach((f) => {
      if (f.type === "custom") {
        init[f.key] = f.defaultValue || {};
      } else if (f.type === "select" && f.multiple) {
        init[f.key] = [];
      } else if (f.type === "select") {
        // respect provided defaultValue for single-select filters when available
        init[f.key] = f.defaultValue ?? "";
      } else if (f.type === "radio") {
        init[f.key] = f.defaultValue || (f.options?.[0]?.value ?? "");
      } else {
        init[f.key] = "";
      }
    });
    return init;
  });

  // Initialize searchInputs state for text/search fields
  useEffect(() => {
    const searchInit = {};
    let hasChanges = false;
    
    resolvedFilters.forEach((f) => {
      // Check if this is a text/search field (no type specified or type is "text")
      if (!f.type || f.type === "text" || f.key.includes("SEARCH")) {
        const currentValue = values[f.key] || "";
        // Only update if the value is different
        if (searchInputs[f.key] !== currentValue) {
          searchInit[f.key] = currentValue;
          hasChanges = true;
        }
      }
    });
    
    // Only update state if there are actual changes
    if (hasChanges && Object.keys(searchInit).length > 0) {
      setSearchInputs(prev => ({ ...prev, ...searchInit }));
    }
  }, [resolvedFilters.length]); // Only depend on the number of filters, not the values

  const prevValuesRef = useRef();
  
  useEffect(() => {
    // Only call onFiltersChange if values actually changed
    if (onFiltersChange && JSON.stringify(prevValuesRef.current) !== JSON.stringify(values)) {
      prevValuesRef.current = values;
      onFiltersChange(values);
    }
  }, [values, onFiltersChange]);

  // Update KLA value when override defaultValue changes (for controlled behavior)
  useEffect(() => {
    const klaOverride = overrides?.KLA?.defaultValue;
    if (
      klaOverride !== undefined &&
      String(klaOverride) !== String(values.KLA ?? "")
    ) {
      setValues((prev) => ({ ...prev, KLA: klaOverride }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overrides?.KLA?.defaultValue]); // Only depend on KLA override to avoid loops

  useEffect(() => {
    const sessionOverride = overrides?.SESSION_TYPE?.defaultValue;
    if (
      sessionOverride !== undefined &&
      String(sessionOverride) !== String(values.SESSION_TYPE ?? "")
    ) {
      setValues((prev) => ({ ...prev, SESSION_TYPE: sessionOverride }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overrides?.SESSION_TYPE?.defaultValue]);

  // Cleanup timeouts on unmount (not needed anymore but keeping for safety)
  useEffect(() => {
    const timeouts = searchTimeoutRef.current;
    return () => {
      Object.values(timeouts).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  // When the user changes the KLA selection, fetch sessions for that KLA
  useEffect(() => {
    let cancelled = false;
    const hasExternalSessionOptions =
      Array.isArray(overrides?.SESSION_TYPE?.options) ||
      Array.isArray(overrides?.SESSION?.options);

    // If the parent already controls session options, don't run an extra fetch/update loop here.
    if (hasExternalSessionOptions) return () => {};

    const klaValue = values?.KLA ?? overrides?.KLA?.defaultValue ?? masterOverrides?.KLA?.options?.[0]?.value;
    if (klaValue == null || klaValue === "") return () => {};

    const fetchForKla = async (klaIdRaw) => {
      try {
        // coerce numeric-like kla ids to Number because backend expects numeric kla_id
        const klaId = /^\d+$/.test(String(klaIdRaw)) ? Number(klaIdRaw) : klaIdRaw;
        console.debug("Filter: fetching sessions for kla:", klaId);
        const sessions = await fetchKlaSessions(klaId).catch(() => []);
        console.debug("Filter: fetched sessions count:", Array.isArray(sessions) ? sessions.length : 0);
        if (cancelled) return;
        const sessionOptions = (sessions || []).map((s) => {
          const value = s.session_id ?? s.session_no ?? s.id ?? s.name;
          const label = (s.session_id ?? s.session_no) != null ? String(s.session_id ?? s.session_no) : (s.name || String(s.id));
          return { value, label };
        });

        // Provide both SESSION and SESSION_TYPE so callers using either key get updated options
        setMasterOverrides((prev) => ({
          ...prev,
          SESSION: { options: sessionOptions },
          SESSION_TYPE: { options: [{ value: "", label: "All" }, ...(sessionOptions || [])] },
        }));
      } catch (err) {
        console.error("Failed loading sessions for kla", klaIdRaw, err);
      }
    };

    fetchForKla(klaValue);

    return () => {
      cancelled = true;
    };
  }, [
    values?.KLA,
    overrides?.KLA?.defaultValue,
    overrides?.SESSION?.options,
    overrides?.SESSION_TYPE?.options,
    masterOverrides?.KLA,
  ]);

  // When the KLA changes, fetch members and ministers for that KLA from the
  // kla-sessions-with-members API — but only when the caller hasn't already
  // supplied external options for MEMBER or MINISTER.
  useEffect(() => {
    let cancelled = false;

    const hasExternalMemberOptions = Array.isArray(overrides?.MEMBER?.options);
    const hasExternalMinisterOptions = Array.isArray(overrides?.MINISTER?.options);

    // Both are externally controlled — nothing to do
    if (hasExternalMemberOptions && hasExternalMinisterOptions) return () => {};

    // Skip if neither MEMBER nor MINISTER is in the current filter set
    const needsMember = filterKeys.includes("MEMBER");
    const needsMinister = filterKeys.includes("MINISTER");
    if (!needsMember && !needsMinister) return () => {};

    const klaValue = values?.KLA ?? overrides?.KLA?.defaultValue ?? masterOverrides?.KLA?.options?.[0]?.value;
    if (klaValue == null || klaValue === "") return () => {};

    const fetchMembersAndMinisters = async (klaIdRaw) => {
      try {
        const klaId = /^\d+$/.test(String(klaIdRaw)) ? Number(klaIdRaw) : klaIdRaw;
        const res = await fetch("https://api.niyamasabha.in/api/kla-sessions-with-members");
        const json = await res.json();
        if (cancelled) return;

        const allKlas = Array.isArray(json?.data) ? json.data : [];
        const klaEntry = allKlas.find((k) => Number(k.kla_id) === Number(klaId));

        const updates = {};

        if (needsMember && !hasExternalMemberOptions) {
          const rawMembers = (klaEntry?.members || [])
            .filter((m) => m.name)
            .map((m) => ({ value: m.name, label: m.name }));
          const memberMap = new Map();
          for (const opt of rawMembers) {
            if (!memberMap.has(opt.value)) memberMap.set(opt.value, opt);
          }
          const memberOptions = Array.from(memberMap.values()).sort((a, b) =>
            a.label.localeCompare(b.label)
          );
          updates.MEMBER = {
            options: [{ value: "", label: "All Members" }, ...memberOptions],
          };
        }

        if (needsMinister && !hasExternalMinisterOptions) {
          const rawMinisters = (klaEntry?.ministers || [])
            .filter((m) => m.member_name)
            .map((m) => ({ value: m.member_name, label: m.member_name }));
          const ministerMap = new Map();
          for (const opt of rawMinisters) {
            if (!ministerMap.has(opt.value)) ministerMap.set(opt.value, opt);
          }
          const ministerOptions = Array.from(ministerMap.values()).sort((a, b) =>
            a.label.localeCompare(b.label)
          );
          updates.MINISTER = {
            options: [{ value: "", label: "All Ministers" }, ...ministerOptions],
          };
        }

        if (Object.keys(updates).length) {
          setMasterOverrides((prev) => ({ ...prev, ...updates }));
        }
      } catch (err) {
        console.error("Filter: failed loading members/ministers for kla", klaIdRaw, err);
      }
    };

    fetchMembersAndMinisters(klaValue);
    return () => { cancelled = true; };
  }, [
    values?.KLA,
    overrides?.KLA?.defaultValue,
    overrides?.MEMBER?.options,
    overrides?.MINISTER?.options,
    masterOverrides?.KLA,
    filterKeys,
  ]);

  const handleChange = (filter, event) => {
    const { type, multiple, key } = filter;
    let nextValue = "";

    if (type === "select") {
      if (multiple) {
        const selected = Array.from(event.target.selectedOptions).map(
          (o) => o.value
        );
        nextValue = selected;
      } else {
        nextValue = event.target.value;
      }
      // Immediate update for select/dropdown
      setValues((prev) => ({ ...prev, [key]: nextValue }));
    } else if (type === "date") {
      nextValue = event.target.value;
      setValues((prev) => ({ ...prev, [key]: nextValue }));
    } else if (type === "radio") {
      nextValue = event.target.value;
      setValues((prev) => ({ ...prev, [key]: nextValue }));
    } else {
      // For text/search inputs - update immediately (no debouncing)
      nextValue = event.target.value;
      
      // Update both the input display and the filter value immediately
      setSearchInputs((prev) => ({ ...prev, [key]: nextValue }));
      setValues((prev) => ({ ...prev, [key]: nextValue }));
    }
  };

  const handleKeyDown = (filter, event) => {
    // Prevent form submission on Enter key
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const renderControl = (filter) => {
    if (filter.type === "custom" && filter.render) {
      return filter.render({
        value: values[filter.key],
        onChange: (val) =>
          setValues((prev) => ({ ...prev, [filter.key]: val })),
      });
    }

    const commonProps = {
      className: selectPickerClassName,
      value: values[filter.key],
    };

    if (filter.type === "select") {
      return (
        <select
          {...commonProps}
          multiple={!!filter.multiple}
          onChange={(e) => handleChange(filter, e)}
        >
          {filter.options.map((option, idx) => (
            <option key={`${filter.key}-${idx}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (filter.type === "date") {
      return (
        <input
          type="date"
          className="form-control"
          value={values[filter.key]}
          onChange={(e) => handleChange(filter, e)}
        />
      );
    }

    if (filter.type === "radio") {
      return (
        <div className="d-flex align-items-center gap-3">
          {filter.options.map((opt, idx) => (
            <label key={`${filter.key}-${idx}`} className="me-3 d-flex">
              <input
                type="radio"
                name={filter.key}
                value={opt.value}
                checked={values[filter.key] === opt.value}
                onChange={(e) => handleChange(filter, e)}
                style={{ marginRight: 6 }}
              />
              {opt.label}
            </label>
          ))}
        </div>
      );
    }

    // text/search - use searchInputs for immediate display, values for actual filtering
    const searchValue = filter.key in searchInputs ? searchInputs[filter.key] : values[filter.key];
    return (
      <div className="search_area">
        <input
          type="text"
          className="form-control"
          placeholder={filter.placeholder || "Search"}
          value={searchValue ?? ""}
          onChange={(e) => handleChange(filter, e)}
          onKeyDown={(e) => handleKeyDown(filter, e)}
        />
        <label>
          <FontAwesomeIcon icon={faSearch} />
        </label>
      </div>
    );
  };

  // Get current KLA and Session labels for display (must be before early return)
  const currentKlaLabel = useMemo(() => {
    const klaFilter = resolvedFilters.find(f => f.key === 'KLA');
    if (!klaFilter || !values.KLA) return null;
    const selectedOption = klaFilter.options?.find(opt => opt.value === values.KLA);
    return selectedOption?.label || null;
  }, [resolvedFilters, values.KLA]);

  const currentSessionLabel = useMemo(() => {
    const sessionFilter = resolvedFilters.find(f => f.key === 'SESSION_TYPE' || f.key === 'SESSION');
    if (!sessionFilter) return null;
    
    const sessionValue = values[sessionFilter.key];
    
    // If no value or empty string, return null (don't show)
    if (!sessionValue || sessionValue === '') return null;
    
    // If "All" is selected, show "All Sessions"
    if (sessionValue === 'All') return 'All Sessions';
    
    // Find the selected option to get its label
    const selectedOption = sessionFilter.options?.find(opt => String(opt.value) === String(sessionValue));
    
    // If we found the option, use its label, otherwise use the value itself
    if (selectedOption) {
      return `Session ${selectedOption.label}`;
    }
    
    // Fallback: just show the value
    return `Session ${sessionValue}`;
  }, [resolvedFilters, values]);

  if (!resolvedFilters.length) return null;

  return (
    <>
      {/* Display current filter info */}
      {/* {(currentKlaLabel || currentSessionLabel) && (
        <div className="mb-3 p-2" style={{ 
          backgroundColor: "#f8f9fa", 
          borderRadius: "4px",
          fontSize: "14px",
          color: "#666"
        }}>
          {currentKlaLabel && (
            <span className="me-3">
              <strong>KLA:</strong> {currentKlaLabel}
            </span>
          )}
          {currentSessionLabel && (
            <span>
              <strong>Session:</strong> {currentSessionLabel}
            </span>
          )}
        </div>
      )} */}
      
      <div className={className} style={{ display: "flex", flexWrap: "wrap" }}>
        {resolvedFilters.map((filter) => (
          <div
            key={filter.key}
            className={`${radioClassName} radioFlter`}
            // style={{ flex: "1 1 300px", maxWidth: "25%" }}
          >
            {filter.type === "radio" ? (
              <div className={`${selectClassName} d-flex align-items-center`}>
                <label className={`${labelClassName} me-3 mb-0`}>
                  {filter.label} :
                </label>
                <div
                  className={`${multiselectClassName} d-flex align-items-center gap-3`}
                  style={{ width: "100%" }}
                >
                  {renderControl(filter)}
                </div>
              </div>
            ) : (
              <div className={selectClassName}>
                <label className={labelClassName}>{filter.label}</label>
                <div className={multiselectClassName} style={{ width: "100%" }}>
                  {renderControl(filter)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Filter;
