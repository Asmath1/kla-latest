import { useEffect, useMemo, useState, useCallback } from "react";
import {
  BreadcrumbNav,
  CategoriesNav,
  ExportButton,
  Filter,
  Pagination,
  PdfViewerModal,
  SectionTitle,
  Tabs,
} from "../common";
import HomeTest from "../Header";
import InlinePdfViewer from "../common/InlinePdfViwer";
import { fetchPvtMemberResolutions } from "../../api/services/all.service";
import { fetchKlaSessions } from "../../services/MasterService";
import "./Resolutions.css";

export const PrivateMemberResolutions = () => {
  const [allResolutions, setAllResolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Filter state ────────────────────────────────────────────────────────────
  const [klaId, setKlaId] = useState(15);
  const [sessionNo, setSessionNo] = useState(null);
  const [sessionOptions, setSessionOptions] = useState([{ value: "", label: "All" }]);
  const [searchText, setSearchText] = useState("");
  const [moverFilter, setMoverFilter] = useState("");
  const [ministerFilter, setMinisterFilter] = useState("");

  // ── Pagination ──────────────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // ── PDF modal ───────────────────────────────────────────────────────────────
  const [pdfModal, setPdfModal] = useState({ show: false, url: null, title: "" });

  // ── Fetch resolutions when KLA changes ─────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
    setSessionNo(null);
    fetchPvtMemberResolutions({ kla_id: klaId })
      .then((data) => setAllResolutions(Array.isArray(data) ? data : []))
      .catch(() => setAllResolutions([]))
      .finally(() => setLoading(false));
  }, [klaId]);

  // ── Fetch sessions for the selected KLA (for session filter options) ────────
  useEffect(() => {
    fetchKlaSessions(klaId)
      .then((sessions) => {
        const filtered = (sessions || []).filter(
          (s) => Number(s.kla_id) === Number(klaId)
        );
        filtered.sort((a, b) => Number(a.session_no) - Number(b.session_no));
        setSessionOptions([
          { value: "", label: "All" },
          ...filtered.map((s) => ({
            value: s.session_no,
            label: `Session ${s.session_no}`,
          })),
        ]);
      })
      .catch(() => setSessionOptions([{ value: "", label: "All" }]));
  }, [klaId]);

  // ── Filter handler from <Filter> component ──────────────────────────────────
  const handleFiltersChange = useCallback((values) => {
    if (values?.KLA != null) {
      const n = Number(
        typeof values.KLA === "object" ? values.KLA.value ?? values.KLA : values.KLA
      );
      if (!Number.isNaN(n)) setKlaId(n);
    }
    if (values?.SESSION_TYPE != null) {
      const v =
        typeof values.SESSION_TYPE === "object"
          ? values.SESSION_TYPE.value
          : values.SESSION_TYPE;
      setSessionNo(v === "" || v == null ? null : Number(v));
    }
    if (values?.SEARCH != null) setSearchText(values.SEARCH);
    if (values?.MEMBER != null) {
      setMoverFilter(
        typeof values.MEMBER === "object" ? values.MEMBER.value ?? "" : values.MEMBER
      );
    }
    if (values?.MINISTER != null) {
      setMinisterFilter(
        typeof values.MINISTER === "object"
          ? values.MINISTER.value ?? ""
          : values.MINISTER
      );
    }
  }, []);

  // ── Format date DD.MM.YYYY ──────────────────────────────────────────────────
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const [y, m, d] = dateString.split("-");
    return `${d}.${m}.${y}`;
  };

  // ── Client-side filtering ───────────────────────────────────────────────────
  const filteredRows = useMemo(() => {
    return allResolutions.filter((item) => {
      if (sessionNo != null && Number(item.session_id) !== Number(sessionNo))
        return false;
      if (moverFilter) {
        const name = (item.mover_member_name || "").toLowerCase();
        if (!name.includes(moverFilter.toLowerCase())) return false;
      }
      if (ministerFilter) {
        const name = (item.minister_member_name || "").toLowerCase();
        if (!name.includes(ministerFilter.toLowerCase())) return false;
      }
      if (searchText) {
        const q = searchText.toLowerCase();
        const subject = (item.subject || "").toLowerCase();
        const title = (item.title || "").toLowerCase();
        if (!subject.includes(q) && !title.includes(q)) return false;
      }
      return true;
    });
  }, [allResolutions, sessionNo, moverFilter, ministerFilter, searchText]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [klaId, sessionNo, moverFilter, ministerFilter, searchText]);

  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
  const pagedRows = filteredRows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const filterOverrides = useMemo(
    () => ({
      KLA: { defaultValue: klaId },
      SESSION_TYPE: {
        defaultValue: sessionNo ?? "",
        options: sessionOptions,
      },
    }),
    [klaId, sessionNo, sessionOptions]
  );

  return (
    <section className="resolution-section">
      {/* ── FILTERS ── */}
      <div className="tab-title mb-2">
        <h6>Search By Filter</h6>
      </div>

      <Filter
        filterKeys={["KLA", "SESSION_TYPE", "SEARCH"]}
        onFiltersChange={handleFiltersChange}
        overrides={filterOverrides}
      />

      <div className="d-flex align-items-center justify-content-between mt-3 mb-3 flex-wrap gap-2">
        <ExportButton
          data={filteredRows.map((item, i) => ({
            "Sl.No": i + 1,
            Date: formatDate(item.scheduled_date || item.sitting_date),
            "Name of Mover": item.mover_member_name || item.minister_member_name || "-",
            "Minister": item.minister_member_name || "-",
            Subject: item.subject || item.title || "-",
          }))}
          filename="private-resolutions"
          title="Private Member Resolutions"
          exportOptions={["PDF", "Excel", "CSV"]}
        />
        {!loading && (
          <span className="text-muted" style={{ fontSize: 13 }}>
            Total record/s found:{" "}
            <strong style={{ color: "var(--clr--primary)" }}>
              {filteredRows.length}
            </strong>
          </span>
        )}
      </div>

      {/* ── TABLE ── */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="resolutionz c-ptag">
            <div className="tabley">
              <div className="table-responsive">
                <table className="table table myTable2">
                  <thead>
                    <tr>
                      <th scope="col">Sl. No.</th>
                      <th scope="col">Date</th>
                      <th scope="col">Name of Mover</th>
                      <th scope="col">Minister</th>
                      <th scope="col">Subject Matter</th>
                      <th scope="col" className="text-center">PDF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedRows.length > 0 ? (
                      pagedRows.map((item, index) => (
                        <tr key={item.id}>
                          <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {formatDate(item.scheduled_date || item.sitting_date)}
                          </td>
                          <td>{item.mover_member_name || "-"}</td>
                          <td>{item.minister_member_name || "-"}</td>
                          <td>
                            {item.subject && (
                              <p className="mb-1" style={{ fontSize: "14px" }}>
                                {item.subject}
                              </p>
                            )}
                            {item.title && item.title !== item.subject && (
                              <strong
                                className="d-block"
                                style={{ fontSize: "13px", color: "#555" }}
                              >
                                {item.title}
                              </strong>
                            )}
                            {!item.subject && !item.title && "-"}
                          </td>
                          <td className="text-center">
                            <button
                              title={item.pdf_url ? "View PDF" : "PDF not available"}
                              disabled={!item.pdf_url}
                              onClick={() =>
                                item.pdf_url &&
                                setPdfModal({
                                  show: true,
                                  url: item.pdf_url,
                                  title: item.subject || item.title || "Document",
                                })
                              }
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                border: "2px solid var(--clr--primary)",
                                background: item.pdf_url
                                  ? "var(--clr--primary)"
                                  : "#e0e0e0",
                                color: item.pdf_url ? "#fff" : "#aaa",
                                fontWeight: 700,
                                fontSize: 11,
                                cursor: item.pdf_url ? "pointer" : "not-allowed",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 0,
                              }}
                            >
                              PDF
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          No resolutions found for the selected filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── PAGINATION ── */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => {
                setCurrentPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              totalItems={filteredRows.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          )}
        </>
      )}

      {/* ── PDF MODAL ── */}
      <PdfViewerModal
        show={pdfModal.show}
        onHide={() => setPdfModal({ show: false, url: null, title: "" })}
        fileUrl={pdfModal.url}
        title={pdfModal.title}
      />
    </section>
  );
};

// ✅ Full page wrapper with tabs
const Resolutions = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [pdfModalTitle, setPdfModalTitle] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="wrapper">
      {/* Header */}
      <header
        className={`header-nav nav-homepage-style2 stricky main-menu ${
          isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
        }`}
      >
        <HomeTest />
      </header>

      <div className="body_content">
        {/* Navigation */}
        <CategoriesNav />
        <BreadcrumbNav
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Business", href: "/session-schedule" },
            { name: "Resolutions", href: "/resolution" },
          ]}
        />

        {/* Main Content */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Resolutions" />

            <Tabs
              tabs={[
                {
                  key: "Statutory Resolutions",
                  label: "Statutory Resolutions",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt"></div>
                  ),
                },
                {
                  key: "Government Resolutions",
                  label: "Government Resolutions",
                  content: (
                    <div className="bill-content col-md-12 mt20 committeeDt">
                      <div className="mt30 library-member-forms">
                        <a
                          href="#"
                          className="rul d-flex align-items-center mb20"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedPdfUrl("/images/state-name-kerala.pdf");
                            setPdfModalTitle("സംസ്ഥാനത്തിന്റെ നാമധേയം കേരളം എന്നാക്കുന്നത് സംബന്ധിച്ച പ്രമേയം");
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="imgx">
                            <img src="/images/file2.svg" width={16} alt="" />
                          </div>
                          <span>
                            {" "}
                            സംസ്ഥാനത്തിന്റെ നാമധേയം കേരളം എന്നാക്കുന്നത്
                            സംബന്ധിച്ച് 2024 ജൂൺ 24-ന് നിയമസഭ ഐകകണ്ഠ്യേന
                            പാസ്സാക്കിയ പ്രമേയം
                          </span>
                        </a>
                      </div>
                      <div className="mt20 library-member-forms">
                        <a
                          href="#"
                          className="rul d-flex align-items-center mb20"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedPdfUrl("/images/state-name-kerala.pdf");
                            setPdfModalTitle("സംസ്ഥാനത്തിന്റെ നാമധേയം കേരളം എന്നാക്കുന്നത് സംബന്ധിച്ച പ്രമേയം");
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="imgx">
                            <img
                              src="images/file2.svg"
                              width={16}
                              alt="PDF Icon"
                            />
                          </div>
                          <span>
                            സംസ്ഥാനത്തിന്റെ നാമധേയം കേരളം എന്നാക്കുന്നത്
                            സംബന്ധിച്ച് 2024 ജൂൺ 24-ന് നിയമസഭ ഐകകണ്ഠ്യേന
                            പാസ്സാക്കിയ പ്രമേയം
                          </span>
                        </a>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Private Resolutions",
                  label: "Private Resolutions",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      <PrivateMemberResolutions />
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </section>

        {/* PDF Modal */}
        {selectedPdfUrl && (
          <>
            <div className="modal fade show" style={{ display: "block" }}>
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {pdfModalTitle || "PDF Preview"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedPdfUrl(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <InlinePdfViewer
                      fileUrl={selectedPdfUrl}
                      height="85vh"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fade show"
              onClick={() => setSelectedPdfUrl(null)}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Resolutions;
