import { useState } from 'react'
 // const [categories_data ,setCategories_data] = useState(22);


const Loader = (prop) => {
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen z-40 ${prop.isOn?"backdrop-blur duration-[7s] scale-1 ":"backdrop-blur-none duration-[3s]  pointer-events-none "} flex justify-center items-center`}>
    
    {prop.isOn? "loding":""}
    
    
    </div>
  )
}

export default Loader