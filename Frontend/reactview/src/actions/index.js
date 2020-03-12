
// Function to login a user and update the state if a user is returned 
import fetch from 'isomorphic-fetch';

export const fetchPosts = (username, password) => async dispatch => {
    console.log("In action creator2")
    const response = await fetch('http://localhost:8080/user/login/'+ username + '/' + password)
    let result = await response.json();

    // print it, and then change structure if needed, and dispatch an event
    console.log("In action creator")
    console.log(result)
     dispatch({ type: "LOGIN_USER",payload: response.data});
};

//function to check if a user exists 
export const addUser = (username,password,first_name,last_name,email) => async dispatch => {
    console.log(username,password,first_name,last_name,email);
    const response = await fetch('http://localhost:8080/user/addUser/'+ username + '/' + password  + '/' + first_name  + '/' + 
    last_name  + '/' + email)
    let result = await response.json();

    // print it, and then change structure if needed, and dispatch an event
    console.log(result)
     //dispatch({ type: "LOGIN_USER",payload: response.data});
};

export const addnewuser = (data) => async dispatch => {
    console.log(data);
    const response = await fetch('http://localhost:8080/user/addnewuser', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let result = await response.json();
    console.log(result);
    if(result.first_name == null){
        alert("user not created");
    }   
    else{
        alert("user created, you can try logging in");
    }
};

// export const addnewuser = (state) => async dispatch =>{
//     const settings = {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         }
//     };
//     try {
//     const response = await fetch('http://localhost:8080/user/addnewuser/' + state);
//     let result = await response.json();
//     console.log(result);
//     }catch (e){
//         return e;
//     }
// };