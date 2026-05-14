import React, { useEffect, useState } from "react";
import HomeTest from "../Header";
import { CategoriesNav, BreadcrumbNav, SectionTitle, Tabs } from "../common";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getImageUrl, API_ENDPOINTS } from "../../utils/config";
import "./Governer.css";

const ChiefWhip = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [chiefWhip, setChiefWhip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch Chief Whip data from API
  useEffect(() => {
    const fetchChiefWhip = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_ENDPOINTS.CHIEF_WHIP);
        const result = await response.json();
        
        if (result.status && result.data) {
          setChiefWhip(result.data);
          console.log("Chief Whip data loaded:", result.data);
        } else {
          throw new Error("Failed to load Chief Whip data");
        }
      } catch (err) {
        console.error("Error fetching Chief Whip:", err);
        setError("Failed to load Chief Whip data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchChiefWhip();
  }, []);

  // Helper functions
  const getMemberName = () => {
    return chiefWhip?.member?.langs?.[0]?.name || chiefWhip?.member_languages?.[0]?.name || "Unknown";
  };

  const getMemberImage = () => {
    const img = chiefWhip?.member?.image || "";
    if (!img) return "/images/prof-dummy.png";
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    if (img.startsWith("//")) return `https:${img}`;
    if (img.startsWith("/")) return getImageUrl(img);
    return img;
  };

  const getEmail = () => {
    return chiefWhip?.addresses?.email_ids || "chiefwhip@niyamasabha.nic.in";
  };

  const getElectedDate = () => {
    // You'll need to add elected date from the API if available
    return "2021-05-02"; // Default value, update when API provides this
  };

  const getConstituency = () => {
    // You'll need to add constituency data from the API if available
    return "Kanjirappally"; // Default value, update when API provides this
  };

  const getParty = () => {
    // You'll need to add party data from the API if available
    return "Kerala Congress (M)"; // Default value, update when API provides this
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
            { name: "Chief Whip", href: "/chief-whip" },
            { name: "Chief Whip", href: "/chief-whip" },
          ]}
        />

        <section className="breadcumb-section pt50 pb50 container">
          <h4 className="tabDet title mb20">Chief Whip</h4>
          
          {loading ? (
            <div className="text-center py-5">
              <p>Loading Chief Whip data...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : !chiefWhip ? (
            <div className="text-center py-5">
              <p>No Chief Whip data available.</p>
            </div>
          ) : (
            <div className="cta-job-v1 freelancer-single-style mx-auto maxw1700 bdrs16 position-relative overflow-hidden d-flex align-items-center">
              <img
                className="left-top-img wow zoomIn"
                alt="img"
              />
              <img
                className="right-bottom-img wow zoomIn"
                alt="img"
              />
              <div className="container">
                <div className="row wow fadeInUp">
                  <div className="col-xl-10 mx-auto p15 profiles">
                    <div className="position-relative">
                      <div className="list-meta d-lg-flex align-items-end justify-content-between">
                        <div className="wrapper w-100 d-sm-flex align-items-center">
                          <motion.a
                            className="position-relative freelancer-single-style"
                            href=""
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.img
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className="memberProfileImg"
                              src={getMemberImage()}
                              width={150}
                              alt={getMemberName()}
                              height={175}
                              onError={(e) => {
                                e.currentTarget.src = "/images/prof-dummy.png";
                              }}
                            />
                          </motion.a>
                          <motion.div
                            className="container"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <div className="row">
                              <div className="memb-prof col-lg-6 mb-3 mb-lg-0">
                                <div className="speaker-prof ml20 ml0-xs mt15-sm">
                                  <h3 className="title">{getMemberName()}</h3>
                                  <h6 className="mb-2 text-th">
                                    Chief Whip of Kerala
                                  </h6>
                                  <h6 className="list-inline-item mb-0 text-thm">
                                    {getParty()}
                                  </h6>
                                  <Link
                                    className="viw mt10"
                                    to={`/member-profile/${chiefWhip.member.id}`}
                                  >
                                    View More
                                  </Link>
                                </div>
                              </div>
                              <div className="memb-prof col-lg-6">
                                <div className="ml20 ml0-xs mt15-sm">
                                  <div className="mb-2 d-flex align-items-center contac">
                                    <small className="mb-2">Constituency</small>
                                    <h6 className="text-th">
                                      : {getConstituency()}
                                    </h6>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center contac">
                                    <small className="mb-2">Elected Date</small>
                                    <h6 className="text-th mb-0 ms-2">
                                      : {getElectedDate()}
                                    </h6>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center contac">
                                    <small className="mb-2">Email Address</small>
                                    <h6 className="text-th">
                                      : {getEmail()}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ChiefWhip;
