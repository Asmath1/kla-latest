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

const API_URL = `${DEMO_API_BASE_URL}/api/submission-sessions`;

const Submission = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [apiSessions, setApiSessions] = useState([]);
  const [defaultFilter, setDefaultFilter] = useState({ kla_id: 15, session_id: null });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ kla_id: 15, session_id: null });
  const [selectedDate, setSelectedDate] = useState(null);
  const [activePdfUrl, setActivePdfUrl] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          setFilters({ kla_id: def.kla_id, session_id: def.session_id });
        }
      } catch (err) {
        console.error('Failed to fetch submission sessions:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchSessions();
    return () => { cancelled = true; };
  }, []);

  const activeSession = useMemo(() => {
    if (!apiSessions.length) return null;
    const found = apiSessions.find(
      (s) => s.kla_id === filters.kla_id && s.session_id === filters.session_id
    );
    if (found) return found;
    return apiSessions.find(
      (s) => s.kla_id === defaultFilter.kla_id && s.session_id === defaultFilter.session_id
    ) || apiSessions[0];
  }, [apiSessions, filters.kla_id, filters.session_id, defaultFilter]);

  const pdfsForSelectedDate = useMemo(() => {
    if (!selectedDate || !activeSession) return [];
    const d = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return (activeSession.daily_pdfs || []).filter((p) => p.date === dateStr);
  }, [selectedDate, activeSession]);

  useEffect(() => {
    if (pdfsForSelectedDate.length > 0) {
      setActivePdfUrl(pdfsForSelectedDate[0].pdf_url);
    } else {
      setActivePdfUrl(null);
    }
  }, [pdfsForSelectedDate]);

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

  const startDate = activeSession?.start_date || '';
  const endDate = activeSession?.end_date || '';
  const meetingDates = activeSession?.meeting_dates || [];
  const allowedDates = activeSession?.allowed_dates || [];
  const hasValidDates = startDate && endDate;

  return (
    <div className="wrapper ovh">
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
            { name: 'Submission', href: '/submission' },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Submission" />

            <div className="bill-content col-md-12 mt30 committeeDt">
              <Filter
                key="submission-filter"
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
                      />
                    ) : (
                      <div className="text-center py-4">No session calendar data available.</div>
                    )}
                  </div>

                  <div className="col-lg-8 col-md-7">
                    {activePdfUrl ? (
                      <InlinePdfViewer pdfUrl={activePdfUrl} />
                    ) : (
                      <div className="text-center py-5">
                        <h4>No document selected</h4>
                        <p>Select a date to load a submission document.</p>
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

export default Submission;
