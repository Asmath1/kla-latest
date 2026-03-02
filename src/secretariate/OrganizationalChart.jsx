import React, { useEffect, useState } from "react";
import HomeTest from "../components/Header";
import { BreadcrumbNav, CategoriesNav } from "../components/common";
import "./Secretariat.css";

const OrganizationalChart = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
            { name: "secretariate", href: "/secretariate" },
            {
              name: "Organizational Chart",
              href: "/secretariate/organizational-chart",
            },
          ]}
        />
      </div>
      <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
        <div className="container organizational-chart-wrapper">
            <img
              src="/Organization-Chart.webp"
              alt="Organizational Chart"
              className="img-fluidd"
            />
        </div>
      </section>
    </div>
  );
};

export default OrganizationalChart;
