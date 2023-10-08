import axios from "axios";
import { useFormik } from "formik";
import React from "react";

export default function ReasetPass() {
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetPass,
  });
  async function resetPass(values) {
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      values
    );
    console.log(data);
  }

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-75 mx-auto my-5 text-start"
      >
        <label>Email:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          type="email"
          name="email"
          id="email"
          className="form-control"
        />
        <label>New Password:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
          type="password"
          name="newPassword"
          id="newPassword"
          className="form-control"
        />
        <button className="btn bg-main text-white my-3"> Reset Password</button>
      </form>
    </div>
  );
}
