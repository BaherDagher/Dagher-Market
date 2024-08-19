import { useEffect, useState } from 'react'
import classes from "./Home.module.css";
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import RecentProducts from '../RecentProducts/RecentProducts';


export default function Home() {


  useEffect(()=>{

    document.title = "Home Page"
  },[])

  return (
    <>
    <MainSlider />
    <CategorySlider />
    <RecentProducts />

    </>)
}
