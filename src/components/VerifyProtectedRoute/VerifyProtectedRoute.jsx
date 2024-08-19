import { useEffect, useState } from 'react'
import classes from "./VerifyProtectedRoute.module.css";
import { Navigate } from 'react-router-dom'


export default function VerifyProtectedRoute({children}) {
  if (!localStorage.getItem("message")){
  return <Navigate to= {'/login'}/>
  }


  
    return (
      children
    )
  }