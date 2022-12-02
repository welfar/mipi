import { types } from "../Types/types";

export const startLoading = () => {
  return {
    type: types.setLoading,
  };
};

export const finishLoading = () => {
  return {
    type: types.unSetLoading,
  };
};

export const setError = (error) => {
  return {
    type: types.setMessageError,
    payload: {
      MessageError: error,
    },
  };
};

export const UnSetError = () => {
  return {
    type: types.unSetMessageError,
  };
};

export const setSearchFinish = () => {
  return {
    type: types.setSearchFinish,
  };
}