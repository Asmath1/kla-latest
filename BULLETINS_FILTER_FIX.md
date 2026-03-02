# Bulletins Filter Fix

## Problem 1: Filter Not Triggering Updates
The KLA filter was not triggering data updates when changed. The filter value was changing in the component state but the API was not being called with the new value.

### Root Cause
The Filter component expects the prop name `onFiltersChange` but we were using `onChange`. This meant the callback function was never being called when filters changed.

### Solution
Changed both Filter component instances from:
```jsx
onChange={handleFilterChange}
```

To:
```jsx
onFiltersChange={handleFilterChange}
```

## Problem 2: Infinite Loop (Maximum Update Depth Exceeded)
After fixing the prop name, the component entered an infinite loop causing React to throw "Maximum update depth exceeded" error.

### Root Cause
The Filter component's `useEffect` calls `onFiltersChange(values)` whenever values change, and includes `onFiltersChange` in its dependency array. Since `handleFilterChange` was recreated on every render (because it depended on `filters`), it caused an infinite loop:
1. Filter changes → calls `onFiltersChange`
2. Updates `filters` state → component re-renders
3. `handleFilterChange` recreated (new reference)
4. Filter's useEffect sees new `onFiltersChange` → calls it again
5. Loop continues infinitely

### Solution
Wrapped `handleFilterChange` in `useCallback` with an empty dependency array and used functional setState:

```javascript
const handleFilterChange = useCallback((newFilters) => {
  setFilters(prevFilters => {
    // Use prevFilters instead of filters from closure
    const mappedFilters = {
      kla_id: newFilters.KLA !== undefined ? newFilters.KLA : prevFilters.kla_id,
      // ... other mappings using prevFilters
    };
    return mappedFilters;
  });
}, []); // Empty deps - function is stable
```

This ensures:
- `handleFilterChange` has a stable reference (doesn't change between renders)
- No dependency on `filters` state
- Uses `prevFilters` from functional setState to access current values

## Problem 3: Filter Resetting to Default After Data Loads
After the API successfully loaded data with the user's selected KLA ID, the Filter component would reset back to the default value (15), overriding the user's selection.

### Root Cause
The Filter component manages its own internal state and calls `onFiltersChange` in a `useEffect` whenever its internal `values` state changes. When the parent component re-renders after API data loads, or when the Filter's `masterOverrides` updates (after fetching KLA list), the Filter component may reinitialize its state or trigger its `useEffect` again, calling `onFiltersChange` with default values and overriding the user's selection.

The logs showed:
1. User selects KLA=1 → API called with kla_id=1 ✓
2. Filter component reinitializes → calls `onFiltersChange` with KLA=15 (default)
3. This overrides the user's selection → API called with kla_id=15 ✗

### Solution
Implemented a multi-layered approach:

1. **Added `overrides` prop** to both Filter components with `KLA: { defaultValue: 15 }`:
```jsx
<Filter
  filterKeys={["KLA","YEAR", "SESSION_TYPE", "SEARCH_NUM"]}
  onFiltersChange={handleFilterChange}
  overrides={{
    KLA: { defaultValue: 15 }
  }}
/>
```

2. **Added `userHasInteracted` flag** to track when the user has made a filter selection.

3. **Added logic to ignore filter resets** after user interaction:
```javascript
// If user has already interacted and the filter is trying to reset to default (15),
// but we have a different value, ignore it (this is Filter component reinitializing)
if (userHasInteracted && 
    mappedFilters.kla_id === 15 && 
    prevFilters.kla_id !== 15 &&
    newFilters.KLA === 15 &&
    !newFilters.YEAR && 
    !newFilters.SESSION_TYPE && 
    !newFilters.SEARCH &&
    !newFilters.SEARCH_NUM &&
    !newFilters.SEARCH_BULLETIN) {
  console.log("Ignoring filter reset to default after user interaction");
  return prevFilters;
}
```

This ensures that:
- The Filter component initializes with KLA=15 as the default
- Once the user changes any filter, we track that interaction
- If the Filter tries to reset to default values after the user has interacted, we ignore it
- The user's selection is preserved even when the Filter component reinitializes

## Additional Improvements

### 1. Enhanced Logging
Added detailed console logging to track:
- Raw filter values received
- Mapped filter values for API
- Previous filter state
- Whether it's an initial load
- API URL being called
- Bulletin counts returned

### 2. Better Undefined Handling
Changed from using `||` operator to explicit `!== undefined` checks:
```javascript
kla_id: newFilters.KLA !== undefined ? newFilters.KLA : prevFilters.kla_id
```

This ensures that falsy values (like 0) are properly handled.

### 3. Change Detection
Added logic to detect if filters actually changed before updating state:
```javascript
const hasChanged = 
  mappedFilters.kla_id !== prevFilters.kla_id ||
  mappedFilters.year !== prevFilters.year ||
  mappedFilters.session_type !== prevFilters.session_type ||
  mappedFilters.search !== prevFilters.search;

if (!hasChanged) {
  console.log("No change detected, keeping previous filters");
  return prevFilters;
}
```

This prevents unnecessary state updates and API calls.

## Testing
To verify the fix works:
1. Open browser console
2. Change the KLA dropdown to a different value (e.g., 14)
3. You should see:
   - "Filter changed - Raw values:" with the new KLA value
   - "Mapped filters for API:" showing the updated kla_id
   - "=== FETCHING BULLETINS ===" with the new API URL
   - New bulletin data loaded
   - The filter dropdown stays on your selected value (doesn't reset to 15)
4. No infinite loop or "Maximum update depth exceeded" error
5. The filter value persists after data loads

## Files Modified
- `src/components/business/Bulletins.jsx`
  - Added `useCallback` import
  - Fixed both Filter component prop names (Part 1 and Part 2)
  - Wrapped `handleFilterChange` in `useCallback` with `userHasInteracted` dependency
  - Used functional setState to avoid closure dependencies
  - Enhanced logging throughout
  - Added detailed API fetch logging
  - Added `userHasInteracted` state flag to track user interactions
  - Added `overrides` prop to both Filter components with `KLA: { defaultValue: 15 }`
  - Added change detection to prevent unnecessary updates
  - Added logic to ignore filter resets to default after user has interacted
