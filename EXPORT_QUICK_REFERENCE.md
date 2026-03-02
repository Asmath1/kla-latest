# Export Functionality - Quick Reference Card

## 🚀 Quick Start

### 1. Import
```javascript
import { ExportButton } from '../common';
```

### 2. Prepare Data
```javascript
const exportData = tableData.map(item => ({
  'Column Name 1': item.field1,
  'Column Name 2': item.field2,
}));
```

### 3. Add Button
```jsx
<ExportButton
  data={exportData}
  filename="my-export"
  title="My Report"
  exportOptions={["PDF", "Excel", "CSV"]}
/>
```

## 📦 Props Reference

### ExportButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | Array | `[]` | Array of objects to export |
| `filename` | String | `"export"` | Downloaded file name (without extension) |
| `title` | String | `"Report"` | Title shown in PDF |
| `exportOptions` | Array | `["PDF", "Excel", "CSV"]` | Available export formats |
| `columns` | Array | `null` | Custom column configuration |
| `onExport` | Function | `null` | Custom export handler |
| `buttonText` | String | `"Export"` | Button label |
| `className` | String | `"col-lg-2 col-md-6 mb-2"` | Container CSS class |
| `buttonClassName` | String | `"btn btn-secondary dropdown-toggle mb--10 mt--1 w--100"` | Button CSS class |
| `showNotification` | Boolean | `true` | Show success/error alerts |

## 🎨 Common Patterns

### Pattern 1: Basic Table Export
```jsx
<ExportButton
  data={users.map(u => ({
    'Name': u.name,
    'Email': u.email,
    'Phone': u.phone
  }))}
  filename="users-list"
  title="Users List"
/>
```

### Pattern 2: Custom Export Handler
```jsx
const handleExport = (format) => {
  const data = processedData.map(item => ({
    'Field 1': item.value1,
    'Field 2': item.value2,
  }));
  
  const { exportData } = require('../../utils/exportUtils');
  exportData(data, format, 'filename', { title: 'Title' });
};

<ExportButton onExport={handleExport} />
```

### Pattern 3: Multiple Tables
```jsx
// Table 1
<ExportButton
  data={table1Data}
  filename="report-section-1"
  title="Section 1"
/>
<table>...</table>

// Table 2
<ExportButton
  data={table2Data}
  filename="report-section-2"
  title="Section 2"
/>
<table>...</table>
```

### Pattern 4: Filtered Data Export
```jsx
const filteredData = allData.filter(item => 
  item.status === selectedStatus
);

<ExportButton
  data={filteredData.map(item => ({
    'Name': item.name,
    'Status': item.status
  }))}
  filename={`report-${selectedStatus}`}
  title={`Report - ${selectedStatus}`}
/>
```

## 🔧 Supported Formats

| Format | Extension | Use Case |
|--------|-----------|----------|
| PDF | `.pdf` | Formatted reports, printing |
| Excel | `.xlsx` | Data analysis, spreadsheets |
| CSV | `.csv` | Data import, simple format |
| XML | `.xml` | Data exchange, APIs |
| DOC | `.doc` | Word documents, editing |

## 💡 Tips & Best Practices

### ✅ DO
- Use descriptive column names
- Transform data before export
- Use kebab-case for filenames
- Test all export formats
- Handle empty data gracefully

### ❌ DON'T
- Export raw API responses
- Use technical field names
- Include sensitive data
- Forget to handle errors
- Export without user action

## 🐛 Troubleshooting

### Button shows but doesn't export
```javascript
// Check if data is provided and is an array
console.log('Export data:', data);
console.log('Is array:', Array.isArray(data));
```

### PDF export fails
```javascript
// Check column count (PDF has width limits)
// Reduce columns or use landscape orientation
```

### Excel export fails
```javascript
// Check for circular references in data
// Ensure all values are serializable
```

## 📱 Responsive Design

```jsx
// Mobile-friendly button
<ExportButton
  className="col-12 mb-2"
  buttonClassName="btn btn-secondary dropdown-toggle w-100"
  data={data}
  filename="mobile-export"
/>
```

## 🎯 Real Examples

### Example 1: Member Contact
```jsx
<ExportButton
  data={members.map(m => ({
    'Name': m.name,
    'Constituency': m.constituency,
    'Phone': m.phone,
    'Email': m.email
  }))}
  filename="member-contact"
  title="Member Contact Details"
  exportOptions={["PDF", "Excel", "CSV"]}
/>
```

### Example 2: Bulletins
```jsx
<ExportButton
  data={bulletins.map(b => ({
    'Bulletin No': b.number,
    'Title': b.title,
    'Session': b.session,
    'Date': b.date
  }))}
  filename="bulletins-list"
  title="Bulletins"
  exportOptions={["PDF", "Excel", "CSV"]}
/>
```

### Example 3: Motions
```jsx
<ExportButton
  data={motions.map(m => ({
    'Serial No': m.no,
    'Date': m.date,
    'Mover': m.mover,
    'Subject': m.subject
  }))}
  filename="motions-rule-130"
  title="Motions Under Rule 130"
  exportOptions={["PDF", "Excel", "CSV"]}
/>
```

## 🔗 Related Files

- **Export Utility**: `src/utils/exportUtils.js`
- **Export Button**: `src/components/common/ExportButton.jsx`
- **Table Wrapper**: `src/components/common/TableExport.jsx`
- **Full Guide**: `EXPORT_FUNCTIONALITY_GUIDE.md`
- **Status**: `EXPORT_IMPLEMENTATION_STATUS.md`

## 📞 Need Help?

1. Check `EXPORT_FUNCTIONALITY_GUIDE.md` for detailed documentation
2. Review `EXPORT_IMPLEMENTATION_STATUS.md` for examples
3. Look at implemented pages for reference:
   - `src/components/memberProfile/MemberContact.jsx`
   - `src/components/business/Bulletins.jsx`
   - `src/components/business/Motions.jsx`
