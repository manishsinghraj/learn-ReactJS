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

