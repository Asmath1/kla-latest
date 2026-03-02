# Committee API Documentation

This document describes the JSON structure for Committee-related APIs based on the Committee page implementation.

## API Endpoints

### 1. Get Committee Details
**Endpoint:** `/api/committee/{committee_id}`  
**Method:** GET  
**Sample Response:** See `committee-api-sample.json`

Returns complete details about a specific committee including:
- Basic committee information
- Chairperson details
- Officers and contact information
- Ex-officio members (Ministers and other members)
- Regular members
- Subjects selected
- Bills referred
- Sittings
- Schedules
- Study tours
- Reports presented
- Press releases

### 2. Committee Membership Search
**Endpoint:** `/api/committee/membership-search`  
**Method:** GET  
**Query Parameters:**
- `kla` - KLA number (e.g., "15th")
- `member` - Member name (optional)
- `chairman` - Chairman name (optional)
- `committee_category` - Committee category (optional)
- `order_by` - Sort order (optional)

**Sample Response:** See `committee-membership-search-sample.json`

Returns a list of committee members with their committee assignments and status.

### 3. Committee Reports
**Endpoint:** `/api/committee/reports`  
**Method:** GET  
**Query Parameters:**
- `kla` - KLA number (e.g., "15th")
- `report_type` - Type of report (e.g., "Audit", "General Report", "Other")
- `committee_category` - Committee category (optional)
- `report_title` - Search by report title (optional)

**Sample Response:** See `committee-reports-sample.json`

Returns a list of committee reports with links to PDF documents.

### 4. Committee Schedules
**Endpoint:** `/api/committee/schedules`  
**Method:** GET  
**Query Parameters:**
- `committee_category` - Committee category (optional)
- `committee_name` - Committee name (optional)

**Sample Response:** See `committee-schedules-sample.json`

Returns upcoming committee meetings and sittings.

## Data Structure Details

### Committee Object
```json
{
  "id": 1,
  "name": "COMMITTEE ON ENVIRONMENT",
  "category": "Advisory Committee",
  "kla": "14th KLA",
  "chairperson": {
    "id": 198,
    "name": "Mullakkara Retnakaran",
    "image": "/images/chairperson.jpg",
    "constituency": "Kollam"
  },
  "date_of_constitution": "2019-01-25",
  "duration_months": 30,
  "introduction": "Committee description...",
  "officers": [...],
  "contact": {...}
}
```

### Member Object
```json
{
  "id": 1,
  "name": "J Chinchurani",
  "image": "/images/member.jpg",
  "status": "Member",
  "constituency": "Kalpetta",
  "party": "INC"
}
```

### Subject Selected Object
```json
{
  "id": 1,
  "subject_name": "Subject in Malayalam",
  "department": "Environment",
  "remarks": "",
  "document_url": "/pdf1.pdf"
}
```

### Bill Referred Object
```json
{
  "id": 1,
  "bill_no": "5421",
  "bill_title": "Bill title in Malayalam",
  "bill_intro_date": "2025-12-12",
  "remarks": ""
}
```

### Sitting Object
```json
{
  "id": 1,
  "date": "2024-12-13",
  "subject": "Subject in Malayalam",
  "remarks": ""
}
```

### Schedule Object
```json
{
  "id": 1,
  "type_of_meeting": "General Meeting",
  "date_from": "2025-12-24",
  "date_to": "2025-12-28",
  "venue": "Chairman Suit, Kerala House, New Delhi."
}
```

### Study Tour Object
```json
{
  "id": 1,
  "tour_subject": "Tour subject in Malayalam",
  "date_from": "2024-12-13",
  "date_to": "2024-12-18",
  "member_count": 10,
  "places": "Trivandrum"
}
```

### Report Presented Object
```json
{
  "id": 1,
  "report_no": "213",
  "subject": "Report subject in Malayalam",
  "date_presented": "2024-12-18",
  "report_type": "Testword"
}
```

### Press Release Object
```json
{
  "id": 1,
  "file_name": "Press release title in Malayalam",
  "date": "2024-12-18",
  "document_url": "/pdff.pdf"
}
```

## Component Mapping

### Committee-page.jsx Tabs
1. **Introduction** - Uses `committee.introduction`
2. **Constitution of Committees** - Static content
3. **Committee membership search** - Uses `/api/committee/membership-search`
4. **Committee-reports** - Uses `/api/committee/reports`
5. **Schedules** - Uses `/api/committee/schedules`

### Committe-content.jsx Tabs
1. **Introduction** - Uses `committee` object
2. **Ex-Officio** - Uses `ex_officio` object
3. **Members** - Uses `members` array
4. **Subject Selected** - Uses `subjects_selected` array
5. **Bill Referred** - Uses `bills_referred` array
6. **Sitting** - Uses `sittings` array
7. **Schedules** - Uses `schedules` array
8. **Study Tours** - Uses `study_tours` array
9. **Reports Presented** - Uses `reports_presented` array
10. **Press Release** - Uses `press_releases` array

## Notes

1. All dates should be in ISO format (YYYY-MM-DD)
2. Image URLs should be relative paths or full URLs
3. Document URLs should point to PDF files
4. Malayalam text should be properly encoded in UTF-8
5. The `status` field for members can be "Member", "Chairperson", or "Ex-Officio"
6. Committee categories include: "Advisory Committee", "Standing Committee", "Ad-hoc Committee", etc.

## Usage Example

```javascript
// Fetch committee details
const response = await fetch('/api/committee/1');
const data = await response.json();

// Access committee information
console.log(data.data.committee.name);
console.log(data.data.committee.chairperson.name);
console.log(data.data.members);

// Fetch committee membership search
const searchResponse = await fetch('/api/committee/membership-search?kla=15th');
const searchData = await searchResponse.json();
console.log(searchData.data.members);
```
