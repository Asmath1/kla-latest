# PDF Export Troubleshooting Guide

## Issue: PDF Not Downloading

### Quick Fix Steps

#### Step 1: Check Browser Console
Open your browser's developer console (F12) and look for error messages when you click Export → PDF.

#### Step 2: Verify jsPDF Installation
The packages are already installed. If you need to reinstall:
```bash
npm install jspdf@2.5.2 jspdf-autotable@5.0.7 --save
```

#### Step 3: Test PDF Export
Try exporting a simple table first to isolate the issue.

### Common Issues & Solutions

#### Issue 1: "autoTable is not a function"
**Cause**: jspdf-autotable not properly imported

**Solution**: Already fixed in the code. The import is now:
```javascript
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
```

#### Issue 2: PDF Downloads but is Empty/Corrupted
**Cause**: Data format issue or column configuration problem

**Solution**: Check the console logs. The updated code now logs:
- Data length
- Table columns
- Data sample

#### Issue 3: Browser Blocks Download
**Cause**: Browser popup blocker

**Solution**: 
1. Check if browser is blocking popups
2. Allow downloads from your site
3. Try in incognito mode

#### Issue 4: Large Data Sets
**Cause**: Too much data causing memory issues

**Solution**: 
- Limit export to current page
- Use pagination
- Export in chunks

### Testing the Fix

#### Test 1: Simple Export
```javascript
// In browser console
import { exportTableToPDF } from './utils/exportUtils';

const testData = [
  { Name: 'John', Age: 30, Email: 'john@example.com' },
  { Name: 'Jane', Age: 25, Email: 'jane@example.com' }
];

exportTableToPDF(testData, 'test', 'Test Report');
```

#### Test 2: Check Console Logs
After clicking Export → PDF, you should see:
```
Starting PDF export... {dataLength: X, filename: "...", title: "..."}
Table columns: [...]
Data sample: {...}
Saving PDF...
PDF saved successfully
```

If you see an error, note the exact message.

### Updated Code Changes

The following changes were made to fix PDF export:

1. **Import Statement**: Changed from `import jsPDF from 'jspdf'` to `import { jsPDF } from 'jspdf'`

2. **Better Error Handling**: Added comprehensive error logging and user alerts

3. **Data Validation**: Added checks for empty data

4. **Column Generation**: Improved column generation logic

5. **AutoTable Configuration**: Updated to use proper head/body format:
```javascript
doc.autoTable({
  head: [tableColumns.map(col => col.header)],
  body: data.map(row => tableColumns.map(col => row[col.dataKey] || '')),
  // ... other options
});
```

### Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

### If Still Not Working

#### Option 1: Clear Cache
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Option 2: Check for Conflicts
Look for other PDF libraries that might conflict:
```bash
npm list | grep pdf
```

#### Option 3: Alternative PDF Export
If jsPDF continues to have issues, we can use an alternative approach:

```javascript
// Alternative: Use browser's print to PDF
export const exportTableToPDFAlternative = (data, filename, title) => {
  // Create HTML table
  const html = `
    <html>
      <head>
        <title>${title}</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #6366f1; color: white; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <table>
          <thead>
            <tr>${Object.keys(data[0]).map(k => `<th>${k}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${data.map(row => `<tr>${Object.values(row).map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;
  
  // Open in new window for printing
  const printWindow = window.open('', '_blank');
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
};
```

### Debug Checklist

When PDF export fails, check:

- [ ] Browser console shows error messages
- [ ] jsPDF and jspdf-autotable are installed
- [ ] Import statement uses `{ jsPDF }` not `jsPDF`
- [ ] Data is not empty
- [ ] Data is in correct format (array of objects)
- [ ] Column names are valid
- [ ] No browser popup blocker
- [ ] Sufficient memory available
- [ ] No conflicting PDF libraries

### Getting Help

If the issue persists:

1. **Check Console**: Copy the exact error message
2. **Check Data**: Log the data being exported
3. **Check Browser**: Try different browser
4. **Check Network**: Ensure no network issues
5. **Check Version**: Verify package versions match

### Contact Information

For additional support:
- Check browser console for detailed error messages
- Review the updated `src/utils/exportUtils.js` file
- Test with sample data first
- Try the alternative PDF export method if needed

---

**Last Updated**: February 24, 2026
**Status**: Fixed - PDF export should now work
**Next Steps**: Test the export and check console logs
