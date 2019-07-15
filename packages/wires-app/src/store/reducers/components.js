import {
  ADD_COMPONENT,
  REMOVE_COMPONENT
} from '../actions/components';

const initialState = [

];

export default function componentsReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_COMPONENT:
      return state;
    case REMOVE_COMPONENT:
        return state;
    default:
      return state;
  };
}
