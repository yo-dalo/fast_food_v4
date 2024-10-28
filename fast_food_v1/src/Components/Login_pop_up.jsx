import { useState, useEffect ,useContext} from 'react';
import { AuthContext } from '../AuthContext';
import {
  Link,useNavigate
} from "react-router-dom";
const Login_pop_up = () => {
    const {setLogIn_popUp,logIn_popUp} = useContext(AuthContext);

  

  
 return(
   <div onClick={()=> setLogIn_popUp(false) }  style={{display:logIn_popUp?"":"none"}} className="fixed Login_pop_up_ani top-0 left-0  w-screen h-screen flex justify-center items-center backdrop-blur-sm z-50">
     <div className="w-1/2 min-h-15  bg-gray-50 rounded-2xl px-3 py-2 flex flex-col justify-between shadow-cyan-500 shadow-sm"> 
           <Link  to="/Login" className="hover:bg-gray-300 px-4 py-1 rounded-xl"> LogIn </Link>
           <Link to="/Ragistration" className="hover:bg-gray-300 px-4 py-1 rounded-xl"> Ragistion </Link>
          
     
     
    </div>
    
    </div>
  
  )
}

export default Login_pop_up