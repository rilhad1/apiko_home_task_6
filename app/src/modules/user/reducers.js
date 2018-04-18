const defaultState = {
  user: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { user: action.value };
    default:
      return state;
  }
};
