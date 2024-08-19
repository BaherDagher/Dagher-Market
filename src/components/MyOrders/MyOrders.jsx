import { useContext, useEffect, useState } from 'react'
import classes from "./MyOrders.module.css";
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../Loader/Loader';
import axios from "axios";


export default function MyOrders() {
  const { setNumOfCartItems, clearCart, userId } = useContext(CartContext)
  const [orders, setOrders] = useState(null)
  const { accessToken } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(true)

  async function getMyOrdersDetails() {
    console.log(userId);
    setNumOfCartItems(0);
    clearCart();

    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      setOrders(data);
      console.log(data);

    } catch (err) {
      setError('An error occurred while loading the orders');
      console.log(err);
      console.log(err);
      

    } finally {
      setisLoading(false); // Ensure loader is turned off after the data is fetched
    }

  }


  useEffect(() => {
    userId && accessToken && getMyOrdersDetails()
  }, [userId])



  useEffect(()=>{
    document.title = "My Orders Page"
  },[])

  return (

    <section className="py-10 lg:py-20 min-h-[calc(100vh-124px)]">
      <div className="container mx-auto " >
        {
          isLoading ? (<Loader />) :
            error ?
              (<div className='alert'>{error}</div>
              ) :
              (
                getMyOrdersDetails && (
                  <div className="row ">
                    <div className="lg:w-4/6  w-full mx-auto px-10 lg:px-0">
                      <div className='lg:rounded-xl overflow-hidden rounded-md   lg:shadow-[0px_2px_15px_rgba(0,0,0,0.1)]' >
                        <table className="  relative overflow-x-auto shadow-[0px_2px_15px_rgba(0,0,0,0.1)] sm:rounded-xl  w-full text-sm text-left rtl:text-right text-green-500 dark:text-green-400 ">
                          <thead className=" lg:text-xs text-white  uppercase bg-green-600 dark:bg-gray-700 dark:text-gray-400 rounded-xl">
                            <tr className='rounded-xl text-xs lg:text-sm '>
                              <th scope="col" className="lg:py-8 p-3 lg:px-1 text-center ">
                                Image
                              </th>
                              <th scope="col" className="text-center ">
                                Product
                              </th>
                              <th scope="col" className="text-center  ">
                                Quantity
                              </th>
                              <th scope="col" className="text-center  ">
                                Price
                              </th>
                            
                            </tr>
                          </thead>
                          <tbody>
                            {

                              orders?.map((order) => (

                                order?.cartItems.map((eachProduct)=>(

                                  <tr key={eachProduct.product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-green-50  dark:hover:bg-gray-600">
                                  <td >
                                    <img src={eachProduct.product.imageCover} className="w-16 lg:w-32 max-w-full max-h-full mx-auto" alt={eachProduct.product.title} />
                                  </td>
                                  <td className="text-center font-semibold text-gray-900 dark:text-white">
                                    {
                                      eachProduct.product.title
                                    }
                                  </td>
                                  <td >
                                  
                                      <div className=' order-2 lg:order-2  py-1 lg:py-0 text-center'>
                                        <span className='text-black text-base'>{eachProduct.count}</span>                                  
                                            </div>
                                
                                  </td>
                                  <td className=" text-center text-[12px] lg:text-sm font-semibold text-gray-900 dark:text-white">
                                    {
                                      eachProduct.price * eachProduct.count
                                    }
                                    <span className="ps-1">EGP</span>
                                  </td>
                              
                                </tr>

                                ))





          
                              ))




                            }
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>




                ))}
      </div>
    </section>

  )
}
