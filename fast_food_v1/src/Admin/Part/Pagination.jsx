import { useState ,useEffect,useContext } from 'react'
import {
  Outlet,Link,useNavigate
} from "react-router-dom";
import axios from 'axios';
function Pagination({send_data}) {
const [data, setData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(2);
const [totalItems, setTotalItems] = useState(null);
const [i, setI] = useState([1,2,3]);


const fatch_poster_v1 = (page=1,limit=10)=>{
  
  axios.get(`/api/v3/admin/poster/?page=${page}&limit=${limit}`,{withCredentials: true})
      .then(response => {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
      });
  
}

useEffect(()=>{
 fatch_poster_v1(currentPage,2)
  //send_data(data)
  console.log("mydata",data);
  
},[])
useEffect(()=>{
 fatch_poster_v1(currentPage,10,)
//  send_data(data)
//console.log(data);
},[currentPage])



  return (
 <>
               <div className="py-1 px-4 overflow-scroll">
                <nav className="flex overflow-scroll items-center space-x-1" aria-label="Pagination">
                  <button type="button" className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button key={index}  type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700" aria-current="page">{index+1}</button>
                
                ))}

                  <button type="button" className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-label="Next">
                    <span className="sr-only">Next</span>
                    <span aria-hidden="true">»</span>
                  </button>
                </nav>
              </div>
</>
)
}

export default Pagination