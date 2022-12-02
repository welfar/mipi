import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ClearDataCustomer,
  StartSearchEmailCustomer,
  StartSearchIdLogicCustomer,
} from "../../actions/customerInfo";

import Loader from "../Principal/Loader";
import "../../Styles/Principal/SimpleSearch.css";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const CustomerSearch = ({ Query, Typequery, TitleButton }) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);

  const [customerId, setCustomerId] = useState("");

  const IdLogic = parseInt(customerId);
  const idClient = searchParams.get("search");
  const id = parseInt(idClient);

  useEffect(() => {
    if (idClient) {
      setCustomerId(id);
      handleSearch(id);
      setTimeout(() => {
        searchParams.delete("search");
        setSearchParams(searchParams);
      }, 3000);
    }
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setCustomerId(value);
  };

  const handleSearch = (customId) => {
    dispatch(ClearDataCustomer());
    if (IdLogic || id) {
      dispatch(StartSearchIdLogicCustomer(IdLogic, id));
    }
    if (customId) {
      dispatch(StartSearchEmailCustomer(customId));
    }
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
            <span>{Query}</span>
          </div>
        </div>
        <div className="container__section--search">
          <div className="search--bar">
            <input
              className="form-control"
              type="search"
              placeholder={Typequery}
              onChange={(e) => handleChange(e)}
              value={customerId}
            />
          </div>

          {!isLoading ? (
            <div className="search--button">
              <button
                className="button--title"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch(customerId);
                }}
              >
                {TitleButton}
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
