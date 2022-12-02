import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { ClearDataDomain, StartSearchDomain } from "../../actions/domainsInfo";
import { clearInfoRecords } from "../../actions/records";

import Loader from "../Principal/Loader";
import "../../Styles/DomainSGI/SimpleSearchDomain.css";

export const SimpleSearchDomain = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);

  const [domain, setDomain] = useState("");

  useEffect(() => {
    const orderDomain = searchParams.get("search");
    if (orderDomain) {
      setDomain(orderDomain);
      handleSearch(orderDomain);
      setTimeout(() => {
        searchParams.delete("search");
        setSearchParams(searchParams);
      }, 3000);
    }
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setDomain(value);
  };

  const handleSearch = (dom) => {
    dispatch(clearInfoRecords());
    dispatch(ClearDataDomain());
    dispatch(StartSearchDomain(dom));
  };

  const enterKey = (e) => {
    const enterKeySearch = e.keyCode;

    if (enterKeySearch === 13) {
      return handleSearch();
    }
  };
  window.onkeydown = enterKey;

  return (
    <>
      <div className="container__search">
        <div className="container__search--header">
          <div className="header--text">
            <label htmlFor="domain">Buscar Dominio:</label>
          </div>
        </div>
        <div className="container__section--search">
          <div className="search--bar">
            <input
              className="form-control"
              type="search"
              name="domain"
              id="domain"
              placeholder="Ingrese dominio que desea buscar..."
              onChange={(e) => handleChange(e)}
              value={domain}
            />
          </div>
          {!isLoading ? (
            <div className="search--button">
              <button
                className="button--title"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch(domain);
                }}
              >
                Buscar
              </button>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};
