import { types } from "../Types/types";

export const constructorInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case types.setInfoContructor:
      return {
        NameClient: action.payload.NameClient,
        LastName: action.payload.LastName,
        CompanyName: action.payload.CompanyName,
        Identification: action.payload.Identification,
        Email: action.payload.Email,
        status: action.payload.status,
        BuilderDomain: action.payload.BuilderDomain,
        BuilderType: action.payload.BuilderType,
        BuilderState: action.payload.BuilderState,
        BuilderDateRegister: action.payload.BuilderDateRegister,
        BuilderDateExpiret: action.payload.BuilderDateExpiret,
        BuilderID: action.payload.BuilderID,
        isLoaded: true,
      };
    case types.clearInfoConstructor:
      return {
        isLoaded: false,
      };
    default:
      return state;
  }
};
