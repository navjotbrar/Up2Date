
// Function to login a user and update the state if a user is returned 


export const fetchLogin = (username, password) => async dispatch => {
    console.log("In action creator2")
    const response = await fetch('http://localhost:8080/user/login/'+ username + '/' + password)
    
    let result;

    try {
        result = await response.json();
    } catch (error) {                               // to catch null responses, like for wrong user/pass
        alert("invalid username or password, please try again");
        // window.location.href = './login';
        return false;
    }
    dispatch({ type: "LOGIN_USER",payload: result});
    return true;
};

export const logOut = () => async dispatch =>{
    dispatch({type: "LOGOUT"});
};

export const newPost = (title, link, body, username) => async dispatch => {
    const response = await fetch('http://localhost:8080/post/add/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, link: link, body: body, username: username})
    });

    if(response.status != 200){
        alert("error occured in add new post action");
        return false;
    }
    return true;
};

export const fetchPosts = () => async dispatch => {
    const response = await fetch('http://localhost:8080/posts/fetch');
    const result = await response.json();
    dispatch({ type: "FETCH_POSTS",payload: result})
    
};

//function to check if a user exists 
export const addUser = (username,password,first_name,last_name,email) => async dispatch => {
    const response = await fetch('http://localhost:8080/user/addUser/'+ username + '/' + password  + '/' + first_name  + '/' + 
    last_name  + '/' + email)
    let result = await response.json();

     //dispatch({ type: "LOGIN_USER",payload: response.data});
};

export const addnewuser = (data) => async dispatch => {
    const response = await fetch('http://localhost:8080/user/addnewuser', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let result = await response.json();
    if(result.first_name == null){
        alert("user not created, username already exists");
        return false;
    }   
    else{
        alert("user created, you can try logging in");
        return true;
    }
    return false;
};
export const deleteUser = (data) => async dispatch => {
    const response = await fetch('http://localhost:8080/user/deleteuser/' + data , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.status != 200){
        alert("Unable to delete user, server down");
        return false;
    }
    alert("User deleted!");
    dispatch({type: "LOGOUT"});
    return true;
}
export const updateSearch = (data) => async dispatch => {
    dispatch({ type: "SEARCH",payload: data})
    return true;
}

export const fetchSearchResults = (data) => async dispatch => {
    const response = await fetch('http://localhost:8080/post/returnSearchResults', {
        method: 'GET',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    let result = await response.json();

    dispatch({ type: "FETCH_SEARCH_RESULTS",payload: result})

}