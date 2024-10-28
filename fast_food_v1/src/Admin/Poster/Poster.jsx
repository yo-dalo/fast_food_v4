import { useState ,useEffect,useContext } from 'react'
import { AuthContext } from '../../AuthContext';
import Nav from "../Part/Nav";
import Search from "../Part/Search";
import Pagination from "../Part/Pagination";
import axios from 'axios';
import { Outlet, Link, useNavigate} from "react-router-dom";

function Poster() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const [filter_data, setFilter_data] = useState([]);
 const [filter_data_, setFilter_data_] = useState([]);

 const navigate =useNavigate()

  const {user ,chack_admin} = useContext(AuthContext);

  const setFilter= (data)=>{
    setFilter_data(data)
    
  }
  const setFilter_= (data)=>{
    setFilter_data_(data)
    
  }
  
  
  console.log(filter_data)
  
  useEffect(()=>{
   chack_admin().then(h=>{
      if(!h || !h.login ){
        console.log(h);
        navigate("/admin/admin_Login")
      }else{
        //console.log(h);
      }
      
      
    })
   
   
    
  },[])



const fatch_poster = ()=>{
  axios.get('/api/v2/admin/poster/',{withCredentials: true})
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
const fatch_poster_v1 = (page=1,limit=10)=>{
  
  axios.get(`/api/v3/admin/poster/?page=${page}&limit=${limit}`,{withCredentials: true})
      .then(response => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.log(error)
      });
  
}

const deleteCategory = async (id) => {
    try {
      await axios.delete(`/api/v1/admin/poster/${id}`);
      fatch_poster(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

const changeStatus = async (id, status) => {
    try {
      await axios.patch(`/api/v1/admin/poster/${id}`, { status });
      fatch_poster(); // Refresh the list after status change
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };



  
  useEffect(() => {
    //fatch_poster()
    fatch_poster_v1(1,10)
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>There was an error fetching the data!</div>;

  return (
    <div className="w-screen h-screen px-3 bg-blue-50 an">
      <Nav />
      <div className="breadcrumbs text-sm">
        <ul>
          <li><a>Home</a></li>
          <li><a>poster  </a></li>
          <li></li>
          {data[0]?.Id?.toString()}
        </ul>
      </div>
      <h1 className="text-2xl r4 pb-3 px-3">Poster</h1>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
              <div className="py-3 px-4 bg-amber-100 flex gap-3.5">
               <Link to="/Admin/Poster/Add_poster">add</Link>
                
                <Search  />
                 
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
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">id</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Status</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Img</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Date</th>
                      <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {data.map((poster, index) => (
                      <tr key={index}>
                        <td className="py-3 ps-4">
                          <div className="flex items-center h-5">
                            <input id={`hs-table-pagination-checkbox-${index}`} type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                            <label htmlFor={`hs-table-pagination-checkbox-${index}`} className="sr-only">Checkbox</label>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{poster.Id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{poster.Name}</td>
                     <td type="button" className={`px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 ${poster.Status?"text-green-600": "text-red-600"} `} onClick={()=>changeStatus(poster.Id,poster.Status?0:1)}>{poster.Status?"Active":"Inactive"}</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                   <img className="sm:w-[5vw]" src={`http://localhost:3000/uploads/${poster.Img}`}/>
                 </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{poster.Date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          <button onClick={() => deleteCategory(poster.Id)} className="border-0 outline-0 text-red-600 px-1">Delete</button>
                          <Link to={`/Admin/Poster/Edit_poster/${poster.Id}`} className="border-0 outline-0 text-yellow-600 px-1">Edit</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poster;
