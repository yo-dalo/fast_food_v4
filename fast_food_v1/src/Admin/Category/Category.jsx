import { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import Nav from "../Part/Nav";

function Category() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("bar");

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
      console.log(response.data)
      
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const deleteCategory = async (id) => {
    
    try {
      await axios.delete(`/api/categories/${id}`);
      fetchCategories(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await axios.patch(`/api/categories/${id}`, { status });
      fetchCategories(); // Refresh the list after status change
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-[100vw] flex flex-col max-h-screen h-[100vh] px-3 bg-blue-50 overflow-hidden">
      <Nav />
      <div className="breadcrumbs text-sm">
        <ul>
          <li><a>Home</a></li>
          <li><a>Category</a></li>
        </ul>
      </div>

      <h1 className="text-2xl r4 pb-3">Category</h1>
      <div className="flex w-full h-[40vh] flex-1 flex-col overflow-y-scroll overflow-x-scroll">
        <div className="-m-1.5 ">
          <div className="p-1.5 min-w-full inline-block align-middle ">
            <div className="border rounded-lg  divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
              <div className="py-3 px-4 bg-amber-100 flex gap-3.5">
                <Link to="/Admin/Category/AddCategory/" className="px-4 bg-green-500 rounded-md flex items-center">
                  Add
                </Link>
                <div className="relative">
                  <label className="sr-only">Search</label>
                  <input 
                    type="text" 
                    name="hs-table-with-pagination-search" 
                    id="hs-table-with-pagination-search" 
                    className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
                    placeholder="Search for items"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <svg className="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden ">
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
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Image</th>
                      <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {categories.map((category,i) => (
                     
                       <tr key={i} >
                <td className="py-3 ps-4">
                  <div className="flex items-center h-5">
                    <input id="hs-table-pagination-checkbox-1" type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
                    <label for="hs-table-pagination-checkbox-1" className="sr-only">Checkbox</label>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 ">{category.Id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{category.Name}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                  <button type="button" className={`inline-flex items-center gap-x-2 text-sm font-semibold ${category.Status?"text-green-600": "text-blue-600"} `} onClick={()=>changeStatus(category.Id,category.Status?0:1)}>{category.Status?"Active":"Inactive"}</button>
                </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                   <img className="sm:w-[5vw]" src={`/uploads/${category.Img}`}/>
                 </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
  <button className="border-0 outline-0 text-red-600 px-1" onClick={() => deleteCategory(category.Id)}>Delete</button>
  <Link to={`/Admin/Category/EditCategory/${category.Id}`} className="border-0 outline-0 text-yellow-600 px-1">Edit</Link>
</td>

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

export default Category;
