import React, { useState, Fragment, useEffect } from "react";
import { useComment } from "../../hooks/useComment";

export const CommentForm = ({ id, setAllPosts, posts }) => {
  const [comment, setComment] = useState();
  const [result, setCommentCustom] = useComment();
  const handleSubmit = () => {
    setCommentCustom({ id, text: comment });
  };
  const { comments } = { ...result };

  useEffect(() => {
    if (result?.success) {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i]._id === id) {
          posts[i].comments = comments;
          console.log(posts);
        }
      }
      setComment("");
      setAllPosts(posts);
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
