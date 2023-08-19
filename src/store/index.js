import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const countReducer = (
    state = {
        count: 50,
    }
) => {
    return state;
};

const initialState = {
    posts: [],
    postsLoading: false,
    error: null,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_POST_STARTED":
            return {
                ...state,
                postsLoading: true,
                error: null,
            };
        case "ADD_POST_SUCCESS":
            return {
                ...state,
                postsLoading: false,
                posts: action.payload,
                error: null,
            };
        case "ADD_POST_FAILURE":
            return {
                ...state,
                postsLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    countReducer,
    postsReducer,
});

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(rootReducer);
console.log(store.getState());

export default store;
