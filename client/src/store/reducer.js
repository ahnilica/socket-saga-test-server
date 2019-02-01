import { combineReducers } from "redux";

// Actions
import { UPDATE_A_VALUE, UPDATE_B_VALUE, UPDATE_C_VALUE } from "./actions";

/*** Selectors ***/
export const getA = (state) => state.a.value;
export const getB = (state) => state.b.value;
export const getC = (state) => state.c.value;


/*** Reducers ***/
const aInitialState = { value: null };
const aReducer = (state = aInitialState, action) => {
  switch(action.type) {
    case UPDATE_A_VALUE:
      const { value } = action.payload;
      return { value };
    default: 
      return state;
  }
};

const bInitialState = { value: null };
const bReducer = (state = bInitialState, action) => {
  switch(action.type) {
    case UPDATE_B_VALUE:
      const { value } = action.payload;
      return { value };
    default: 
      return state;
  }
};

const cInitialState = { value: null };
const cReducer = (state = cInitialState, action) => {
  switch(action.type) {
    case UPDATE_C_VALUE:
      const { value } = action.payload;
      return { value };
    default: 
      return state;
  }
};

const rootReducer = () => combineReducers({
  a: aReducer,
  b: bReducer,
  c: cReducer
});

export default rootReducer;