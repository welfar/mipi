import { types } from "../Types/types";

const initialState = {
  data: [],
  isLoaded: false,
};

export const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setInfoReports:
      return {
        data: action.payload.Reports,
        isLoaded: true,
      };
    case types.clearInfoReports:
      return {
        isLoaded: false,
      };
    default:
      return state;
  }
};
