import React, { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Topbar } from "../../components/topbar/TopBar";
import { Link } from "react-router-dom";
import { useProfileId } from "../../hooks/useProfileId";
import { withAuth } from "../../HOC/withAuth";
import { ProfileDetails } from "../../components/profileDetails/ProfileDetails";
export const ProfileComponent = ({ user }) => {
  const { id } = useParams();
  console.log(id);
  const [result, setProfileId] = useProfileId();
  const { profile, success, loading, status } = { ...result };

  useEffect(() => {
    if (loading) {
      console.log(loading);
    } else {
      console.log(profile, success);
    }
  }, [result]);
  useEffect(() => {
    setProfileId(id);
  }, [setProfileId, id]);
  return (
    <Fragment>
      <Topbar />
      <Fragment>
        <Link to="/profiles" className="btn btn-light">
          Back To Profiles
        </Link>
        {user && user._id === id ? (
          <Link to="/editProfile" className="btn btn-light">
            Edit profile
          </Link>
        ) : null}
      </Fragment>
      {profile ? (
        <Fragment>
          {/* <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <EduExp profile={profile} /> */}
          <ProfileDetails profile={profile.data} />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export const Profile = withAuth(ProfileComponent);
