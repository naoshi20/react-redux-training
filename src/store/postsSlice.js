import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    postsLoading: false,
    error: null,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        updatePostsStarted: (state) => {
            state.postsLoading = true;
            state.error = null;
        },
        updatePostsSuccess: (state, action) => {
            state.postsLoading = false;
            state.posts = action.payload;
            state.error = null;
        },
        updatePostsFailure: (state, action) => {
            state.postsLoading = false;
            state.error = action.payload;
        },
        updatePostSuccess: (state, action) => {
            const index = state.posts.findIndex(
                (post) => post.id === action.payload.id
            );
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
    },
});

export const {
    updatePostsStarted,
    updatePostsSuccess,
    updatePostsFailure,
    updatePostSuccess,
} = postsSlice.actions;

export default postsSlice.reducer;
