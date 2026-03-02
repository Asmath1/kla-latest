import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./MemberProfile.css";
import Calendar from "../Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import {  AnimatePresence } from "framer-motion";
import HomeTest from "../Header";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { BreadcrumbNav, CategoriesNav, SectionTitle } from "../common";
import InlinePdfViewer from "../common/InlinePdfViwer";
import { API_ENDPOINTS, getImageUrl } from "../../utils/config";

// Export Dropdown Component
const ExportDropdown = ({ isOpen, onToggle, onExport }) => {
  return (
    <div className="mydrop dropdown" style={{ position: "relative" }}>
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        Export
      </button>
      {isOpen && (
        <ul
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1000,
            display: "block",
            minWidth: "120px",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            padding: "8px 0",
            margin: "2px 0 0 0",
          }}
        >
          <li>
            <a
              className="dropdown-item"
              href="#"
              style={{
                display: "block",
                padding: "8px 16px",
                textDecoration: "none",
                color: "#333",
                fontSize: "14px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onExport("PDF");
              }}
            >
              PDF
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              style={{
                display: "block",
                padding: "8px 16px",
                textDecoration: "none",
                color: "#333",
                fontSize: "14px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onExport("XML");
              }}
            >
              XML
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export function VotingFilter({
  showKLA = false,
  showConstituency = false,
  showSession = false,
  showDate = false,
  showBusiness = false,
  showType = false,
  showCategory = false,
  isQuestionsSection = false,
}) {
  const [selectedKLA, setSelectedKLA] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const columnClass = isQuestionsSection ? "col-12" : "col-md-3";

  return (
    <div className="row filt">
      {isQuestionsSection ? (
        // For Questions section - display all 5 sections in one row with full width
        <>
          {showKLA && (
            <div className="col-md-2 col-lg-2">
              <div className="form-style1 selectM .mb30">
                <label>Select KLA</label>
                <select
                  className="form-select"
                  value={selectedKLA}
                  onChange={(e) => setSelectedKLA(e.target.value)}
                >
                  <option clas value="">
                    Choose...
                  </option>
                  <option value="16th">16th KLA</option>
                  <option value="15th">15th KLA</option>
                  <option value="14th">14th KLA</option>
                  <option value="13th">13th KLA</option>
                  <option value="12th">12th KLA</option>
                  <option value="11th">11th KLA</option>
                  <option value="10th">10th KLA</option>
                </select>
              </div>
            </div>
          )}

          {showSession && (
            <div className="col-md-2 col-lg-2">
              <div className="form-style1 selectM .mb30">
                <label>Select Session</label>
                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="Session 1">Session 1</option>
                  <option value="Session 2">Session 2</option>
                </select>
              </div>
            </div>
          )}

          {showDate && (
            <div className="col-md-2 col-lg-2">
              <div className="form-style1 selectM .mb30">
                <label>Select Date</label>
                <select
                  className="form-select"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="10/05/2025">10/05/2025</option>
                  <option value="11/05/2025">11/05/2025</option>
                  <option value="12/05/2025">12/05/2025</option>
                  <option value="13/05/2025">13/05/2025</option>
                </select>
              </div>
            </div>
          )}

          {showType && (
            <div className="col-md-3 col-lg-2">
              <div className="form-style1 selectM .mb30">
                <label>Select Type</label>
                <select
                  className="form-select"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="Type 1">Type 1</option>
                  <option value="Type 2">Type 2</option>
                </select>
              </div>
            </div>
          )}

          {showCategory && (
            <div className="col-md-3 col-lg-2">
              <div className="form-style1 selectM .mb30">
                <label>Select Category</label>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                </select>
              </div>
            </div>
          )}
        </>
      ) : (
        // For other sections - use original layout
        <>
          {showKLA && (
            <div className={columnClass}>
              <div className="form-style1 selectM .mb30">
                <label>Select KLA</label>
                <select
                  className="form-select"
                  value={selectedKLA}
                  onChange={(e) => setSelectedKLA(e.target.value)}
                >
                  <option clas value="">
                    Choose...
                  </option>
                  <option value="16th">16th KLA</option>
                  <option value="15th">15th KLA</option>
                  <option value="14th">14th KLA</option>
                  <option value="13th">13th KLA</option>
                  <option value="12th">12th KLA</option>
                  <option value="11th">11th KLA</option>
                  <option value="10th">10th KLA</option>
                </select>
              </div>
            </div>
          )}

          {showConstituency && (
            <div className={columnClass}>
              <div className="form-style1 selectM .mb30">
                <label>Select Constituency</label>
                <select
                  className="form-select"
                  value={selectedConstituency}
                  onChange={(e) => setSelectedConstituency(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="Chadayamangalam">Chadayamangalam</option>
                  <option value="Neyyatinkara">Neyyatinkara</option>
                </select>
              </div>
            </div>
          )}

          {showSession && (
            <div className={columnClass}>
              <div className="form-style1 selectM .mb30">
                <label>Select Session</label>
                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="Session 1">Session 1</option>
                  <option value="Session 2">Session 2</option>
                </select>
              </div>
            </div>
          )}

          {showDate && (
            <div className={columnClass}>
              <div className="form-style1 selectM .mb30">
                <label>Select Date</label>
                <select
                  className="form-select"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="10/05/2025">10/05/2025</option>
                  <option value="11/05/2025">11/05/2025</option>
                  <option value="12/05/2025">12/05/2025</option>
                  <option value="13/05/2025">13/05/2025</option>
                </select>
              </div>
            </div>
          )}

          {showBusiness && (
            <div className={columnClass}>
              <div className="form-style1 selectM .mb30">
                <label>Select Business</label>
                <select
                  className="form-select"
                  value={selectedBusiness}
                  onChange={(e) => setSelectedBusiness(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="Business 1">Business 1</option>
                  <option value="Business 2">Business 2</option>
                </select>
              </div>
            </div>
          )}

          {showType && (
            <div className={columnClass}>
              <div className="form-style1 selectM .mb30">
                <label>Select Type</label>
                <select
                  className="form-select"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="Type 1">Type 1</option>
                  <option value="Type 2">Type 2</option>
                </select>
              </div>
            </div>
          )}

          {showCategory && (
            <div className={columnClass}>
              <div className="form-style1 selectM .mb30">
                <label>Select Category</label>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                </select>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const MemberProfile = () => {
  // get id from route params: Member-list navigates to /member-profile/:id
  const params = useParams();
  const memberId = params?.id;

  // dynamic member state
  const [memberData, setMemberData] = useState(null);
  const [memberLoading, setMemberLoading] = useState(true);
  const [memberError, setMemberError] = useState(null);

  // helper safe accessors
  const getName = (m) =>
    m?.member?.langs?.[0]?.name || m?.member?.name || m?.name || "Unknown";
  const getConstituency = (m) =>
    m?.constituency?.entitle || m?.constituency?.maltitle || m?.constituency || "";
  const getParty = (m) => m?.party?.entitle || m?.party || "";
  const getImage = (m) => {
    const img = m?.member?.image || m?.image_url || m?.member?.image_url || m?.image || "";
    if (!img) return "/images/prof-dummy.png";
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    if (img.startsWith("//")) return `https:${img}`;
    if (img.startsWith("/")) return getImageUrl(img);
    return img;
  };
  const getPhone = (m) => {
    const phone = m?.addresses?.mobile_nos || m?.member?.contact?.phone || m?.phone || "";
    return phone || "---";
  };
  const getEmail = (m) => {
    const email = m?.addresses?.email_ids || m?.member?.contact?.email || m?.email || "";
    return email || "---";
  };
  const getPAName = (m) => m?.addresses?.address_langs?.[0]?.pa_name || "---";
  const getPAPhone = (m) => m?.addresses?.pa_phone || "---";
  const getPAEmail = (m) => m?.addresses?.pa_email || "---";
  const getPermanentAddress = (m) => m?.addresses?.address_langs?.[0]?.permanent_address || "---";
  const getPresentAddress = (m) => m?.addresses?.address_langs?.[0]?.present_address || m?.addresses?.address_langs?.[0]?.mla_address || "---";
  const getMLAAddress = (m) => m?.addresses?.address_langs?.[0]?.mla_address || "---";
  const getOfficeTelephone = (m) => m?.addresses?.office_telephone || "---";

  useEffect(() => {
    let cancelled = false;
    const loadMember = async () => {
      if (!memberId) {
        setMemberLoading(false);
        return;
      }
      setMemberLoading(true);
      setMemberError(null);
      try {
        // First try the member-profile API endpoint
        const profileRes = await fetch(API_ENDPOINTS.MEMBER_PROFILE(memberId));
        const profileJson = await profileRes.json();
        
        if (profileJson?.status && profileJson?.data) {
          if (!cancelled) setMemberData(profileJson.data);
          if (!cancelled) setMemberLoading(false);
          return;
        }

        // Fallback: Get klaId from query string and try kla-members list
        const queryParams = new URLSearchParams(window.location.search);
        const klaId = queryParams.get("kla") || "15";

        const res = await fetch(API_ENDPOINTS.KLA_MEMBERS(klaId));
        const json = await res.json();
        let found = null;

        if (json?.status && Array.isArray(json.data)) {
          found = json.data.find((x) => String(x.id) === String(memberId));
        }

        if (found) {
          if (!cancelled) setMemberData(found);
        } else {
          // Last fallback: try generic member API
          try {
            const r2 = await fetch(API_ENDPOINTS.MEMBER(memberId));
            const j2 = await r2.json();
            if (j2?.status && j2?.data) {
              if (!cancelled) setMemberData(j2.data);
            } else {
              if (!cancelled) setMemberError("Member not found");
            }
          } catch (err) {
            console.error(err);
            if (!cancelled) setMemberError("Member not found");
          }
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setMemberError("Failed to load member");
      } finally {
        if (!cancelled) setMemberLoading(false);
      }
    };

    loadMember();
    return () => {
      cancelled = true;
    };
  }, [memberId]);



  // State for export dropdowns
  const [exportDropdown1Open, setExportDropdown1Open] = useState(false);
  const [exportDropdown2Open, setExportDropdown2Open] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside any dropdown
      const isClickInsideDropdown = event.target.closest(".mydrop");
      if (!isClickInsideDropdown) {
        setExportDropdown1Open(false);
        setExportDropdown2Open(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setExportDropdown1Open(false);
        setExportDropdown2Open(false);
      }
    };

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // Handle export functionality
  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
    // Close both dropdowns after export
    setExportDropdown1Open(false);
    setExportDropdown2Open(false);
    // Add your export logic here
    // For example: downloadFile(format, data);
  };
  const [, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    window.addEventListener("beforeunload", () => {
      setLoading(true);
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", () => {
        setLoading(true);
      });
    };
  }, []);
  const [activeTab, setActiveTab] = useState("basic-details");
  const [selectedKLA, setSelectedKLA] = useState("16th KLA");
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [pdfModalTitle, setPdfModalTitle] = useState("");
  const [selectedConstituency, setSelectedConstituency] =
    useState("Chadayamangalam");
  //   const [selectedSession, setSelectedSession] = useState('Session 1');
  const [debateTab, setDebateTab] = useState("presented");

  // Complete data for basic details - now using API data
  const basicDetails = memberData ? {
    personal: {
      dob: memberData.member?.date_of_birth || "---",
      birthPlace: "---", // Not in API
      fatherName: memberData.member_languages?.[0]?.father_name || "---",
      motherName: memberData.member_languages?.[0]?.mother_name || "---",
      maritalStatus: memberData.spouse ? "Married" : "---",
      marriageDate: "---", // Not in API
      spouseName: memberData.spouse?.name || "---",
      hobbies: memberData.other_details?.hobbies || "---",
      children: {
        sons: memberData.children?.filter(c => c.gender === 'male').map(c => c.name) || ["---"],
        daughters: memberData.children?.filter(c => c.gender === 'female').map(c => c.name) || ["---"],
      },
    },
    address: {
      present: getPresentAddress(memberData),
      permanent: getPermanentAddress(memberData),
    },
    qualifications: {
      education: memberData.qualifications?.map(q => q.qualification).join(", ") || "---",
      profession: memberData.other_details?.profession || "---",
      languages: memberData.languages_known?.map(l => l.language).join(", ") || "---",
    },
    positions: memberData.positions?.map(p => ({
      title: p.position,
      organization: p.organization || "---",
      period: `${p.from_date || "---"}–${p.to_date || "---"}`,
    })) || [
      {
        title: "---",
        organization: "---",
        period: "---",
      },
    ],
  } : {
    personal: {
      dob: "---",
      birthPlace: "---",
      fatherName: "---",
      motherName: "---",
      maritalStatus: "---",
      marriageDate: "---",
      spouseName: "---",
      hobbies: "---",
      children: {
        sons: ["---"],
        daughters: ["---"],
      },
    },
    address: {
      present: "---",
      permanent: "---",
    },
    qualifications: {
      education: "---",
      profession: "---",
      languages: "---",
    },
    positions: [
      {
        title: "---",
        organization: "---",
        period: "---",
      },
    ],
  };


  // Complete data for voting results
  const votingResults = [
    {
      kla: "16th KLA",
      constituency: "Chadayamangalam",
      electorate: "2,01,643",
      votesPolled: "1,47,177",
      candidates: [
        { name: "Smt. J. Chinchurani (C.P.I.)", votes: "67,252", winner: true },
        { name: "Shri M. M. Naseer (I.N.C)", votes: "53,574", winner: false },
        {
          name: "Shri Vishnu Pattathanam (B.J.P)",
          votes: "22,238",
          winner: false,
        },
      ],
    },
    {
      kla: "15th KLA",
      constituency: "Chadayamangalam",
      electorate: "1,98,432",
      votesPolled: "1,42,865",
      candidates: [
        { name: "Smt. J. Chinchurani (C.P.I.)", votes: "7,252", winner: false },
        { name: "Shri M. M. Naseer (I.N.C)", votes: "73,574", winner: true },
        {
          name: "Shri Vishnu Pattathanam (B.J.P)",
          votes: "18,238",
          winner: false,
        },
      ],
    },
  ];

  // Complete data for GIST of Business
  const gistOfBusiness = [
    { session: "Session 1", date: "March 2024", fileUrl: "/images/file2.svg" },
    { session: "Session 2", date: "June 2023", fileUrl: "/images/file2.svg" },
    {
      session: "Session 3",
      date: "December 2022",
      fileUrl: "/images/file2.svg",
    },
    { session: "Session 4", date: "August 2022", fileUrl: "/images/file2.svg" },
  ];

  // Complete data for debates
  const debates = {
    presented: [
      {
        id: 1,
        type: "Debate Under Rule 58",
        date: "12.05.2021",
        title:
          "Need to set up a textiles park in Bhilwara, Rajasthan under PM MITRA Scheme-laid",
        participants: ["J Chinchurani", "Abdul Hameed Master", "A N Shamseer"],
        videoUrl:
          "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
        documentUrl: "/images/document.svg",
      },
      {
        id: 2,
        type: "Debate Under Rule 58",
        date: "25.05.2021",
        title:
          "Need to set up a tex Bhilwara, Rajasthan under PM MITRA Scheme-laid",
        participants: ["J Chinchurani"],
        documentUrl: "/images/document.svg",
        videoUrl:
          "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
      },
      {
        id: 3,
        type: "Debate Under Rule 58",
        date: "12.05.2021",
        title:
          "Need to set up a textiles park in Bhilwara, Rajasthan under PM MITRA Scheme-laid",
        participants: ["J Chinchurani", "Abdul Hameed Master", "A N Shamseer"],
        documentUrl: "/images/document.svg",
        videoUrl:
          "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
      },
      {
        id: 4,
        type: "Debate Under Rule 58",
        date: "12.05.2021",
        title:
          "Need to set up a textiles park in Bhilwara, Rajasthan under PM MITRA Scheme-laid",
        participants: ["J Chinchurani", "Abdul Hameed Master", "A N Shamseer"],
        documentUrl: "/images/document.svg",
        videoUrl:
          "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
      },
      {
        id: 5,
        type: "Debate Under Rule 58",
        date: "26.05.2021",
        title: "Need to set up a tex Bhilwara, Rajasthan",
        participants: ["J Chinchurani"],
        documentUrl: "/images/document.svg",
        videoUrl:
          "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
      },
    ],
    participated: [
      {
        id: 1,
        type: "Debate Under Rule 58",
        date: "12.05.2021",
        title:
          "Need to set up a textiles park in Bhilwara, Rajasthan under PM MITRA Scheme-laid",
        presenter: "A Prabhakaran",
        participants: ["J Chinchurani", "Abdul Hameed Master", "A N Shamseer"],
        documentUrl: "/images/document.svg",
        videoUrl:
          "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
      },
      {
        id: 2,
        type: "Debate Under Rule 58",
        date: "25.05.2021",
        title:
          "Need to set up a tex Bhilwara, Rajasthan under PM MITRA Scheme-laid",
        presenter: "Chittayam Gopakumar",
        participants: ["J Chinchurani"],
        documentUrl: "/images/document.svg",
        videoUrl:
          "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
      },
      {
        id: 3,
        type: "Debate Under Rule 58",
        date: "12.05.2021",
        title:
          "Need to set up a textiles park in Bhilwara, Rajasthan under PM MITRA Scheme-laid",
        presenter: "DR. Mathew Kuzhalnadan",
        participants: ["J Chinchurani", "Abdul Hameed Master", "A N Shamseer"],
        documentUrl: "/images/document.svg",
        videoUrl:
          "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
      },
    ],
  };

  // Complete data for special mentions
  const specialMentions = [
    {
      title:
        "Need to set up a textiles park in Bhilwara, Rajasthan under PM MITRA Scheme-laid",
      date: "12.05.2021",
      participants: "J Chinchurani",
      keywords: "National Highways, Four Lane Road",
      documentUrl: "/images/document.svg",
    },
    {
      title:
        "Need to set up a textiles park in Bhilwara, Rajasthan under PM MITRA Scheme-laid",
      date: "12.05.2021",
      participants: "J Chinchurani",
      keywords: "National Highways, Four Lane Road",
      documentUrl: "/images/document.svg",
    },
  ];

  // Complete data for questions
  const questions = [
    {
      number: "325",
      subject: "Need to set up a textiles park in Bhilwara, Rajasth",
      department: "Kerala Water Authority",
      type: "Starred",
      date: "12.05.2021",
      documentUrl: "/images/document.svg",
    },
    {
      number: "124",
      subject: "Need to set up a textiles park in Bhilwara, Rajasth",
      department: "Kerala Water Authority",
      type: "Unstarred",
      date: "12.05.2021",
      documentUrl: "/images/document.svg",
    },
  ];

  // Complete data for committee membership
  const committeeMembership = [
    {
      id: 1,
      committee: "Water Resources",
      status: "Member",
      fromDate: "12.12.2023",
      toDate: "12.05.2025",
    },
    {
      id: 2,
      committee: "Water Resources",
      status: "Member",
      fromDate: "12.12.2023",
      toDate: "--",
    },
  ];

  // Complete data for government bills
  const governmentBills = [
    {
      id: 1,
      title: "Bhartiya Vayuyan Vidheyak, 2024",
      date: "30.12.2015",
      participants:
        "A K M Ashraf, A K Saseendran, Antony John, Chittayam Gopakumar, E Chandrasekharan, Kadakampally Surendran, K K Ramachandran",
      keywords: "Air India, Airports, Civil Aviation, Natural Calamities",
      documentUrl: "/images/document.svg",
    },
    {
      id: 2,
      title: "Bhartiya Vayuyan Vidheyak, 2024",
      date: "30.12.2015",
      participants:
        "A K M Ashraf, A K Saseendran, Antony John, Chittayam Gopakumar, E Chandrasekharan, Kadakampally Surendran, K K Ramachandran",
      keywords: "Air India, Airports, Civil Aviation, Natural Calamities",
      documentUrl: "/images/document.svg",
    },
  ];

  // Complete data for private bills
  const privateBills = [
    {
      id: 1,
      title: "Bhartiya Vayuyan Vidheyak, 2024",
      date: "30.12.2015",
      participants:
        "A K M Ashraf, A K Saseendran, Antony John, Chittayam Gopakumar, E Chandrasekharan, Kadakampally Surendran, K K Ramachandran",
      keywords: "Air India, Airports, Civil Aviation, Natural Calamities",
      documentUrl: "/images/document.svg",
    },
    {
      id: 2,
      title: "Bhartiya Vayuyan Vidheyak, 2024",
      date: "30.12.2015",
      participants:
        "A K M Ashraf, A K Saseendran, Antony John, Chittayam Gopakumar, E Chandrasekharan, Kadakampally Surendran, K K Ramachandran",
      keywords: "Air India, Airports, Civil Aviation, Natural Calamities",
      documentUrl: "/images/document.svg",
    },
  ];

  // Complete data for tours
  const tours = [
    {
      id: 1,
      country: "Canada",
      purpose: "Lorem ipsum donki montbt thaiod hoplih",
      fromDate: "12.10.2021",
      toDate: "16.10.2021",
    },
    {
      id: 2,
      country: "Canada",
      purpose: "Lorem ipsum donki montbt thaiod hoplih",
      fromDate: "12.10.2021",
      toDate: "16.10.2021",
    },
    {
      id: 3,
      country: "Canada",
      purpose: "Lorem ipsum donki montbt thaiod hoplih",
      fromDate: "12.10.2021",
      toDate: "16.10.2021",
    },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const legendItems = [
    { type: "house-in-session2", label: "House In Session" },
    { type: "present", label: "Present" },
    { type: "absent", label: "Absent" },
  ];

  const customEvents = {
    5: [
      {
        type: "house-in-session2",
        title: "House Session",
      },
    ],
    12: [
      {
        type: "present",
        title: "Present in Session",
      },
    ],
    18: [
      {
        type: "absent",
        title: "Absent from Session",
      },
    ],
    25: [
      {
        type: "present",
        title: "Present in Committee Meeting",
      },
    ],
  };

  const renderBasicDetails = () => {
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
                        <h5>{getPAName(memberData)}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb30">
                    <div className="singleD">
                      <img src="/images/phone-call.svg" alt="" />
                      <div className="ryt">
                        <h6>Phone</h6>
                        <h5>{getPAPhone(memberData)}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb30">
                    <div className="singleD">
                      <img src="/images/envelope.svg" alt="" />
                      <div className="ryt">
                        <h6>Email</h6>
                        <h5>{getPAEmail(memberData)}</h5>
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
                    <p>---</p>
                  </div>
                  <div className="m-circle  text-thm">★</div>
                  <div className="wrapper mb40 position-relative">
                    <span className="tag">1985–1990</span>
                    <h6 className="mt15  mb5">Vice President</h6>
                    <p>---</p>
                  </div>
                  <div className="m-circle  text-thm">★</div>
                  <div className="wrapper mb40 position-relative">
                    <span className="tag">1985–1990</span>
                    <h6 className="mt15 mb5">Member</h6>
                    <p>---</p>
                  </div>
                </div>
              </div>
            </div>
            <h6 className="title mb30 pt40">Other Positions Held</h6>
            <div className="row">
              <div className="singleD">
                <div className="ryt">
                  <p className="otherpo">
                    ---
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVotingResults = () => {
    const filteredResults = votingResults.filter(
      (result) =>
        result.kla === selectedKLA &&
        result.constituency === selectedConstituency
    );

    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb10">Voting Results</h4>
        <VotingFilter
          showKLA={true}
          showConstituency={true}
          selectedKLA={selectedKLA}
          setSelectedKLA={setSelectedKLA}
          selectedConstituency={selectedConstituency}
          setSelectedConstituency={setSelectedConstituency}
        />
        <div className="row">
          <div className="col-md-6" />

          {filteredResults.map((result, resultIndex) => (
            <div className="row" key={resultIndex}>
              <motion.div
                className="col-6 col-sm-6 col-md-4 col-lg-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="funfact-style1 bdrs16 text-center ms-md-auto">
                  <ul className="ps-0 mb-0 d-flex justify-content-center">
                    <li>
                      <div className="timer title mb15">
                        {result.electorate}
                      </div>
                    </li>
                  </ul>
                  <p className="voting-poll-content fz16 dark-color ">
                    Electorate
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="col-6 col-sm-6 col-md-4 col-lg-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="funfact-style1 bdrs16 text-center ms-md-auto">
                  <ul className="ps-0 mb-0 d-flex justify-content-center">
                    <li>
                      <div className="timer title mb15">
                        {result.votesPolled}
                      </div>
                    </li>
                  </ul>
                  <p className="voting-poll-content fz16 dark-color ">
                    Votes Polled
                  </p>
                </div>
              </motion.div>

              {result.candidates.map((candidate, candidateIndex) => (
                <motion.div
                  className="col-6 col-sm-6 col-md-4 col-lg-3"
                  key={candidateIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + candidateIndex * 0.1,
                  }}
                >
                  <div
                    className={`funfact-style1 bdrs16 text-center ms-md-auto ${
                      candidate.winner
                        ? "win"
                        : candidate.votes < 10000
                        ? "fail"
                        : ""
                    }`}
                  >
                    <ul className="ps-0 mb-0 d-flex justify-content-center">
                      <li>
                        <div className="timer title mb15">
                          {candidate.votes}
                        </div>
                      </li>
                    </ul>
                    <p className="voting-poll-content fz16 dark-color ">
                      {candidate.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGistOfBusiness = () => {
    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb20">GIST of Business</h4>
        <VotingFilter
          showKLA={true}
          selectedKLA={selectedKLA}
          setSelectedKLA={setSelectedKLA}
          selectedConstituency={selectedConstituency}
          setSelectedConstituency={setSelectedConstituency}
        />
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-8" />

          {gistOfBusiness.map((session, index) => (
            <div className="col-md-4 col-6 col-lg-3 mb-2" key={index}>
              <div className="session card">
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPdfUrl(session.pdfUrl || "/pdf1.pdf");
                    setPdfModalTitle(`${session.session} - ${session.date}`);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div>
                    <h6>{session.session}</h6>
                    <p>{session.date}</p>
                  </div>
                  <div className="imgx">
                    <img
                      src={session.fileUrl || "/placeholder.svg"}
                      width={15}
                      alt=""
                    />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAttendance = () => {
    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb20">Attendance</h4>
        <VotingFilter
          showKLA={true}
          showSession={true}
          selectedKLA={selectedKLA}
          setSelectedKLA={setSelectedKLA}
          selectedConstituency={selectedConstituency}
          setSelectedConstituency={setSelectedConstituency}
        />
        <div className="row">
          <Calendar
            legendItems={legendItems}
            customEvents={customEvents}
            monthsSidebarClass="custom-months-sidebar"
            eventSidebarClass="custom-event-sidebar"
            monthsSidebarToggle="months-sidebar-toggle"
            calendarMainContainer="calendar-container-back"
            calendarContainer="cal-container"
            calendarHeaderMember="calendar-header-member"
          />
        </div>
      </div>
    );
  };

  const renderDebates = () => {
    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb20">Debate</h4>
        <VotingFilter
          showKLA={true}
          showSession={true}
          showDate={true}
          showBusiness={true}
          selectedKLA={selectedKLA}
          setSelectedKLA={setSelectedKLA}
          selectedConstituency={selectedConstituency}
          setSelectedConstituency={setSelectedConstituency}
        />
        <div className="row">
          <div className="col-md-9" />
          <div className="col-12">
            <div className="navtab-style1">
              <nav>
                <div className="nav nav-tabs mb20" id="nav-tab2" role="tablist">
                  <motion.button
                    className={`nav-link fw600 ${
                      debateTab === "presented" ? "active" : ""
                    }`}
                    onClick={() => setDebateTab("presented")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Presented
                  </motion.button>
                  <motion.button
                    className={`nav-link fw600 ${
                      debateTab === "participated" ? "active" : ""
                    }`}
                    onClick={() => setDebateTab("participated")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Participated
                  </motion.button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <AnimatePresence mode="wait">
                  {debateTab === "presented" && (
                    <motion.div
                      key="presented"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="tab-pane fade show active fz15 text"
                    >
                      <div className="tabley">
                        <ExportDropdown
                          isOpen={exportDropdown1Open}
                          onToggle={() =>
                            setExportDropdown1Open(!exportDropdown1Open)
                          }
                          onExport={handleExport}
                        />
                        <table className="table table myTable2">
                          <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">Type</th>
                              <th scope="col">Date</th>
                              <th scope="col">Title</th>
                              <th scope="col">Participants</th>
                              <th scope="col">Video</th>
                              <th scope="col">Document</th>
                            </tr>
                          </thead>
                          <tbody>
                            {debates.presented.map((debate) => (
                              <tr className="debate" key={debate.id}>
                                <td>{debate.id}</td>
                                <td>{debate.type}</td>
                                <td>{debate.date}</td>
                                <td>{debate.title}</td>
                                <td>
                                  {debate.participants.map(
                                    (participant, index) => (
                                      <React.Fragment key={index}>
                                        <a href="#">{participant}</a>
                                        {index <
                                          debate.participants.length - 1 &&
                                          ", "}
                                      </React.Fragment>
                                    )
                                  )}
                                </td>
                                <td className="text-center">
                                  <a
                                    href={debate.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="vLink"
                                  >
                                    Video Link
                                  </a>
                                </td>
                                <td className="text-center">
                                  <a 
                                    href="#" 
                                    className="doci"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setSelectedPdfUrl(debate.pdfUrl || "/pdf1.pdf");
                                      setPdfModalTitle(`${debate.type} - ${debate.date}`);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <img
                                      src={
                                        debate.documentUrl || "/placeholder.svg"
                                      }
                                      alt=""
                                    />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mbp_pagination mt30 text-center">
                          <ul className="page_navigation">
                            <li className="page-item">
                              <a className="page-link" href="#">
                                <FontAwesomeIcon
                                  icon={faAngleLeft}
                                  color="#222222"
                                />
                              </a>
                            </li>
                            <li
                              className="page-item active"
                              aria-current="page"
                            >
                              <a className="page-link" href="#">
                                1 <span className="sr-only">(current)</span>
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                2
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                3
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                4
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                5
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                <FontAwesomeIcon
                                  icon={faAngleRight}
                                  color="#222222"
                                />
                              </a>
                            </li>
                          </ul>
                          <p className="mt10 mb-0 pagination_page_count text-center">
                            1 – 5 of 5
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {debateTab === "participated" && (
                    <motion.div
                      key="participated"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="tab-pane fade show active fz15 text"
                    >
                      <div className="tabley">
                        <table className="table table myTable2">
                          <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">Type</th>
                              <th scope="col">Date</th>
                              <th scope="col">Title</th>
                              <th scope="col">Presented</th>
                              <th scope="col">Participants</th>
                              <th scope="col">Video</th>
                              <th scope="col">Document</th>
                            </tr>
                          </thead>
                          <tbody>
                            {debates.participated.map((debate) => (
                              <tr className="debate" key={debate.id}>
                                <td>{debate.id}</td>
                                <td>{debate.type}</td>
                                <td>{debate.date}</td>
                                <td>{debate.title}</td>
                                <td>{debate.presenter}</td>
                                <td>
                                  {debate.participants.map(
                                    (participant, index) => (
                                      <React.Fragment key={index}>
                                        <a href="#">{participant}</a>
                                        {index <
                                          debate.participants.length - 1 &&
                                          ", "}
                                      </React.Fragment>
                                    )
                                  )}
                                </td>
                                <td>
                                  <a
                                    href="https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0"
                                    class="vLink"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Video Link
                                  </a>
                                </td>
                                <td className="text-center">
                                  <a 
                                    href="#" 
                                    className="doci"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setSelectedPdfUrl(debate.pdfUrl || "/dummy.pdf");
                                      setPdfModalTitle(`${debate.type} - ${debate.date}`);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <img
                                      src={
                                        debate.documentUrl || "/placeholder.svg"
                                      }
                                      alt=""
                                    />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mbp_pagination mt30 text-center">
                          <ul className="page_navigation">
                            <li className="page-item">
                              <a className="page-link" href="#">
                                <FontAwesomeIcon
                                  icon={faAngleLeft}
                                  color="#222222"
                                />
                              </a>
                            </li>
                            <li
                              className="page-item active"
                              aria-current="page"
                            >
                              <a className="page-link" href="#">
                                1 <span className="sr-only">(current)</span>
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                <FontAwesomeIcon
                                  icon={faAngleRight}
                                  color="#222222"
                                />
                              </a>
                            </li>
                          </ul>
                          <p className="mt10 mb-0 pagination_page_count text-center">
                            1 – 3 of 3
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSpecialMentions = () => {
    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb20">Special Mentions</h4>
        <VotingFilter
          showKLA={true}
          showSession={true}
          showDate={true}
          showBusiness={true}
          selectedKLA={selectedKLA}
          setSelectedKLA={setSelectedKLA}
          selectedConstituency={selectedConstituency}
          setSelectedConstituency={setSelectedConstituency}
        />
        <div className="row">
          <div className="col-md-9" />
          <div className="col-12">
            <div className="tabley">
              <ExportDropdown
                isOpen={exportDropdown2Open}
                onToggle={() => setExportDropdown2Open(!exportDropdown2Open)}
                onExport={handleExport}
              />
              <table className="table table myTable2">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Date</th>
                    <th scope="col">Participants</th>
                    <th scope="col">Reference Keywords</th>
                    <th scope="col">Document</th>
                  </tr>
                </thead>
                <tbody>
                  {specialMentions.map((mention, index) => (
                    <tr className="debate" key={index}>
                      <td>{mention.title}</td>
                      <td>{mention.date}</td>
                      <td>{mention.participants}</td>
                      <td>{mention.keywords}</td>
                      <td className="text-center">
                        <a 
                          href="#" 
                          className="doci"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedPdfUrl(mention.pdfUrl || "/pdff.pdf");
                            setPdfModalTitle(`${mention.title} - ${mention.date}`);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <img
                            src={mention.documentUrl || "/placeholder.svg"}
                            alt=""
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mbp_pagination mt30 text-center">
                <ul className="page_navigation">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <FontAwesomeIcon icon={faAngleLeft} color="#222222" />
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">
                      1 <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <FontAwesomeIcon icon={faAngleRight} color="#222222" />
                    </a>
                  </li>
                </ul>
                <p className="mt10 mb-0 pagination_page_count text-center">
                  1 – 2 of 2
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderQuestions = () => {
    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb20">Questions</h4>
        <VotingFilter
          showKLA={true}
          showSession={true}
          showDate={true}
          showType={true}
          showCategory={true}
          selectedKLA={selectedKLA}
          setSelectedKLA={setSelectedKLA}
          selectedConstituency={selectedConstituency}
          setSelectedConstituency={setSelectedConstituency}
          isQuestionsSection={true}
        />
        <div className="row">
          <div className="col-12">
            <div className="tabley">
              <div className="page_control_shorting mb10 d-flex align-items-center justify-content-start">
                <div className="pcs_dropdown dark-color pr10 pr0-xs">
                  <span>Download</span>
                  <select className="selectpicker show-tick">
                    <option>PDF</option>
                    <option>XML</option>
                    <option>Doc</option>
                  </select>
                </div>
              </div>

              <table className="table table myTable2">
                <thead>
                  <tr>
                    <th scope="col">Qs. No</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Department</th>
                    <th scope="col">Type</th>
                    <th scope="col">Date</th>
                    <th scope="col">Document</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question, index) => (
                    <tr className="debate" key={index}>
                      <td>{question.number}</td>
                      <td>{question.subject}</td>
                      <td>{question.department}</td>
                      <td>
                        <p className={`${question.type.toLowerCase()} mx-auto`}>
                          {question.type}
                        </p>
                      </td>
                      <td>{question.date}</td>
                      <td className="text-center">
                        <a 
                          href="#" 
                          className="doci"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedPdfUrl(question.pdfUrl || "/pdf1.pdf");
                            setPdfModalTitle(`Question ${question.number} - ${question.date}`);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <img
                            src={question.documentUrl || "/placeholder.svg"}
                            alt=""
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mbp_pagination mt30 text-center">
                <ul className="page_navigation">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <FontAwesomeIcon icon={faAngleLeft} color="#222222" />
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">
                      1 <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <FontAwesomeIcon icon={faAngleRight} color="#222222" />
                    </a>
                  </li>
                </ul>
                <p className="mt10 mb-0 pagination_page_count text-center">
                  1 – 2 of 2
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCommitteeMembership = () => {
    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb20">Committee Membership</h4>
        <VotingFilter
          showKLA={true}
          selectedKLA={selectedKLA}
          setSelectedKLA={setSelectedKLA}
          selectedConstituency={selectedConstituency}
          setSelectedConstituency={setSelectedConstituency}
        />
        <div className="row">
          <div className="col-md-9" />
          <div className="col-12">
            <div className="tabley">
              <table className="table table myTable2">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Committee</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date From</th>
                    <th scope="col">Date To</th>
                  </tr>
                </thead>
                <tbody>
                  {committeeMembership.map((membership) => (
                    <tr className="debate" key={membership.id}>
                      <td>{membership.id}</td>
                      <td>{membership.committee}</td>
                      <td>{membership.status}</td>
                      <td>{membership.fromDate}</td>
                      <td>{membership.toDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mbp_pagination mt30 text-center">
                <ul className="page_navigation">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <FontAwesomeIcon icon={faAngleLeft} color="#222222" />
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">
                      1 <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <FontAwesomeIcon icon={faAngleRight} color="#222222" />
                    </a>
                  </li>
                </ul>
                <p className="mt10 mb-0 pagination_page_count text-center">
                  1 – 2 of 2
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGovernmentBills = () => {
    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb20">Government Bills</h4>
        <VotingFilter
          showKLA={true}
          selectedKLA={selectedKLA}
          setSelectedKLA={setSelectedKLA}
          selectedConstituency={selectedConstituency}
          setSelectedConstituency={setSelectedConstituency}
        />
        <div className="row">
          <div className="col-md-9" />
          <div className="col-12">
            <div className="tabley">
              <table className="table table myTable2">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Title</th>
                    <th scope="col">Date</th>
                    <th scope="col">Participants</th>
                    <th scope="col">Reference Keywords</th>
                    <th scope="col">Document</th>
                  </tr>
                </thead>
                <tbody>
                  {governmentBills.map((bill) => (
                    <tr className="debate" key={bill.id}>
                      <td>{bill.id}</td>
                      <td>{bill.title}</td>
                      <td>{bill.date}</td>
                      <td>{bill.participants}</td>
                      <td>{bill.keywords}</td>
                      <td className="text-center">
                        <a 
                          href="#" 
                          className="doci"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedPdfUrl(bill.pdfUrl || "/dummy.pdf");
                            setPdfModalTitle(`Government Bill - ${bill.title}`);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <img
                            src={bill.documentUrl || "/placeholder.svg"}
                            alt=""
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mbp_pagination mt30 text-center">
                <ul className="page_navigation">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <FontAwesomeIcon icon={faAngleLeft} color="#222222" />
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">
                      1 <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <FontAwesomeIcon icon={faAngleRight} color="#222222" />
                    </a>
                  </li>
                </ul>
                <p className="mt10 mb-0 pagination_page_count text-center">
                  1 – 2 of 2
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPrivateBills = () => {
    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb20">Private Bills</h4>
        <div className="row">
          <VotingFilter
            showKLA={true}
            selectedKLA={selectedKLA}
            setSelectedKLA={setSelectedKLA}
            selectedConstituency={selectedConstituency}
            setSelectedConstituency={setSelectedConstituency}
          />
          <div className="col-md-3"></div>
          <div className="col-md-9" />
          <div className="col-12">
            <div className="tabley">
              <table className="table table myTable2">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Title</th>
                    <th scope="col">Date</th>
                    <th scope="col">Participants</th>
                    <th scope="col">Reference Keywords</th>
                    <th scope="col">Document</th>
                  </tr>
                </thead>
                <tbody>
                  {privateBills.map((bill) => (
                    <tr className="debate" key={bill.id}>
                      <td>{bill.id}</td>
                      <td>{bill.title}</td>
                      <td>{bill.date}</td>
                      <td>{bill.participants}</td>
                      <td>{bill.keywords}</td>
                      <td className="text-center">
                        <a 
                          href="#" 
                          className="doci"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedPdfUrl(bill.pdfUrl || "/pdff.pdf");
                            setPdfModalTitle(`Private Bill - ${bill.title}`);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <img
                            src={bill.documentUrl || "/placeholder.svg"}
                            alt=""
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mbp_pagination mt30 text-center">
                <ul className="page_navigation">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <FontAwesomeIcon icon={faAngleLeft} color="#222222" />
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">
                      1 <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <FontAwesomeIcon icon={faAngleRight} color="#222222" />
                    </a>
                  </li>
                </ul>
                <p className="mt10 mb-0 pagination_page_count text-center">
                  1 – 2 of 2
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGallery = () => {
    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb20">Gallery</h4>
        <VotingFilter
          showKLA={true}
          selectedKLA={selectedKLA}
          setSelectedKLA={setSelectedKLA}
          selectedConstituency={selectedConstituency}
          setSelectedConstituency={setSelectedConstituency}
        />
        <div className="row">
          <div className="col-md-9" />
          <div className="col-12">
            <div className="row">
              <div className="col-md-2 mb-2">
                <div className="gallery-item">
                  <img
                    src="/images/prof-dummy.png"
                    alt="Gallery Image"
                    className="img-fluid rounded"
                  />
                </div>
              </div>
              <div className="col-md-2 mb-2">
                <div className="gallery-item">
                  <img
                    src="/images/prof-dummy.png"
                    alt="Gallery Image"
                    className="img-fluid rounded"
                  />
                </div>
              </div>
              <div className="col-md-2 mb-2">
                <div className="gallery-item">
                  <img
                    src="/images/prof-dummy.png"
                    alt="Gallery Image"
                    className="img-fluid rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTour = () => {
    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb20">Tour</h4>
        <VotingFilter
          showKLA={true}
          selectedKLA={selectedKLA}
          setSelectedKLA={setSelectedKLA}
          selectedConstituency={selectedConstituency}
          setSelectedConstituency={setSelectedConstituency}
        />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9" />
          <div className="col-12">
            <div className="tabley">
              <table className="table table myTable2">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Country Visited</th>
                    <th scope="col">Purpose</th>
                    <th scope="col">From Date</th>
                    <th scope="col">To Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((tour) => (
                    <tr className="debate" key={tour.id}>
                      <td>{tour.id}</td>
                      <td>{tour.country}</td>
                      <td>{tour.purpose}</td>
                      <td>{tour.fromDate}</td>
                      <td>{tour.toDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mbp_pagination mt30 text-center">
                <ul className="page_navigation">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <FontAwesomeIcon icon={faAngleLeft} color="#222222" />
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">
                      1 <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <FontAwesomeIcon icon={faAngleRight} color="#222222" />
                    </a>
                  </li>
                </ul>
                <p className="mt10 mb-0 pagination_page_count text-center">
                  1 – 3 of 3
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* {loading && (
        <div className="page-loader">
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
          <p>Loading...</p>
        </div>
      )} */}
      <header
        className={`header-nav nav-homepage-style2 stricky main-menu ${
          isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
        }`}
      >
        <HomeTest />
      </header>
      <CategoriesNav />

      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="breadcumb-style1">
                <div className="breadcumb-list">
                  <Link to="/">Home</Link>
                  <Link to="/members">Members</Link>
                  <Link to="/memberlist">Members List</Link>
                </div>
              </div>
            </div>
            {/* <div className="col-sm-4 col-lg-2">
              <div className="d-flex align-items-center justify-content-sm-end">
                <div className="share-save-widget d-flex align-items-center">
                  <span className="icon dark-color mr10">
                    <img src="/images/icon/share.svg" width={15} height={15} />
                  </span>
                  <div className="h6 mb-0">Share</div>
                </div>
                <div className="share-save-widget d-flex align-items-center ml15">
                  <span className="icon dark-color mr10">
                    <img src="/images/icon/heart.svg" width={15} height={15} />
                  </span>
                  <div className="h6 mb-0">Save</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="breadcumb-section pt-0 container">
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
                          src={memberData ? getImage(memberData) : "/images/prof-dummy.png"}
                          width={150}
                          alt={memberData ? getName(memberData) : "Member profile"}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/prof-dummy.png";
                          }}
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
                              <h3 className="title">{memberLoading ? "Loading..." : memberData ? getName(memberData) : "J Chinchurani"}</h3>
                              <h6 className="mb-2 text-th">{memberData?.designation || "---"}</h6>
                              <h6 className="list-inline-item mb-0 text-thm">
                                {memberData ? `${getConstituency(memberData)} ${memberData?.constituency?.id ? `(${memberData.constituency.id})` : ''}` : "Chadayamangalam (12)"}
                              </h6>
                              <h6 className="list-inline-item mb-0 bdrl-eunry pl15 text-thm">
                                {/* {memberData?.district?.name || memberData?.member?.district } */}
                              </h6>
                              <br />
                              <small>{memberData ? getParty(memberData) : "Communist Party of India"}</small>
                            </div>
                          </div>
                          <div className="memb-prof col-lg-6">
                              <div className="ml20 ml0-xs mt15-sm">
                              <h6 className="mb-3" style={{ color: "gray" }}>
                                Contacts &amp; Social Media
                              </h6>
                              <div className="d-flex contac">
                                <img
                                  src="/images/icon/phone.png"
                                  width={18}
                                  height={18}
                                />
                                <div className="call">
                                  <h6 className="list-inline-item mb-0 ml-2">
                                    {memberData ? getPhone(memberData) : "---"}
                                  </h6>
                                </div>
                              </div>
                              <div className="d-flex contac">
                                <img
                                  src="/images/icon/mail.png"
                                  width={18}
                                  height={18}
                                />
                                <div className="call">
                                  <h6 className="list-inline-item mb-0 ml-2">
                                    {memberData ? getEmail(memberData) : "---"}
                                  </h6>
                                </div>
                              </div>
                              {getOfficeTelephone(memberData) !== "---" && (
                                <div className="d-flex contac">
                                  <img
                                    src="/images/icon/phone.png"
                                    width={18}
                                    height={18}
                                  />
                                  <div className="call">
                                    <h6 className="list-inline-item mb-0 ml-2">
                                      Office: {getOfficeTelephone(memberData)}
                                    </h6>
                                  </div>
                                </div>
                              )}

                              <div className="d-flex contac">
                                <div className="social-widget text-center text-md-end">
                                  <div className="footer-social-style">
                                    <a href="#" className="list-inline-items">
                                      <FontAwesomeIcon
                                        className="font-icon"
                                        icon={faFacebookF}
                                        height={15}
                                        color="#B197FC"
                                      />
                                    </a>
                                    <a href="#" className="list-inline-items">
                                      <FontAwesomeIcon
                                        className="font-icon"
                                        icon={faXTwitter}
                                        height={15}
                                        color="#B197FC"
                                      />
                                    </a>
                                    <a href="#" className="list-inline-items">
                                      <FontAwesomeIcon
                                        className="font-icon"
                                        icon={faInstagram}
                                        height={15}
                                        color="#B197FC"
                                      />
                                    </a>
                                    <a href="#" className="list-inline-items">
                                      <FontAwesomeIcon
                                        className="font-icon"
                                        icon={faLinkedinIn}
                                        height={15}
                                        color="#B197FC"
                                      />
                                    </a>
                                  </div>
                                </div>
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
      </section>

      <section className="pt30 pb50 pb30-md represent">
        <div className="container">
          <SectionTitle title="Members Details" />

          <div
            className="row memberPro wow fadeInUp mt10"
            data-wow-delay="300ms"
          >
            <div className="col-12 col-lg-2">
              <div className="vertical-tab">
                <div className="widget_list">
                  <nav>
                    <div
                      className="nav flex-row nav-tabs text-start"
                      id="nav-tab"
                      role="tablist"
                    >
                      {[
                        "basic-details",
                        // "voting-results",
                        // "GIST of Business",
                        // "attendance",
                        // "debates",
                        // "special Mentions",
                        // "question",
                        // "Committee Membership",
                        // "govt Bills",
                        // "private Bills",
                        // "gallery",
                        // "tour",
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
                                  word.charAt(0).toUpperCase() + word.slice(1)
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
            <div className="col-md-12 col-lg-10 nh">
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
                    {activeTab === "basic-details" && renderBasicDetails()}
                    {activeTab === "voting-results" && renderVotingResults()}
                    {activeTab === "GIST of Business" && renderGistOfBusiness()}
                    {activeTab === "debates" && renderDebates()}
                    {activeTab === "special Mentions" &&
                      renderSpecialMentions()}
                    {activeTab === "question" && renderQuestions()}
                    {activeTab === "Committee Membership" &&
                      renderCommitteeMembership()}
                    {activeTab === "govt Bills" && renderGovernmentBills()}
                    {activeTab === "private Bills" && renderPrivateBills()}
                    {activeTab === "gallery" && renderGallery()}
                    {activeTab === "tour" && renderTour()}
                    {activeTab === "attendance" && renderAttendance()}
                  </motion.div>
                </AnimatePresence>
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
};

export default MemberProfile;
