import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { useContext, useState } from "react";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { WishlistContext } from "../Context/WishlistContext";
function Products() {
  async function getAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { isPending, error, data } = useQuery({
    queryKey: ["Products"],
    queryFn: getAllProducts,
  });
  const [WishlistLoading, setWishlistLoading] = useState({ id: null });
  const [CartLoading, setCartLoading] = useState({ id: null });
  const { AddToWishlist, WishlistProductsId } = useContext(WishlistContext);
  const { AddToCart } = useContext(CartContext);
  const AddProductToCart = (id) => {
    setCartLoading({ id: id });
    AddToCart(id).finally(() => {
      setCartLoading({ id: null });
    });
  };
  const AddProductToWishlist = (id) => {
    setWishlistLoading({ id: id });
    AddToWishlist(id).finally(() => {
      setWishlistLoading({ id: null });
    });
  };

  if (isPending)
    return (
      <div className=" h-lvh flex justify-center items-center">
        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="container">
      <div>
       
      </div>
      <div className="row justify-center">
        {data?.data?.data?.map((product, idx) => {
          return (
            <div key={idx} className="col-md-6 col-lg-4 col-xl-3 mt-4">
              <div className="h-full">
                <div className="w-full h-full  bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:shadow-green-300  transition-all">
                  <Link to={`/product/${product.id}`}>
                    <div className=" flex justify-center items-center">
                      <img
                        className=" w-full h-[300px] object-center object-cover"
                        src={product.imageCover}
                        alt=""
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-lime-700 dark:text-white">
                        {product.category.name}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </p>
                      <div className=" flex justify-between">
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          <span className=" font-semibold">
                            {product.price}
                          </span>{" "}
                          EGP
                        </p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          ✨ {product.ratingsAverage}
                        </p>
                      </div>
                    </Link>
                    <div className="flex flex-wrap justify-between items-center gap-5">
                      <button
                        className="btn-green"
                        onClick={() => AddProductToCart(product.id)}
                      >
                        {CartLoading.id == product.id ? (
                          <i className="fa fa-solid fa-spinner fa-spin"></i>
                        ) : (
                          "Add To Cart"
                        )}
                      </button>
                      <i
                        className={
                          WishlistLoading.id == product.id
                            ? "fa fa-solid fa-spinner fa-spin text-3xl text-red-600"
                            : `fa fa-solid fa-heart text-3xl ${WishlistProductsId?.includes(product.id) ? 'text-red-600' : 'text-black' }  cursor-pointer`
                        }
                        onClick={() => AddProductToWishlist(product.id)}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
