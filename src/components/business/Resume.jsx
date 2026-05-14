import React, { useState, useEffect } from "react";
import HomeTest from "../Header";
import {
  CategoriesNav,
  BreadcrumbNav,
  SectionTitle,
  Filter,
  Tabs,
  ExportButton,
} from "../common";
import InlinePdfViewer from "../common/InlinePdfViwer";
import { API_ENDPOINTS } from "../../utils/config";
import Calendar from "../Calendar";

const Resume = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [resumeData, setResumeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  // Fetch resume data from API
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.RESUME_BUSINESS);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setResumeData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch resume data:", error);
        setResumeData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  // Group data by KLA
  const groupedByKla = resumeData.reduce((acc, item) => {
    const klaKey = `${item.kla_id}`;
    if (!acc[klaKey]) acc[klaKey] = [];
    acc[klaKey].push(item);
    return acc;
  }, {});

  // Get unique KLA IDs sorted
  const klaIds = Object.keys(groupedByKla).sort((a, b) => Number(b) - Number(a));

  useEffect(() => {
    if (resumeData.length > 0) setActiveIndex(0);
  }, [resumeData.length]);

  const renderResumeList = (items) => {
    if (!items || items.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-muted">No resume data available</p>
        </div>
      );
    }

    return (
      <div className="d-flex flex-column">
        {items.map((item, idx) => {
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
          const hoverStyle = !isActive && isHovered
            ? {
                background: "var(--clr--primary)",
                color: "#fff",
                borderColor: "var(--clr--primary)",
              }
            : {};
          return (
            <div
              key={item.id}
              className="mb-2"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="card" style={{ ...baseStyle, ...hoverStyle, ...activeStyle }}>
                <div className="card-body py-2 px-3 d-flex align-items-center justify-content-between">
                  <span className="fw-semibold">{item.session_name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderKlaContent = (klaId) => {
    const items = groupedByKla[klaId] || [];
    const activeFileUrl = items[activeIndex]?.pdf_link || null;
    const klaNumber = Number(klaId);
    const klaLabel = klaNumber === 15 ? "15th KLA" : klaNumber === 14 ? "14th KLA" : `${klaNumber}th KLA`;

    return (
      <div className="bill-content col-md-12 mt30 committeeDt">
        <div className="terms_condition_grid text-start">
          <h3>{klaLabel} Resume</h3>
          <hr />

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="session-list-buss row mt-4">
              {/* List (left) */}
              <div className="col-lg-3 col-md-6">
                {renderResumeList(items)}
              </div>

              {/* PDF Viewer (right) */}
              <div className="col-lg-9 col-md-6">
                {activeFileUrl ? (
                  <InlinePdfViewer fileUrl={activeFileUrl} height="600px" />
                ) : (
                  <div className="text-center py-5">
                    <p className="text-muted">Select a session to view the resume</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Generate tabs dynamically based on available KLA data
  const tabs = klaIds.map((klaId) => {
    const klaNumber = Number(klaId);
    const klaLabel = klaNumber === 15 ? "15th KLA" : klaNumber === 14 ? "14th KLA" : `${klaNumber}th KLA`;
    
    return {
      key: klaLabel,
      label: klaLabel,
      content: renderKlaContent(klaId),
    };
  });

  // Fallback if no data
  if (!loading && tabs.length === 0) {
    tabs.push({
      key: "no-data",
      label: "No Data",
      content: (
        <div className="bill-content col-md-12 mt30 committeeDt">
          <div className="terms_condition_grid text-start">
            <div className="text-center py-5">
              <p className="text-muted">No resume data available</p>
            </div>
          </div>
        </div>
      ),
    });
  }

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
            { name: "Resume", href: "/resume" },
          ]}
        />
        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Resume" />

            <Tabs
              tabs={tabs}
              onChange={() => {
                // Reset active index when tab changes
                setActiveIndex(0);
                setHoveredIndex(null);
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
