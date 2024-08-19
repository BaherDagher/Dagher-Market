import { useContext, useEffect, useState } from 'react'
import classes from "./Cart.module.css";
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login/Login';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export default function Cart() {
  const { getCart, removeFromCart, cartDetails, numOfCartItems, updateQuantity,clearCart } = useContext(CartContext);
  const { accessToken } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(true)
  const navigate = useNavigate();

  // Function to fetch cart details
  async function getCartDetails() {
    try {
      const response = await getCart();

      if (response.status === "success" && numOfCartItems > 0) {
        setError(null);
      } else {
        setError('Your Cart Is Empty');
      }
    } catch (err) {
      setError('An error occurred while loading the cart');
    } finally {
      setisLoading(false); // Ensure loader is turned off after the data is fetched
    }
  }

  async function removeProductFromCart(productId) {
    const res = await removeFromCart(productId);

    if (res.status === "success") {
      toast.success('Product removed successfully from your cart!', {
        position: 'top-right',
        autoClose: 1500,
      })
    }
    else {
      toast.error("Something Went Wrong",
        {
          position: 'top-right',
          autoClose: 1500,
        }
      );
    }
  }


  async function updateProductQuantity(productId, count) {

    if (count === 0) {
      removeProductFromCart(productId);
    }
    else {

      const res = await updateQuantity(productId, count);

      if (res.status === "success") {
        toast.success('Product quantity updated successfully!', {
          position: 'top-right',
          autoClose: 1500,
        })
      }
      else {
        toast.error("Something Went Wrong",
          {
            position: 'top-right',
            autoClose: 1500,
          }
        );
      }
    }
  }


async function clearCartProducts() {
  
 const res =  await clearCart ();
if (res.message === "success"){
  toast.success("Your cart has been successfully cleared!",
    {
      position: 'top-right',
      autoClose: 1000,
    },
    setTimeout(() => {
      navigate("/home")
    }, 1500)
  );

} 
else {
  toast.error ("Something went wrong")
}

}

  useEffect(() => {
    accessToken && getCartDetails()
  }, [accessToken, numOfCartItems])

  useEffect(()=>{
    document.title = "Cart Page"
  },[])


  return (
    <>

      <section className="py-10 lg:py-20 min-h-[calc(100vh-124px)]">
        <div className="container mx-auto " >
          {
            isLoading ? (<Loader />) :
              error ?
                (<div className='bg-green-500 text-center text-white p-5'>{error}</div>
                ) :
                (
                  cartDetails && (
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
                                <th scope="col" className="text-center ">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                cartDetails?.products?.map((product) => (

                                  <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-green-50  dark:hover:bg-gray-600">
                                    <td >
                                      <img src={product.product.imageCover} className="w-16 lg:w-32 max-w-full max-h-full mx-auto" alt={product.product.title} />
                                    </td>
                                    <td className="text-center font-semibold text-gray-900 dark:text-white">
                                      {
                                        product.product.title
                                      }
                                    </td>
                                    <td >
                                      <div className="flex items-center lg:flex-row flex-col  justify-center ">
                                        <button onClick={() => updateProductQuantity(product.product.id, product.count - 1)} className=" order-3 lg:order-1 inline-flex items-center justify-center p-1 me-3 lg:ms-0 ms-3 mb-1 pb-1 lg:mb-0 font-medium lg:h-6 lg:w-6  h-4 w-4  text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                          <span className="sr-only">Quantity button</span>
                                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                          </svg>
                                        </button>
                                        <div className=' order-2 lg:order-2  py-1 lg:py-0'>
                                          <input type="text" id="first_product" className="bg-gray-50 lg:w-14 w-8 border text-center border-gray-300 text-gray-900 text-xs  lg:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block lg:px-2.5 lg:py-1 p-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={product.count} required />
                                        </div>
                                        <button onClick={() => updateProductQuantity(product.product.id, product.count + 1)} className=" order-1 lg:order-3   inline-flex items-center justify-center lg:h-6 lg:w-6  mt-1 lg:mt-0 h-4 w-4 ms-0 p-1 lg:ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                          <span className="sr-only">Quantity button</span>
                                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                          </svg>
                                        </button>
                                      </div>
                                    </td>
                                    <td className=" text-center text-[12px] lg:text-sm font-semibold text-gray-900 dark:text-white">
                                      {
                                        product.price * product.count
                                      }
                                      <span className="ps-1">EGP</span>
                                    </td>
                                    <td className=" text-[12px] lg:text-sm text-center">
                                      <button onClick={() => removeProductFromCart(product.product.id)} className="font-medium text-red-600  dark:text-red-500 hover:underline"><i className="fa-solid fa-trash text-red-600 lg:text-xl text-base"></i></button>
                                    </td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>
                        </div>
                       

                      </div>
                      <div className=" lg:w-2/6 lg:ps-20  mx-auto lg:mt-0 mt-4 ps-0 w-80">
                        <div className="inner shadow-[0px_2px_15px_rgba(0,0,0,0.1)]  rounded-xl py-6 lg:px-8  px-10">
                          <div >
                            <h1 className='font-bold text-xl pb-3'>Order Summary</h1>
                            <div className="flex justify-between">
                              <span className='pb-1 text-gray-700 font-normal'>Items:</span>
                              <span>{<span className=" ps-4 text-gray-600 font-semibold">{numOfCartItems} </span>}</span>
                            </div>
                            <div className="flex justify-between pb-4 border-b  ">
                              <span className=' text-gray-700 font-normal'>Subtotal:</span>
                              <span>{<span className=" ps-4 text-gray-600 font-semibold">{cartDetails.totalCartPrice} EGP</span>}</span>
                            </div>
                            <div className="flex justify-center mt-5">
                              <button onClick={() => navigate("/checkout")} className='bg-green-600 hover:bg-green-500 font-semibold rounded-3xl w-full py-4 text-white text-sm lg:text-lg'>Proceed to Buy </button>
                            </div>
                          </div>
                        </div>
                        <div className='flex justify-center items-center w-full  mt-6'>
                          <button onClick={()=>clearCartProducts()} className='bg-green-600 hover:bg-green-500 font-semibold rounded-3xl w-full py-4 text-white text-sm lg:text-lg w-[150px]'>Clear Cart</button>
                        </div>
                      </div>

                    </div>

                  ))}
        </div>
      </section>


    </>
  )
}
