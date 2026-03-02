// common/InlinePdfViewer.jsx
import React from "react";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ensureHttps } from "../../utils/urlUtils";

const InlinePdfViewer = ({
  fileUrl,
  height = "75vh",
  defaultScale,
  fitToWidthOnLoad = true,
  className,
  workerUrl = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js",
}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  // Convert HTTP URLs to use PDF proxy
  const secureFileUrl = ensureHttps(fileUrl);

  // Prefer fitting to container width unless caller overrides
  const resolvedScale =
    defaultScale !== undefined
      ? defaultScale
      : fitToWidthOnLoad
      ? SpecialZoomLevel.PageWidth
      : typeof window !== "undefined" && window.innerWidth <= 576
      ? SpecialZoomLevel.PageFit
      : 1;

  // Download handler
  const handleDownload = () => {
    if (secureFileUrl) {
      const link = document.createElement("a");
      link.href = secureFileUrl;
      link.download = secureFileUrl.split("/").pop() || "document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={className || ""}>
      {/* Button Row */}
      {secureFileUrl && (
        <div className="d-flex justify-content-end mb-2">
          <button
            onClick={handleDownload}
            className="btn btn-sm btn-outline-primary"
          >
            Download
          </button>
        </div>
      )}

      {/* PDF Viewer */}
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
        {secureFileUrl ? (
          <Worker workerUrl={workerUrl}>
            <Viewer
              fileUrl={secureFileUrl}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={resolvedScale}
            />
          </Worker>
        ) : (
          <div className="d-flex justify-content-center align-items-center h-100">
            <p className="text-muted">Select a bulletin to view PDF</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InlinePdfViewer;






// import React from "react";
// import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// const InlinePdfViewer = ({
//   fileUrl,
//   height = "80vh",
//   defaultScale,
//   fitToWidthOnLoad = true,
//   className,
//   workerUrl = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js",
// }) => {
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   const resolvedScale =
//     defaultScale !== undefined
//       ? defaultScale
//       : fitToWidthOnLoad
//       ? SpecialZoomLevel.PageWidth
//       : typeof window !== "undefined" && window.innerWidth <= 576
//       ? SpecialZoomLevel.PageFit
//       : 1;

//   return (
//     <div className={`pdf-viewer-responsive ${className || ""}`} style={{ height, width: "100%", border: "1px solid #ddd", borderRadius: "6px", overflow: "hidden" }}>
//       {fileUrl ? (
//         <Worker workerUrl={workerUrl}>
//           <Viewer
//             fileUrl={fileUrl}
//             plugins={[defaultLayoutPluginInstance]}
//             defaultScale={resolvedScale}
//           />
//         </Worker>
//       ) : (
//         <div className="d-flex justify-content-center align-items-center h-100">
//           <p className="text-muted">Select a bulletin to view PDF</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InlinePdfViewer;
