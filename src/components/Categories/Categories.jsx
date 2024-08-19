import { useEffect, useState } from 'react'
import classes from "./Categories.module.css";
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';


export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false)

  async function getCategories() {
    setisLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      console.log(data);

      setCategories(data.data);
      setError(null);
      console.log(data);


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

  useEffect(()=>{
    document.title = "Categories Page"
  },[])


  return (
    <>
      <section className='py-20 min-h-[calc(100vh-124px)] px-14'>
        <div className='container mx-auto px-8 md:px-0'>
          <div>
            <h1 className='text-3xl font-bold mb-4' >All Categories</h1>
          </div>
          {
            isLoading ? (<Loader />) :
              error ?
                (<div className='alert'>{error}</div>
                ) :
                (
                  <div className="row ">
                    {
                      categories?.map((category) =>
                        <div key={category._id} className='w-full px-4 mb-6 pb-5 rounded-lg custom-product md:w-1/5' >
                          <Link to={`/specific-categoury-products/${category.name}`}>
                          <img src={category.image} alt={category.name} className='mb-2 mx-auto w-80 md:w-full  mt-2 h-80 object-cover ' />
                          <div className="text-center">
                            <h2 className="truncate font-bold mb-2 ">{category.name}</h2>

                          </div>
                          </Link>

                        </div>
                      )
                    }
                  </div>
                )
          }

        </div>
      </section>

    </>

  )
}
