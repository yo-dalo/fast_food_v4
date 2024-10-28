import Button_1 from '../Components/Button_1';
import { CiHeart } from "react-icons/ci";
import { Link,useParams } from "react-router-dom";
import { FaRupeeSign, FaPlus } from "react-icons/fa";
import { RxDividerHorizontal } from "react-icons/rx";
import { useState, useEffect } from 'react';
import axios from 'axios';

function My_Order_detail() {
  const {id} = useParams();
  
  const [data, setData] = useState([])
  const [bw, setBw] = useState([])
  const [trs, setTrs] = useState(0)
    const [x1,setX1] = useState(["cancle", "panding", 'complete']);

const myOder= (id)=>{
    axios.get("/api/v1/f/myOder/detail/"+id,{withCredentials: true}).then((res)=>{
      setData(res.data);
    setBw(res.data[0]);
    const total_rs = res.data.reduce((acc, item) => {
      const itemTotal = item.Rs * item.Qty;
      return acc + itemTotal;
    }, 0);

    
    setTrs(total_rs)
      
    }).catch((err)=>{
      console.log(err);
      
    })
    
  }
  
  
  
  
  useEffect(() => {
   // get_Card();
   myOder(id)
  }, []);
  
  return (
    <div className="w-screen h-screen px-5 pt-10 flex flex-col relative gap-3.5">
      <div className='flex w-full justify-between items-center'>
        <Button_1 />
        <h1 className="r3 text-xl">My Order detail </h1>
        <CiHeart />
      </div>
<div className=" w-full flex flex-col gap-3 overflow-scroll h-full">

        <div  className="rounded-md bg-gray-100 border border-2 border-gray-700  w-full flex flex-col gap-1 px-3 py-4">
          <div className="w-full flex justify-between">
            <h2 className="text-1 r2">Oder  Id</h2>
            <h2 className="text-1 r1">{bw.Order_id}</h2>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-1 ">User_id</h2>
            <h2 className="text-1  font-light">Rs {bw.User_id}</h2>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-1">Address</h2>
            <h2 className="text-1 r4">{bw.Address}</h2>
          </div>
          <hr />
          <div className="w-full flex justify-between">
            <h2 className="text-1">Status</h2>
            <h2 style={{color:bw.order_status==0?"red":bw.order_status==2?"green":"blue"}} className="text-1 r4">{x1[bw.order_status]}</h2>
          </div>
          
          <div className="w-full flex justify-between">
            <h2 className="text-1">Total Amaunt</h2>
            <h2  className="text-1 r4">{trs}</h2>
          </div>
          </div>
                  <h3 className="text-blue-900 px-10"> If  Cancel Order call 1234567890 send Order id and Cancel Otp</h3>

                  <div  className="rounded-md bg-gray-100 border border-2 border-gray-700  w-full flex flex-col gap-1 px-3 py-4">

                    <div className="w-full flex justify-between">
            <h2 className="text-1">Place Otp</h2>
            <h2  className="text-1 r4">{bw.Place_otp}</h2>
          </div>
                    <div className="w-full flex justify-between">
            <h2 className="text-1 text-red-900"> Cancel Otp</h2>
            <h2  className="text-1 text-red-900 r4">{bw.Cancel_otp}</h2>
          </div>
          
                    <div className="w-full flex justify-between">
            <h2 className="text-1 text-lime-900">Delete Otp</h2>
            <h2  className="text-1 text-lime-900 r4">{bw.Delete_otp}</h2>
          </div>
          
          
          
        </div>
        
        <h2>Items List</h2>
    
    {data.map((p,i)=>(
     <div key={i} className="rounded-md bg-gray-100 border w-full flex flex-col gap-1 px-3 py-4">
      <div className="w-full flex justify-between">
            <h2 className="text-1 ">Qty</h2>
            <h2 className="text-1  font-light">{p.Qty}</h2>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-1">Iteam Name</h2>
            <h2 className="text-1 r4">{p.product_name}</h2>
          </div>
         
          <div className="w-full flex justify-between">
            <h2 className="text-1">Size</h2>
            <h2 className="text-1 r4">{p.Size}</h2>
          </div>
          <hr />
          <div className="w-full flex justify-between">
            <h2 className="text-1">Rs</h2>
            <h2 style={{color:bw.order_status==0?"red":bw.order_status==2?"green":"blue"}} className="text-1 r4">{p.Rs+"*"+p.Qty+"="+p.Rs*p.Qty}</h2>
          </div>
        </div>
    
    
    
    ))}
    
    

</div>

    </div>
  );
}

export default My_Order_detail;
