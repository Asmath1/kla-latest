import React from 'react';
import { ExportButton } from './common';

/**
 * Test component to verify export functionality
 * Use this to test if PDF export is working
 */
const TestExport = () => {
  // Sample test data
  const testData = [
    { Name: 'John Doe', Age: 30, Email: 'john@example.com', City: 'New York' },
    { Name: 'Jane Smith', Age: 25, Email: 'jane@example.com', City: 'Los Angeles' },
    { Name: 'Bob Johnson', Age: 35, Email: 'bob@example.com', City: 'Chicago' },
    { Name: 'Alice Brown', Age: 28, Email: 'alice@example.com', City: 'Houston' },
    { Name: 'Charlie Wilson', Age: 32, Email: 'charlie@example.com', City: 'Phoenix' },
  ];

  return (
    <div className="container mt-5">
      <h2>Export Functionality Test</h2>
      <p>Click the export button below to test different export formats.</p>
      
      <div className="mb-4">
        <ExportButton
          data={testData}
          filename="test-export"
          title="Test Export Report"
          exportOptions={["PDF", "Excel", "CSV", "XML", "DOC"]}
          className="mb-3"
          buttonClassName="btn btn-primary dropdown-toggle"
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {testData.map((item, index) => (
              <tr key={index}>
                <td>{item.Name}</td>
                <td>{item.Age}</td>
                <td>{item.Email}</td>
                <td>{item.City}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="alert alert-info mt-4">
        <h5>Testing Instructions:</h5>
        <ol>
          <li>Open browser console (F12)</li>
          <li>Click the Export button above</li>
          <li>Select PDF from the dropdown</li>
          <li>Check console for any error messages</li>
          <li>Verify PDF downloads successfully</li>
        </ol>
        <p className="mb-0">
          <strong>Expected Console Output:</strong><br/>
          - Starting PDF export...<br/>
          - Table columns: [...]<br/>
          - Data sample: {...}<br/>
          - Saving PDF...<br/>
          - PDF saved successfully
        </p>
      </div>
    </div>
  );
};

export default TestExport;
