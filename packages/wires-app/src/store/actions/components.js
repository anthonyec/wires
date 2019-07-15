export const ADD_COMPONENT = 'ADD_COMPONENT';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';

export function addComponent(payload) {
  return {
    type: ADD_COMPONENT,
    payload
  };
}

export function removeComponent(payload) {
  return {
    type: REMOVE_COMPONENT,
    payload
  };
}
