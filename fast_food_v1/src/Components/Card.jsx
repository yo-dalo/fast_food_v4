import {
  useState,useEffect
} from 'react'
import viteLogo from '/vite.svg'
import '../App.css'
import {
  Outlet,
  Link
} from "react-router-dom";

import {
  Swiper,
  SwiperSlide
} from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  FaSquarePlus
} from "react-icons/fa6";
import {
  CiHeart
} from "react-icons/ci";
import {
  FaRupeeSign
} from "react-icons/fa";
import {
  FreeMode,
  Pagination
} from 'swiper/modules';
import Like from '../Components/Like';
import axios from 'axios';
function Card(g) {
  const [prodct_id , setProdct_id] = useState(g.id ||  1)
  const [product , setProduct] = useState([]);
  
  const get_prodct =async(id)=>{
    try{
    const res = await axios.get("http://localhost:3000/api/f/v1/Product/"+id)
    setProduct(res.data);
    console.log(res.data)
    }catch(err){
      throw err;
    }
    
  }
  
  useEffect(()=>{
    get_prodct(prodct_id)
  },[])
  
  return (
    product.map((i,r)=>(
    <div key={r} className={`${g.className}w-full relative h-full bg-amber-100 rounded-md px-4 py-2`} >
      <Link to={`/Detail/${i.product_id}`}>
        <div className="w-full h-[60%] ">
          <img className="w-full h-full object-scale-down" src={`http://localhost:3000/uploads/${i.images}`} />
      </div>
      <div className="flex flex-col leading-none sm:leading-snug ">
        <h2 className="r3 text-sm">{i.product_name}</h2>
        <h4 className="r2 text-[3vw]">{i.Category_Name}</h4>
        <div className="flex w-full justify-between">
          <h2 className="r3 text-sm">Rs.{i.product_price}</h2>
          <FaSquarePlus className="main_color sm:text-4xl" />
        </div>

      </div>
    </Link>
    <Like  id={g.id} className="absolute sm:text-4xl right-1.5 top-1.5" />
  </div>
   ))
)
}

export default Card