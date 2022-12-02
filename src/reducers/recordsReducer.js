import { types } from '../Types/types';

export const recordsReducer = (state = { isLoaded: false }, action) => {

    switch (action.type) {
        case types.setInfoRecords:
            return {
                data: action.payload.records,
                isLoaded: true
            };
        case types.clearInfoRecords:
            return {
                isLoaded: false,
            };
        default:
            return state;
    }
}