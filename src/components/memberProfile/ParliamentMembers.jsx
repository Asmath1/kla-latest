// --------------------------changed on 29 oct------------------------

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import FilterComponent from "./Filter";
import DownloadSelector from "./Download";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import HomeTest from "../Header";
import { Tabs } from "../common";
import { BreadcrumbNav, CategoriesNav, Filter, SectionTitle } from "../common";
import "./MemberProfile.css";
// Member card component for reusability
// const MemberCard = ({ member, navigate }) => {
//   return (
//     <div className="col-6 col-md-4 col-lg-2 col-xl-2">
//       <div
//         className="job-list-style1 bdr1 text-center"
//         onClick={() => navigate(`/member-profile/${member.id}`)}
//         style={{ cursor: "pointer" }}
//       >
//         <div className="icon d-flex align-items-center mb20">
//           <img
//             className="mx-auto"
//             src={member.image || "/placeholder.svg"}
//             alt={member.name}
//           />
//           <h6 className="parts">{member.party}</h6>
//         </div>
//         <div className="details">
//           <h5 className="mb10">{member.name}</h5>
//           <h6>{member.constituency}</h6>
//         </div>
//       </div>
//     </div>
//   );
// };

const MemberCard = ({ member, navigate }) => {
  return (
    <div
      className="member-card job-list-style1 bdr1 text-center"
      onClick={() => navigate(`/member-profile/${member.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="icon d-flex align-items-center mb20">
        <img
          className="mx-auto"
          src={member.image || "/images/prof-dummy.png"}
          alt={member.name}
        />
        <h6 className="parts">{member.party}</h6>
      </div>
      <div className="details">
        <h5 className="mb10 member-name">{member.name}</h5>
        <h6 className="member-constituency">{member.constituency}</h6>
      </div>
    </div>
  );
};

// Pagination component
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
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      }

      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push("...");
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

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
            <FontAwesomeIcon icon={faAngleLeft} color="#222222" />
          </a>
        </li>

        {getPageNumbers().map((page, index) => (
          <li
            key={index}
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
                  if (typeof page === "number") {
                    const next = Math.max(1, Math.min(page, totalPages));
                    onPageChange(next);
                  }
                }}
              >
                {page}{" "}
                {page === currentPage && (
                  <span className="sr-only">(current)</span>
                )}
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
            <FontAwesomeIcon icon={faAngleRight} color="#222222" />
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

// Alphabet filter component
const AlphabetFilter = ({ onLetterClick, activeLetter }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="alphabets d-flex w-100 wow fadeInUp">
      {alphabet.map((letter, index) => (
        <a
          href="#"
          key={index}
          className={activeLetter === letter ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            onLetterClick(letter);
          }}
          style={activeLetter === letter ? {} : {}}
        >
          {letter}
        </a>
      ))}
    </div>
  );
};

// Filter and download controls component
const FilterControls = ({ onFilterClick = () => {} }) => {
  return (
    <div className="row align-items-center mb20">
      <div className="col-6 col-sm-6 col-lg-9 pe-0">
        <div className="text-center text-sm-start">
          <div className="dropdown-lists">
            <ul className="p-0 mb-0 text-center text-sm-start">
              <li className="list-inline-item">
                <button
                  type="button"
                  className="open-btn filter-btn-left mb10"
                  onClick={onFilterClick}
                >
                  <img
                    className="me-2"
                    src="images/all-filter-icon.svg"
                    alt=""
                  />{" "}
                  All Filter
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <DownloadSelector />
    </div>
  );
};

// Parliament type selector component
const ParliamentTypeSelector = ({ parliamentType, setParliamentType }) => {
  return (
    <div className="mSearch d-flex">
      <form action="">
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="parliamentType"
              id="inlineRadiox"
              value="lok"
              checked={parliamentType === "lok"}
              onChange={() => setParliamentType("lok")}
            />
            <label className="form-check-label" htmlFor="inlineRadiox">
              <b>Lok Sabha</b>
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="parliamentType"
              id="inlineRadioy"
              value="rajya"
              checked={parliamentType === "rajya"}
              onChange={() => setParliamentType("rajya")}
            />
            <label className="form-check-label" htmlFor="inlineRadioy">
              <b>Rajya Sabha</b>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

// Sample member data
const lokSabhaMembers = [
  { id: 1, name: "Antony, Shri Anto", constituency: "Pathanamthitta" },
  { id: 2, name: "Basheer, Shri E T Mohammed", constituency: "Malappuram" },
  { id: 3, name: "Behanan, Shri Benny", constituency: "Chalakudy" },
  { id: 4, name: "Eden, Shri Hibi", constituency: "Ernakulam" },
  { id: 5, name: "George, Adv K. Francis", constituency: "Kottayam" },
  { id: 6, name: "Gopi, Shri Suresh", constituency: "Thrissur" },
  { id: 7, name: "Kuriakose, Adv Dean", constituency: "Idukki" },
  { id: 8, name: "Parambil, Shri Shafi", constituency: "Vadakara" },
  { id: 9, name: "Prakash, Adv. Adoor", constituency: "Attingal" },
  { id: 10, name: "Premachandran, Shri N K", constituency: "Kollam" },
  { id: 11, name: "Radhakrishnan, Shri K", constituency: "Alathur(SC)" },
  { id: 12, name: "Raghavan, Shri M K", constituency: "Kozhikode" },
  { id: 13, name: "Samadani, Dr. M P Abdussamad", constituency: "Ponnani" },
  { id: 14, name: "Sreekandan, Shri V K", constituency: "Palakkad" },
  { id: 15, name: "Sudhakaran, Shri K", constituency: "Kannur" },
  { id: 16, name: "Suresh, Shri Kodikunnil", constituency: "Mavelikkara(SC)" },
  { id: 17, name: "Tharoor, Dr. Shashi", constituency: "Thiruvananthapuram" },
  { id: 18, name: "Unnithan, Shri Rajmohan", constituency: "Kasaragod" },
  { id: 19, name: "Vadra, Smt. Priyanka Gandhi", constituency: "Wayanad" },
  { id: 20, name: "Venugopal, Shri K C", constituency: "Alappuzha" },
];

const rajyaSabhaMembers = [
  {
    id: 1,
    name: "Abdul Wahab, Shri",
    constituency: "Kerala",
  },
  {
    id: 2,
    name: "Beeran, Shri Haris",
    constituency: "Kerala",
  },
  {
    id: 3,
    name: "Brittas, Dr. John",
    constituency: "Kerala",
  },
  {
    id: 4,
    name: "Mani, Shri Jose K.",
    constituency: "Kerala",
  },
  {
    id: 5,
    name: "Mather Hisham, Smt. Jebi",
    constituency: "Kerala",
  },
  {
    id: 6,
    name: "P, Shri Sandosh Kumar",
    constituency: "Kerala",
  },
  {
    id: 7,
    name: "Rahim, Shri A. A.",
    constituency: "Kerala",
  },
  {
    id: 8,
    name: "Sivadasan, Dr. V.",
    constituency: "Kerala",
  },
  {
    id: 9,
    name: "Suneer, Shri P. P.",
    constituency: "Kerala",
  },
];

const allMembers = [
  ...lokSabhaMembers.map((m) => ({ ...m, house: "Lok Sabha" })),
  ...rajyaSabhaMembers.map((m) => ({ ...m, house: "Rajya Sabha" })),
];
const sampleMembers = allMembers;
// Duplicate the data to have more entries (ensure multiple pages)
// const sampleMembers = Array.from({ length: 10 }).flatMap((_, multIndex) =>
//   allMembers.map((member, idx) => ({
//     ...member,
//     id: multIndex * allMembers.length + idx + 1,
//   }))
// );
const SearchForm = ({
  searchType,
  setSearchType,
  searchQuery,
  setSearchQuery,
  onSearch,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="mSearch wow fadeInUp">
      <form onSubmit={handleSubmit}>
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

// Main MemberList component
const ParliamentMembers = () => {
  const navigate = useNavigate();
  const sectionTopRef = useRef(null);
  const [activeTab, setActiveTab] = useState("pills-profile2");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");

  const [activeLetter, setActiveLetter] = useState("");
  const [parliamentType, setParliamentType] = useState("lok");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // 4 rows x 6 columns per page
  const [filters, setFilters] = useState({
    constituency: "",
    party: "",
    qualification: "",
    terms: "",
    position: "",
    age: "",
    gender: "",
    category: "",
    status: "",
    members: "",
  });
  const [filteredMembers, setFilteredMembers] = useState(sampleMembers);
  const totalItems = filteredMembers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Ensure currentPage stays within valid bounds when filters/data change
  useEffect(() => {
    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Handle pagination change and scroll to section top
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (sectionTopRef.current) {
      sectionTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Function to handle tab change
  const handleTabChange = (tabId) => {
    // Prevent unnecessary re-filtering and re-renders
    setActiveTab(tabId);
    setCurrentPage(1);
    setSearchQuery("");
    setActiveLetter("");

    // Only apply filters for Current Members tab
    if (tabId === "pills-profile2") {
      applyFilters();
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleLetterClick = (letter) => {
    if (activeLetter === letter) {
      setActiveLetter("");
    } else {
      setActiveLetter(letter);
    }
    setCurrentPage(1);
  };

  // Function to handle download format change
  const handleDownloadChange = (format) => {
    console.log(`Downloading in ${format} format`);
  };

  const applyFilters = useCallback(() => {
    let filtered = sampleMembers;

    // if (activeTab === "pills-profile2") {
    //   filtered = filtered.filter((member) =>
    //     parliamentType === "lok"
    //       ? member.constituency.includes("(")
    //       : !member.constituency.includes("(")
    //   );
    if (activeTab === "pills-profile2") {
      filtered = filtered.filter(
        (member) =>
          (parliamentType === "lok" && member.house === "Lok Sabha") ||
          (parliamentType === "rajya" && member.house === "Rajya Sabha")
      );
    } else if (activeTab === "pills-contact3") {
      filtered = filtered.filter((member) => member.status === "Inactive");
    } else {
      filtered = filtered.filter((member) => member.status === "Active");
    }

    if (searchQuery) {
      if (searchType === "name") {
        filtered = filtered.filter((member) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        filtered = filtered.filter((member) =>
          member.constituency.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }

    if (activeLetter) {
      filtered = filtered.filter((member) =>
        member.name.startsWith(activeLetter)
      );
    }

    if (filters.constituency) {
      filtered = filtered.filter((member) =>
        member.constituency.includes(filters.constituency)
      );
    }

    if (filters.party) {
      filtered = filtered.filter((member) => member.party === filters.party);
    }

    if (filters.qualification) {
      filtered = filtered.filter(
        (member) => member.qualification === filters.qualification
      );
    }

    if (filters.terms) {
      filtered = filtered.filter(
        (member) => member.terms === Number.parseInt(filters.terms)
      );
    }

    if (filters.position) {
      filtered = filtered.filter(
        (member) => member.position === filters.position
      );
    }

    if (filters.age) {
      filtered = filtered.filter((member) => member.age === filters.age);
    }

    if (filters.gender) {
      filtered = filtered.filter((member) => member.gender === filters.gender);
    }

    if (filters.category) {
      filtered = filtered.filter(
        (member) => member.category === filters.category
      );
    }

    if (filters.status) {
      filtered = filtered.filter((member) => member.status === filters.status);
    }

    setFilteredMembers(filtered);
  }, [
    activeTab,
    parliamentType,
    searchQuery,
    searchType,
    activeLetter,
    filters,
  ]);

  useEffect(() => {
    if (activeTab === "pills-profile2") {
      applyFilters();
    }
  }, [applyFilters, activeTab]);

  // Get current members for pagination
  const getCurrentMembers = () => {
    const indexOfLastMember = currentPage * itemsPerPage;
    const indexOfFirstMember = indexOfLastMember - itemsPerPage;
    return filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
  };

  // Function to handle filter submission from the filter component
  const handleFilterSubmit = (newFilters) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
    applyFilters();
  };
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleSearch = () => {
    applyFilters();
    setCurrentPage(1);
  };
  const formerMembers = [
    {
      name: "Shri. A. B. Dev",
      tenure: "1952 – 1957",
      img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
    },
    {
      name: "Smt. Lakshmi Amma",
      tenure: "1960 – 1965",
      img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
    },
    {
      name: "Shri. Madhavan Nair",
      tenure: "1970 – 1976",
      img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
    },
    {
      name: "Shri. Madhavan Nair",
      tenure: "1970 – 1976",
      img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
    },
    {
      name: "Shri. Madhavan Nair",
      tenure: "1970 – 1976",
      img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
    },
    {
      name: "Shri. Madhavan Nair",
      tenure: "1970 – 1976",
      img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
    },
    {
      name: "Shri. Madhavan Nair",
      tenure: "1970 – 1976",
      img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
    },
    {
      name: "Shri. Madhavan Nair",
      tenure: "1970 – 1976",
      img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
    },
    {
      name: "Shri. Madhavan Nair",
      tenure: "1970 – 1976",
      img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
    },
    {
      name: "Shri. Madhavan Nair",
      tenure: "1970 – 1976",
      img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
    },
  ];

  const pagedFormerMembers = useMemo(
    () =>
      formerMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [formerMembers, currentPage, itemsPerPage]
  );

  return (
    <div className="body_content">
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
            name: "Members of Parliament",
            href: "/Members/Parliament-Members",
          },
        ]}
      />
      <section className="pt30 pb-0 pb30-md represent" ref={sectionTopRef}>
        <div className="container">
          <SectionTitle title="Members of Parliament" />
          <Tabs
            tabs={[
              {
                key: "pills-profile2",
                label: "Sitting Members",
                content: (
                  <section className="mt-2 pt-2">
                    <ParliamentTypeSelector
                      parliamentType={parliamentType}
                      setParliamentType={setParliamentType}
                    />
                    <FilterControls
                      onFilterClick={toggleFilter}
                      onDownloadChange={handleDownloadChange}
                    />

                    <div className="member-grid memberList">
                      {getCurrentMembers().map((member) => (
                        <MemberCard
                          key={member.id}
                          member={member}
                          navigate={navigate}
                        />
                      ))}
                    </div>

                    {filteredMembers.length > 0 ? (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                      />
                    ) : (
                      <div className="text-center mt-5">
                        <h4>No members found matching your criteria</h4>
                        <button
                          className="btn btn-primary mt-3"
                          onClick={() => {
                            setSearchQuery("");
                            setActiveLetter("");
                            setFilters({
                              constituency: "",
                              party: "",
                              qualification: "",
                              terms: "",
                              position: "",
                              age: "",
                              gender: "",
                              category: "",
                              status: "",
                              members: "",
                            });
                            applyFilters();
                          }}
                        >
                          Clear Filters
                        </button>
                      </div>
                    )}
                  </section>
                ),
              },
              {
                key: "pills-contact3",
                label: "Former Members",
                content: (
                  <section className="pt30 pb30">
                    <div className="memb">
                      <Filter filterKeys={["KLA", "GENDER"]} />
                      <SearchForm
                        searchType={searchType}
                        setSearchType={setSearchType}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onSearch={handleSearch}
                      />
                      <FilterControls
                        onFilterClick={toggleFilter}
                        onDownloadChange={handleDownloadChange}
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
                          {pagedFormerMembers.map((m, idx) => (
                            <div
                              className="member-card job-list-style1 bdr1 text-center"
                              key={idx}
                              onClick={() =>
                                window.open(
                                  `pdfs/former-members/${m.name
                                    .toLowerCase()
                                    .replace(/ /g, "-")}.pdf`,
                                  "_blank",
                                  "noopener,noreferrer"
                                )
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <div className="icon d-flex align-items-center mb20">
                                <img
                                  className="mx-auto"
                                  src={m.img}
                                  alt={m.name}
                                  style={{
                                    width: 130,
                                    height: 180,
                                    objectFit: "cover",
                                  }}
                                  onError={(e) =>
                                    (e.target.src = "images/speaker.jpg")
                                  }
                                />
                              </div>
                              <div className="details">
                                <h5 className="mb10 member-name">{m.name}</h5>
                                <h6 className="member-constituency">
                                  {m.tenure}
                                </h6>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      totalItems={totalItems}
                      itemsPerPage={itemsPerPage}
                    />
                  </section>
                ),
              },
            ]}
            onChange={(key) => handleTabChange(key)}
          />
        </div>
      </section>
      {isFilterOpen && (
        <FilterComponent
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onSubmit={handleFilterSubmit}
        />
        //         <FilterComponent
        //   isOpen={isFilterOpen}
        //   onClose={() => setIsFilterOpen(false)}
        //   filters={{}}
        //   onSubmit={applyFilters}
        // />
      )}
    </div>
  );
};

export default ParliamentMembers;
// ------------------------------------------------------------------------------------

// "use client";

// import { useState, useEffect, useCallback, useRef, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import FilterComponent from "./Filter";
// import DownloadSelector from "./Download";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import HomeTest from "../Header";
// import { Tabs } from "../common";
// import { BreadcrumbNav, CategoriesNav, Filter, SectionTitle } from "../common";
// import "./MemberProfile.css";
// // Member card component for reusability
// // const MemberCard = ({ member, navigate }) => {
// //   return (
// //     <div className="col-6 col-md-4 col-lg-2 col-xl-2">
// //       <div
// //         className="job-list-style1 bdr1 text-center"
// //         onClick={() => navigate(`/member-profile/${member.id}`)}
// //         style={{ cursor: "pointer" }}
// //       >
// //         <div className="icon d-flex align-items-center mb20">
// //           <img
// //             className="mx-auto"
// //             src={member.image || "/placeholder.svg"}
// //             alt={member.name}
// //           />
// //           <h6 className="parts">{member.party}</h6>
// //         </div>
// //         <div className="details">
// //           <h5 className="mb10">{member.name}</h5>
// //           <h6>{member.constituency}</h6>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// const MemberCard = ({ member, navigate }) => {
//   return (
//     <div
//       className="member-card job-list-style1 bdr1 text-center"
//       onClick={() => navigate(`/member-profile/${member.id}`)}
//       style={{ cursor: "pointer" }}
//     >
//       <div className="icon d-flex align-items-center mb20">
//         <img
//           className="mx-auto"
//           src={member.image || "/placeholder.svg"}
//           alt={member.name}
//         />
//         <h6 className="parts">{member.party}</h6>
//       </div>
//       <div className="details">
//         <h5 className="mb10 member-name">{member.name}</h5>
//         <h6 className="member-constituency">{member.constituency}</h6>
//       </div>
//     </div>
//   );
// };

// // Pagination component
// const Pagination = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   totalItems,
//   itemsPerPage = 24,
// }) => {
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxPagesToShow = 5;

//     if (totalPages <= maxPagesToShow) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       pages.push(1);
//       let start = Math.max(2, currentPage - 1);
//       let end = Math.min(totalPages - 1, currentPage + 1);

//       if (currentPage <= 3) {
//         end = 4;
//       }

//       if (currentPage >= totalPages - 2) {
//         start = totalPages - 3;
//       }

//       if (start > 2) {
//         pages.push("...");
//       }
//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }
//       if (end < totalPages - 1) {
//         pages.push("...");
//       }

//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   return (
//     <div className="mbp_pagination mt30 text-center">
//       <ul className="page_navigation">
//         <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//           <a
//             className="page-link"
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               if (currentPage > 1) onPageChange(currentPage - 1);
//             }}
//           >
//             <FontAwesomeIcon icon={faAngleLeft} color="#222222" />
//           </a>
//         </li>

//         {getPageNumbers().map((page, index) => (
//           <li
//             key={index}
//             className={`page-item ${page === currentPage ? "active" : ""} ${
//               page === "..." ? "d-none d-sm-inline-block" : ""
//             }`}
//             aria-current={page === currentPage ? "page" : undefined}
//           >
//             {page === "..." ? (
//               <a className="page-link" href="#">
//                 ...
//               </a>
//             ) : (
//               <a
//                 className="page-link"
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (typeof page === "number") {
//                     const next = Math.max(1, Math.min(page, totalPages));
//                     onPageChange(next);
//                   }
//                 }}
//               >
//                 {page}{" "}
//                 {page === currentPage && (
//                   <span className="sr-only">(current)</span>
//                 )}
//               </a>
//             )}
//           </li>
//         ))}

//         <li
//           className={`page-item ${
//             currentPage === totalPages ? "disabled" : ""
//           }`}
//         >
//           <a
//             className="page-link"
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               if (currentPage < totalPages) onPageChange(currentPage + 1);
//             }}
//           >
//             <FontAwesomeIcon icon={faAngleRight} color="#222222" />
//           </a>
//         </li>
//       </ul>
//       <p className="mt10 mb-0 pagination_page_count text-center">
//         {Math.min(1 + (currentPage - 1) * itemsPerPage, totalItems)} –{" "}
//         {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
//       </p>
//     </div>
//   );
// };

// // Alphabet filter component
// const AlphabetFilter = ({ onLetterClick, activeLetter }) => {
//   const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

//   return (
//     <div className="alphabets d-flex w-100 wow fadeInUp">
//       {alphabet.map((letter, index) => (
//         <a
//           href="#"
//           key={index}
//           className={activeLetter === letter ? "active" : ""}
//           onClick={(e) => {
//             e.preventDefault();
//             onLetterClick(letter);
//           }}
//           style={activeLetter === letter ? {} : {}}
//         >
//           {letter}
//         </a>
//       ))}
//     </div>
//   );
// };

// // Filter and download controls component
// const FilterControls = ({ onFilterClick = () => {} }) => {
//   return (
//     <div className="row align-items-center mb20">
//       <div className="col-6 col-sm-6 col-lg-9 pe-0">
//         <div className="text-center text-sm-start">
//           <div className="dropdown-lists">
//             <ul className="p-0 mb-0 text-center text-sm-start">
//               <li className="list-inline-item">
//                 <button
//                   type="button"
//                   className="open-btn filter-btn-left mb10"
//                   onClick={onFilterClick}
//                 >
//                   <img
//                     className="me-2"
//                     src="images/all-filter-icon.svg"
//                     alt=""
//                   />{" "}
//                   All Filter
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <DownloadSelector />
//     </div>
//   );
// };

// // Parliament type selector component
// const ParliamentTypeSelector = ({ parliamentType, setParliamentType }) => {
//   return (
//     <div className="mSearch d-flex">
//       <form action="">
//         <div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="parliamentType"
//               id="inlineRadiox"
//               value="lok"
//               checked={parliamentType === "lok"}
//               onChange={() => setParliamentType("lok")}
//             />
//             <label className="form-check-label" htmlFor="inlineRadiox">
//               <b>Lok Sabha</b>
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="parliamentType"
//               id="inlineRadioy"
//               value="rajya"
//               checked={parliamentType === "rajya"}
//               onChange={() => setParliamentType("rajya")}
//             />
//             <label className="form-check-label" htmlFor="inlineRadioy">
//               <b>Rajya Sabha</b>
//             </label>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// // Sample member data
// const allMembers = [
//   {
//     id: 1,
//     name: "Ramachandran K",
//     constituency: "Kannur (KNR)",
//     party: "CPI",
//     image: "images/rama.png",
//     qualification: "Graduate",
//     terms: 2,
//     position: "Minister",
//     age: "51-60",
//     gender: "Male",
//     category: "General",
//     status: "Active",
//     members: "All",
//   },
//   {
//     id: 2,
//     name: "J Chinchurani",
//     constituency: "Chadayamangalam (TVPM)",
//     party: "CPI",
//     image: "images/j-chinchurani_member_15_198.jpg",
//     qualification: "Post Graduate",
//     terms: 1,
//     position: "",
//     age: "41-50",
//     gender: "Female",
//     category: "General",
//     status: "Active",
//     members: "All",
//   },
//   {
//     id: 3,
//     name: "E K Vijayan",
//     constituency: "Kunnamangalam",
//     party: "CPI",
//     image: "images/e-k-vijayan--_member_15_140.jpg",
//     qualification: "Graduate",
//     terms: 3,
//     position: "",
//     age: "61-70",
//     gender: "Male",
//     category: "OBC",
//     status: "Active",
//     members: "All",
//   },
//   {
//     id: 4,
//     name: "E K Vijayan",
//     constituency: "KozhikodeNorth",
//     party: "CPI",
//     image: "images/e-k-vijayan--_member_15_140.jpg",
//     qualification: "Graduate",
//     terms: 2,
//     position: "",
//     age: "51-60",
//     gender: "Male",
//     category: "General",
//     status: "Active",
//   },
//   {
//     id: 5,
//     name: "Anil Kumar",
//     constituency: "KozhikodeNorth",
//     party: "CPI(M)",
//     image: "images/e-k-vijayan--_member_15_140.jpg",
//     qualification: "Doctorate",
//     terms: 1,
//     position: "",
//     age: "41-50",
//     gender: "Male",
//     category: "SC",
//     status: "Active",
//   },
//   {
//     id: 6,
//     name: "Priya Rajan",
//     constituency: "Chathannoor",
//     party: "CPI(M)",
//     image: "images/e-k-vijayan--_member_15_140.jpg",
//     qualification: "Post Graduate",
//     terms: 2,
//     position: "Speaker",
//     age: "30-40",
//     gender: "Female",
//     category: "General",
//     status: "Active",
//   },
//   {
//     id: 7,
//     name: "Rajesh Kumar",
//     constituency: "Haripad",
//     party: "INC",
//     image: "images/e-k-vijayan--_member_15_140.jpg",
//     qualification: "Graduate",
//     terms: 4,
//     position: "",
//     age: "61-70",
//     gender: "Male",
//     category: "General",
//     status: "Active",
//   },
//   {
//     id: 8,
//     name: "K P Kunhammed Kutty Master",
//     constituency: "Chathannoor",
//     party: "CPI",
//     image: "images/abdul.jpg",
//     qualification: "Post Graduate",
//     terms: 3,
//     position: "Deputy Speaker",
//     age: "71+",
//     gender: "Male",
//     category: "OBC",
//     status: "Active",
//   },
// ];

// // Duplicate the data to have more entries (ensure multiple pages)
// const sampleMembers = Array.from({ length: 10 }).flatMap((_, multIndex) =>
//   allMembers.map((member, idx) => ({
//     ...member,
//     id: multIndex * allMembers.length + idx + 1,
//   }))
// );
// const SearchForm = ({
//   searchType,
//   setSearchType,
//   searchQuery,
//   setSearchQuery,
//   onSearch,
// }) => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch();
//   };

//   return (
//     <div className="mSearch wow fadeInUp">
//       <form onSubmit={handleSubmit}>
//         <h6 className="mb-2">Search your Member By</h6>

//         <div className="rowW">
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="searchType"
//               id="inlineRadio1"
//               value="name"
//               checked={searchType === "name"}
//               onChange={() => setSearchType("name")}
//             />
//             <label className="form-check-label" htmlFor="inlineRadio1">
//               Name
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="searchType"
//               id="inlineRadio2"
//               value="constituency"
//               checked={searchType === "constituency"}
//               onChange={() => setSearchType("constituency")}
//             />
//             <label className="form-check-label" htmlFor="inlineRadio2">
//               Constituency
//             </label>
//           </div>
//         </div>
//         <div className="col-md-4 mt-2 col-xl-3 col-sm-12">
//           <div className="memberSearch">
//             <input
//               type="text"
//               className="form-control py-2"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// // Main MemberList component
// const ParliamentMembers = () => {
//   const navigate = useNavigate();
//   const sectionTopRef = useRef(null);
//   const [activeTab, setActiveTab] = useState("pills-profile2");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchType, setSearchType] = useState("name");

//   const [activeLetter, setActiveLetter] = useState("");
//   const [parliamentType, setParliamentType] = useState("lok");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 24; // 4 rows x 6 columns per page
//   const [filters, setFilters] = useState({
//     constituency: "",
//     party: "",
//     qualification: "",
//     terms: "",
//     position: "",
//     age: "",
//     gender: "",
//     category: "",
//     status: "",
//     members: "",
//   });
//   const [filteredMembers, setFilteredMembers] = useState(sampleMembers);
//   const totalItems = filteredMembers.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Ensure currentPage stays within valid bounds when filters/data change
//   useEffect(() => {
//     if (totalPages === 0 && currentPage !== 1) {
//       setCurrentPage(1);
//     } else if (currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     } else if (currentPage < 1) {
//       setCurrentPage(1);
//     }
//   }, [totalPages, currentPage]);

//   // Handle pagination change and scroll to section top
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     if (sectionTopRef.current) {
//       sectionTopRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   // Function to handle tab change
//   const handleTabChange = (tabId) => {
//     setActiveTab(tabId);
//     setCurrentPage(1);
//     setSearchQuery("");
//     setActiveLetter("");
//     applyFilters();
//   };

//   const toggleFilter = () => {
//     setIsFilterOpen(!isFilterOpen);
//   };

//   const handleLetterClick = (letter) => {
//     if (activeLetter === letter) {
//       setActiveLetter("");
//     } else {
//       setActiveLetter(letter);
//     }
//     setCurrentPage(1);
//   };

//   // Function to handle download format change
//   const handleDownloadChange = (format) => {
//     console.log(`Downloading in ${format} format`);
//   };

//   const applyFilters = useCallback(() => {
//     let filtered = sampleMembers;

//     if (activeTab === "pills-profile2") {
//       filtered = filtered.filter((member) =>
//         parliamentType === "lok"
//           ? member.constituency.includes("(")
//           : !member.constituency.includes("(")
//       );
//     } else if (activeTab === "pills-contact3") {
//       filtered = filtered.filter((member) => member.status === "Inactive");
//     } else {
//       filtered = filtered.filter((member) => member.status === "Active");
//     }

//     if (searchQuery) {
//       if (searchType === "name") {
//         filtered = filtered.filter((member) =>
//           member.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//       } else {
//         filtered = filtered.filter((member) =>
//           member.constituency.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//       }
//     }

//     if (activeLetter) {
//       filtered = filtered.filter((member) =>
//         member.name.startsWith(activeLetter)
//       );
//     }

//     if (filters.constituency) {
//       filtered = filtered.filter((member) =>
//         member.constituency.includes(filters.constituency)
//       );
//     }

//     if (filters.party) {
//       filtered = filtered.filter((member) => member.party === filters.party);
//     }

//     if (filters.qualification) {
//       filtered = filtered.filter(
//         (member) => member.qualification === filters.qualification
//       );
//     }

//     if (filters.terms) {
//       filtered = filtered.filter(
//         (member) => member.terms === Number.parseInt(filters.terms)
//       );
//     }

//     if (filters.position) {
//       filtered = filtered.filter(
//         (member) => member.position === filters.position
//       );
//     }

//     if (filters.age) {
//       filtered = filtered.filter((member) => member.age === filters.age);
//     }

//     if (filters.gender) {
//       filtered = filtered.filter((member) => member.gender === filters.gender);
//     }

//     if (filters.category) {
//       filtered = filtered.filter(
//         (member) => member.category === filters.category
//       );
//     }

//     if (filters.status) {
//       filtered = filtered.filter((member) => member.status === filters.status);
//     }

//     setFilteredMembers(filtered);
//   }, [
//     activeTab,
//     parliamentType,
//     searchQuery,
//     searchType,
//     activeLetter,
//     filters,
//   ]);

//   useEffect(() => {
//     applyFilters();
//   }, [applyFilters]);

//   // Get current members for pagination
//   const getCurrentMembers = () => {
//     const indexOfLastMember = currentPage * itemsPerPage;
//     const indexOfFirstMember = indexOfLastMember - itemsPerPage;
//     return filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
//   };

//   // Function to handle filter submission from the filter component
//   const handleFilterSubmit = (newFilters) => {
//     setFilters(newFilters);
//     setIsFilterOpen(false);
//     applyFilters();
//   };
//   const [isScrolled, setIsScrolled] = useState(false);
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//   const handleSearch = () => {
//     applyFilters();
//     setCurrentPage(1);
//   };
//   const formerMembers = [
//     {
//       name: "Shri. A. B. Dev",
//       tenure: "1952 – 1957",
//       img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
//     },
//     {
//       name: "Smt. Lakshmi Amma",
//       tenure: "1960 – 1965",
//       img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
//     },
//     {
//       name: "Shri. Madhavan Nair",
//       tenure: "1970 – 1976",
//       img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
//     },
//     {
//       name: "Shri. Madhavan Nair",
//       tenure: "1970 – 1976",
//       img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
//     },
//     {
//       name: "Shri. Madhavan Nair",
//       tenure: "1970 – 1976",
//       img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
//     },
//     {
//       name: "Shri. Madhavan Nair",
//       tenure: "1970 – 1976",
//       img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
//     },
//     {
//       name: "Shri. Madhavan Nair",
//       tenure: "1970 – 1976",
//       img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
//     },
//     {
//       name: "Shri. Madhavan Nair",
//       tenure: "1970 – 1976",
//       img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
//     },
//     {
//       name: "Shri. Madhavan Nair",
//       tenure: "1970 – 1976",
//       img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
//     },
//     {
//       name: "Shri. Madhavan Nair",
//       tenure: "1970 – 1976",
//       img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg",
//     },
//   ];

//   const pagedFormerMembers = useMemo(
//   () => formerMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
//   [formerMembers, currentPage, itemsPerPage]
// );

//   return (
//     <div className="body_content">
//       <header
//         className={`header-nav nav-homepage-style2 stricky main-menu ${
//           isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
//         }`}
//       >
//         <HomeTest />
//       </header>
//       <CategoriesNav />
//       <BreadcrumbNav
//         breadcrumbs={[
//           { name: "Home", href: "/" },
//           { name: "Members", href: "/members" },
//           {
//             name: "Members of Parliament",
//             href: "/Members/Parliament-Members",
//           },
//         ]}
//       />
//       <section className="pt30 pb-0 pb30-md represent" ref={sectionTopRef}>
//         <div className="container">
//           <SectionTitle title="Members of Parliament" />
//           <Tabs
//             tabs={[
//               {
//                 key: "pills-profile2",
//                 label: "Current Members",
//                 content: (
//                   <section className="mt-2 pt-2">
//                     <ParliamentTypeSelector
//                       parliamentType={parliamentType}
//                       setParliamentType={setParliamentType}
//                     />
//                     <FilterControls
//                       onFilterClick={toggleFilter}
//                       onDownloadChange={handleDownloadChange}
//                     />

//                     <div className="member-grid memberList">
//                       {getCurrentMembers().map((member) => (
//                         <MemberCard
//                           key={member.id}
//                           member={member}
//                           navigate={navigate}
//                         />
//                       ))}
//                     </div>

//                     {filteredMembers.length > 0 ? (
//                       <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         onPageChange={handlePageChange}
//                         totalItems={totalItems}
//                         itemsPerPage={itemsPerPage}
//                       />
//                     ) : (
//                       <div className="text-center mt-5">
//                         <h4>No members found matching your criteria</h4>
//                         <button
//                           className="btn btn-primary mt-3"
//                           onClick={() => {
//                             setSearchQuery("");
//                             setActiveLetter("");
//                             setFilters({
//                               constituency: "",
//                               party: "",
//                               qualification: "",
//                               terms: "",
//                               position: "",
//                               age: "",
//                               gender: "",
//                               category: "",
//                               status: "",
//                               members: "",
//                             });
//                             applyFilters();
//                           }}
//                         >
//                           Clear Filters
//                         </button>
//                       </div>
//                     )}
//                   </section>
//                 ),
//               },
//               {
//                 key: "pills-contact3",
//                 label: "Former Members",
//                 content: (
//                   <section className="pt30 pb30">
//                     <div className="memb">
//                       <Filter filterKeys={["KLA", "GENDER"]} />
//                       <SearchForm
//                         searchType={searchType}
//                         setSearchType={setSearchType}
//                         searchQuery={searchQuery}
//                         setSearchQuery={setSearchQuery}
//                         onSearch={handleSearch}
//                       />
//                       <FilterControls
//                         onFilterClick={toggleFilter}
//                         onDownloadChange={handleDownloadChange}
//                       />
//                       <AlphabetFilter
//                         onLetterClick={handleLetterClick}
//                         activeLetter={activeLetter}
//                       />

//                       <div className="pt30">
//                         <h4 className="title mb20">
//                           Former Members of Parliament
//                         </h4>

//                         <div className="member-grid memberList">
//                            {pagedFormerMembers.map((m, idx) => (
//                               <div
//                                 className="member-card job-list-style1 bdr1 text-center"
//                                 key={idx}
//                                 onClick={() =>
//                                   window.open(
//                                     `pdfs/former-members/${m.name
//                                       .toLowerCase()
//                                       .replace(/ /g, "-")}.pdf`,
//                                     "_blank"
//                                   )
//                                 }
//                                 style={{ cursor: "pointer" }}
//                               >
//                                 <div className="icon d-flex align-items-center mb20">
//                                   <img
//                                     className="mx-auto"
//                                     src={m.img}
//                                     alt={m.name}
//                                     style={{
//                                       width: 100,
//                                       height: 180,
//                                       objectFit: "cover",
//                                       borderRadius: 8,
//                                     }}
//                                     onError={(e) =>
//                                       (e.target.src = "images/speaker.jpg")
//                                     }
//                                   />
//                                 </div>
//                                 <div className="details">
//                                   <h5 className="mb10 member-name">{m.name}</h5>
//                                   <h6 className="member-constituency">
//                                     {m.tenure}
//                                   </h6>
//                                 </div>
//                               </div>
//                             ))}
//                         </div>
//                       </div>
//                     </div>
//                   </section>
//                 ),
//               },
//             ]}
//             onChange={(key) => handleTabChange(key)}
//           />
//         </div>
//       </section>
//       {isFilterOpen && (
//         <FilterComponent
//           isOpen={isFilterOpen}
//           onClose={() => setIsFilterOpen(false)}
//           filters={filters}
//           onSubmit={handleFilterSubmit}
//         />
//       )}
//     </div>
//   );
// };

// export default ParliamentMembers;
