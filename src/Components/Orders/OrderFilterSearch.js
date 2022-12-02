import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select"; /** DropDown */
import {
  ClearDataOrder,
  StartSearchOrderByDomain,
  StartSearchOrderByIdClient,
  StartSearchOrderByIdPurchase,
  StartSearchOrderByIdService,
  StartSearchOrderByRefMp,
  StartSearchOrdersByDate,
} from "../../actions/orderInfo";

import Loader from "../Principal/Loader";
import "../../Styles/Orders/OrderFilterSearch.css";
import "../../Styles/Colors.css";

const dropdownStyles = {
  control: (base) => ({
    ...base,
    background: "var(--color-COLOR_GRIS_CLARO)",
    border: "1px solid var(--color-COLOR_CELESTE)",
    boxShadow: "none",
    width: 150,
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
    width: 150,
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
  { value: "domain", label: "Dominio" },
  { value: "idClient", label: " ID. Cliente" },
  { value: "idPurchase", label: "ID. Compra" },
  { value: "idService", label: "ID. Servicio" },
  { value: "RefPayment", label: "Ref. de Pago" },
  { value: "FilterDate", label: "Por Fecha" },
];

export const OrderFilterSearch = ({ Query, Typequery }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const initialDateState = {
    datefrom: "",
    dateto: "",
  };

  const [filterSelected, setFilterSelected] = useState({
    value: "idPurchase",
    label: "ID. Compra",
  });
  const [orderSearch, setOrderSearch] = useState("");
  const [dateSearch, setDateSearch] = useState(initialDateState);

  const changeFilter = (filterSelected) => setFilterSelected(filterSelected);

  const handleChange = (e) => {
    setOrderSearch(e.target.value);
  };

  const Domain = orderSearch;
  const idLogic = orderSearch;
  const idCompra = orderSearch;
  const idService = orderSearch;
  const refMp = orderSearch;

  const handleChangeDate = (e) => {
    setDateSearch({
      ...dateSearch,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    dispatch(ClearDataOrder());

    if (filterSelected.value === "domain") {
      dispatch(StartSearchOrderByDomain(Domain));
    }
    if (filterSelected.value === "idClient") {
      dispatch(StartSearchOrderByIdClient(idLogic));
    }
    if (filterSelected.value === "idPurchase") {
      dispatch(StartSearchOrderByIdPurchase(idCompra));
    }
    if (filterSelected.value === "idService") {
      dispatch(StartSearchOrderByIdService(idService));
    }
    if (filterSelected.value === "RefPayment") {
      dispatch(StartSearchOrderByRefMp(refMp));
    }
  };

  const handleSearchDate = () => {
    dispatch(ClearDataOrder());

    if (filterSelected.value === "FilterDate") {
      dispatch(StartSearchOrdersByDate(dateSearch));
    }
  };

  const enterKey = (e) => {
    const enterKeySearch = e.keyCode;

    if (enterKeySearch === 13) {
      return () => {
        handleSearch();
        handleSearchDate();
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

          {filterSelected.value === "FilterDate" ? (
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
              ></input>
              <div className="date__filter--text">Hasta: </div>
              <input
                className="form-control inputConfig"
                type="date"
                name="dateto"
                value={dateSearch.dateto}
                onChange={(e) => handleChangeDate(e)}
                required
              ></input>
              {!isLoading ? (
                <div className="search--button">
                  <button
                    className="button--title"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSearchDate();
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
          ) : (
            <div className="search__bar--container">
              <div className="search--bar">
                <input
                  className="form-control"
                  type="search"
                  placeholder={Typequery}
                  name="order_search"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {!isLoading ? (
                <div className="search--button">
                  <button
                    className="button--title"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSearch();
                    }}
                  >
                    Buscar
                  </button>
                </div>
              ) : (
                <Loader />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
