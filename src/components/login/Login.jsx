import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserToken } from "../context/userToken";

export default function Login() {
  const [errMessage, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { setToken } = useContext(UserToken);
  const validation = Yup.object({
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{4,}$/i, "enter a valid password"),
    email: Yup.string()
      .email("enter a vaild email")
      .required("this is requried"),
  });

  async function login(values) {
    setLoading(true);
    let response = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        console.log(response);
        setErr(err.response.message);
        setLoading(false);
      });

    if (response.data.message === "success") {
      setLoading(false);
      formik.resetForm();
      console.log(response.data.token);
      navigate("/home");
      localStorage.setItem("userToken", response.data.token);
      setToken(localStorage.getItem("userToken"));
    }
  }

  let formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: validation,
    onSubmit: login,
  });

  return (
    <div className="w-75 mx-auto mt-3">
      <h2>Login form</h2>
      {errMessage !== null ? (
        <p className="alert alert-danger">{errMessage}</p>
      ) : null}
      <form className="text-start mt-5" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="mail">Email</label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            className="form-control"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            id="password"
            className="form-control"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}
        </div>

        {loading ? (
          <button className="btn bg-main ms-auto">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        ) : (
          <div>
            <button
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
              className="btn bg-main"
            >
              Login
            </button>
            <div className="d-flex justify-content-between">
              <Link to="/signup" className="text-decoration-none ">
                <span className="text-main me-auto">go to register now...</span>
              </Link>
              <Link to="/forgotPass" className="text-decoration-none ">
                <span className="text-main me-auto">Forgot Password..?</span>
              </Link>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
