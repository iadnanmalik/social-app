import React from "react";
import { useState, Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useExperience } from "../../hooks/useExperience";
import { Topbar } from "../../components/topbar/TopBar";
export const Experience = () => {
  const [toggleTo, setToggelTo] = useState(true);
  const [result, addExperience] = useExperience();
  const [error, setError] = useState();
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
  });
  const { title, company, location, from, to, current } = formData;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { success, loading, status } = { ...result };
  useEffect(() => {
    if (success) {
      history.push("/home");
    } else if (!loading) {
      setError(status);
    }
  }, [result]);
  const onSubmit = (e) => {
    e.preventDefault();
    addExperience({ formData });
    console.log({ formData });
  };
  return (
    <Fragment>
      <Topbar />
      <div class="container  p-3 my-3 border mx-auto">
        <h1 class="d-flex display-6 justify-content-center">
          Add An Experience
        </h1>
        <p class="lead">
          <i class="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="form-outline mb-4">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              class=" d-flex form-control"
              required
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-outline mb-4">
            <input
              type="text"
              placeholder="* Company"
              name="company"
              class="form-control"
              required
              value={company}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-outline mb-4">
            <input
              type="text"
              placeholder="Location"
              class="form-control"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-outline mb-4">
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              class="form-control"
              value={from}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-outline mb-4">
            <p>
              <input
                type="checkbox"
                name="current"
                class=""
                value={current}
                onChange={(e) => {
                  setFormData({ ...formData, current: !current });
                  setToggelTo(!toggleTo);
                }}
              />{" "}
              Current Company
            </p>
          </div>
          {toggleTo && (
            <div className="form-outline mb-4">
              <h4>To Date</h4>
              <input
                type="date"
                name="to"
                class="form-control"
                value={to}
                onChange={(e) => onChange(e)}
              />
            </div>
          )}
          {error ? (
            <Fragment>
              <p>{error}</p>
            </Fragment>
          ) : null}
          <input type="submit" className="btn btn-primary btn-lg btn-block" />
          <Link className="btn btn-light" to="/home">
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};
