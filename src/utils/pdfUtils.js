/**
 * PDF utility helpers
 *
 * proxyAvailable: cached promise that resolves to true/false.
 * We ping the proxy with a HEAD-like request once per page load.
 */

// ─── Simple PDF actions ───────────────────────────────────────────────────────

/**
 * Open a PDF URL in a new browser tab.
 * Falls back to a direct location change if the popup is blocked.
 */
export function openPdfInNewTab(pdfUrl) {
  if (!pdfUrl) {
    console.error("openPdfInNewTab: No PDF URL provided");
    return;
  }
  const win = window.open(pdfUrl, "_blank", "noopener,noreferrer");
  if (!win) {
    // Popup blocked — navigate in the same tab as a fallback
    window.location.href = pdfUrl;
  }
}

/**
 * Trigger a download of a PDF file.
 * Uses fetch + blob so the browser downloads rather than navigates.
 */
export async function downloadPdf(pdfUrl, fileName = "document.pdf") {
  if (!pdfUrl) {
    console.error("downloadPdf: No PDF URL provided");
    return;
  }
  try {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch {
    // Fallback: open in new tab so the user can save manually
    openPdfInNewTab(pdfUrl);
  }
}

/**
 * Print a PDF by loading it in a hidden iframe and calling print().
 */
export function printPdf(pdfUrl) {
  if (!pdfUrl) {
    console.error("printPdf: No PDF URL provided");
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = pdfUrl;
  document.body.appendChild(iframe);
  iframe.onload = () => {
    try {
      iframe.contentWindow.print();
    } catch {
      openPdfInNewTab(pdfUrl);
    }
  };
}

let _proxyAvailablePromise = null;

/**
 * Returns a promise that resolves to `true` if the PHP proxy is genuinely
 * working, `false` otherwise. Result is cached for the page lifetime.
 *
 * Detection: we fetch /pdf-proxy.php with no `url` param. A real PHP
 * installation returns a 400 with the text "Error: No URL provided".
 * Anything else (Vite 500, network error, non-PHP server) means the proxy
 * is not usable.
 */
export function checkProxyAvailable() {
  if (_proxyAvailablePromise) return _proxyAvailablePromise;

  _proxyAvailablePromise = fetch("/pdf-proxy.php", {
    method: "GET",
    signal: AbortSignal.timeout(3000),
  })
    .then(async (res) => {
      if (res.status !== 400) return false;
      const text = await res.text();
      // PHP proxy returns this exact string when no URL is supplied
      return text.includes("No URL provided");
    })
    .catch(() => false);

  return _proxyAvailablePromise;
}

/**
 * Build the best iframe src for a given PDF URL.
 *  - Local paths (start with "/" or "./") → served directly, no proxy needed.
 *  - Remote + PHP proxy confirmed working → proxy URL.
 *  - Remote + proxy unavailable → Google Docs viewer fallback.
 */
export async function buildPdfSrc(fileUrl) {
  if (!fileUrl) return "";

  if (fileUrl.startsWith("/") || fileUrl.startsWith("./")) {
    return fileUrl;
  }

  const proxyOk = await checkProxyAvailable();
  if (proxyOk) {
    return `/pdf-proxy.php?url=${encodeURIComponent(fileUrl)}`;
  }

  // PHP not available — use Google Docs viewer (works for any public URL)
  return `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
}
