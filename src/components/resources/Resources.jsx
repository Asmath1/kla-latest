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
import VerticalTabs from "../common/VerticalTabs";
import InlinePdfViewer from "../common/InlinePdfViwer";

const Resources = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFileUrl, setActiveFileUrl] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dummyPdf = "/pdf1.pdf";

  // Removed openPdf function - now using setActiveFileUrl to display PDFs inline

  useEffect(() => {
    // Automatically open the PDF on component mount
    const pdfUrl =
      "https://www.niyamasabha.nic.in/libraryFile/libraryrules.pdf";
    setActiveFileUrl(pdfUrl);
  }, []);

  // ✅ Content Components
  const DisqualificationContent = () => (
    <div className="bill-content col-md-12  committeeDt">
      <h4 className="mb20">Disqualification on Ground of Defection-Rules, 1986</h4>

      {/* <div className="terms_condition_grid text-start col-lg-12">
        <div className="session-list-buss row mt-4">
          <div className="col-lg-8">
            <Filter filterKeys={["KLA", "SESSION_TYPE"]} />
            <ExportButton />
          </div>
          <div className="col-lg-4 col-md-4"></div>
        </div>
        <div className="row">
          <div className="proceedings-list col-lg-3 col-md-4">
            <h5 className="rule-title">Events</h5>
          </div>
          <div className="col-lg-9 col-md-8"></div>
        </div>
      </div> */}
    </div>
  );

  const RecruitmentContent = () => (
    <div className="bill-content col-md-12  committeeDt">
      <div className="terms_condition_grid text-start">
        <h4 className="mb20">KLA Recruitment Rules </h4>

        <div className="mt10 library-member-forms">
          <a
            href="#"
            className="rul d-flex align-items-center mb20"
            onClick={(e) => {
              e.preventDefault();
              setActiveFileUrl(dummyPdf);
            }}
          >
            <div className="imgx">
              <img src="images/file2.svg" width={16} alt="" />
            </div>
            <span>KLA Recruitment Rules</span>
          </a>
        </div>
        <div className="session-list-buss row mt-4">
          <div className="col-lg-12 col-md-12">
            <InlinePdfViewer fileUrl={activeFileUrl} height="900px" />
          </div>
        </div>
      </div>
    </div>
  );

  const PensionContent = () => (
    <div className="bill-content col-md-12  committeeDt">
      <div className="terms_condition_grid text-start">
        <h4 className="mb20">Payment of Pension of Members of KLA</h4>

        <div className="mt10 library-member-forms">
          <a
            href="#"
            className="rul d-flex align-items-center mb20"
            onClick={(e) => {
              e.preventDefault();
              setActiveFileUrl(dummyPdf);
            }}
          >
            <div className="imgx">
              <img src="images/file2.svg" width={16} alt="" />
            </div>
            <span>Payment of Pension of Members of KLA</span>
          </a>
        </div>
        <div className="session-list-buss row mt-4">
          <div className="col-lg-12 col-md-12">
            <InlinePdfViewer fileUrl={activeFileUrl} height="900px" />
          </div>
        </div>
      </div>
    </div>
  );

  const SalariesContent = () => (
    <div className="bill-content col-md-12  committeeDt">
      <div className="terms_condition_grid text-start">
        <h4 className="mb20">Payment of Salaries and Allowances Act</h4>
        <div className="mt10 library-member-forms">
          <a
            href="#"
            className="rul d-flex align-items-center mb20"
            onClick={(e) => {
              e.preventDefault();
              setActiveFileUrl(dummyPdf);
            }}
          >
            <div className="imgx">
              <img src="images/file2.svg" width={16} alt="" />
            </div>
            <span>Payment of Salaries and Allowances Act</span>
          </a>
        </div>
        <div className="session-list-buss row mt-4">
          <div className="col-lg-12 col-md-12">
            <InlinePdfViewer fileUrl={activeFileUrl} height="900px" />
          </div>
        </div>
      </div>
    </div>
  );

  const PublicationsContent = () => (
    <div className="bill-content col-md-12  committeeDt">
      <div className="terms_condition_grid text-start">
        <h4 className="mb20">Publications</h4>
      </div>
    </div>
  );

  const ProcedureContent = () => (
    <div className="bill-content col-md-12  committeeDt">
      <div className="terms_condition_grid text-start">
        <h4 className="mb20">Rules of procedure</h4>
         <div className="mt10 library-member-forms">
          <a
            href="#"
            className="rul d-flex align-items-center mb20"
            onClick={(e) => {
              e.preventDefault();
              setActiveFileUrl(dummyPdf);
            }}
          >
            <div className="imgx">
              <img src="images/file2.svg" width={16} alt="" />
            </div>
            <span>Rules of procedure- English</span>
          </a>
        </div>

         <div className="mt10 library-member-forms">
          <a
            href="#"
            className="rul d-flex align-items-center mb20"
            onClick={(e) => {
              e.preventDefault();
              setActiveFileUrl(dummyPdf);
            }}
          >
            <div className="imgx">
              <img src="images/file2.svg" width={16} alt="" />
            </div>
            <span>Rules of procedure- Malayalam</span>
          </a>
        </div>
        <div className="session-list-buss row mt-4">
          <div className="col-lg-12 col-md-12">
            <InlinePdfViewer fileUrl={activeFileUrl} height="900px" />
          </div>
        </div>
      </div>
    </div>
  );

  // ✅ Vertical Menu Structure
  const resourcesMenu = [
    {
      key: "resources",
      label: "Resources",
      children: [
        {
          key: "defection",
          label: "Disqualification on Ground of Defection-Rules, 1986",
        },
        { key: "recruitment", label: "KLA Recruitment rules" },
        { key: "pension", label: "Payment of Pension of Members of KLA" },
        { key: "salaries", label: "Payment of Salaries and Allowances Act" },
        { key: "publications", label: "Publications" },
        { key: "procedure", label: "Rules of procedure" },
      ],
    },
  ];

  // ✅ Content Panels
  const resourcesPanels = {
    defection: <DisqualificationContent />,
    recruitment: <RecruitmentContent />,
    pension: <PensionContent />,
    salaries: <SalariesContent />,
    publications: <PublicationsContent />,
    procedure: <ProcedureContent />,
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
            { name: "Resources", href: "/resources" },
            { name: "Resources", href: "/resources" },
          ]}
        />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Resources" />

            <div className="mt-4 mb-4">
              <VerticalTabs menu={resourcesMenu} panels={resourcesPanels} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;
