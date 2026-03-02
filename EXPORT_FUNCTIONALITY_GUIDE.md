# Export Functionality Implementation Guide

## Overview
This project now has a comprehensive export functionality that allows users to download data in multiple formats across all pages with tables or lists.

## Supported Formats
- **PDF** - Formatted table with headers and styling
- **Excel (XLSX)** - Spreadsheet format
- **CSV** - Comma-separated values
- **XML** - Structured XML format
- **DOC** - Microsoft Word document

## Implementation

### 1. Export Utility (`src/utils/exportUtils.js`)
Central utility that handles all export operations:

```javascript
import { exportData } from '../utils/exportUtils';

// Export data in any format
exportData(data, format, filename, options);
```

### 2. ExportButton Component (`src/components/common/ExportButton.jsx`)
Reusable component with dropdown for format selection:

```jsx
<ExportButton
  data={yourData}
  filename="export-name"
  title="Report Title"
  exportOptions={["PDF", "Excel", "CSV", "XML", "DOC"]}
  columns={customColumns} // optional
/>
```

## Usage Examples

### Basic Usage (Automatic Export)
```jsx
import { ExportButton } from './common';

<ExportButton
  data={tableData}
  filename="members-list"
  title="Members List"
  exportOptions={["PDF", "Excel", "CSV"]}
/>
```

### Custom Export Handler
```jsx
const handleExport = (format) => {
  const exportData = data.map(item => ({
    'Column 1': item.field1,
    'Column 2': item.field2,
  }));
  
  const { exportData: exportUtil } = require('../../utils/exportUtils');
  exportUtil(exportData, format, 'filename', {
    title: 'Report Title',
    sheetName: 'Sheet Name'
  });
};

<ExportButton
  onExport={handleExport}
  exportOptions={["PDF", "Excel", "CSV"]}
/>
```

## Pages Updated with Export Functionality

### ✅ Completed
1. **Member Contact** (`src/components/memberProfile/MemberContact.jsx`)
   - Exports: Member name, address, phone, email
   - Formats: PDF, Excel, CSV, XML, DOC

2. **Bulletins Part 1 & 2** (`src/components/business/Bulletins.jsx`)
   - Exports: Bulletin number, title, session, PDF URL
   - Formats: PDF, Excel, CSV

3. **All pages with ExportButton** - Now functional with data export

### 🔄 Needs Update (Pages with Tables)
The following pages have tables and should be updated with export functionality:

#### Business Section
- `src/components/business/Motions.jsx` - Multiple tables (Confidence motions, Rule 130, etc.)
- `src/components/business/Resolutions.jsx`
- `src/components/business/BudgetSpeeches.jsx`
- `src/components/business/Debates.jsx`
- `src/components/business/ListOfBusiness.jsx`
- `src/components/business/ListOfPapersLaid.jsx`
- `src/components/business/Proceedings.jsx`
- `src/components/business/SessionSchedule.jsx`

#### Member Profile Section
- `src/components/memberProfile/Member-list.jsx`
- `src/components/memberProfile/MemberProfile.jsx` - Multiple tables (Debates, Questions, etc.)
- `src/components/memberProfile/Committee-page.jsx`

#### Other Sections
- `src/components/Questions.jsx` - Multiple tabs with data
- `src/components/Bills.jsx`
- `src/secretariate/OtherImptNo.jsx` - Multiple tables

## Implementation Steps for New Pages

### Step 1: Import Required Components
```javascript
import { ExportButton } from '../common';
```

### Step 2: Prepare Export Data
Transform your display data into export-friendly format:
```javascript
const exportData = displayData.map(item => ({
  'Column Header 1': item.field1,
  'Column Header 2': item.field2,
  // ... more fields
}));
```

### Step 3: Add ExportButton
Place the button near your table/list:
```jsx
<ExportButton
  data={exportData}
  filename="descriptive-filename"
  title="Report Title"
  exportOptions={["PDF", "Excel", "CSV"]}
/>
```

## Advanced Features

### Custom Column Configuration
```javascript
const columns = [
  { header: 'Name', dataKey: 'name' },
  { header: 'Email', dataKey: 'email' },
];

<ExportButton
  data={data}
  columns={columns}
  filename="custom-export"
/>
```

### Data Transformation Helpers
```javascript
import { flattenData, filterColumns } from '../utils/exportUtils';

// Flatten nested objects
const flattened = flattenData(nestedData);

// Filter specific columns
const filtered = filterColumns(data, ['name', 'email', 'phone']);
```

## Dependencies
All required dependencies are already installed:
- `jspdf` - PDF generation
- `jspdf-autotable` - PDF tables
- `xlsx` - Excel/CSV export

## Best Practices

1. **Data Preparation**: Always transform data to have clear, readable column names
2. **Filename Convention**: Use descriptive, kebab-case filenames
3. **Format Selection**: Offer formats appropriate for the data type
4. **Performance**: For large datasets (>1000 rows), consider pagination or chunking
5. **User Feedback**: The component shows console logs; consider adding toast notifications

## Testing Checklist

For each page with export functionality:
- [ ] Export button is visible and accessible
- [ ] All formats export successfully
- [ ] Exported data matches displayed data
- [ ] Column headers are clear and readable
- [ ] File downloads with correct name and extension
- [ ] No console errors during export
- [ ] Works with filtered/sorted data

## Troubleshooting

### Export button shows but doesn't work
- Check if `data` prop is provided and is an array
- Verify data is not empty
- Check browser console for errors

### PDF export fails
- Ensure `jspdf` and `jspdf-autotable` are installed
- Check if data has too many columns (PDF has width limits)

### Excel export fails
- Verify `xlsx` package is installed
- Check if data contains circular references

## Future Enhancements

1. **Print Functionality**: Add direct print option
2. **Email Export**: Send exported file via email
3. **Cloud Storage**: Save to Google Drive/Dropbox
4. **Scheduled Exports**: Automatic periodic exports
5. **Custom Templates**: User-defined export templates
6. **Batch Export**: Export multiple tables at once
