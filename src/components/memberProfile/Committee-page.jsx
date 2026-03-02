import { useEffect, useState } from "react";
import CommitteeSidebar from "./Committe-sidebar";
import CommitteeContent from "./Committe-content";
import HomeTest from "../Header";
import "../../styles/Committee.css";
import {
  BreadcrumbNav,
  CategoriesNav,
  ExportButton,
  Filter,
  Tabs,
} from "../common";

export default function CommitteePage() {
  const [selectedKLA, setSelectedKLA] = useState("15th");
  const [activeAccordion, setActiveAccordion] = useState(["0"]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCommitteeContent, setShowCommitteeContent] = useState(true); // Changed to true
  const [activeTab, setActiveTab] = useState("Introduction");
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [firstCommitteeLoaded, setFirstCommitteeLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cmsData = [
    {
      id: 1,
      memberName: "Member 1",
      committee: "Business Advisory Committee",
      status: "Member",
    },
    {
      id: 2,
      memberName: "Member 2",
      committee: "Committee on Environment",
      status: "Member",
    },
    {
      id: 3,
      memberName: "Member 3",
      committee: "Committee on Environment",
      status: "Member",
    },
    {
      id: 4,
      memberName: "Member 4",
      committee: "Business Advisory Committee",
      status: "Member",
    },
    {
      id: 5,
      memberName: "Member 5",
      committee: "Committee of Privileges and Ethics",
      status: "Member",
    },
    {
      id: 6,
      memberName: "Member 6",
      committee: "Committee on Estimates",
      status: "Member",
    },
    {
      id: 7,
      memberName: "Member 7",
      committee: "Committee on Estimates",
      status: "Chairperson",
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
            { name: "Committees", href: "/committees" },
          ]}
        />

        <section className="pt-0">
          <div className="container">
            <div className="row align-items-center pb20 pt20 wow fadeInUp">
              <div className="main-title mb10">
                <h2 className="title">Committee</h2>
                <p className="text mb-0 main-title-p">
                  Legislative committees are vital for executive oversight and
                  handling the legislature's heavy workload efficiently.
                </p>
              </div>
            </div>

            <div className="col-lg-12 mx-auto">
              <div className="row">
                {/* Sidebar */}
                <div className="col-lg-3">
                  <CommitteeSidebar
                    selectedKLA={selectedKLA}
                    setSelectedKLA={setSelectedKLA}
                    activeAccordion={activeAccordion}
                    setActiveAccordion={setActiveAccordion}
                    onSelectCommittee={(committee) => {
                      setSelectedCommittee(committee);
                      setShowCommitteeContent(true);
                      setActiveTab(null);
                    }}
                    onFirstCommitteeLoad={(firstCommittee) => {
                      // Auto-select first committee on initial load
                      if (!firstCommitteeLoaded && firstCommittee) {
                        setSelectedCommittee(firstCommittee);
                        setShowCommitteeContent(true);
                        setFirstCommitteeLoaded(true);
                      }
                    }}
                  />
                </div>

                {/* Main Content / Tabs */}
                <div className="col-lg-9 ">
                  {/* <div
                    className={showCommitteeContent ? "disable-active-tab" : ""}
                  >
                    <Tabs
                      tabs={[
                        {
                          key: "Introduction",
                          label: "Introduction",
                          content:
                            !showCommitteeContent &&
                            activeTab === "Introduction" ? (
                              <div className="bill-content col-md-12 mt30 committeeDt">
                                <div className="terms_condition_grid text-start">
                                  <p className="committee-intro">
                                    The vitality of the role of Legislature
                                    committees as a link between Legislature and
                                    Executive has base on two factors-the need
                                    for Legislature to be vigilant over actions
                                    of Executive and the heavy volume of work of
                                    Legislature with limited time at its
                                    disposal. The Legislature entrusts the
                                    committees with certain functions of the
                                    House and the committees aid and assist the
                                    Legislature in discharging such duties
                                    efficiently and effectively thereby
                                    preventing misuse of power exercisable by
                                    the Executive. Their vigilance over
                                    administration however does not mean direct
                                    control, command or prior approval. They
                                    point out the lapses in administration and
                                    help maintain a high standard of governance.
                                    They function in a non-partisan manner and
                                    their deliberations and conclusions are
                                    objective. In most committees public is also
                                    directly or indirectly associated when
                                    petitions or suggestions are received,
                                    studies are conducted and evidences are
                                    taken. The Committees thus also have a role
                                    as a vibrant link between the law making and
                                    law implementing bodies and the general
                                    public.
                                  </p>
                                </div>
                              </div>
                            ) : null,
                        },
                        {
                          key: "Constitution-of-committees",
                          label: "Constitution of Committees",
                          content:
                            !showCommitteeContent &&
                            activeTab === "Constitution-of-committees" ? (
                              <div className="bill-content col-md-12 mt30 committeeDt">
                                <div className="terms_condition_grid text-start">
                                  <p className="committee-intro">
                                    The Members of a Legislature Committee shall
                                    be appointed or elected by the Assembly or
                                    nominated by the Speaker, as the case may
                                    be. No Member shall be appointed to a
                                    Committee if he is not willing to serve on
                                    it. The proposer shall ascertain whether the
                                    Member whose name is proposed by him is
                                    willing to serve on the Committee. Casual
                                    vacancies in a Committee shall be filled by
                                    appointment or election by the Assembly or
                                    nomination by the Speaker, as the case may
                                    be, and any Member appointed, elected or
                                    nominated to fill such vacancy shall hold
                                    office for the unexpired portion of the term
                                    for which the Member in whose place he is
                                    appointed, elected or nominated would have
                                    normally held office.
                                    <br />
                                    <br /> Where an objection is taken to the
                                    inclusion of a Member in a Committee on the
                                    ground that the Member has a personal,
                                    pecuniary or direct interest of such an
                                    intimate character that it may prejudicially
                                    affect the consideration of any matters to
                                    be considered by the Committee, the
                                    procedure shall be as follows:—
                                    <br />
                                    <br /> (a) the Member who has taken
                                    objection shall precisely state the ground
                                    of his objection and the nature of the
                                    alleged interest, whether personal,
                                    pecuniary or direct, of the proposed Member
                                    in the matter coming up before the Committee
                                    ; <br />
                                    (b) after the objection has been stated, the
                                    Speaker shall give an opportunity to the
                                    Member proposed on the Committee against
                                    whom the objection has been taken, to state
                                    the position ; <br />
                                    (c) if there is dispute on facts, the
                                    Speaker may call upon the Member taking
                                    objection and the Member against whose
                                    appointment on the Committee objection has
                                    been taken, to produce documentary or other
                                    evidence in support of their respective case
                                    ;<br />
                                    (d) after the Speaker has considered the
                                    evidence so tendered before him, he shall
                                    give his decision which shall be final ;{" "}
                                    <br />
                                    (e) until the Speaker has given his decision
                                    the Member against whose appointment on the
                                    Committee objection has been taken, shall
                                    continue to be a Member thereof if elected,
                                    appointed or nominated ; <br />
                                    (f) if the Speaker holds that the Member
                                    against whose appointment objection has been
                                    taken has a personal, pecuniary or direct
                                    interest in the matter before the Committee,
                                    he shall cease to be a Member thereof
                                    forthwith.
                                    <br />
                                    <br /> A Committee nominated by the Speaker
                                    shall, unless otherwise specified in the
                                    Rules hold office for the period specified
                                    by him or until a new Committee is
                                    nominated. A Member may resign his seat from
                                    a Committee by writing under his hand
                                    addressed to the Speaker. The Chairman of a
                                    Committee shall be appointed by the Speaker
                                    from amongst the Members of the Committee
                                    .Provided that if the Deputy Speaker is a
                                    Member of the Committee, he shall be
                                    appointed Chairman of the Committee. If the
                                    Chairman is for any reason unable to act,
                                    the Speaker may appoint another Chairman in
                                    his place. If the Chairman is absent from
                                    any sitting, the Committee shall choose
                                    another Member to act as Chairman for that
                                    sitting.
                                  </p>
                                </div>
                              </div>
                            ) : null,
                        },
                        {
                          key: "Committee-membership-search",
                          label: "Committee membership search",
                          content:
                            !showCommitteeContent &&
                            activeTab === "Committee-membership-search" ? (
                              <div className="bill-content col-md-12 mt30 committeeDt">
                                <Filter
                                  filterKeys={[
                                    "KLA",
                                    "MEMBER",
                                    "CHAIRMAN",
                                    "COMMITTEE_CATEGORY",
                                    "ORDER_BY",
                                  ]}
                                />
                                <ExportButton />
                                <div className="buss-cal c-ptag">
                                  <table className="table table myTable2">
                                    <thead>
                                      <tr>
                                        <th>Sl.No</th>
                                        <th>Member Name</th>
                                        <th>Committee</th>
                                        <th>Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {cmsData.map((item, index) => (
                                        <tr key={item.id}>
                                          <td>{index + 1}</td>
                                          <td>{item.memberName}</td>
                                          <td>{item.committee}</td>
                                          <td>{item.status}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ) : null,
                        },
                        {
                          key: "Committee-reports",
                          label: "Committee-reports",
                          content:
                            !showCommitteeContent &&
                            activeTab === "Committee-reports" ? (
                              <div className="bill-content col-md-12 mt30 committeeDt">
                                <Filter
                                  filterKeys={[
                                    "KLA",
                                    "REPORT_TYPE",
                                    "COMMITTEE_CATEGORY",
                                    "REPORT_TITLE",
                                  ]}
                                />
                                <ExportButton />
                                <div className="buss-cal c-ptag">
                                  <table className="table table myTable2">
                                    <thead>
                                      <tr>
                                        <th>Sl No</th>
                                        <th>Report No.</th>
                                        <th>Subject</th>
                                        <th>Committee</th>
                                        <th>Date Presented</th>
                                        <th>Report Type</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>1</td>
                                        <td>44</td>
                                        <td>
                                          <a
                                            href="https://www.niyamasabha.nic.in/images//15th-KLA-committee-report/LFAC44.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            44th Report
                                          </a>
                                        </td>
                                        <td>
                                          <a
                                            href="https://www.niyamasabha.nic.in/index.php/committe/index/106"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            Committee on Local Fund Accounts
                                          </a>
                                        </td>
                                        <td>2023-03-31</td>
                                        <td>Audit</td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td>43</td>
                                        <td>
                                          <a
                                            href="https://www.niyamasabha.nic.in/images//15th-KLA-committee-report/LFAC43.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            43rd Report
                                          </a>
                                        </td>
                                        <td>
                                          <a
                                            href="https://www.niyamasabha.nic.in/index.php/committe/index/106"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                           Committee on Local Fund Accounts
                                          </a>
                                        </td>
                                        <td>2023-03-31</td>
                                        <td>Audit</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ) : null,
                        },
                        {
                          key: "Schedules",
                          label: "Schedules",
                          content:
                            !showCommitteeContent &&
                            activeTab === "Schedules" ? (
                              <div className="bill-content col-md-12 mt30 committeeDt">
                                <Filter
                                  filterKeys={[
                                    "COMMITTEE_CATEGORY",
                                    "COMMITTEE_NAME",
                                  ]}
                                />
                                <ExportButton />
                                <div className="buss-cal c-ptag">
                                  <table className="table table myTable2">
                                    <thead>
                                      <tr>
                                        <th>Sl.No</th>
                                        <th>Type of Meeting</th>
                                        <th>Committee</th>
                                        <th>Date from</th>
                                        <th>Date To</th>
                                        <th>Venue</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>1</td>
                                        <td>Meeting</td>
                                        <td>Business Advisory Committee</td>
                                        <td>2025-09-03</td>
                                        <td>2025-09-03</td>
                                        <td>Committee Room</td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td>Meeting</td>
                                        <td>Committee on Estimates</td>
                                        <td>2025-09-04</td>
                                        <td>2025-09-04</td>
                                        <td>Committee Room</td>
                                      </tr>
                                      <tr>
                                        <td>3</td>
                                        <td>Sitting</td>
                                        <td>
                                          Committee on Local Fund Accounts
                                        </td>
                                        <td>2025-09-05</td>
                                        <td>2025-09-05</td>
                                        <td>Assembly Secretariat</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ) : null,
                        },
                      ]}
                      // activeKey={showCommitteeContent ? undefined : activeTab}
                      // onChange={(key) => {
                      //   setShowCommitteeContent(false);
                      //   setActiveTab(key);
                      // }}
                      activeKey={showCommitteeContent ? undefined : activeTab} // remove active tab highlight
                      onChange={(key) => {
                        setShowCommitteeContent(false); // hide CommitteeContent if user clicks tab
                        setActiveTab(key); // set the active tab
                      }}
                    />
                  </div> */}
                  {showCommitteeContent && selectedCommittee && (
                    <CommitteeContent committee={selectedCommittee} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import CommitteeSidebar from "./Committe-sidebar";
// import CommitteeContent from "./Committe-content";
// import HomeTest from "../Header";
// import "../../styles/Committee.css";
// import {
//   BreadcrumbNav,
//   CategoriesNav,
//   ExportButton,
//   Filter,
//   Tabs,
// } from "../common";

// export default function CommitteePage() {
//   const [selectedKLA, setSelectedKLA] = useState("15th");
//   const [activeAccordion, setActiveAccordion] = useState(["0"]);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showCommitteeContent, setShowCommitteeContent] = useState(false);
//   const [activeTab, setActiveTab] = useState("Introduction");

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const cmsData = [
//     {
//       id: 1,
//       memberName: "Member 1",
//       committee: "	BUSINESS ADVISORY COMMITTEE",
//       status: "Member",
//     },
//     {
//       id: 2,
//       memberName: "Member 2",
//       committee: "	COMMITTEE ON ENVIRONMENT",
//       status: "Member",
//     },
//     {
//       id: 3,
//       memberName: "Member 3",
//       committee: "	COMMITTEE ON ENVIRONMENT",
//       status: "Member",
//     },
//     {
//       id: 4,
//       memberName: "Member 4",
//       committee: "	BUSINESS ADVISORY COMMITTEE",
//       status: "Member",
//     },
//     {
//       id: 5,
//       memberName: "Member 5",
//       committee: "COMMITTEE OF PRIVILEGES AND ETHICS",
//       status: "Member",
//     },
//     {
//       id: 6,
//       memberName: "Member 6",
//       committee: "COMMITTEE ON ESTIMATES",
//       status: "Member",
//     },
//     {
//       id: 7,
//       memberName: "Member 7",
//       committee: "COMMITTEE ON ESTIMATES",
//       status: "Chairperson",
//     },
//   ];

//   return (
//     <div className="wrapper ovh">
//       <header
//         className={`header-nav nav-homepage-style2 stricky main-menu ${
//           isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
//         }`}
//       >
//         <HomeTest />
//       </header>

//       <div className="body_content">
//         <CategoriesNav />

//         <BreadcrumbNav
//           breadcrumbs={[
//             { name: "Home", href: "/" },
//             { name: "Committees", href: "/committees" },
//           ]}
//         />

//         <section className="pt-0">
//           <div className="container">
//             <div className="row align-items-center pb20 pt20 wow fadeInUp">
//               <div className="main-title mb10">
//                 <h2 className="title">Committee</h2>
//                 <p className="text mb-0 main-title-p">
//                   Legislative committees are vital for executive oversight and
//                   handling the legislature's heavy workload efficiently.
//                 </p>
//               </div>
//             </div>

//             <div className="col-lg-12mx-auto">
//               <div className="row">
//                 <div className="col-lg-3">
//                   <CommitteeSidebar
//                     selectedKLA={selectedKLA}
//                     setSelectedKLA={setSelectedKLA}
//                     activeAccordion={activeAccordion}
//                     setActiveAccordion={setActiveAccordion}
//                     // onSelectCommittee={() => setShowCommitteeContent(true)}
//                      onSelectCommittee={() => {
//                       setShowCommitteeContent(true);
//                       setActiveTab(null); // remove active tab
//                     }}
//                   />
//                 </div>

//                 <div className="col-lg-9">
//                   <Tabs
//                     tabs={[
//                       {
//                         key: "Introduction",
//                         label: "Introduction",
//                         content:
//                           !showCommitteeContent &&
//                           activeTab === "Introduction" ? (
//                             <div className="bill-content col-md-12 mt30 committeeDt">
//                               <div className="terms_condition_grid text-start">
//                                 <p className="committee-intro">
//                                   The vitality of the role of Legislature
//                                   committees as a link between Legislature and
//                                   Executive has base on two factors-the need for
//                                   Legislature to be vigilant over actions of
//                                   Executive and the heavy volume of work of
//                                   Legislature with limited time at its disposal.
//                                   The Legislature entrusts the committees with
//                                   certain functions of the House and the
//                                   committees aid and assist the Legislature in
//                                   discharging such duties efficiently and
//                                   effectively thereby preventing misuse of power
//                                   exercisable by the Executive. Their vigilance
//                                   over administration however does not mean
//                                   direct control, command or prior approval.
//                                   They point out the lapses in administration
//                                   and help maintain a high standard of
//                                   governance. They function in a non-partisan
//                                   manner and their deliberations and conclusions
//                                   are objective. In most committees public is
//                                   also directly or indirectly associated when
//                                   petitions or suggestions are received, studies
//                                   are conducted and evidences are taken. The
//                                   Committees thus also have a role as a vibrant
//                                   link between the law making and law
//                                   implementing bodies and the general public.
//                                 </p>
//                                 <div className="session-list-buss row mt-4"></div>
//                               </div>
//                             </div>
//                           ) : null,
//                       },
//                       {
//                         key: "Constitution-of-committees",
//                         label: "Constitution of Committees",
//                         content:
//                           !showCommitteeContent &&
//                           activeTab === "Constitution-of-committees" ? (
//                             <div className="bill-content col-md-12 mt30 committeeDt">
//                               <div className="terms_condition_grid text-start">
//                                 <p className="committee-intro">
//                                   The Members of a Legislature Committee shall
//                                   be appointed or elected by the Assembly or
//                                   nominated by the Speaker, as the case may be.
//                                   No Member shall be appointed to a Committee if
//                                   he is not willing to serve on it. The proposer
//                                   shall ascertain whether the Member whose name
//                                   is proposed by him is willing to serve on the
//                                   Committee. Casual vacancies in a Committee
//                                   shall be filled by appointment or election by
//                                   the Assembly or nomination by the Speaker, as
//                                   the case may be, and any Member appointed,
//                                   elected or nominated to fill such vacancy
//                                   shall hold office for the unexpired portion of
//                                   the term for which the Member in whose place
//                                   he is appointed, elected or nominated would
//                                   have normally held office.
//                                   <br />
//                                   <br /> Where an objection is taken to the
//                                   inclusion of a Member in a Committee on the
//                                   ground that the Member has a personal,
//                                   pecuniary or direct interest of such an
//                                   intimate character that it may prejudicially
//                                   affect the consideration of any matters to be
//                                   considered by the Committee, the procedure
//                                   shall be as follows:—
//                                   <br />
//                                   <br /> (a) the Member who has taken objection
//                                   shall precisely state the ground of his
//                                   objection and the nature of the alleged
//                                   interest, whether personal, pecuniary or
//                                   direct, of the proposed Member in the matter
//                                   coming up before the Committee ; <br />
//                                   (b) after the objection has been stated, the
//                                   Speaker shall give an opportunity to the
//                                   Member proposed on the Committee against whom
//                                   the objection has been taken, to state the
//                                   position ; <br />
//                                   (c) if there is dispute on facts, the Speaker
//                                   may call upon the Member taking objection and
//                                   the Member against whose appointment on the
//                                   Committee objection has been taken, to produce
//                                   documentary or other evidence in support of
//                                   their respective case ;<br />
//                                   (d) after the Speaker has considered the
//                                   evidence so tendered before him, he shall give
//                                   his decision which shall be final ; <br />
//                                   (e) until the Speaker has given his decision
//                                   the Member against whose appointment on the
//                                   Committee objection has been taken, shall
//                                   continue to be a Member thereof if elected,
//                                   appointed or nominated ; <br />
//                                   (f) if the Speaker holds that the Member
//                                   against whose appointment objection has been
//                                   taken has a personal, pecuniary or direct
//                                   interest in the matter before the Committee,
//                                   he shall cease to be a Member thereof
//                                   forthwith.
//                                   <br />
//                                   <br /> A Committee nominated by the Speaker
//                                   shall, unless otherwise specified in the Rules
//                                   hold office for the period specified by him or
//                                   until a new Committee is nominated. A Member
//                                   may resign his seat from a Committee by
//                                   writing under his hand addressed to the
//                                   Speaker. The Chairman of a Committee shall be
//                                   appointed by the Speaker from amongst the
//                                   Members of the Committee .Provided that if the
//                                   Deputy Speaker is a Member of the Committee,
//                                   he shall be appointed Chairman of the
//                                   Committee. If the Chairman is for any reason
//                                   unable to act, the Speaker may appoint another
//                                   Chairman in his place. If the Chairman is
//                                   absent from any sitting, the Committee shall
//                                   choose another Member to act as Chairman for
//                                   that sitting.
//                                 </p>
//                                 <div className="session-list-buss row mt-4"></div>
//                               </div>
//                             </div>
//                           ) : null,
//                       },
//                       {
//                         key: "Committee-membership-search",
//                         label: "Committee membership search",
//                         content:
//                           !showCommitteeContent &&
//                           activeTab === "Committee-membership-search" ? (
//                             <div className="bill-content col-md-12 mt30 committeeDt">
//                               <div className="terms_condition_grid text-start">
//                                 <Filter
//                                   filterKeys={[
//                                     "KLA",
//                                     "MEMBER",
//                                     "CHAIRMAN",
//                                     "COMMITTEE_CATEGORY",
//                                     "ORDER_BY",
//                                   ]}
//                                 />
//                                 <ExportButton />
//                                 <div className="buss-cal c-ptag">
//                                   <div className="tabley">
//                                     <div className=""></div>
//                                     <table className="table table myTable2">
//                                       <thead>
//                                         <tr>
//                                           <th scope="col">Sl.No</th>
//                                           <th scope="col">Member Name</th>
//                                           <th scope="col">Committee</th>
//                                           <th scope="col">Status</th>
//                                         </tr>
//                                       </thead>
//                                       <tbody>
//                                         {cmsData.map((item, index) => (
//                                           <tr className="debate" key={item.id}>
//                                             <td>{index + 1}</td>
//                                             <td>{item.memberName}</td>
//                                             <td>{item.committee}</td>
//                                             <td>{item.status}</td>
//                                           </tr>
//                                         ))}
//                                       </tbody>
//                                     </table>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           ) : null,
//                       },
//                       {
//                         key: "Committee-reports",
//                         label: "Committee-reports",
//                         content:
//                           !showCommitteeContent &&
//                           activeTab === "Committee-reports" ? (
//                             <div className="bill-content col-md-12 mt30 committeeDt">
//                               <div className="terms_condition_grid text-start">
//                                 <Filter
//                                   filterKeys={[
//                                     "KLA",
//                                     "REPORT_TYPE",
//                                     "COMMITTEE_CATEGORY",
//                                     "REPORT_TITLE",
//                                   ]}
//                                 />
//                                 <ExportButton />
//                                 <div className="buss-cal c-ptag">
//                                   <div className="tabley">
//                                     <div className=""></div>
//                                     <table className="table table myTable2">
//                                       <thead>
//                                         <tr>
//                                           <th scope="col">Sl No</th>
//                                           <th scope="col">Report No.</th>
//                                           <th scope="col">Subject</th>
//                                           <th scope="col">Committee</th>
//                                           <th scope="col">Date Presented</th>
//                                           <th scope="col">Report Type</th>
//                                         </tr>
//                                       </thead>
//                                       <tbody>
//                                         <tr className="committe-page">
//                                           <td>1</td>
//                                           <td>44</td>
//                                           <td>
//                                             <a
//                                               href="https://www.niyamasabha.nic.in/images//15th-KLA-committee-report/LFAC44.pdf"
//                                               target="_blank"
//                                               rel="noreferrer"
//                                             >
//                                               44th Report
//                                             </a>
//                                           </td>
//                                           <td>
//                                             <a
//                                               href="https://www.niyamasabha.nic.in/index.php/committe/index/106"
//                                               target="_blank"
//                                               rel="noreferrer"
//                                             >
//                                               COMMITTEE ON LOCAL FUND ACCOUNTS
//                                             </a>
//                                           </td>
//                                           <td>2023-03-31</td>
//                                           <td>Audit</td>
//                                         </tr>
//                                         <tr className="committe-page">
//                                           <td>2</td>
//                                           <td>43</td>
//                                           <td>
//                                             <a
//                                               href="https://www.niyamasabha.nic.in/images//15th-KLA-committee-report/LFAC43.pdf"
//                                               target="_blank"
//                                               rel="noreferrer"
//                                             >
//                                               43rd Report
//                                             </a>
//                                           </td>
//                                           <td>
//                                             <a
//                                               href="https://www.niyamasabha.nic.in/index.php/committe/index/106"
//                                               target="_blank"
//                                               rel="noreferrer"
//                                             >
//                                               COMMITTEE ON LOCAL FUND ACCOUNTS
//                                             </a>
//                                           </td>
//                                           <td>2023-03-31</td>
//                                           <td>Audit</td>
//                                         </tr>
//                                         <tr className="committe-page">
//                                           <td>3</td>
//                                           <td>42</td>
//                                           <td>
//                                             <a
//                                               href="https://www.niyamasabha.nic.in/images//15th-KLA-committee-report/LFAC42.pdf"
//                                               target="_blank"
//                                               rel="noreferrer"
//                                             >
//                                               42nd Report
//                                             </a>
//                                           </td>
//                                           <td>
//                                             <a
//                                               href="https://www.niyamasabha.nic.in/index.php/committe/index/106"
//                                               target="_blank"
//                                               rel="noreferrer"
//                                             >
//                                               COMMITTEE ON LOCAL FUND ACCOUNTS
//                                             </a>
//                                           </td>
//                                           <td>2023-03-31</td>
//                                           <td>Audit</td>
//                                         </tr>
//                                         <tr className="committe-page">
//                                           <td>314</td>
//                                           <td>1</td>
//                                           <td>
//                                             <a
//                                               href="https://www.niyamasabha.nic.in/images//15th-KLA-committee-report/AdhocCommitteeReport090823.pdf"
//                                               target="_blank"
//                                               rel="noreferrer"
//                                             >
//                                               Report
//                                             </a>
//                                           </td>
//                                           <td>
//                                             <a
//                                               href="https://www.niyamasabha.nic.in/index.php/committe/index/105"
//                                               target="_blank"
//                                               rel="noreferrer"
//                                             >
//                                               Reforming The Practice And
//                                               Procedures Being Followed In
//                                               Kerala Legislative Assembly
//                                             </a>
//                                           </td>
//                                           <td>2023-08-09</td>
//                                           <td>Other</td>
//                                         </tr>
//                                         <tr className="committe-page">
//                                           <td>315</td>
//                                           <td>1</td>
//                                           <td>
//                                             <a
//                                               href="https://www.niyamasabha.nic.in/images//15th-KLA-committee-report/Estimates-1st.pdf"
//                                               target="_blank"
//                                               rel="noreferrer"
//                                             >
//                                               1st Report
//                                             </a>
//                                           </td>
//                                           <td>
//                                             <a
//                                               href="https://www.niyamasabha.nic.in/index.php/committe/index/107"
//                                               target="_blank"
//                                               rel="noreferrer"
//                                             >
//                                               COMMITTEE ON ESTIMATES
//                                             </a>
//                                           </td>
//                                           <td>2022-03-17</td>
//                                           <td>General Report</td>
//                                         </tr>
//                                       </tbody>
//                                     </table>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           ) : null,
//                       },
//                       {
//                         key: "Schedules",
//                         label: "Schedules",
//                         content:
//                           !showCommitteeContent && activeTab === "Schedules" ? (
//                             <div className="bill-content col-md-12 mt30 committeeDt">
//                               <div className="terms_condition_grid text-start">
//                                 <Filter
//                                   filterKeys={[
//                                     "COMMITTEE_CATEGORY",
//                                     "COMMITTEE_NAME",
//                                   ]}
//                                 />
//                                 <ExportButton />
//                                 <div className="buss-cal c-ptag">
//                                   <div className="tabley">
//                                     <table className="table table myTable2">
//                                       <thead>
//                                         <tr>
//                                           <th scope="col">Sl.No</th>
//                                           <th scope="col">Type of Meeting</th>
//                                           <th scope="col">Committee</th>
//                                           <th scope="col">Date from</th>
//                                           <th scope="col">Date To</th>
//                                           <th scope="col">Venue</th>
//                                         </tr>
//                                       </thead>
//                                       <tbody>
//                                         <tr className="committe-page">
//                                           <td>1</td>
//                                           <td>Meeting</td>
//                                           <td>BUSINESS ADVISORY COMMITTEE</td>
//                                           <td>2025-09-03</td>
//                                           <td>2025-09-03</td>
//                                           <td>Committee Room</td>
//                                         </tr>
//                                         <tr className="committe-page">
//                                           <td>2</td>
//                                           <td>Meeting</td>
//                                           <td>COMMITTEE ON ESTIMATES</td>
//                                           <td>2025-09-04</td>
//                                           <td>2025-09-04</td>
//                                           <td>Committee Room</td>
//                                         </tr>
//                                         <tr className="committe-page">
//                                           <td>3</td>
//                                           <td>Sitting</td>
//                                           <td>
//                                             COMMITTEE ON LOCAL FUND ACCOUNTS
//                                           </td>
//                                           <td>2025-09-05</td>
//                                           <td>2025-09-05</td>
//                                           <td>Assembly Secretariat</td>
//                                         </tr>
//                                       </tbody>
//                                     </table>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           ) : null,
//                       },
//                     ]}
//                     activeKey={activeTab}
//                     onChange={(key) => {
//                       setActiveTab(key);
//                       setShowCommitteeContent(false);
//                     }}
//                   />

//                   {showCommitteeContent && <CommitteeContent />}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
