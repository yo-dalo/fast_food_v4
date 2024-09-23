import { useState, useEffect } from 'react';
import { useParams ,Link} from "react-router-dom";
import { FaPlus, FaRupeeSign } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { RxDividerHorizontal } from "react-icons/rx";
import Like from "../Components/Like";
import Button_1 from "../Components/Button_1";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from 'axios';

function Detal() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [price_, setPrice] = useState(null);
  
  const [qu, setQu] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSize_id, setSelectedSize_id] = useState(null);
  const [button, setButton] = useState(true);
  const [add_to_card,setAdd_to_card]=useState({ })



const handle_add_to_card = async (i) => {
  const newCard = { 
    product_id: i.product_id, 
    size_id: selectedSize_id, 
    prodct_qty: qu 
  };

  try {
    const res = await axios.post("/api/card/", newCard);
    //setProduct(res.data);
    console.log(res.data);
    alert(res.data.msg)
  } catch (err) {
    console.error(err);
  }
};



  const get_product = async (id) => {
    try {
      const res = await axios.get("/api/f/v2/Product/" + id);
      setProduct(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    get_product(id);
  }, [id]);

  const handleSizeChange = (size, price,id) => {
    setSelectedSize(size);
    setPrice(price);
    setButton(false);
    setSelectedSize_id(id)
  };

  return (
    <>
      {product.map((i) => (
        <div key={i.product_id} className="w-screen h-screen px-5 sm:px-7 pt-10 flex flex-col relative an">
          <div className="flex h-10 justify-between items-center">
            <Button_1 className="w-[9vw] h-[9vw]" />
            <h1 className="r">Details</h1>
            <div className="flex text-2xl justify-center items-center gap-2">
              <Like id={i.product_id} />
              <Link to="/My_card">
              <CiShoppingCart />
              </Link>
            </div>
          </div>

          <div className="flex-1 ">
            <div className="w-full rounded-sm bg-pink-50 h-[60vw] my-3 sm:my-6 ">
              <Swiper className="mySwiper w-full h-full">
                {i.Img.map((iii, rrr) => (
                  <SwiperSlide key={rrr}>
                    <img className="w-full h-full object-contain" src={`/uploads/${iii}`} alt={`Product image ${rrr}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <div className="flex justify-between">
                  <h1 className="r3 text-xl ">{i.product_name}</h1>
                  <h1 className="r3 main_color flex items-center"><FaRupeeSign />{selectedSize ? price_ : i.product_price}</h1>
                </div>
                <div className="flex gap-4">
                  <h6 className="text-sm r3">3.5k.m.</h6>
                  <h6 className="text-sm r2">49<span className="text-sm font-extralight text-gray-300">(30 reviews)</span></h6>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <h1 className="r3 text-xl ">Description</h1>
                </div>
                <div className="flex gap-4 r2 text-sm overflow-hidden h-[29vw] sm:h-auto">
                  {i.product_details}
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <h1 className="r3 text-xl ">Size</h1>
                </div>
                <div>{selectedSize}</div>
                <div className="flex overflow-x-scroll gap-3.5">
                  {i.Size.map((size, r) => (
                    <div key={r} onClick={() => handleSizeChange(size.size_name, size.size_price,size.size_id)} className={`p-2 r4 ${size.size_name === selectedSize ? "main_bg" : 'bg_2'} rounded-md`}>
                      {size.size_name}
                    </div>
                  ))}
                </div>
              </div>
            </div> 
          </div>

          <div className="flex justify-between backdrop-blur-sm items-center sticky fixed bottom-2 z-10 left-0 duration-100">
            <div className="flex justify-center gap-3 items-center">
              <RxDividerHorizontal onClick={() => qu > 1 ? setQu(qu - 1) : setQu(1)} className="text-3xl rounded-full p-0.5 bg-gray-400" />
              <h1 className="r3">{qu}</h1>
              <FaPlus onClick={() => setQu(qu + 1)} className="text-3xl rounded-full p-1 main_bg" />
            </div>
            <h2 className="main_color font-bold text-sm whitespace-nowrap break-words flex justify-center items-center"><FaRupeeSign />{selectedSize ? price_* qu:"_" }</h2>
            <button
              disabled={button}
              onClick={()=> handle_add_to_card(i)}
              className={`r3 text-sm ${button ? "bg_2" : "main_bg"} px-5 rounded-3xl py-3`}
            >
              {button ? "Select size" : "Add to cart"}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default Detal;
