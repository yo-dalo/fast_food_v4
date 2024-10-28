import { useState ,useEffect,useContext } from 'react'
import {
  Outlet,Link,useNavigate
} from "react-router-dom";

function Search({data,filter}) {
 const [searchTerm, setSearchTerm] = useState("");
 const [by, setBy] = useState(null);
 const [filter_data, setFilter_data] = useState([]);
 /*
const search = (data = [{hell:'66'}], by=null, search = null) => {  
/*
  if (Array.isArray(data)) {
    if (search==null||search==""||search==" ") {
      return data;
    } else {
      if (Number(search)) {
     return data.filter((item,i)=>{
         return  item[by]==search;
         
      
    })
      
      } else {
        
       return data.filter((item,i)=>{
         //console.log(item[by].toLowerCase().includes(search.toLowerCase()));
            return   String(item[by]).toLowerCase().includes(search.toLowerCase());
    })
        
      }

    }

  } else {
return 'err'
  }

}

//

useEffect(()=>{
setFilter_data(search(data,by,searchTerm))
  filter(filter_data)
  
},[searchTerm])

useEffect(()=>{
setFilter_data(search(data,by,searchTerm))
console.log(search(data,by,searchTerm))
  filter(filter_data)
  
},[])
*/


  return (
    <>
    <div className="relative max-w-xs">
            <label className="sr-only">Search</label>
                  <input 
                    type="text" 
                    name="hs-table-with-pagination-search" 
                    id="hs-table-with-pagination-search" 
                    className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
                    placeholder="Search for items" 
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value);}}

                  />
                   
   <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <svg className="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                  
                </div>
                
                {/*
                <select onChange={(e)=> setBy(e?.target?.value)} name="" id="">
                {Object.keys(data[0]||{}).map((item,i)=>(
                   <option key={i}  value={item}>{item}</option>
                ))}
                 </select>
                  */}
                  
</>
)
}

export default Search