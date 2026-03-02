import React, { useState, useEffect } from "react";
import "./Secretariat.css";
import {
  BreadcrumbNav,
  CategoriesNav,
  SectionTitle,
  Tabs,
  PdfViewerModal,
} from "../components/common";
import HomeTest from "../components/Header";
import { FaChevronDown } from "react-icons/fa";

const Library = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfTitle, setPdfTitle] = useState("Document");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dummyPdf = "/pdf1.pdf";

  const contacts = [
    { name: "Chief Librarian", phone: "2512522" },
    { name: "Librarian (General)", phone: "2512523" },
    { name: "Librarian (Members' Reference)", phone: "2512039" },
    { name: "Librarian (Reference)", phone: "2512284" },
    { name: "Librarian (K-LAMPS)", phone: "2512566" },
    { name: "Members' Reference Branch", phone: "2512593" },
    { name: "Reference Section", phone: "2512519" },
    { name: "Circulation Section", phone: "2512135" },
    { name: "MLA Hostel Extension Counter", phone: "2512259" },
    { name: "Technical Section", phone: "2512520" },
    { name: "Digitisation Section", phone: "2512630" },
    { name: "Documentation Section", phone: "2512521" },
    { name: "Maintenance Section", phone: "2512138" },
    { name: "Children’s Library", phone: "2512640" },
  ];

  // const books = [
  //   {
  //     title: "A Modern History of Jammu and Kashmir",
  //     author: "Paramananda",
  //     publisher:
  //       "Uttam Singh Jamwal for UBS Publishers’ Distributors Pvt. Ltd., New Delhi",
  //     year: "2019",
  //     description:
  //       "The book deals with the political, social and cultural developments in Jammu and Kashmir from ancient to modern times. It explores the Dogra rule, the freedom movement, and post-independence challenges.",
  //   },
  //   {
  //     title: "The Indian Parliament: A Critical Appraisal",
  //     author: "Dr. Subhash C. Kashyap",
  //     publisher: "National Book Trust, New Delhi",
  //     year: "2018",
  //     description:
  //       "A detailed study on the structure, functioning, and challenges of the Indian Parliament, offering insights into legislative reforms and democratic governance.",
  //   },
  //   {
  //     title: "A Modern History of Jammu and Kashmir",
  //     image:
  //       "https://www.niyamasabha.nic.in/sites/default/files/library/book_review/modern-history-of-jammu-kashmir.jpg",
  //   },
  //   {
  //     title: "Child Stories",
  //     image:
  //       "https://www.niyamasabha.nic.in/sites/default/files/library/book_review/child-stories.jpg",
  //   },
  //   {
  //     title: "Bama Muttathe Disayilekku",
  //     image:
  //       "https://www.niyamasabha.nic.in/sites/default/files/library/book_review/bama-muttathe.jpg",
  //   },
  //   {
  //     title: "The Book of Children",
  //     image:
  //       "https://www.niyamasabha.nic.in/sites/default/files/library/book_review/book-of-children.jpg",
  //   },
  //   {
  //     title: "Osho – Dhyanam Acharavum Jeevithavum",
  //     image:
  //       "https://www.niyamasabha.nic.in/sites/default/files/library/book_review/osho.jpg",
  //   },
  //   {
  //     title: "Che Guevara",
  //     image:
  //       "https://www.niyamasabha.nic.in/sites/default/files/library/book_review/che-guevara.jpg",
  //   },
  //   {
  //     title: "Prachara Pathayile Kadhakal",
  //     image:
  //       "https://www.niyamasabha.nic.in/sites/default/files/library/book_review/prachara-pathayile.jpg",
  //   },
  //   {
  //     title: "Quarterlife",
  //     image:
  //       "https://www.niyamasabha.nic.in/sites/default/files/library/book_review/quarterlife.jpg",
  //   },
  //   {
  //     title: "Another India",
  //     image:
  //       "https://www.niyamasabha.nic.in/sites/default/files/library/book_review/another-india.jpg",
  //   },
  //   {
  //     title: "Manushyanmaarum Marxismum",
  //     image:
  //       "https://www.niyamasabha.nic.in/sites/default/files/library/book_review/manushyanmaarum.jpg",
  //   },
  // ];

  const libraryCommittee = [
    {
      id: 1,
      name: "Shri. Thomas K Thomas (Chairman)",
      phone: "9539239729",
    },
    { id: 2, name: "Shri. D. K. Murali", phone: "9447428205" },
    { id: 3, name: "Shri. P. Balachandran", phone: "9847581634" },
    { id: 4, name: "Shri. K. J. Maxy", phone: "9447136374" },
    { id: 5, name: "Dr. M. K. Muneer", phone: "9947041000" },
    { id: 6, name: "Shri. Roji M. John", phone: "9971392134" },
    { id: 7, name: "Shri. Xavier Chittilappilly", phone: "9446228486" },
    {
      id: 8,
      name: (
        <>
          Secretary, Kerala Legislative Assembly
          <br />
          <em>(Ex-Officio member)</em>
        </>
      ),
      phone: "0471-2512002",
    },
  ];

  // Removed openPdf function - now using modal to display PDFs
  const openPdf = (url, title = "Document") => {
    setPdfUrl(url);
    setPdfTitle(title);
    setShowPdfModal(true);
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
            { name: "Secretariat", href: "/secretariat" },
            { name: "Library", href: "/secretariat/library" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Library" />

            <Tabs
              tabs={[
                {
                  key: "About Library",
                  label: "About Library",
                  content: (
                    <div className="about-library-tab">
                      <div class="library-section">
                        <div class="library-image">
                          <img
                            src="/images/book-library.jpg"
                            alt="Library Advisory Committee"
                          />
                        </div>

                        <div class="library-content">
                          <p>
                            The Legislature Library is essentially a special
                            library catering to the needs of the legislators in
                            the discharge of their functions. Library originated
                            in the Dewan's Office Library of the erstwhile
                            Travancore State renamed as the Legislative Library
                            in 1921 and later as Travancore Cochin Assembly
                            Library in 1949. The library got its present name,
                            Kerala Legislature Library in 1956 and has since
                            been exclusively meant to meet the information needs
                            of the Members of the Legislative Assembly. The
                            library with more than One Lakh Thirteen Thousand
                            books, reports, gazettes, back volumes of
                            periodicals and newspapers etc. is one of the best
                            reference libraries in the State.
                          </p>
                        </div>
                      </div>

                      <div class="library-details">
                        <h3>Working Hours</h3>

                        <p>
                          The Main library shall remain open on all working days
                          between 10.15 a.m. to 5.15 p.m. and on the preceding
                          day during session the library shall remain open from
                          10.15 a.m. to 8.00 p.m. During periods when Assembly
                          is in session, the library shall open from 8.00 a.m.
                          to 8.00 p.m. or till the House rises for the day. It
                          shall also remain open from 2.00 p.m. to 8.00 p.m. on
                          the preceding day, if that happens to be a holiday and
                          shall open form 2.30 p.m. to 5.30 p.m. for intervening
                          holidays of a session.
                        </p>

                        <p>
                          The Members’ Reference Branch (Room No. 504 Assembly
                          Building) shall remain open on all working days from
                          10.15 a.m. to 5.15 p.m. On the preceding day during
                          session, the Library shall remain open from 10.15 a.m.
                          to 5.30 p.m. During periods when Assembly is in
                          session the Members’ Reference Branch shall open from
                          8.00 a.m. to 5.30 p.m. or till the House rises for the
                          day. It shall also open form 2.30 p.m. to 5.30 p.m.,
                          on the preceding day, if that happens to be a holiday
                          and on the intervening holidays of a session.
                        </p>

                        <p>
                          The MLA Hostel Library extension counter shall remain
                          open on all working days between 7.30 a.m. to 5.30
                          p.m. During periods when Assembly is in session, the
                          Library shall open from 7.00 a.m. to 8.00 p.m. It
                          shall also remain open from 7.30 a.m. to 8.00 p.m. on
                          the preceding day if it is a working day and it shall
                          also open from 8.00 a.m. to 8.00 p.m. on the preceding
                          day if that happens to be a holiday and on the
                          intervening holidays of a session.
                        </p>

                        <p>
                          Children’s Library shall remain open from 10.30 a.m.
                          to 4.30 p.m. on all working days including when
                          Assembly is in session.
                        </p>
                        <div className="contact-table-container">
                          <h3 className="contact-heading">
                            Library Contact Numbers
                          </h3>
                          <table className="contact-table">
                            <thead>
                              <tr>
                                <th>Department / Section</th>
                                <th>Phone Number</th>
                              </tr>
                            </thead>
                            <tbody>
                              {contacts.map((contact, index) => (
                                <tr key={index}>
                                  <td>{contact.name}</td>
                                  <td>{contact.phone}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {/* <h3>Contact Numbers</h3> */}

                        {/* <div class="contact-list">
                          <ul>
                            <li>
                              <span>Chief Librarian</span>
                              <span>2512522</span>
                            </li>
                            <li>
                              <span>Librarian (General)</span>
                              <span>2512523</span>
                            </li>
                            <li>
                              <span>Librarian (Members' Reference)</span>
                              <span>2512039</span>
                            </li>
                            <li>
                              <span>Librarian (Reference)</span>
                              <span>2512284</span>
                            </li>
                            <li>
                              <span>Librarian (K-LAMPS)</span>
                              <span>2512566</span>
                            </li>
                            <li>
                              <span>Members' Reference Branch</span>
                              <span>2512593</span>
                            </li>
                            <li>
                              <span>Reference Section</span>
                              <span>2512519</span>
                            </li>
                            <li>
                              <span>Circulation Section</span>
                              <span>2512135</span>
                            </li>
                            <li>
                              <span>MLA Hostel Extension Counter</span>
                              <span>2512259</span>
                            </li>
                            <li>
                              <span>Technical Section</span>
                              <span>2512520</span>
                            </li>
                            <li>
                              <span>Digitisation Section</span>
                              <span>2512630</span>
                            </li>
                            <li>
                              <span>Documentation Section</span>
                              <span>2512521</span>
                            </li>
                            <li>
                              <span>Maintenance Section</span>
                              <span>2512138</span>
                            </li>
                            <li>
                              <span>Children’s Library</span>
                              <span>2512640</span>
                            </li>
                          </ul>
                        </div> */}
                      </div>
                    </div>
                  ),
                },

                {
                  key: "Library Advisory Committee",
                  label: "LAC",
                  content: (
                    <div>
                      <div class="library-section">
                        <div class="library-image">
                          <img
                            src="/images/book-library.jpg"
                            alt="Library Advisory Committee"
                          />
                        </div>

                        <div class="library-content">
                          <p>
                            A Library Advisory Committee is constituted from
                            among the Members of the Legislative Assembly in
                            order to suggest ways and means for the proper
                            working of the Library. The committee consists of a
                            Chairman and 6 other Members nominated by the
                            Speaker. The Secretary to the Legislature is an
                            Ex-officio member, who shall be the convenor of the
                            Committee.
                          </p>

                          <p>
                            The Library Advisory Committee scrutinizes the merit
                            of documents to be procured for the library and
                            advices the Hon’ble Speaker accordingly. The
                            Committee meets frequently to review matters of
                            importance to accord better facilities for the users
                            of the Library.
                          </p>
                        </div>
                      </div>
                      <div class="mt10 library-committee-sectio">
                        <h3>Library Advisory Committee Members</h3>
                        {/* 
                        <table class="library-committee-table">
                          <thead>
                            <tr>
                              <th>Sl. No</th>
                              <th>Members</th>
                              <th>Phone Number</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Shri. Thomas K Thomas (Chairman)</td>
                              <td>9539239729</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Shri. D. K. Murali</td>
                              <td>9447428205</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Shri. P. Balachandran</td>
                              <td>9847581634</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Shri. K. J. Maxy</td>
                              <td>9447136374</td>
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>Dr. M. K. Muneer</td>
                              <td>9947041000</td>
                            </tr>
                            <tr>
                              <td>6</td>
                              <td>Shri. Roji M. John</td>
                              <td>9971392134</td>
                            </tr>
                            <tr>
                              <td>7</td>
                              <td>Shri. Xavier Chittilappilly</td>
                              <td>9446228486</td>
                            </tr>
                            <tr>
                              <td>8</td>
                              <td>
                                Secretary, Kerala Legislative Assembly <br />
                                <em>(Ex-Officio member)</em>
                              </td>
                              <td>0471-2512002</td>
                            </tr>
                          </tbody>
                        </table> */}
                        <table className="table table myTable2">
                          <thead>
                            <tr>
                              <th scope="col">Sl. No</th>
                              <th scope="col">Members</th>
                              <th scope="col">Phone Number</th>
                            </tr>
                          </thead>
                          <tbody>
                            {libraryCommittee.map((item) => (
                              <tr key={item.id} className="debate">
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <h3 className="mt30">List of Officers</h3>

                        <ul class="library-officer-list mb30">
                          <li>
                            <span>Shri. Shaji C. Baby, Special Secretary</span>
                            <span>0471-2512194</span>
                          </li>
                          <li>
                            <span>Smt. Laila A.S., Chief Librarian</span>
                            <span>0471-2512522</span>
                          </li>
                          <li>
                            <span>Shri. G. Omanaseelan, Librarian</span>
                            <span>0471-2512523</span>
                          </li>
                          <li>
                            <span>Smt. Mary Joseph E., Deputy Librarian</span>
                            <span>0471-2512520</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Membership ",
                  label: "Membership ",
                  content: (
                    <div className="library-membership-sectio">
                      {/* <p className="library-membership-link">
                        Click here for{" "}
                        <a
                          href="/pdf/membership-forms.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Membership Forms
                        </a>
                      </p> */}

                      <div className="mt10 library-member-forms">
                        <a
                          href="#"
                          className="rul d-flex align-items-center mb20"
                          onClick={(e) => {
                            e.preventDefault();
                            openPdf(dummyPdf, "Membership Forms");
                          }}
                        >
                          <div className="imgx">
                            <img src="images/file2.svg" width={16} alt="" />
                          </div>
                          <span> Membership Forms</span>
                        </a>
                      </div>

                      <div className="mb20 library-membership-container">
                        <div className="library-membership-image">
                          <img
                            src="/images/book-library.jpg"
                            alt="Library Membership"
                          />
                        </div>

                        <div className="library-membership-content">
                          <h4>
                            The following classes of persons shall alone be
                            admitted as Members of the Library: -
                          </h4>
                          <ul className="list-with-dots">
                            <li>Members of the Kerala Legislative Assembly;</li>
                            <li>
                              Members of the Parliament representing the State
                              of Kerala;
                            </li>
                            <li>
                              Officers and Staff of the Legislature Secretariat;
                            </li>
                            <li>
                              Ex-Members of the Kerala Legislative Assembly;
                            </li>
                            <li>
                              Ex-Members of the Parliament represented Kerala;
                            </li>
                            <li>Ex-Secretaries of Kerala Legislature;</li>
                            <li>
                              Retired Officers and Staff of the Legislature
                              Secretariat;
                            </li>
                            <li>Personal assistants to MLAs;</li>
                            <li>
                              <strong>General Public (Graduate)</strong>
                            </li>
                            <li>
                              <strong>General Public (Graduate student)</strong>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Collection",
                  label: "Collection",
                  content: (
                    <div className="library-collection mt40 mb40">
                      <div className="library-membership-container">
                        <div className="library-membership-image">
                          <img
                            src="/images/abstract.jpg"
                            alt="Library Membership"
                          />
                        </div>

                        <div className="align-items-center library-membership-content align-center ">
                          <h4>
                            The following classes of persons shall alone be
                            admitted as Members of the Library: -
                          </h4>
                          <div>
                            The library has an extensive collection of more than
                            One Lakh Twenty One Thousand books, reports,
                            gazettes, assembly proceedings, proclamations, acts,
                            ordinances, census reports and back volumes of
                            periodicals. Periodicals and newspapers also add to
                            the general library collection.
                          </div>
                        </div>
                      </div>
                      <h3 className="mt20 mb20">Special collections </h3>
                      <h6>
                        Some of the special collections maintained by the
                        library are as follows:-
                      </h6>
                      <ul>
                        <li>
                          Kerala Collection- with books on all subjects
                          pertaining to Kerala
                        </li>
                        <li>Souvenir Collection</li>
                        <li>
                          Gazette Collection- includes Government of India and
                          Kerala Gazettes
                        </li>
                        <li>
                          Reports Collection- contains reports of Commissions
                          and Committees of Government of India and Government
                          of Kerala
                        </li>
                        <li>
                          Ex-Members of the Parliament represented Kerala;
                        </li>
                        <li>Ex-Secretaries of Kerala Legislature;</li>
                        <li>Biography Collection</li>
                        <li>Gandhiana- Books by, on, and about Gandhiji</li>
                        <li>EMS collection - Books by, on and about EMS</li>
                        <li>Archives of rare books</li>
                        <li>
                          Video CDs of unedited Assembly proceedings from 2005
                          onwards
                        </li>
                        {/* <li>
                          <strong>General Public (Graduate)</strong>
                        </li>
                        <li>
                          <strong>General Public (Graduate student)</strong>
                        </li> */}
                      </ul>
                      {/* <div>
                        <h3>Location of documents</h3>
                        <p>
                          The present Legislature Library has its core
                          collection in the Administrative block and is spread
                          in three floors.
                        </p>
                        <div className="library-membership-container mb20 mt20">
                          <div className="library-membership-image">
                            <h4>Top floor</h4>
                            <img
                              src="/images/abstract.jpg"
                              alt="Library Membership"
                            />
                          </div>

                          <div className="align-items-center library-membership-content align-center ">
                            <h4></h4>

                            <div>
                              The library has an extensive collection of more
                              than One Lakh Twenty One Thousand books, reports,
                              gazettes, assembly proceedings, proclamations,
                              acts, ordinances, census reports and back volumes
                              of periodicals. Periodicals and newspapers also
                              add to the general library collection.
                            </div>
                          </div>
                        </div>

                        <div className="library-membership-container mb20">
                          <div className="library-membership-image">
                            <h4>Middle floor</h4>
                            <img
                              src="/images/abstract.jpg"
                              alt="Library Membership"
                            />
                          </div>

                          <div className="align-items-center library-membership-content align-center ">
                            <h4></h4>
                            <div>
                              The library has an extensive collection of more
                              than One Lakh Twenty One Thousand books, reports,
                              gazettes, assembly proceedings, proclamations,
                              acts, ordinances, census reports and back volumes
                              of periodicals. Periodicals and newspapers also
                              add to the general library collection.
                            </div>
                          </div>
                        </div>

                        <div className="library-membership-container mb20">
                          <div className="align-items-center library-membership-content align-center ">
                            <h4></h4>
                            <div>
                              The library has an extensive collection of more
                              than One Lakh Twenty One Thousand books, reports,
                              gazettes, assembly proceedings, proclamations,
                              acts, ordinances, census reports and back volumes
                              of periodicals. Periodicals and newspapers also
                              add to the general library collection.
                            </div>
                          </div>
                          <div className="library-membership-image">
                            <h4>Archives Unit</h4>
                            <img
                              src="/images/abstract.jpg"
                              alt="Library Membership"
                            />
                          </div>
                        </div>

                        <div className="library-membership-container mb20">
                          <div className="library-membership-image">
                            <h4>Ground floor</h4>
                            <img
                              src="/images/abstract.jpg"
                              alt="Library Membership"
                            />
                          </div>

                          <div className="align-items-center library-membership-content align-center ">
                            <h4></h4>
                            <div>
                              The library has an extensive collection of more
                              than One Lakh Twenty One Thousand books, reports,
                              gazettes, assembly proceedings, proclamations,
                              acts, ordinances, census reports and back volumes
                              of periodicals. Periodicals and newspapers also
                              add to the general library collection.
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div>
                        <div className="book-review-section container">
                          {/* Banner Section */}

                          {/* Location List Section (like .book-list) */}
                          <div className="book-list">
                            {[
                              {
                                title: "Top Floor",
                                img: "/images/abstract.jpg",
                                description:
                                  "Houses reference documents with a display of nascent periodicals, Kerala collection, parliamentary studies, encyclopedias, dictionaries on all subjects, etc.",
                              },
                              {
                                title: "Middle Floor",
                                img: "/images/abstract.jpg",
                                description:
                                  "Encompasses books on all subjects starting from Generalia to Law along with Biography collection arranged in classified order. This floor also incorporates bound volumes of newspaper, Proceedings of the Travancore, Cochin, Travancore - ­Cochin and Kerala Legislative Assembly, Committee reports of Lok Sabha, Rajya Sabha, Kerala Legislative Assembly and Commissions and committee Reports of Government of India and Kerala.",
                              },
                              {
                                title: "Archives Unit",
                                img: "/images/abstract.jpg",
                                description:
                                  "The Kerala Legislature Library is one of the oldest libraries of the state. It is rich in rare collections of historic materials relating to the history of the state and also its legislative proceedings. Parliamentary, and various legislative assembly committee reports are major attractions of the library. The library maintains an air conditioned Archival Unit, for the preservation of records, manus, rare books, reports and assembly proceedings from 1888 onwards.",
                              },
                              {
                                title: "Ground Floor",
                                img: "/images/abstract.jpg",
                                description:
                                  "The ground floor houses Gazettes, Parliamentary debates (both Lok Sabha and Rajya Sabha), Census reports, Administration reports, bound volumes of periodicals etc.",
                              },
                            ].map((floor, index) => (
                              <div className="book-card" key={index}>
                                <div className="book-review-div">
                                  <img src={floor.img} alt={floor.title} />
                                </div>
                                <div>
                                  <h5 className="book-title">{floor.title}</h5>
                                  <p className="book-description">
                                    {floor.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Library Rules",
                  label: "Library Rules",
                  content: (
                    <div>
                      {/* <div className="mt30 library-member-forms">
                        <a
                          href="#"
                          className="rul d-flex align-items-center mb20"
                          onClick={() => openPdf(dummyPdf)}
                        >
                          <span> Library Rules</span>
                          <div className="imgx">
                            <img src="images/file2.svg" width={16} alt="" />
                          </div>
                        </a>
                      </div> */}

                      <div className="session-list-buss row mt-4">
                        <div className="col-lg-12 col-md-12">
                          <p className="text-muted">Click on "Library Rules" link above to view the PDF</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Branches",
                  label: "Branches",
                  content: (
                    <div className="library-branches">
                      <div>
                        <div className="book-review-section container">
                          {/* Banner Section */}

                          {/* Location List Section (like .book-list) */}
                          <div className="book-list">
                            {[
                              {
                                title: "LIBRARY - MEMBERS' REFERENCE BRANCH",
                                img: "/images/abstract.jpg",
                                description:
                                  "Members' Reference Branch functions in the first floor of the Assembly block in room 504. This section expedites library services to Members because of its proximity to the assembly. Leading newspapers, selected periodicals, papers laid on the table, KLA proceedings, newspaper clippings arranged in subject wise, ready reference documents etc are available here.",
                              },
                              {
                                title: "LIBRARY EXTENSION COUNTER - MLA HOSTEL",
                                img: "/images/abstract.jpg",
                                description:
                                  "Functions in the Legislators' Hostel to cater to the information needs of resident members. Newspapers, periodicals, Kerala Gazette and prominent reference documents are available here.",
                              },
                              {
                                title:
                                  "KERALA  LEGISLATURE - CHILDREN'S LIBRARY",
                                img: "/images/abstract.jpg",
                                description:
                                  "The   Kerala Legislative Assembly Children’s Library (KLACL) was inaugurated on  25th February 2016. The KLACL shall function as branch (library) of the Kerala Legislature Library. The main objective of the Children’s Library is to inculcate reading habits among children and to enable them in accessing and sharing the wide and rare resources available in the Kerala Legislature Library. It also aims to impart knowledge in young minds on the Kerala Legislature. Particular emphasis shall be given to those children of marginalized sections of the society who do not have access to good and resourceful libraries. The children can access information through the blog http://klachildrenslibrary.wordpress.com.  The Children's Library functions in room no. 204 of Administrative Building. The library shall remain open from 10.30 a.m. to 4.30 p.m. on all working days.",
                              },
                            ].map((floor, index) => (
                              <div className="book-card" key={index}>
                                <div className="book-review-div">
                                  <img src={floor.img} alt={floor.title} />
                                </div>
                                <div>
                                  <h5 className="book-title">{floor.title}</h5>
                                  <p className="book-description">
                                    {floor.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <h3 className="mt20 mb20">Membership </h3>
                      <h6 className="pb5">
                        Children in the age group of 10 to 18 are eligible to be
                        a member of the Children`s Library of Kerala Legislative
                        Assembly.
                        <br />
                        <br /> The Children in the following category shall
                        alone be admitted as Members of the Children`s Library
                      </h6>
                      <ul>
                        <li>
                          Children/Grand children of Members of Kerala
                          Legislative Assembly (MLAs), Ex MLAs, Members of
                          Parliament (MPs) from Kerala and Ex-MPs from Kerala
                          who are members of the Kerala Legislature Library;
                        </li>

                        <li>
                          Children of permanent employees of Kerala Legislature
                          Secretariat, General Administration, Finance and Law
                          Secretariat who are members of the Kerala Legislature
                          Library;
                        </li>
                        <li>
                          Reports Collection- contains reports of Commissions
                          and Committees of Government of India and Government
                          of Kerala
                        </li>
                        <li>
                          Children of Journalists accredited to the Press
                          Gallery of Kerala Legislative Assembly;
                        </li>
                        <li>
                          Children belong to the under-privileged / marginalised
                          sections who are selected and recommended by the
                          Members of Kerala Legislative Assembly;
                        </li>
                        <li>Children sponsored by recognized schools.</li>

                        <li>Children of General Public(Graduates)</li>
                      </ul>
                      <div className="mt20 mb20">
                        <h3>Collections </h3>
                        <p>
                          The children’s library collection includes books,
                          audio visual documents, e-books, online resources.
                          Library also subscribes magazines for children.
                        </p>
                      </div>
                      <div className="mt20 mb20">
                        <h3>Working Hours</h3>
                        <p>
                          The Children’s library will be kept open from 10.30
                          a.m. to 4.30 p.m. on all working days.
                        </p>
                      </div>
                      <div className="mt20 mb20">
                        <h3>Contacts</h3>
                        <div className="library-contact">
                          <span>Children’s Library</span>
                          <span>Kerala Legislative Assembly</span>
                          <span>Assembly Complex</span>
                          <span>Thiruvananthapuram</span>
                          <span>Phone : 0471-251 2640</span>
                          <span>e-mail: klaclib@gmail.com</span>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Digital Archives",
                  label: "Digital Archives",
                  content: (
                    <div className="library-dig-archives mb20 mt20">
                      <h4>Digital Archives</h4>
                      <span>
                        The library is involved in the digitisation of assembly
                        documents including assembly deliberations, bills
                        passed, committee and commission reports and bulletins.
                        Assembly documents from the year 1888 to 2016 have been
                        digitised and the work is going on . Over Nine Lakh
                        images have been digitised. More than fifty thousand
                        links are provided to access the digitised documents.
                        Digitisation of assembly documents is a novel method in
                        preserving the same. These digitised documents are
                        available in the archives link of the Kerala Legislative
                        Assembly (www.klaproceedings.niyamasabha.org). These
                        documents can be searched by means of member name,
                        assembly, session, date and subject options.{" "}
                      </span>
                      <div className="mb20 mt20">
                        <h4>Computerisation</h4>
                        <span>
                          {" "}
                          Automation in the Kerala Legislature Library initiated
                          in 2006 has bestowed it with the status of India's
                          first computerised Assembly Library using SOUL
                          software of Inflibnet. On 2018 'Koha' software was
                          used for the same facilitates members to search and
                          extract the required information easily. Availability
                          of library documents can be searched using OPAC
                          (Online Public Access Catalogue) in the intranet of
                          Kerala Legislature Secretariat.
                        </span>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Services",
                  label: "Services",
                  content: (
                    <div className=" mt20 mb20 library-services">
                      <h4 className="lib-head mt20">Services</h4>
                      <h5>Reference Service:</h5>
                      <p>
                        Provides books/documents or relevant materials as
                        demanded by the Members to suit their reference
                        enquiries. This service is also extended to research
                        scholars and accredited press representatives for short
                        duration during non session periods.
                      </p>
                      <h5 className="mt20">
                        Indexing and Documentation Services:-
                      </h5>
                      <ul>
                        <li>
                          Selects and disseminates information indispensable for
                          indigenous publications like 'Legal and Constitutional
                          Digest'
                        </li>
                        <li>Prepares subject bibliographies</li>
                        <li>Index of nascent periodicals and articles</li>
                        <li>
                          Digital Library offers access to important reference
                          documents through Intranet of the Kerala Legislature
                          Secretariat
                        </li>
                        <li>
                          E-reading portal; A gateway of information that offers
                          access to more than thirty five thousand e-books.
                        </li>
                      </ul>
                      <div>
                        <h5 className="mt20">Press Clipping Service:-</h5>
                        <span>
                          {" "}
                          Assimilating daily news of utmost relevance and
                          preserving the same for effective retrieval.{" "}
                        </span>
                      </div>
                      <div>
                        <h5 className="mt20">Photocopying Service:-</h5>
                        <span>
                          {" "}
                          Available in Main Library, Members' Reference Branch
                          and Library Extension Counter.{" "}
                        </span>
                      </div>
                      <div>
                        <h4 className="lib-head mt20">Databases</h4>
                        <div>
                          <h5>Doper:-</h5>
                          <span>
                            Index of articles in the periodical publications.
                          </span>
                        </div>
                        <div>
                          <h5 className="mt20">Person:-</h5>
                          <span>
                            Index of articles on political personalities and
                            other eminent persons.
                          </span>
                        </div>
                        <div>
                          <h5 className="mt20">
                            Supreme Court and High Court Judgements:-
                          </h5>
                          <span>
                            Library subscribes a database, which enable full
                            text search on Kerala High Court Judgements from
                            1957 onwards and Supreme Court Judgements from 2000
                            onwards. This database is periodically updated.
                          </span>
                          <span>
                            Legislature Library also subscribes Manupatra (a
                            legal database)
                          </span>
                        </div>
                        <div>
                          <h5 className="lib-head mt20">Book Exhibition </h5>
                          <span>
                            The Library conducts book exhibitions in connection
                            with occasions like official language week and also
                            to pay respect to eminent writers and political
                            leaders on occasions of homage on their birth /
                            death anniversaries or as and when they are
                            acclaimed.
                          </span>
                        </div>
                      </div>
                    </div>
                  ),
                },
                // {
                //   key: "Library Publications",
                //   label: "Library Publications",
                //   content: (
                //     <div class="library-publications">
                //       <div class="book">
                //         <img
                //           src="/images/bg-book.webp"
                //           alt="Kerala Legislature Library Bulletin"
                //         />
                //       </div>
                //       <div class="book">
                //         <img
                //           src="/images/bg-book.webp"
                //           alt="Kerala Legislature Library Bulletin"
                //         />
                //       </div>
                //       <div class="book">
                //         <img
                //           src="/images/bg-book.webp"
                //           alt="Kerala Legislature Library Bulletin"
                //         />
                //       </div>
                //       <div class="book">
                //         <img
                //           src="/images/bg-book.webp"
                //           alt="Kerala Legislature Library Bulletin"
                //         />
                //       </div>
                //     </div>
                //   ),
                // },
                {
                  key: "Forms",
                  label: "Forms",
                  content: (
                    <div>
                      <div className="session-list-buss row mt-4">
                        <div className="col-lg-3 col-md-6">
                          <div className="mt20 library-member-forms">
                            {[
                              "Membership Forms",
                              "Membership Renewal Form",
                              "Application for Research Facility",
                              "Request for Photocopying",
                              "Loan Slip",
                              "Non Liability Certificate",
                              "Letter of Authority",
                            ].map((title, index) => (
                              <a
                                key={index}
                                href="#"
                                className="w100 rul d-flex align-items-center mb20 "
                                onClick={(e) => {
                                  e.preventDefault();
                                  openPdf(dummyPdf, title);
                                }}
                              >
                                <span>{title}</span>
                                <div className="imgx">
                                  <img
                                    src="images/file2.svg"
                                    width={16}
                                    alt=""
                                  />
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>

                        <div className="col-lg-9 col-md-6">
                          <p className="text-muted">Click on a form link to view the PDF</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                // {
                //   key: "Book For Review",
                //   label: "Book For Review",
                //   content: (
                //     <div>
                //       <div className="book-review-section container">
                //         <div className="book-banner">
                //           <div className="book-banner-card">
                //             {books.map((book, index) => (
                //               <img
                //                 key={index}
                //                 src="/images/bg-book.webp"
                //                 alt={`Book ${index + 1}`}
                //                 className="book-banner-img"
                //                 style={{ cursor: "pointer" }}
                //                 onClick={() => {
                //                   const target = document.getElementById(
                //                     `book-card-${index}`
                //                   );
                //                   if (target) {
                //                     target.scrollIntoView({
                //                       behavior: "smooth",
                //                       block: "start",
                //                     });
                //                   }
                //                 }}
                //               />
                //             ))}
                //           </div>
                //         </div>

                //         <div className="book-list">
                //           {books.map((book, index) => (
                //             <div
                //               className="book-card"
                //               key={index}
                //               id={`book-card-${index}`} // unique ID for scroll target
                //             >
                //               <div className="book-review-div">
                //                 <img
                //                   src="/images/bg-book.webp"
                //                   alt="Kerala Legislature Library Bulletin"
                //                 />
                //               </div>
                //               <div>
                //                 <h5 className="book-title">{book.title}</h5>
                //                 <p className="book-author">
                //                   <strong
                //                     className="lib-book-list"
                //                     style={{ color: "#676767" }}
                //                   >
                //                     Author:
                //                   </strong>{" "}
                //                   {book.author}
                //                 </p>
                //                 <p className="book-publisher">
                //                   <strong>Publisher:</strong> {book.publisher}
                //                 </p>
                //                 <p className="book-year">
                //                   <strong>Year:</strong> {book.year}
                //                 </p>
                //                 <p className="book-description">
                //                   {book.description}
                //                 </p>
                //               </div>
                //             </div>
                //           ))}
                //         </div>
                //       </div>
                //     </div>
                //   ),
                // },
              ]}
              onChange={() => {}}
            />
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

export default Library;
