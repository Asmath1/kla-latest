import React, { useState, useEffect } from "react";
import HomeTest from "../Header";
import { CategoriesNav, BreadcrumbNav, SectionTitle, Tabs } from "../common";
import { FaChevronDown } from "react-icons/fa";
import { fetchMadrasCouncil } from "../../api/services/all.service";

/* ---------------- MADRAS COUNCIL DATA (HARDCODED) ---------------- */
const madrasCouncilData = [
  {
    id: 1,
    title: "FIRST COUNCIL (1921–1923)",
    rows: [
      { name: "M Krishnan Nair", constituency: "Malabar-cum-Anjango" },
      { name: "K Chathukutti Nambiar", constituency: "Malabar-cum-Anjango" },
      { name: "K Kunhammed Koya Sahib", constituency: "Muhammadan" },
      { name: "A D Maliyammal Bavooti", constituency: "Muhammadan" },
      {
        name: "K Prabhakaran Thampan",
        constituency: "West Coast Land holders",
      },
    ],
  },
  {
    id: 2,
    title: "SECOND COUNCIL (1923–1926)",
    rows: [
      { name: "K Krishnan Nair", constituency: "Malabar-cum-Anjango" },
      { name: "V Madhava Raja", constituency: "Malabar-cum-Anjango" },
      { name: "T M Moidu Sahib", constituency: "Muhammadan Rural" },
      {
        name: "D M Narayanan Nambudiripad",
        constituency: "Nominated (Nambudiris)",
      },
      { name: "M P Raman", constituency: "Nominated (Thiyyas)" },
    ],
  },
  {
    id: 3,
    title: "THIRD COUNCIL (1927–1930)",
    rows: [
      { name: "M Krishnan Nair", constituency: "Malabar N.M Rural" },
      { name: "K Madhavan Nayyar", constituency: "Malabar N.M Rural" },
      { name: "T M Moidoo", constituency: "Malabar Muhammadan Rural" },
      { name: "K Uppi Sahib", constituency: "Malabar Muhammadan" },
    ],
  },
  {
    id: 4,
    title: "FOURTH COUNCIL (1930–1936)",
    rows: [
      { name: "M Krishnan Nair", constituency: "Ex-officio" },
      { name: "T M Moidu Sahib", constituency: "Malabar Muhammadan Rural" },
      { name: "V P Narayanan Nambiyar", constituency: "Malabar N.M Rural" },
      { name: "B Pocker Sahib", constituency: "Malabar Muhammadan Rural" },
      { name: "K P Raman Menon", constituency: "Malabar N.M Rural" },
    ],
  },
  {
    id: 5,
    title: "LEGISLATIVE COUNCIL (1937–1956)",
    rows: [
      { name: "Kozhipurath Madhava Menon", constituency: "Malabar General" },
      { name: "M Narayana Menon", constituency: "Malabar General" },
      {
        name: "S K Shaik Rowther Sahib",
        constituency: "Madras West Coast Muhammadan",
      },
      { name: "K Uppi Sahib", constituency: "Madras West Coast Muhammadan" },
      { name: "T T P Kunhipocker", constituency: "Local Authorities" },
    ],
  },
];

const LegCouncil = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(
    "Legislative council before 1956"
  );
  const [openIds, setOpenIds] = useState([]);
  const [madrasAssemblyData, setMadrasAssemblyData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH API DATA ---------------- */
  useEffect(() => {
    const loadMadrasAssemblyData = async () => {
      try {
        setLoading(true);
        const response = await fetchMadrasCouncil();
        
        if (response.status && response.data) {
          // Group data by council/assembly
          const groupedData = response.data.reduce((acc, item) => {
            const existing = acc.find(group => group.title === item.council);
            if (existing) {
              existing.rows.push({
                name: item.name,
                constituency: item.constituency
              });
            } else {
              acc.push({
                id: acc.length + 1,
                title: item.council,
                rows: [{
                  name: item.name,
                  constituency: item.constituency
                }]
              });
            }
            return acc;
          }, []);
          
          setMadrasAssemblyData(groupedData);
        }
      } catch (error) {
        console.error("Error loading Madras Assembly data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMadrasAssemblyData();
  }, []);

  /* ---------------- HEADER SCROLL ---------------- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- DEFAULT OPEN ACCORDION PER TAB ---------------- */
  useEffect(() => {
    if (activeTab === "Legislative council before 1956" && madrasCouncilData.length > 0) {
      setOpenIds([madrasCouncilData[0].id]);
    }

    if (activeTab === "Madras Legislative Assembly" && madrasAssemblyData.length > 0) {
      setOpenIds([madrasAssemblyData[0].id]);
    }
  }, [activeTab, madrasAssemblyData]);

  /* ---------------- ACCORDION TOGGLE ---------------- */
  const toggleItem = (id) => {
    setOpenIds((prev) => (prev[0] === id ? [] : [id]));
  };

  /* ---------------- TABLE RENDER ---------------- */
  const renderTable = (rows) => (
    <table className="table myTable2">
      <thead>
        <tr>
          <th>Sl.No</th>
          <th>Name</th>
          <th>Constituency</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{row.name}</td>
            <td>{row.constituency}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
        <CategoriesNav />
        <BreadcrumbNav
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Member", href: "/member" },
            {
              name: "Legislative council before 1956",
              href: "/resources/legislative-council-before-1956",
            },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
             <SectionTitle title="Legislative council before 1956" />
            <Tabs
              tabs={[
                {
                  key: "Legislative council before 1956",
                  label: "Legislative council before 1956",
                  content: (
                    <div className="col-md-12">
                      {madrasCouncilData.map((item) => {
                        const isActive = openIds.includes(item.id);
                        return (
                          <div className="accordion-item mb-3" key={item.id}>
                            <div
                              className={`accordion-header ${
                                isActive ? "active" : ""
                              }`}
                              onClick={() => toggleItem(item.id)}
                            >
                              <span>{item.title}</span>
                              <FaChevronDown
                                className={`arrow-icon ${
                                  isActive ? "rotated" : ""
                                }`}
                              />
                            </div>

                            {isActive && (
                              <div className="accordion-body open">
                                {renderTable(item.rows)}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ),
                },
                {
                  key: "Madras Legislative Assembly",
                  label: "Madras Legislative Assembly",
                  content: (
                    <div className="col-md-12">
                      {loading ? (
                        <div className="text-center py-5">
                          <p>Loading...</p>
                        </div>
                      ) : madrasAssemblyData.length === 0 ? (
                        <div className="text-center py-5">
                          <p className="text-muted">No data available</p>
                        </div>
                      ) : (
                        madrasAssemblyData.map((item) => {
                          const isActive = openIds.includes(item.id);
                          return (
                            <div className="accordion-item mb-3" key={item.id}>
                              <div
                                className={`accordion-header ${
                                  isActive ? "active" : ""
                                }`}
                                onClick={() => toggleItem(item.id)}
                              >
                                <span>{item.title}</span>
                                <FaChevronDown
                                  className={`arrow-icon ${
                                    isActive ? "rotated" : ""
                                  }`}
                                />
                              </div>

                              {isActive && (
                                <div className="accordion-body open">
                                  {renderTable(item.rows)}
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  ),
                },
              ]}
              onChange={(key) => setActiveTab(key)}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default LegCouncil;

// import React, { useState, useEffect } from "react";
// import HomeTest from "../Header";
// import {
//   CategoriesNav,
//   BreadcrumbNav,
//   SectionTitle,
//   Tabs,
// } from "../common";

// /* ---------------- BOOKS DATA ---------------- */
// const booksData = [
//   { id: 1, title: "ഹർജികൾ സംബന്ധിച്ച സമിതി - വജ്രശോഭയിൽ", price: "500/-" },
//   { id: 2, title: "Festival on Democracy Volume I & II", price: "600/-" },
//   { id: 3, title: "Legislators of Kerala (I to XIVth KLA)", price: "350/-" },
//   { id: 4, title: "കേരള നിയമസഭ നടപടിക്രമവും കീഴ്വഴക്കങ്ങളും (രണ്ടാം പതിപ്പ്)", price: "500/-" },
//   { id: 5, title: "ഉമ്മൻചാണ്ടി - നിയമസഭയിലെ 50 വർഷങ്ങൾ", price: "500/-" },
//   { id: 6, title: "കേരളത്തിലെ നിയമസഭ സാമാജികർ (ഒന്നു മുതൽ പതിനാല് വരെയുള്ള നിയമസഭകൾ)", price: "500/-" },
//   { id: 7, title: "കേരള നിയമസഭ ചരിത്രവും പാർലമെൻ്ററി ജനാധിപത്യവും - തെരഞ്ഞെടുത്ത ചോദ്യോത്തരങ്ങൾ", price: "20/-" },
//   { id: 8, title: "സഫലം സർഗാത്മകം", price: "1200/-" },
//   { id: 9, title: "എസ്റ്റിമേറ്റ്സ് കമ്മിറ്റി @ 64", price: "400/-" },
//   { id: 10, title: "കേരളം പാസ്സാക്കിയ നിയമങ്ങൾ പ്രഭാവ പഠനങ്ങൾ", price: "400/-" },
//   { id: 11, title: "കേരള നിയമസഭ വജ്രജൂബിലി സ്മരണിക", price: "500/-" },
//   { id: 12, title: "കേരളത്തിലെ സ്പീക്കര്‍മാരും ഡെപ്യൂട്ടി സ്പീക്കര്‍മാരും", price: "200/-" },
//   { id: 13, title: "Speakers and Deputy Speakers of Kerala-2017- English", price: "200/-" },
//   { id: 14, title: "Chief Ministers, Ministers and Leaders of Opposition of Kerala - 2017", price: "350/-" },
//   { id: 15, title: "നമ്മുടെ നിയമസഭ", price: "25/-" },
//   { id: 16, title: "Our Legislative Assembly", price: "25/-" },
//   { id: 17, title: "ആര്, ആരാണ്2018", price: "200/-" },
//   { id: 18, title: "കേരള നിയമസഭ – നിയമനിര്‍മ്മാണത്തിന്റെ 6 പതിറ്റാണ്ടുകള്‍ 2017", price: "950/-" },
//   { id: 19, title: "കേരളനിയമസഭ – നടപടിക്രമവും കീഴ്‌വഴക്കവും(ഒന്നാം പതിപ്പ് )", price: "500/-" },
//   { id: 20, title: "സഭാധ്യക്ഷന്റെ തീരുമാനങ്ങളും റൂളിംഗുകളും", price: "350/-" },
//   { id: 21, title: "നിയമനിര്‍മ്മാണസഭ ‌- ശതോത്തര രജതജൂബിലി സ്മരണിക വാല്യം- 1, വാല്യം- 2", price: "800/-" },
//   { id: 22, title: "ബഡ്ജറ്റ് കൈപ്പുസ്തകം2013", price: "20/-" },
//   { id: 23, title: "36 Glorious Years of Subject Committees", price: "400/-" },
//   { id: 24, title: "Budget Speeches Vol - III", price: "100/-" },
//   { id: 25, title: "Budget Speeches Vol - IV", price: "100/-" },
//   { id: 26, title: "Budget Speeches Vol - V", price: "100/-" },
//   { id: 27, title: "Budget Speeches Vol - VI", price: "250/-" },
// ];

// const LegCouncil = () => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   /* ---------------- HEADER SCROLL EFFECT ---------------- */
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

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
//             { name: "Member", href: "/member" },
//             { name: "Legislative council before 1956", href: "/resources/legislative-council-before-1956" },
//           ]}
//         />

//         {/* ---------------- MAIN CONTENT ---------------- */}
//         <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
//           <div className="container">
//             <SectionTitle title="Legislative council before 1956" />

//             <Tabs
//               tabs={[
//                 {
//                   key: "<Madras Legislative Council>",
//                   label: "Madras Legislative Council ",
//                   content: (
//                     <div className="bill-content col-md-12 mt30 committeeDt">
//                       <table className="table myTable2">
//                         <thead>
//                           <tr>
//                             <th>Sl.No</th>
//                             <th>Title</th>
//                             <th>Retail Price</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {booksData.map((item, index) => (
//                             <tr key={item.id}>
//                               <td>{index + 1}</td>
//                               <td>{item.title}</td>
//                               <td>{item.price}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   ),
//                 },
//                 {
//                   key: "Madras Legislative Assembly",
//                   label: "Madras Legislative Assembly",
//                   content: (
//                     <div className="about-library-tab">
//                       <div className="library-section">
//                         <p className="text-muted">
//                           Periodicals data will be updated soon.
//                         </p>
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

// export default LegCouncil;
