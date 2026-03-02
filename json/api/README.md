# API-Based JSON Structure

This folder contains API-ready JSON files for the Kerala Legislative Assembly website.

## Structure

Each JSON file represents a specific section/component of the website that would be fetched from a backend API.

### Files

1. **header.json** - Navigation header data
   - Logo configuration
   - Menu items with nested structure
   - Search and login settings
   - Mobile menu configuration

2. **banner.json** - Homepage banner carousel
   - Slide configuration (video/images)
   - Content (titles, descriptions in multiple languages)
   - Carousel settings

3. **latest.json** - Latest updates section
   - News items
   - Social media links
   - Seat map data

4. **calendar.json** - Calendar configuration
   - Month names (Malayalam/English)
   - Current year/month
   - Legend configuration

5. **calendar-events.json** - Calendar events data
   - Events organized by year/month/day
   - Event types (meetings, sessions, holidays)
   - Document links for each event

6. **districts.json** - Districts and representatives
   - All 14 Kerala districts
   - Representative information
   - Constituency details

7. **partners.json** - Partner websites
   - Partner logos and links
   - Display settings

8. **endpoints.json** - API endpoint documentation
   - All available API endpoints
   - Request/response formats

## Usage in React Components

### Example: Fetching Banner Data

```javascript
import { useState, useEffect } from 'react';

const BannerCarousel = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    fetch('https://api.niyamasabha.org/v1/sections/banner')
      .then(res => res.json())
      .then(data => setBannerData(data.banner_section));
  }, []);

  if (!bannerData) return <div>Loading...</div>;

  return (
    <div className="banner">
      <h1>{bannerData.content.title.malayalam}</h1>
      <p>{bannerData.content.description.malayalam}</p>
      {/* Render slides */}
    </div>
  );
};
```

### Example: Fetching Calendar Events

```javascript
const Calendar = () => {
  const [events, setEvents] = useState({});
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(2);

  useEffect(() => {
    fetch(`https://api.niyamasabha.org/v1/calendar/events?year=${year}&month=${month}`)
      .then(res => res.json())
      .then(data => setEvents(data.events[year][month]));
  }, [year, month]);

  return (
    <div className="calendar">
      {/* Render calendar with events */}
    </div>
  );
};
```

## Data Structure Benefits

1. **Separation of Concerns** - Each section has its own API endpoint
2. **Multilingual Support** - All text content has Malayalam and English versions
3. **Flexible** - Easy to add/modify content without changing code
4. **Scalable** - Can add more sections/features easily
5. **Cacheable** - Static sections can be cached for performance

## API Response Format

All API responses follow this structure:

```json
{
  "section": "section_name",
  "section_name": {
    // Section-specific data
  }
}
```

## Notes

- All image paths are relative to the public folder
- Dates are in ISO format (YYYY-MM-DD)
- IDs are unique within their respective sections
- Language codes: Malayalam (malayalam), English (english)
