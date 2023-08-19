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
        case "UPDATE_POSTS_STARTED":
            return { ...state, postsLoading: true, error: null };
        case "UPDATE_POSTS_SUCCESS":
            return {
                ...state,
                postsLoading: false,
                posts: action.payload,
                error: null,
            };
        case "UPDATE_POSTS_FAILURE":
            return { ...state, postsLoading: false, error: action.payload };
        case "UPDATE_POST_SUCCESS":
            const updatedPosts = state.posts.map((post) =>
                post.id === action.payload.id ? action.payload : post
            );
            return { ...state, posts: updatedPosts };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    countReducer,
    postsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
console.log(store.getState());

export default store;
