// // components/PdfViewerModal.jsx
// import React from "react";
// import { Modal, Button } from "react-bootstrap";
// import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import ExportButton from "./common/ExportButton";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import { ensureHttps } from "../utils/urlUtils";

// const PdfViewerModal = ({ show, onClose, fileUrl, title }) => {
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   const handleExport = (format) => {
//     console.log(`Exporting PDF as ${format}`);
//     // Add your export logic here
//     // You can implement actual PDF export functionality
//   };

//   const secureFileUrl = ensureHttps(fileUrl);
  
//   // Use iframe for Google Docs viewer or as a fallback for local development
//   const useIframe = (secureFileUrl && secureFileUrl.includes('docs.google.com/viewer')) || 
//                    (typeof window !== 'undefined' && 
//                     (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && 
//                     (fileUrl?.includes('niyamasabha.nic.in') || fileUrl?.includes('niyamasabha.org')));

//   const googleViewerUrl = fileUrl ? `https://pdf-proxy.php?url=${encodeURIComponent(fileUrl)}&embedded=true` : '';

//   return (
//     <Modal
//       show={show}
//       onHide={onClose}
//       dialogClassName="modal-xl"
//       centered
//     >
//       <Modal.Header closeButton>
//         <div className="d-flex justify-content-between align-items-center w-100">
//           <Modal.Title className="modal-title">{title || "Document Viewer"}</Modal.Title>
//           <ExportButton 
//             className="mb-0"
//             buttonClassName="btn btn-secondary dropdown-toggle"
//             onExport={handleExport}
//           />
//         </div>
//       </Modal.Header>

//       <Modal.Body style={{ height: "80vh", padding: 0 }}>
//         {fileUrl && (
//           <div className="pdf-viewer-container" style={{ height: "100%", width: "100%" }}>
//             {useIframe ? (
//               <iframe
//                 src={googleViewerUrl}
//                 style={{ width: '100%', height: '100%', border: 'none' }}
//                 title="PDF Preview"
//               />
//             ) : (
//               <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//                 <Viewer
//                   fileUrl={secureFileUrl}
//                   plugins={[defaultLayoutPluginInstance]}
//                   defaultScale={
//                     typeof window !== "undefined" && window.innerWidth <= 576
//                       ? SpecialZoomLevel.PageFit // Fit for mobile
//                       : 1 // 100% for desktop
//                   }
//                 />
//               </Worker>
//             )}
//           </div>
//         )}
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default PdfViewerModal;



// components/PdfViewerModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import ExportButton from "./common/ExportButton";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ensureHttps } from "../utils/urlUtils";

const PdfViewerModal = ({ show, onClose, fileUrl, title }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleExport = (format) => {
    console.log(`Exporting PDF as ${format}`);
    // Add your export logic here
    // You can implement actual PDF export functionality
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      dialogClassName="modal-xl"
      centered
    >
      <Modal.Header closeButton>
        <div className="d-flex justify-content-between align-items-center w-100">
          <Modal.Title className="modal-title">{title || "Document Viewer"}</Modal.Title>
          <ExportButton 
            className="mb-0"
            buttonClassName="btn btn-secondary dropdown-toggle"
            onExport={handleExport}
          />
        </div>
      </Modal.Header>

      <Modal.Body style={{ height: "80vh" }}>
        {fileUrl && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={ensureHttps(fileUrl)}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={
                typeof window !== "undefined" && window.innerWidth <= 576
                  ? SpecialZoomLevel.PageFit // Fit for mobile
                  : 1 // 100% for desktop
              }
            />
          </Worker>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PdfViewerModal;
