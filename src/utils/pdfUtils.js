/**
 * PDF Utility Functions
 * Reusable functions for handling PDF operations across the application
 */

/**
 * Opens a PDF file in a new browser tab
 * @param {string} pdfUrl - The URL or path to the PDF file
 * @param {string} fileName - Optional file name for download
 */
export const openPdfInNewTab = (pdfUrl, fileName = null) => {
  if (!pdfUrl) {
    console.error("No PDF URL provided");
    return;
  }

  try {
    // Open PDF in new tab with security features
    const newWindow = window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    
    // Check if popup was blocked
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      console.warn('Popup blocked. Attempting alternative method...');
      // Fallback: create a temporary link and click it
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      if (fileName) {
        link.download = fileName;
      }
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error('Error opening PDF:', error);
  }
};

/**
 * Downloads a PDF file to the user's device
 * @param {string} pdfUrl - The URL or path to the PDF file
 * @param {string} fileName - The name for the downloaded file
 */
export const downloadPdf = async (pdfUrl, fileName = 'document.pdf') => {
  if (!pdfUrl) {
    console.error("No PDF URL provided");
    return;
  }

  try {
    // Fetch the PDF
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    
    // Create a temporary URL for the blob
    const blobUrl = window.URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    // Fallback to simple download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Opens PDF in the same window/tab
 * @param {string} pdfUrl - The URL or path to the PDF file
 */
export const openPdfInSameTab = (pdfUrl) => {
  if (!pdfUrl) {
    console.error("No PDF URL provided");
    return;
  }

  try {
    window.location.href = pdfUrl;
  } catch (error) {
    console.error('Error opening PDF:', error);
  }
};

/**
 * Prints a PDF file
 * @param {string} pdfUrl - The URL or path to the PDF file
 */
export const printPdf = (pdfUrl) => {
  if (!pdfUrl) {
    console.error("No PDF URL provided");
    return;
  }

  try {
    // Create an iframe to load and print the PDF
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = pdfUrl;
    
    document.body.appendChild(iframe);
    
    iframe.onload = () => {
      try {
        iframe.contentWindow.print();
      } catch (error) {
        console.error('Error printing PDF:', error);
        // Fallback: open in new tab for printing
        openPdfInNewTab(pdfUrl);
      }
    };
    
    // Cleanup after 1 minute
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 60000);
  } catch (error) {
    console.error('Error printing PDF:', error);
  }
};

/**
 * Validates if a URL is a PDF file
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if URL appears to be a PDF
 */
export const isPdfUrl = (url) => {
  if (!url) return false;
  
  const urlLower = url.toLowerCase();
  return urlLower.endsWith('.pdf') || urlLower.includes('.pdf?') || urlLower.includes('pdf');
};

/**
 * Gets PDF file size
 * @param {string} pdfUrl - The URL or path to the PDF file
 * @returns {Promise<number>} - File size in bytes
 */
export const getPdfFileSize = async (pdfUrl) => {
  if (!pdfUrl) {
    throw new Error("No PDF URL provided");
  }

  try {
    const response = await fetch(pdfUrl, { method: 'HEAD' });
    const contentLength = response.headers.get('content-length');
    return contentLength ? parseInt(contentLength, 10) : 0;
  } catch (error) {
    console.error('Error getting PDF file size:', error);
    return 0;
  }
};

/**
 * Formats file size to human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size (e.g., "2.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export default {
  openPdfInNewTab,
  downloadPdf,
  openPdfInSameTab,
  printPdf,
  isPdfUrl,
  getPdfFileSize,
  formatFileSize
};
