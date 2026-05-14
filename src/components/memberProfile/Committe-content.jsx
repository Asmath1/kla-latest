import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { BreadcrumbNav } from "../common";
import InlinePdfViewer from "../common/InlinePdfViwer";
import { fetchCommitteeById, fetchKlaList } from "../../services/MasterService";
import { getImageUrl, DEMO_API_BASE_URL } from "../../utils/config";
import { FaFilePdf } from "react-icons/fa";

export default function CommitteeContent({ committee }) {
  const [activeTab, setActiveTab] = useState("nav-accountpayment");
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [pdfModalTitle, setPdfModalTitle] = useState("");
  const [committeeData, setCommitteeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportSearchTerm, setReportSearchTerm] = useState("");
  const [selectedReportType, setSelectedReportType] = useState("all");
  const [reportDateFrom, setReportDateFrom] = useState("");
  const [reportDateTo, setReportDateTo] = useState("");
  const [reportCurrentPage, setReportCurrentPage] = useState(1);
  const REPORT_ITEMS_PER_PAGE = 10;
  const [selectedKla, setSelectedKla] = useState(15);
  const [klaOptions, setKlaOptions] = useState([]);
  const [externalReports, setExternalReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(false);

  // Load KLA list for the reports filter
  useEffect(() => {
    fetchKlaList()
      .then((list) => {
        const opts = (list || []).map((k) => ({
          value: k.id,
          label: k.languages?.[0]?.name || `KLA ${k.id}`,
        }));
        setKlaOptions(opts);
      })
      .catch(() => {});
  }, []);

  // Fetch reports from the dedicated API whenever KLA changes
  useEffect(() => {
    let cancelled = false;
    const fetchReports = async () => {
      setReportsLoading(true);
      try {
        const url = `${DEMO_API_BASE_URL}/api/committee-reports?kla_id=${selectedKla}`;
        const res = await fetch(url);
        const json = await res.json();
        if (!cancelled) {
          setExternalReports(json?.reports?.list || []);
          setReportCurrentPage(1);
        }
      } catch (err) {
        console.error("Failed to fetch committee reports:", err);
        if (!cancelled) setExternalReports([]);
      } finally {
        if (!cancelled) setReportsLoading(false);
      }
    };
    fetchReports();
    return () => { cancelled = true; };
  }, [selectedKla]);

  // Fetch committee details when committee prop changes
  useEffect(() => {
    let cancelled = false;

    const loadCommitteeDetails = async () => {
      if (!committee?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchCommitteeById(committee.id);
        if (!cancelled) {
          setCommitteeData(data);
        }
      } catch (err) {
        console.error("Failed to load committee details:", err);
        if (!cancelled) {
          setError(err.message || "Failed to load committee details");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCommitteeDetails();

    return () => {
      cancelled = true;
    };
  }, [committee?.id]);

  // Show loading state
  if (loading) {
    return (
      <div className="rightSide">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading committee details...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="rightSide">
        <div className="alert alert-danger m-4" role="alert">
          <h5>Error Loading Committee</h5>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Show message if no data
  if (!committeeData) {
    return (
      <div className="rightSide">
        <div className="alert alert-info m-4" role="alert">
          No committee data available.
        </div>
      </div>
    );
  }

  const { committee: committeeInfo, members, ex_officio_members, subjects_selected, bills_referred, sittings, schedules, study_tours, press_releases } = committeeData;

  // Reports come from the dedicated committee-reports API (filtered by KLA)
  const reportList = externalReports;
  const normalizedReportSearch = reportSearchTerm.trim().toLowerCase();
  const reportTypes = [
    ...new Set(reportList.map((r) => r?.type).filter(Boolean)),
  ];
  const filteredReports = reportList.filter((report) => {
    const reportType = report?.type;
    const reportDate = report?.date;
    const matchesType = selectedReportType === "all" || reportType === selectedReportType;

    const reportDateValue = reportDate ? new Date(reportDate) : null;
    const reportTime = reportDateValue && !Number.isNaN(reportDateValue.getTime())
      ? reportDateValue.getTime() : null;
    const fromTime = reportDateFrom ? new Date(reportDateFrom).getTime() : null;
    const toTime = reportDateTo ? new Date(`${reportDateTo}T23:59:59`).getTime() : null;

    const matchesDate =
      reportTime === null
        ? !reportDateFrom && !reportDateTo
        : (!fromTime || reportTime >= fromTime) && (!toTime || reportTime <= toTime);

    const matchesSearch =
      !normalizedReportSearch ||
      [report?.reportNo, report?.title, report?.committee, reportType, reportDate]
        .filter(Boolean)
        .some((v) => v.toString().toLowerCase().includes(normalizedReportSearch));

    return matchesType && matchesSearch && matchesDate;
  });

  const reportTotalPages = Math.ceil(filteredReports.length / REPORT_ITEMS_PER_PAGE);
  const pagedReports = filteredReports.slice(
    (reportCurrentPage - 1) * REPORT_ITEMS_PER_PAGE,
    reportCurrentPage * REPORT_ITEMS_PER_PAGE
  );
  return (
    <div className="rightSide">
      <BreadcrumbNav
        breadcrumbs={[
          { name: committeeInfo?.category || "Committee", href: "/committees" },
          {
            name: committeeInfo?.name || "Committee Details",
            href: "#",
          },
        ]}
      />
      <section className=" mt-3 mt-lg-0 breadcumb-section pt-0 ">
        <div className="py-3 cta-job-v2 freelancer-single-style mx-auto maxw1700 bdrs16 position-relative overflow-hidden d-flex align-items-center ">
          <img
            className="right-bottom-img wow zoomIn "
            src="/images/Frame8.png"
            alt=""
          />
          <div className="container ">
            <div className="row wow fadeInUp">
              <div className="col-xl-10 mx-auto">
                <div className="position-relative">
                  <div className="list-meta d-lg-flex align-items-end justify-content-between">
                    <div className="wrapperr w-100 d-sm-flex align-items-center">
                      <a
                        className="position-relative freelancer-single-style"
                        href="#"
                      >
                        <img
                          className=""
                          src={committeeInfo?.chairperson?.image ? getImageUrl(committeeInfo.chairperson.image) : "/images/user.svg"}
                          width={120}
                          alt={committeeInfo?.chairperson?.name || "Chairperson"}
                        />
                      </a>
                      <div className="container p-0">
                        <div className="row">
                          <div className="col-md-12 mb-3 mb-lg-0 p-0 ms-2">
                            <div className="ml30 ml0-xs mt15-sm committe-member">
                              <small>Committee :</small>
                              <h6 className="title">
                                {committeeInfo?.name || "N/A"}
                              </h6>
                              <small>Chairperson :</small>
                              <h6 className="mb-2 text-th">
                                {committeeInfo?.chairperson?.name || "N/A"}
                              </h6>
                              <small>Date of Constitution :</small>
                              <div className="d-flex align-items-center">
                                <h6 className="list-inline-item mb-0 text-thm">
                                  {committeeInfo?.date_of_constitution ? new Date(committeeInfo.date_of_constitution).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                  }) : "N/A"}
                                </h6>
                                <h6 className="list-inline-item mb-0 bdrl-eunry pl15 text-thm">
                                  {committeeInfo?.kla || "N/A"}
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
        </div>
      </section>

      <section className="pt30 pb50 pb30-md represent">
        <div className="container p-0">
          <div
            className="row memberPro wow fadeInUp mt10"
            data-wow-delay="300ms"
          >
            <div className="col-12">
              <div className="horiz-tab">
                <div className="widget_list">
                  <nav>
                    <div
                      className="nav flex-row nav-tabs text-start"
                      id="nav-tab"
                      role="tablist"
                    >
                      <button
                        className={`nav-link text-start ${
                          activeTab === "nav-accountpayment" ? "active" : ""
                        }`}
                        id="nav-accountpayment-tab"
                        onClick={() => setActiveTab("nav-accountpayment")}
                        type="button"
                        role="tab"
                        aria-controls="nav-accountpayment"
                        aria-selected={activeTab === "nav-accountpayment"}
                      >
                        <span>Introduction</span>
                      </button>
                      <button
                        className={`nav-link text-start ${
                          activeTab === "nav-exofficio" ? "active" : ""
                        }`}
                        id="nav-exofficio-tab"
                        onClick={() => setActiveTab("nav-exofficio")}
                        type="button"
                        role="tab"
                        aria-controls="nav-exofficio"
                        aria-selected={activeTab === "nav-exofficio"}
                      >
                        <span>Ex-Officio</span>
                      </button>
                      <button
                        className={`nav-link text-start ${
                          activeTab === "nav-manageother" ? "active" : ""
                        }`}
                        id="nav-manageother-tab"
                        onClick={() => setActiveTab("nav-manageother")}
                        type="button"
                        role="tab"
                        aria-controls="nav-manageother"
                        aria-selected={activeTab === "nav-manageother"}
                      >
                        <span>Members</span>
                      </button>
                      <button
                        className={`nav-link text-start ${
                          activeTab === "nav-gist" ? "active" : ""
                        }`}
                        id="nav-gist-tab"
                        onClick={() => setActiveTab("nav-gist")}
                        type="button"
                        role="tab"
                        aria-controls="nav-gist"
                        aria-selected={activeTab === "nav-gist"}
                      >
                        <span>Subject Selected</span>
                      </button>
                      <button
                        className={`nav-link text-start ${
                          activeTab === "nav-attendace" ? "active" : ""
                        }`}
                        id="nav-attendace-tab"
                        onClick={() => setActiveTab("nav-attendace")}
                        type="button"
                        role="tab"
                        aria-controls="nav-attendace"
                        aria-selected={activeTab === "nav-attendace"}
                      >
                        <span>Bill Referred</span>
                      </button>
                      <button
                        className={`nav-link text-start ${
                          activeTab === "nav-debates" ? "active" : ""
                        }`}
                        id="nav-debates-tab"
                        onClick={() => setActiveTab("nav-debates")}
                        type="button"
                        role="tab"
                        aria-controls="nav-debates"
                        aria-selected={activeTab === "nav-debates"}
                      >
                        <span>Sitting</span>
                      </button>
                      <button
                        className={`nav-link text-start ${
                          activeTab === "nav-special" ? "active" : ""
                        }`}
                        id="nav-special-tab"
                        onClick={() => setActiveTab("nav-special")}
                        type="button"
                        role="tab"
                        aria-controls="nav-special"
                        aria-selected={activeTab === "nav-special"}
                      >
                        <span>Shedules</span>
                      </button>
                      <button
                        className={`nav-link text-start ${
                          activeTab === "nav-question" ? "active" : ""
                        }`}
                        id="nav-question-tab"
                        onClick={() => setActiveTab("nav-question")}
                        type="button"
                        role="tab"
                        aria-controls="nav-question"
                        aria-selected={activeTab === "nav-question"}
                      >
                        <span>Study Tours</span>
                      </button>
                      <button
                        className={`nav-link text-start ${
                          activeTab === "nav-membership" ? "active" : ""
                        }`}
                        id="nav-membership-tab"
                        onClick={() => setActiveTab("nav-membership")}
                        type="button"
                        role="tab"
                        aria-controls="nav-membership"
                        aria-selected={activeTab === "nav-membership"}
                      >
                        <span>Reports Presented</span>
                      </button>
                      <button
                        className={`nav-link text-start ${
                          activeTab === "nav-govtbill" ? "active" : ""
                        }`}
                        id="nav-govtbill-tab"
                        onClick={() => setActiveTab("nav-govtbill")}
                        type="button"
                        role="tab"
                        aria-controls="nav-govtbill"
                        aria-selected={activeTab === "nav-govtbill"}
                      >
                        <span>Press Release</span>
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt30 committeeDt">
              <div className="terms_condition_grid text-start">
                <div className="tab-content" id="nav-tabContent">
                  {/* Introduction Tab */}
                  <div
                    className={`tab-pane fade ${
                      activeTab === "nav-accountpayment" ? "show active" : ""
                    }`}
                    id="nav-accountpayment"
                    role="tabpanel"
                    aria-labelledby="nav-accountpayment-tab"
                  >
                    <div className="grids">
                      <h4 className="tabDet title mb20">Introduction</h4>
                      <div className="c-ptag">
                        <p>
                          {committeeInfo?.introduction || "No introduction available."}
                        </p>
                        
                        {committeeInfo?.officers && committeeInfo.officers.length > 0 && (
                          <div className="border-0 basicD">
                            <h6 className="title mb30 mt20">Officers</h6>
                            <div className="mb30">
                              {committeeInfo.officers.map((officer, index) => (
                                <div key={index} className="singleD mb10">
                                  <img src={officer.image ? getImageUrl(officer.image) : "/images/user.svg"} alt={officer.name} />
                                  <div className="ryt">
                                    <h5>
                                      {officer.name} {officer.phone && <span>| {officer.phone}</span>}
                                    </h5>
                                    <h6>{officer.designation}</h6>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {committeeInfo?.contact && (
                          <div className="border-0 basicD">
                            <h6 className="title mb30 mt20">Contact Details</h6>
                            <div className="mb30">
                              {committeeInfo.contact.phone && (
                                <div className="singleD mb20">
                                  <img src="/images/location.svg" alt="Phone" />
                                  <div className="ryt">
                                    <h6>Phone</h6>
                                    <h5>{committeeInfo.contact.phone}</h5>
                                  </div>
                                </div>
                              )}
                              {committeeInfo.contact.email && (
                                <div className="singleD mb20">
                                  <img src="/images/location.svg" alt="Email" />
                                  <div className="ryt">
                                    <h6>Email</h6>
                                    <h5>{committeeInfo.contact.email}</h5>
                                  </div>
                                </div>
                              )}
                              {committeeInfo.contact.address && (
                                <div className="singleD mb20">
                                  <img src="/images/location.svg" alt="Address" />
                                  <div className="ryt">
                                    <h6>Address</h6>
                                    <h5>{committeeInfo.contact.address}</h5>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ------------Ex-Officio------------- */}
                  <div
                    className={`tab-pane fade cMember ${
                      activeTab === "nav-exofficio" ? "show active" : ""
                    }`}
                    id="nav-exofficio"
                    role="tabpanel"
                    aria-labelledby="nav-exofficio-tab"
                  >
                    <div className="grids votingResult">
                      <h4 className="tabDet title mb20">Ex-Officio List</h4>
                      
                      {ex_officio_members && ex_officio_members.length > 0 ? (
                        <div className="row memberList">
                          {ex_officio_members.map((member) => (
                            <div key={member.id} className="col-6 col-sm-6 col-lg-3 col-xl-2">
                              <a href="#">
                                <div className="job-list-style1 bdr1 text-center">
                                  <div className="icon d-flex align-items-center mb20">
                                    <img
                                      className="mx-auto"
                                      src={member.image ? getImageUrl(member.image) : "/images/user.svg"}
                                      alt={member.name}
                                    />
                                  </div>
                                  <div className="details">
                                    <h5 className="mb10">{member.name}</h5>
                                    <h6>{member.position || "Member"}</h6>
                                  </div>
                                </div>
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted">No ex-officio members available.</p>
                      )}
                    </div>
                  </div>

                  {/* Members Tab */}
                  <div
                    className={`tab-pane fade cMember ${
                      activeTab === "nav-manageother" ? "show active" : ""
                    }`}
                    id="nav-manageother"
                    role="tabpanel"
                    aria-labelledby="nav-manageother-tab"
                  >
                    <div className="grids votingResult">
                      <h4 className="tabDet title mb20">Members List</h4>
                      
                      {members && members.length > 0 ? (
                        <div className="row memberList">
                          {members.map((member) => (
                            <div key={member.id} className="col-6 col-sm-6 col-lg-3 col-xl-2">
                              <a href="#">
                                <div className="job-list-style1 bdr1 text-center">
                                  <div className="icon d-flex align-items-center mb20">
                                    <img
                                      className="mx-auto"
                                      src={member.image ? getImageUrl(member.image) : "/images/user.svg"}
                                      alt={member.name}
                                    />
                                  </div>
                                  <div className="details">
                                    <h5 className="mb10">{member.name}</h5>
                                    <h6>{member.position || "Member"}</h6>
                                    {member.constituency && <p className="text-muted small">{member.constituency}</p>}
                                  </div>
                                </div>
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted">No members available.</p>
                      )}
                    </div>
                  </div>

                  {/* Subject Selected Tab */}
                  <div
                    className={`tab-pane fade ${
                      activeTab === "nav-gist" ? "show active" : ""
                    }`}
                    id="nav-gist"
                    role="tabpanel"
                    aria-labelledby="nav-gist-tab"
                  >
                    <div className="grids votingResult">
                      <h4 className="tabDet title mb20">Subject Selected</h4>
                      {subjects_selected && subjects_selected.length > 0 ? (
                        <div className="tabley">
                          <table className="table table myTable2">
                            <thead>
                              <tr>
                                <th scope="col">No</th>
                                <th scope="col">Subject Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">Remarks</th>
                                <th scope="col">Document</th>
                              </tr>
                            </thead>
                            <tbody>
                              {subjects_selected.map((subject, index) => (
                                <tr key={subject.id} className="debate">
                                  <td>{index + 1}</td>
                                  <td>{subject.subject_name}</td>
                                  <td>{subject.department || "N/A"}</td>
                                  <td>{subject.remarks || ""}</td>
                                  <td className="text-center">
                                    {subject.document_url && (
                                      <a 
                                        href="#" 
                                        className="doci"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setSelectedPdfUrl(subject.document_url);
                                          setPdfModalTitle(`${subject.subject_name} - Subject ${index + 1}`);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <img src="/images/document.svg" alt="Document" />
                                      </a>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-muted">No subjects selected available.</p>
                      )}
                    </div>
                  </div>

                  {/* Bills Referred Tab */}
                  <div
                    className={`tab-pane fade ${
                      activeTab === "nav-attendace" ? "show active" : ""
                    }`}
                    id="nav-attendace"
                    role="tabpanel"
                    aria-labelledby="nav-attendace-tab"
                  >
                    <div className="grids votingResult">
                      <h4 className="tabDet title mb20">Bills Referred</h4>
                      {bills_referred && bills_referred.length > 0 ? (
                        <div className="tabley">
                          <table className="table table myTable2">
                            <thead>
                              <tr>
                                <th scope="col">Bill No:</th>
                                <th scope="col">Bill Title</th>
                                <th scope="col">Bill Intro. Date</th>
                                <th scope="col">Remarks</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bills_referred.map((bill) => (
                                <tr key={bill.id} className="debate">
                                  <td>{bill.bill_no}</td>
                                  <td>{bill.bill_title}</td>
                                  <td>
                                    {bill.bill_intro_date ? new Date(bill.bill_intro_date).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric'
                                    }) : "N/A"}
                                  </td>
                                  <td>{bill.remarks || ""}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-muted">No bills referred available.</p>
                      )}
                    </div>
                  </div>

                  {/* Sitting Tab */}
                  <div
                    className={`tab-pane fade ${
                      activeTab === "nav-debates" ? "show active" : ""
                    }`}
                    id="nav-debates"
                    role="tabpanel"
                    aria-labelledby="nav-debates-tab"
                  >
                    <div className="grids votingResult">
                      <h4 className="tabDet title mb20">Sitting</h4>
                      {sittings && sittings.length > 0 ? (
                        <div className="tabley">
                          <table className="table table myTable2">
                            <thead>
                              <tr>
                                <th scope="col">Sl No</th>
                                <th scope="col">Date</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Remarks</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sittings.map((sitting, index) => (
                                <tr key={sitting.id} className="debate">
                                  <td>{index + 1}</td>
                                  <td>
                                    {sitting.date ? new Date(sitting.date).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric'
                                    }) : "N/A"}
                                  </td>
                                  <td>{sitting.subject}</td>
                                  <td>{sitting.remarks || ""}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-muted">No sittings available.</p>
                      )}
                    </div>
                  </div>

                  {/* Schedules Tab */}
                  <div
                    className={`tab-pane fade ${
                      activeTab === "nav-special" ? "show active" : ""
                    }`}
                    id="nav-special"
                    role="tabpanel"
                    aria-labelledby="nav-special-tab"
                  >
                    <div className="grids votingResult">
                      <h4 className="tabDet title mb20">Schedules</h4>
                      {schedules && schedules.length > 0 ? (
                        <div className="tabley">
                          <table className="table table myTable2">
                            <thead>
                              <tr>
                                <th scope="col">Sl No</th>
                                <th scope="col">Type of Meeting</th>
                                <th scope="col">Date From</th>
                                <th scope="col">Date To</th>
                                <th scope="col">Venue</th>
                              </tr>
                            </thead>
                            <tbody>
                              {schedules.map((schedule, index) => (
                                <tr key={schedule.id} className="debate">
                                  <td>{index + 1}</td>
                                  <td>{schedule.type_of_meeting}</td>
                                  <td>
                                    {schedule.date_from ? new Date(schedule.date_from).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric'
                                    }) : "N/A"}
                                  </td>
                                  <td>
                                    {schedule.date_to ? new Date(schedule.date_to).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric'
                                    }) : "N/A"}
                                  </td>
                                  <td>{schedule.venue}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-muted">No schedules available.</p>
                      )}
                    </div>
                  </div>

                  {/* Study Tours Tab */}
                  <div
                    className={`tab-pane fade ${
                      activeTab === "nav-question" ? "show active" : ""
                    }`}
                    id="nav-question"
                    role="tabpanel"
                    aria-labelledby="nav-question-tab"
                  >
                    <div className="grids votingResult">
                      <h4 className="tabDet title mb20">Study Tours</h4>
                      {study_tours && study_tours.length > 0 ? (
                        <div className="tabley">
                          <table className="table table myTable2">
                            <thead>
                              <tr>
                                <th scope="col">Sl No</th>
                                <th scope="col">Tour Subject</th>
                                <th scope="col">Date From</th>
                                <th scope="col">Date to</th>
                                <th>Member Count</th>
                                <th>Places</th>
                              </tr>
                            </thead>
                            <tbody>
                              {study_tours.map((tour, index) => (
                                <tr key={tour.id} className="debate">
                                  <td>{index + 1}</td>
                                  <td>{tour.tour_subject}</td>
                                  <td>
                                    {tour.date_from ? new Date(tour.date_from).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric'
                                    }) : "N/A"}
                                  </td>
                                  <td>
                                    {tour.date_to ? new Date(tour.date_to).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric'
                                    }) : "N/A"}
                                  </td>
                                  <td>{tour.member_count}</td>
                                  <td>{tour.places}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-muted">No study tours available.</p>
                      )}
                    </div>
                  </div>

              {/* Reports Presented Tab -----------------------------TS-------------------------------------start*/}
               <div
                  className={`tab-pane fade ${
                    activeTab === "nav-membership" ? "show active" : ""
                  }`}
                  id="nav-membership"
                  role="tabpanel"
                  aria-labelledby="nav-membership-tab"
                >
                  <div className="grids votingResult">
                    <h4 className="tabDet title mb20">Reports Presented</h4>

                    {reportsLoading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : reportList.length > 0 ? (
                      <>
                        <div className="report-filters mb20">
                          <div className="report-filter-item">
                            <label className="report-filter-label">KLA</label>
                            <select
                              className="form-select"
                              value={selectedKla}
                              onChange={(e) => { setSelectedKla(Number(e.target.value)); setReportCurrentPage(1); }}
                            >
                              {klaOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="report-filter-item">
                            <label className="report-filter-label">Search</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Report no, title, committee..."
                              value={reportSearchTerm}
                              onChange={(e) => { setReportSearchTerm(e.target.value); setReportCurrentPage(1); }}
                            />
                          </div>
                          <div className="report-filter-item">
                            <label className="report-filter-label">Report Type</label>
                            <select
                              className="form-select"
                              value={selectedReportType}
                              onChange={(e) => { setSelectedReportType(e.target.value); setReportCurrentPage(1); }}
                            >
                              <option value="all">All report types</option>
                              {reportTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="report-filter-item">
                            <label className="report-filter-label">From Date</label>
                            <input
                              type="date"
                              className="form-control"
                              value={reportDateFrom}
                              onChange={(e) => { setReportDateFrom(e.target.value); setReportCurrentPage(1); }}
                              placeholder="From Date"
                              aria-label="Filter reports from date"
                              title="From Date"
                            />
                          </div>
                          <div className="report-filter-item">
                            <label className="report-filter-label">To Date</label>
                            <input
                              type="date"
                              className="form-control"
                              value={reportDateTo}
                              onChange={(e) => { setReportDateTo(e.target.value); setReportCurrentPage(1); }}
                              placeholder="To Date"
                              aria-label="Filter reports to date"
                              title="To Date"
                            />
                          </div>
                          <div className="report-filter-actions">
                            <button
                              type="button"
                              className="report-reset-btn"
                              onClick={() => {
                                setReportSearchTerm("");
                                setSelectedReportType("all");
                                setReportDateFrom("");
                                setReportDateTo("");
                                setSelectedKla(15);
                                setReportCurrentPage(1);
                              }}
                            >
                              Reset Filters
                            </button>
                          </div>
                        </div>

                        <div className="report-filter-summary mb15">
                          Showing {filteredReports.length === 0 ? 0 : (reportCurrentPage - 1) * REPORT_ITEMS_PER_PAGE + 1}–{Math.min(reportCurrentPage * REPORT_ITEMS_PER_PAGE, filteredReports.length)} of {filteredReports.length} reports
                        </div>

                        <div className="tabley">
                        <table className="table myTable2">
                          <thead>
                            <tr>
                              <th scope="col">Sl No</th>
                              <th scope="col">Report No.</th>
                              <th scope="col">Title</th>
                              <th scope="col">Committee</th>
                              <th scope="col">Date Presented</th>
                              <th>Report Type</th>
                              <th>PDF</th>
                            </tr>
                          </thead>

                          <tbody>
                            {pagedReports.map((report, index) => (
                              <tr key={report.id} className="debate">
                                <td>{(reportCurrentPage - 1) * REPORT_ITEMS_PER_PAGE + index + 1}</td>
                                <td>{report.reportNo || "N/A"}</td>
                                <td>{report.title || report.subject || "N/A"}</td>
                                <td>{report.committee || "N/A"}</td>

                                <td>
                                  {report.date || report.datePresented
                                    ? new Date(report.date || report.datePresented).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                      })
                                    : "N/A"}
                                </td>

                                <td>{report.type || report.reportType || "N/A"}</td>

                           <td>
                              {report.pdf ? (
                                <a
                                  href={report.pdf}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="View PDF"
                                  className="pdf-icon-link text-danger"
                                >
                                  <FaFilePdf />
                                </a>
                              ) : (
                                <span className="text-muted">—</span>
                              )}
                            </td>
                              </tr>
                            ))}
                            {pagedReports.length === 0 && (
                              <tr>
                                <td colSpan="7" className="text-center text-muted py-4">
                                  No reports match the selected filters.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        </div>

                        {/* ---- Pagination ---- */}
                        {reportTotalPages > 1 && (
                          <div className="mbp_pagination mt30 text-center mb-4">
                            <ul className="page_navigation">
                              <li className={`page-item ${reportCurrentPage === 1 ? "disabled" : ""}`}>
                                <a
                                  className="page-link"
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); if (reportCurrentPage > 1) setReportCurrentPage(reportCurrentPage - 1); }}
                                >
                                  &laquo;
                                </a>
                              </li>
                              {Array.from({ length: reportTotalPages }, (_, i) => i + 1)
                                .filter((p) => p === 1 || p === reportTotalPages || Math.abs(p - reportCurrentPage) <= 1)
                                .reduce((acc, p, idx, arr) => {
                                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                                  acc.push(p);
                                  return acc;
                                }, [])
                                .map((page, idx) =>
                                  page === "..." ? (
                                    <li key={`ellipsis-${idx}`} className="page-item disabled">
                                      <span className="page-link">...</span>
                                    </li>
                                  ) : (
                                    <li key={page} className={`page-item ${page === reportCurrentPage ? "active" : ""}`}>
                                      <a
                                        className="page-link"
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setReportCurrentPage(page); }}
                                      >
                                        {page}
                                      </a>
                                    </li>
                                  )
                                )}
                              <li className={`page-item ${reportCurrentPage === reportTotalPages ? "disabled" : ""}`}>
                                <a
                                  className="page-link"
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); if (reportCurrentPage < reportTotalPages) setReportCurrentPage(reportCurrentPage + 1); }}
                                >
                                  &raquo;
                                </a>
                              </li>
                            </ul>
                            <p className="mt10 mb-0 pagination_page_count text-center">
                              {(reportCurrentPage - 1) * REPORT_ITEMS_PER_PAGE + 1}–{Math.min(reportCurrentPage * REPORT_ITEMS_PER_PAGE, filteredReports.length)} of {filteredReports.length}
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-muted">No reports available for the selected KLA.</p>
                    )}
                  </div>
                </div>
                 {/* Reports Presented Tab --------------------------------TS----------------------------------End*/}

                  {/* Press Release Tab */}
                  <div
                    className={`tab-pane fade ${
                      activeTab === "nav-govtbill" ? "show active" : ""
                    }`}
                    id="nav-govtbill"
                    role="tabpanel"
                    aria-labelledby="nav-govtbill-tab"
                  >
                    <div className="grids votingResult">
                      <h4 className="tabDet title mb20">Press Release</h4>
                      {press_releases && press_releases.length > 0 ? (
                        <div className="tabley">
                          <table className="table table myTable2">
                            <thead>
                              <tr>
                                <th scope="col">Sl No</th>
                                <th scope="col">File Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Document</th>
                              </tr>
                            </thead>
                            <tbody>
                              {press_releases.map((release, index) => (
                                <tr key={release.id} className="debate">
                                  <td>{index + 1}</td>
                                  <td>{release.file_name}</td>
                                  <td>
                                    {release.date ? new Date(release.date).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric'
                                    }) : "N/A"}
                                  </td>
                                  <td className="text-center">
                                    {release.document_url && (
                                      <a 
                                        href="#" 
                                        className="doci"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setSelectedPdfUrl(release.document_url);
                                          setPdfModalTitle(`${release.file_name} - ${release.date}`);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <img src="/images/document.svg" alt="Document" />
                                      </a>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-muted">No press releases available.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Modal */}
      {selectedPdfUrl && createPortal(
        <>
          <div className="modal fade show" style={{ display: "block", zIndex: 9999 }}>
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
                  <InlinePdfViewer
                    fileUrl={selectedPdfUrl}
                    height="85vh"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 9998 }}
            onClick={() => setSelectedPdfUrl(null)}
          ></div>
        </>,
        document.body
      )}
    </div>
  );
}
