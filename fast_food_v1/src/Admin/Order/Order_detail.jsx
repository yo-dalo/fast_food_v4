import {
  useState,
  useEffect,
  useContext
} from 'react'
import {
  AuthContext
} from '../../AuthContext';
import Nav from "../Part/Nav";
import Details_box from "../Part/Details_box";
import axios from 'axios';
import {
  useNavigate,
  useParams,Link
} from "react-router-dom";
function Order_detail() {
  const {
    id
  } = useParams();
  const navigate =useNavigate()
  
  const [data, setData] = useState([]);
  const [delete_otp, setDelete_otp] = useState(null);
  const [cancle_otp, setCancle_otp] = useState("");
  const [place_otp,setPlace_otp ] = useState("");
  const [x1,
    setX1] = useState(["cancle", "panding", 'complete']);
  const [loading,
    setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [err,setErr] = useState(null);
  const [open_box,
    setOpen_box] = useState(false);
  const getOrder = (id)=> {
    axios.get('/api/order_detal/'+id, {
      withCredentials: true
    })
    .then(response => {
      setData(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
      console.log(error)
    });
  }

const update_stutes = (order_id, stutes,otp)=> {
    axios.patch("/api/v1/update/Order/Status", {
      order_id, stutes,otp
    }, {
      withCredentials: true
    })
    .then(response => {
      getOrder(id);

    })
    .catch(error => {
    
      //console.log(error)
      setErr(error?.response?.data?.msg)
      setTimeout(()=>{
  setErr(null)
           },1*1000)
    });


  }
  
  
  
const deleteOrder = async (id,otp)=> {

    try {
      const res = await axios.patch(`/api/v2/admin/delete/Order/${id}`,{otp:otp})
      navigate("/Admin/Order/")
    }catch(err) {
      
      setErr(err?.response?.data?.msg)
      setTimeout(()=>{
  setErr(null)
           },1*1000)

    }

  }





  useEffect(() => {
    getOrder(id);
  }, []);

  if (loading) return <div>
Loading...
  </div>;
  if (error) return <div>
There was an error fetching the data!
  </div>;

  return (
    <div className="w-screen h-screen px-3 bg-blue-50 an ">
      <Nav />
      <div className="breadcrumbs text-sm">
        <ul>
          <li><a>Home</a></li>
          <li><a>User</a></li>
          <li></li>
          {data[0]?.Id?.toString()}
    </ul>
    </div>
      <h1 className="text-2xl r4 pb-3 px-3">Order detal</h1>
      <div className="flex flex-col">
      
 <table className="bg-amber-50 border-2  my-2 border-collapse  border-spacing-52">
  

<tr>
    <td className="border-[0.5px] border-gray-500  px-1.5 py-1">Order_id</td>
    <td className="border-[0.5px] border-gray-500  px-1.5 py-1">{data[0].Order_id}</td>
  </tr>
<tr>
    <td className="border-[0.5px] border-gray-500 px-1.5 py-1">User_id</td>
    <td className="border-[0.5px] border-gray-500  px-1.5 py-1">{data[0].User_id}</td>
  </tr>


<tr>
    <td className="border-[0.5px] border-gray-500 px-1.5 py-1">order_status</td>
    <td className={`border-[0.5px] ${data[0].order_status==0?"text-red-400":"text-pink-500"} border-gray-500 px-1.5 py-1`}>{x1[data[0].order_status]}</td>
  </tr>
  <tr>
    <td className="border-[0.5px] border-gray-500 px-1.5 py-1">Address</td>
    <td className="border-[0.5px] border-gray-500  px-1.5 py-1">{data[0].Address}</td>
  </tr>

 <tr>
    <td className="border-[0.5px] border-gray-500 px-1.5 py-1">Order Time</td>
    <td className="border-[0.5px] border-gray-500  px-1.5 py-1">{data[0].Time}</td>
  </tr>
  
  <tr>
      <td className="border-[0.5px]   shadow-blue-500 px-1.5 py-1"><input className="w-[25vw] px-1.5 outline-0 border-[0.5px] border-black" type="Number" value={delete_otp} onChange={(e)=> setDelete_otp(e.target.value) } maxlength="4" placeholder="Enter User Otp"  /></td>
      <td  className="border-[0.5px] text-red-500 border-red-500 shadow-blue-500 px-1.5  py-1"><button onClick={()=>{deleteOrder(data[0].Order_id,delete_otp);setDelete_otp("")}} className="bg-pink-100 block w-full h-full shadow-blue-800  drop-shadow-xl ">Delect order</button> </td>

  </tr>

  <tr className="scale-1 clear-none"   style={{display:data[0].order_status==2?"none":""}}>
      <td className="border-[0.5px]   shadow-blue-500 px-1.5 py-1"><input value={place_otp} onChange={(e)=> setPlace_otp(e.target.value) }  className="w-[25vw] px-1.5 outline-0 border-[0.5px] border-black" type="Number" maxlength="4" placeholder="Enter User Otp"  /></td>
      <td  className="border-[0.5px] text-green-500 border-green-500 shadow-blue-500 px-1.5  py-1"><button onClick={()=>{update_stutes(data[0].Order_id,2,place_otp);setPlace_otp("")} } className="bg-green-100 block w-full h-full shadow-blue-800  drop-shadow-xl ">Place Order</button> </td>

  </tr>


<tr style={{display:data[0].order_status==0?"none":""}}>
      <td className="border-[0.5px]   shadow-blue-500 px-1.5 py-1"><input value={cancle_otp} onChange={(e)=> setCancle_otp(e.target.value) }   className="w-[25vw] px-1.5 outline-0 border-[0.5px] border-black" type="Number" maxlength="4" placeholder="Enter User Otp"  /></td>
      <td  className="border-[0.5px] text-blue-500 border-red-500 shadow-blue-500 px-1.5  py-1"><button onClick={()=>{update_stutes(data[0].Order_id,0,cancle_otp);setCancle_otp("")}} className="bg-blue-100 block w-full h-full shadow-blue-800  drop-shadow-xl ">Cancle Order</button> </td>

  </tr>


<tr>
     {err?<td rowspan="2" colspan="3"  className="border-[0.5px] text-red-500 border-red-500 shadow-blue-500 px-1.5  py-1"><button className="bg-red-100 block w-full h-full shadow-blue-800  drop-shadow-xl ">{err}</button> </td>:""}

  </tr>




</table>
      
      
      
      
      
      
      
      
        <div className="-m-1.5 overflow-x-auto">
        
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
              <div className="py-3 px-4 bg-amber-100 flex gap-3.5">
                <div className="relative max-w-xs">
                  <label className="sr-only">Search</label>
                  <input type="text" name="hs-table-with-pagination-search" id="hs-table-with-pagination-search" className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search for items" />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <svg className="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
      </div>
      </div>
      </div>
              <div className="overflow-hidden">
                <table className="min-w-full overflow-x-scroll divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead className="bg-gray-50 dark:bg-neutral-700">
                    <tr>
                      <th scope="col" className="py-3 px-4 pe-0">
                        <div className="flex items-center h-5">
                          <input id="hs-table-pagination-checkbox-all" type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                          <label htmlFor="hs-table-pagination-checkbox-all" className="sr-only">Checkbox</label>
                      </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">#</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Product_id</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Qty</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">product_name</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">product_status</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Rs</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Size</th>
                    </tr>
        </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {data.map((user, index) => (
            <tr key={index}>
                        <td className="py-3 ps-4">
                          <div className="flex items-center h-5">
                            <input id={`hs-table-pagination-checkbox-${index}`} type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                            <label htmlFor={`hs-table-pagination-checkbox-${index}`} className="sr-only">Checkbox</label>
                        </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{index + 1}</td>
                        <Link to={`/Detail/${user.Product_id}`}><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user.Product_id}</td></Link>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-800 dark:text-neutral-200">{user.Qty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user.product_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user.product_status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user.Rs}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user.Size}</td>
                       
                      </tr>
          ))}
      </tbody>
      </table>
      </div>
              <div className="py-1 px-4">
                <nav className="flex items-center space-x-1" aria-label="Pagination">
                  <button type="button" className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </button>
                  <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700" aria-current="page">1</button>
                  <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700">2</button>
                  <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700">3</button>
                  <button type="button" className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-label="Next">
                    <span className="sr-only">Next</span>
                    <span aria-hidden="true">»</span>
                  </button>
        </nav>
      </div>
    </div>
    </div>
  </div>
</div>
</div>
);
}

export default Order_detail;