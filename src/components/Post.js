import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Post = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postsReducer.posts);
    console.log(posts);
    const postsLoading = useSelector((state) => state.postsLoading);

    useEffect(() => {
        console.log("useEffect");
        if (postsLoading) {
            console.log("Loading posts");
            return;
        }

        dispatch({
            type: "ADD_POST_STARTED",
        });
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(async (res) => {
                console.log("success");
                const data = await res.json();
                dispatch({
                    type: "ADD_POST_SUCCESS",
                    payload: data,
                });
            })
            .catch((err) => {
                console.log("error");
                dispatch({
                    type: "ADD_POST_FAILURE",
                    payload: err.message,
                });
            });
        console.log("end");
    }, [dispatch, postsLoading]);

    return (
        <div>
            {posts.length < 1 ? (
                <p>データがありません。</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Post;
