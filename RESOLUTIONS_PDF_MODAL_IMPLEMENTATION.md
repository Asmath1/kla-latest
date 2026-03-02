# Resolutions Page - Government Resolutions PDF Modal Implementation

## Summary
Successfully implemented inline modal PDF viewer functionality for the Government Resolutions links on the Resolutions page. When users click on either of the government resolution links, a modal popup opens displaying the PDF using the InlinePdfViewer component.

## Changes Made

### 1. Import Updates
- Added `InlinePdfViewer` import from `../common/InlinePdfViwer`
- Removed unused `React` import (using named imports only)

### 2. State Management
Added two new state variables to the main `Resolutions` component:
- `selectedPdfUrl`: Stores the URL of the currently selected PDF
- `pdfModalTitle`: Stores the title to display in the modal header

### 3. Government Resolutions Tab Updates
Updated both `<a>` tags in the "Government Resolutions" tab content:

#### First Link (Previously had commented onClick):
- Changed from commented-out onClick to active modal trigger
- Added `onClick` handler with:
  - `e.preventDefault()` to prevent default link behavior
  - `setSelectedPdfUrl("/images/state-name-kerala.pdf")` to set PDF URL
  - `setPdfModalTitle()` with Malayalam title
  - `cursor: 'pointer'` style for better UX

#### Second Link (Previously opened in new tab):
- Changed from `target="_blank"` to modal trigger
- Removed `target="_blank"` and `rel="noopener noreferrer"` attributes
- Added same onClick handler as first link
- Both links now open the same PDF in modal

### 4. Modal Component
Added PDF modal at the end of the component return statement (before closing divs):
- Bootstrap modal structure with `modal-xl` size
- Modal header with dynamic title (Malayalam text) and close button
- Modal body containing InlinePdfViewer component with 85vh height
- Modal backdrop with click-to-close functionality
- Conditional rendering based on `selectedPdfUrl` state

## PDF Details
Both government resolution links point to:
- PDF URL: `/images/state-name-kerala.pdf`
- Title: "സംസ്ഥാനത്തിന്റെ നാമധേയം കേരളം എന്നാക്കുന്നത് സംബന്ധിച്ച പ്രമേയം"
- English Translation: "Resolution regarding renaming the state as Kerala"
- Date: June 24, 2024
- Status: Passed unanimously by the Legislative Assembly

## User Experience
1. User navigates to Resolutions page
2. User clicks on "Government Resolutions" tab
3. User clicks on either of the two government resolution links
4. Modal popup opens immediately
5. PDF loads and displays using InlinePdfViewer component
6. User can:
   - View the PDF with zoom/navigation controls
   - Download the PDF using the download button
   - Close modal by clicking X button or backdrop

## Technical Details
- Modal uses Bootstrap classes for styling
- InlinePdfViewer component handles PDF rendering with react-pdf-viewer
- State management ensures only one modal is open at a time
- Click handlers prevent default link behavior
- Proper cursor styling indicates clickable elements
- Malayalam text properly displayed in modal title

## Files Modified
- `src/components/business/Resolutions.jsx`

## Testing Recommendations
1. Navigate to Resolutions page
2. Click on "Government Resolutions" tab
3. Test first government resolution link (top one)
4. Verify modal opens with correct PDF
5. Test modal close functionality (X button and backdrop)
6. Test second government resolution link (bottom one)
7. Verify same PDF opens in modal
8. Test PDF download button in modal
9. Verify modal title displays Malayalam text correctly
10. Test on different screen sizes for responsiveness

## Notes
- Both government resolution links currently point to the same PDF
- If different PDFs are needed for each link, update the PDF URL in the respective onClick handlers
- The implementation follows the same pattern used in Motions.jsx and SessionSchedule.jsx
- No diagnostics errors, only a minor warning about useMemo dependencies (not affecting functionality)
