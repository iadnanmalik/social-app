import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useCreatePost } from "../../hooks/useCreatePost";
export const CreatePost = () => {
  const history = useHistory();
  const [result, createPost] = useCreatePost();
  const [error, setError] = useState();
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: Yup.object({
      text: Yup.string().required("Add Text to post"),
    }),

    onSubmit: async (values) => {
      console.log(values);
      createPost({ values });
      //    history.push("/posts");
    },
  });
  useEffect(() => {
    const { success, loading } = result;
    if (success) {
      history.push("/posts");
    } else if (!success && !loading) {
      const { status } = { ...result };
      setError(status);
    }
  }, [result]);
  return (
    <Fragment>
      <h1 className="large text-primary">Create New Post</h1>
      <p className="lead">
        <i className="fas fa-user" /> Write what's on your mind
      </p>

      <form className="profileBoxLog" onSubmit={formik.handleSubmit}>
        <small className="form-text">
          Could be anything you can think of...
        </small>
        <textarea
          type="text"
          placeholder="Add text..."
          id="text"
          name="text"
          className="form-control"
          {...formik.getFieldProps("text")}
        />

        {formik.touched.text && formik.errors.text ? (
          <>{formik.errors.text}</>
        ) : null}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/home">
          Go Back
        </Link>
      </form>
      {error ? <>{error}</> : null}
    </Fragment>
  );
};
