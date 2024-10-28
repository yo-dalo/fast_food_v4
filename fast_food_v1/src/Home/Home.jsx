import { useState ,useEffect,useContext } from 'react'
import { AuthContext } from '../AuthContext';
import { IoIosNotifications } from "react-icons/io";
//import './App.css'
import { FiSliders } from "react-icons/fi";
import { FaSquarePlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Outlet,
  Link,useNavigate
} from "react-router-dom";
import Footer from "../Components/Footer"
import Drop_down from "../Components/Drop_down"
import Login_pop_up from "../Components/Login_pop_up"
//import Loader from "../Components/Loader"


import Card from "../Components/Card"
import axios_get from "../Components/axios_get"
import axios from 'axios';



import { CgProfile } from "react-icons/cg";
import "swiper/css";




import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { FreeMode, Pagination } from 'swiper/modules';

function Home() {
  const navigate =useNavigate()
  const {user,chack ,setUser} = useContext(AuthContext);





  const [categories_data ,setCategories_data] = useState([]);
  const [login_drop_down ,setLogin_drop_down] = useState(0);
  const [product_data ,setProduct_data] = useState([]);
  const [poster_data ,setPoster_data] = useState([]);
  const [load ,setLoad] = useState(true);
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories/',{withCredentials: true});
      setCategories_data(response.data);
      setTimeout(setLoad(false),9000)
      
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const fetchPoster = async () => {
    try {
      const response = await axios.get('/api/Get/All/V1/F/poster',{withCredentials: true,});
      setPoster_data(response.data);
      
      
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const fetchProduct = async () => {
    try {
      const response = await axios.get('/api/v1/main/f/Product/getId/');
      setProduct_data(response.data);
      
      
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  
  
  
  
  
  useEffect(()=>{
    //setCategories_data(axios_get())
  //  alert(user)
    //console.log(user)
   // notlogin()
   //chack()
   /*
   chack().then(h=>{
      if(!h || !h.login ){
        console.log(h);
        navigate("login")
      }else{
        //console.log(h);
        
      }
      
      
    })
   */
   
    fetchCategories()
    fetchProduct()
    fetchPoster()
    
  },[])
  
  
return (

  <div className={`h-screen w-screen min-h-screen relative flex flex-col relative  items-center px-5 pt-10 sm:px-7 an`}>
<Login_pop_up />
<div className="w-full h-[15vw] flex justify-between items-center relative ">
  <img onClick={()=>setLogin_drop_down(login_drop_down?0:1)} className="h-[15vw] sm:h-[7vw] sm:w-[7vw] w-[15vw] object-cover rounded-[200px]" src="./Img/Admin/image_downloader_1704787312401-edited_(1).jpg"/>
  <Drop_down on={login_drop_down} />
  <div className="flex r">
  
  {/*
        <select className="bg-transparent w-full h-full" name="" id="">
      <option value="">jhook</option>
      <option value="">jhook</option>
      <option value="">jhook</option>
      <option value="">jhook</option>
      <option value="">jhook</option>
    </select>
*/}
   <h2 className="r3">AArav Fast Food & Cafe </h2>

  </div>
  <div className="h-full p-1 sm:h-1/2"><IoIosNotifications className="h-full w-full" /></div>
  </div>
<div className="block w-full py-4"><h1 className="r4">Ready to order your</h1></div>
<div className="flex justify-between w-full items-center h-[10vw] gap-1.5">
  <div className="w-full h-full ">
    <input type="text"
  placeholder="Type something..."
  className="border-2 outline-0 rounded-md py-2 w-full h-full px-4"
  /></div>
  <div className="h-full w-1/6 flex justify-center items-center rounded-md main_bg"><FiSliders /></div>
</div>

<div className="w-full flex flex-col gap-2 my-5">
  <h1 className="r3">Categories</h1>
  <div className="w-full">
    <Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, ]}
        className="mySwiper"
      >
      {categories_data.map((i,r)=>(
      <SwiperSlide key={r}>
      <Link to={`/Product_by_Category/${i.Id}`}>

          <div className="w-full flex flex-col justify-center items-center h-[10vw]">

            <img src={`http://localhost:3000/uploads/${i.Img}`} className="w-full h-full object-contain"/>
          </div>
          <h6 className="r3 text-sm text-center">{i.Name}</h6>
          </Link>
        </SwiperSlide>
      ))}
        
      </Swiper>
  </div>
</div>


<div className="w-full rounded-md  h-[35vw] ">
  <Swiper className="mySwiper w-full h-full">
  {poster_data.map((p,i)=> (
        <SwiperSlide key={i}><Link to={p.Url}><img className="w-full h-full object-contain" src={`http://localhost:3000/uploads/${p.Img}`} /></Link></SwiperSlide>
  ))}

      </Swiper>

</div>

<div className="w-full ">
  <div className="flex justify-between py-3 items-center">
    <h1 className="r3 ">Recommended</h1>
    <Link to="/Product" className="main_color text-sm r3">See All</Link>
  </div>
  <div className="w-full h-[40vw] sm:h-[30vw]">
    <Swiper
        slidesPerView={2}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: false,
        }}
        modules={[FreeMode,]}
        className="mySwiper w-full h-full"
      >
      {product_data.map((i ,r)=>(
        <SwiperSlide key={r} className="w-full h-full">
        <Card id={i.Id}/>
        </SwiperSlide>
      
      ))}

      

        
      </Swiper>
  </div>
  
</div>


<Footer on="1"/>

  </div>
  




  )





  
}

export default Home
