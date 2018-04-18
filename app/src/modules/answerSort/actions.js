import sortType from './sortType.js';

const setSort = value => ({
    type: sortType.SET_SORT,
    value,
});


export default setSort;


