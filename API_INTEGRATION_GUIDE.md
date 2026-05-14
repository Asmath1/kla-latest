# KLA Members & Ministers API Integration Guide

## Overview
Successfully integrated the API endpoint `https://api.niyamasabha.in/api/kla-sessions-with-members` to fetch members and ministers data with advanced filtering capabilities.

## API Endpoint Details

### URL
```
POST https://api.niyamasabha.in/api/kla-sessions-with-members
```

### Request Format
```javascript
// Body: form-encoded
{
  kla_id: number // e.g., 15 for 15th KLA, 14 for 14th KLA
}
```

### Response Format
```json
{
  "kla_id": 14,
  "kla_name": "14th KLA",
  "sessions": [
    {
      "session_no": 1,
      "startdate": "2016-06-24",
      "enddate": "2016-07-19",
      "sitting_dates": [...]
    }
  ],
  "members": [
    {
      "id": 241,
      "kla_id": 14,
      "member_id": 199,
      "name": "Member Name",
      "constituency": {
        "entitle": "English Name",
        "maltitle": "Malayalam Name"
      }
    }
  ],
  "ministers": [
    {
      "member_id": 87,
      "member_name": "Minister Name",
      "kla_id": 14
    }
  ]
}
```

## Files Modified

### 1. src/services/MasterService.js
**New Functions Added:**

#### `fetchKlaSessionsWithMembers(klaId = 15)`
Main API function to fetch sessions with members and ministers data.

```javascript
import { fetchKlaSessionsWithMembers } from "../../services/MasterService";

const data = await fetchKlaSessionsWithMembers(14);
// Returns: { kla_id, kla_name, sessions, members, ministers }
```

#### `extractMembersFromSessionsData(sessionsData)`
Extract members array from API response.

```javascript
const members = extractMembersFromSessionsData(sessionsData);
```

#### `extractMinistersFromSessionsData(sessionsData)`
Extract ministers array from API response.

```javascript
const ministers = extractMinistersFromSessionsData(sessionsData);
```

#### `getUniqueMemberConstituencies(members)`
Get all unique constituencies from members list.

```javascript
const constituencies = getUniqueMemberConstituencies(members);
// Returns: ['Ernakulam', 'Thrissur', ...]
```

#### `filterMembers(members, filters = {})`
Filter members by various criteria.

```javascript
const filtered = filterMembers(members, {
  constituency: "Ernakulam",
  name: "John"
});
```

#### `filterMinisters(ministers, members, filters = {})`
Filter ministers with member details fallback.

```javascript
const minFiltered = filterMinisters(ministers, members, {
  name: "search"
});
```

---

### 2. src/services/MemberService.js
**New Functions Added:**

#### `fetchKlaMembersAndMinisters(klaId = 15)`
Unified function to fetch members and ministers together.

```javascript
import { fetchKlaMembersAndMinisters } from "../../services/MemberService";

const data = await fetchKlaMembersAndMinisters(15);
// Returns: { members, ministers, sessions, kla_id, kla_name }
```

#### `getConstituencies(members = [])`
Get unique constituencies from members.

```javascript
const constituencies = getConstituencies(members);
```

#### `getMembersWhoAreMinisters(members = [], ministers = [])`
Get members who are also ministers.

```javascript
const ministerMembers = getMembersWhoAreMinisters(members, ministers);
```

#### `filterMembersData(members = [], filters = {})`
Advanced member filtering with multiple criteria.

```javascript
const filtered = filterMembersData(members, {
  constituency: "Ernakulam",
  name: "John",
  isMinister: true,
  ministerIds: [87, 88, 89]
});
```

#### `filterMinistersData(ministers = [], filters = {})`
Filter ministers by name and other criteria.

```javascript
const minFiltered = filterMinistersData(ministers, {
  name: "search"
});
```

---

### 3. src/components/memberProfile/Filter.jsx
**Changes Made:**

1. **Added Import:**
```javascript
import { fetchKlaSessionsWithMembers } from "../../services/MasterService";
```

2. **Updated State:**
- Added `isMinister: false` to localFilters
- Added `ministers: []` to options state

3. **Enhanced API Fetch:**
- Now fetches from new API `fetchKlaSessionsWithMembers`
- Automatically falls back to old API if new one fails
- Extracts ministers data for UI display

4. **New UI Element:**
- Added "Show Ministers Only" checkbox filter in the filter sidebar

5. **Filter Application:**
- Applies `isMinister` filter when checkbox is selected

---

### 4. src/components/memberProfile/Member-list.jsx
**Changes Made:**

1. **Added Import:**
```javascript
import { fetchKlaSessionsWithMembers } from "../../services/MasterService";
```

2. **New State:**
```javascript
const [ministers, setMinisters] = useState([]);
const [filters, setFilters] = useState({
  // ... existing filters
  isMinister: false, // NEW
});
```

3. **Updated loadMembers Function:**
- Now fetches from new API with members AND ministers data
- Falls back to old API if new one fails
- Stores ministers data for filtering

4. **Enhanced applyFilters Function:**
- Added isMinister filtering logic
- Compares member_id with ministers member_id
- Only displays members who are in ministers list when filter is active

5. **Updated Dependencies:**
- Added `ministers` to useCallback dependencies

---

## Implementation Examples

### Example 1: Show Only Ministers
```javascript
// In Filter component
const filtered = members.filter(m => 
  ministers.some(min => min.member_id === m.member_id)
);
```

### Example 2: Get Minister Details
```javascript
const ministerDetails = {
  members: membersData,
  ministers: ministersData,
  ministersMap: new Map(
    ministersData.map(min => [min.member_id, min])
  )
};

// Later, get minister details for a member
const ministerInfo = ministerDetails.ministersMap.get(member.member_id);
if (ministerInfo) {
  console.log(`${memberInfo.name} is a minister`);
}
```

### Example 3: Filter by Constituency and Minister Status
```javascript
const filtered = filterMembers(members, {
  constituency: "Ernakulam"
});

const ministers_ = filtered.filter(m => 
  ministers.some(min => min.member_id === m.member_id)
);
```

### Example 4: Export Members with Minister Status
```javascript
const exportData = members.map(m => ({
  ...m,
  is_minister: ministers.some(min => min.member_id === m.member_id),
  minister_name: ministers.find(min => min.member_id === m.member_id)?.member_name
}));
```

---

## Testing the Integration

### 1. Test Filter API
```javascript
// In browser console
fetch('https://api.niyamasabha.in/api/kla-sessions-with-members', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'kla_id=15'
})
.then(r => r.json())
.then(data => console.log(data))
```

### 2. Test Component Integration
1. Navigate to Member List page
2. Click "All Filter" button
3. Look for "Show Ministers Only" checkbox
4. Check the box and verify only ministers are displayed
5. Uncheck to see all members again

### 3. Console Logs
The implementation includes console logs for debugging:
```
=== API DATA RECEIVED ===
KLA ID: 15
Active Tab: pills-profile2
Raw API response type: object
Is Array: true
Members array length: 120
Ministers array length: 22
```

---

## API Error Handling

### Fallback Mechanism
If the new API fails, the system automatically falls back to the old API:

```javascript
try {
  // Try new API
  const sessionsData = await fetchKlaSessionsWithMembers(selectedKla);
  data = sessionsData.members || [];
  ministersData = sessionsData.ministers || [];
} catch (newApiErr) {
  // Fallback to old API
  data = await fetchKlaMembers(selectedKla);
  ministersData = []; // No ministers data available
}
```

---

## Data Structure Reference

### Member Object
```json
{
  "id": 241,
  "kla_id": 14,
  "member_id": 199,
  "name": "Ramachandran Nair K K",
  "constituency": {
    "entitle": "Chengannur",
    "maltitle": "ചെങ്ങന്നൂർ"
  },
  "member": {
    "name": "...",
    "gender": 1,
    "dob": "YYYY-MM-DD"
  },
  "party": {
    "entitle": "Party Name"
  }
}
```

### Minister Object
```json
{
  "member_id": 87,
  "member_name": "Pinarayi Vijayan",
  "kla_id": 14
}
```

---

## Performance Considerations

1. **Caching:** Consider caching API responses to reduce API calls
2. **Pagination:** The UI paginates members (24 per page) to handle large lists
3. **Filtering:** Client-side filtering is fast with in-memory operations
4. **Memory:** Ministers array is relatively small compared to members

---

## Future Enhancements

1. **Minister Modal:** Create a dedicated modal showing minister details
2. **Advanced Export:** Export members with minister status and additional data
3. **Minister Search:** Direct search for ministers with their portfolios
4. **Historical Data:** Track minister changes over different sessions
5. **Analytics:** Dashboard showing minister statistics by session

---

## Support & Debugging

### Common Issues

**Issue:** "Show Ministers Only" checkbox not working
**Solution:** Verify ministers data is being fetched. Check console logs.

**Issue:** Old API being used instead of new API
**Solution:** Verify API endpoint is accessible. Check network tab in dev tools.

**Issue:** No ministers data in filter
**Solution:** Ensure API response includes ministers array. Check API documentation.

---

## API Response Sample (14th KLA)

```json
{
  "kla_id": 14,
  "kla_name": "14th KLA",
  "sessions": [
    {
      "session_no": 1,
      "startdate": "2016-06-24",
      "enddate": "2016-07-19",
      "sitting_dates": ["2016-06-02", "2016-06-03", ...]
    }
  ],
  "members": [
    {
      "id": 241,
      "kla_id": 14,
      "member_id": 199,
      "name": "Ramachandran Nair K K",
      "constituency": {
        "entitle": "Chengannur",
        "maltitle": "ചെങ്ങന്നൂർ"
      }
    },
    ...
  ],
  "ministers": [
    {
      "member_id": 87,
      "member_name": "Pinarayi Vijayan",
      "kla_id": 14
    },
    ...
  ]
}
```

---

## Quick Reference

| Function | File | Purpose |
|----------|------|---------|
| `fetchKlaSessionsWithMembers` | MasterService | Fetch members & ministers from API |
| `fetchKlaMembersAndMinisters` | MemberService | Unified fetch wrapper |
| `filterMembers` | MasterService | Filter members by criteria |
| `filterMinisters` | MasterService | Filter ministers |
| `getConstituencies` | MemberService | Extract constituencies |
| `getMembersWhoAreMinisters` | MemberService | Get minister members |

---

**Last Updated:** May 14, 2026  
**Status:** ✅ Implementation Complete  
**Testing:** Ready for QA
