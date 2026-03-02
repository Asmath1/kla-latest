import React from 'react';
import { openPdfInNewTab, downloadPdf, printPdf } from '../../utils/pdfUtils';

/**
 * Reusable PDF Action Buttons Component
 * Provides common PDF actions: View, Download, Print
 */
const PdfActionButtons = ({ 
  pdfUrl, 
  fileName = 'document.pdf',
  showView = true,
  showDownload = true,
  showPrint = false,
  className = '',
  buttonStyle = 'default' // 'default', 'icon', 'text'
}) => {
  if (!pdfUrl) {
    return null;
  }

  const handleView = (e) => {
    e.preventDefault();
    openPdfInNewTab(pdfUrl);
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    await downloadPdf(pdfUrl, fileName);
  };

  const handlePrint = (e) => {
    e.preventDefault();
    printPdf(pdfUrl);
  };

  // Icon style buttons
  if (buttonStyle === 'icon') {
    return (
      <div className={`pdf-action-buttons d-flex gap-2 ${className}`}>
        {showView && (
          <button
            onClick={handleView}
            className="btn btn-sm btn-outline-primary"
            title="View PDF"
          >
            <img src="/images/file2.svg" width={16} alt="View" />
          </button>
        )}
        {showDownload && (
          <button
            onClick={handleDownload}
            className="btn btn-sm btn-outline-success"
            title="Download PDF"
          >
            <i className="fas fa-download"></i>
          </button>
        )}
        {showPrint && (
          <button
            onClick={handlePrint}
            className="btn btn-sm btn-outline-secondary"
            title="Print PDF"
          >
            <i className="fas fa-print"></i>
          </button>
        )}
      </div>
    );
  }

  // Text style buttons
  if (buttonStyle === 'text') {
    return (
      <div className={`pdf-action-buttons d-flex gap-2 ${className}`}>
        {showView && (
          <a
            href="#"
            onClick={handleView}
            className="viw text-primary"
            style={{ cursor: 'pointer' }}
          >
            View
          </a>
        )}
        {showDownload && (
          <a
            href="#"
            onClick={handleDownload}
            className="text-success"
            style={{ cursor: 'pointer' }}
          >
            Download
          </a>
        )}
        {showPrint && (
          <a
            href="#"
            onClick={handlePrint}
            className="text-secondary"
            style={{ cursor: 'pointer' }}
          >
            Print
          </a>
        )}
      </div>
    );
  }

  // Default button style
  return (
    <div className={`pdf-action-buttons d-flex gap-2 ${className}`}>
      {showView && (
        <button
          onClick={handleView}
          className="btn btn-sm btn-primary"
        >
          View PDF
        </button>
      )}
      {showDownload && (
        <button
          onClick={handleDownload}
          className="btn btn-sm btn-success"
        >
          Download
        </button>
      )}
      {showPrint && (
        <button
          onClick={handlePrint}
          className="btn btn-sm btn-secondary"
        >
          Print
        </button>
      )}
    </div>
  );
};

export default PdfActionButtons;
