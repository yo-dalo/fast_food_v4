import axios from 'axios';
import {
  useState,useEffect
} from 'react'
import {
  useNavigate
} from "react-router-dom";
const Address = () => {
  
  const navigate = useNavigate();
  //   /api/user/addrass/:id
  const [addrass, setAddress] = useState("");
  const get_Address =async(id)=>{
    try{
    const res = await axios.get("http://localhost:3000/api/user/addrass/"+id)
    setAddress(res.data[0].Address);
    console.log(res.data)
    }catch(err){
      throw err;
    }
    
  }
  
  const update_Address =async(id,addrass)=>{
    try{
    const res = await axios.patch("http://localhost:3000/api/user/",{user_id:id,address:addrass})
    get_Address(id)
    navigate('/Add_to_card')
    }catch(err){
      throw err;
    }
    
  }
  
  useEffect(()=>{
    get_Address(1)
  },[])
  
  
  
  return (
    <div className="w-[100vw] h-[100vh] px-4 flex flex-col justify-center items-start">
    <h1>Address</h1>
     <div className="w-full rounded-md bg-gray-100 h-10 flex justify-between items-center border border-gray-400 p-0.5 ">
             <input type="text" value={addrass} onChange={(e)=> setAddress(e.target.value) } placeholder="Enter your Address" className="w-full h-full border-0 outline-0 px-2" />
    </div>
            <div className="w-full flex justify-center">  <button onClick={()=>update_Address(1,addrass)} className="px-8 border-2 border-black rounded-md my-5 py-1">ok</button></div>
  </div>
)
}

export default Address