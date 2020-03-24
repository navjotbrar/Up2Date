export default (state = {}, action) => {
    switch(action.type){
        case 'LOGIN_USER':
            console.log("hello in here");
            console.log(action.payload);
            return {username: action.payload.username,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    id: action.payload.id
            };
        case 'LOGOUT':
            console.log("in log out reducer");
            return {username: null,
                    firstName: null,
                    lastName: null,
                    id: null
            };
        default:
            return state;
    }
}
