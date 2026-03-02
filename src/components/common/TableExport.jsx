import React from 'react';
import ExportButton from './ExportButton';

/**
 * TableExport - Wrapper component for adding export functionality to tables
 * 
 * Usage:
 * <TableExport
 *   data={tableData}
 *   filename="export-name"
 *   title="Table Title"
 * >
 *   <table>...</table>
 * </TableExport>
 */
const TableExport = ({
  data,
  filename = 'export',
  title = 'Report',
  exportOptions = ["PDF", "Excel", "CSV"],
  children,
  showExportButton = true,
  className = "mb-3"
}) => {
  return (
    <div>
      {showExportButton && data && data.length > 0 && (
        <div className={className}>
          <ExportButton
            data={data}
            filename={filename}
            title={title}
            exportOptions={exportOptions}
            className=""
            buttonClassName="btn btn-secondary dropdown-toggle"
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default TableExport;
