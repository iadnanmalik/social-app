import { useContext } from "react";
import { ProfileContext } from "../context/profileContext";
// import { useEffect, useCallback } from "react";
// import { setAuth } from "../utils/setAuth";
// //import { setAuth } from "../utils/setAuth";
// import axios from "axios";

export const withProfile = (WrappedComponent) => {
  return (props) => {
    const profileFromContext = useContext(ProfileContext);

    return <WrappedComponent {...props} {...profileFromContext} />;
  };
};
