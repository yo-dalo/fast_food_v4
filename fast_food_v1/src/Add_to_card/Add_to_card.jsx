import Button_1 from '../Components/Button_1';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import {
  CiHeart
} from "react-icons/ci";
import {
  FaRupeeSign
} from "react-icons/fa";
import {
  IoLocationOutline
} from "react-icons/io5";
import { useState, useEffect } from 'react';
import axios from 'axios';





function Add_to_card() {
  
  const [my_card_arr, set_My_card_arr] = useState(() => {
    // Load initial data from local storage
    const storedItems = localStorage.getItem("item");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  
    const [p_data , setP_data ]= useState([]);
const [total_rs ,setTotal_rs] = useState(0);
const [user_address ,setUser_address] = useState("");



  
  const get_place = async (my_card_arr) => {
  try {
    const res = await axios.post("/api/f/v6/Card/", { my_card_arr });
    
    // Setting data in state
    setP_data(res.data);
    setUser_address(res.data[0].Address);
    
    // Correcting the reduce function
    const total_rs = res.data.reduce((acc, item) => {
      const itemTotal = item.price * item.Qty;
      return acc + itemTotal;
    }, 0);

    setTotal_rs(total_rs);
  } catch (err) {
    console.error(err);
  }
};
  const add_Order = async () => {
    try {
      const res = await axios.post("/api/v1/order",{
        Address:user_address,
        Payment_mathed:"case on Delivery",
        Payment_id:"1223",
        Payment_time:"37:544",
        Paymented:1,
        Delivered:0,
        Delivered_time:"",
        card_arr:my_card_arr,
        
        
      });
     //setP_data(res.data);

    
      //setQu(res.data.Qty);
    } catch (err) {
      console.error(err);
    }
  };
  
  
  
  
  useEffect(() => {
    get_place(my_card_arr);
  }, []);
  return (
    <div className="w-screen h-screen px-5 pt-10 flex flex-col an relative  gap-3.5">
      <div className='flex w-full justify-between items-center'>
        <Button_1 />
        <h1 className="r3 text-xl">Checkout</h1>
        <div></div>
      </div>
      <div className="flex flex-1 flex-col items-center flex-1 gap-1.5 ">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-col gap-1">
            <h2 className="text-sm r3">Delivery Address</h2>
            <Link to="/Address">
            <div className="w-full rounded-md bg-gray-100 h-10 flex justify-between items-center border border-gray-400 px-3">
              <span className=" items-center flex r3  gap-3"><IoLocationOutline /> <h6 className="text-[0.6rem] overflow-hidden whitespace-nowrap">{user_address}</h6></span>
              <CiHeart />
            </div>
           </Link>

          </div>
          <div className="w-full flex flex-col gap-1">
            <h2 className="text-sm r3">Payment Method</h2>
            <div className="w-full rounded-md bg-gray-100 h-10 flex justify-between items-center border border-gray-400 px-3">
              <span className=" items-center flex r3  gap-3"><CiHeart /> <h6 className="text-[0.6rem]">your profile</h6></span>
              <CiHeart />
            </div>

          </div>
          
          <div className="w-full flex flex-col gap-1">
            <h2 className="text-sm r3">Item List</h2>
            {p_data.map((item,i)=>(
           
            <div key={i} className="w-full  rounded-md bg-gray-100 h-16 flex justify-between items-center border border-gray-400 px-3">
              <span className=" items-center flex r3  gap-3"><img className="w-10 h-9 object-fill" src={`/uploads/${item.Img}`} />
              <div className="flex flex-col justify-between items-stretch">
                <h6 className="text-[0.6rem]">{item.product_name}</h6>
                <h6 className="text-[0.6rem] main_color flex items-center"><FaRupeeSign />{item.price*item.Qty}</h6>

              </div>
            </span>
            <div className="flex text-sm flex-col items-end ">
              <h6 className="flex justify-center items-center gap-0.5"><CiHeart />4.8</h6>
              <span>{item.Qty}x</span>
            </div>
            
          </div>
            ))}
            
         
      

  </div>
</div>
<div className="rounded-md bg-gray-100 border w-full  flex flex-col gap-1 px-3 py-4">
  <div className=" w-full flex justify-between">
    <h2 className="text-1">Total Item </h2> <h2 className="text-1 r4">{p_data.length}</h2>
  </div>
  <div className=" w-full flex justify-between">
    <h2 className="text-1">Subtotal</h2> <h2 className="text-1 r4">Rs {total_rs}</h2>
  </div>
  <div className=" w-full flex justify-between">
    <h2 className="text-1">Shipping Fee </h2> <h2 className="text-1 r4">Rs00</h2>
  </div>
  <hr></hr>
  <div className=" w-full flex justify-between">
    <h2 className="text-1">Total</h2> <h2 className="text-1 r4">Rs34</h2>
  </div>
</div>

</div>

<button   onClick={()=> my_card_arr.length==0? alert("plese select item "): add_Order()} className="main_bg rounded-3xl py-1.5 r3 sticky bottom-2 left-0 ">Place Order</button>


</div>


)
}

export default Add_to_card