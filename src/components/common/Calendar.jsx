import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation } from "react-router-dom";

const SessionCalendar = ({
  selectedDate,
  onDateChange,
  startDate,
  endDate,
  meetingDates = [],
  allowedDates = [],
  className = "w-100",
  calendarClassName = "session-calendar-large",
  height = "auto",
  width = "100%",
  showDateRange = true,
  dateRangeTitle = "Session date in between",
  showLegend = false,
}) => {

  const location = useLocation();

  const isCallingAttention = location.pathname === "/calling-attention";
  // -----------------------------
  // Safe Date Parsing
  // -----------------------------
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? null : date;
  };

  const fromDate = parseDate(startDate);
  const toDate = parseDate(endDate);
  const parsedSelectedDate = selectedDate ? new Date(selectedDate) : null;

  // -----------------------------
  // Normalize meetingDates (avoid timezone shift)
  // -----------------------------
  const normalizedMeetingDates = React.useMemo(() => {
    return meetingDates.map((d) => {
      const [y, m, day] = d.split("-").map(Number);
      const localDate = new Date(y, m - 1, day);
      return localDate.toISOString().split("T")[0];
    });
  }, [meetingDates]);

  // -----------------------------
  // Active Month / Year Handling
  // -----------------------------
  const [activeStartDate, setActiveStartDate] = React.useState(
    fromDate || new Date()
  );

  React.useEffect(() => {
    if (fromDate && !isNaN(fromDate)) {
      setActiveStartDate(
        new Date(fromDate.getFullYear(), fromDate.getMonth(), 1)
      );
    }
  }, [startDate]);

  // -----------------------------
  // Handle Invalid Dates
  // -----------------------------
  if (!fromDate || !toDate) {
    return (
      <div className="calendar-placeholder text-center p-3 text-danger">
        <small>Invalid session dates</small>
      </div>
    );
  }

  // -----------------------------
  // Allowed Dates Set
  // -----------------------------
  const allowedActiveDateSet = new Set(
    allowedDates.map((d) => new Date(d).toISOString().split("T")[0])
  );

  // -----------------------------
  // Tile Class
  // -----------------------------
  const tileClassName = ({ date }) => {
    const classes = [];
    const dateString = date.toISOString().split("T")[0];
    const isInRange = date >= fromDate && date <= toDate;
    const isAllowed =
      allowedDates.length > 0 ? allowedActiveDateSet.has(dateString) : true;

    if (isInRange) classes.push("date-in-range");
    if (isAllowed && isInRange) classes.push("date-allowed-bg");
    if (date.toDateString() === fromDate.toDateString())
      classes.push("range-start");
    if (date.toDateString() === toDate.toDateString())
      classes.push("range-end");
    if (
      parsedSelectedDate &&
      date.toDateString() === parsedSelectedDate.toDateString()
    )
      classes.push("date-selected");

    return classes.join(" ");
  };

  // -----------------------------
  // Tile Content (meeting dots)
  // -----------------------------
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const dateString = date.toISOString().split("T")[0];
    if (normalizedMeetingDates.includes(dateString)) {
      return <div className="meeting-dot" />;
    }
    return null;
  };

  // -----------------------------
  // Date Click Handler
  // -----------------------------
  const handleDateChange = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const isInRange = date >= fromDate && date <= toDate;
    if (
      isInRange &&
      (allowedDates.length === 0 || allowedActiveDateSet.has(dateString))
    ) {
      onDateChange(date);
    }
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div>
      {showDateRange && (
        <div className="session-tab-title">
          <h6 className="mb--0 tab-section-date">
            <span className="section-text">{dateRangeTitle}</span>
            <span className="date-range">
              <span
                style={{
                  marginLeft: "5px",
                  backgroundColor: "#e9e9e9",
                  color: "black",
                  padding: "6px 10px 4px 10px",
                  borderRadius: "4px",
                }}
              >
                {startDate.split("-").reverse().join(" ")}
              </span>{" "}
              to
              <span
                style={{
                  marginLeft: "5px",
                  backgroundColor: "#e9e9e9",
                  color: "black",
                  padding: "6px 10px 4px 10px",
                  borderRadius: "4px",
                }}
              >
                {endDate.split("-").reverse().join(" ")}
              </span>
            </span>
          </h6>
        </div>
      )}

      <div
        className="bg-white border rounded p-3"
        style={{ height, width, display: "flex", alignItems: "stretch" }}
      >
        <Calendar
          className={`${className} ${calendarClassName}`}
          value={parsedSelectedDate}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveStartDate(activeStartDate)
          }
          tileClassName={tileClassName}
          tileContent={tileContent}
          onChange={handleDateChange}
          onClickDay={handleDateChange}
          style={{ flex: 1, height: "100%" }}
        />
      
      </div>
    <div className="calendar-footerr">
      
      {/* Show Sitting date for all routes except /calling-attention */}
      {!isCallingAttention && (
        <div className="legend-item">
          <span className="meeting-dott"></span>
          <span>Sitting date</span>
        </div>
      )}

      {/* Show legend items only for /calling-attention */}
      {isCallingAttention && showLegend && (
        <>
          <div className="legend-item">
            <span className="legend-box sitting-without-qh"></span>
            <span className="f-13">Sitting without Question Hour</span>
          </div>

          <div className="legend-item">
            <span className="legend-box no-sitting"></span>
            <span className="f-13">No Sitting</span>
          </div>

          <div className="legend-item">
            <span className="legend-box sitting-with-qh"></span>
            <span className="f-13">Sitting with Question Hour</span>
          </div>
        </>
      )}
    </div>
      <style>
        {`
      .react-calendar__tile {
        min-height: 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .react-calendar__tile .meeting-dot {
        position: absolute;
        left: 10px;
        top: 4px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #ea4141;
      }

      .react-calendar__tile.range-start {
        border-top-left-radius: 30px !important;
        border-bottom-left-radius: 30px !important;
      }

      .react-calendar__tile.range-end {
        border-top-right-radius: 30px !important;
        border-bottom-right-radius: 30px !important;
      }

      .date-in-range.date-allowed-bg {
        background-color: #f0f0f0;
        cursor: pointer;
      }

      .date-selected {
        background-color: #3f51b5 !important;
        color: white !important;
      }

      .react-calendar__year-view__months {
        padding-top: 10px;
      }

      .react-calendar__decade-view__years {
        padding-top: 10px;
      }
        .react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend date-in-range date-allowed-bg{
        line-height: normal;}
    `}
      </style>
    </div>
  );
};

export default SessionCalendar;



// import React from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const SessionCalendar = ({
//   selectedDate,
//   onDateChange,
//   startDate,
//   endDate,
//   meetingDates = [],
//   allowedDates = [],
//   className = "w-100",
//   calendarClassName = "session-calendar-large",
//   height = "auto",
//   width = "100%",
//   showDateRange = true,
//   dateRangeTitle = "Section date In between",
// }) => {
//   // -----------------------------
//   // Safe Date Parsing
//   // -----------------------------
// const parseDate = (dateStr) => {
//   if (!dateStr) return null;
//   const [year, month, day] = dateStr.split("-").map(Number);
//   // Ensure the date is a valid date object
//   const date = new Date(year, month - 1, day);
//   return isNaN(date.getTime()) ? null : date;
// };
//   // const fromDate = parseDate(startDate);
//   const fromDate = parseDate(startDate);

//   const toDate = parseDate(endDate);
//   const parsedSelectedDate = selectedDate ? new Date(selectedDate) : null;

//   const [activeStartDate, setActiveStartDate] = React.useState(
//     fromDate || new Date()
//   );
// React.useEffect(() => {
//   if (!fromDate || isNaN(fromDate)) return;

//   // Only update if the month/year actually changes
//   setActiveStartDate(prev => {
//     const sameMonth =
//       prev.getFullYear() === fromDate.getFullYear() &&
//       prev.getMonth() === fromDate.getMonth();
//     return sameMonth ? prev : new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);
//   });

//   // Update the navigation label safely
//   const updateLabel = () => {
//     const label = document.querySelector(
//       ".react-calendar__navigation__label__labelText, .react-calendar__navigation__label__labelText--from"
//     );
//     if (label) {
//       const monthName = fromDate.toLocaleString("default", { month: "long" });
//       const year = fromDate.getFullYear();
//       label.textContent = `${monthName} ${year}`;
//     }
//   };

//   // Delay slightly to allow Calendar to render first
//   const timeout = setTimeout(updateLabel, 50);
//   return () => clearTimeout(timeout);
// }, [fromDate]);


//   //   React.useEffect(() => {
//   //   if (fromDate instanceof Date && !isNaN(fromDate)) {
//   //     // Ensure the calendar navigates to the correct month/year
//   //     setActiveStartDate(
//   //       new Date(fromDate.getFullYear(), fromDate.getMonth(), 1)
//   //     );
//   //   }


//   //   const label = document.querySelector(
//   //     ".react-calendar__navigation__label__labelText, .react-calendar__navigation__label__labelText--from"
//   //   );
//   //   if (label && fromDate instanceof Date && !isNaN(fromDate)) {
//   //     const monthName = fromDate.toLocaleString("default", { month: "long" });
//   //     const year = fromDate.getFullYear();
//   //     label.textContent = `${monthName} ${year}`;
//   //   }
//   // }, [fromDate]);


//   if (!fromDate || !toDate) {
//     return (
//       <div className="calendar-placeholder text-center p-3 text-danger">
//         <small>Invalid session dates</small>
//       </div>
//     );
//   }
//   // console.log(startDate,
//   // endDate, activeStartDate, "dateeeeeeeeeeeeeeeeeeeeeee");
  

//   // -----------------------------
//   // Precompute allowed dates set
//   // -----------------------------
//   const allowedActiveDateSet = new Set(
//     allowedDates.map((d) => new Date(d).toISOString().split("T")[0])
//   );

//   // -----------------------------
//   // Tile Class
//   // -----------------------------
//   const tileClassName = ({ date }) => {
//     const classes = [];
//     const dateString = date.toISOString().split("T")[0];
//     const isInRange = date >= fromDate && date <= toDate;
//     const isAllowed =
//       allowedDates.length > 0 ? allowedActiveDateSet.has(dateString) : true;

//     if (isInRange) classes.push("date-in-range");
//     if (isAllowed && isInRange) classes.push("date-allowed-bg");
//     if (date.toDateString() === fromDate.toDateString())
//       classes.push("range-start");
//     if (date.toDateString() === toDate.toDateString())
//       classes.push("range-end");
//     if (
//       parsedSelectedDate &&
//       date.toDateString() === parsedSelectedDate.toDateString()
//     )
//       classes.push("date-selected");

//     return classes.join(" ");
//   };

//   // -----------------------------
//   // Tile Content (meeting dots)
//   // -----------------------------
//   const tileContent = ({ date, view }) => {
//     if (view !== "month") return null;
//     const dateString = date.toISOString().split("T")[0];
//     if (meetingDates.includes(dateString)) {
//       return <div className="meeting-dot" />;
//     }
//     return null;
    
//   };
//     // console.log(meetingDates, "meetingDates");

//   // -----------------------------
//   // Date Change Handler
//   // -----------------------------
//   const handleDateChange = (date) => {
//     const dateString = date.toISOString().split("T")[0];
//     const isInRange = date >= fromDate && date <= toDate;
//     if (
//       isInRange &&
//       (allowedDates.length === 0 || allowedActiveDateSet.has(dateString))
//     ) {
//       onDateChange(date);
//     }
//   };

//   const handleClickDay = handleDateChange;

//   // -----------------------------
//   // Render
//   // -----------------------------
//   return (
//     <div>
//       {showDateRange && (
//         <div className="session-tab-title">
//           <h6 className="mb--0 tab-section-date">
//             <span className="section-text">{dateRangeTitle}</span>
//             <span className="date-range">
//               <span
//                 style={{
//                   marginLeft: "5px",
//                   backgroundColor: "#e9e9e9",
//                   color: "black",
//                   padding: "6px 10px 4px 10px",
//                   borderRadius: "4px",
//                 }}
//               >
//                 {startDate.split("-").reverse().join(" ")}
//               </span>{" "}
//               to
//               <span
//                 style={{
//                   marginLeft: "5px",
//                   backgroundColor: "#e9e9e9",
//                   color: "black",
//                   padding: "6px 10px 4px 10px",
//                   borderRadius: "4px",
//                 }}
//               >
//                 {endDate.split("-").reverse().join(" ")}
//               </span>
//             </span>
//           </h6>
//         </div>
//       )}

//       <div
//         className="bg-white border rounded p-3"
//         style={{ height, width, display: "flex", alignItems: "stretch" }}
//       >
//         <Calendar
//           className={`${className} ${calendarClassName}`}
//           value={parsedSelectedDate}
//           defaultActiveStartDate={fromDate}
//           activeStartDate={activeStartDate} 
//           onActiveStartDateChange={(
//             { activeStartDate } // 🔹 adde
//           ) => setActiveStartDate(activeStartDate)}
//           tileClassName={tileClassName}
//           tileContent={tileContent}
//           onChange={handleDateChange}
//           onClickDay={handleClickDay}
//           style={{ flex: 1, height: "100%" }}
//         />
//       </div>

//       <style>
//         {`
//       .react-calendar__tile {
//         min-height: 10px;
//         position: relative;
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;
//       }

//       .react-calendar__tile .meeting-dot {
//         position: absolute;
//         left: 10px;
//         top: 2px;
//         width: 8px;
//         height: 8px;
//         border-radius: 50%;
//         background: #ea4141;
//       }

//       .react-calendar__tile.range-start {
//         border-top-left-radius: 30px !important;
//         border-bottom-left-radius: 30px !important;
//       }

//       .react-calendar__tile.range-end {
//         border-top-right-radius: 30px !important;
//         border-bottom-right-radius: 30px !important;
//       }

//       .date-in-range.date-allowed-bg {
//         background-color: #f0f0f0;
//         cursor: pointer;
//       }

//       .date-selected {
//         background-color: #3f51b5 !important;
//         color: white !important;
//       }
//         .react-calendar__year-view__months{
//         padding-top:10px;
//         }
//         .react-calendar__decade-view__years{
//         padding-top:10px;}
//     `}
//       </style>
//     </div>
//   );
// };

// export default SessionCalendar;

// -----------------------------------------------------------------------------
// import React from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const SessionCalendar = ({
//   selectedDate,
//   onDateChange,
//   startDate = "05-07-2025",
//   endDate = "05-08-2025",
//   meetingDates = [],
//   allowedDates = [],
//   className = "w-100",
//   calendarClassName = "session-calendar-large",
//   height = "auto",
//   width = "100%",
//   showDateRange = true,
//   dateRangeTitle = "Section date In between",
// }) => {
//   // Convert string dates to Date objects
//   const fromDate = new Date(startDate.split("-").reverse().join("-"));
//   const toDate = new Date(endDate.split("-").reverse().join("-"));

//   // Create a Set for faster lookup of allowed dates
//   const allowedActiveDateSet = new Set(allowedDates);

//   const tileClassName = ({ date }) => {
//     const isInRange = date >= fromDate && date <= toDate;
//     const dateString = date.toISOString().split("T")[0];
//     const isAllowed =
//       allowedDates.length > 0 ? allowedActiveDateSet.has(dateString) : true;

//     const classes = [];
//     if (isInRange) {
//       classes.push("date-in-range");
//       // Ensure starting date is also highlighted with background color
//       if (isAllowed || date.toDateString() === fromDate.toDateString()) {
//         classes.push("date-allowed-bg");
//       }
//       // Mark range boundaries for rounded edges styling
//       if (date.toDateString() === fromDate.toDateString()) {
//         classes.push("range-start");
//       }
//       if (date.toDateString() === toDate.toDateString()) {
//         classes.push("range-end");
//       }
//     }

//     if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
//       classes.push("date-selected");
//     }
//     return classes.join(" ");
//   };

//   const tileContent = ({ date, view }) => {
//     if (view !== "month") return null;

//     const dateString = date.toISOString().split("T")[0];
//     const isMeetingDay = meetingDates.includes(dateString);

//     // Show a bottom-centered dot only on meeting days
//     return isMeetingDay ? <div className="meeting-dot" /> : null;
//   };

//   const handleDateChange = (date) => {
//     const isInRange = date >= fromDate && date <= toDate;
//     const dateString = date.toISOString().split("T")[0];

//     if (
//       isInRange &&
//       (allowedDates.length === 0 || allowedActiveDateSet.has(dateString))
//     ) {
//       onDateChange(date);
//     }
//   };

//   const handleClickDay = (date) => {
//     const isInRange = date >= fromDate && date <= toDate;
//     const dateString = date.toISOString().split("T")[0];

//     if (
//       isInRange &&
//       (allowedDates.length === 0 || allowedActiveDateSet.has(dateString))
//     ) {
//       onDateChange(date);
//     }
//   };

//   const handleActiveStartDateChange = ({ activeStartDate }) => {
//     // You can add custom logic here if needed
//     if (activeStartDate) {
//       // Handle active start date change
//     }
//   };

//   return (
//     <div>
//       {showDateRange && (
//         <div className="session-tab-title">
//           <h6 className="mb--0 tab-section-date">
//             <span className="section-text">{dateRangeTitle}</span>
//             <span className="date-range">
//               <span
//                 style={{
//                   marginLeft: "5px",
//                   backgroundColor: "#e9e9e9",
//                   color: "black",
//                   padding: "6px 10px 4px 10px",
//                   borderRadius: "4px",
//                 }}
//               >
//                 {startDate.split("-").reverse().join(" ")}
//               </span>{" "}
//               to
//               <span
//                 style={{
//                   marginLeft: "5px",
//                   backgroundColor: "#e9e9e9",
//                   color: "black",
//                   padding: "6px 10px 4px 10px",
//                   borderRadius: "4px",
//                 }}
//               >
//                 {endDate.split("-").reverse().join(" ")}
//               </span>
//             </span>
//           </h6>
//         </div>
//       )}

//       {/* <div className="bg-white border rounded p-4" style={{ height, width }}>
//         <Calendar
//           className={`${className} ${calendarClassName}`}
//           value={selectedDate}
//           defaultActiveStartDate={fromDate}
//           tileClassName={tileClassName}
//           tileContent={tileContent}
//           onChange={handleDateChange}
//           onClickDay={handleClickDay}
//           onActiveStartDateChange={handleActiveStartDateChange}
//         />
//       </div> */}
//       <div
//         className="bg-white border rounded p-3"
//         style={{
//           height,
//           width,
//           display: "flex",
//           alignItems: "stretch",
//         }}
//       >
//         <Calendar
//           className={`${className} ${calendarClassName}`}
//           value={selectedDate}
//           defaultActiveStartDate={fromDate}
//           tileClassName={tileClassName}
//           tileContent={tileContent}
//           onChange={handleDateChange}
//           onClickDay={handleClickDay}
//           onActiveStartDateChange={handleActiveStartDateChange}
//           style={{ flex: 1, height: "100%" }} // force calendar to take container height
//         />
//       </div>

//       {/* Inline minimal styles to ensure range edges get rounded and dot placed at bottom */}
//       <style>
//         {`
//     /* Ensure consistent tile height and allow absolute dot positioning */
//     .react-calendar__tile {
//       min-height: 10px;
//       position: relative;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//     }

//     /* Bottom centered meeting dot */
//     .react-calendar__tile .meeting-dot {
//          position: absolute;
//              left: 10px;
//     top: 2px;
//       margin-top: 4px;
//       width: 8px;
//       height: 8px;
//       border-radius: 50%;
//       background: #ea4141;
//     }

//     /* ===== Responsive Behavior for Small Height ===== */
//     @media (max-height: 301px) {
//     .session-calendar-large .react-calendar__month-view__days__day .date-allowed-bg{
//         cursor: pointer;
//     display: flex !important;
//     flex-direction: row;
//     }
//       .react-calendar__tile {
//         flex-direction: row !important;
//         justify-content: center !important;
//         gap: 6px;
//         padding: 4px;
//       }

//       .react-calendar__tile abbr {
//         display: inline-block;
//         font-size: 12px; /* make text slightly smaller */
//       }

//       .react-calendar__tile .meeting-dot {
//         margin-top: 0;
//         position: relative;
//         bottom: auto;
//       }
//     }

//     /* Rounded corners for session start */
//     .react-calendar__tile.range-start,
//     .react-calendar__tile.react-calendar__month-view__days__day.range-start,
//     .react-calendar__tile.react-calendar__month-view__days__day--weekend.range-start,
//     .react-calendar__tile.range-start.date-in-range,
//     .react-calendar__tile.range-start.date-in-range.date-allowed-bg {
//       border-top-left-radius: 30px !important;
//       border-bottom-left-radius: 30px !important;
//     }

//     /* Rounded corners for session end */
//     .react-calendar__tile.range-end,
//     .react-calendar__tile.react-calendar__month-view__days__day.range-end,
//     .react-calendar__tile.react-calendar__month-view__days__day--weekend.range-end,
//     .react-calendar__tile.range-end.date-in-range,
//     .react-calendar__tile.range-end.date-in-range.date-allowed-bg {
//       border-top-right-radius: 30px !important;
//       border-bottom-right-radius: 30px !important;
//     }
//   `}
//       </style>
//     </div>
//   );
// };

// export default SessionCalendar;
