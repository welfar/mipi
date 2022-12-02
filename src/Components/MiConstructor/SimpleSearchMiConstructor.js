import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearDataConstructor,
  StartSearchConstructor,
} from "../../actions/constructorInfo";

import Loader from "../Principal/Loader";
import "../../Styles/Principal/SimpleSearch.css";

export const SimpleSearchMiConstructor = ({
  Query,
  Typequery,
  TitleButton,
  domain,
  setDomain,
}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ui.isLoading);

  const handleChange = (e) => {
    const { value } = e.target;
    setDomain(value);
  };

  const handleSearch = () => {
    dispatch(clearDataConstructor());
    dispatch(StartSearchConstructor(domain));
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
