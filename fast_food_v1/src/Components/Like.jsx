import { useState ,useEffect,useContext } from 'react'
import { HiArrowLeft } from 'react-icons/hi'; 
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from '../AuthContext';
import {
  useNavigate

} from "react-router-dom";

function Like({className,on,id}) {
  const { setUser,user,chack,setLogIn_popUp } = useContext(AuthContext);
  const navigate = useNavigate();
        const [like, setLike] = useState(false);
        const [login, setLogin] = useState(false);
        //const [data, setLike] = useState(false);
  const chack_fav = async(id)=>{
    let res = await axios.get(`/api/favorites/${id}`,{withCredentials: true})
   if(res.data.msg===1){
     setLike(true)
     //console.log(res.data,id)
   }else{
     setLike(false)
   }

  }
  const add_fav = async (prodct_id)=>{
     try{
   const response=  await axios.post("http://localhost:3000/api/favorites/",{
      prodct_id,
     },{withCredentials: true});
    response.data.msg===1?setLike(true):setLike(false);
     return response.data;
   
   }catch(err){
     console.log(err)
   }
  
   }
  const delete_fav = async (id)=>{
     try{
   const response=  await axios.delete("http://localhost:3000/api/favorites/"+id,{withCredentials: true});
    response.data.msg===1?setLike(false):setLike(like);
     return response.data;
   
   }catch(err){
     console.log(err)
   }
  
   }
  
  
  
  
  
  useEffect(()=>{
    chack().then(h=>{

      if(!h || !h.login ){
      //  navigate("/")
        console.log('not login like',h);
       
      }else{
        setLogin(true);
      chack_fav(id);
     // setLogin_popUp(false);
        
      }
      
      
    })
    
  },[id,login])
  
  

 return like? (
    <FaHeart className={`${className} decoration-2`}  onClick={()=>{login?delete_fav(id):setLogIn_popUp(true)}} />

  ): (
    <CiHeart className={`${className} decoration-2`}  onClick={()=>{login?add_fav(id):setLogIn_popUp(true)}} />

  )
}

export default Like
