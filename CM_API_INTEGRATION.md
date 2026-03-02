# Chief Ministers API Integration

## Changes Made

### 1. API Configuration
- Added `CHIEF_MINISTERS` endpoint to `src/api/endpoints.js`
- Added `CHIEF_MINISTERS` endpoint to `src/utils/config.js` pointing to `${DEMO_API_BASE_URL}/api/chief_ministers`

### 2. API Service
- Created `fetchChiefMinisters()` function in `src/api/services/all.service.js` to fetch chief ministers data

### 3. Component Updates (`src/components/parlamentory/CM.jsx`)
- Imported `fetchChiefMinisters` service
- Added state management:
  - `loading`: tracks loading state
  - `currentCM`: stores the incumbent Chief Minister
  - `formerCMs`: stores all Chief Ministers (deduplicated)
- Fetches data on component mount
- Identifies current CM by checking for "Incumbent" in end_date or period
- Removes duplicate entries by creating unique key from name + period
- Displays loading state while fetching data
- Uses API data for:
  - Current CM's photo in profile section
  - All Chief Ministers in "Chief Ministers since 1957" tab
  - Period/tenure information

## API Response Structure
```json
[
  {
    "id": 1,
    "name": "SARI. E.M.S. NAMBOODIRIPAD",
    "period": "April 5, 1957 - July 31, 1959",
    "start_date": "April 5, 1957",
    "end_date": "July 31, 1959",
    "photo_filename": "cm_001.jpg",
    "photo_url": "http://niyamasabha.nic.in/images/Ems.jpg",
    "local_photo_url": "https://klademo.cditproject.org/uploads/chief_ministers/cm_001.jpg",
    "scraped_at": "2026-02-20 12:06:39"
  }
]
```

## Features
- Automatically identifies current Chief Minister (Incumbent)
- Deduplicates Chief Ministers by name and period
- Displays all historical Chief Ministers with photos
- Uses local_photo_url as primary image source with fallback to photo_url
- Shows period/tenure for each Chief Minister
- Loading state for better UX
- Error handling with fallback images

## Notes
- The Profile tab still uses hardcoded detailed information (personal details, qualifications, etc.) as the API only provides basic info (name, period, photo)
- The API contains duplicate entries which are filtered out using name+period as unique key
- Current CM is identified by "Incumbent" in the end_date or period field
