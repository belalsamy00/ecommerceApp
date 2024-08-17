import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../Context/AuthContext";
function Login(props) {
  useEffect(()=>{
    localStorage.getItem("token") ? navegtion("/products") :null
    
  },[])
  const { token, setToken } = useContext(AuthContext);
  const [loding, setLoding] = useState(false);
  const navegtion = useNavigate();
  const values = {
    email: "",
    password: "",
  };
  async function UserLogin(values) {
    setLoding(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      toast.success(data.message);
      setToken(data.token);
      localStorage.setItem('token',data.token)
      setLoding(false);
      navegtion("/home");
    } catch ({response}) {
      toast.error(response.data.message);
      setLoding(false);
    }
  }

  const schema = Yup.object().shape({
    email: Yup.string().email("Not valid Email !").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: UserLogin,
  });
  return (
    <div className="container mx-auto px-8">
      <form
        onSubmit={formik.handleSubmit}
        action=""
        className="flex flex-wrap justify-center gap-5 w-10/12 lg:w-6/12  mx-auto"
      >
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
        <div className="w-full text-center">
          <Link to="/forgotPassword"> ForgotPassword ?</Link>
        </div>
        <div className="w-full text-center">
          <button className="btn-green" type="submit">
            {loding ? (
              <i className="fa fa-solid fa-spinner fa-spin"></i>
            ) : (
              "submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
