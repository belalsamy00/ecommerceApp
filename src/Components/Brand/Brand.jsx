import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card } from "flowbite-react";
import React from "react";
import { useParams } from "react-router-dom";
export default function Brand() {
  const { id } = useParams();
  async function getBrand() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
  }
  const { data } = useQuery({
    queryKey: ["Brand"],
    queryFn: getBrand,
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-lg-3 mx-auto h-full">
          <Card className="max-w-sm">
            <img
              src={data?.data?.data?.image}
              alt=""
              className=" h-full object-top object-cover"
            />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data?.data?.data?.name}
            </h5>
          </Card>
        </div>
      </div>
    </div>
  );
}
