import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { buildPdfSrc } from "../../utils/pdfUtils";

/**
 * PdfViewer
 *
 * Uses Google Docs viewer for remote URLs (no PHP/proxy needed).
 * http:// URLs are automatically upgraded to https:// for compatibility.
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

    let cancelled = false;

    buildPdfSrc(fileUrl).then((resolvedSrc) => {
      if (!cancelled) {
        setSrc(resolvedSrc);
      }
    });

    return () => {
      cancelled = true;
    };
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
              Open / Download
            </Button>
            {headerActions || null}
          </div>
        </div>
      </Modal.Header>

      <Modal.Body style={{ height, overflow: "hidden", padding: 0, background: "#f8f9fa" }}>
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
