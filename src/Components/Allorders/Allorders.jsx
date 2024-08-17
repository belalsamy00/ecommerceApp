import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
function Allorders(props) {
  const [allorders, setAllorders] = useState(null);
  const [cartLodaing, setCartLodaing] = useState(false);
  const { userId } = useContext(AuthContext);
  async function GetAllorders() {
    setCartLodaing(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      setAllorders(data);
      setCartLodaing(false);
    } catch (error) {
      setCartLodaing(false);
    }
  }
  useEffect(() => {
    if (userId) {
      GetAllorders();
    }

    return () => {};
  }, [userId]);
  return (
    <div className="container">
      {cartLodaing ? (
        <div className=" h-lvh flex justify-center items-center">
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      ) : (
        <div className="row">
          {allorders ? (
            allorders.map((order, indx) => {
              return (
                <div
                  className="row  mx-auto my-2 p-4 leading-normal bg-gray-100 border border-gray-200 rounded-lg shadow   dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  key={indx}
                >
                  <div className="col-md-3 mb-4 ">
                    <div className="p-4 leading-normal w-full h-full">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        payment Method : {order.paymentMethodType}
                      </h5>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        total Order Price : {order.totalOrderPrice} EGP
                      </h5>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Items count: {order.cartItems.length}
                      </h5>
                    </div>
                  </div>
                  {order.cartItems.map((element, idx) => {
                    return (
                      <div key={idx} className=" col-6 col-sm-6 col-md-3 mb-4 ">
                        <Link to={`/product/${element.product.id}`}>
                          <div className=" relative w-full flex flex-wrap items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:shadow-lg hover:shadow-green-300  transition-all">
                            <img
                              className=" w-full object-center object-cover"
                              src={element.product.imageCover}
                              alt=""
                            />
                            <span className="absolute bottom-0 p-1 font-semibold">
                              {element.product.title}
                            </span>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div className=" h-lvh w-full flex justify-center items-center">
              <h1 className=" w-full text-center font-semibold text-green-700">
                No Items to display It
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Allorders;
