
export const ADD_EXPANDED_POST = 'ADD_EXPANDED_POST';
export const REMOVE_EXPANDED_POST = 'REMOVE_EXPANDED_POST';
export const CHANGE_FILTER = 'CHANGE_FILTER';

export function changeExpandedPostReducer(state: number[] = [], action: any) {
  switch (action.type) {
    case ADD_EXPANDED_POST:
      return [...state, action.payload];
    case REMOVE_EXPANDED_POST:
      return [...state].filter(id => id !== action.payload)
    default:
      return state;
  }
}

export function changeFilterPostReducer(state: string = '', action: any) {
  switch (action.type) {
    case CHANGE_FILTER:
      return action.payload;
    default:
      return state;
  }
}
