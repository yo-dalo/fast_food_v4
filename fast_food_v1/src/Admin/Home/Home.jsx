import { useState ,useEffect,useContext } from 'react'
import { AuthContext } from '../../AuthContext';
import Nav from "../Part/Nav"
import {
  useNavigate
} from "react-router-dom";
function Home_() {
  const navigate =useNavigate()

  const {user ,chack_admin} = useContext(AuthContext);

  
  useEffect(()=>{
   chack_admin().then(h=>{
      if(!h || !h.login ){
        console.log(h);
        navigate("/admin/admin_Login")
      }else{
        //console.log(h);
      }
      
      
    })
   
   
    
  },[])
  
  
  
  
  return (
    <>
      <div className="w-screen h-screen px-4 bg-blue-50">
       <Nav/>
      <div className="breadcrumbs text-sm">
  <ul>
    <li><a>Home</a></li>
    <li><a>Documents</a></li>
    <li>Add Document</li>
  </ul>
</div>
        
      </div>
      
    </>
  )
}

export default Home_
