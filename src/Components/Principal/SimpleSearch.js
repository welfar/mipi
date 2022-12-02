import React from "react";

import "../../Styles/Principal/SimpleSearch.css";

const SimpleSearch = ({ Query, Typequery, TitleButton }) => {
  return (
    <>
      <div className="container__search">
        <div className="container__search--header">
          <div className="header--text">
            <span>{Query}</span>
          </div>
        </div>
        <div className="container__section--search">
          <div className="search--bar">
            <input
              className="form-control"
              type="search"
              placeholder={Typequery}
            />
          </div>
          <div className="search--button">
            <button className="button--title">{TitleButton}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleSearch;
