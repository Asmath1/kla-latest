import React, { useEffect, useMemo, useState } from "react";
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
import { fetchBudgetSessions, fetchKlaList } from "../services/MasterService";
import "./BudgetDocs.css";

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
          {members.map((member, index) => (
            <tr key={`${member.name}-${index}`}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.constituency || "-"}</td>
            </tr>
          ))}
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
          {ministers.map((minister, index) => (
            <tr key={`${minister.name}-${index}`}>
              <td>{index + 1}</td>
              <td>{minister.name}</td>
              <td>{minister.portfolio || "-"}</td>
              <td>{minister.constituency || "-"}</td>
              <td>{minister.party || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>Close</Button>
    </Modal.Footer>
  </Modal>
);

const BudgetDocs = () => {
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
  const [budgetData, setBudgetData] = useState({
    defaultSelection: { kla_id: 15, session_id: null },
    sessions: [],
    rows: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
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
    fetchKlaList()
      .then((list) => {
        const options = (list || []).map((item) => ({
          value: item.id,
          label: item.languages?.[0]?.name || `KLA ${item.id}`,
        }));
        setKlaOptions(options);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadBudgetData = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const result = await fetchBudgetSessions();
        if (cancelled) return;

        setBudgetData(result);

        if (result?.defaultSelection?.kla_id) {
          setKlaId(result.defaultSelection.kla_id);
        }
        if (result?.defaultSelection?.session_id != null) {
          setSessionNo(result.defaultSelection.session_id);
        }
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load budget sessions:", error);
        setLoadError("Failed to load budget documents.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadBudgetData();

    return () => {
      cancelled = true;
    };
  }, []);

  const sessionsForKla = useMemo(
    () => budgetData.sessions.filter((session) => Number(session.kla_id) === Number(klaId)),
    [budgetData.sessions, klaId]
  );

  const sessionOptions = useMemo(
    () =>
      sessionsForKla.map((session) => ({
        value: session.session_id,
        label: String(session.session_id),
      })),
    [sessionsForKla]
  );

  useEffect(() => {
    if (sessionNo == null) return;

    const hasSession = sessionOptions.some(
      (option) => Number(option.value) === Number(sessionNo)
    );

    if (!hasSession) {
      setSessionNo(null);
    }
  }, [sessionNo, sessionOptions]);

  const rowsForKla = useMemo(
    () => budgetData.rows.filter((row) => Number(row.kla_id) === Number(klaId)),
    [budgetData.rows, klaId]
  );

  const eventOptions = useMemo(() => {
    const events = [...new Set(rowsForKla.map((row) => row.event).filter(Boolean))];
    return [
      { value: "", label: "-Select Event-" },
      ...events.map((event) => ({ value: event, label: event })),
    ];
  }, [rowsForKla]);

  const subjectOptions = useMemo(() => {
    const subjects = [...new Set(rowsForKla.map((row) => row.subject).filter(Boolean))];
    return [
      { value: "", label: "-Select Subject-" },
      ...subjects.map((subject) => ({ value: subject, label: subject })),
    ];
  }, [rowsForKla]);

  const memberOptions = useMemo(() => {
    const memberNames = [
      ...new Set(
        rowsForKla.flatMap((row) => row.members.map((member) => member.name)).filter(Boolean)
      ),
    ];

    return [
      { value: "", label: "All Members" },
      ...memberNames.map((name) => ({ value: name, label: name })),
    ];
  }, [rowsForKla]);

  const selectedSession = useMemo(() => {
    if (sessionNo == null) return null;
    return (
      sessionsForKla.find(
        (session) => Number(session.session_id) === Number(sessionNo)
      ) || null
    );
  }, [sessionsForKla, sessionNo]);

  const sessionStartDate = selectedSession?.start_date || "1957-04-01";
  const sessionEndDate =
    selectedSession?.end_date || new Date().toISOString().split("T")[0];
  const meetingDates = selectedSession?.meeting_dates || [];

  const handleFiltersChange = (values) => {
    if (values?.KLA != null) {
      const raw = values.KLA;
      const nextKlaId = typeof raw === "object" ? Number(raw.value ?? raw) : Number(raw);
      if (!Number.isNaN(nextKlaId)) setKlaId(nextKlaId);
    }

    if (values?.SESSION_TYPE != null) {
      const raw = values.SESSION_TYPE;
      const nextSessionNo = typeof raw === "object" ? raw.value : raw;
      setSessionNo(nextSessionNo === "" ? null : Number(nextSessionNo));
    }

    if (values?.MEMBER != null) {
      setMemberFilter(
        typeof values.MEMBER === "object" ? values.MEMBER.value ?? "" : values.MEMBER
      );
    }

    if (values?.SEARCH != null) setSearchText(values.SEARCH);
    if (values?.DATE_FROM != null) setDateFrom(values.DATE_FROM);
    if (values?.DATE_TO != null) setDateTo(values.DATE_TO);

    if (values?.EVENT != null) {
      setEventFilter(
        typeof values.EVENT === "object" ? values.EVENT.value ?? "" : values.EVENT
      );
    }

    if (values?.SUBJECT != null) {
      setSubjectFilter(
        typeof values.SUBJECT === "object" ? values.SUBJECT.value ?? "" : values.SUBJECT
      );
    }
  };

  const filteredRows = useMemo(() => {
    return rowsForKla.filter((row) => {
      if (sessionNo != null && Number(row.session) !== Number(sessionNo)) return false;
      if (eventFilter && row.event !== eventFilter) return false;
      if (subjectFilter && row.subject !== subjectFilter) return false;

      if (memberFilter) {
        const hasMember = row.members.some(
          (member) => member.name.toLowerCase() === memberFilter.toLowerCase()
        );
        if (!hasMember) return false;
      }

      if (dateFrom && row.isoDate < dateFrom) return false;
      if (dateTo && row.isoDate > dateTo) return false;

      if (searchText) {
        const query = searchText.toLowerCase();
        const haystacks = [
          row.subject,
          row.subject_en,
          row.subject_ml,
          row.event,
          row.assembly,
        ]
          .filter(Boolean)
          .map((value) => value.toLowerCase());

        if (!haystacks.some((value) => value.includes(query))) return false;
      }

      return true;
    });
  }, [
    rowsForKla,
    sessionNo,
    eventFilter,
    subjectFilter,
    memberFilter,
    dateFrom,
    dateTo,
    searchText,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [klaId, sessionNo, eventFilter, subjectFilter, memberFilter, searchText, dateFrom, dateTo]);

  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
  const pagedRows = filteredRows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openPdf = (url, title) => setPdfModal({ show: true, url, title });

  return (
    <div className="wrapper ovh budget-docs-page">
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
            { name: "Budget Documents", href: "/budget-documents" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Budget Documents" />

            <div className="bill-content col-md-12 mt30 committeeDt">
              <div className="terms_condition_grid text-start mb-40">
                <div className="row">
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
                          defaultValue: sessionNo ?? "",
                          options: [{ value: "", label: "All" }, ...sessionOptions],
                        },
                        MEMBER: {
                          options: memberOptions,
                        },
                        EVENT: {
                          options: eventOptions,
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
                        <strong style={{ color: "var(--clr--primary, #6b21a8)" }}>
                          {filteredRows.length}
                        </strong>
                      </span>
                    </div>

                    {loadError && (
                      <div className="alert alert-danger py-2" role="alert">
                        {loadError}
                      </div>
                    )}
                  </div>

                  <div className="col-lg-4 section-calendar mb20">
                    <SessionCalendar
                      selectedDate={selectedDate}
                      onDateChange={setSelectedDate}
                      startDate={sessionStartDate}
                      endDate={sessionEndDate}
                      meetingDates={meetingDates}
                      allowedDates={meetingDates}
                      width="100%"
                    />
                  </div>
                </div>

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
                      {isLoading ? (
                        <tr>
                          <td colSpan={7} className="text-center py-4 text-muted">
                            Loading budget documents...
                          </td>
                        </tr>
                      ) : pagedRows.length > 0 ? (
                        pagedRows.map((row) => (
                          <tr key={row.id}>
                            <td style={{ whiteSpace: "nowrap" }}>{row.date}</td>
                            <td>{row.assembly}</td>
                            <td className="text-center">{row.session}</td>
                            <td>{row.event}</td>
                            <td>{row.subject}</td>
                            <td className="text-center">
                              <div className="d-flex align-items-center justify-content-center gap-2">
                                <button
                                  title="View English PDF"
                                  onClick={() =>
                                    row.pdf_url_english &&
                                    openPdf(
                                      row.pdf_url_english,
                                      row.subject_en || `${row.subject} (English)`
                                    )
                                  }
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

                                <button
                                  title="View Malayalam PDF"
                                  onClick={() =>
                                    row.pdf_url_malayalam &&
                                    openPdf(
                                      row.pdf_url_malayalam,
                                      row.subject_ml || `${row.subject} (Malayalam)`
                                    )
                                  }
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
                                  disabled={!row.members.length}
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
                                  disabled={!row.ministers.length}
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

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page);
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

      <PdfViewerModal
        show={pdfModal.show}
        onHide={() => setPdfModal({ show: false, url: null, title: "" })}
        fileUrl={pdfModal.url}
        title={pdfModal.title}
      />

      {membersModal && (
        <MembersModal
          members={membersModal.members}
          onClose={() => setMembersModal(null)}
        />
      )}

      {ministersModal && (
        <MinistersModal
          ministers={ministersModal.ministers}
          onClose={() => setMinistersModal(null)}
        />
      )}
    </div>
  );
};

export default BudgetDocs;
