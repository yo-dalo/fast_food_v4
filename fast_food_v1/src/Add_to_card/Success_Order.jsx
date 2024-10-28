import React from 'react'
import {Link} from "react-router-dom";

const Success_Order = () => {
  return (
    <div className="w-screen h-screen">
    <div className="w-full flex flex-col gap-5 h-full pt-20">
       <div className="w-full h-1/2 ">
       <img className="w-full h-full scale-[1]   object-contain" src="../Img/Logo/success.svg" />
       </div>
    
    <div className="">
    <h1 className="r3 text-2xl text-center w-full px-11 ">Your Order has been accepted</h1>
    <h3 className=" r1 text-sm font-semibold py-3 text-center w-full px-11 ">Your items has been placed and is on it's way to being processed</h3>
    </div>
    
    
    <div className="">
    <div className="px-11 w-full ">
    <Link to="/My_order">
        <button className="r3 bg_main main_bg w-full rounded-xl flex justify-center items-center py-2 px-11">Tarck Order</button>
</Link>
    </div>
     <Link to="/">
    <h3 className=" r2 font-semibold py-3 text-center w-full px-11 ">Back To home</h3>
    </Link>
    </div>
    
    
    
    </div>
    </div>
  )
}

export default Success_Order