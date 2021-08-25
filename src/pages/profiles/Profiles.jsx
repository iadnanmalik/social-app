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
  const { profiles, loading } = { ...result };

  console.log(result);
  return (
    <div>
      <Fragment>
        <Topbar />
        {loading ? (
          <button class="btn btn-primary">
            <span class="spinner-border spinner-border-sm"></span>
          </button>
        ) : (
          <Fragment>
            <h1 class="d-flex display-6 justify-content-center">Community </h1>
            <p class="d-flex  justify-content-center">
              <i class="fab fa-connectdevelop "></i> Browse and connect with
              similiar people
            </p>
            <div class="row row-cols-2 row-cols-md-2 g-4">
              {profiles?.map((dev) => (
                <div class="col">
                  <div key={dev.user._id} class="profile bg-light">
                    <div className="card h-100">
                      <div className="card-body">
                        <img
                          class="round-img"
                          src={dev.user.avatar}
                          alt="user"
                        />
                        <div>
                          <h2>{dev.user.name}</h2>
                          <p>{dev.status}</p>
                          <p>{dev.location}</p>
                        </div>

                        <ul>
                          {dev.skills.map((skill) => (
                            <li class="text-primary">
                              <i class="fas fa-check"></i> {skill}
                            </li>
                          ))}
                        </ul>
                        <Link
                          to={`/profile/${dev.user._id}`}
                          class="btn btn-primary"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};
