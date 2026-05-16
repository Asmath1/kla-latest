import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { buildPdfSrc } from "../../utils/pdfUtils";

/**
 * PdfViewer
 *
 * Rendering strategy (in order of preference):
 *  1. Local paths → served directly, no proxy needed.
 *  2. Remote URLs → PHP proxy if available; otherwise Google Docs viewer.
 *
 * See PdfViewerModal.jsx for the dev/production setup notes.
 */
const PdfViewer = ({
  show,
  onClose,
  fileUrl,
  title = "Document Viewer",
  headerActions,
  height = "calc(100vh - 160px)",
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
    <Modal show={show} onHide={onClose} centered dialogClassName="modal-60vh">
      <Modal.Header closeButton>
        <div className="d-flex justify-content-between align-items-center w-100">
          <Modal.Title className="modal-title">{title}</Modal.Title>
          <div className="d-flex align-items-center gap-2">
            <Button variant="outline-primary" size="sm" onClick={handleOpenNewTab}>
              Download
            </Button>
            {headerActions || null}
          </div>
        </div>
      </Modal.Header>

      <Modal.Body style={{ height, overflow: "hidden", padding: 0 }}>
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

export default PdfViewer;
