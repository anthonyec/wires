import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import components from './reducers/components';

const reducers = combineReducers({
  components
});

export default (dependencies = {}, preloadedState = {}) => {
  return createStore(
    reducers,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(dependencies)))
  );
};
