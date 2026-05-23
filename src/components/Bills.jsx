import React, { useEffect, useMemo, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "react-calendar";
import "../styles/Question.css";
import "../css/flaticon.css";
import "react-calendar/dist/Calendar.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import HomeTest from "./Header";
import "../styles/Bills.css";
import Pagination from "./Pagination";
import { BreadcrumbNav, CategoriesNav, Filter, SectionTitle } from "./common";
import { API_ENDPOINTS } from "../utils/config";
import { ensureHttps } from "../utils/urlUtils";

const dummyPdf = "/pdf1.pdf";

const normalizePdfUrl = (url) => {
  if (!url) return null;
  return ensureHttps(url.trim());
};

const getOrdinalSuffix = (num) => {
  const value = Number(num);
  if (Number.isNaN(value)) return "";
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return "th";
  switch (value % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const extractKlaId = (klaOption) => {
  if (klaOption == null) return null;

  if (typeof klaOption === "number") {
    return Number.isFinite(klaOption) ? klaOption : null;
  }

  if (typeof klaOption === "string") {
    const match = klaOption.match(/\d+/);
    return match ? Number(match[0]) : null;
  }

  const rawValue =
    klaOption.value ??
    klaOption.id ??
    klaOption.kla_id ??
    klaOption.klaId ??
    klaOption.label;

  if (rawValue == null) return null;

  const match = String(rawValue).match(/\d+/);
  return match ? Number(match[0]) : null;
};

const buildKlaRangeOptions = (klaOptions = [], preferredKlaId = 13) => {
  const klaIds = (Array.isArray(klaOptions) ? klaOptions : [])
    .map(extractKlaId)
    .filter((id) => Number.isInteger(id) && id > 0);

  const maxKlaId = Math.max(preferredKlaId, ...klaIds, 1);
  const options = Array.from({ length: maxKlaId }, (_, index) => {
    const klaId = index + 1;
    return {
      value: klaId,
      label: `${klaId}${getOrdinalSuffix(klaId)} KLA`,
    };
  });

  return {
    options,
    defaultValue: options.some((option) => option.value === preferredKlaId)
      ? preferredKlaId
      : maxKlaId,
  };
};

export const BillsTabs = () => {
  const [activeTab, setActiveTab] = useState("rules");
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleTabClick = (tabKey) => {
    if (tabKey === activeTab) return;
    setActiveTab(tabKey);
    // Reset filter values when changing tabs
  };

  const openPdf = (url) => {
    const normalizedUrl = normalizePdfUrl(url);
    if (!normalizedUrl) {
      console.error("Invalid PDF URL", url);
      return;
    }

    setPdfUrl(normalizedUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPdfUrl(null);
  };

  // Individual filter data for each tab with unique content
  const tabFilterData = {
    rules: {
      kla: [
        "16th KLA",
        "15th KLA",
        "14th KLA",
        "13th KLA",
        "12th KLA",
        "11th KLA",
        "10th KLA",
      ],
      session: ["Session 1", "Session 2", "Session 3", "Session 4"],
      member: [
        "ശ്രീ. എൻ. കെ. അക്ബര്‍",
        "ശ്രീ വി ജോയി",
        "ശ്രീ. പി. മമ്മിക്കുട്ടി",
        "ശ്രീ. എം. കെ. മുനീർ",
        "ശ്രീ. പി. ടി. തോമസ്",
      ],
      date: [
        "13-12-2025",
        "14-12-2025",
        "15-12-2025",
        "16-12-2025",
        "17-12-2025",
      ],
      dates: [
        "12.12.2025",
        "13-12-2025",
        "13 Dec 2025",
        "14 Dec 2025",
        "15 Dec 2025",
        "16 Dec 2025",
        "18 Dec 2025",
        "19 Dec 2025",
        "21 Dec 2025",
        "23 Dec 2025",
        "24 Dec 2025",
        "25 Dec 2025",
        "26 Dec 2025",
        "27 Dec 2025",
        "28 Dec 2025",
      ],
      pdfTitle: "Question Rules",
    },

    intro: {
      kla: [
        "14th KLA",
        "13th KLA",
        "12th KLA",
        "11th KLA",
        "10th KLA",
        "9th KLA",
        "8th KLA",
      ],
      session: ["Session III", "Session IV", "Session V", "Session VI"],
      member: [
        "ശ്രീ. കെ. എം. ജോർജ്ജ്",
        "ശ്രീ. എൻ. എം. ജോസഫ്",
        "ശ്രീ. പി. എം. ഇബ്രാഹിം",
        "ശ്രീ. എം. എം. ഹസ്സൻ",
        "ശ്രീ. കെ. എം. രാജൻ",
      ],
      date: [
        "30-12-2025",
        "31-12-2025",
        "01-01-2026",
        "02-01-2026",
        "03-01-2026",
      ],
      dates: [
        "30.12.2025",
        "30-12-2025",
        "31 Dec 2025",
        "01 Jan 2026",
        "02 Jan 2026",
        "03 Jan 2026",
        "04 Jan 2026",
        "05 Jan 2026",
        "06 Jan 2026",
        "07 Jan 2026",
        "08 Jan 2026",
        "09 Jan 2026",
        "10 Jan 2026",
        "11 Jan 2026",
        "12 Jan 2026",
      ],
      pdfTitle:
        "Schedule of Days for Answering Questions - 15th Kla - Session 13",
    },
  };

  const currentFilterData = tabFilterData[activeTab];

  const renderTabContent = () => {
    switch (activeTab) {
      case "rules":
        return (
          <div
            className="tab-pane fade show active"
            id="nav-accountpayment"
            role="tabpanel"
            aria-labelledby="nav-accountpayment-tab"
          >
            <div className=" grids qst mb40-md">
              <h5 className="rule-title">Rules</h5>
              <div>
                <a
                  href="#"
                  className="rul d-flex align-items-center mb20"
                  onClick={() => openPdf(dummyPdf)}
                >
                  <span>Bill Rules</span>
                  <div className="imgx">
                    <img src="images/file2.svg" width={16} alt="" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        );
      case "intro":
        return (
          <div
            className="tab-pane fade show active"
            id="nav-accountpayment"
            role="tabpanel"
            aria-labelledby="nav-accountpayment-tab"
          >
            <div className=" grids qst mb40-md">
              <h5 className="rule-title">
                Introduction (How bills become act)
              </h5>
              <div>
                <a
                  href="#"
                  className="rul d-flex align-items-center mb20"
                  onClick={() => openPdf(dummyPdf)}
                >
                  <span>How bills become act</span>
                  <div className="imgx">
                    <img src="images/file2.svg" width={16} alt="" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="row mb30 d-flex">
      <div className="col-md-5 col-lg-5 col-xl-4">
        <div className="terms_condition_widget mb30-sm">
          <div className="widget_list">
            <nav>
              <div
                className="nav nav-tabs text-start"
                id="nav-tab"
                role="tablist"
              >
                <button
                  className={`nav-link text-start ${
                    activeTab === "rules" ? "active" : ""
                  }`}
                  id="nav-accountpayment-tab"
                  type="button"
                  role="tab"
                  aria-controls="nav-accountpayment"
                  aria-selected={activeTab === "rules"}
                  onClick={() => handleTabClick("rules")}
                >
                  Rules
                </button>
                <button
                  className={`nav-link text-start ${
                    activeTab === "intro" ? "active" : ""
                  }`}
                  id="nav-manageother-tab"
                  type="button"
                  role="tab"
                  aria-controls="nav-manageother"
                  aria-selected={activeTab === "intro"}
                  onClick={() => handleTabClick("intro")}
                >
                  Introduction (How bills become act)
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="col-md-7 col-lg-7 col-xl-8">
        <div
          className="terms_condition_grid text-start h-100 pl20"
          style={{ borderLeft: "1px solid #80808080" }}
        >
          <div className="tab-content" id="nav-tabContent">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      <Modal
        show={showModal}
        onHide={closeModal}
        dialogClassName="modal-xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            {currentFilterData ? currentFilterData.pdfTitle : "Document"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh" }}>
          <div className="pdf-viewer-container">
            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                  </Worker> */}

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              {pdfUrl && (
                <Viewer
                  fileUrl={normalizePdfUrl(pdfUrl)}
                  plugins={[defaultLayoutPluginInstance]}
                  defaultScale={
                    typeof window !== "undefined" && window.innerWidth <= 576
                      ? SpecialZoomLevel.PageFit
                      : 1
                  }
                />
              )}
            </Worker>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

// BillsTabs component for internal use

const Bills = () => {
  const [activeMainTab, setActiveMainTab] = useState("bills");
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showBillInfoModal, setShowBillInfoModal] = useState(false);
  const [selectedBillPdf, setSelectedBillPdf] = useState(null);
  const [showPdfPopup, setShowPdfPopup] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ordinancesData, setOrdinancesData] = useState([]);
  const [isLoadingOrdinances, setIsLoadingOrdinances] = useState(false);
  const [ordinancesDates, setOrdinancesDates] = useState([]);
  
  // Bills state
  const [billsData, setBillsData] = useState([]);
  const [isLoadingBills, setIsLoadingBills] = useState(false);
  const [billsPagination, setBillsPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    items_per_page: 10
  });
  const [billsFilters, setBillsFilters] = useState(null);
  const [filterOverrides, setFilterOverrides] = useState({});
  const [selectedBill, setSelectedBill] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({});

  // Bills Passed state
  const [billsPassedData, setBillsPassedData] = useState([]);
  const [isLoadingBillsPassed, setIsLoadingBillsPassed] = useState(false);
  const [billsPassedKlaId, setBillsPassedKlaId] = useState(13);
  const [billsPassedSearch, setBillsPassedSearch] = useState("");
  const [billsPassedYear, setBillsPassedYear] = useState("");
  const [billsPassedPage, setBillsPassedPage] = useState(1);
  const BILLS_PASSED_PER_PAGE = 10;
  const billsKlaOptions = useMemo(
    () => buildKlaRangeOptions(billsFilters?.kla, 13),
    [billsFilters]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const handleResize = () => {
      // If we're on mobile and resize to desktop, close the PDF popup
      if (window.innerWidth > 768 && showPdfPopup) {
        setShowPdfPopup(false);
        setSelectedBillPdf(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [showPdfPopup]);

  // Fetch Bills filters
  useEffect(() => {
    const fetchBillsFilters = async () => {
      try {
        // Fetch both filters and statuses in parallel
        const [filtersResponse, statusesResponse] = await Promise.all([
          fetch(API_ENDPOINTS.BILLS_FILTERS, {
            method: "GET",
            headers: { "Accept": "application/json" }
          }),
          fetch(API_ENDPOINTS.BILLS_STATUSES, {
            method: "GET",
            headers: { "Accept": "application/json" }
          })
        ]);
        
        const filtersResult = await filtersResponse.json();
        const statusesResult = await statusesResponse.json();
        
        if (filtersResult?.status && filtersResult?.filters) {
          setBillsFilters(filtersResult.filters);
          
          // Create filter overrides for the Filter component
          const overrides = {};
          
          // KLA filter
          if (filtersResult.filters.kla) {
            const klaRange = buildKlaRangeOptions(filtersResult.filters.kla, 13);
            overrides.KLA = {
              options: klaRange.options,
              defaultValue: klaRange.defaultValue
            };
          }
          
          // Bill Type filter
          if (filtersResult.filters.bill_types) {
            overrides.BILL_TYPE = {
              options: [
                { value: "", label: "All" },
                ...filtersResult.filters.bill_types
              ]
            };
          }
          
          // Bill Category filter
          if (filtersResult.filters.bill_categories) {
            overrides.BILL_CATEGORY = {
              options: [
                { value: "", label: "All" },
                ...filtersResult.filters.bill_categories
              ]
            };
          }
          
          // Bill Status filter from separate endpoint
          if (statusesResult?.statuses) {
            overrides.BILL_STATUS = {
              options: [
                { value: "", label: "All" },
                ...statusesResult.statuses.map(status => ({
                  value: status.value,
                  label: status.label,
                  class: status.class
                }))
              ]
            };
          }
          
          // Session filter
          if (filtersResult.filters.sessions) {
            overrides.SESSION = {
              options: filtersResult.filters.sessions
            };
          }
          
          setFilterOverrides(overrides);
        }
      } catch (error) {
        console.error("Error fetching bills filters:", error);
      }
    };

    fetchBillsFilters();
  }, []);

  useEffect(() => {
    if (!billsKlaOptions.options.length) return;

    const hasCurrentKla = billsKlaOptions.options.some(
      (option) => Number(option.value) === Number(billsPassedKlaId)
    );

    if (!hasCurrentKla) {
      setBillsPassedKlaId(billsKlaOptions.defaultValue);
    }
  }, [billsKlaOptions, billsPassedKlaId]);

  // Fetch Ordinances data
  useEffect(() => {
    const fetchOrdinances = async () => {
      if (activeMainTab !== "ordinances") return;
      
      setIsLoadingOrdinances(true);
      try {
        const response = await fetch(API_ENDPOINTS.ORDINANCES_LIST, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        });
        const result = await response.json();
        
        if (result?.status && result?.data) {
          setOrdinancesData(result.data);
          // Extract dates for calendar highlighting
          const dates = result.data.map(item => new Date(item.date));
          setOrdinancesDates(dates);
        }
      } catch (error) {
        console.error("Error fetching ordinances:", error);
      } finally {
        setIsLoadingOrdinances(false);
      }
    };

    fetchOrdinances();
  }, [activeMainTab]);

  // Fetch Bills data with filters
  useEffect(() => {
    const fetchBills = async () => {
      if (activeMainTab !== "bills") return;
      
      setIsLoadingBills(true);
      try {
        // Build query parameters from filters
        const params = new URLSearchParams();
        
        if (currentFilters.KLA) {
          params.append('kla_id', currentFilters.KLA);
        }
        if (currentFilters.SESSION && currentFilters.SESSION !== '') {
          params.append('session_id', currentFilters.SESSION);
        }
        if (currentFilters.BILL_TYPE && currentFilters.BILL_TYPE !== '') {
          params.append('bill_type', currentFilters.BILL_TYPE);
        }
        if (currentFilters.BILL_CATEGORY && currentFilters.BILL_CATEGORY !== '') {
          params.append('bill_category', currentFilters.BILL_CATEGORY);
        }
        if (currentFilters.BILL_STATUS && currentFilters.BILL_STATUS !== '') {
          params.append('status', currentFilters.BILL_STATUS);
        }
        
        const url = `${API_ENDPOINTS.BILLS_LIST}${params.toString() ? `?${params.toString()}` : ''}`;
        console.log('Fetching bills with URL:', url);
        
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        });
        const result = await response.json();
        
        if (result?.status && result?.data) {
          setBillsData(result.data);
          if (result?.pagination) {
            setBillsPagination(result.pagination);
          }
        }
      } catch (error) {
        console.error("Error fetching bills:", error);
      } finally {
        setIsLoadingBills(false);
      }
    };

    fetchBills();
  }, [activeMainTab, currentFilters]);

  // Fetch Bills Passed data
  useEffect(() => {
    if (activeMainTab !== "bills-passed") return;

    const fetchBillsPassed = async () => {
      setIsLoadingBillsPassed(true);
      try {
        const response = await fetch(API_ENDPOINTS.BILLS_PASSED(billsPassedKlaId), {
          method: "GET",
          headers: { "Accept": "application/json" },
        });
        const result = await response.json();
        if (result?.status && result?.data) {
          setBillsPassedData(result.data);
        } else {
          setBillsPassedData([]);
        }
      } catch (error) {
        console.error("Error fetching bills passed:", error);
        setBillsPassedData([]);
      } finally {
        setIsLoadingBillsPassed(false);
      }
    };

    fetchBillsPassed();
  }, [activeMainTab, billsPassedKlaId]);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleMainTabClick = (tabKey) => {
    setActiveMainTab(tabKey);
  };

  const closePdfModal = () => {
    setShowPdfModal(false);
    setSelectedQuestion(null);
  };

  const openBillInfoModal = (bill, e) => {
    if (e) {
      e.preventDefault();
    }
    setSelectedBill(bill);
    setShowBillInfoModal(true);
    setSelectedBillPdf(null); // Reset PDF selection when opening modal
    // Disable background scrolling
    document.body.classList.add("modal-open");
  };

  const closeBillInfoModal = () => {
    setShowBillInfoModal(false);
    setSelectedBill(null);
    setSelectedBillPdf(null); // Reset PDF selection when closing modal
    // Re-enable background scrolling
    document.body.classList.remove("modal-open");
  };

  // const openBillPdf = (pdfUrl, e) => {
  //   if (e) {
  //     e.preventDefault();
  //   }
  //   const isMobile = window.innerWidth <= 768;

  //   if (isMobile) {
  //     setSelectedBillPdf(pdfUrl);
  //     setShowPdfPopup(true);
  //   } else {
  //     setSelectedBillPdf(pdfUrl);
  //   }
  //   console.log(isMobile, "isMobile");
  // };

  const openBillPdf = (pdfUrl, e) => {
    if (e) {
      e.preventDefault();
    }

    const normalizedUrl = normalizePdfUrl(pdfUrl);
    if (!normalizedUrl) {
      console.error("Invalid PDF URL", pdfUrl);
      return;
    }

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // On mobile, show PDF in popup
      setSelectedBillPdf(null); // force re-render if same file
      setTimeout(() => {
        setSelectedBillPdf(normalizedUrl);
        setShowPdfPopup(true);
      }, 0);
    } else {
      // On desktop, show PDF inline
      setSelectedBillPdf(null); // force re-render if same file
      setTimeout(() => {
        setSelectedBillPdf(normalizedUrl);
      }, 0);
    }

    console.log(isMobile, "isMobile");
  };

  const closePdfPopup = () => {
    setShowPdfPopup(false);
    setSelectedBillPdf(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Cleanup effect to remove modal-open class when component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  const [showExportDropdown, setShowExportDropdown] = useState(false);

  const exportDropdownRef = useRef(null);

  const toggleExportDropdown = () => {
    setShowExportDropdown(!showExportDropdown);
  };

  const handleExportOption = (format) => {
    console.log(`Exporting as ${format}`);
    setShowExportDropdown(false);
    // Add your export logic here
  };

  // Handle click outside to close dropdown

  // Export dropdown component
  const ExportDropdown = () => (
    <div className="col-lg-1 col-md-2 w-100" ref={exportDropdownRef}>
      <label className="heading-color ff-heading fw500 mb0" />
      <div className="mydrop dropdown">
        <button
          className="btn btn-secondary dropdown-toggle mb-4 mt--1 w--100"
          type="button"
          onClick={toggleExportDropdown}
        >
          Export
        </button>
        <ul className={`dropdown-menu ${showExportDropdown ? "show" : ""}`}>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleExportOption("PDF");
              }}
            >
              PDF
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleExportOption("XLS");
              }}
            >
              XLS
            </a>
          </li>
        </ul>
      </div>
    </div>
  );

  // Static lists to render cards (mirrors sample table data)

  const preLegislativeList = [
    {
      id: 1,
      ref: "PLO-001",
      title: "2020-ലെ കേരള ധനവിനിയോഗ (അനധികൃത ചെലവ്) ബിൽ ഡ്രാഫ്റ്റ്",
      typeBadgeClass: "govtb",
      typeLabel: "Draft Bill",
      pubDate: "10.12.2025",
      by: "Law Department",
      closingDate: "12.12.2025",
      statusClass: "publis",
      status: "Open for Comments",
    },
    {
      id: 2,
      ref: "PLO-002",
      title:
        "The Kerala State Goods And Services Tax (Amendment) Policy Document",
      typeBadgeClass: "privateb",
      typeLabel: "Policy Document",
      pubDate: "10.12.2025",
      by: "Tax Department",
      closingDate: "12.12.2025",
      statusClass: "intros",
      status: "Under Review",
    },
    {
      id: 3,
      ref: "PLO-003",
      title:
        "2019-ലെ കേരള സഹകരണ ആശുപത്രി കോംപ്ലക്സും മെഡിക്കൽ സയൻസസ് അക്കാദമിയും അനുബന്ധ സ്ഥാപനങ്ങളും (ഏറ്റെടുക്കലും നടത്തിപ്പും) റെഗുലേഷൻ",
      typeBadgeClass: "",
      typeLabel: "",
      pubDate: "10.12.2025",
      by: "Health Department",
      closingDate: "12.12.2025",
      statusClass: "refe",
      status: "Closed",
    },
    {
      id: 4,
      ref: "PLO-004",
      title:
        "2019-ലെ കേരള വ്യവസായ ഏകജാലക ക്ലിയറൻസ് ബോർഡുകളും വ്യവസായ നഗരപ്രദേശ വികസനവും (ഭേദഗതി) ഗൈഡ്ലൈൻ",
      typeBadgeClass: "",
      typeLabel: "",
      pubDate: "10.12.2025",
      by: "Industry Department",
      closingDate: "10.12.2025",
      statusClass: "pass",
      status: "Incorporated",
    },
    {
      id: 5,
      ref: "PLO-005",
      title: "The University Laws (Amendment) Regulation, 2019",
      typeBadgeClass: "",
      typeLabel: "",
      pubDate: "10.12.2025",
      by: "Education Department",
      closingDate: "10.12.2025",
      statusClass: "assent",
      status: "Rejected",
    },
  ];

  return (
    <div className="wrapper">
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
            { name: "Niyamasabha", href: "/memberlist" },
            { name: "Bills", href: "/bills" },
          ]}
        />

        <section className="quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Bills" />

            {/* --------------------Bills procedure---------------------------------- */}
            {/* <BillsTabs /> */}

            <div className="bills-tabs-wrapper">
              <BillsTabs key="bills-tabs" />
            </div>

            {/* --------------------Bills/Ordinances/Pre-legislative---------------------------------- */}
            <div
              className="row memberPro wow fadeInUp mt10 pt0"
              data-wow-delay="300ms"
            >
              <div className="col-12">
                <div className="horiz-tab">
                  <div className="widget_list">
                    <nav>
                      <div
                        className="nav flex-row nav-tabs text-start"
                        id="nav-tab"
                        role="tablist"
                      >
                        <button
                          className={`nav-link text-start ${
                            activeMainTab === "bills" ? "active" : ""
                          }`}
                          id="nav-star-tab"
                          type="button"
                          role="tab"
                          aria-controls="nav-star"
                          aria-selected={activeMainTab === "bills"}
                          onClick={() => handleMainTabClick("bills")}
                        >
                          <span>Bills</span>
                        </button>
                        <button
                          className={`nav-link text-start ${
                            activeMainTab === "ordinances" ? "active" : ""
                          }`}
                          id="nav-unstar-tab"
                          type="button"
                          role="tab"
                          aria-controls="nav-unstar"
                          aria-selected={activeMainTab === "ordinances"}
                          onClick={() => handleMainTabClick("ordinances")}
                        >
                          <span>Ordinances</span>
                        </button>
                        <button
                          className={`nav-link text-start ${
                            activeMainTab === "pre-legislative" ? "active" : ""
                          }`}
                          id="nav-gist-tab"
                          type="button"
                          role="tab"
                          aria-controls="nav-gist"
                          aria-selected={activeMainTab === "pre-legislative"}
                          onClick={() => handleMainTabClick("pre-legislative")}
                        >
                          <span>Pre-legislative Public Opinion</span>
                        </button>
                        <button
                          className={`nav-link text-start ${
                            activeMainTab === "bills-passed" ? "active" : ""
                          }`}
                          id="nav-bills-passed-tab"
                          type="button"
                          role="tab"
                          aria-controls="nav-bills-passed"
                          aria-selected={activeMainTab === "bills-passed"}
                          onClick={() => handleMainTabClick("bills-passed")}
                        >
                          <span>Bills Passed</span>
                        </button>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>

              <div className="bill-content col-md-12 mt30 mb30 committeeDt">
                <div className="terms_condition_grid text-start">
                  <div className="tab-content" id="nav-tabContent">
                    {/* ---------------------Bills------------------------- */}
                    {activeMainTab === "bills" && (
                      <div
                        className="tab-pane fade show active"
                        id="nav-star"
                        role="tabpanel"
                        aria-labelledby="nav-star-tab"
                      >
                        <div className="grid-bill grids">
                          <Filter
                            filterKeys={[
                              "KLA",
                              "BILL_TYPE",
                              "BILL_CATEGORY",
                              "BILL_STATUS",
                              "SESSION",
                            ]}
                            overrides={filterOverrides}
                            onFiltersChange={(filters) => {
                              console.log("Bills filters changed:", filters);
                              setCurrentFilters(filters);
                            }}
                          />

                          <div className="billz c-ptag">
                            <div className="tabley">
                              <div className="mydrop dropdown">
                                <ExportDropdown />
                              </div>
                              {isLoadingBills ? (
                                <div className="text-center py-5">
                                  <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <table className="table table myTable2">
                                    <thead>
                                      <tr>
                                        <th scope="col">Sl.No</th>
                                        <th scope="col">Bill No</th>
                                        <th scope="col">Bill Title</th>
                                        <th scope="col">Date of Introduction</th>
                                        <th scope="col">Introduced By</th>
                                        <th scope="col">Assent Date</th>
                                        <th scope="col">Bill</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Bill Info</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {billsData.length > 0 ? (
                                        billsData.map((bill, index) => (
                                          <tr key={bill.id} className="debate">
                                            <td>{(billsPagination.current_page - 1) * billsPagination.items_per_page + index + 1}</td>
                                            <td>{bill.bill_no}</td>
                                            <td>
                                              {bill.bill_short_title || bill.bill_title}
                                              {bill.bill_type && (
                                                <>
                                                  <br />
                                                  <span className={bill.bill_type_badge || (bill.bill_type === "Government" ? "govtb" : "privateb")}>
                                                    {bill.bill_type} Bill
                                                  </span>
                                                </>
                                              )}
                                            </td>
                                            <td>
                                              {bill.date_of_introduction ? 
                                                new Date(bill.date_of_introduction).toLocaleDateString('en-GB', {
                                                  day: '2-digit',
                                                  month: '2-digit',
                                                  year: 'numeric'
                                                }).replace(/\//g, '.') 
                                                : '-'}
                                            </td>
                                            <td>
                                              {bill.introduced_by ? (
                                                <a href="#">{bill.introduced_by.name || bill.introduced_by}</a>
                                              ) : '-'}
                                            </td>
                                            <td>
                                              {bill.assent_date ? 
                                                new Date(bill.assent_date).toLocaleDateString('en-GB', {
                                                  day: '2-digit',
                                                  month: '2-digit',
                                                  year: 'numeric'
                                                }).replace(/\//g, '.') 
                                                : '-'}
                                            </td>
                                            <td className="text-center">
                                              {bill.bill_pdf_link ? (
                                                <a 
                                                  href={bill.bill_pdf_link}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="doci"
                                                >
                                                  <img src="/images/document.svg" alt="View PDF" />
                                                </a>
                                              ) : '-'}
                                            </td>
                                            <td>
                                              <small className={bill.status_class}>
                                                {bill.status}
                                              </small>
                                            </td>
                                            <td>
                                              <a
                                                className="viw"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  openBillInfoModal(bill, e);
                                                }}
                                              >
                                                View
                                              </a>
                                            </td>
                                          </tr>
                                        ))
                                      ) : (
                                        <tr>
                                          <td colSpan="9" className="text-center">
                                            No bills found
                                          </td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                  {billsData.length > 0 && (
                                    <div className="mbp_pagination mt30 text-center">
                                      <Pagination
                                        currentPage={billsPagination.current_page}
                                        totalPages={billsPagination.total_pages}
                                        onPageChange={() => {}}
                                        totalItems={billsPagination.total_items}
                                      />
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --------------------------Ordinances------------------------------ */}
                    {activeMainTab === "ordinances" && (
                      <div
                        className="tab-pane fade show active"
                        id="nav-unstar"
                        role="tabpanel"
                        aria-labelledby="nav-unstar-tab"
                      >
                        <div className="grid-bill grids">
                          <div className="row">
                            <div className="col-lg-8">
                              <div>
                                <div className="tab-title">
                                  <h6>Search Ordinances By Filter</h6>
                                </div>
                                <Filter
                                  filterKeys={[
                                    "KLA",
                                    "DATE",
                                    "SEARCH",
                                  ]}
                                />
                                <div className="billz c-ptag">
                                  <div className="tabley">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                      <ExportDropdown />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div className="col-lg-4 section-calendar">
                              <div className="tab-title">
                                <h6 className="mb--0 tab-section-date">
                                  <span className="section-text">
                                    Date of Promulgation
                                  </span>
                                </h6>
                              </div>
                              <div className="bg-white border rounded p-2 h--100 mb20">
                                <Calendar
                                  className="w-100"
                                  value={selectedDate}
                                  tileClassName={({ date }) => {
                                    // Check if this date matches any ordinance date
                                    const isOrdinanceDate = ordinancesDates.some(
                                      ordinanceDate => 
                                        ordinanceDate.toDateString() === date.toDateString()
                                    );
                                    return isOrdinanceDate ? "react-calendar__tile--active" : null;
                                  }}
                                  onChange={handleDateChange}
                                />
                              </div>
                            </div> */}
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              {isLoadingOrdinances ? (
                                <div className="text-center py-5">
                                  <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <table className="table table myTable2">
                                    <thead>
                                      <tr>
                                        <th scope="col">Ordinance No</th>
                                        <th scope="col">Title of the Ordinance</th>
                                        <th scope="col">Date of Promulgation</th>
                                        <th scope="col">Document</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {ordinancesData.length > 0 ? (
                                        ordinancesData.map((item) => (
                                          <tr key={item.id} className="debate">
                                            <td>{item.ordinance_no}</td>
                                            <td>{item.title}</td>
                                            <td>{new Date(item.date).toLocaleDateString('en-GB', {
                                              day: '2-digit',
                                              month: '2-digit',
                                              year: 'numeric'
                                            }).replace(/\//g, '.')}</td>
                                            <td className="text-center">
                                              <a
                                                href={item.pdf_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="doci"
                                              >
                                                <img
                                                  src="/images/document.svg"
                                                  alt="View PDF"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                        ))
                                      ) : (
                                        <tr>
                                          <td colSpan="4" className="text-center">
                                            No ordinances found
                                          </td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                  {ordinancesData.length > 0 && (
                                    <div className="mbp_pagination mt30 text-center">
                                      <Pagination
                                        currentPage={1}
                                        totalPages={Math.ceil(ordinancesData.length / 10)}
                                        onPageChange={() => {}}
                                        totalItems={ordinancesData.length}
                                      />
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --------------------------Pre-legislative Public Opinion------------------------------ */}
                    {activeMainTab === "pre-legislative" && (
                      <div
                        className="tab-pane fade show active"
                        id="nav-gist"
                        role="tabpanel"
                        aria-labelledby="nav-gist-tab"
                      >
                        <div className="grid-bill grids">
                          <div className="row">
                            <div className="col-lg-8">
                              <div>
                                <div className="tab-title">
                                  <h6>Search Pre-legislative By Filter</h6>
                                </div>
                                <Filter
                                  filterKeys={[
                                    "KLA",
                                    "SESSION",
                                    "MEMBER",
                                    "DATE",
                                    "SEARCH",
                                  ]}
                                />
                                <div className="billz c-ptag">
                                  <div className="tabley">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                      <ExportDropdown />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 section-calendar">
                              <div className="tab-title">
                                <h6 className="mb--0 tab-section-date">
                                  <span className="section-text">
                                    Section date from
                                  </span>
                                  <span className="date-range">
                                    <span
                                      style={{
                                        marginLeft: "5px",
                                        backgroundColor: "#e9e9e9",
                                        color: "black",
                                        padding: "6px 10px 4px 10px",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      05 Jul 2025
                                    </span>{" "}
                                    to
                                    <span
                                      style={{
                                        marginLeft: "5px",
                                        backgroundColor: "#e9e9e9",
                                        color: "black",
                                        padding: "6px 10px 4px 10px",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      05 Aug 2025
                                    </span>
                                  </span>
                                </h6>
                              </div>
                              <div className="bg-white border rounded p-2 h--100 mb20">
                                <Calendar
                                  className="w-100"
                                  value={selectedDate}
                                  defaultActiveStartDate={
                                    new Date("2025-07-01")
                                  }
                                  tileClassName={({ date }) => {
                                    const dateRangeText =
                                      "05-07-2025 to 05-08-2025";
                                    const [fromDateStr, toDateStr] =
                                      dateRangeText.split(" to ");
                                    const fromDate = new Date(
                                      fromDateStr.split("-").reverse().join("-")
                                    );
                                    const toDate = new Date(
                                      toDateStr.split("-").reverse().join("-")
                                    );
                                    const isInRange =
                                      date >= fromDate && date <= toDate;
                                    const july5th = new Date("2025-07-05");
                                    const isJuly5th =
                                      date.toDateString() ===
                                      july5th.toDateString();
                                    if (isJuly5th)
                                      return "react-calendar__tile--active";
                                    return isInRange
                                      ? "react-calendar__tile--range"
                                      : null;
                                  }}
                                  onChange={handleDateChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <table className="table table myTable2">
                                <thead>
                                  <tr>
                                    <th scope="col">Ordinance No</th>
                                    <th scope="col">Title of the Ordinance</th>
                                    <th scope="col">Date of Promulgation</th>
                                    <th scope="col">Document</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {preLegislativeList.map((item) => (
                                    <tr key={item.id} className="debate">
                                      <td>{item.ref}</td>
                                      <td>
                                        {item.title}
                                        {item.typeLabel && (
                                          <>
                                            <br />
                                            <span
                                              className={item.typeBadgeClass}
                                            >
                                              {item.typeLabel}
                                            </span>
                                          </>
                                        )}
                                      </td>
                                      <td>{item.pubDate}</td>
                                      <td className="text-center">
                                        <a
                                          href="#"
                                          className="doci"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            openBillPdf(dummyPdf, e);
                                          }}
                                        >
                                          <img
                                            src="/images/document.svg"
                                            alt=""
                                          />
                                        </a>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div className="mbp_pagination mt30 text-center">
                                <Pagination
                                  currentPage={1}
                                  totalPages={10}
                                  onPageChange={() => {}}
                                  totalItems={30}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --------------------------Bills Passed------------------------------ */}
                    {activeMainTab === "bills-passed" && (
                      <div
                        className="tab-pane fade show active"
                        id="nav-bills-passed"
                        role="tabpanel"
                        aria-labelledby="nav-bills-passed-tab"
                      >
                        <div className="grid-bill grids">
                          {/* Filter row */}
                          <div className="row align-items-end mb-3">
                            <div className="col-lg-3 col-md-4">
                              <label className="heading-color ff-heading fw500 mb10">
                                KLA
                              </label>
                              <select
                                className="form-select"
                                value={billsPassedKlaId}
                                onChange={(e) => {
                                  setBillsPassedKlaId(Number(e.target.value));
                                  setBillsPassedSearch("");
                                  setBillsPassedYear("");
                                  setBillsPassedPage(1);
                                }}
                              >
                                {billsKlaOptions.options.map((kla) => (
                                  <option key={kla.value} value={kla.value}>
                                    {kla.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-lg-3 col-md-4">
                              <label className="heading-color ff-heading fw500 mb10">
                                Year
                              </label>
                              <select
                                className="form-select"
                                value={billsPassedYear}
                                onChange={(e) => { setBillsPassedYear(e.target.value); setBillsPassedPage(1); }}
                              >
                                <option value="">All Years</option>
                                {[...new Set(billsPassedData.map((b) => b.year))]
                                  .sort((a, b) => b - a)
                                  .map((yr) => (
                                    <option key={yr} value={yr}>
                                      {yr}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="col-lg-4 col-md-4">
                              <label className="heading-color ff-heading fw500 mb10">
                                Search
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title or act no..."
                                value={billsPassedSearch}
                                onChange={(e) => { setBillsPassedSearch(e.target.value); setBillsPassedPage(1); }}
                              />
                            </div>
                            <div className="col-lg-2 col-md-12 mt-2 mt-lg-0">
                              <ExportDropdown />
                            </div>
                          </div>

                          {isLoadingBillsPassed ? (
                            <div className="text-center py-5">
                              <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          ) : (
                            <>
                              {/* Record count */}
                              <div className="mb-3 p-3" style={{
                                backgroundColor: "#f8f9fa",
                                borderLeft: "4px solid var(--clr--primary)",
                                borderRadius: "4px"
                              }}>
                                <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                                  {(() => {
                                    const filtered = billsPassedData.filter((b) => {
                                      const matchYear = !billsPassedYear || b.year === billsPassedYear;
                                      const matchSearch = !billsPassedSearch ||
                                        b.bill_name_eng?.toLowerCase().includes(billsPassedSearch.toLowerCase()) ||
                                        b.bill_name_mal?.includes(billsPassedSearch) ||
                                        String(b.act_no).includes(billsPassedSearch);
                                      return matchYear && matchSearch;
                                    }).sort((a, b) => Number(b.year) - Number(a.year) || Number(b.act_no) - Number(a.act_no));
                                    return `${filtered.length} record${filtered.length !== 1 ? "s" : ""} found`;
                                  })()}
                                </p>
                              </div>

                              <div className="tabley">
                                <table className="table table myTable2">
                                  <thead>
                                    <tr>
                                      <th scope="col">Sl.No</th>
                                      <th scope="col">Act No</th>
                                      <th scope="col">Bill Title (English)</th>
                                      <th scope="col">Bill Title (Malayalam)</th>
                                      <th scope="col">Year</th>
                                      <th scope="col">Document</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {(() => {
                                      const filtered = billsPassedData.filter((b) => {
                                        const matchYear = !billsPassedYear || b.year === billsPassedYear;
                                        const matchSearch = !billsPassedSearch ||
                                          b.bill_name_eng?.toLowerCase().includes(billsPassedSearch.toLowerCase()) ||
                                          b.bill_name_mal?.includes(billsPassedSearch) ||
                                          String(b.act_no).includes(billsPassedSearch);
                                        return matchYear && matchSearch;
                                      }).sort((a, b) => Number(b.year) - Number(a.year) || Number(b.act_no) - Number(a.act_no));

                                      if (filtered.length === 0) {
                                        return (
                                          <tr>
                                            <td colSpan="6" className="text-center">
                                              No bills passed found
                                            </td>
                                          </tr>
                                        );
                                      }

                                      const paginated = filtered.slice(
                                        (billsPassedPage - 1) * BILLS_PASSED_PER_PAGE,
                                        billsPassedPage * BILLS_PASSED_PER_PAGE
                                      );

                                      return paginated.map((bill, index) => (
                                        <tr key={bill.id} className="debate">
                                          <td>{(billsPassedPage - 1) * BILLS_PASSED_PER_PAGE + index + 1}</td>
                                          <td>{bill.act_no}</td>
                                          <td>{bill.bill_name_eng}</td>
                                          <td>{bill.bill_name_mal}</td>
                                          <td>{bill.year}</td>
                                          <td className="text-center">
                                            {bill.pdf_url ? (
                                              <a
                                                href={bill.pdf_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="doci"
                                              >
                                                <img
                                                  src="/images/document.svg"
                                                  alt="View PDF"
                                                />
                                              </a>
                                            ) : (
                                              "-"
                                            )}
                                          </td>
                                        </tr>
                                      ));
                                    })()}
                                  </tbody>
                                </table>
                                {/* Pagination */}
                                {(() => {
                                  const filtered = billsPassedData.filter((b) => {
                                    const matchYear = !billsPassedYear || b.year === billsPassedYear;
                                    const matchSearch = !billsPassedSearch ||
                                      b.bill_name_eng?.toLowerCase().includes(billsPassedSearch.toLowerCase()) ||
                                      b.bill_name_mal?.includes(billsPassedSearch) ||
                                      String(b.act_no).includes(billsPassedSearch);
                                    return matchYear && matchSearch;
                                  }).sort((a, b) => Number(b.year) - Number(a.year) || Number(b.act_no) - Number(a.act_no));
                                  const totalPages = Math.ceil(filtered.length / BILLS_PASSED_PER_PAGE);
                                  if (totalPages <= 1) return null;
                                  return (
                                    <div className="mbp_pagination mt30 text-center">
                                      <Pagination
                                        currentPage={billsPassedPage}
                                        totalPages={totalPages}
                                        onPageChange={(page) => {
                                          setBillsPassedPage(page);
                                          window.scrollTo({ top: 0, behavior: "smooth" });
                                        }}
                                        totalItems={filtered.length}
                                        itemsPerPage={BILLS_PASSED_PER_PAGE}
                                      />
                                    </div>
                                  );
                                })()}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Modal for Questions */}
        <Modal
          show={showPdfModal}
          onHide={closePdfModal}
          dialogClassName="modal-xl"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">
              {selectedQuestion
                ? `Question ${selectedQuestion.number} - ${selectedQuestion.title}`
                : "Question Details"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: "80vh" }}>
            {/* {selectedQuestion ? (
              <div className="pdf-viewer-container">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={dummyPdf}
                    plugins={[defaultLayoutPluginInstance]}
                    defaultScale={
                      typeof window !== 'undefined' && window.innerWidth <= 576
                        ? SpecialZoomLevel.PageFit
                        : 1
                    }
                  />
                </Worker>
              </div>
            ) : (
              <div className="text-center">
                <p>No question selected</p>
              </div>
            )} */}
            {selectedQuestion ? (
              <div className="pdf-viewer-container">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  {dummyPdf && (
                    <Viewer
                      fileUrl={dummyPdf}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  )}
                </Worker>
              </div>
            ) : (
              <div className="text-center">
                <p>No question selected</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closePdfModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Bill Information Modal */}
        <div className="modL">
          <div
            id="myModal"
            className={`modal ${showBillInfoModal ? "show" : ""}`}
          >
            <div className="modal-content">
              <span className="close-button" onClick={closeBillInfoModal}>
                &times;
              </span>
              <h2 className="bill-info-heading">BILL INFORMATION</h2>
              <div className="bill-info-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="info-item">
                      <strong>Bill Number:</strong> 259 [ Assented Bill ]
                    </div>
                    <div className="info-item">
                      <strong>KLA Number:</strong> 14
                    </div>
                    <div className="info-item">
                      <strong>Bill Title:</strong> 2020-ലെ കേരള ധനവിനിയോഗ (2-ാം
                      നമ്പർ) ബിൽ
                      <a
                        href="#"
                        className="doci"
                        onClick={(e) => {
                          e.preventDefault();
                          openBillPdf(dummyPdf, e);
                        }}
                      >
                        <img src="/images/document.svg" alt="" />
                      </a>
                    </div>
                    <div className="info-item">
                      <strong>Bill Short Title:</strong> 2020-ലെ കേരള ധനവിനിയോഗ
                      (2-ാം നമ്പർ) ബിൽ
                    </div>
                    <div className="info-item">
                      <strong>Bill Type:</strong> Government
                      <a
                        href="#"
                        className="doci"
                        onClick={(e) => {
                          e.preventDefault();
                          openBillPdf(dummyPdf, e);
                        }}
                      >
                        <img src="/images/document.svg" alt="" />
                      </a>
                    </div>
                    <div className="info-item">
                      <strong>Bill Category:</strong> Appropriation Bill
                    </div>
                    <div className="info-item">
                      <strong>Bill Introduced:</strong> 2020-03-03
                      <a
                        href="#"
                        className="doci"
                        onClick={(e) => {
                          e.preventDefault();
                          openBillPdf(dummyPdf, e);
                        }}
                      >
                        <img src="/images/document.svg" alt="" />
                      </a>
                    </div>
                    <div className="info-item">
                      <strong>Bill Passed:</strong> 2020-03-03
                    </div>
                    <div className="info-item">
                      <strong>Bill Published:</strong> 2020-03-12
                      <a
                        href="#"
                        className="doci"
                        onClick={(e) => {
                          e.preventDefault();
                          openBillPdf(dummyPdf, e);
                        }}
                      >
                        <img src="/images/document.svg" alt="" />
                      </a>
                    </div>
                    <div className="info-item">
                      <strong>Assent By:</strong> Governor [ ]
                    </div>
                    <div className="info-item">
                      <strong>Bill Act:</strong> 5 OF 2020 -
                      <a
                        href="#"
                        className="doci"
                        onClick={(e) => {
                          e.preventDefault();
                          openBillPdf(dummyPdf, e);
                        }}
                      >
                        <img src="/images/document.svg" alt="" />
                      </a>
                    </div>
                    <div className="info-item">
                      <strong>Bill Gazette:</strong> [ 2020-03-24 ]
                    </div>
                  </div>
                  <div className="col-md-6">
                    {selectedBillPdf ? (
                      <div className="bill-pdf-viewer">
                        <div className="pdf-header">
                          {/* <h4>PDF Viewer</h4> */}
                          <button
                            className="close-pdf-btn"
                            onClick={() => setSelectedBillPdf(null)}
                            title="Close PDF"
                          >
                            ×
                          </button>
                        </div>
                        {/* <div className="pdf-container">
                          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                            <Viewer fileUrl={selectedBillPdf} plugins={[defaultLayoutPluginInstance]} />
                          </Worker>
                        </div> */}
                        <div className="pdf-container">
                          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                            {selectedBillPdf && (
                              <Viewer
                                fileUrl={normalizePdfUrl(selectedBillPdf)}
                                plugins={[defaultLayoutPluginInstance]}
                                defaultScale={
                                  typeof window !== "undefined" &&
                                  window.innerWidth <= 576
                                    ? SpecialZoomLevel.PageFit
                                    : 1
                                }
                              />
                            )}
                          </Worker>
                        </div>
                      </div>
                    ) : (
                      <div className="bill-pdf-placeholder">
                        <p>Click on any PDF link to view the document here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Popup Modal for Mobile */}
        <Modal
          show={showPdfPopup}
          onHide={closePdfPopup}
          dialogClassName="modal-xl"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">PDF Document</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: "80vh" }}>
            <div className="pdf-viewer-container">
              {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={selectedBillPdf}
                  plugins={[defaultLayoutPluginInstance]}
                  defaultScale={
                    typeof window !== 'undefined' && window.innerWidth <= 576
                      ? SpecialZoomLevel.PageFit
                      : 1
                  }
                />
              </Worker> */}
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                {selectedBillPdf && (
                  <Viewer
                    fileUrl={normalizePdfUrl(selectedBillPdf)}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                )}
              </Worker>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closePdfPopup}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Bills;
