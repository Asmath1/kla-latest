import React, { useState, useEffect } from "react";
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
import { API_ENDPOINTS } from "../../utils/config";
import "./ListOfPapersLaid.css";

const PapersToBeLaid = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [papersData, setPapersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch papers data from API
  useEffect(() => {
    fetch(API_ENDPOINTS.PAPERS_LAID)
      .then((res) => res.json())
      .then((json) => {
        if (json.status && json.data) {
          setPapersData(json.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch papers laid data:", err);
        setIsLoading(false);
      });
  }, []);

  const allowedActiveDates = [
    "2025-07-02",
    "2025-07-04",
    "2025-07-08",
    "2025-07-15",
    "2025-07-20",
    "2025-08-02",
  ];

  const meetingDates = ["2025-07-04", "2025-07-08", "2025-07-15", "2025-07-20"];

  // PDF data for each date using existing dummy PDFs
  const datePdfData = {
    "2025-07-04": [
      { id: 1, name: "List 1", url: "/pdf1.pdf" },
      { id: 2, name: "List 2", url: "/dummy.pdf" },
      { id: 3, name: "List 3", url: "/pdff.pdf" },
    ],
    "2025-07-08": [
      { id: 1, name: "Report A", url: "/pdf1.pdf" },
      { id: 2, name: "Report B", url: "/dummy.pdf" },
    ],
    "2025-07-15": [
      { id: 1, name: "Document X", url: "/pdff.pdf" },
      { id: 2, name: "Document Y", url: "/pdf1.pdf" },
      { id: 3, name: "Document Z", url: "/dummy.pdf" },
    ],
    "2025-07-20": [{ id: 1, name: "Summary Report", url: "/pdf1.pdf" }],
  };

  // Auto-select first meeting date and first PDF on load
  useEffect(() => {
    const meetingDates = ["2025-07-04", "2025-07-08", "2025-07-15", "2025-07-20"];
    const datePdfData = {
      "2025-07-04": [
        { id: 1, name: "List 1", url: "/pdf1.pdf" },
        { id: 2, name: "List 2", url: "/dummy.pdf" },
        { id: 3, name: "List 3", url: "/pdff.pdf" },
      ],
      "2025-07-08": [
        { id: 1, name: "Report A", url: "/pdf1.pdf" },
        { id: 2, name: "Report B", url: "/dummy.pdf" },
      ],
      "2025-07-15": [
        { id: 1, name: "Document X", url: "/pdff.pdf" },
        { id: 2, name: "Document Y", url: "/pdf1.pdf" },
        { id: 3, name: "Document Z", url: "/dummy.pdf" },
      ],
      "2025-07-20": [{ id: 1, name: "Summary Report", url: "/pdf1.pdf" }],
    };

    if (meetingDates.length > 0) {
      const firstDate = new Date(meetingDates[0]);
      setSelectedDate(firstDate);

      // Set the first PDF as active
      const firstDateString = firstDate.toISOString().split("T")[0];
      const firstPdfList = datePdfData[firstDateString];
      if (firstPdfList && firstPdfList.length > 0) {
        setSelectedPdf(firstPdfList[0].url);
      }
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Set the first PDF of the new date as active
    const dateString = date.toISOString().split("T")[0];
    const pdfList = datePdfData[dateString];
    if (pdfList && pdfList.length > 0) {
      setSelectedPdf(pdfList[0].url);
    } else {
      setSelectedPdf(null);
    }
  };

  // Map date → PDF
  const getPdfUrlForDate = (date) => {
    if (!date) return null;
    const dateString = date.toISOString().split("T")[0];
    if (meetingDates.includes(dateString)) {
      return "/papers.pdf"; // Replace with actual paper PDFs
    }
    return null;
  };

  const handlePdfClick = (url) => {
    setSelectedPdf(url);
  };

  // Get PDF list for selected date
  const getPdfListForDate = (date) => {
    if (!date) return [];
    const dateString = date.toISOString().split("T")[0];
    return datePdfData[dateString] || [];
  };

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
            { name: "Business", href: "/business" },
            { name: "Papers Laid on the Table", href: "/business/papers" },
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
                        <div className="row">
                          <div className="col-lg-7 col-md-6">
                            <Filter filterKeys={["KLA", "SESSION_TYPE"]} />{" "}
                          </div>
                          <div className="col-lg-5 col-md-6 p-0">
                            <SessionCalendar
                              selectedDate={selectedDate}
                              onDateChange={handleDateChange}
                              startDate="02-07-2025"
                              endDate="05-08-2025"
                              meetingDates={meetingDates}
                              allowedDates={allowedActiveDates}
                              height="300px"
                              width="100%"
                            />
                          </div>
                        </div>

                        <div className="session-list-buss row mt-4">
                          <ExportButton />

                          <div className="table-responsive">
                            <table className="table table-bordered myTable2">
                              <thead>
                                <tr>
                                  <th style={{ width: "10%" }}>Sl. No</th>
                                  <th style={{ width: "15%" }}>KLA</th>
                                  <th style={{ width: "20%" }}>Session</th>
                                  <th style={{ width: "20%" }}>Date</th>
                                  <th style={{ width: "35%" }}>File</th>
                                </tr>
                              </thead>
                              <tbody>
                                {isLoading ? (
                                  <tr>
                                    <td colSpan="5" className="text-center">
                                      Loading...
                                    </td>
                                  </tr>
                                ) : papersData.length > 0 ? (
                                  papersData.map((item, idx) => (
                                    <tr key={item.id}>
                                      <td>{idx + 1}</td>
                                      <td>{item.kla_id}th</td>
                                      <td>{item.title}</td>
                                      <td>
                                        {new Date(
                                          item.created_at
                                        ).toLocaleDateString()}
                                      </td>
                                      <td>
                                        {item.websitelink ? (
                                          <a
                                            href={item.websitelink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            View File
                                          </a>
                                        ) : (
                                          "N/A"
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="5" className="text-center">
                                      No data available
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
                              startDate="02-07-2025"
                              endDate="05-08-2025"
                              meetingDates={meetingDates}
                              allowedDates={allowedActiveDates}
                              height="400px"
                              width="100%"
                            />
                          </div>

                          {/* ---------------------middle session----------- */}
                          <div className="papers-list col-lg-2 col-md-6">
                            <br />
                            <div className="papers-box">
                              <div className="serial-no">
                                {/* Papers for{" "}
                                {selectedDate
                                  ? selectedDate.toLocaleDateString()
                                  : "Select Date"} */}
                                SI.No: 68
                              </div>
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
                                    >
                                      <span>{pdf.name}</span>
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
                                {getPdfListForDate(selectedDate).length ===
                                  0 && (
                                  <li>
                                    <span className="no-papers-message">
                                      No papers available for this date
                                    </span>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>

                          {/* PDF Viewer (right) */}
                          <div className="col-lg-6 col-md-6">
                            {/* <br />
                            <br /> */}

                            <InlinePdfViewer
                              fileUrl={
                                selectedPdf || getPdfUrlForDate(selectedDate)
                              }
                              height="400px"
                            />
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
    </div>
  );
};

export default PapersToBeLaid;

{
  /* <div className="col-lg-6 col-md-6">
                            <SessionCalendar
                              selectedDate={selectedDate}
                              onDateChange={handleDateChange}
                              startDate="02-07-2025"
                              endDate="05-08-2025"
                              meetingDates={meetingDates}
                              allowedDates={allowedActiveDates}
                              height="400px"
                              width="100%"
                            />
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="pdf-viewer-container">
                              <h3 className="pdf-viewer-title">
                                {selectedPdf
                                  ? "PDF Viewer"
                                  : "Select a PDF to view"}
                              </h3>
                              <InlinePdfViewer
                                fileUrl={
                                  selectedPdf || getPdfUrlForDate(selectedDate)
                                }
                                height="400px"
                              />
                            </div>
                          </div> */
}
