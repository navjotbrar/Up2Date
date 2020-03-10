export default (state = {}, action) => {
    switch(action.type){
        case 'LOGIN_USER':
            return {username:"shamin",password:"bitch"};
        default:
            return state;
    }
}

