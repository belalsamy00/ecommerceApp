import React from "react";
import Slider from "react-slick";
import slider_1 from "../../assets/images/grocery-banner.png";
import slider_2 from "../../assets/images/grocery-banner-2.jpeg";
import slider_3 from "../../assets/images/grocery-banner.png";
import slider_4 from "../../assets/images/blog-img-1.jpeg";
import slider_5 from "../../assets/images/blog-img-2.jpeg";
export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="row">
      <div className="col-md-10">
        <Slider {...settings}>
          <div className="">
            <img src={slider_1} className="w-full" alt="" />
          </div>
          <div className="">
            <img src={slider_2} className="w-full" alt="" />
          </div>
          <div className="">
            <img src={slider_3} className="w-full" alt="" />
          </div>
        </Slider>
      </div>
      <div className="row col-md-2">
        <div className=" col-3 col-md-12 mb-2">
          <img src={slider_4} className="w-full" alt="" />
        </div>
        <div className=" col-3 col-md-12 mb-2">
          <img src={slider_5} className="w-full" alt="" />
        </div>
        <div className="col-3 col-md-12 mb-2">
          <img src={slider_4} className="w-full" alt="" />
        </div>
        <div className="col-3 col-md-12">
          <img src={slider_5} className="w-full" alt="" />
        </div>
      </div>
    </div>
  );
}
