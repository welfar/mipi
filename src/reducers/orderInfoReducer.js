import { types } from "../Types/types";

const initialState = {
  data: [],
  orderData: {},
  isLoaded: false,
};

export const ordersInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setInfoOrder:
      return {
        data: action.payload.OrderInfo,
        isLoaded: true,
      };
    case types.clearInfoOrder:
      return {
        isLoaded: false,
      };
    case types.updateOrder: {
      return {
        ...state,
        orderData: action.payload,
        data: state.data.map((orderItem) =>
          orderItem.id === action.payload.id ? action.payload : orderItem
        ),
        isLoaded: true,
      };
    }
    default:
      return state;
  }
};
