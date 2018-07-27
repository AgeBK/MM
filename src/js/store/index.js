// src/js/store/index.js

// createStore is the function for creating the Redux store.
// createStore takes a reducer as the first argument, rootReducer in our case.

import { createStore } from 'redux';

// reducers produce the state in redux
import rootReducer from '../reducers/index';
const store = createStore(rootReducer);
export default store;
