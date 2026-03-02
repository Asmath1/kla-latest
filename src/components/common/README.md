# Common Components

This directory contains reusable components that can be used across different pages in the application.

## Components

### 1. ExportButton

A reusable export dropdown button component with customizable options.

**Props:**
- `className` (string): CSS classes for the container div (default: "col-lg-2 col-md-6 mb-2")
- `buttonText` (string): Text to display on the button (default: "Export")
- `exportOptions` (array): Array of export format options (default: ["PDF", "XLS"])
- `onExport` (function): Callback function when export option is selected
- `buttonClassName` (string): CSS classes for the button (default: "btn btn-secondary dropdown-toggle mb--10 mt--1 w--100")

**Usage:**
```jsx
import { ExportButton } from '../common';

// Basic usage
<ExportButton />

// Customized usage
<ExportButton 
  className="col-lg-1 col-md-2 w-100"
  buttonText="Download"
  exportOptions={["PDF", "XLS", "CSV"]}
  onExport={(format) => console.log(`Exporting as ${format}`)}
  buttonClassName="btn btn-primary dropdown-toggle"
/>
```

### 2. CategoriesNav

A reusable categories navigation component.

**Props:**
- `categories` (array): Array of category objects with name, href, and active properties
- `className` (string): CSS classes for the section (default: "categories_list_section overflow-hidden")

**Usage:**
```jsx
import { CategoriesNav } from '../common';

// Basic usage with default categories
<CategoriesNav />

// Custom categories
const customCategories = [
  { name: "Home", href: "/", active: true },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

<CategoriesNav categories={customCategories} />
```

### 3. BreadcrumbNav

A reusable breadcrumb navigation component.

**Props:**
- `breadcrumbs` (array): Array of breadcrumb objects with name and href properties
- `className` (string): CSS classes for the section (default: "breadcumb-section")

**Usage:**
```jsx
import { BreadcrumbNav } from '../common';

// Basic usage with default breadcrumbs
<BreadcrumbNav />

// Custom breadcrumbs
const customBreadcrumbs = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Users", href: "/users" },
  { name: "Profile", href: "/users/profile" }
];

<BreadcrumbNav breadcrumbs={customBreadcrumbs} />
```

### 4. SessionCalendar

A reusable calendar component with customizable date ranges, meeting dots, and dimensions.

**Props:**
- `selectedDate` (Date): Currently selected date
- `onDateChange` (function): Callback when date is selected
- `startDate` (string): Start date in "DD-MM-YYYY" format (default: "05-07-2025")
- `endDate` (string): End date in "DD-MM-YYYY" format (default: "05-08-2025")
- `meetingDates` (array): Array of meeting dates to show dots (default: [])
- `allowedDates` (array): Array of allowed/active dates (default: [])
- `className` (string): CSS classes for the calendar (default: "w-100")
- `calendarClassName` (string): Additional CSS classes (default: "session-calendar-large")
- `height` (string): Calendar height (default: "auto")
- `width` (string): Calendar width (default: "100%")
- `showDateRange` (boolean): Whether to show date range header (default: true)
- `dateRangeTitle` (string): Title for the date range section (default: "Section date In between")

**Usage:**
```jsx
import { SessionCalendar } from '../common';

// Basic usage
<SessionCalendar 
  selectedDate={selectedDate}
  onDateChange={handleDateChange}
/>

// Customized usage
<SessionCalendar 
  selectedDate={selectedDate}
  onDateChange={handleDateChange}
  startDate="01-01-2025"
  endDate="31-12-2025"
  meetingDates={["2025-01-15", "2025-02-20"]}
  allowedDates={["2025-01-10", "2025-01-15", "2025-01-20"]}
  height="500px"
  width="90%"
  dateRangeTitle="Custom Date Range"
/>
```

### 5. Filter

A reusable, registry-driven filter component. You choose filters by key and receive a consolidated values map via a single callback.

Built-in filter keys: `KLA`, `SESSION`, `SESSION_TYPE`, `MEMBER`, `MINISTER`, `DEPARTMENT`, `CATEGORY`, `QUESTION_TYPE`, `DISTRICT`, `CONSTITUENCY`, `PARTY`, `SUBJECT`, `MUNICIPALITY`, `DATE`, `SEARCH`.

**Props:**
- `filterKeys` (array): Array of filter keys to render (e.g., `["KLA", "SESSION", "DATE"]`).
- `onFiltersChange` (function): Callback with an object of current values keyed by filter key.
- `overrides` (object): Per-key overrides for `label`, `options`, `multiple`, etc.
- Styling: `className`, `filterClassName`, `labelClassName`, `selectClassName`, `multiselectClassName`, `selectPickerClassName`.

**Usage:**
```jsx
import { Filter } from '../common';

// Basic usage with built-in keys
<Filter 
  filterKeys={["KLA", "SESSION", "DATE"]}
  onFiltersChange={(values) => console.log(values)}
/>

// With overrides
<Filter 
  filterKeys={["KLA", "SESSION_TYPE", "SEARCH"]}
  overrides={{
    SESSION_TYPE: { options: ["Morning Session", "Evening Session"] },
    SEARCH: { placeholder: "Search questions, members..." }
  }}
  onFiltersChange={(values) => {
    // values => { KLA: '15th KLA', SESSION_TYPE: 'Morning Session', SEARCH: 'water' }
  }}
/>
```

### 6. Pagination

A reusable pagination component with customizable pagination logic and styling.

**Props:**
- `currentPage` (number): Current active page (default: 1)
- `totalPages` (number): Total number of pages (default: 1)
- `onPageChange` (function): Callback when page changes
- `itemsPerPage` (number): Number of items per page (default: 10)
- `totalItems` (number): Total number of items (default: 0)
- `showItemsPerPage` (boolean): Whether to show items per page info (default: true)
- `showTotalItems` (boolean): Whether to show total items info (default: true)
- `maxPagesToShow` (number): Maximum pages to show in pagination (default: 5)
- `className` (string): CSS classes for pagination wrapper (default: "pagination-wrapper")
- `paginationClassName` (string): CSS classes for pagination list (default: "pagination")
- `pageItemClassName` (string): CSS classes for page items (default: "page-item")
- `pageLinkClassName` (string): CSS classes for page links (default: "page-link")
- `activeClassName` (string): CSS classes for active page (default: "active")
- `disabledClassName` (string): CSS classes for disabled items (default: "disabled")
- `previousLabel` (string): Text for previous button (default: "Previous")
- `nextLabel` (string): Text for next button (default: "Next")
- `showFirstLast` (boolean): Whether to show first/last buttons (default: true)
- `firstLabel` (string): Text for first button (default: "First")
- `lastLabel` (string): Text for last button (default: "Last")

**Usage:**
```jsx
import { Pagination } from '../common';

// Basic usage
<Pagination 
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  totalItems={totalItems}
/>

// Customized usage
<Pagination 
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  totalItems={totalItems}
  itemsPerPage={20}
  maxPagesToShow={7}
  showFirstLast={false}
  previousLabel="←"
  nextLabel="→"
/>
```

### 7. SectionTitle

A reusable section title component that matches the existing title structure.

**Props:**
- `title` (string): Main title text
- `subtitle` (string): Optional subtitle text
- `className` (string): CSS classes for the title row container (default: "row align-items-center wow fadeInUp p-0")
- `titleClass` (string): CSS classes for the title wrapper div (default: "main-title mb10")
- `titleTextClass` (string): CSS classes for the main title h2 element (default: "title")

**Usage:**
```jsx
import { SectionTitle } from '../common';

// Basic usage - matches existing title structure
<SectionTitle title="Page Title" />

// With subtitle
<SectionTitle 
  title="Page Title" 
  subtitle="This is a subtitle description"
/>

// Customized styling
<SectionTitle 
  title="Custom Title"
  className="custom-title-row"
  titleClass="custom-title-wrapper"
  titleTextClass="custom-title-text"
/>
```

## Importing

You can import all components from the common index file:

```jsx
import { 
  ExportButton, 
  CategoriesNav, 
  BreadcrumbNav, 
  SessionCalendar,
  Filter,
  Pagination,
  SectionTitle
} from '../common';
```

Or import individual components:

```jsx
import ExportButton from '../common/ExportButton';
import SessionCalendar from '../common/Calendar';
import Filter from '../common/Filter';
import Pagination from '../common/Pagination';
```

## Styling

These components use the existing CSS classes from your application. Make sure the following CSS classes are available:

- `.mydrop.dropdown`
- `.dropdown-menu`
- `.dropdown-item`
- `.categories_list_section`
- `.listings_category_nav_list_menu`
- `.breadcumb-section`
- `.breadcumb-style1`
- `.breadcumb-list`
- `.date-in-range`
- `.date-allowed-bg`
- `.date-selected`
- `.meeting-dot`
- `.pagination`
- `.page-item`
- `.page-link`
- `.active`
- `.disabled`
