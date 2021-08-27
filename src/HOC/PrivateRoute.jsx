import React, { useState, useCallback, Fragment } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { withAuth } from "./withAuth";
import { useEffect } from "react";
import { setAuth } from "../utils/setAuth";
import axios from "axios";

const RouteComponent = ({ children, user, setUser, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const localToken = localStorage.getItem("token");
  const loadUser = useCallback(
    async (localToken) => {
      setAuth(localToken);
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/auth`);
        const { email, name, avatar, _id } = res.data;
        console.log(email, name, avatar, _id);
        setUser({ email, name, avatar, _id });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
    [setUser]
  );
  useEffect(() => {
    loadUser(localToken);
  }, [loadUser]);

  return (
    <Fragment>
      {isLoading ? (
        <button class="btn btn-primary">
          <span class="spinner-border spinner-border-sm"></span>
        </button>
      ) : (
        <Route {...rest}>
          {user.name ? <> {children}</> : <Redirect to="/" />}
        </Route>
      )}
    </Fragment>
  );
};

export const PrivateRoute = withAuth(RouteComponent);
