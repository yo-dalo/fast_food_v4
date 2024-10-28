import { useState, useContext,useEffect} from 'react'
import { Outlet, Link ,useNavigate} from "react-router-dom";
import viteLogo from '/vite.svg'
import '../App.css'
import { AuthContext } from '../AuthContext';

import Login_pop_up from "../Components/Login_pop_up"

import { GoHome } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
//import { CiShoppingCart } from "react-icons/ci";
// Import Swiper styles
import Shoping_card_icon from '../Components/Shoping_card_icon';

import { CgProfile } from "react-icons/cg";






function Footer(f) {
  const {chack,my_card_items,setMy_card_items ,setLogIn_popUp} = useContext(AuthContext);
  const navigate =useNavigate();
const [login, setLogin] = useState(false);

useEffect(()=>{
    chack().then(h=>{

      if(!h || !h.login ){
      //  navigate("/")
        console.log('not login like',h);
       
      }else{
        setLogin(true);
      
        
      }
      
      
    })
    
  },[login])

  
  
  
  
  
  
  return (
<div className={`text-3xl sm:text-5xl duration-100 border-t-gray-400 border-2  mt-2 rounded-md flex justify-between z-10 shadow-gray-400 bg-amber-100 items-center px-5 w-full h-[13vw] sm:h-[10vw] sticky bottom-2 left-0 main_bg ${f.className}`}>
  <Link to="/"> <GoHome className={`text-black rounded-md p-0.5 ${f.on==1?'main_bg':''}`} /></Link>
  
  <CiHeart onClick={()=>!login?setLogIn_popUp(true):navigate("/Favorite")} className={`text-black rounded-md p-0.5  ${f.on==2?'main_bg':''}`} />
  
  
  <Shoping_card_icon   className={`text-black rounded-md p-0.5  ${f.on==3?'main_bg':''}`} />


  <CgProfile onClick={()=>!login?setLogIn_popUp(true):navigate("/Account")} className={`text-black rounded-md p-0.5  ${f.on==4?'main_bg':''}`} />
  

  
</div>
  )
}

export default Footer
