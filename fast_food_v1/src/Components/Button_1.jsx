import { useState } from 'react'
import viteLogo from '/vite.svg'
import '../App.css'
import { HiArrowLeft } from 'react-icons/hi'; 

function Button_1(f) {
  
  return (
    <div onClick={()=>{ window.history.back();}} className={`${f.className} w-[10vw] h-[10vw] sm:w-[6vw] sm:h-[6vw] bg_2  rounded-[100px] p-1.5 sm:p-4`}>
  <HiArrowLeft className="w-full h-full" />
</div>

  )
}

export default Button_1
