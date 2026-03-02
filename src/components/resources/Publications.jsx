import React, { useState, useEffect } from "react";
import HomeTest from "../Header";
import {
  CategoriesNav,
  BreadcrumbNav,
  SectionTitle,
  Tabs,
} from "../common";
import { fetchPeriodicals } from "../../services/MasterService";

/* ---------------- BOOKS DATA ---------------- */
const booksData = [
  { id: 1, title: "ഹർജികൾ സംബന്ധിച്ച സമിതി - വജ്രശോഭയിൽ", price: "500/-" },
  { id: 2, title: "Festival on Democracy Volume I & II", price: "600/-" },
  { id: 3, title: "Legislators of Kerala (I to XIVth KLA)", price: "350/-" },
  { id: 4, title: "കേരള നിയമസഭ നടപടിക്രമവും കീഴ്വഴക്കങ്ങളും (രണ്ടാം പതിപ്പ്)", price: "500/-" },
  { id: 5, title: "ഉമ്മൻചാണ്ടി - നിയമസഭയിലെ 50 വർഷങ്ങൾ", price: "500/-" },
  { id: 6, title: "കേരളത്തിലെ നിയമസഭ സാമാജികർ (ഒന്നു മുതൽ പതിനാല് വരെയുള്ള നിയമസഭകൾ)", price: "500/-" },
  { id: 7, title: "കേരള നിയമസഭ ചരിത്രവും പാർലമെൻ്ററി ജനാധിപത്യവും - തെരഞ്ഞെടുത്ത ചോദ്യോത്തരങ്ങൾ", price: "20/-" },
  { id: 8, title: "സഫലം സർഗാത്മകം", price: "1200/-" },
  { id: 9, title: "എസ്റ്റിമേറ്റ്സ് കമ്മിറ്റി @ 64", price: "400/-" },
  { id: 10, title: "കേരളം പാസ്സാക്കിയ നിയമങ്ങൾ പ്രഭാവ പഠനങ്ങൾ", price: "400/-" },
  { id: 11, title: "കേരള നിയമസഭ വജ്രജൂബിലി സ്മരണിക", price: "500/-" },
  { id: 12, title: "കേരളത്തിലെ സ്പീക്കര്‍മാരും ഡെപ്യൂട്ടി സ്പീക്കര്‍മാരും", price: "200/-" },
  { id: 13, title: "Speakers and Deputy Speakers of Kerala-2017- English", price: "200/-" },
  { id: 14, title: "Chief Ministers, Ministers and Leaders of Opposition of Kerala - 2017", price: "350/-" },
  { id: 15, title: "നമ്മുടെ നിയമസഭ", price: "25/-" },
  { id: 16, title: "Our Legislative Assembly", price: "25/-" },
  { id: 17, title: "ആര്, ആരാണ്2018", price: "200/-" },
  { id: 18, title: "കേരള നിയമസഭ – നിയമനിര്‍മ്മാണത്തിന്റെ 6 പതിറ്റാണ്ടുകള്‍ 2017", price: "950/-" },
  { id: 19, title: "കേരളനിയമസഭ – നടപടിക്രമവും കീഴ്‌വഴക്കവും(ഒന്നാം പതിപ്പ് )", price: "500/-" },
  { id: 20, title: "സഭാധ്യക്ഷന്റെ തീരുമാനങ്ങളും റൂളിംഗുകളും", price: "350/-" },
  { id: 21, title: "നിയമനിര്‍മ്മാണസഭ ‌- ശതോത്തര രജതജൂബിലി സ്മരണിക വാല്യം- 1, വാല്യം- 2", price: "800/-" },
  { id: 22, title: "ബഡ്ജറ്റ് കൈപ്പുസ്തകം2013", price: "20/-" },
  { id: 23, title: "36 Glorious Years of Subject Committees", price: "400/-" },
  { id: 24, title: "Budget Speeches Vol - III", price: "100/-" },
  { id: 25, title: "Budget Speeches Vol - IV", price: "100/-" },
  { id: 26, title: "Budget Speeches Vol - V", price: "100/-" },
  { id: 27, title: "Budget Speeches Vol - VI", price: "250/-" },
];

const Publications = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [periodicals, setPeriodicals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------------- HEADER SCROLL EFFECT ---------------- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- FETCH PERIODICALS ---------------- */
  useEffect(() => {
    const loadPeriodicals = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPeriodicals();
        setPeriodicals(data);
      } catch (err) {
        console.error("Error fetching periodicals:", err);
        setError("Failed to load periodicals data");
      } finally {
        setLoading(false);
      }
    };
    loadPeriodicals();
  }, []);

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
            { name: "Resources", href: "/resources" },
            { name: "Publications", href: "/resources/publications" },
          ]}
        />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Publications" />

            <Tabs
              tabs={[
                {
                  key: "Books",
                  label: "Books",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      <table className="table myTable2">
                        <thead>
                          <tr>
                            <th>Sl.No</th>
                            <th>Title</th>
                            <th>Retail Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {booksData.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.title}</td>
                              <td>{item.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ),
                },
                {
                  key: "Periodicals",
                  label: "Periodicals",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      {loading ? (
                        <div className="text-center py-5">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : error ? (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      ) : periodicals.length === 0 ? (
                        <div className="alert alert-info" role="alert">
                          No periodicals data available.
                        </div>
                      ) : (
                        <table className="table myTable2">
                          <thead>
                            <tr>
                              <th>Sl.No</th>
                              <th>Publication</th>
                              <th>Year</th>
                              <th>Issue Title</th>
                              <th>PDF</th>
                            </tr>
                          </thead>
                          <tbody>
                            {periodicals.map((item, index) => (
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.publication || "-"}</td>
                                <td>{item.year || "-"}</td>
                                <td>{item.issue_title || "-"}</td>
                                <td>
                                  {item.pdf_url ? (
                                    <a
                                      href={item.pdf_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="btn btn-sm btn-outline-primary"
                                    >
                                      View PDF
                                    </a>
                                  ) : (
                                    "-"
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  ),
                },
              ]}
              onChange={() => {}}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Publications;
