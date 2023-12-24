const redux = require("redux");
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk");
const axios = require("axios");

//State
const initialState = {
    loading: false,
    users: [],
    error: '',
}


//Action Creator 

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}


//Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }

        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
    }

}


const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios("https://jsonplaceholder.typicode.com/users").then(response => {
            //array of data
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users));
        }).catch(error => {
            //error Message
            dispatch(fetchUsersFailure(error.message));
        })
    }
}


const store = createStore(reducer, applyMiddleware(thunkMiddleware.thunk));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
