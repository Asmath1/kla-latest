import React, { useState, useEffect, useCallback, useRef } from "react";
import HomeTest from "../Header";
import {
  CategoriesNav,
  BreadcrumbNav,
  SectionTitle,
  Filter,
  Tabs,
  ExportButton,
  Pagination,
} from "../common";
import InlinePdfViewer from "../common/InlinePdfViwer";
import { API_ENDPOINTS } from "../../utils/config";

const Bulletin = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [bulletinsPart1, setBulletinsPart1] = useState([]);
  const [bulletinsPart2, setBulletinsPart2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndexPart1, setActiveIndexPart1] = useState(0);
  const [activeIndexPart2, setActiveIndexPart2] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Pagination state for Part 1
  const [currentPagePart1, setCurrentPagePart1] = useState(1);
  const itemsPerPagePart1 = 30; // Approximately 3 rows of bulletins
  
  // Separate filter states for each tab
  const [filtersPart1, setFiltersPart1] = useState({
    kla_id: 15,
    session_type: "",
    search: "",
  });
  
  const [filtersPart2, setFiltersPart2] = useState({
    kla_id: 15,
    search: "",
  });
  
  const filterInitRefPart1 = useRef(false);
  const filterInitRefPart2 = useRef(false);

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

  // Store raw API data
  const [rawBulletinData, setRawBulletinData] = useState(null);

  // Fetch bulletin data when KLA changes (use Part1 KLA as primary)
  useEffect(() => {
    const fetchBulletinData = async () => {
      setIsLoading(true);
      try {
        const url = API_ENDPOINTS.BULLETIN_LIST;
        console.log("=== FETCHING BULLETINS ===");
        console.log("API URL:", url);
        console.log("Selected KLA:", filtersPart1.kla_id);
        
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("Bulletin API Response:", result);
        
        setRawBulletinData(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching bulletin data:", error);
        setRawBulletinData(null);
        setIsLoading(false);
      }
    };

    fetchBulletinData();
  }, [filtersPart1.kla_id]); // Re-fetch when KLA changes

  // Apply client-side filtering for Part 1
  useEffect(() => {
    if (!rawBulletinData?.page?.part1?.sessions) {
      setBulletinsPart1([]);
      return;
    }

    console.log("=== APPLYING PART 1 FILTERS ===");
    console.log("Part 1 filters:", filtersPart1);

    const allPart1Bulletins = [];
    
    // Filter sessions based on session_type if provided
    const sessionsToProcess = filtersPart1.session_type && filtersPart1.session_type !== 'All' && filtersPart1.session_type !== ''
      ? rawBulletinData.page.part1.sessions.filter(session => 
          String(session.session_no) === String(filtersPart1.session_type)
        )
      : rawBulletinData.page.part1.sessions;
    
    // Iterate through filtered sessions and collect bulletins
    sessionsToProcess.forEach((session) => {
      if (session.bulletins && Array.isArray(session.bulletins)) {
        session.bulletins.forEach((item) => {
          if (item.pdfs && item.pdfs.length > 0 && item.pdfs[0].file_url) {
            const bulletinData = {
              id: item.bulletin_no,
              title: `Bulletin No ${item.bulletin_no}`,
              bulletinNumber: item.bulletin_no,
              fileUrl: item.pdfs[0].file_url,
              name: item.pdfs[0].title || `Bulletin No ${item.bulletin_no}`,
              sessionNumber: session.session_no,
              active: item.active
            };

            // Apply search filter if provided
            if (filtersPart1.search) {
              const searchLower = filtersPart1.search.toLowerCase();
              const matchesSearch = 
                bulletinData.name?.toLowerCase().includes(searchLower) ||
                String(bulletinData.bulletinNumber).includes(filtersPart1.search);
              
              if (matchesSearch) {
                allPart1Bulletins.push(bulletinData);
              }
            } else {
              allPart1Bulletins.push(bulletinData);
            }
          }
        });
      }
    });
    
    setBulletinsPart1(allPart1Bulletins);
    setCurrentPagePart1(1); // Reset to first page when filters change
    console.log("Filtered Part 1 Bulletins count:", allPart1Bulletins.length);
  }, [rawBulletinData, filtersPart1]);

  // Apply client-side filtering for Part 2
  useEffect(() => {
    if (!rawBulletinData?.page?.part2?.bulletins) {
      setBulletinsPart2([]);
      return;
    }

    console.log("=== APPLYING PART 2 FILTERS ===");
    console.log("Part 2 filters:", filtersPart2);

    let filteredBulletins = rawBulletinData.page.part2.bulletins;
    
    // Apply search filter if provided
    if (filtersPart2.search) {
      const searchLower = filtersPart2.search.toLowerCase();
      filteredBulletins = filteredBulletins.filter(item => 
        item.title?.toLowerCase().includes(searchLower) ||
        String(item.bulletin_no).includes(filtersPart2.search)
      );
    }
    
    const mappedPart2 = filteredBulletins
      .filter(item => item.pdf_url)
      .map((item) => ({
        id: item.bulletin_no,
        title: `Bulletin No ${item.bulletin_no}`,
        bulletinNumber: item.bulletin_no,
        fileUrl: item.pdf_url,
        name: item.title,
      }));
    setBulletinsPart2(mappedPart2);
    console.log("Filtered Part 2 Bulletins count:", mappedPart2.length);
  }, [rawBulletinData, filtersPart2]);

  useEffect(() => {
    // Ensure first item is active on load for Part 1
    if (bulletinsPart1.length > 0) setActiveIndexPart1(0);
  }, [bulletinsPart1.length]);

  useEffect(() => {
    // Ensure first item is active on load for Part 2
    if (bulletinsPart2.length > 0) setActiveIndexPart2(0);
  }, [bulletinsPart2.length]);

  // Calculate paginated bulletins for Part 1
  const paginatedBulletinsPart1 = bulletinsPart1.slice(
    (currentPagePart1 - 1) * itemsPerPagePart1,
    currentPagePart1 * itemsPerPagePart1
  );
  
  const totalPagesPart1 = Math.ceil(bulletinsPart1.length / itemsPerPagePart1);

  const activeFileUrlPart1 = paginatedBulletinsPart1[activeIndexPart1]?.fileUrl || null;
  const activeFileUrlPart2 = bulletinsPart2[activeIndexPart2]?.fileUrl || null;

  // Handle page change for Part 1
  const handlePageChangePart1 = (page) => {
    setCurrentPagePart1(page);
    setActiveIndexPart1(0); // Reset to first item on new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle filter changes for Part 1
  const handleFilterChangePart1 = useCallback((newFilters) => {
    console.log("=== PART 1 FILTER CHANGE ===");
    console.log("New filter values:", newFilters);
    
    if (!filterInitRefPart1.current) {
      filterInitRefPart1.current = true;
      return;
    }
    
    setFiltersPart1(prev => ({
      kla_id: newFilters.KLA !== undefined ? newFilters.KLA : prev.kla_id,
      session_type: newFilters.SESSION_TYPE !== undefined ? newFilters.SESSION_TYPE : prev.session_type,
      search: newFilters.SEARCH !== undefined ? newFilters.SEARCH : 
              (newFilters.SEARCH_NUM !== undefined ? newFilters.SEARCH_NUM : prev.search),
    }));
  }, []);

  // Handle filter changes for Part 2
  const handleFilterChangePart2 = useCallback((newFilters) => {
    console.log("=== PART 2 FILTER CHANGE ===");
    console.log("New filter values:", newFilters);
    
    if (!filterInitRefPart2.current) {
      filterInitRefPart2.current = true;
      return;
    }
    
    setFiltersPart2(prev => {
      let searchValue = prev.search;
      
      if (newFilters.SEARCH_BULLETIN !== undefined) {
        if (typeof newFilters.SEARCH_BULLETIN === 'object' && newFilters.SEARCH_BULLETIN !== null) {
          searchValue = newFilters.SEARCH_BULLETIN.query || '';
        } else {
          searchValue = newFilters.SEARCH_BULLETIN;
        }
      }
      
      return {
        kla_id: newFilters.KLA !== undefined ? newFilters.KLA : prev.kla_id,
        search: searchValue,
      };
    });
  }, []);

  // --- Highlight number in bulletin title ---
  const renderTitleWithHighlight = (title, isActive) => {
    const match = title.match(/(Bulletin No )(\d+)/);
    if (!match) return title;
    return (
      <>
        {match[1]}
        <span
          style={{
            fontWeight: "bold",
            color: isActive ? "#fff" : "var(--clr--primary)",
            padding: "2px 6px",
            borderRadius: "4px",
            marginLeft: "4px",
          }}
        >
          {match[2]}
        </span>
      </>
    );
  };

  const renderBulletinList = (bulletins, activeIndex, setActiveIndex) => (
    <div className="d-flex flex-row gap-3 flex-wrap">
      {bulletins.map((b, idx) => {
        const isActive = idx === activeIndex;
        const isHovered = idx === hoveredIndex;
        const baseStyle = {
          cursor: "pointer",
          border: "1px solid #e5e7eb",
          borderRadius: 4,
          transition: "all .15s ease",
        };
        const activeStyle = isActive
          ? {
              background: "var(--clr--primary)",
              color: "#fff",
              borderColor: "var(--clr--primary)",
            }
          : {};
        const hoverStyle =
          !isActive && isHovered
            ? {
                background: "#ebe7fd",
                color: "var(--clr--primary)",
                borderColor: "var(--clr--primary)",
              }
            : {};
        return (
          <div
            key={b.id}
            className=""
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setActiveIndex(idx)}
          >
            <div
              className="card"
              style={{ ...baseStyle, ...hoverStyle, ...activeStyle }}
            >
              <div className="card-body p-1 d-flex align-items-center justify-content-between">
                <span className="fw-semibold color-000 f-12">
                  {renderTitleWithHighlight(b.title, isActive)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderBulletinTable = (bulletins, activeIndex, setActiveIndex) => (
    <div 
      className="table-responsive tabley" 
      style={{ 
        maxHeight: "650px", 
        overflowY: "auto",
        border: "1px solid #e5e7eb",
        borderRadius: "4px"
      }}
    >
      <table className="table table-bordered myTable2" style={{ marginBottom: 0 }}>
        <thead style={{ 
          position: "sticky", 
          top: 0, 
          backgroundColor: "#fff",
          zIndex: 1,
          boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.1)"
        }}>
          <tr>
            <th style={{ width: "20%" }}>Bulletin No</th>
            <th>Title of the Bulletin</th>
          </tr>
        </thead>
        <tbody>
          {bulletins.map((b, idx) => {
            const isActive = idx === activeIndex;
            return (
              <tr
                key={b.id}
                style={{
                  cursor: "pointer",
                  background: isActive ? "var(--clr--violet)" : "",
                  color: isActive ? "#000" : "#000",
                }}
                onClick={() => setActiveIndex(idx)}
              >
                <td>{b.bulletinNumber || b.id}</td>
                <td>{b.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

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
            { name: "Bulletin", href: "/business/bulletin" },
          ]}
        />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Bulletin" />

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <Tabs
              tabs={[
                {
                  key: "Bulletin Part-1",
                  label: "Bulletin Part-1",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      <div className="terms_condition_grid text-start">
                        <Filter
                          key="bulletin-part1-filter"
                          filterKeys={["KLA", "SESSION_TYPE", "SEARCH_NUM"]}
                          onFiltersChange={handleFilterChangePart1}
                          overrides={{
                            KLA: { defaultValue: filtersPart1.kla_id }
                          }}
                        />
                        <ExportButton 
                          data={bulletinsPart1.map((b, idx) => ({
                            'Bulletin No': b.bulletinNumber,
                            'Title': b.name,
                            'Session': b.sessionNumber,
                            'PDF URL': b.fileUrl
                          }))}
                          filename="bulletins-part1"
                          title="Bulletins Part 1"
                          exportOptions={["PDF", "Excel", "CSV"]}
                        />
                        
                        {/* Display session info prominently */}
                        <div className="mt-4 mb-3 p-3" style={{ 
                          backgroundColor: "#f8f9fa", 
                          borderLeft: "4px solid var(--clr--primary)",
                          borderRadius: "4px"
                        }}>
                          {filtersPart1.session_type && filtersPart1.session_type !== '' && filtersPart1.session_type !== 'All' ? (
                            <h4 className="mb-1" style={{ color: "var(--clr--primary)", fontWeight: "600" }}>
                              Session {filtersPart1.session_type}
                            </h4>
                          ) : (
                            <h4 className="mb-1" style={{ color: "var(--clr--primary)", fontWeight: "600" }}>
                              All Sessions
                            </h4>
                          )}
                          <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                            {bulletinsPart1.length} {bulletinsPart1.length === 1 ? 'Bulletin' : 'Bulletins'} found
                            {filtersPart1.search && ` (filtered by: "${filtersPart1.search}")`}
                          </p>
                        </div>
                        
                        {bulletinsPart1.length > 0 ? (
                          <>
                            <div>{renderBulletinList(paginatedBulletinsPart1, activeIndexPart1, setActiveIndexPart1)}</div>

                            {/* Pagination - only show if more than itemsPerPagePart1 bulletins */}
                            {bulletinsPart1.length > itemsPerPagePart1 && (
                              <Pagination
                                currentPage={currentPagePart1}
                                totalPages={totalPagesPart1}
                                onPageChange={handlePageChangePart1}
                                totalItems={bulletinsPart1.length}
                                itemsPerPage={itemsPerPagePart1}
                              />
                            )}

                            <div className="session-list-buss row mt-4">
                              <div className="col-lg-9 col-md-6">
                                <InlinePdfViewer
                                  fileUrl={activeFileUrlPart1}
                                  height="700px"
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-4">
                            <p>No bulletins available for the selected session</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Bulletin Part-2",
                  label: "Bulletin Part-2",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      <div className="terms_condition_grid text-start">
                        <Filter
                          key="bulletin-part2-filter"
                          filterKeys={["KLA", "SEARCH_BULLETIN"]}
                          onFiltersChange={handleFilterChangePart2}
                          overrides={{
                            KLA: { defaultValue: filtersPart2.kla_id }
                          }}
                        />
                        <ExportButton 
                          data={bulletinsPart2.map((b, idx) => ({
                            'Bulletin No': b.bulletinNumber,
                            'Title': b.name,
                            'PDF URL': b.fileUrl
                          }))}
                          filename="bulletins-part2"
                          title="Bulletins Part 2"
                          exportOptions={["PDF", "Excel", "CSV"]}
                        />
                        
                        {/* Display bulletin count */}
                        {bulletinsPart2.length > 0 && (
                          <div className="mt-3 mb-3 p-3" style={{ 
                            backgroundColor: "#f8f9fa", 
                            borderLeft: "4px solid var(--clr--primary)",
                            borderRadius: "4px"
                          }}>
                            <h5 className="mb-1" style={{ color: "var(--clr--primary)", fontWeight: "600" }}>
                              {bulletinsPart2.length} {bulletinsPart2.length === 1 ? 'Bulletin' : 'Bulletins'}
                              {filtersPart2.search && ` (filtered by: "${filtersPart2.search}")`}
                            </h5>
                          </div>
                        )}
                        
                        <hr />
                        {bulletinsPart2.length > 0 ? (
                          <div className="session-list-buss row mt-4">
                            {/* Bulletin list (left) */}
                            <div className="col-lg-6 col-md-6">
                              {renderBulletinTable(bulletinsPart2, activeIndexPart2, setActiveIndexPart2)}
                            </div>
                            {/* PDF Viewer (right) */}
                            <div className="col-lg-6 col-md-6">
                              <InlinePdfViewer
                                fileUrl={activeFileUrlPart2}
                                height="650px"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p>No bulletins available for Part 2</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ),
                },
              ]}
              onChange={(tabKey) => {
                console.log("Tab changed to:", tabKey);
                // Reset filter init refs when switching tabs
                filterInitRefPart1.current = false;
                filterInitRefPart2.current = false;
              }}
            />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Bulletin;

// import React, { useState, useEffect } from "react";
// import HomeTest from "../Header";
// import {
//   CategoriesNav,
//   BreadcrumbNav,
//   SectionTitle,
//   Filter,
//   Tabs,
//   ExportButton,
// } from "../common";
// import InlinePdfViewer from "../common/InlinePdfViwer";

// const Bulletin = () => {
//   const [isScrolled] = useState(false);

//   // Bulletins list -> update fileUrl to real endpoints when available
//   const bulletins = [
//     { id: 1, title: "Bulletin No 11", fileUrl: "/pdf1.pdf" },
//     { id: 2, title: "Bulletin No 12", fileUrl: "/pdff.pdf" },
//     { id: 3, title: "Bulletin No 13", fileUrl: "/dummy.pdf" },
//     { id: 4, title: "Bulletin No 14", fileUrl: "/dummy.pdf" },
//     { id: 5, title: "Bulletin No 15", fileUrl: "/dummy.pdf" },
//     { id: 6, title: "Bulletin No 16", fileUrl: "/dummy.pdf" },
//     { id: 7, title: "Bulletin No 17", fileUrl: "/dummy.pdf" },
//     { id: 8, title: "Bulletin No 18", fileUrl: "/dummy.pdf" },
//     { id: 9, title: "Bulletin No 19", fileUrl: "/dummy.pdf" },
//     { id: 10, title: "Bulletin No 20", fileUrl: "/dummy.pdf" },
//     { id: 11, title: "Bulletin No 21", fileUrl: "/dummy.pdf" },

//   ];

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   useEffect(() => {
//     // Ensure first item is active on load
//     if (bulletins.length > 0) setActiveIndex(0);
//   }, [bulletins.length]);

//   const activeFileUrl = bulletins[activeIndex]?.fileUrl || null;

//   const renderBulletinList = () => (
//     <div className="d-flex flex-column">
//       {bulletins.map((b, idx) => {
//         const isActive = idx === activeIndex;
//         const isHovered = idx === hoveredIndex;
//         const baseStyle = {
//           cursor: "pointer",
//           border: "1px solid #e5e7eb",
//           borderRadius: 8,
//           transition: "all .15s ease",
//         };
//         const activeStyle = isActive
//           ? {
//               background: "var(--clr--primary)",
//               color: "#fff",
//               borderColor: "var(--clr--primary)",
//             }
//           : {};
//         const hoverStyle = !isActive && isHovered
//           ? {
//               background: "#ebe7fd",
//               color: "var(--clr--primary)",
//               borderColor: "var(--clr--primary)",
//             }
//           : {};
//         return (
//           <div
//             key={b.id}
//             className="mb-2"
//             onMouseEnter={() => setHoveredIndex(idx)}
//             onMouseLeave={() => setHoveredIndex(null)}
//             onClick={() => setActiveIndex(idx)}
//           >
//             <div className="card" style={{ ...baseStyle, ...hoverStyle, ...activeStyle }}>
//               <div className="card-body py-2 px-3 d-flex align-items-center justify-content-between">
//                 <span className="fw-semibold">{b.title}</span>
//                 {/* {isActive && (
//                   <span className="badge bg-light text-dark">Active</span>
//                 )} */}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );

//   return (
//     <div className="wrapper ovh">
//       {/* ---------------- HEADER ---------------- */}
//       <header
//         className={`header-nav nav-homepage-style2 stricky main-menu ${
//           isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
//         }`}
//       >
//         <HomeTest />
//       </header>

//       <div className="body_content">
//         {/* ---------------- NAVIGATION ---------------- */}
//         <CategoriesNav />
//         <BreadcrumbNav
//           breadcrumbs={[
//             { name: "Home", href: "/" },
//             { name: "Business", href: "/business" },
//             { name: "Bulletin", href: "/business/bulletin" },
//           ]}
//         />

//         {/* ---------------- MAIN CONTENT ---------------- */}
//         <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
//           <div className="container">
//             <SectionTitle title="Bulletin" />

//             <Tabs
//               tabs={[
//                 {
//                   key: "Bulletin Part-1",
//                   label: "Bulletin Part-1",
//                   content: (
//                     <div className="bill-content col-md-12 mt30 committeeDt">
//                       <div className="terms_condition_grid text-start">
//                         <Filter filterKeys={["KLA", "SESSION_TYPE"]} />
//                         <ExportButton />

//                         <div className="session-list-buss row mt-4">
//                           {/* Bulletin list (left) */}
//                           <div className="col-lg-3 col-md-6">
//                             <h3>Session 13</h3>{renderBulletinList()}</div>

//                           {/* PDF Viewer (right) */}
//                           <div className="col-lg-9 col-md-6">
//                             <h3>PDF Viewer</h3>
//                             <InlinePdfViewer fileUrl={activeFileUrl} height="600px" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ),
//                 },
//                 {
//                   key: "Bulletin Part-2",
//                   label: "Bulletin Part-2",
//                   content: (
//                     <div className="bill-content col-md-12 mt30 committeeDt">
//                       <div className="terms_condition_grid text-start">
//                         <Filter filterKeys={["KLA", "SESSION_TYPE"]} />
//                         {/* <ExportButton /> */}
//                         <h3>Session 11</h3>
//                         <hr/>
//                         <div className="session-list-buss row mt-4">
//                           {/* Bulletin list (left) */}
//                           <div className="col-lg-3 col-md-6"> <h3></h3>{renderBulletinList()}</div>
//                           <div className="col-lg-9 col-md-6">
//                             {/* <h3>PDF Viewer</h3> */}
//                             <InlinePdfViewer fileUrl={activeFileUrl} height="600px" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ),
//                 },
//               ]}
//               onChange={() => {}}
//             />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Bulletin;