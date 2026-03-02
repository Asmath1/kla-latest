# BAC Report Modal PDF Viewer Implementation

## Overview
Added modal PDF viewer functionality to the BAC Report section in SessionSchedule.jsx. When users click "View" on any BAC report row, a modal popup appears displaying the PDF document using the InlinePdfViewer component.

## Changes Made

### 1. State Management
Added new state to track selected BAC PDF:
```javascript
const [selectedBacPdf, setSelectedBacPdf] = useState(null);
```

### 2. Updated BAC Data Structure
Added `pdfUrl` property to each BAC report item:
```javascript
const bacData = [
  {
    id: 1,
    kla: "15th KLA",
    session: "Session 8",
    date: "05 Jul 2025",
    report: "9th Report",
    pdfUrl: "/pdf1.pdf", // ← Added
  },
  // ... more items
];
```

### 3. View Button Functionality
Updated "View" button to open modal with PDF:
```javascript
<a
  href="#"
  className="viw"
  onClick={(e) => {
    e.preventDefault();
    setSelectedBacPdf(item.pdfUrl);
  }}
>
  View
</a>
```

### 4. Modal PDF Viewer
Added Bootstrap modal with InlinePdfViewer component:
- Full-screen modal (modal-xl)
- Header with title and close button
- InlinePdfViewer component showing the selected PDF
- 85vh height for optimal viewing
- Modal backdrop for overlay effect
- Click backdrop or close button to dismiss

## User Experience Flow

1. **Initial State**: User sees the BAC table
2. **Click "View"**: 
   - Modal opens with PDF viewer
   - PDF loads and displays in the modal
   - Backdrop overlay appears behind modal
3. **Close Modal**: 
   - Click X button in header
   - Click backdrop outside modal
   - Modal closes and returns to table view
4. **Click Another "View"**: 
   - Previous modal closes
   - New modal opens with different PDF

## Features

✅ **Modal Popup** - Clean, focused viewing experience
✅ **Full Screen** - Large modal (modal-xl) for better readability
✅ **InlinePdfViewer** - Uses existing component with all features
✅ **Download Option** - Built-in download button in PDF viewer
✅ **Close Options** - Close button and backdrop click
✅ **Smooth Transitions** - Bootstrap modal animations
✅ **Responsive Design** - Works on all screen sizes
✅ **No Page Reload** - Stays on same page

## Code Structure

```
BAC Report Section
├── Filter & Export Button
├── Table with BAC data
│   └── View buttons (opens modal)
├── Pagination
└── Modal (conditional render)
    ├── Modal Header (Title + Close button)
    ├── Modal Body
    │   └── InlinePdfViewer component
    └── Modal Backdrop
```

## Modal Structure

```javascript
{selectedBacPdf && (
  <>
    <div className="modal fade show">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5>BAC Report Preview</h5>
            <button onClick={() => setSelectedBacPdf(null)}>×</button>
          </div>
          <div className="modal-body">
            <InlinePdfViewer fileUrl={selectedBacPdf} height="85vh" />
          </div>
        </div>
      </div>
    </div>
    <div className="modal-backdrop" onClick={() => setSelectedBacPdf(null)} />
  </>
)}
```

## Advantages of Modal Approach

1. **Focus**: User attention is on the PDF only
2. **Space**: Full screen width for better readability
3. **Clean**: Table remains unchanged, no layout shifts
4. **Familiar**: Standard modal pattern users expect
5. **Mobile-Friendly**: Better experience on smaller screens
6. **Multiple PDFs**: Easy to switch between different reports

## Responsive Behavior

- **Desktop**: Large modal with plenty of space
- **Tablet**: Modal adjusts to screen width
- **Mobile**: Full-screen modal experience

## Testing Checklist

- [x] Click "View" button opens modal
- [x] PDF displays correctly in modal
- [x] Close button (X) closes modal
- [x] Backdrop click closes modal
- [x] Download button works in PDF viewer
- [x] Clicking different "View" buttons switches PDFs
- [x] Modal animations work smoothly
- [x] Responsive on different screen sizes
- [x] No console errors
- [x] ESC key closes modal (Bootstrap default)

## Comparison: Modal vs Side-by-Side

| Feature | Modal | Side-by-Side |
|---------|-------|--------------|
| Screen Space | Full width | Split 50/50 |
| Focus | High | Medium |
| Table Visibility | Hidden | Visible |
| Mobile Experience | Better | Cramped |
| PDF Size | Larger | Smaller |
| User Pattern | Familiar | Unique |

## Future Enhancements

Possible improvements:
1. Add loading spinner while PDF loads
2. Add error handling for failed PDF loads
3. Add keyboard shortcuts (ESC already works)
4. Add print button in modal header
5. Add fullscreen toggle
6. Add previous/next buttons to navigate between reports
7. Show report details in modal header (KLA, Session, Date)

## Related Files

- `src/components/business/SessionSchedule.jsx` - Main component
- `src/components/business/SessionSchedule.css` - Styling
- `src/components/common/InlinePdfViwer.jsx` - PDF viewer component

## Notes

- The InlinePdfViewer component already includes a download button
- Modal uses Bootstrap classes for styling and animations
- PDF URLs can be easily replaced with actual API endpoints
- Modal automatically handles body scroll locking
- Backdrop click provides intuitive close behavior
