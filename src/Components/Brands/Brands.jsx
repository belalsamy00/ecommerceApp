import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card } from "flowbite-react";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Brands() {
  async function getBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isPending } = useQuery({
    queryKey: ["Brands"],
    queryFn: getBrands,
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
  return (
    <div className="container">
      <div className="row">
        {data?.data.data.map((brand, idx) => {
          return (
            <div key={idx} className="col-md-4 col-lg-3 mb-4 h-full ">
              <Link to={`/brand/${brand._id}`}>
                <Card className="max-w-sm hover:shadow-lg hover:shadow-green-300  transition-all">
                  <img
                    src={brand.image}
                    alt=""
                    className=" w-full object-top object-cover"
                  />
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {brand.name}
                  </h5>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
