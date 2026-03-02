# Committee Content Page - PDF Modal Implementation

## Summary
Successfully implemented inline modal PDF viewer functionality for all document links with the "doci" class on the Committee Content page. When users click on any document icon, a modal popup opens displaying the PDF using the InlinePdfViewer component.

## Changes Made

### 1. Import Updates
- Added `InlinePdfViewer` import from `../common/InlinePdfViwer`

### 2. State Management
Added two new state variables to the `CommitteeContent` component:
- `selectedPdfUrl`: Stores the URL of the currently selected PDF
- `pdfModalTitle`: Stores the title to display in the modal header

### 3. Document Links Updated

#### Subject Selected Tab (5 document links)
Updated all 5 document icon links in the "Subject Selected" tab:
- Each link now has an `onClick` handler that:
  - Prevents default link behavior with `e.preventDefault()`
  - Sets the PDF URL using `setSelectedPdfUrl()`
  - Sets a unique modal title with subject number
  - Adds `cursor: 'pointer'` style for better UX
- PDF URLs used: `/pdf1.pdf`, `/dummy.pdf`, `/pdff.pdf` (rotating)
- Modal titles include Malayalam text and subject number

#### Press Release Tab (3 document links)
Updated all 3 document icon links in the "Press Release" tab:
- Each link now has an `onClick` handler with same functionality
- PDF URLs used: `/pdff.pdf`, `/pdf1.pdf`, `/dummy.pdf`
- Modal titles include "Press Release" and date

### 4. Modal Component
Added PDF modal at the end of the component return statement (before closing divs):
- Bootstrap modal structure with `modal-xl` size
- Modal header with dynamic title and close button
- Modal body containing InlinePdfViewer component with 85vh height
- Modal backdrop with click-to-close functionality
- Conditional rendering based on `selectedPdfUrl` state

## Document Links Summary

### Subject Selected Tab (5 links):
1. Subject 1 - `/pdf1.pdf`
2. Subject 2 - `/dummy.pdf`
3. Subject 3 - `/pdff.pdf`
4. Subject 4 - `/pdf1.pdf`
5. Subject 5 - `/dummy.pdf`

### Press Release Tab (3 links):
1. Press Release 1 (18.12.2024) - `/pdff.pdf`
2. Press Release 2 (18.12.2024) - `/pdf1.pdf`
3. Press Release 3 (18.12.2024) - `/dummy.pdf`

## User Experience
1. User navigates to Committee Content page
2. User clicks on any tab (Subject Selected or Press Release)
3. User clicks on a document icon in the table
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
- Malayalam text properly displayed in modal titles
- All document icons use the same styling and behavior pattern

## Files Modified
- `src/components/memberProfile/Committe-content.jsx`

## Testing Recommendations
1. Navigate to Committee Content page
2. Test "Subject Selected" tab:
   - Click each of the 5 document icons
   - Verify modal opens with correct PDF
   - Verify modal title shows correct subject number
3. Test "Press Release" tab:
   - Click each of the 3 document icons
   - Verify modal opens with correct PDF
   - Verify modal title shows "Press Release" and date
4. Test modal close functionality:
   - Click X button
   - Click backdrop
5. Test PDF download button in modal
6. Verify Malayalam text displays correctly in titles
7. Test on different screen sizes for responsiveness
8. Verify no console errors

## Notes
- All document links now open PDFs in modal instead of navigating away
- The implementation follows the same pattern used in Motions.jsx, Resolutions.jsx, and SessionSchedule.jsx
- PDF URLs are placeholders and should be replaced with actual document URLs from the backend
- No diagnostics errors found
- Component is fully functional and ready for testing
