import { useEffect, useState } from 'react'
import classes from "./Footer.module.css";


export default function Footer() {


  return (
    <div className='text-center bg-gray-900 p-3'>
      <h1 className=' text-lg text-gray-400'>Copyright DagherMarket © 2024 | Made By
        <a className='ms-2 text-green-500 hover:underline' href="https://www.facebook.com/Baher.Osama.Farouk/">Baher Dagher</a>
      </h1>

    </div>
  )
}
