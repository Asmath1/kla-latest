"use client";

import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { fetchKlaMembers } from "../../services/MemberService";
import { fetchConstituencies, fetchKlaSessions } from "../../services/MasterService";
import Select from "react-select";

// ✅ Overlay component (when sidebar is open)
const Overlay = ({ isVisible, onClick }) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
};

// ✅ Filter sidebar component
const FilterComponent = ({ isOpen, onClose, filters = {}, onSubmit, klaId = 15 }) => {
  const categoryOptions = [
    { value: "General", label: "General" },
    { value: "SC", label: "SC" },
    { value: "ST", label: "ST" },
    { value: "OBC", label: "OBC" },
    { value: "Anglo-Indian", label: "Anglo-Indian" },
  ];

  const [localFilters, setLocalFilters] = useState({
    constituency: "",
    party: "",
    qualification: "",
    terms: "",
    position: "",
    age: "",
    gender: "",
    members: "",
    category: [],
    status: "",
    startDate: "",
    endDate: "",
    sessionDate: "",
    ...filters,
  });

  // dynamic option lists derived from API
  const [options, setOptions] = useState({
    constituencies: [],
    parties: [],
    districts: [],
    genders: [],
    statuses: [],
    members: [],
    loading: false,
    error: null,
  });

  // ✅ Update local filters when parent changes
  useEffect(() => {
    setLocalFilters((prev) => ({
      constituency: "",
      party: "",
      qualification: "",
      terms: "",
      position: "",
      age: "",
      gender: "",
      members: "",
      category: [],
      status: "",
      startDate: "",
      endDate: "",
      sessionDate: "",
      ...filters,
    }));
  }, [filters]);

  // Fetch kla-members when klaId changes and derive unique option lists
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setOptions((s) => ({ ...s, loading: true, error: null }));
      try {
        const data = await fetchKlaMembers(klaId);
        if (cancelled) return;

        const constituencies = [];
        const parties = [];
        const districts = [];
        const genders = new Set();
        const statuses = new Set();
        const members = [];

        data.forEach((it) => {
          // constituency
          const cName = it?.constituency?.entitle || it?.constituency?.maltitle;
          if (cName && !constituencies.find((c) => c.value === cName)) {
            constituencies.push({ value: cName, label: cName });
          }

          // party (if present)
          const p = it?.party?.entitle || it?.member?.party || it?.party || null;
          if (p && !parties.find((party) => party.value === p)) {
            parties.push({ value: p, label: p });
          }

          // district
          const d = it?.district?.name;
          if (d && !districts.find((dist) => dist.value === d)) {
            districts.push({ value: d, label: d });
          }

          // gender (member.gender numeric -> map)
          const g = it?.member?.gender;
          if (g != null) genders.add(String(g));

          // membership reason/status
          const reason = it?.reason?.langs?.[0]?.name || it?.reason?.name;
          if (reason) statuses.add(reason);

          // members (name)
          const mName = it?.member?.langs?.[0]?.name || it?.member?.name;
          if (mName && !members.find((m) => m.value === mName)) {
            members.push({ value: mName, label: mName });
          }
        });

        const genderOptions = Array.from(genders).map((g) => {
          // map numeric codes
          if (g === "1") return { value: "1", label: "Male" };
          if (g === "2") return { value: "2", label: "Female" };
          return { value: g, label: g };
        });

        const statusOptions = Array.from(statuses).map((s) => ({ value: s, label: s }));

        setOptions({
          constituencies: constituencies.sort((a, b) => a.label.localeCompare(b.label)),
          parties: parties.sort((a, b) => a.label.localeCompare(b.label)),
          districts: districts.sort((a, b) => a.label.localeCompare(b.label)),
          genders: genderOptions,
          statuses: statusOptions.sort((a, b) => a.label.localeCompare(b.label)),
          members: members.sort((a, b) => a.label.localeCompare(b.label)),
          loading: false,
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        setOptions((s) => ({ ...s, loading: false, error: err.message || String(err) }));
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [klaId]);

  // fetch master constituencies and sessions once and use as fallback
  useEffect(() => {
    let cancelled = false;
    const loadMaster = async () => {
      try {
        const [constits, sessions] = await Promise.all([
          fetchConstituencies().catch(() => []),
          fetchKlaSessions(klaId).catch(() => []),
        ]);
        if (cancelled) return;

        // if no constituency options from kla-members, use master list
        if ((!options.constituencies || options.constituencies.length === 0) && constits.length) {
          const mapped = constits.map((c) => ({ 
            value: c.entitle || c.name || c.id, 
            label: c.entitle || c.name 
          })).sort((a, b) => a.label.localeCompare(b.label));
          setOptions((s) => ({ ...s, constituencies: mapped }));
        }

        // map sessions into sessionDate options
        if (sessions && sessions.length) {
          const sessionOptions = sessions.map((s) => ({ 
            value: s.id || s.name, 
            label: s.name || String(s.id) 
          }));
          setOptions((s) => ({ ...s, sessionDateOptions: sessionOptions }));
        }
      } catch (err) {
        console.error("Master fetch failed in member filter", err);
      }
    };

    loadMaster();
    return () => {
      cancelled = true;
    };
  }, [klaId, options.constituencies.length]);

  // ✅ Live update on dropdown change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => {
      const updated = { ...prev, [name]: value };
      onSubmit(updated); // 🔥 Trigger live filter immediately
      return updated;
    });
  };

  // ✅ Live update on category (multi-select)
  const handleChange = (selectedOptions) => {
    const updated = {
      ...localFilters,
      category: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    };
    setLocalFilters(updated);
    onSubmit(updated); // 🔥 Trigger live filter immediately
  };

  // ✅ Manual submit (Search button)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(localFilters);
  };

  // ✅ Reset filters
  const handleReset = () => {
    const emptyFilters = {
      constituency: "",
      party: "",
      qualification: "",
      terms: "",
      position: "",
      age: "",
      gender: "",
      members: "",
      category: [],
      status: "",
      startDate: "",
      endDate: "",
      sessionDate: "",
    };
    setLocalFilters(emptyFilters);
    onSubmit(emptyFilters); // 🔥 Trigger clear immediately
  };

  return (
    <>
      <Overlay isVisible={isOpen} onClick={onClose} />

      <div className={`lefttside-hidden-bar ${isOpen ? "active" : ""}`}>
        <div className="hsidebar-header bdrb1">
          <h4 className="list-title mb-0 text-white">All Filters</h4>
          <div className="sidebar-close-icon" onClick={onClose}>
            <img src="/images/cross.svg" width={20} height={20} alt="close" />
          </div>
        </div>

        <div
          className="hsidebar-content -filt"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 80px)",
            padding: "0",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* Scrollable content */}
            <div
              className="filter-scrollable-content"
              style={{
                flex: "1",
                overflowY: "auto",
                padding: "15px",
                paddingBottom: "80px",
              }}
            >
              <div className="widget-wrapper">
                <div className="sidebar-accordion">
                  <div className="accordion" id="accordionExample2">
                    {/* Constituency */}
                    <div className="form-style1 mb20 mt10">
                      <label className="heading-color ff-heading fw500 mb0">
                        Constituency
                      </label>
                      <div className="bootselect-multiselect">
                        <select
                          className="form-select"
                          name="constituency"
                          value={localFilters.constituency}
                          onChange={handleFilterChange}
                          disabled={options.loading}
                        >
                          <option value="">All Constituencies</option>
                          {options.loading ? (
                            <option value="">Loading...</option>
                          ) : options.constituencies && options.constituencies.length > 0 ? (
                            options.constituencies.map((c, idx) => (
                              <option key={`${c.value}-${idx}`} value={c.value}>{c.label}</option>
                            ))
                          ) : (
                            <option value="" disabled>No constituencies available</option>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Party */}
                    <div className="form-style1 mb20">
                      <label className="heading-color ff-heading fw500 mb0">Party</label>
                      <div className="bootselect-multiselect">
                        <select
                          className="form-select"
                          name="party"
                          value={localFilters.party}
                          onChange={handleFilterChange}
                          disabled={options.loading}
                        >
                          <option value="">All Parties</option>
                          {options.loading ? (
                            <option value="">Loading...</option>
                          ) : options.parties && options.parties.length > 0 ? (
                            options.parties.map((p, idx) => (
                              <option key={`${p.value}-${idx}`} value={p.value}>{p.label}</option>
                            ))
                          ) : (
                            <>
                              <option value="CPI">CPI</option>
                              <option value="CPI(M)">CPI(M)</option>
                              <option value="INC">INC</option>
                              <option value="BJP">BJP</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Qualification */}
                    <div className="form-style1 mb20">
                      <label className="heading-color ff-heading fw500 mb0">
                        Qualification
                      </label>
                      <div className="bootselect-multiselect">
                        <select
                          className="form-select"
                          name="qualification"
                          value={localFilters.qualification}
                          onChange={handleFilterChange}
                        >
                          <option value="">All Qualifications</option>
                          <option value="Graduate">Graduate</option>
                          <option value="Post Graduate">Post Graduate</option>
                          <option value="Doctorate">Doctorate</option>
                          <option value="Professional">Professional</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Higher Secondary">Higher Secondary</option>
                          <option value="Secondary">Secondary</option>
                        </select>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="form-style1 mb20">
                      <label className="heading-color ff-heading fw500 mb0">No. of Terms</label>
                      <div className="bootselect-multiselect">
                        <select
                          className="form-select"
                          name="terms"
                          value={localFilters.terms}
                          onChange={handleFilterChange}
                        >
                          <option value="">All Terms</option>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Position Held */}
                    <div className="form-style1 mb20">
                      <label className="heading-color ff-heading fw500 mb0">Position Held</label>
                      <div className="bootselect-multiselect">
                        <select
                          className="form-select"
                          name="position"
                          value={localFilters.position}
                          onChange={handleFilterChange}
                        >
                          <option value="">All Positions</option>
                          <option value="Minister">Minister</option>
                          <option value="Chief Minister">Chief Minister</option>
                          <option value="Speaker">Speaker</option>
                          <option value="Deputy Speaker">Deputy Speaker</option>
                          <option value="Leader of Opposition">Leader of Opposition</option>
                          <option value="Chief Whip">Chief Whip</option>
                        </select>
                      </div>
                    </div>

                    {/* Age and Gender */}
                    <div className="row">
                      <div className="col-6">
                        <div className="form-style1 mb20">
                          <label className="heading-color ff-heading fw500 mb0">Age</label>
                          <div className="bootselect-multiselect">
                            <select
                              className="form-select"
                              name="age"
                              value={localFilters.age}
                              onChange={handleFilterChange}
                            >
                              <option value="">All Ages</option>
                              <option value="20-30">20-30</option>
                              <option value="30-40">30-40</option>
                              <option value="41-50">41-50</option>
                              <option value="51-60">51-60</option>
                              <option value="61-70">61-70</option>
                              <option value="71+">71+</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-style1 mb20">
                          <label className="heading-color ff-heading fw500 mb0">Gender</label>
                          <div className="bootselect-multiselect">
                            <select
                              className="form-select"
                              name="gender"
                              value={localFilters.gender}
                              onChange={handleFilterChange}
                              disabled={options.loading}
                            >
                              <option value="">All Genders</option>
                              {options.loading ? (
                                <option value="">Loading...</option>
                              ) : options.genders && options.genders.length > 0 ? (
                                options.genders.map((g, idx) => (
                                  <option key={`${g.value}-${idx}`} value={g.value}>{g.label}</option>
                                ))
                              ) : (
                                <>
                                  <option value="1">Male</option>
                                  <option value="2">Female</option>
                                  <option value="3">Other</option>
                                </>
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Category (multi-select) */}
                    <div className="form-style1 mb20">
                      <label className="heading-color ff-heading fw500 mb0">
                        Constitutional Category
                      </label>
                      <Select
                        isMulti
                        name="category"
                        options={categoryOptions}
                        value={categoryOptions.filter((opt) =>
                          Array.isArray(localFilters.category) && localFilters.category.includes(opt.value)
                        )}
                        onChange={handleChange}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select categories..."
                        isClearable
                      />
                    </div>

                    {/* Membership Status */}
                    <div className="form-style1 mb20">
                      <label className="heading-color ff-heading fw500 mb0">Membership Status</label>
                      <div className="bootselect-multiselect">
                        <select
                          className="form-select"
                          name="status"
                          value={localFilters.status}
                          onChange={handleFilterChange}
                          disabled={options.loading}
                        >
                          <option value="">All Status</option>
                          {options.loading ? (
                            <option value="">Loading...</option>
                          ) : options.statuses && options.statuses.length > 0 ? (
                            options.statuses.map((s, idx) => (
                              <option key={`${s.value}-${idx}`} value={s.value}>{s.label}</option>
                            ))
                          ) : (
                            <>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Expired">Expired</option>
                              <option value="Resigned">Resigned</option>
                              <option value="Disqualified">Disqualified</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Bottom Buttons */}
            <div
              className="bottom_btn"
              style={{
                padding: "15px",
                borderTop: "1px solid #e5e5e5",
                backgroundColor: "#fff",
                flexShrink: "0",
              }}
            >
              <div className="row">
                <div className="col-6">
                  <button
                    type="button"
                    className="ud-btn btn-outline-secondary w-100"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
                <div className="col-6">
                  <button type="submit" className="ud-btn btn-thm w-100">
                    Search
                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="ms-2" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FilterComponent;

