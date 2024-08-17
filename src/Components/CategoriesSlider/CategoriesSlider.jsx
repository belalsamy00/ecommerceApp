import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function CategoriesSlider() {
  async function getCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
  });
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Slider {...settings}>
          {data?.data.data.map((category, idx) => {
            return (
              <Link key={idx} to={`/category/${category._id}`}>
                <div className="px-2 hover:shadow-lg hover:shadow-green-300  transition-all">
                  <img
                    src={category.image}
                    className=" w-full h-[300px] object-top object-cover"
                    alt=""
                  />
                  <h2 className=" text-center py-4">{category.name}</h2>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
