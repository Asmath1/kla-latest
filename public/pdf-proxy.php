```
<?php
/**
 * PDF Proxy Script
 * Fetches PDFs from HTTP URLs and serves them over HTTPS to avoid mixed content issues
 */

// Enable error reporting for debugging (disable in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Set headers to prevent caching issues
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the PDF URL from query parameter
$pdfUrl = isset($_GET['url']) ? $_GET['url'] : '';

// Validate URL
if (empty($pdfUrl)) {
    http_response_code(400);
    die('Error: No URL provided. Usage: pdf-proxy.php?url=YOUR_PDF_URL');
}

// Validate that it's a valid URL
if (!filter_var($pdfUrl, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    die('Error: Invalid URL provided');
}

// Optional: Whitelist allowed domains for security
$allowedDomains = [
    'www.niyamasabha.org',
    'niyamasabha.org',
    'oldsite.niyamasabha.org',
    'klaproceedings.niyamasabha.org',
    'www.niyamasabha.nic.in',
    'niyamasabha.nic.in',
];

$urlParts = parse_url($pdfUrl);
$domain = isset($urlParts['host']) ? $urlParts['host'] : '';

if (!in_array($domain, $allowedDomains)) {
    http_response_code(403);
    die('Error: Domain not allowed');
}

// Initialize cURL session
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $pdfUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_MAXREDIRS, 5);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For HTTP URLs
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

// Execute cURL request
$pdfContent = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
$error = curl_error($ch);

curl_close($ch);

// Check for errors
if ($pdfContent === false) {
    http_response_code(500);
    die('Error fetching PDF: ' . $error);
}

// Check HTTP response code
if ($httpCode !== 200) {
    http_response_code($httpCode);
    die('Error: HTTP ' . $httpCode . ' - Unable to fetch PDF');
}

// Set appropriate headers for PDF
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="document.pdf"');
header('Content-Length: ' . strlen($pdfContent));
header('Cache-Control: public, max-age=3600'); // Cache for 1 hour
header('Pragma: public');

// Output the PDF content
echo $pdfContent;
exit();
?>
```