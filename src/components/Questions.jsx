// -------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import { API_ENDPOINTS } from "../utils/config";
import { ensureHttps } from "../utils/urlUtils";
import "../styles/Question.css";
import "../css/flaticon.css";
import "react-calendar/dist/Calendar.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import HomeTest from "./Header";
import { fetchAllotmentDays, fetchScheduleWebUpdation } from "../services/MasterService";
import {
  BreadcrumbNav,
  CategoriesNav,
  ExportButton,
  Filter,
  Pagination,
  SectionTitle,
  SessionCalendar,
} from "./common";

const dummyPdf = "/pdfs/sample.pdf";
const dummyPdf2 = "/pdfs/sample-2.pdf";

export const QuestionTabs = () => {
  const [activeTab, setActiveTab] = useState("rules");
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedKLA, setSelectedKLA] = useState("14th KLA");
  const [selectedSession, setSelectedSession] = useState("Session 22");
  const [selectedMember, setSelectedMember] = useState("Anoop Jacob");
  const [selectedDate, setSelectedDate] = useState("");
  const [allotmentDays, setAllotmentDays] = useState([]);
  const [loadingAllotments, setLoadingAllotments] = useState(false);
  const [scheduleWebUpdation, setScheduleWebUpdation] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Fetch allotment days when component mounts or when KLA changes
  useEffect(() => {
    let cancelled = false;
    
    const loadAllotmentDays = async () => {
      setLoadingAllotments(true);
      try {
        // Extract KLA ID from selected KLA (e.g., "15th KLA" -> 15)
        const klaMatch = selectedKLA.match(/(\d+)/);
        const klaId = klaMatch ? parseInt(klaMatch[1]) : 15;
        
        const data = await fetchAllotmentDays(klaId);
        if (!cancelled) {
          setAllotmentDays(data || []);
        }
      } catch (err) {
        console.error("Failed to load allotment days:", err);
        if (!cancelled) {
          setAllotmentDays([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingAllotments(false);
        }
      }
    };

    if (activeTab === "allotment") {
      loadAllotmentDays();
    }

    return () => {
      cancelled = true;
    };
  }, [selectedKLA, activeTab]);

  // Fetch schedule web updation when component mounts or when KLA changes
  useEffect(() => {
    let cancelled = false;
    
    const loadScheduleWebUpdation = async () => {
      setLoadingSchedule(true);
      try {
        const klaMatch = selectedKLA.match(/(\d+)/);
        const klaId = klaMatch ? parseInt(klaMatch[1]) : 15;
        
        const data = await fetchScheduleWebUpdation(klaId);
        if (!cancelled) {
          setScheduleWebUpdation(data || []);
        }
      } catch (err) {
        console.error("Failed to load schedule web updation:", err);
        if (!cancelled) {
          setScheduleWebUpdation([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingSchedule(false);
        }
      }
    };

    if (activeTab === "schedule") {
      loadScheduleWebUpdation();
    }

    return () => {
      cancelled = true;
    };
  }, [selectedKLA, activeTab]);

  const handleTabClick = (tabKey) => {
    if (tabKey === activeTab) return;
    setActiveTab(tabKey);
    // Reset filter values when changing tabs
    setSelectedKLA(tabFilterData[tabKey].kla[0]);
    setSelectedSession(tabFilterData[tabKey].session[0]);
    setSelectedMember("");
    setSelectedDate("");
  };

  const openPdf = (url) => {
    setPdfUrl(url);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setPdfUrl(null);
  };
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

    allotment: {
      kla: [
        "15th KLA",
        "14th KLA",
        "13th KLA",
        "12th KLA",
        "11th KLA",
        "10th KLA",
        "9th KLA",
      ],
      session: ["Session II", "Session III", "Session IV", "Session V"],
      member: [
        "ശ്രീ. എൻ. എസ്. രാജൻ",
        "ശ്രീ. പി. എം. ഇബ്രാഹിം",
        "ശ്രീ. എം. എം. മണി",
        "ശ്രീ. കെ. എം. ഷാജി",
        "ശ്രീ. എം. എം. ഹസ്സൻ",
      ],
      date: [
        "20-12-2025",
        "21-12-2025",
        "22-12-2025",
        "23-12-2025",
        "24-12-2025",
      ],
      dates: [
        "20.12.2025",
        "20-12-2025",
        "21 Dec 2025",
        "22 Dec 2025",
        "23 Dec 2025",
        "24 Dec 2025",
        "25 Dec 2025",
        "26 Dec 2025",
        "27 Dec 2025",
        "28 Dec 2025",
        "29 Dec 2025",
        "30 Dec 2025",
        "31 Dec 2025",
        "01 Jan 2026",
        "02 Jan 2026",
      ],
      pdfTitle:
        "Allotment of Days for Answering Questions - 15th Kla - Session 13",
    },
    ballot: {
      kla: ["16th KLA", "15th KLA", "14th KLA", "13th KLA", "12th KLA"],
      session: ["Session I", "Session II", "Session III"],
      member: [
        "ശ്രീ. എം. എം. ഹസ്സൻ",
        "ശ്രീ. കെ. എം. രാജൻ",
        "ശ്രീ. എൻ. എസ്. രാജൻ",
        "ശ്രീ. പി. എം. ഇബ്രാഹിം",
        "ശ്രീ. എം. എം. ലതീഫ്",
      ],
      date: [
        "25-12-2025",
        "26-12-2025",
        "27-12-2025",
        "28-12-2025",
        "29-12-2025",
      ],
      dates: [
        "25.12.2025",
        "25-12-2025",
        "26 Dec 2025",
        "27 Dec 2025",
        "28 Dec 2025",
        "29 Dec 2025",
        "30 Dec 2025",
        "31 Dec 2025",
        "01 Jan 2026",
        "02 Jan 2026",
        "03 Jan 2026",
        "04 Jan 2026",
        "05 Jan 2026",
        "06 Jan 2026",
        "07 Jan 2026",
      ],
      pdfTitle:
        "Ballot of Days for Answering Questions - 15th Kla - Session 13",
    },
    schedule: {
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
            <div className="grids qst mb40-md">
              <h5 className="rule-title">Rules</h5>
              <div>
                <a
                  href="#"
                  className="rul d-flex align-items-center mb20"
                  onClick={() => openPdf(dummyPdf)}
                >
                  <span>Question Rules</span>
                  <div className="imgx">
                    <img src="images/file2.svg" width={16} alt="" />
                  </div>
                </a>
                <a
                  href="#"
                  className="rul d-flex align-items-center"
                  onClick={() => openPdf(dummyPdf)}
                >
                  <span>Directions Related to Question</span>
                  <div className="imgx">
                    <img src="images/file2.svg" width={16} alt="" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        );
      case "allotment":
        return (
          <div
            className="tab-pane fade show active"
            id="nav-manageother"
            role="tabpanel"
            aria-labelledby="nav-manageother-tab"
          >
            <div className="grids fpdf qst mb40-md">
              <h5 className="rule-title">
                Allotment of Days for Answering Questions
              </h5>
              <div className="row filt mb10">
                <div className="col-md-3">
                  <div className="form-style1 selectM">
                    <label className="heading-color ff-heading fw500 mb0">
                      KLA
                    </label>
                    <div className="bootselect-multiselect">
                      <select
                        className="form-select"
                        value={selectedKLA}
                        onChange={(e) => setSelectedKLA(e.target.value)}
                      >
                        {currentFilterData.kla.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-style1 selectM">
                    <label className="heading-color ff-heading fw500 mb0">
                      Session
                    </label>
                    <div className="bootselect-multiselect">
                      <select
                        className="form-select"
                        value={selectedSession}
                        onChange={(e) => setSelectedSession(e.target.value)}
                      >
                        {currentFilterData.session.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-style1 selectM">
                    <label className="heading-color ff-heading fw500 mb0">
                      Minister
                    </label>
                    <div className="bootselect-multiselect">
                      <select
                        className="form-select"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                      >
                        <option value="">Select Minister</option>
                        {currentFilterData.member.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-style1 selectM">
                    <label className="heading-color ff-heading fw500 mb0">
                      Date
                    </label>
                    <div className="bootselect-multiselect">
                      <select
                        className="form-select"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      >
                        <option value="">Select Date</option>
                        {currentFilterData.date.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Display loading state */}
              {loadingAllotments && (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {/* Display allotment days from API */}
              {!loadingAllotments && allotmentDays.length > 0 && (
                <div className="Qstn-allotmnt">
                  {allotmentDays.map((allotment) => (
                    <a
                      key={allotment.id}
                      href="#"
                      className="rul qstn-allotment-section p-1 d-flex align-items-center w-100 justify-content-between"
                      onClick={(e) => {
                        e.preventDefault();
                        // You can add PDF URL to the API response or handle it here
                        openPdf(dummyPdf);
                      }}
                      title={allotment.description}
                    >
                      <div className="d-flex flex-column align-items-start flex-grow-1">
                        <span className="fw-bold">{allotment.title}</span>
                        <small className="text-muted">
                          {new Date(allotment.allotment_date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </small>
                      </div>
                      <div className="imgx">
                        <img src="images/file2.svg" width={16} alt="PDF" />
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* Display message when no data */}
              {!loadingAllotments && allotmentDays.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted">No allotment days available for the selected KLA.</p>
                </div>
              )}
            </div>
          </div>
        );
      case "ballot":
        return (
          <div
            className="tab-pane fade show active"
            id="nav-returrefund"
            role="tabpanel"
            aria-labelledby="nav-returrefund-tab"
          >
            <div className="grids fpdf qst mb40-md">
              <h5 className="rule-title">Ballot Chart for Questions</h5>
              <div className="row filt mb10">
                <div className="col-md-3 col-12">
                  <div className="form-style1 selectM">
                    <label className="heading-color ff-heading fw500 mb0">
                      KLA
                    </label>
                    <div className="bootselect-multiselect">
                      <select
                        className="form-select"
                        value={selectedKLA}
                        onChange={(e) => setSelectedKLA(e.target.value)}
                      >
                        {currentFilterData.kla.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-style1 selectM">
                    <label className="heading-color ff-heading fw500 mb0">
                      Session
                    </label>
                    <div className="bootselect-multiselect">
                      <select
                        className="form-select"
                        value={selectedSession}
                        onChange={(e) => setSelectedSession(e.target.value)}
                      >
                        {currentFilterData.session.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-style1 selectM">
                    <label className="heading-color ff-heading fw500 mb0">
                      Member
                    </label>
                    <div className="bootselect-multiselect">
                      <select
                        className="form-select"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                      >
                        <option value="">Select Member</option>
                        {currentFilterData.member.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-style1 selectM">
                    <label className="heading-color ff-heading fw500 mb0">
                      Date
                    </label>
                    <div className="bootselect-multiselect">
                      <select
                        className="form-select"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      >
                        <option value="">Select Date</option>
                        {currentFilterData.date.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="#"
                className="rul p-1 d-flex align-items-center w-100 justify-content-center"
                onClick={() => openPdf(dummyPdf)}
              >
                <span>
                  Ballot of Days for Answering Questions - 15th Kla - Session 13
                </span>
                <div className="imgx">
                  <img src="images/file2.svg" width={16} alt="" />
                </div>
              </a>
            </div>
          </div>
        );
      case "schedule":
        return (
          <div
            className="tab-pane fade show active"
            id="nav-covid19"
            role="tabpanel"
            aria-labelledby="nav-covid19-tab"
          >
            <div className="grids fpdf qst mb40-md">
              <h5 className="rule-title">
                Schedule for Web Updation of Questions
              </h5>
              <div className="row filt mb10">
                <div className="col-md-3">
                  <div className="form-style1 selectM">
                    <label className="heading-color ff-heading fw500 mb0">
                      KLA
                    </label>
                    <div className="bootselect-multiselect">
                      <select
                        className="form-select"
                        value={selectedKLA}
                        onChange={(e) => setSelectedKLA(e.target.value)}
                      >
                        {currentFilterData.kla.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-style1 selectM">
                    <label className="heading-color ff-heading fw500 mb0">
                      Session
                    </label>
                    <div className="bootselect-multiselect">
                      <select
                        className="form-select"
                        value={selectedSession}
                        onChange={(e) => setSelectedSession(e.target.value)}
                      >
                        {currentFilterData.session.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-style1 selectM">
                    <label className="heading-color ff-heading fw500 mb0">
                      Member
                    </label>
                    <div className="bootselect-multiselect">
                      <select
                        className="form-select"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                      >
                        <option value="">Select Member</option>
                        {currentFilterData.member.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-style1 selectM">
                    <label className="heading-color ff-heading fw500 mb0">
                      Date
                    </label>
                    <div className="bootselect-multiselect">
                      <select
                        className="form-select"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      >
                        <option value="">Select Date</option>
                        {currentFilterData.date.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Display loading state */}
              {loadingSchedule && (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {/* Display schedule web updation from API */}
              {!loadingSchedule && scheduleWebUpdation.length > 0 && (
                <div className="Qstn-allotmnt">
                  {scheduleWebUpdation.map((schedule) => (
                    <a
                      key={schedule.id}
                      href={schedule.pdf_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rul rul-1 qstn-allotment-section p-1 d-flex align-items-center w-100 justify-content-between"
                      title={schedule.session_name}
                    >
                      <div className="d-flex flex-column align-items-start flex-grow-1">
                        <span className="fw-bold">
                          Schedule for Web Updation - {schedule.session_name}
                        </span>
                        <small className="text-muted">
                          KLA {schedule.kla_id} - Session {schedule.session_no}
                        </small>
                      </div>
                      <div className="imgx">
                        <img src="images/file2.svg" width={16} alt="PDF" />
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* Display message when no data */}
              {!loadingSchedule && scheduleWebUpdation.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted">No schedule data available for the selected KLA.</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="row mb30 d-flex">
      {/* Tabs */}
      <div className="col-md-5 col-lg-5 col-xl-4">
        <div className="terms_condition_widget mb30-sm">
          <div className="widget_list">
            <nav>
              <div
                className="nav-border nav nav-tabs text-start"
                id="nav-tab"
                role="tablist"
              >
                <button
                  className={`nav-link text-start ${
                    activeTab === "rules" ? "active" : ""
                  }`}
                  id="nav-accountpayment-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-accountpayment"
                  type="button"
                  role="tab"
                  aria-controls="nav-accountpayment"
                  aria-selected={activeTab === "rules" ? "true" : "false"}
                  onClick={() => handleTabClick("rules")}
                >
                  Rules
                </button>
                <button
                  className={`nav-link text-start ${
                    activeTab === "allotment" ? "active" : ""
                  }`}
                  id="nav-manageother-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-manageother"
                  type="button"
                  role="tab"
                  aria-controls="nav-manageother"
                  aria-selected={activeTab === "allotment" ? "true" : "false"}
                  onClick={() => handleTabClick("allotment")}
                >
                  Allotment of Days for Answering Questions
                </button>
                <button
                  className={`nav-link text-start ${
                    activeTab === "ballot" ? "active" : ""
                  }`}
                  id="nav-returrefund-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-returrefund"
                  type="button"
                  role="tab"
                  aria-controls="nav-returrefund"
                  aria-selected={activeTab === "ballot" ? "true" : "false"}
                  onClick={() => handleTabClick("ballot")}
                >
                  Ballot Chart for Questions
                </button>
                <button
                  className={`nav-link text-start ${
                    activeTab === "schedule" ? "active" : ""
                  }`}
                  id="nav-covid19-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-covid19"
                  type="button"
                  role="tab"
                  aria-controls="nav-covid19"
                  aria-selected={activeTab === "schedule" ? "true" : "false"}
                  onClick={() => handleTabClick("schedule")}
                >
                  Schedule for Web Updation of Questions
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Tab Content */}
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
          <Modal.Title className="modal-title">Question Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh" }}>
          {pdfUrl && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={ensureHttps(pdfUrl)}
                plugins={[defaultLayoutPluginInstance]}
                defaultScale={
                  typeof window !== "undefined" && window.innerWidth <= 576
                    ? SpecialZoomLevel.PageFit
                    : 1
                }
              />
            </Worker>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Sample questions data
const questionsData = {
  // starred: [
  //   {
  //     id: 1,
  //     number: 458,
  //     title: "ഒരു തദ്ദേശസ്ഥാപനം ഒരു ഉല്‍പ്പന്നം പദ്ധതി",
  //     members: [
  //       "ശ്രീ. എൻ. കെ. അക്ബര്‍",
  //       "ശ്രീ വി ജോയി",
  //       "ശ്രീ. പി. മമ്മിക്കുട്ടി",
  //     ],
  //     askedBy: "ശ്രീ. കെ.എൻ. ഉണ്ണിക്കൃഷ്ണൻ",
  //     question:
  //       "താഴെ കാണുന്ന ചോദ്യങ്ങൾക്കു നിയമം, വ്യവസായം, കയർ വകുപ്പ് മന്ത്രി സദയം മറുപടി പറയാമോ?",
  //     subQuestions: [
  //       "പ്രാദേശിക ജനസമൂഹത്തിന്റെ വികസനം സാധ്യമാക്കി രാജ്യത്തിന്റെ മൊത്തത്തിലുളള വികസനം എന്ന ലക്ഷ്യത്തിലധിഷ്ഠിതമായി ഒരു തദ്ദേശസ്ഥാപനം ഒരു ഉല്‍പ്പന്നം എന്ന പദ്ധതി ആവിഷ്കരിച്ച് നടപ്പാക്കിവരുന്നുണ്ടോ; എങ്കില്‍ ഈ പദ്ധതിയുടെ പുരോഗതി വിലയിരുത്തിയിട്ടുണ്ടോ; വിശദാംശം നല്‍കുമോ;",
  //       "പ്രസ്തുത പദ്ധതി പ്രകാരം ഏത് മേഖലയിലെ സംരംഭങ്ങളെ പ്രോത്സാഹിപ്പിക്കുന്നതിനാണ് മുന്‍ഗണന നല്‍കിയിട്ടുളളതെന്ന് വ്യക്തമാക്കുമോ",
  //       "പദ്ധതി നിര്‍വ്വഹണവുമായി ബന്ധപ്പെട്ട് തദ്ദേശ സ്ഥാപനങ്ങള്‍ക്കും സംരംഭകര്‍ക്കും നല്‍കുന്ന സഹായങ്ങള്‍ എന്തൊക്കെയാണ്; വിശദമാക്കുമോ?",
  //     ],
  //     isAnswered: true,
  //   },
  //   {
  //     id: 2,
  //     number: 459,
  //     title: "കേരളത്തിലെ വിദ്യാഭ്യാസ മേഖലയിലെ പുരോഗതി",
  //     members: ["ശ്രീ. എം. കെ. മുനീർ", "ശ്രീ. പി. ടി. തോമസ്"],
  //     askedBy: "ശ്രീ. കെ. ജെ. മാക്സി",
  //     question:
  //       "കേരളത്തിലെ വിദ്യാഭ്യാസ മേഖലയിലെ പുരോഗതിയെക്കുറിച്ച് വിദ്യാഭ്യാസ മന്ത്രി വിശദമായി വിവരിക്കാമോ?",
  //     subQuestions: [
  //       "സർക്കാർ സ്കൂളുകളിലെ വിദ്യാർത്ഥികളുടെ എണ്ണം എത്രയാണ്?",
  //       "ഇ-ലേണിംഗ് സംവിധാനങ്ങൾ എത്ര സ്കൂളുകളിൽ നടപ്പിലാക്കിയിട്ടുണ്ട്?",
  //       "അധ്യാപകർക്കുള്ള പരിശീലന പരിപാടികൾ എന്തെല്ലാമാണ്?",
  //     ],
  //     isAnswered: true,
  //     isLate: true,
  //   },
  //   {
  //     id: 3,
  //     number: 460,
  //     title: "ആരോഗ്യ മേഖലയിലെ പുതിയ പദ്ധതികൾ",
  //     members: ["ശ്രീ. എസ്. ശർമ്മ", "ശ്രീ. ആർ. രാജേഷ്"],
  //     askedBy: "ശ്രീ. വി. എസ്. അച്യുതാനന്ദൻ",
  //     question:
  //       "കേരളത്തിലെ ആരോഗ്യ മേഖലയിൽ പുതിയ പദ്ധതികൾ എന്തെല്ലാമാണ് നടപ്പിലാക്കിയിട്ടുള്ളത്?",
  //     subQuestions: [
  //       "പുതിയ ആശുപത്രികൾ എത്ര നിർമ്മിച്ചിട്ടുണ്ട്?",
  //       "ആരോഗ്യ കേന്ദ്രങ്ങളുടെ എണ്ണം എത്രയാണ്?",
  //       "ഡോക്ടർമാരുടെ ഒഴിവുകൾ എത്രയാണ്?",
  //     ],
  //     isAnswered: false,
  //   },
  //   {
  //     id: 4,
  //     number: 461,
  //     title: "കാർഷിക വികസന പദ്ധതികൾ",
  //     members: ["ശ്രീ. കെ. പി. മോഹനൻ", "ശ്രീ. എം. സി. ജോസഫ്"],
  //     askedBy: "ശ്രീ. പി. കെ. കുഞ്ഞാലിക്കുട്ടി",
  //     question:
  //       "കേരളത്തിലെ കാർഷിക വികസന പദ്ധതികളെക്കുറിച്ച് കാർഷിക മന്ത്രി വിശദമായി വിവരിക്കാമോ?",
  //     subQuestions: [
  //       "കാർഷിക വായന കേന്ദ്രങ്ങൾ എത്ര സ്ഥാപിച്ചിട്ടുണ്ട്?",
  //       "കർഷകർക്ക് നൽകുന്ന സഹായങ്ങൾ എന്തെല്ലാമാണ്?",
  //       "ജൈവ കൃഷി പ്രോത്സാഹന പദ്ധതികൾ എന്തെല്ലാമാണ്?",
  //     ],
  //     isAnswered: true,
  //   },
  //   {
  //     id: 5,
  //     number: 462,
  //     title: "പരിസ്ഥിതി സംരക്ഷണ നടപടികൾ",
  //     members: ["ശ്രീ. എൻ. ജയരാജൻ", "ശ്രീ. കെ. എം. മാണി"],
  //     askedBy: "ശ്രീ. എം. വി. ഗോവിന്ദൻ മാസ്റ്റർ",
  //     question:
  //       "കേരളത്തിലെ പരിസ്ഥിതി സംരക്ഷണ നടപടികളെക്കുറിച്ച് പരിസ്ഥിതി മന്ത്രി വിശദമായി വിവരിക്കാമോ?",
  //     subQuestions: [
  //       "വനം സംരക്ഷണ പദ്ധതികൾ എന്തെല്ലാമാണ്?",
  //       "ജല സംരക്ഷണ നടപടികൾ എന്തെല്ലാമാണ്?",
  //       "ക്ലീൻ കേരള മിഷൻ പുരോഗതി എന്താണ്?",
  //     ],
  //     isAnswered: false,
  //   },
  // ],
  // unstarred: [
  //   {
  //     id: 6,
  //     number: 463,
  //     title: "ഗതാഗത മേഖലയിലെ പുതിയ പദ്ധതികൾ",
  //     members: ["ശ്രീ. എൻ. എസ്. രാജൻ", "ശ്രീ. പി. എം. ഇബ്രാഹിം"],
  //     askedBy: "ശ്രീ. കെ. എം. ജോർജ്ജ്",
  //     question: "കേരളത്തിലെ ഗതാഗത മേഖലയിൽ പുതിയ പദ്ധതികൾ എന്തെല്ലാമാണ്?",
  //     subQuestions: [
  //       "പുതിയ റോഡുകൾ എത്ര നിർമ്മിച്ചിട്ടുണ്ട്?",
  //       "പാലങ്ങളുടെ നിർമ്മാണ പുരോഗതി എന്താണ്?",
  //       "പബ്ലിക് ട്രാൻസ്പോർട്ട് സംവിധാനങ്ങൾ എങ്ങനെ മെച്ചപ്പെടുത്തിയിട്ടുണ്ട്?",
  //     ],
  //     isAnswered: false,
  //   },
  //   {
  //     id: 7,
  //     number: 464,
  //     title: "വിദ്യുതി വിതരണ മേഖല",
  //     members: ["ശ്രീ. എം. എം. മണി", "ശ്രീ. കെ. എം. ഷാജി"],
  //     askedBy: "ശ്രീ. എൻ. എം. ജോസഫ്",
  //     question: "കേരളത്തിലെ വിദ്യുതി വിതരണ മേഖലയിലെ പുരോഗതി എന്താണ്?",
  //     subQuestions: [
  //       "വിദ്യുതി ഉത്പാദന കേന്ദ്രങ്ങൾ എത്രയാണ്?",
  //       "വിദ്യുതി കട്ട് എത്ര ശതമാനം കുറച്ചിട്ടുണ്ട്?",
  //       "സോളാർ പവർ പദ്ധതികൾ എന്തെല്ലാമാണ്?",
  //     ],
  //     isAnswered: true,
  //   },
  //   {
  //     id: 8,
  //     number: 465,
  //     title: "ജല വിതരണ പദ്ധതികൾ",
  //     members: ["ശ്രീ. എം. എം. ഹസ്സൻ", "ശ്രീ. കെ. എം. രാജൻ"],
  //     askedBy: "ശ്രീ. പി. എം. ഇബ്രാഹിം",
  //     question: "കേരളത്തിലെ ജല വിതരണ പദ്ധതികളെക്കുറിച്ച് വിവരിക്കാമോ?",
  //     subQuestions: [
  //       "പുതിയ ജല ശേഖരണ കേന്ദ്രങ്ങൾ എത്ര സ്ഥാപിച്ചിട്ടുണ്ട്?",
  //       "ജല വിതരണ ശൃംഖല എത്ര കിലോമീറ്റർ വ്യാപിച്ചിരിക്കുന്നു?",
  //       "ജല ഗുണനിലവാരം മെച്ചപ്പെടുത്താനുള്ള നടപടികൾ എന്തെല്ലാമാണ്?",
  //     ],
  //     isAnswered: false,
  //   },
  //   {
  //     id: 9,
  //     number: 466,
  //     title: "ഗ്രാമീണ വികസന പദ്ധതികൾ",
  //     members: ["ശ്രീ. എം. എം. ലതീഫ്", "ശ്രീ. കെ. എം. ജോർജ്ജ്"],
  //     askedBy: "ശ്രീ. എൻ. എസ്. രാജൻ",
  //     question: "കേരളത്തിലെ ഗ്രാമീണ വികസന പദ്ധതികളെക്കുറിച്ച് വിവരിക്കാമോ?",
  //     subQuestions: [
  //       "ഗ്രാമീണ റോഡുകൾ എത്ര കിലോമീറ്റർ നിർമ്മിച്ചിട്ടുണ്ട്?",
  //       "ഗ്രാമീണ വിദ്യാഭ്യാസ കേന്ദ്രങ്ങൾ എത്രയാണ്?",
  //       "ഗ്രാമീണ ആരോഗ്യ കേന്ദ്രങ്ങൾ എത്രയാണ്?",
  //     ],
  //     isAnswered: false,
  //   },
  //   {
  //     id: 10,
  //     number: 467,
  //     title: "ശാസ്ത്ര സാങ്കേതിക വിദ്യാ വികസനം",
  //     members: ["ശ്രീ. എം. എം. ഹസ്സൻ", "ശ്രീ. കെ. എം. രാജൻ"],
  //     askedBy: "ശ്രീ. പി. എം. ഇബ്രാഹിം",
  //     question:
  //       "കേരളത്തിലെ ശാസ്ത്ര സാങ്കേതിക വിദ്യാ വികസനത്തെക്കുറിച്ച് വിവരിക്കാമോ?",
  //     subQuestions: [
  //       "സ്റ്റാർട്ടപ്പ് കേന്ദ്രങ്ങൾ എത്ര സ്ഥാപിച്ചിട്ടുണ്ട്?",
  //       "ഡിജിറ്റൽ ഇന്ത്യ പദ്ധതിയുടെ പുരോഗതി എന്താണ്?",
  //       "ഇ-ഗവൺമെന്റ് സേവനങ്ങൾ എത്രയാണ്?",
  //     ],
  //     isAnswered: true,
  //   },
  //   {
  //     id: 11,
  //     number: 468,
  //     title: "വിദ്യുതി വിതരണ മേഖല",
  //     members: ["ശ്രീ. എം. എം. മണി", "ശ്രീ. കെ. എം. ഷാജി"],
  //     askedBy: "ശ്രീ. എൻ. എം. ജോസഫ്",
  //     question: "കേരളത്തിലെ വിദ്യുതി വിതരണ മേഖലയിലെ പുരോഗതി എന്താണ്?",
  //     subQuestions: [
  //       "വിദ്യുതി ഉത്പാദന കേന്ദ്രങ്ങൾ എത്രയാണ്?",
  //       "വിദ്യുതി കട്ട് എത്ര ശതമാനം കുറച്ചിട്ടുണ്ട്?",
  //       "സോളാർ പവർ പദ്ധതികൾ എന്തെല്ലാമാണ്?",
  //     ],
  //     isAnswered: true,
  //   },
  //   {
  //     id: 12,
  //     number: 469,
  //     title: "ജല വിതരണ പദ്ധതികൾ",
  //     members: ["ശ്രീ. എം. എം. ഹസ്സൻ", "ശ്രീ. കെ. എം. രാജൻ"],
  //     askedBy: "ശ്രീ. പി. എം. ഇബ്രാഹിം",
  //     question: "കേരളത്തിലെ ജല വിതരണ പദ്ധതികളെക്കുറിച്ച് വിവരിക്കാമോ?",
  //     subQuestions: [
  //       "പുതിയ ജല ശേഖരണ കേന്ദ്രങ്ങൾ എത്ര സ്ഥാപിച്ചിട്ടുണ്ട്?",
  //       "ജല വിതരണ ശൃംഖല എത്ര കിലോമീറ്റർ വ്യാപിച്ചിരിക്കുന്നു?",
  //       "ജല ഗുണനിലവാരം മെച്ചപ്പെടുത്താനുള്ള നടപടികൾ എന്തെല്ലാമാണ്?",
  //     ],
  //     isAnswered: true,
  //   },
  //   {
  //     id: 13,
  //     number: 470,
  //     title: "ജല വിതരണ പദ്ധതികൾ",
  //     members: ["ശ്രീ. എം. എം. ഹസ്സൻ", "ശ്രീ. കെ. എം. രാജൻ"],
  //     askedBy: "ശ്രീ. പി. എം. ഇബ്രാഹിം",
  //     question: "കേരളത്തിലെ ജല വിതരണ പദ്ധതികളെക്കുറിച്ച് വിവരിക്കാമോ?",
  //     subQuestions: [
  //       "പുതിയ ജല ശേഖരണ കേന്ദ്രങ്ങൾ എത്ര സ്ഥാപിച്ചിട്ടുണ്ട്?",
  //       "ജല വിതരണ ശൃംഖല എത്ര കിലോമീറ്റർ വ്യാപിച്ചിരിക്കുന്നു?",
  //       "ജല ഗുണനിലവാരം മെച്ചപ്പെടുത്താനുള്ള നടപടികൾ എന്തെല്ലാമാണ്?",
  //     ],
  //     isAnswered: true,
  //   },
  // ],
  // shortnotice: [
  //   {
  //     id: 11,
  //     number: 468,
  //     title: "അടിയന്തിര ആരോഗ്യ സംഘടനകൾ",
  //     members: ["ശ്രീ. എം. എം. ഹസ്സൻ", "ശ്രീ. കെ. എം. രാജൻ"],
  //     askedBy: "ശ്രീ. പി. എം. ഇബ്രാഹിം",
  //     question: "കേരളത്തിലെ അടിയന്തിര ആരോഗ്യ സംഘടനകളെക്കുറിച്ച് വിവരിക്കാമോ?",
  //     subQuestions: [
  //       "അടിയന്തിര ആരോഗ്യ കേന്ദ്രങ്ങൾ എത്രയാണ്?",
  //       "ആംബുലൻസ് സേവനങ്ങൾ എത്രയാണ്?",
  //       "അടിയന്തിര ഫോൺ നമ്പറുകൾ എന്തെല്ലാമാണ്?",
  //     ],
  //     isAnswered: false,
  //   },
  //   {
  //     id: 12,
  //     number: 469,
  //     title: "അടിയന്തിര ഗതാഗത സംവിധാനങ്ങൾ",
  //     members: ["ശ്രീ. എൻ. എസ്. രാജൻ", "ശ്രീ. പി. എം. ഇബ്രാഹിം"],
  //     askedBy: "ശ്രീ. കെ. എം. ജോർജ്ജ്",
  //     question:
  //       "കേരളത്തിലെ അടിയന്തിര ഗതാഗത സംവിധാനങ്ങളെക്കുറിച്ച് വിവരിക്കാമോ?",
  //     subQuestions: [
  //       "അടിയന്തിര റോഡ് റിപ്പയർ സംവിധാനങ്ങൾ എന്തെല്ലാമാണ്?",
  //       "അടിയന്തിര ഗതാഗത നിയന്ത്രണ സംവിധാനങ്ങൾ എന്തെല്ലാമാണ്?",
  //       "അടിയന്തിര ഗതാഗത ആശയവിനിമയ സംവിധാനങ്ങൾ എന്തെല്ലാമാണ്?",
  //     ],
  //     isAnswered: false,
  //   },
  //   {
  //     id: 13,
  //     number: 470,
  //     title: "അടിയന്തിര ആശ്വാസ സംവിധാനങ്ങൾ",
  //     members: ["ശ്രീ. എം. എം. ലതീഫ്", "ശ്രീ. കെ. എം. ജോർജ്ജ്"],
  //     askedBy: "ശ്രീ. എൻ. എസ്. രാജൻ",
  //     question:
  //       "കേരളത്തിലെ അടിയന്തിര ആശ്വാസ സംവിധാനങ്ങളെക്കുറിച്ച് വിവരിക്കാമോ?",
  //     subQuestions: [
  //       "അടിയന്തിര ആശ്വാസ കേന്ദ്രങ്ങൾ എത്രയാണ്?",
  //       "അടിയന്തിര ഭക്ഷണ വിതരണ സംവിധാനങ്ങൾ എന്തെല്ലാമാണ്?",
  //       "അടിയന്തിര ആശ്വാസ ഫണ്ട് എത്രയാണ്?",
  //     ],
  //     isAnswered: false,
  //   },
  //   {
  //     id: 14,
  //     number: 471,
  //     title: "അടിയന്തിര ആശയവിനിമയ സംവിധാനങ്ങൾ",
  //     members: ["ശ്രീ. എം. എം. ഹസ്സൻ", "ശ്രീ. കെ. എം. രാജൻ"],
  //     askedBy: "ശ്രീ. പി. എം. ഇബ്രാഹിം",
  //     question:
  //       "കേരളത്തിലെ അടിയന്തിര ആശയവിനിമയ സംവിധാനങ്ങളെക്കുറിച്ച് വിവരിക്കാമോ?",
  //     subQuestions: [
  //       "അടിയന്തിര ആശയവിനിമയ കേന്ദ്രങ്ങൾ എത്രയാണ്?",
  //       "അടിയന്തിര ആശയവിനിമയ ഫോൺ നമ്പറുകൾ എന്തെല്ലാമാണ്?",
  //       "അടിയന്തിര ആശയവിനിമയ സംവിധാനങ്ങൾ എങ്ങനെ പ്രവർത്തിക്കുന്നു?",
  //     ],
  //     isAnswered: false,
  //   },
  //   {
  //     id: 15,
  //     number: 472,
  //     title: "അടിയന്തിര സുരക്ഷാ സംവിധാനങ്ങൾ",
  //     members: ["ശ്രീ. എൻ. എസ്. രാജൻ", "ശ്രീ. പി. എം. ഇബ്രാഹിം"],
  //     askedBy: "ശ്രീ. കെ. എം. ജോർജ്ജ്",
  //     question:
  //       "കേരളത്തിലെ അടിയന്തിര സുരക്ഷാ സംവിധാനങ്ങളെക്കുറിച്ച് വിവരിക്കാമോ?",
  //     subQuestions: [
  //       "അടിയന്തിര സുരക്ഷാ കേന്ദ്രങ്ങൾ എത്രയാണ്?",
  //       "അടിയന്തിര സുരക്ഷാ ഫോഴ്സ് എത്രയാണ്?",
  //       "അടിയന്തിര സുരക്ഷാ ഉപകരണങ്ങൾ എന്തെല്ലാമാണ്?",
  //     ],
  //     isAnswered: false,
  //   },
  // ],
};

// const allowedActiveDates = [
//   "2025-07-05",
//   "2025-07-06",
//   "2025-07-09",
//   "2025-07-12",
//   "2025-07-13",
//   "2025-07-30",
//   "2025-08-05",
// ];

// const meetingDates = ["2025-07-09", "2025-07-30"];

// Question card component
// Function to convert index to English letter in Malayalam script
const getEnglishLetterInMalayalam = (index) => {
  const englishLettersInMalayalam = [
    "എ",
    "ബി",
    "സി",
    "ഡി",
    "ഇ",
    "എഫ്",
    "ജി",
    "എച്ച്",
    "ഐ",
    "ജെ",
    "കെ",
    "എൽ",
    "എം",
    "എൻ",
    "ഒ",
    "പി",
    "ക്യു",
    "ആർ",
    "എസ്",
    "ടി",
    "യു",
    "വി",
    "ഡബ്ല്യു",
    "എക്സ്",
    "വൈ",
    "സെഡ്",
  ];
  return englishLettersInMalayalam[index] || String.fromCharCode(97 + index);
};

const QuestionCard = ({ question, onPdfClick, isStarredTab }) => (
  <div className="card mb-3">
    <div className="card-header">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (question.isAnswered) {
            onPdfClick(question);
          }
        }}
      >
        {question.title}
      </a>

      <div className="late-section">
        {question.isAnswered && question.isLate && (
          <span className="late-answered">Late Answered</span>
        )}

        <button
          className={`btn ${question.isAnswered ? "answer" : "notanswer"}`}
          onClick={(e) => {
            e.preventDefault();
            if (question.isAnswered) {
              onPdfClick(question);
            }
          }}
        >
          <img
            src={`images/${question.isAnswered ? "chk.svg" : "cross.svg"}`}
            width={16}
            alt=""
          />
          &nbsp; {question.isAnswered ? "Answered" : "Not Answered"}
        </button>
      </div>
    </div>
    <div className="card-body">
      <div className="qs">
        <p className="qno">
          {isStarredTab && question.isAnswered && (
            <img src="images/star.svg" width={10} alt="" />
          )}
          <span> {question.number}.</span>
        </p>
        <div className="subi">
          {/* <div id="qstnAskedTo">
             {question.members.map((member, index) => (
            <h6 key={index}>{member}</h6>
          ))}
          <h6 style={{ whiteSpace: "normal", marginBottom: "4px" }}>
              <span style={{ display: "inline", fontWeight: 500 }}>
                {question.askedBy}
              </span>
              {question.askedTo && (
                <span style={{ display: "inline", color: "#6c757d" }}>
                  &nbsp;:&nbsp;{question.askedTo}
                </span>
              )}
            </h6>
          </div> */}

          <div id="qstnAskedTo">
            {question.members &&
              question.members.map((member, index) => (
                <h6
                  key={index}
                  style={{ whiteSpace: "normal", marginBottom: "4px" }}
                >
                  {member}
                  {index === question.members.length - 1 && question.askedTo ? (
                    <span style={{ display: "inline", color: "#6c757d" }}>
                      &nbsp;:&nbsp;{question.askedTo}
                    </span>
                  ) : (
                    ","
                  )}
                </h6>
              ))}
          </div>

          <div className="below">
            {/* If there are no subQuestions, render the main question like a single sub-question
                so it appears with the letter prefix and h5 styling. Add a small non-breaking
                space before the letter to simulate a tab/indent per the request. */}
            {!question.subQuestions || question.subQuestions.length === 0 ? (
              (() => {
                // Try to split the main question text into subparts using Malayalam markers
                // like (എ) (ബി) (സി) (ഡി) or 'എ.' etc. We'll support a few common separators.
                const text = String(question.question || "");
                // Attempt a Unicode-aware split on common Malayalam markers: എ, ബി, സി, ഡി
                // e.g. '(എ) text (ബി) text' -> ['എ',' text ','ഡി',' text'] etc.
                // Split strictly on markers of the form '(എ)', '(ബി)', '(സി)', '(ഡി)'.
                // This avoids breaking other Malayalam characters.
                const parts = text
                  .split(/\(\s*(?:എ|ബി|സി|ഡി)\s*\)/u)
                  .map((s) => s.trim())
                  .filter(Boolean);

                if (parts.length > 1) {
                  return parts.map((part, idx) => (
                    <div key={idx} className="sub-q">
                      <p>( {getEnglishLetterInMalayalam(idx)} )</p>
                      <h5>{part}</h5>
                    </div>
                  ));
                }

                // Fallback: render the whole question as single sub-question
                return (
                  <div className="sub-q">
                    <p>
                      {"\u00A0\u00A0"}( {getEnglishLetterInMalayalam(0)} )
                    </p>
                    <h5>{question.question}</h5>
                  </div>
                );
              })()
            ) : (
              <span>{question.question}</span>
            )}
          </div>

          {question.subQuestions &&
            question.subQuestions.length > 0 &&
            question.subQuestions.map((subQ, index) => (
              <div key={index} className="sub-q">
                <p>( {getEnglishLetterInMalayalam(index)} )</p>
                <h5>{subQ}</h5>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
);

const Questions = () => {
  const [activeQuestionTab, setActiveQuestionTab] = useState("starred");
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [questionsApiData, setQuestionsApiData] = useState(null);
  const [klaId, setKlaId] = useState(14);
  const [klaOptions, setKlaOptions] = useState([]);
  const [sessionOptions, setSessionOptions] = useState([]);
  const [sessionNo, setSessionNo] = useState(null);
  const [sessionIdFrom, setSessionIdFrom] = useState(null);
  const [sessionIdTo, setSessionIdTo] = useState(null);
  const [sittingDate, setSittingDate] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessionStartDate, setSessionStartDate] = useState(null);
  const [sessionEndDate, setSessionEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState("starred");
  // Guard: true while auto-selecting session after KLA change — prevents
  // fetchQuestions from firing with sessionNo=null during the transition
  const [sessionReady, setSessionReady] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQuestionsPage = currentQuestions.slice(startIndex, endIndex);
  const [meetingDates, setMeetingDates] = useState([]);
  const [allowedActiveDates, setAllowedActiveDates] = useState([]);
  // Cached response from kla-sessions-with-members — used for KLA list,
  // session options, and calendar dates without extra API calls.
  const [allKlaSessions, setAllKlaSessions] = useState([]);
  // Active member/minister filter values (name strings)
  const [selectedMember, setSelectedMember] = useState("Aisha Potty");
  const [selectedMinister, setSelectedMinister] = useState("");
  // Track whether the member/minister options effect has run at least once
  // so we don't wipe the default selection on initial load
  const memberOptionsInitialized = React.useRef(false);
  // Dynamic member/minister options derived from allKlaSessions for the current KLA
  const [memberOptions, setMemberOptions] = useState([]);
  const [ministerOptions, setMinisterOptions] = useState([]);

  // When session dates load, move the calendar to the session start date
  useEffect(() => {
    if (sessionStartDate) {
      const d = new Date(sessionStartDate);
      if (!Number.isNaN(d.getTime())) setSelectedDate(d);
    }
  }, [sessionStartDate]);

  // When KLA changes: reset everything, then auto-select the latest session.
  // Sets sessionReady=false while resolving so fetchQuestions waits.
  // Uses cached allKlaSessions — no extra API call needed.
  useEffect(() => {
    let cancelled = false;
    setSessionReady(false);
    setSessionNo(null);
    setSessionStartDate(null);
    setSessionEndDate(null);
    setMeetingDates([]);
    setAllowedActiveDates([]);
    setQuestionsApiData(null);
    setCurrentQuestions([]);

    const autoSelectLatestSession = () => {
      // Wait until allKlaSessions is populated
      if (!allKlaSessions.length) {
        // Will re-run when allKlaSessions loads (dependency below)
        setSessionReady(true);
        return;
      }

      const klaEntry = allKlaSessions.find((k) => Number(k.kla_id) === Number(klaId));
      const sessions = klaEntry?.sessions || [];

      if (sessions.length === 0) {
        setSessionReady(true);
        return;
      }

      // Pick the session with the highest session_no (latest)
      const latest = sessions.reduce((max, s) => {
        return Number(s.session_no) > Number(max.session_no) ? s : max;
      }, sessions[0]);

      const latestNo = Number(latest.session_no);
      if (!cancelled && !Number.isNaN(latestNo)) {
        setSessionNo(latestNo);
      }
      if (!cancelled) setSessionReady(true);
    };

    autoSelectLatestSession();
    return () => { cancelled = true; };
  }, [klaId, allKlaSessions]);

  const closePdfModal = () => {
    setShowPdfModal(false);
    setSelectedQuestion(null);
  };
  const handleMainTabClick = (tabKey) => {
    setActiveMainTab(tabKey);
    const dataKey = tabKey === "short-notice" ? "shortnotice" : tabKey;
    setActiveQuestionTab(dataKey);

    const source = questionsApiData || questionsData;
    if (dataKey === "starred") {
      const allStarred = Array.isArray(source.starred) ? source.starred : [];
      const starred =
        sessionNo == null ? allStarred : allStarred.filter((q) => q.isAnswered);
      setCurrentQuestions(starred);
    } else {
      const list = Array.isArray(source[dataKey]) ? source[dataKey] : [];
      setCurrentQuestions(list);
    }
    setCurrentPage(1);
  };

  // Single fetch from kla-sessions-with-members — provides both KLA list and
  // per-KLA session options without extra round-trips.

  useEffect(() => {
    let cancelled = false;
    const loadKlaSessionsWithMembers = async () => {
      try {
        const res = await fetch("https://api.niyamasabha.in/api/kla-sessions-with-members");
        const json = await res.json();
        if (cancelled) return;
        const data = Array.isArray(json?.data) ? json.data : [];
        setAllKlaSessions(data);

        // Build KLA dropdown options from the response
        const opts = data.map((k) => ({
          value: k.kla_id,
          label: k.kla_name || `KLA ${k.kla_id}`,
        }));
        setKlaOptions(opts);
      } catch (err) {
        console.error("Failed to load kla-sessions-with-members", err);
      }
    };
    loadKlaSessionsWithMembers();
    return () => { cancelled = true; };
  }, []); // fetch once on mount

  // Whenever klaId changes, derive session options from the cached data
  useEffect(() => {
    if (!allKlaSessions.length || klaId == null) return;

    const klaEntry = allKlaSessions.find((k) => Number(k.kla_id) === Number(klaId));
    const sessions = klaEntry?.sessions || [];

    const formatDate = (dateStr) => {
      if (!dateStr) return null;
      const d = new Date(dateStr);
      if (Number.isNaN(d.getTime())) return null;
      return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    };

    const raw = sessions.map((s) => {
      const num = s.session_no ?? null;
      const value = num != null && !Number.isNaN(Number(num)) ? Number(num) : String(num);
      const start = formatDate(s.startdate);
      const end   = formatDate(s.enddate);
      const dateRange = start && end ? ` (${start} – ${end})` : "";
      const label = `Session ${num}${dateRange}`;
      return { value, label };
    });

    // Deduplicate and sort numerically
    const map = new Map();
    for (const opt of raw) {
      if (!map.has(opt.value)) map.set(opt.value, opt);
    }
    const deduped = Array.from(map.values()).sort((a, b) => {
      const an = typeof a.value === "number" ? a.value : Number(a.value);
      const bn = typeof b.value === "number" ? b.value : Number(b.value);
      if (!Number.isNaN(an) && !Number.isNaN(bn)) return an - bn;
      return String(a.label).localeCompare(String(b.label));
    });
    setSessionOptions(deduped);
  }, [klaId, allKlaSessions]);

  // Derive member and minister options from cached allKlaSessions for the current KLA.
  // Members are KLA-level (not session-specific); ministers are also KLA-level.
  useEffect(() => {
    if (!allKlaSessions.length || klaId == null) {
      setMemberOptions([]);
      setMinisterOptions([]);
      return;
    }

    const klaEntry = allKlaSessions.find((k) => Number(k.kla_id) === Number(klaId));

    // Members: deduplicate by name, sort alphabetically
    const rawMembers = (klaEntry?.members || [])
      .filter((m) => m.name)
      .map((m) => ({ value: m.name, label: m.name }));
    const memberMap = new Map();
    for (const opt of rawMembers) {
      if (!memberMap.has(opt.value)) memberMap.set(opt.value, opt);
    }
    setMemberOptions(
      Array.from(memberMap.values()).sort((a, b) =>
        a.label.localeCompare(b.label)
      )
    );

    // Ministers: deduplicate by member_name, sort alphabetically
    const rawMinisters = (klaEntry?.ministers || [])
      .filter((m) => m.member_name)
      .map((m) => ({ value: m.member_name, label: m.member_name }));
    const ministerMap = new Map();
    for (const opt of rawMinisters) {
      if (!ministerMap.has(opt.value)) ministerMap.set(opt.value, opt);
    }
    setMinisterOptions(
      Array.from(ministerMap.values()).sort((a, b) =>
        a.label.localeCompare(b.label)
      )
    );

    // Reset selections when KLA changes — but preserve the default on first load
    if (memberOptionsInitialized.current) {
      setSelectedMember("");
      setSelectedMinister("");
    } else {
      memberOptionsInitialized.current = true;
    }
  }, [klaId, allKlaSessions]);

  useEffect(() => {
    // Don't fetch questions until the auto-select has resolved a sessionNo
    if (!sessionReady) return;

    let aborted = false;
    // ensure we only auto-sync klaId from API once to avoid loops
    const initialKlaSynced = { current: false };
    
    const fetchQuestions = async () => {
      try {
        let normalized;
        
        // Use separate API for KLA 15 — pass session_no so the API filters server-side
        if (klaId === 15) {
          const params15 = new URLSearchParams();
          if (sessionNo != null) params15.set("session_no", String(sessionNo));
          if (sittingDate) params15.set("sitting_date", String(sittingDate));
          const url15 = `${API_ENDPOINTS.KLA15_QUESTIONS}${params15.toString() ? `?${params15}` : ""}`;
          const resp = await fetch(url15);
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          const payload = await resp.json();
          if (aborted) return;

          // Handle KLA 15 API response structure
          if (payload.status && payload.data) {
            normalized = payload.data;
          } else {
            normalized = { starred: [], unstarred: [], shortnotice: [] };
          }
        } else {
          // Use original API for other KLAs
          const params = new URLSearchParams();
          if (klaId != null) params.set("kla_id", String(klaId));
          if (sessionNo != null) params.set("session_no", String(sessionNo));
          else params.set("session_no", "0");
          if (sessionIdFrom != null)
            params.set("session_idfrom", String(sessionIdFrom));
          if (sessionIdTo != null)
            params.set("session_idto", String(sessionIdTo));
          if (sittingDate) params.set("sitting_date", String(sittingDate));

          const tryUrl = (extraParams) =>
            `${API_ENDPOINTS.KLA_QUESTIONS}?${extraParams.toString()}`;

          // First attempt: include session_no (0 for All)
          let resp = await fetch(tryUrl(params));
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          let payload = await resp.json();
          if (aborted) return;

          const normalize = (p) => {
            if (Array.isArray(p)) return { unstarred: p };
            if (p && typeof p === "object")
              return p.data && typeof p.data === "object" ? p.data : p;
            return { unstarred: [] };
          };

          normalized = normalize(payload);

          // If we tried session_no=0 (All) and got no items back, retry *without* session_no
          const totalCount =
            (normalized.starred?.length || 0) +
            (normalized.unstarred?.length || 0) +
            (normalized.shortnotice?.length || 0);
          if (totalCount === 0 && sessionNo == null) {
            // remove session_no and retry
            const params2 = new URLSearchParams();
            if (klaId != null) params2.set("kla_id", String(klaId));
            if (sessionIdFrom != null)
              params2.set("session_idfrom", String(sessionIdFrom));
            if (sessionIdTo != null)
              params2.set("session_idto", String(sessionIdTo));
            if (sittingDate) params2.set("sitting_date", String(sittingDate));
            const resp2 = await fetch(tryUrl(params2));
            if (resp2.ok) {
              const payload2 = await resp2.json();
              if (aborted) return;
              normalized = normalize(payload2);
            }
          }
        }

        setQuestionsApiData(normalized);

        // Auto-sync klaId to data if returned questions belong to a different kla and we haven't synced yet
        try {
          if (!initialKlaSynced.current) {
            const lists = [
              normalized.starred || [],
              normalized.unstarred || [],
              normalized.shortnotice || [],
            ];
            let firstQ = null;
            for (const list of lists) {
              if (Array.isArray(list) && list.length) {
                firstQ = list[0];
                break;
              }
            }
            if (
              firstQ &&
              firstQ.kla_id != null &&
              Number(firstQ.kla_id) !== Number(klaId)
            ) {
              setKlaId(Number(firstQ.kla_id));
            }
            initialKlaSynced.current = true;
          }
        } catch {
          // ignore
        }
      } catch (err) {
        // swallow error and keep using bundled static data; log for debugging
        console.error("Failed to load questions API", err);
      }
    };

    fetchQuestions();
    return () => {
      aborted = true;
    };
  }, [klaId, sessionNo, sittingDate, sessionIdFrom, sessionIdTo]);

  const handleFiltersChange = (values) => {
    // KLA parsing (accept multiple shapes emitted by Filter)
    const raw = values?.KLA;
    if (raw != null) {
      // If it's an object with .value, prefer that
      if (typeof raw === "object") {
        if (Array.isArray(raw) && raw.length > 0) {
          const first = raw[0];
          const val = typeof first === "object" ? first.value : first;
          if (val != null) setKlaId(Number(val));
        } else if (raw.value != null) {
          setKlaId(Number(raw.value));
        }
      } else {
        const n = Number(raw);
        if (!Number.isNaN(n)) setKlaId(n);
        else {
          const m = String(raw).match(/(\d{1,3})/);
          if (m) setKlaId(Number(m[1]));
        }
      }
    }

    // Session / session number (Filter may emit SESSION or SESSION_TYPE)
    const sessionRaw = values?.SESSION || values?.SESSION_TYPE;
    if (sessionRaw != null) {
      let sn = null;
      // treat empty string ("All") as no selection
      if (sessionRaw === "") {
        sn = null;
      } else if (typeof sessionRaw === "object") {
        const candidate = Array.isArray(sessionRaw)
          ? sessionRaw[0]
          : sessionRaw;
        const v = candidate && (candidate.value ?? candidate);
        if (v === "" || v == null) {
          sn = null;
        } else {
          const parsed = Number(v);
          if (!Number.isNaN(parsed)) sn = parsed;
          else {
            const mm = String(v).match(/(\d{1,3})/);
            if (mm) sn = Number(mm[1]);
          }
        }
      } else {
        if (String(sessionRaw).trim() === "") {
          sn = null;
        } else {
          const parsed = Number(sessionRaw);
          if (!Number.isNaN(parsed)) sn = parsed;
          else {
            const mm = String(sessionRaw).match(/(\d{1,3})/);
            if (mm) sn = Number(mm[1]);
          }
        }
      }
      setSessionNo(sn);
    }

    // Sitting date (FILTER_REGISTRY 'DATE' uses date input -> YYYY-MM-DD)
    const dateRaw = values?.DATE;
    if (dateRaw != null) {
      if (typeof dateRaw === "string") setSittingDate(dateRaw);
      else if (typeof dateRaw === "object" && dateRaw.value)
        setSittingDate(String(dateRaw.value));
      else setSittingDate("");
    }

    // Member filter
    const memberRaw = values?.MEMBER;
    const memberValue = (() => {
      if (memberRaw == null) return "";
      if (Array.isArray(memberRaw)) {
        const first = memberRaw[0];
        return first && typeof first === "object"
          ? first.value ?? first.label ?? ""
          : first;
      }
      if (typeof memberRaw === "object") return memberRaw.value ?? memberRaw.label ?? "";
      return memberRaw;
    })();
    setSelectedMember(memberValue ? String(memberValue) : "");

    // Minister filter
    const ministerRaw = values?.MINISTER;
    const ministerValue = (() => {
      if (ministerRaw == null) return "";
      if (Array.isArray(ministerRaw)) {
        const first = ministerRaw[0];
        return first && typeof first === "object"
          ? first.value ?? first.label ?? ""
          : first;
      }
      if (typeof ministerRaw === "object") return ministerRaw.value ?? ministerRaw.label ?? "";
      return ministerRaw;
    })();
    setSelectedMinister(ministerValue ? String(ministerValue) : "");

    console.log(ministerValue, "ministerrrrrr");
    

    // Try to extract a session id range if the filter provides multiple values
    // Accept shapes: array [from,to], object { from, to } or string "1-3"
    const sessionRangeRaw =
      values?.SESSION_RANGE || values?.SESSION_IDS || values?.SESSION;
    if (sessionRangeRaw != null) {
      let from = null;
      let to = null;
      if (Array.isArray(sessionRangeRaw)) {
        from = Number(sessionRangeRaw[0]);
        to = Number(sessionRangeRaw[1] ?? sessionRangeRaw[0]);
      } else if (typeof sessionRangeRaw === "object") {
        // Could be { from: x, to: y } or an option object
        if (sessionRangeRaw.from != null || sessionRangeRaw.to != null) {
          from =
            sessionRangeRaw.from != null ? Number(sessionRangeRaw.from) : null;
          to = sessionRangeRaw.to != null ? Number(sessionRangeRaw.to) : from;
        } else {
          const v = sessionRangeRaw.value ?? sessionRangeRaw;
          const m = String(v).match(/(\d+)(?:\s*-\s*(\d+))?/);
          if (m) {
            from = Number(m[1]);
            to = m[2] ? Number(m[2]) : from;
          }
        }
      } else if (typeof sessionRangeRaw === "string") {
        const m = String(sessionRangeRaw).match(/(\d+)(?:\s*-\s*(\d+))?/);
        if (m) {
          from = Number(m[1]);
          to = m[2] ? Number(m[2]) : from;
        }
      }

      if (!Number.isNaN(from) && from != null) setSessionIdFrom(from);
      else setSessionIdFrom(null);
      if (!Number.isNaN(to) && to != null) setSessionIdTo(to);
      else setSessionIdTo(null);
    }
  };

  // When API data arrives or when the activeMainTab changes, update the
  // currently visible questions list so UI reflects either the API result or
  // the bundled fallback data.
  useEffect(() => {
    const source = questionsApiData || questionsData;
    // helper to filter by sessionNo (if provided) and dedupe by id
    const filterAndDedupe = (arr) => {
      const filtered = (arr || []).filter(Boolean).filter((q) => {
        if (sessionNo == null) return true;
        const v = q?.session_id ?? q?.session_no ?? null;
        return v != null && Number(v) === Number(sessionNo);
      });
      const map = new Map();
      for (const q of filtered) {
        if (q.id == null) continue;
        if (!map.has(q.id)) map.set(q.id, q);
      }
      return Array.from(map.values());
    };

    const applyQuestionFilters = (questions) => {
      const normalizedMember = String(selectedMember || "").trim().toLowerCase();
      const normalizedMinister = String(selectedMinister || "").trim().toLowerCase();

      let filtered = filterAndDedupe(questions);

      if (normalizedMember) {
        filtered = filtered.filter((q) => {
          const rawMembers = q?.members;
          const members = Array.isArray(rawMembers)
            ? rawMembers
            : typeof rawMembers === "string"
            ? [rawMembers]
            : [];
          return members.some((m) =>
            String(m || "").trim().toLowerCase().includes(normalizedMember)
          );
        });
      }

      if (normalizedMinister) {
        filtered = filtered.filter((q) => {
          const askedTo = String(q?.askedTo || "").trim().toLowerCase();
          return askedTo.includes(normalizedMinister);
        });
      }

      return filtered;
    };

    // when 'all' main tab is selected, merge all lists and deduplicate by id, then apply session filter
    if (activeMainTab === "all") {
      const lists = [
        source.starred || [],
        source.unstarred || [],
        source.shortnotice || [],
      ];
      const mergedList = [];
      for (const l of lists) mergedList.push(...(Array.isArray(l) ? l : []));
      const merged = applyQuestionFilters(mergedList);
      setCurrentQuestions(merged);
    } else {
      const dataKey =
        activeMainTab === "short-notice" ? "shortnotice" : activeMainTab;
      if (dataKey === "starred") {
        const allStarred = Array.isArray(source.starred) ? source.starred : [];
        // If Session filter is 'All' (sessionNo == null) show ALL starred questions.
        // If sessionNo is provided, show starred questions matching that session (answered or not).
        const starred = applyQuestionFilters(allStarred);
        setCurrentQuestions(starred);
      } else {
        const list = Array.isArray(source[dataKey]) ? source[dataKey] : [];
        const filtered = applyQuestionFilters(list);
        setCurrentQuestions(filtered);
      }
    }
    setCurrentPage(1);
  }, [questionsApiData, activeMainTab, sessionNo, selectedMember, selectedMinister]);

  // Derive SESSION options from questions API data (unique session_id values)
  const sessionOptionsFromQuestions = React.useMemo(() => {
    const src = questionsApiData || questionsData;
    // gather all session_id/session_no values from starred/unstarred/shortnotice
    const lists = [
      src.starred || [],
      src.unstarred || [],
      src.shortnotice || [],
    ];
    const ids = new Set();
    for (const list of lists) {
      for (const q of list) {
        const v = q?.session_id ?? q?.session_no ?? null;
        if (v != null) ids.add(Number(v));
      }
    }
    const arr = Array.from(ids)
      .filter((n) => !Number.isNaN(n))
      .sort((a, b) => a - b);
    return arr.map((n) => ({ value: n, label: String(n) }));
  }, [questionsApiData]);

  // final session options: prefer kla-sessions API, fall back to sessionOptionsFromQuestions
  const finalSessionOptions = sessionOptions.length
    ? sessionOptions
    : sessionOptionsFromQuestions;

  const questionFilterOverrides = {
    MEMBER: memberOptions,
    MINISTER: ministerOptions,
  };

  // Calendar date change handler
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Pagination helpers
  const totalPages = Math.ceil(currentQuestions.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 3) end = 4;
      if (currentPage >= totalPages - 2) start = totalPages - 3;
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  // Open question PDF
  const handleQuestionPdfClick = (question) => {
    setSelectedQuestion(question);
    setShowPdfModal(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Derive session start/end dates and sitting dates from cached allKlaSessions.
  // No extra API call — data is already available from kla-sessions-with-members.
  useEffect(() => {
    if (!klaId || !sessionNo || sessionNo === "All") {
      setSessionStartDate(null);
      setSessionEndDate(null);
      setMeetingDates([]);
      setAllowedActiveDates([]);
      return;
    }

    const klaEntry = allKlaSessions.find((k) => Number(k.kla_id) === Number(klaId));
    const sessions = klaEntry?.sessions || [];

    const matched = sessions.find((s) => Number(s.session_no) === Number(sessionNo));

    if (!matched) {
      setSessionStartDate(null);
      setSessionEndDate(null);
      setMeetingDates([]);
      setAllowedActiveDates([]);
      return;
    }

    // Start / end dates
    setSessionStartDate(matched.startdate || null);
    setSessionEndDate(matched.enddate || null);

    // Sitting dates from the cached response
    const sitting = Array.isArray(matched.sitting_dates)
      ? matched.sitting_dates.filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      : [];

    setMeetingDates(sitting);
    setAllowedActiveDates(sitting);
  }, [klaId, sessionNo, allKlaSessions]);

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
            { name: "Niyamasabha", href: "/memberlist" },
            { name: "Questions", href: "/questions" },
          ]}
        />

        <section className="quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Questions" />

            {/* --------------------Question procedure---------------------------------- */}
            <QuestionTabs />

            {/* --------------------starred/unstarred---------------------------------- */}
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
                            activeMainTab === "starred" ? "active" : ""
                          }`}
                          id="nav-star-tab"
                          type="button"
                          role="tab"
                          aria-controls="nav-star"
                          aria-selected={activeMainTab === "starred"}
                          onClick={() => handleMainTabClick("starred")}
                        >
                          <span>Starred Questions</span>
                        </button>
                        <button
                          className={`nav-link text-start ${
                            activeMainTab === "unstarred" ? "active" : ""
                          }`}
                          id="nav-unstar-tab"
                          type="button"
                          role="tab"
                          aria-controls="nav-unstar"
                          aria-selected={activeMainTab === "unstarred"}
                          onClick={() => handleMainTabClick("unstarred")}
                        >
                          <span>Unstarred Questions</span>
                        </button>
                        <button
                          className={`nav-link text-start ${
                            activeMainTab === "short-notice" ? "active" : ""
                          }`}
                          id="nav-short-tab"
                          type="button"
                          role="tab"
                          aria-controls="nav-short"
                          aria-selected={activeMainTab === "short-notice"}
                          onClick={() => handleMainTabClick("short-notice")}
                        >
                          <span>Short Notice Questions</span>
                        </button>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt30 committeeDt">
                <div className="terms_condition_grid text-start">
                  <div className="tab-content" id="nav-tabContent">
                    {activeMainTab === "starred" && (
                      <div
                        className="tab-pane fade show active"
                        id="nav-star"
                        role="tabpanel"
                        aria-labelledby="nav-star-tab"
                      >
                        <div className="question grids starr">
                          <div className="row">
                            <div className="col-lg-8">
                              <div className="tab-title">
                                <h6>Search By Filter</h6>
                              </div>

                              <Filter
                                filterKeys={[
                                  "KLA",
                                  "SESSION_TYPE",
                                  "MEMBER",
                                  "MINISTER",
                                  "SEARCH",
                                  "DATE",
                                ]}
                                onFiltersChange={handleFiltersChange}
                                overrides={{
                                  KLA: {
                                    options: klaOptions,
                                    defaultValue: klaId,
                                  },
                                  SESSION_TYPE: {
                                    defaultValue: sessionNo ?? "",
                                    options: [
                                      { value: "", label: "All" },
                                      ...(finalSessionOptions || []),
                                    ],
                                  },
                                  ...questionFilterOverrides,
                                }}
                              />
                              <ExportButton />
                            </div>

                            {/* Calendar Section - 4 columns */}
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
                              {/* {sessionStartDate && sessionEndDate && (
                                <div className="section-text mt-2">
                                  <span className="fw500">
                                    Section date from{" "}
                                    <strong>{sessionStartDate}</strong> to{" "}
                                    <strong>{sessionEndDate}</strong>
                                  </span>
                                </div>
                              )} */}
                            </div>
                          </div>
                          <div className="c-ptag">
                            {/* <div className="dates mb-4">... */}
                            <div className="ques">
                              {currentQuestionsPage.length > 0 ? (
                                currentQuestionsPage.map((question) => (
                                  <QuestionCard
                                    key={question.id}
                                    question={question}
                                    onPdfClick={handleQuestionPdfClick}
                                    isStarredTab={
                                      activeQuestionTab === "starred"
                                    }
                                  />
                                ))
                              ) : (
                                <div className="no-questions text-center p-4">
                                  <p className="mb-0">
                                    No questions found for the selected session.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {totalPages > 1 && (
                            <Pagination
                              currentPage={currentPage}
                              totalPages={totalPages}
                              onPageChange={handlePageChange}
                              totalItems={currentQuestions.length}
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {activeMainTab === "unstarred" && (
                      <div
                        className="tab-pane fade show active"
                        id="nav-unstar"
                        role="tabpanel"
                        aria-labelledby="nav-unstar-tab"
                      >
                        <div className="question grids starr">
                          <div className="row">
                            {/* Filter Section - 8 columns */}
                            <div className="col-lg-8">
                              <div className="tab-title">
                                <h6>Search By Filter</h6>
                              </div>

                              <Filter
                                filterKeys={[
                                  "KLA",
                                  "SESSION_TYPE",
                                  "MEMBER",
                                  "MINISTER",
                                  "SEARCH",
                                  "DATE",
                                  "ANSWER_TYPE",
                                ]}
                                onFiltersChange={handleFiltersChange}
                                overrides={{
                                  KLA: {
                                    options: klaOptions,
                                    defaultValue: klaId,
                                  },
                                  SESSION_TYPE: {
                                    defaultValue: sessionNo ?? "",
                                    options: [
                                      { value: "", label: "All" },
                                      ...(finalSessionOptions || []),
                                    ],
                                  },
                                  ...questionFilterOverrides,
                                }}
                              />
                              <ExportButton />
                            </div>

                            {/* Calendar Section - 4 columns */}
                            <div className="col-lg-4 section-calendar">
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
                          </div>
                          <div className="c-ptag">
                            {/* <div className="dates mb-4">
                          {currentFilterData.dates.map((date, index) => (
                            <a key={index} href="#" className={`card ${date === '13-12-2025' ? 'active' : ''}`}>
                              {date}
                            </a>
                          ))}
                        </div> */}
                            <div className="ques">
                              {currentQuestionsPage.map((question) => (
                                <QuestionCard
                                  key={question.id}
                                  question={question}
                                  onPdfClick={handleQuestionPdfClick}
                                  isStarredTab={activeQuestionTab === "starred"}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="mbp_pagination mt30 text-center mb-4">
                            <ul className="page_navigation">
                              <li
                                className={`page-item ${
                                  currentPage === 1 ? "disabled" : ""
                                }`}
                              >
                                <a
                                  className="page-link"
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1)
                                      handlePageChange(currentPage - 1);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faAngleLeft}
                                    color="#222222"
                                  />
                                </a>
                              </li>

                              {getPageNumbers().map((page, index) => (
                                <li
                                  key={index}
                                  className={`page-item ${
                                    page === currentPage ? "active" : ""
                                  } ${
                                    page === "..."
                                      ? "d-none d-sm-inline-block"
                                      : ""
                                  }`}
                                  aria-current={
                                    page === currentPage ? "page" : undefined
                                  }
                                >
                                  {page === "..." ? (
                                    <a className="page-link" href="#">
                                      ...
                                    </a>
                                  ) : (
                                    <a
                                      className="page-link"
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(page);
                                      }}
                                    >
                                      {page}{" "}
                                      {page === currentPage && (
                                        <span className="sr-only">
                                          (current)
                                        </span>
                                      )}
                                    </a>
                                  )}
                                </li>
                              ))}

                              <li
                                className={`page-item ${
                                  currentPage === totalPages ? "disabled" : ""
                                }`}
                              >
                                <a
                                  className="page-link"
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages)
                                      handlePageChange(currentPage + 1);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faAngleRight}
                                    color="#222222"
                                  />
                                </a>
                              </li>
                            </ul>
                            <p className="mt10 mb-0 pagination_page_count text-center">
                              {startIndex + 1} –{" "}
                              {Math.min(endIndex, currentQuestions.length)} of{" "}
                              {currentQuestions.length}
                            </p>
                            {/* <p className="mt5 mb-0 text-center text-muted">
                          Page {currentPage} of {totalPages}
                        </p> */}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeMainTab === "short-notice" && (
                      <div
                        className="tab-pane fade show active"
                        id="nav-short"
                        role="tabpanel"
                        aria-labelledby="nav-short-tab"
                      >
                        <div className="question grids starr">
                          <div className="row">
                            {/* Filter Section - 8 columns */}
                            <div className="col-lg-8">
                              <div className="tab-title">
                                <h6>Search By Filter</h6>
                              </div>

                              <Filter
                                filterKeys={[
                                  "KLA",
                                  "SESSION_TYPE",
                                  "MEMBER",
                                  "MINISTER",
                                  "SEARCH",
                                ]}
                                onFiltersChange={handleFiltersChange}
                                overrides={{
                                  KLA: {
                                    options: klaOptions,
                                    defaultValue: klaId,
                                  },
                                  SESSION_TYPE: {
                                    defaultValue: sessionNo ?? "",
                                    options: [
                                      { value: "", label: "All" },
                                      ...(finalSessionOptions || []),
                                    ],
                                  },
                                  ...questionFilterOverrides,
                                }}
                              />
                              <ExportButton />
                            </div>

                            {/* Calendar Section - 4 columns */}
                            <div className="col-lg-4 section-calendar">
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
                          </div>
                          <div className="c-ptag">
                            {/* <div className="dates mb-4">
                          {currentFilterData.dates.map((date, index) => (
                            <a key={index} href="#" className={`card ${date === '13-12-2025' ? 'active' : ''}`}>
                              {date}
                            </a>
                          ))}
                        </div> */}
                            <div className="ques">
                              {currentQuestionsPage.map((question) => (
                                <QuestionCard
                                  key={question.id}
                                  question={question}
                                  onPdfClick={handleQuestionPdfClick}
                                  isStarredTab={activeQuestionTab === "starred"}
                                />
                              ))}
                            </div>
                          </div>
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
            {selectedQuestion ? (
              <div className="pdf-viewer-container">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={ensureHttps(
                      selectedQuestion.attachments &&
                      Array.isArray(selectedQuestion.attachments) &&
                      selectedQuestion.attachments.length > 0
                        ? selectedQuestion.attachments[0]
                        : dummyPdf2
                    )}
                    plugins={[defaultLayoutPluginInstance]}
                  />
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
      </div>
    </div>
  );
};

export default Questions;

// -------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import Calendar from "react-calendar";
// import "../styles/Question.css";
// import "../css/flaticon.css";
// import "react-calendar/dist/Calendar.css";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import HomeTest from "./Header";
// import { fetchKlaList, fetchKlaSessions } from "../services/MasterService";
// import { BreadcrumbNav, CategoriesNav, ExportButton, Filter, Pagination, SectionTitle } from "./common";

// const dummyPdf = "/pdfs/sample.pdf";
// const dummyPdf2 = "/pdfs/sample-2.pdf";

// export const QuestionTabs = () => {
//   const [activeTab, setActiveTab] = useState("rules");
//   const [showModal, setShowModal] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [selectedKLA, setSelectedKLA] = useState("16th KLA");
//   const [selectedSession, setSelectedSession] = useState("Session 1");
//   const [selectedMember, setSelectedMember] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");

//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   const handleTabClick = (tabKey) => {
//     if (tabKey === activeTab) return;
//     setActiveTab(tabKey);
//     // Reset filter values when changing tabs
//     setSelectedKLA(tabFilterData[tabKey].kla[0]);
//     setSelectedSession(tabFilterData[tabKey].session[0]);
//     setSelectedMember("");
//     setSelectedDate("");
//   };

//   const openPdf = (url) => {
//     setPdfUrl(url);
//     setShowModal(true);
//   };
//   const closeModal = () => {
//     setShowModal(false);
//     setPdfUrl(null);
//   };
//   const tabFilterData = {
//     rules: {
//       kla: [
//         "16th KLA",
//         "15th KLA",
//         "14th KLA",
//         "13th KLA",
//         "12th KLA",
//         "11th KLA",
//         "10th KLA",
//       ],
//       session: ["Session 1", "Session 2", "Session 3", "Session 4"],
//       member: [
//         "ശ്രീ. എൻ. കെ. അക്ബര്‍",
//         "ശ്രീ വി ജോയി",
//         "ശ്രീ. പി. മമ്മിക്കുട്ടി",
//         "ശ്രീ. എം. കെ. മുനീർ",
//         "ശ്രീ. പി. ടി. തോമസ്",
//       ],
//       date: [
//         "13-12-2025",
//         "14-12-2025",
//         "15-12-2025",
//         "16-12-2025",
//         "17-12-2025",
//       ],
//       dates: [
//         "12.12.2025",
//         "13-12-2025",
//         "13 Dec 2025",
//         "14 Dec 2025",
//         "15 Dec 2025",
//         "16 Dec 2025",
//         "18 Dec 2025",
//         "19 Dec 2025",
//         "21 Dec 2025",
//         "23 Dec 2025",
//         "24 Dec 2025",
//         "25 Dec 2025",
//         "26 Dec 2025",
//         "27 Dec 2025",
//         "28 Dec 2025",
//       ],
//       pdfTitle: "Question Rules",
//     },

//     allotment: {
//       kla: [
//         "15th KLA",
//         "14th KLA",
//         "13th KLA",
//         "12th KLA",
//         "11th KLA",
//         "10th KLA",
//         "9th KLA",
//       ],
//       session: ["Session II", "Session III", "Session IV", "Session V"],
//       member: [
//         "ശ്രീ. എൻ. എസ്. രാജൻ",
//         "ശ്രീ. പി. എം. ഇബ്രാഹിം",
//         "ശ്രീ. എം. എം. മണി",
//         "ശ്രീ. കെ. എം. ഷാജി",
//         "ശ്രീ. എം. എം. ഹസ്സൻ",
//       ],
//       date: [
//         "20-12-2025",
//         "21-12-2025",
//         "22-12-2025",
//         "23-12-2025",
//         "24-12-2025",
//       ],
//       dates: [
//         "20.12.2025",
//         "20-12-2025",
//         "21 Dec 2025",
//         "22 Dec 2025",
//         "23 Dec 2025",
//         "24 Dec 2025",
//         "25 Dec 2025",
//         "26 Dec 2025",
//         "27 Dec 2025",
//         "28 Dec 2025",
//         "29 Dec 2025",
//         "30 Dec 2025",
//         "31 Dec 2025",
//         "01 Jan 2026",
//         "02 Jan 2026",
//       ],
//       pdfTitle:
//         "Allotment of Days for Answering Questions - 15th Kla - Session 13",
//     },
//     ballot: {
//       kla: ["16th KLA", "15th KLA", "14th KLA", "13th KLA", "12th KLA"],
//       session: ["Session I", "Session II", "Session III"],
//       member: [
//         "ശ്രീ. എം. എം. ഹസ്സൻ",
//         "ശ്രീ. കെ. എം. രാജൻ",
//         "ശ്രീ. എൻ. എസ്. രാജൻ",
//         "ശ്രീ. പി. എം. ഇബ്രാഹിം",
//         "ശ്രീ. എം. എം. ലതീഫ്",
//       ],
//       date: [
//         "25-12-2025",
//         "26-12-2025",
//         "27-12-2025",
//         "28-12-2025",
//         "29-12-2025",
//       ],
//       dates: [
//         "25.12.2025",
//         "25-12-2025",
//         "26 Dec 2025",
//         "27 Dec 2025",
//         "28 Dec 2025",
//         "29 Dec 2025",
//         "30 Dec 2025",
//         "31 Dec 2025",
//         "01 Jan 2026",
//         "02 Jan 2026",
//         "03 Jan 2026",
//         "04 Jan 2026",
//         "05 Jan 2026",
//         "06 Jan 2026",
//         "07 Jan 2026",
//       ],
//       pdfTitle:
//         "Ballot of Days for Answering Questions - 15th Kla - Session 13",
//     },
//     schedule: {
//       kla: [
//         "14th KLA",
//         "13th KLA",
//         "12th KLA",
//         "11th KLA",
//         "10th KLA",
//         "9th KLA",
//         "8th KLA",
//       ],
//       session: ["Session III", "Session IV", "Session V", "Session VI"],
//       member: [
//         "ശ്രീ. കെ. എം. ജോർജ്ജ്",
//         "ശ്രീ. എൻ. എം. ജോസഫ്",
//         "ശ്രീ. പി. എം. ഇബ്രാഹിം",
//         "ശ്രീ. എം. എം. ഹസ്സൻ",
//         "ശ്രീ. കെ. എം. രാജൻ",
//       ],
//       date: [
//         "30-12-2025",
//         "31-12-2025",
//         "01-01-2026",
//         "02-01-2026",
//         "03-01-2026",
//       ],
//       dates: [
//         "30.12.2025",
//         "30-12-2025",
//         "31 Dec 2025",
//         "01 Jan 2026",
//         "02 Jan 2026",
//         "03 Jan 2026",
//         "04 Jan 2026",
//         "05 Jan 2026",
//         "06 Jan 2026",
//         "07 Jan 2026",
//         "08 Jan 2026",
//         "09 Jan 2026",
//         "10 Jan 2026",
//         "11 Jan 2026",
//         "12 Jan 2026",
//       ],
//       pdfTitle:
//         "Schedule of Days for Answering Questions - 15th Kla - Session 13",
//     },
//   };

//   const currentFilterData = tabFilterData[activeTab];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "rules":
//         return (
//           <div
//             className="tab-pane fade show active"
//             id="nav-accountpayment"
//             role="tabpanel"
//             aria-labelledby="nav-accountpayment-tab"
//           >
//             <div className="grids qst mb40-md">
//               <h5 className="rule-title">Rules</h5>
//               <div>
//                 <a
//                   href="#"
//                   className="rul d-flex align-items-center mb20"
//                   onClick={() => openPdf(dummyPdf)}
//                 >
//                   <span>Question Rules</span>
//                   <div className="imgx">
//                     <img src="images/file2.svg" width={16} alt="" />
//                   </div>
//                 </a>
//                 <a
//                   href="#"
//                   className="rul d-flex align-items-center"
//                   onClick={() => openPdf(dummyPdf)}
//                 >
//                   <span>Directions Related to Question</span>
//                   <div className="imgx">
//                     <img src="images/file2.svg" width={16} alt="" />
//                   </div>
//                 </a>
//               </div>
//             </div>
//           </div>
//         );
//       case "allotment":
//         return (
//           <div
//             className="tab-pane fade show active"
//             id="nav-manageother"
//             role="tabpanel"
//             aria-labelledby="nav-manageother-tab"
//           >
//             <div className="grids fpdf qst mb40-md">
//               <h5 className="rule-title">
//                 Allotment of Days for Answering Questions
//               </h5>
//               <div className="row filt mb10">
//                 <div className="col-md-3">
//                   <div className="form-style1 selectM">
//                     <label className="heading-color ff-heading fw500 mb0">
//                       KLA
//                     </label>
//                     <div className="bootselect-multiselect">
//                       <select
//                         className="form-select"
//                         value={selectedKLA}
//                         onChange={(e) => setSelectedKLA(e.target.value)}
//                       >
//                         {currentFilterData.kla.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="form-style1 selectM">
//                     <label className="heading-color ff-heading fw500 mb0">
//                       Session
//                     </label>
//                     <div className="bootselect-multiselect">
//                       <select
//                         className="form-select"
//                         value={selectedSession}
//                         onChange={(e) => setSelectedSession(e.target.value)}
//                       >
//                         {currentFilterData.session.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="form-style1 selectM">
//                     <label className="heading-color ff-heading fw500 mb0">
//                       Member
//                     </label>
//                     <div className="bootselect-multiselect">
//                       <select
//                         className="form-select"
//                         value={selectedMember}
//                         onChange={(e) => setSelectedMember(e.target.value)}
//                       >
//                         <option value="">Select Member</option>
//                         {currentFilterData.member.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="form-style1 selectM">
//                     <label className="heading-color ff-heading fw500 mb0">
//                       Date
//                     </label>
//                     <div className="bootselect-multiselect">
//                       <select
//                         className="form-select"
//                         value={selectedDate}
//                         onChange={(e) => setSelectedDate(e.target.value)}
//                       >
//                         <option value="">Select Date</option>
//                         {currentFilterData.date.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <a
//                 href="#"
//                 className="rul p-1 d-flex align-items-center w-100 justify-content-center"
//                 onClick={() => openPdf(dummyPdf)}
//               >
//                 <span>
//                   Allotment of Days for Answering Questions - 15th Kla - Session
//                   13
//                 </span>
//                 <div className="imgx">
//                   <img src="images/file2.svg" width={16} alt="" />
//                 </div>
//               </a>
//             </div>
//           </div>
//         );
//       case "ballot":
//         return (
//           <div
//             className="tab-pane fade show active"
//             id="nav-returrefund"
//             role="tabpanel"
//             aria-labelledby="nav-returrefund-tab"
//           >
//             <div className="grids fpdf qst mb40-md">
//               <h5 className="rule-title">Ballot Chart for Questions</h5>
//               <div className="row filt mb10">
//                 <div className="col-md-3">
//                   <div className="form-style1 selectM">
//                     <label className="heading-color ff-heading fw500 mb0">
//                       KLA
//                     </label>
//                     <div className="bootselect-multiselect">
//                       <select
//                         className="form-select"
//                         value={selectedKLA}
//                         onChange={(e) => setSelectedKLA(e.target.value)}
//                       >
//                         {currentFilterData.kla.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="form-style1 selectM">
//                     <label className="heading-color ff-heading fw500 mb0">
//                       Session
//                     </label>
//                     <div className="bootselect-multiselect">
//                       <select
//                         className="form-select"
//                         value={selectedSession}
//                         onChange={(e) => setSelectedSession(e.target.value)}
//                       >
//                         {currentFilterData.session.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="form-style1 selectM">
//                     <label className="heading-color ff-heading fw500 mb0">
//                       Member
//                     </label>
//                     <div className="bootselect-multiselect">
//                       <select
//                         className="form-select"
//                         value={selectedMember}
//                         onChange={(e) => setSelectedMember(e.target.value)}
//                       >
//                         <option value="">Select Member</option>
//                         {currentFilterData.member.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="form-style1 selectM">
//                     <label className="heading-color ff-heading fw500 mb0">
//                       Date
//                     </label>
//                     <div className="bootselect-multiselect">
//                       <select
//                         className="form-select"
//                         value={selectedDate}
//                         onChange={(e) => setSelectedDate(e.target.value)}
//                       >
//                         <option value="">Select Date</option>
//                         {currentFilterData.date.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <a
//                 href="#"
//                 className="rul p-1 d-flex align-items-center w-100 justify-content-center"
//                 onClick={() => openPdf(dummyPdf)}
//               >
//                 <span>
//                   Ballot of Days for Answering Questions - 15th Kla - Session 13
//                 </span>
//                 <div className="imgx">
//                   <img src="images/file2.svg" width={16} alt="" />
//                 </div>
//               </a>
//             </div>
//           </div>
//         );
//       case "schedule":
//         return (
//           <div
//             className="tab-pane fade show active"
//             id="nav-covid19"
//             role="tabpanel"
//             aria-labelledby="nav-covid19-tab"
//           >
//             <div className="grids fpdf qst mb40-md">
//               <h5 className="rule-title">
//                 Schedule for Web Updation of Questions
//               </h5>
//               <div className="row filt mb10">
//                 <div className="col-md-3">
//                   <div className="form-style1 selectM">
//                     <label className="heading-color ff-heading fw500 mb0">
//                       KLA
//                     </label>
//                     <div className="bootselect-multiselect">
//                       <select
//                         className="form-select"
//                         value={selectedKLA}
//                         onChange={(e) => setSelectedKLA(e.target.value)}
//                       >
//                         {currentFilterData.kla.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="form-style1 selectM">
//                     <label className="heading-color ff-heading fw500 mb0">
//                       Session
//                     </label>
//                     <div className="bootselect-multiselect">
//                       <select
//                         className="form-select"
//                         value={selectedSession}
//                         onChange={(e) => setSelectedSession(e.target.value)}
//                       >
//                         {currentFilterData.session.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="form-style1 selectM">
//                     <label className="heading-color ff-heading fw500 mb0">
//                       Member
//                     </label>
//                     <div className="bootselect-multiselect">
//                       <select
//                         className="form-select"
//                         value={selectedMember}
//                         onChange={(e) => setSelectedMember(e.target.value)}
//                       >
//                         <option value="">Select Member</option>
//                         {currentFilterData.member.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="form-style1 selectM">
//                     <label className="heading-color ff-heading fw500 mb0">
//                       Date
//                     </label>
//                     <div className="bootselect-multiselect">
//                       <select
//                         className="form-select"
//                         value={selectedDate}
//                         onChange={(e) => setSelectedDate(e.target.value)}
//                       >
//                         <option value="">Select Date</option>
//                         {currentFilterData.date.map((option, index) => (
//                           <option key={index} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <a
//                 href="#"
//                 className="rul p-1 d-flex align-items-center w-100 justify-content-center"
//                 onClick={() => openPdf(dummyPdf)}
//               >
//                 <span>
//                   Schedule of Days for Answering Questions - 15th Kla - Session
//                   13
//                 </span>
//                 <div className="imgx">
//                   <img src="images/file2.svg" width={16} alt="" />
//                 </div>
//               </a>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="row mb30 d-flex">
//       {/* Tabs */}
//       <div className="col-md-5 col-lg-5 col-xl-4">
//         <div className="terms_condition_widget mb30-sm">
//           <div className="widget_list">
//             <nav>
//               <div
//                 className="nav-border nav nav-tabs text-start"
//                 id="nav-tab"
//                 role="tablist"
//               >
//                 <button
//                   className={`nav-link text-start ${
//                     activeTab === "rules" ? "active" : ""
//                   }`}
//                   id="nav-accountpayment-tab"
//                   data-bs-toggle="tab"
//                   data-bs-target="#nav-accountpayment"
//                   type="button"
//                   role="tab"
//                   aria-controls="nav-accountpayment"
//                   aria-selected={activeTab === "rules" ? "true" : "false"}
//                   onClick={() => handleTabClick("rules")}
//                 >
//                   Rules
//                 </button>
//                 <button
//                   className={`nav-link text-start ${
//                     activeTab === "allotment" ? "active" : ""
//                   }`}
//                   id="nav-manageother-tab"
//                   data-bs-toggle="tab"
//                   data-bs-target="#nav-manageother"
//                   type="button"
//                   role="tab"
//                   aria-controls="nav-manageother"
//                   aria-selected={activeTab === "allotment" ? "true" : "false"}
//                   onClick={() => handleTabClick("allotment")}
//                 >
//                   Allotment of Days for Answering Questions
//                 </button>
//                 <button
//                   className={`nav-link text-start ${
//                     activeTab === "ballot" ? "active" : ""
//                   }`}
//                   id="nav-returrefund-tab"
//                   data-bs-toggle="tab"
//                   data-bs-target="#nav-returrefund"
//                   type="button"
//                   role="tab"
//                   aria-controls="nav-returrefund"
//                   aria-selected={activeTab === "ballot" ? "true" : "false"}
//                   onClick={() => handleTabClick("ballot")}
//                 >
//                   Ballot Chart for Questions
//                 </button>
//                 <button
//                   className={`nav-link text-start ${
//                     activeTab === "schedule" ? "active" : ""
//                   }`}
//                   id="nav-covid19-tab"
//                   data-bs-toggle="tab"
//                   data-bs-target="#nav-covid19"
//                   type="button"
//                   role="tab"
//                   aria-controls="nav-covid19"
//                   aria-selected={activeTab === "schedule" ? "true" : "false"}
//                   onClick={() => handleTabClick("schedule")}
//                 >
//                   Schedule for Web Updation of Questions
//                 </button>
//               </div>
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="col-md-7 col-lg-7 col-xl-8">
//         <div
//           className="terms_condition_grid text-start h-100 pl20"
//           style={{ borderLeft: "1px solid #80808080" }}
//         >
//           <div className="tab-content" id="nav-tabContent">
//             {renderTabContent()}
//           </div>
//         </div>
//       </div>

//       {/* PDF Modal */}
//       <Modal
//         show={showModal}
//         onHide={closeModal}
//         dialogClassName="modal-xl"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title className="modal-title">Question Rules</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ height: "80vh" }}>
//           {pdfUrl && (
//             <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//               <Viewer
//                 fileUrl={pdfUrl}
//                 plugins={[defaultLayoutPluginInstance]}
//                 defaultScale={
//                   typeof window !== "undefined" && window.innerWidth <= 576
//                     ? SpecialZoomLevel.PageFit
//                     : 1
//                 }
//               />
//             </Worker>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// // Sample questions data
// const questionsData = {
//   starred: [
//     {
//       id: 1,
//       number: 458,
//       title: "ഒരു തദ്ദേശസ്ഥാപനം ഒരു ഉല്‍പ്പന്നം പദ്ധതി",
//       members: [
//         "ശ്രീ. എൻ. കെ. അക്ബര്‍",
//         "ശ്രീ വി ജോയി",
//         "ശ്രീ. പി. മമ്മിക്കുട്ടി",
//       ],
//       askedBy: "ശ്രീ. കെ.എൻ. ഉണ്ണിക്കൃഷ്ണൻ",
//       question:
//         "താഴെ കാണുന്ന ചോദ്യങ്ങൾക്കു നിയമം, വ്യവസായം, കയർ വകുപ്പ് മന്ത്രി സദയം മറുപടി പറയാമോ?",
//       subQuestions: [
//         "പ്രാദേശിക ജനസമൂഹത്തിന്റെ വികസനം സാധ്യമാക്കി രാജ്യത്തിന്റെ മൊത്തത്തിലുളള വികസനം എന്ന ലക്ഷ്യത്തിലധിഷ്ഠിതമായി ഒരു തദ്ദേശസ്ഥാപനം ഒരു ഉല്‍പ്പന്നം എന്ന പദ്ധതി ആവിഷ്കരിച്ച് നടപ്പാക്കിവരുന്നുണ്ടോ; എങ്കില്‍ ഈ പദ്ധതിയുടെ പുരോഗതി വിലയിരുത്തിയിട്ടുണ്ടോ; വിശദാംശം നല്‍കുമോ;",
//         "പ്രസ്തുത പദ്ധതി പ്രകാരം ഏത് മേഖലയിലെ സംരംഭങ്ങളെ പ്രോത്സാഹിപ്പിക്കുന്നതിനാണ് മുന്‍ഗണന നല്‍കിയിട്ടുളളതെന്ന് വ്യക്തമാക്കുമോ",
//         "പദ്ധതി നിര്‍വ്വഹണവുമായി ബന്ധപ്പെട്ട് തദ്ദേശ സ്ഥാപനങ്ങള്‍ക്കും സംരംഭകര്‍ക്കും നല്‍കുന്ന സഹായങ്ങള്‍ എന്തൊക്കെയാണ്; വിശദമാക്കുമോ?",
//       ],
//       isAnswered: true,
//     },
//     {
//       id: 2,
//       number: 459,
//       title: "കേരളത്തിലെ വിദ്യാഭ്യാസ മേഖലയിലെ പുരോഗതി",
//       members: ["ശ്രീ. എം. കെ. മുനീർ", "ശ്രീ. പി. ടി. തോമസ്"],
//       askedBy: "ശ്രീ. കെ. ജെ. മാക്സി",
//       question:
//         "കേരളത്തിലെ വിദ്യാഭ്യാസ മേഖലയിലെ പുരോഗതിയെക്കുറിച്ച് വിദ്യാഭ്യാസ മന്ത്രി വിശദമായി വിവരിക്കാമോ?",
//       subQuestions: [
//         "സർക്കാർ സ്കൂളുകളിലെ വിദ്യാർത്ഥികളുടെ എണ്ണം എത്രയാണ്?",
//         "ഇ-ലേണിംഗ് സംവിധാനങ്ങൾ എത്ര സ്കൂളുകളിൽ നടപ്പിലാക്കിയിട്ടുണ്ട്?",
//         "അധ്യാപകർക്കുള്ള പരിശീലന പരിപാടികൾ എന്തെല്ലാമാണ്?",
//       ],
//       isAnswered: true,
//        isLate: true
//     },
//     {
//       id: 3,
//       number: 460,
//       title: "ആരോഗ്യ മേഖലയിലെ പുതിയ പദ്ധതികൾ",
//       members: ["ശ്രീ. എസ്. ശർമ്മ", "ശ്രീ. ആർ. രാജേഷ്"],
//       askedBy: "ശ്രീ. വി. എസ്. അച്യുതാനന്ദൻ",
//       question:
//         "കേരളത്തിലെ ആരോഗ്യ മേഖലയിൽ പുതിയ പദ്ധതികൾ എന്തെല്ലാമാണ് നടപ്പിലാക്കിയിട്ടുള്ളത്?",
//       subQuestions: [
//         "പുതിയ ആശുപത്രികൾ എത്ര നിർമ്മിച്ചിട്ടുണ്ട്?",
//         "ആരോഗ്യ കേന്ദ്രങ്ങളുടെ എണ്ണം എത്രയാണ്?",
//         "ഡോക്ടർമാരുടെ ഒഴിവുകൾ എത്രയാണ്?",
//       ],
//       isAnswered: false,
//     },
//     {
//       id: 4,
//       number: 461,
//       title: "കാർഷിക വികസന പദ്ധതികൾ",
//       members: ["ശ്രീ. കെ. പി. മോഹനൻ", "ശ്രീ. എം. സി. ജോസഫ്"],
//       askedBy: "ശ്രീ. പി. കെ. കുഞ്ഞാലിക്കുട്ടി",
//       question:
//         "കേരളത്തിലെ കാർഷിക വികസന പദ്ധതികളെക്കുറിച്ച് കാർഷിക മന്ത്രി വിശദമായി വിവരിക്കാമോ?",
//       subQuestions: [
//         "കാർഷിക വായന കേന്ദ്രങ്ങൾ എത്ര സ്ഥാപിച്ചിട്ടുണ്ട്?",
//         "കർഷകർക്ക് നൽകുന്ന സഹായങ്ങൾ എന്തെല്ലാമാണ്?",
//         "ജൈവ കൃഷി പ്രോത്സാഹന പദ്ധതികൾ എന്തെല്ലാമാണ്?",
//       ],
//       isAnswered: true,
//     },
//     {
//       id: 5,
//       number: 462,
//       title: "പരിസ്ഥിതി സംരക്ഷണ നടപടികൾ",
//       members: ["ശ്രീ. എൻ. ജയരാജൻ", "ശ്രീ. കെ. എം. മാണി"],
//       askedBy: "ശ്രീ. എം. വി. ഗോവിന്ദൻ മാസ്റ്റർ",
//       question:
//         "കേരളത്തിലെ പരിസ്ഥിതി സംരക്ഷണ നടപടികളെക്കുറിച്ച് പരിസ്ഥിതി മന്ത്രി വിശദമായി വിവരിക്കാമോ?",
//       subQuestions: [
//         "വനം സംരക്ഷണ പദ്ധതികൾ എന്തെല്ലാമാണ്?",
//         "ജല സംരക്ഷണ നടപടികൾ എന്തെല്ലാമാണ്?",
//         "ക്ലീൻ കേരള മിഷൻ പുരോഗതി എന്താണ്?",
//       ],
//       isAnswered: false,
//     },
//   ],
//   unstarred: [
//     {
//       id: 6,
//       number: 463,
//       title: "ഗതാഗത മേഖലയിലെ പുതിയ പദ്ധതികൾ",
//       members: ["ശ്രീ. എൻ. എസ്. രാജൻ", "ശ്രീ. പി. എം. ഇബ്രാഹിം"],
//       askedBy: "ശ്രീ. കെ. എം. ജോർജ്ജ്",
//       question: "കേരളത്തിലെ ഗതാഗത മേഖലയിൽ പുതിയ പദ്ധതികൾ എന്തെല്ലാമാണ്?",
//       subQuestions: [
//         "പുതിയ റോഡുകൾ എത്ര നിർമ്മിച്ചിട്ടുണ്ട്?",
//         "പാലങ്ങളുടെ നിർമ്മാണ പുരോഗതി എന്താണ്?",
//         "പബ്ലിക് ട്രാൻസ്പോർട്ട് സംവിധാനങ്ങൾ എങ്ങനെ മെച്ചപ്പെടുത്തിയിട്ടുണ്ട്?",
//       ],
//       isAnswered: false,
//     },
//     {
//       id: 7,
//       number: 464,
//       title: "വിദ്യുതി വിതരണ മേഖല",
//       members: ["ശ്രീ. എം. എം. മണി", "ശ്രീ. കെ. എം. ഷാജി"],
//       askedBy: "ശ്രീ. എൻ. എം. ജോസഫ്",
//       question: "കേരളത്തിലെ വിദ്യുതി വിതരണ മേഖലയിലെ പുരോഗതി എന്താണ്?",
//       subQuestions: [
//         "വിദ്യുതി ഉത്പാദന കേന്ദ്രങ്ങൾ എത്രയാണ്?",
//         "വിദ്യുതി കട്ട് എത്ര ശതമാനം കുറച്ചിട്ടുണ്ട്?",
//         "സോളാർ പവർ പദ്ധതികൾ എന്തെല്ലാമാണ്?",
//       ],
//       isAnswered: true,
//     },
//     {
//       id: 8,
//       number: 465,
//       title: "ജല വിതരണ പദ്ധതികൾ",
//       members: ["ശ്രീ. എം. എം. ഹസ്സൻ", "ശ്രീ. കെ. എം. രാജൻ"],
//       askedBy: "ശ്രീ. പി. എം. ഇബ്രാഹിം",
//       question: "കേരളത്തിലെ ജല വിതരണ പദ്ധതികളെക്കുറിച്ച് വിവരിക്കാമോ?",
//       subQuestions: [
//         "പുതിയ ജല ശേഖരണ കേന്ദ്രങ്ങൾ എത്ര സ്ഥാപിച്ചിട്ടുണ്ട്?",
//         "ജല വിതരണ ശൃംഖല എത്ര കിലോമീറ്റർ വ്യാപിച്ചിരിക്കുന്നു?",
//         "ജല ഗുണനിലവാരം മെച്ചപ്പെടുത്താനുള്ള നടപടികൾ എന്തെല്ലാമാണ്?",
//       ],
//       isAnswered: false,
//     },
//     {
//       id: 9,
//       number: 466,
//       title: "ഗ്രാമീണ വികസന പദ്ധതികൾ",
//       members: ["ശ്രീ. എം. എം. ലതീഫ്", "ശ്രീ. കെ. എം. ജോർജ്ജ്"],
//       askedBy: "ശ്രീ. എൻ. എസ്. രാജൻ",
//       question: "കേരളത്തിലെ ഗ്രാമീണ വികസന പദ്ധതികളെക്കുറിച്ച് വിവരിക്കാമോ?",
//       subQuestions: [
//         "ഗ്രാമീണ റോഡുകൾ എത്ര കിലോമീറ്റർ നിർമ്മിച്ചിട്ടുണ്ട്?",
//         "ഗ്രാമീണ വിദ്യാഭ്യാസ കേന്ദ്രങ്ങൾ എത്രയാണ്?",
//         "ഗ്രാമീണ ആരോഗ്യ കേന്ദ്രങ്ങൾ എത്രയാണ്?",
//       ],
//       isAnswered: false,
//     },
//     {
//       id: 10,
//       number: 467,
//       title: "ശാസ്ത്ര സാങ്കേതിക വിദ്യാ വികസനം",
//       members: ["ശ്രീ. എം. എം. ഹസ്സൻ", "ശ്രീ. കെ. എം. രാജൻ"],
//       askedBy: "ശ്രീ. പി. എം. ഇബ്രാഹിം",
//       question:
//         "കേരളത്തിലെ ശാസ്ത്ര സാങ്കേതിക വിദ്യാ വികസനത്തെക്കുറിച്ച് വിവരിക്കാമോ?",
//       subQuestions: [
//         "സ്റ്റാർട്ടപ്പ് കേന്ദ്രങ്ങൾ എത്ര സ്ഥാപിച്ചിട്ടുണ്ട്?",
//         "ഡിജിറ്റൽ ഇന്ത്യ പദ്ധതിയുടെ പുരോഗതി എന്താണ്?",
//         "ഇ-ഗവൺമെന്റ് സേവനങ്ങൾ എത്രയാണ്?",
//       ],
//       isAnswered: true,
//     },
//     {
//       id: 11,
//       number: 468,
//       title: "വിദ്യുതി വിതരണ മേഖല",
//       members: ["ശ്രീ. എം. എം. മണി", "ശ്രീ. കെ. എം. ഷാജി"],
//       askedBy: "ശ്രീ. എൻ. എം. ജോസഫ്",
//       question: "കേരളത്തിലെ വിദ്യുതി വിതരണ മേഖലയിലെ പുരോഗതി എന്താണ്?",
//       subQuestions: [
//         "വിദ്യുതി ഉത്പാദന കേന്ദ്രങ്ങൾ എത്രയാണ്?",
//         "വിദ്യുതി കട്ട് എത്ര ശതമാനം കുറച്ചിട്ടുണ്ട്?",
//         "സോളാർ പവർ പദ്ധതികൾ എന്തെല്ലാമാണ്?",
//       ],
//       isAnswered: true,
//     },
//     {
//       id: 12,
//       number: 469,
//       title: "ജല വിതരണ പദ്ധതികൾ",
//       members: ["ശ്രീ. എം. എം. ഹസ്സൻ", "ശ്രീ. കെ. എം. രാജൻ"],
//       askedBy: "ശ്രീ. പി. എം. ഇബ്രാഹിം",
//       question: "കേരളത്തിലെ ജല വിതരണ പദ്ധതികളെക്കുറിച്ച് വിവരിക്കാമോ?",
//       subQuestions: [
//         "പുതിയ ജല ശേഖരണ കേന്ദ്രങ്ങൾ എത്ര സ്ഥാപിച്ചിട്ടുണ്ട്?",
//         "ജല വിതരണ ശൃംഖല എത്ര കിലോമീറ്റർ വ്യാപിച്ചിരിക്കുന്നു?",
//         "ജല ഗുണനിലവാരം മെച്ചപ്പെടുത്താനുള്ള നടപടികൾ എന്തെല്ലാമാണ്?",
//       ],
//       isAnswered: true,
//     },
//     {
//       id: 13,
//       number: 470,
//       title: "ജല വിതരണ പദ്ധതികൾ",
//       members: ["ശ്രീ. എം. എം. ഹസ്സൻ", "ശ്രീ. കെ. എം. രാജൻ"],
//       askedBy: "ശ്രീ. പി. എം. ഇബ്രാഹിം",
//       question: "കേരളത്തിലെ ജല വിതരണ പദ്ധതികളെക്കുറിച്ച് വിവരിക്കാമോ?",
//       subQuestions: [
//         "പുതിയ ജല ശേഖരണ കേന്ദ്രങ്ങൾ എത്ര സ്ഥാപിച്ചിട്ടുണ്ട്?",
//         "ജല വിതരണ ശൃംഖല എത്ര കിലോമീറ്റർ വ്യാപിച്ചിരിക്കുന്നു?",
//         "ജല ഗുണനിലവാരം മെച്ചപ്പെടുത്താനുള്ള നടപടികൾ എന്തെല്ലാമാണ്?",
//       ],
//       isAnswered: true,
//     },
//   ],
//   shortnotice: [
//     {
//       id: 11,
//       number: 468,
//       title: "അടിയന്തിര ആരോഗ്യ സംഘടനകൾ",
//       members: ["ശ്രീ. എം. എം. ഹസ്സൻ", "ശ്രീ. കെ. എം. രാജൻ"],
//       askedBy: "ശ്രീ. പി. എം. ഇബ്രാഹിം",
//       question: "കേരളത്തിലെ അടിയന്തിര ആരോഗ്യ സംഘടനകളെക്കുറിച്ച് വിവരിക്കാമോ?",
//       subQuestions: [
//         "അടിയന്തിര ആരോഗ്യ കേന്ദ്രങ്ങൾ എത്രയാണ്?",
//         "ആംബുലൻസ് സേവനങ്ങൾ എത്രയാണ്?",
//         "അടിയന്തിര ഫോൺ നമ്പറുകൾ എന്തെല്ലാമാണ്?",
//       ],
//       isAnswered: false,
//     },
//     {
//       id: 12,
//       number: 469,
//       title: "അടിയന്തിര ഗതാഗത സംവിധാനങ്ങൾ",
//       members: ["ശ്രീ. എൻ. എസ്. രാജൻ", "ശ്രീ. പി. എം. ഇബ്രാഹിം"],
//       askedBy: "ശ്രീ. കെ. എം. ജോർജ്ജ്",
//       question:
//         "കേരളത്തിലെ അടിയന്തിര ഗതാഗത സംവിധാനങ്ങളെക്കുറിച്ച് വിവരിക്കാമോ?",
//       subQuestions: [
//         "അടിയന്തിര റോഡ് റിപ്പയർ സംവിധാനങ്ങൾ എന്തെല്ലാമാണ്?",
//         "അടിയന്തിര ഗതാഗത നിയന്ത്രണ സംവിധാനങ്ങൾ എന്തെല്ലാമാണ്?",
//         "അടിയന്തിര ഗതാഗത ആശയവിനിമയ സംവിധാനങ്ങൾ എന്തെല്ലാമാണ്?",
//       ],
//       isAnswered: false,
//     },
//     {
//       id: 13,
//       number: 470,
//       title: "അടിയന്തിര ആശ്വാസ സംവിധാനങ്ങൾ",
//       members: ["ശ്രീ. എം. എം. ലതീഫ്", "ശ്രീ. കെ. എം. ജോർജ്ജ്"],
//       askedBy: "ശ്രീ. എൻ. എസ്. രാജൻ",
//       question:
//         "കേരളത്തിലെ അടിയന്തിര ആശ്വാസ സംവിധാനങ്ങളെക്കുറിച്ച് വിവരിക്കാമോ?",
//       subQuestions: [
//         "അടിയന്തിര ആശ്വാസ കേന്ദ്രങ്ങൾ എത്രയാണ്?",
//         "അടിയന്തിര ഭക്ഷണ വിതരണ സംവിധാനങ്ങൾ എന്തെല്ലാമാണ്?",
//         "അടിയന്തിര ആശ്വാസ ഫണ്ട് എത്രയാണ്?",
//       ],
//       isAnswered: false,
//     },
//     {
//       id: 14,
//       number: 471,
//       title: "അടിയന്തിര ആശയവിനിമയ സംവിധാനങ്ങൾ",
//       members: ["ശ്രീ. എം. എം. ഹസ്സൻ", "ശ്രീ. കെ. എം. രാജൻ"],
//       askedBy: "ശ്രീ. പി. എം. ഇബ്രാഹിം",
//       question:
//         "കേരളത്തിലെ അടിയന്തിര ആശയവിനിമയ സംവിധാനങ്ങളെക്കുറിച്ച് വിവരിക്കാമോ?",
//       subQuestions: [
//         "അടിയന്തിര ആശയവിനിമയ കേന്ദ്രങ്ങൾ എത്രയാണ്?",
//         "അടിയന്തിര ആശയവിനിമയ ഫോൺ നമ്പറുകൾ എന്തെല്ലാമാണ്?",
//         "അടിയന്തിര ആശയവിനിമയ സംവിധാനങ്ങൾ എങ്ങനെ പ്രവർത്തിക്കുന്നു?",
//       ],
//       isAnswered: false,
//     },
//     {
//       id: 15,
//       number: 472,
//       title: "അടിയന്തിര സുരക്ഷാ സംവിധാനങ്ങൾ",
//       members: ["ശ്രീ. എൻ. എസ്. രാജൻ", "ശ്രീ. പി. എം. ഇബ്രാഹിം"],
//       askedBy: "ശ്രീ. കെ. എം. ജോർജ്ജ്",
//       question:
//         "കേരളത്തിലെ അടിയന്തിര സുരക്ഷാ സംവിധാനങ്ങളെക്കുറിച്ച് വിവരിക്കാമോ?",
//       subQuestions: [
//         "അടിയന്തിര സുരക്ഷാ കേന്ദ്രങ്ങൾ എത്രയാണ്?",
//         "അടിയന്തിര സുരക്ഷാ ഫോഴ്സ് എത്രയാണ്?",
//         "അടിയന്തിര സുരക്ഷാ ഉപകരണങ്ങൾ എന്തെല്ലാമാണ്?",
//       ],
//       isAnswered: false,
//     },
//   ],
// };

// // Question card component
// // Function to convert index to English letter in Malayalam script
// const getEnglishLetterInMalayalam = (index) => {
//   const englishLettersInMalayalam = [
//     "എ",
//     "ബി",
//     "സി",
//     "ഡി",
//     "ഇ",
//     "എഫ്",
//     "ജി",
//     "എച്ച്",
//     "ഐ",
//     "ജെ",
//     "കെ",
//     "എൽ",
//     "എം",
//     "എൻ",
//     "ഒ",
//     "പി",
//     "ക്യു",
//     "ആർ",
//     "എസ്",
//     "ടി",
//     "യു",
//     "വി",
//     "ഡബ്ല്യു",
//     "എക്സ്",
//     "വൈ",
//     "സെഡ്",
//   ];
//   return englishLettersInMalayalam[index] || String.fromCharCode(97 + index);
// };

// const QuestionCard = ({ question, onPdfClick, isStarredTab }) => (
//   <div className="card mb-3">
//     <div className="card-header">
//       <a
//         href="#"
//         onClick={(e) => {
//           e.preventDefault();
//           if (question.isAnswered) {
//             onPdfClick(question);
//           }
//         }}
//       >
//         {question.title}
//       </a>

//       <div className="late-section">

//       {question.isAnswered && question.isLate && (
//         <span className="late-answered">Late Answered</span>
//       )}

//       <button
//         className={`btn ${question.isAnswered ? "answer" : "notanswer"}`}
//         onClick={(e) => {
//           e.preventDefault();
//           if (question.isAnswered) {
//             onPdfClick(question);
//           }
//         }}
//       >
//         <img
//           src={`images/${question.isAnswered ? "chk.svg" : "cross.svg"}`}
//           width={16}
//           alt=""
//         />
//         &nbsp; {question.isAnswered ? "Answered" : "Not Answered"}
//       </button>
//       </div>
//     </div>
//     <div className="card-body">
//       <div className="qs">
//         <p className="qno">
//           {isStarredTab && question.isAnswered && (
//             <img src="images/star.svg" width={10} alt="" />
//           )}
//           <span> {question.number}.</span>
//         </p>
//         <div className="subi">
//           {question.members.map((member, index) => (
//             <h6 key={index}>{member}</h6>
//           ))}
//           <div className="below">
//             <h6>{question.askedBy}&nbsp;:&nbsp;</h6>
//             {/* If there are no subQuestions, render the main question like a single sub-question
//                 so it appears with the letter prefix and h5 styling. Add a small non-breaking
//                 space before the letter to simulate a tab/indent per the request. */}
//             {(!question.subQuestions || question.subQuestions.length === 0) ? (
//               (() => {
//                 // Try to split the main question text into subparts using Malayalam markers
//                 // like (എ) (ബി) (സി) (ഡി) or 'എ.' etc. We'll support a few common separators.
//                 const text = String(question.question || "");
//                 // Attempt a Unicode-aware split on common Malayalam markers: എ, ബി, സി, ഡി
//                 // e.g. '(എ) text (ബി) text' -> ['എ',' text ','ഡി',' text'] etc.
//                 // Split strictly on markers of the form '(എ)', '(ബി)', '(സി)', '(ഡി)'.
//                 // This avoids breaking other Malayalam characters.
//                 const parts = text
//                   .split(/\(\s*(?:എ|ബി|സി|ഡി)\s*\)/u)
//                   .map((s) => s.trim())
//                   .filter(Boolean);

//                 if (parts.length > 1) {
//                   return parts.map((part, idx) => (
//                     <div key={idx} className="sub-q">
//                       <p>( {getEnglishLetterInMalayalam(idx)} )</p>
//                       <h5>{part}</h5>
//                     </div>
//                   ));
//                 }

//                 // Fallback: render the whole question as single sub-question
//                 return (
//                   <div className="sub-q">
//                     <p>{"\u00A0\u00A0"}( {getEnglishLetterInMalayalam(0)} )</p>
//                     <h5>{question.question}</h5>
//                   </div>
//                 );
//               })()
//             ) : (
//               <span>{question.question}</span>
//             )}
//           </div>

//           {question.subQuestions && question.subQuestions.length > 0 &&
//             question.subQuestions.map((subQ, index) => (
//               <div key={index} className="sub-q">
//                 <p>( {getEnglishLetterInMalayalam(index)} )</p>
//                 <h5>{subQ}</h5>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const Questions = () => {
//   const [activeQuestionTab, setActiveQuestionTab] = useState("starred");
//   const [showPdfModal, setShowPdfModal] = useState(false);
//   // state to hold questions used by the UI (paged / filtered)
//   // start empty — we'll populate from the kla-questions API for the selected KLA
//   const [currentQuestions, setCurrentQuestions] = useState([]);

//   // store raw API response (if any). We'll prefer this over the static
//   // `questionsData` once it's loaded.
//   const [questionsApiData, setQuestionsApiData] = useState(null);
//   // klaId controls which KLA's questions are fetched from the API. Default to 14 (15th KLA not available on API)
//   const [klaId, setKlaId] = useState(14);
//   // kla and session options sourced from the API (caller is authoritative)
//   const [klaOptions, setKlaOptions] = useState([]);
//   const [sessionOptions, setSessionOptions] = useState([]);
//   // optional filters for question API
//   const [sessionNo, setSessionNo] = useState(null);
//   // support session range for kla-questions API
//   const [sessionIdFrom, setSessionIdFrom] = useState(null);
//   const [sessionIdTo, setSessionIdTo] = useState(null);
//   const [sittingDate, setSittingDate] = useState("");

//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   // Calendar event dots (optional)
//   const eventDates = [];

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [isScrolled, setIsScrolled] = useState(false);
//   // default to showing starred questions on initial load
//   const [activeMainTab, setActiveMainTab] = useState("starred");

//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   // Pagination logic
//   // const totalPages = Math.ceil(currentQuestions.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentQuestionsPage = currentQuestions.slice(startIndex, endIndex);

//   const closePdfModal = () => {
//     setShowPdfModal(false);
//     setSelectedQuestion(null);
//   };

//   // const handleQuestionPdfClick = (question) => {
//   //   setSelectedQuestion(question);
//   //   setShowPdfModal(true);
//   // };

//   const handleMainTabClick = (tabKey) => {
//     setActiveMainTab(tabKey);
//     // Map UI tab keys to data keys
//     const dataKey = tabKey === "short-notice" ? "shortnotice" : tabKey;
//     setActiveQuestionTab(dataKey);

//     // Choose source: API data if available, otherwise fallback to bundled static data
//     const source = questionsApiData || questionsData;
//     if (dataKey === "starred") {
//       // If Session filter is 'All' (sessionNo == null) show ALL starred questions.
//       // Otherwise, show only answered starred questions by default.
//       const allStarred = Array.isArray(source.starred) ? source.starred : [];
//       const starred = sessionNo == null ? allStarred : allStarred.filter((q) => q.isAnswered);
//       setCurrentQuestions(starred);
//     } else {
//       const list = Array.isArray(source[dataKey]) ? source[dataKey] : [];
//       setCurrentQuestions(list);
//     }
//     setCurrentPage(1);
//   };
//   // Fetch questions from remote API. The API expects a kla_id query param;
//   // use `klaId` state (default 14). Re-run when klaId changes.
//   useEffect(() => {
//     let cancelled = false;
//     // fetch kla list once on mount so Filter can show real KLA options
//     const loadKlaList = async () => {
//       try {
//         const list = await fetchKlaList().catch(() => []);
//         if (cancelled) return;
//         const options = (list || []).map((k) => ({ value: k.id, label: k.languages?.[0]?.name || `KLA ${k.id}` }));
//         setKlaOptions(options);
//   // do not override `klaId` here; we want the component's initial klaId (15) to remain
//       } catch (err) {
//         console.error("Failed to load kla list", err);
//       }
//     };

//     loadKlaList();
//     return () => { cancelled = true; };
//   }, [klaId]);

//   // when klaId changes, fetch kla sessions (authoritative source for session options)
//   useEffect(() => {
//     if (klaId == null) return;
//     let cancelled = false;
//     const loadSessions = async () => {
//       try {
//         const sessions = await fetchKlaSessions(klaId).catch(() => []);
//         if (cancelled) return;
//         // Normalize: prefer numeric session_id/session_no, coerce to Number when possible
//         const raw = (sessions || []).map((s) => {
//           const num = s.session_id ?? s.session_no ?? null;
//           const value = num != null && !Number.isNaN(Number(num)) ? Number(num) : (s.id ?? s.name);
//           const label = num != null && !Number.isNaN(Number(num)) ? String(num) : (s.name || String(s.id));
//           return { value, label };
//         });

//         // Deduplicate by numeric value (if numeric), then by string value; finally sort numerically when possible
//         const map = new Map();
//         for (const opt of raw) {
//           const key = typeof opt.value === "number" ? opt.value : String(opt.value);
//           if (!map.has(key)) map.set(key, opt);
//         }
//         const deduped = Array.from(map.values());
//         deduped.sort((a, b) => {
//           const an = typeof a.value === "number" ? a.value : Number(a.value);
//           const bn = typeof b.value === "number" ? b.value : Number(b.value);
//           if (!Number.isNaN(an) && !Number.isNaN(bn)) return an - bn;
//           return String(a.label).localeCompare(String(b.label));
//         });
//         setSessionOptions(deduped);
//       } catch (err) {
//         console.error("Failed to load kla sessions for kla", klaId, err);
//       }
//     };
//     loadSessions();
//     return () => { cancelled = true; };
//   }, [klaId]);

//   useEffect(() => {
//     let aborted = false;
//     // ensure we only auto-sync klaId from API once to avoid loops
//     const initialKlaSynced = { current: false };
//     // NOTE: we purposely don't use useRef here because this file's effects run per render in this patch context;
//     // we'll create a module-scoped ref below if needed.
//     const fetchQuestions = async () => {
//       try {
//         // Build query params; when sessionNo == null treat as explicit 'All' -> session_no=0
//         const params = new URLSearchParams();
//         if (klaId != null) params.set("kla_id", String(klaId));
//         if (sessionNo != null) params.set("session_no", String(sessionNo));
//         else params.set("session_no", "0");
//         if (sessionIdFrom != null) params.set("session_idfrom", String(sessionIdFrom));
//         if (sessionIdTo != null) params.set("session_idto", String(sessionIdTo));
//         if (sittingDate) params.set("sitting_date", String(sittingDate));

//         const tryUrl = (extraParams) => `https://klademo.cditproject.org/api/kla-questions?${extraParams.toString()}`;

//         // First attempt: include session_no (0 for All)
//         let resp = await fetch(tryUrl(params));
//         if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
//         let payload = await resp.json();
//         if (aborted) return;

//         const normalize = (p) => {
//           if (Array.isArray(p)) return { unstarred: p };
//           if (p && typeof p === "object") return p.data && typeof p.data === "object" ? p.data : p;
//           return { unstarred: [] };
//         };

//         let normalized = normalize(payload);

//         // If we tried session_no=0 (All) and got no items back, retry *without* session_no
//         const totalCount = (normalized.starred?.length || 0) + (normalized.unstarred?.length || 0) + (normalized.shortnotice?.length || 0);
//         if (totalCount === 0 && sessionNo == null) {
//           // remove session_no and retry
//           const params2 = new URLSearchParams();
//           if (klaId != null) params2.set("kla_id", String(klaId));
//           if (sessionIdFrom != null) params2.set("session_idfrom", String(sessionIdFrom));
//           if (sessionIdTo != null) params2.set("session_idto", String(sessionIdTo));
//           if (sittingDate) params2.set("sitting_date", String(sittingDate));
//           const resp2 = await fetch(tryUrl(params2));
//           if (resp2.ok) {
//             const payload2 = await resp2.json();
//             if (aborted) return;
//             normalized = normalize(payload2);
//           }
//         }

//         setQuestionsApiData(normalized);

//         // Auto-sync klaId to data if returned questions belong to a different kla and we haven't synced yet
//         try {
//           if (!initialKlaSynced.current) {
//             const lists = [normalized.starred || [], normalized.unstarred || [], normalized.shortnotice || []];
//             let firstQ = null;
//             for (const list of lists) {
//               if (Array.isArray(list) && list.length) {
//                 firstQ = list[0];
//                 break;
//               }
//             }
//             if (firstQ && firstQ.kla_id != null && Number(firstQ.kla_id) !== Number(klaId)) {
//               setKlaId(Number(firstQ.kla_id));
//             }
//             initialKlaSynced.current = true;
//           }
//         } catch {
//           // ignore
//         }
//       } catch (err) {
//         // swallow error and keep using bundled static data; log for debugging
//         console.error("Failed to load questions API", err);
//       }
//     };

//     fetchQuestions();
//     return () => {
//       aborted = true;
//     };
//   }, [klaId, sessionNo, sittingDate, sessionIdFrom, sessionIdTo]);

//   // Handler for filter changes. The Filter component emits selected values
//   // keyed by FILTER_REGISTRY keys. We care about the KLA filter so we can
//   // keep klaId in sync with the UI. FILTER_REGISTRY stores human-friendly
//   // labels like "15th KLA"; try to parse a numeric kla id from the label
//   // if possible, otherwise keep the default.
//   const handleFiltersChange = (values) => {
//     // KLA parsing (accept multiple shapes emitted by Filter)
//     const raw = values?.KLA;
//     if (raw != null) {
//       // If it's an object with .value, prefer that
//       if (typeof raw === "object") {
//         if (Array.isArray(raw) && raw.length > 0) {
//           const first = raw[0];
//           const val = typeof first === "object" ? first.value : first;
//           if (val != null) setKlaId(Number(val));
//         } else if (raw.value != null) {
//           setKlaId(Number(raw.value));
//         }
//       } else {
//         const n = Number(raw);
//         if (!Number.isNaN(n)) setKlaId(n);
//         else {
//           const m = String(raw).match(/(\d{1,3})/);
//           if (m) setKlaId(Number(m[1]));
//         }
//       }
//     }

//     // Session / session number (Filter may emit SESSION or SESSION_TYPE)
//     const sessionRaw = values?.SESSION || values?.SESSION_TYPE;
//     if (sessionRaw != null) {
//       let sn = null;
//       // treat empty string ("All") as no selection
//       if (sessionRaw === "") {
//         sn = null;
//       } else if (typeof sessionRaw === "object") {
//         const candidate = Array.isArray(sessionRaw) ? sessionRaw[0] : sessionRaw;
//         const v = candidate && (candidate.value ?? candidate);
//         if (v === "" || v == null) {
//           sn = null;
//         } else {
//           const parsed = Number(v);
//           if (!Number.isNaN(parsed)) sn = parsed;
//           else {
//             const mm = String(v).match(/(\d{1,3})/);
//             if (mm) sn = Number(mm[1]);
//           }
//         }
//       } else {
//         if (String(sessionRaw).trim() === "") {
//           sn = null;
//         } else {
//           const parsed = Number(sessionRaw);
//           if (!Number.isNaN(parsed)) sn = parsed;
//           else {
//             const mm = String(sessionRaw).match(/(\d{1,3})/);
//             if (mm) sn = Number(mm[1]);
//           }
//         }
//       }
//       setSessionNo(sn);
//     }

//     // Sitting date (FILTER_REGISTRY 'DATE' uses date input -> YYYY-MM-DD)
//     const dateRaw = values?.DATE;
//     if (dateRaw != null) {
//       if (typeof dateRaw === "string") setSittingDate(dateRaw);
//       else if (typeof dateRaw === "object" && dateRaw.value) setSittingDate(String(dateRaw.value));
//       else setSittingDate("");
//     }

//     // Try to extract a session id range if the filter provides multiple values
//     // Accept shapes: array [from,to], object { from, to } or string "1-3"
//     const sessionRangeRaw = values?.SESSION_RANGE || values?.SESSION_IDS || values?.SESSION;
//     if (sessionRangeRaw != null) {
//       let from = null;
//       let to = null;
//       if (Array.isArray(sessionRangeRaw)) {
//         from = Number(sessionRangeRaw[0]);
//         to = Number(sessionRangeRaw[1] ?? sessionRangeRaw[0]);
//       } else if (typeof sessionRangeRaw === "object") {
//         // Could be { from: x, to: y } or an option object
//         if (sessionRangeRaw.from != null || sessionRangeRaw.to != null) {
//           from = sessionRangeRaw.from != null ? Number(sessionRangeRaw.from) : null;
//           to = sessionRangeRaw.to != null ? Number(sessionRangeRaw.to) : from;
//         } else {
//           const v = sessionRangeRaw.value ?? sessionRangeRaw;
//           const m = String(v).match(/(\d+)(?:\s*-\s*(\d+))?/);
//           if (m) {
//             from = Number(m[1]);
//             to = m[2] ? Number(m[2]) : from;
//           }
//         }
//       } else if (typeof sessionRangeRaw === "string") {
//         const m = String(sessionRangeRaw).match(/(\d+)(?:\s*-\s*(\d+))?/);
//         if (m) {
//           from = Number(m[1]);
//           to = m[2] ? Number(m[2]) : from;
//         }
//       }

//       if (!Number.isNaN(from) && from != null) setSessionIdFrom(from);
//       else setSessionIdFrom(null);
//       if (!Number.isNaN(to) && to != null) setSessionIdTo(to);
//       else setSessionIdTo(null);
//     }
//   };

//   // When API data arrives or when the activeMainTab changes, update the
//   // currently visible questions list so UI reflects either the API result or
//   // the bundled fallback data.
//   useEffect(() => {
//     const source = questionsApiData || questionsData;
//     // helper to filter by sessionNo (if provided) and dedupe by id
//     const filterAndDedupe = (arr) => {
//       const filtered = (arr || []).filter(Boolean).filter((q) => {
//         if (sessionNo == null) return true;
//         const v = q?.session_id ?? q?.session_no ?? null;
//         return v != null && Number(v) === Number(sessionNo);
//       });
//       const map = new Map();
//       for (const q of filtered) {
//         if (q.id == null) continue;
//         if (!map.has(q.id)) map.set(q.id, q);
//       }
//       return Array.from(map.values());
//     };

//     // when 'all' main tab is selected, merge all lists and deduplicate by id, then apply session filter
//     if (activeMainTab === "all") {
//       const lists = [source.starred || [], source.unstarred || [], source.shortnotice || []];
//       const mergedList = [];
//       for (const l of lists) mergedList.push(...(Array.isArray(l) ? l : []));
//       const merged = filterAndDedupe(mergedList);
//       setCurrentQuestions(merged);
//     } else {
//       const dataKey = activeMainTab === "short-notice" ? "shortnotice" : activeMainTab;
//       if (dataKey === "starred") {
//         const allStarred = Array.isArray(source.starred) ? source.starred : [];
//         // If Session filter is 'All' (sessionNo == null) show ALL starred questions.
//         // If sessionNo is provided, show starred questions matching that session (answered or not).
//         const starred = filterAndDedupe(allStarred);
//         setCurrentQuestions(starred);
//       } else {
//         const list = Array.isArray(source[dataKey]) ? source[dataKey] : [];
//         const filtered = filterAndDedupe(list);
//         setCurrentQuestions(filtered);
//       }
//     }
//     setCurrentPage(1);
//   }, [questionsApiData, activeMainTab, sessionNo]);

//   // Derive SESSION options from questions API data (unique session_id values)
//   const sessionOptionsFromQuestions = React.useMemo(() => {
//     const src = questionsApiData || questionsData;
//     // gather all session_id/session_no values from starred/unstarred/shortnotice
//     const lists = [src.starred || [], src.unstarred || [], src.shortnotice || []];
//     const ids = new Set();
//     for (const list of lists) {
//       for (const q of list) {
//         const v = q?.session_id ?? q?.session_no ?? null;
//         if (v != null) ids.add(Number(v));
//       }
//     }
//     const arr = Array.from(ids).filter((n) => !Number.isNaN(n)).sort((a, b) => a - b);
//     return arr.map((n) => ({ value: n, label: String(n) }));
//   }, [questionsApiData]);

//   // final session options: prefer kla-sessions API, fall back to sessionOptionsFromQuestions
//   const finalSessionOptions = sessionOptions.length ? sessionOptions : sessionOptionsFromQuestions;

//   // Calendar date change handler
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   // Pagination helpers
//   const totalPages = Math.ceil(currentQuestions.length / itemsPerPage);
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxPagesToShow = 5;
//     if (totalPages <= maxPagesToShow) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       pages.push(1);
//       let start = Math.max(2, currentPage - 1);
//       let end = Math.min(totalPages - 1, currentPage + 1);
//       if (currentPage <= 3) end = 4;
//       if (currentPage >= totalPages - 2) start = totalPages - 3;
//       if (start > 2) pages.push("...");
//       for (let i = start; i <= end; i++) pages.push(i);
//       if (end < totalPages - 1) pages.push("...");
//       pages.push(totalPages);
//     }
//     return pages;
//   };

//   // Open question PDF
//   const handleQuestionPdfClick = (question) => {
//     setSelectedQuestion(question);
//     setShowPdfModal(true);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="wrapper ovh">
//       <header
//         className={`header-nav nav-homepage-style2 stricky main-menu ${
//           isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
//         }`}
//       >
//         <HomeTest />
//       </header>
//       <div className="body_content">
//         <CategoriesNav />

//         <BreadcrumbNav
//           breadcrumbs={[
//             { name: "Home", href: "/" },
//             { name: "Questions", href: "/questions" },
//           ]}
//         />

//         <section className="quest pt20 pb-0 pb30-md represent">
//           <div className="container">
//             <SectionTitle title="Questions" />

//             {/* --------------------Question procedure---------------------------------- */}
//             <QuestionTabs />

//             {/* --------------------starred/unstarred---------------------------------- */}
//             <div
//               className="row memberPro wow fadeInUp mt10 pt0"
//               data-wow-delay="300ms"
//             >
//               <div className="col-12">
//                 <div className="horiz-tab">
//                   <div className="widget_list">
//                     <nav>
//                       <div
//                         className="nav flex-row nav-tabs text-start"
//                         id="nav-tab"
//                         role="tablist"
//                       >
//                         <button
//                           className={`nav-link text-start ${
//                             activeMainTab === "starred" ? "active" : ""
//                           }`}
//                           id="nav-star-tab"
//                           type="button"
//                           role="tab"
//                           aria-controls="nav-star"
//                           aria-selected={activeMainTab === "starred"}
//                           onClick={() => handleMainTabClick("starred")}
//                         >
//                           <span>Starred Questions</span>
//                         </button>
//                         <button
//                           className={`nav-link text-start ${
//                             activeMainTab === "unstarred" ? "active" : ""
//                           }`}
//                           id="nav-unstar-tab"
//                           type="button"
//                           role="tab"
//                           aria-controls="nav-unstar"
//                           aria-selected={activeMainTab === "unstarred"}
//                           onClick={() => handleMainTabClick("unstarred")}
//                         >
//                           <span>Unstarred Questions</span>
//                         </button>
//                         <button
//                           className={`nav-link text-start ${
//                             activeMainTab === "short-notice" ? "active" : ""
//                           }`}
//                           id="nav-short-tab"
//                           type="button"
//                           role="tab"
//                           aria-controls="nav-short"
//                           aria-selected={activeMainTab === "short-notice"}
//                           onClick={() => handleMainTabClick("short-notice")}
//                         >
//                           <span>Short Notice Questions</span>
//                         </button>
//                       </div>
//                     </nav>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-12 mt30 committeeDt">
//                 <div className="terms_condition_grid text-start">
//                   <div className="tab-content" id="nav-tabContent">
//                     {activeMainTab === "starred" && (
//                       <div
//                         className="tab-pane fade show active"
//                         id="nav-star"
//                         role="tabpanel"
//                         aria-labelledby="nav-star-tab"
//                       >
//                         <div className="question grids starr">
//                           <div className="row">
//                             <div className="col-lg-8">
//                               <div className="tab-title">
//                                 <h6>Search By Filter</h6>
//                               </div>

//                               <Filter
//                                 filterKeys={[
//                                   "KLA",
//                                   "SESSION_TYPE",
//                                   "MEMBER",
//                                   "MINISTER",
//                                   "SEARCH",
//                                   "DATE",
//                                 ]}
//                                 onFiltersChange={handleFiltersChange}
//                                 overrides={{
//                                   // pass kla options and defaultValue from API
//                                   KLA: { options: klaOptions, defaultValue: klaId },
//                                   // prefer kla-session options (finalSessionOptions), fall back to sessionOptionsFromQuestions
//                                   SESSION_TYPE: { defaultValue: "", options: [{ value: "", label: "All" }, ...(finalSessionOptions || [])] },
//                                 }}
//                               />
//                               <ExportButton />
//                             </div>

//                             {/* Calendar Section - 4 columns */}
//                             <div className="col-lg-4 section-calendar">
//                               <div className="tab-title">
//                                 <h6 className="mb--0 tab-section-date">
//                                   {/* <img src='../images/calendar.svg' alt="calendar" style={{width: '18px', height: '18px', marginRight: '5px'}} /> */}
//                                   <span className="section-text">
//                                     Section date from
//                                   </span>
//                                   <span className="date-range">
//                                     <span
//                                       style={{
//                                         marginLeft: "5px",
//                                         backgroundColor: "#e9e9e9",
//                                         color: "black",
//                                         padding: "6px 10px 4px 10px",
//                                         borderRadius: "4px",
//                                       }}
//                                     >
//                                       05 Jul 2025
//                                     </span>{" "}
//                                     to
//                                     {/* <FontAwesomeIcon icon={faCalendar} style={{marginLeft: '5px', marginRight:"5px", color: 'black'}} /> */}
//                                     <span
//                                       style={{
//                                         marginLeft: "5px",
//                                         backgroundColor: "#e9e9e9",
//                                         color: "black",
//                                         padding: "6px 10px 4px 10px",
//                                         borderRadius: "4px",
//                                       }}
//                                     >
//                                       05 Aug 2025
//                                     </span>
//                                   </span>
//                                 </h6>
//                               </div>
//                               <div className="bg-white border rounded p-2 h--100 mb20">
//                                 <Calendar
//                                   className="w-100"
//                                   value={selectedDate}
//                                   defaultActiveStartDate={
//                                     new Date("2025-07-01")
//                                   }
//                                   tileClassName={({ date }) => {
//                                     // Parse the date range from the span text
//                                     const dateRangeText =
//                                       "05-07-2025 to 05-08-2025";
//                                     const [fromDateStr, toDateStr] =
//                                       dateRangeText.split(" to ");

//                                     // Convert string dates to Date objects
//                                     const fromDate = new Date(
//                                       fromDateStr.split("-").reverse().join("-")
//                                     );
//                                     const toDate = new Date(
//                                       toDateStr.split("-").reverse().join("-")
//                                     );

//                                     // Check if current date is within the range (including from and to dates)
//                                     const isInRange =
//                                       date >= fromDate && date <= toDate;

//                                     // Check if this is July 5th (additional active date)
//                                     const july5th = new Date("2025-07-05");
//                                     const isJuly5th =
//                                       date.toDateString() ===
//                                       july5th.toDateString();

//                                     // Check if this is the selected date
//                                     const isSelected =
//                                       selectedDate &&
//                                       date.toDateString() ===
//                                         selectedDate.toDateString();

//                                     // Apply styles based on conditions
//                                     if (isSelected) {
//                                       return "date-selected";
//                                     } else if (isInRange || isJuly5th) {
//                                       return "date-active";
//                                     } else {
//                                       return "date-inactive";
//                                     }
//                                   }}
//                                   tileContent={({ date }) => {
//                                     const dateString = date
//                                       .toISOString()
//                                       .split("T")[0];
//                                     if (eventDates.includes(dateString)) {
//                                       return (
//                                         <div
//                                           className="position-absolute bottom-0 start-50 translate-middle-x bg-danger rounded-circle"
//                                           style={{
//                                             width: "6px",
//                                             height: "6px",
//                                           }}
//                                         ></div>
//                                       );
//                                     }
//                                     return null;
//                                   }}
//                                   onChange={(date) => {
//                                     // Allow selection of any date within the range
//                                     const dateRangeText =
//                                       "05-07-2025 to 05-08-2025";
//                                     const [fromDateStr, toDateStr] =
//                                       dateRangeText.split(" to ");
//                                     const fromDate = new Date(
//                                       fromDateStr.split("-").reverse().join("-")
//                                     );
//                                     const toDate = new Date(
//                                       toDateStr.split("-").reverse().join("-")
//                                     );

//                                     // Check if the date is within the range (including from and to dates)
//                                     const isInRange =
//                                       date >= fromDate && date <= toDate;

//                                     // Check if this is July 5th (additional active date)
//                                     const july5th = new Date("2025-07-05");
//                                     const isJuly5th =
//                                       date.toDateString() ===
//                                       july5th.toDateString();

//                                     if (isInRange || isJuly5th) {
//                                       handleDateChange(date);
//                                     }
//                                   }}
//                                   navigationLabel={({ date }) => {
//                                     // Parse the date range
//                                     const dateRangeText =
//                                       "05-07-2025 to 05-08-2025";
//                                     const [fromDateStr, toDateStr] =
//                                       dateRangeText.split(" to ");
//                                     const fromDate = new Date(
//                                       fromDateStr.split("-").reverse().join("-")
//                                     );
//                                     const toDate = new Date(
//                                       toDateStr.split("-").reverse().join("-")
//                                     );

//                                     // Check if current view month has any active dates
//                                     const currentMonth = date.getMonth();
//                                     const currentYear = date.getFullYear();
//                                     const fromMonth = fromDate.getMonth();
//                                     const fromYear = fromDate.getFullYear();
//                                     const toMonth = toDate.getMonth();
//                                     const toYear = toDate.getFullYear();

//                                     // Check if current month is within the range or has July 5th
//                                     const isInRange =
//                                       (currentYear === fromYear &&
//                                         currentMonth >= fromMonth) ||
//                                       (currentYear === toYear &&
//                                         currentMonth <= toMonth) ||
//                                       (currentYear > fromYear &&
//                                         currentYear < toYear);

//                                     const july5th = new Date("2025-07-05");
//                                     const hasJuly5th =
//                                       currentYear === july5th.getFullYear() &&
//                                       currentMonth === july5th.getMonth();

//                                     if (isInRange || hasJuly5th) {
//                                       return `${date.toLocaleDateString(
//                                         "en-US",
//                                         {
//                                           month: "long",
//                                           year: "numeric",
//                                         }
//                                       )}`;
//                                     } else {
//                                       return `${date.toLocaleDateString(
//                                         "en-US",
//                                         {
//                                           month: "long",
//                                           year: "numeric",
//                                         }
//                                       )} (No active dates)`;
//                                     }
//                                   }}
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                             <div className="c-ptag">
//                               {/* <div className="dates mb-4">... */}
//                               <div className="ques">
//                                 {currentQuestionsPage.length > 0 ? (
//                                   currentQuestionsPage.map((question) => (
//                                     <QuestionCard
//                                       key={question.id}
//                                       question={question}
//                                       onPdfClick={handleQuestionPdfClick}
//                                       isStarredTab={activeQuestionTab === "starred"}
//                                     />
//                                   ))
//                                 ) : (
//                                   <div className="no-questions text-center p-4">
//                                     <p className="mb-0">No questions found for the selected session.</p>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>

//                             {totalPages > 1 && (
//                               <Pagination
//                                 currentPage={currentPage}
//                                 totalPages={totalPages}
//                                 onPageChange={handlePageChange}
//                                 totalItems={currentQuestions.length}
//                               />
//                             )}
//                         </div>
//                       </div>
//                     )}

//                     {activeMainTab === "unstarred" && (
//                       <div
//                         className="tab-pane fade show active"
//                         id="nav-unstar"
//                         role="tabpanel"
//                         aria-labelledby="nav-unstar-tab"
//                       >
//                         <div className="question grids starr">
//                           <div className="row">
//                             {/* Filter Section - 8 columns */}
//                             <div className="col-lg-8">
//                               <div className="tab-title">
//                                 <h6>Search By Filter</h6>
//                               </div>
//                               <Filter
//                                 filterKeys={[
//                                   "KLA",
//                                   "SESSION_TYPE",
//                                   "MEMBER",
//                                   "MINISTER",
//                                   "SEARCH",
//                                   "DATE",
//                                 ]}
//                                 onFiltersChange={handleFiltersChange}
//                                 overrides={{ KLA: { options: klaOptions, defaultValue: klaId }, SESSION_TYPE: { defaultValue: "", options: [{ value: "", label: "All" }, ...(finalSessionOptions || [])] } }}
//                               />
//                               <ExportButton />
//                             </div>

//                             {/* Calendar Section - 4 columns */}
//                             <div className="col-lg-4 section-calendar">
//                               <div className="tab-title">
//                                 <h6 className="mb--0 tab-section-date">
//                                   {/* <img src='../images/calendar.svg' alt="calendar" style={{width: '18px', height: '18px', marginRight: '5px'}} /> */}
//                                   <span className="section-text">
//                                     Section date from
//                                   </span>
//                                   <span className="date-range">
//                                     <span
//                                       style={{
//                                         marginLeft: "5px",
//                                         backgroundColor: "#e9e9e9",
//                                         color: "black",
//                                         padding: "6px 10px 4px 10px",
//                                         borderRadius: "4px",
//                                       }}
//                                     >
//                                       05 Jul 2025
//                                     </span>{" "}
//                                     to
//                                     {/* <FontAwesomeIcon icon={faCalendar} style={{marginLeft: '5px', marginRight:"5px", color: 'black'}} /> */}
//                                     <span
//                                       style={{
//                                         marginLeft: "5px",
//                                         backgroundColor: "#e9e9e9",
//                                         color: "black",
//                                         padding: "6px 10px 4px 10px",
//                                         borderRadius: "4px",
//                                       }}
//                                     >
//                                       05 Aug 2025
//                                     </span>
//                                   </span>
//                                 </h6>
//                               </div>
//                               <div className="bg-white border rounded p-2 h--100 mb20">
//                                 <Calendar
//                                   className="w-100"
//                                   value={selectedDate}
//                                   defaultActiveStartDate={
//                                     new Date("2025-07-01")
//                                   }
//                                   tileClassName={({ date }) => {
//                                     // Parse the date range from the span text
//                                     const dateRangeText =
//                                       "05-07-2025 to 05-08-2025";
//                                     const [fromDateStr, toDateStr] =
//                                       dateRangeText.split(" to ");

//                                     // Convert string dates to Date objects
//                                     const fromDate = new Date(
//                                       fromDateStr.split("-").reverse().join("-")
//                                     );
//                                     const toDate = new Date(
//                                       toDateStr.split("-").reverse().join("-")
//                                     );

//                                     // Check if current date is within the range (including from and to dates)
//                                     const isInRange =
//                                       date >= fromDate && date <= toDate;

//                                     // Check if this is July 5th (additional active date)
//                                     const july5th = new Date("2025-07-05");
//                                     const isJuly5th =
//                                       date.toDateString() ===
//                                       july5th.toDateString();

//                                     // Check if this is the selected date
//                                     const isSelected =
//                                       selectedDate &&
//                                       date.toDateString() ===
//                                         selectedDate.toDateString();

//                                     // Apply styles based on conditions
//                                     if (isSelected) {
//                                       return "date-selected";
//                                     } else if (isInRange || isJuly5th) {
//                                       return "date-active";
//                                     } else {
//                                       return "date-inactive";
//                                     }
//                                   }}
//                                   tileContent={({ date }) => {
//                                     const dateString = date
//                                       .toISOString()
//                                       .split("T")[0];
//                                     if (eventDates.includes(dateString)) {
//                                       return (
//                                         <div
//                                           className="position-absolute bottom-0 start-50 translate-middle-x bg-danger rounded-circle"
//                                           style={{
//                                             width: "6px",
//                                             height: "6px",
//                                           }}
//                                         ></div>
//                                       );
//                                     }
//                                     return null;
//                                   }}
//                                   onChange={(date) => {
//                                     // Allow selection of any date within the range
//                                     const dateRangeText =
//                                       "05-07-2025 to 05-08-2025";
//                                     const [fromDateStr, toDateStr] =
//                                       dateRangeText.split(" to ");
//                                     const fromDate = new Date(
//                                       fromDateStr.split("-").reverse().join("-")
//                                     );
//                                     const toDate = new Date(
//                                       toDateStr.split("-").reverse().join("-")
//                                     );

//                                     // Check if the date is within the range (including from and to dates)
//                                     const isInRange =
//                                       date >= fromDate && date <= toDate;

//                                     // Check if this is July 5th (additional active date)
//                                     const july5th = new Date("2025-07-05");
//                                     const isJuly5th =
//                                       date.toDateString() ===
//                                       july5th.toDateString();

//                                     if (isInRange || isJuly5th) {
//                                       handleDateChange(date);
//                                     }
//                                   }}
//                                   navigationLabel={({ date }) => {
//                                     // Parse the date range
//                                     const dateRangeText =
//                                       "05-07-2025 to 05-08-2025";
//                                     const [fromDateStr, toDateStr] =
//                                       dateRangeText.split(" to ");
//                                     const fromDate = new Date(
//                                       fromDateStr.split("-").reverse().join("-")
//                                     );
//                                     const toDate = new Date(
//                                       toDateStr.split("-").reverse().join("-")
//                                     );

//                                     // Check if current view month has any active dates
//                                     const currentMonth = date.getMonth();
//                                     const currentYear = date.getFullYear();
//                                     const fromMonth = fromDate.getMonth();
//                                     const fromYear = fromDate.getFullYear();
//                                     const toMonth = toDate.getMonth();
//                                     const toYear = toDate.getFullYear();

//                                     // Check if current month is within the range or has July 5th
//                                     const isInRange =
//                                       (currentYear === fromYear &&
//                                         currentMonth >= fromMonth) ||
//                                       (currentYear === toYear &&
//                                         currentMonth <= toMonth) ||
//                                       (currentYear > fromYear &&
//                                         currentYear < toYear);

//                                     const july5th = new Date("2025-07-05");
//                                     const hasJuly5th =
//                                       currentYear === july5th.getFullYear() &&
//                                       currentMonth === july5th.getMonth();

//                                     if (isInRange || hasJuly5th) {
//                                       return `${date.toLocaleDateString(
//                                         "en-US",
//                                         {
//                                           month: "long",
//                                           year: "numeric",
//                                         }
//                                       )}`;
//                                     } else {
//                                       return `${date.toLocaleDateString(
//                                         "en-US",
//                                         {
//                                           month: "long",
//                                           year: "numeric",
//                                         }
//                                       )} (No active dates)`;
//                                     }
//                                   }}
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="c-ptag">
//                             {/* <div className="dates mb-4">
//                           {currentFilterData.dates.map((date, index) => (
//                             <a key={index} href="#" className={`card ${date === '13-12-2025' ? 'active' : ''}`}>
//                               {date}
//                             </a>
//                           ))}
//                         </div> */}
//                             <div className="ques">
//                               {currentQuestionsPage.map((question) => (
//                                 <QuestionCard
//                                   key={question.id}
//                                   question={question}
//                                   onPdfClick={handleQuestionPdfClick}
//                                   isStarredTab={activeQuestionTab === "starred"}
//                                 />
//                               ))}
//                             </div>
//                           </div>
//                           <div className="mbp_pagination mt30 text-center mb-4">
//                             <ul className="page_navigation">
//                               <li
//                                 className={`page-item ${
//                                   currentPage === 1 ? "disabled" : ""
//                                 }`}
//                               >
//                                 <a
//                                   className="page-link"
//                                   href="#"
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     if (currentPage > 1)
//                                       handlePageChange(currentPage - 1);
//                                   }}
//                                 >
//                                   <FontAwesomeIcon
//                                     icon={faAngleLeft}
//                                     color="#222222"
//                                   />
//                                 </a>
//                               </li>

//                               {getPageNumbers().map((page, index) => (
//                                 <li
//                                   key={index}
//                                   className={`page-item ${
//                                     page === currentPage ? "active" : ""
//                                   } ${
//                                     page === "..."
//                                       ? "d-none d-sm-inline-block"
//                                       : ""
//                                   }`}
//                                   aria-current={
//                                     page === currentPage ? "page" : undefined
//                                   }
//                                 >
//                                   {page === "..." ? (
//                                     <a className="page-link" href="#">
//                                       ...
//                                     </a>
//                                   ) : (
//                                     <a
//                                       className="page-link"
//                                       href="#"
//                                       onClick={(e) => {
//                                         e.preventDefault();
//                                         handlePageChange(page);
//                                       }}
//                                     >
//                                       {page}{" "}
//                                       {page === currentPage && (
//                                         <span className="sr-only">
//                                           (current)
//                                         </span>
//                                       )}
//                                     </a>
//                                   )}
//                                 </li>
//                               ))}

//                               <li
//                                 className={`page-item ${
//                                   currentPage === totalPages ? "disabled" : ""
//                                 }`}
//                               >
//                                 <a
//                                   className="page-link"
//                                   href="#"
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     if (currentPage < totalPages)
//                                       handlePageChange(currentPage + 1);
//                                   }}
//                                 >
//                                   <FontAwesomeIcon
//                                     icon={faAngleRight}
//                                     color="#222222"
//                                   />
//                                 </a>
//                               </li>
//                             </ul>
//                             <p className="mt10 mb-0 pagination_page_count text-center">
//                               {startIndex + 1} –{" "}
//                               {Math.min(endIndex, currentQuestions.length)} of{" "}
//                               {currentQuestions.length}
//                             </p>
//                             {/* <p className="mt5 mb-0 text-center text-muted">
//                           Page {currentPage} of {totalPages}
//                         </p> */}
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {activeMainTab === "short-notice" && (
//                       <div
//                         className="tab-pane fade show active"
//                         id="nav-short"
//                         role="tabpanel"
//                         aria-labelledby="nav-short-tab"
//                       >
//                         <div className="question grids starr">
//                           <div className="row">
//                             {/* Filter Section - 8 columns */}
//                             <div className="col-lg-8">
//                               <div className="tab-title">
//                                 <h6>Search By Filter</h6>
//                               </div>
//                               <Filter
//                                 filterKeys={[
//                                   "KLA",
//                                   "SESSION_TYPE",
//                                   "MEMBER",
//                                   "MINISTER",
//                                   "SEARCH",
//                                 ]}
//                                   onFiltersChange={handleFiltersChange}
//                                   overrides={{ KLA: { options: klaOptions, defaultValue: klaId }, SESSION_TYPE: { defaultValue: "", options: [{ value: "", label: "All" }, ...(finalSessionOptions || [])] } }}
//                               />
//                               <ExportButton />
//                             </div>

//                             {/* Calendar Section - 4 columns */}
//                             <div className="col-lg-4 section-calendar">
//                               <div className="tab-title">
//                                 <h6 className="mb--0 tab-section-date">
//                                   {/* <img src='../images/calendar.svg' alt="calendar" style={{width: '18px', height: '18px', marginRight: '5px'}} /> */}
//                                   <span className="section-text">
//                                     Section date from
//                                   </span>
//                                   <span className="date-range">
//                                     <span
//                                       style={{
//                                         marginLeft: "5px",
//                                         backgroundColor: "#e9e9e9",
//                                         color: "black",
//                                         padding: "6px 10px 4px 10px",
//                                         borderRadius: "4px",
//                                       }}
//                                     >
//                                       05 Jul 2025
//                                     </span>{" "}
//                                     to
//                                     {/* <FontAwesomeIcon icon={faCalendar} style={{marginLeft: '5px', marginRight:"5px", color: 'black'}} /> */}
//                                     <span
//                                       style={{
//                                         marginLeft: "5px",
//                                         backgroundColor: "#e9e9e9",
//                                         color: "black",
//                                         padding: "6px 10px 4px 10px",
//                                         borderRadius: "4px",
//                                       }}
//                                     >
//                                       05 Aug 2025
//                                     </span>
//                                   </span>
//                                 </h6>
//                               </div>
//                               <div className="bg-white border rounded p-2 h--100 mb20">
//                                 <Calendar
//                                   className="w-100"
//                                   value={selectedDate}
//                                   defaultActiveStartDate={
//                                     new Date("2025-07-01")
//                                   }
//                                   tileClassName={({ date }) => {
//                                     // Parse the date range from the span text
//                                     const dateRangeText =
//                                       "05-07-2025 to 05-08-2025";
//                                     const [fromDateStr, toDateStr] =
//                                       dateRangeText.split(" to ");

//                                     // Convert string dates to Date objects
//                                     const fromDate = new Date(
//                                       fromDateStr.split("-").reverse().join("-")
//                                     );
//                                     const toDate = new Date(
//                                       toDateStr.split("-").reverse().join("-")
//                                     );

//                                     // Check if current date is within the range (including from and to dates)
//                                     const isInRange =
//                                       date >= fromDate && date <= toDate;

//                                     // Check if this is July 5th (additional active date)
//                                     const july5th = new Date("2025-07-05");
//                                     const isJuly5th =
//                                       date.toDateString() ===
//                                       july5th.toDateString();

//                                     // Check if this is the selected date
//                                     const isSelected =
//                                       selectedDate &&
//                                       date.toDateString() ===
//                                         selectedDate.toDateString();

//                                     // Apply styles based on conditions
//                                     if (isSelected) {
//                                       return "date-selected";
//                                     } else if (isInRange || isJuly5th) {
//                                       return "date-active";
//                                     } else {
//                                       return "date-inactive";
//                                     }
//                                   }}
//                                   tileContent={({ date }) => {
//                                     const dateString = date
//                                       .toISOString()
//                                       .split("T")[0];
//                                     if (eventDates.includes(dateString)) {
//                                       return (
//                                         <div
//                                           className="position-absolute bottom-0 start-50 translate-middle-x bg-danger rounded-circle"
//                                           style={{
//                                             width: "6px",
//                                             height: "6px",
//                                           }}
//                                         ></div>
//                                       );
//                                     }
//                                     return null;
//                                   }}
//                                   onChange={(date) => {
//                                     // Allow selection of any date within the range
//                                     const dateRangeText =
//                                       "05-07-2025 to 05-08-2025";
//                                     const [fromDateStr, toDateStr] =
//                                       dateRangeText.split(" to ");
//                                     const fromDate = new Date(
//                                       fromDateStr.split("-").reverse().join("-")
//                                     );
//                                     const toDate = new Date(
//                                       toDateStr.split("-").reverse().join("-")
//                                     );

//                                     // Check if the date is within the range (including from and to dates)
//                                     const isInRange =
//                                       date >= fromDate && date <= toDate;

//                                     // Check if this is July 5th (additional active date)
//                                     const july5th = new Date("2025-07-05");
//                                     const isJuly5th =
//                                       date.toDateString() ===
//                                       july5th.toDateString();

//                                     if (isInRange || isJuly5th) {
//                                       handleDateChange(date);
//                                     }
//                                   }}
//                                   navigationLabel={({ date }) => {
//                                     // Parse the date range
//                                     const dateRangeText =
//                                       "05-07-2025 to 05-08-2025";
//                                     const [fromDateStr, toDateStr] =
//                                       dateRangeText.split(" to ");
//                                     const fromDate = new Date(
//                                       fromDateStr.split("-").reverse().join("-")
//                                     );
//                                     const toDate = new Date(
//                                       toDateStr.split("-").reverse().join("-")
//                                     );

//                                     // Check if current view month has any active dates
//                                     const currentMonth = date.getMonth();
//                                     const currentYear = date.getFullYear();
//                                     const fromMonth = fromDate.getMonth();
//                                     const fromYear = fromDate.getFullYear();
//                                     const toMonth = toDate.getMonth();
//                                     const toYear = toDate.getFullYear();

//                                     // Check if current month is within the range or has July 5th
//                                     const isInRange =
//                                       (currentYear === fromYear &&
//                                         currentMonth >= fromMonth) ||
//                                       (currentYear === toYear &&
//                                         currentMonth <= toMonth) ||
//                                       (currentYear > fromYear &&
//                                         currentYear < toYear);

//                                     const july5th = new Date("2025-07-05");
//                                     const hasJuly5th =
//                                       currentYear === july5th.getFullYear() &&
//                                       currentMonth === july5th.getMonth();

//                                     if (isInRange || hasJuly5th) {
//                                       return `${date.toLocaleDateString(
//                                         "en-US",
//                                         {
//                                           month: "long",
//                                           year: "numeric",
//                                         }
//                                       )}`;
//                                     } else {
//                                       return `${date.toLocaleDateString(
//                                         "en-US",
//                                         {
//                                           month: "long",
//                                           year: "numeric",
//                                         }
//                                       )} (No active dates)`;
//                                     }
//                                   }}
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="c-ptag">
//                             {/* <div className="dates mb-4">
//                           {currentFilterData.dates.map((date, index) => (
//                             <a key={index} href="#" className={`card ${date === '13-12-2025' ? 'active' : ''}`}>
//                               {date}
//                             </a>
//                           ))}
//                         </div> */}
//                             <div className="ques">
//                               {currentQuestionsPage.map((question) => (
//                                 <QuestionCard
//                                   key={question.id}
//                                   question={question}
//                                   onPdfClick={handleQuestionPdfClick}
//                                   isStarredTab={activeQuestionTab === "starred"}
//                                 />
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* PDF Modal for Questions */}
//         <Modal
//           show={showPdfModal}
//           onHide={closePdfModal}
//           dialogClassName="modal-xl"
//           centered
//         >
//           <Modal.Header closeButton>
//             <Modal.Title className="modal-title">
//               {selectedQuestion
//                 ? `Question ${selectedQuestion.number} - ${selectedQuestion.title}`
//                 : "Question Details"}
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body style={{ height: "80vh" }}>
//             {selectedQuestion ? (
//               <div className="pdf-viewer-container">
//                 <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//                   <Viewer
//                     // If the question has attachments (array), prefer the first attachment URL
//                     fileUrl={
//                       selectedQuestion.attachments &&
//                       Array.isArray(selectedQuestion.attachments) &&
//                       selectedQuestion.attachments.length > 0
//                         ? selectedQuestion.attachments[0]
//                         : dummyPdf2
//                     }
//                     plugins={[defaultLayoutPluginInstance]}
//                   />
//                 </Worker>
//               </div>
//             ) : (
//               <div className="text-center">
//                 <p>No question selected</p>
//               </div>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={closePdfModal}>
//               Close
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Questions;
