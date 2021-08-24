import React, { useEffect } from "react";
import "./posts.css";
import { Link } from "react-router-dom";
import { Topbar } from "../../components/topbar/TopBar";
import { ThumbUp, Comment } from "@material-ui/icons";
import { usePosts } from "../../hooks/usePosts";
import { withAuth } from "../../HOC/withAuth";
const PostsComponent = ({ user, setUser }) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [result, setAllPosts] = usePosts();

  useEffect(() => {
    setAllPosts();
  }, [setAllPosts]);
  const { posts, success, loading, status } = { ...result };

  console.log(posts, success, loading, status);
  return (
    <div>
      <Topbar />
      {loading ? (
        <p>Loading</p>
      ) : (
        posts?.map((post) => (
          <div className="posts-section">
            <div className="post-bar">
              <div className="post_topbar">
                <div className="usy-dt">
                  <div className="usy-name">
                    <a href={`/profile/${post.user}`}>
                      <img className="round-img" src={post.avatar} alt="" />
                      <h3>{post.name}</h3>
                    </a>
                  </div>
                </div>
              </div>

              <div className="job_descp">
                <p>{post.text}</p>
              </div>
              <div className="job-status-bar">
                <ul className="like-com">
                  <li>
                    <button>
                      <ThumbUp />
                    </button>
                  </li>
                  <li>
                    <button>
                      <Comment />
                    </button>
                  </li>
                </ul>
                <a>
                  <i className="la la-eye"></i>Views 50
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export const Posts = withAuth(PostsComponent);
