// "use client"

// import { useEffect, useState, useRef } from "react"
// import "../css/style.css"
// import "../css/ace-responsive-menu.css"
// import "../css/responsive.css"
// import "../css/bootstrap.min.css"
// import "../css/bootstrap-select.min.css"
// import "../styles/Navbar.css"
// import "../css/menu.css"
// import "../css/flaticon.css"
// import "../css/ud-custom-spacing.css"
// import "../css/animate.css"
// import { Link, useNavigate } from "react-router-dom"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//   faMagnifyingGlass,
//   faXmark,
//   faChevronRight,
//   faChevronLeft,
//   faAngleRight,
// } from "@fortawesome/free-solid-svg-icons"
// import DynamicLogo from "./Logo"
// import menuSource from "../data/menu.json"

// const buildMenuItemsFromJson = (data, languageId = 1) => {
//   const getTitle = (node) => {
//     const t = node?.translations?.find((tr) => tr.language_id === languageId) || node?.translations?.[0]
//     return t?.title || "Untitled"
//   }

//   return (Array.isArray(data) ? data : [])
//     .filter((n) => n?.active)
//     .map((n) => {
//       const title = getTitle(n)
//       const children = Array.isArray(n?.children) ? n.children : []

//       return {
//         title,
//         target: n.target || null, // route path
//         items:
//           children.length > 0
//             ? children
//                 .filter((c) => c?.active !== false)
//                 .map((c) => ({
//                   title: getTitle(c),
//                   target: c.target || null,
//                   items: c.children?.map((gc) => ({
//                     title: getTitle(gc),
//                     target: gc.target || null,
//                   })),
//                 }))
//             : [],
//       }
//     })
// }

// const SearchModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null
//   return (
//     <div className="search-modal">
//       <div className="modal-dialog modal-xl">
//         <div className="modal-content">
//           <div className="modal-header">
//             <button className="btn-close" onClick={onClose}>
//               <FontAwesomeIcon icon={faXmark} size="lg" />
//             </button>
//           </div>
//           <div className="modal-body">
//             <div className="popup-search-field search_area">
//               <FontAwesomeIcon
//                 className="popup-search"
//                 icon={faMagnifyingGlass}
//                 width={20}
//                 height={20}
//                 color="black"
//               />
//               <input
//                 type="text"
//                 className="form-control border-0"
//                 placeholder="What service are you looking for today?"
//               />
//               <button className="ud-btn-search btn-thm" type="submit">
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const HomeTest = () => {
//   const navigate = useNavigate()
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [activeSubmenu, setActiveSubmenu] = useState(null)
//   const [activeNestedSubmenu, setActiveNestedSubmenu] = useState(null)
//   const [activeMenuItem, setActiveMenuItem] = useState(null)
//   const [isMenuTransitioning, setIsMenuTransitioning] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [isHomePage, setIsHomePage] = useState(false)
//   const [menuItems, setMenuItems] = useState([])

//   const bodyOverflowRef = useRef(null)

//   useEffect(() => {
//     setMenuItems(buildMenuItemsFromJson(menuSource, 1))
//   }, [])

//   useEffect(() => {
//     const path = window.location.pathname
//     const isHome = path === "/" || path === "/home"
//     setIsHomePage(isHome)

//     const handleScroll = () => setIsScrolled(window.scrollY > 50)
//     window.addEventListener("scroll", handleScroll)
//     handleScroll()
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 991 && isMobileMenuOpen) {
//         setIsMobileMenuOpen(false)
//         setActiveSubmenu(null)
//         setActiveNestedSubmenu(null)
//         setActiveMenuItem(null)
//         setIsMenuTransitioning(false)
//       }
//     }
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [isMobileMenuOpen])

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       bodyOverflowRef.current = document.body.style.overflow
//       document.body.style.overflow = "hidden"
//     } else {
//       document.body.style.overflow = bodyOverflowRef.current || ""
//     }
//     return () => {
//       document.body.style.overflow = ""
//     }
//   }, [isMobileMenuOpen])

//   useEffect(() => {
//     if (isModalOpen) {
//       const originalOverflow = document.body.style.overflow
//       document.body.style.overflow = "hidden"
//       return () => {
//         document.body.style.overflow = originalOverflow || ""
//       }
//     }
//   }, [isModalOpen])

//   const isTransparent = isHomePage && !isScrolled

//   // Menu click handlers
//   const handleMenuItemClick = (item) => {
//     if (item.items.length > 0) {
//       setActiveSubmenu(item.title)
//       setActiveMenuItem(item.title)
//     } else if (item.target) {
//       navigate(item.target)
//       setIsMenuOpen(false)
//       setIsMobileMenuOpen(false)
//     }
//   }

//   const handleSubmenuItemClick = (subItem) => {
//     if (subItem.items && subItem.items.length > 0) {
//       setActiveNestedSubmenu(subItem.title)
//       setActiveMenuItem(subItem.title)
//     } else if (subItem.target) {
//       navigate(subItem.target)
//       setIsMenuOpen(false)
//       setIsMobileMenuOpen(false)
//     }
//   }

//   const handleNestedItemClick = (nestedItem) => {
//     if (nestedItem.target) {
//       navigate(nestedItem.target)
//       setIsMenuOpen(false)
//       setIsMobileMenuOpen(false)
//     }
//   }

//   const handleBackToMainMenu = () => {
//     setActiveSubmenu(null)
//     setActiveNestedSubmenu(null)
//     setActiveMenuItem(null)
//   }

//   const handleBackToSubmenu = () => {
//     setActiveNestedSubmenu(null)
//     setActiveMenuItem(activeSubmenu)
//   }

//   return (
//     <>
//       <div>
//         <div onClick={() => isMenuOpen && setIsMenuOpen(false)}>
//           <nav className="posr">
//             <div className="container posr menu_bdrt1">
//               <div className="row align-items-center justify-content-between">
//                 <div className="col-auto px-0">
//                   <div className="d-flex align-items-center justify-content-between">
//                     <div className="logos br-white-light pr30 pr5-xl">
//                       <div  to="/" className="logos  pr5-xl">
//                         <DynamicLogo
//                           whiteLogoSrc="/images/logq1.png"
//                           blackLogoSrc="/images/logb1.png"
//                           width={325}
//                           isTransparent={isTransparent}
//                         />
//                       </div >
//                     </div>
//                     <div className="home1_style">
//                       <div id="mega-menu">
//                         <a
//                           className="btn-mega fw500"
//                           href="#"
//                           onClick={(e) => {
//                             e.preventDefault()
//                             setIsMenuOpen(!isMenuOpen)
//                           }}
//                         >
//                           <span className="p130- pl10-xl pr5 fz15">
//                             <img
//                               src="/images/menu.png"
//                               alt="menu icon"
//                               className="flaticon-menu"
//                               width={15}
//                               height={15}
//                             />
//                           </span>
//                           <span className="menux">MENU</span>
//                         </a>
//                         <ul className="menu ps-0">
//                           {menuItems.map((item) => (
//                             <li key={item.title}>
//                               <a
//                                 className="dropdown"
//                                 onClick={() => handleMenuItemClick(item)}
//                               >
//                                 <img
//                                   src="/images/coding.png"
//                                   alt="menu icon"
//                                   className="menu-icn flaticon-developer"
//                                   width={15}
//                                   height={15}
//                                 />
//                                 <span className="menu-title">{item.title}</span>
//                                 {item.items && item.items.length > 0 && (
//                                   <FontAwesomeIcon icon={faAngleRight} className="menu-arrow" />
//                                 )}
//                               </a>
//                               {item.items && item.items.length > 0 && (
//                                 <div className="drop-menu d-flex ">
//                                   {item.items.map((subItem) => (
//                                     <div key={subItem.title} className="one-third">
//                                       <div className="h6 cat-title">{subItem.title}</div>
//                                       <ul className="ps-0 mb-0">
//                                         {subItem.items &&
//                                           subItem.items.map((nestedItem) => (
//                                             <li key={nestedItem.title}>
//                                               <a
//                                                 className="menu-link"
//                                                 onClick={() => handleNestedItemClick(nestedItem)}
//                                               >
//                                                 {nestedItem.title}
//                                               </a>
//                                             </li>
//                                           ))}
//                                         {!subItem.items || subItem.items.length === 0 ? (
//                                           <li>
//                                             <a
//                                               className="menu-link"
//                                               onClick={() => handleSubmenuItemClick(subItem)}
//                                             >
//                                               {subItem.title}
//                                             </a>
//                                           </li>
//                                         ) : null}
//                                       </ul>
//                                     </div>
//                                   ))}
//                                 </div>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-auto px-0 login-session">
//                   <div className="d-flex align-items-center">
//                     <a
//                       className="login-info mr20 pl15-lg pl30 search-trigger"
//                       onClick={() => setIsModalOpen(true)}
//                     >
//                       <img id="search-icon" src="/images/search.png" width={20} height={20} alt="Search" />
//                     </a>
//                     <Link className="ud-btn btn-white add-joining" to="/login">
//                       Log in
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </div>

//         <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

//         {/* Mobile Menu */}
//         <div id="page" className={`${isScrolled ? "mobilie_header_nav stylehome1" : "nav-homepage-style"}`}>
//           <div className="mobile-menu">
//             <div className={`header bb-white-light ${isTransparent ? "mobile-header-transparent" : "mobile-header-white"}`}>
//               <div className="menu_and_widgets">
//                 <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
//                   {/* <a className="mobile_logo" href="#">
//                     <DynamicLogo
//                       whiteLogoSrc="/images/logq1.png"
//                       blackLogoSrc="/images/logb1.png"
//                       width={325}
//                       href="/"
//                     />
//                   </a> */}
//                   <div className="mobile_logo" href="#">
//                     <DynamicLogo
//                       whiteLogoSrc="/images/logq1.png"
//                       blackLogoSrc="/images/logb1.png"
//                       width={325}
//                       href="/"
//                     />
//                   </div>
//                   <div className="right-side text-end d-flex align-items-center">
//                     <Link className={isTransparent ? "text-white" : "text-dark"} to="/login">
//                       Login
//                     </Link>
//                     <a
//                       className={`menubar ml20 mobile-menu-trigger ${isTransparent ? "text-white" : "text-dark"}`}
//                       href="#"
//                       onClick={(e) => {
//                         e.preventDefault()
//                         setIsMobileMenuOpen(!isMobileMenuOpen)
//                         setActiveSubmenu(null)
//                         setActiveNestedSubmenu(null)
//                         setActiveMenuItem(null)
//                         setIsMenuTransitioning(false)
//                       }}
//                     >
//                       <img
//                         src={isTransparent ? "/images/bars-solid.svg" : "/images/right-margin_10396835.png"}
//                         alt="Menu Icon"
//                         width={15}
//                         height={15}
//                       />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {isMobileMenuOpen && (
//             <div
//               className="mobile-menu-overlay"
//               onClick={() => {
//                 setIsMobileMenuOpen(false)
//                 setActiveSubmenu(null)
//                 setActiveNestedSubmenu(null)
//                 setActiveMenuItem(null)
//                 setIsMenuTransitioning(false)
//               }}
//             ></div>
//           )}

//           <div className={`mobile-menu-container ${isMobileMenuOpen ? "open" : "closed"}`}>
//             <div className={`menu-header ${activeSubmenu || activeNestedSubmenu ? "with-back" : "centered"}`}>
//               {activeNestedSubmenu ? (
//                 <button onClick={handleBackToSubmenu} className="back-button">
//                   <FontAwesomeIcon icon={faChevronLeft} />
//                 </button>
//               ) : activeSubmenu ? (
//                 <button onClick={handleBackToMainMenu} className="back-button">
//                   <FontAwesomeIcon icon={faChevronLeft} />
//                 </button>
//               ) : null}
//               <h2 className="menu-header-title">{activeNestedSubmenu || activeSubmenu || "Menu"}</h2>
//               {(activeSubmenu || activeNestedSubmenu) && <div className="spacer"></div>}
//             </div>

//             <div className={`menu-content ${isMenuTransitioning ? "transitioning" : ""}`}>
//               <ul className={`main-menu-list ${!activeSubmenu && !activeNestedSubmenu ? "active" : ""}`}>
//                 {menuItems.map((item) => (
//                   <li key={item.title} className="menu-item">
//                     <button onClick={() => handleMenuItemClick(item)} className={`menu-button ${activeMenuItem === item.title ? "active" : ""}`}>
//                       <span>{item.title}</span>
//                       {item.items.length > 0 && <FontAwesomeIcon icon={faChevronRight} />}
//                     </button>
//                   </li>
//                 ))}
//               </ul>

//               <ul className={`submenu-list ${activeSubmenu && !activeNestedSubmenu ? "active" : ""}`}>
//                 {menuItems
//                   .find((item) => item.title === activeSubmenu)
//                   ?.items.map((subItem) => (
//                     <li key={subItem.title} className="menu-item">
//                       {subItem.items && subItem.items.length > 0 ? (
//                         <button onClick={() => handleSubmenuItemClick(subItem)} className={`menu-button ${activeMenuItem === subItem.title ? "active" : ""}`}>
//                           <span>{subItem.title}</span>
//                           <FontAwesomeIcon icon={faChevronRight} />
//                         </button>
//                       ) : (
//                         <button onClick={() => handleSubmenuItemClick(subItem)} className="menu-link">{subItem.title}</button>
//                       )}
//                     </li>
//                   ))}
//               </ul>

//               <ul className={`nested-submenu-list ${activeNestedSubmenu ? "active" : ""}`}>
//                 {menuItems
//                   .find((item) => item.title === activeSubmenu)
//                   ?.items.find((subItem) => subItem.title === activeNestedSubmenu)
//                   ?.items.map((nestedItem) => (
//                     <li key={nestedItem.title} className="menu-item">
//                       <button onClick={() => handleNestedItemClick(nestedItem)} className="menu-link">{nestedItem.title}</button>
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default HomeTest

// -------------------------------------------------------------------------

// "use client"

// import { useEffect, useState, useRef } from "react"
// import "../css/style.css"
// import "../css/ace-responsive-menu.css"
// import "../css/responsive.css"
// import "../css/bootstrap.min.css"
// import "../css/bootstrap-select.min.css"
// import "../styles/Navbar.css"
// import "../css/menu.css"
// import "../css/flaticon.css"

// import "../css/ud-custom-spacing.css"
// import "../css/animate.css"
// import { Link } from "react-router-dom"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//   faMagnifyingGlass,
//   // faTimes,
//   faXmark,
//   faChevronRight,
//   faChevronLeft,
//   faAngleRight,
// } from "@fortawesome/free-solid-svg-icons"
// import DynamicLogo from "./Logo"
// import "../styles/Navbar.css"

// import menuSource from "../data/menu.json"

// const buildMenuItemsFromJson = (data, languageId = 1) => {
//   const getTitle = (node) => {
//     const t = node?.translations?.find((tr) => tr.language_id === languageId) || node?.translations?.[0]
//     return t?.title || "Untitled"
//   }

//   const toLink = (target) => {
//     if (!target) return "#"
//     // Keep anchors as-is; ensure they start with '#'
//     return target.startsWith("#") ? target : `#${target}`
//   }

//   return (Array.isArray(data) ? data : [])
//     .filter((n) => n?.active)
//     .map((n) => {
//       const title = getTitle(n)
//       const children = Array.isArray(n?.children) ? n.children : []

//       // If there are children, make them submenu links
//       if (children.length > 0) {
//         return {
//           title,
//           items: children
//             .filter((c) => c?.active !== false)
//             .map((c) => ({
//               title: getTitle(c),
//               link: toLink(c.target),
//             })),
//         }
//       }

//       // If no children, create a submenu with a single link
//       return {
//         title,
//         items: [
//           {
//             title,
//             link: toLink(n.target),
//           },
//         ],
//       }
//     })
// }

// const SearchModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null

//   return (
//     <div className="search-modal">
//       <div className="modal-dialog modal-xl">
//         <div className="modal-content">
//           <div className="modal-header">
//             <button className="btn-close" onClick={onClose}>
//               <FontAwesomeIcon icon={faXmark} size="lg" />
//             </button>
//           </div>
//           <div className="modal-body">
//             <div className="popup-search-field search_area">
//               <FontAwesomeIcon className="popup-search" icon={faMagnifyingGlass} width={20} height={20} color="black" />
//               <input
//                 type="text"
//                 className="form-control border-0"
//                 placeholder="What service are you looking for today?"
//               />
//               <button className="ud-btn-search btn-thm" type="submit">
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const HomeTest = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [activeSubmenu, setActiveSubmenu] = useState(null)
//   const [activeNestedSubmenu, setActiveNestedSubmenu] = useState(null)
//   const [activeMenuItem, setActiveMenuItem] = useState(null)
//   const [isMenuTransitioning, setIsMenuTransitioning] = useState(false)

//   const [isScrolled, setIsScrolled] = useState(false)
//   const [isHomePage, setIsHomePage] = useState(false)

//   const [menuItems, setMenuItems] = useState([])
//   useEffect(() => {
//     setMenuItems(buildMenuItemsFromJson(menuSource, 1))
//   }, [])

//   useEffect(() => {
//     const path = window.location.pathname
//     const isHome = path === "/" || path === "/home"
//     setIsHomePage(isHome)

//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50)
//     }

//     window.addEventListener("scroll", handleScroll)
//     handleScroll() // Set on load

//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//     }
//   }, [])

//   // Handle window resize to close mobile menu when screen size changes
//   useEffect(() => {
//     const handleResize = () => {
//       // Close mobile menu when screen width becomes larger than mobile breakpoint
//       if (window.innerWidth > 991 && isMobileMenuOpen) {
//         setIsMobileMenuOpen(false)
//         setActiveSubmenu(null)
//         setActiveNestedSubmenu(null)
//         setActiveMenuItem(null)
//         setIsMenuTransitioning(false)
//       }
//     }

//     window.addEventListener("resize", handleResize)

//     return () => {
//       window.removeEventListener("resize", handleResize)
//     }
//   }, [isMobileMenuOpen])

//   // ✅ Only true for homepage and not scrolled
//   const isTransparent = isHomePage && !isScrolled

//   // Reference to store original body overflow style
//   const bodyOverflowRef = useRef(null)

//   // Effect to disable scrolling when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       // Store the original overflow style
//       bodyOverflowRef.current = document.body.style.overflow
//       // Disable scrolling
//       document.body.style.overflow = "hidden"
//     } else {
//       // Restore original overflow style when menu is closed
//       if (bodyOverflowRef.current !== null) {
//         document.body.style.overflow = bodyOverflowRef.current
//       } else {
//         document.body.style.overflow = ""
//       }
//     }

//     // Cleanup function to ensure body overflow is restored when component unmounts
//     return () => {
//       document.body.style.overflow = ""
//     }
//   }, [isMobileMenuOpen])

//   // Effect to disable scrolling when modal is open
//   useEffect(() => {
//     if (isModalOpen) {
//       // Store the original overflow style
//       const originalOverflow = document.body.style.overflow
//       // Disable scrolling
//       document.body.style.overflow = "hidden"

//       // Cleanup function to restore scrolling when modal closes
//       return () => {
//         document.body.style.overflow = originalOverflow || ""
//       }
//     }
//   }, [isModalOpen])

//   // Function to handle main menu item click
//   const handleMenuItemClick = (menuTitle) => {
//     setIsMenuTransitioning(true)

//     // Add slide-out effect to current menu
//     const currentMenu = document.querySelector(".main-menu-list")
//     if (currentMenu) {
//       currentMenu.classList.add("slide-out-left")
//     }

//     // Wait for slide-out animation, then update state
//     setTimeout(() => {
//       setActiveMenuItem(menuTitle)
//       setActiveSubmenu(menuTitle)
//       setActiveNestedSubmenu(null)
//       setIsMenuTransitioning(false)
//       // Remove the class after transition if needed, or handle it via CSS
//     }, 150)
//   }

//   // Function to handle submenu item click
//   const handleSubmenuItemClick = (submenuTitle) => {
//     setIsMenuTransitioning(true)

//     // Add slide-out effect to current menu
//     const currentMenu = document.querySelector(".submenu-list")
//     if (currentMenu) {
//       currentMenu.classList.add("slide-out-left")
//     }

//     // Wait for slide-out animation, then update state
//     setTimeout(() => {
//       setActiveMenuItem(submenuTitle)
//       setActiveNestedSubmenu(submenuTitle)
//       setIsMenuTransitioning(false)
//       // Remove the class after transition if needed, or handle it via CSS
//     }, 150)
//   }

//   // Function to go back to main menu
//   const handleBackToMainMenu = () => {
//     setIsMenuTransitioning(true)

//     // Add slide-out effect to current menu
//     const currentMenu = document.querySelector(".submenu-list")
//     if (currentMenu) {
//       currentMenu.classList.add("slide-out-right")
//     }

//     // Wait for slide-out animation, then update state (slower for back navigation)
//     setTimeout(() => {
//       setActiveSubmenu(null)
//       setActiveNestedSubmenu(null)
//       setIsMenuTransitioning(false)
//       // Remove the class after transition if needed, or handle it via CSS
//     }, 250)
//   }

//   // Function to go back to submenu from nested submenu
//   const handleBackToSubmenu = () => {
//     setIsMenuTransitioning(true)

//     // Add slide-out effect to current menu
//     const currentMenu = document.querySelector(".nested-submenu-list")
//     if (currentMenu) {
//       currentMenu.classList.add("slide-out-right")
//     }

//     // Wait for slide-out animation, then update state (slower for back navigation)
//     setTimeout(() => {
//       setActiveNestedSubmenu(null)
//       setIsMenuTransitioning(false)
//       // Remove the class after transition if needed, or handle it via CSS
//     }, 250)
//   }

//   return (
//     <>
//       {/* <TopMenu/> */}

//       <div>
//         <div onClick={() => isMenuOpen && setIsMenuOpen(false)}>
//           <nav className="posr">
//             <div className="container posr menu_bdrt1">
//               <div className="row align-items-center justify-content-between">
//                 <div className="col-auto px-0">
//                   <div className="d-flex align-items-center justify-content-between">
//                     <div className="logos br-white-light pr30 pr5-xl">
//                       <Link to="/" className="logos br-white-light pr30 pr5-xl">
//                         <DynamicLogo
//                           whiteLogoSrc="/images/logq1.png"
//                           blackLogoSrc="/images/logb1.png"
//                           width={325}
//                           isTransparent={isTransparent}
//                         />
//                       </Link>
//                     </div>
//                     <div className="home1_style">
//                       <div id="mega-menu">
//                         <a
//                           className="btn-mega fw500"
//                           href="#"
//                           onClick={(e) => {
//                             e.preventDefault()
//                             setIsMenuOpen(!isMenuOpen)
//                           }}
//                         >
//                           <span className="pl30 pl10-xl pr5 fz15">
//                             <img
//                               src="/images/menu.png"
//                               alt="menu icon"
//                               className="flaticon-menu"
//                               width={15}
//                               height={15}
//                             />
//                           </span>
//                           <span className="menux">MENU</span>
//                         </a>
//                         <ul
//                           className="menu ps-0"
//                           // style={{ display: isMenuOpen ? "block" : "none" }}
//                         >
//                           {menuItems.map((item) => (
//                             <li key={item.title}>
//                               <a className="dropdown" href={item.link || "#"}>
//                                 <img
//                                   src="/images/coding.png"
//                                   alt="menu icon"
//                                   className="menu-icn flaticon-developer"
//                                   width={15}
//                                   height={15}
//                                 />
//                                 <span className="menu-title">{item.title}</span>
//                                 {item.items && item.items.length > 0 && (
//                                   <FontAwesomeIcon icon={faAngleRight} className="menu-arrow" />
//                                 )}
//                               </a>
//                               {item.items && item.items.length > 0 && (
//                                 <div className="drop-menu d-flex justify-content-between">
//                                   {item.items.map((subItem, ) => (
//                                     <div key={subItem.title} className="one-third">
//                                       <div className="h6 cat-title">{subItem.title}</div>
//                                       <ul className="ps-0 mb-0">
//                                         {subItem.items &&
//                                           subItem.items.map((linkItem) => (
//                                             <li key={linkItem.title}>
//                                               <Link to={linkItem.link}>{linkItem.title}</Link>
//                                             </li>
//                                           ))}
//                                       </ul>
//                                     </div>
//                                   ))}
//                                 </div>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-auto px-0 login-session">
//                   <div className="d-flex align-items-center">
//                     <a className="login-info mr20 pl15-lg pl30 search-trigger" onClick={() => setIsModalOpen(true)}>
//                       <img id="search-icon" src="/images/search.png" width={20} height={20} alt="Search" />
//                     </a>
//                     {/* <a className="ud-btn btn-white add-joining" href="page-register.html">
//                 Log in
//               </a> */}
//                     <Link className="ud-btn btn-white add-joining" to="/login">
//                       Log in
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </div>

//         {/* Search Modal */}
//         {isModalOpen && (
//           <div className="search-modal">
//             {/* <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div> */}
//             <div className="modal-dialog modal-xl">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <button className="btn-close" onClick={() => setIsModalOpen(false)}>
//                     <FontAwesomeIcon icon={faXmark} size="lg" />
//                   </button>
//                 </div>
//                 <div className="modal-body">
//                   <div className="popup-search-field search_area">
//                     <FontAwesomeIcon
//                       className="popup-search"
//                       icon={faMagnifyingGlass}
//                       width={20}
//                       height={20}
//                       color="black"
//                     />
//                     <input
//                       type="text"
//                       className="form-control border-0"
//                       placeholder="What service are you looking for today?"
//                     />
//                     {/* <label>
//                     </label> */}
//                     <button className="ud-btn-search btn-thm" type="submit">
//                       Search
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="hiddenbar-body-ovelay"></div>

//         {/* Mobile Nav */}

//         {/* <header
//         className={`header-nav nav-homepage-style stricky main-menu ${
//           isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
//         }`}
//       ></header> */}

//         {/* <div id="page" className="mobilie_header_nav stylehome1"> */}
//         <div id="page" className={`${isScrolled ? "mobilie_header_nav stylehome1" : "nav-homepage-style"}`}>
//           <div className="mobile-menu">
//             <div
//               className={`header bb-white-light ${isTransparent ? "mobile-header-transparent" : "mobile-header-white"}`}
//             >
//               <div className="menu_and_widgets">
//                 <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
//                   <a className="mobile_logo" href="#">
//                     <DynamicLogo
//                       whiteLogoSrc="/images/logq1.png"
//                       blackLogoSrc="/images/logb1.png"
//                       width={325}
//                       href="/"
//                     />
//                   </a>
//                   <div className="right-side text-end d-flex align-items-center">
//                     {/* <a className={isTransparent ? "text-white" : "text-dark"} href="page-login.html">
//                   Join
//                 </a> */}
//                     <Link className={isTransparent ? "text-white" : "text-dark"} to="/login">
//                       Login
//                     </Link>
//                     <a
//                       className={`menubar ml20 mobile-menu-trigger ${isTransparent ? "text-white" : "text-dark"}`}
//                       href="#"
//                       onClick={(e) => {
//                         e.preventDefault()
//                         setIsMobileMenuOpen(!isMobileMenuOpen)
//                         setActiveSubmenu(null)
//                         setActiveNestedSubmenu(null)
//                         setActiveMenuItem(null)
//                         setIsMenuTransitioning(false)
//                       }}
//                     >
//                       <img
//                         src={isTransparent ? "/images/bars-solid.svg" : "/images/right-margin_10396835.png"}
//                         alt="Menu Icon"
//                         width={15}
//                         height={15}
//                       />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Menu Overlay */}
//           {isMobileMenuOpen && (
//             <div
//               className="mobile-menu-overlay"
//               onClick={() => {
//                 setIsMobileMenuOpen(false)
//                 setActiveSubmenu(null)
//                 setActiveNestedSubmenu(null)
//                 setActiveMenuItem(null)
//                 setIsMenuTransitioning(false)
//               }}
//             ></div>
//           )}

//           {/* Mobile Menu Container */}
//           <div className={`mobile-menu-container ${isMobileMenuOpen ? "open" : "closed"}`}>
//             {/* Menu Header */}
//             <div className={`menu-header ${activeSubmenu || activeNestedSubmenu ? "with-back" : "centered"}`}>
//               {activeNestedSubmenu ? (
//                 <button onClick={handleBackToSubmenu} className="back-button">
//                   <FontAwesomeIcon icon={faChevronLeft} />
//                 </button>
//               ) : activeSubmenu ? (
//                 <button onClick={handleBackToMainMenu} className="back-button">
//                   <FontAwesomeIcon icon={faChevronLeft} />
//                 </button>
//               ) : null}

//               <h2 className="menu-header-title">{activeNestedSubmenu || activeSubmenu || "Menu"}</h2>

//               {(activeSubmenu || activeNestedSubmenu) && <div className="spacer"></div>}
//             </div>

//             {/* Menu Content */}
//             <div className={`menu-content ${isMenuTransitioning ? "transitioning" : ""}`}>
//               <ul className={`main-menu-list ${!activeSubmenu && !activeNestedSubmenu ? "active" : ""}`}>
//                 {menuItems.map((item) => (
//                   <li key={item.title} className="menu-item">
//                     <button
//                       onClick={() => handleMenuItemClick(item.title)}
//                       className={`menu-button ${activeMenuItem === item.title ? "active" : ""}`}
//                     >
//                       <span>{item.title}</span>
//                       <FontAwesomeIcon icon={faChevronRight} />
//                     </button>
//                   </li>
//                 ))}
//               </ul>

//               <ul className={`submenu-list ${activeSubmenu && !activeNestedSubmenu ? "active" : ""}`}>
//                 {menuItems
//                   .find((item) => item.title === activeSubmenu)
//                   ?.items.map((subItem) => (
//                     <li key={subItem.title} className="menu-item">
//                       {subItem.items && subItem.items.length > 0 ? (
//                         <button
//                           onClick={() => handleSubmenuItemClick(subItem.title)}
//                           className={`menu-button ${activeMenuItem === subItem.title ? "active" : ""}`}
//                         >
//                           <span>{subItem.title}</span>
//                           <FontAwesomeIcon icon={faChevronRight} />
//                         </button>
//                       ) : (
//                         <a href={subItem.link} className="menu-link">
//                           {subItem.title}
//                         </a>
//                       )}
//                     </li>
//                   ))}
//               </ul>

//               <ul className={`nested-submenu-list ${activeNestedSubmenu ? "active" : ""}`}>
//                 {menuItems
//                   .find((item) => item.title === activeSubmenu)
//                   ?.items.find((subItem) => subItem.title === activeNestedSubmenu)
//                   ?.items.map((linkItem) => (
//                     <li key={linkItem.title} className="menu-item">
//                       <a href={linkItem.link} className="menu-link">
//                         {linkItem.title}
//                       </a>
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default HomeTest

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------


import { useEffect, useState, useRef } from "react";
import "../css/style.css";
import "../css/ace-responsive-menu.css";
import "../css/responsive.css";
import "../css/bootstrap.min.css";
import "../css/bootstrap-select.min.css";
import "../styles/Navbar.css";
import "../css/menu.css";
import "../css/flaticon.css";
import "../css/ud-custom-spacing.css";
import "../css/animate.css";
import { Link, useNavigate } from "react-router-dom";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faChevronDown,
  faChevronUp,
  faAngleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import DynamicLogo from "./Logo";
import { fetchMenus } from "../api/services/all.service";

// ─── Transform API menu data ────────────────────────────────────────────────
const transformMenuData = (apiMenus, languageId = 1) => {
  const getTitle = (translations) => {
    const t =
      translations?.find((tr) => tr.language_id === languageId) ||
      translations?.[0];
    return t?.title || "Untitled";
  };

  const transformChildren = (children) => {
    if (!children || children.length === 0) return [];
    return children
      .filter((c) => c.active)
      .map((c) => ({
        title: getTitle(c.translations),
        link: c.target || "#",
        type: c.type,
        items: transformChildren(c.children),
      }));
  };

  return apiMenus
    .filter((m) => m.active && m.parent_id === null)
    .map((m) => ({
      title: getTitle(m.translations),
      link: m.target || "#",
      type: m.type,
      items: transformChildren(m.children),
    }));
};

// ─── Desktop drop-menu renderer (unchanged) ─────────────────────────────────
const MenuItemRenderer = ({ item, level = 0 }) => {
  const hasChildren = item.items && item.items.length > 0;
  const isExternal = item.type === "external";

  const handleClick = (e, link) => {
    if (!link || link === "#") return;
    const currentPath = window.location.pathname;
    if (currentPath === link) {
      e.preventDefault();
      window.location.reload();
    }
  };

  if (level === 0) {
    if (hasChildren) {
      return (
        <div style={{ breakInside: "avoid", marginBottom: "20px" }}>
          <div className="h6 cat-title">{item.title}</div>
          <ul className="ps-0 mb-0">
            {item.items.map((sub, i) => (
              <MenuItemRenderer key={i} item={sub} level={1} />
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div style={{ breakInside: "avoid", marginBottom: "20px" }}>
        <div className="h6 cat-title">
          {isExternal ? (
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          ) : (
            <Link to={item.link} onClick={(e) => handleClick(e, item.link)}>
              {item.title}
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (!hasChildren) {
    return (
      <li>
        {isExternal ? (
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
        ) : (
          <Link to={item.link} onClick={(e) => handleClick(e, item.link)}>
            {item.title}
          </Link>
        )}
      </li>
    );
  }

  return (
    <>
      <li>
        {isExternal ? (
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
        ) : (
          <Link to={item.link} onClick={(e) => handleClick(e, item.link)}>
            {item.title}
          </Link>
        )}
      </li>
      {item.items.map((sub, i) => (
        <MenuItemRenderer key={i} item={sub} level={level + 1} />
      ))}
    </>
  );
};

// ─── Mobile accordion group ──────────────────────────────────────────────────
const MobileMenuGroup = ({ item, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.items && item.items.length > 0;
  const isExternal = item.type === "external";

  const handleClick = (e, link) => {
    if (!link || link === "#") return;
    if (window.location.pathname === link) {
      e.preventDefault();
      onNavigate();
      window.location.reload();
    } else {
      onNavigate();
    }
  };

  if (!hasChildren) {
    // Top-level leaf — direct link
    return (
      <div className="mob-group">
        {isExternal ? (
          <a
            href={item.link}
            className="mob-group-header mob-group-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
          >
            {item.title}
          </a>
        ) : (
          <Link
            to={item.link}
            className="mob-group-header mob-group-link"
            onClick={(e) => handleClick(e, item.link)}
          >
            {item.title}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="mob-group">
      {/* Group header — toggles the child list */}
      <button
        className={`mob-group-header${open ? " mob-group-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{item.title}</span>
        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} className="mob-group-arrow" />
      </button>

      {/* Child links — shown when open */}
      {open && (
        <ul className="mob-group-children">
          {item.items.map((child, i) => {
            const childExternal = child.type === "external";
            // If child itself has children (nested group), recurse
            if (child.items && child.items.length > 0) {
              return (
                <li key={i} className="mob-child-group">
                  <MobileMenuGroup item={child} onNavigate={onNavigate} />
                </li>
              );
            }
            return (
              <li key={i}>
                {childExternal ? (
                  <a
                    href={child.link}
                    className="mob-child-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onNavigate}
                  >
                    {child.title}
                  </a>
                ) : (
                  <Link
                    to={child.link}
                    className="mob-child-link"
                    onClick={(e) => handleClick(e, child.link)}
                  >
                    {child.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

// ─── Main Header component ───────────────────────────────────────────────────
const HomeTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const bodyOverflowRef = useRef(null);

  // Load menu from API
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoadingMenu(true);
        const data = await fetchMenus();
        setMenuItems(transformMenuData(data, 1));
      } catch {
        setMenuItems([]);
      } finally {
        setIsLoadingMenu(false);
      }
    };
    load();
  }, []);

  // Scroll & home detection
  useEffect(() => {
    const isHome =
      window.location.pathname === "/" ||
      window.location.pathname === "/home";
    setIsHomePage(isHome);
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 991 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      bodyOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = bodyOverflowRef.current || "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Lock body scroll when search modal is open
  useEffect(() => {
    if (isModalOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig || "";
      };
    }
  }, [isModalOpen]);

  const isTransparent = isHomePage && !isScrolled;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* ── Desktop nav ─────────────────────────────────────────────────── */}
      <div>
        <div onClick={() => isMenuOpen && setIsMenuOpen(false)}>
          <nav className="posr">
            <div className="container posr menu_bdrt1">
              <div className="row align-items-center justify-content-between">
                {/* Logo + mega-menu */}
                <div className="col-auto px-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="logos br-white-light pr30 pr5-xl">
                      <Link to="/">
                        <DynamicLogo
                          whiteLogoSrc="/images/logq1.png"
                          blackLogoSrc="/images/logb1.png"
                          width={325}
                          isTransparent={isTransparent}
                        />
                      </Link>
                    </div>
                    <div className="home1_style">
                      <div id="mega-menu">
                        <a
                          className="btn-mega fw500"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMenuOpen((v) => !v);
                          }}
                        >
                          <span className="fz15">
                            <img
                              src="/images/menu.png"
                              alt="menu icon"
                              className="flaticon-menu"
                              width={15}
                              height={15}
                            />
                          </span>
                          <span className="menux">MENU</span>
                        </a>
                        <ul className="menu ps-0">
                          {isLoadingMenu ? (
                            <li>
                              <a className="dropdown" href="#">
                                <span className="menu-title">Loading…</span>
                              </a>
                            </li>
                          ) : (
                            menuItems.map((item, i) => (
                              <li key={i}>
                                <a className="dropdown" href={item.link}>
                                  <img
                                    src="/images/coding.png"
                                    alt=""
                                    className="menu-icn flaticon-developer"
                                    width={15}
                                    height={15}
                                  />
                                  <span className="menu-title">{item.title}</span>
                                  {item.items?.length > 0 && (
                                    <FontAwesomeIcon
                                      icon={faAngleRight}
                                      className="menu-arrow"
                                    />
                                  )}
                                </a>
                                {item.items?.length > 0 && (
                                  <div
                                    className="drop-menu"
                                    style={{ columnCount: 3, columnGap: "20px" }}
                                  >
                                    {item.items.map((sub, j) => (
                                      <MenuItemRenderer key={j} item={sub} level={0} />
                                    ))}
                                  </div>
                                )}
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search + Login */}
                <div className="col-auto px-0 login-session">
                  <div className="d-flex align-items-center">
                    <a
                      className="login-info mr20 pl15-lg pl30 search-trigger"
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsModalOpen(true)}
                    >
                      <img
                        id="search-icon"
                        src="/images/search.png"
                        width={20}
                        height={20}
                        alt="Search"
                      />
                    </a>
                    {/* <Link className="ud-btn btn-white add-joining" to="/login">
                      ലോഗിൻ
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Search modal */}
        {isModalOpen && (
          <div className="search-modal">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    className="btn-close"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <FontAwesomeIcon icon={faXmark} size="lg" />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="popup-search-field search_area">
                    <FontAwesomeIcon
                      className="popup-search"
                      icon={faMagnifyingGlass}
                      width={20}
                      height={20}
                      color="black"
                    />
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="What service are you looking for today?"
                    />
                    <button className="ud-btn-search btn-thm" type="submit">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="hiddenbar-body-ovelay"></div>

        {/* ── Mobile nav bar ──────────────────────────────────────────────── */}
        <div
          id="page"
          className={
            isScrolled ? "mobilie_header_nav stylehome1" : "nav-homepage-style"
          }
        >
          <div className="mobile-menu">
            <div
              className={`header bb-white-light ${
                isTransparent
                  ? "mobile-header-transparent"
                  : "mobile-header-white"
              }`}
            >
              <div className="menu_and_widgets">
                <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
                  <Link className="mobile_logo" to="/">
                    <DynamicLogo
                      whiteLogoSrc="/images/logq1.png"
                      blackLogoSrc="/images/logb1.png"
                      width={325}
                    />
                  </Link>
                  <div className="right-side text-end d-flex align-items-center">
                    {/* <Link
                      className={isTransparent ? "text-white" : "text-dark"}
                      to="/login"
                    >
                      Login
                    </Link> */}
                    <button
                      className={`menubar ml20 mobile-menu-trigger${
                        isTransparent ? " text-white" : " text-dark"
                      }`}
                      aria-label="Open menu"
                      onClick={() => setIsMobileMenuOpen(true)}
                    >
                      <img
                        src={
                          isTransparent
                            ? "/images/bars-solid.svg"
                            : "/images/right-margin_10396835.png"
                        }
                        alt="Menu"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay */}
          {isMobileMenuOpen && (
            <div
              className="mobile-menu-overlay"
              onClick={closeMobileMenu}
            />
          )}

          {/* ── Slide-in panel ──────────────────────────────────────────── */}
          <div
            className={`mobile-menu-container${isMobileMenuOpen ? " open" : " closed"}`}
          >
            {/* Panel header */}
            <div className="mob-panel-header">
              <Link to="/" onClick={closeMobileMenu}>
                <DynamicLogo
                  whiteLogoSrc="/images/logq1.png"
                  blackLogoSrc="/images/logb1.png"
                  width={180}
                />
              </Link>
              <button
                className="mob-close-btn"
                aria-label="Close menu"
                onClick={closeMobileMenu}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Accordion menu — mirrors desktop structure */}
            <nav className="mob-nav">
              {isLoadingMenu ? (
                <p className="mob-loading">Loading…</p>
              ) : (
                menuItems.map((item, i) => (
                  <MobileMenuGroup
                    key={i}
                    item={item}
                    onNavigate={closeMobileMenu}
                  />
                ))
              )}
            </nav>

            {/* Bottom login link */}
            <div className="mob-panel-footer">
              {/* <Link
                to="/login"
                className="mob-login-btn"
                onClick={closeMobileMenu}
              >
                ലോഗിൻ
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTest;
