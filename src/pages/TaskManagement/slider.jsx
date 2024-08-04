import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useGet from "../../hooks/useGet";

const SliderCard = () => {
  const url = "/task-management/boards";
  const { data, isLoading, error } = useGet(url);
const settings={
  dots: true,
  arrow:true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

 

  return (
    <div className="slider-container p-3">
      <Slider {...settings}>
        {data && Array.isArray(data.data) && data.data.length > 0 ? (
          data.data.map((item) => (
            <div key={item._id} className="card relative h-40 w-44">
              <img
                src={item.background}
                className="bg-opacity-65 object-cover w-full h-full"
                alt={item.boardName || "background"}
              />
              <h3 className="absolute bottom-0 bg-slate-400 p-1 px-3 rounded-r-3xl text-black uppercase">{item.boardName}</h3>
            </div>
          ))
        ) : (
          <h1>No Boards to display</h1>
        )}
      </Slider>
    </div>
  );
};

export default SliderCard;
