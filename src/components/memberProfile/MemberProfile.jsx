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
import { API_ENDPOINTS, getImageUrl } from "../../utils/config";
import { buildPdfSrc } from "../../utils/pdfUtils";

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
    const img = m?.member?.image_url || m?.member?.image || m?.image_url || m?.image || "";
    if (!img) return "/images/prof-dummy.png";
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    if (img.startsWith("//")) return `https:${img}`;
    if (img.startsWith("/")) return getImageUrl(img);
    return `https://api.niyamasabha.in/uploads/member_images/ported/${img}`;
  };
  const getPhone = (m) => {
    const phone = m?.addresses?.mobile_nos || m?.member?.contact?.phone || m?.phone || "";
    return phone || "---";
  };
  const getEmail = (m) => {
    const email = m?.addresses?.email_ids || m?.member?.contact?.email || m?.email || "";
    return email || "---";
  };
  console.log(memberError);
  
  const getPAName = (m) => m?.addresses?.address_langs?.[0]?.pa_name || "---";
  const getPAPhone = (m) => m?.addresses?.pa_phone || "---";
  const getPAEmail = (m) => m?.addresses?.pa_email || "---";
  const getPermanentAddress = (m) => m?.addresses?.address_langs?.[0]?.permanent_address || "---";
  const getPresentAddress = (m) => m?.addresses?.address_langs?.[0]?.present_address || m?.addresses?.address_langs?.[0]?.mla_address || "---";
  const getMLAAddress = (m) => m?.addresses?.address_langs?.[0]?.mla_address || "---";
  const getOfficeTelephone = (m) => m?.addresses?.office_telephone || "---";

  // Derive structured fields from the API response shape
  const GetSpouseName = (m) =>
    m?.spouse?.languages?.[0]?.name || m?.spouse?.name || "---";

  const GetHobbies = (m) =>
    m?.other_details?.other_detail_langs?.[0]?.hobbies ||
    m?.other_details?.hobbies ||
    "---";

  const GetPositionsText = (m) =>
    m?.positions?.position_langs?.[0]?.name ||
    (Array.isArray(m?.positions) ? m.positions.map(p => p.position || p.name || "").filter(Boolean).join("; ") : null) ||
    "---";

  const GetSocialLinks = (m) => ({
    facebook: m?.other_details?.fb_link || null,
    instagram: m?.other_details?.instagram_link || null,
    linkedin: m?.other_details?.linkedin_link || null,
    twitter: m?.other_details?.twitter_link || null,
  });

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
        // Fetch member-profile (detailed data) and kla-members (constituency/party) in parallel
        const queryParams = new URLSearchParams(window.location.search);
        const klaId = queryParams.get("kla") || "15";

        const [profileRes, klaRes] = await Promise.all([
          fetch(API_ENDPOINTS.MEMBER_PROFILE(memberId)).catch(() => null),
          fetch(API_ENDPOINTS.KLA_MEMBERS(klaId)).catch(() => null),
        ]);

        if (cancelled) return;

        // Parse both responses safely
        const profileJson = profileRes ? await profileRes.json().catch(() => null) : null;
        const klaJson = klaRes ? await klaRes.json().catch(() => null) : null;

        // Find the matching kla-member entry for constituency/party
        // memberId in the URL is now member_id, so match on member_id first
        let klaEntry = null;
        if (klaJson?.status && Array.isArray(klaJson.data)) {
          klaEntry = klaJson.data.find(
            (x) => String(x.member_id) === String(memberId) || String(x.id) === String(memberId)
          );
        }

        if (profileJson?.status && profileJson?.data) {
          // Merge kla-member fields (constituency, party, designation) into profile data
          const merged = {
            ...profileJson.data,
            constituency: klaEntry?.constituency || profileJson.data?.constituency || null,
            party: klaEntry?.party || profileJson.data?.party || null,
            designation: klaEntry?.designation || profileJson.data?.designation || null,
            kla_id: klaEntry?.kla_id || profileJson.data?.kla_id || null,
          };
          if (!cancelled) setMemberData(merged);
          if (!cancelled) setMemberLoading(false);
          return;
        }

        // Fallback: use kla-members entry directly if profile API failed
        if (klaEntry) {
          if (!cancelled) setMemberData(klaEntry);
          if (!cancelled) setMemberLoading(false);
          return;
        }

        // Last fallback: try generic member API
        try {
          const r2 = await fetch(API_ENDPOINTS.MEMBER(memberId));
          const j2 = await r2.json();
          if (j2?.status && j2?.data) {
            const merged2 = {
              ...j2.data,
              constituency: klaEntry?.constituency || j2.data?.constituency || null,
              party: klaEntry?.party || j2.data?.party || null,
            };
            if (!cancelled) setMemberData(merged2);
          } else {
            if (!cancelled) setMemberError("Member not found");
          }
        } catch (err) {
          console.error(err);
          if (!cancelled) setMemberError("Member not found");
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
console.log(getMLAAddress);



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
  const [pdfSrc, setPdfSrc] = useState("");
  const [pdfModalTitle, setPdfModalTitle] = useState("");

  // Resolve the best PDF src whenever selectedPdfUrl changes
  useEffect(() => {
    if (!selectedPdfUrl) { setPdfSrc(""); return; }
    buildPdfSrc(selectedPdfUrl).then(setPdfSrc);
  }, [selectedPdfUrl]);
  const [selectedConstituency, setSelectedConstituency] =
    useState("Chadayamangalam");
  //   const [selectedSession, setSelectedSession] = useState('Session 1');
  const [debateTab, setDebateTab] = useState("presented");

  // Complete data for basic details - now using API data
  const basicDetails = memberData ? {
    personal: {
      dob: memberData.member?.date_of_birth || "---",
      birthPlace: "---",
      fatherName: Array.isArray(memberData.member_languages)
        ? memberData.member_languages[0]?.father_name || "---"
        : memberData.member?.langs?.[0]?.father_name || "---",
      motherName: Array.isArray(memberData.member_languages)
        ? memberData.member_languages[0]?.mother_name || "---"
        : memberData.member?.langs?.[0]?.mother_name || "---",
      maritalStatus: memberData.spouse ? "Married" : "---",
      marriageDate: memberData.spouse?.languages?.[0]?.married_date || "---",
      spouseName: GetSpouseName(memberData),
      hobbies: GetHobbies(memberData),
      children: {
        // children is a single object with langs[], not an array
        sons: Array.isArray(memberData.children)
          ? memberData.children.filter(c => c.gender === 'male').map(c => c.name)
          : (memberData.children?.langs?.filter(l => l.gender === 'male').map(l => l.name) || ["---"]),
        daughters: Array.isArray(memberData.children)
          ? memberData.children.filter(c => c.gender === 'female').map(c => c.name)
          : (memberData.children?.langs?.filter(l => l.gender === 'female').map(l => l.name) || ["---"]),
      },
    },
    address: {
      present: getPresentAddress(memberData),
      permanent: getPermanentAddress(memberData),
      mla: getMLAAddress(memberData),
    },
    qualifications: {
      // qualifications is an array of IDs — display count or "Available"
     education: Array.isArray(memberData.qualifications) && memberData.qualifications.length > 0
  ? memberData.qualifications.join(", ")
        : "---",
      profession: memberData.other_details?.other_detail_langs?.[0]?.social_activities ||
        memberData.other_details?.profession || "---",
      // languages_known is a JSON string like "[3, 5, 6, 11]"
      languages: (() => {
        try {
          const raw = memberData.languages_known;
          if (Array.isArray(raw)) return raw.join(", ");
          if (typeof raw === "string") {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? `${parsed.length} language(s) known` : raw;
          }
          return "---";
        } catch {
          return String(memberData.languages_known || "---");
        }
      })(),
    },
    positions: GetPositionsText(memberData),
    recreations: memberData.other_details?.other_detail_langs?.[0]?.recreations || "---",
    travelAbroad: memberData.other_details?.other_detail_langs?.[0]?.travel_abroad || "---",
    socialLinks: GetSocialLinks(memberData),
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
      children: { sons: ["---"], daughters: ["---"] },
    },
    address: { present: "---", permanent: "---", mla: "---" },
    qualifications: { education: "---", profession: "---", languages: "---" },
    positions: "---",
    recreations: "---",
    travelAbroad: "---",
    socialLinks: { facebook: null, instagram: null, linkedin: null, twitter: null },
  };


  // Complete data for voting results — will be sourced from API when available
  // (currently hidden in the UI — kept for when the API provides this data)
  // eslint-disable-next-line no-unused-vars
  const _votingResults = Array.isArray(memberData?.voting_results)
    ? memberData.voting_results
    : [];

  // GIST of Business KLA filter state
  const [gistKlaFilter, setGistKlaFilter] = useState("");

  // Derive unique KLA IDs from gist data for the filter dropdown
  const gistKlaOptions = React.useMemo(() => {
    const ids = [...new Set((memberData?.gist_of_business || []).map(g => g.kla_id).filter(Boolean))];
    return ids.sort((a, b) => a - b).map(id => ({ value: String(id), label: `KLA ${id}` }));
  }, [memberData?.gist_of_business]);

  // Auto-select the first KLA when options first load — use a ref so the
  // effect doesn't re-run when gistKlaFilter changes (intentional one-shot).
  const gistKlaInitialized = React.useRef(false);
  useEffect(() => {
    if (gistKlaOptions.length > 0 && !gistKlaInitialized.current) {
      gistKlaInitialized.current = true;
      setGistKlaFilter(String(gistKlaOptions[0].value));
    }
  }, [gistKlaOptions]);

  // Complete data for GIST of Business — sourced from API (memberData.gist_of_business)
  const gistOfBusiness = Array.isArray(memberData?.gist_of_business)
    ? memberData.gist_of_business
    : [];

  // Filtered gist items based on selected KLA
  const filteredGistOfBusiness = gistKlaFilter
    ? gistOfBusiness.filter(g => String(g.kla_id) === gistKlaFilter)
    : gistOfBusiness;
  const debatesPresented = Array.isArray(memberData?.debates?.presented)
    ? memberData.debates.presented
    : [
        {
          id: 1,
          type: "Debate Under Rule 58",
          date: "12.05.2021",
          title: "Need to set up a textiles park in Bhilwara, Rajasthan under PM MITRA Scheme-laid",
          participants: ["J Chinchurani", "Abdul Hameed Master", "A N Shamseer"],
          videoUrl: "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
          documentUrl: "/images/document.svg",
        },
        {
          id: 2,
          type: "Debate Under Rule 58",
          date: "25.05.2021",
          title: "Need to set up a tex Bhilwara, Rajasthan under PM MITRA Scheme-laid",
          participants: ["J Chinchurani"],
          documentUrl: "/images/document.svg",
          videoUrl: "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
        },
        {
          id: 3,
          type: "Debate Under Rule 58",
          date: "12.05.2021",
          title: "Need to set up a textiles park in Bhilwara, Rajasthan under PM MITRA Scheme-laid",
          participants: ["J Chinchurani", "Abdul Hameed Master", "A N Shamseer"],
          documentUrl: "/images/document.svg",
          videoUrl: "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
        },
        {
          id: 4,
          type: "Debate Under Rule 58",
          date: "12.05.2021",
          title: "Need to set up a textiles park in Bhilwara, Rajasthan under PM MITRA Scheme-laid",
          participants: ["J Chinchurani", "Abdul Hameed Master", "A N Shamseer"],
          documentUrl: "/images/document.svg",
          videoUrl: "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
        },
        {
          id: 5,
          type: "Debate Under Rule 58",
          date: "26.05.2021",
          title: "Need to set up a tex Bhilwara, Rajasthan",
          participants: ["J Chinchurani"],
          documentUrl: "/images/document.svg",
          videoUrl: "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
        },
      ];

  const debatesParticipated = Array.isArray(memberData?.debates?.participated)
    ? memberData.debates.participated
    : [
        {
          id: 1,
          type: "Debate Under Rule 58",
          date: "12.05.2021",
          title: "Need to set up a textiles park in Bhilwara, Rajasthan under PM MITRA Scheme-laid",
          presenter: "A Prabhakaran",
          participants: ["J Chinchurani", "Abdul Hameed Master", "A N Shamseer"],
          documentUrl: "/images/document.svg",
          videoUrl: "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
        },
        {
          id: 2,
          type: "Debate Under Rule 58",
          date: "25.05.2021",
          title: "Need to set up a tex Bhilwara, Rajasthan under PM MITRA Scheme-laid",
          presenter: "Chittayam Gopakumar",
          participants: ["J Chinchurani"],
          documentUrl: "/images/document.svg",
          videoUrl: "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
        },
        {
          id: 3,
          type: "Debate Under Rule 58",
          date: "12.05.2021",
          title: "Need to set up a textiles park in Bhilwara, Rajasthan under PM MITRA Scheme-laid",
          presenter: "DR. Mathew Kuzhalnadan",
          participants: ["J Chinchurani", "Abdul Hameed Master", "A N Shamseer"],
          documentUrl: "/images/document.svg",
          videoUrl: "https://sabhatv.com/details/87f1e857-665e-48ae-8b07-5bce899d28de/Niyamasabha%20Proceedings/view-all/0",
        },
      ];

  const debates = { presented: debatesPresented, participated: debatesParticipated };

  // Special mentions — will be sourced from API (memberData.special_mentions) when available
  const specialMentions = Array.isArray(memberData?.special_mentions)
    ? memberData.special_mentions
    : [
        {
          title: "---",
          date: "---",
          participants: "---",
          keywords: "---",
          documentUrl: "---",
        },
      
      ];

  // Questions — sourced from API (memberData.question_answer)
  const questionAnswer = React.useMemo(() => (
    memberData?.question_answer || { starred: [], unstarred: [], shortnotice: [] }
  ), [memberData?.question_answer]);

  // Question tab filter state
  const [questionKlaFilter, setQuestionKlaFilter] = useState("");
  const [questionSessionFilter, setQuestionSessionFilter] = useState("");
  const [questionTypeFilter, setQuestionTypeFilter] = useState("starred");
  const [questionSearchFilter, setQuestionSearchFilter] = useState("");

  // Derive unique KLA options from all question types
  const questionKlaOptions = React.useMemo(() => {
    const all = [
      ...(questionAnswer.starred || []),
      ...(questionAnswer.unstarred || []),
      ...(questionAnswer.shortnotice || []),
    ];
    const ids = [...new Set(all.map(q => q.kla_id).filter(Boolean))];
    return ids.sort((a, b) => a - b).map(id => ({ value: String(id), label: `KLA ${id}` }));
  }, [questionAnswer]);

  // Derive unique session options for the selected KLA
  const questionSessionOptions = React.useMemo(() => {
    const all = [
      ...(questionAnswer.starred || []),
      ...(questionAnswer.unstarred || []),
      ...(questionAnswer.shortnotice || []),
    ];
    const filtered = questionKlaFilter
      ? all.filter(q => String(q.kla_id) === questionKlaFilter)
      : all;
    const ids = [...new Set(filtered.map(q => q.session_id).filter(Boolean))];
    return ids.sort((a, b) => a - b).map(id => ({ value: String(id), label: `Session ${id}` }));
  }, [questionAnswer, questionKlaFilter]);

  // Auto-select first KLA for questions
  const questionKlaInitialized = React.useRef(false);
  useEffect(() => {
    if (questionKlaOptions.length > 0 && !questionKlaInitialized.current) {
      questionKlaInitialized.current = true;
      setQuestionKlaFilter(String(questionKlaOptions[0].value));
    }
  }, [questionKlaOptions]);

  // Reset session filter when KLA changes
  useEffect(() => {
    setQuestionSessionFilter("");
  }, [questionKlaFilter]);

  // Get the active question list based on type filter, then apply KLA/session/search filters
  const filteredQuestions = React.useMemo(() => {
    const typeKey = questionTypeFilter === "short-notice" ? "shortnotice" : questionTypeFilter;
    const list = Array.isArray(questionAnswer[typeKey]) ? questionAnswer[typeKey] : [];
    return list.filter(q => {
      if (questionKlaFilter && String(q.kla_id) !== questionKlaFilter) return false;
      if (questionSessionFilter && String(q.session_id) !== questionSessionFilter) return false;
      if (questionSearchFilter) {
        const search = questionSearchFilter.toLowerCase();
        const titleMatch = String(q.title || "").toLowerCase().includes(search);
        const numMatch = String(q.number || "").includes(search);
        if (!titleMatch && !numMatch) return false;
      }
      return true;
    });
  }, [questionAnswer, questionTypeFilter, questionKlaFilter, questionSessionFilter, questionSearchFilter]);

  // Pagination for questions
  const [questionPage, setQuestionPage] = useState(1);
  const QUESTIONS_PER_PAGE = 10;
  const questionTotalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const pagedQuestions = filteredQuestions.slice(
    (questionPage - 1) * QUESTIONS_PER_PAGE,
    questionPage * QUESTIONS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setQuestionPage(1);
  }, [questionTypeFilter, questionKlaFilter, questionSessionFilter, questionSearchFilter]);

  // Committee membership — sourced from API (memberData.committee_membership)
  const committeeMembership = React.useMemo(
    () => (Array.isArray(memberData?.committee_membership) ? memberData.committee_membership : []),
    [memberData?.committee_membership]
  );

  // Committee membership filter state
  const [cmKlaFilter, setCmKlaFilter] = useState("");
  const [cmYearFilter, setCmYearFilter] = useState("");

  // Derive unique KLA options from committee membership data
  const cmKlaOptions = React.useMemo(() => {
    const ids = [...new Set(committeeMembership.map(c => c.kla_id).filter(Boolean))];
    return ids.sort((a, b) => a - b).map(id => ({ value: String(id), label: `KLA ${id}` }));
  }, [committeeMembership]);

  // Derive unique year options from report_date, filtered by selected KLA
  const cmYearOptions = React.useMemo(() => {
    const filtered = cmKlaFilter
      ? committeeMembership.filter(c => String(c.kla_id) === cmKlaFilter)
      : committeeMembership;
    const years = [...new Set(
      filtered
        .map(c => c.report_date ? new Date(c.report_date).getFullYear() : null)
        .filter(Boolean)
    )];
    return years.sort((a, b) => a - b).map(y => ({ value: String(y), label: String(y) }));
  }, [committeeMembership, cmKlaFilter]);

  // Auto-select first KLA for committee membership
  const cmKlaInitialized = React.useRef(false);
  useEffect(() => {
    if (cmKlaOptions.length > 0 && !cmKlaInitialized.current) {
      cmKlaInitialized.current = true;
      setCmKlaFilter(String(cmKlaOptions[0].value));
    }
  }, [cmKlaOptions]);

  // Reset year filter when KLA changes
  useEffect(() => {
    setCmYearFilter("");
  }, [cmKlaFilter]);

  // Filtered committee membership
  const filteredCommitteeMembership = React.useMemo(() => {
    return committeeMembership.filter(c => {
      if (cmKlaFilter && String(c.kla_id) !== cmKlaFilter) return false;
      if (cmYearFilter) {
        const year = c.report_date ? String(new Date(c.report_date).getFullYear()) : null;
        if (year !== cmYearFilter) return false;
      }
      return true;
    });
  }, [committeeMembership, cmKlaFilter, cmYearFilter]);

  // Government bills — will be sourced from API (memberData.government_bills) when available
  const governmentBills = Array.isArray(memberData?.government_bills)
    ? memberData.government_bills
    : [
        {
          id: 1,
          title: "---",
          date: "---",
          participants: "---",
          keywords: "---",
          documentUrl: "---",
        },
       
      ];

  // Private bills — will be sourced from API (memberData.private_bills) when available
  const privateBills = Array.isArray(memberData?.private_bills)
    ? memberData.private_bills
    : [
        {
          id: 1,
          title: "---",
          date: "---",
          participants: "---",
          keywords: "---",
          documentUrl: "---",
        },
      
      ];

  // Tours — will be sourced from API (memberData.tours) when available
  const tours = Array.isArray(memberData?.tours)
    ? memberData.tours
    : [
        { id: 1, country: "---", purpose: "---", fromDate: "---", toDate: "---" },
        { id: 2, country: "---", purpose: "---", fromDate: "---", toDate: "---" },
        { id: 3, country: "---", purpose: "---", fromDate: "---", toDate: "---" },
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
                {basicDetails.recreations !== "---" && (
                  <div className="col-md-6 mb30">
                    <div className="singleD">
                      <img src="/images/hobbies.svg" alt="" />
                      <div className="ryt">
                        <h6>Recreations</h6>
                        <h5>{basicDetails.recreations}</h5>
                      </div>
                    </div>
                  </div>
                )}
                <div className="col-12 mb30">
                  <div className="singleD">
                    <img src="/images/twins.svg" alt="" />
                    <div className="col-12 ryt">
                      <h6>Children</h6>
                      <div className="row">
                        <div className="col-6">
                          <p className="mb5">Sons:</p>
                          {basicDetails.personal.children.sons.map((son, index) => (
                            <p key={index}><span>{son}</span></p>
                          ))}
                        </div>
                        <div className="col-6">
                          <p className="mb5 mt5">Daughters:</p>
                          {basicDetails.personal.children.daughters.map((daughter, index) => (
                            <p key={index}><span>{daughter}</span></p>
                          ))}
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
                {basicDetails.address.mla && basicDetails.address.mla !== "---" && (
                  <div className="col-md-12 mb30">
                    <div className="singleD">
                      <img src="/images/home.svg" alt="" />
                      <div className="ryt">
                        <h6>MLA Address</h6>
                        <h5>{basicDetails.address.mla}</h5>
                      </div>
                    </div>
                  </div>
                )}
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
                      <h6>Profession / Social Activities</h6>
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
                {basicDetails.travelAbroad !== "---" && (
                  <div className="col-md-6 mb30">
                    <div className="singleD">
                      <img src="/images/location.svg" alt="" />
                      <div className="ryt">
                        <h6>Travel Abroad</h6>
                        <h5>{basicDetails.travelAbroad}</h5>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 basicD pl20">
            <h6 className="title mb30">Positions Held</h6>
            <div className="positionH">
              <div className="singleD">
                <div className="ryt">
                  <p className="otherpo" style={{ whiteSpace: "pre-line" }}>
                    {basicDetails.positions}
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
    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb10">Voting Results</h4>
        <div className="text-center py-5 text-muted">---</div>
      </div>
    );
  };

  const renderGistOfBusiness = () => {
    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb20">GIST of Business</h4>

        {/* KLA filter — controlled, filters the cards below */}
        <div className="row filt mb20">
          <div className="col-md-3 col-sm-6">
            <div className="form-style1 selectM">
              <label className="heading-color ff-heading fw500 mb0">KLA</label>
              <div className="bootselect-multiselect">
                <select
                  className="form-select"
                  value={gistKlaFilter}
                  onChange={(e) => setGistKlaFilter(e.target.value)}
                  disabled={gistKlaOptions.length === 0}
                >
                  <option value="">All KLA</option>
                  {gistKlaOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {memberLoading ? (
            <div className="col-12 text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredGistOfBusiness.length === 0 ? (
            <div className="col-12 text-center py-4">
              <p className="text-muted">
                {gistOfBusiness.length === 0
                  ? "No GIST of Business records available."
                  : "No records for the selected KLA."}
              </p>
            </div>
          ) : (
            filteredGistOfBusiness.map((item, index) => (
              <div className="col-md-4 col-6 col-lg-3 mb-2" key={index}>
                <div className="session card">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.pdf_link) {
                        setSelectedPdfUrl(item.pdf_link);
                        setPdfModalTitle(`Session ${item.session_number} — KLA ${item.kla_id}`);
                      }
                    }}
                    style={{ cursor: item.pdf_link ? "pointer" : "default" }}
                  >
                    <div>
                      <h6>Session {item.session_number}</h6>
                      <p style={{ marginBottom: "4px" }}>KLA {item.kla_id}</p>
                      {/* <small className="text-muted d-block" style={{ fontSize: "11px" }}>
                        📅{" "}
                        {item.sitting_date
                          ? new Date(item.sitting_date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </small> */}
                    </div>
                    <div className="imgx">
                      <img src="/images/file2.svg" width={15} alt="" />
                    </div>
                  </a>
                </div>
              </div>
            ))
          )}
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
    const typeTabLabels = [
      { key: "starred",      label: "Starred" },
      { key: "unstarred",    label: "Unstarred" },
      { key: "short-notice", label: "Short Notice" },
    ];

    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb20">Questions</h4>

        {/* Filters */}
        <div className="row filt mb20">
          <div className="col-md-3 col-sm-6 mb-2">
            <div className="form-style1 selectM">
              <label className="heading-color ff-heading fw500 mb0">KLA</label>
              <div className="bootselect-multiselect">
                <select
                  className="form-select"
                  value={questionKlaFilter}
                  onChange={(e) => setQuestionKlaFilter(e.target.value)}
                  disabled={questionKlaOptions.length === 0}
                >
                  <option value="">All KLA</option>
                  {questionKlaOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-2">
            <div className="form-style1 selectM">
              <label className="heading-color ff-heading fw500 mb0">Session</label>
              <div className="bootselect-multiselect">
                <select
                  className="form-select"
                  value={questionSessionFilter}
                  onChange={(e) => setQuestionSessionFilter(e.target.value)}
                  disabled={questionSessionOptions.length === 0}
                >
                  <option value="">All Sessions</option>
                  {questionSessionOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 mb-2">
            <div className="form-style1 selectM">
              <label className="heading-color ff-heading fw500 mb0">Search</label>
              <div className="search_area">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title or number..."
                  value={questionSearchFilter}
                  onChange={(e) => setQuestionSearchFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Type tabs */}
        <div className="navtab-style1 mb20">
          <nav>
            <div className="nav nav-tabs" role="tablist">
              {typeTabLabels.map(({ key, label }) => (
                <button
                  key={key}
                  className={`nav-link fw600 ${questionTypeFilter === key ? "active" : ""}`}
                  onClick={() => setQuestionTypeFilter(key)}
                  type="button"
                >
                  {label}
                  <span className="ms-1 badge bg-secondary" style={{ fontSize: "11px" }}>
                    {(() => {
                      const typeKey = key === "short-notice" ? "shortnotice" : key;
                      const list = Array.isArray(questionAnswer[typeKey]) ? questionAnswer[typeKey] : [];
                      const count = list.filter(q => {
                        if (questionKlaFilter && String(q.kla_id) !== questionKlaFilter) return false;
                        if (questionSessionFilter && String(q.session_id) !== questionSessionFilter) return false;
                        return true;
                      }).length;
                      return count;
                    })()}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        <div className="col-12">
          <div className="tabley">
            {memberLoading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : pagedQuestions.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted">No questions found for the selected filters.</p>
              </div>
            ) : (
              <>
                <table className="table myTable2">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Qs. No</th>
                      <th scope="col">Title</th>
                      <th scope="col">KLA</th>
                      <th scope="col">Session</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Document</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedQuestions.map((question, index) => {
                      const pdfUrl = Array.isArray(question.attachments) && question.attachments.length > 0
                        ? `https://api.niyamasabha.in/${question.attachments[0]}`
                        : null;
                      return (
                        <tr className="debate" key={question.id || index}>
                          <td>{(questionPage - 1) * QUESTIONS_PER_PAGE + index + 1}</td>
                          <td>{question.number}</td>
                          <td style={{ maxWidth: "300px" }}>{question.title}</td>
                          <td>{question.kla_id ? `KLA ${question.kla_id}` : "---"}</td>
                          <td>{question.session_id ? `Session ${question.session_id}` : "---"}</td>
                          <td>
                            {question.sitting_date
                              ? new Date(question.sitting_date).toLocaleDateString("en-GB", {
                                  day: "2-digit", month: "short", year: "numeric",
                                })
                              : "---"}
                          </td>
                          <td>
                            <span className={`badge ${question.isAnswered ? "bg-success" : "bg-warning text-dark"}`}>
                              {question.isAnswered ? "Answered" : "Pending"}
                            </span>
                          </td>
                          <td className="text-center">
                            {pdfUrl ? (
                              <a
                                href="#"
                                className="doci"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedPdfUrl(pdfUrl);
                                  setPdfModalTitle(`Q.${question.number} — ${question.title}`);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <img src="/images/document.svg" alt="PDF" />
                              </a>
                            ) : (
                              <span className="text-muted" style={{ fontSize: "12px" }}>—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Pagination */}
                {questionTotalPages > 1 && (
                  <div className="mbp_pagination mt30 text-center mb-4">
                    <ul className="page_navigation">
                      <li className={`page-item ${questionPage === 1 ? "disabled" : ""}`}>
                        <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); if (questionPage > 1) setQuestionPage(p => p - 1); }}>
                          <FontAwesomeIcon icon={faAngleLeft} color="#222222" />
                        </a>
                      </li>
                      {Array.from({ length: Math.min(questionTotalPages, 5) }, (_, i) => {
                        let page;
                        if (questionTotalPages <= 5) page = i + 1;
                        else if (questionPage <= 3) page = i + 1;
                        else if (questionPage >= questionTotalPages - 2) page = questionTotalPages - 4 + i;
                        else page = questionPage - 2 + i;
                        return (
                          <li key={page} className={`page-item ${page === questionPage ? "active" : ""}`}>
                            <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); setQuestionPage(page); }}>{page}</a>
                          </li>
                        );
                      })}
                      <li className={`page-item ${questionPage === questionTotalPages ? "disabled" : ""}`}>
                        <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); if (questionPage < questionTotalPages) setQuestionPage(p => p + 1); }}>
                          <FontAwesomeIcon icon={faAngleRight} color="#222222" />
                        </a>
                      </li>
                    </ul>
                    <p className="mt10 mb-0 pagination_page_count text-center">
                      {(questionPage - 1) * QUESTIONS_PER_PAGE + 1}–{Math.min(questionPage * QUESTIONS_PER_PAGE, filteredQuestions.length)} of {filteredQuestions.length}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCommitteeMembership = () => {
    return (
      <div className="grids votingResult">
        <h4 className="tabDet title mb20">Committee Membership</h4>

        {/* KLA + Year filters */}
        <div className="row filt mb20">
          <div className="col-md-3 col-sm-6 mb-2">
            <div className="form-style1 selectM">
              <label className="heading-color ff-heading fw500 mb0">KLA</label>
              <div className="bootselect-multiselect">
                <select
                  className="form-select"
                  value={cmKlaFilter}
                  onChange={(e) => setCmKlaFilter(e.target.value)}
                  disabled={cmKlaOptions.length === 0}
                >
                  <option value="">All KLA</option>
                  {cmKlaOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-2">
            <div className="form-style1 selectM">
              <label className="heading-color ff-heading fw500 mb0">Year</label>
              <div className="bootselect-multiselect">
                <select
                  className="form-select"
                  value={cmYearFilter}
                  onChange={(e) => setCmYearFilter(e.target.value)}
                  disabled={cmYearOptions.length === 0}
                >
                  <option value="">All Years</option>
                  {cmYearOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="tabley">
              {memberLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : filteredCommitteeMembership.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">
                    {committeeMembership.length === 0
                      ? "No committee membership records available."
                      : "No records for the selected filters."}
                  </p>
                </div>
              ) : (
                <>
                  <table className="table myTable2">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Committee</th>
                        <th scope="col">KLA</th>
                        <th scope="col">Report No.</th>
                        <th scope="col">Title</th>
                        <th scope="col">Report Date</th>
                        <th scope="col">Document</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCommitteeMembership.map((item, index) => (
                        <tr className="debate" key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.committee_name || "---"}</td>
                          <td>{item.kla_id ? `KLA ${item.kla_id}` : "---"}</td>
                          <td>{item.report_no || "---"}</td>
                          <td>{item.title || "---"}</td>
                          <td>
                            {item.report_date
                              ? new Date(item.report_date).toLocaleDateString("en-GB", {
                                  day: "2-digit", month: "short", year: "numeric",
                                })
                              : "---"}
                          </td>
                          <td className="text-center">
                            {item.pdf_url ? (
                              <a
                                href="#"
                                className="doci"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedPdfUrl(item.pdf_url);
                                  setPdfModalTitle(`${item.committee_name} — ${item.title}`);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <img src="/images/document.svg" alt="PDF" />
                              </a>
                            ) : (
                              <span className="text-muted" style={{ fontSize: "12px" }}>—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt10 mb-0 pagination_page_count text-center">
                    {filteredCommitteeMembership.length} record{filteredCommitteeMembership.length !== 1 ? "s" : ""}
                  </p>
                </>
              )}
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
                  <Link to="members">Members</Link>
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
                              <h3 className="title">{memberLoading ? "Loading..." : getName(memberData) || "---"}</h3>
                              <h6 className="mb-2 text-th">{memberData?.designation || ""}</h6>
                              <h6 className="list-inline-item mb-0 text-thm">
                                {getConstituency(memberData)
                                  ? `${getConstituency(memberData)}${memberData?.constituency?.constituency_no ? ` (${memberData.constituency.constituency_no})` : memberData?.constituency?.id ? ` (${memberData.constituency.id})` : ''}`
                                  : memberLoading ? "" : "---"}
                              </h6>
                              <h6 className="list-inline-item mb-0 bdrl-eunry pl15 text-thm">
                                {/* {memberData?.district?.name || memberData?.member?.district } */}
                              </h6>
                              <br />
                              <small>{getParty(memberData) || (memberLoading ? "" : "---")}</small>
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
                                    {(basicDetails.socialLinks?.facebook || !memberData) && (
                                      <a href={basicDetails.socialLinks?.facebook || "#"} className="list-inline-items" target={basicDetails.socialLinks?.facebook ? "_blank" : undefined} rel="noopener noreferrer">
                                        <FontAwesomeIcon className="font-icon" icon={faFacebookF} height={15} color="#B197FC" />
                                      </a>
                                    )}
                                    {(basicDetails.socialLinks?.twitter || !memberData) && (
                                      <a href={basicDetails.socialLinks?.twitter || "#"} className="list-inline-items" target={basicDetails.socialLinks?.twitter ? "_blank" : undefined} rel="noopener noreferrer">
                                        <FontAwesomeIcon className="font-icon" icon={faXTwitter} height={15} color="#B197FC" />
                                      </a>
                                    )}
                                    {(basicDetails.socialLinks?.instagram || !memberData) && (
                                      <a href={basicDetails.socialLinks?.instagram || "#"} className="list-inline-items" target={basicDetails.socialLinks?.instagram ? "_blank" : undefined} rel="noopener noreferrer">
                                        <FontAwesomeIcon className="font-icon" icon={faInstagram} height={15} color="#B197FC" />
                                      </a>
                                    )}
                                    {(basicDetails.socialLinks?.linkedin || !memberData) && (
                                      <a href={basicDetails.socialLinks?.linkedin || "#"} className="list-inline-items" target={basicDetails.socialLinks?.linkedin ? "_blank" : undefined} rel="noopener noreferrer">
                                        <FontAwesomeIcon className="font-icon" icon={faLinkedinIn} height={15} color="#B197FC" />
                                      </a>
                                    )}
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
                        "voting-results",
                        "GIST of Business",
                        "attendance",
                        // "debates",
                        "special Mentions",
                        "question",
                        "Committee Membership",
                        "govt Bills",
                        "private Bills",
                        "gallery",
                        "tour",
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
                  <div className="d-flex align-items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => window.open(selectedPdfUrl, "_blank", "noopener,noreferrer")}
                    >
                      Download
                    </button>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedPdfUrl(null)}
                    />
                  </div>
                </div>
                <div className="modal-body" style={{ height: "80vh", padding: 0 }}>
                  <iframe
                    src={pdfSrc}
                    title={pdfModalTitle || "PDF Preview"}
                    width="100%"
                    height="100%"
                    style={{ border: "none", display: "block" }}
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
