# Committee API Integration Summary

## Overview
Successfully integrated the Committees API into the Committee page to dynamically display committees grouped by category and show detailed committee information.

## API Endpoints

### 1. Get All Committees
```
GET https://klademo.cditproject.org/api/committees
```

**Response Structure:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "LIBRARY ADVISORY COMMITTEE",
      "category_group": "Advisory committee"
    }
  ]
}
```

### 2. Get Committee by ID
```
GET https://klademo.cditproject.org/api/committees/{id}
```

**Response Structure:**
```json
{
  "success": true,
  "data": {
    "committee": {
      "id": 3,
      "name": "BUSINESS ADVISORY COMMITTEE",
      "category": "Business Committee",
      "kla": "15th KLA",
      "chairperson": {
        "id": 202,
        "name": "A N Shamseer",
        "position": "Ex-Officio Chairperson",
        "image": "https://klademo.cditproject.org/images/user.svg",
        "constituency": null
      },
      "date_of_constitution": "2021-01-01",
      "duration_months": 30,
      "introduction": "...",
      "officers": [],
      "contact": {
        "phone": "0471-2512007",
        "email": "committee@niyamasabha.nic.in",
        "address": "Kerala Legislative Assembly, Thiruvananthapuram"
      }
    },
    "members": [...],
    "ex_officio_members": [],
    "subjects_selected": [],
    "bills_referred": [],
    "sittings": [],
    "schedules": [],
    "study_tours": [],
    "reports_presented": [],
    "press_releases": []
  }
}
```

## Implementation

### 1. Service Layer (`src/services/MasterService.js`)

Added two new service functions:

```javascript
export const fetchCommittees = async () => {
  const url = "https://klademo.cditproject.org/api/committees";
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await res.json();
  if (json?.success && Array.isArray(json.data)) return json.data;
  if (Array.isArray(json)) return json;
  throw new Error("Failed to load committees");
};

export const fetchCommitteeById = async (committeeId) => {
  const url = `https://klademo.cditproject.org/api/committees/${committeeId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await res.json();
  if (json?.success && json.data) return json.data;
  throw new Error("Failed to load committee details");
};
```

### 2. Configuration (`src/utils/config.js`)

Added endpoints to API configuration:

```javascript
COMMITTEES: `${DEMO_API_BASE_URL}/api/committees`,
COMMITTEE_BY_ID: (id) => `${DEMO_API_BASE_URL}/api/committees/${id}`,
```

### 3. CommitteeSidebar Component (`src/components/memberProfile/Committe-sidebar.jsx`)

**Key Changes:**
- Fetches committees from API on component mount
- Groups committees by `category_group` field
- Dynamically generates accordion items based on API data
- Shows loading spinner while fetching
- Passes full committee object to parent when selected

**Features:**
- Dynamic committee list from API
- Automatic grouping by category
- Loading states
- Error handling
- Click handler passes committee object with ID

### 4. Committee-page Component (`src/components/memberProfile/Committee-page.jsx`)

**Key Changes:**
- Added `selectedCommittee` state to store the selected committee object
- Updated `onSelectCommittee` handler to receive and store committee object
- Passes `selectedCommittee` prop to `CommitteeContent` component

**State Management:**
```javascript
const [selectedCommittee, setSelectedCommittee] = useState(null);

const handleSelectCommittee = (committee) => {
  setSelectedCommittee(committee);
  setShowCommitteeContent(true);
  setActiveTab(null);
};
```

### 5. CommitteeContent Component (Ready for Integration)

The component now receives a `committee` prop containing:
- Committee ID for fetching detailed data
- Committee name
- Category information

**Next Steps for CommitteeContent:**
```javascript
export default function CommitteeContent({ committee }) {
  const [committeeDetails, setCommitteeDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCommitteeDetails = async () => {
      if (!committee?.id) return;
      
      setLoading(true);
      try {
        const data = await fetchCommitteeById(committee.id);
        setCommitteeDetails(data);
      } catch (err) {
        console.error("Failed to load committee details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCommitteeDetails();
  }, [committee?.id]);

  // Use committeeDetails to populate all tabs
}
```

## Features Implemented

1. **Dynamic Committee List**: Committees are fetched from API and grouped by category
2. **Category Grouping**: Automatic grouping by `category_group` field
3. **Loading States**: Shows spinner while fetching data
4. **Error Handling**: Gracefully handles API failures
5. **Committee Selection**: Clicking a committee passes full object to parent
6. **Responsive UI**: Maintains existing accordion UI/UX

## Committee Categories

The API returns committees grouped into these categories:
- Advisory committee
- Business Committee
- Others
- Subject committees
- Financial committees
- Welfare committees
- Adhoc Committee
- Select Committee
- Expert Committees

## Data Flow

1. User opens Committee page
2. CommitteeSidebar fetches all committees from API
3. Committees are grouped by `category_group`
4. User clicks on a committee in sidebar
5. Committee object (with ID) is passed to Committee-page
6. Committee-page shows CommitteeContent with selected committee
7. CommitteeContent can fetch detailed data using committee ID

## Next Steps

1. **Update CommitteeContent Component**:
   - Fetch detailed committee data using `fetchCommitteeById(committee.id)`
   - Display chairperson information
   - Show members list
   - Display ex-officio members
   - Show subjects selected
   - Display bills referred
   - Show sittings and schedules
   - Display study tours
   - Show reports presented
   - Display press releases

2. **Add Filtering**:
   - Filter committees by KLA
   - Search committees by name
   - Filter by category

3. **Add Committee Reports Integration**:
   - Fetch and display committee reports
   - Link to PDF documents

4. **Add Committee Schedules Integration**:
   - Fetch and display committee meeting schedules
   - Show upcoming meetings

## Testing

To test the integration:
1. Navigate to Committee page
2. Verify committees load in sidebar grouped by category
3. Click on a committee name
4. Verify CommitteeContent component receives committee data
5. Check browser console for any errors
6. Test with different KLA selections (when implemented)

## Notes

- The API returns comprehensive committee data including members, schedules, reports, etc.
- The sidebar now uses real data instead of hardcoded values
- Committee selection passes the full committee object for detailed view
- The integration maintains backward compatibility with existing UI/UX
- Loading states provide better user experience during API calls
