import { useContext } from "react";
import { ProfileContext } from "../context/profileContext";

export const withProfile = (WrappedComponent) => {
  return (props) => {
    const profileFromContext = useContext(ProfileContext);
    return <WrappedComponent {...props} {...profileFromContext} />;
  };
};
