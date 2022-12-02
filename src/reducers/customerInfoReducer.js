import { types } from "../Types/types";

export const customerInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case types.setInfoCustomer:
      return {
        DataClient: action.payload.DataClient,
        SecondfaStatus: action.payload.SecondfaStatus,
        PaymentwithBalanceStatus: action.payload.PaymentwithBalanceStatus,
        BalanceAvailable: action.payload.BalanceAvailable,
        isLoaded: true,
      };
    case types.updateFunds: {
      const amount = action.payload.amount;
      const [simbolMoney, amountValue, typeMoney] =
        state.BalanceAvailable.split(" ");
      return {
        ...state,
        BalanceAvailable: `${simbolMoney} ${
          parseInt(amountValue) + amount
        } ${typeMoney}`,
        isLoaded: true,
      };
    }
    case types.updateCustomerData:
      const newEmail = action.payload.newEmail;
      const [client] = state.DataClient;
      const updateClient = {
        ...client,
        Email: newEmail,
      };
      return {
        ...state,
        DataClient: [updateClient],
        isLoaded: true,
      };
    case types.clearInfoCustomer:
      return {
        isLoaded: false,
      };
    default:
      return state;
  }
};
