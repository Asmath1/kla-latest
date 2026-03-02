# Allotment Days API Integration

## Overview
Successfully integrated the Allotment Days API into the Questions component to display allotment days dynamically from the backend.

## API Details

### Endpoint
```
GET https://klademo.cditproject.org/api/allotment_days?kla_id={klaId}
```

### Response Structure
```json
{
  "status": true,
  "count": 8,
  "data": [
    {
      "id": 1,
      "kla_id": 15,
      "allotment_date": "2021-01-04",
      "title": "Allotment Day 1",
      "description": "Allotment of questions and discussions.",
      "created_at": "2026-02-20T12:13:15.000000Z",
      "updated_at": "2026-02-20T12:13:15.000000Z"
    }
  ]
}
```

## Implementation

### 1. Service Layer (`src/services/MasterService.js`)
Added `fetchAllotmentDays` function to fetch allotment days data:

```javascript
export const fetchAllotmentDays = async (klaId = 15) => {
  const url = `https://klademo.cditproject.org/api/allotment_days${klaId ? `?kla_id=${klaId}` : ''}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await res.json();
  if (json?.status && Array.isArray(json.data)) return json.data;
  if (Array.isArray(json)) return json;
  throw new Error("Failed to load allotment days");
};
```

### 2. Configuration (`src/utils/config.js`)
Added endpoint to API configuration:

```javascript
ALLOTMENT_DAYS: (klaId) => `${DEMO_API_BASE_URL}/api/allotment_days${klaId ? `?kla_id=${klaId}` : ''}`,
```

### 3. Component Integration (`src/components/Questions.jsx`)

#### State Management
```javascript
const [allotmentDays, setAllotmentDays] = useState([]);
const [loadingAllotments, setLoadingAllotments] = useState(false);
```

#### Data Fetching
```javascript
useEffect(() => {
  let cancelled = false;
  
  const loadAllotmentDays = async () => {
    setLoadingAllotments(true);
    try {
      const klaMatch = selectedKLA.match(/(\d+)/);
      const klaId = klaMatch ? parseInt(klaMatch[1]) : 15;
      
      const data = await fetchAllotmentDays(klaId);
      if (!cancelled) {
        setAllotmentDays(data || []);
      }
    } catch (err) {
      console.error("Failed to load allotment days:", err);
      if (!cancelled) {
        setAllotmentDays([]);
      }
    } finally {
      if (!cancelled) {
        setLoadingAllotments(false);
      }
    }
  };

  if (activeTab === "allotment") {
    loadAllotmentDays();
  }

  return () => {
    cancelled = true;
  };
}, [selectedKLA, activeTab]);
```

#### UI Rendering
The component now displays:
- Loading spinner while fetching data
- Dynamic list of allotment days with title and date
- Empty state message when no data is available
- Each allotment day shows:
  - Title (e.g., "Allotment Day 1")
  - Formatted date (DD/MM/YYYY)
  - Description on hover
  - PDF icon for document access

## Features

1. **Dynamic Data Loading**: Fetches allotment days based on selected KLA
2. **Loading States**: Shows spinner during API calls
3. **Error Handling**: Gracefully handles API failures
4. **Empty States**: Displays message when no data is available
5. **Date Formatting**: Formats dates in DD/MM/YYYY format
6. **Responsive Design**: Maintains existing UI/UX patterns

## Usage

The allotment days are automatically loaded when:
1. User navigates to the "Allotment" tab
2. User changes the KLA selection dropdown

The data is filtered by the selected KLA ID (extracted from dropdown value like "15th KLA" → 15).

## Future Enhancements

1. Add PDF URL field to API response for actual document links
2. Implement session-based filtering
3. Add date range filtering
4. Implement minister-based filtering
5. Add export functionality for allotment days
6. Add search/filter capabilities within allotment days

## Testing

To test the integration:
1. Navigate to Questions page
2. Click on "Allotment of Days for Answering Questions" tab
3. Change KLA dropdown to see different allotment days
4. Verify loading states and data display
5. Check console for any errors

## Notes

- The API currently returns data for KLA 15
- PDF links are placeholder (using dummyPdf) until actual PDF URLs are added to API
- The component maintains backward compatibility with existing filter structure
