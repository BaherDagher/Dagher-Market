import { useEffect, useState } from 'react'
import classes from "./CategorySlider.module.css";
import axios from 'axios';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

export default function CategorySlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, // for tablet and below
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // for mobile devices
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // for small mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false)



  async function getCategories() {

    setisLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setCategories([]);
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <>
      <section className='py-20 px-14'>
        <div className='container mx-auto'>
          <Slider {...settings}>
            {
              categories.map((category) =>
              ( 
                <Link to={`/specific-categoury-products/${category.name}`   } key={category._id}>
                  <div  >
                    <img className=" mb-2 h-80 object-cover w-full" src={category.image} alt={category.name} />
                    <div className='mx-auto text-center'>
                      <h2 className='font-bold '>{category.name}</h2>
                    </div>
                  </div>
                </Link>
              )
              )
            }
          </Slider>
        </div>
      </section>

    </>)
}
