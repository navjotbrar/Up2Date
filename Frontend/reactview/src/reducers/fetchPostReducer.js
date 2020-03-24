export default (state = [], action) => {
    switch(action.type){
        case 'FETCH_POSTS':
            console.log("hello in FETCH_POSTS");
            console.log(action.payload);
            return {postList: action.payload};
        default:
            return state;
    }
}

