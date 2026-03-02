import React from "react";
import { Modal } from "react-bootstrap";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewerModal = ({
  show,
  onHide,
  fileUrl,
  title = "Document Viewer",
  workerUrl = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js",
}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="modal-xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "80vh" }}>
        <div className="pdf-viewer-container">
          <Worker workerUrl={workerUrl}>
            {fileUrl && (
              <Viewer
                fileUrl={fileUrl}
                plugins={[defaultLayoutPluginInstance]}
                defaultScale={
                  typeof window !== "undefined" && window.innerWidth <= 576
                    ? SpecialZoomLevel.PageFit
                    : 1
                }
              />
            )}
          </Worker>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PdfViewerModal;
