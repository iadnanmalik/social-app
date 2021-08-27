import "./login.css";
import { useFormik } from "formik";
import { useEffect, useState, Fragment } from "react";
import * as Yup from "yup";
import { FormInput } from "../../components/FormInput";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Errors } from "../../styledComponents/usedStyled";
import { useHistory } from "react-router-dom";
import { Topbar } from "../../components/topbar/TopBar";

export const Login = () => {
  const [result, login] = useLogin();
  const [apiErrors, setApiErrors] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (result?.data) {
      console.log("Logged In Successfully");
      localStorage.setItem("token", result.data.token);
      history.push("/home");
    } else {
      setApiErrors(result?.response.data[0].msg);
    }
  }, [result]);

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("This field is required")
        .min(6, "Password must be atleast 6 characters"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),

    onSubmit: async (values) => {
      login({ values });
    },
  });
  return (
    <Fragment>
      <Topbar />

      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Socializer</h3>
            <span className="loginDesc">
              Signup and meet millions of people all over the world
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBoxLog" onSubmit={formik.handleSubmit}>
              <FormInput
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                className="loginInput"
                {...formik.getFieldProps("email")}
                showError={formik.touched.email && formik.errors.email}
                error={formik.errors.email}
              />
              <FormInput
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                className="loginInput"
                {...formik.getFieldProps("password")}
                showError={formik.touched.password && formik.errors.password}
                error={formik.errors.password}
              />
              {apiErrors ? <Errors>{apiErrors}</Errors> : null}

              <button className="loginButton" type="submit">
                Sign In
              </button>
              <div>
                <h4 className="downLink">
                  Not Registered Yet?{" "}
                  <span className="downLinkSpan">
                    {" "}
                    <Link to="/register">Sign Up</Link>
                  </span>
                </h4>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
