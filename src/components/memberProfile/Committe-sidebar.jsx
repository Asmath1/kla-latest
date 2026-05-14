import { useState, useEffect } from "react";
import { fetchCommittees, fetchKlaList } from "../../services/MasterService";

export default function CommitteeSidebar({
  selectedKLA,
  setSelectedKLA,
  activeAccordion,
  setActiveAccordion,
  onSelectCommittee,
  onFirstCommitteeLoad,
}) {
  const [committees, setCommittees] = useState([]);
  const [klaOptions, setKlaOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedCommittees, setGroupedCommittees] = useState({});

  const getKlaDisplayName = (kla) => {
    const englishLanguage =
      kla?.languages?.find((language) => language.language_id === 2)?.name ||
      kla?.languages?.[1]?.name ||
      kla?.languages?.[0]?.name;

    return englishLanguage || `${kla?.chronological_order || ""} KLA`.trim();
  };
console.log(committees,"conniteee");

  useEffect(() => {
    let cancelled = false;

    const loadKlaOptions = async () => {
      try {
        const data = await fetchKlaList();
        if (!cancelled) {
          const klaList = data || [];
          setKlaOptions(klaList);

          const defaultKla =
            klaList.find((item) => item.kla_status === "yes") ||
            klaList[klaList.length - 1] ||
            null;

          if (defaultKla) {
            setSelectedKLA(String(defaultKla.id));
          }
        }
      } catch (err) {
        console.error("Failed to load KLA list:", err);
        if (!cancelled) {
          setKlaOptions([]);
        }
      }
    };

    loadKlaOptions();

    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch committees from API
  useEffect(() => {
    let cancelled = false;

    const loadCommittees = async () => {
      setLoading(true);
      try {
        const data = await fetchCommittees();
        if (!cancelled) {
          const committeeList = data || [];
          setCommittees(committeeList);
          
          // Group committees by category_group
          const grouped = committeeList.reduce((acc, committee) => {
            const category = committee.category_group || "Others";
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(committee);
            return acc;
          }, {});
          
          setGroupedCommittees(grouped);
          
          // Auto-select first committee
          if (onFirstCommitteeLoad && committeeList.length > 0) {
            onFirstCommitteeLoad(committeeList[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load committees:", err);
        if (!cancelled) {
          setCommittees([]);
          setGroupedCommittees({});
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCommittees();

    return () => {
      cancelled = true;
    };
  }, [onFirstCommitteeLoad]);

  const toggleAccordion = (id) => {
    if (activeAccordion.includes(id)) {
      setActiveAccordion(activeAccordion.filter((item) => item !== id));
    } else {
      setActiveAccordion([...activeAccordion, id]);
    }
  };

  // Convert grouped committees to accordion items
  const accordionItems = Object.keys(groupedCommittees).map((category, index) => ({
    id: String(index),
    title: category,
    items: groupedCommittees[category],
  }));

  return (
    <div className="list-sidebar-style1 committi position-relative">
      <div className="form-style1 mb20 mt10">
        
        <label className="form-label fw-bold mb-2">
          KLA
        </label>

        <div className="bootselect-multiselect">
          <select
            className="selectpicker"
            value={selectedKLA}
            onChange={(e) => setSelectedKLA(e.target.value)}
          >
            {klaOptions.length === 0 ? (
              <option value="">Select KLA</option>
            ) : (
              klaOptions.map((kla) => (
                <option key={kla.id} value={kla.id}>
                  {getKlaDisplayName(kla)}
                </option>
              ))
            )}
          </select>
        </div>
        
      </div>


      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="accordion" id="accordionExample">
          {accordionItems.map((item) => (
            <div
              key={item.id}
              className={`card mt-0 ${
                activeAccordion.includes(item.id) ? "active" : ""
              }`}
            >
              <div
                className={`card-header ${
                  activeAccordion.includes(item.id) ? "active" : ""
                }`}
                id={`heading${item.id}`}
                onClick={() => toggleAccordion(item.id)}
              >
                <button
                  className="accordion-toggle"
                  aria-expanded={activeAccordion.includes(item.id)}
                  aria-controls={`collapse${item.id}`}
                >
                  <span className="title-text">{item.title}</span>
                  <span
                    className={`chevron ${
                      activeAccordion.includes(item.id) ? "rotate" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
              </div>

              <div
                id={`collapse${item.id}`}
                className={`collapse ${
                  activeAccordion.includes(item.id) ? "show" : ""
                }`}
                aria-labelledby={`heading${item.id}`}
                data-parent="#accordionExample"
              >
                <div className="sublinkz">
                  <ul>
                    {item.items.map((committee) => (
                      <li key={committee.id}>
                        <a
                          href="#"
                          className="d-flex align-items-start"
                          onClick={(e) => {
                            e.preventDefault();
                            if (onSelectCommittee) onSelectCommittee(committee);
                          }}
                        >
                          <span className="triangle-icon">▶</span>
                          <span className="sub-item">{committee.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



// import { useState } from "react";

// export default function CommitteeSidebar() {
//   const [selectedKLA, setSelectedKLA] = useState("15th");
//   const [activeAccordion, setActiveAccordion] = useState(["0"]);

//   const toggleAccordion = (id) => {
//     if (activeAccordion.includes(id)) {
//       setActiveAccordion(activeAccordion.filter((item) => item !== id));
//     } else {
//       setActiveAccordion([...activeAccordion, id]);
//     }
//   };

//   const accordionItems = [
//     {
//       id: "0",
//       title: "Advisory committee",
//       items: [
//         "Library Advisory committee",
//         "Legislature Museum Advisory Committee",
//         "Subject committee -v(Public works,transport and communication)",
//       ],
//     },
//     {
//       id: "1",
//       title: "Business Committee",
//       items: [
//         "Library Advisory committee",
//         "Legislature Museum Advisory Committee",
//         "Subject committee -v(Public works,transport and communication)",
//       ],
//     },
//     {
//       id: "2",
//       title: "Others",
//       items: [
//         "Library Advisory committee",
//         "Legislature Museum Advisory Committee",
//         "Subject committee -v(Public works,transport and communication)",
//       ],
//     },
//     {
//       id: "3",
//       title: "Subject committees",
//       items: [
//         "Library Advisory committee",
//         "Legislature Museum Advisory Committee",
//         "Subject committee -v(Public works,transport and communication)",
//       ],
//     },
//     {
//       id: "4",
//       title: "Financial committees",
//       items: [
//         "Library Advisory committee",
//         "Legislature Museum Advisory Committee",
//         "Subject committee -v(Public works,transport and communication)",
//       ],
//     },
//     {
//       id: "5",
//       title: "Welfare committees",
//       items: [
//         "Library Advisory committee",
//         "Legislature Museum Advisory Committee",
//         "Subject committee -v(Public works,transport and communication)",
//       ],
//     },
//     {
//       id: "6",
//       title: "Adhoc committees",
//       items: [
//         "Library Advisory committee",
//         "Legislature Museum Advisory Committee",
//         "Subject committee -v(Public works,transport and communication)",
//       ],
//     },
//     {
//       id: "7",
//       title: "Select committees",
//       items: [
//         "Library Advisory committee",
//         "Legislature Museum Advisory Committee",
//         "Subject committee -v(Public works,transport and communication)",
//       ],
//     },
//     {
//       id: "8",
//       title: "Expert committees",
//       items: [
//         "Library Advisory committee",
//         "Legislature Museum Advisory Committee",
//         "Subject committee -v(Public works,transport and communication)",
//       ],
//     },
//   ];

//   return (
//     <div className="list-sidebar-style1 committi position-relative">
//       <div className="form-style1 mb20 mt10">
//         <div className="bootselect-multiselect">
//           <select
//             className="selectpicker"
//             value={selectedKLA}
//             onChange={(e) => setSelectedKLA(e.target.value)}
//           >
//             <option value="15th">15th</option>
//             <option value="14th">14th</option>
//             <option value="13th">13th</option>
//             <option value="12th">12th</option>
//             <option value="11th">11th</option>
//             <option value="10th">10th</option>
//             <option value="9th">9th</option>
//           </select>
//         </div>
//       </div>

//       <div className="accordion" id="accordionExample">
//         {accordionItems.map((item) => (
//           <div
//             key={item.id}
//             className={`card mt-0 ${
//               activeAccordion.includes(item.id) ? "active" : ""
//             }`}
//           >
//             <div
//               className={`card-header ${
//                 activeAccordion.includes(item.id) ? "active" : ""
//               }`}
//               id={`heading${item.id}`}
//               onClick={() => toggleAccordion(item.id)}
//             >
//               <button
//                 className="accordion-toggle"
//                 aria-expanded={activeAccordion.includes(item.id)}
//                 aria-controls={`collapse${item.id}`}
//               >
//                 <span className="title-text">{item.title}</span>
//                 <span
//                   className={`chevron ${
//                     activeAccordion.includes(item.id) ? "rotate" : ""
//                   }`}
//                 >
//                   ▼
//                 </span>
//               </button>
//             </div>

//             {/* <div
//               className={`card-header ${
//                 activeAccordion.includes(item.id) ? "active" : ""
//               }`}
//               id={`heading${item.id}`}
//             >
//               <h6>
//                 <button
//                   className="btn btn-link ps-0 pt-0 d-flex justify-between w-100"
//                   onClick={() => toggleAccordion(item.id)}
//                   aria-expanded={activeAccordion.includes(item.id)}
//                   aria-controls={`collapse${item.id}`}
//                 >
//                   {item.title}
//                 </button>
//               </h6>
//               <span
//                 className={`chevron ${
//                   activeAccordion.includes(item.id) ? "rotate" : ""
//                 }`}
//               >
//                 ▼
//               </span>
//             </div> */}
//             <div
//               id={`collapse${item.id}`}
//               className={`collapse ${
//                 activeAccordion.includes(item.id) ? "show" : ""
//               }`}
//               aria-labelledby={`heading${item.id}`}
//               data-parent="#accordionExample"
//             >
//               <div className="sublinkz">
//                 <ul>
//                   {item.items.map((subItem, index) => (
//                     <li key={index}>
//                       <a href="#" className="d-flex align-items-start">
//                         <span className="triangle-icon">▶</span>
//                         <span className="sub-item">{subItem}</span>
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
