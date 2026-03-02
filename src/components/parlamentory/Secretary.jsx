import React, { useEffect, useState } from "react";
import HomeTest from "../Header";
import { CategoriesNav, BreadcrumbNav, SectionTitle, Tabs } from "../common";
import { motion } from "framer-motion";
import { fetchFormerSecretaries } from "../../api/services/all.service";

const Secretary = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formerSecretaries, setFormerSecretaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch Former Secretaries from API
  useEffect(() => {
    const loadFormerSecretaries = async () => {
      try {
        setLoading(true);
        const data = await fetchFormerSecretaries();
        setFormerSecretaries(data);
      } catch (error) {
        console.error("Error loading former secretaries:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFormerSecretaries();
  }, []);

  // Secretary profile data (sample)
  const secretary = {
    name: "Sri. Shaji C Baby (In-Charge)",
    designation: "Secretary (In-Charge)",
    party: "The Hon'ble Secretary of Kerala Legislative Assembly",
    constituency: "",
    electedDate: "",
    email: "secretary@niyamasabha.nic.in, shajicb@niyamasabha.nic.in",
    image:
      "https://www.niyamasabha.nic.in/images/sri.-shaji-c-baby-(in-charge)_secretary_2024-01-01_.jpg",
    basic: {
      dob: "",
      birthPlace: "",
      fatherName: "George Babykutty",
      motherName: "",
      maritalStatus: "Married",
      spouseName: "Maria A L, Higher Secondary School Teacher", // Wife’s name :contentReference[oaicite:5]{index=5}
    },
    family: {
      wife: "Maria A L, Higher Secondary School Teacher",
      children: "2 Sons",
    },
    address: {
      present:
        "Secretary, Kerala Legislative Assembly, Vikasbhavan P O, Thiruvananthapuram",
      permanent:
        "'Karunya', Olakettiyambalam P O, Mavelikkara, Alappuzha, Kerala",
    },
    qualifications: {
      education: "BSc., LLB, MBA (HR)",
      profession: "Secretary, Kerala Legislative Assembly",
      languages: "Malayalam, English",
      presentPosition:
        "Secretary, Kerala Legislative Assembly, Vikasbhavan P O, Thiruvananthapuram",
    },
    contact: {
      phone: "0471-2305834, 2513006, 2512002", // Official phones :contentReference[oaicite:10]{index=10}
      mobile: "9495007917, 9446012512",
      fax: "",
      localOfficePhone: "",
    },
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
            { name: "Parlamentory Functionaries", href: "/parlamentory" },
            { name: "Secretary", href: "/secretary" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb30 pb30-md represent">
          <div className="container">
            <SectionTitle title="Secretary" />

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
                      {loading ? (
                        <div className="text-center py-5">
                          <p>Loading...</p>
                        </div>
                      ) : formerSecretaries.length === 0 ? (
                        <div className="text-center py-5">
                          <p className="text-muted">No data available</p>
                        </div>
                      ) : (
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
                              <tr key={s.id || idx}>
                                <td className="text-th">{idx + 1}</td>
                                <td className="text-th">
                                  <strong>{s.name}</strong>
                                </td>
                                <td className="text-th">{s.period}</td>
                                <td>
                                  <img
                                    src={s.local_photo_url || s.img}
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
                      )}
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

export default Secretary;
