import {
    updatePostSuccess,
    updatePostsFailure,
    updatePostsStarted,
    updatePostsSuccess,
} from "../store/postsSlice";

export const getPosts = () => {
    return async (dispatch) => {
        dispatch(updatePostsStarted());

        await fetch("https://jsonplaceholder.typicode.com/posts")
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await res.json();
                dispatch(updatePostsSuccess(data));
            })
            .catch((error) => {
                dispatch(updatePostsFailure(error.message));
            });
    };
};

export const updatePost = () => {
    return async (dispatch) => {
        dispatch(updatePostsStarted());

        await fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "PUT",
            body: JSON.stringify({
                id: 1,
                title: "foo",
                body: "bar",
                userId: 1,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await res.json();
                dispatch(updatePostSuccess(data));
            })
            .catch((error) => {
                dispatch(updatePostsFailure(error.message));
            });
    };
};
