import React, { useState, useRef, useEffect } from 'react';
import { exportData } from '../../utils/exportUtils';

const ExportButton = ({ 
  className = "col-lg-2 col-md-6 mb-2", 
  buttonText = "Export",
  exportOptions = ["PDF", "Excel", "CSV"],
  onExport,
  data = [],
  filename = "export",
  title = "Report",
  columns = null,
  buttonClassName = "btn btn-secondary dropdown-toggle mb--10 mt--1 w--100",
  showNotification = true
}) => {
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const exportDropdownRef = useRef(null);

  const toggleExportDropdown = () => {
    setShowExportDropdown(!showExportDropdown);
  };

  const handleExportOption = (format) => {
    setShowExportDropdown(false);

    // If custom onExport handler is provided, use it
    if (onExport) {
      onExport(format);
      return;
    }

    // Otherwise, use the built-in export functionality
    if (!data || data.length === 0) {
      if (showNotification) {
        console.warn('No data available to export');
      }
      return;
    }

    const success = exportData(data, format, filename, {
      title,
      columns,
      sheetName: title || 'Sheet1',
      rootElement: 'data',
      itemElement: 'item'
    });

    if (success && showNotification) {
      console.log(`Successfully exported as ${format}`);
    } else if (!success) {
      console.error(`Failed to export as ${format}`);
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        exportDropdownRef.current &&
        !exportDropdownRef.current.contains(event.target)
      ) {
        setShowExportDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={className} ref={exportDropdownRef}>
      <div className="mydrop dropdown">
        <button
          className={buttonClassName}
          type="button"
          onClick={toggleExportDropdown}
        >
          {buttonText}
        </button>
        <ul className={`dropdown-menu ${showExportDropdown ? "show" : ""}`}>
          {exportOptions.map((option, index) => (
            <li key={index}>
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleExportOption(option);
                }}
              >
                {option}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExportButton;
