// import React, { useState, useEffect } from "react";
// import HomeTest from "../Header";
// import {
//   CategoriesNav,
//   BreadcrumbNav,
//   SectionTitle,
//   Filter,
//   Tabs,
//   ExportButton,
//   SessionCalendar,
// } from "../common";
// import InlinePdfViewer from "../common/InlinePdfViwer";
// import "./SessionSchedule.css"

// const Proceedings = () => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   // -------- Unedited Proceedings --------
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [activeEventId, setActiveEventId] = useState(null);

//   // -------- Final Proceedings --------
//   const [selectedDateFinal, setSelectedDateFinal] = useState(null);
//   const [selectedPdfFinal, setSelectedPdfFinal] = useState(null);
//   const [activeEventIdFinal, setActiveEventIdFinal] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Allowed dates
//   const allowedActiveDates = [
//     "2025-07-02",
//     "2025-07-05",
//     "2025-07-08",
//     "2025-07-15",
//     "2025-07-20",
//     "2025-08-02",
//   ];

//   // ------------------- Unedited Proceedings data -------------------
//   const datePdfData = {
//     "2025-07-05": [
//       { id: 1, name: " Question Hour", url: "/pdf1.pdf" },
//       { id: 2, name: " Obituary Reference", url: "/dummy.pdf" },
//       { id: 3, name: " Adjournment Motion", url: "/pdff.pdf" },
//       { id: 4, name: " Calling Attention", url: "/pdf1.pdf" },
//       { id: 5, name: " Submission", url: "/pdf1.pdf" },
//       { id: 6, name: " Papers laid on Table ", url: "/pdf1.pdf" },
//       { id: 7, name: "  Legislative business ", url: "/pdf1.pdf" },
//       {
//         id: 8,
//         name: "  Consideration of Amendments to Rules ",
//         url: "/pdf1.pdf",
//       },
//       { id: 9, name: "  Breach of privilege & review ", url: "/pdf1.pdf" },
//       { id: 10, name: " Discussion on the budget ", url: "/pdf1.pdf" },
//     ],
//     "2025-07-08": [
//       { id: 1, name: "Point of Order", url: "/pdf1.pdf" },
//       { id: 2, name: " Legislative Business", url: "/dummy.pdf" },
//     ],
//     "2025-07-15": [
//       { id: 1, name: " Financial Business", url: "/pdf1.pdf" },
//       { id: 4, name: " Calling Attention", url: "/pdf1.pdf" },
//       { id: 5, name: " Submission", url: "/pdf1.pdf" },
//       { id: 6, name: " Papers laid on Table ", url: "/pdf1.pdf" },
//       { id: 7, name: "  Legislative business ", url: "/pdf1.pdf" },
//     ],
//     "2025-07-20": [{ id: 1, name: "Summary Report", url: "/pdf1.pdf" }],
//   };
//   const meetingDates = Object.keys(datePdfData);

//   // ------------------- Final Proceedings data -------------------
//   const datePdfDataFinal = {
//     "2025-07-06": [
//       { id: 1, name: " Final Report - Part A", url: "/pdf1.pdf" },
//       { id: 2, name: " Final Report - Part B", url: "/pdf1.pdf" },
//       { id: 3, name: " Adjournment Motion", url: "/pdff.pdf" },
//       { id: 4, name: " Calling Attention", url: "/pdf1.pdf" },
//       { id: 5, name: " Submission", url: "/pdf1.pdf" },
//       { id: 6, name: " Papers laid on Table ", url: "/pdf1.pdf" },
//     ],
//     "2025-07-12": [
//       { id: 1, name: " Final Proceedings Summary", url: "/dummy.pdf" },
//     ],
//     "2025-07-18": [
//       { id: 1, name: " Financial Proceedings", url: "/pdf1.pdf" },
//       { id: 2, name: " Legislative Proceedings", url: "/pdf1.pdf" },
//     ],
//   };
//   const meetingDatesFinal = Object.keys(datePdfDataFinal);

//   // -------- Default select Unedited Proceedings first date --------
//   useEffect(() => {
//     if (meetingDates.length > 0) {
//       const firstDate = new Date(meetingDates[0]);
//       setSelectedDate(firstDate);

//       const firstDateString = firstDate.toISOString().split("T")[0];
//       const firstPdfList = datePdfData[firstDateString];
//       if (firstPdfList && firstPdfList.length > 0) {
//         setSelectedPdf(firstPdfList[0].url);
//         setActiveEventId(firstPdfList[0].id);
//       }
//     }
//   }, []);

//   // -------- Default select Final Proceedings first date --------
//   useEffect(() => {
//     if (meetingDatesFinal.length > 0) {
//       const firstDate = new Date(meetingDatesFinal[0]);
//       setSelectedDateFinal(firstDate);

//       const firstDateString = firstDate.toISOString().split("T")[0];
//       const firstPdfList = datePdfDataFinal[firstDateString];
//       if (firstPdfList && firstPdfList.length > 0) {
//         setSelectedPdfFinal(firstPdfList[0].url);
//         setActiveEventIdFinal(firstPdfList[0].id);
//       }
//     }
//   }, []);

//   // -------- Handlers --------
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     const dateString = date.toISOString().split("T")[0];
//     const pdfList = datePdfData[dateString];
//     if (pdfList && pdfList.length > 0) {
//       setSelectedPdf(pdfList[0].url);
//       setActiveEventId(pdfList[0].id);
//     } else {
//       setSelectedPdf(null);
//       setActiveEventId(null);
//     }
//   };

//   const handleDateChangeFinal = (date) => {
//     setSelectedDateFinal(date);
//     const dateString = date.toISOString().split("T")[0];
//     const pdfList = datePdfDataFinal[dateString];
//     if (pdfList && pdfList.length > 0) {
//       setSelectedPdfFinal(pdfList[0].url);
//       setActiveEventIdFinal(pdfList[0].id);
//     } else {
//       setSelectedPdfFinal(null);
//       setActiveEventIdFinal(null);
//     }
//   };

//   // -------- Render events --------
//   const renderEvents = (date, pdfData, activeEventId, setPdf, setEventId) => {
//     if (!date) return <p>Select a date</p>;

//     const dateString = date.toISOString().split("T")[0];
//     const pdfList = pdfData[dateString];

//     if (!pdfList || pdfList.length === 0) {
//       return <p>No events for this date</p>;
//     }

//     return pdfList.map((item) => {
//       const isActive = item.id === activeEventId;
//       return (
//         <div className="proceeding-item-div" key={item.id}>
//           <a
//             href="#"
//             className={`proc d-flex align-items-center mb ${
//               isActive ? "active-event" : ""
//             }`}
//             onClick={(e) => {
//               e.preventDefault();
//               setPdf(item.url);
//               setEventId(item.id);
//             }}
//           >
//             <span>{item.name}</span>
//             <div className="imgx">
//               <img src="images/file2.svg" width={16} alt="" />
//             </div>
//           </a>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="wrapper ovh">
//       {/* ---------------- HEADER ---------------- */}
//       <header
//         className={`header-nav nav-homepage-style2 stricky main-menu ${
//           isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
//         }`}
//       >
//         <HomeTest />
//       </header>

//       <div className="body_content">
//         {/* ---------------- NAVIGATION ---------------- */}
//         <CategoriesNav />
//         <BreadcrumbNav
//           breadcrumbs={[
//             { name: "Home", href: "/" },
//             { name: "Business", href: "/business" },
//             { name: "Proceedings", href: "/business/proceedings" },
//           ]}
//         />

//         {/* ---------------- MAIN CONTENT ---------------- */}
//         <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
//           <div className="container">
//             <SectionTitle title="Proceedings" />

//             <Tabs
//               tabs={[
//                 {
//                   key: "Unedited Proceedings",
//                   label: "Unedited Proceedings",
//                   content: (
//                     <div className="bill-content col-md-12 mt30 committeeDt">
//                       <div className="terms_condition_grid text-start col-lg-12">
//                         <div className="session-list-buss row mt-4">
//                           <div className="col-lg-8 col-md-8">
//                             <Filter filterKeys={["KLA", "SESSION_TYPE"]} />
//                             <ExportButton />
//                               <h3 className="rule-title">Events</h3>

//                             <div className="proceedings-list">
//                               {renderEvents(
//                                 selectedDate,
//                                 datePdfData,
//                                 activeEventId,
//                                 setSelectedPdf,
//                                 setActiveEventId
//                               )}
//                             </div>
//                           </div>
//                           <div className="col-lg-4 col-md-4">
//                             <SessionCalendar
//                               selectedDate={selectedDate}
//                               onDateChange={handleDateChange}
//                               startDate="02-07-2025"
//                               endDate="05-08-2025"
//                               meetingDates={meetingDates}
//                               allowedDates={allowedActiveDates}
//                               width="100%"
//                             />
//                           </div>
//                         </div>

//                         <div className="col-lg-12 row">
//                           <div className="col-lg-9 col-md-8">
//                             <InlinePdfViewer
//                               fileUrl={selectedPdf}
//                               height="600px"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ),
//                 },
//                 {
//                   key: "Final Proceedings",
//                   label: "Final Proceedings",
//                   content: (
//                     <div className="bill-content col-md-12 mt30 committeeDt">
//                       <div className="terms_condition_grid text-start col-lg-12">
//                         <div className="session-list-buss row mt-4">
//                           <div className="col-lg-8">
//                             <Filter filterKeys={["KLA", "SESSION_TYPE"]} />
//                             <ExportButton />
//                              <h5 className="rule-title">Events</h5>

//                             <div className="proceedings-list">
//                               {renderEvents(
//                                 selectedDate,
//                                 datePdfData,
//                                 activeEventId,
//                                 setSelectedPdf,
//                                 setActiveEventId
//                               )}
//                             </div>
//                           </div>
//                           <div className="col-lg-4 col-md-4">
//                             <SessionCalendar
//                               selectedDate={selectedDateFinal}
//                               onDateChange={handleDateChangeFinal}
//                               startDate="02-07-2025"
//                               endDate="05-08-2025"
//                               meetingDates={meetingDatesFinal}
//                               allowedDates={allowedActiveDates}
//                               // height="400px"
//                               width="100%"
//                             />
//                           </div>
//                         </div>

//                         <div className="col-lg-12 row">
                          
//                           <div className="col-lg-9 col-md-8">
//                             <InlinePdfViewer
//                               fileUrl={selectedPdfFinal}
//                               height="600px"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ),
//                 },
//               ]}
//               onChange={() => {}}
//             />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Proceedings
// ---------------------------------------------

import React, { useState, useEffect } from "react";
import HomeTest from "../Header";
import {
  CategoriesNav,
  BreadcrumbNav,
  SectionTitle,
  Filter,
  Tabs,
  ExportButton,
  SessionCalendar,
} from "../common";
import InlinePdfViewer from "../common/InlinePdfViwer";
import { fetchProceedings } from "../../api/services/all.service";

const Proceedings = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [activeEventId, setActiveEventId] = useState(null);
  const [proceedingsData, setProceedingsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch proceedings data from API
  useEffect(() => {
    const loadProceedings = async () => {
      try {
        setLoading(true);
        const data = await fetchProceedings();
        setProceedingsData(data);
      } catch (error) {
        console.error("Failed to load proceedings:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProceedings();
  }, []);

  // Transform API data into date-grouped structure
  const datePdfData = proceedingsData.reduce((acc, item) => {
    const date = item.proceedings_date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({
      id: item.id,
      name: `${item.event}`,
      member: item.member,
      url: item.pdf_link || "/dummy.pdf",
    });
    return acc;
  }, {});

  const meetingDates = Object.keys(datePdfData).sort();
  
  // Extract unique dates for calendar
  const allowedActiveDates = meetingDates;

  // Set default date & first PDF when data loads
  useEffect(() => {
    if (!loading && proceedingsData.length > 0) {
      // Compute dates inline to avoid dependency
      const groupedData = proceedingsData.reduce((acc, item) => {
        const date = item.proceedings_date;
        if (!acc[date]) acc[date] = [];
        acc[date].push({
          id: item.id,
          name: `${item.event}`,
          member: item.member,
          url: item.pdf_link || "/dummy.pdf",
        });
        return acc;
      }, {});
      
      const dates = Object.keys(groupedData).sort();
      if (dates.length > 0) {
        const firstDate = new Date(dates[0]);
        setSelectedDate(firstDate);

        const firstDateString = firstDate.toISOString().split("T")[0];
        const firstPdfList = groupedData[firstDateString];
        if (firstPdfList && firstPdfList.length > 0) {
          setSelectedPdf(firstPdfList[0].url);
          setActiveEventId(firstPdfList[0].id);
        }
      }
    }
  }, [loading, proceedingsData]);

  // When clicking on a calendar date
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateString = date.toISOString().split("T")[0];
    const pdfList = datePdfData[dateString];
    if (pdfList && pdfList.length > 0) {
      setSelectedPdf(pdfList[0].url);
      setActiveEventId(pdfList[0].id);
    } else {
      setSelectedPdf(null);
      setActiveEventId(null);
    }
  };

  // Proceedings list (for "Final Proceedings" tab)
  const proceedings = [
    { id: 1, title: "Proceeding No 101", fileUrl: "/dummy.pdf" },
    { id: 2, title: "Proceeding No 102", fileUrl: "/dummy.pdf" },
    { id: 3, title: "Proceeding No 103", fileUrl: "/dummy.pdf" },
    { id: 4, title: "Proceeding No 104", fileUrl: "/dummy.pdf" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (proceedings.length > 0) setActiveIndex(0);
  }, [proceedings.length]);

  const activeFileUrl = proceedings[activeIndex]?.fileUrl || null;

  // Render Proceedings List (Final Proceedings tab)
  const renderProceedingsList = () => (
    <div className="d-flex flex-column">
      {proceedings.map((p, idx) => {
        const isActive = idx === activeIndex;
        const isHovered = idx === hoveredIndex;
        const baseStyle = {
          cursor: "pointer",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          transition: "all .15s ease",
        };
        const activeStyle = isActive
          ? {
              background: "var(--clr--primary)",
              color: "#fff",
              borderColor: "var(--clr--primary)",
            }
          : {};
        const hoverStyle =
          !isActive && isHovered
            ? {
                background: "#ebe7fd",
                color: "var(--clr--primary)",
                borderColor: "var(--clr--primary)",
              }
            : {};

        return (
          <div
            key={p.id}
            className="mb-2"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setActiveIndex(idx)}
          >
            <div
              className="card"
              style={{ ...baseStyle, ...hoverStyle, ...activeStyle }}
            >
              <div className="card-body py-2 px-3 d-flex align-items-center justify-content-between">
                <span className="fw-semibold">{p.title}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Render Events dynamically for selectedDate
  const renderEvents = () => {
    if (loading) return <p>Loading events...</p>;
    if (!selectedDate) return <p>Select a date</p>;

    const dateString = selectedDate.toISOString().split("T")[0];
    const pdfList = datePdfData[dateString];

    if (!pdfList || pdfList.length === 0) {
      return <p>No events for this date</p>;
    }

    return pdfList.map((item) => {
      const isActive = item.id === activeEventId;
      return (
        <div key={item.id} className="w-100">
          <a
            href="#"
            className={`proc d-flex align-items-center mb-2 ${
              isActive ? "active-event" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setSelectedPdf(item.url);
              setActiveEventId(item.id);
            }}
          >
            <span>{item.name}</span>
            {/* {item.member && <small className="text-muted ms-2">({item.member})</small>} */}
            <div className="imgx">
              <img src="images/file2.svg" width={16} alt="" />
            </div>
          </a>
        </div>
      );
    });
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
            { name: "Business", href: "/session-schedule" },
            { name: "Proceedings", href: "/proceedings" },
          ]}
        />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Proceedings" />

            <Tabs
              tabs={[
                {
                  key: "Unedited Proceedings",
                  label: "Unedited Proceedings",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      <div className="terms_condition_grid text-start col-lg-12">
                        <div className="session-list-buss row mt-4">
                          <div className="col-lg-8">
                            <Filter filterKeys={["KLA", "SESSION_TYPE"]} />
                            <ExportButton />
                          </div>

                          <div className="col-lg-4 col-md-4">
                            <SessionCalendar
                              selectedDate={selectedDate}
                              onDateChange={handleDateChange}
                              startDate={meetingDates[0] || "02-07-2025"}
                              endDate={meetingDates[meetingDates.length - 1] || "05-08-2025"}
                              meetingDates={meetingDates}
                              allowedDates={allowedActiveDates}
                              width="100%"
                            />
                          </div>
                        </div>

                        <div className="row">
                          {/* Events list */}
                          <div className="proceedings-list col-lg-3 col-md-4">
                            <h5 className="rule-title">Events</h5>
                            {renderEvents()}
                          </div>

                          {/* PDF Viewer */}
                          <div className="col-lg-9 col-md-8">
                            <InlinePdfViewer fileUrl={selectedPdf} height="600px" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Final Proceedings",
                  label: "Final Proceedings",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      <div className="terms_condition_grid text-start">
                        <Filter filterKeys={["KLA", "SESSION_TYPE"]} />
                        <h3>Session 14</h3>
                        <hr />
                        <div className="session-list-buss row mt-4">
                          {/* List (left) */}
                          <div className="col-lg-3 col-md-6">
                            {renderProceedingsList()}
                          </div>

                          {/* PDF Viewer (right) */}
                          <div className="col-lg-9 col-md-6">
                            <InlinePdfViewer
                              fileUrl={activeFileUrl}
                              height="600px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
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

export default Proceedings;
