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
import { PdfViewerModal } from "../common";
import { DEMO_API_BASE_URL } from "../../utils/config";
import { fetchKlaList, fetchKlaSessions } from "../../services/MasterService";
import "./ListOfPapersLaid.css";

const PAPERS_API = `${DEMO_API_BASE_URL}/api/paperslaid`;

const PapersToBeLaid = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // PDF modal state
  const [pdfModal, setPdfModal] = useState({ show: false, url: null, title: "" });
  const openPdf = (url, title = "Papers Laid on the Table") => setPdfModal({ show: true, url, title });
  const closePdf = () => setPdfModal({ show: false, url: null, title: "" });

  // API-driven state
  const [papersData, setPapersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [klaId, setKlaId] = useState(15);
  const [sessionNo, setSessionNo] = useState(null);
  const [klaOptions, setKlaOptions] = useState([]);
  const [sessionOptions, setSessionOptions] = useState([]);

  // Calendar state derived from API items
  const [calendarDates, setCalendarDates] = useState([]);

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

  // Fetch papers from API whenever KLA or session changes
  useEffect(() => {
    let cancelled = false;
    const fetchPapers = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({ kla_id: klaId });
        if (sessionNo != null) params.set("session_id", sessionNo);
        const res = await fetch(`${PAPERS_API}?${params}`);
        const json = await res.json();
        if (!cancelled) {
          const items = json?.papers_laid?.items || [];
          setPapersData(items);
          // Derive unique dates for the calendar
          const dates = [...new Set(items.map((i) => i.date))].sort();
          setCalendarDates(dates);
          // Auto-select first date on calendar (don't auto-open modal)
          if (dates.length > 0) {
            setSelectedDate(new Date(dates[0]));
          }
          // Set default KLA/session from API if not already set
          if (json?.default && klaId === 15 && sessionNo === null) {
            setKlaId(json.default.kla_id || 15);
            setSessionNo(json.default.session_id || null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch papers laid:", err);
        if (!cancelled) setPapersData([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchPapers();
    return () => { cancelled = true; };
  }, [klaId, sessionNo]);

  const handleFiltersChange = useCallback((values) => {
    if (values?.KLA != null) {
      const raw = values.KLA;
      const n = typeof raw === "object" ? Number(raw.value ?? raw) : Number(raw);
      if (!Number.isNaN(n)) setKlaId(n);
    }
    if (values?.SESSION_TYPE != null) {
      const raw = values.SESSION_TYPE;
      const v = typeof raw === "object" ? raw.value : raw;
      setSessionNo(v === "" ? null : Number(v));
    }
  }, []);

  // Get items for a selected date (local date string to avoid timezone shift)
  const getLocalDateStr = (date) => {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePdfClick = (url, title) => openPdf(url, title);

  const getPdfListForDate = (date) => {
    if (!date) return [];
    const dateStr = getLocalDateStr(date);
    return papersData.filter((i) => i.date === dateStr);
  };

  // Calendar props derived from API data — used in the List tab
  const calendarStartDate = calendarDates.length > 0 ? calendarDates[0] : "2021-05-31";
  const calendarEndDate = calendarDates.length > 0 ? calendarDates[calendarDates.length - 1] : "2021-06-10";

  return (
    <div className="wrapper ovh">
      {/* ---------------- HEADER ---------------- */}
      <header
        className={`header-nav nav-homepage-style2 stricky main-menu ${
          isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
        }`}
      >
        <HomeTest />
      </header>

      <div className="body_content">
        {/* ---------------- NAVIGATION ---------------- */}
        <CategoriesNav />
        <BreadcrumbNav
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Business", href: "/session-schedule" },
            { name: "Papers Laid on the Table", href: "/paper-to-be-laid" },
          ]}
        />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Papers laid on the Table" />

            <Tabs
              tabs={[
                {
                  key: "Reports",
                  label: "Reports",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      <div className="terms_condition_grid text-start">
                        {/* Filter */}
                        <Filter
                          filterKeys={["KLA", "SESSION_TYPE"]}
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
                          }}
                        />

                        <div className="session-list-buss row mt-4">
                          <ExportButton />
                          <div className="table-responsive mt-2">
                            <table className="table table-bordered myTable2">
                              <thead>
                                <tr>
                                  <th>Sl. No</th>
                                  <th>Date</th>
                                  <th>Event / Title</th>
                                  <th>Minister(s)</th>
                                  <th>File</th>
                                </tr>
                              </thead>
                              <tbody>
                                {isLoading ? (
                                  <tr>
                                    <td colSpan="5" className="text-center py-4">
                                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                      </div>
                                    </td>
                                  </tr>
                                ) : papersData.length > 0 ? (
                                  papersData.map((item, idx) => (
                                    <tr key={item.id}>
                                      <td>{idx + 1}</td>
                                      <td style={{ whiteSpace: "nowrap" }}>{item.date}</td>
                                      <td>
                                        <div>{item.title_en}</div>
                                        {item.title_ml && (
                                          <div className="text-muted" style={{ fontSize: 12 }}>
                                            {item.title_ml}
                                          </div>
                                        )}
                                      </td>
                                      <td style={{ fontSize: 12 }}>
                                        {Array.isArray(item.minister)
                                          ? item.minister.join(", ")
                                          : item.minister || "—"}
                                      </td>
                                      <td className="text-center">
                                        {item.websitelink ? (
                                          <a
                                            href="#"
                                            className="d-flex align-items-center justify-content-center"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              openPdf(item.websitelink, item.title_en);
                                            }}
                                          >
                                            <div className="imgx">
                                              <img src="images/file2.svg" width={16} alt="PDF" />
                                            </div>
                                          </a>
                                        ) : (
                                          <span className="text-muted">—</span>
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="5" className="text-center py-4 text-muted">
                                      No data available for the selected KLA / Session.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                      </div>
                    </div>
                  ),
                },

                {
                  key: "SROs",
                  label: "SROs",
                  content: <div className="p100">CONTENT</div>,
                },
                {
                  key: "Ordinances",
                  label: "Ordinances",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      <div className="terms_condition_grid text-start">
                        <div className="session-list-buss row mt-4">
                          <div className="table-responsive">
                            <table className="table table-bordered myTable2">
                              <thead>
                                <tr>
                                  <th style={{ width: "10%" }}>Sl. No</th>
                                  <th style={{ width: "10%" }}>Ordinance No</th>
                                  <th style={{ width: "60%" }}>
                                    Title of the Ordinance
                                  </th>
                                  <th style={{ width: "20%" }}>
                                    Date of Promulgation
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  {
                                    id: 1,
                                    no: 20,
                                    title:
                                      "The Kerala State Goods And Services Tax (Amendment) Ordinance, 2023",
                                    date: "2024-01-05",
                                  },
                                  {
                                    id: 2,
                                    no: 19,
                                    title:
                                      "Kerala Panchayat Raj (Amendment) Ordinance, 2023",
                                    date: "2023-12-08",
                                  },
                                  {
                                    id: 3,
                                    no: 18,
                                    title:
                                      "The Kerala Municipality (Amendment) Ordinance, 2023",
                                    date: "2023-12-08",
                                  },
                                  {
                                    id: 4,
                                    no: 17,
                                    title:
                                      "The Kerala Taxation Laws (Amendment) Ordinance, 2023",
                                    date: "2023-07-23",
                                  },
                                  {
                                    id: 5,
                                    no: 16,
                                    title:
                                      "The Kerala Healthcare Service Persons And Healthcare Service Institutions (Prevention Of Violence And Damage To Property) Amendment Ordinance, 2023",
                                    date: "2023-05-24",
                                  },
                                  {
                                    id: 6,
                                    no: 15,
                                    title:
                                      "The Kerala Public Health Ordinance, 2022",
                                    date: "2022-10-15",
                                  },
                                  {
                                    id: 7,
                                    no: 14,
                                    title:
                                      "The Kerala Public Enterprises Selection And Recruitment Board Ordinance, 2022",
                                    date: "2022-06-02",
                                  },
                                  {
                                    id: 8,
                                    no: 13,
                                    title:
                                      "The Kerala Public Service Commission (Additional Functions As Respects Certain Corporations And Companies) Amendment Ordinance, 2022",
                                    date: "2022-03-31",
                                  },
                                  {
                                    id: 9,
                                    no: 12,
                                    title:
                                      "The Kerala Public Health Ordinance, 2022",
                                    date: "2022-03-31",
                                  },
                                  {
                                    id: 10,
                                    no: 11,
                                    title:
                                      "The Kerala Co-Operative Societies (Amendment) Ordinance, 2022",
                                    date: "2022-03-31",
                                  },
                                  {
                                    id: 11,
                                    no: 10,
                                    title:
                                      "The Kerala Livestock And Poultry Feed And Mineral Mixture (Regulation Of Manufacture And Sale) Ordinance, 2022",
                                    date: "2022-03-31",
                                  },
                                  {
                                    id: 12,
                                    no: 9,
                                    title:
                                      "The Kerala Maritime Board (Amendment) Ordinance, 2022",
                                    date: "2022-03-31",
                                  },
                                  {
                                    id: 13,
                                    no: 8,
                                    title:
                                      "The Kerala Lok Ayukta (Amendment) Ordinance, 2022",
                                    date: "2022-03-31",
                                  },
                                  {
                                    id: 14,
                                    no: 7,
                                    title:
                                      "The Kerala Private Forests (Vesting And Assignment) Amendment Ordinance, 2022",
                                    date: "2022-03-31",
                                  },
                                  {
                                    id: 15,
                                    no: 6,
                                    title:
                                      "The Kerala Local Self Government Common Service Ordinance, 2022",
                                    date: "2022-03-31",
                                  },
                                  {
                                    id: 16,
                                    no: 5,
                                    title:
                                      "The Kerala Local Self Government Common Service Ordinance, 2022",
                                    date: "2022-03-31",
                                  },
                                  {
                                    id: 17,
                                    no: 4,
                                    title:
                                      "The Kerala Jewellery Workers’ Welfare Fund (Amendment) Ordinance, 2022",
                                    date: "2022-03-31",
                                  },
                                  {
                                    id: 18,
                                    no: 3,
                                    title:
                                      "The Kerala Lok Ayukta (Amendment) Ordinance, 2022",
                                    date: "2022-02-07",
                                  },
                                  {
                                    id: 19,
                                    no: 2,
                                    title:
                                      "The Kerala Maritime Board (Amendment) Ordinance, 2022",
                                    date: "2022-01-19",
                                  },
                                  {
                                    id: 20,
                                    no: 1,
                                    title:
                                      "The Kerala Co-Operative Societies (Amendment) Ordinance, 2022",
                                    date: "2022-01-13",
                                  },
                                ].map((ord, idx) => (
                                  <tr key={ord.id}>
                                    <td>{idx + 1}</td>
                                    <td>{ord.no}</td>
                                    <td>{ord.title}</td>
                                    <td>{ord.date}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Acts",
                  label: "Acts",
                  content: <div className="p100">CONTENT</div>,
                },
                {
                  key: "List",
                  label: "List",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      <div className="terms_condition_grid text-start">
                        <Filter filterKeys={["KLA", "SESSION_TYPE"]} />
                        <ExportButton />
                        <div className="session-list-buss row mt-4">
                          {/* Calendar (left) */}
                          <div className="col-lg-4 col-md-6">
                            <SessionCalendar
                              selectedDate={selectedDate}
                              onDateChange={handleDateChange}
                              startDate={calendarStartDate}
                              endDate={calendarEndDate}
                              meetingDates={calendarDates}
                              allowedDates={calendarDates}
                              height="400px"
                              width="100%"
                            />
                          </div>

                          {/* Middle: PDF list for selected date */}
                          <div className="papers-list col-lg-2 col-md-6">
                            <br />
                            <div className="papers-box">
                              <ul className="pdf-list">
                                {getPdfListForDate(selectedDate).map((item) => (
                                  <li key={item.id}>
                                    <a
                                      href="#"
                                      className={`rul d-flex align-items-center mb15`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (item.websitelink) handlePdfClick(item.websitelink, item.title_en);
                                      }}
                                      style={{
                                        opacity: item.websitelink ? 1 : 0.45,
                                        pointerEvents: item.websitelink ? "auto" : "none",
                                      }}
                                    >
                                      <span>{item.title_en}</span>
                                      <div className="imgx">
                                        <img
                                          src="images/file2.svg"
                                          width={16}
                                          alt=""
                                        />
                                      </div>
                                    </a>
                                  </li>
                                ))}
                                {getPdfListForDate(selectedDate).length === 0 && (
                                  <li>
                                    <span className="no-papers-message">
                                      No papers available for this date
                                    </span>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>

                          {/* Right: click a document from the list to open the PDF modal */}
                          <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                            <p className="text-muted" style={{ fontSize: 13 }}>
                              Click a document from the list to view the PDF.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Others",
                  label: "Others",
                  content: <div className="p100">CONTENT</div>,
                },
              ]}
              onChange={() => {}}
            />
          </div>
        </section>
      </div>

      {/* PDF Modal */}
      <PdfViewerModal
        show={pdfModal.show}
        onHide={closePdf}
        fileUrl={pdfModal.url}
        title={pdfModal.title}
      />
    </div>
  );
};

export default PapersToBeLaid;

