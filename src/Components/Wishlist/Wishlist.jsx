import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function Wishlist(props) {
  const {
    WishlistItemscount,
    WishlistProducts,
    DeleteWishlistItem,
    GetLoggedUserWishlist,
  } = useContext(WishlistContext);
  const { AddToCart, cartProducts } = useContext(CartContext);

  const [loading, setLoading] = useState({ id: null });
  const [AddProductloading, setAddProductLoading] = useState({ id: null });

  const AddProductToCartHandler = (id) => {
    setAddProductLoading({
      id: id,
    });
    AddToCart(id).finally(() => {
      GetLoggedUserWishlist;
      setAddProductLoading({
        id: null,
      });
    });
  };
  const DeleteWishlistItemHandler = (id) => {
    setLoading({
      id: id,
    });
    DeleteWishlistItem(id).finally(() => {
      setLoading({
        id: null,
      });
    });
  };


  return (
    <div className="container">
      {!WishlistProducts ? (
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
          {WishlistItemscount != 0 ? (
            WishlistProducts?.map((item, idx) => {
              return (
                <div key={idx} className="col-md-8 mb-4 mx-auto">
                  <div className=" w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src={item.imageCover}
                      alt=""
                    />
                    <div className="flex flex-col w-full justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.title}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {item.price}
                      </p>
                      <div className=" flex justify-between">
                        <button
                          type="button"
                          disabled={loading.id == item.id ? "disabled" : false}
                          onClick={() => DeleteWishlistItemHandler(item.id)}
                          className="text-red-700 hover:text-white border disabled:opacity-50 border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                          {loading.id == item.id ? (
                            <i className="fa fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            "Remove"
                          )}
                        </button>
                        <button
                          className="btn-green"
                          onClick={() => AddProductToCartHandler(item.id)}
                        >
                          {AddProductloading.id == item.id ? (
                            <i className="fa fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            "Add To Cart"
                          )}
                        </button>
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

export default Wishlist;
