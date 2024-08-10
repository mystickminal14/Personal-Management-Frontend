import React, {  useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import useGet from '../../../../hooks/useGet';
import CustomSkeleton from './../../../../components/Skeleton';
import { FaEdit } from "react-icons/fa";
import { AppContext } from "../../../../context/ContextApp";

const SliderCard = ({ handleAdd }) => {
  const url = "/task-management/boards";
  const { data } = useGet(url);
  const {isLoading}=useContext(AppContext)

  const CustomPrevArrow = ({ className, onClick }) => (
    <IoMdArrowBack
      onClick={onClick}
      className={`${className} text-black hover:bg-black hover:p-1 hover:rounded-full hover:text-white transition-all`}
      size={30}
    />
  );

  const CustomNextArrow = ({ className, onClick }) => (
    <IoMdArrowForward
      onClick={onClick}
      className={`${className} text-black hover:bg-black hover:p-1 hover:rounded-full hover:text-white transition-all`}
      size={30}
    />
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
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

  const Skeletons = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="slider-container p-3">
      {isLoading ? (
        <div className="flex justify-center items-center">
          {Skeletons.map((_, index) => (
            <CustomSkeleton key={index} />
          ))}
        </div>
      ) : data && Array.isArray(data.data) && data.data.length > 0 ? (
        <Slider {...settings}>
          {data.data.map((item) => (
            <div
              key={item._id}
              className="relative h-40 cursor-pointer w-44 group rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={item.background}
                className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-70"
                alt={item.boardName || "background"}
              />
              <div className="absolute inset-0 flex items-end justify-between uppercase p-2 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-70">
                <h3 className="text-white text-lg font-semibold">{item.boardName}</h3>
                <div className='p-1 rounded-lg flex justify-center items-center' style={{ background: 'black' }}>
                  <FaEdit onClick={() => handleAdd(item._id)} className="text-white text-xl" />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex justify-center items-center h-40 text-gray-500">
          <p>No boards available</p>
        </div>
      )}
    </div>
  );
};

export default SliderCard;
