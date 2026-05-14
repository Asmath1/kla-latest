import React, { useState, useEffect, useCallback, useMemo } from 'react';
import HomeTest from './Header';
import {
  Filter,
  SessionCalendar,
  InlinePdfViewer,
  CategoriesNav,
  BreadcrumbNav,
  SectionTitle,
} from './common';
import { DEMO_API_BASE_URL } from '../utils/config';

const API_URL = `${DEMO_API_BASE_URL}/api/calling-attention-sessions`;

const CallOfAttention = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // API data
  const [apiSessions, setApiSessions] = useState([]);
  const [defaultFilter, setDefaultFilter] = useState({ kla_id: 15, session_id: null });
  const [loading, setLoading] = useState(true);

  // Filter state — initialised from API default once loaded
  const [filters, setFilters] = useState({ kla_id: 15, session_id: null });

  // PDF viewer state
  const [selectedDate, setSelectedDate] = useState(null);
  const [activePdfUrl, setActivePdfUrl] = useState(null);

  // ---- Scroll ----
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---- Fetch sessions from API ----
  useEffect(() => {
    let cancelled = false;
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        if (!cancelled && json) {
          const sessions = json.sessions || [];
          const def = json.default || { kla_id: 15, session_id: null };
          setApiSessions(sessions);
          setDefaultFilter(def);
          // Initialise filters to the API default
          setFilters({ kla_id: def.kla_id, session_id: def.session_id });
        }
      } catch (err) {
        console.error('Failed to fetch calling-attention sessions:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchSessions();
    return () => { cancelled = true; };
  }, []);

  // ---- Active session ----
  const activeSession = useMemo(() => {
    if (!apiSessions.length) return null;
    const found = apiSessions.find(
      (s) => s.kla_id === filters.kla_id && s.session_id === filters.session_id
    );
    if (found) return found;
    // fallback to API default
    return apiSessions.find(
      (s) => s.kla_id === defaultFilter.kla_id && s.session_id === defaultFilter.session_id
    ) || apiSessions[0];
  }, [apiSessions, filters.kla_id, filters.session_id, defaultFilter]);

  // ---- PDFs for selected date ----
  const pdfsForSelectedDate = useMemo(() => {
    if (!selectedDate || !activeSession) return [];
    // Use local date parts to avoid UTC timezone shift (toISOString shifts back in UTC+ zones)
    const d = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return (activeSession.daily_pdfs || []).filter((p) => p.date === dateStr);
  }, [selectedDate, activeSession]);

  // Auto-select first PDF when date changes
  useEffect(() => {
    if (pdfsForSelectedDate.length > 0) {
      setActivePdfUrl(pdfsForSelectedDate[0].pdf_url);
    } else {
      setActivePdfUrl(null);
    }
  }, [pdfsForSelectedDate]);

  // ---- Filter handler ----
  const handleFilterChange = useCallback((values) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (values?.KLA != null) {
        const v = typeof values.KLA === 'object' ? values.KLA.value : values.KLA;
        next.kla_id = Number(v) || 15;
      }
      if (values?.SESSION_TYPE != null) {
        const v = typeof values.SESSION_TYPE === 'object'
          ? values.SESSION_TYPE.value
          : values.SESSION_TYPE;
        next.session_id = v === '' ? null : Number(v);
      }
      if (next.kla_id === prev.kla_id && next.session_id === prev.session_id) return prev;
      return next;
    });
    setSelectedDate(null);
    setActivePdfUrl(null);
  }, []);

  const handleDateChange = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  // ---- Session options for the selected KLA ----
  const sessionOptions = useMemo(() => {
    const sessions = apiSessions.filter((s) => s.kla_id === filters.kla_id);
    return [
      { value: '', label: 'All' },
      ...sessions.map((s) => ({
        value: s.session_id,
        label: `Session ${s.session_id}`,
      })),
    ];
  }, [apiSessions, filters.kla_id]);

  // Calendar props from active session
  const startDate = activeSession?.start_date || '';
  const endDate = activeSession?.end_date || '';
  const meetingDates = activeSession?.meeting_dates || [];
  const allowedDates = activeSession?.allowed_dates || [];

  // Don't render calendar until we have valid dates
  const hasValidDates = startDate && endDate;

  return (
    <div className="wrapper ovh">
      {/* HEADER */}
      <header
        className={`header-nav nav-homepage-style2 stricky main-menu ${
          isScrolled ? 'scrolled-nav slideInDown animated' : 'slideIn animated'
        }`}
      >
        <HomeTest />
      </header>

      <div className="body_content">
        <CategoriesNav />
        <BreadcrumbNav
          breadcrumbs={[
            { name: 'Home', href: '/' },
            { name: 'Calling Attention', href: '/calling-attention' },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Calling Attention" />

            <div className="bill-content col-md-12 mt30 committeeDt">

              {/* FILTER */}
              <Filter
                key="list-filter"
                filterKeys={['KLA', 'SESSION_TYPE']}
                onFiltersChange={handleFilterChange}
                overrides={{
                  KLA: { defaultValue: filters.kla_id },
                  SESSION_TYPE: {
                    defaultValue: filters.session_id ?? '',
                    options: sessionOptions,
                  },
                }}
              />

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="session-list-buss row mt-4">

                  {/* LEFT: Calendar + PDF list stacked */}
                  <div className="col-lg-4 col-md-5 mb-4">
                    {hasValidDates ? (
                      <SessionCalendar
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        meetingDates={meetingDates}
                        allowedDates={allowedDates}
                        width="100%"
                        showLegend={true}
                      />
                    ) : (
                      <p className="text-muted text-center py-4">
                        No session data available for the selected KLA / Session.
                      </p>
                    )}

                    {/* PDF list below calendar */}
                    <div className="mt-3">
                      {selectedDate ? (
                        pdfsForSelectedDate.length > 0 ? (
                          <div className="proceedings-list">
                            {pdfsForSelectedDate.map((entry, idx) => (
                              <div className="proceeding-item-div" key={idx}>
                                <a
                                  href="#"
                                  className={`proc d-flex align-items-center mb-2 ${
                                    activePdfUrl === entry.pdf_url ? 'active-event' : ''
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (entry.pdf_url) setActivePdfUrl(entry.pdf_url);
                                  }}
                                  style={{
                                    pointerEvents: entry.pdf_url ? 'auto' : 'none',
                                    opacity: entry.pdf_url ? 1 : 0.45,
                                  }}
                                  title={entry.pdf_url ? entry.title : 'Not available'}
                                >
                                  <span>{entry.title}</span>
                                  <div className="imgx">
                                    <img src="images/file2.svg" width={16} alt="" />
                                  </div>
                                </a>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted" style={{ fontSize: 13 }}>
                            No documents for this date.
                          </p>
                        )
                      ) : (
                        <p className="text-muted" style={{ fontSize: 13 }}>
                          Select a date on the calendar.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* RIGHT: Inline PDF Viewer */}
                  <div className="col-lg-8 col-md-7">
                    {activePdfUrl ? (
                      <InlinePdfViewer fileUrl={activePdfUrl} height="600px" />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          height: 600,
                          border: '1px dashed #ccc',
                          borderRadius: 8,
                          color: '#aaa',
                          fontSize: 14,
                        }}
                      >
                        {selectedDate
                          ? 'Select a document from the list.'
                          : 'Select a date on the calendar.'}
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CallOfAttention;
