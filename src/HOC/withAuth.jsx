import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const withAuth = (WrappedComponent) => {
  return (props) => {
    const userFromContext = useContext(AuthContext);

    return <WrappedComponent {...props} {...userFromContext} />;
  };
};
