# Redux

```js
const redux = require("redux");
const createStore = redux.legacy_createStore;

const BUY_CAKE = "BUY_CAKE";

function buyCake() {
    return {
        type: BUY_CAKE,
        info: "My Buy Cake"
    };
}


const initialState = {
    numberOfCake: 10
}


//(prevState, action) => updatedState
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numberOfCake: state.numberOfCake - 1
        }

        default: return state;
    }
}


const store = createStore(reducer);

console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() => console.log("Updated State", store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe();
```

Certainly! Let's break down the provided code in terms of the three core concepts of Redux: Store, Actions, and Reducers.

### 1. Store:

In Redux, the store is a single source of truth that holds the entire state tree of your application. It can be created using the `createStore` function.

```javascript
const redux = require("redux");
const createStore = redux.legacy_createStore;

const store = createStore(reducer);
```

Here, `store` is the Redux store created using the `createStore` function and initialized with the reducer.

### 2. Actions:

Actions are plain JavaScript objects that describe an intention to change the state. In this example, there is an action creator function `buyCake` that returns an action object.

```javascript
const BUY_CAKE = "BUY_CAKE";

function buyCake() {
    return {
        type: BUY_CAKE,
        info: "My Buy Cake"
    };
}
```

- `BUY_CAKE` is an action type constant.
- `buyCake` is an action creator function that returns an action object with a `type` and additional information (`info`).

### 3. Reducers:

Reducers specify how the application's state changes in response to actions. They take the current state and an action as arguments and return a new state.

```javascript
const initialState = {
    numberOfCake: 10
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numberOfCake: state.numberOfCake - 1
            };

        default:
            return state;
    }
}
```

- `initialState` is the initial state of the application.
- `reducer` is a pure function that takes the current state and an action and returns a new state.
- In the case of `BUY_CAKE`, it returns a new state with the `numberOfCake` decremented by 1.

### Additional Code:

```javascript
console.log("Initial State", store.getState());
```

This line logs the initial state of the store.

```javascript
const unsubscribe = store.subscribe(() => console.log("Updated State", store.getState()));
```

`store.subscribe` adds a change listener. It logs the updated state whenever an action is dispatched.

```javascript
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
```

Dispatching actions to the store. Each `buyCake` action decrements the `numberOfCake` in the state.

```javascript
unsubscribe();
```

Unsubscribing the change listener. After this, further state changes won't log to the console.

### Summary:

- **Store:** Created using `createStore`, initialized with the reducer.
- **Actions:** Defined by action type constant and action creator function.
- **Reducers:** Pure function defining how the state changes in response to actions.

This example demonstrates a simple Redux setup for managing the state of the number of cakes in a store.





> when you are subscribing, why it is stored in unsubscribe? how is it even function?

In Redux, when you call the `subscribe` method on a store, it returns a function known as the "unsubscribe" function. This function, when invoked, stops the listener from being notified of state changes. The reason for this design is to provide a way for the developer to explicitly opt out of further updates when they are no longer needed. It's a mechanism to clean up resources and avoid potential memory leaks.

Here's a brief explanation of how it works:

1. **Subscribe Method:**
   When you call `store.subscribe(callback)`, the `callback` function you provide will be invoked whenever the store's state changes.

   ```javascript
   const unsubscribe = store.subscribe(() => console.log("Updated State", store.getState()));
   ```

   The `subscribe` method returns an `unsubscribe` function.

2. **Unsubscribe Function:**
   The `unsubscribe` function is a closure that holds a reference to the `callback` function passed to `subscribe`. When you later invoke `unsubscribe()`, it essentially removes the reference to the `callback` function, preventing it from being called on subsequent state changes.

   ```javascript
   unsubscribe();
   ```

   Now, the `callback` function will no longer be invoked when the store's state changes.

3. **Why Use Unsubscribe:**
   - This mechanism allows developers to control when they want to stop listening to state changes.
   - It's particularly useful in scenarios where a component is unmounted, and you want to clean up resources associated with that component.
   - It helps avoid potential memory leaks by ensuring that functions or components are not unnecessarily kept in memory if they are no longer needed.

In summary, the `unsubscribe` function is a way to opt out of further updates, and it's a common pattern in many event-driven systems, providing a mechanism for explicit cleanup.




# Multiple Reducers

```js
//Redux Store
const redux = require("redux");
const createStore = redux.legacy_createStore;

//Multiple reducer
const combineReducer = redux.combineReducers;


//Action Creator
const BUY_CAKE = "BUY_CAKE";
const BUY_ICE_CREAM = "BUY_ICE_CREAM";

function buyCake() {
    return {
        type: BUY_CAKE,
        info: "My Buy Cake"
    };
}

function buyIceCream() {
    return {
        type: BUY_ICE_CREAM,
        info: "My Buy ice cream"
    };
}


//Reducer
// const initialState = {
//     numberOfCake: 10,
//     numberOfIceCream : 20
// }

const initialCakeState = {
    numberOfCake: 10,
}

const initialIceCreamState = {
    numberOfIceCream: 20,
}


//(prevState, action) => updatedState
// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case BUY_CAKE: return {
//             ...state,
//             numberOfCake: state.numberOfCake - 1
//         }

//         case BUY_ICE_CREAM: return {
//             ...state,
//             numberOfIceCream: state.numberOfIceCream - 1
//         }

//         default: return state;
//     }
// }



const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numberOfCake: state.numberOfCake - 1
        }

        default: return state;
    }
}

const IceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICE_CREAM: return {
            ...state,
            numberOfIceCream: state.numberOfIceCream - 1
        }

        default: return state;
    }
}





//Combine the reducers
const rootReducer = combineReducer({
    cake: cakeReducer,
    icerCream: IceCreamReducer
});

//Redux Store
const store = createStore(rootReducer);


//Dispact, listening, Unsubscribe
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() => console.log("Updated State", store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
```




In your case, the action type is `BUY_CAKE`, and when you dispatch `buyCake`, it goes through both reducers because you have combined them using `combineReducers`. However, only the `cakeReducer` responds to the `BUY_CAKE` action type, and the `IceCreamReducer` ignores it because the action type doesn't match.

Let's clarify the flow:

1. You dispatch an action:

   ```javascript
   store.dispatch(buyCake());
   ```

2. The action goes through both reducers:

   - `cakeReducer` checks the action type (`BUY_CAKE`) and responds by updating the state for the `cake` slice.
   - `IceCreamReducer` checks the action type (`BUY_CAKE`) but does not respond because it is looking for `BUY_ICE_CREAM`.

So, even though the action goes through both reducers, only the one that matches the action type will actually update the state. The other reducer will return the current state without making any changes.

This behavior is by design in Redux, where each reducer is independent and handles a specific part of the state.



> so basically it tries to touch all reducers even tho just buy cake is called, but ultimately only cakeReducer return the result

Yes, exactly. When you dispatch an action in a Redux store with multiple reducers combined using `combineReducers`, the action is processed by all reducers. However, each individual reducer decides whether to respond to the action based on the action type.

In your example, when you dispatch `buyCake`, both the `cakeReducer` and the `IceCreamReducer` are called because the action goes through all combined reducers:

```javascript
store.dispatch(buyCake());
```

However, only the `cakeReducer` responds to the action because it checks if the action type (`BUY_CAKE`) matches the type it's designed to handle. The `IceCreamReducer` sees that the action type is not `BUY_ICE_CREAM`, so it doesn't make any changes to the state.

This mechanism allows you to modularize your state management, with each reducer responsible for a specific part of the overall state. Even though actions are processed by all reducers, only the relevant reducers respond based on the action type, ensuring that state updates are focused on specific slices of the state tree.




<hr>

# MiddleWare - (Redux-logger)

```js 

//Redux Store
const redux = require("redux");
const createStore = redux.legacy_createStore;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleWare = redux.applyMiddleware;


//Multiple reducer
const combineReducer = redux.combineReducers;


//Action Creator
const BUY_CAKE = "BUY_CAKE";
const BUY_ICE_CREAM = "BUY_ICE_CREAM";

function buyCake() {
    return {
        type: BUY_CAKE,
        info: "My Buy Cake"
    };
}

function buyIceCream() {
    return {
        type: BUY_ICE_CREAM,
        info: "My Buy ice cream"
    };
}


//Reducer
// const initialState = {
//     numberOfCake: 10,
//     numberOfIceCream : 20
// }

const initialCakeState = {
    numberOfCake: 10,
}

const initialIceCreamState = {
    numberOfIceCream: 20,
}


//(prevState, action) => updatedState
// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case BUY_CAKE: return {
//             ...state,
//             numberOfCake: state.numberOfCake - 1
//         }

//         case BUY_ICE_CREAM: return {
//             ...state,
//             numberOfIceCream: state.numberOfIceCream - 1
//         }

//         default: return state;
//     }
// }



const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numberOfCake: state.numberOfCake - 1
        }

        default: return state;
    }
}

const IceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICE_CREAM: return {
            ...state,
            numberOfIceCream: state.numberOfIceCream - 1
        }

        default: return state;
    }
}


//Combine the reducers
const rootReducer = combineReducer({
    cake: cakeReducer,
    icerCream: IceCreamReducer
});

//Redux Store
const store = createStore(rootReducer, applyMiddleWare(logger));


//Dispact, listening, Unsubscribe
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
```

```bash
Initial State { cake: { numberOfCake: 10 }, icerCream: { numberOfIceCream: 20 } }
 action BUY_CAKE @ 12:02:24.336
   prev state { cake: { numberOfCake: 10 }, icerCream: { numberOfIceCream: 20 } }
   action     { type: 'BUY_CAKE', info: 'My Buy Cake' }
   next state { cake: { numberOfCake: 9 }, icerCream: { numberOfIceCream: 20 } }
 action BUY_CAKE @ 12:02:24.345
   prev state { cake: { numberOfCake: 9 }, icerCream: { numberOfIceCream: 20 } }
   action     { type: 'BUY_CAKE', info: 'My Buy Cake' }
   next state { cake: { numberOfCake: 8 }, icerCream: { numberOfIceCream: 20 } }
 action BUY_CAKE @ 12:02:24.350
   prev state { cake: { numberOfCake: 8 }, icerCream: { numberOfIceCream: 20 } }
   action     { type: 'BUY_CAKE', info: 'My Buy Cake' }
   next state { cake: { numberOfCake: 7 }, icerCream: { numberOfIceCream: 20 } }
 action BUY_ICE_CREAM @ 12:02:24.355
   prev state { cake: { numberOfCake: 7 }, icerCream: { numberOfIceCream: 20 } }
   action     { type: 'BUY_ICE_CREAM', info: 'My Buy ice cream' }
   next state { cake: { numberOfCake: 7 }, icerCream: { numberOfIceCream: 19 } }
 action BUY_ICE_CREAM @ 12:02:24.359
   prev state { cake: { numberOfCake: 7 }, icerCream: { numberOfIceCream: 19 } }
   action     { type: 'BUY_ICE_CREAM', info: 'My Buy ice cream' }
   next state { cake: { numberOfCake: 7 }, icerCream: { numberOfIceCream: 18 } }
```

<hr>

# Async - Fetch User

```js 
const redux = require("redux");
const createStore = redux.legacy_createStore;

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


const store = createStore(reducer);
```


# How to make API call in Redux

```js 
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

```

Now, let's go through each section:

1. **Imports:**
   - The code starts by importing necessary modules from the `redux` library and other dependencies (`axios` for making HTTP requests and `redux-thunk` for handling asynchronous actions).

2. **State:**
   - `initialState` defines the initial structure of the state, representing the loading status, user data, and error.

3. **Action Types:**
   - Constants (`FETCH_USERS_REQUEST`, `FETCH_USERS_SUCCESS`, `FETCH_USERS_FAILURE`) are defined to represent different types of actions.

4. **Action Creators:**
   - Functions like `fetchUsersRequest`, `fetchUsersSuccess`, and `fetchUsersFailure` are action creators. They return action objects with a `type` and, in the case of success and failure, a `payload` containing relevant data.

5. **Reducer:**
   - `reducer` is a pure function that specifies how the state should change in response to different actions. It updates the state based on the action type and payload.

6. **Thunk Action Creator:**
   - `fetchUsers` is a thunk action creator. It returns a function instead of a plain action object. This function takes `dispatch` as an argument, allowing asynchronous actions to be dispatched inside.

7. **Middleware Setup:**
   - The `applyMiddleware` function is used to apply middleware to the store. In this case, `redux-thunk` middleware is applied.

8. **Store:**
   - The store is created using `createStore` with the combined reducer and middleware applied. The `subscribe` method is used to log the state changes.

9. **Dispatching Thunk Action:**
   - Finally, the `fetchUsers` thunk action is dispatched. It triggers an asynchronous operation (an API call in this case) and dispatches other actions based on the result.

The overall flow is: dispatching `fetchUsers` → `fetchUsers` thunk action is executed → `dispatch` calls the inner function with `dispatch` as an argument → API call is made → Based on the API response, appropriate actions are dispatched.

This pattern is commonly used in Redux for handling asynchronous actions, allowing for more complex logic before dispatching the final action.

<hr>







