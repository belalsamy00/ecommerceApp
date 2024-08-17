import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function ForgotPassword(props) {
  const [loding, setLoding] = useState(false);
  const [ResetCodeloding, setResetCodeLoding] = useState(false);
  const [NewPasswordloding, setNewPasswordLoding] = useState(false);
  const [UserForgotPasswordForm, setUserForgotPasswordForm] = useState(true);
  const [UserResetCodeForm, setUserResetCodeForm] = useState(false);
  const [NewPasswordForm, setNewPasswordForm] = useState(false);
  const navegtion = useNavigate();

  async function UserForgotPassword(values) {
    setLoding(true);
    try {
      const respon = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      setLoding(false);
      setUserForgotPasswordForm(false);
      setUserResetCodeForm(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoding(false);
    }
  }
  
  async function UserResetCode(values) {
    setResetCodeLoding(true);
    try {
      const respon = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      setResetCodeLoding(false);
      setUserResetCodeForm(false);
      setNewPasswordForm(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setResetCodeLoding(false);
    }
  }

  async function UserNewPassword(values) {
    values.email = formik.values.email
    setNewPasswordLoding(true);
    try {
      const respon = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      setNewPasswordLoding(false);
      toast.success('reset Password successfuly You can Login now');
      navegtion("/login");
    } catch (error) {
      setNewPasswordLoding(false);
      toast.error(error.response.data.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Not valid Email !").required("Required"),
    }),
    onSubmit: UserForgotPassword,
  });

  const ResetCodeformik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: Yup.object().shape({
      resetCode: Yup.string().required("Required"),
    }),
    onSubmit: UserResetCode,
  });

  const NewPasswordFormik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema: Yup.object().shape({
      newPassword:  Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .required("Required"),
    }),
    onSubmit: UserNewPassword,
  });

  return (
    <div className="container mx-auto px-8">
      {UserForgotPasswordForm ? (
        <form
          onSubmit={formik.handleSubmit}
          action=""
          className="flex flex-wrap justify-center gap-5 w-10/12 lg:w-6/12  mx-auto"
        >
          {/* email */}
          <div className="w-full">
            <div className="relative">
              <input
                type="email"
                id="email"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loding ? (
                  <i className="fa fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "submit"
                )}
              </button>
            </div>
            {formik.errors.email && formik.touched.email ? (
              <p className=" mt-2 text-xs text-red-600 dark:text-red-400">
                <span className="font-medium">Oh, Error! </span>
                {formik.errors.email}
              </p>
            ) : null}
          </div>
        </form>
      ) : null}

      {UserResetCodeForm ? (
        <form
          onSubmit={ResetCodeformik.handleSubmit}
          action=""
          className="flex flex-wrap justify-center gap-5 w-10/12 lg:w-6/12 mt-5 mx-auto"
        >
          {/* ResetCode */}
          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                id="resetCode"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ResetCode"
                required
                onChange={ResetCodeformik.handleChange}
                onBlur={ResetCodeformik.handleBlur}
                value={ResetCodeformik.values.resetCode}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {ResetCodeloding ? (
                  <i className="fa fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Verify"
                )}
              </button>
            </div>
            <p className=" mt-2 text-xs text-green-600 dark:text-red-400">
              WE sent to your email The Reset code valid for 10 minutes
            </p>
            {ResetCodeformik.errors.resetCode &&
            ResetCodeformik.touched.resetCode ? (
              <p className=" mt-2 text-xs text-red-600 dark:text-red-400">
                <span className="font-medium">Oh, Error! </span>
                {ResetCodeformik.errors.resetCode}
              </p>
            ) : null}
          </div>
        </form>
      ) : null}

      {NewPasswordForm ? (
      <form
      onSubmit={NewPasswordFormik.handleSubmit}
      action=""
      className="flex flex-wrap justify-center gap-5 w-10/12 lg:w-6/12  mx-auto"
    >

      {/* newPassword */}
      <div className="w-full">
        <div className=" relative">
          <input
            type="Password"
            id="newPassword"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            name="newPassword"
            onChange={NewPasswordFormik.handleChange}
            onBlur={NewPasswordFormik.handleBlur}
            value={NewPasswordFormik.values.newPassword}
          />
          <label
            htmlFor="newPassword"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            new Password
          </label>
        </div>
        {NewPasswordFormik.errors.newPassword && NewPasswordFormik.touched.newPassword ? (
          <p className=" mt-2 text-xs text-red-600 dark:text-red-400">
            <span className="font-medium">Oh, Error! </span>
            {NewPasswordFormik.errors.newPassword}
          </p>
        ) : null}
      </div>
      <div className="w-full text-center">
        <button className="btn bg-green-700 text-white" type="submit">
          {NewPasswordloding ? (
            <i className="fa fa-solid fa-spinner fa-spin"></i>
          ) : (
            "submit"
          )}
        </button>
      </div>
    </form>
      ) : null}
    </div>
  );
}

export default ForgotPassword;
