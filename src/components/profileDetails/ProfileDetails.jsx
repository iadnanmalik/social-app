import React, { Fragment } from "react";
import { Link } from "react-router-dom";
export const ProfileDetails = ({ profile }) => {
  return (
    <Fragment>
      <div>
        <img className="round-img my-1" src={profile.user.avatar} alt="" />
        <h1 className="large">{profile.user.name}</h1>
        <p className="lead">{profile.user.status}</p>
        <p>{profile.user.location}</p>
        {profile.social ? (
          <div className="icons my-1">
            <Link
              to={profile.social.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-globe fa-2x"></i>
            </Link>
            <Link
              to={profile.social.twitter || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </Link>
            <Link
              to={profile.social.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook fa-2x"></i>
            </Link>
            <Link
              to={profile.social.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </Link>
            <Link
              to={profile.social.youtube || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube fa-2x"></i>
            </Link>
            <Link
              to={profile.social.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </Link>
          </div>
        ) : null}
      </div>
      <Fragment>
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{`${profile.user.name}'s Bio`}</h2>
          <p>{profile.bio}</p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {profile.skills.map((skill) => (
              <div className="p-1">
                <i className="fa fa-check"></i> {skill}
              </div>
            ))}
          </div>
        </div>
      </Fragment>
      <Fragment>
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.experience
            ? profile.experience.map((experience) => (
                <div>
                  <h3 className="text-dark">{experience.company}</h3>
                  <p>Oct 2011 - Current</p>
                  <p>
                    <strong>Position: </strong>
                    {experience.title}
                  </p>
                </div>
              ))
            : null}
        </div>
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education
            ? profile.education.map((edu, index) => (
                <div>
                  <h3>{edu.school}</h3>
                  <p>Sep 1993 - June 1999</p>
                  <p>
                    <strong>Degree: </strong>
                    {edu.degree}
                  </p>
                  <p>
                    <strong>Field Of Study: </strong>
                    {edu.fieldofstudy}
                  </p>
                  <p>
                    <strong>Description: </strong>
                  </p>
                </div>
              ))
            : null}
        </div>
      </Fragment>
    </Fragment>
  );
};
