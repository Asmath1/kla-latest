# Proceedings API Integration

## Changes Made

### 1. API Configuration
- Added `KLA_PROCEEDINGS` endpoint to `src/api/endpoints.js`
- Added `KLA_PROCEEDINGS` endpoint to `src/utils/config.js` pointing to `${DEMO_API_BASE_URL}/api/kla_proceedings`

### 2. API Service
- Created `fetchProceedings()` function in `src/api/services/all.service.js` to fetch proceedings data

### 3. Component Updates (`src/components/business/Proceedings.jsx`)
- Imported `fetchProceedings` service
- Added state management for API data:
  - `proceedingsData`: stores raw API response
  - `loading`: tracks loading state
- Replaced hardcoded data with dynamic API data
- Transformed API response into date-grouped structure:
  ```javascript
  {
    "2021-10-20": [
      { id, name, member, url },
      ...
    ],
    ...
  }
  ```
- Updated calendar to use dynamic dates from API
- Added loading state to event rendering
- Display member name alongside event details

## API Response Structure
```json
[
  {
    "id": 1,
    "proceedings_date": "2021-10-20",
    "kla_id": 15,
    "session_no": 3,
    "event": "Obituary References",
    "member": "Babu K",
    "subject": "Death due to unexpected rains",
    "pdf_link": "http://...",
    "created_at": "2026-02-21T07:41:47.000000Z"
  }
]
```

## Features
- Automatically groups proceedings by date
- Displays event name with subject
- Shows member name for each proceeding
- Handles missing PDF links with fallback
- Calendar dynamically adjusts to available dates
- Loading state for better UX
