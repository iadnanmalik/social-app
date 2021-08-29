import React, { useState, Fragment, useEffect } from "react";
import { useComment } from "../../hooks/useComment";
import { withPosts } from "../../HOC/withPosts";
export const CommentFormComponent = ({
  id,
  setAllPosts,
  posts,
  postsState,
  setPostsState,
}) => {
  const [comment, setComment] = useState();
  const [result, setCommentCustom] = useComment();
  const handleSubmit = () => {
    setCommentCustom({ id, text: comment });
  };

  useEffect(() => {
    const { comments, success } = { ...result };
    if (success) {
      // for (let i = 0; i < posts.length; i++) {
      //   if (posts[i]._id === id) {
      //     posts[i].comments = comments;
      //     console.log(posts);
      //   }
      // }
      const tempIndex = posts.findIndex((p) => p._id === id);
      const tempPosts = [
        ...posts.slice(0, tempIndex),
        { ...posts[tempIndex], comments },
        ...posts.slice(tempIndex + 1),
      ];
      console.log(tempPosts);
      setComment("");
      setPostsState(tempPosts);
    }
  }, [result]);
  return (
    <Fragment>
      <div class="bg-light">
        <input
          type="text"
          id={id}
          placeholder="Add new Comment.."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></input>
        <button
          style={{ maxWidth: "10%" }}
          type="submit"
          class="btn btn-primary btn-sm "
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </Fragment>
  );
};

export const CommentForm = withPosts(CommentFormComponent);
