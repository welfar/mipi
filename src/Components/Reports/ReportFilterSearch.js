import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import {
  ClearDataReports,
  StartSearchByActHostingDueDate,
  StartSearchByActHostingRegDate,
  StartSearchByActMailDueDate,
  StartSearchByActMailRegDate,
} from "../../actions/reportsActions";
import Loader from "../Principal/Loader";

const dropdownStyles = {
  control: (base) => ({
    ...base,
    background: "var(--color-COLOR_GRIS_CLARO)",
    border: "1px solid var(--color-COLOR_CELESTE)",
    boxShadow: "none",
    width: 270,
    "&:hover": {
      border: "1px solid  var(--color-COLOR_CELESTE)",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected
      ? "var(--color-COLOR_BLANCO)"
      : "var(--color-COLOR_AZUL_OSCURO)",
    fontSize: 14,
    padding: 4,
  }),
  menu: (base) => ({
    ...base,
    width: 270,
    backgroundColor: "var(--color-COLOR_GRIS_CLARO)",
    borderRadius: 10,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 500ms";

    return { ...provided, opacity, transition };
  },
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "var(--color-COLOR_AZUL_OSCURO)",

    "&:hover": { color: "var(--color-COLOR_AZUL_CLARO)" },
  }),
};

const optionsSearch = [
  { value: "mailRegDate", label: "Correos Activos por Fecha de Registro" },
  {
    value: "mailDueDate",
    label: "Correos Activos por Fecha de Vencimiento",
  },
  { value: "hostingRegDate", label: "Hosting Activos por Fecha de Registro" },
  {
    value: "hostingDueDate",
    label: "Hosting Activos por Fecha de Vencimiento",
  },
];

export const ReportFilterSearch = ({ Query }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const initialDateState = {
    datefrom: "",
    dateto: "",
  };
  const [filterSelected, setFilterSelected] = useState({
    value: "mailRegDate",
    label: "Correos Activos por Fecha de Registro",
  });

  const [dateSearch, setDateSearch] = useState(initialDateState);

  const changeFilter = (filterSelected) => setFilterSelected(filterSelected);

  const handleChangeDate = (e) => {
    setDateSearch({
      ...dateSearch,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    dispatch(ClearDataReports());

    if (filterSelected.value === "mailRegDate") {
      dispatch(StartSearchByActMailRegDate(dateSearch));
    }
    if (filterSelected.value === "mailDueDate") {
      dispatch(StartSearchByActMailDueDate(dateSearch));
    }
    if (filterSelected.value === "hostingRegDate") {
      dispatch(StartSearchByActHostingRegDate(dateSearch));
    }
    if (filterSelected.value === "hostingDueDate") {
      dispatch(StartSearchByActHostingDueDate(dateSearch));
    }
  };

  const enterKey = (e) => {
    const enterKeySearch = e.keyCode;

    if (enterKeySearch === 13) {
      return () => {
        handleSearch();
      };
    }
  };
  window.onkeydown = enterKey;

  return (
    <>
      <div className="container__search">
        <div className="container__search--header">
          <div className="header--text">
            <span>{Query}</span>
          </div>
        </div>

        <div className="container__section--search_order ">
          <div className="Search--filter">
            <div className="actualPrices__Dropdown">
              <Select
                options={optionsSearch}
                styles={dropdownStyles}
                onChange={changeFilter}
                value={filterSelected}
                isSearchable={false}
                isRtl={false}
              />
            </div>
          </div>

          <div className="date__filter">
            <div className="date__filter--text">Desde: </div>
            <input
              className="form-control inputConfig"
              type="date"
              name="datefrom"
              value={dateSearch.datefrom}
              onChange={(e) => {
                handleChangeDate(e);
              }}
              required
            />
            <div className="date__filter--text">Hasta: </div>
            <input
              className="form-control inputConfig"
              type="date"
              name="dateto"
              value={dateSearch.dateto}
              onChange={(e) => handleChangeDate(e)}
              required
            />

            {!isLoading ? (
              <div className="search--button">
                <button
                  className="button--title"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                  disabled={
                    dateSearch.datefrom === "" || dateSearch.dateto === ""
                  }
                >
                  Buscar
                </button>
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
