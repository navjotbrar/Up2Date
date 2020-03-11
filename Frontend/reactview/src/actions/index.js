
// Function to login a user and update the state if a user is returned 

export const fetchLogin = (username, password) => async dispatch => {
    console.log("In action creator2")
    const response = await fetch('http://localhost:8080/user/login/'+ username + '/' + password)
    
    let result;

    try {
        result = await response.json();
    } catch (error) {                               // to catch null responses, like for wrong user/pass
        alert("invalid username or password, please try again");
        return;
    }

    console.log(result)
    console.log("that was pure response")

    // print it, and then change structure if needed, and dispatch an event
    console.log("In action creator")
    console.log(result)
     dispatch({ type: "LOGIN_USER",payload: result});
};

export const logOut = () => async dispatch =>{
    console.log("in log out action");
    dispatch({type: "LOGOUT"});
};
