import React, { useState, useEffect } from "react";
import "./Secretariat.css";
import {
  BreadcrumbNav,
  CategoriesNav,
  SectionTitle,
  Tabs,
} from "../components/common";
import HomeTest from "../components/Header";
import InlinePdfViewer from "../components/common/InlinePdfViwer";
import { FaChevronDown } from "react-icons/fa"; // ✅ add this icon
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";

const SabhaTv = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const segments = [
  //   {
  //     title: "Sabhayum Samoohavum",
  //     description:
  //       "This segment mainly focuses on the Business of the House and its effects on society. It aims at providing knowledge on the proceedings of the Kerala Legislative Assembly to the public.",
  //   },
  //   {
  //     title: "Kerala Dialogue",
  //     description:
  //       "This segment describes the various Bills passed by the House and their implications on society, as well as the working of the Kerala Legislative Assembly and its committees.",
  //   },
  //   {
  //     title: "Central Hall",
  //     description:
  //       "In this segment, interviews with eminent personalities from various fields are conducted. Subjects like Democracy, Secularism, Sustainable development of the State, and other socio-economic issues are discussed.",
  //   },
  //   {
  //     title: "Nattuvazhy",
  //     description:
  //       "It is a programme that describes the peculiarities of each of the 140 Legislative Constituencies of the State. The developmental prospects of each constituency are analysed.",
  //   },
  // ];
  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {
      buttons: ["slideShow", "thumbs", "zoom", "fullScreen", "share", "close"],
      loop: false,
      protect: true,
    });
    return () => Fancybox.destroy();
  }, []);

  // const images = [
  //   "https://cdn.pixabay.com/photo/2023/05/22/10/49/houses-8010401_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2023/07/13/05/36/mountains-8123933_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2022/12/12/21/35/stream-7651969_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2022/10/24/20/22/muhlviertel-7544316_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2019/09/13/11/47/mountains-4473760_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2019/05/29/20/01/sunset-4238445_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2022/11/13/18/09/canyon-7589820_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2022/11/02/22/33/autumn-7566201_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2022/12/09/22/55/trees-7646226_1280.jpg",
  // ];

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
            { name: "Secretariat", href: "/secretariat" },
            { name: "Sabha TV", href: "/secretariat/Sabha TV" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Sabha TV" />

            <Tabs
              tabs={[
                {
                  key: "Profile",
                  label: "Profile",
                  content: (
                    <div className="sabha-profile">
                      <h3 className="sabha-title">Profile</h3>

                      {/* <p>
                        The <strong>‘Sabha TV’</strong>, the premier of its kind
                        in any of the State Legislative Assemblies of India, is
                        an intrinsic channel aimed at broadcasting live
                        proceedings of the Kerala Legislative Assembly. Sabha TV
                        aims to provide general information programs along with
                        in-depth analysis of Kerala Legislative Assembly affairs
                        for discerning viewers.
                      </p>

                      <p>
                        The channel offers a diverse range of content, including
                        news-based programs, features, discussions, and the
                        promotion of ideas related to the State of Kerala. It
                        seeks to uphold and highlight the spirit of the Kerala
                        renaissance while maintaining a connection to global
                        enlightenment principles.
                      </p>

                      <p>
                        One of the key functions of Sabha TV is the storage and
                        archiving of footage of Assembly proceedings and
                        significant subjects. This collection of content serves
                        as a pathway and milestone for future generations,
                        allowing them to observe and learn from the democratic
                        progression of the State.
                      </p>

                      <p>
                        Sabha TV was officially launched in 2020. In 2021, Sabha
                        TV and the Centre for Parliamentary Studies and Training
                        were brought together under the title{" "}
                        <strong>K-LAMPS</strong>, which stands for{" "}
                        <strong>
                          Kerala Legislative Assembly Media and Parliamentary
                          Studies
                        </strong>
                        . This collaboration further enhances the role of Sabha
                        TV in promoting parliamentary studies and providing
                        valuable insights into legislative processes.
                      </p>

                      <p>
                        To ensure accessibility, Sabha TV has established a
                        presence on various social media platforms such as{" "}
                        <strong>YouTube</strong>, <strong>Facebook</strong>,{" "}
                        <strong>Instagram</strong>, <strong>Twitter</strong>,
                        and <strong>LinkedIn</strong>. This enables viewers to
                        engage with the channel’s content and stay updated on
                        the latest developments. Additionally, Sabha TV has
                        expanded to an <strong>OTT platform</strong> that
                        enables both live telecasting as well as on-demand
                        viewing.
                      </p>

                      <div className="sabha-details">
                        <div>
                          <strong>Launched:</strong> August 17, 2020
                        </div>
                        <div>
                          <strong>Country:</strong> India
                        </div>
                        <div>
                          <strong>Language:</strong> Malayalam, English
                        </div>
                        <div>
                          <strong>Location:</strong> Kerala Legislative
                          Assembly, Trivandrum
                        </div>
                      </div> */}

                      {/* PDF Viewer Section */}
                      <div className="mt-5">
                        {/* <h4 className="mb-3">Sabha TV Document</h4> */}
                        <InlinePdfViewer
                          fileUrl="/SABHA-TV.pdf"
                          height="800px"
                        />
                      </div>
                    </div>
                  ),
                },
                // {
                //   key: "Aims and objectives",
                //   label: "Aims and objectives",
                //   content: (
                //     <div>
                //       <h3 className="section-aim-title mb-4">
                //         Aims and Objectives
                //       </h3>

                //       <ul className="objectives-list">
                //         <li>
                //           To bring about public awareness on Indian Democracy
                //           with specialized signification on upholding the
                //           Constitutional values and ethos incorporated with
                //           impressive interventions.
                //         </li>
                //         <li>
                //           To focus on ideas that can reckon notions to Kerala as
                //           a modern society and intensify its progressional
                //           actions through distinct channel broadcasting.
                //         </li>
                //         <li>
                //           To propagate interest in Indian democratic practices
                //           with active public participation in law making through
                //           various effective contemporary related programmes
                //           through the channel media in a widespread viewers
                //           background in and around the State.
                //         </li>
                //         <li>
                //           To apprise the people of Kerala with the functioning
                //           of the Kerala Legislative Assembly enabling live
                //           information featuring diversified interactive,
                //           informative and massive programmes of general interest
                //           and on controversies pertaining to democracy, society,
                //           economy and people.
                //         </li>
                //         <li>
                //           To create awareness among public to legislative and
                //           budgetary processes, Legislature - Executive
                //           relationship and the functioning of parliamentary
                //           democracy through live programmes.
                //         </li>
                //       </ul>

                //       <h3 className="section-aim-title mt-5">
                //         Organisational Chart
                //       </h3>
                //       <p className="sabhaTv-orgChart">
                //         The organisational chart of the project shall consist of
                //         the following bodies, namely:
                //       </p>
                //       <ul className="org-list">
                //         <li>High Level Committee</li>
                //         <li>Content Development Committee</li>
                //         <li>Scrutiny / Monitoring Committee</li>
                //         <li>Editorial Board</li>
                //       </ul>

                //       {/* High Level Committee */}
                //       <div className="committee-section mt-5">
                //         <h3 className="committee-title">
                //           High Level Committee
                //         </h3>
                //         <p>
                //           The High Level Committee comprises of Members of
                //           Legislative Assembly nominated by the Hon'ble Speaker
                //           from time to time considering the recommendations of
                //           Political Parties having representation in the
                //           Legislative Assembly. It shall monitor and co-ordinate
                //           activities of the SABHA TV. The members are listed
                //           below.
                //         </p>

                //         <table className="table table-bordered committee-table">
                //           <thead>
                //             <tr>
                //               <th>Sl. No.</th>
                //               <th>Name</th>
                //               <th>Designation</th>
                //             </tr>
                //           </thead>
                //           <tbody>
                //             {[
                //               ["1", "Hon'ble Speaker", "Chairman"],
                //               ["2", "Hon'ble Deputy Speaker", "Member"],
                //               ["3", "Sri. K. Rajan, Chief Whip", "Member"],
                //               [
                //                 "4",
                //                 "Prof. Abid Hussain Thangal, MLA",
                //                 "Member",
                //               ],
                //               ["5", "Sri. A.P. Anil Kumar, MLA", "Member"],
                //               ["6", "Sri. Chittayam Gopakumar, MLA", "Member"],
                //               ["7", "Sri. John Fernandez, MLA", "Member"],
                //               ["8", "Sri. Kovoor Kunjumon, MLA", "Member"],
                //               ["9", "Sri. Mons Joseph, MLA", "Member"],
                //               ["10", "Sri. M. Mukesh, MLA", "Member"],
                //               ["11", "Sri. Purushan Kadalundy, MLA", "Member"],
                //               ["12", "Sri. Raju Abraham, MLA", "Member"],
                //               ["13", "Sri. N. Samsudheen, MLA", "Member"],
                //               ["14", "Mrs. Veena George, MLA", "Member"],
                //               ["15", "Sri. M. Vincent, MLA", "Member"],
                //             ].map(([no, name, role]) => (
                //               <tr key={no}>
                //                 <td>{no}</td>
                //                 <td>{name}</td>
                //                 <td>{role}</td>
                //               </tr>
                //             ))}
                //           </tbody>
                //         </table>
                //       </div>

                //       {/* Content Development Committee */}
                //       <div className="committee-section mt-5">
                //         <h3 className="committee-title">
                //           Content Development Committee
                //         </h3>
                //         <p>
                //           The Content Development Committee is constituted for
                //           making concrete ideas for the programmes of SABHA TV.
                //           The areas and segments for the programmes are decided
                //           by this committee. The members are listed below.
                //         </p>
                //         <table className="table table-bordered committee-table">
                //           <thead>
                //             <tr>
                //               <th>Sl. No.</th>
                //               <th>Name</th>
                //               <th>Designation</th>
                //             </tr>
                //           </thead>
                //           <tbody>
                //             {[
                //               ["1", "Smt. Veena George, MLA", "Chairperson"],
                //               ["2", "Sri. Mathew T. Thomas, MLA", "Member"],
                //               ["3", "Sri. Mons Joseph, MLA", "Member"],
                //               ["4", "Sri. Muhammed Muhassin P, MLA", "Member"],
                //               ["5", "Sri. K.S. Sabarinadhan, MLA", "Member"],
                //               ["6", "Sri. M. C. Kamarudeen, MLA", "Member"],
                //               ["7", "Sri. James Mathew, MLA", "Member"],
                //               [
                //                 "8",
                //                 "Secretary, Kerala Legislature Secretariat",
                //                 "Member",
                //               ],
                //               [
                //                 "9",
                //                 "Sri. Venkiteswaran Ramakrishnan, Media Consultant, Sabha TV",
                //                 "Member",
                //               ],
                //               [
                //                 "10",
                //                 "Sri. Sunnykutty Abraham, Media Representative",
                //                 "Member",
                //               ],
                //               [
                //                 "11",
                //                 "Sri. M. Sivasankaran IAS, Principal Secretary",
                //                 "Member",
                //               ],
                //               [
                //                 "12",
                //                 "Dr. S. Chithra IAS, Director, IT Mission",
                //                 "Member",
                //               ],
                //               [
                //                 "13",
                //                 "Sri. K. Mohanakumar, Special Secretary to Hon'ble Leader of Opposition",
                //                 "Member",
                //               ],
                //               [
                //                 "14",
                //                 "Sri. E.K. Mushtaqu, Press Secretary to Hon'ble Speaker",
                //                 "Member",
                //               ],
                //               [
                //                 "15",
                //                 "Sri. V. Jain, Addl. Private Secretary to Hon'ble Minister",
                //                 "Member",
                //               ],
                //               [
                //                 "16",
                //                 "Sri. R. Kishore Kumar, Addl. Secretary, Legislature Secretariat",
                //                 "Member",
                //               ],
                //               [
                //                 "17",
                //                 "Sri. Yasir P.V, Archival Research Policy Analyst",
                //                 "Member",
                //               ],
                //               [
                //                 "18",
                //                 "Smt. Jameela Beevi, Joint Editor",
                //                 "Member",
                //               ],
                //               [
                //                 "19",
                //                 "Smt. Indu M.R, Deputy Librarian",
                //                 "Member",
                //               ],
                //               [
                //                 "20",
                //                 "Smt. Priya Raveendran, Senior Director, Sabha TV",
                //                 "Ex-Officio Member",
                //               ],
                //               [
                //                 "21",
                //                 "Kum. Deepa V.M, Senior Director, Sabha TV",
                //                 "Ex-Officio Member",
                //               ],
                //               [
                //                 "22",
                //                 "Sri. Jacob George, Bitryt Solutions",
                //                 "Ex-Officio Member",
                //               ],
                //               [
                //                 "23",
                //                 "Sri. Anil Nair, Bitryt Solutions",
                //                 "Ex-Officio Member",
                //               ],
                //             ].map(([no, name, role]) => (
                //               <tr key={no}>
                //                 <td>{no}</td>
                //                 <td>{name}</td>
                //                 <td>{role}</td>
                //               </tr>
                //             ))}
                //           </tbody>
                //         </table>
                //       </div>

                //       {/* Scrutiny Committee */}
                //       <div className="committee-section mt-5">
                //         <h3 className="committee-title">
                //           Scrutiny / Monitoring Committee
                //         </h3>
                //         <p>
                //           The Scrutiny / Monitoring Committee examines and
                //           approves content, project costs, and transmission
                //           recommendations. The members are listed below.
                //         </p>
                //         <table className="table table-bordered committee-table">
                //           <thead>
                //             <tr>
                //               <th>Sl. No.</th>
                //               <th>Name</th>
                //               <th>Designation</th>
                //             </tr>
                //           </thead>
                //           <tbody>
                //             {[
                //               [
                //                 "1",
                //                 "Dr. N.K Jayakumar, Former Secretary, Kerala Legislature",
                //                 "Chairman",
                //               ],
                //               [
                //                 "2",
                //                 "Sri. S.V. Unnikrishnan Nair, Secretary, Kerala Legislature",
                //                 "Convenor",
                //               ],
                //               [
                //                 "3",
                //                 "Sri. Santhosh V, Private Secretary to Hon'ble Deputy Speaker",
                //                 "Member",
                //               ],
                //               [
                //                 "4",
                //                 "Sri. K. Mohanakumar, Special Private Secretary to Hon'ble Leader of Opposition",
                //                 "Member",
                //               ],
                //               [
                //                 "5",
                //                 "Sri. V. Jain, Addl. Private Secretary to Hon'ble Minister",
                //                 "Member",
                //               ],
                //               [
                //                 "6",
                //                 "Sri. E.K. Mushtaqu, Press Secretary to Hon'ble Speaker",
                //                 "Member",
                //               ],
                //               [
                //                 "7",
                //                 "Smt. Beena Paul, Vice Chairperson, Kerala Chalachithra Academy",
                //                 "Member",
                //               ],
                //               [
                //                 "8",
                //                 "Sri. Venkiteswaran Ramakrishnan, Media Consultant, Sabha TV",
                //                 "Member",
                //               ],
                //               [
                //                 "9",
                //                 "Sri. V. Salil, Deputy Director, Information & PR Department",
                //                 "Member",
                //               ],
                //               [
                //                 "10",
                //                 "Sri. K. Mohan Kumar, Former Deputy Director, C-DIT",
                //                 "Member",
                //               ],
                //               [
                //                 "11",
                //                 "Sri. G.S. Suresh Kumar, Deputy Secretary, Legislature Secretariat",
                //                 "Member",
                //               ],
                //               [
                //                 "12",
                //                 "Sri. A. Ismail Sait, P.A to Sri. C. Mammutty, MLA",
                //                 "Member",
                //               ],
                //               [
                //                 "13",
                //                 "Sri. Anil Nair, Representative of Bitryt Solutions",
                //                 "Member",
                //               ],
                //             ].map(([no, name, role]) => (
                //               <tr key={no}>
                //                 <td>{no}</td>
                //                 <td>{name}</td>
                //                 <td>{role}</td>
                //               </tr>
                //             ))}
                //           </tbody>
                //         </table>
                //       </div>

                //       {/* Editorial Board */}
                //       <div className="committee-section mt-5 mb-4">
                //         <h3 className="committee-title">Editorial Board</h3>
                //         <ul className="editorial-list">
                //           <li>
                //             Dr. N.K Jayakumar, Former Secretary, Kerala
                //             Legislature
                //           </li>
                //           <li>
                //             Sri. K. Mohanakumar, Special Private Secretary to
                //             Hon'ble Leader of Opposition
                //           </li>
                //           <li>
                //             Sri. Venkiteswaran Ramakrishnan, Media Consultant,
                //             Sabha TV
                //           </li>
                //           <li>
                //             Sri. G.S. Sureshkumar, Deputy Secretary, Legislature
                //             Secretariat
                //           </li>
                //           <li>
                //             Smt. Priya Raveendran, Senior Director/Nodal
                //             Officer, Sabha TV
                //           </li>
                //           <li>
                //             Kum. Deepa V.M., Senior Director/Consultant, Sabha
                //             TV
                //           </li>
                //           <li>
                //             Sri. Sreejith D. Pillai, Senior Director/Consultant,
                //             Sabha TV
                //           </li>
                //         </ul>
                //       </div>
                //     </div>
                //   ),
                // },
                // {
                //   key: "Programmes",
                //   label: "Programmes",
                //   content: (
                //     <div>
                //       <div className="sabha-tv-programmes container my-5">
                //         <h3 className="section-prgm-title mb-4">
                //           Main Programmes — Four Segments
                //         </h3>

                //         <div className="row g-4">
                //           {segments.map((segment, index) => (
                //             <div className="col-md-6 col-lg-6" key={index}>
                //               <div className="sabha-programme-card p-4 h-100">
                //                 <h4 className="sabha-programme-title mb-2">
                //                   {segment.title}
                //                 </h4>
                //                 <p className="sabha-programme-description mb-0">
                //                   {segment.description}
                //                 </p>
                //               </div>
                //             </div>
                //           ))}
                //         </div>
                //       </div>
                //     </div>
                //   ),
                // },
                // {
                //   key: "OTT",
                //   label: "OTT",
                //   content: (
                //     <div>
                //       <div className="sabha-tv-ott container my-4">
                //         <h3 className="ott-title mb-3">OTT (Over The Top)</h3>
                //         <div className="ott-content">
                //           <p className="ott-description">
                //             The future is with the OTT platform. Sabha TV
                //             delivers live streaming of the Assembly proceedings
                //             and Content on Demand through the
                //             <strong> “Sabha TV” app</strong>. Sabha TV is
                //             available on both
                //             <strong> Google Play Store</strong> and{" "}
                //             <strong>iOS App Store</strong>.
                //           </p>

                //           <div className="ott-links">
                //             <a
                //               href="#"
                //               target="_blank"
                //               rel="noopener noreferrer"
                //               className="ott-btn google-play"
                //             >
                //               <img
                //                 src="/images/play.svg"
                //                 alt="Google Play"
                //                 className="store-icon"
                //               />
                //               Google Play
                //             </a>
                //             <a
                //               href="#"
                //               target="_blank"
                //               rel="noopener noreferrer"
                //               className="ott-btn app-store"
                //             >
                //               <img
                //                 src="/images/app-store.svg"
                //                 alt="App Store"
                //                 className="store-icon"
                //               />
                //               App Store
                //             </a>
                //           </div>
                //         </div>
                //       </div>
                //     </div>
                //   ),
                // },
                // {
                //   key: "Social Media",
                //   label: "Social Media",
                //   content: (
                //     <div>
                //       <div className="sabha-social container my-4">
                //         <h3 className="social-media-title mb-4">
                //           Social Media
                //         </h3>
                //         <p className="social-description">
                //           The Sabha TV extends its horizon into the Social
                //           Media.
                //         </p>

                //         <div className="social-links">
                //           <a
                //             href="#"
                //             target="_blank"
                //             rel="noopener noreferrer"
                //             className="social-btn facebook"
                //           >
                //             <img
                //               src="/images/facebook.svg"
                //               alt="Facebook"
                //               className="social-med-icon"
                //             />
                //             Facebook
                //           </a>

                //           <a
                //             href="#"
                //             target="_blank"
                //             rel="noopener noreferrer"
                //             className="social-btn instagram"
                //           >
                //             <img
                //               src="/images/instagram.svg"
                //               alt="Instagram"
                //               className="social-med-icon"
                //             />
                //             Instagram
                //           </a>

                //           <a
                //             href="#"
                //             target="_blank"
                //             rel="noopener noreferrer"
                //             className="social-btn youtube"
                //           >
                //             <img
                //               src="/images/youtube.svg"
                //               alt="YouTube"
                //               className="social-med-icon"
                //             />
                //             YouTube
                //           </a>

                //           <a
                //             href="#"
                //             target="_blank"
                //             rel="noopener noreferrer"
                //             className="social-btn twitter"
                //           >
                //             <img
                //               src="/images/twitter.svg"
                //               alt="Twitter"
                //               className="social-med-icon"
                //             />
                //             Twitter
                //           </a>
                //         </div>
                //       </div>
                //     </div>
                //   ),
                // },
                // {
                //   key: "Contacts",
                //   label: "Contacts",
                //   content: (
                //     <div>
                //       <div className="SabhaTV-contact container my-5">
                //         <h3 className="SabhaTV-contact-title mb-4">Contacts</h3>

                //         <div className="SabhaTV-contact-card">
                //           <h4 className="SabhaTV-reach-us">Reach us at</h4>

                //           <div className="SabhaTV-contact-item">
                //             <strong>E-mail :</strong>{" "}
                //             <a href="mailto:sabhatv@niyamasabha.nic.in">
                //               sabhatv@niyamasabha.nic.in
                //             </a>
                //             ,{" "}
                //             <a href="mailto:sabhatvkeralam@gmail.com">
                //               sabhatvkeralam@gmail.com
                //             </a>
                //           </div>

                //           <div className="SabhaTV-contact-item">
                //             <strong>Phone :</strong>{" "}
                //             <a href="tel:04712513006">0471 2513006</a>,{" "}
                //             <a href="tel:04712512010">0471 2512010</a>
                //           </div>
                //         </div>
                //       </div>
                //     </div>
                //   ),
                // },
                // {
                //   key: "Image Gallery",
                //   label: "Image Gallery(events)",
                //   content: (
                //     <main className="SabhaTV main">
                //       <div className="SabhaTV container">
                //         {images.map((src, i) => (
                //           <div key={i} className="SabhaTV card">
                //             <div className="SabhaTV card-image">
                //               <a
                //                 href={src}
                //                 data-fancybox="gallery"
                //                 data-caption={`Caption Image ${i + 1}`}
                //               >
                //                 <img src={src} alt={`Gallery ${i + 1}`} />
                //               </a>
                //             </div>
                //           </div>
                //         ))}
                //       </div>
                //     </main>
                //   ),
                // },
                // {
                //   key: "SabhaTV Programs",
                //   label: "Sabha T V Programs",
                //   content: <div></div>,
                // },
              ]}
              onChange={() => {}}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SabhaTv;
