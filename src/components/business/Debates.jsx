import React, { useState, useEffect, useCallback } from "react";
import HomeTest from "../Header";
import {
  CategoriesNav,
  BreadcrumbNav,
  SectionTitle,
  SessionCalendar,
  Filter,
  Tabs,
  ExportButton,
} from "../common";
import InlinePdfViewer from "../common/InlinePdfViwer";
import { fetchSynopsis, fetchGleaning } from "../../api/services/all.service";
import { fetchKlaList, fetchKlaSessions } from "../../services/MasterService";
import { DEMO_API_BASE_URL } from "../../utils/config";

const Debates = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("Gleanings");

  // KLA / session filter state
  const [klaId, setKlaId] = useState(15);
  const [sessionNo, setSessionNo] = useState(null);
  const [klaOptions, setKlaOptions] = useState([]);
  const [sessionOptions, setSessionOptions] = useState([]);

  // Raw data from API (re-fetched when klaId / sessionNo change)
  const [gleaningData, setGleaningData] = useState([]);
  const [synopsisData, setSynopsisData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Calendar / PDF state — separate per tab so switching tabs keeps context
  const [gleaningDate, setGleaningDate] = useState(null);
  const [synopsisDate, setSynopsisDate] = useState(null);

  // ── Scroll handler ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Load KLA list once ──────────────────────────────────────────────────────
  useEffect(() => {
    fetchKlaList()
      .then((list) => {
        const opts = (list || []).map((k) => ({
          value: k.id,
          label: k.languages?.[0]?.name || `KLA ${k.id}`,
        }));
        setKlaOptions(opts);
      })
      .catch(() => {});
  }, []);

  // ── Load sessions whenever KLA changes ─────────────────────────────────────
  useEffect(() => {
    if (klaId == null) return;
    fetchKlaSessions(klaId)
      .then((sessions) => {
        const opts = (sessions || []).map((s) => {
          const value = s.session_id ?? s.session_no ?? s.id;
          const label = String(s.session_id ?? s.session_no ?? s.name ?? s.id);
          return { value, label };
        });
        setSessionOptions(opts);
      })
      .catch(() => {});
  }, [klaId]);

  // ── Fetch Gleaning + Synopsis whenever KLA or session changes ───────────────
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const params = { kla_id: klaId };
        if (sessionNo != null) params.session_no = sessionNo;

        const [gleaningRes, synopsisRes] = await Promise.all([
          fetchGleaning(params),
          fetchSynopsis(params),
        ]);

        if (cancelled) return;

        setGleaningData(gleaningRes);
        setSynopsisData(synopsisRes);

        // Auto-select first available date for each tab
        const firstGleaningDate = getFirstDate(gleaningRes);
        if (firstGleaningDate) setGleaningDate(new Date(firstGleaningDate));

        const firstSynopsisDate = getFirstDate(synopsisRes);
        if (firstSynopsisDate) setSynopsisDate(new Date(firstSynopsisDate));
      } catch (err) {
        console.error("Error loading Debates data:", err);
        if (!cancelled) {
          setGleaningData([]);
          setSynopsisData([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [klaId, sessionNo]);

  // ── Helpers ─────────────────────────────────────────────────────────────────

  /** Return the first ISO date string found in a data array */
  const getFirstDate = (data) => {
    if (!Array.isArray(data) || data.length === 0) return null;
    const dates = data
      .map((item) => item.sitting_date || item.date || null)
      .filter(Boolean)
      .sort();
    return dates[0] || null;
  };

  /** Unique sorted sitting dates from a data array */
  const getMeetingDates = (data) =>
    [...new Set(
      (data || [])
        .map((item) => item.sitting_date || item.date || null)
        .filter(Boolean)
    )].sort();

  /** Resolve the PDF URL for a given date from a data array */
  const getPdfUrlForDate = (date, data) => {
    if (!date || !Array.isArray(data)) return null;

    // Build a local date string (YYYY-MM-DD) without timezone shift
    const d = date instanceof Date ? date : new Date(date);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

    const item = data.find(
      (i) => (i.sitting_date || i.date || "") === dateStr
    );
    if (!item) return null;

    const rawUrl =
      item.pdf_link ||
      item.pdf_url ||
      item.file_url ||
      item.file_path ||
      item.local_pdf_url ||
      null;

    if (!rawUrl) return null;
    if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) return rawUrl;
    return `${DEMO_API_BASE_URL}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;
  };

  /** Date range for SessionCalendar from a data array */
  const getDateRange = (data) => {
    const dates = getMeetingDates(data);
    if (dates.length === 0) return { startDate: "2025-07-05", endDate: "2025-08-05" };
    return { startDate: dates[0], endDate: dates[dates.length - 1] };
  };

  // ── Filter handler ──────────────────────────────────────────────────────────
  const handleFiltersChange = useCallback((values) => {
    if (values?.KLA != null) {
      const raw = values.KLA;
      const n = typeof raw === "object" ? Number(raw.value ?? raw) : Number(raw);
      if (!Number.isNaN(n)) setKlaId(n);
    }
    if (values?.SESSION_TYPE != null) {
      const raw = values.SESSION_TYPE;
      const v = typeof raw === "object" ? raw.value : raw;
      setSessionNo(v === "" || v == null ? null : Number(v));
    }
  }, []);

  // ── Tab change ──────────────────────────────────────────────────────────────
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  // ── Derived values ──────────────────────────────────────────────────────────
  const gleaningDates = getMeetingDates(gleaningData);
  const synopsisDates = getMeetingDates(synopsisData);
  const { startDate: gStart, endDate: gEnd } = getDateRange(gleaningData);
  const { startDate: sStart, endDate: sEnd } = getDateRange(synopsisData);

  const filterOverrides = {
    KLA: {
      options: klaOptions.length ? klaOptions : undefined,
      defaultValue: klaId,
    },
    SESSION_TYPE: {
      defaultValue: sessionNo ?? "",
      options: [
        { value: "", label: "All" },
        ...sessionOptions,
      ],
    },
  };

  // ── Shared tab content renderer ─────────────────────────────────────────────
  const renderTabContent = (data, selectedDate, onDateChange, meetingDates, startDate, endDate) => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="terms_condition_grid text-start">
        <Filter
          filterKeys={["KLA", "SESSION_TYPE"]}
          onFiltersChange={handleFiltersChange}
          overrides={filterOverrides}
        />
        <ExportButton />

        <div className="session-list-buss row mt-4">
          {/* Calendar */}
          <div className="col-lg-6 col-md-6">
            <SessionCalendar
              selectedDate={selectedDate}
              onDateChange={onDateChange}
              startDate={startDate}
              endDate={endDate}
              meetingDates={meetingDates}
              allowedDates={meetingDates}
              height="400px"
              width="100%"
            />
          </div>

          {/* PDF Viewer */}
          <div className="col-lg-6 col-md-6">
            {data.length === 0 ? (
              <div
                className="d-flex justify-content-center align-items-center border rounded"
                style={{ height: "400px" }}
              >
                <p className="text-muted mb-0">
                  No data available for the selected KLA / Session.
                </p>
              </div>
            ) : (
              <InlinePdfViewer
                fileUrl={getPdfUrlForDate(selectedDate, data)}
                height="400px"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="wrapper ovh">
      <header
        className={`header-nav nav-homepage-style2 stricky main-menu ${
          isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
        }`}
      >
        <HomeTest />
      </header>

      <div className="body_content">
        <CategoriesNav />
        <BreadcrumbNav
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Business", href: "/session-schedule" },
            { name: "Debates", href: "/debates" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Debates" />

            <Tabs
              tabs={[
                {
                  key: "Gleanings",
                  label: "Gleanings",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      {renderTabContent(
                        gleaningData,
                        gleaningDate,
                        setGleaningDate,
                        gleaningDates,
                        gStart,
                        gEnd
                      )}
                    </div>
                  ),
                },
                {
                  key: "Synopsis",
                  label: "Synopsis",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      {renderTabContent(
                        synopsisData,
                        synopsisDate,
                        setSynopsisDate,
                        synopsisDates,
                        sStart,
                        sEnd
                      )}
                    </div>
                  ),
                },
              ]}
              onChange={handleTabChange}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Debates;
