import React, { useState, useEffect, useMemo , useRef, useCallback} from "react";
import HomeTest from "../Header";
import Pagination from "../Pagination";
import Calendar from "react-calendar";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "./SessionSchedule.css";
import "react-calendar/dist/Calendar.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import {
  BreadcrumbNav,
  CategoriesNav,
  ExportButton,
  Filter,
  SectionTitle,
  SessionCalendar,
} from "../common";
import InlinePdfViewer from "../common/InlinePdfViwer";
import "./ListOfPapersLaid.css";
import { API_ENDPOINTS } from "../../utils/config";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportCalendarToExcel = (data) => {
  const rows = data.map((item, i) => ({
    "Sl.No": i + 1,
    "KLA No": item.kla,
    "Session": item.session,
    "PDF Link": item.pdfUrl,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Calendar Sittings");

  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  saveAs(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    "Calendar_Sittings.xlsx"
  );
};

const exportCalendarToPDF = (data) => {
  const doc = new jsPDF("portrait");

  doc.text("Calendar of Sittings", 14, 15);

  autoTable(doc, {
    head: [["Sl.No", "KLA No", "Session", "PDF Link"]],
    body: data.map((item, i) => [
      i + 1,
      item.kla,
      item.session,
      item.pdfUrl,
    ]),
    styles: { fontSize: 9 },
  });

  doc.save("Calendar_Sittings.pdf");
};

const exportToPDF = (data) => {
  const doc = new jsPDF("landscape");

  doc.text("BAC Recommendations", 14, 15);

  autoTable(doc, {
    head: [["Sl.No", "KLA No", "Session", "Date", "Report", "PDF"]],
    body: data.map((item, i) => [
      i + 1,
      item.kla,
      item.session,
      item.date,
      item.report,
      item.pdfUrl,
    ]),
  });

  doc.save("BAC_Recommendations.pdf");
};

const exportToExcel = (data) => {
  const rows = data.map((item, i) => ({
    "Sl.No": i + 1,
    "KLA No": item.kla,
    Session: item.session,
    Date: item.date,
    Report: item.report,
    "PDF Link": item.pdfUrl,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "BAC");

  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  saveAs(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    "BAC_Recommendations.xlsx"
  );
};


const SessionSchedule = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState("calendar");
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedBacPdf, setSelectedBacPdf] = useState(null); // For BAC Report PDF viewer
  //const [klaList, setKlaList] = useState([]);
  //const [selectedKla, setSelectedKla] = useState(15);
  const [bacData, setBacData] = useState([]);
  const [rawBacData, setRawBacData] = useState([]); // Store raw API data
  const [calenndarSittings, setCalenndarSittings] = useState([]);
  const [rawCalendarData, setRawCalendarData] = useState([]); // Store raw calendar API data
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    kla_id: 15, // Default KLA ID (numeric)
    year: "",
    session_type: "",
    search: "",
  });
  const filterInitRef = useRef(false);

  const handleFilterChange = useCallback((newFilters) => {
    console.log("=== FILTER CHANGE CALLED ===");
    console.log("New filter values:", newFilters);
    
    // Skip the first initialization call from Filter component mount
    if (!filterInitRef.current) {
      console.log("First filter mount - skipping to prevent reset");
      filterInitRef.current = true;
      return;
    }
    
    setFilters(prevFilters => {
      // Map filter keys to state
      const mappedFilters = {
        kla_id: newFilters.KLA !== undefined ? Number(newFilters.KLA) : prevFilters.kla_id,
        year: newFilters.YEAR !== undefined ? newFilters.YEAR : prevFilters.year,
        session_type: newFilters.SESSION_TYPE !== undefined ? newFilters.SESSION_TYPE : prevFilters.session_type,
        search: newFilters.SEARCH !== undefined 
          ? newFilters.SEARCH 
          : (newFilters.SEARCH_NUM !== undefined 
              ? newFilters.SEARCH_NUM 
              : (newFilters.SEARCH_BULLETIN?.query !== undefined 
                  ? newFilters.SEARCH_BULLETIN.query 
                  : prevFilters.search)),
      };
      
      console.log("Updated filters:", mappedFilters);
      return mappedFilters;
    });
  }, []);

  // Allowed and meeting dates
  const { allowedActiveDates, meetingDates, datePdfData } = useMemo(
    () => ({
      allowedActiveDates: [
        "2025-07-05",
        "2025-07-06",
        "2025-07-09",
        "2025-07-12",
        "2025-07-13",
        "2025-07-30",
        "2025-08-05",
      ],
      meetingDates: ["2025-07-09", "2025-07-12", "2025-07-13", "2025-07-30"],
      datePdfData: {
        "2025-07-09": [
          { id: 1, name: "Business List A", url: "/pdf1.pdf" },
          { id: 2, name: "Business List B", url: "/dummy.pdf" },
        ],
        "2025-07-12": [{ id: 1, name: "Day Agenda", url: "/pdff.pdf" }],
        "2025-07-13": [
          { id: 1, name: "Morning Session", url: "/pdf1.pdf" },
          { id: 2, name: "Afternoon Session", url: "/dummy.pdf" },
        ],
        "2025-07-30": [{ id: 1, name: "Closing Day", url: "/pdf1.pdf" }],
      },
    }),
    [],
  );

  // Auto-select first meeting date + first PDF
  useEffect(() => {
    if (meetingDates.length > 0) {
      const firstDate = new Date(meetingDates[0]);
      setSelectedDate(firstDate);

      const firstDateString = firstDate.toISOString().split("T")[0];
      const firstPdfList = datePdfData[firstDateString];
      if (firstPdfList?.length > 0) {
        setSelectedPdf(firstPdfList[0].url);
      }
    }
  }, [meetingDates, datePdfData]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateString = date.toISOString().split("T")[0];
    const pdfList = datePdfData[dateString];
    setSelectedPdf(pdfList?.length > 0 ? pdfList[0].url : null);
  };

  const getPdfListForDate = (date) => {
    if (!date) return [];
    return datePdfData[date.toISOString().split("T")[0]] || [];
  };

  const getPdfUrlForDate = (date) => {
    if (!date) return null;
    const dateString = date.toISOString().split("T")[0];
    if (meetingDates.includes(dateString)) return "/papers.pdf";
    return null;
  };

  const handlePdfClick = (url) => setSelectedPdf(url);

  // Function to open PDF in new browser tab
  const openPdfInNewTab = (pdfUrl) => {
    if (!pdfUrl) {
      console.error("No PDF URL provided");
      return;
    }
    
    // Open PDF in new tab
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  // Scroll header effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // BAC Recommendations mock data

  // --------------------------- Fetch BAC_RECOMMENDATION_LIST (once, then filter client-side) ---------------------------

  // Fetch raw BAC data when KLA changes
  useEffect(() => {
    let cancelled = false;

    const getOrdinalSuffix = (n) => {
      const num = Number(n);
      if (num % 100 >= 11 && num % 100 <= 13) return "th";
      switch (num % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    const loadBacRecommendation = async () => {
      try {
        const params = new URLSearchParams();
        params.append("kla_id", filters.kla_id || 15);

        const url = `${API_ENDPOINTS.BAC_RECOMMENDATION_LIST}?${params.toString()}`;
        console.log("BAC API:", url);

        const res = await fetch(url, { headers: { Accept: "application/json" } });
        const json = await res.json();

        if (!cancelled && json?.status && Array.isArray(json?.data)) {
          const mapped = json.data.map((item) => ({
            id: item.id,
            kla: `${item.kla_id}${getOrdinalSuffix(item.kla_id)} KLA`,
            session: `Session ${item.session_number}`,
            sessionNumber: item.session_number, // Keep for filtering
            date: item.date_of_presentation
              ? new Date(item.date_of_presentation).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "—",
            report: item.report_title,
            pdfUrl: item.pdf_link,
          }));

          setRawBacData(mapped);
        }
      } catch (err) {
        console.error("Failed to load BAC list", err);
      }
    };

    loadBacRecommendation();
    return () => {
      cancelled = true;
    };
  }, [filters.kla_id]); // Only re-fetch when KLA changes

  // Apply client-side filtering whenever filters or raw data changes
  useEffect(() => {
    if (!rawBacData.length) {
      setBacData([]);
      return;
    }

    console.log("=== APPLYING CLIENT-SIDE BAC FILTERS ===");
    console.log("Current filters:", filters);

    let filtered = [...rawBacData];

    // Filter by session_type if provided
    if (filters.session_type && filters.session_type !== "All" && filters.session_type !== "") {
      filtered = filtered.filter(item => 
        String(item.sessionNumber) === String(filters.session_type)
      );
    }

    // Filter by search if provided (search in report title)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.report?.toLowerCase().includes(searchLower) ||
        item.kla?.toLowerCase().includes(searchLower) ||
        item.session?.toLowerCase().includes(searchLower)
      );
    }

    setBacData(filtered);
    setCurrentPage(1); // Reset pagination on filter change
    console.log("Filtered BAC data count:", filtered.length);
  }, [rawBacData, filters]);

  const itemsPerPage = 24; 
  const totalPages = Math.ceil(bacData.length / itemsPerPage);
  const paginatedData = bacData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // --------------------------- Fetch CALENDAR_SETTINGS_LIST (once, then filter client-side) ---------------------------

  // Fetch raw calendar data when KLA changes
  useEffect(() => {
    const loadCalendarSettings = async () => {
      try {
        const params = new URLSearchParams();
        params.append("kla_id", filters.kla_id || 15);

        const url = `${API_ENDPOINTS.CALENDAR_SETTINGS_LIST}?${params.toString()}`;
        console.log("CALENDAR_SETTINGS_LIST:", url);

        const res = await fetch(url, { headers: { Accept: "application/json" } });
        const json = await res.json();
        console.log("Calendar API response:", json);
        console.log("Calendar API response length:", json?.data?.length);
        
        if (json?.status && Array.isArray(json?.data)) {
          const mapped = json.data.map((item) => ({
            id: item.id,
            kla: item.kla_name,
            session: item.session_name,
            sessionId: item.session_id, // Keep for filtering
            pdfUrl: item.pdf_link,
          }));

          setRawCalendarData(mapped);
        }
      } catch (err) {
        console.error("Failed to load Calendar Sittings", err);
      }
    };

    loadCalendarSettings();
  }, [filters.kla_id]); // Only re-fetch when KLA changes

  // Apply client-side filtering for calendar data
  useEffect(() => {
    if (!rawCalendarData.length) {
      setCalenndarSittings([]);
      return;
    }

    console.log("=== APPLYING CLIENT-SIDE CALENDAR FILTERS ===");
    console.log("Current filters:", filters);

    let filtered = [...rawCalendarData];

    // Filter by session_type if provided
    if (filters.session_type && filters.session_type !== "All" && filters.session_type !== "") {
      filtered = filtered.filter(item => 
        String(item.sessionId) === String(filters.session_type)
      );
    }

    setCalenndarSittings(filtered);
    console.log("Filtered Calendar data count:", filtered.length);
  }, [rawCalendarData, filters]);
/*useEffect(() => {
  if (activeMainTab === "calendar") {
    loadCalendarSettings();
  }

  if (activeMainTab === "bac") {
    loadBACList();
  }

  if (activeMainTab === "list") {
    loadOtherTabData();
  }
}, [filters.kla_id, filters.session_type, activeMainTab]);
*/
//console.log("CalenndarSittings",calenndarSittings)
  const mainTabs = [
    { key: "calendar", label: "Calendar of Sittings" },
    { key: "bac", label: "BAC Report" },
    { key: "list", label: "List of Business" },
  ];

  console.log(setShowPdfModal, "clicked the pdf");

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
            { name: "Session Schedule", href: "/session-schedule" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Session Schedule" />

            {/* Tabs */}
            <div className="horiz-tab mt10">
              <div className="widget_list">
                <nav>
                  <div
                    className="nav flex-row nav-tabs text-start"
                    role="tablist"
                  >
                    {mainTabs.map((tab) => (
                      <button
                        key={tab.key}
                        className={`nav-link text-start ${
                          activeMainTab === tab.key ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => {
                          setActiveMainTab(tab.key);
                          // Reset filter init ref when switching tabs
                          filterInitRef.current = false;
                        }}
                      >
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
            </div>

            {/* Calendar of Sittings */}
            {activeMainTab === "calendar" && (
              <div
                className="tab-pane fade show active"
                id="nav-calendar"
                role="tabpanel"
                aria-labelledby="nav-calendar-tab"
              >
                <div className="grid-bill grids">
                 <Filter
                  key="calendar-filter"
                  filterKeys={["KLA", "SESSION_TYPE"]}
                  onFiltersChange={handleFilterChange}
                  overrides={{
                    KLA: { defaultValue: filters.kla_id },
                  }}
                />
                  
                  <ExportButton
                    onExport={(format) => {
                      if (format === "XLS") {
                        exportCalendarToExcel(calenndarSittings);
                      }

                      if (format === "PDF") {
                        if (!calenndarSittings.length) {
                          alert("No records to export");
                          return;
                        }
                        exportCalendarToPDF(calenndarSittings);
                      }
                    }}
                  />

                  {/* Display filter info */}
                  <div className="mt-3 mb-3 p-3" style={{ 
                    backgroundColor: "#f8f9fa", 
                    borderLeft: "4px solid var(--clr--primary)",
                    borderRadius: "4px"
                  }}>
                    {filters.session_type && filters.session_type !== '' && filters.session_type !== 'All' ? (
                      <h5 className="mb-1" style={{ color: "var(--clr--primary)", fontWeight: "600" }}>
                        Session {filters.session_type}
                      </h5>
                    ) : (
                      <h5 className="mb-1" style={{ color: "var(--clr--primary)", fontWeight: "600" }}>
                        All Sessions
                      </h5>
                    )}
                    <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                      {calenndarSittings.length} {calenndarSittings.length === 1 ? 'Calendar' : 'Calendars'} found
                    </p>
                  </div>

                  <div className="row mt-4">
                    {/* Calendar in col-3 */}
                    {/* <div className="col-lg-3 col-md-4">
                      <SessionCalendar
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                        startDate="05-07-2025"
                        endDate="05-08-2025"
                        meetingDates={meetingDates}
                        allowedDates={allowedActiveDates}
                        width="100%"
                      />
                    </div> */}

                    <div className="col-lg-12 col-md-8">
                      <div className="buss-cal c-ptag">
                        <div className="tabley">
                          <h5 className="mb-3 session-info">Session Info</h5>

                          {calenndarSittings.length > 0 ? (
                            <div className="row">
                              {calenndarSittings.map((item) => (
                                <div key={item.id} className="col-lg-4 col-md-6 mb-3">
                                  <a
                                    className="rul p-3 d-flex align-items-center justify-content-between"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      openPdfInNewTab(item.pdfUrl);   
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <span className="text-muted mb-0">
                                      <strong>Calendar:</strong> {item.kla} - <strong>Session:</strong> {item.session}
                                    </span>
                                    <div className="imgx ms-2">
                                      <img src="/images/file2.svg" width={20} alt="PDF" />
                                    </div>
                                  </a>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4">
                              <p>No calendar sittings available for the selected session</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BAC Recommendations */}
            {activeMainTab === "bac" && (
              <div className="bill-content col-md-12 mt30 committeeDt">
                <Filter
                  key="bac-filter"
                  filterKeys={["KLA", "SESSION_TYPE"]}
                  onFiltersChange={handleFilterChange}
                  overrides={{
                    KLA: { defaultValue: filters.kla_id },
                  }}
                />

               <ExportButton
                  onExport={(format) => {
                    if (format === "PDF") exportToPDF(bacData);
                    if (format === "XLS") exportToExcel(bacData);
                  }}
                />

                {/* Display filter info */}
                <div className="mt-3 mb-3 p-3" style={{ 
                  backgroundColor: "#f8f9fa", 
                  borderLeft: "4px solid var(--clr--primary)",
                  borderRadius: "4px"
                }}>
                  {filters.session_type && filters.session_type !== '' && filters.session_type !== 'All' ? (
                    <h5 className="mb-1" style={{ color: "var(--clr--primary)", fontWeight: "600" }}>
                      Session {filters.session_type}
                    </h5>
                  ) : (
                    <h5 className="mb-1" style={{ color: "var(--clr--primary)", fontWeight: "600" }}>
                      All Sessions
                    </h5>
                  )}
                  <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                    {bacData.length} {bacData.length === 1 ? 'Report' : 'Reports'} found
                    {filters.search && ` (filtered by: "${filters.search}")`}
                  </p>
                </div>

                <table className="table table myTable2">
                  <thead>
                    <tr>
                      <th>Sl.No</th>
                      <th>KLA No</th>
                      <th>Session</th>
                      <th>Date of Presentation</th>
                      <th>Report No</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => (
                      <tr key={item.id}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{item.kla}</td>
                        <td>{item.session}</td>
                        <td>{item.date}</td>
                        <td>{item.report}</td>
                        <td>
                          <a
                          href={item.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="viw"
                        >
                          View
                        </a>
                        {/*  <a
                            href="#"
                            className="viw"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedBacPdf(item.pdfUrl);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            View
                          </a>*/}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}

            {/* List of Business */}
            {activeMainTab === "list" && (
              <div className="bill-content col-md-12 mt30 committeeDt">
                <Filter 
                  key="list-filter"
                  filterKeys={["KLA", "SESSION_TYPE"]} 
                  onFiltersChange={handleFilterChange}
                  overrides={{
                    KLA: { defaultValue: filters.kla_id },
                  }}
                />
                  <ExportButton/>
                <div className="session-list-buss row mt-4">
                  <div className="col-lg-4 col-md-4">
                    <SessionCalendar
                      selectedDate={selectedDate}
                      onDateChange={handleDateChange}
                      startDate="05-07-2025"
                      endDate="05-08-2025"
                      meetingDates={meetingDates}
                      allowedDates={allowedActiveDates}
                      // height="400px"
                      width="100%"
                    />
                  </div>

                  {/* Papers List */}
                  <div className="papers-list col-lg-2 col-md-6">
                    <div className="papers-box mt-3">
                      <div className="serial-no">SI.No: 68</div>
                      <ul className="pdf-list">
                        {getPdfListForDate(selectedDate).map((pdf) => (
                          <li key={pdf.id}>
                            <a
                              href="#"
                              className={`rul d-flex align-items-center mb15 ${
                                selectedPdf === pdf.url ? "active" : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePdfClick(pdf.url);
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <span>{pdf.name}</span>
                              <div className="imgx">
                                <img src="images/file2.svg" width={16} alt="" />
                              </div>
                            </a>
                          </li>
                        ))}
                        {getPdfListForDate(selectedDate).length === 0 && (
                          <li>
                            <span className="no-papers-message">
                              No business available for this date
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* PDF Viewer */}
                  <div className="col-lg-6 col-md-6">
                    <InlinePdfViewer
                      fileUrl={selectedPdf || getPdfUrlForDate(selectedDate)}
                      height="400px"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PDF Modal */}
        {showPdfModal && (
          <>
            <div className="modal fade show" style={{ display: "block" }}>
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      Session Schedule - 15th KLA - Session 13
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowPdfModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div style={{ height: "85vh", minHeight: "600px" }}>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer
                          fileUrl="/pdf1.pdf"
                          plugins={[defaultLayoutPlugin()]}
                          defaultScale={SpecialZoomLevel.PageFit}
                        />
                      </Worker>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fade show"
              onClick={() => setShowPdfModal(false)}
            ></div>
          </>
        )}

        {/* BAC Report PDF Modal */}
        {selectedBacPdf && (
          <>
            <div className="modal fade show" style={{ display: "block" }}>
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      BAC Report Preview
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedBacPdf(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <InlinePdfViewer
                      fileUrl={selectedBacPdf}
                      height="85vh"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fade show"
              onClick={() => setSelectedBacPdf(null)}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default SessionSchedule;

