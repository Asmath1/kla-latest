import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

/**
 * Comprehensive Export Utility
 * Supports: PDF, Excel (XLS/XLSX), CSV, XML, DOC
 */

// ============= EXCEL EXPORT =============
export const exportToExcel = (data, filename = 'export', sheetName = 'Sheet1') => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${filename}.xlsx`);
    return true;
  } catch (error) {
    console.error('Excel export failed:', error);
    return false;
  }
};

// ============= CSV EXPORT =============
export const exportToCSV = (data, filename = 'export') => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, `${filename}.csv`);
    return true;
  } catch (error) {
    console.error('CSV export failed:', error);
    return false;
  }
};

// ============= PDF EXPORT (TABLE) =============
export const exportTableToPDF = (data, filename = 'export', title = 'Report', columns = null) => {
  try {
    console.log('Starting PDF export...', { dataLength: data.length, filename, title });
    
    if (!data || data.length === 0) {
      console.error('No data to export');
      return false;
    }
    
    // Determine page orientation based on number of columns
    const numColumns = columns ? columns.length : Object.keys(data[0]).length;
    const orientation = numColumns > 4 ? 'landscape' : 'portrait';
    
    // Create new PDF document with appropriate orientation
    const doc = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: 'a4'
    });
    
    // Add title
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(title, 14, 15);
    
    // Prepare columns
    let tableColumns;
    if (columns) {
      tableColumns = columns;
    } else if (data.length > 0) {
      // Auto-generate columns from data keys
      const keys = Object.keys(data[0]);
      tableColumns = keys.map(key => ({
        header: key.replace(/_/g, ' ').toUpperCase(),
        dataKey: key
      }));
    } else {
      tableColumns = [];
    }
    
    console.log('Table columns:', tableColumns);
    console.log('Data sample:', data[0]);
    console.log('Orientation:', orientation);
    
    // Calculate appropriate font size based on data length
    let fontSize = 8;
    if (data.length > 50) {
      fontSize = 6;
    } else if (data.length > 30) {
      fontSize = 7;
    }
    
    // Use autoTable with settings to fit all data
    autoTable(doc, {
      startY: 20,
      head: [tableColumns.map(col => col.header)],
      body: data.map(row => tableColumns.map(col => {
        const value = row[col.dataKey];
        return value !== null && value !== undefined ? String(value) : '';
      })),
      styles: { 
        fontSize: fontSize,
        cellPadding: 1,
        overflow: 'linebreak',
        cellWidth: 'auto',
        minCellHeight: 5,
        halign: 'left',
        valign: 'middle'
      },
      headStyles: { 
        fillColor: [99, 102, 241], 
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: fontSize,
        cellPadding: 1.5
      },
      alternateRowStyles: { 
        fillColor: [245, 245, 245] 
      },
      margin: { top: 20, left: 10, right: 10, bottom: 10 },
      theme: 'grid',
      tableWidth: 'auto',
      // Allow table to span multiple pages if needed
      showHead: 'everyPage',
      // Adjust column widths automatically
      columnStyles: tableColumns.reduce((acc, col, index) => {
        acc[index] = { cellWidth: 'auto' };
        return acc;
      }, {})
    });
    
    console.log('Saving PDF...');
    doc.save(`${filename}.pdf`);
    console.log('PDF saved successfully');
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    console.error('Error details:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    return false;
  }
};

// ============= XML EXPORT =============
export const exportToXML = (data, filename = 'export', rootElement = 'data', itemElement = 'item') => {
  try {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootElement}>\n`;
    
    data.forEach(item => {
      xml += `  <${itemElement}>\n`;
      Object.entries(item).forEach(([key, value]) => {
        const sanitizedValue = String(value).replace(/[<>&'"]/g, (c) => {
          switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case "'": return '&apos;';
            case '"': return '&quot;';
            default: return c;
          }
        });
        xml += `    <${key}>${sanitizedValue}</${key}>\n`;
      });
      xml += `  </${itemElement}>\n`;
    });
    
    xml += `</${rootElement}>`;
    
    const blob = new Blob([xml], { type: 'application/xml' });
    downloadBlob(blob, `${filename}.xml`);
    return true;
  } catch (error) {
    console.error('XML export failed:', error);
    return false;
  }
};

// ============= DOC EXPORT =============
export const exportToDoc = (data, filename = 'export', title = 'Report') => {
  try {
    let html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="utf-8">
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
              <tr>
    `;
    
    // Add headers
    if (data.length > 0) {
      Object.keys(data[0]).forEach(key => {
        html += `<th>${key.replace(/_/g, ' ').toUpperCase()}</th>`;
      });
    }
    
    html += `
              </tr>
            </thead>
            <tbody>
    `;
    
    // Add rows
    data.forEach(item => {
      html += '<tr>';
      Object.values(item).forEach(value => {
        html += `<td>${value}</td>`;
      });
      html += '</tr>';
    });
    
    html += `
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    downloadBlob(blob, `${filename}.doc`);
    return true;
  } catch (error) {
    console.error('DOC export failed:', error);
    return false;
  }
};

// ============= HELPER FUNCTIONS =============
const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// ============= UNIFIED EXPORT FUNCTION =============
export const exportData = (data, format, filename = 'export', options = {}) => {
  const {
    title = 'Report',
    sheetName = 'Sheet1',
    columns = null,
    rootElement = 'data',
    itemElement = 'item'
  } = options;

  switch (format.toUpperCase()) {
    case 'EXCEL':
    case 'XLS':
    case 'XLSX':
      return exportToExcel(data, filename, sheetName);
    
    case 'CSV':
      return exportToCSV(data, filename);
    
    case 'PDF':
      return exportTableToPDF(data, filename, title, columns);
    
    case 'XML':
      return exportToXML(data, filename, rootElement, itemElement);
    
    case 'DOC':
      return exportToDoc(data, filename, title);
    
    default:
      console.error(`Unsupported format: ${format}`);
      return false;
  }
};

// ============= DATA TRANSFORMATION HELPERS =============
export const flattenData = (data) => {
  return data.map(item => {
    const flattened = {};
    Object.entries(item).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          flattened[`${key}_${nestedKey}`] = nestedValue;
        });
      } else if (Array.isArray(value)) {
        flattened[key] = value.join(', ');
      } else {
        flattened[key] = value;
      }
    });
    return flattened;
  });
};

export const filterColumns = (data, columnsToInclude) => {
  return data.map(item => {
    const filtered = {};
    columnsToInclude.forEach(col => {
      if (item.hasOwnProperty(col)) {
        filtered[col] = item[col];
      }
    });
    return filtered;
  });
};
