import { useState, useEffect } from "react";
import { buildPdfSrc } from "../../utils/pdfUtils";

/**
 * InlinePdfViewer
 *
 * Rendering strategy (in order of preference):
 *  1. Local paths (start with "/") → served directly by Vite/Apache, no proxy needed.
 *  2. Remote URLs → PHP proxy if available; otherwise Google Docs viewer.
 *
 * The proxy check is cached for the page lifetime, so only one network request
 * is made regardless of how many viewers are on the page.
 */
const InlinePdfViewer = ({ fileUrl, height = "75vh", className }) => {
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (!fileUrl) {
      setSrc("");
      return;
    }
    buildPdfSrc(fileUrl).then(setSrc);
  }, [fileUrl]);

  const handleOpenNewTab = () => {
    if (fileUrl) window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  if (!fileUrl) {
    return (
      <div
        className={`d-flex justify-content-center align-items-center ${className || ""}`}
        style={{ height, border: "1px solid #ddd", borderRadius: "6px" }}
      >
        <p className="text-muted">Select a document to view PDF</p>
      </div>
    );
  }

  return (
    <div className={className || ""}>
      <div className="d-flex justify-content-end mb-2">
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={handleOpenNewTab}
        >
          Download
        </button>
      </div>

      <div
        className="pdf-viewer-responsive mb40"
        style={{
          height,
          width: "100%",
          border: "1px solid #ddd",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        {src && (
          <iframe
            key={src}
            src={src}
            title="PDF Viewer"
            width="100%"
            height="100%"
            style={{ border: "none", display: "block" }}
          />
        )}
      </div>
    </div>
  );
};

export default InlinePdfViewer;
