import React, { useState, useEffect, useCallback } from 'react';
import HomeTest from './Header';
import { 
  Filter, 
  SessionCalendar, 
  InlinePdfViewer, 
  CategoriesNav, 
  BreadcrumbNav, 
  SectionTitle 
} from './common';

const CallOfAttention = () => {
  const [filters, setFilters] = useState({
    kla_id: 15,
    session_id: null,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPdf, setSelectedPdf] = useState('/dummy.pdf'); // Default sample PDF
  const [meetingDates] = useState(['2025-07-09', '2025-07-15', '2025-07-22']); // Sample sitting dates
  const [allowedActiveDates] = useState(['2025-07-05', '2025-07-06', '2025-07-09', '2025-07-12', '2025-07-13', '2025-07-15', '2025-07-22', '2025-07-30', '2025-08-05']);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterChange = useCallback((values) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      
      if (values?.KLA != null) {
        const klaValue = typeof values.KLA === 'object' ? values.KLA.value : values.KLA;
        const newKlaId = Number(klaValue) || 15;
        if (newKlaId !== prevFilters.kla_id) {
          newFilters.kla_id = newKlaId;
        }
      }
      
      if (values?.SESSION_TYPE != null) {
        const sessionValue = typeof values.SESSION_TYPE === 'object' ? values.SESSION_TYPE.value : values.SESSION_TYPE;
        const newSessionId = sessionValue === "" ? null : Number(sessionValue);
        if (newSessionId !== prevFilters.session_id) {
          newFilters.session_id = newSessionId;
        }
      }
      
      // Only update if something actually changed
      if (newFilters.kla_id === prevFilters.kla_id && newFilters.session_id === prevFilters.session_id) {
        return prevFilters;
      }
      
      return newFilters;
    });
  }, []);

  const handleDateChange = useCallback((date) => {
    setSelectedDate(date);
    // Show sample PDF when date is clicked
    setSelectedPdf('/dummy.pdf');
  }, []);

  const getPdfUrlForDate = (date) => {
    // Return sample PDF for selected date
    return '/dummy.pdf';
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
            { name: "Calling Attention", href: "/calling-attention" },
          ]}
        />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Calling Attention" />

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="bill-content col-md-12 mt30 committeeDt">
                <Filter 
                  key="list-filter"
                  filterKeys={["KLA", "SESSION_TYPE"]} 
                  onFiltersChange={handleFilterChange}
                  overrides={{
                    KLA: { defaultValue: filters.kla_id },
                  }}
                />
                
                {/* Display selected KLA and Session - Made bigger */}
                <div className="selected-filters mt-3 mb-3">
                  <h4 className="mb-2 fw-bold">
                    KLA: {filters.kla_id}th KLA
                    {filters.session_id && (
                      <>
                        {" | "}
                        Session: {filters.session_id}
                      </>
                    )}
                  </h4>
                </div>

              

                <div className="session-list-buss row mt-4">
                  <div className="col-lg-4 col-md-4">
                    <SessionCalendar
                      selectedDate={selectedDate}
                      onDateChange={handleDateChange}
                      startDate="2025-07-05"
                      endDate="2025-08-05"
                      meetingDates={meetingDates}
                      allowedDates={allowedActiveDates}
                      width="100%"
                      showLegend={true}
                    />
                    
                   
                  </div>

                  {/* PDF Viewer */}
                  <div className="col-lg-8 col-md-8">
                    <InlinePdfViewer
                      fileUrl={selectedPdf || getPdfUrlForDate(selectedDate)}
                      height="500px"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CallOfAttention;