import React, { useState, useEffect } from "react";
import HomeTest from "./Header";
import {
  CategoriesNav,
  BreadcrumbNav,
  SectionTitle,
  SessionCalendar,
  Filter,
  Tabs,
  ExportButton,
} from "./common";
import InlinePdfViewer from "./common/InlinePdfViwer";


const Rti = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFileUrl, setActiveFileUrl] = useState("");

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

  const dummyPdf = "/pdf1.pdf";

  const rtiOfficers = [
    {
      name: "Smt Sheeba Varghese",
      designation: "Deputy Secretary",
      phone: "2512426",
      subjects: "SPIO ‒ Estimates Committee, Press Relations",
    },
    {
      name: "Shri V A Jacob",
      designation: "Deputy Secretary",
      phone: "2512424",
      subjects: "SPIO ‒ Legislators' Hostel",
    },
    {
      name: "Shri Unnikrishnan G P",
      designation: "Deputy Secretary",
      phone: "2512568",
      subjects: "SPIO ‒ Sabha T.V. Printing Press Editing",
    },
    {
      name: "Shri Santhakumar S",
      designation: "Deputy Secretary",
      phone: "2512402",
      subjects:
        "SPIO ‒ Legislation Committee On Private Members Bills And Resolution",
    },
    {
      name: "Shri R Venugopal",
      designation: "Deputy Secretary",
      phone: "2512186",
      subjects:
        "SPIO ‒ Committee On Public Accounts, Committee On Public Undertakings",
    },
    {
      name: "Shri V G Riju",
      designation: "Deputy Secretary",
      phone: "2512397",
      subjects: "SPIO ‒ Media & Parliamentary Study Centre, Subject Committees",
    },
    {
      name: "Shri S Sunil Kumar",
      designation: "Deputy Secretary",
      phone: "2512428",
      subjects: "SPIO ‒ Accounts",
    },
    {
      name: "Shri A Jafferkhan",
      designation: "Deputy Secretary",
      phone: "2512212",
      subjects: "SPIO ‒ Question, Research, Reception",
    },
    {
      name: "Smt Deepa R Krishnan",
      designation: "Deputy Secretary",
      phone: "2512431",
      subjects:
        "SPIO ‒ Welfare of Non-Resident Keralites, Petitions, OBCs & Allied Workers",
    },
    {
      name: "Smt L Jyothi",
      designation: "Deputy Secretary",
      phone: "2512470",
      subjects: "SPIO ‒ Museum, Information Technology, Library",
    },
    {
      name: "Smt V Deepa",
      designation: "Deputy Secretary",
      phone: "2512353",
      subjects: "SPIO ‒ Environment, Data Resource Development",
    },
    {
      name: "Smt Sudarsana K",
      designation: "Deputy Secretary",
      phone: "2512610",
      subjects:
        "SPIO ‒ Women, Transgenders, Children & Differently Abled, Scheduled Castes & Tribes, Senior Citizens & Youth Affairs",
    },
    {
      name: "Smt M Jayasree",
      designation: "Deputy Secretary",
      phone: "2512489",
      subjects: "SPIO ‒ Subordinate Legislation, Official Language",
    },
    {
      name: "Smt Sheena Sivadas",
      designation: "Deputy Secretary",
      phone: "2512159",
      subjects:
        "SPIO ‒ Local Fund Accounts, House Keeping, Other Subjects Not Specified",
    },
    {
      name: "Smt Reena V R",
      designation: "Deputy Secretary",
      phone: "2512011",
      subjects: "SPIO ‒ Table, Papers Laid On The Table",
    },
    {
      name: "Shri M Kunjumon",
      designation: "Deputy Secretary",
      phone: "2512402",
      subjects: "SPIO ‒ Services",
    },
    {
      name: "Shri Suresan C",
      designation: "Under Secretary",
      phone: "2513006",
      subjects: "SPIO ‒ Office Of The Secretary",
    },
    {
      name: "Smt D O Reji",
      designation: "Under Secretary",
      phone: "2512011",
      subjects: "SPIO ‒ Table, Papers Laid On The Table",
    },
    {
      name: "Shri R Shaji",
      designation: "Under Secretary",
      phone: "2512020",
      subjects: "SAPIO ‒ Legislation, Private Members Bills And Resolutions",
    },
    {
      name: "Smt Sheela Titus",
      designation: "Under Secretary",
      phone: "2512353",
      subjects: "SAPIO ‒ Data Resource Development",
    },
    {
      name: "Shri Jomy K Joseph",
      designation: "Under Secretary",
      phone: "2512429",
      subjects:
        "SAPIO ‒ Committee On Environment, Subordinate Legislation, Official Language",
    },
    {
      name: "Shri Jayakumar G",
      designation: "Under Secretary",
      phone: "2512452",
      subjects: "SAPIO ‒ Local Fund Accounts Committee, Subject Committees",
    },
    {
      name: "Shri S V Deepak",
      designation: "Under Secretary",
      phone: "2512404",
      subjects: "SAPIO ‒ Services",
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
            { name: "RTI/Contacts", href: "/rti" },
            { name: "RTI", href: "/rti" },
            {
              name: "Officers under RTI Act",
              href: "/business/Officers under RTI Act",
            },
          ]}
        />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Officers under RTI Act" />

            <Tabs
              tabs={[
                {
                  key: "Appellate Authority",
                  label: "Appellate Authority",
                  content: (
                    <div className="container mt-4">
                      <h4 className="mb-3 ">Appellate Authority</h4>

                      <div className="card mb-3 p-3 border rounded bg-overlay-purple">
                        <h5 className="rti-card-name mb-1">Shri T. Manoharan Nair</h5>
                        <p className="mb-1">Private Secretary,</p>
                        <p className="mb-1">Office of the Honourable Speaker</p>
                        <p className="mb-0">
                          <strong>Phone:</strong> 0471-2513007
                        </p>
                      </div>

                      <div className=" card mb-3 p-3 border rounded bg-overlay-purple">
                        <h5 className="rti-card-name mb-1">Shri. Kishor Kumar</h5>
                        <p className="mb-1">Special Secretary,</p>
                        <p className="mb-1">
                          Room No. 836, IV Floor, Assembly Building
                        </p>
                        <p className="mb-0">
                          <strong>Phone:</strong> 2305398 (Direct) | 2194
                          (EPABX)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Officers under RTI Act",
                  label: "Officers under RTI Act",
                  content: (
                    <div className="pt30" >
                      <Filter filterKeys={["KLA", "SESSION_TYPE"]} />
                      <div className="table-responsive mt30">
                        <table className="table table myTable2">
                          <thead>
                            <tr>
                              <th scope="col">Sl. No</th>
                              <th scope="col">Name</th>
                              <th scope="col">Designation</th>
                              <th scope="col">Phone</th>
                              <th scope="col">Subjects / Office</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rtiOfficers.map((officer, idx) => (
                              <tr key={idx}>
                                <td className="text-th">{idx + 1}</td>
                                <td className="text-th">
                                  <strong>{officer.name}</strong>
                                </td>
                                <td className="text-th">
                                  {officer.designation}
                                </td>
                                <td className="text-th">{officer.phone}</td>
                                <td
                                  style={{ whiteSpace: "pre-wrap" }}
                                  className="text-th"
                                >
                                  {officer.subjects}
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
                  key: "RTI Act",
                  label: "RTI Act",
                  content: (
                    <div className="container mt-4">
                      <div className="row">
                        <div className="col-lg-3 col-md-6">
                          <h5>RTI Documents</h5>

                           <div className="d-flex flex-column gap-3 mb-3">
                             <a
                               href="#"
                               className="rul d-flex align-items-center mb20"
                               onClick={(e) => {
                                 e.preventDefault();
                                 setActiveFileUrl(dummyPdf);
                               }}
                             >
                               <div className="imgx">
                                 <img
                                   src="images/file2.svg"
                                   width={16}
                                   alt=""
                                 />
                               </div>
                               <span>RTI Act, 2005 (English)</span>
                             </a>
                             
                             <a
                               href="#"
                               className="rul d-flex align-items-center"
                               onClick={(e) => {
                                 e.preventDefault();
                                 setActiveFileUrl(dummyPdf);
                               }}
                             >
                               <div className="imgx">
                                 <img
                                   src="images/file2.svg"
                                   width={16}
                                   alt=""
                                 />
                               </div>
                               <span>RTI Act, 2005 (Malayalam)</span>
                             </a>
                           </div>

                          <p>
                            <strong>No. 22 of 2005</strong> 
                            <p>An Act to provide
                            for setting out the practical regime of right to
                            information for citizens to secure access to
                            information under the control of public authorities,
                            in order to promote transparency and accountability
                            in the working of every public authority, the
                            constitution of a Central Information Commission and
                            State Information Commissions and for matters
                            connected therewith or incidental thereto. Whereas
                            the Constitution of India has established democratic
                            Republic; And whereas democracy requires an informed
                            citizenry and transparency of information which are
                            vital to its functioning and also to contain
                            corruption and to hold Governments and their
                            instrumentalities accountable to the governed; And
                            whereas revelation of information in actual practice
                            is likely to conflict with other public interests
                            including efficient operations of the Governments,
                            optimum use of limited fiscal resources and the
                            preservation of confidentiality of sensitive
                            information; And whereas it is necessary to
                            harmonise these conflicting interests while
                            preserving the paramountcy of the democratic ideal;
                            Now, therefore, it is expedient to provide for
                            furnishing certain information to citizens who
                            desire to have it. Be it enacted by Parliament in
                            the Fifty-sixth Year of the Republic of India as
                            follows:—</p> 
                          </p>
                        </div>
                        <div className="col-lg-9 col-md-6">
                          <InlinePdfViewer
                            fileUrl={activeFileUrl}
                            height="700px"
                          />
                        </div>
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

export default Rti;
