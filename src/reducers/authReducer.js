import { types } from '../Types/types';

const init = () => {
    return JSON.parse(sessionStorage.getItem("PIUSER")) || { isAuthenticated: false };
  };

const initialState = init();

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.login:
            return {
                data: action.payload.data,
                isAuthenticated: true
            };
        case types.logout:
            return {
                isAuthenticated: false,
            };
        case types.loginSuccess:
            return {
                data: action.payload,
                isAuthenticated: true
            };
        case types.loginFail:
            return {
                isAuthenticated: false,
                errorMessage: action.payload
            };
        default:
            return state;
    }
}