import React, { Fragment, useState, useRef, useEffect } from "react";
import { withPosts } from "../../HOC/withPosts";
import { Link } from "react-router-dom";
import { ThumbUp, Comment, ContactSupportOutlined } from "@material-ui/icons";
import { CommentForm } from "../commentForm/CommentForm";
import { usePosts } from "../../hooks/usePosts";
import { useContext } from "react";
import { PostsContext } from "../../context/postsContext";
import { useLike } from "../../hooks/useLike";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDeleteComment } from "../../hooks/useDeleteComment";
import { useDeletePost } from "../../hooks/useDeletePost";
import { withAuth } from "../../HOC/withAuth";
const PostBodyComponent = ({ user, post, postsState, setPostsState }) => {
  const [resLikes, setLike] = useLike();
  const [result, setAllPosts] = usePosts();
  const [deleteCommentPostId, setDeleteCommentPostId] = useState();
  const [deleteComment, setDeleteComment] = useDeleteComment();
  const [deletePost, setDeletePost] = useDeletePost();
  const [deletePostIdState, setDeletePostIdState] = useState();

  const handleLike = (id) => {
    setLike(id);
    localId.current = id;
  };
  const handleDeleteComment = (postId, commentId) => {
    setDeleteComment(postId, commentId);
    setDeleteCommentPostId(postId);
  };
  const handleDeletePost = (postId) => {
    setDeletePost(postId);
    setDeletePostIdState(postId);
  };

  const { success } = { ...resLikes };
  const localId = useRef();

  useEffect(() => {
    const { success, comments } = { ...deleteComment };
    if (success) {
      const postIndex = postsState.findIndex(
        (post) => post._id === deleteCommentPostId
      );
      const tempPosts = [
        ...postsState.slice(0, postIndex),
        { ...postsState[postIndex], comments },
        ...postsState.slice(postIndex + 1),
      ];
      setPostsState(tempPosts);
    }

    //setPostsState("Hey");
  }, [deleteComment]);

  useEffect(() => {
    const { success } = { ...deletePost };
    if (success) {
      const postIndex = postsState.findIndex(
        (post) => post._id === deletePostIdState
      );
      const tempPosts = [
        ...postsState.slice(0, postIndex),
        ...postsState.slice(postIndex + 1),
      ];
      console.log("Post Index", postIndex);
      console.log("Temp Posts:", tempPosts);
      setPostsState(tempPosts);
    }
  }, [deletePost]);

  useEffect(() => {
    if (success) {
      document.getElementById(localId.current).innerHTML =
        parseInt(document.getElementById(localId.current).innerHTML) + 1;
    }
  }, [success]);

  return (
    <div className="post_topbar">
      {post.user === user._id ? (
        <button
          class="btn btn-outline-danger btn-rounded btn-sm"
          onClick={() => handleDeletePost(post._id)}
        >
          Delete
        </button>
      ) : null}
      <div class="card border-dark mb-3" style={{ maxWidth: "75%" }}>
        <div class="card-body text-dark">
          <Link to={`/profile/${post.user}`} class="text-center">
            <img
              className="rounded mx-auto d-block"
              style={{ maxWidth: "5%" }}
              src={post.avatar}
              alt=""
            />
            <p class="h6">{post.name}</p>
          </Link>
          <p class="card-text bg-light">{post.text}</p>
        </div>
        <div class="card-header">
          {" "}
          <button onClick={() => handleLike(post._id)}>
            <ThumbUp />
            <span id={post._id}>{post.likes.length}</span>
          </button>
          <button style={{ marginLeft: "5%" }}>
            <Comment />
            <span id={`${post._id}+comment`}>{post.comments.length}</span>
          </button>
          <div class="card">
            <div class="card-subtitle mb-2 text-muted">Comments</div>
            <div
              class="card-body"
              style={{ overflow: "auto", maxHeight: "150px" }}
            >
              {post.comments
                ? post.comments.map((comment) => (
                    <Fragment>
                      <p class="blockquote-footer">
                        {comment.text}
                        {comment.user === user._id ? (
                          <Button
                            class="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDeleteComment(post._id, comment._id)
                            }
                          >
                            Delete
                          </Button>
                        ) : null}
                      </p>
                    </Fragment>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PostBody = withPosts(withAuth(PostBodyComponent));
