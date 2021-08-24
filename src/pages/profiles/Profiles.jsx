import "./profiles.css";
import React, { useEffect, Fragment } from "react";
import { useProfiles } from "../../hooks/useProfiles";
import { Topbar } from "../../components/topbar/TopBar";
import { Link } from "react-router-dom";
export const Profiles = () => {
  const [result, setAllProfiles] = useProfiles();

  useEffect(() => {
    setAllProfiles();
  }, [setAllProfiles]);
  const { profiles, success, loading, status } = { ...result };

  console.log(result);
  return (
    <div>
      <Fragment>
        <Topbar />
        {loading ? (
          <Fragment>Loading...</Fragment>
        ) : (
          <Fragment>
            <h1 class="large text-primary">Community </h1>
            <p class="lead">
              <i class="fab fa-connectdevelop"></i> Browse and connect with
              similiar people
            </p>
            <div class="profiles">
              {profiles?.map((dev) => (
                <div key={dev.user._id} class="profile bg-light">
                  <img class="round-img" src={dev.user.avatar} alt="user" />
                  <div>
                    <h2>{dev.user.name}</h2>
                    <p>{dev.status}</p>
                    <p>{dev.location}</p>
                    <Link
                      to={`/profile/${dev.user._id}`}
                      class="btn btn-primary"
                    >
                      View Profile
                    </Link>
                  </div>

                  <ul>
                    {dev.skills.map((skill) => (
                      <li class="text-primary">
                        <i class="fas fa-check"></i> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};
