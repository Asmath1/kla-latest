import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import HomeTest from "./Header";
import {
  BreadcrumbNav,
  CategoriesNav,
  SectionTitle,
  Filter,
  ExportButton,
  Pagination,
  SessionCalendar,
  PdfViewerModal,
} from "./common";
import { fetchBudgetExcessDemands } from "../services/MasterService";

const MembersModal = ({ members, onClose }) => (
  <Modal show onHide={onClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Members</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
      <table className="table table-bordered table-hover myTable2 mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Constituency</th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members.map((m, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{m.name}</td>
                <td>{m.constituency || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center text-muted py-3">
                No members listed.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>Close</Button>
    </Modal.Footer>
  </Modal>
);

const MinistersModal = ({ ministers, onClose }) => (
  <Modal show onHide={onClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Minister Details</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
      <table className="table table-bordered table-hover myTable2 mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Portfolio</th>
            <th>Constituency</th>
            <th>Party</th>
          </tr>
        </thead>
        <tbody>
          {ministers.length > 0 ? (
            ministers.map((m, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{m.name}</td>
                <td>{m.portfolio || "-"}</td>
                <td>{m.constituency || "-"}</td>
                <td>{m.party || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted py-3">
                No ministers listed.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>Close</Button>
    </Modal.Footer>
  </Modal>
);

const ExcessDemands = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [allRows, setAllRows] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionStartDate, setSessionStartDate] = useState(null);
  const [sessionEndDate, setSessionEndDate] = useState(null);
  const [meetingDates, setMeetingDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [klaId, setKlaId] = useState(15);
  const [sessionNo, setSessionNo] = useState(null);
  const [eventFilter, setEventFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [memberFilter, setMemberFilter] = useState("");
  const [ministerFilter, setMinisterFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [membersModal, setMembersModal] = useState(null);
  const [ministersModal, setMinistersModal] = useState(null);
  const [pdfModal, setPdfModal] = useState({ show: false, url: null, title: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchBudgetExcessDemands()
      .then(({ rows, sessions: sess, defaultSelection }) => {
        setAllRows(rows);
        setSessions(sess);
        if (defaultSelection?.kla_id) setKlaId(defaultSelection.kla_id);
        if (defaultSelection?.session_id) setSessionNo(defaultSelection.session_id);
      })
      .catch((err) => {
        console.error("Failed to load budget excess demands:", err);
        setError("Failed to load data. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!sessions.length) return;
    const matchedSession = sessions.find(
      (s) =>
        Number(s.kla_id) === Number(klaId) &&
        (sessionNo == null || Number(s.session_id) === Number(sessionNo))
    );
    if (matchedSession) {
      setSessionStartDate(matchedSession.start_date || null);
      setSessionEndDate(matchedSession.end_date || null);
      setMeetingDates(matchedSession.meeting_dates || []);
    } else {
      const klaSessionsForKla = sessions.filter((s) => Number(s.kla_id) === Number(klaId));
      if (klaSessionsForKla.length) {
        const dates = klaSessionsForKla.flatMap((s) => s.meeting_dates || []);
        setMeetingDates(dates);
        setSessionStartDate(klaSessionsForKla[0]?.start_date || null);
        setSessionEndDate(klaSessionsForKla[klaSessionsForKla.length - 1]?.end_date || null);
      } else {
        setMeetingDates([]);
        setSessionStartDate(null);
        setSessionEndDate(null);
      }
    }
  }, [klaId, sessionNo, sessions]);

  const handleFiltersChange = (values) => {
    if (values?.KLA != null) {
      const n = Number(typeof values.KLA === "object" ? values.KLA.value ?? values.KLA : values.KLA);
      if (!Number.isNaN(n)) { setKlaId(n); setSessionNo(null); }
    }
    if (values?.SESSION_TYPE != null) {
      const v = typeof values.SESSION_TYPE === "object" ? values.SESSION_TYPE.value : values.SESSION_TYPE;
      setSessionNo(v === "" || v === "All" ? null : Number(v));
    }
    if (values?.MEMBER != null) setMemberFilter(typeof values.MEMBER === "object" ? values.MEMBER.value ?? "" : values.MEMBER);
    if (values?.MINISTER != null) setMinisterFilter(typeof values.MINISTER === "object" ? values.MINISTER.value ?? "" : values.MINISTER);
    if (values?.EVENT != null) setEventFilter(typeof values.EVENT === "object" ? values.EVENT.value ?? "" : values.EVENT);
    if (values?.SUBJECT != null) setSubjectFilter(typeof values.SUBJECT === "object" ? values.SUBJECT.value ?? "" : values.SUBJECT);
    if (values?.DATE_FROM != null) setDateFrom(values.DATE_FROM);
    if (values?.DATE_TO != null) setDateTo(values.DATE_TO);
    if (values?.SEARCH != null) setSearchText(values.SEARCH);
  };

  const rowsForKla = useMemo(() => allRows.filter((r) => Number(r.kla_id) === Number(klaId)), [allRows, klaId]);

  const sessionOptions = useMemo(() => {
    const ids = [...new Set(rowsForKla.map((r) => r.session))].sort((a, b) => a - b);
    return [{ value: "", label: "All" }, ...ids.map((id) => ({ value: id, label: String(id) }))];
  }, [rowsForKla]);

  const eventOptions = useMemo(() => {
    const events = [...new Set(rowsForKla.map((r) => r.event).filter(Boolean))];
    return [{ value: "", label: "-Select Event-" }, ...events.map((e) => ({ value: e, label: e }))];
  }, [rowsForKla]);

  const subjectOptions = useMemo(() => {
    const subjects = [...new Set(rowsForKla.map((r) => r.subject_en).filter(Boolean))];
    return [{ value: "", label: "-Select Subject-" }, ...subjects.map((s) => ({ value: s, label: s }))];
  }, [rowsForKla]);

  const memberOptions = useMemo(() => {
    const names = [...new Set(rowsForKla.flatMap((r) => r.members.map((m) => m.name)).filter(Boolean))].sort();
    return [{ value: "", label: "All Members" }, ...names.map((n) => ({ value: n, label: n }))];
  }, [rowsForKla]);

  const ministerOptions = useMemo(() => {
    const names = [...new Set(rowsForKla.flatMap((r) => r.ministers.map((m) => m.name)).filter(Boolean))].sort();
    return [{ value: "", label: "All Ministers" }, ...names.map((n) => ({ value: n, label: n }))];
  }, [rowsForKla]);

  const filteredRows = useMemo(() => {
    return rowsForKla.filter((row) => {
      if (sessionNo != null && Number(row.session) !== Number(sessionNo)) return false;
      if (eventFilter && row.event !== eventFilter) return false;
      if (subjectFilter && row.subject_en !== subjectFilter) return false;
      if (memberFilter && !row.members.some((m) => m.name.toLowerCase().includes(memberFilter.toLowerCase()))) return false;
      if (ministerFilter && !row.ministers.some((m) => m.name.toLowerCase().includes(ministerFilter.toLowerCase()))) return false;
      if (dateFrom && row.isoDate && row.isoDate < dateFrom) return false;
      if (dateTo && row.isoDate && row.isoDate > dateTo) return false;
      if (searchText) {
        const q = searchText.toLowerCase();
        if (!row.subject_en.toLowerCase().includes(q) && !row.subject_ml.toLowerCase().includes(q) && !row.event.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [rowsForKla, sessionNo, eventFilter, subjectFilter, memberFilter, ministerFilter, dateFrom, dateTo, searchText]);

  useEffect(() => { setCurrentPage(1); }, [klaId, sessionNo, eventFilter, subjectFilter, memberFilter, ministerFilter, dateFrom, dateTo, searchText]);

  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
  const pagedRows = filteredRows.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const openPdf = (url, title) => setPdfModal({ show: true, url, title });

  return (
    <div className="wrapper ovh">
      <header className={`header-nav nav-homepage-style2 stricky main-menu ${isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"}`}>
        <HomeTest />
      </header>
      <div className="body_content">
        <CategoriesNav />
        <BreadcrumbNav breadcrumbs={[{ name: "Home", href: "/" }, { name: "Business", href: "/business" }, { name: "Budget Excess Demands", href: "/budget-excess-demands" }]} />
        <section className="Bussiness-schedule quest pt20 pb-30 pb30-md represent">
          <div className="container">
            <SectionTitle title="Budget Excess Demands" />
            <div className="bill-content col-md-12 mt30 committeeDt">
              <div className="terms_condition_grid text-start mb-40">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="tab-title mb-2"><h6>Search By Filter</h6></div>
                    <Filter
                      filterKeys={["KLA","SESSION_TYPE","EVENT","SUBJECT","MEMBER","MINISTER","DATE_FROM","DATE_TO","SEARCH"]}
                      onFiltersChange={handleFiltersChange}
                      overrides={{
                        KLA: { defaultValue: klaId },
                        SESSION_TYPE: { defaultValue: sessionNo ?? "", options: sessionOptions },
                        EVENT: { options: eventOptions },
                        SUBJECT: { options: subjectOptions },
                        MEMBER: { options: memberOptions },
                        MINISTER: { options: ministerOptions },
                        DATE_FROM: { label: "From Date" },
                        DATE_TO: { label: "To Date" },
                      }}
                    />
                    <div className="d-flex align-items-center justify-content-between mt-3 mb-2 flex-wrap gap-2">
                      <ExportButton />
                      <span className="text-muted" style={{ fontSize: 13 }}>
                        Total record/s found: <strong style={{ color: "var(--clr--primary)" }}>{filteredRows.length}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4 section-calendar mb20">
                    <SessionCalendar
                      selectedDate={selectedDate}
                      onDateChange={setSelectedDate}
                      startDate={sessionStartDate}
                      endDate={sessionEndDate}
                      meetingDates={meetingDates}
                      width="100%"
                    />
                  </div>
                </div>
                {loading ? (
                  <div className="text-center py-5"><div className="spinner-border text-primary" role="status" /><p className="mt-2 text-muted">Loading data…</p></div>
                ) : error ? (
                  <div className="alert alert-danger mt-3">{error}</div>
                ) : (
                  <div className="table-responsive mt-2">
                    <table className="table myTable2">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Assembly</th>
                          <th>Session</th>
                          <th>Event</th>
                          <th>Subject</th>
                          <th className="text-center">PDF</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pagedRows.length > 0 ? (
                          pagedRows.map((row) => (
                            <tr key={row.id}>
                              <td style={{ whiteSpace: "nowrap" }}>{row.date}</td>
                              <td>{row.assembly}</td>
                              <td className="text-center">{row.session}</td>
                              <td>{row.event}</td>
                              <td>
                                <div>{row.subject_en}</div>
                                {row.subject_ml && (
                                  <div className="text-muted mt-1" style={{ fontSize: "0.85em", fontFamily: "'Noto Sans Malayalam', sans-serif" }}>{row.subject_ml}</div>
                                )}
                              </td>
                              <td className="text-center">
                                <button
                                  title="View PDF"
                                  disabled={!row.pdf_url}
                                  onClick={() => row.pdf_url && openPdf(row.pdf_url, row.subject_en || "Document")}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    border: "2px solid var(--clr--primary)",
                                    background: row.pdf_url ? "var(--clr--primary)" : "#e0e0e0",
                                    color: row.pdf_url ? "#fff" : "#aaa",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    cursor: row.pdf_url ? "pointer" : "not-allowed",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 0,
                                    lineHeight: "normal",
                                  }}
                                >PDF</button>
                              </td>
                              <td className="text-center">
                                <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                                  <button className="btn btn-sm" style={{ background: "var(--clr--violet)", color: "var(--clr--primary)", border: "1px solid var(--clr--primary)", fontWeight: 500 }} onClick={() => setMembersModal(row)}>Members</button>
                                  <button className="btn btn-sm" style={{ background: "var(--clr--violet)", color: "var(--clr--primary)", border: "1px solid var(--clr--primary)", fontWeight: 500 }} onClick={() => setMinistersModal(row)}>Minister</button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan={7} className="text-center py-4 text-muted">No records found for the selected filters.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                {!loading && totalPages > 1 && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} totalItems={filteredRows.length} />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <PdfViewerModal show={pdfModal.show} onHide={() => setPdfModal({ show: false, url: null, title: "" })} fileUrl={pdfModal.url} title={pdfModal.title} />
      {membersModal && <MembersModal members={membersModal.members} onClose={() => setMembersModal(null)} />}
      {ministersModal && <MinistersModal ministers={ministersModal.ministers} onClose={() => setMinistersModal(null)} />}
    </div>
  );
};

export default ExcessDemands;
