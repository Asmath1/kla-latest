import React, { useEffect, useState } from "react";
import {
  BreadcrumbNav,
  CategoriesNav,
  SectionTitle,
  Tabs,
} from "./common";
import HomeTest from "./Header";
import InlinePdfViewer from "../components/common/InlinePdfViwer";

const Resources = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [activeFileUrl, setActiveFileUrl] = useState("");
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

  const dummyPdf = "/pdf1.pdf";

  // Removed openPdf function - now using setActiveFileUrl to display PDFs inline
  const [activeFileUrl, setActiveFileUrl] = useState("");
  
  useEffect(() => {
    // Automatically open the PDF on component mount
    const pdfUrl =
      // "https://www.niyamasabha.nic.in/libraryFile/libraryrules.pdf";
      "/libraryrules.pdf";
    setActiveFileUrl(pdfUrl);
  }, []);

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
            {
              name: "Officers under RTI Act",
              href: "/Resources",
            },
          ]}
        />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Resources" />

            <Tabs
              tabs={[
                // {
                //   key: "Disqualification on Ground of Defection-Rules,1986",
                //   label: "Disqualification on Ground of Defection-Rules,1986",
                //   content: <div className="container mt-4"></div>,
                // },
                {
                  key: "KLA Recruitment rules",
                  label: "KLA Recruitment rules",
                  content: (
                    <div>
                      <div className="container mt-4">
                        <div className="row ">
                          <div className="col-lg-3 col-md-6">
                            <div className="mt30 library-member-forms">
                              <a
                                href="#"
                                className="rul d-flex align-items-center mb20"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveFileUrl(dummyPdf);
                                }}
                              >
                                <div className="imgx">
                                  <img
                                    src="images/file2.svg"
                                    width={16}
                                    alt=""
                                  />
                                </div>
                                <span>KLA Recruitment Rules</span>
                              </a>
                            </div>
                          </div>
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
                {
                  key: "Payment of Pension to Members of KLA",
                  label: "Payment of Pension to Members of KLA",
                  content: (
                    <div className="container mt-4">
                      <div className="row ">
                        <div className="col-lg-4 col-md-6">
                          <div className="mt30 library-member-forms">
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
                              <span>Payment of Pension to Members of KLA </span>
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-8 col-md-6">
                          <InlinePdfViewer
                            fileUrl={activeFileUrl}
                            height="600px"
                          />
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Payment of Salaries and Allowances Act",
                  label: "Payment of Salaries and Allowances Act",
                  content: (
                    <div className="container mt-4">
                      <div className="row ">
                        <div className="col-lg-4 col-md-6">
                          <div className="mt30 library-member-forms">
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
                              <span>
                                Payment of Salaries and Allowances Act
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-8 col-md-6">
                          <InlinePdfViewer
                            fileUrl={activeFileUrl}
                            height="600px"
                          />
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Publications ",
                  label: "Publications",
                  content: (
                    <div className="container mt-4">
                      <div className="row"></div>
                    </div>
                  ),
                },
                {
                  key: "Rules of Procedure",
                  label: "Rules of Procedure",
                  content: (
                    <div className="container mt-4">
                      <div className="row ">
                        <div className="col-lg-4 col-md-6">
                          <div className="mt30 library-member-forms">
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
                              <span>
                                Rules of Procedure (PDF Version) - ENGLISH (New
                                Version)
                              </span>
                            </a>
                          </div>
                          <div className="mt30 library-member-forms">
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
                              <span>
                                Payment of Salaries and Allowances Act
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-8 col-md-6">
                          <InlinePdfViewer
                            fileUrl={activeFileUrl}
                            height="600px"
                          />
                        </div>
                      </div>
                      {/* <div className="row ">
                        <div className="col-lg-4 col-md-6">
                          <div className=" library-member-forms">
                            <a
                              href="#"
                              className="rul d-flex align-items-center mb20"
                              onClick={() => openPdf(dummyPdf)}
                            >
                              <div className="imgx">
                                <img src="images/file2.svg" width={16} alt="" />
                              </div>
                              <span>
                                Payment of Salaries and Allowances Act
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-8 col-md-6">
                          <InlinePdfViewer
                            fileUrl={activeFileUrl}
                            height="600px"
                          />
                        </div>
                      </div> */}
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

export default Resources;
