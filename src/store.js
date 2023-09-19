import thunk from "redux-thunk";
import { legacy_createStore as createStore } from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware} from "redux";
import rootreducers from "./Component/redux/reducers/Main";

const middleware = [thunk];

const store = createStore(
    rootreducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;