# Export Utilities

## Overview
This directory contains the export utility functions used throughout the application to export data in various formats.

## Files

### exportUtils.js
Main export utility providing functions for exporting data to multiple formats.

## Supported Formats
- **PDF** - Formatted tables with headers and styling
- **Excel (XLSX)** - Spreadsheet format with proper formatting
- **CSV** - Comma-separated values for universal compatibility
- **XML** - Structured XML format for data exchange
- **DOC** - Microsoft Word document format

## Usage

### Basic Export
```javascript
import { exportData } from './utils/exportUtils';

const data = [
  { name: 'John', age: 30, email: 'john@example.com' },
  { name: 'Jane', age: 25, email: 'jane@example.com' }
];

// Export to PDF
exportData(data, 'PDF', 'users-list', {
  title: 'Users List',
  sheetName: 'Users'
});
```

### Individual Format Functions
```javascript
import {
  exportToExcel,
  exportToCSV,
  exportTableToPDF,
  exportToXML,
  exportToDoc
} from './utils/exportUtils';

// Excel
exportToExcel(data, 'filename', 'SheetName');

// CSV
exportToCSV(data, 'filename');

// PDF
exportTableToPDF(data, 'filename', 'Report Title', columns);

// XML
exportToXML(data, 'filename', 'rootElement', 'itemElement');

// DOC
exportToDoc(data, 'filename', 'Report Title');
```

### Data Transformation Helpers
```javascript
import { flattenData, filterColumns } from './utils/exportUtils';

// Flatten nested objects
const nested = [
  { name: 'John', address: { city: 'NYC', zip: '10001' } }
];
const flattened = flattenData(nested);
// Result: [{ name: 'John', address_city: 'NYC', address_zip: '10001' }]

// Filter specific columns
const filtered = filterColumns(data, ['name', 'email']);
// Result: Only name and email columns
```

## API Reference

### exportData(data, format, filename, options)
Unified export function that handles all formats.

**Parameters:**
- `data` (Array): Array of objects to export
- `format` (String): Export format ('PDF', 'Excel', 'CSV', 'XML', 'DOC')
- `filename` (String): Output filename without extension
- `options` (Object): Optional configuration
  - `title` (String): Report title (for PDF/DOC)
  - `sheetName` (String): Sheet name (for Excel)
  - `columns` (Array): Custom column configuration
  - `rootElement` (String): Root element name (for XML)
  - `itemElement` (String): Item element name (for XML)

**Returns:** Boolean - Success status

### exportToExcel(data, filename, sheetName)
Export data to Excel format.

**Parameters:**
- `data` (Array): Array of objects
- `filename` (String): Output filename
- `sheetName` (String): Sheet name (default: 'Sheet1')

**Returns:** Boolean - Success status

### exportToCSV(data, filename)
Export data to CSV format.

**Parameters:**
- `data` (Array): Array of objects
- `filename` (String): Output filename

**Returns:** Boolean - Success status

### exportTableToPDF(data, filename, title, columns)
Export data to PDF with formatted table.

**Parameters:**
- `data` (Array): Array of objects
- `filename` (String): Output filename
- `title` (String): Report title
- `columns` (Array): Column configuration (optional)

**Returns:** Boolean - Success status

### exportToXML(data, filename, rootElement, itemElement)
Export data to XML format.

**Parameters:**
- `data` (Array): Array of objects
- `filename` (String): Output filename
- `rootElement` (String): Root element name (default: 'data')
- `itemElement` (String): Item element name (default: 'item')

**Returns:** Boolean - Success status

### exportToDoc(data, filename, title)
Export data to DOC format.

**Parameters:**
- `data` (Array): Array of objects
- `filename` (String): Output filename
- `title` (String): Report title

**Returns:** Boolean - Success status

### flattenData(data)
Flatten nested objects in data array.

**Parameters:**
- `data` (Array): Array of objects with nested properties

**Returns:** Array - Flattened data

### filterColumns(data, columnsToInclude)
Filter data to include only specified columns.

**Parameters:**
- `data` (Array): Array of objects
- `columnsToInclude` (Array): Column names to include

**Returns:** Array - Filtered data

## Examples

### Example 1: Export Member List
```javascript
const members = [
  { name: 'John Doe', constituency: 'District 1', phone: '123-456-7890' },
  { name: 'Jane Smith', constituency: 'District 2', phone: '098-765-4321' }
];

exportData(members, 'PDF', 'members-list', {
  title: 'Member Contact List'
});
```

### Example 2: Export with Custom Columns
```javascript
const columns = [
  { header: 'Full Name', dataKey: 'name' },
  { header: 'Contact Number', dataKey: 'phone' }
];

exportTableToPDF(members, 'members', 'Members', columns);
```

### Example 3: Export Filtered Data
```javascript
const allData = [
  { name: 'John', age: 30, email: 'john@example.com', status: 'active' },
  { name: 'Jane', age: 25, email: 'jane@example.com', status: 'inactive' }
];

// Filter to only active members
const activeMembers = allData.filter(m => m.status === 'active');

// Export only specific columns
const exportData = filterColumns(activeMembers, ['name', 'email']);

exportToExcel(exportData, 'active-members', 'Active Members');
```

### Example 4: Export Nested Data
```javascript
const nestedData = [
  {
    name: 'John',
    contact: {
      email: 'john@example.com',
      phone: '123-456-7890'
    }
  }
];

// Flatten before export
const flattened = flattenData(nestedData);
// Result: [{ name: 'John', contact_email: 'john@example.com', contact_phone: '123-456-7890' }]

exportToCSV(flattened, 'contacts');
```

## Error Handling

All export functions return a boolean indicating success/failure:

```javascript
const success = exportData(data, 'PDF', 'report');

if (success) {
  console.log('Export successful');
} else {
  console.error('Export failed');
  // Handle error
}
```

## Dependencies

- `jspdf` - PDF generation
- `jspdf-autotable` - PDF table formatting
- `xlsx` - Excel and CSV export

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Performance Considerations

- **Large Datasets**: For datasets > 1000 rows, consider:
  - Pagination before export
  - Chunked processing
  - Web Workers for background processing

- **Memory**: Each export creates a blob in memory
  - Clean up after export
  - Avoid multiple simultaneous exports

## Security Considerations

- **Data Sanitization**: Always sanitize data before export
- **PII**: Be careful with personally identifiable information
- **File Size**: Limit export size to prevent DoS

## Troubleshooting

### PDF Export Fails
- Check if data has too many columns
- Reduce column count or use landscape orientation
- Verify jspdf and jspdf-autotable are installed

### Excel Export Fails
- Check for circular references in data
- Ensure all values are serializable
- Verify xlsx package is installed

### CSV Export Issues
- Check for special characters in data
- Ensure proper encoding (UTF-8)
- Verify data structure is flat

## Contributing

When adding new export formats:
1. Add function to exportUtils.js
2. Update exportData() switch statement
3. Add tests
4. Update documentation
5. Update ExportButton component

## License

Part of the KLA project.
