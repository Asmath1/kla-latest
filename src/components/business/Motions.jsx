import { useEffect, useState, useMemo } from "react";
import HomeTest from "../Header";
import { BreadcrumbNav, CategoriesNav, SectionTitle, ExportButton, Filter } from "../common";
import { motion, AnimatePresence } from "framer-motion";
import InlinePdfViewer from "../common/InlinePdfViwer";
import { fetchKlaList, fetchKlaSessions } from "../../services/MasterService";
import { DEMO_API_BASE_URL } from "../../utils/config";
import "./Motions.css";

// ---------------------------------------------------------------------------
// Known static tab labels — API items whose type key doesn't map to one of
// these will get their own dynamically generated tab.
// ---------------------------------------------------------------------------
const STATIC_TABS = [
  "Confidence / Non-confidence motions",
  "Resolution for removal of speaker Dy. speaker",
  "Motions under Rule 130",
  "Motions under Rule 275 Adopted by the House",
  "Discussion under Rule 58",
  "Discussion under Rule 205 B",
  "Discussion under Rule 300",
];

// ---------------------------------------------------------------------------
// Reusable empty-state row
// ---------------------------------------------------------------------------
const EmptyRow = ({ colSpan = 4 }) => (
  <tr>
    <td colSpan={colSpan} className="text-center text-muted py-4">
      No data found for the selected KLA / Session.
    </td>
  </tr>
);

// ---------------------------------------------------------------------------
// Generic table for API-driven motion items
// ---------------------------------------------------------------------------
const MotionTable = ({ items, onPdfClick }) => (
  <div className="table-responsive">
    <table className="table table-bordered myTable2">
      <thead>
        <tr>
          <th>Sl. No.</th>
          <th>Date</th>
          <th>Subject / Title</th>
          <th>Members</th>
          <th>Minister</th>
          <th>PDF</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <EmptyRow colSpan={6} />
        ) : (
          items.map((item, idx) => (
            <tr key={item.id ?? idx}>
              <td>{idx + 1}</td>
              <td style={{ whiteSpace: "nowrap" }}>{item.date}</td>
              <td>{item.title || item.subject || "—"}</td>
              <td style={{ fontSize: 12 }}>
                {Array.isArray(item.member)
                  ? item.member.join(", ")
                  : item.member || "—"}
              </td>
              <td style={{ fontSize: 12 }}>
                {Array.isArray(item.minister)
                  ? item.minister.join(", ")
                  : item.minister || "—"}
              </td>
              <td className="text-center">
                {item.pdf_url ? (
                  <a
                    href="#"
                    className="d-flex align-items-center justify-content-center"
                    onClick={(e) => {
                      e.preventDefault();
                      onPdfClick(item.pdf_url, item.title || item.subject);
                    }}
                  >
                    <div className="imgx">
                      <img src="images/file2.svg" width={16} alt="PDF" />
                    </div>
                  </a>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
const Motions = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [pdfModalTitle, setPdfModalTitle] = useState("");

  // Filter state
  const [klaId, setKlaId] = useState(15);
  const [sessionNo, setSessionNo] = useState(null);
  const [klaOptions, setKlaOptions] = useState([]);
  const [sessionOptions, setSessionOptions] = useState([]);

  // API data
  const [apiData, setApiData] = useState({});   // { type_9: { id, tab, title, items[] }, ... }
  const [loading, setLoading] = useState(true);

  // Active tab — starts on first static tab, may switch to API tab
  const [activeTab, setActiveTab] = useState(STATIC_TABS[0]);

  // ---- Scroll ----
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---- Load KLA list ----
  useEffect(() => {
    fetchKlaList()
      .then((list) => {
        const opts = (list || []).map((k) => ({
          value: k.id,
          label: k.languages?.[0]?.name || `KLA ${k.id}`,
        }));
        setKlaOptions(opts);
      })
      .catch(() => {});
  }, []);

  // ---- Load sessions when KLA changes ----
  useEffect(() => {
    if (klaId == null) return;
    fetchKlaSessions(klaId)
      .then((sessions) => {
        const opts = (sessions || []).map((s) => {
          const value = s.session_id ?? s.session_no ?? s.id;
          const label = String(s.session_id ?? s.session_no ?? s.name ?? s.id);
          return { value, label };
        });
        setSessionOptions(opts);
      })
      .catch(() => {});
  }, [klaId]);

  // ---- Fetch motions from API ----
  useEffect(() => {
    let cancelled = false;
    const fetchMotions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${DEMO_API_BASE_URL}/api/klamotionFull/kla/${klaId}`);
        const json = await res.json();
        if (!cancelled && json?.success && json?.data) {
          setApiData(json.data);
        } else if (!cancelled) {
          setApiData({});
        }
      } catch (err) {
        console.error("Failed to fetch motions:", err);
        if (!cancelled) setApiData({});
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchMotions();
    return () => { cancelled = true; };
  }, [klaId, sessionNo]);

  // ---- Filter handler ----
  const handleFiltersChange = (values) => {
    if (values?.KLA != null) {
      const raw = values.KLA;
      const n = typeof raw === "object" ? Number(raw.value ?? raw) : Number(raw);
      if (!Number.isNaN(n)) setKlaId(n);
    }
    if (values?.SESSION_TYPE != null) {
      const raw = values.SESSION_TYPE;
      const v = typeof raw === "object" ? raw.value : raw;
      setSessionNo(v === "" ? null : Number(v));
    }
  };

  const openPdf = (url, title) => {
    setSelectedPdfUrl(url);
    setPdfModalTitle(title || "PDF Preview");
  };

  // ---- Build dynamic tabs from API data ----
  // Each key in apiData is a type group (e.g. "type_9").
  // We show them as extra tabs if their title doesn't match a static tab.
  const dynamicTabs = useMemo(() => {
    return Object.entries(apiData).map(([key, group]) => {
      const items = (group.items || []).filter((item) => {
        if (sessionNo != null && item.session_id != null && Number(item.session_id) !== sessionNo)
          return false;
        return true;
      });
      return {
        key,
        label: group.type_name || group.title || group.tab || key,
        items,
      };
    });
  }, [apiData, sessionNo]);

  // All tabs = static + any dynamic tabs whose label isn't already in STATIC_TABS
  const extraTabs = dynamicTabs.filter(
    (dt) => !STATIC_TABS.some(
      (st) => st.toLowerCase() === dt.label.toLowerCase()
    )
  );

  // Items for a given static tab — look up in apiData by matching title/tab field
  const getApiItemsForStaticTab = (tabLabel) => {
    const match = Object.values(apiData).find(
      (g) =>
        (g.type_name || g.title || g.tab || "").toLowerCase() === tabLabel.toLowerCase()
    );
    return match?.items || null; // null = no API group found (use static fallback)
  };

  // ---- Render helpers for static tabs ----
  const renderConfidenceMotions = () => {
    const apiItems = getApiItemsForStaticTab("Confidence / Non-confidence motions");
    return (
      <section className="container motion-confidence-section">
        <h3 className="motion-confidence-section-title mb-4">
          Confidence / No Confidence Motions
        </h3>
        {apiItems !== null ? (
          apiItems.length === 0 ? (
            <p className="text-muted">No data found for the selected KLA / Session.</p>
          ) : (
            <MotionTable items={apiItems} onPdfClick={openPdf} />
          )
        ) : (
          // Static fallback content
          <div className="motion-confidence-content d-flex align-items-start">
            <div className="motion-confidence-image ms-4">
              <img src="/images/non-confidence motion.jpg" alt="Kerala Legislative Assembly" />
            </div>
            <div className="motion-confidence-text-content flex-grow-1">
              <h4 className="motion-confidence-year">2020</h4>
              <p className="motion-confidence-text">
                On <strong>August 24, 2020</strong>, the House granted leave to{" "}
                <strong>Shri V. D. Satheesan MLA</strong> to move the following motion:
              </p>
              <p className="motion-confidence-text">
                The motion was discussed on <strong>24th August, 2020</strong> and was put
                to vote and it was declared as lost. When the motion was put to vote,{" "}
                <strong>40 Members</strong> voted for it and{" "}
                <strong>87 Members</strong> voted against it. The motion was{" "}
                <strong>declared lost.</strong>
              </p>
            </div>
          </div>
        )}
      </section>
    );
  };

  const renderStaticTableTab = (tabLabel, title, columns, renderRow, emptyNote) => {
    const apiItems = getApiItemsForStaticTab(tabLabel);
    if (apiItems !== null) {
      return (
        <section className="container motion-confidence-section">
          <h3 className="motion-confidence-section-title mb-4">{title}</h3>
          <MotionTable items={apiItems} onPdfClick={openPdf} />
          {emptyNote && <p className="mt-3"><em>{emptyNote}</em></p>}
        </section>
      );
    }
    // Static fallback
    return (
      <section className="container motion-confidence-section">
        <h3 className="motion-confidence-section-title mb-4">{title}</h3>
        <div className="table-responsive">
          <table className="table table-bordered myTable2 motion-confidence-table">
            <thead>
              <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>{renderRow()}</tbody>
          </table>
        </div>
        {emptyNote && <p className="mt-3"><em>{emptyNote}</em></p>}
      </section>
    );
  };

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    // Static tabs
    if (activeTab === "Confidence / Non-confidence motions") return renderConfidenceMotions();

    if (activeTab === "Resolution for removal of speaker Dy. speaker") {
      const apiItems = getApiItemsForStaticTab(activeTab);
      return (
        <section className="container motion-confidence-section">
          <h3 className="motion-confidence-section-title mb-4">
            Resolution for Removal of Speaker / Deputy Speaker
          </h3>
          {apiItems !== null ? (
            <MotionTable items={apiItems} onPdfClick={openPdf} />
          ) : (
            <p className="text-muted">No data available.</p>
          )}
        </section>
      );
    }

    if (activeTab === "Motions under Rule 130") {
      return renderStaticTableTab(
        activeTab,
        "Motions Under Rule 130",
        ["Serial No.", "Date of Discussion", "Name of Mover", "Subject Matter"],
        () => <EmptyRow colSpan={4} />,
        "* 1. Rule No. 137 (till 4-8-1960)"
      );
    }

    if (activeTab === "Motions under Rule 275 Adopted by the House") {
      return renderStaticTableTab(
        activeTab,
        "Motions Adopted by the House on the Basis of Discussion Under Rule 130",
        ["Sl. No.", "Date", "Name of the Minister", "Statement in PDF Format"],
        () => <EmptyRow colSpan={4} />
      );
    }

    if (activeTab === "Discussion under Rule 58") {
      return renderStaticTableTab(
        activeTab,
        "Discussion Under Rule 58",
        ["Sl. No.", "Date", "Member Who Raised the Discussion", "Subject Matter"],
        () => <EmptyRow colSpan={4} />,
        "* Former Rule No. 57"
      );
    }

    if (activeTab === "Discussion under Rule 205 B") {
      return renderStaticTableTab(
        activeTab,
        "Discussion under Rule 205 B",
        ["Sl. No.", "Date", "Member Who Raised the Discussion", "Committee Report"],
        () => <EmptyRow colSpan={4} />
      );
    }

    if (activeTab === "Discussion under Rule 300") {
      return renderStaticTableTab(
        activeTab,
        "Statement as per Rule 300",
        ["Sl. No.", "Date", "Name of the Minister", "Statement in PDF Format"],
        () => <EmptyRow colSpan={4} />
      );
    }

    // Dynamic API tab
    const dynTab = extraTabs.find((t) => t.key === activeTab || t.label === activeTab);
    if (dynTab) {
      return (
        <section className="container motion-confidence-section">
          <h3 className="motion-confidence-section-title mb-4">{dynTab.label}</h3>
          <MotionTable items={dynTab.items} onPdfClick={openPdf} />
        </section>
      );
    }

    return null;
  };

  const allTabLabels = [
    ...STATIC_TABS,
    ...extraTabs.map((t) => t.label),
  ];

  return (
    <div className="wrapper ovh">
      {/* HEADER */}
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
            { name: "Business", href: "/session-schedule" },
            { name: "Motions", href: "/motions" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Motion" />

            <div className="row memberPro wow fadeInUp mt10" data-wow-delay="300ms">
              {/* ---- LEFT: Tab list ---- */}
              <div className="col-12 col-lg-3">
                <div className="vertical-tab">
                  <div className="widget_list">
                    <nav>
                      <div className="nav flex-row nav-tabs text-start" id="nav-tab" role="tablist">
                        {allTabLabels.map((tab) => (
                          <motion.button
                            key={tab}
                            className={`nav-link text-start ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                          >
                            <span>{tab}</span>
                          </motion.button>
                        ))}
                      </div>
                    </nav>
                  </div>
                </div>
              </div>

              {/* ---- RIGHT: Filter + content ---- */}
              <div className="col-md-12 col-lg-9 nh">
                <div className="terms_condition_grid text-start">

                  {/* Shared KLA + Session filter */}
                  <div className="mb-3">
                    <Filter
                      filterKeys={["KLA", "SESSION_TYPE"]}
                      onFiltersChange={handleFiltersChange}
                      overrides={{
                        KLA: {
                          options: klaOptions.length ? klaOptions : undefined,
                          defaultValue: klaId,
                        },
                        SESSION_TYPE: {
                          defaultValue: "",
                          options: [
                            { value: "", label: "All" },
                            ...sessionOptions,
                          ],
                        },
                      }}
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab + klaId + sessionNo}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.25 }}
                      className="tab-content"
                    >
                      {renderTabContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Modal */}
        {selectedPdfUrl && (
          <>
            <div className="modal fade show" style={{ display: "block" }}>
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{pdfModalTitle}</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedPdfUrl(null)}
                    />
                  </div>
                  <div className="modal-body">
                    <InlinePdfViewer fileUrl={selectedPdfUrl} height="85vh" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fade show"
              onClick={() => setSelectedPdfUrl(null)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Motions;
