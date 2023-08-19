import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
    updatePostSuccess,
    updatePostsFailure,
    updatePostsStarted,
    updatePostsSuccess,
} from "../store/postsSlice";

const Post = ({
    updatePostsSuccess,
    updatePostsFailure,
    updatePostsStarted,
    updatePostSuccess,
}) => {
    const { posts, postsLoading } = useSelector((state) => state.posts);
    console.log(posts);

    const updatePost = () => {
        updatePostsStarted();

        fetch("https://jsonplaceholder.typicode.com/posts/1", {
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
                updatePostSuccess(data);
            })
            .catch((error) => {
                updatePostsFailure(error.message);
            });
    };

    useEffect(() => {
        if (postsLoading) {
            return;
        }

        updatePostsStarted();

        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await res.json();
                updatePostsSuccess(data);
            })
            .catch((error) => {
                updatePostsFailure(error.message);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <button onClick={() => updatePost()}>button</button>
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            ) : (
                <p>データがありません。</p>
            )}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            updatePostsSuccess,
            updatePostsFailure,
            updatePostsStarted,
            updatePostSuccess,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(Post);
