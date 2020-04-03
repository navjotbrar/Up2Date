export default (state = [], action) => {
    switch(action.type){
        case 'GET_POSTS':
            console.log(action)

            // return {posts: action.payload}
        default:            return {posts: action.payload}

            return state;
    }
}

