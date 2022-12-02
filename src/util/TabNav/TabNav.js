import React from "react";

import "../../Styles/util/TabNav.css";

export const TabNav = ({ tabs, selected, setSelected, children }) => {
  return (
    <>
      <ul className="navigation__container">
        {tabs.map((tab) => {
          const active = tab === selected ? "active" : "inactive";

          return (
            <li key={tab} className="navigation__item">
              <a className="" onClick={() => setSelected(tab)}>
                <div className={` itemlist__container ${active}`}>{tab}</div>
              </a>
            </li>
          );
        })}
      </ul>
      <div className="contentContainer">{children}</div>
    </>
  );
};
