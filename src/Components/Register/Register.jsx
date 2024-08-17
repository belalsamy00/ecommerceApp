import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Register(props) {
  const [loding, setLoding] = useState(false);
  const navegtion = useNavigate();
  const values = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  async function Registerion(values) {
    setLoding(true);
    try {
      const respon = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      toast.success(respon.data.message);
      setLoding(false);
      navegtion("/login");
    } catch (error) {
      let errorMessage = "";
      if ( error.response.data.hasOwnProperty('errors')) {
        errorMessage =
          error.response.data.errors.param +
          " : " +
          error.response.data.errors.msg;
      } else {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
      setLoding(false);
    }
  }
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Not valid Email !").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .required("Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: Registerion,
  });
  return (
    <div className="container mx-auto px-8">
      <form
        onSubmit={formik.handleSubmit}
        action=""
        className="flex flex-wrap justify-center gap-5 w-10/12 lg:w-6/12  mx-auto"
      >
        {/* name */}
        <div className="w-full">
          <div className=" relative">
            <input
              type="text"
              id="name"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Name
            </label>
          </div>
          {formik.errors.name && formik.touched.name ? (
            <p className=" mt-2 text-xs text-red-600 dark:text-red-400">
              <span className="font-medium">Oh, Error! </span>
              {formik.errors.name}
            </p>
          ) : null}
        </div>
        {/* email */}
        <div className="w-full">
          <div className=" relative">
            <input
              type="email"
              id="email"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Eemail
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <p className=" mt-2 text-xs text-red-600 dark:text-red-400">
              <span className="font-medium">Oh, Error! </span>
              {formik.errors.email}
            </p>
          ) : null}
        </div>
        {/* password */}
        <div className="w-full">
          <div className=" relative">
            <input
              type="password"
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Password
            </label>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <p className=" mt-2 text-xs text-red-600 dark:text-red-400">
              <span className="font-medium">Oh, Error! </span>
              {formik.errors.password}
            </p>
          ) : null}
        </div>
        {/* rePassword */}
        <div className="w-full">
          <div className=" relative">
            <input
              type="password"
              id="rePassword"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              name="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
            />
            <label
              htmlFor="rePassword"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              RePassword
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className=" mt-2 text-xs text-red-600 dark:text-red-400">
              <span className="font-medium">Oh, Error! </span>
              {formik.errors.rePassword}
            </p>
          ) : null}
        </div>
        {/* phone */}
        <div className="w-full">
          <div className=" relative">
            <input
              type="tel"
              id="phone"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Phone
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <p className=" mt-2 text-xs text-red-600 dark:text-red-400">
              <span className="font-medium">Oh, Error! </span>
              {formik.errors.phone}
            </p>
          ) : null}
        </div>
        <button className="btn bg-green-700 text-white" type="submit">
          {loding ? (
            <i className="fa fa-solid fa-spinner fa-spin"></i>
          ) : (
            "submit"
          )}
        </button>
      </form>
    </div>
  );
}

export default Register;