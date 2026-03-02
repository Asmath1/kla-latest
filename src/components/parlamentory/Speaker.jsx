import React, { useEffect, useState } from "react";
import HomeTest from "../Header";
import {
  CategoriesNav,
  BreadcrumbNav,
  SectionTitle,
  Filter,
  Tabs,
  ExportButton,
  SessionCalendar,
} from "../common";
import PdfViewer from "../common/PdfViewer";
import InlinePdfViewer from "../common/InlinePdfViwer";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Governer.css";
import { Link } from "react-router-dom";

const Speaker = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedSpeechDate, setSelectedSpeechDate] = useState(null);

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

  // Sample speeches data - can be used for filtering in the future
  // const speechesData = [
  //   {
  //     id: 1,
  //     kla: "15th KLA",
  //     year: "2024",
  //     title: "Budget Speech 2024",
  //     date: "2024-02-15",
  //     url: "/pdf1.pdf",
  //   },
  //   {
  //     id: 2,
  //     kla: "15th KLA",
  //     year: "2024",
  //     title: "Inaugural Address",
  //     date: "2024-01-20",
  //     url: "/pdf1.pdf",
  //   },
  //   {
  //     id: 3,
  //     kla: "14th KLA",
  //     year: "2023",
  //     title: "Closing Speech",
  //     date: "2023-12-10",
  //     url: "/pdf1.pdf",
  //   },
  // ];

  const allowedSpeechDates = ["2024-02-15", "2024-01-20", "2023-12-10"];

  const meetingSpeechDates = ["2024-02-15", "2024-01-20", "2023-12-10"];

  // Auto-select the first meeting date on load
  useEffect(() => {
    if (meetingSpeechDates.length > 0) {
      setSelectedSpeechDate(new Date(meetingSpeechDates[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSpeechDateChange = (date) => {
    setSelectedSpeechDate(date);
  };

  // Map date → speech PDF
  const getSpeechPdfUrlForDate = (date) => {
    if (!date) return null;
    const dateString = date.toISOString().split("T")[0];
    if (meetingSpeechDates.includes(dateString)) {
      return "/pdf1.pdf"; // Replace with actual logic if needed
    }
    return null;
  };

  // Rulings From Chair data (sourced from the official rulings list)
  const bacData = [
    {
      id: 1,
      kla: "14",
      session: "2",
      title: "ഓര്‍ഡിനന്‍സ് അസാധുവാണെന്നത് സംബന്ധിച്ച്",
      date: "02.11.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-II_11.pdf",
    },
    {
      id: 2,
      kla: "14",
      session: "2",
      title: "ആക്ട് ഭേദഗതി ചെയ്യുന്നത് സംബന്ധിച്ച്",
      date: "02.11.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-II_10.pdf",
    },
    {
      id: 3,
      kla: "14",
      session: "2",
      title: "ബില്ലിന്റെ ഇംഗ്ലീഷ് പരിഭാഷ അംഗങ്ങള്‍ക്ക് ലഭ്യമാക്കല്‍",
      date: "02.11.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-II_9.pdf",
    },
    {
      id: 4,
      kla: "14",
      session: "2",
      title: "ധനാഭ്യര്‍ത്ഥനകതളുടെ സൂക്ഷ്മപരിശോധന",
      date: "25.10.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-II_8.pdf",
    },
    {
      id: 5,
      kla: "14",
      session: "2",
      title: "നിയമസഭാംഗങ്ങളുടെ അവകാശങ്ങള്‍ നിഷേധിക്കല്‍",
      date: "24.10.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-II_7.pdf",
    },
    {
      id: 6,
      kla: "14",
      session: "2",
      title: "ശ്രദ്ധക്ഷണിക്കല്‍ വിഷയം അടിയന്തരപ്രമേയമായി അവതരിപ്പിക്കല്‍",
      date: "20.10.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-II_6.pdf",
    },
    {
      id: 7,
      kla: "14",
      session: "2",
      title: "ചോദ്യങ്ങള്‍ക്ക് യഥാസമയം മറുപടി ലഭ്യമാക്കല്‍",
      date: "19.10.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-II_5.pdf",
    },
    {
      id: 8,
      kla: "14",
      session: "2",
      title: "പ്രതിപക്ഷാംഗങ്ങളുടെ പ്രസംഗം തടസ്സപ്പെടുത്തല്‍",
      date: "19.10.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-II_4.pdf",
    },
    {
      id: 9,
      kla: "14",
      session: "2",
      title: "അടിയന്തരപ്രമേയത്തിന് അനുമതി",
      date: "17.10.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-II_3.pdf",
    },
    {
      id: 10,
      kla: "14",
      session: "2",
      title: "ബില്ലിന്റെ അവതരണം",
      date: "26.09.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-II_2.pdf",
    },
    {
      id: 11,
      kla: "14",
      session: "2",
      title: "ബില്‍ നിയമവിരുദ്ധമാണെന്നത് സംബന്ധിച്ച്",
      date: "26.09.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-II_1.pdf",
    },
    {
      id: 12,
      kla: "14",
      session: "1",
      title: "അണ്‍പാര്‍ലമെന്ററി പദപ്രയോഗങ്ങള്‍ രേഖയില്‍നിന്നും നീക്കം ചെയ്യല്‍",
      date: "13.07.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-I_10.pdf",
    },
    {
      id: 13,
      kla: "14",
      session: "1",
      title: "ബൈബിള്‍ വചനം ഉദ്ധരിച്ചുകൊണ്ട് നടത്തിയ പരാമര്‍ശം",
      date: "19.07.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-I_9.pdf",
    },
    {
      id: 14,
      kla: "14",
      session: "1",
      title:
        "വാര്‍‌ഷിക പ്രവര്‍ത്തന റിപ്പോര്‍ട്ട് മേശപ്പുറത്തുവയ്ക്കുന്നതിലെ കാലതാമസം",
      date: "19.07.2016",
      url: "http://192.168.12.20/kla/images/Rulings_from_the_chair/Rulings_14-I_8.pdf",
    },
  ];

  const formerSpeakers = [
    {
      name: "Shri R. Sankaranarayanan Thampi",
      tenure: "April 27, 1957 - July 31, 1959",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/rsankaranarayananthampi.jpg",
    },
    {
      name: "Shri K. M. Seethi Sahib",
      tenure: "March 12, 1960 - April 17, 1961",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/KMSEEYTHISAHEB.jpg",
    },
    {
      name: "Shri C. H. Mohammed Koya",
      tenure: "June 9, 1961 - November 10, 1961",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/CHMuhammedKoya.jpg",
    },
    {
      name: "Shri Alexander Parambithara",
      tenure: "December 13, 1961 - September 10, 1964",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/alexanderparambithara.jpg",
    },
    {
      name: "Shri D. Damodaran Potti",
      tenure: "March 15, 1967 - October 21, 1970",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/Ddamodaranpotti.jpg",
    },
    {
      name: "Shri K. Moideenkutty Haji",
      tenure: "October 22, 1970 - May 8, 1975",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/MoideenkuttyHaji.jpg",
    },
    {
      name: "Shri T. S. John",
      tenure: "February 17, 1976 - March 25, 1977",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/TSJohn.jpg",
    },
    {
      name: "Shri Chakkeeri Ahamed Kutty",
      tenure: "March 28, 1977 - February 14, 1980",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/ChakkeeriAhamedKutty.jpg",
    },
    {
      name: "Shri A. P. Kurian",
      tenure: "February 15, 1980 - February 1, 1982",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/APKurian.jpg",
    },
    {
      name: "Shri A. C. Jose",
      tenure: "February 3, 1982 - June 23, 1982",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/ACJose.jpg",
    },
    {
      name: "Shri Vakkom B. Purushothaman",
      tenure: "June 24, 1982 - December 28, 1984",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/VAKKOM_PURUSHOTHAMAN.jpg",
    },
    {
      name: "Shri V. M. Sudheeran",
      tenure: "March 8, 1985 - March 27, 1987",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/VMSudheeran.jpg",
    },
    {
      name: "Shri Varkala Radhakrishnan",
      tenure: "March 30, 1987 - June 28, 1991",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/VarkalaRadhakrishnan.jpg",
    },
    {
      name: "Shri P. P. Thankachan",
      tenure: "July 1, 1991 - May 3, 1995",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/PPThankachan.jpg",
    },
    {
      name: "Shri Therambil Ramakrishnan",
      tenure: "June 27, 1995 - May 28, 1996",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/THERAMBIL_RAMAKRISHNAN.jpg",
    },
    {
      name: "Shri M. Vijayakumar",
      tenure: "May 30, 1996 - June 4, 2001",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/MVijayaKumar.jpg",
    },
    {
      name: "Shri Therambil Ramakrishnan",
      tenure: "September 16, 2004 - May 23, 2006",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/THERAMBIL_RAMAKRISHNAN.jpg",
    },
    {
      name: "Shri K. Radhakrishnan",
      tenure: "May 25, 2006 - May 31, 2011",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/K_RADHAKRISHNAN.jpg",
    },
    {
      name: "Shri G. Karthikeyan",
      tenure: "June 2, 2011 - March 7, 2015",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/G_Karthikeyan_big.jpg",
    },
    {
      name: "Shri N. Sakthan",
      tenure: "March 12, 2015 - June 1, 2016",
      img: "http://niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Speakers/N.%20Sakthan.jpg",
    },
    {
      name: "Shri P. Sreeramakrishnan",
      tenure: "June 3, 2016 - May 23, 2021",
      img: "http://niyamasabha.nic.in/images/sreeramakrishnan.jpg",
    },
    {
      name: "Shri M. B. Rajesh",
      tenure: "May 25, 2021 - September 03, 2022",
      img: "http://niyamasabha.nic.in/images/1MBRajesh.png",
    },
    {
      name: "Shri A. N. Shamseer",
      tenure: "September 12, 2022 -",
      img: "https://niyamasabha.nic.in/images/AN_Shamseer_Hon_Speaker.jpg",
    },
  ];

  const officeStaff = [
    {
      name: "Shri. T Manoharan Nair",
      designation: "Private Secretary to Speaker",
      emails: ["pstospeaker@niyamasabha.nic.in", "teemanohar@gmail.com"],
      direct: "0471 2308890",
      mobiles: ["9497849643", "8281395500"],
      epabx: "3007",
      residence: ["0471 2354080", "2351412"],
    },
    {
      name: "Shri. S Biju",
      designation: "Additional Private Secretary to Speaker",
      emails: ["addlps1@niyamasabha.nic.in", "bijuskalpa@gmail.com"],
      direct: "0471 2513002",
      mobiles: ["9446054291"],
      epabx: "3002",
      residence: [],
    },
    {
      name: "Shri. Muhammadali P",
      designation: "Additional Private Secretary to Speaker",
      emails: ["addlps2@niyamasabha.nic.in", "alipattambi@gmail.com"],
      direct: "0471 2513035",
      mobiles: ["9446087187"],
      epabx: "3035",
      residence: [],
    },
    {
      name: "Shri. M Kunjumon",
      designation: "Additional Private Secretary to Speaker",
      emails: ["addlps3@niyamasabha.nic.in"],
      direct: "0471 2512427",
      mobiles: ["9497758477", "7907077812"],
      epabx: "2427",
      residence: [],
    },
    {
      name: "Shri. M K Riju",
      designation: "Additional Private Secretary to Speaker",
      emails: ["addlps4@niyamasabha.nic.in", "mkriju@gmail.com"],
      direct: "0471 2513021",
      mobiles: ["9605054505"],
      epabx: "3021",
      residence: [],
    },
    {
      name: "Shri. Arjun S Kumar",
      designation: "Additional Private Secretary to Speaker",
      emails: ["addlps5@niyamasabha.nic.in"],
      direct: "",
      mobiles: ["9400086010"],
      epabx: "3013",
      residence: [],
    },
    {
      name: "Shri. E K Musthaqu",
      designation: "Press Secretary to Speaker",
      emails: ["press.secreatarytospeaker@gmail.com", "musthaqu@gmail.com"],
      direct: "0471 2512042",
      mobiles: ["9605366009", "9544969769"],
      epabx: "2042",
      residence: [],
    },
    {
      name: "Dr. K R Preetha Rani",
      designation: "Assistant Private Secretary to Speaker",
      emails: ["preetharani@niyamasabha.nic.in"],
      direct: "",
      mobiles: ["9446395258"],
      epabx: "3001",
      residence: [],
    },
    {
      name: "Smt. P Girijabai",
      designation: "Assistant Private Secretary to Speaker",
      emails: [],
      direct: "",
      mobiles: ["9745360537"],
      epabx: "2674",
      residence: [],
    },
    {
      name: "Shri. Preejith Raj",
      designation: "Assistant Private Secretary to Speaker",
      emails: [],
      direct: "",
      mobiles: ["9447041939"],
      epabx: "2037",
      residence: [],
    },
    {
      name: "Shri. Sathar K",
      designation: "Personal Assistant to Speaker",
      emails: [],
      direct: "",
      mobiles: ["9446308308"],
      epabx: "2494",
      residence: [],
    },
    {
      name: "Shri. G Rajkumar",
      designation: "Additional Personal Assistant to Speaker",
      emails: ["rajkumar@niyamasabha.nic.in"],
      direct: "",
      mobiles: ["9496268766"],
      epabx: "2594",
      residence: [],
    },
    {
      name: "Smt. Bindu Sarathchandra Kumar",
      designation: "Additional Personal Assistant to Speaker",
      emails: [],
      direct: "",
      mobiles: ["9746918136"],
      epabx: "",
      residence: [],
    },
    {
      name: "Shri. Rakhesh Raghavan",
      designation: "Additional Personal Assistant to Speaker",
      emails: [],
      direct: "",
      mobiles: ["8848953983"],
      epabx: "",
      residence: [],
    },
    {
      name: "Shri. Vivek Parat",
      designation: "Additional Personal Assistant to Speaker",
      emails: [],
      direct: "",
      mobiles: ["9995738683"],
      epabx: "2185",
      residence: [],
    },
    {
      name: "Shri. H A Hashim",
      designation: "Office Superintendent",
      emails: [],
      direct: "",
      mobiles: ["9400716818"],
      epabx: "2036",
      residence: [],
    },
  ];

  const basicDetails = {
    personal: {
      dob: "1977-05-24",
      birthPlace: "Thalassery",
      fatherName: "Shri Usman Komath",
      motherName: "Smt. A. N. Sareena",
      maritalStatus: "Married",
      marriageDate: "",
      spouseName: "DR. P. M. Sahala",
      hobbies: "Reading; Cricket",
      children: {
        sons: ["One son"],
        daughters: [],
      },
    },
    address: {
      present: "",
      permanent: "Ameenas, Paral P.O., Thalassery, Kannur - 670 671",
    },
    qualifications: {
      education: "M.A., LL.B, LL.M (pursuing)",
      profession: "",
      languages: "Malayalam, English, Hindi",
    },
    positions: [
      {
        title: "College Union General Secretary",
        organization: "Govt. Brennen College Thalassery",
        period: "1995",
      },
      {
        title: "First Chairman",
        organization: "Kannur University Union",
        period: "1998",
      },
      {
        title: "President",
        organization: "S.F.I. Kannur District Committee",
        period: "2003",
      },
      {
        title: "State Secretary and All India Joint Secretary",
        organization: "S.F.I.",
        period: "2008",
      },
      {
        title: "District President",
        organization: "D.Y.F.I. Kannur District",
        period: "2012",
      },
      {
        title: "Member",
        organization: "Kannur District Committee C.P.I. (M)",
        period: "since 2012",
      },
      {
        title: "President",
        organization: "Thalasserry Co-operative Hospital",
        period: "since 2014",
      },
      {
        title: "State President",
        organization: "D.Y.F.I.",
        period: "",
      },
      {
        title: "Working Chairman",
        organization: "Ashraya Pain and Palliative Unit, Malabar Cancer Centre",
        period: "",
      },
    ],
  };

  const RenderBasicDetails = () => {
    return (
      <div className="grids">
        <h4 className="tabDet title mb20">Basic Details</h4>

        <div className="row">
          <div className="col-lg-6">
            <div className="border-0 basicD">
              <>
                <h6 className="title mb30">Personal Assistant</h6>
                <div className="row">
                  <div className="col-md-6 mb30">
                    <div className="singleD">
                      <img src="/images/user.svg" alt="" />
                      <div className="ryt">
                        <h6>Name</h6>
                        <h5>A N Shamseer</h5>
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
                        <h5>anshamseer@niyamasabha.nic.in</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              <h6 className="title mb30">Personal Details</h6>
              <div className="row">
                <div className="col-md-6 mb30">
                  <div className="singleD">
                    <img src="/images/birthicon.svg" alt="" />
                    <div className="ryt">
                      <h6>Date of Birth</h6>
                      <h5>{basicDetails.personal.dob}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb30">
                  <div className="singleD">
                    <img src="/images/location.svg" alt="" />
                    <div className="ryt">
                      <h6>Place of Birth</h6>
                      <h5>{basicDetails.personal.birthPlace}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb30">
                  <div className="singleD">
                    <img src="/images/user.svg" alt="" />
                    <div className="ryt">
                      <h6>Father's Name</h6>
                      <h5>{basicDetails.personal.fatherName}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb30">
                  <div className="singleD">
                    <img src="/images/user.svg" alt="" />
                    <div className="ryt">
                      <h6>Mother's Name</h6>
                      <h5>{basicDetails.personal.motherName}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb30">
                  <div className="singleD">
                    <img src="/images/ring.svg" alt="" />
                    <div className="ryt">
                      <h6>Marital Status</h6>
                      <h5>{basicDetails.personal.maritalStatus}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb30">
                  <div className="singleD">
                    <img src="/images/user.svg" alt="" />
                    <div className="ryt">
                      <h6>Date of Marriage</h6>
                      <h5>{basicDetails.personal.marriageDate}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb30">
                  <div className="singleD">
                    <img src="/images/favorite.svg" alt="" />
                    <div className="ryt">
                      <h6>Spouse's Name</h6>
                      <h5>{basicDetails.personal.spouseName}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb30">
                  <div className="singleD">
                    <img src="/images/hobbies.svg" alt="" />
                    <div className="ryt">
                      <h6>Hobbies</h6>
                      <h5>{basicDetails.personal.hobbies}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-12 mb30">
                  <div className="singleD">
                    <img src="/images/twins.svg" alt="" />
                    <div className="col-12 ryt">
                      <h6>Children</h6>
                      <div className="row">
                        <div className="col-6">
                          <p className="mb5">Sons:</p>
                          {basicDetails.personal.children.sons.map(
                            (son, index) => (
                              <p key={index}>
                                <span>{son}</span>
                              </p>
                            )
                          )}
                        </div>
                        <div className="col-6">
                          <p className="mb5 mt5">Daughters:</p>
                          {basicDetails.personal.children.daughters.map(
                            (daughter, index) => (
                              <p key={index}>
                                <span>{daughter}</span>
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h6 className="title mb30">Address</h6>
              <div className="row">
                <div className="col-md-12 mb30">
                  <div className="singleD">
                    <img src="/images/home.svg" alt="" />
                    <div className="ryt">
                      <h6>Present</h6>
                      <h5>{basicDetails.address.present}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb30">
                  <div className="singleD">
                    <img src="/images/home.svg" alt="" />
                    <div className="ryt">
                      <h6>Permanent</h6>
                      <h5>{basicDetails.address.permanent}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <h6 className="title mb30">Qualifications</h6>
              <div className="row">
                <div className="col-md-6 mb30">
                  <div className="singleD">
                    <img src="/images/study.svg" alt="" />
                    <div className="ryt">
                      <h6>Education</h6>
                      <h5>{basicDetails.qualifications.education}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb30">
                  <div className="singleD">
                    <img src="/images/suitcase.svg" alt="" />
                    <div className="ryt">
                      <h6>Profession</h6>
                      <h5>{basicDetails.qualifications.profession}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb30">
                  <div className="singleD">
                    <img src="/images/language.svg" alt="" />
                    <div className="ryt">
                      <h6>Languages Known</h6>
                      <h5>{basicDetails.qualifications.languages}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 basicD pl20">
            <h6 className="title mb30">Positions Held</h6>
            <div className="timeline d-none">
              <ul>
                {basicDetails.positions.map((position, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="content">
                      <h6>{position.title}</h6>
                      <p>{position.organization}</p>
                    </div>
                    <div className="time">
                      <h4>{position.period}</h4>
                    </div>
                  </motion.li>
                ))}
                <div style={{ clear: "both" }}></div>
              </ul>
            </div>

            <div className="positionH d-non">
              <div className="position-relative">
                <div className="educational-quality">
                  <div className="m-circle text-thm">★</div>
                  <div className="wrapper mb40 position-relative">
                    <span className="tag">1985–1990</span>
                    <h6 className="mt15 mb5">Member</h6>
                    <p> Eravipuram Grama Panchayat</p>
                  </div>
                  <div className="m-circle  text-thm">★</div>
                  <div className="wrapper mb40 position-relative">
                    <span className="tag">1985–1990</span>
                    <h6 className="mt15  mb5">Vice President</h6>
                    <p> Eravipuram Grama Panchayat</p>
                  </div>
                  <div className="m-circle  text-thm">★</div>
                  <div className="wrapper mb40 position-relative">
                    <span className="tag">1985–1990</span>
                    <h6 className="mt15 mb5">Member</h6>
                    <p> Member of Tax & Appeal Standing Committee</p>
                  </div>
                </div>
              </div>
            </div>
            <h6 className="title mb30 pt40">Other Positions Held</h6>
            <div className="row">
              <div className="singleD">
                <div className="ryt">
                  <p className="otherpo">
                    Was College Union General Secretary, Govt. Brennen College
                    Thalassery (1995); First Chairman, Kannur University Union
                    (1998); President, S.F.I. Kannur District Committee (2003);
                    State Secretary (2008) and All India Joint Secretary of
                    S.F.I.; D.Y.F.I. Kannur District President (2012). Member,
                    Kannur District Committee C.P.I. (M) (since 2012);
                    President, Thalasserry Co-operative Hospital (since 2014);
                    State President, D.Y.F.I.; Working Chairman, Ashraya Pain
                    and Palliative Unit, Malabar Cancer Centre.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Press Releases (Speaker) – placeholder sample structure; feed real data when available
  const speakerPressReleases = [
    {
      id: 1,
      kla: "15th KLA",
      date: "2024-12-18",
      title: "Press note title",
      url: "/pdf1.pdf",
      documentUrl: "/images/document.svg",
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
            { name: "Parlamentory Functionaries", href: "/parlamentory" },
            { name: "Speaker", href: "/speaker" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb30 pb30-md represent">
          <div className="container">
            <SectionTitle title="Speaker" />

            <section className="breadcumb-section container">
              {/* <div className="cta-job-v1 freelancer-single-style mx-auto maxw1700 bdrs16 position-relative overflow-hidden d-flex align-items-center">
                <img
                  className="left-top-img wow zoomIn"
                  src="/images/Frame3.png"
                  alt="img"
                />
                <img
                  className="right-bottom-img wow zoomIn"
                  src="/images/Frame8.png"
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
                                src="/images/speaker.jpg"
                                width={150}
                                alt=""
                              />
                            </motion.a>
                            <motion.div
                              className="container"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.2,
                              }}
                            >
                              <div className="row">
                                <div className="memb-prof col-lg-6 mb-3 mb-lg-0">
                                  <div className="ml20 ml0-xs mt15-sm">
                                    <h3 className="title">A N Shamseer</h3>
                                    <h6 className="mb-2 text-th">
                                      The Hon'ble Speaker of Kerala
                                    </h6>
                                    <h6 className="list-inline-item mb-0 text-thm">
                                      Communist Party of India
                                    </h6>
                                  </div>
                                </div>
                                <div className="memb-prof col-lg-6">
                                  <div className="ml20 ml0-xs mt15-sm">
                                    <div className="mb-2 d-flex align-items-center contac">
                                      <small className="mb-2">Consituency</small>
                                      <h6 className=" text-th">: Thalassery</h6>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center contac">
                                      <small className="mb-2">Elected Date</small>
                                      <h6 className=" text-th">: 2021-05-02</h6>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center contac">
                                      <small className="mb-2">Email Address</small>
                                      <h6 className="text-th">
                                        : anshamseer@niyamasabha.nic.in
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
              </div> */}
            </section>

            <Tabs
              tabs={[
                {
                  key: "Profile",
                  label: "Profile",
                  content: (
                    <div className="pt30">
                      {/* <RenderBasicDetails /> */}
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
                                        src="/images/speaker.jpg"
                                        width={150}
                                        alt=""
                                      />
                                    </motion.a>
                                    <motion.div
                                      className="container"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        duration: 0.5,
                                        delay: 0.2,
                                      }}
                                    >
                                      <div className="row">
                                        <div className="col-lg-6 mb-3 mb-lg-0">
                                          <div className="speaker-prof ml20 ml0-xs mt15-sm">
                                            <h3 className="title">
                                              A N Shamseer
                                            </h3>
                                            <h6 className="mb-2 text-th">
                                              Speaker of Kerala (Incharge)
                                            </h6>
                                            <h6 className="list-inline-item mb-0 text-thm">
                                              Communist Party of India
                                            </h6>
                                            <Link
                                              className="viw mt10"
                                              to="/member-profile/6"
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
                                                : Thalassery
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
                                                : anshamseer@niyamasabha.nic.in
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
                    </div>
                  ),
                },
                // {
                //   key: "Role of Speaker",
                //   label: "Role of Speaker",
                //   content: (
                //     <div className="pt30">
                //       <p>
                //         The Speaker is the conventional and ceremonial head of
                //         the Legislative Assembly. His authority is supreme in
                //         the House due to his absolute and varying impartiality.
                //         His duties are very arduous, and in their discharge he
                //         must be actuated by a sense of justice and fairness,
                //         uninfluenced by passion or prejudice. He has to impress
                //         the House generally with confidence in the soundness and
                //         impartiality of his judgments, with the conviction that
                //         he considers himself the conscience and guardian of the
                //         House. As the representative of the House to the outside
                //         world, the Speaker communicates the decisions of the
                //         House to the authorities concerned, requiring them to
                //         comply with the terms of such decisions. Similarly, he
                //         communicates to the House letters and documents
                //         addressed to him, as Speaker, such as those relating to
                //         the rights and privileges of the House and Members. He
                //         also issues warrants to execute the orders of the House,
                //         where necessary. The speaker regulates the debates and
                //         proceedings of the House. He is charged with the
                //         maintenance of order in the House and enforces the
                //         observance of Rules by the Members. He determines when a
                //         Member should be called upon to speak and how long he be
                //         allowed to speak. He can also impose time-limit on
                //         speeches, whenever necessary. He proposes questions for
                //         the consideration of the House and puts them for its
                //         decision. He rules on points of order raised by Members
                //         and his decision is final. The Speaker determines
                //         whether there is a prima facie case for a matter
                //         relating to a breach of privilege or contempt of the
                //         House. Without his consent, no question involving breach
                //         of privilege either of a Member or of the House or a
                //         Committee thereof can be raised in the House. It is the
                //         right of the Speaker to interpret the Constitution and
                //         Rules, so far as matters in or relating to the House are
                //         concerned. Maintenance of the order in the House is a
                //         fundamental duty of the Speaker. He derives his
                //         disciplinary powers from the Rules and his decisions in
                //         matters of discipline are not to be challenged except on
                //         a substantive motion. All matters are not specifically
                //         provided for in the Rules and all questions relating to
                //         the detailed working of the Rules are regulated in such
                //         manner as the Speaker, from time to time, directs. The
                //         Speaker is the head of the Secretariat which functions
                //         under his ultimate control and direction. The Speaker's
                //         authority over the secretarial staff of the House, its
                //         precincts and its security arrangements is supreme. The
                //         Speaker is responsible for the protection of the rights
                //         of the Members, and for ensuring that all reasonable
                //         amenities are provided for them.
                //       </p>
                //     </div>
                //   ),
                // },
                // {
                //   key: "Email to Speaker",
                //   label: "Email to Speaker",
                //   content: <div></div>,
                // },
                {
                  key: "Press Releases",
                  label: "Press Releases",
                  content: (
                    <div className="pt30">
                        <h4 className="tabDet title mb20">
                        Press Release
                      </h4>
                      
                      <div className="terms_condition_grid text-start">
                        {/* <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb20">
                          <Filter filterKeys={["KLA", "DATE"]} />
                          <ExportButton />
                        </div> */}
                        <Filter filterKeys={["KLA", "DATE"]} />
                        <ExportButton />
                        <InlinePdfViewer
                          fileUrl={speakerPressReleases[0]?.url}
                          height="80vh"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Speeches",
                  label: "Speeches",
                  content: (
                    <div className="pt30">
                   <h4 className="tabDet title mb20">
                       Speeches
                      </h4>
                      <div className="terms_condition_grid text-start">
                        <Filter filterKeys={["KLA", "YEAR"]} />
                        <ExportButton />

                        <div className="session-list-buss row mt-4">
                          {/* Calendar (left) */}
                          <div className="col-lg-6 col-md-6">
                            <SessionCalendar
                              selectedDate={selectedSpeechDate}
                              onDateChange={handleSpeechDateChange}
                              startDate="01-01-2023"
                              endDate="31-12-2024"
                              meetingDates={meetingSpeechDates}
                              allowedDates={allowedSpeechDates}
                              height="400px"
                              width="100%"
                            />
                          </div>

                          {/* PDF Viewer (right) */}
                          <div className="col-lg-6 col-md-6">
                            <h3></h3>
                            <InlinePdfViewer
                              fileUrl={getSpeechPdfUrlForDate(
                                selectedSpeechDate
                              )}
                              height="400px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Rulings From Chair",
                  label: "Rulings From Chair",
                  content: (
                    <div>
                       <h4 className="tabDet title mt20 mb20">
                        Rulings From Chair
                      </h4>
                      <table className="table table myTable2">
                        <thead>
                          <tr>
                            <th scope="col">Sl.No</th>
                            <th scope="col">KLA</th>
                            <th scope="col">Session</th>
                            <th scope="col">Date</th>
                            <th scope="col">Title</th>
                            <th scope="col">View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bacData.map((item, index) => (
                            <tr className="debate" key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.kla}</td>
                              <td>{item.session}</td>
                              <td>{item.date}</td>
                              <td className="session-bac-rep">{item.title}</td>
                              <td>
                                <a
                                  className="viw"
                                  href={item.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  View
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ),
                },
               
                {
                  key: "Office",
                  label: "Office",
                  content: (
                    <div className="pt30">
                       <h4 className="tabDet title mb20">
                       Office of The Speaker
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
                                Email
                              </th>
                              <th
                                scope="col"
                                rowSpan={2}
                                style={{ verticalAlign: "middle" }}
                              >
                                Mobile
                              </th>
                            </tr>
                            <tr>
                              <th scope="col">Direct</th>
                              <th scope="col">EPABX</th>
                              <th scope="col">Residence</th>
                            </tr>
                          </thead>
                          <tbody>
                            {officeStaff.map((p, idx) => (
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
                                <td>
                                  {p.residence && p.residence.length
                                    ? p.residence.join(", ")
                                    : "-"}
                                </td>
                                <td>
                                  {p.emails && p.emails.length
                                    ? p.emails.join(", ")
                                    : "-"}
                                </td>
                                <td>
                                  {p.mobiles && p.mobiles.length
                                    ? p.mobiles.join(", ")
                                    : "-"}
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
                  key: "Speakers Since 1957",
                  label: "Speakers Since 1957",
                  content: (
                    <div className="pt30">
                      <h4 className="tabDet title mb20">
                        Speakers since 1957
                      </h4>
                      <div className="row">
                        {formerSpeakers.map((spk, idx) => (
                          <div
                            className="col-6 col-md-4 col-lg-2 mb30"
                            key={idx}
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
                                  src={spk.img}
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
                                  {spk.tenure}
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

export default Speaker;
