import React from "react";

import "../../Styles/Principal/SimpleSearch.css";

const SimpleSearchUser = ({ search, setSearch }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <>
      <div className="container__search">
        <div className="container__search--header">
          <div className="header--text">
            <label htmlFor="find_user">
              Consulta aquí la información de cada usuario de panel interno:
            </label>
          </div>
        </div>
        <div className="container__section--search">
          <div className="search--bar">
            <input
              className="form-control"
              name="find_user"
              id="find_user"
              type="text"
              placeholder="Ingresa un nombre"
              value={search}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          {/* <div className="search--button">
            <button className="button--title">Buscar</button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SimpleSearchUser;
