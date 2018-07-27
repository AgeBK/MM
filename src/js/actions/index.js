// src/js/actions/index.js

// Redux actions are nothing more than Javascript objects.
// Every action requires a type property (string) for describing how the state should change.
// It is a best pratice to wrap every action within a function. Such function is an action creator.
// Since strings are prone to typos and duplicates it’s better to have action types declared as constants.

// import { ADD_ARTICLE } from '../constants/action-types';

// receives props from Form.js when save btn is pressed
// article contains text from form input and unique id

//3: 
export const storeThis = sThis => ({
  type: 'STORE_THIS',
  data: sThis
});
