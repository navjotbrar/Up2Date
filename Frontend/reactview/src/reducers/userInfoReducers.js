export default (state = {}, action) => {
    switch(action.type){
        case 'LOGIN_USER':
            return {username: action.payload.username,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    id: action.payload.id
            };
        case 'LOGOUT':
            return {username: null,
                    firstName: null,
                    lastName: null,
                    id: null
            };
        default:
            return state;
    }
}
