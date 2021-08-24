import axios from "axios";
import "./register.css";
import { useFormik } from "formik";
import { useEffect, useState, Fragment } from "react";
import * as Yup from "yup";
import { FormInput } from "../../components/FormInput";
import { useRegister } from "../../hooks/useRegister";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Topbar } from "../../components/topbar/TopBar";
export const Register = () => {
  const [result, register] = useRegister();
  const [apiErrors, setApiErrors] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (result?.data) {
      console.log("Signed Up Successfully");
      localStorage.setItem("token", result.data.token);
      history.push("/home");
    } else {
      setApiErrors(result?.response.data.errors[0].msg);
    }
  }, [result]);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      password2: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      password: Yup.string()
        .required("This field is required")
        .min(6, "Password must be atleast 6 characters"),
      password2: Yup.string()
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
          ),
        })
        .min(6, "Password must be atleast 8 characters"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),

    onSubmit: async (values) => {
      register({ values });
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
            <form className="loginBox" onSubmit={formik.handleSubmit}>
              <FormInput
                type="text"
                placeholder="Full Name"
                id="name"
                name="name"
                className="loginInput"
                {...formik.getFieldProps("name")}
                showError={formik.touched.name && formik.errors.name}
                error={formik.errors.name}
              />
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
              <FormInput
                type="password"
                placeholder="Confirm Password"
                id="password2"
                name="password2"
                className="loginInput"
                {...formik.getFieldProps("password2")}
                showError={formik.touched.password2 && formik.errors.password2}
                error={formik.errors.password2}
              />
              {apiErrors ? <Errors>{apiErrors}</Errors> : null}

              <button className="loginButton" type="submit">
                Sign Up
              </button>
              {/* <Link to="/login"> */}
              <div>
                <Terms>
                  By signing up, I agree to the Privacy Policy <br /> and Terms
                  of Service
                </Terms>
                <h4 className="downLink">
                  Already have an account?{" "}
                  <span className="downLinkSpan">
                    <Link to="/login">Sign In</Link>
                  </span>
                </h4>
              </div>

              {/* </Link> */}
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 10px;
  color: #808080;
  font-weight: 300;
`;
const Errors = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 12px;
  color: red;
  font-weight: 300;
`;
