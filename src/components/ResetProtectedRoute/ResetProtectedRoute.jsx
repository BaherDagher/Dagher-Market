import { useEffect, useState } from 'react'
import classes from "./ResetProtectedRoute.module.css";
import { Navigate } from 'react-router-dom'


export default function ResetProtectedRoute({children}) {
  if (!localStorage.getItem("status")){
  return <Navigate to= {'/login'}/>
  }


  
    return (
      children
    )
  }