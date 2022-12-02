import { types } from '../Types/types';


export const domainInfoReducer = (state = {}, action) => {

    switch (action.type) {
        case types.setInfoDomain:
            return {
                Contacts: action.payload.Contacts,
                CreationDate: action.payload.CreationDate,
                DataContact: action.payload.DataContact,
                Dns: action.payload.Dns,
                ExpirationDate: action.payload.ExpirationDate,
                NameDomain: action.payload.NameDomain,
                Status: action.payload.Status,
                TransferLock: action.payload.TransferLock,
                WhoisPrivacy: action.payload.WhoisPrivacy,
                AuthorizationCode: action.payload.AuthorizationCode,
                isLoaded: true
            };
        case types.clearInfoDomain:
            return {
                isLoaded: false,
            };
        default:
            return state;
    }
}