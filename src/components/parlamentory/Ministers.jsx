import React, { useEffect, useState } from "react";
import HomeTest from "../Header";
import { CategoriesNav, BreadcrumbNav, SectionTitle } from "../common";
import { getImageUrl, API_ENDPOINTS } from "../../utils/config";

const Ministers = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [ministers, setMinisters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch ministers from API
  useEffect(() => {
    const fetchMinisters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_ENDPOINTS.COUNCIL_MINISTERS);
        const result = await response.json();
        
        if (result.success && result.data?.data) {
          setMinisters(result.data.data);
          console.log("Ministers loaded:", result.data.data);
        } else {
          throw new Error("Failed to load ministers data");
        }
      } catch (err) {
        console.error("Error fetching ministers:", err);
        setError("Failed to load ministers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMinisters();
  }, []);

  // Helper function to get member name
  const getMemberName = (member) => {
    return member?.langs?.[0]?.name || member?.name || "Unknown";
  };

  // Helper function to get member image
  const getMemberImage = (member) => {
    const img = member?.image || member?.image_url || "";
    if (!img) return "/images/prof-dummy.png";
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    if (img.startsWith("//")) return `https:${img}`;
    if (img.startsWith("/")) return getImageUrl(img);
    return img;
  };

  // Helper function to get designation
  const getDesignation = (minister) => {
    if (!minister.departments || minister.departments.length === 0) {
      return "Minister";
    }
    
    // Check if Chief Minister
    const isChiefMinister = minister.departments.some(
      dept => dept.department?.entitle?.toLowerCase().includes("chief minister")
    );
    
    if (isChiefMinister) {
      return "Chief Minister";
    }
    
    // Get first department as designation
    const firstDept = minister.departments[0]?.department?.entitle;
    return firstDept ? `Minister for ${firstDept}` : "Minister";
  };

  // Helper function to get portfolios
  const getPortfolios = (minister) => {
    if (!minister.departments || minister.departments.length === 0) {
      return "N/A";
    }
    
    return minister.departments
      .map(dept => dept.department?.entitle || "")
      .filter(Boolean)
      .join(", ");
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
            { name: "Parliamentary Functionaries", href: "/governor" },
            { name: "Council of Ministers", href: "/ministers" },
            { name: "Ministers", href: "/ministers" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb30 pb30-md represent">
          <div className="container">
            <SectionTitle title="Council of Ministers" />
            
            {loading ? (
              <div className="text-center py-5">
                <p>Loading ministers...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : ministers.length === 0 ? (
              <div className="text-center py-5">
                <p>No ministers data available.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table myTable2">
                  <thead>
                    <tr>
                      <th scope="col">Photo</th>
                      <th scope="col">Name</th>
                      <th scope="col">Designation</th>
                      <th scope="col">Portfolios</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ministers.map((minister) => (
                      <tr key={minister.id}>
                        {/* Photo Column */}
                        <td>
                          <img
                            src={getMemberImage(minister.member)}
                            alt={getMemberName(minister.member)}
                            style={{ width: 64, height: 64, objectFit: "cover" }}
                            onError={(e) => {
                              e.currentTarget.src = "/images/prof-dummy.png";
                            }}
                          />
                        </td>

                        {/* Name Column */}
                        <td className="text-th">
                          <strong>{getMemberName(minister.member)}</strong>
                        </td>

                        {/* Designation Column */}
                        <td className="text-th">{getDesignation(minister)}</td>

                        {/* Portfolios Column */}
                        <td style={{ maxWidth: 800, whiteSpace: "pre-wrap" }}>
                          {getPortfolios(minister)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ministers;
