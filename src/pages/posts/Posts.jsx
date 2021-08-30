import React, { useEffect, useState, Fragment, useRef } from "react";
import "./posts.css";
import { Link } from "react-router-dom";
import { Topbar } from "../../components/topbar/TopBar";
import { usePosts } from "../../hooks/usePosts";
import { withAuth } from "../../HOC/withAuth";
import { useContext } from "react";
import { CommentForm } from "../../components/commentForm/CommentForm";
import { useHistory } from "react-router";
import { PostsContext } from "../../context/postsContext";
import { Spinner } from "../../styledComponents/usedStyled";
import { PostBody } from "../../components/postBody/PostBody";
import { withPosts } from "../../HOC/withPosts";
const PostsComponent = ({
  postsState,
  setPostsState,
  loadingPosts,
  setLoadingPosts,
}) => {
  const [result, setAllPosts] = usePosts();
  const history = useHistory();

  const { posts, loading, success } = result;
  useEffect(() => {
    if (success && !loading) {
      setPostsState(posts);
    }
  }, [result]);

  const handleNewPost = () => {
    history.push("/createPost");
  };

  useEffect(() => {
    console.log("redirected");
    setLoadingPosts(true);
    setAllPosts();
  }, [setAllPosts]);

  useEffect(() => {
    if (postsState.length > 0 && success) {
      setLoadingPosts(false);
    }
  }, [postsState]);
  return (
    <Fragment>
      <Topbar />
      {loadingPosts ? (
        <Spinner>
          <button class="btn btn-primary">
            <span class="spinner-border spinner-border-sm"></span>
          </button>
        </Spinner>
      ) : postsState ? (
        postsState?.map((post) => (
          <Fragment>
            <PostBody post={post} /> <CommentForm id={post._id} posts={posts} />
          </Fragment>
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

export const Posts = withPosts(withAuth(PostsComponent));
