import React, { useState, useRef, useEffect } from 'react';

const ExportButton = ({ 
  className = "col-lg-2 col-md-6 mb-2", 
  buttonText = "Export",
  exportOptions = ["PDF", "XLS"],
  onExport,
  buttonClassName = "btn btn-secondary dropdown-toggle mb--10 mt--1 w--100"
}) => {
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const exportDropdownRef = useRef(null);

  const toggleExportDropdown = () => {
    setShowExportDropdown(!showExportDropdown);
  };

  const handleExportOption = (format) => {
    if (onExport) {
      onExport(format);
    } else {
      console.log(`Exporting as ${format}`);
    }
    setShowExportDropdown(false);
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
