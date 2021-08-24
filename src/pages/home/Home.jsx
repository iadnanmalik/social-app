import React, { useEffect, useState } from "react";
import "./home.css";
import { withAuth } from "../../HOC/withAuth";
import { withProfile } from "../../HOC/withProfile";
import { Fragment } from "react/cjs/react.development";
import { useHistory } from "react-router-dom";
import { Topbar } from "../../components/topbar/TopBar";
import { Sidebar } from "../../components/sidebar/Sidebar";

import { useProfile } from "../../hooks/useProfileMe";

const HomeComponent = ({ user, setProfileState }) => {
  const history = useHistory();
  const [result, setProfile] = useProfile();
  const [error, setError] = useState();
  const { success, loading, status, profile } = { ...result };

  const getCreateProfile = () => {
    history.push("/createProfile");
  };

  const getEditProfile = () => {
    history.push("/editProfile");
  };
  const getEducation = () => {
    history.push("/education");
  };

  useEffect(() => {
    if (!success) {
      setError(status);
    } else {
      setProfileState(profile);
    }
  }, [result]);

  useEffect(() => {
    setProfile();
  }, [setProfile]);

  return (
    <Fragment>
      {loading ? (
        <Fragment>
          <Topbar />
          <div className="homeContainer">Loading Home...</div>
        </Fragment>
      ) : (
        <Fragment>
          <Topbar />
          <div className="homeContainer">
            {!profile ? (
              <Fragment>
                <Sidebar />
                <p>Hey {user.name} You Forgot to Add Profile</p>
                <div className="buttonfeed">
                  <div className="buttonfeedWrapper">
                    <button className="loginButton" onClick={getCreateProfile}>
                      Create Profile
                    </button>
                  </div>
                </div>
                {error ? <p>{error}</p> : null}
              </Fragment>
            ) : (
              <Fragment>
                <Sidebar />
                <div className="buttonfeed">
                  <div className="buttonfeedWrapper">
                    <p>Welcome {user.name}</p>
                    <button className="loginButton" onClick={getEditProfile}>
                      Edit Profile
                    </button>
                    <button className="loginButton" onClick={getEducation}>
                      Add Education
                    </button>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export const Home = withProfile(withAuth(HomeComponent));
