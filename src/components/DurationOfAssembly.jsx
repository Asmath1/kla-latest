import React, { useState, useEffect } from "react";
import HomeTest from "./Header";
import { CategoriesNav, BreadcrumbNav, SectionTitle } from "./common";
import { fetchKlaDuration } from "../api/services/all.service";

const DurationOfAssembly = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [assemblyData, setAssemblyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadAssemblyData = async () => {
      setLoading(true);
      try {
        const data = await fetchKlaDuration();
        console.log("Fetched KLA Duration data:", data);
        console.log("Data length:", data?.length);
        
        if (Array.isArray(data)) {
          setAssemblyData(data);
        } else {
          console.error("Data is not an array:", data);
          setAssemblyData([]);
        }
      } catch (error) {
        console.error("Error loading assembly duration data:", error);
        setAssemblyData([]);
      } finally {
        setLoading(false);
      }
    };

    loadAssemblyData();
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
            { name: "About", href: "/about" },
            { name: "Duration of Assembly", href: "/duration-of-assembly" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb30 pb30-md represent">
          <div className="container">
            <SectionTitle title="Duration of Assembly" />

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="bill-content col-md-12 mt30 committeeDt">
                <div className="table-responsive">
                  <table className="table myTable2">
                    <thead>
                      <tr>
                        <th scope="col">No. of Assembly</th>
                        <th scope="col">Date of Constitution</th>
                        <th scope="col">Date of First Meeting</th>
                        <th scope="col">Date of Dissolution</th>
                        <th scope="col">Total No. of Sessions</th>
                        <th scope="col">Total No. of Sittings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assemblyData.length > 0 ? (
                        assemblyData.map((item) => (
                          <tr key={item.id}>
                            <td className="text-th">
                              <strong>{item.assembly_number}</strong>
                            </td>
                            <td className="text-th">{item.date_of_constitution}</td>
                            <td className="text-th">{item.date_of_first_meeting}</td>
                            <td className="text-th">{item.date_of_dissolution || "-"}</td>
                            <td className="text-th">{item.total_sessions || "-"}</td>
                            <td className="text-th">{item.total_sittings || "-"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            No data found
                          </td>
                        </tr>
                      )}
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

export default DurationOfAssembly;
