import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import { fetchKlaSessions } from "../../services/MasterService";
import { DEMO_API_BASE_URL } from "../../utils/config";

const Debates = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // KLA / session filter state
  const [klaId, setKlaId] = useState(15);
  const [sessionNo, setSessionNo] = useState(null); // null = latest session

  // Sessions from API (all sessions for selected KLA)
  const [allSessions, setAllSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  // Raw data from API
  const [gleaningData, setGleaningData] = useState([]);
  const [synopsisData, setSynopsisData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected date per tab
  const [gleaningDate, setGleaningDate] = useState(null);
  const [synopsisDate, setSynopsisDate] = useState(null);

  // ── Scroll handler ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Load sessions whenever KLA changes ─────────────────────────────────────
  useEffect(() => {
    if (klaId == null) return;
    setSessionsLoading(true);
    fetchKlaSessions(klaId)
      .then((sessions) => {
        // API returns all sessions — filter to the selected KLA
        const filtered = (sessions || []).filter(
          (s) => Number(s.kla_id) === Number(klaId)
        );
        // Sort by session_no ascending so last item = latest
        filtered.sort((a, b) => Number(a.session_no) - Number(b.session_no));
        setAllSessions(filtered);
        // Reset to "latest session" when KLA changes
        setSessionNo(null);
      })
      .catch(() => setAllSessions([]))
      .finally(() => setSessionsLoading(false));
  }, [klaId]);

  // ── Derive the active session object ───────────────────────────────────────
  // null sessionNo → use the latest (last) session
  const activeSession = useMemo(() => {
    if (allSessions.length === 0) return null;
    if (sessionNo == null) return allSessions[allSessions.length - 1];
    return (
      allSessions.find((s) => Number(s.session_no) === Number(sessionNo)) ||
      allSessions[allSessions.length - 1]
    );
  }, [allSessions, sessionNo]);

  // ── Session calendar range & sitting dates from session data ───────────────
  const sessionStartDate = activeSession?.startdate || null;
  const sessionEndDate = activeSession?.enddate || null;
  const sessionSittingDates = useMemo(
    () => activeSession?.sitting_dates || [],
    [activeSession]
  );

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
    return () => {
      cancelled = true;
    };
  }, [klaId, sessionNo]);

  // ── Helpers ─────────────────────────────────────────────────────────────────

  /** Resolve the PDF URL for a given date from a data array */
  const getPdfUrlForDate = useCallback((date, data) => {
    if (!date || !Array.isArray(data) || data.length === 0) return null;

    // Normalise to YYYY-MM-DD string
    let dateStr;
    if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      dateStr = date;
    } else {
      const d = date instanceof Date ? date : new Date(date);
      dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }

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
    if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))
      return rawUrl;
    return `${DEMO_API_BASE_URL}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;
  }, []);

  // ── Auto-select the most recent sitting date that has a PDF ────────────────
  // Runs whenever session sitting dates or data changes
  useEffect(() => {
    if (!sessionSittingDates.length) return;

    // Latest sitting date first
    const sorted = [...sessionSittingDates].sort((a, b) =>
      b.localeCompare(a)
    );

    // Pick the most recent sitting date that has a matching gleaning PDF
    const bestGleaning =
      sorted.find((d) => getPdfUrlForDate(d, gleaningData)) || sorted[0];
    setGleaningDate(new Date(bestGleaning + "T00:00:00"));

    // Same for synopsis
    const bestSynopsis =
      sorted.find((d) => getPdfUrlForDate(d, synopsisData)) || sorted[0];
    setSynopsisDate(new Date(bestSynopsis + "T00:00:00"));
  }, [sessionSittingDates, gleaningData, synopsisData, getPdfUrlForDate]);

  // ── Filter handler ──────────────────────────────────────────────────────────
  const handleFiltersChange = useCallback((values) => {
    if (values?.KLA != null) {
      const raw = values.KLA;
      const n =
        typeof raw === "object" ? Number(raw.value ?? raw) : Number(raw);
      if (!Number.isNaN(n)) setKlaId(n);
    }
    if (values?.SESSION_TYPE != null) {
      const raw = values.SESSION_TYPE;
      const v = typeof raw === "object" ? raw.value : raw;
      setSessionNo(v === "" || v == null ? null : Number(v));
    }
  }, []);

  // ── Session options for Filter ──────────────────────────────────────────────
  const sessionOptions = useMemo(
    () => [
      { value: "", label: "Latest Session" },
      ...allSessions.map((s) => ({
        value: s.session_no,
        label: `Session ${s.session_no}`,
      })),
    ],
    [allSessions]
  );

  const filterOverrides = useMemo(
    () => ({
      KLA: { defaultValue: klaId },
      SESSION_TYPE: {
        defaultValue: sessionNo ?? "",
        options: sessionOptions,
      },
    }),
    [klaId, sessionNo, sessionOptions]
  );

  // ── Shared tab content renderer ─────────────────────────────────────────────
  const renderTabContent = (data, selectedDate, onDateChange) => {
    if (loading || sessionsLoading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    // Sitting dates that actually have a PDF in this tab's data
    const sittingDatesWithPdf = sessionSittingDates.filter((d) =>
      getPdfUrlForDate(d, data)
    );

    // Fall back to all session sitting dates for dots (even without PDF)
    const dotsForCalendar =
      sittingDatesWithPdf.length > 0
        ? sittingDatesWithPdf
        : sessionSittingDates;

    const calendarStart =
      sessionStartDate || (sessionSittingDates[0] ?? "2025-01-01");
    const calendarEnd =
      sessionEndDate ||
      (sessionSittingDates[sessionSittingDates.length - 1] ?? "2025-12-31");

    const activePdfUrl = getPdfUrlForDate(selectedDate, data);

    return (
      <div className="terms_condition_grid text-start">
        <Filter
          filterKeys={["KLA", "SESSION_TYPE"]}
          onFiltersChange={handleFiltersChange}
          overrides={filterOverrides}
        />
        <ExportButton />

        {/* Session info banner */}
        {activeSession && (
          <div
            className="mt-3 mb-3 p-3"
            style={{
              backgroundColor: "#f8f9fa",
              borderLeft: "4px solid var(--clr--primary)",
              borderRadius: "4px",
            }}
          >
            <h5
              className="mb-1"
              style={{ color: "var(--clr--primary)", fontWeight: "600" }}
            >
              {activeSession.kla_name || `KLA ${klaId}`} — Session{" "}
              {activeSession.session_no}
            </h5>
            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
              {activeSession.startdate?.split("-").reverse().join(" ")} to{" "}
              {activeSession.enddate?.split("-").reverse().join(" ")} &nbsp;·&nbsp;{" "}
              {sessionSittingDates.length} sitting
              {sessionSittingDates.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        <div className="session-list-buss row mt-4">
          {/* Calendar */}
          <div className="col-lg-6 col-md-6">
            {calendarStart && calendarEnd ? (
              <SessionCalendar
                selectedDate={selectedDate}
                onDateChange={onDateChange}
                startDate={calendarStart}
                endDate={calendarEnd}
                meetingDates={dotsForCalendar}
                allowedDates={dotsForCalendar}
                height="400px"
                width="100%"
                dateRangeTitle="Session date in between"
              />
            ) : (
              <div className="text-center py-4 text-muted">
                No session data available.
              </div>
            )}
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
              <InlinePdfViewer fileUrl={activePdfUrl} height="400px" />
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
                        setGleaningDate
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
                        setSynopsisDate
                      )}
                    </div>
                  ),
                },
              ]}
              onChange={() => {}}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Debates;
