import { useState ,useEffect } from 'react'
import { HiArrowLeft } from 'react-icons/hi'; 
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

function Like({className,on,id}) {
        const [like, setLike] = useState(false);
        //const [data, setLike] = useState(false);
  const chack_fav = async(id)=>{
    let res = await axios.get(`/api/favorites/${id}`)
   if(res.data.msg===1){
     setLike(true)
     //console.log(res.data,id)
   }else{
     setLike(false)
   }

  }
  const add_fav = async (prodct_id)=>{
     try{
   const response=  await axios.post("/api/favorites/",{
      prodct_id,
      
     });
    response.data.msg===1?setLike(true):setLike(false);
     return response.data;
   
   }catch(err){
     console.log(err)
   }
  
   }
  const delete_fav = async (id)=>{
     try{
   const response=  await axios.delete("/api/favorites/"+id);
    response.data.msg===1?setLike(false):setLike(like);
     return response.data;
   
   }catch(err){
     console.log(err)
   }
  
   }
  
  
  
  
  
  useEffect(()=>{
    chack_fav(id)
    
  },[id])
  
  

 return like? (
    <FaHeart className={`${className} decoration-2`}  onClick={()=>delete_fav(id)} />

  ): (
    <CiHeart className={`${className} decoration-2`}  onClick={()=>{add_fav(id)}} />

  )
}

export default Like
