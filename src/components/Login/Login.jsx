import { useContext, useEffect, useState } from 'react'
import classes from "./Login.module.css";
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';



export default function Login() {
  localStorage.removeItem("message");
  localStorage.removeItem("status");
  
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext);


  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,}$/, "Minimum 4 characters, at least one upper case one lower case , one number and one special character ").required(),
  })

  const formik = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit: handleLogin,
    });


  async function handleLogin(values) {

    setisLoading(true);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      console.log('Registration successful:', data);
      if (data.message === 'success') {
        setAccessToken(data.token);
        localStorage.setItem("accessToken", data.token);
        setError(null);
        navigate("/home")
      }
    }
    catch (error) {
      setError(error.response.data.message);
    }
    finally {
      setisLoading(false)
    }
  }


  useEffect(()=>{
    document.title = "Login Page"
  },[])

  return (
    <>
      <section className='py-20 min-h-[calc(100vh-124px)] flex justify-center px-16'>
        <div className="container mx-auto ">
          <div className="max-w-xl mx-auto my-5">
            <h1 className='text-3xl font-bold'>Login</h1>
          </div>
          {error && <div className=' max-w-xl mx-auto my-5 alert'>{error}</div>}{" "}
          <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">

            <div className="relative z-0 w-full mb-5 group">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>

            {/* 3mlt condition 3al disabled 3shan a5lyha ma2fola fel awl la2en el isValid true fel awl 5als  */}
            <div className="flex justify-between items-center">
              <div>
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-green'>
                  {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Login"}
                </button>
              </div>
              <div>
                <button onClick={() => navigate("/forget-password")} className='hover:text-green-500 underline'>Forget your password?</button>
              </div>
            </div>


          </form>

        </div>
      </section>


    </>
  )
}