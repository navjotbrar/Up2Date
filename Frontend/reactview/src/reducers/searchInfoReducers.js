export default (state = {}, action) => {
    switch(action.type){
        case 'SEARCH':
            console.log("hello in here");
            console.log(action.payload);
            return {search: action.payload.search,
            };
        default:
            return state;
    }
}
