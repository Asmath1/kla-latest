import React, { useState, useEffect } from "react";
import HomeTest from "./Header";
import { CategoriesNav, BreadcrumbNav, SectionTitle } from "./common";
import { fetchPresidentsRule } from "../api/services/all.service";

const PresidentsRule = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [presidentsRuleData, setPresidentsRuleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadPresidentsRuleData = async () => {
      try {
        setLoading(true);
        const data = await fetchPresidentsRule();
        setPresidentsRuleData(data);
      } catch (error) {
        console.error("Error loading President's Rule data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPresidentsRuleData();
  }, []);

  // Format date from ISO to DD-MM-YYYY
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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
            { name: "President's Rule", href: "/presidents-rule" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb30 pb30-md represent">
          <div className="container">
            <SectionTitle title="President's Rule" />

            {loading ? (
              <div className="text-center py-5">
                <p>Loading data...</p>
              </div>
            ) : (
              <div className="bill-content col-md-12 mt30 committeeDt">
                <div className="table-responsive">
                  <table className="table myTable2">
                    <thead>
                      <tr>
                        <th scope="col">Sl. No</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Duration (Days)</th>
                        <th scope="col">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {presidentsRuleData.map((item, index) => (
                        <tr key={item.id}>
                          <td className="text-th">{index + 1}</td>
                          <td className="text-th">{formatDate(item.start_date)}</td>
                          <td className="text-th">{formatDate(item.end_date)}</td>
                          <td className="text-th">{item.duration_days}</td>
                          <td className="text-th">{item.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PresidentsRule;