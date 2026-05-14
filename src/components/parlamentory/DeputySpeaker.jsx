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
import Pagination from "../common/Pagination";
import "./Governer.css";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/config";
import axiosInstance from "../../api/axios";

const DeputySpeaker = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [deputySpeakerData, setDeputySpeakerData] = useState(null);
  const [formerDeputySpeakers, setFormerDeputySpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchDeputySpeakerData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_ENDPOINTS.DEPUTY_SPEAKER);
        if (response.data.status && response.data.data) {
          setDeputySpeakerData(response.data.data);
        } else {
          setError("No data found");
        }
      } catch (err) {
        console.error("Error fetching deputy speaker data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchDeputySpeakerData();
  }, []);

  useEffect(() => {
    const fetchFormerDeputySpeakers = async () => {
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.FORMER_DEPUTY_SPEAKERS);
        if (response.data && Array.isArray(response.data)) {
          setFormerDeputySpeakers(response.data);
          console.log("Former Deputy Speakers loaded:", response.data);
        }
      } catch (err) {
        console.error("Error fetching former deputy speakers:", err);
      }
    };

    fetchFormerDeputySpeakers();
  }, []);

  const deputyStaff = [
    {
      name: "Shri. Santhosh V",
      designation: "Private Secretary",
      direct: "9447905025",
      epabx: "3009",
      residence: "0474 2558208",
      emails: [],
      mobiles: ["9447905025"],
      photo:
        "https://www.niyamasabha.nic.in/images/shri.-santhosh-v_dyspeaker_officer_5e3fd113b0e86_.jpg",
    },
    {
      name: "Shri. Vinod V",
      designation: "Additional Private Secretary",
      direct: "9446025391",
      epabx: "2071",
      residence: "",
      emails: [],
      mobiles: ["9447890587"],
      photo:
        "https://www.niyamasabha.nic.in/images/shri.-vinod-v_dyspeaker_officer_5e3fd17475e7a_.jpg",
    },
    // Add more rows for demo
    ...Array.from({ length: 8 }, (_, i) => ({
      name: `Staff Member ${i + 3}`,
      designation: "Assistant",
      direct: "-",
      epabx: String(2010 + i),
      residence: "-",
      emails: [],
      mobiles: ["-"],
    })),
  ];

  const [page] = useState(1);
  const itemsPerPage = 10;
  const pagedStaff = deputyStaff.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Extract member data from API
  const member = deputySpeakerData?.member;
  const memberLang = member?.langs?.[0];
  const addresses = deputySpeakerData?.addresses;

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
            { name: "Parliamentary Functionaries", href: "/governor" },
            { name: "Deputy Speaker", href: "/deputy-speaker" },
            { name: "Deputy Speaker", href: "/deputy-speaker" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb30 pb30-md represent">
          <div className="container">
            <SectionTitle title="Deputy Speaker" />

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
                                        src={member?.image || "/images/Dep_speaker.png"}
                                        width={150}
                                        alt={memberLang?.name || "Deputy Speaker"}
                                      />
                                    </motion.a>
                                    <motion.div
                                      className="container"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                      <div className="row mt-4">
                                        {/* Deputy Speaker */}
                                        <div className=" col-lg-6 mb-3 mb-lg-0">
                                          <div className="speaker-prof ml20 ml0-xs mt15-sm">
                                            <h3 className="title">
                                              {memberLang?.name || "Chittayam Gopakumar"}
                                            </h3>
                                            <h6 className="mb-2 text-th">
                                              Deputy Speaker of Kerala (Incharge)
                                            </h6>
                                            <h6 className="list-inline-item mb-0 text-thm">
                                              Communist Party of India
                                            </h6>
                                            {member?.id && (
                                              <Link
                                                className="viw mt10"
                                                to={`/member-profile/${member.id}`}
                                              >
                                                View More
                                              </Link>
                                            )}
                                          </div>
                                        </div>
                                        <div className="memb-prof col-lg-6">
                                          <div className="ml20 ml0-xs mt15-sm">
                                            <div className="mb-2 d-flex align-items-center contac">
                                              <small className="mb-2">
                                                Constituency
                                              </small>
                                              <h6 className=" text-th">
                                                : Adoor
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
                                                : {addresses?.email_ids || "chittayamg@niyainmasabha.nic.in"}
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
                    // <div className="pt30">
                    //   <div className="grids">
                    //     <h4 className="tabDet title mb20">Basic Details</h4>
                    //     <div className="row">
                    //       <div className="col-lg-6">
                    //         <div className="border-0 basicD">
                    //           <div className="singleD">
                    //             <img src="/images/birthicon.svg" alt="" />
                    //             <div className="ryt">
                    //               <h6>Date of Birth</h6>
                    //               <h5>1965-05-30</h5>
                    //             </div>
                    //           </div>
                    //           <div className="singleD">
                    //             <img src="/images/location.svg" alt="" />
                    //             <div className="ryt">
                    //               <h6>Place of Birth</h6>
                    //               <h5>Chittayam</h5>
                    //             </div>
                    //           </div>
                    //           <div className="singleD">
                    //             <img src="/images/user.svg" alt="" />
                    //             <div className="ryt">
                    //               <h6>Father's Name</h6>
                    //               <h5>Shri. T Gopalakrishnan</h5>
                    //             </div>
                    //           </div>
                    //           <div className="singleD">
                    //             <img src="/images/user.svg" alt="" />
                    //             <div className="ryt">
                    //               <h6>Mother's Name</h6>
                    //               <h5>Smt. T K Devayani</h5>
                    //             </div>
                    //           </div>
                    //           <div className="singleD">
                    //             <img src="/images/ring.svg" alt="" />
                    //             <div className="ryt">
                    //               <h6>Marital Status</h6>
                    //               <h5>Married</h5>
                    //             </div>
                    //           </div>
                    //         </div>
                    //       </div>
                    //       <div className="col-lg-6 basicD pl20">
                    //         <h6 className="title mb30">Qualifications</h6>
                    //         <div className="singleD">
                    //           <img src="/images/study.svg" alt="" />
                    //           <div className="ryt">
                    //             <h6>Education</h6>
                    //             <h5>Pre-Degree (course completed)</h5>
                    //           </div>
                    //         </div>
                    //         <div className="singleD">
                    //           <img src="/images/suitcase.svg" alt="" />
                    //           <div className="ryt">
                    //             <h6>Profession</h6>
                    //             <h5>Social Worker</h5>
                    //           </div>
                    //         </div>
                    //         <div className="singleD">
                    //           <img src="/images/language.svg" alt="" />
                    //           <div className="ryt">
                    //             <h6>Languages Known</h6>
                    //             <h5>Malayalam, English</h5>
                    //           </div>
                    //         </div>
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                  ),
                },
                {
                  key: "Office",
                  label: "Office",
                  content: (
                    <div className="pt30">
                      <h4 className="tabDet title mb20">
                        Deputy Speaker's Office
                      </h4>
                      <div className="table-responsive">
                        <table className="table table myTable2">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                rowSpan={2}
                                style={{ verticalAlign: "middle" }}
                              >
                                Name and Designation
                              </th>
                              <th
                                scope="col"
                                colSpan={3}
                                className="text-center"
                                style={{ borderBottom: "1px solid #c5c5c5" }}
                              >
                                Phone Number
                              </th>
                              <th
                                scope="col"
                                rowSpan={2}
                                style={{ verticalAlign: "middle" }}
                              >
                                Photo
                              </th>
                            </tr>
                            <tr>
                              <th scope="col">Direct</th>
                              <th scope="col">EPABX</th>
                              <th scope="col">Residence</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pagedStaff.map((p, idx) => (
                              <tr key={idx}>
                                <td>
                                  <div className="text-th">
                                    <strong>{p.name}</strong>
                                  </div>
                                  <div
                                    className="small"
                                    style={{ color: "#6c757d" }}
                                  >
                                    {p.designation}
                                  </div>
                                </td>
                                <td>{p.direct || "-"}</td>
                                <td>{p.epabx || "-"}</td>
                                <td>{p.residence || "-"}</td>
                                <td>
                                  {p.photo ? (
                                    <img
                                      src={p.photo}
                                      alt={p.name}
                                      style={{
                                        width: 60,
                                        height: 60,
                                        objectFit: "cover",
                                        borderRadius: 6,
                                      }}
                                    />
                                  ) : (
                                    "-"
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                },
                
                // {   key: "Email to Deputy Speaker",
                //   label: "Email to Deputy Speaker",
                //   content:(
                //   <div></div>

                //   )
                // },
                {
                  key: "Former Deputy Speakers",
                  label: "Former Deputy Speakers",
                  content: (
                    <div className="pt30">
                      {/* <SectionTitle title="Former Deputy Speakers" className="mt30" /> */}
                      <h4 className=" title mb20">Former Deputy Speakers (Incharge)</h4>

                      <div className="row">
                        {formerDeputySpeakers.map((spk, idx) => (
                          <div
                            className="col-6 col-md-4 col-lg-2 mb30"
                            key={spk.id || idx}
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
                                  src={spk.photo_path}
                                  alt={spk.name}
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
                                  {spk.name}
                                </h6>
                                <p
                                  className="mb0 text-th mt-auto"
                                  style={{
                                    fontSize: 12,
                                    color: "#666",
                                    marginTop: "2px",
                                  }}
                                >
                                  {spk.start_date} – {spk.end_date || "(incumbent)"}
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

export default DeputySpeaker;
