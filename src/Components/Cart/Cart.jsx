import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";

function Cart(props) {
  const {
    numOfCartItems,
    totalCartPrice,
    cartProducts,
    UpdateCart,
    DeleteCartItem,
    DeleteAllCartItem,
  } = useContext(CartContext);
  const [loading, setLoading] = useState({ id: null });

  const UpdateCartHandler = (id, count, Loader_id) => {
    setLoading({
      id: Loader_id,
    });
    UpdateCart(id, count).finally(() => {
      setLoading({
        id: null,
      });
    });
  };
  const DeleteCartItemHandler = (id) => {
    setLoading({
      id: id,
    });
    DeleteCartItem(id).finally(() => {
      setLoading({
        id: null,
      });
    });
  };
  const DeleteAllCartItemHandler = (id) => {
    setLoading({
      id: id,
    });
    DeleteAllCartItem().finally(() => {
      setLoading({
        id: null,
      });
    });
  };

  return (
    <div className="container">
      {!cartProducts ? (
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
          {numOfCartItems != 0 ? (
            <div className="col-md-8 mb-4 mx-auto">
              <h1 className="font-bold text-2xl">Shop Cart </h1>
              <div className="flex justify-between">
                <h2 className="font-semibold text-xl">
                  {" "}
                  Total Cart Price :{" "}
                  <span className="text-green-700">
                    {" "}
                    {totalCartPrice}{" "}
                  </span>{" "}
                </h2>
              </div>
              <div className="flex justify-between mt-4">
                <Link
                to={'/paying'}
                  className="text-green-700 hover:text-white border disabled:opacity-50 border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
                >
                  Pay now
                </Link>
                <button
                  id="DeleteAll"
                  type="button"
                  onClick={() => DeleteAllCartItemHandler("DeleteAll")}
                  className="text-red-700 hover:text-white border disabled:opacity-50 border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  {loading.id == "DeleteAll" ? (
                    <i className="fa fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Delete All Items"
                  )}
                  
                </button>
              </div>
            </div>
          ) : null}

          {numOfCartItems != 0 ? (
            cartProducts?.map((item, idx) => {
              return (
                <div key={idx} className="col-md-8 mb-4 mx-auto">
                  <div className=" w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src={item.product.imageCover}
                      alt=""
                    />
                    <div className="flex flex-col w-full justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.product.title}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {item.price}
                      </p>
                      <div className=" flex justify-between">
                        <button
                          type="button"
                          disabled={
                            loading.id == item.product.id ? "disabled" : false
                          }
                          onClick={() => DeleteCartItemHandler(item.product.id)}
                          className="text-red-700 hover:text-white border disabled:opacity-50 border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                          {loading.id == item.product.id ? (
                            <i className="fa fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            "Remove"
                          )}
                        </button>

                        <div className=" flex justify-between items-center">
                          <button
                            type="button"
                            disabled={
                              loading.id == item.product.id + "-plus"
                                ? "disabled"
                                : false
                            }
                            onClick={() =>
                              UpdateCartHandler(
                                item.product.id,
                                item.count + 1,
                                item.product.id + "-plus"
                              )
                            }
                            className="text-blue-700 border disabled:opacity-50 border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                          >
                            {loading.id == item.product.id + "-plus" ? (
                              <i className="fa fa-solid fa-spinner fa-spin"></i>
                            ) : (
                              <i className="fa fa-plus"></i>
                            )}
                          </button>
                          <span className=" p-2.5 me-2">{item.count}</span>
                          <button
                            onClick={() =>
                              UpdateCartHandler(
                                item.product.id,
                                item.count - 1,
                                item.product.id + "-minus"
                              )
                            }
                            type="button"
                            disabled={
                              loading.id == item.product.id + "-minus"
                                ? "disabled"
                                : false
                            }
                            className="text-blue-700 border disabled:opacity-50 border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                          >
                            {loading.id == item.product.id + "-minus" ? (
                              <i className="fa fa-solid fa-spinner fa-spin"></i>
                            ) : (
                              <i className="fa fa-minus"></i>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default Cart;
