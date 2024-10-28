import {
  useState,useEffect
} from 'react'
import viteLogo from '/vite.svg'
import '../App.css'

import {
  Outlet,
  Link,useParams
} from "react-router-dom";
import {
  FaPlus
} from "react-icons/fa";

import {
  GoHome
} from "react-icons/go";
import {
  CiHeart
} from "react-icons/ci";
import {
  CiShoppingCart
} from "react-icons/ci";
import {
  FaRupeeSign
} from "react-icons/fa";
// Import Swiper styles
import {
  RxDividerHorizontal
} from "react-icons/rx";

import {
  CgProfile
} from "react-icons/cg";
import Button_1 from "../Components/Button_1"
import Like from "../Components/Like"
import {
  Swiper,
  SwiperSlide
} from "swiper/react";
import "swiper/css";
import axios from 'axios';

function Detal({iid}) {
  const { id} = useParams();
   const [id_, setId] = useState(id);
  
  
  const [product , setProduct] = useState([]);
  
  const get_prodct =async(id)=>{
    try{
   //const res = await axios.get("http://localhost:3000/api/Product/"+id)
    const res = await axios.get("http://localhost:3000/api/f/v1/Product/"+id)
    
    setProduct(res.data);
    console.log(res.data)
    }catch(err){
      throw err;
    }
    
  }
  
  useEffect(()=>{
    get_prodct(id_)
  },[])
  
  
  
  
  
  
  const [qu,
    setQu] = useState(1);
      const [selectedSize, setSelectedSize] = useState('');
      const [button, setButton] = useState(true);
      const [size_, setSize_] = useState(['Small', 'Medium', 'Large', 'Extra Large']);
      const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];
      
      const handleSizeChange = (size) => {
       setSelectedSize(size)
       setButton(false)

  };

  return (
    <>
{product.map((i,r)=>(
    <div className="w-screen h-screen px-5 sm:px-7 pt-10 flex flex-col relative an">
      <div className="flex h-10  justify-between items-center">
        <Button_1 className="w-[9vw] h-[9vw]" />
        <h1 className="r">Details</h1>
        <div className="flex text-2xl justify-center items-center gap-2">
          <Like id={i.product_id}/>
          <CiShoppingCart />

        </div>
      </div>


      <div className="flex-1">
        <div className="w-full  rounded-sm  bg-pink-50 h-[60vw] my-3 sm:my-6 ">
          <Swiper className="mySwiper w-full h-full">
          
            <SwiperSlide><img className="w-full h-full object-contain" src={`http://localhost:3000/uploads/${i.images[0]}`} /></SwiperSlide>
            <SwiperSlide><img className="w-full h-full object-contain" src={`http://localhost:3000/uploads/${i.images[1]}`} /></SwiperSlide>
            <SwiperSlide><img className="w-full h-full object-contain" src={`http://localhost:3000/uploads/${i.images[2]}`} /></SwiperSlide>
          
      </Swiper>

    </div>
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex justify-between">
          <h1 className="r3 text-xl ">Salad</h1>
          <h1 className="r3 main_color flex items-center"><FaRupeeSign />{i.product_price}</h1>
        </div>
        <div className="flex gap-4">
          <h6 className="text-sm r3">3.5k.m.</h6> <h6 className="text-sm r2">49<span className="text-sm font-extralight text-gray-300">(30 review)</span></h6>
        </div>

      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="r3 text-xl ">Discription</h1>
          <h1 className="r3 main_color"></h1>
        </div>
        <div className="flex gap-4 r2 text-sm  overflow-hidden h-[29vw] sm:h-auto">
          IMPORTED &  MARKRTER BY
          ZEBION INFOTECH PVT . LTD ZEBION HOURSE .
          GHORPADI PETH PUNE N411042 (MAHARASHTRA )
          MONTH & YEAR JANUARY 2023
          PRODUCT NAME  KKEYBOARED USB ZEBION K500
          QTY 1PCS [ MRP : 649 ( INCL OF ALL TAXER
          EMALL SERVICE @ZEBION IN FOR COMPLAINTS AND FEEDBACK :"CONTAC THE ABOUT ADDDRESS :
          OR CALL OUR national customer
          CARE NAMBER  9623441166
          COUNTRY OF ORIGIN ;PRC
        </div>

      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="r3 text-xl ">Size</h1>
        </div>
        {selectedSize}
        <div className="flex overflow-x-scroll gap-3.5">
        {sizes.map((i,r)=>(
        <div key={r} onClick={()=> handleSizeChange(i)} className={`p-2  r4 ${i===selectedSize ? "main_bg":'bg_2'}  rounded-md`}>
            {i}
          </div>
        ))}
          
         


        </div>

      </div>

    </div>
  </div>

  <div className="flex justify-between items-center sticky bottom-2 left-0">
    <div className="flex justify-center gap-3 items-center ">
      <RxDividerHorizontal onClick={()=> qu > 1? setQu(qu-1): setQu(qu)} className="text-3xl rounded-full p-0.5 bg-gray-400" /><h1 className="r3">{qu}</h1><FaPlus onClick={()=> setQu(qu+1) } className="text-3xl  rounded-full p-1 main_bg" />
    </div>
    <button 
  disabled={button}
  
  className={`r3 text-sm ${button ? "bg_2" : "main_bg"}  px-5 rounded-3xl py-3`}
>{button?"Select size":"Add to card"}
  
</button>
  </div>


</div>
))}
</>

)
}

export default Detal