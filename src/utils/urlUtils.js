/**
 * URL Utility Functions
 */

/**
 * Converts HTTP URLs to use the PDF proxy to prevent mixed content issues
 * @param {string} url - The URL to process
 * @returns {string} - The proxied URL for HTTP, original URL for HTTPS
 */
export const ensureHttps = (url) => {
  if (!url) return url;
  
  // If URL starts with http:// (not https://), use the PDF proxy
  if (url.startsWith('http://')) {
    // Use the PDF proxy to fetch the HTTP PDF over HTTPS
    return `/pdf-proxy.php?url=${encodeURIComponent(url)}`;
  }
  
  return url;
};

/**
 * Checks if URL uses HTTP protocol (potential mixed content)
 * @param {string} url - The URL to check
 * @returns {boolean} - True if URL uses HTTP
 */
export const isHttpUrl = (url) => {
  if (!url) return false;
  return url.startsWith('http://');
};

/**
 * Sanitizes a URL for safe usage
 * @param {string} url - The URL to sanitize
 * @returns {string} - The sanitized URL
 */
export const sanitizeUrl = (url) => {
  if (!url) return '';
  
  // Trim whitespace
  let sanitized = url.trim();
  
  return sanitized;
};

/**
 * Checks if a URL is valid
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidUrl = (url) => {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
