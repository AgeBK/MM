// src/js/reducers/index.js

// A reducer is a Javascript function taking two parameters: the state and the action.
// A reducers main Redux principle: immutability.
// A reducer function has a switch statement (although unwieldy, a simple reducer could also use if/else).

// 4: The reducer calculates the next state depending on the action type. Moreover,
// it should return at least the initial state when no action type matches.
// When the action type matches a case clause the reducer calculates the next state and returns a new object.

export default (state = { value: '' }, action) => {
  switch (action.type) {
    case 'STORE_THIS':
      return { ...state, value: action.data };
    default:
      return state;
  }
};

// Old school way of returning new object

// case 'STORE_THIS':
// return Object.assign({}, state, {
//   value: action.data
// });
