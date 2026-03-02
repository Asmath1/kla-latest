# Export Functionality Migration Checklist

## Overview
This checklist provides step-by-step instructions for adding export functionality to each page in the project.

---

## ✅ COMPLETED PAGES

### 1. Member Contact ✓
- **File**: `src/components/memberProfile/MemberContact.jsx`
- **Status**: Complete
- **Formats**: PDF, Excel, CSV, XML, DOC
- **Data**: Member name, address, phone, email

### 2. Bulletins (Part 1 & 2) ✓
- **File**: `src/components/business/Bulletins.jsx`
- **Status**: Complete
- **Formats**: PDF, Excel, CSV
- **Data**: Bulletin number, title, session, PDF URL

### 3. Motions (Rule 130) ✓
- **File**: `src/components/business/Motions.jsx`
- **Status**: Partial (Rule 130 done, other sections pending)
- **Formats**: PDF, Excel, CSV
- **Data**: Serial no, date, mover, subject

---

## 🔄 PENDING PAGES

### Business Section

#### 4. Motions - Remaining Sections
**File**: `src/components/business/Motions.jsx`

**Sections to update**:
1. Motions Adopted by the House (Line ~203)
2. Discussion Under Rule 58 (Line ~254)
3. Discussion under Rule 205 B (Line ~298)
4. Statement as per Rule 300 (Line ~464)

**Implementation**:
```javascript
// Add before each table
<ExportButton
  data={motions.map(item => ({
    'Serial No': item.no,
    'Date': item.date,
    'Minister/Mover': item.minister || item.mover,
    'Subject': item.subject || item.statement
  }))}
  filename="motions-[section-name]"
  title="[Section Title]"
  exportOptions={["PDF", "Excel", "CSV"]}
  className=""
  buttonClassName="btn btn-secondary dropdown-toggle"
/>
```

---

#### 5. Resolutions
**File**: `src/components/business/Resolutions.jsx`

**Steps**:
1. Import ExportButton: `import { ExportButton } from '../common';`
2. Find the table rendering section
3. Prepare export data:
```javascript
const exportData = resolutions.map(r => ({
  'Resolution No': r.number,
  'Date': r.date,
  'Subject': r.subject,
  'Status': r.status,
  'Mover': r.mover
}));
```
4. Add button before table:
```jsx
<ExportButton
  data={exportData}
  filename="resolutions"
  title="Resolutions"
  exportOptions={["PDF", "Excel", "CSV"]}
/>
```

---

#### 6. Budget Speeches
**File**: `src/components/business/BudgetSpeeches.jsx`

**Steps**:
1. Import ExportButton
2. Prepare export data:
```javascript
const exportData = speeches.map(s => ({
  'Year': s.year,
  'Date': s.date,
  'Speaker': s.speaker,
  'Title': s.title,
  'PDF Link': s.pdfUrl
}));
```
3. Add export button

---

#### 7. Debates
**File**: `src/components/business/Debates.jsx`

**Steps**:
1. Import ExportButton
2. Prepare export data:
```javascript
const exportData = debates.map(d => ({
  'Date': d.date,
  'Topic': d.topic,
  'Participants': d.participants,
  'Duration': d.duration,
  'PDF Link': d.pdfUrl
}));
```
3. Add export button

---

#### 8. List of Business
**File**: `src/components/business/ListOfBusiness.jsx`

**Steps**:
1. Import ExportButton
2. Prepare export data:
```javascript
const exportData = businessItems.map(item => ({
  'Item No': item.number,
  'Description': item.description,
  'Date': item.date,
  'Status': item.status,
  'Minister': item.minister
}));
```
3. Add export button

---

#### 9. List of Papers Laid
**File**: `src/components/business/ListOfPapersLaid.jsx`

**Steps**:
1. Import ExportButton
2. Prepare export data:
```javascript
const exportData = papers.map(p => ({
  'Paper No': p.number,
  'Title': p.title,
  'Date': p.date,
  'Minister': p.minister,
  'Department': p.department
}));
```
3. Add export button

---

#### 10. Proceedings
**File**: `src/components/business/Proceedings.jsx`

**Steps**:
1. Import ExportButton
2. Prepare export data:
```javascript
const exportData = proceedings.map(p => ({
  'Date': p.date,
  'Session': p.session,
  'Topics': p.topics,
  'PDF Link': p.pdfUrl
}));
```
3. Add export button

---

#### 11. Session Schedule
**File**: `src/components/business/SessionSchedule.jsx`

**Steps**:
1. Import ExportButton
2. Prepare export data:
```javascript
const exportData = schedule.map(s => ({
  'Date': s.date,
  'Time': s.time,
  'Agenda': s.agenda,
  'Venue': s.venue,
  'Status': s.status
}));
```
3. Add export button

---

### Member Profile Section

#### 12. Member List
**File**: `src/components/memberProfile/Member-list.jsx`

**Steps**:
1. Import ExportButton
2. Prepare export data:
```javascript
const exportData = members.map(m => ({
  'Name': m.name,
  'Constituency': m.constituency,
  'Party': m.party,
  'Phone': m.phone,
  'Email': m.email
}));
```
3. Add export button

---

#### 13. Member Profile - Multiple Tables
**File**: `src/components/memberProfile/MemberProfile.jsx`

**Tables to update**:
1. **Debates Presented** (Line ~1407)
```javascript
<ExportButton
  data={debates.presented.map(d => ({
    'Date': d.date,
    'Subject': d.subject,
    'Type': d.type
  }))}
  filename="debates-presented"
  title="Debates Presented"
/>
```

2. **Debates Participated** (Line ~1536)
```javascript
<ExportButton
  data={debates.participated.map(d => ({
    'Date': d.date,
    'Subject': d.subject,
    'Type': d.type
  }))}
  filename="debates-participated"
  title="Debates Participated"
/>
```

3. **Special Mentions** (Line ~1666)
```javascript
<ExportButton
  data={specialMentions.map(m => ({
    'Date': m.date,
    'Subject': m.subject
  }))}
  filename="special-mentions"
  title="Special Mentions"
/>
```

4. **Questions** (Line ~1763)
```javascript
<ExportButton
  data={questions.map(q => ({
    'Question No': q.number,
    'Date': q.date,
    'Subject': q.subject,
    'Type': q.type
  }))}
  filename="questions"
  title="Questions"
/>
```

5. **Committee Membership** (Line ~1851)
```javascript
<ExportButton
  data={committeeMembership.map(c => ({
    'Committee': c.name,
    'Role': c.role,
    'From Date': c.fromDate,
    'To Date': c.toDate
  }))}
  filename="committee-membership"
  title="Committee Membership"
/>
```

6. **Government Bills** (Line ~1917)
```javascript
<ExportButton
  data={governmentBills.map(b => ({
    'Bill No': b.number,
    'Title': b.title,
    'Date': b.date,
    'Status': b.status
  }))}
  filename="government-bills"
  title="Government Bills"
/>
```

7. **Private Bills** (Line ~2002)
```javascript
<ExportButton
  data={privateBills.map(b => ({
    'Bill No': b.number,
    'Title': b.title,
    'Date': b.date,
    'Status': b.status
  }))}
  filename="private-bills"
  title="Private Bills"
/>
```

8. **Tours** (Line ~2136)
```javascript
<ExportButton
  data={tours.map(t => ({
    'Date': t.date,
    'Destination': t.destination,
    'Purpose': t.purpose,
    'Duration': t.duration
  }))}
  filename="tours"
  title="Tours"
/>
```

---

#### 14. Committee Page
**File**: `src/components/memberProfile/Committee-page.jsx`

**Steps**:
1. Import ExportButton
2. Prepare export data:
```javascript
const exportData = committeeMembers.map(m => ({
  'Name': m.name,
  'Role': m.role,
  'From Date': m.fromDate,
  'To Date': m.toDate
}));
```
3. Add export button

---

### Questions Section

#### 15. Questions - Multiple Tabs
**File**: `src/components/Questions.jsx`

**Tabs to update**:

1. **Allotment Tab** (Line ~400)
```javascript
<ExportButton
  data={allotmentData.map(a => ({
    'Session': a.session,
    'Date': a.date,
    'Minister': a.minister
  }))}
  filename="question-allotment"
  title="Allotment of Days for Answering Questions"
/>
```

2. **Ballot Tab** (Line ~500)
```javascript
<ExportButton
  data={filteredBallotData.map(b => ({
    'KLA': b.kla,
    'Session': b.session,
    'Member': b.member,
    'Date': b.date
  }))}
  filename="ballot-chart"
  title="Ballot Chart for Questions"
/>
```

3. **Schedule Tab** (Line ~600)
```javascript
<ExportButton
  data={scheduleData.map(s => ({
    'Date': s.date,
    'Session': s.session,
    'Schedule': s.schedule
  }))}
  filename="question-schedule"
  title="Schedule for Web Updation of Questions"
/>
```

---

### Other Sections

#### 16. Bills
**File**: `src/components/Bills.jsx`

**Steps**:
1. Import ExportButton
2. Prepare export data:
```javascript
const exportData = bills.map(b => ({
  'Bill No': b.number,
  'Title': b.title,
  'Date': b.date,
  'Status': b.status,
  'Type': b.type
}));
```
3. Add export button

---

#### 17. Other Important Numbers - Multiple Tables
**File**: `src/secretariate/OtherImptNo.jsx`

**Tables to update** (each needs individual export):
1. Canteen Details (Line ~77)
2. Canteen List (Line ~104)
3. Clinics (Line ~174)
4. Key Room (Line ~250)
5. Reception (Line ~275)
6. Security (Line ~340)
7. PWD (Line ~417)
8. KLC Table (Line ~516)
9. Electronics Division (Line ~632)
10. Mechanical Division (Line ~750)
11. Enquiries (Line ~850)
12. Railway (Line ~900)
13. SBI Counter (Line ~950)
14. Staff Coop Society (Line ~1000)
15. Telephone Exchange (Line ~1050)
16. Sub Treasury (Line ~1100)

**Template for each**:
```javascript
<ExportButton
  data={tableData.map(item => ({
    'Column 1': item.field1,
    'Column 2': item.field2,
    // ... more fields
  }))}
  filename="[descriptive-name]"
  title="[Table Title]"
  exportOptions={["PDF", "Excel", "CSV"]}
  className=""
  buttonClassName="btn btn-secondary dropdown-toggle"
/>
```

---

## 📋 General Implementation Steps

For ANY page:

### Step 1: Import
```javascript
import { ExportButton } from '../common';
```

### Step 2: Identify Data
- Find the array/state that holds table data
- Note the field names and structure

### Step 3: Transform Data
```javascript
const exportData = originalData.map(item => ({
  'Readable Column Name 1': item.technicalField1,
  'Readable Column Name 2': item.technicalField2,
  // ... more fields
}));
```

### Step 4: Add Button
```jsx
<ExportButton
  data={exportData}
  filename="descriptive-kebab-case-name"
  title="Human Readable Title"
  exportOptions={["PDF", "Excel", "CSV"]}
  className=""
  buttonClassName="btn btn-secondary dropdown-toggle"
/>
```

### Step 5: Test
- [ ] Button appears correctly
- [ ] All formats export
- [ ] Data is correct
- [ ] Filename is appropriate
- [ ] No console errors

---

## 🎯 Priority Order

1. **High Priority** (User-facing, frequently used):
   - Member List
   - Member Profile tables
   - Questions tabs
   - Bills

2. **Medium Priority** (Business section):
   - Resolutions
   - Budget Speeches
   - Debates
   - List of Business
   - Proceedings

3. **Low Priority** (Administrative):
   - Other Important Numbers tables
   - Remaining Motions sections

---

## 📊 Progress Tracking

- Total Pages: 17
- Completed: 3
- Remaining: 14
- Completion: 18%

Update this section as you complete each page!

---

## 🔗 Resources

- **Full Guide**: `EXPORT_FUNCTIONALITY_GUIDE.md`
- **Quick Reference**: `EXPORT_QUICK_REFERENCE.md`
- **Status**: `EXPORT_IMPLEMENTATION_STATUS.md`
- **Export Utility**: `src/utils/exportUtils.js`
- **Export Button**: `src/components/common/ExportButton.jsx`
