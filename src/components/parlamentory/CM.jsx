import React, { useEffect, useState } from "react";
import HomeTest from "../Header";
import {
  CategoriesNav,
  BreadcrumbNav,
  SectionTitle,
  Filter,
  Tabs,
  ExportButton,
} from "../common";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchChiefMinisters } from "../../api/services/all.service";
import "./Governer.css";

const CM = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentCM, setCurrentCM] = useState(null);
  const [formerCMs, setFormerCMs] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch Chief Ministers data
  useEffect(() => {
    const loadChiefMinisters = async () => {
      try {
        setLoading(true);
        const data = await fetchChiefMinisters();

        // Find current CM (end_date is "Incumbent")
        const current = data.find(cm => cm.end_date === "Incumbent" || cm.period.includes("Incumbent"));
        setCurrentCM(current);

        // Get all CMs excluding duplicates by name and period
        const uniqueCMs = [];
        const seen = new Set();
        
        data.forEach(cm => {
          const key = `${cm.name}-${cm.period}`;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueCMs.push(cm);
          }
        });

        setFormerCMs(uniqueCMs);
      } catch (error) {
        console.error("Failed to load chief ministers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadChiefMinisters();
  }, []);

  // Hardcoded data for current CM profile (API doesn't provide detailed profile info)
  const chiefMinister = {
    name: currentCM?.name || "Pinarayi Vijayan",
    designation: "Chief Minister of Kerala",
    constituency: "Dharmadam",
    party: "Communist Party of India (Marxist)",
    electedDate: currentCM?.start_date || "2021-05-02",
    email: "pinarayivijayan@niyamasabha.nic.in",
    image: currentCM?.local_photo_url || currentCM?.photo_url || "https://www.niyamasabha.nic.in/images/Chief_Minister/Pinarayi_Vijayan.jpg",
    basic: {
      fatherName: "Shri Maroli Koran",
      motherName: "Smt. Alakkatt Kalyani",
      dob: "1944-03-21",
      birthPlace: "Pinarayi",
      maritalStatus: "Married",
      spouseName: "Smt. Kamala",
      sons: "One son",
      daughters: "One daughter",
    },
    address: {
      present: "",
      permanent: "Pravik, Pinarayi P.O., Kannur-670 741",
    },
    qualifications: {
      education: "Degree (Course completed)",
      profession: "Social and Political Worker",
      languages: "Malayalam and English",
    },
    positionsHeld:
      "Chief Minister. Was President of K.S.F. and K.S.Y.F.; Joined C.P.I.(M) in 1964; In 1968, at the age of 24, he was elected to the Kannur District Committee of C.P.I.(M); Member, Kannur District Secretariat (1972); Member, C.P.I.(M) Kerala State Committee (1978); Secretary, C.P.I.(M) Kannur District (1986); Member, C.P.I.(M) State Secretariat (since 1988); Secretary, Kerala State Committee C.P.I.(M) (1998-2015); Member, Polit Bureau C.P.I.(M) (since 2002). Minister for Electricity and Co-operation (from 1996 to 1998). Chairman, Subject Committee XIV(Home Affairs) in the 14th KLA.",
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
            <p>Loading Chief Ministers data...</p>
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
            { name: "Parliamentary Functionaries", href: "/governor" },
            { name: "Chief Minister", href: "/cm" },
            { name: "Chief Minister", href: "/cm" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb30 pb30-md represent">
          <div className="container">
            {/* <SectionTitle title="Chief Minister" /> */}
            <h4 className="tabDet title mb20">Chief Minister</h4>

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
                                        src="https://www.niyamasabha.nic.in/images/member/pinarayi-vijayan_member_15_7.jpg"
                                        width={150}
                                        alt=""
                                      />
                                    </motion.a>
                                    <motion.div
                                      className="container"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                      <div className="row">
                                        <div className="col-lg-6 mb-3 mb-lg-0">
                                          <div className="speaker-prof ml20 ml0-xs mt15-sm">
                                            <h3 className="title">
                                              {chiefMinister.name}
                                            </h3>
                                            <h6 className="mb-2 text-th">
                                              {chiefMinister.designation}
                                            </h6>
                                            <h6 className="list-inline-item mb-0 text-thm">
                                              {chiefMinister.party}
                                            </h6>
                                            <Link
                                              className="viw mt10"
                                              to="/member-profile/2370" // Member Id from site
                                            >
                                              View More
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="memb-prof col-lg-6">
                                          <div className="ml20 ml0-xs mt15-sm">
                                            <div className="mb-2 d-flex align-items-center contac">
                                              <small className="mb-2">
                                                Constituency
                                              </small>
                                              <h6 className="text-th">
                                                : {chiefMinister.constituency}
                                              </h6>
                                            </div>
                                            <div className="mb-2 d-flex align-items-center contac">
                                              <small className="mb-2">
                                                Elected Date
                                              </small>
                                              <h6 className="text-th mb-0 ms-2">
                                                : {chiefMinister.electedDate}
                                              </h6>
                                            </div>
                                            <div className="mb-2 d-flex align-items-center contac">
                                              <small className="mb-2">
                                                Email Address
                                              </small>
                                              <h6 className="text-th">
                                                : {chiefMinister.email}
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
                      <div className="row pt50">
                        <div className="col-lg-6">
                          <div className="border-0 basicD">
                            {/* Personal Assistant */}
                            <h6 className="title mb30">Personal Assistant</h6>
                            <div className="row">
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/user.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Name</h6>
                                    <h5>-</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/phone-call.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Phone</h6>
                                    <h5>-</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/envelope.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Email</h6>
                                    <h5>-</h5>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Personal Details */}
                            <h6 className="title mb30">Personal Details</h6>
                            <div className="row">
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/birthicon.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Date of Birth</h6>
                                    <h5>{chiefMinister.basic.dob}</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/location.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Place of Birth</h6>
                                    <h5>{chiefMinister.basic.birthPlace}</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/user.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Father's Name</h6>
                                    <h5>{chiefMinister.basic.fatherName}</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/user.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Mother's Name</h6>
                                    <h5>{chiefMinister.basic.motherName}</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/ring.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Marital Status</h6>
                                    <h5>{chiefMinister.basic.maritalStatus}</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/favorite.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Spouse's Name</h6>
                                    <h5>{chiefMinister.basic.spouseName}</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/user.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Sons</h6>
                                    <h5>{chiefMinister.basic.sons}</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/user.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Daughters</h6>
                                    <h5>{chiefMinister.basic.daughters}</h5>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Address */}
                            <h6 className="title mb30">Address</h6>
                            <div className="row">
                              <div className="col-md-12 mb30">
                                <div className="singleD">
                                  <img src="/images/home.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Present</h6>
                                    <h5>-</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 mb30">
                                <div className="singleD">
                                  <img src="/images/home.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Permanent</h6>
                                    <h5>{chiefMinister.address.permanent}</h5>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Qualifications */}
                            <h6 className="title mb30">Qualifications</h6>
                            <div className="row">
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/study.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Education</h6>
                                    <h5>
                                      {chiefMinister.qualifications.education}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/suitcase.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Profession</h6>
                                    <h5>
                                      {chiefMinister.qualifications.profession}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/language.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Languages Known</h6>
                                    <h5>
                                      {chiefMinister.qualifications.languages}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-lg-6 basicD pl20">
                          <h6 className="title mb30">Positions Held</h6>
                          <div className="timeline">
                            <ul>
                              <li>
                                <div className="content">
                                  <h6>{chiefMinister.designation}</h6>
                                  <p>{chiefMinister.party}</p>
                                </div>
                                <div className="time">
                                  <h4>{chiefMinister.electedDate}</h4>
                                </div>
                              </li>
                            </ul>
                          </div>

                          <h6 className="title mb30 pt40">
                            Other Positions Held
                          </h6>
                          <div className="row">
                            <div className="singleD">
                              <div className="ryt">
                                <p className="otherpo">
                                  {chiefMinister.qualifications
                                    ?.countriesVisited
                                    ? `Countries Visited: ${chiefMinister.qualifications.countriesVisited}`
                                    : "-"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="mb-1">
                              <strong>Constituency:</strong>{" "}
                              {chiefMinister.constituency}
                            </p>
                            <p className="mb-1">
                              <strong>Party:</strong> {chiefMinister.party}
                            </p>
                            <p className="mb-0">
                              <strong>Email:</strong> {chiefMinister.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  ),
                },
                {
                  key: "Chief Ministers since 1957",
                  label: "Chief Ministers since 1957",
                  content: (
                    <div className="pt30">
                      {/* <SectionTitle title="Chief Ministers since 1957" className="mt30" /> */}
                      <h4 className="tabDet title mb20">
                        Chief Ministers since 1957
                      </h4>

                      <div className="row">
                        {formerCMs.map((cm, idx) => (
                          <div
                            className="col-6 col-md-4 col-lg-2 mb30"
                            key={`${cm.id}-${idx}`}
                          >
                            <div
                              className="bdrs16 h-100 p15 d-flex flex-column"
                              style={{
                                background: "#ffffff",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                                minHeight: "320px",
                              }}
                            >
                              <div className="text-center flex-shrink-0">
                                <img
                                  src={cm.local_photo_url || cm.photo_url}
                                  alt={cm.name}
                                  style={{
                                    width: "100%",
                                    height: 200,
                                    objectFit: "cover",
                                    borderRadius: 12,
                                  }}
                                  onError={(e) => {
                                    e.target.src = "/images/speaker.jpg";
                                  }}
                                />
                              </div>
                              <div className="mt15 flex-grow-1 d-flex flex-column">
                                <h6
                                  className="mb0 text-thm"
                                  style={{
                                    minHeight: 50,
                                    fontSize: "16px",
                                    lineHeight: "1.2",
                                  }}
                                >
                                  {cm.name}
                                </h6>
                                <p
                                  className="mb0 text-th mt-auto"
                                  style={{
                                    fontSize: 12,
                                    color: "#666",
                                    marginTop: "2px",
                                  }}
                                >
                                  {cm.period}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
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

export default CM;
