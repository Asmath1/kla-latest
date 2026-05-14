"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronRight,
  faTimes,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "../styles/Calender.css";
import { API_ENDPOINTS } from "../utils/config";
import { ensureHttps, isHttpUrl } from "../utils/urlUtils";

function Calendar({
  legendItems,
  monthsSidebarClass = "",
  monthsSidebarToggle = "",
  calendarMainContainer = "",
  calendarContainer = "",
  eventSidebarClass = "",
  customEvents = null,
  calendarHeaderMember = "",
}) {
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

   const months = [
    "ജനുവരി",
    "ഫെബ്രുവരി",
    "മാർച്ച്",
    "ഏപ്രിൽ",
    "മെയ്",
    "ജൂൺ",
    "ജൂലൈ",
    "ഓഗസ്റ്റ്",
    "സെപ്റ്റംബർ ",
    "ഒക്‌ടോബർ",
    "നവംബർ",
    "ഡിസംബർ ",
  ];


  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(months[today.getMonth()]);
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [year, setYear] = useState(today.getFullYear());
  const [showMonthsSidebar, setShowMonthsSidebar] = useState(true);
  const [showEventsSidebar, setShowEventsSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [pdfViewerSrc, setPdfViewerSrc] = useState("");
  const [calendarEvents, setCalendarEvents] = useState({});
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [apiYear, setApiYear] = useState(today.getFullYear());
  const [apiMonth, setApiMonth] = useState(today.getMonth() + 1);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const monthsSidebarRef = useRef(null);
  const navigate = useNavigate();

  // Fetch calendar events from API
  useEffect(() => {
    const fetchCalendarEvents = async () => {
      if (customEvents) {
        setCalendarEvents(customEvents);
        return;
      }

      setIsLoadingEvents(true);
      try {
        // determine month number based on the localized names array
        const monthNumber = months.indexOf(currentMonth) + 1;
        // construct endpoint: use year/month if available, otherwise fallback to current
        const url =
          typeof API_ENDPOINTS.CALENDAR_YEAR_MONTH === "function"
            ? API_ENDPOINTS.CALENDAR_YEAR_MONTH(year, monthNumber)
            : API_ENDPOINTS.CALENDAR_CURRENT;

        const response = await fetch(url);
        const result = await response.json();

        if (result?.success && result?.data) {
          const { dailyEvents, year: apiYear, month: apiMonth } = result.data;
          
          // Update year and month from API (useful if backend returns normalized values)
          setApiYear(apiYear || year);
          setApiMonth(apiMonth || monthNumber);

          // Transform API data to match component structure
          const transformedEvents = {};
          dailyEvents.forEach((dayData) => {
            const day = dayData.day;
            transformedEvents[day] = dayData.events.map((event) => ({
              type: event.type || "meeting",
              title: event.title,
              contents: event.contents?.map((content) => ({
                label: content.label,
                link: content.pdfUrl || "#",
              })),
              pdf: event.contents?.[0]?.pdfUrl || "",
            }));
          });

          setCalendarEvents(transformedEvents);
          console.log('Calendar events loaded for', year, monthNumber, transformedEvents);
        }
      } catch (error) {
        console.error("Error fetching calendar events:", error);
        // Keep empty events on error
        setCalendarEvents({});
      } finally {
        setIsLoadingEvents(false);
      }
    };

    fetchCalendarEvents();
  }, [customEvents, year, currentMonth]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        monthsSidebarRef.current &&
        !monthsSidebarRef.current.contains(event.target)
      ) {
        if (isMobile) {
          setShowMonthsSidebar(false);
        }
      }
    };

    if (showMonthsSidebar && isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMonthsSidebar, isMobile]);

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !window.initialLoadDone) {
        setShowMonthsSidebar(false);
        setShowEventsSidebar(false);
        window.initialLoadDone = true;
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const getDaysInMonth = (month, year) =>
    new Date(year, months.indexOf(month) + 1, 0).getDate();
  const getStartDayOfMonth = (month, year) =>
    new Date(year, months.indexOf(month), 1).getDay();

  const totalDays = getDaysInMonth(currentMonth, year);
  const startDay = getStartDayOfMonth(currentMonth, year);

  const dummyPdf = "/dummy.pdf";

  // Remove the defaultCalendarEvents constant as we're using API data now

  const isToday = (day) =>
    day === today.getDate() &&
    year === today.getFullYear() &&
    currentMonth === months[today.getMonth()];

  // Check if date is in the special range (Aug 8-16, 2025)
  const isInSpecialRange = (day) => {
    if (year === 2025 && currentMonth === "August") {
      return day >= 8 && day <= 16;
    }
    return false;
  };

  // Check if date is the start of special range (Aug 8, 2025)
  const isSpecialRangeStart = (day) => {
    return year === 2025 && currentMonth === "August" && day === 8;
  };

  // Check if date is the end of special range (Aug 16, 2025)
  const isSpecialRangeEnd = (day) => {
    return year === 2025 && currentMonth === "August" && day === 16;
  };

  const getEventDots = (date) => {
    if (!calendarEvents[date]) return null;
    return (
      <div className="event-dots">
        {calendarEvents[date].map((event, index) => (
          <div key={index} className={`event-dot ${event.type}`} />
        ))}
      </div>
    );
  };

  const toggleMonthsSidebar = () => setShowMonthsSidebar(!showMonthsSidebar); 
  const toggleEventsSidebar = () => {
    if (isMobile && showMonthsSidebar) setShowMonthsSidebar(false);
    setShowEventsSidebar(!showEventsSidebar);
  };

  const handlePrevYear = () => setYear((prev) => prev - 1);
  const handleNextYear = () => setYear((prev) => prev + 1);

  const defaultLegendItems = [
    // { type: "house-in-session", label: "House In Session" },
    // { type: "agenda", label: "Agenda" },
    // { type: "public-holiday", label: "Public Holiday" },
    { type: "meeting", label: "Meeting" },
    { type: "questions", label: "Questions" },
  ];

  const finalLegendItems = legendItems || defaultLegendItems;

  return (
    <section className={`calendar-main-container ${calendarMainContainer}`}>
      <div className={`calendar-container container w-100 ${calendarContainer}`}>
        <h1 className="calendar-title">
          {/* Calendar */}
          കലണ്ടർ 
          </h1>

        <div className="calendar-legend">
          {finalLegendItems.map((item, index) => (
            <div className="legend-item" key={index}>
              <div className={`legend-dot event-dot ${item.type}`}></div>                                           
              <span className="legend-text">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="calendar-wrapper">
          {showMonthsSidebar && (
            <div
              ref={monthsSidebarRef}
              className={`months-sidebar custom-scrollbar ${monthsSidebarClass} ${isMobile ? 'show' : ''}`}
            >
              <div className="sidebar-header">
                {isMobile && (
                  <button
                    className="close-sidebar-btn"
                    onClick={toggleMonthsSidebar}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
                <div className="year-selector">
                  <span className="chevron-left" onClick={handlePrevYear}>
                    &#8249;
                  </span>
                  <span className="current-year">{year}</span>
                  <span className="chevron-right" onClick={handleNextYear}>
                    &#8250;
                  </span>
                </div>
              </div>
              <div className="months-list">
                {months.map((month) => (
                  <div
                    key={month}
                    className={`month-item ${
                      month === currentMonth ? "active" : ""
                    }`}
                    onClick={() => {
                      setCurrentMonth(month);
                      if (isMobile) {
                        setShowMonthsSidebar(false);
                      }
                    }}
                  >
                    {month}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="calendar-main">
            <div 
            // className="calendar-header"
            className={`calendar-header ${calendarHeaderMember}`}>
              <button
                className={`sidebar-toggle ${monthsSidebarToggle}`}
                onClick={toggleMonthsSidebar}
              >
                <FontAwesomeIcon
                  icon={showMonthsSidebar ? faTimes : faBars}
                />
              </button>
              <h2 className="current-month">
                {currentMonth.toUpperCase()} {year}
              </h2>
              <button
                className={`sidebar-toggle ${monthsSidebarToggle}`}
                onClick={toggleEventsSidebar}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            <div className="calendar-grid">
              {isLoadingEvents && (
                <div className="calendar-loading-overlay">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="weekday">
                  {day}
                </div>
              ))}
              {Array.from({ length: startDay }).map((_, index) => (
                <div key={`empty-${index}`} className="calendar-days empty" />
              ))}
              {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
                <div
                  key={day}
                  className="calendar-days"
              
                >
                  <div
                  key={day}
                   className={`calendar-day-content ${
                    day === selectedDate ? "selected" : ""
                  } ${isToday(day) ? "today" : ""} ${
                    isInSpecialRange(day) ? "special-range" : ""
                  }`}
                  onClick={() => {
                    setSelectedDate(day);
                    if (calendarEvents[day]) {
                      setShowEventsSidebar(true);
                    }
                  }}

                  >
                    <span className="day-number">
                      {day}
                      {getEventDots(day)}
                    </span>
                    {isSpecialRangeStart(day) && (
                      <span className="special-label start-label">KLA: 15th, Session: 8</span>
                    )}
                    {isSpecialRangeEnd(day) && (
                      <span className="special-label end-label">KLA: 15th, Session: 8</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events sidebar - optimized for both desktop and mobile */}
          <div className={`events-sidebar ${eventSidebarClass} ${showEventsSidebar ? 'show' : ''}`}>
            <div
              className={`events-content px-6 ${
                eventSidebarClass === "custom-event-sidebar"
                  ? "custom-inner-events"
                  : ""
              }`}
            >
              {isMobile && (
                <button
                  className="close-sidebar-btn"
                  onClick={toggleEventsSidebar}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
              <h3 className="selected-date">
                {currentMonth} {selectedDate}, {year}
              </h3>
              <div className="events-list">
                {calendarEvents[selectedDate] ? (
                  calendarEvents[selectedDate].map((event, index) => (
                    <div key={index} className="event-item">
                      <div className={`event-indicator ${event.type}`}></div>
                      <div className="event-details">
                        <h4 className="event-title">
                          {event.title || "Meeting"}
                        </h4>
                        <div className="event-content">
                          {event.content}
                        </div>
                        {event.contents && (
                          <div className="event-description-list">
                            <ul>
                              {event.contents.map((item, idx) => (
                                <li key={idx}>
                                  <button
                                    className="pdf-link-button"
                                    onClick={() => setPdfViewerSrc(item.link || event.pdf)}
                                  >
                                    {item.label}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-events">
                    No events scheduled for this day.
                  </p>
                )}
              </div>

              {/* ---- Static Call of Attention link ---- */}
              <div
                className="mt-3 pt-3"
                style={{ borderTop: "1px solid #e8e8e8" }}
              >
                <button
                  onClick={() => navigate("/calling-attention")}
                  className="d-flex align-items-center gap-2 w-100 text-start"
                  style={{
                    background: "var(--clr--violet, #e6e1ff)",
                    border: "1px solid var(--clr--primary, #6440fb)",
                    borderRadius: 6,
                    padding: "8px 12px",
                    cursor: "pointer",
                    color: "var(--clr--primary, #6440fb)",
                    fontWeight: 600,
                    fontSize: 13,
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--clr--primary, #6440fb)",
                      flexShrink: 0,
                    }}
                  />
                  Calling Attention
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {pdfViewerSrc && (
        <div className="pdf-modal-overlay" onClick={() => setPdfViewerSrc("")}>
          <div
            className="pdf-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-pdf-modal"
              onClick={() => setPdfViewerSrc("")}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <a
              href={ensureHttps(pdfViewerSrc)}
              target="_blank"
              rel="noopener noreferrer"
              className="download-pdf-button me-auto"
            >
              <FontAwesomeIcon icon={faDownload} /> Download PDF
            </a>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={ensureHttps(pdfViewerSrc)}
                plugins={[defaultLayoutPluginInstance]}
                defaultScale={
                  typeof window !== 'undefined' && window.innerWidth <= 576
                    ? SpecialZoomLevel.PageFit
                    : 1
                }
              />
            </Worker>
          </div>
        </div>
      )}
    </section>
  );
}

export default Calendar;
