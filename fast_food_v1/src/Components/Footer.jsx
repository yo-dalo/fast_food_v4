import { useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import viteLogo from '/vite.svg'
import '../App.css'


import { GoHome } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
// Import Swiper styles
import { CgProfile } from "react-icons/cg";







function Footer(f) {
  return (
<div className={`text-3xl sm:text-5xl duration-100 border-t-gray-400 border-2  mt-2 rounded-md flex justify-between z-10 shadow-gray-400 bg-amber-100 items-center px-5 w-full h-[13vw] sm:h-[10vw] sticky bottom-2 left-0 main_bg ${f.className}`}>
  <Link to="/"> <GoHome className={`text-black rounded-md p-0.5 ${f.on==1?'main_bg':''}`} /></Link>
  <Link to="/Favorite">
  <CiHeart className={`text-black rounded-md p-0.5  ${f.on==2?'main_bg':''}`} />
  </Link>
    <Link to="/My_card">
  <CiShoppingCart className={`text-black rounded-md p-0.5  ${f.on==3?'main_bg':''}`} />
  </Link>
    <Link to="/Account">
  <CgProfile  className={`text-black rounded-md p-0.5  ${f.on==4?'main_bg':''}`} />
  </Link>

  <Outlet />
</div>
  )
}

export default Footer
