import React, { useState, useEffect } from "react";
import HomeTest from "../Header";
import { BreadcrumbNav, CategoriesNav, SectionTitle } from "../common";
import InlinePdfViewer from "../common/InlinePdfViwer";

// Dummy PDF URL - replace with the real handbook PDF link when available
const HANDBOOK_PDF_URL = "https://www.niyamasabha.nic.in/images//15th-KLA-committee-report/LFAC44.pdf";

const HandBook = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            { name: "Handbook for Members", href: "/handbook" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Handbook for Members" />

            <div className="bill-content col-md-12 mt30 committeeDt">
              <div className="terms_condition_grid text-start">
                <hr />
                <InlinePdfViewer
                  fileUrl={HANDBOOK_PDF_URL}
                  height="75vh"
                  fitToWidthOnLoad={true}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HandBook;
