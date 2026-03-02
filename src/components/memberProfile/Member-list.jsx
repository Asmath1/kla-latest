// --------------------------------------------------------------

// MemberList.jsx
"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import FilterComponent from "./Filter"; // your left-side filter component
import DownloadSelector from "./Download";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import HomeTest from "../Header";
import { Tabs } from "../common";
import { BreadcrumbNav, CategoriesNav, Filter, SectionTitle } from "../common";
import "./MemberProfile.css";
import { fetchKlaMembers } from "../../services/MemberService"; // your API function
   import { API_ENDPOINTS, getImageUrl } from "../../utils/config";

// --------------------------- Helper: safe access ---------------------------
const safeName = (item) =>
  item?.member?.langs?.[0]?.name || item?.member?.name || "Unknown Member";
const safeConstituency = (item) =>
  item?.constituency?.entitle || item?.constituency?.maltitle || "";
// const safeDistrict = (item) => item?.district?.name || "";
const safeGender = (item) =>
  item?.member?.gender != null ? String(item.member.gender) : "";
const safeImage = (item) => {
  const img =
  item?.member?.image ||
    item?.image ||
    item?.image_url ||
    item?.member?.image_url ||
    
    "";
  if (!img) return "/images/prof-dummy.png";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  if (img.startsWith("//")) return `https:${img}`;
  if (img.startsWith("/")) return getImageUrl(img);
  return img;
};

// --------------------------- MemberCard ---------------------------
const MemberCard = ({ member, navigate, selectedKla }) => {
  const name = safeName(member);
  const constituency = safeConstituency(member);
  const img = safeImage(member);

  return (
    <div
      className="member-card job-list-style1 bdr1 text-center"
      // onClick={() => navigate(`/member-profile/${member.id}`)}
      onClick={() =>
        navigate(`/member-profile/${member.id}?kla=${selectedKla}`)
      }
      style={{ cursor: "pointer" }}
    >
      <div className="icon d-flex align-items-center mb20">
        <img
          className="mx-auto"
          src={img}
          alt={name}
          style={{ width: 130, height: 180, objectFit: "cover" }}
          onError={(e) => (e.target.src = "/images/prof-dummy.png")}
        />
        {/* <h6 className="parts">{party}</h6> */}
        <h6 className="parts">__</h6>
      </div>
      <div className="details">
        <h5 className="mb10 member-name">{name}</h5>
        <h6 className="member-constituency">{constituency}</h6>
      </div>
    </div>
  );
};

// --------------------------- Pagination ---------------------------
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 24,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 3) end = 4;
      if (currentPage >= totalPages - 2) start = totalPages - 3;
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mbp_pagination mt30 text-center">
      <ul className="page_navigation">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </a>
        </li>

        {getPageNumbers().map((page, idx) => (
          <li
            key={idx}
            className={`page-item ${page === currentPage ? "active" : ""} ${
              page === "..." ? "d-none d-sm-inline-block" : ""
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page === "..." ? (
              <a className="page-link" href="#">
                ...
              </a>
            ) : (
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </a>
            )}
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </a>
        </li>
      </ul>

      <p className="mt10 mb-0 pagination_page_count text-center">
        {Math.min(1 + (currentPage - 1) * itemsPerPage, totalItems)} –{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </p>
    </div>
  );
};

// --------------------------- AlphabetFilter ---------------------------
const AlphabetFilter = ({ onLetterClick, activeLetter }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <div className="alphabets d-flex w-100 wow fadeInUp">
      {alphabet.map((letter) => (
        <a
          href="#"
          key={letter}
          className={activeLetter === letter ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            onLetterClick(letter === activeLetter ? "" : letter);
          }}
        >
          {letter}
        </a>
      ))}
    </div>
  );
};

// --------------------------- FilterControls ---------------------------

const FilterControls = ({ onFilterClick = () => {}, appliedCount = 0 }) => (
  <div className="row align-items-center mb20">
    <div className="col-6 col-sm-6 col-lg-9 pe-0">
      <div className="text-center text-sm-start">
        <div className="dropdown-lists">
          <ul className="p-0 mb-0 text-center text-sm-start">
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn filter-btn-left mb10 position-relative"
                onClick={onFilterClick}
              >
                <img
                  className="me-2"
                  src="/images/all-filter-icon.svg"
                  alt="Filter"
                />
                All Filter
              </button>

              {appliedCount > 0 && (
                <span
                  className="filter-badge"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-10px",
                    background: "#ef4151",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "22px",
                    height: "22px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: "normal",
                  }}
                >
                  {appliedCount}
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <DownloadSelector />
  </div>
);

// const FilterControls = ({ onFilterClick = () => {} }) => (
//   <div className="row align-items-center mb20">
//     <div className="col-6 col-sm-6 col-lg-9 pe-0">
//       <div className="text-center text-sm-start">
//         <div className="dropdown-lists">
//           <ul className="p-0 mb-0 text-center text-sm-start">
//             <li className="list-inline-item">
//               <button
//                 type="button"
//                 className="open-btn filter-btn-left mb10"
//                 onClick={onFilterClick}
//               >
//                 <img
//                   className="me-2"
//                   src="/images/all-filter-icon.svg"
//                   alt="Filter"
//                 />{" "}
//                 All Filter
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//     <DownloadSelector />
//   </div>
// );

// --------------------------- Parliament selector ---------------------------
const ParliamentTypeSelector = ({ parliamentType, setParliamentType }) => (
  <div className="mSearch d-flex">
    <form>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="parliamentType"
          value="lok"
          checked={parliamentType === "lok"}
          onChange={() => setParliamentType("lok")}
        />
        <label className="form-check-label">
          <b>Lok Sabha</b>
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="parliamentType"
          value="rajya"
          checked={parliamentType === "rajya"}
          onChange={() => setParliamentType("rajya")}
        />
        <label className="form-check-label">
          <b>Rajya Sabha</b>
        </label>
      </div>
    </form>
  </div>
);

// --------------------------- SearchForm ---------------------------
const SearchForm = ({
  searchType,
  setSearchType,
  searchQuery,
  setSearchQuery,
  onSearch,
}) => {
  return (
    <div className="MSearch wow fadeInUp">
      <form
        style={{ flexDirection: "column !important" }}
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <h6 className="mb-2">Search your Member By</h6>

        <div className="rowW">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="searchType"
              id="inlineRadio1"
              value="name"
              checked={searchType === "name"}
              onChange={() => setSearchType("name")}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Name
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="searchType"
              id="inlineRadio2"
              value="constituency"
              checked={searchType === "constituency"}
              onChange={() => setSearchType("constituency")}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              Constituency
            </label>
          </div>
        </div>

        <div className="col-md-4 mt-2 col-xl-3 col-sm-12">
          <div className="memberSearch">
            <input
              type="text"
              className="form-control py-2"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

// --------------------------- Main MemberList ---------------------------
const MemberList = () => {
  const navigate = useNavigate();
  const sectionTopRef = useRef(null);

  // Tabs and UI state
  const [activeTab, setActiveTab] = useState("pills-profile2"); // current members
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [klaList, setKlaList] = useState([]);
  const [selectedKla, setSelectedKla] = useState(15);
  const [assemblySelection, setAssemblySelection] = useState("sitting"); // 'sitting' or 'former' etc.

  // search & alphabet
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [activeLetter, setActiveLetter] = useState("");

  // parliament type (lok/rajya)
  // Set to null by default so we don't filter out members unexpectedly
  const [parliamentType, _setParliamentType] = useState(null);

  // members & filters
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Former members - will be fetched from API
  const [formerMembers, setFormerMembers] = useState([]);
  const [formerLoading, setFormerLoading] = useState(false);
  const [formerError, setFormerError] = useState(null);

  // pagination
  const itemsPerPage = 24;
  const [currentMembersPage, setCurrentMembersPage] = useState(1);
  const [formerMembersPage, setFormerMembersPage] = useState(1);

  // left-side filters state (send to FilterComponent)
  const [filters, setFilters] = useState({
    district: "",
    constituency: "",
    gender: "",
    party: "",
    qualification: "",
    terms: "",
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update selectedKla when tab changes
  useEffect(() => {
    if (activeTab === "pills-profile2") {
      setSelectedKla(15); // Sitting Members - 15th KLA
    } else if (activeTab === "pills-contact3") {
      setSelectedKla(14); // Former Members - 14th KLA
    }
  }, [activeTab]);

  // --------------------------- Fetch former members when on Former Members tab ---------------------------
  useEffect(() => {
    if (activeTab !== "pills-contact3") return;

    let cancelled = false;
    const loadFormerMembers = async () => {
      setFormerLoading(true);
      setFormerError(null);
      try {
        const data = await fetchKlaMembers(14); // Always fetch 14th KLA for former members
        if (cancelled) return;
        console.log("Former members API response:", data);
        console.log("Is array?", Array.isArray(data));
        console.log("Length:", data?.length);
        if (Array.isArray(data)) {
          setFormerMembers(data);
          console.log("Former members loaded successfully:", data.length, "members");
          console.log("First member sample:", data[0]);
        } else {
          console.error("Data is not an array:", data);
          setFormerMembers([]);
        }
      } catch (err) {
        console.error("Failed to load former members:", err);
        if (!cancelled) {
          setFormerMembers([]);
          setFormerError("Failed to load former members from API.");
        }
      } finally {
        if (!cancelled) setFormerLoading(false);
      }
    };

    loadFormerMembers();
    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  // --------------------------- Fetch KLA list (dynamic) ---------------------------
  useEffect(() => {
    let cancelled = false;
    const loadKlas = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.KLA_LIST, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: new URLSearchParams({ t: "o" }).toString(),
        });
        const json = await res.json();
        if (!cancelled && json?.status && json?.data) {
          setKlaList(json.data);
          // if selectedKla not in list, set first available
          if (!json.data.find((k) => k.id === selectedKla)) {
            setSelectedKla(json.data[0]?.id || selectedKla);
          }
        }
      } catch (err) {
        // silently fail and keep klaList empty; UI will still work
        console.error("Failed to load KLA list", err);
      }
    };
    loadKlas();
    return () => {
      cancelled = true;
    };
  }, [selectedKla]); // keep selectedKla in deps so effect can react if it changes elsewhere

  // --------------------------- Fetch members for selected KLA ---------------------------
  useEffect(() => {
    let cancelled = false;
    const loadMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchKlaMembers(selectedKla);
        if (cancelled) return;
        
        console.log("=== API DATA RECEIVED ===");
        console.log("KLA ID:", selectedKla);
        console.log("Raw API response:", data);
        console.log("Is Array:", Array.isArray(data));
        console.log("Total count from API:", data?.length);
        
        // if API returns objects that are already entries, use as is
        if (Array.isArray(data)) {
          setMembers(data);
          setFilteredMembers(data);
          console.log("Members set in state:", data.length);
          console.log("First 3 members sample:", data.slice(0, 3));
        } else {
          console.error("API did not return an array:", data);
          // fallback: if unexpected shape, try to extract .data or keep empty
          setMembers([]);
          setFilteredMembers([]);
        }
      } catch (err) {
        console.error("Error loading members:", err);
        // fallback: small mock so page doesn't crash
        const mock = [
          {
            id: 1,
            kla_id: selectedKla,
            constituency: { entitle: "Mock (MCK)" },
            district: { name: "MockDistrict" },
            member: {
              langs: [{ name: "Mock Member" }],
              gender: 1,
              image: null,
            },
          },
        ];
        setMembers(mock);
        setFilteredMembers(mock);
        setError("Failed to load members from API. Showing fallback data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadMembers();
    return () => {
      cancelled = true;
    };
  }, [selectedKla]);

  // --------------------------- applyFilters (safe string access) ---------------------------
  const applyFilters = useCallback(() => {
    let filtered = Array.isArray(members) ? members.slice() : [];
    
    console.log("=== APPLYING FILTERS ===");
    console.log("Starting with members count:", filtered.length);
    console.log("Active tab:", activeTab);
    console.log("Parliament type:", parliamentType);
    console.log("Assembly selection:", assemblySelection);

    // Parliament type filter (current members tab)
    if (activeTab === "pills-profile2" && parliamentType) {
      const beforeCount = filtered.length;
      filtered = filtered.filter((m) => {
        const cname = (safeConstituency(m) || "").toString();
        return parliamentType === "lok"
          ? cname.includes("(")
          : !cname.includes("(");
      });
      console.log(`Parliament filter (${parliamentType}): ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
    }
    
    // Assembly selection filter
    if (assemblySelection === "women") {
      const beforeCount = filtered.length;
      filtered = filtered.filter((m) => safeGender(m) === "2"); // female
      console.log(`Women filter: ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
    }

    // search filter
    if (searchQuery?.trim()) {
      const beforeCount = filtered.length;
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((m) => {
        const name = (m.member?.langs?.[0]?.name || "").toLowerCase();
        const constituency = (safeConstituency(m) || "").toLowerCase();
        return searchType === "name"
          ? name.includes(q)
          : constituency.includes(q);
      });
      console.log(`Search filter (${searchType}: "${searchQuery}"): ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
    }

    // alphabet filter
    if (activeLetter) {
      const beforeCount = filtered.length;
      filtered = filtered.filter((m) => {
        const name = (m.member?.langs?.[0]?.name || "").toString();
        return name.startsWith(activeLetter);
      });
      console.log(`Alphabet filter (${activeLetter}): ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
    }

    // left-side filters (district, constituency text, gender, party etc.)
    if (filters) {
      if (filters.district) {
        const beforeCount = filtered.length;
        filtered = filtered.filter(
          (m) =>
            (m.district?.name || "").toLowerCase() ===
            filters.district.toLowerCase()
        );
        console.log(`District filter (${filters.district}): ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }

      if (filters.constituency) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((m) =>
          (safeConstituency(m) || "")
            .toLowerCase()
            .includes(filters.constituency.toLowerCase())
        );
        console.log(`Constituency filter (${filters.constituency}): ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }

      if (filters.gender) {
        const beforeCount = filtered.length;
        filtered = filtered.filter(
          (m) => safeGender(m) === String(filters.gender)
        );
        console.log(`Gender filter (${filters.gender}): ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }

      if (filters.party) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((m) => {
          const p = (m.party?.entitle || m.party || "").toLowerCase();
          return p === filters.party.toLowerCase();
        });
        console.log(`Party filter (${filters.party}): ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }

      // Qualification filter
      if (filters.qualification) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((m) => {
          const qual = (m.member?.qualification || m.qualification || "").toLowerCase();
          return qual.includes(filters.qualification.toLowerCase());
        });
        console.log(`Qualification filter: ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }

      // Terms filter (number of terms served)
      if (filters.terms) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((m) => {
          const terms = m.member?.terms || m.terms || 0;
          return Number(terms) === Number(filters.terms);
        });
        console.log(`Terms filter: ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }

      // Position filter
      if (filters.position) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((m) => {
          const position = (m.member?.position || m.position || "").toLowerCase();
          return position.includes(filters.position.toLowerCase());
        });
        console.log(`Position filter: ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }

      // Age filter (age range)
      if (filters.age) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((m) => {
          const dob = m.member?.dob || m.dob;
          if (!dob) return false;
          
          const birthYear = new Date(dob).getFullYear();
          const currentYear = new Date().getFullYear();
          const age = currentYear - birthYear;
          
          const [min, max] = filters.age.includes("+") 
            ? [Number(filters.age.replace("+", "")), Infinity]
            : filters.age.split("-").map(Number);
          
          return age >= min && age <= max;
        });
        console.log(`Age filter: ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }

      // Category filter (constitutional category - multi-select)
      if (filters.category && Array.isArray(filters.category) && filters.category.length > 0) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((m) => {
          const category = (m.member?.category || m.category || "").toString();
          return filters.category.some(cat => 
            category.toLowerCase().includes(cat.toLowerCase())
          );
        });
        console.log(`Category filter: ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }

      // Status filter (membership status)
      if (filters.status) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((m) => {
          const status = (m.reason?.langs?.[0]?.name || m.reason?.name || m.status || "").toLowerCase();
          return status.includes(filters.status.toLowerCase());
        });
        console.log(`Status filter: ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }

      // Members filter (filter by member name)
      if (filters.members) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((m) => {
          const name = (m.member?.langs?.[0]?.name || m.member?.name || "").toLowerCase();
          return name.includes(filters.members.toLowerCase());
        });
        console.log(`Members filter: ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }

      // Start date filter
      if (filters.startDate) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((m) => {
          const startDate = m.start_date || m.startDate;
          if (!startDate) return false;
          return new Date(startDate) >= new Date(filters.startDate);
        });
        console.log(`Start date filter: ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }

      // End date filter
      if (filters.endDate) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((m) => {
          const endDate = m.end_date || m.endDate;
          if (!endDate) return false;
          return new Date(endDate) <= new Date(filters.endDate);
        });
        console.log(`End date filter: ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }

      // Session date filter
      if (filters.sessionDate) {
        const beforeCount = filtered.length;
        filtered = filtered.filter((m) => {
          const sessionId = m.session_id || m.sessionId;
          return String(sessionId) === String(filters.sessionDate);
        });
        console.log(`Session date filter: ${beforeCount} -> ${filtered.length} (removed ${beforeCount - filtered.length})`);
      }
    }

    console.log("=== FINAL FILTERED COUNT:", filtered.length, "===");
    setFilteredMembers(filtered);
    setCurrentMembersPage(1);
  }, [
    members,
    activeTab,
    parliamentType,
    searchQuery,
    searchType,
    activeLetter,
    filters,
    assemblySelection,
  ]);

  // Apply filters for former members
  const applyFormerFilters = useCallback(() => {
    let filtered = Array.isArray(formerMembers) ? formerMembers.slice() : [];
    
    console.log("Applying former filters. Total former members:", filtered.length);

    // search filter
    if (searchQuery?.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((m) => {
        const name = (m.member?.langs?.[0]?.name || "").toLowerCase();
        const constituency = (safeConstituency(m) || "").toLowerCase();
        return searchType === "name"
          ? name.includes(q)
          : constituency.includes(q);
      });
      console.log("After search filter:", filtered.length);
    }

    // alphabet filter
    if (activeLetter) {
      filtered = filtered.filter((m) => {
        const name = (m.member?.langs?.[0]?.name || "").toString();
        return name.startsWith(activeLetter);
      });
      console.log("After alphabet filter:", filtered.length);
    }

    // Apply same filters as current members
    if (filters) {
      if (filters.district) {
        filtered = filtered.filter(
          (m) =>
            (m.district?.name || "").toLowerCase() ===
            filters.district.toLowerCase()
        );
        console.log("After district filter:", filtered.length);
      }

      if (filters.constituency) {
        filtered = filtered.filter((m) =>
          (safeConstituency(m) || "")
            .toLowerCase()
            .includes(filters.constituency.toLowerCase())
        );
        console.log("After constituency filter:", filtered.length);
      }

      if (filters.gender) {
        filtered = filtered.filter(
          (m) => safeGender(m) === String(filters.gender)
        );
        console.log("After gender filter:", filtered.length);
      }

      if (filters.party) {
        filtered = filtered.filter((m) => {
          const p = (m.party?.entitle || m.party || "").toLowerCase();
          return p === filters.party.toLowerCase();
        });
        console.log("After party filter:", filtered.length);
      }
    }

    console.log("Final filtered former members:", filtered.length);
    return filtered;
  }, [formerMembers, searchQuery, searchType, activeLetter, filters]);

  useEffect(() => {
    // Only apply when members changed or filters changed
    applyFilters();
  }, [applyFilters]);

  // --------------------------- pagination derived values ---------------------------
  const totalCurrentMembers = filteredMembers.length;
  const totalCurrentPages = Math.max(
    1,
    Math.ceil(totalCurrentMembers / itemsPerPage)
  );
  const currentMembers = useMemo(() => {
    const start = (currentMembersPage - 1) * itemsPerPage;
    const paged = filteredMembers.slice(start, start + itemsPerPage);
    console.log("=== PAGINATION INFO ===");
    console.log("Total filtered members:", totalCurrentMembers);
    console.log("Items per page:", itemsPerPage);
    console.log("Total pages:", totalCurrentPages);
    console.log("Current page:", currentMembersPage);
    console.log("Showing items:", start + 1, "to", Math.min(start + itemsPerPage, totalCurrentMembers));
    console.log("Items on this page:", paged.length);
    return paged;
  }, [filteredMembers, currentMembersPage, totalCurrentMembers, totalCurrentPages]);

  // Former members pagination - WITH FILTERS
  const filteredFormerMembers = useMemo(() => applyFormerFilters(), [applyFormerFilters]);
  const totalFormerMembers = filteredFormerMembers.length;
  const totalFormerPages = Math.max(
    1,
    Math.ceil(totalFormerMembers / itemsPerPage)
  );
  const pagedFormerMembers = useMemo(() => {
    const start = (formerMembersPage - 1) * itemsPerPage;
    const paged = filteredFormerMembers.slice(start, start + itemsPerPage);
    console.log("Paged former members:", paged.length, "items on page", formerMembersPage);
    return paged;
  }, [formerMembersPage, filteredFormerMembers]);

  // --------------------------- handlers ---------------------------
  const toggleFilter = () => setIsFilterOpen((s) => !s);

  const handleLetterClick = (letter) => {
    setActiveLetter(letter);
    setCurrentMembersPage(1);
    setFormerMembersPage(1); // Reset former members page too
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setCurrentMembersPage(1);
    setFormerMembersPage(1);
    setSearchQuery("");
    setActiveLetter("");
  };

  const handlePageChange = (page) => {
    if (activeTab === "pills-profile2") setCurrentMembersPage(page);
    else setFormerMembersPage(page);

    if (sectionTopRef.current) {
      sectionTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleFilterSubmit = (newFilters) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
    // applyFilters will run via effect
  };

  const handleSearch = () => {
    if (activeTab === "pills-profile2") {
      applyFilters();
    }
    // For former members, the filters are applied automatically via useMemo
    setCurrentMembersPage(1);
    setFormerMembersPage(1);
  };
  const appliedFilterCount = Object.values(filters).filter(Boolean).length;

  // --------------------------- UI ---------------------------
  return (
    <div className="body_content">
      {/* <header className={`header-nav nav-homepage-style2 stricky main-menu`}>
        <HomeTest />
      </header> */}

      <header
        className={`header-nav nav-homepage-style2 stricky main-menu ${
          isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
        }`}
      >
        <HomeTest />
      </header>

      <CategoriesNav />
      <BreadcrumbNav
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Members", href: "/members" },
          {
            name: "Members of Niyamasabha",
            href: "/Members/Niyamasabha-Members",
          },
        ]}
      />

      <section className="pt30 pb-0 pb30-md represent" ref={sectionTopRef}>
        <div className="container">
          <SectionTitle title="Members of Niyamasabha" />

          <Tabs
            tabs={[
              {
                key: "pills-profile2",
                label: "Sitting Members",
                content: (
                  <section className="mt-2 pt-2">
                    {/* TOP FILTER ROW: KLA dropdown + Assembly selection + Search */}
                    {/* TOP FILTER ROW: KLA dropdown + Assembly selection */}
                    <div className="row mb-3 align-items-center memb-list-top-filter">
                      <div className="col-md-12 mb20">
                        <div className="memb-filt-div rounded">
                          <div className="d-flex gap-2 align-items-center flex-wrap">
                            <label className="heading-color ff-heading fw500 mb0">
                              KLA
                            </label>
                            <select
                              className="form-select w-auto"
                              value={selectedKla}
                              onChange={(e) =>
                                setSelectedKla(Number(e.target.value))
                              }
                            >
                              {klaList
                                .filter((kla) => kla.id === 15)
                                .map((kla) => (
                                  <option key={kla.id} value={kla.id}>
                                    {kla.languages?.[0]?.name || `15th KLA`}
                                  </option>
                                ))}
                              {klaList.length === 0 && (
                                <option value={15}>15th നിയമസഭ</option>
                              )}
                            </select>

                            <label className="heading-color ff-heading fw500 mb0">
                              Legislative Assembly
                            </label>
                            <select
                              className="form-select w-auto"
                              value={assemblySelection}
                              onChange={(e) =>
                                setAssemblySelection(e.target.value)
                              }
                            >
                              <option value="sitting">Sitting Members</option>
                              <option value="women">Women Members</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="bg-white rounded">
                          <SearchForm
                            searchType={searchType}
                            setSearchType={setSearchType}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            onSearch={handleSearch}
                          />
                        </div>
                      </div>
                    </div>

                    {/* small gap then controls */}
                    {/* <FilterControls onFilterClick={toggleFilter} /> */}

                    <FilterControls
                      onFilterClick={toggleFilter}
                      appliedCount={appliedFilterCount}
                    />

                    <AlphabetFilter
                      onLetterClick={handleLetterClick}
                      activeLetter={activeLetter}
                    />

                    {/* Parliament type radios */}
                    {/* <ParliamentTypeSelector
                      parliamentType={parliamentType}
                      setParliamentType={setParliamentType}
                    /> */}

                    {/* Member grid */}
                    <div className="member-grid memberList">
                      {loading ? (
                        <p>Loading members...</p>
                      ) : error ? (
                        <p className="text-danger">{error}</p>
                      ) : currentMembers.length > 0 ? (
                        currentMembers.map((m) => (
                          <MemberCard
                            key={m.id}
                            member={m}
                            navigate={navigate}
                            selectedKla={selectedKla}
                          />
                        ))
                      ) : (
                        <div className="text-center my-4">
                          <h4>No members found matching your criteria</h4>
                          <button
                            className="btn clr-fltr-btn mt-3"
                            onClick={() => {
                              setSearchQuery("");
                              setActiveLetter("");
                              setFilters({
                                district: "",
                                constituency: "",
                                gender: "",
                                party: "",
                                qualification: "",
                                terms: "",
                              });
                            }}
                          >
                            Clear Filters
                          </button>
                        </div>
                      )}
                    </div>

                    <Pagination
                      currentPage={currentMembersPage}
                      totalPages={totalCurrentPages}
                      onPageChange={handlePageChange}
                      totalItems={totalCurrentMembers}
                      itemsPerPage={itemsPerPage}
                    />
                  </section>
                ),
              },
              {
                key: "pills-contact3",
                label: "Former Members",
                content: (
                  <section className="pt30 pb30">
                    {/* For former - show similar top filter row if you want */}
                    <div className="row mb-3 align-items-center memb-list-top-filter">
                      <div className="col-md-12 mb20">
                        <div className="memb-filt-div rounded">
                          <div className="d-flex gap-2 align-items-center flex-wrap">
                            <label className="heading-color ff-heading fw500 mb0">
                              KLA
                            </label>
                            <select
                              className="form-select w-auto"
                              value={selectedKla}
                              onChange={(e) =>
                                setSelectedKla(Number(e.target.value))
                              }
                            >
                              {klaList
                                .filter((kla) => kla.id === 14)
                                .map((kla) => (
                                  <option key={kla.id} value={kla.id}>
                                    {kla.languages?.[0]?.name || `14th KLA`}
                                  </option>
                                ))}
                              {klaList.length === 0 && (
                                <option value={14}>14th നിയമസഭ</option>
                              )}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="bg-white  rounded">
                          <SearchForm
                            searchType={searchType}
                            setSearchType={setSearchType}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            onSearch={handleSearch}
                          />
                        </div>
                      </div>
                    </div>

                    <FilterControls
                      onFilterClick={toggleFilter}
                      appliedCount={appliedFilterCount}
                    />
                    <AlphabetFilter
                      onLetterClick={handleLetterClick}
                      activeLetter={activeLetter}
                    />

                    <div className="pt30">
                      <h4 className="title mb20">
                        Former Members of Parliament
                      </h4>

                      <div className="member-grid memberList">
                        {formerLoading ? (
                          <p>Loading former members...</p>
                        ) : formerError ? (
                          <p className="text-danger">{formerError}</p>
                        ) : pagedFormerMembers.length > 0 ? (
                          pagedFormerMembers.map((m) => (
                            <MemberCard
                              key={m.id}
                              member={m}
                              navigate={navigate}
                              selectedKla={14}
                            />
                          ))
                        ) : (
                          <div className="text-center my-4">
                            <h4>No former members found matching your criteria</h4>
                            <button
                              className="btn clr-fltr-btn mt-3"
                              onClick={() => {
                                setSearchQuery("");
                                setActiveLetter("");
                                setFilters({
                                  district: "",
                                  constituency: "",
                                  gender: "",
                                  party: "",
                                  qualification: "",
                                  terms: "",
                                });
                                setFormerMembersPage(1);
                              }}
                            >
                              Clear Filters
                            </button>
                          </div>
                        )}
                      </div>

                      <Pagination
                        currentPage={formerMembersPage}
                        totalPages={totalFormerPages}
                        onPageChange={handlePageChange}
                        totalItems={totalFormerMembers}
                        itemsPerPage={itemsPerPage}
                      />
                    </div>
                  </section>
                ),
              },
            ]}
            activeKey={activeTab}
            onChange={handleTabChange}
          />
        </div>
      </section>

      {/* Left sliding filter component (your existing Filter component) */}
      {isFilterOpen && (
        <FilterComponent
          isOpen={isFilterOpen}
          filters={filters}
          klaId={selectedKla}
          onClose={() => setIsFilterOpen(false)}
          onSubmit={handleFilterSubmit}
        />
      )}
    </div>
  );
};

export default MemberList;
