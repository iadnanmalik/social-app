import React, { useState, useCallback, Fragment } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { withAuth } from "./withAuth";
import { useEffect } from "react";
import { setAuth } from "../utils/setAuth";
import styled from "styled-components";
import { Spinner } from "../styledComponents/usedStyled";
import { useGetUser } from "../hooks/useGetUser";

const RouteComponent = ({ children, user, setUser, ...rest }) => {
  const [result, loadUser] = useGetUser();
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  const { userData, success } = result;

  useEffect(() => {
    if (success) {
      setUser(userData);
    }
  }, [result]);

  return (
    <Fragment>
      {!user.name ? (
        <Spinner>
          <button class="btn btn-primary">
            <span class="spinner-border spinner-border-sm"></span>
          </button>
        </Spinner>
      ) : (
        <Route {...rest}>
          {user.name ? <> {children}</> : <Redirect to="/" />}
        </Route>
      )}
    </Fragment>
  );
};

export const PrivateRoute = withAuth(RouteComponent);
