import React, { useEffect, useState } from "react";
import { withProfile } from "../../HOC/withProfile";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateProfile } from "../../hooks/useCreateProfile";
import { useHistory } from "react-router-dom";

import "./createProfile.css";
const CreateProfileComponent = () => {
  const [result, createProfile] = useCreateProfile();
  const history = useHistory();
  const { success, loading, status } = { ...result };

  useEffect(() => {
    if (success) {
      console.log(result.data);
      history.push("/home");
    } else {
      console.log(status);
    }
  }, [result]);
  const formik = useFormik({
    initialValues: {
      status: "",
      company: "",
      website: "",
      location: "",
      skills: "",
      github: "",
      bio: "",
    },
    validationSchema: Yup.object({
      status: Yup.string().required("Status is Required"),
      company: Yup.string(),
      website: Yup.string(),
      location: Yup.string(),
      skills: Yup.string().required("Skills are required"),
      github: Yup.string(),
      bio: Yup.string(),
    }),

    onSubmit: async (values) => {
      createProfile({ values });
    },
  });
  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="profileBoxLog" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <select name="status" id="status" {...formik.getFieldProps("status")}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
          {formik.touched.status && formik.errors.status ? (
            <>{formik.errors.status}</>
          ) : null}
        </div>
        <FormInput
          type="text"
          placeholder="Company"
          id="company"
          name="company"
          className="loginInput"
          {...formik.getFieldProps("company")}
          showError={formik.touched.company && formik.errors.company}
          error={formik.errors.company}
        />
        <small className="form-text">
          Could be your own company or one you work for
        </small>

        <FormInput
          type="text"
          placeholder="location"
          id="location"
          name="location"
          className="loginInput"
          {...formik.getFieldProps("location")}
          showError={formik.touched.location && formik.errors.location}
          error={formik.errors.location}
        />
        <small className="form-text">
          Could be your own or a company website
        </small>

        <FormInput
          type="text"
          placeholder="website"
          id="website"
          name="website"
          className="loginInput"
          {...formik.getFieldProps("website")}
          showError={formik.touched.website && formik.errors.website}
          error={formik.errors.website}
        />
        <small className="form-text">
          City & state suggested (eg. Boston, MA)
        </small>

        <FormInput
          type="text"
          placeholder="*Add Your Skills"
          id="skills"
          name="skills"
          className="loginInput"
          {...formik.getFieldProps("skills")}
          showError={formik.touched.skills && formik.errors.skills}
          error={formik.errors.skills}
        />
        <small className="form-text">
          Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
        </small>

        <FormInput
          type="text"
          placeholder="github"
          id="github"
          name="github"
          className="loginInput"
          {...formik.getFieldProps("github")}
          showError={formik.touched.github && formik.errors.github}
          error={formik.errors.github}
        />
        <small className="form-text">
          If you want your latest repos and a Github link, include your username
        </small>

        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            {...formik.getFieldProps("bio")}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/home">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export const CreateProfile = withProfile(CreateProfileComponent);
