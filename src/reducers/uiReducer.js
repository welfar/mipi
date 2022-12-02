import { types } from "../Types/types";

const initalState = {
  isLoading: false,
  searchFinish: false,
  MessageError: null,
};

export const uiReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.setLoading:
      return {
        ...state,
        isLoading: true,
        searchFinish: false,
      };
    case types.unSetLoading:
      return {
        ...state,
        isLoading: false,
        searchFinish: true,
      };
    case types.setMessageError:
      return {
        ...state,
        MessageError: action.payload.MessageError,
      };
    case types.unSetMessageError:
      return {
        ...state,
        MessageError: null,
      };
    case types.setSearchFinish:
      return {
        ...state,
        searchFinish: false,
      };
    default:
      return state;
  }
};
