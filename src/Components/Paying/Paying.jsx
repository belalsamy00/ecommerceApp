import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
function Paying(props) {
  const [loding, setLoding] = useState(false);
  const [lodingOnline, setLodingOnline] = useState(false);
  const [details, setDetails] = useState(false);
  const [phone, setPhone] = useState(false);
  const [city, setCity] = useState(false);
  const navegtion = useNavigate();
  const { cartId } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  async function CreateCashOrder() {
    setLoding(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          details: details,
          phone: phone,
          city: city,
        },
        { headers: { token: token } }
      );
      toast.success(data.status);
      setLoding(false);
      navegtion('/allorders')
    } catch (error) {
      toast.error("error");
      setLoding(false);
    }
  }
  async function CreateOnlineOrder() {
    setLodingOnline(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {
          details: details,
          phone: phone,
          city: city,
        },
        { headers: { token: token } }
      );
      window.open(data.session.url)
      setLodingOnline(false);
    } catch (error) {
      toast.error("error");
      setLodingOnline(false);
    }
  }

  return (
    <div className="container mx-auto px-8">
      <form
        action=""
        className="flex flex-wrap justify-center gap-5 w-10/12 lg:w-6/12  mx-auto"
      >
        {/* details */}
        <div className="w-full">
          <div className=" relative">
            <input
              type="text"
              id="details"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              name="details"
              onChange={(e) => setDetails(e.target.value)}
            />
            <label
              htmlFor="details"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Details
            </label>
          </div>
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
              onChange={(e) => setPhone(e.target.value)}
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Phone
            </label>
          </div>
        </div>
        {/* city */}
        <div className="w-full">
          <div className=" relative">
            <input
              type="text"
              id="city"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              name="city"
              onChange={(e) => setCity(e.target.value)}
            />
            <label
              htmlFor="city"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Full Adress
            </label>
          </div>
        </div>
      </form>
      <div className="w-full text-center flex flex-wrap items-center justify-center gap-5 mt-4">
        <button className="btn-green" onClick={() => CreateCashOrder()}>
          {loding ? (
            <i className="fa fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Cash On Delivery"
          )}
        </button>
        <button className="btn-green bg-cyan-700" onClick={() => CreateOnlineOrder()}>
          {lodingOnline ? (
            <i className="fa fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Online Payment"
          )}
        </button>
      </div>
    </div>
  );
}

export default Paying;
