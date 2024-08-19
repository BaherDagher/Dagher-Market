import { useEffect, useState } from 'react'
import classes from "./PasswordReset.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function PasswordReset() {

  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  const initialValues = {
    email: "",
    newPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    newPassword: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,}$/, "Minimum 4 characters, at least one upper case one lower case , one number and one special character ").required(),

  })

  const formik = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit: handlePasswordReset
    });


  async function handlePasswordReset(values) {
    setisLoading(true);

    try {
      const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
      console.log(data);

      if (data.token != "") {

        toast.success("Password reset successfully!",
          {
            position: 'top-right',
            autoClose: 1000,
          },
          setTimeout(() => {
            navigate("/login")
          }, 1500)

        );
      }
    }
    catch (error) {
      console.log(error);
      setError("Invalid Email");
      toast.error("Invalid Email",
        {
          position: 'top-right',
          autoClose: 1000,
        })
    }
    finally {
      setisLoading(false)
    }
  }
  useEffect(()=>{
    document.title = "Forget Password Page"
  },[])



  return (
    <section className='py-20 min-h-[calc(100vh-124px)] px-16 flex justify-center '>
      <div className="container mx-auto">
        <div className="inner">
          <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
            <h1 className='mb-5 text-xl'>Please reEnter Your Email and New Password:</h1>
            <div className="relative z-0 w-full mb-5 group">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" name="newPassword" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your New Password</label>
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="text-red-500">{formik.errors.newPassword}</div>
              ) : null}
            </div>
            {/* 3mlt condition 3al disabled 3shan a5lyha ma2fola fel awl la2en el isValid true fel awl 5als  */}
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-green'>
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Reset Password"}
            </button>
          </form>        </div>
      </div>
    </section>

  )
}
