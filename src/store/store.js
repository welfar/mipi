import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";

import { authReducer } from "../reducers/authReducer";
import { domainInfoReducer } from "../reducers/domainInfoReducer";
import { uiReducer } from "../reducers/uiReducer";
import { recordsReducer } from "../reducers/recordsReducer";
import { customerInfoReducer } from "../reducers/customerInfoReducer";
import { constructorInfoReducer } from "../reducers/constructorInfoReducer";
import { ordersInfoReducer } from "../reducers/orderInfoReducer";
import { reportsReducer } from "../reducers/reportsReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const rootReducer = combineReducers({
  auth: authReducer,
  customerInfo: customerInfoReducer,
  domainsInfo: domainInfoReducer,
  constructorInfo: constructorInfoReducer,
  ui: uiReducer,
  records: recordsReducer,
  orderInfo: ordersInfoReducer,
  reports: reportsReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
