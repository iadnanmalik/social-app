import React, { useEffect, useState, Fragment, useRef } from "react";
import "./posts.css";
import { Link } from "react-router-dom";
import { Topbar } from "../../components/topbar/TopBar";
import { ThumbUp, Comment } from "@material-ui/icons";
import { usePosts } from "../../hooks/usePosts";
import { withAuth } from "../../HOC/withAuth";
import { useLike } from "../../hooks/useLike";
import { Button } from "@material-ui/core";
import { CommentForm } from "../../components/commentForm/CommentForm";
import { useHistory } from "react-router";
import { useDeleteComment } from "../../hooks/useDeleteComment";
import { useDeletePost } from "../../hooks/useDeletePost";
const PostsComponent = ({ user, setUser }) => {
  const [result, setAllPosts] = usePosts();
  const [resLikes, setLike] = useLike();
  const [deleteCommentPostId, setDeleteCommentPostId] = useState();
  const [deleteComment, setDeleteComment] = useDeleteComment();
  const [deletePost, setDeletePost] = useDeletePost();
  const [deletePostIdState, setDeletePostIdState] = useState();

  const { posts, loading } = { ...result };
  const { success } = { ...resLikes };
  const localId = useRef();
  const history = useHistory();
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
  const handleNewPost = () => {
    history.push("/createPost");
  };
  useEffect(() => {
    const { success, comments } = { ...deleteComment };
    if (success) {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i]._id === deleteCommentPostId) {
          posts[i].comments = comments;
        }
      }
      setAllPosts(posts);
    }
  }, [deleteComment]);

  useEffect(() => {
    const { success } = { ...deletePost };
    if (success) {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i]._id === deletePostIdState) {
          posts.splice(i, 1);
        }
      }
      setAllPosts(posts);
    }
    console.log({ ...deletePost });
  }, [deletePost]);

  useEffect(() => {
    setAllPosts();
  }, [setAllPosts]);

  useEffect(() => {
    if (success) {
      document.getElementById(localId.current).innerHTML =
        parseInt(document.getElementById(localId.current).innerHTML) + 1;
    }
  }, [success]);

  return (
    <Fragment>
      <Topbar />

      {loading ? (
        <button class="btn btn-primary">
          <span class="spinner-border spinner-border-sm"></span>
        </button>
      ) : posts ? (
        posts.map((post) => (
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
                  <CommentForm
                    id={post._id}
                    setAllPosts={setAllPosts}
                    posts={posts}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : null}
      <button
        class="float btn btn-outline-primary btn-rounded"
        onClick={handleNewPost}
      >
        New Post
      </button>
    </Fragment>
  );
};

export const Posts = withAuth(PostsComponent);
