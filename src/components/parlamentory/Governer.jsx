import React, { useEffect, useState } from "react";
import HomeTest from "../Header";
import {
  CategoriesNav,
  BreadcrumbNav,
  SectionTitle,
  SessionCalendar,
  Filter,
  Tabs,
  ExportButton,
  PdfViewerModal,
} from "../common";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Governer = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfTitle, setPdfTitle] = useState("Document");

  const openPdf = (url, title = "Document") => {
    setPdfUrl(url);
    setPdfTitle(title);
    setShowPdfModal(true);
  };

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

  // Former Governors data from https://www.rajbhavan.kerala.gov.in/index.php/the-governor/previous-governors
  // const formerGovernors = [
  //   {
  //     name: "Shri P.S. Rao",
  //     tenure: "1956-1960",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/ps_rao.jpg",
  //   },
  //   {
  //     name: "Shri B. Ramakrishna Rao",
  //     tenure: "1960-1965",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/b_ramakrishna_rao.jpg",
  //   },
  //   {
  //     name: "Shri V.V. Giri",
  //     tenure: "1965-1967",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/vv_giri.jpg",
  //   },
  //   {
  //     name: "Shri A.P. Jain",
  //     tenure: "1967-1972",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/ap_jain.jpg",
  //   },
  //   {
  //     name: "Shri Bhagavan Sahay",
  //     tenure: "1972-1973",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/bhagavan_sahay.jpg",
  //   },
  //   {
  //     name: "Shri N.N. Wanchoo",
  //     tenure: "1973-1977",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/nn_wanchoo.jpg",
  //   },
  //   {
  //     name: "Shri V. Viswanathan",
  //     tenure: "1977-1980",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/v_viswanathan.jpg",
  //   },
  //   {
  //     name: "Smt. Jothi Venkatachalam",
  //     tenure: "1980-1985",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/jothi_venkatachalam.jpg",
  //   },
  //   {
  //     name: "Shri P. Ramachandran",
  //     tenure: "1985-1990",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/p_ramachandran.jpg",
  //   },
  //   {
  //     name: "Smt. Ram Dulari Sinha",
  //     tenure: "1990-1995",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/ram_dulari_sinha.jpg",
  //   },
  //   {
  //     name: "Shri (Dr.) Sarup Singh",
  //     tenure: "1995-2000",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/sarup_singh.jpg",
  //   },
  //   {
  //     name: "Shri B. Rachaiah",
  //     tenure: "2000-2002",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/b_rachaiah.jpg",
  //   },
  //   {
  //     name: "Shri Gopal Ramanujam",
  //     tenure: "2002-2004",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/gopal_ramanujam.jpg",
  //   },
  //   {
  //     name: "Shri P. Shivshanker",
  //     tenure: "2004-2006",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/p_shivshanker.jpg",
  //   },
  //   {
  //     name: "Shri Khurshed Alam Khan",
  //     tenure: "2006-2008",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/khurshed_alam_khan.jpg",
  //   },
  //   {
  //     name: "Shri (Dr.) C. Rangarajan",
  //     tenure: "2008-2010",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/c_rangarajan.jpg",
  //   },
  //   {
  //     name: "Shri Mohammed Fazal",
  //     tenure: "2010-2012",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/mohammed_fazal.jpg",
  //   },
  //   {
  //     name: "Shri Justice Sukhdev Singh Kang",
  //     tenure: "2012-2014",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/sukhdev_singh_kang.jpg",
  //   },
  //   {
  //     name: "Shri Sikander Bakht",
  //     tenure: "2014-2016",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/sikander_bakht.jpg",
  //   },
  //   {
  //     name: "Shri Triloki Nath Chaturvedi",
  //     tenure: "2016-2018",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/triloki_nath_chaturvedi.jpg",
  //   },
  //   {
  //     name: "Shri R.L. Bhatia",
  //     tenure: "2018-2019",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/rl_bhatia.jpg",
  //   },
  //   {
  //     name: "Shri Ramakrishna Suryabhanji Gavai",
  //     tenure: "2019-2021",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/ramakrishna_gavai.jpg",
  //   },
  //   {
  //     name: "Shri M.O.H.Farook",
  //     tenure: "2021-2022",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/moh_farook.jpg",
  //   },
  //   {
  //     name: "Shri H.R. Bhardwaj",
  //     tenure: "2022-2023",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/hr_bhardwaj.jpg",
  //   },
  //   {
  //     name: "Shri Nikhil Kumar",
  //     tenure: "2023-2024",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/nikhil_kumar.jpg",
  //   },
  //   {
  //     name: "Smt. Sheila Dikshit",
  //     tenure: "2024",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/sheila_dikshit.jpg",
  //   },
  //   {
  //     name: "Shri Justice P. Sathasivam",
  //     tenure: "2024",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/p_sathasivam.jpg",
  //   },
  //   {
  //     name: "Shri Arif Mohammed Khan",
  //     tenure: "2024-2025",
  //     img: "https://www.rajbhavan.kerala.gov.in/images/governors/arif_mohammed_khan.jpg",
  //   },
  // ];

  // Governor's Speeches data from https://www.niyamasabha.nic.in/index.php/business/index/governors_speeches
  const governorSpeeches = [
    {
      name: "Shri. Arif Mohammed Khan",
      date: "25-Jan-2024",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-25-jan-eng-2024.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-25-jan-mal-2024.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Arif Mohammed Khan",
      date: "23-Jan-2023",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-23-jan-eng-2023.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-23-jan-mal-2023.pdf",
      erratum:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-23-jan-erratum-2023.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Arif Mohammed Khan",
      date: "18-Feb-2022",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-18-feb-eng-2022.pdf",
      malayalam:
        "http://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-18-feb-mal-2022.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Arif Mohammed Khan",
      date: "24-Jan-2021",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-24-jan-eng-2021.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-24-jan-mal-2021.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Arif Mohammed Khan",
      date: "23-Jan-2020",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-23-jan-eng-2020.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-23-jan-mal-2020.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Arif Mohammed Khan",
      date: "24-Jan-2019",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-24-jan-eng-2019.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-24-jan-mal-2019.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Justice P. Sathasivam",
      date: "25-Jan-2018",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-25-jan-eng-2018.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-25-jan-mal-2018.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Justice P. Sathasivam",
      date: "26-Jan-2017",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-26-jan-eng-2017.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-26-jan-mal-2017.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Justice P. Sathasivam",
      date: "28-Jan-2016",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-28-jan-eng-2016.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-28-jan-mal-2016.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Justice P. Sathasivam",
      date: "29-Jan-2015",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-29-jan-eng-2015.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-29-jan-mal-2015.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Sheila Dikshit",
      date: "30-Jan-2014",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-30-jan-eng-2014.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-30-jan-mal-2014.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Sheila Dikshit",
      date: "31-Jan-2013",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-31-jan-eng-2013.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-31-jan-mal-2013.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Sheila Dikshit",
      date: "01-Feb-2012",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-01-feb-eng-2012.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-01-feb-mal-2012.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Sheila Dikshit",
      date: "02-Feb-2011",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-02-feb-eng-2011.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-02-feb-mal-2011.pdf",
      documentUrl: "/images/document.svg",
    },
    {
      name: "Shri. Sheila Dikshit",
      date: "03-Feb-2010",
      english:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-03-feb-eng-2010.pdf",
      malayalam:
        "https://niyamasabha.nic.in/images/Governors%5FAddress/EGov-Add-03-feb-mal-2010.pdf",
      documentUrl: "/images/document.svg",
    },
  ];

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
            { name: "Parliamentary Functionaries", href: "/governor" },
            { name: "Governor", href: "/governor" },
          ]}
        />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="Bussiness-schedule quest pt20 pb30 pb30-md represent">
          <div className="container ">
            <h4 className="tabDet title mb20">Governor</h4>

            <section className="breadcumb-section pt30 pb30 container">
              <div className="cta-job-v1 freelancer-single-style mx-auto maxw1700 bdrs16 position-relative overflow-hidden d-flex align-items-center h-auto">
                <img
                  className="left-top-img wow zoomIn"
                  // src="/images/Frame3.png"
                  alt="img"
                />
                <img
                  className="right-bottom-img wow zoomIn "
                  // src="/images/Frame8.png"
                  alt="img"
                />
                <div className="container ">
                  <div className="row wow fadeInUp">
                    <div className="col-xl-10 mx-auto">
                      <div className="position-relative">
                        <div className="list-meta d-lg-flex align-items-end justify-content-between">
                          <div className="wrapper w-100 d-sm-flex align-items-center">
                            <a
                              className="position-relative freelancer-single-style"
                              href=""
                            >
                              <img
                                className="m-3"
                                src="images/gover.jpg"
                                width={150}
                                alt=""
                                height={170}
                              />
                            </a>
                            <div className="container p-0 m-3">
                              <div className="row">
                                <div className="col-md-12 mb-3 mb-lg-0 p-0 ms-2">
                                  <div className="ml30 ml0-xs mt15-sm committe-member ">
                                    <h4 className="title">
                                      Shri.Rajendra Vishwanath Arlekar
                                    </h4>
                                    <h6 className="mb-2 text-th">
                                      The Governor of Kerala (Incharge)
                                    </h6>
                                     <h6 className="mb-2 text-th">
                                     Kerala Legislative Assembly
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="pt30 pb50 pb30-md represent">
              <div className="container p-0">
                <div
                  className="row memberPro wow fadeInUp mt10"
                  data-wow-delay="300ms"
                >
                  <div className="col-12">
                    <Tabs
                      tabs={[
                        {
                          key: "Profile",
                          label: "Profile",
                          content: (
                            <div className="grids pt30">
                              <h4 className="tabDet title mb20">Information</h4>
                              <div className="c-ptag">
                                <p>
                                  Shri Rajendra Vishwanath Arlekar was sworn in
                                  as the 23rd Governor of Kerala on January 2,
                                  2024. Born on April 23, 1954, in Panaji, Goa,
                                  he is the son of Late Shri Vishwanath Arlekar
                                  and Late Smt. Tilomattama Arlekar. Shri
                                  Arlekar completed his matriculation at St.
                                  Joseph's Institute in Vasco da Gama, Goa, and
                                  pursued a degree in Commerce at MES College in
                                  Vasco da Gama. His early interest in public
                                  service was nurtured through his association
                                  with the Rashtriya Swayamsevak Sangh (RSS)
                                  during childhood and later through his
                                  involvement with the Bharatiya Janata Party
                                  (BJP) as an active member since 1989. He also
                                  served as the State President of the Goa BJP
                                  for four years. His unwavering commitment to
                                  democratic values was exemplified during the
                                  Emergency (1975–1977), when he faced
                                  imprisonment along with father for his
                                  resolute defence of democracy. Shri Arlekar's
                                  tenure as a Member of the Goa Legislative
                                  Assembly (2002–2007) was marked by respect for
                                  his ideologies and his advocacy for social
                                  issues, development, and environmental
                                  conservation. From 2012 to 2017, as the
                                  Hon'ble Speaker of the Goa Legislative
                                  Assembly, he earned nationwide acclaim for his
                                  visionary leadership in making the Assembly
                                  the first in India to adopt a paperless
                                  system. He also served as the Minister for
                                  Forest & Environment and Panchayati Raj in
                                  Goa. In July 2021, Shri Arlekar was appointed
                                  as the 21st Governor of Himachal Pradesh, a
                                  position he held until 2023. In February 2023,
                                  he assumed office as the 30th Governor of
                                  Bihar, where he continued to demonstrate his
                                  commitment to public service. Shri Arlekar is
                                  married to Smt. Anagha Arlekar. The couple is
                                  blessed with two children: a daughter, Smt.
                                  Aditi Kulkarni, and a son, Shri Amogh Arlekar.
                                </p>
                              </div>
                            </div>
                          ),
                        },
                        {
                          key: "Office",
                          label: "Office",
                          content: (
                            <div className="pt30">
                              <div className=" alert-card bdrs16 p30 text-center mx-auto">
                                {/* <h6 className="tabDet. title mb20">
                                  Niyamasabha.nic.in says
                                </h6> */}
                                <p
                                  className="mb20"
                                  style={{ color: "#444", lineHeight: "1.6" }}
                                >
                                  This link shall take you to a page/website
                                  outside this website.
                                  <br></br>
                                  <strong> Please Confirm.</strong>
                                </p>
                                <a
                                  href="https://rajbhavan.kerala.gov.in/" // Governor’s Office actual link
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="cnfm-btn ud-btn btn-thm"
                                >
                                  Proceed
                                </a>
                              </div>
                            </div>
                          ),
                        },

                        {
                          key: "Governor's Speeches",
                          label: "Governor's Speeches",
                          content: (
                            <div className="pt30">
                              <h4 className="tabDet title mb20">
                                Governor's Speeches
                              </h4>

                              <div className="table-responsive">
                                <table className="table table myTable2">
                                  <thead>
                                    <tr>
                                      <th scope="col">Sl.No</th>
                                      <th scope="col">Name</th>
                                      <th scope="col">Date</th>
                                      <th scope="col">English</th>
                                      <th scope="col">Malayalam</th>
                                      <th scope="col">Erratum</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {governorSpeeches.map((speech, index) => (
                                      <tr className="debate" key={index}>
                                        <td>{index + 1}</td>
                                        <td className="session-bac-rep">
                                          {speech.name}
                                        </td>
                                        <td>{speech.date}</td>

                                        {/* English PDF */}
                                        <td className="text-center">
                                          {speech.english ? (
                                            <a
                                              className="doci"
                                              href="#"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                openPdf(speech.english, `${speech.name} - English`);
                                              }}
                                              aria-label="English PDF"
                                              title="English PDF"
                                            >
                                              <img
                                                src={
                                                  speech.documentUrl ||
                                                  "/placeholder.svg"
                                                }
                                                alt="English Document"
                                              />
                                            </a>
                                          ) : (
                                            <span style={{ color: "#999" }}>
                                              -
                                            </span>
                                          )}
                                        </td>

                                        {/* Malayalam PDF */}
                                        <td className="text-center">
                                          {speech.malayalam ? (
                                            <a
                                              className="doci"
                                              href="#"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                openPdf(speech.malayalam, `${speech.name} - Malayalam`);
                                              }}
                                              aria-label="Malayalam PDF"
                                              title="Malayalam PDF"
                                            >
                                              <img
                                                src={
                                                  speech.documentUrl ||
                                                  "/placeholder.svg"
                                                }
                                                alt="Malayalam Document"
                                              />
                                            </a>
                                          ) : (
                                            <span style={{ color: "#999" }}>
                                              -
                                            </span>
                                          )}
                                        </td>

                                        {/* Erratum PDF */}
                                        <td className="text-center">
                                          {speech.erratum ? (
                                            <a
                                              className="doci"
                                              href="#"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                openPdf(speech.erratum, `${speech.name} - Erratum`);
                                              }}
                                              aria-label="Erratum PDF"
                                              title="Erratum PDF"
                                            >
                                              <img
                                                src={
                                                  speech.documentUrl ||
                                                  "/placeholder.svg"
                                                }
                                                alt="Erratum Document"
                                              />
                                            </a>
                                          ) : (
                                            <span style={{ color: "#999" }}>
                                              -
                                            </span>
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
                        {
                          key: "Former Governor's",
                          label: "Former Governor's",
                          content: (
                            <div className="pt30">
                              <div className=" alert-card bdrs16 p30 text-center mx-auto">
                                {/* <h6 className="tabDet. title mb20">
                                  Niyamasabha.nic.in says
                                </h6> */}
                                <p
                                  className="mb20"
                                  style={{ color: "#444", lineHeight: "24px" }}
                                >
                                  This link shall take you to a page/website
                                  outside this website.
                                  <strong> Please Confirm.</strong>
                                </p>
                                <a
                                  href="https://www.rajbhavan.kerala.gov.in/index.php/the-governor/previous-governors" // Former Governers
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="cnfm-btn ud-btn btn-thm"
                                >
                                  OK
                                </a>
                              </div>
                            </div>
                          ),
                          // content: (
                          //   <div className="">

                          //     <h4 className="tabDet title mb20">
                          //       Former Governors
                          //     </h4>

                          //     <div className="row">
                          //       {formerGovernors.map((governor, idx) => (
                          //         <div
                          //           className="col-6 col-md-4 col-lg-2 mb30"
                          //           key={idx}
                          //         >
                          //           <div
                          //             className="bdrs16 h-100 p15 d-flex flex-column"
                          //             style={{
                          //               background: "#ffffff",
                          //               boxShadow:
                          //                 "0 2px 10px rgba(0,0,0,0.06)",
                          //               minHeight: "320px",
                          //             }}
                          //           >
                          //             <div className="text-center flex-shrink-0">
                          //               <img
                          //                 src={governor.img}
                          //                 alt={governor.name}
                          //                 style={{
                          //                   width: "100%",
                          //                   height: 200,
                          //                   objectFit: "cover",
                          //                   borderRadius: 12,
                          //                 }}
                          //                 onError={(e) => {
                          //                   e.target.src = "/images/gover.jpg";
                          //                 }}
                          //               />
                          //             </div>
                          //             <div className="mt15 flex-grow-1 d-flex flex-column">
                          //               <h6
                          //                 className="mb5 text-thm"
                          //                 style={{
                          //                   fontSize: "15px",
                          //                   lineHeight: "1.3",
                          //                 }}
                          //               >
                          //                 {governor.name}
                          //               </h6>
                          //               <p
                          //                 className="mb0 text-th mt-auto"
                          //                 style={{
                          //                   fontSize: 12,
                          //                   color: "#666",
                          //                 }}
                          //               >
                          //                 {governor.tenure}
                          //               </p>
                          //             </div>
                          //           </div>
                          //         </div>
                          //       ))}
                          //     </div>
                          //   </div>
                          // ),
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        show={showPdfModal}
        onHide={() => setShowPdfModal(false)}
        fileUrl={pdfUrl}
        title={pdfTitle}
      />
    </div>
  );
};

export default Governer;
