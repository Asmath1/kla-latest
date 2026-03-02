# Bulletins Filter Perfect Fix

## Problem
The filter values (especially `kla_id`) were changing but reverting back to default values after loading. This was caused by:

1. Two separate Filter components (one per tab) that reinitialize independently
2. Filter component triggering `onFiltersChange` on every mount/remount
3. Filter state not being maintained across tab switches

## Solution Implemented

### 1. Added Filter Initialization Tracking
- Added `filterInitRef` using `useRef` to track filter initialization state
- This ref persists across re-renders and tab switches

### 2. Smart Filter Change Handler
```javascript
const handleFilterChange = useCallback((newFilters) => {
  // Skip the first initialization call from Filter component mount
  if (!filterInitRef.current) {
    filterInitRef.current = true;
    return; // Ignore first mount
  }
  
  // Only process actual user changes
  setFilters(prevFilters => {
    // Map and validate changes
    // Only update if values actually changed
  });
}, []);
```

### 3. Filter Component Keys
Added dynamic keys to Filter components to force proper reinitialization:
- Part 1: `key={part1-${filters.kla_id}-${filters.year}-${filters.session_type}}`
- Part 2: `key={part2-${filters.kla_id}-${filters.search}}`

### 4. Tab Change Handler
```javascript
onChange={(tabKey) => {
  console.log("Tab changed to:", tabKey);
  // Reset filter init ref when switching tabs
  filterInitRef.current = false;
}}
```

### 5. Dynamic Default Values
Changed Filter overrides to use current filter state:
```javascript
overrides={{
  KLA: { defaultValue: filters.kla_id }
}}
```

## How It Works

1. **Initial Load**: 
   - Filter component mounts and calls `onFiltersChange` with defaults
   - `filterInitRef.current` is false, so the call is ignored
   - Ref is set to true

2. **User Changes Filter**:
   - Filter component calls `onFiltersChange` with new values
   - `filterInitRef.current` is true, so changes are processed
   - State updates and API is called

3. **Tab Switch**:
   - `onChange` handler resets `filterInitRef.current` to false
   - New Filter component mounts with current filter values as defaults
   - First mount call is ignored, preserving user's selections

4. **Data Loading**:
   - Filter values remain stable during API calls
   - No resets occur after data loads

## Benefits

- Filter values persist across tab switches
- No unwanted resets after data loading
- Clean separation between initialization and user interaction
- Maintains filter state globally across both tabs
- Proper handling of Filter component lifecycle

## Files Modified

- `src/components/business/Bulletins.jsx`
  - Added `useRef` import
  - Added `filterInitRef` 
  - Simplified `handleFilterChange` logic
  - Added dynamic keys to Filter components
  - Implemented tab change handler
  - Updated Filter overrides to use current state
