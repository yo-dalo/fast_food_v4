import Button_1 from '../Components/Button_1';
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaRupeeSign, FaPlus } from "react-icons/fa";
import { RxDividerHorizontal } from "react-icons/rx";
import { useState, useEffect } from 'react';
import axios from 'axios';

function My_card() {
  const [my_card, set_My_card] = useState([]);
  const [product, setProduct] = useState([]);
  const [qu, setQu] = useState({});  // Track quantities per item
  const [my_card_arr, set_My_card_arr] = useState(() => {
    // Load initial data from local storage
    const storedItems = localStorage.getItem("item");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [total_rs ,setTotal_rs] = useState(10);
  const get_Card = async () => {
    try {
      const res = await axios.get("/api/f/v3/card/");
      set_My_card(res.data);
      const total_rs = res.data.reduce((acc, item) => {
      const itemTotal = item.Rs * item.Qty;
      return acc + itemTotal;
    }, 0);

    setTotal_rs(total_rs);
    
      //setQu(res.data.Qty);
    } catch (err) {
      console.error(err);
    }
  };
  const get_product = async () => {
    try {
      const res = await axios.get("/api/f/v1/card/");
      setProduct(res.data);
      
    } catch (err) {
      console.error(err);
    }
  };

  const delete_Card = async (id) => {
    try {
      await axios.delete(`/api/card/${id}`);
      get_Card();  // Re-fetch items after deletion
    } catch (err) {
      console.error(err);
    }
  };
  const qty_update = async (id,qty) => {
    try {
      await axios.patch(`/api/card/update/qty/`,{id,qty});
      get_Card();  // Re-fetch items after deletion
    } catch (err) {
      console.error(err);
    }
  };

  const add_select_item = (id) => {
    set_My_card_arr(prevItems => {
      const updatedItems = [...prevItems, id];
      localStorage.setItem("item", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const remove_select_item = (id) => {
    set_My_card_arr(prevItems => {
      const updatedItems = prevItems.filter(item => item !== id);
      localStorage.setItem("item", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const foundElement = (arr, elementToFind) => {
    return arr.includes(elementToFind);
  };

  useEffect(() => {
    get_Card();
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
            {my_card.map((item, index) => (
            
              <div key={index} className="w-full relative rounded-md bg-gray-100 h-20 flex justify-between items-center border border-gray-400 px-3">
                <input
                  type="checkbox"
                  checked={foundElement(my_card_arr, item.Id)}
                  onChange={(e) => e.target.checked ? add_select_item(item.Id) : remove_select_item(item.Id)}
                  className="absolute w-3 top-0.5 left-0.5 z-10"
                />
                <FaPlus onClick={() => delete_Card(item.Id)} className="rotate-45 absolute right-0.5 top-0.5" />
                <Link to={`../Detail/${item.product_id}`}>
                <span className="items-center flex r3  gap-3">
                  <img className="w-10 h-9 object-fill" src={`/uploads/${item.Img}` || './Img/default.png'} alt={item.Img} />
                  <div className="flex flex-col justify-between items-stretch">
                    <h6 className="text-[0.6rem]">{item.Product_name}</h6>
                    <h6 className="text-[0.6rem] flex items-center main_color"><spam className="text-[0.6rem] text-blue-700 mx-1.5">{item.Size_name}</spam> <FaRupeeSign />{item.Rs*item.Qty}</h6>
                  </div>
                </span>
                              </Link>
                <div className="flex text-sm flex-col items-end">
                  <h6 className="flex text-1 justify-center items-center gap-0.5"><CiHeart />{item.Rating}</h6>
                  <span className="flex gap-1.5 items-center">
                  {/*
                    <RxDividerHorizontal
                      onClick={() => qu[item.Id] > 1 && setQu({ ...qu, [item.Id]: qu[item.Id] - 1 })}
                      className="rounded-[200px] text-xl p-0.5 text-black bg-blue-200"
                    />
                    {qu[item.Id]}
                    <FaPlus
                      onClick={() => setQu({ ...qu, [item.Id]: qu[item.Id] + 1 })}
                      className="rounded-[200px] text-xl p-0.5 text-black main_bg"
                    />
                    */}
                     <RxDividerHorizontal
                    onClick={()=>item.Qty>1?qty_update(item.Id,item.Qty-1):alert("ise km nhi hoska")}
                      className="rounded-[200px] text-xl p-0.5 text-black bg-blue-200"
                    />
                    {item.Qty}
                    <FaPlus
                        onClick={()=> qty_update(item.Id,item.Qty+1)}

                      className="rounded-[200px] text-xl p-0.5 text-black main_bg"
                    />
                    
                    
                    
                    
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
            <h2 className="text-1 ">Total Items Rs </h2>
            <h2 className="text-1  font-light">Rs {total_rs}</h2>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-1">Shipping Fee</h2>
            <h2 className="text-1 r4">Rs 00</h2>
          </div>
          <hr />
          <div className="w-full flex justify-between">
            <h2 className="text-1">Total</h2>
            <h2 className="text-1 r4">Rs {total_rs}</h2>
          </div>
        </div>
      </div>

      <Link to="/Add_to_card" className={`sticky z-30 bottom-2 left-0 ${!my_card_arr.length==0? "scale-1" :"scale-0"}    `}>
        <button className="main_bg w-full rounded-3xl py-1.5 r3 ">Place To Checkout</button>
      </Link>
    </div>
  );
}

export default My_card;
