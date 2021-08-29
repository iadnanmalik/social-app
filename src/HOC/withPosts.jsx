import { useContext } from "react";
import { PostsContext } from "../context/postsContext";

export const withPosts = (WrappedComponent) => {
  return (props) => {
    const postsFromContext = useContext(PostsContext);

    return <WrappedComponent {...props} {...postsFromContext} />;
  };
};
