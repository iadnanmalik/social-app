import React, { useState, useCallback, Fragment } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { withAuth } from "./withAuth";
import { useEffect } from "react";
import { setAuth } from "../utils/setAuth";
import styled from "styled-components";
import { Spinner } from "../styledComponents/usedStyled";
import { useGetUser } from "../hooks/useGetUser";

const RouteComponent = ({
  children,
  user,
  setUser,
  loading,
  setLoading,
  ...rest
}) => {
  const [result, loadUser] = useGetUser();
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  const { userData, success, loadingHook } = result;

  useEffect(() => {
    if (success) {
      setLoading(true);
      setUser(userData);
    }
  }, [result]);
  useEffect(() => {
    console.log("Here");
    console.log(success);
    if (user.name && success) {
      setLoading(false);
    }
    if (!user.name && !success && loadingHook) {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    console.log(loading);
  }, [loading]);
  return (
    <Fragment>
      {loading ? (
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
