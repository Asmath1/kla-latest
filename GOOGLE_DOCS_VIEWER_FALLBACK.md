# Iframe Fallback for Mixed Content PDFs

## Problem
The application was experiencing mixed content errors when loading PDFs from HTTP URLs on an HTTPS site. Browsers block HTTP resources on HTTPS pages for security reasons.

## Solution
Implemented automatic fallback to iframe rendering for HTTP PDF URLs. When a PDF URL uses HTTP protocol, it's displayed in an iframe instead of using the react-pdf-viewer library, which avoids mixed content issues.

## How It Works

### URL Detection Function (`src/utils/urlUtils.js`)

```javascript
export const isHttpUrl = (url) => {
  if (!url) return false;
  return url.startsWith('http://');
};
```

### Conditional Rendering

All PDF viewer components now check if the URL uses HTTP and render accordingly:

```javascript
{isHttpUrl(pdfUrl) ? (
  // Use iframe for HTTP URLs
  <iframe
    src={pdfUrl}
    style={{
      width: "100%",
      height: "100%",
      border: "none",
    }}
    title="PDF Viewer"
  />
) : (
  // Use react-pdf-viewer for HTTPS URLs
  <Worker workerUrl="...">
    <Viewer fileUrl={pdfUrl} ... />
  </Worker>
)}
```

## Updated Components

All PDF viewer components now use conditional rendering:

### 1. Common Components
- `src/components/common/InlinePdfViwer.jsx` - Used by multiple pages
- `src/components/common/PdfViewerModal.jsx` - Modal PDF viewer

### 2. Page Components
- `src/components/Calendar.jsx` - Calendar PDF viewer
- `src/components/Questions.jsx` - Questions PDF modals (2 instances)
- `src/components/Bills.jsx` - Bills PDF viewer
- `src/components/pdf.jsx` - Generic PDF modal

## Benefits

1. **No Mixed Content Errors**: HTTP PDFs are rendered in iframes which browsers allow
2. **Native Browser Rendering**: Uses the browser's built-in PDF viewer for HTTP URLs
3. **Better Compatibility**: Iframes handle various PDF structures better
4. **No External Dependencies**: Doesn't rely on third-party services like Google Docs Viewer
5. **HTTPS URLs Use Advanced Viewer**: HTTPS URLs still use react-pdf-viewer with full features
6. **Automatic Detection**: No manual intervention needed

## How It Works Technically

### For HTTP URLs:
- Browser's iframe allows loading HTTP content even on HTTPS pages (with some restrictions)
- The PDF is rendered using the browser's native PDF viewer
- No JavaScript PDF parsing is involved

### For HTTPS URLs:
- Uses react-pdf-viewer library for advanced features
- Provides zoom, search, and navigation controls
- Better user experience with custom UI

## Limitations

1. **Limited Controls for HTTP PDFs**: Iframe rendering uses browser's native viewer with limited customization
2. **Browser Compatibility**: Some older browsers may still block HTTP iframes
3. **No Unified UI**: HTTP and HTTPS PDFs have different viewer interfaces

## Alternative Approaches Considered

1. **Google Docs Viewer**: Showed "invalid PDF structure" errors
2. **Convert HTTP to HTTPS**: Would fail if server doesn't support HTTPS
3. **Protocol-Relative URLs (`//`)**: Still causes mixed content if server only supports HTTP
4. **Proxy Server**: Requires backend infrastructure changes

## Testing

To verify the fix:

1. Open the application in a browser (HTTPS site)
2. Navigate to any page with PDF links (Calendar, Questions, Bills, etc.)
3. Click on a PDF link that uses HTTP protocol
4. The PDF should load in an iframe using the browser's native viewer
5. Check browser console - no security warnings should appear
6. HTTPS PDFs should load with the react-pdf-viewer interface

## Notes

- The detection happens at render time before the PDF viewer component renders
- Local PDF files (starting with `/`) are treated as HTTPS and use react-pdf-viewer
- The iframe approach is more reliable for various PDF structures
- HTTP PDFs will use the browser's default PDF viewer appearance
- HTTPS PDFs maintain the custom react-pdf-viewer interface with advanced features

