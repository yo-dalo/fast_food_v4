import { useState, useContext,useEffect} from 'react'
import { CiShoppingCart } from "react-icons/ci";
import Login_pop_up from "../Components/Login_pop_up"
import {
  Link,useNavigate
} from "react-router-dom";

import { AuthContext } from '../AuthContext';
const Shoping_card_icon = ({className,_className}) => {
const navigate = useNavigate();
 const {chack,my_card_items,setLogIn_popUp} = useContext(AuthContext);
// const [my_card_items, setMy_card_items] = useState(10);
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
    
<div onClick={()=> !login? setLogIn_popUp(true):navigate("/My_card")}  className="relative ">
{my_card_items ? <div className={`${_className} absolute bg-amber-300 w-5 h-5 text-center flex flex-col  text-blue-950  rounded-3xl -top-1 -right-1 justify-center text-[3vw]`}><h5>{my_card_items}</h5></div>:""}
<CiShoppingCart className={className} />
</div>
  )
}

export default Shoping_card_icon