import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { FallingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function Product() {
  const { AddToCart } = useContext(CartContext);
  function AddProductToCart(id) {
    AddToCart(id);
  }
  const { id } = useParams();
  async function getProduct() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
  const { isPending, error, data } = useQuery({
    queryKey: ["Product"],
    queryFn: getProduct,
  });
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
      <div className="row items-center border-gray-200 rounded-lg shadow">
        <div className=" col-md-4 flex justify-center items-center p-4">
          <img className="w-full" src={data?.data?.data?.imageCover} alt="" />
        </div>
        <div className=" col-md-8 p-4 ps-8 ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-lime-700 dark:text-white">
            {data?.data?.data?.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {data?.data?.data?.description}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {data?.data?.data?.category.name}
          </p>
          <div className=" flex justify-between">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <span className=" font-semibold">{data?.data?.data?.price}</span>{" "}
              EGP
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              ✨ {data?.data?.data?.ratingsAverage}
            </p>
          </div>
          <button
            className="btn-green"
            onClick={() => AddProductToCart(data?.data?.data?.id)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
