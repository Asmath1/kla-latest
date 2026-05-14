import React, { useEffect, useState } from "react";
import "../App.css";
import "../styles/ViewMore.css";
import "../styles/Body.css";
import HomeTest from "./Header";
import { BreadcrumbNav, CategoriesNav, SectionTitle } from "./common";
import { useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "../utils/config";

const ViewMore = () => {
  const [updates, setUpdates] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const type = location.state?.type || "notification"; // default fallback

  /*const updates = [
    {
      id: 1,
      text: "പതിനഞ്ചാം കേരള നിയമസഭ - പതിനാലാം സമ്മേളനം-   കലണ്ടർ‍- മന്ത്രിമാര്‍ ചോദ്യങ്ങള്‍ക്ക് ഉത്തരം നല്‍കുന്നതിന് നിശ്ചയിച്ചിട്ടുള്ള ദിവസങ്ങൾ -  ചോദ്യങ്ങൾക്കുള്ള നോട്ടീസുകൾ നറുക്കെടുക്കുന്ന ദിവസങ്ങളുടെ പുനക്രമീകരണം   -   ചോദ്യങ്ങളുടെ നറുക്കെടുപ്പ് സംബന്ധിച്ച പട്ടിക -   ചോദ്യങ്ങൾ വെബ്‌സൈറ്റിൽ ‍ പ്രസിദ്ധീകരിക്കുന്ന തീയതി",
      date: { day: "21", month: "FEB", year: "2025" },
      fileUrl: "/pdf1.pdf",
    },
    {
      id: 2,
      text: "2025 ഒക്ടോബർ മാസം 06-ാം തീയതി അവതരിപ്പിക്കുന്ന ഉപധനാഭ്യർത്ഥനകൾ സംബന്ധിച്ച ഉപക്ഷേപങ്ങൾ",
      date: { day: "21", month: "FEB", year: "2025" },
      fileUrl: "/dummy.pdf",
    },
    {
      id: 3,
      text: "കേന്ദ്ര തിരഞ്ഞെടുപ്പ് കമ്മീഷന്റെ തീവ്ര വോട്ടർ പട്ടിക പുനഃപരിശോധന സംബന്ധിച്ച് 2025 സെപ്റ്റംബർ 29 - ന് ചട്ടം 118 പ്രകാരം സഭ ഐകകണ്ഠ്യേന പാസ്സാക്കിയ പ്രമേയം",
      date: { day: "21", month: "FEB", year: "2025" },
      fileUrl: "/pdf1.pdf",
    },
    {
      id: 4,
      text: "കാര്യോപദേശക സമിതി - പതിനേഴ്‌ാമത് റിപ്പോർട്ട്",
      date: { day: "21", month: "FEB", year: "2025" },
      fileUrl: "/pdf1.pdf",
    },
    {
      id: 5,
      text: "പതിനഞ്ചാം കേരള നിയമസഭ - പതിനാലാം സമ്മേളനം  -  മന്ത്രിമാര്‍ ചോദ്യങ്ങള്‍ക്ക് മറുപടി നല്‍കുന്നതിന് നിശ്ചയിച്ചിട്ടുള്ള ദിവസങ്ങൾ പരസ്പരം മാറ്റി നൽകിയത് സംബന്ധിച്ചു",
      date: { day: "21", month: "FEB", year: "2025" },
      fileUrl: "/pdf1.pdf",
    },
    {
      id: 6,
      text: "പതിനഞ്ചാം കേരള നിയമസഭയിലേക്ക് '92-പീരുമേട് നിയോജകമണ്ഡലത്തിൽ നിന്നും തെരഞ്ഞെടുക്കപ്പെട്ട അംഗമായ വാഴൂർ സോമന്റെ നിര്യാണം മൂലം കേരള നിയമസഭയിലെ '92-പീരുമേട് സീറ്റ് 2025 ആഗസ്റ്റ് 21 -ാം തീയതി മുതൽ ഒഴിവ് വന്നത് സംബന്ധിച്ച്",
      date: { day: "21", month: "FEB", year: "2025" },
      fileUrl: "/pdf1.pdf",
    },
    {
      id: 7,
      text: "പതിനഞ്ചാം കേരള നിയമസഭ - പതിനാലാം സമ്മേളനം-   * പതിനഞ്ചാം കേരള നിയമസഭ - പതിനാലാം സമ്മേളനം-",
      date: { day: "21", month: "FEB", year: "2025" },
      fileUrl: "/pdf1.pdf",
    },
    {
      id: 8,
      text: "2025 - 2026 സാമ്പത്തിക വർഷത്തേക്കുള്ള ബജറ്റിലെ ധനാഭ്യർത്ഥനകളുടെ സ്റ്റേറ്റ്മെന്റ്",
      date: { day: "21", month: "FEB", year: "2025" },
      fileUrl: "/pdf1.pdf",
    },
    {
      id: 9,
      text: "Budget രേഖകളിലെ തിരുത്ത് : 17 .03 2025 ന് ബഹു.ധനകാര്യ വകുപ്പുമന്ത്രി മേശപ്പുറത്ത് വച്ചത്",
      date: { day: "21", month: "FEB", year: "2025" },
      fileUrl: "/pdf1.pdf",
    },
    {
      id: 10,
      text: "ബുള്ളറ്റിൻ നം. 619 - 2025 മാർച്ച് 19, 20 എന്നീ സമ്മേളന ദിവസങ്ങളിലെ കാര്യപരിപാടി പുനഃക്രമീകരണം",
      date: { day: "21", month: "FEB", year: "2025" },
      fileUrl: "/pdf1.pdf",
    },
    {
      id: 11,
      text: "ബുള്ളറ്റിൻ നം. 617 - 2025 ഫെബ്രുവരി 24 -ലെ ഭാഗം 2 ബുള്ളറ്റിൻ നമ്പർ 610 -ൽ വരുത്തിയ ഭേദഗതി",
      date: { day: "21", month: "FEB", year: "2025" },
      fileUrl: "/pdf1.pdf",
    },
    {
      id: 12,
      text: "Budget രേഖകളിലെ തിരുത്ത് : 17 .03 2025 ന് ബഹു.ധനകാര്യ വകുപ്പുമന്ത്രി മേശപ്പുറത്ത് വച്ചത്",
      date: { day: "21", month: "FEB", year: "2025" },
      fileUrl: "/pdf1.pdf",
    },
  ];
*/
  useEffect(() => {
    if (updates.length > 0) setActiveIndex(0);
  }, [updates.length]);

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
  useEffect(() => {
  let url = "";

  if (type === "recent") url = API_ENDPOINTS.RECENT_NEWS_LIST;
  if (type === "notification") url = API_ENDPOINTS.RECENT_NOTIFICATION_LIST;
  if (type === "announcement") url = API_ENDPOINTS.RECENT_ANNOUNCEMENT_LIST;
  if (type === "bulletin") url = API_ENDPOINTS.BULLETIN_LIST;

  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      let formatted = [];

      // Handle bulletin data differently
      if (type === "bulletin") {
        // Combine Part 1 and Part 2 bulletins
        const part1Bulletins = json?.page?.part1?.sessions?.[0]?.bulletins || [];
        const part2Bulletins = json?.page?.part2?.bulletins || [];

        const allBulletins = [];

        // Process Part 1 bulletins (with pdfs array structure)
        part1Bulletins.forEach(item => {
          if (item.pdfs && item.pdfs.length > 0 && item.pdfs[0].file_url) {
            const d = item.date ? new Date(item.date) : new Date();
            allBulletins.push({
              id: item.bulletin_no,
              text: item.pdfs[0].title || `Bulletin No. ${item.bulletin_no}`,
              fileUrl: item.pdfs[0].file_url,
              part: 1,
              date: {
                day: String(d.getDate()).padStart(2, "0"),
                month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
                year: d.getFullYear(),
              },
            });
          }
        });

        // Process Part 2 bulletins (direct structure)
        part2Bulletins.forEach(item => {
          if (item.pdf_url) {
            const d = item.date ? new Date(item.date) : new Date();
            allBulletins.push({
              id: item.bulletin_no,
              text: item.title,
              fileUrl: item.pdf_url,
              part: 2,
              date: {
                day: String(d.getDate()).padStart(2, "0"),
                month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
                year: d.getFullYear(),
              },
            });
          }
        });

        formatted = allBulletins;
      } else {
        // Handle other types (notification, announcement, news)
        formatted = json?.data?.map((item) => {
          const d = new Date(item.created_at || Date.now());

          return {
            id: item.id,
            text: item.title,
            fileUrl: item.url,
            date: {
              day: String(d.getDate()).padStart(2, "0"),
              month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
              year: d.getFullYear(),
            },
          };
        });
      }

      setUpdates(formatted || []);
    })
    .catch((err) => {
      console.error("Failed to fetch data:", err);
      setUpdates([]);
    });
}, [type]);
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
            { name: "Notifications", href: "/view-more" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="പുതിയ വാർത്തകൾ" />
            <div className="vmn-main-tab col-lg-12">
              <VIewMoreNotification 
                updates={updates} 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewMore;

const VIewMoreNotification = ({ updates, activeIndex, setActiveIndex }) => {
  const handleUpdateClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="vmn-ticker-section mb20">
      <div className="vmn-updates-list">
        {updates.map((update, idx) => (
          <div
            key={update.id}
            className={`vmn-update-list-item ${activeIndex === idx ? 'active' : ''}`}
            onClick={() => handleUpdateClick(idx)}
          >
            {/* Date Box */}
            <div className="vmn-date-box">
              <div className="vmn-month">{update.date.month}</div>
              <div className="vmn-day">{update.date.day}</div>
              <div className="vmn-year">{update.date.year}</div>
            </div>

            {/* Text Section */}
            <div className="vmn-update-content">
              {update.part && (
                <div style={{ 
                  fontWeight: "600", 
                  marginBottom: "8px", 
                  fontSize: "13px", 
                  backgroundColor: "var(--clr--violet)", 
                  width: "fit-content", 
                  borderRadius: "20px", 
                  padding: "2px 12px",
                  color: "#222222",
                  display: "inline-block"
                }}>
                  Part {update.part}
                </div>
              )}
              <p className="vmn-update-text">
                {update.text}
                 <a href={update.fileUrl} target="_blank" className="doci"
                                      rel="noopener noreferrer">
                                      {/* <FileText size={16} /> */}
                                      <img src="/images/document.svg" alt=""></img>
                                    </a>
                
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
