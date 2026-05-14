/**
 * URL Utility Functions
 */

/**
 * Converts HTTP URLs to use the PDF proxy to prevent mixed content issues
 * @param {string} url - The URL to process
 * @returns {string} - The proxied URL for HTTP, original URL for HTTPS
 */
export const ensureHttps = (url) => {
  if (!url) return '';

  const cleaned = url.trim();

  // If already HTTPS, use directly
  if (cleaned.startsWith('https://')) {
    return cleaned;
  }

  // If HTTP, send through proxy
  if (cleaned.startsWith('http://')) {
    return `/pdf-proxy.php?url=${encodeURIComponent(cleaned)}`;
  }

  return cleaned;
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
