import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = ({
	show,
	onClose,
	fileUrl,
	title = "Document Viewer",
	headerActions,
	height = "calc(100vh - 160px)",
	defaultScale,
	workerUrl = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js",
}) => {
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	const resolvedScale =
		defaultScale !== undefined
			? defaultScale
			: typeof window !== "undefined" && window.innerWidth <= 576
			? SpecialZoomLevel.PageFit
			: SpecialZoomLevel.PageWidth;

	// --- DOWNLOAD HANDLER ---
	const handleDownload = () => {
		if (fileUrl) {
			const link = document.createElement("a");
			link.href = fileUrl;
			link.download = fileUrl.split("/").pop() || "document.pdf";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	return (
		<Modal show={show} onHide={onClose} centered dialogClassName="modal-60vh">
			<Modal.Header closeButton>
				<div className="d-flex justify-content-between align-items-center w-100">
					<Modal.Title className="modal-title">{title}</Modal.Title>

					{/* Right-side actions */}
					<div className="d-flex align-items-center gap-2">
						<Button
							variant="outline-primary"
							size="sm"
							onClick={handleDownload}
						>
							Download
						</Button>
						{headerActions || null}
					</div>
				</div>
			</Modal.Header>

			<Modal.Body style={{ height, overflow: "auto" }}>
				{fileUrl && (
					<div
						className="pdf-viewer-responsive"
						style={{ height: "100%", width: "100%" }}
					>
						<Worker workerUrl={workerUrl}>
							<Viewer
								fileUrl={fileUrl}
								plugins={[defaultLayoutPluginInstance]}
								defaultScale={resolvedScale}
							/>
						</Worker>
					</div>
				)}
			</Modal.Body>
		</Modal>
	);
};

export default PdfViewer;




// import React from "react";
// import { Modal, Button } from "react-bootstrap";
// import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// const PdfViewer = ({
// 	show,
// 	onClose,
// 	fileUrl,
// 	title = "Document Viewer",
// 	headerActions,
// 	height = "calc(100vh - 160px)",
// 	defaultScale,
// 	workerUrl = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js",
// }) => {
// 	const defaultLayoutPluginInstance = defaultLayoutPlugin();

// 	const resolvedScale =
// 		defaultScale !== undefined
// 			? defaultScale
// 			: typeof window !== "undefined" && window.innerWidth <= 576
// 			? SpecialZoomLevel.PageFit
// 			: SpecialZoomLevel.PageWidth;

// 	return (
// 		<Modal show={show} onHide={onClose} centered dialogClassName="modal-60vh">
// 			<Modal.Header closeButton>
// 				<div className="d-flex justify-content-between align-items-center w-100">
// 					<Modal.Title className="modal-title">{title}</Modal.Title>
// 					{headerActions || null}
// 				</div>
// 			</Modal.Header>

// 			<Modal.Body style={{ height, overflow: "auto" }}>
// 				{fileUrl && (
					
// 					<div className="pdf-viewer-responsive" style={{ height: "100%", width: "100%" }}>
// 						<Worker workerUrl={workerUrl}>
// 							<Viewer
// 								fileUrl={fileUrl}
// 								plugins={[defaultLayoutPluginInstance]}
// 								defaultScale={resolvedScale}
// 							/>
// 						</Worker>
// 					</div>
// 				)}
// 			</Modal.Body>

// 		</Modal>
// 	);
// };

// export default PdfViewer;
