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
import { fetchKlaList, fetchKlaSessions } from "../services/MasterService";
import { API_ENDPOINTS } from "../utils/config";

// ---------------------------------------------------------------------------
// Dummy data – replace with real API calls when the endpoint is available
// ---------------------------------------------------------------------------
const DUMMY_PDF =
  "https://www.niyamasabha.nic.in/images//15th-KLA-committee-report/LFAC44.pdf";

const DUMMY_ROWS = [
  {
    id: 1,
    date: "10-06-2021",
    assembly: "KLA - 15 (2021-2026)",
    session: 1,
    event: "General Demands",
    subject: "Statement of Demands 2021-22 - General",
    pdf_url_english: DUMMY_PDF,
    pdf_url_malayalam: DUMMY_PDF,
    members: [
      { name: "ശ്രീ. കെ.എൻ. ഉണ്ണിക്കൃഷ്ണൻ", constituency: "Thiruvananthapuram" },
      { name: "ശ്രീ. വി. ജോയി", constituency: "Kollam" },
    ],
    minister: {
      name: "ശ്രീ. കെ.എൻ. ബാലഗോപാൽ",
      portfolio: "Finance",
      photo: null,
      constituency: "Malampuzha",
      party: "CPI(M)",
    },
  },
  {
    id: 2,
    date: "22-08-2021",
    assembly: "KLA - 15 (2021-2026)",
    session: 1,
    event: "Supplementary Demands",
    subject: "Supplementary Statement of Demands 2021-22",
    pdf_url_english: DUMMY_PDF,
    pdf_url_malayalam: DUMMY_PDF,
    members: [
      { name: "ശ്രീ. എം. കെ. മുനീർ", constituency: "Kondotty" },
      { name: "ശ്രീ. പി. ടി. തോമസ്", constituency: "Thrikkakara" },
      { name: "ശ്രീ. പി. മമ്മിക്കുട്ടി", constituency: "Malappuram" },
    ],
    minister: {
      name: "ശ്രീ. കെ.എൻ. ബാലഗോപാൽ",
      portfolio: "Finance",
      photo: null,
      constituency: "Malampuzha",
      party: "CPI(M)",
    },
  },
  {
    id: 3,
    date: "15-03-2022",
    assembly: "KLA - 15 (2021-2026)",
    session: 2,
    event: "General Demands",
    subject: "Statement of Demands 2022-23 - General",
    pdf_url_english: DUMMY_PDF,
    pdf_url_malayalam: DUMMY_PDF,
    members: [
      { name: "ശ്രീ. എൻ. കെ. അക്ബർ", constituency: "Aluva" },
      { name: "ശ്രീ. കെ. ജെ. മാക്സി", constituency: "Kottayam" },
    ],
    minister: {
      name: "ശ്രീ. കെ.എൻ. ബാലഗോപാൽ",
      portfolio: "Finance",
      photo: null,
      constituency: "Malampuzha",
      party: "CPI(M)",
    },
  },
  {
    id: 4,
    date: "10-09-2022",
    assembly: "KLA - 15 (2021-2026)",
    session: 3,
    event: "Excess Demands",
    subject: "Excess Statement of Demands 2022-23",
    pdf_url_english: DUMMY_PDF,
    pdf_url_malayalam: null,
    members: [
      { name: "ശ്രീ. ആർ. രാജേഷ്", constituency: "Ernakulam" },
    ],
    minister: {
      name: "ശ്രീ. കെ.എൻ. ബാലഗോപാൽ",
      portfolio: "Finance",
      photo: null,
      constituency: "Malampuzha",
      party: "CPI(M)",
    },
  },
  {
    id: 5,
    date: "20-02-2023",
    assembly: "KLA - 15 (2021-2026)",
    session: 4,
    event: "General Demands",
    subject: "Statement of Demands 2023-24 - General",
    pdf_url_english: DUMMY_PDF,
    pdf_url_malayalam: DUMMY_PDF,
    members: [
      { name: "ശ്രീ. പി. കെ. കുഞ്ഞാലിക്കുട്ടി", constituency: "Vengara" },
      { name: "ശ്രീ. എസ്. ശർമ്മ", constituency: "Palakkad" },
    ],
    minister: {
      name: "ശ്രീ. കെ.എൻ. ബാലഗോപാൽ",
      portfolio: "Finance",
      photo: null,
      constituency: "Malampuzha",
      party: "CPI(M)",
    },
  },
];

// ---------------------------------------------------------------------------
// Members modal — full list
// ---------------------------------------------------------------------------
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
          {members.map((m, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{m.name}</td>
              <td>{m.constituency || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

// ---------------------------------------------------------------------------
// Ministers modal — full list
// ---------------------------------------------------------------------------
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
          {ministers.map((m, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{m.name}</td>
              <td>{m.portfolio || "-"}</td>
              <td>{m.constituency || "-"}</td>
              <td>{m.party || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
const StatementDemands = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [klaId, setKlaId] = useState(15);
  const [sessionNo, setSessionNo] = useState(null);
  const [eventFilter, setEventFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [memberFilter, setMemberFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [klaOptions, setKlaOptions] = useState([]);
  const [sessionOptions, setSessionOptions] = useState([]);

  // Calendar state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessionStartDate, setSessionStartDate] = useState(null);
  const [sessionEndDate, setSessionEndDate] = useState(null);
  const [meetingDates, setMeetingDates] = useState([]);
  const [allowedActiveDates, setAllowedActiveDates] = useState([]);

  // Modal state
  const [membersModal, setMembersModal] = useState(null);
  const [ministersModal, setMinistersModal] = useState(null);
  const [pdfModal, setPdfModal] = useState({ show: false, url: null, title: "" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load KLA list
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

  // Load sessions when KLA changes
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

  // Filter handler
  const handleFiltersChange = (values) => {
    if (values?.KLA != null) {
      const raw = values.KLA;
      const n =
        typeof raw === "object" ? Number(raw.value ?? raw) : Number(raw);
      if (!Number.isNaN(n)) setKlaId(n);
    }
    if (values?.SESSION_TYPE != null) {
      const raw = values.SESSION_TYPE;
      const v = typeof raw === "object" ? raw.value : raw;
      setSessionNo(v === "" ? null : Number(v));
    }
    if (values?.MEMBER != null) {
      setMemberFilter(
        typeof values.MEMBER === "object"
          ? values.MEMBER.value ?? ""
          : values.MEMBER
      );
    }
    if (values?.SEARCH != null) setSearchText(values.SEARCH);
    if (values?.DATE_FROM != null) setDateFrom(values.DATE_FROM);
    if (values?.DATE_TO != null) setDateTo(values.DATE_TO);
    if (values?.EVENT != null) {
      setEventFilter(
        typeof values.EVENT === "object"
          ? values.EVENT.value ?? ""
          : values.EVENT
      );
    }
    if (values?.SUBJECT != null) {
      setSubjectFilter(
        typeof values.SUBJECT === "object"
          ? values.SUBJECT.value ?? ""
          : values.SUBJECT
      );
    }
  };

  // Fetch session date range + sitting days for the calendar
  useEffect(() => {
    const fetchSessionDates = async () => {
      if (!klaId || !sessionNo || sessionNo === "All") {
        setSessionStartDate("1957-04-01");
        setSessionEndDate(new Date().toISOString().split("T")[0]);
        setMeetingDates([]);
        setAllowedActiveDates([]);
        return;
      }
      try {
        const response = await fetch(API_ENDPOINTS.KLA_SESSIONS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ kla_id: klaId }),
        });
        const result = await response.json();
        const sessions = result.data || [];
        const matchedSession = sessions.find(
          (s) =>
            Number(s.session_no) === Number(sessionNo) ||
            Number(s.session_id) === Number(sessionNo)
        );
        if (!matchedSession) {
          setSessionStartDate(null);
          setSessionEndDate(null);
          setAllowedActiveDates([]);
          setMeetingDates([]);
          return;
        }
        setSessionStartDate(
          matchedSession.startdate || matchedSession.start_date
        );
        setSessionEndDate(matchedSession.enddate || matchedSession.end_date);
        setAllowedActiveDates(
          Array.isArray(matchedSession.allowed_dates)
            ? matchedSession.allowed_dates
            : []
        );
        const selectedKlaId = matchedSession.kla_id || klaId;
        const selectedSessionNo = matchedSession.session_no;

        const sittingResponse = await fetch(API_ENDPOINTS.SESSION_SITTING_DAYS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const sittingResult = await sittingResponse.json();
        const sittingData = sittingResult?.data || [];
        const matchedKla = sittingData.find(
          (item) => Number(item.kla_id) === Number(selectedKlaId)
        );
        const matchedSittingSession =
          matchedKla && Array.isArray(matchedKla.sessions)
            ? matchedKla.sessions.find(
                (s) => Number(s.session_no) === Number(selectedSessionNo)
              )
            : null;
        const meetingDatesFromAPI =
          matchedSittingSession &&
          Array.isArray(matchedSittingSession.sitting_days)
            ? matchedSittingSession.sitting_days
                .map((sd) => sd.sitting_date)
                .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
            : [];
        setMeetingDates(meetingDatesFromAPI);
      } catch (error) {
        console.error("Failed to fetch session data:", error);
        setSessionStartDate(null);
        setSessionEndDate(null);
        setAllowedActiveDates([]);
        setMeetingDates([]);
      }
    };
    fetchSessionDates();
  }, [klaId, sessionNo]);

  const handleDateChange = (date) => setSelectedDate(date);

  // Derive unique subject options from data
  const subjectOptions = useMemo(() => {
    const subjects = [...new Set(DUMMY_ROWS.map((r) => r.subject))];
    return [
      { value: "", label: "-Select Subject-" },
      ...subjects.map((s) => ({ value: s, label: s })),
    ];
  }, []);

  // Client-side filtering
  const filteredRows = useMemo(() => {
    return DUMMY_ROWS.filter((row) => {
      if (eventFilter && row.event !== eventFilter) return false;
      if (subjectFilter && row.subject !== subjectFilter) return false;
      if (sessionNo != null && row.session !== sessionNo) return false;
      if (memberFilter) {
        const hasMember = row.members.some((m) =>
          m.name.toLowerCase().includes(memberFilter.toLowerCase())
        );
        if (!hasMember) return false;
      }
      if (dateFrom) {
        const [d, mo, y] = row.date.split("-");
        const rowIso = `${y}-${mo}-${d}`;
        if (rowIso < dateFrom) return false;
      }
      if (dateTo) {
        const [d, mo, y] = row.date.split("-");
        const rowIso = `${y}-${mo}-${d}`;
        if (rowIso > dateTo) return false;
      }
      if (searchText) {
        const q = searchText.toLowerCase();
        if (
          !row.subject.toLowerCase().includes(q) &&
          !row.event.toLowerCase().includes(q) &&
          !row.assembly.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [eventFilter, subjectFilter, sessionNo, memberFilter, dateFrom, dateTo, searchText]);

  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
  const pagedRows = filteredRows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openPdf = (url, title) => setPdfModal({ show: true, url, title });

  return (
    <div className="wrapper ovh">
      {/* ---- HEADER ---- */}
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
            { name: "Business", href: "/business" },
            { name: "Statement of Demands", href: "/statement-demands" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Statement of Demands" />

            <div className="bill-content col-md-12 mt30 committeeDt">
              <div className="terms_condition_grid text-start mb-40">

                {/* ---- FILTER + CALENDAR ROW ---- */}
                <div className="row">
                  {/* Left: filters */}
                  <div className="col-lg-8">
                    <div className="tab-title mb-2">
                      <h6>Search By Filter</h6>
                    </div>

                    <Filter
                      filterKeys={[
                        "KLA",
                        "SESSION_TYPE",
                        "MEMBER",
                        "EVENT",
                        "SUBJECT",
                        "DATE_FROM",
                        "DATE_TO",
                        "SEARCH",
                      ]}
                      onFiltersChange={handleFiltersChange}
                      overrides={{
                        KLA: {
                          options: klaOptions.length ? klaOptions : undefined,
                          defaultValue: klaId,
                        },
                        SESSION_TYPE: {
                          defaultValue: "",
                          options: [
                            { value: "", label: "All" },
                            ...sessionOptions,
                          ],
                        },
                        SUBJECT: {
                          options: subjectOptions,
                        },
                        DATE_FROM: {
                          label: "From Date",
                        },
                        DATE_TO: {
                          label: "To Date",
                        },
                      }}
                    />

                    <div className="d-flex align-items-center justify-content-between mt-3 mb-2 flex-wrap gap-2">
                      <ExportButton />
                      <span className="text-muted" style={{ fontSize: 13 }}>
                        Total record/s found:{" "}
                        <strong style={{ color: "var(--clr--primary)" }}>
                          {filteredRows.length}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Right: calendar */}
                  <div className="col-lg-4 section-calendar mb20">
                    <SessionCalendar
                      selectedDate={selectedDate}
                      onDateChange={handleDateChange}
                      startDate={sessionStartDate}
                      endDate={sessionEndDate}
                      meetingDates={meetingDates}
                      allowedDates={allowedActiveDates}
                      width="100%"
                    />
                  </div>
                </div>

                {/* ---- TABLE ---- */}
                <div className="table-responsive mt-2">
                  <table className="table myTable2">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Assembly</th>
                        <th>Session</th>
                        <th>Event</th>
                        <th>Subject</th>
                        <th className="text-center">View</th>
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
                            <td>{row.subject}</td>

                            {/* View — E (English) and മ (Malayalam) circular buttons */}
                            <td className="text-center">
                              <div className="d-flex align-items-center justify-content-center gap-2">
                                {/* English PDF */}
                                <button
                                  title="View English PDF"
                                  onClick={() => row.pdf_url_english && openPdf(row.pdf_url_english, `${row.subject} (English)`)}
                                  disabled={!row.pdf_url_english}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    border: "2px solid var(--clr--primary)",
                                    background: row.pdf_url_english ? "var(--clr--primary)" : "#e0e0e0",
                                    color: row.pdf_url_english ? "#fff" : "#aaa",
                                    fontWeight: 600,
                                    fontSize: 16,
                                    cursor: row.pdf_url_english ? "pointer" : "not-allowed",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    padding: 0,
                                    lineHeight: "normal",
                                  }}
                                >
                                  E
                                </button>

                                {/* Malayalam PDF */}
                                <button
                                  title="View Malayalam PDF"
                                  onClick={() => row.pdf_url_malayalam && openPdf(row.pdf_url_malayalam, `${row.subject} (Malayalam)`)}
                                  disabled={!row.pdf_url_malayalam}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    border: "2px solid var(--clr--primary)",
                                    background: row.pdf_url_malayalam ? "var(--clr--primary)" : "#e0e0e0",
                                    color: row.pdf_url_malayalam ? "#fff" : "#aaa",
                                    fontWeight: 600,
                                    fontSize: 16,
                                    cursor: row.pdf_url_malayalam ? "pointer" : "not-allowed",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    padding: 0,
                                    lineHeight: "normal",
                                    fontFamily: "'Noto Sans Malayalam', sans-serif",
                                  }}
                                >
                                  മ
                                </button>
                              </div>
                            </td>

                            {/* Actions — Members + Minister */}
                            <td className="text-center">
                              <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                                <button
                                  className="btn btn-sm"
                                  style={{
                                    background: "var(--clr--violet)",
                                    color: "var(--clr--primary)",
                                    border: "1px solid var(--clr--primary)",
                                    fontWeight: 500,
                                  }}
                                  onClick={() => setMembersModal(row)}
                                >
                                  Members
                                </button>
                                <button
                                  className="btn btn-sm"
                                  style={{
                                    background: "var(--clr--violet)",
                                    color: "var(--clr--primary)",
                                    border: "1px solid var(--clr--primary)",
                                    fontWeight: 500,
                                  }}
                                  onClick={() => setMinistersModal(row)}
                                >
                                  Minister
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center py-4 text-muted">
                            No records found for the selected filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* ---- PAGINATION ---- */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(p) => {
                      setCurrentPage(p);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    totalItems={filteredRows.length}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ---- PDF MODAL ---- */}
      <PdfViewerModal
        show={pdfModal.show}
        onHide={() => setPdfModal({ show: false, url: null, title: "" })}
        fileUrl={pdfModal.url}
        title={pdfModal.title}
      />

      {/* ---- MEMBERS MODAL ---- */}
      {membersModal && (
        <MembersModal
          members={membersModal.members}
          onClose={() => setMembersModal(null)}
        />
      )}

      {/* ---- MINISTERS MODAL ---- */}
      {ministersModal && (
        <MinistersModal
          ministers={[ministersModal.minister]}
          onClose={() => setMinistersModal(null)}
        />
      )}
    </div>
  );
};

export default StatementDemands;
