import { useEffect, useState } from "react";
import HomeTest from "../Header";
import { BreadcrumbNav, CategoriesNav, SectionTitle, ExportButton } from "../common";
import { motion, AnimatePresence } from "framer-motion";
import InlinePdfViewer from "../common/InlinePdfViwer";
import "./Motions.css";

const Motions = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(
    "Confidence / Non-confidence motions",
  );
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [pdfModalTitle, setPdfModalTitle] = useState("");

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

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const renderConfidenceMotions = () => {
    return (
      <section className="container motion-confidence-section">
        <h3 className="motion-confidence-section-title mb-4">
          Confidence / No Confidence Motions - 14th Kerala Legislative Assembly
        </h3>

        <div className="motion-confidence-content d-flex align-items-start">
          {/* Left Text Section */}
           <div className="motion-confidence-image ms-4">
            <img
              src="/images/non-confidence motion.jpg"
              alt="Kerala Legislative Assembly"
              className=""
            />
          </div>
          <div className="motion-confidence-text-content flex-grow-1">
            <h4 className="motion-confidence-year">2020</h4>

            <p className="motion-confidence-text">
              On <strong>August 24, 2020</strong>, the House granted leave to{" "}
              <strong>Shri V. D. Satheesan MLA</strong> to move the following
              motion:
            </p>

            <p className="motion-confidence-text">
              The motion was discussed on <strong>24th August, 2020</strong> and
              was put to vote and it was declared as lost. When the motion was
              put to vote, <strong>40 Members</strong> voted for it and{" "}
              <strong>87 Members</strong> voted against it. The motion was{" "}
              <strong>declared lost.</strong>
            </p>
          </div>

          {/* Right Image Section */}
          {/* <div className="motion-confidence-image ms-4">
            <img
              src="/images/non-confidence motion.jpg"
              alt="Kerala Legislative Assembly"
              className=""
            />
          </div> */}
        </div>
      </section>
    );
  };

  const renderResolution = () => {
    return <div></div>;
  };

  const MotionRule130 = () => {
    const motions = [
      {
        no: 1,
        date: "18-07-2016",
        mover: "Shri. Pinarayi Vijayan",
        subject:
          "സ്റ്റേറ്റ് ബാങ്ക് ഓഫ് ട്രാവന്‍കൂറിനെ സ്റ്റേറ്റ് ബാങ്ക് ഓഫ് ഇന്ത്യയില്‍ ലയിപ്പിക്കാനുള്ള നീക്കത്തില്‍ നിന്നും പിന്മാറണമെന്ന് റിസര്‍വ് ബാങ്കിനോടും കേന്ദ്ര സര്‍ക്കാറിനോടും ഈ സഭ അഭ്യര്‍ത്ഥിക്കുന്ന കാര്യം ചര്‍ച്ച ചെയ്യണം.",
        // pdfUrl: "/pdf1.pdf",
      },
      {
        no: 2,
        date: "22-11-2016",
        mover: "Shri. A. C. Moideen",
        subject:
          "കേന്ദ്ര സര്‍ക്കാര്‍ 500,1000 രൂപ നോട്ടുകള്‍ അസാധുവാക്കിയത് കാരണം സംസ്ഥാനത്ത് വിവിധ മേഖലയില്‍ പ്രത്യേകിച്ച് സഹകരണ മേഖലയില്‍ സംജാതമായിട്ടുള്ള പ്രതിസന്ധിയും ഗുരുതരമായ സ്ഥിതിവിശേഷവും ഈ സഭയില്‍ ചര്‍ച്ച ചെയ്യണം.",
        // pdfUrl: "/dummy.pdf",
      },
      {
        no: 3,
        date: "08-06-2017",
        mover: "Shri. Pinarayi Vijayan",
        subject:
          "സംസ്ഥാനങ്ങളുടെ അധികാരം കവര്‍ന്ന് കന്നുകാലി കശാപ്പ് ഫലത്തില്‍ വിലക്കിക്കൊണ്ട് കേന്ദ്രസര്‍ക്കാര്‍ പുറപ്പെടുവിച്ച വിജ്ഞാപനംമൂലം സംസ്ഥാനത്തുളവായിരിക്കുന്ന ഗുരുതരമായ സ്ഥിതിവിശേഷം ഇൗ സഭ ചര്‍ച്ച ചെയ്യണം. (Bulletin No.261)",
        // pdfUrl: "/pdff.pdf",
      },
      {
        no: 4,
        date: "30-08-2018",
        mover: "Shri. Pinarayi Vijayan",
        subject:
          "സംസ്ഥാനത്തു പൊതുവിലുണ്ടായ കാലവർഷക്കെടുതി മൂലം ഉളവായിരിക്കുന്ന ഗുരുതരമായ സ്ഥിതിവിശേഷവും പുനർനിർമാണത്തിനായി സ്വീകരിക്കേണ്ട നടപടികളും ഈ സഭ ചർച്ച ചെയ്യണം.",
        // pdfUrl: "/pdf1.pdf",
      },
    ];

    return (
      <section className="container motion-confidence-section">
        <h3 className="motion-confidence-section-title mb-4">
          Motions Under Rule 130
        </h3>

        <div className="mb-3">
          <ExportButton
            data={motions.map(item => ({
              'Serial No': item.no,
              'Date of Discussion': item.date,
              'Name of Mover': item.mover,
              'Subject Matter': item.subject
            }))}
            filename="motions-rule-130"
            title="Motions Under Rule 130"
            exportOptions={["PDF", "Excel", "CSV"]}
            className=""
            buttonClassName="btn btn-secondary dropdown-toggle"
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered myTable2 KLAMPS-table">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Date of Discussion</th>
                <th>Name of Mover</th>
                <th>Subject Matter</th>
              </tr>
            </thead>
            <tbody>
              {motions.map((item) => (
                <tr key={item.no}>
                  <td>{item.no}</td>
                  <td>{item.date}</td>
                  <td>{item.mover}</td>
                  <td>
                    <div className=" motion-member-forms">
                      {item.subject}
                      <a
                        href="#"
                        className=" d-flex align-items-center"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedPdfUrl(item.pdfUrl);
                          setPdfModalTitle(
                            `Motion Under Rule 130 - ${item.date}`,
                          );
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="imgx">
                          <img src="images/file2.svg" width={16} alt="" />
                        </div>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3">
          <em>* 1. Rule No. 137 (till 4-8-1960)</em>
        </p>
      </section>
    );
  };

  const MotionAdopted = () => {
    const motions = [
      {
        no: 1,
        date: "22.11.2016",
        minister: "Sri. Pinarayi Vijayan, Hon. Chief Minister",
        statement: "On Demonetisation of 500 and 1000 notes",
        pdf: "/pdf/motions/2016_demonetisation.pdf",
      },
      {
        no: 2,
        date: "30.08.2018",
        minister: "Sri. Pinarayi Vijayan, Hon. Chief Minister",
        statement:
          "On the Monsoon disaster, the consequences and the steps to be taken for reconstruction of affected regions in the State of Kerala",
        pdf: "/pdf/motions/2018_monsoon_disaster.pdf",
      },
      {
        no: 3,
        date: "30.10.2019",
        minister: "Sri. Pinarayi Vijayan, Hon. Chief Minister",
        statement:
          "The motion to raise a discussion on the Crisis likely to be evolved in the agriculture and small scale industry sectors in the State consequent to the R.C.E.P Agreement.",
        pdf: "/pdf/motions/2019_rcep_crisis.pdf",
      },
    ];

    return (
      <section className="container motion-confidence-section">
        <h3 className="motion-confidence-section-title mb-4">
          Motions Adopted by the House on the Basis of Discussion Under Rule 130
        </h3>

        <div className="table-responsive">
          <table className="table table-bordered myTable2 motion-confidence-table">
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Date</th>
                <th>Name of the Minister</th>
                <th>Statement in PDF Format</th>
              </tr>
            </thead>
            <tbody>
              {motions.map((item) => (
                <tr key={item.no}>
                  <td>{item.no}</td>
                  <td>{item.date}</td>
                  <td>{item.minister}</td>
                  <td>
                    <a
                      href={item.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="motion-confidence-link"
                    >
                      {item.statement}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  const DiscussionRule58 = () => {
    const discussions = [
      {
        no: 1,
        date: "19-10-2016",
        member: "Sri. K S Sabarinadhan",
        subject: "Regarding road accidents and its remedial measures.",
      },
    ];

    return (
      <section className="container motion-confidence-section">
        <h3 className="motion-confidence-section-title mb-4">
          Discussion Under Rule 58
        </h3>

        <div className="table-responsive">
          <table className="table table-bordered myTable2 motion-confidence-table">
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Date</th>
                <th>Member Who Raised the Discussion</th>
                <th>Subject Matter</th>
              </tr>
            </thead>
            <tbody>
              {discussions.map((item) => (
                <tr key={item.no}>
                  <td>{item.no}</td>
                  <td>{item.date}</td>
                  <td>{item.member}</td>
                  <td>{item.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="motion-confidence-note mt-3">* Former Rule No. 57</p>
      </section>
    );
  };

  const DiscussionRule205B = () => {
    const discussions = [
      {
        no: 1,
        date: "26-10-2016",
        member: "Shri. K C Joseph",
        report: "16th Report of the Estimate Committee on MGP",
      },
    ];

    return (
      <section className="container motion-confidence-section">
        <h3 className="motion-confidence-section-title mb-2 text-center">
          Discussion under Rule 205 B
        </h3>

        <div className="table-responsive">
          <table className="table table-bordered myTable2 motion-confidence-table">
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Date</th>
                <th>Member Who Raised the Discussion</th>
                <th>Committee Report</th>
              </tr>
            </thead>
            <tbody>
              {discussions.map((item) => (
                <tr key={item.no}>
                  <td>{item.no}</td>
                  <td>{item.date}</td>
                  <td>{item.member}</td>
                  <td>{item.report}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  const StatementRule300 = () => {
    const statements = [
      {
        date: "12.03.2020",
        minister: "Shri. Pinarayi Vijayan",
        statement: "കൊറോണ വൈറസ് ബാധയുമായി ബന്ധപ്പെട്ട്",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "03.02.2020",
        minister: "Smt K.K. Shailaja Teacher",
        statement: "കൊറോണ വൈറസ് സംബന്ധിച്ച്",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",

        // pdf: "/dummy.pdf",
      },
      {
        date: "21.11.2019",
        minister: "Shri. Pinarayi Vijayan",
        statement: "കേരള പുനര്‍ നിര്‍മാണ വികസന പരിപാടി സംബന്ധിച്ച്",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "04.02.2019",
        minister: "Shri V.S. Sunil Kumar",
        statement:
          "സംസ്ഥാനത്തു കാർഷികമേഖലയിലെ കീടനാശിനികളുടെ അമിതോപയോഗം തടയുന്നതു സംബന്ധിച്ച്",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "11.12.2018",
        minister: "Sri. Pinarayi Vijayan",
        statement:
          "On the decision by the Central Government to begin public-private partnership in the development of International Airport, Thiruvananthapuram",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "06.12.2018",
        minister: "Sri. A K Saseendran",
        statement: "On revise of Auto-Taxi fare",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "29.11.2018",
        minister: "Sri. Pinarayi Vijayan",
        statement:
          "On the massive flood disaster and the survival, relief and reconstruction measures adopted thereafter",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "21.06.2018",
        minister: "Sri. Pinarayi Vijayan",
        statement: "On the Crisis affecting the Plantation Sector",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "19.06.2018",
        minister: "Sri. Pinarayi Vijayan",
        statement:
          "On the devastation due to natural calamities in monsoon season",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "07.06.2018",
        minister: "Sri. V S Sunilkumar",
        statement: "On Agricultural Loan",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "28.03.2018",
        minister: "Sri. K. Raju",
        statement:
          "On the Compensation to legal heirs of victims of attack by fauna",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "20.03.2018",
        minister: "Sri. Pinarayi Vijayan",
        statement: "On Reservation of ST in Government Service",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "25.01.2018",
        minister: "Sri. Pinarayi Vijayan",
        statement:
          "On the relief measures taken by Government after the sudden impact of Okhi Cyclone in Kerala",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "25.01.2018",
        minister: "Sri. A.K. Balan",
        statement: "On the 70th Anniversary of Martyrdom of Mahatma Gandhi",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "09.11.2017",
        minister: "Sri. Pinarayi Vijayan",
        statement: "On Solar Inquiry Commission Report",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "21.08.2017",
        minister: "Sri. Pinarayi Vijayan",
        statement:
          "On Climate change, Rainfall shortage, Rain water Harvesting and Water Conservation",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "27.04.2017",
        minister: "Sri. Pinarayi Vijayan",
        statement: "On Education Loan Repayment Support Scheme",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "01.03.2017",
        minister: "Sri. E. Chandrasekharan",
        statement:
          "On Steps being taken by the Government to face the severe drought in the State",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "03.11.2016",
        minister: "Sri. P Thilothaman",
        statement: "On National Food Security Act",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
      {
        date: "18.07.2016",
        minister: "Sri. Kadakampalli Surendran",
        statement: "Complete Electrification Project",
        pdf: "http://192.168.12.20/kla/images/rule300/rule_300_corona_virus.pdf",
      },
    ];

    return (
      <section className="container motion-confidence-section">
        <h3 className="motion-confidence-section-title mb-2 text-center">
          Statement as per Rule 300
        </h3>

        <div className="table-responsive">
          <table className="table table-bordered myTable2 motion-confidence-table">
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Date</th>
                <th>Name of the Minister</th>
                <th>Statement in PDF Format</th>
              </tr>
            </thead>
            <tbody>
              {statements.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.minister}</td>
                  <td className="motion-pdf-icon">
                    <a
                      href={item.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="motion-confidence-link"
                    >
                      {item.statement}
                    </a>
                    <div className=" library-member-forms">
                      <a
                        href="#"
                        className=" d-flex align-items-center"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedPdfUrl(item.pdf);
                          setPdfModalTitle(`Statement Rule 300 - ${item.date}`);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="imgx">
                          <img src="images/file2.svg" width={16} alt="" />
                        </div>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

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
            { name: "Business", href: "/business" },
            { name: "Motion", href: "/business/Motion" },
          ]}
        />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Motion" />

            <div
              className="row memberPro wow fadeInUp mt10"
              data-wow-delay="300ms"
            >
              <div className="col-12 col-lg-3">
                <div className="vertical-tab">
                  <div className="widget_list">
                    <nav>
                      <div
                        className="nav flex-row nav-tabs text-start"
                        id="nav-tab"
                        role="tablist"
                      >
                        {[
                          "Confidence / Non-confidence motions",
                          "Resolution for removal of speaker Dy. speaker",
                          "Motions under Rule 130",
                          "Motions under Rule 275 Adopted by the House",
                          "Discussion under Rule 58",
                          "Discussion under Rule 205 B",
                          "Discussion under Rule 300",
                        ].map((tab) => (
                          <motion.button
                            key={tab}
                            className={`nav-link text-start ${
                              activeTab === tab ? "active" : ""
                            }`}
                            onClick={() => handleTabChange(tab)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span>
                              {tab
                                .split("-")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1),
                                )
                                .join(" ")}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-9 nh">
                <div className="terms_condition_grid text-start">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="tab-content"
                      id="nav-tabContent"
                    >
                      {activeTab === "Confidence / Non-confidence motions" &&
                        renderConfidenceMotions()}
                      {activeTab ===
                        "Resolution for removal of speaker Dy. speaker" &&
                        renderResolution()}
                      {activeTab === "Motions under Rule 130" &&
                        MotionRule130()}
                      {activeTab ===
                        "Motions under Rule 275 Adopted by the House" &&
                        MotionAdopted()}
                      {activeTab === "Discussion under Rule 58" &&
                        DiscussionRule58()}
                      {activeTab === "Discussion under Rule 205 B" &&
                        DiscussionRule205B()}
                      {activeTab === "Discussion under Rule 300" &&
                        StatementRule300()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Modal */}
        {selectedPdfUrl && (
          <>
            <div className="modal fade show" style={{ display: "block" }}>
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {pdfModalTitle || "PDF Preview"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedPdfUrl(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <InlinePdfViewer fileUrl={selectedPdfUrl} height="85vh" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fade show"
              onClick={() => setSelectedPdfUrl(null)}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Motions;
