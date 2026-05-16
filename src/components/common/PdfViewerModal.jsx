import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { buildPdfSrc } from "../../utils/pdfUtils";

/**
 * PdfViewerModal
 *
 * Rendering strategy (in order of preference):
 *  1. Local paths → served directly, no proxy needed.
 *  2. Remote URLs → PHP proxy if available; otherwise Google Docs viewer.
 *
 * In development:  Vite proxies /pdf-proxy.php → http://localhost:8001
 *                  Run `npm run dev:php` in a second terminal to start the PHP server.
 * In production:   Apache/Nginx executes pdf-proxy.php natively — no extra config needed.
 */
const PdfViewerModal = ({
  show,
  onHide,
  fileUrl,
  title = "Document Viewer",
}) => {
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

  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-xl" centered>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">{title}</Modal.Title>
        {fileUrl && (
          <button
            type="button"
            className="btn btn-sm btn-outline-primary ms-3"
            onClick={handleOpenNewTab}
          >
            Download
          </button>
        )}
      </Modal.Header>

      <Modal.Body style={{ height: "80vh", padding: 0 }}>
        {src ? (
          <iframe
            key={src}
            src={src}
            title={title}
            width="100%"
            height="100%"
            style={{ border: "none", display: "block" }}
          />
        ) : (
          <div className="d-flex justify-content-center align-items-center h-100">
            <p className="text-muted">No document selected.</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PdfViewerModal;
