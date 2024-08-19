import { useEffect, useState } from 'react'
import classNamees from "./Layout.module.css";
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default function Layout() {


  return (
    <>

      <Navbar />
      <Outlet  />
      <Footer />
    </>
  )
}
