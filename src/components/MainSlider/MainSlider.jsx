import { useEffect, useState } from 'react'
import classes from "./MainSlider.module.css";
import staticImage1 from "../../assets/slider-2.jpeg"
import staticImage2 from "../../assets/grocery-banner-2.jpeg"
import DynamicImage1 from "../../assets/slider-image-1.jpeg"
import DynamicImage2 from "../../assets/slider-image-2.jpeg"
import DynamicImage3 from "../../assets/slider-image-3.jpeg"
import Slider from "react-slick";


export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const images = [
    {
      src: DynamicImage1,
      label: 'image1'
    },
    {
      src: DynamicImage2,
      label: 'image2'
    },
    {
      src: DynamicImage3,
      label: 'image3'
    }
  ]

  return (
    <>
      <section className='py-20 px-16'>
        <div className='container mx-auto'>
          <div className='row'>
            <div className='w-2/3'>
              <Slider {...settings}>
                {images.map((image,index) => 
                  <img className='md:h-[400px] object-cover h-[300px]' src={image.src} alt={image.label} key={index} />
                )}
              </Slider>
            </div>
            <div className="w-1/3">
              <img className='md:h-[200px] md:object-cover w-full h-[150px] object-fill ' src={staticImage1} alt="" />
              <img className='md:h-[200px] md:object-cover w-full h-[150px] object-fill ' src={staticImage2} alt="" />
            </div>
          </div>

        </div>
      </section>

    </>)
}
