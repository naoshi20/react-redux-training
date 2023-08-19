// データ取得時
export const updatePostsStarted = () => {
    console.log("updatePostsStarted action dispatched");
    return {
        type: "UPDATE_POSTS_STARTED",
    };
};

export const updatePostsSuccess = (data) => {
    console.log("updatePostsSuccess action dispatched with payload:", data);
    return {
        type: "UPDATE_POSTS_SUCCESS",
        payload: data,
    };
};

export const updatePostsFailure = (error) => ({
    type: "UPDATE_POSTS_FAILURE",
    payload: error,
});

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

// 更新時
export const updatePostSuccess = (data) => {
    console.log("updatePostSuccess action dispatched with payload:", data);
    return {
        type: "UPDATE_POST_SUCCESS",
        payload: data,
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
