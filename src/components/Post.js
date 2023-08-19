import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../actions/actions";

const Post = () => {
    const dispatch = useDispatch();
    const { posts, postsLoading } = useSelector((state) => state.posts);
    console.log(posts);

    useEffect(() => {
        if (postsLoading) {
            return;
        }

        dispatch(getPosts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <button onClick={() => dispatch(updatePost())}>button</button>
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
