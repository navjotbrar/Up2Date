export default (state = {}, action) => {
    switch(action.type){
        case 'SEARCH':
            return {search: action.payload.search,
            };
        default:
            return state;
    }
}
