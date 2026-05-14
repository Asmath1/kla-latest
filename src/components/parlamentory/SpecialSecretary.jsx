import React, { useEffect, useState } from "react";
import HomeTest from "../Header";
import { CategoriesNav, BreadcrumbNav, SectionTitle, Tabs } from "../common";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SpecialSecretary = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Secretary profile data (sample)
  const secretary = {
    name: "---",
    designation: "Special Secretary(Incharge)",
    party: "Kerala Legislative Assembly",
    constituency: "",
    electedDate: "",
    email: "secretary@niyamasabha.nic.in",
    image:
      "https://www.niyamasabha.nic.in/images/dr.-n-krishnakumar_member__186_.jpg",
    basic: {
      dob: "09-02-1970", // Date of Birth :contentReference[oaicite:0]{index=0}
      birthPlace: "", // Not specified on the page :contentReference[oaicite:1]{index=1}
      fatherName: "Late S. K. Nataraja Pillai", // :contentReference[oaicite:2]{index=2}
      motherName: "V. Manonmani Amma", // :contentReference[oaicite:3]{index=3}
      maritalStatus: "", // Not specified :contentReference[oaicite:4]{index=4}
      spouseName: "Shiji V", // Wife’s name :contentReference[oaicite:5]{index=5}
    },
    address: {
      present:
        "'Sruthi', Legislature Complex, Vikas Bhavan P.O., Thiruvananthapuram-695008", // Official residence :contentReference[oaicite:6]{index=6}
      permanent:
        "House No.G9(1), 'Sree Krishna', Lekshmi Nagar, Pattom P.O, Thiruvananthapuram-695004", // Permanent residence :contentReference[oaicite:7]{index=7}
    },
    qualifications: {
      education: "BSc., LLM, PGDCrJA, Ph.D", // :contentReference[oaicite:8]{index=8}
      profession: "Indian Administrative/Legislative Service",
      languages: "Malayalam, English",
      presentPosition:
        "Secretary (On Deputation), Kerala Legislative Assembly, Thiruvananthapuram-695033", // :contentReference[oaicite:9]{index=9}
    },
    contact: {
      phone: "0471-2305834, 2513006, 2512002", // Official phones :contentReference[oaicite:10]{index=10}
      mobile: "9495007917, 9846115326", // Mobile numbers :contentReference[oaicite:11]{index=11}
      fax: "0471-2305891", // Fax :contentReference[oaicite:12]{index=12}
      localOfficePhone: "0471-2512156, 2512157", // Residential / Local Office Phones :contentReference[oaicite:13]{index=13}
    },
  };

  const formerSecretaries = [
    {
      name: "Sri. Shaji C Baby (In Charge)",
      period: "01 Jan 2024 ‒ 06 Jun 2024",
      img: "http://niyamasabha.nic.in/images/Fromer_Secretaries/1.Shaji_C_Baby.jpg",
    },
    {
      name: "A. M. Basheer",
      period: "01 Aug 2022 ‒ 01 Jan 2024",
      img: "http://niyamasabha.nic.in/images/Fromer_Secretaries/2.A_M_Basheer.jpg",
    },
    {
      name: "Smt. Kavitha Unnithan (In-charge)",
      period: "01 Jun 2022 ‒ 31 Jul 2022",
      img: "http://niyamasabha.nic.in/images/Fromer_Secretaries/3.Kavitha_Unnithan.jpg",
    },
    {
      name: "Shri. S. V. Unnikrishnan Nair",
      period: "22 Jul 2019 ‒ 31 May 2022",
      img: "http://niyamasabha.nic.in/images/Fromer_Secretaries/4.S_V_Unnikrishnan_Nair.jpg",
    },
    {
      name: "Sri. C. Jos (In-Charge)",
      period: "01 Jun 2019 ‒ 29 Jul 2019",
      img: "http://niyamasabha.nic.in/images/Fromer_Secretaries/5.C_Jos.jpg",
    },
    {
      name: "Shri. V. K. Babu Prakash",
      period: "10 Jul 2016 ‒ 21 Jul 2019",
      img: "http://niyamasabha.nic.in/images/Fromer_Secretaries/6.V_K_Babu_Prakash.jpg",
    },
    {
      name: "Smt. P. Jayalekshmi (In-Charge)",
      period: "31 May 2016 ‒ 06 Oct 2016",
      img: "http://niyamasabha.nic.in/images/Fromer_Secretaries/7.P_Jayalekshmi.jpg",
    },
    {
      name: "Shri. K. Mohandas (In-charge)",
      period: "18 May 2016 ‒ 31 May 2016",
      img: "http://niyamasabha.nic.in/images/Fromer_Secretaries/8.K_Mohandas.jpg",
    },
    {
      name: "Shri. P. D. Sarangadharan",
      period: "30 Nov 2012 ‒ 18 May 2016",
      img: "http://niyamasabha.nic.in/images/Fromer_Secretaries/9.P_D_Sarangadharan.jpg",
    },
    {
      name: "Shri. P. K. Muraleedharan (In-charge)",
      period: "13 Jan 2012 ‒ 30 Nov 2012",
      img: "http://niyamasabha.nic.in/images/Fromer_Secretaries/10.P_K_Muraleedharan.jpg",
    },
  ];

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
            { name: "Special Secretary", href: "/special-secretary" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb30 pb30-md represent">
          <div className="container">
            <SectionTitle title="Special Secretary" />

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
                                      href="#"
                                      whileHover={{ scale: 1.05 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <motion.img
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="memberProfileImg"
                                        src={secretary.image}
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
                                        <div className="memb-prof col-lg-6 mb-3 mb-lg-0">
                                          <div className="ml20 ml0-xs mt15-sm">
                                            <h3 className="title">
                                              {secretary.name}
                                            </h3>
                                            <h6 className="mb-2 text-th">
                                              {secretary.designation}
                                            </h6>
                                            {secretary.party && (
                                              <h6 className="list-inline-item mb-0 text-thm">
                                                {secretary.party}
                                              </h6>
                                            )}
                                          </div>
                                        </div>
                                        <div className="memb-prof col-lg-6">
                                          <div className="ml20 ml0-xs mt15-sm">
                                            <div className="mb-2 d-flex align-items-center contac">
                                              <small className="mb-2">
                                                Email Address
                                              </small>
                                              <h6 className="text-th">
                                                : {secretary.email}
                                              </h6>
                                            </div>
                                            {secretary.constituency && (
                                              <div className="mb-2 d-flex align-items-center contac">
                                                <small className="mb-2">
                                                  Constituency
                                                </small>
                                                <h6 className=" text-th">
                                                  : {secretary.constituency}
                                                </h6>
                                              </div>
                                            )}
                                            {secretary.electedDate && (
                                              <div className="mb-2 d-flex align-items-center contac">
                                                <small className="mb-2">
                                                  Elected Date
                                                </small>
                                                <h6 className=" text-th mb-0 ms-2">
                                                  : {secretary.electedDate}
                                                </h6>
                                              </div>
                                            )}
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
                      {/* Secretary profile (row) — data taken from niyamasabha.nic.in/index.php/secretary */}
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
                                    <h5>
                                      {(secretary.personalAssistant &&
                                        secretary.personalAssistant.name) ||
                                        "-"}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/phone-call.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Phone</h6>
                                    <h5>
                                      {(secretary.personalAssistant &&
                                        secretary.personalAssistant.phone) ||
                                        "-"}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/envelope.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Email</h6>
                                    <h5>
                                      {(secretary.personalAssistant &&
                                        secretary.personalAssistant.email) ||
                                        "-"}
                                    </h5>
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
                                    <h5>{secretary.basic?.dob || "-"}</h5>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/location.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Place of Birth</h6>
                                    <h5>
                                      {secretary.basic?.birthPlace || "-"}
                                    </h5>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/user.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Father's Name</h6>
                                    <h5>
                                      {secretary.basic?.fatherName || "-"}
                                    </h5>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/user.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Mother's Name</h6>
                                    <h5>
                                      {secretary.basic?.motherName || "-"}
                                    </h5>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/ring.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Marital Status</h6>
                                    <h5>
                                      {secretary.basic?.maritalStatus || "-"}
                                    </h5>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6 mb30">
                                <div className="singleD">
                                  <img src="/images/favorite.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Spouse's Name</h6>
                                    <h5>
                                      {secretary.basic?.spouseName ||
                                        secretary.family?.wife ||
                                        "-"}
                                    </h5>
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
                                    <h5>{secretary.address?.present || "-"}</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 mb30">
                                <div className="singleD">
                                  <img src="/images/home.svg" alt="" />
                                  <div className="ryt">
                                    <h6>Permanent</h6>
                                    <h5>
                                      {secretary.address?.permanent || "-"}
                                    </h5>
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
                                      {secretary.qualifications?.education ||
                                        "-"}
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
                                      {secretary.qualifications?.profession ||
                                        "-"}
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
                                      {secretary.qualifications?.languages ||
                                        "-"}
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
                              {/* Use present position as one item */}
                              <li>
                                <div className="content">
                                  <h6>
                                    {secretary.qualifications?.presentPosition
                                      ? "Secretary (Present)"
                                      : "-"}
                                  </h6>
                                  <p>
                                    {secretary.qualifications
                                      ?.presentPosition || "-"}
                                  </p>
                                </div>
                                <div className="time">
                                  <h4>Present</h4>
                                </div>
                              </li>

                              {/* If you have a positions array, map it here. Fallback shown below */}
                              {Array.isArray(secretary.positions) &&
                              secretary.positions.length > 0 ? (
                                secretary.positions.map((position, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: idx * 0.05,
                                    }}
                                  >
                                    <div className="content">
                                      <h6>{position.title}</h6>
                                      <p>{position.organization}</p>
                                    </div>
                                    <div className="time">
                                      <h4>{position.period}</h4>
                                    </div>
                                  </motion.li>
                                ))
                              ) : (
                                <motion.li
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="content">
                                    <h6>Various administrative roles</h6>
                                    <p>
                                      Held different posts in Indian
                                      Administrative / Legislative Service
                                    </p>
                                  </div>
                                  <div className="time">
                                    <h4>—</h4>
                                  </div>
                                </motion.li>
                              )}

                              <div style={{ clear: "both" }}></div>
                            </ul>
                          </div>

                          <h6 className="title mb30 pt40">
                            Other Positions Held
                          </h6>
                          <div className="row">
                            <div className="singleD">
                              <div className="ryt">
                                <p className="otherpo">
                                  {/* Use a real field if available, otherwise show a general summary */}
                                  {secretary.otherPositions ||
                                    "Secretary (On Deputation), Kerala Legislative Assembly. Formerly served in various administrative capacities in IAS / Legislative service."}
                                </p>

                                {/* Contact block (optional) */}
                                <div className="mt-3">
                                  <p className="mb-1">
                                    <strong>Phone:</strong>{" "}
                                    {secretary.contact?.phone || "-"}
                                  </p>
                                  <p className="mb-1">
                                    <strong>Mobile:</strong>{" "}
                                    {secretary.contact?.mobile || "-"}
                                  </p>
                                  <p className="mb-1">
                                    <strong>Fax:</strong>{" "}
                                    {secretary.contact?.fax || "-"}
                                  </p>
                                  <p className="mb-0">
                                    <strong>
                                      Residential / Local Office Phone:
                                    </strong>{" "}
                                    {secretary.contact?.localOfficePhone || "-"}
                                  </p>
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
                  key: "Office",
                  label: " Office",
                  content: <div></div>,
                },
                // {
                //   key: "Role of Secretaries",
                //   label: "Role of Secretaries",
                //   content: <div></div>,
                // },
                // {
                //   key: "Email to Secretary",
                //   label: "Email to Secretary",
                //   content: <div></div>,
                // },
                
                {
                  key: "Former Secretaries",
                  label: "Former Secretaries",
                  content: (
                    <div className="table-responsive mt30">
                      <table className="table table myTable2">
                        <thead>
                          <tr>
                            <th scope="col">Sl. No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Period</th>
                            <th scope="col">Photo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formerSecretaries.map((s, idx) => (
                            <tr key={idx}>
                              {/* Sl.No */}
                              <td className="text-th">{idx + 1}</td>

                              {/* Name */}
                              <td className="text-th">
                                <strong>{s.name}</strong>
                              </td>

                              {/* Period */}
                              <td className="text-th">{s.period}</td>

                              {/* Photo */}
                              <td>
                                <img
                                  src={s.img}
                                  alt={s.name}
                                  style={{
                                    width: 64,
                                    height: 64,
                                    objectFit: "cover",
                                  }}
                                  onError={(e) => {
                                    e.currentTarget.src = "https://www.niyamasabha.nic.in/images/sri.-shaji-c-baby-(in-charge)_secretary_2024-01-01_.jpg";
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default SpecialSecretary;
