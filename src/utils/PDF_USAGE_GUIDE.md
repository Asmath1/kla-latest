# PDF Opening Functions - Usage Guide

This guide explains how to use the PDF utility functions to open PDFs in the browser.

## Quick Start

### 1. Import the utility function

```javascript
import { openPdfInNewTab } from '../utils/pdfUtils';
```

### 2. Use in your component

```javascript
// In your click handler
const handlePdfClick = (pdfUrl) => {
  openPdfInNewTab(pdfUrl);
};

// In your JSX
<a 
  href="#" 
  onClick={(e) => {
    e.preventDefault();
    openPdfInNewTab('/pdf1.pdf');
  }}
>
  View PDF
</a>
```

## Available Functions

### 1. `openPdfInNewTab(pdfUrl, fileName)`
Opens PDF in a new browser tab.

```javascript
import { openPdfInNewTab } from '../utils/pdfUtils';

// Basic usage
openPdfInNewTab('/documents/report.pdf');

// With optional file name
openPdfInNewTab('/documents/report.pdf', 'Annual_Report_2025.pdf');
```

### 2. `downloadPdf(pdfUrl, fileName)`
Downloads PDF to user's device.

```javascript
import { downloadPdf } from '../utils/pdfUtils';

// Download with custom name
await downloadPdf('/documents/report.pdf', 'My_Report.pdf');

// Download with default name
await downloadPdf('/documents/report.pdf');
```

### 3. `printPdf(pdfUrl)`
Opens print dialog for PDF.

```javascript
import { printPdf } from '../utils/pdfUtils';

printPdf('/documents/report.pdf');
```

### 4. `openPdfInSameTab(pdfUrl)`
Opens PDF in the same tab (replaces current page).

```javascript
import { openPdfInSameTab } from '../utils/pdfUtils';

openPdfInSameTab('/documents/report.pdf');
```

## Complete Examples

### Example 1: Simple Link

```javascript
import React from 'react';
import { openPdfInNewTab } from '../utils/pdfUtils';

const MyComponent = () => {
  return (
    <a 
      href="#" 
      onClick={(e) => {
        e.preventDefault();
        openPdfInNewTab('/pdf1.pdf');
      }}
      style={{ cursor: 'pointer' }}
    >
      View Document
    </a>
  );
};
```

### Example 2: Button with Icon

```javascript
import React from 'react';
import { openPdfInNewTab } from '../utils/pdfUtils';

const PdfButton = ({ pdfUrl, label }) => {
  return (
    <button 
      className="btn btn-primary"
      onClick={() => openPdfInNewTab(pdfUrl)}
    >
      <img src="/images/pdf.svg" width={16} alt="" />
      {label}
    </button>
  );
};
```

### Example 3: Table with View Links

```javascript
import React from 'react';
import { openPdfInNewTab } from '../utils/pdfUtils';

const DocumentTable = ({ documents }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Document Name</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc) => (
          <tr key={doc.id}>
            <td>{doc.name}</td>
            <td>{doc.date}</td>
            <td>
              <a
                href="#"
                className="viw"
                onClick={(e) => {
                  e.preventDefault();
                  openPdfInNewTab(doc.pdfUrl);
                }}
              >
                View
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

### Example 4: Using the Reusable Component

```javascript
import React from 'react';
import PdfActionButtons from '../components/common/PdfActionButtons';

const MyComponent = () => {
  return (
    <div>
      <h3>Document Actions</h3>
      
      {/* Default style */}
      <PdfActionButtons 
        pdfUrl="/documents/report.pdf"
        fileName="Annual_Report_2025.pdf"
      />
      
      {/* Icon style */}
      <PdfActionButtons 
        pdfUrl="/documents/report.pdf"
        fileName="Report.pdf"
        buttonStyle="icon"
        showPrint={true}
      />
      
      {/* Text style */}
      <PdfActionButtons 
        pdfUrl="/documents/report.pdf"
        buttonStyle="text"
        showView={true}
        showDownload={true}
      />
    </div>
  );
};
```

### Example 5: List with Multiple PDFs

```javascript
import React from 'react';
import { openPdfInNewTab } from '../utils/pdfUtils';

const PdfList = ({ pdfList }) => {
  return (
    <ul className="pdf-list">
      {pdfList.map((pdf) => (
        <li key={pdf.id}>
          <a
            href="#"
            className="rul d-flex align-items-center mb15"
            onClick={(e) => {
              e.preventDefault();
              openPdfInNewTab(pdf.url);
            }}
            style={{ cursor: 'pointer' }}
          >
            <span>{pdf.name}</span>
            <div className="imgx">
              <img src="/images/file2.svg" width={16} alt="" />
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};
```

### Example 6: With Loading State

```javascript
import React, { useState } from 'react';
import { downloadPdf } from '../utils/pdfUtils';

const DownloadButton = ({ pdfUrl, fileName }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadPdf(pdfUrl, fileName);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={isDownloading}
      className="btn btn-success"
    >
      {isDownloading ? 'Downloading...' : 'Download PDF'}
    </button>
  );
};
```

## Updated SessionSchedule.jsx Example

Here's how the functions are now integrated in your SessionSchedule component:

```javascript
import { openPdfInNewTab } from '../utils/pdfUtils';

// In Calendar tab - Session Info link
<a
  href="#"
  className="rul p-1 d-flex align-items-center w-100 justify-content-center mb-4"
  onClick={(e) => {
    e.preventDefault();
    openPdfInNewTab('/pdf1.pdf'); // Opens in new tab
  }}
  style={{ cursor: 'pointer' }}
>
  <span className="mb-0 text-muted">
    <strong>Calendar:</strong> 15th KLA - <strong>Session :</strong> 13
  </span>
  <div className="imgx">
    <img src="/images/file2.svg" width={16} alt="" />
  </div>
</a>

// In BAC table - View links
<td>
  <a
    href="#"
    className="viw"
    onClick={(e) => {
      e.preventDefault();
      openPdfInNewTab('/pdf1.pdf');
    }}
    style={{ cursor: 'pointer' }}
  >
    View
  </a>
</td>
```

## Best Practices

1. **Always prevent default behavior**
   ```javascript
   onClick={(e) => {
     e.preventDefault();
     openPdfInNewTab(pdfUrl);
   }}
   ```

2. **Add cursor pointer for better UX**
   ```javascript
   style={{ cursor: 'pointer' }}
   ```

3. **Handle errors gracefully**
   ```javascript
   try {
     await downloadPdf(pdfUrl, fileName);
   } catch (error) {
     console.error('Error:', error);
     // Show user-friendly error message
   }
   ```

4. **Validate PDF URLs**
   ```javascript
   import { isPdfUrl } from '../utils/pdfUtils';
   
   if (isPdfUrl(url)) {
     openPdfInNewTab(url);
   } else {
     alert('Invalid PDF URL');
   }
   ```

5. **Use meaningful file names for downloads**
   ```javascript
   downloadPdf('/documents/123.pdf', 'Annual_Report_2025.pdf');
   ```

## Browser Compatibility

All functions work in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Troubleshooting

### Popup Blocked
If the browser blocks popups, the function automatically falls back to creating a temporary link.

### CORS Issues
If PDFs are on a different domain, ensure CORS headers are properly configured on the server.

### File Not Found
Always validate PDF URLs exist before calling the functions.

## Additional Features

### Get PDF File Size
```javascript
import { getPdfFileSize, formatFileSize } from '../utils/pdfUtils';

const size = await getPdfFileSize('/documents/report.pdf');
console.log(formatFileSize(size)); // "2.5 MB"
```

### Validate PDF URL
```javascript
import { isPdfUrl } from '../utils/pdfUtils';

if (isPdfUrl(url)) {
  // It's a PDF
}
```
