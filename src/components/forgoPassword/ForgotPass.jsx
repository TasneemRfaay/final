import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function ForgotPass() {
  // **********************forgotPassword************************
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter a vaild email"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendCode,
  });

  async function sendCode(values) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      values
    );
    // console.log(data);
    if (data.statusMsg === "success") {
      document.querySelector(".forgotPass").classList.add("d-none");
      document.querySelector(".VerfiyCode").classList.remove("d-none");
    }
  }
  // **********************Verfiy Code************************
  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required("code is required"),
  });
  const formik1 = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationSchema2,
    onSubmit: verfiyCode,
  });
  let navigate = useNavigate();
  async function verfiyCode(values) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      values
    );
    console.log(data);
    if (data.status === "Success") {
        navigate("/resetPass");
    }
  }

  return (
    <>
      <div className="forgotPass">
        <h3>ResetPassword</h3>
        <form
          className="w-75 mx-auto my-5 text-start"
          onSubmit={formik.handleSubmit}
        >
          <label>Email:</label>
          <input
            type="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            id="email"
            name="email"
            className="form-control"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}
          <button
            disabled={!(formik.dirty && formik.isValid)}
            type="submit"
            className="btn bg-main text-white my-3"
          >
            send Code
          </button>
        </form>
      </div>
      <div className="VerfiyCode d-none">
        <h3>Verfiy Code</h3>
        <form
          className="w-75 mx-auto my-5 text-start"
          onSubmit={formik1.handleSubmit}
        >
          <label>Verfiction Code:</label>
          <input
            type="text"
            value={formik1.values.resetCode}
            onBlur={formik1.handleBlur}
            onChange={formik1.handleChange}
            id="resetCode"
            name="resetCode"
            className="form-control"
          />
          {formik1.touched.resetCode && formik1.errors.resetCode ? (
            <p className="text-danger">{formik1.errors.resetCode}</p>
          ) : (
            ""
          )}
          <button
            disabled={!(formik1.dirty && formik1.isValid)}
            type="submit"
            className="btn bg-main text-white my-3"
          >
            VerfiyCode
          </button>
        </form>
      </div>
    </>
  );
}
