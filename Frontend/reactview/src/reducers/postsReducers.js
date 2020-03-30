export default (state = [], action) => {
    switch(action.type){
        case 'GET_POSTS':
            console.log("in GET_POSTS");
            console.log(action)
            // console.log(action.payload)

            // return {posts: action.payload}
        default:            return {posts: action.payload}

            return state;
    }
}

