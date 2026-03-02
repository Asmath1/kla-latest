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
import { fetchSynopsis, fetchGleaning } from "../../api/services/all.service";

const Debates = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [synopsisData, setSynopsisData] = useState([]);
  const [gleaningData, setGleaningData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ kla_id: 15, session_id: null });
  const [activeTab, setActiveTab] = useState("Gleanings");

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

  // Fetch Synopsis and Gleaning data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [synopsisResponse, gleaningResponse] = await Promise.all([
          fetchSynopsis(),
          fetchGleaning()
        ]);
        
        setSynopsisData(synopsisResponse);
        setGleaningData(gleaningResponse);
        
        // Auto-select first date from gleaning data (default tab)
        if (gleaningResponse.length > 0) {
          const dates = gleaningResponse.map(item => item.sitting_date);
          const uniqueDates = [...new Set(dates)];
          
          if (uniqueDates.length > 0) {
            setSelectedDate(new Date(uniqueDates[0]));
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Get current data based on active tab
  const currentData = activeTab === "Gleanings" ? gleaningData : synopsisData;

  // Filter data based on selected KLA and Session
  const filteredData = currentData.filter(item => {
    if (filters.kla_id && item.kla !== filters.kla_id) return false;
    if (filters.session_id && item.session_number !== filters.session_id) return false;
    return true;
  });

  // Get unique sitting dates from filtered data
  const meetingDates = [...new Set(filteredData.map(item => item.sitting_date))];
  const allowedActiveDates = meetingDates;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    // Reset selected date when switching tabs
    const data = tabKey === "Gleanings" ? gleaningData : synopsisData;
    const filtered = data.filter(item => {
      if (filters.kla_id && item.kla !== filters.kla_id) return false;
      if (filters.session_id && item.session_number !== filters.session_id) return false;
      return true;
    });
    
    if (filtered.length > 0) {
      const dates = filtered.map(item => item.sitting_date);
      const uniqueDates = [...new Set(dates)];
      if (uniqueDates.length > 0) {
        setSelectedDate(new Date(uniqueDates[0]));
      }
    }
  };

  // Get PDF URL for selected date
  const getPdfUrlForDate = (date) => {
    if (!date) return null;
    const dateString = date.toISOString().split("T")[0];
    const item = filteredData.find(d => d.sitting_date === dateString);
    return item ? item.local_pdf_url : null;
  };

  // Calculate date range from filtered data
  const getDateRange = () => {
    if (meetingDates.length === 0) return { startDate: "2025-07-05", endDate: "2025-08-05" };
    
    const dates = meetingDates.map(d => new Date(d));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    
    return {
      startDate: minDate.toISOString().split('T')[0],
      endDate: maxDate.toISOString().split('T')[0]
    };
  };

  const { startDate, endDate } = getDateRange();

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
            { name: "Debates", href: "/business/debates" },
          ]}
        />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Debates" />

            <Tabs
              tabs={[
                {
                  key: "Gleanings",
                  label: "Gleanings",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      {loading ? (
                        <div className="text-center py-5">
                          <p>Loading...</p>
                        </div>
                      ) : (
                        <div className="terms_condition_grid text-start">
                          <Filter 
                            filterKeys={["KLA", "SESSION_TYPE"]} 
                            onFiltersChange={handleFilterChange}
                            overrides={{
                              KLA: { defaultValue: filters.kla_id },
                            }}
                          />
                          <ExportButton />

                          <div className="session-list-buss row mt-4">
                            {/* Calendar (left) */}
                            <div className="col-lg-6 col-md-6">
                              <SessionCalendar
                                selectedDate={selectedDate}
                                onDateChange={handleDateChange}
                                startDate={startDate}
                                endDate={endDate}
                                meetingDates={meetingDates}
                                allowedDates={allowedActiveDates}
                                height="400px"
                                width="100%"
                              />
                            </div>

                            {/* PDF Viewer (right) */}
                            <div className="col-lg-6 col-md-6">
                              <InlinePdfViewer
                                fileUrl={getPdfUrlForDate(selectedDate)}
                                height="400px"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ),
                },
                {
                  key: "Synopsis",
                  label: "Synopsis",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      {loading ? (
                        <div className="text-center py-5">
                          <p>Loading...</p>
                        </div>
                      ) : (
                        <div className="terms_condition_grid text-start">
                          <Filter 
                            filterKeys={["KLA", "SESSION_TYPE"]} 
                            onFiltersChange={handleFilterChange}
                            overrides={{
                              KLA: { defaultValue: filters.kla_id },
                            }}
                          />
                          <ExportButton />
                          <div className="session-list-buss row mt-4">
                            <div className="col-lg-6 col-md-6">
                              <SessionCalendar
                                selectedDate={selectedDate}
                                onDateChange={handleDateChange}
                                startDate={startDate}
                                endDate={endDate}
                                meetingDates={meetingDates}
                                allowedDates={allowedActiveDates}
                                height="400px"
                                width="100%"
                              />
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <InlinePdfViewer
                                fileUrl={getPdfUrlForDate(selectedDate)}
                                height="400px"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ),
                },
              ]}
              onChange={handleTabChange}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Debates;
