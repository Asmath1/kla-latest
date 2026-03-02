import { useState } from "react";
import { jsPDF } from "jspdf";

const DownloadSelector = () => {
  const [selectedFormat, setSelectedFormat] = useState("");

  const handleDownloadChange = (e) => {
    const value = e.target.value;
    setSelectedFormat(value);

    switch (value) {
      case "PDF":
        downloadPDF();
        break;
      case "XML":
        downloadXML();
        break;
      case "Doc":
        downloadDoc();
        break;
      default:
        break;
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("This is a sample PDF content.", 10, 10);
    doc.save("sample.pdf");
  };

  const downloadXML = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>User</to>
  <from>ReactApp</from>
  <heading>Reminder</heading>
  <body>This is a sample XML file.</body>
</note>`;
    const blob = new Blob([xml], { type: "application/xml" });
    triggerDownload(blob, "sample.xml");
  };

  const downloadDoc = () => {
    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset="utf-8"><title>Sample Doc</title></head>
        <body><h1>This is a sample Word document.</h1></body>
      </html>
    `;
    const blob = new Blob(["\ufeff", html], { type: "application/msword" });
    triggerDownload(blob, "sample.doc");
  };

  const triggerDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="col-6 col-sm-6 col-lg-3 px-0">
      <div className="page_control_shorting mb10 d-flex align-items-center justify-content-center justify-content-sm-end">
        <div className="pcs_dropdown dark-color pr10 pr0-xs">
          <label htmlFor="downloadSelect" className="me-2">
            Download
          </label>
          <select
            id="downloadSelect"
            className="form-select"
            value={selectedFormat}
            onChange={handleDownloadChange}
          >
            {/* <option value="">Select Format</option> */}
            <option value="PDF">PDF</option>
            <option value="XML">XML</option>
            <option value="Doc">Doc</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DownloadSelector;
