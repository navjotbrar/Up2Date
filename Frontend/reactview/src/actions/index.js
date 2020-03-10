
// Function to login a user and update the state if a user is returned 

export const fetchPosts = (username, password) => async dispatch => {
    console.log("In action creator2")
    const response = await fetch('http://localhost:8080/user/login/'+ username + '/' + password)
    let result = await response.json();

    // print it, and then change structure if needed, and dispatch an event
    console.log("In action creator")
    console.log(result)
     dispatch({ type: "LOGIN_USER",payload: response.data});
};
