import sortType from './sortType.js';

const defaultState = {
  sortBy: "createdAt",
};

export default function (state = defaultState, action){
  switch (action.type) {
    case sortType.SET_SORT:
        return {sortBy: action.value}
    default:
      return state;
  }
};
