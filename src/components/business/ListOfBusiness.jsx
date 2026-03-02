import React, { useEffect, useState } from "react";
import HomeTest from "../Header";
import InfoCard from "../InfoCard";
import { SessionCalendar, Filter, CategoriesNav } from "../common";
import "./SessionSchedule.css";
import { openPdfInNewTab } from "../../utils/pdfUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
// import Star from "./dist/images/feedback_7554499.png";

const ListOfBusiness = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  // Filters are now managed inside the reusable Filter component via registry-driven API

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set on load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const allowedActiveDates = [
    "2025-07-05",
    "2025-07-06",
    "2025-07-09",
    "2025-07-12",
    "2025-07-13",
    "2025-07-30",
    "2025-08-05",
  ];

  const meetingDates = ["2025-07-09", "2025-07-30"];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Receive filter values from the reusable Filter component
  const handleFiltersChange = () => {
    // Example: values => { KLA: '15th KLA', SESSION_TYPE: 'Session 1' }
    // Integrate with data loading if needed
    // console.log('Filters changed:', values);
  };

  // Optionally override any registry defaults (labels/options) per page
  const filterOverrides = {
    SESSION_TYPE: {
      // Example restricting options for this page
      options: [
        "Session 1",
        "Session 5",
        "Session 7",
        "Session 8",
        "Session 9",
      ],
    },
  };

  // Example with Font Awesome (make sure FA CSS is loaded globally)
  const LightningIcon = <i className="fa-solid fa-bolt" aria-hidden="true" />;

  // Example with inline SVG (no library needed)
  const CalendarSVG = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 2v2M17 2v2M3 9h18M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
      <rect x="7" y="12" width="3" height="3" rx="1" />
    </svg>
  );
  
  // PDF URL for List of Business Forms
  const businessFormsPdf = "/pdf1.pdf";

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

        <section className="breadcumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcumb-style1">
                  <div className="breadcumb-list">
                    <a href="">Home</a>
                    <a href="">List of Business</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ListOfBuss quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <div className="row align-items-center wow fadeInUp">
              <div className="main-title mb10">
                <h2 className="title">List of Business</h2>
              </div>
            </div>

            <div className="bill-content col-md-12 mt30 committeeDt">
              <div className="terms_condition_grid text-start">
                <div className="tab-content" id="nav-tabContent">
                  {/* ---------------------Calendar of Sittings------------------------- */}

                  <div
                    className="tab-pane fade show active"
                    // id="nav-calendar"
                    role="tabpanel"
                    // aria-labelledby="nav-calendar-tab"
                  >
                    <div className="grid-bill grids">
                      <Filter
                        filterKeys={["KLA", "SESSION_TYPE"]}
                        overrides={filterOverrides}
                        onFiltersChange={handleFiltersChange}
                      />

                      <div className="session-list-buss row mt-4">
                        <div className="session-col-12 col-12">
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
                          <div className="ps-4 col-lg-8 col-md-8">
                            <div className="buss-cal c-ptag">
                              <div className="tabley">
                                {/* <ExportDropdown /> */}
                                <h5 className="mb-2 session-info">
                                  List of Bussiness
                                </h5>

                                {/* Cards Section */}

                                <div className="mt30 list-of-buss-forms">
                                  <a
                                    href="#"
                                    className="rul d-flex align-items-center mb20"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      openPdfInNewTab(businessFormsPdf);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <span> List of Business Forms</span>
                                    <div className="imgx">
                                      <img
                                        src="images/file2.svg"
                                        width={16}
                                        alt=""
                                      />
                                    </div>
                                  </a>
                                </div>

                                <div className="cards-grid">
                                  {/* <div className="row mt-3"> */}
                                  <InfoCard
                                    icon={
                                      // <img
                                      //   src="/images/document.svg"
                                      //   alt="Star"
                                      // />
                                      <FontAwesomeIcon
                                        icon={faArrowRightLong}
                                        color="#000"
                                      />
                                    }
                                    title="Bulletin"
                                    // text="Optimized rendering ."
                                    onClick={() => alert("Card clicked!")}
                                  />

                                  <InfoCard
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faArrowRightLong}
                                        color="#000"
                                      />
                                    }
                                    title="Question"
                                    href="#"
                                  />

                                  <InfoCard
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faArrowRightLong}
                                        color="#000"
                                      />
                                    }
                                    title="List of Bussiness"
                                    href="#"
                                  />

                                  <InfoCard
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faArrowRightLong}
                                        color="#000"
                                      />
                                    }
                                    title="Short notice Question"
                                    href="#"
                                  />
                                  <InfoCard
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faArrowRightLong}
                                        color="#000"
                                      />
                                    }
                                    title="Half an Hour Question"
                                    href="#"
                                  />
                                  <InfoCard
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faArrowRightLong}
                                        color="#000"
                                      />
                                    }
                                    title="Motions"
                                    href="#"
                                  />
                                  <InfoCard
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faArrowRightLong}
                                        color="#000"
                                      />
                                    }
                                    title="Resolutions"
                                    href="#"
                                  />
                                  <InfoCard
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faArrowRightLong}
                                        color="#000"
                                      />
                                    }
                                    title="Private number bill"
                                    href="#"
                                  />

                                  <InfoCard
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faArrowRightLong}
                                        color="#000"
                                      />
                                    }
                                    title="Petitions"
                                    href="#"
                                  />
                                  <InfoCard
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faArrowRightLong}
                                        color="#000"
                                      />
                                    }
                                    title="Debates"
                                    href="#"
                                  />
                                  <InfoCard
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faArrowRightLong}
                                        color="#000"
                                      />
                                    }
                                    title="Others"
                                    href="#"
                                  />
                                  <InfoCard
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faArrowRightLong}
                                        color="#000"
                                      />
                                    }
                                    title="Special mentions"
                                    href="#"
                                  />
                                  {/* </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ListOfBusiness;
