import Button_1 from '../Components/Button_1';
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaRupeeSign, FaPlus } from "react-icons/fa";
import { RxDividerHorizontal } from "react-icons/rx";
import { useState, useEffect } from 'react';
import axios from 'axios';

function My_order() {
  const [data, setData] = useState([])
    const [x1,setX1] = useState(["cancle", "panding", 'complete']);

const myOder= ()=>{
    axios.get("/api/v1/f/myOder/",{withCredentials: true}).then((res)=>{
      setData(res.data);
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
      
    })
    
  }
  
  
  
  
  useEffect(() => {
   // get_Card();
   myOder()
  }, []);
  
  return (
    <div className="w-screen h-screen px-5 pt-10 flex flex-col relative gap-3.5">
      <div className='flex w-full justify-between items-center'>
        <Button_1 />
        <h1 className="r3 text-xl">My Order</h1>
        <CiHeart />
      </div>
<div className=" w-full flex flex-col gap-3 overflow-scroll h-full">
{data.map((i,r)=>(
<Link to={`/My_order/My_Order_detail/${i.Id}`}>
        <div key={r} className="rounded-md bg-gray-100 border w-full flex flex-col gap-1 px-3 py-4">
          <div className="w-full flex justify-between">
            <h2 className="text-1">Oder  Id</h2>
            <h2 className="text-1 r4">{i.Id}</h2>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-1 ">Time</h2>
            <h2 className="text-1  font-light">Rs {i.Time}</h2>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-1">Address</h2>
            <h2 className="text-1 r4">{i.Address}</h2>
          </div>
          <hr />
          <div className="w-full flex justify-between">
            <h2 className="text-1">Status</h2>
            <h2 style={{color:i.Status==0?"red":i.Status==2?"green":"blue"}} className="text-1 r4">{x1[i.Status]}</h2>
          </div>
        </div>
    </Link>
))}
</div>

    </div>
  );
}

export default My_order;
