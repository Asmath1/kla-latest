import React, { useEffect, useState } from "react";
import HomeTest from "../Header";
import { CategoriesNav, BreadcrumbNav, SectionTitle, Tabs } from "../common";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/config";

const LeaderOppositionContact = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [leaderData, setLeaderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchLeaderData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_ENDPOINTS.LEADER_OPPOSITION);
        const result = await response.json();
        
        if (result.status && result.data) {
          setLeaderData(result.data);
          console.log("Leader of Opposition data loaded:", result.data);
        } else {
          throw new Error("Failed to load Leader of Opposition data");
        }
      } catch (err) {
        console.error("Error fetching Leader of Opposition:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderData();
  }, []);

  // Helper functions to extract data from API
  const getMemberName = () => {
    return leaderData?.member?.langs?.[0]?.name || leaderData?.member_languages?.[0]?.name || "V.D. Satheesan";
  };

  const getMemberImage = () => {
    const img = leaderData?.member?.image || "";
    if (!img) return "https://images.royoorders.com/insecure/fit/500/500/ce/0/plain/https://votesmart.s3.ap-south-1.amazonaws.com/candidate_161318/LGIkFF16Cce6Z9u905yikMSSdZVxHnrMVbYSKom7.png@webp";
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    if (img.startsWith("//")) return `https:${img}`;
    return img;
  };

  const getEmail = () => {
    return leaderData?.addresses?.email_ids || "oppositionleader@niyamasabha.nic.in";
  };

  const getMemberId = () => {
    return leaderData?.member?.id || 1084;
  };

  if (loading) {
    return (
      <div className="wrapper ovh">
        <header className="header-nav nav-homepage-style2 stricky main-menu">
          <HomeTest />
        </header>
        <div className="body_content">
          <CategoriesNav />
          <div className="container text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wrapper ovh">
        <header className="header-nav nav-homepage-style2 stricky main-menu">
          <HomeTest />
        </header>
        <div className="body_content">
          <CategoriesNav />
          <div className="container text-center py-5">
            <p className="text-danger">{error}</p>
          </div>
        </div>
      </div>
    );
  }

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
            { name: "Parlamentory Functionaries", href: "/parlamentory" },
            {
              name: "Leader of Opposition Contact",
              href: "/leader-opposition-contact",
            },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb30 pb30-md represent">
          <div className="container">
            <SectionTitle title="Leader of Opposition" />

            <Tabs
              tabs={[
                {
                  key: "Profile",
                  label: "Profile",
                  content: (
                    <section className="breadcumb-section pt50 container">
                      <div className="cta-job-v1 freelancer-single-style mx-auto maxw1700 bdrs16 position-relative overflow-hidden d-flex align-items-center">
                        <img
                          className="left-top-img wow zoomIn"
                          // src="/images/Frame3.png"
                          alt="img"
                        />
                        <img
                          className="right-bottom-img wow zoomIn"
                          // src="/images/Frame8.png"
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
                                            <h3 className="title">
                                              {getMemberName()}
                                            </h3>
                                            <h6 className="mb-2 text-th">
                                             Leader of Opposition,
                                              Kerala
                                            </h6>
                                            <h6 className="list-inline-item mb-0 text-thm">
                                              Indian National Congress
                                            </h6>
                                            <Link
                                              className="viw mt10"
                                              to={`/member-profile/${getMemberId()}`}
                                            >
                                              View More
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="memb-prof col-lg-6">
                                          <div className="ml20 ml0-xs mt15-sm">
                                            <div className="mb-2 d-flex align-items-center contac">
                                              <small className="mb-2">
                                                Consituency
                                              </small>
                                              <h6 className=" text-th">
                                                : Paravur
                                              </h6>
                                            </div>
                                            <div className="mb-2 d-flex align-items-center contac">
                                              <small className="mb-2">
                                                Elected Date
                                              </small>
                                              <h6 className=" text-th mb-0 ms-2">
                                                : 2021-05-02
                                              </h6>
                                            </div>
                                            <div className="mb-2 d-flex align-items-center contac">
                                              <small className="mb-2">
                                                Email Address
                                              </small>
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
                    </section>
                  ),
                },
                {
                  key: "Important Links",
                  label: "Important Links",
                  content: (
                    <div className="pt30">
                      
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

export default LeaderOppositionContact;
