import { useContext, useEffect, useState } from 'react'
import classes from "./Checkout.module.css";
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import Cart from '../Cart/Cart';



export default function Checkout() {
  const { cartId } = useContext(CartContext)
  const { setNumOfCartItems } = useContext(CartContext)
  const { setAccessToken } = useContext(AuthContext);
  const { getPayment } = useContext(CartContext)
  const [isOnline, setisOnline] = useState(false)
  const [isPaymentMethodSelected, setIsPaymentMethodSelected] = useState(false); // New state
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();

  const initialValues = {
    details: "",
    phone: "",
    city: ""
  };

  const validationSchema = Yup.object().shape({
    details: Yup.string().min(3).max(20).required(),
    city: Yup.string().min(2).max(15).required(),
    phone: Yup.string().matches(/^(002)?01[0125][0-9]{8}/i, "Phone Number must be a valid number").required(),
  })

  const formik = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit: handleCheckout,
    });

  async function handleCheckout(values) {
    setisLoading(true);
    const baseUrl = "https://baherdagher.github.io/Dagher-Market/redirect.html";
    const url =
      isOnline ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?redirect=${encodeURIComponent(baseUrl + '?route=allorders')}`
        : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`


    const res = await getPayment(url, values);
    
    if (res?.status === "success") {

      if (isOnline) {
        console.log("URL");
        window.location.href = res.session.url;

      }
      else {
        setNumOfCartItems(0);
        toast.success("Payment completed successfully!",
          {
            position: 'top-right',
            autoClose: 1000,
          },
          setTimeout(() => {
            navigate("/allorders")
          }, 1500)
  
        );
      }
  
  
  
  
      }

  }

  useEffect(()=>{
    document.title = "Checkout Page"
  },[])

  return (
    <>
      <section className='py-20 min-h-[calc(100vh-124px)] px-16 flex justify-center '>
        <div className="container mx-auto ">
          <div className="max-w-xl mx-auto my-5">
            <h1 className='text-3xl font-bold'>Checkout</h1>
          </div>
          {error && <div className=' max-w-xl mx-auto my-5 alert'>{error}</div>}{" "}
          <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
            <div className="relative z-0 w-full mb-5 group">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" name="details" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Shipping Address</label>
              {formik.touched.details && formik.errors.details ? (
                <div className="text-red-500">{formik.errors.details}</div>
              ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name="city" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City</label>
              {formik.touched.city && formik.errors.city ? (
                <div className="text-red-500">{formik.errors.city}</div>
              ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Telephone</label>
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500">{formik.errors.phone}</div>
              ) : null}
            </div>

            <div className="flex justify-between">
              <div>
                <input type="radio" name='payingMethod' id='cash' className='checked:bg-green-500 m-2
                '  onClick={() => {
                  setisOnline(false)
                  setIsPaymentMethodSelected(true); 
                }
            } required />
                <label htmlFor="cash">Pay Cash</label>
              </div>
              <div>
                <input type="radio" name='payingMethod' id='online' className='checked:bg-green-500 m-2' required 
                onClick={() => {
                  setisOnline(true);
                  setIsPaymentMethodSelected(true); 
                    }
               } />
                <label htmlFor="online">Pay Online</label> 
              </div>
            </div>

            {/* 3mlt condition 3al disabled 3shan a5lyha ma2fola fel awl la2en el isValid true fel awl 5als  */}
            <button disabled={!(formik.isValid && formik.dirty && isPaymentMethodSelected ) } type='submit' className='btn btn-green mt-5'>
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Proceed to Buy"}
            </button>
          </form>
        </div>
      </section>

    </>
  )
}