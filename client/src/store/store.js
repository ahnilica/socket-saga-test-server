import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    rootReducer(), 
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;