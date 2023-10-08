import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [errMessage, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
let navigate=useNavigate()
  const validation = Yup.object({
    name: Yup.string()
      .min(3, "min length is 3 chars")
      .max(15, "Max length id 15 chars")
      .required("this is required"),
    email: Yup.string()
      .email("enter a vaild email")
      .required("this is requried"),
    phone: Yup.string()
      .required("this is required")
      .matches(/^01[0125][0-9]{8}$/i, "enter a valid phone number"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{4,}$/i, "enter a valid password"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "not matched"),
  });

  async function signUp(values) {
    setLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        console.log(err.response.data.message);
        setErr(err.response.data.message);
        setLoading(false);
      });
    // console.log(response);

    if (data.message === "success") {
      setLoading(false);
      formik.resetForm();
      navigate('/login')
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validation,
    onSubmit: signUp,
  });

  return (
    <div className="w-75 mx-auto mt-3">
      <h2>Register form</h2>
      {errMessage !== null ? (
        <p className="alert alert-danger">{errMessage}</p>
      ) : null}
      <form className="text-start mt-5" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
            type="text"
            id="name"
            className="form-control"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}
        </div>
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
          <label htmlFor="phone">Phone</label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            onChange={formik.handleChange}
            type="tel"
            id="phone"
            className="form-control"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
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
        <div className="mb-3">
          <label htmlFor="rePassword">Repassword</label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            type="password"
            id="rePassword"
            className="form-control"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : null}
        </div>
        {loading ? (
          <button className="btn bg-main ms-auto">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button
            disabled={!formik.isValid || !formik.dirty}
            type="submit"
            className="btn bg-main"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
