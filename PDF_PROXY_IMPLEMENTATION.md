# PDF Proxy Implementation for Mixed Content

## Problem
The application was experiencing mixed content errors when loading PDFs from HTTP URLs on an HTTPS site. Browsers block HTTP resources on HTTPS pages for security reasons.

## Solution
Implemented a PHP proxy server that fetches HTTP PDFs and serves them over HTTPS, eliminating mixed content issues while maintaining full PDF viewer functionality.

## Architecture

### 1. PHP Proxy Server (`public/pdf-proxy.php`)

The proxy server:
- Accepts PDF URL as a query parameter
- Validates the URL and checks against a whitelist of allowed domains
- Fetches the PDF from the HTTP source using cURL
- Serves the PDF content over HTTPS to the client
- Includes proper headers for caching and content type

**Usage:**
```
https://your-domain.com/pdf-proxy.php?url=http://www.niyamasabha.org/document.pdf
```

### 2. URL Utility Function (`src/utils/urlUtils.js`)

```javascript
export const ensureHttps = (url) => {
  if (!url) return url;
  
  // If URL starts with http://, use the PDF proxy
  if (url.startsWith('http://')) {
    return `/pdf-proxy.php?url=${encodeURIComponent(url)}`;
  }
  
  return url;
};
```

## How It Works

### Flow Diagram
```
User clicks PDF link
    ↓
Component calls ensureHttps(url)
    ↓
Is URL HTTP? → Yes → Convert to: /pdf-proxy.php?url=ENCODED_URL
             → No  → Use original URL
    ↓
PDF Viewer loads the URL
    ↓
If proxied: Browser requests pdf-proxy.php over HTTPS
    ↓
PHP proxy fetches PDF from HTTP source
    ↓
PHP proxy serves PDF over HTTPS
    ↓
PDF displays in viewer
```

## Updated Components

All PDF viewer components now use `ensureHttps()`:

### 1. Common Components
- `src/components/common/InlinePdfViwer.jsx`
- `src/components/common/PdfViewerModal.jsx`

### 2. Page Components
- `src/components/Calendar.jsx`
- `src/components/Questions.jsx` (2 instances)
- `src/components/Bills.jsx`
- `src/components/pdf.jsx`

## PHP Proxy Features

### Security Features
1. **Domain Whitelist**: Only allows PDFs from approved domains
   ```php
   $allowedDomains = [
       'www.niyamasabha.org',
       'niyamasabha.org',
       'oldsite.niyamasabha.org',
       'klaproceedings.niyamasabha.org'
   ];
   ```

2. **URL Validation**: Validates URL format before processing

3. **CORS Headers**: Includes proper CORS headers for cross-origin requests

### Performance Features
1. **Caching**: Sets cache headers for 1 hour to reduce server load
   ```php
   header('Cache-Control: public, max-age=3600');
   ```

2. **Timeout**: 30-second timeout for fetching PDFs

3. **Redirect Following**: Follows up to 5 redirects automatically

### Error Handling
- Returns appropriate HTTP status codes
- Provides clear error messages
- Handles cURL errors gracefully

## Benefits

1. **No Mixed Content Errors**: All PDFs served over HTTPS
2. **Full PDF Viewer Features**: Uses react-pdf-viewer for all PDFs
3. **Consistent UI**: Same viewer interface for all PDFs
4. **Server-Side Control**: Can add authentication, logging, or rate limiting
5. **Caching**: Reduces load on source servers
6. **Security**: Whitelist prevents abuse
7. **No External Dependencies**: Self-hosted solution

## Configuration

### Adding New Domains

To allow PDFs from additional domains, edit `public/pdf-proxy.php`:

```php
$allowedDomains = [
    'www.niyamasabha.org',
    'niyamasabha.org',
    'your-new-domain.com',  // Add here
];
```

### Adjusting Cache Duration

To change cache duration, edit the Cache-Control header:

```php
header('Cache-Control: public, max-age=7200'); // 2 hours
```

### Adjusting Timeout

To change the fetch timeout:

```php
curl_setopt($ch, CURLOPT_TIMEOUT, 60); // 60 seconds
```

## Server Requirements

- PHP 7.0 or higher
- cURL extension enabled
- Sufficient memory for handling PDF files
- Write permissions not required (no file storage)

## Testing

### Test the Proxy Directly

1. Open browser and navigate to:
   ```
   https://your-domain.com/pdf-proxy.php?url=http://www.niyamasabha.org/test.pdf
   ```

2. PDF should display in browser

### Test in Application

1. Open the application
2. Navigate to Calendar, Questions, or Bills page
3. Click on a PDF link
4. Check browser console - no mixed content errors
5. Check Network tab - request should go to `/pdf-proxy.php`

## Troubleshooting

### PDF Not Loading

1. **Check PHP errors**: Enable error reporting in pdf-proxy.php
   ```php
   error_reporting(E_ALL);
   ini_set('display_errors', 1);
   ```

2. **Check cURL**: Verify cURL is installed
   ```bash
   php -m | grep curl
   ```

3. **Check domain whitelist**: Ensure domain is in allowed list

### Slow Loading

1. **Increase timeout**: Adjust CURLOPT_TIMEOUT
2. **Check source server**: Verify source server is responding
3. **Enable caching**: Ensure cache headers are set

### 403 Forbidden

1. **Check domain whitelist**: Add domain to allowed list
2. **Check source server**: Verify PDF is publicly accessible

## Security Considerations

1. **Domain Whitelist**: Always maintain a strict whitelist
2. **Rate Limiting**: Consider adding rate limiting for production
3. **File Size Limits**: Consider adding max file size checks
4. **Logging**: Add logging for monitoring and debugging
5. **Authentication**: Add authentication if needed for sensitive PDFs

## Future Enhancements

1. **Caching to Disk**: Store frequently accessed PDFs
2. **CDN Integration**: Serve cached PDFs from CDN
3. **Authentication**: Add user authentication for restricted PDFs
4. **Rate Limiting**: Implement rate limiting per IP
5. **Analytics**: Track PDF access statistics
6. **Compression**: Compress PDFs before serving

## Example Transformations

```
Input:  http://www.niyamasabha.org/codes/15kla/Session_16/ans/27.01.26/s00030-270126-16-15.pdf
Output: /pdf-proxy.php?url=http%3A%2F%2Fwww.niyamasabha.org%2Fcodes%2F15kla%2FSession_16%2Fans%2F27.01.26%2Fs00030-270126-16-15.pdf

Input:  https://www.niyamasabha.org/document.pdf
Output: https://www.niyamasabha.org/document.pdf (unchanged)

Input:  /local/document.pdf
Output: /local/document.pdf (unchanged)
```

## Notes

- The proxy runs on the same domain as your application
- No cross-origin issues since proxy is same-origin
- PDFs are streamed through the proxy, not stored
- Original PDF URLs are preserved in download links
- Works with all PDF structures and sizes (within PHP limits)
