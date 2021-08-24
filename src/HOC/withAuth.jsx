import { useContext } from "react";
import { AuthContext } from "../context/authContext";
// import { useEffect, useCallback } from "react";
// import { setAuth } from "../utils/setAuth";
// //import { setAuth } from "../utils/setAuth";
// import axios from "axios";

export const withAuth = (WrappedComponent) => {
  return (props) => {
    const userFromContext = useContext(AuthContext);

    return <WrappedComponent {...props} {...userFromContext} />;
  };
};
