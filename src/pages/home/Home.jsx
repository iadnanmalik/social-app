import React, { useEffect, useState } from "react";
import "./home.css";
import { withAuth } from "../../HOC/withAuth";
import { withProfile } from "../../HOC/withProfile";
import { Fragment } from "react/cjs/react.development";
import { useHistory } from "react-router-dom";
import { Topbar } from "../../components/topbar/TopBar";
import { EducationDetail } from "../../components/educationDetail/EducationDetail";
import { ExperienceDetail } from "../../components/experienceDetail/ExperienceDetail";
import { useProfile } from "../../hooks/useProfileMe";

const HomeComponent = ({ user, setProfileState, profileState }) => {
  const history = useHistory();
  const [result, setProfile] = useProfile();
  const { success, loading, profile } = { ...result };
  const [contextSuccess, setContextSuccess] = useState(false);
  const getCreateProfile = () => {
    history.push("/createProfile");
  };

  const getEditProfile = () => {
    history.push("/editProfile");
  };
  const getEducation = () => {
    history.push("/education");
  };
  const getExperience = () => {
    history.push("/experience");
  };
  useEffect(() => {
    if (success && !loading) {
      setProfileState(profile);
    } else if (!success && loading) {
      setProfileState(false);
    }
  }, [result]);

  useEffect(() => {
    setProfile();
  }, [setProfile]);

  useEffect(() => {
    console.log(profileState);
    if (profileState.status) {
      setContextSuccess(true);
    }
  }, [profileState]);

  return (
    <Fragment>
      {loading ? (
        <Fragment>
          <Topbar />

          <button class="btn btn-primary">
            <span class="spinner-border spinner-border-sm"></span>
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <Topbar />
          <div className="homeContainer">
            {!contextSuccess ? (
              <Fragment>
                <p>Hey {user.name} You Forgot to Add Profile</p>
                <div className="buttonfeed">
                  <div className="buttonfeedWrapper">
                    <button className="loginButton" onClick={getCreateProfile}>
                      Create Profile
                    </button>
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div class="container  p-3 my-3 border mx-auto">
                  <div className="buttonfeed">
                    <div className="buttonfeedWrapper">
                      <p className="d-flex display-6 justify-content-center">
                        Welcome {user.name}
                      </p>
                      <div class="d-flex justify-content-sm-evenly">
                        <button
                          className="btn btn-outline-primary"
                          onClick={getEditProfile}
                        >
                          Edit Profile
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={getEducation}
                        >
                          Add Education
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={getExperience}
                        >
                          Add Experience
                        </button>
                      </div>
                    </div>
                  </div>
                  <p class="fs-5 text-primary">Education Details</p>
                  <EducationDetail educationList={profileState?.education} />
                  <p class="fs-5 text-primary">Experience Details</p>
                  <ExperienceDetail experienceList={profileState?.experience} />
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
