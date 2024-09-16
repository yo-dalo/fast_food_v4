import Button_1 from '../Components/Button_1';
import Footer from '../Components/Footer';
import { CiHeart } from "react-icons/ci";
import { Outlet, Link } from "react-router-dom";
import { FaRupeeSign, FaPlus } from "react-icons/fa";
import { RxDividerHorizontal } from "react-icons/rx";
import { useState, useEffect } from 'react';
import axios from 'axios';

function My_card() {
  const [my_card, set_My_card] = useState([]);
  const [qu, setQu] = useState({});  // Track quantities per item
  const [my_card_arr, set_My_card_arr] = useState([]);

  const get_Card = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/f/v1/card/");
      set_My_card(res.data);
      
    } catch (err) {
      console.error(err);
    }
  };
  const delete_Card = async (id) => {
    try {
      await axios.delete("http://localhost:3000/api/card/" + id);
      get_Card();  // Re-fetch items after deletion
    } catch (err) {
      console.error(err);
    }
  };

 const add_select_item =(id)=>{
   set_My_card_arr([...my_card_arr,id])
}
 const remove_select_item =(id)=>{
     set_My_card_arr((prevItems) => prevItems.filter((item) => item !== id));
}

const add_local = (arr)=>{
   window.localStorage.setItem("item",JSON.stringify(arr))
   
}
/*const get_local = (arr)=>{
  const x= JSON.parse(window.localStorage.getItem("item"));
  set_My_card_arr([...x])
  console.log(x);
}*/
const foundElement = (arr,elementToFind)=>{
return arr.find(element => element === elementToFind)

}








  useEffect(() => {
   // alert(window.localStorage.getItem("item")[0])
    get_Card();
  }, []);
  
  useEffect(() => {
    add_local(my_card_arr);
    console.log(my_card_arr,"my_card_arr");
  }, [my_card_arr]);
  useEffect(() => {
   const x=  window.localStorage.getItem("item")
    console.log(x,"localStorage");
    set_My_card_arr((prevItems)=> [...x])
  }, []);

  return (
    <div className="w-screen h-screen px-5 pt-10 flex flex-col relative gap-3.5">
      <div className='flex w-full justify-between items-center'>
        <Button_1 />
        <h1 className="r3 text-xl">Checkout</h1>
        <CiHeart />
      </div>

      <div className="flex flex-1 flex-col items-center gap-1.5">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-col gap-1">
            <h2 className="text-sm r3">Item List</h2>
            {my_card.map((item,rr) => (
              <div key={rr} className="w-full relative rounded-md bg-gray-100 h-20 flex justify-between items-center border border-gray-400 px-3">
                <input type="checkbox" checked={foundElement(my_card_arr,item.Id)?true:false} onClick={(e) => e.target.checked ? add_select_item(item.Id):remove_select_item(item.Id) } className="absolute w-3 top-0.5 left-0.5 z-10" />
                <FaPlus onClick={()=>delete_Card(item.Id)} className="rotate-45 absolute right-0.5 top-0.5" />
                <span className="items-center flex r3 bg-amber-100 gap-3">
                  <img className="w-10 h-9 object-fill" src={item.image_url || './Img/default.png'} alt={item.name} />
                  <div className="flex flex-col justify-between items-stretch">
                    <h6 className="text-[0.6rem]">{item.name}</h6>
                    <h6 className="text-[0.6rem] flex items-center main_color"><FaRupeeSign />{item.price}</h6>
                  </div>
                </span>
                <div className="flex text-sm flex-col items-end">
                  <h6 className="flex text-1 justify-center items-center gap-0.5"><CiHeart />{item.rating}</h6>
                  <span className="flex gap-1.5 items-center">
                    <RxDividerHorizontal onClick={() => qu[item.id] > 1 ? setQu({ ...qu, [item.id]: qu[item.id] - 1 }) : null} className="rounded-[200px] text-xl p-0.5 text-black bg-blue-200" />
                    {qu[item.id]}
                    <FaPlus onClick={() => setQu({ ...qu, [item.id]: qu[item.id] + 1 })} className="rounded-[200px] text-xl p-0.5 text-black main_bg" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md bg-gray-100 border w-full flex flex-col gap-1 px-3 py-4">
          <div className="w-full flex justify-between">
            <h2 className="text-1">Total Items</h2>
            <h2 className="text-1 r4">{my_card.length}</h2>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-1">Subtotal</h2>
            <h2 className="text-1 r4">Rs{my_card.reduce((sum, item) => sum + item.price * qu[item.id], 0)}</h2>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-1">Shipping Fee</h2>
            <h2 className="text-1 r4">Rs00</h2>
          </div>
          <hr />
          <div className="w-full flex justify-between">
            <h2 className="text-1">Total</h2>
            <h2 className="text-1 r4">Rs{my_card.reduce((sum, item) => sum + item.price * qu[item.id], 0)}</h2>
          </div>
        </div>
      </div>

      <Link to="/Add_to_card" className="sticky z-30 bottom-2 left-0">
        <button className="main_bg w-full rounded-3xl py-1.5 r3">Place To Checkout</button>
      </Link>
    </div>
  );
}

export default My_card;
