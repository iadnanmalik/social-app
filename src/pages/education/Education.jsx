import React from "react";
import { useState, Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useEducation } from "../../hooks/useEducation";
import { Topbar } from "../../components/topbar/TopBar";

export const Education = () => {
  const [toggleTo, setToggelTo] = useState(true);
  const [result, addEducation] = useEducation();
  const [error, setError] = useState();
  const history = useHistory();

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    current: false,
    to: "",
    description: "",
  });
  const { school, degree, fieldofstudy, from, current, to, description } =
    formData;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const { success, loading, status } = result;
    if (success) {
      history.push("/home");
    } else if (!loading) {
      setError(status);
    }
  }, [result]);
  const onSubmit = (e) => {
    e.preventDefault();
    addEducation({ formData });
    console.log({ formData });
  };
  return (
    <Fragment>
      <Topbar />
      <div class="container  p-3 my-3 border mx-auto">
        <h1 className="d-flex display-6 justify-content-center">
          Add Your Education
        </h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"></i> Add any school, bootcamp,
          etc that you have attended
        </p>
        <small>* = required field</small>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="form-outline mb-4">
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              class="form-control"
              required
              value={school}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-outline mb-4">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              class="form-control"
              required
              value={degree}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-outline mb-4">
            <input
              type="text"
              class="form-control"
              placeholder="Field Of Study"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-outline mb-4">
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              class="form-control"
              value={from}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-outline mb-4">
            <p>
              <input
                type="checkbox"
                name="current"
                value={current}
                onChange={(e) => {
                  setFormData({ ...formData, current: !current });
                  setToggelTo(!toggleTo);
                }}
              />{" "}
              Current School or Bootcamp
            </p>
          </div>
          {toggleTo ? (
            <div class="form-outline mb-4">
              <h4>To Date</h4>
              <input
                type="date"
                name="to"
                class="form-control"
                value={to}
                onChange={(e) => onChange(e)}
              />
            </div>
          ) : null}
          <div class="form-outline mb-4">
            <textarea
              name="description"
              cols="30"
              rows="5"
              class="form-control"
              placeholder="Program Description"
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          {error ? (
            <Fragment>
              <p>{error}</p>
            </Fragment>
          ) : null}
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/home">
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};
