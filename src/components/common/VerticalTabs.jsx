import React, { useState } from "react";
import "./common.css"; 

const VerticalTabs = ({ menu, panels }) => {
  const [activeMain, ] = useState(menu[0]?.key || "");
  const [activeSub, setActiveSub] = useState(
    menu[0]?.children?.[0]?.key || ""
  );

  return (
    <div className="vt-container">
      {/* LEFT MENU */}
      <div className="vt-left">
        {menu.map((item) => (
          <div key={item.key}>
            {/* <div
              className={`vt-main-item ${
                activeMain === item.key ? "active" : ""
              }`}
              onClick={() => {
                setActiveMain(item.key);
                setActiveSub(item.children?.[0]?.key || "");
              }}
            >
              {item.label}
              <span className="arrow">›</span>
            </div> */}

            {/* SUBMENU */}
            {activeMain === item.key && (
              <div className="vt-submenu">
                {item.children?.map((sub) => (
                  <div
                    key={sub.key}
                    className={`vt-sub-item ${
                      activeSub === sub.key ? "active" : ""
                    }`}
                    onClick={() => setActiveSub(sub.key)}
                  >
                    {sub.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT CONTENT */}
      <div className="vt-right">
        {panels[activeSub]}
      </div>
    </div>
  );
};

export default VerticalTabs;
