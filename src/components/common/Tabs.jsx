import React, { useState, useMemo, useEffect } from "react";

const Tabs = ({
  tabs = [],
  defaultActiveKey,
  activeKey,
  onChange,
  containerClassName = "horiz-tab",
  wrapperClassName = "widget_list",
  navWrapperClassName = "nav flex-row nav-tabs text-start scrollable-tabs",
  navLinkClassName = "nav-link text-start",
  contentWrapperClassName = "tab-content",
  paneClassName = "tab-pane fade",
  activePaneExtraClass = "show active",
  idPrefix = "nav",
}) => {
  const initialKey = useMemo(() => {
    if (activeKey != null) return activeKey;
    if (defaultActiveKey != null) return defaultActiveKey;
    return tabs[0]?.key ?? null;
  }, [activeKey, defaultActiveKey, tabs]);

  const [internalActive, setInternalActive] = useState(initialKey);
  const currentActive = activeKey != null ? activeKey : internalActive;

  const handleClick = (key) => {
    if (activeKey == null) setInternalActive(key);
    if (onChange) onChange(key);
  };

  useEffect(() => {
    if (activeKey != null) return;
    const keys = tabs.map((t) => t.key);
    if (!keys.includes(currentActive)) {
      const first = tabs[0]?.key ?? null;
      if (first != null) setInternalActive(first);
    }
  }, [tabs, activeKey, currentActive]);

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className={containerClassName}>
      <div className={wrapperClassName}>
        <nav>
          <div className={navWrapperClassName} role="tablist">
            {tabs.map((t) => {
              const btnId = `${idPrefix}-${t.key}-tab`;
              const panelId = `${idPrefix}-${t.key}`;
              const isActive = currentActive === t.key;
              return (
                <button
                  key={t.key}
                  className={`${navLinkClassName} ${isActive ? "active" : ""}`}
                  id={btnId}
                  type="button"
                  role="tab"
                  aria-controls={panelId}
                  aria-selected={isActive}
                  onClick={() => handleClick(t.key)}
                >
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      <div className={contentWrapperClassName}>
        {tabs.map((t) => {
          const panelId = `${idPrefix}-${t.key}`;
          const btnId = `${idPrefix}-${t.key}-tab`;
          const isActive = currentActive === t.key;
          return (
            <div
              key={t.key}
              className={`${paneClassName} ${isActive ? activePaneExtraClass : ""}`}
              id={panelId}
              role="tabpanel"
              aria-labelledby={btnId}
            >
              {t.content || null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;



// import React, { useState, useMemo, useEffect } from "react";
// import "./common.css";

// // Reusable Tabs with headers + content panes, matching existing classes
// // tabs: [{ key, label, content }] where content is a ReactNode
// const Tabs = ({
//   tabs = [],
//   defaultActiveKey,
//   activeKey,
//   onChange,
//   // Classes to align with current UI
//   containerClassName = "horiz-tab",
//   wrapperClassName = "widget_list",
//   navWrapperClassName = "nav flex-row nav-tabs text-start",
//   navLinkClassName = "nav-link text-start",
//   contentWrapperClassName = "tab-content",
//   paneClassName = "tab-pane fade",
//   activePaneExtraClass = "show active",
//   // id prefix to link aria-controls
//   idPrefix = "nav",
// }) => {
//   const initialKey = useMemo(() => {
//     if (activeKey != null) return activeKey;
//     if (defaultActiveKey != null) return defaultActiveKey;
//     return tabs[0]?.key ?? null;
//   }, [activeKey, defaultActiveKey, tabs]);

//   const [internalActive, setInternalActive] = useState(initialKey);
//   const currentActive = activeKey != null ? activeKey : internalActive;

//   const handleClick = (key) => {
//     if (activeKey == null) setInternalActive(key);
//     if (onChange) onChange(key);
//   };

//   // Ensure first tab is active by default when tabs change (uncontrolled mode)
//   useEffect(() => {
//     if (activeKey != null) return; // controlled, do nothing
//     const keys = tabs.map((t) => t.key);
//     if (!keys.includes(currentActive)) {
//       const first = tabs[0]?.key ?? null;
//       if (first != null) setInternalActive(first);
//     }
//   }, [tabs, activeKey, currentActive]);

//   if (!tabs || tabs.length === 0) return null;

//   return (
//     <div className={containerClassName}>
//       <div className={wrapperClassName}>
//         <nav>
//           <div className={navWrapperClassName} role="tablist">
//             {tabs.map((t) => {
//               const btnId = `${idPrefix}-${t.key}-tab`;
//               const panelId = `${idPrefix}-${t.key}`;
//               const isActive = currentActive === t.key;
//               return (
//                 <button
//                   key={t.key}
//                   className={`${navLinkClassName} ${isActive ? "active" : ""}`}
//                   id={btnId}
//                   type="button"
//                   role="tab"
//                   aria-controls={panelId}
//                   aria-selected={isActive}
//                   onClick={() => handleClick(t.key)}
//                 >
//                   <span>{t.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </nav>
//       </div>

//       <div className={contentWrapperClassName}>
//         {tabs.map((t) => {
//           const panelId = `${idPrefix}-${t.key}`;
//           const btnId = `${idPrefix}-${t.key}-tab`;
//           const isActive = currentActive === t.key;
//           return (
//             <div
//               key={t.key}
//               className={`${paneClassName} ${isActive ? activePaneExtraClass : ""}`}
//               id={panelId}
//               role="tabpanel"
//               aria-labelledby={btnId}
//             >
//               {t.content || null}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Tabs;
