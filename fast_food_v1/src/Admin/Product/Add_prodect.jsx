import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import T from "../../Test/T"
import Editor from "../../Components/Editor"
import Add_size from "../Part/Add_size"

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [file, setFile] = useState([]);
  const [size_arr, setSize_arr] = useState(null);
  const [productName, setProductName] = useState(''); // State for product name
  const [deliveryPrice, setDeliveryPrice] = useState(''); // State for delivery price
  const [productDetails, setProductDetails] = useState(''); // State for product details
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getdata = (data) => {
    //console.log(data)
    setSize_arr(data)
  }

  const handleFileChange = (e) => {
   // setFile(e.target.files[0]);
    const files = Array.from(event.target.files);
        setFile((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    /*
       "name": "Product Name",
    "rs": "100",
    "details": "Product details here",
    "rating": "4.5",
    "time": "2",
    "status": 1,
    "category_id": 1,
    "user_id": 1,
    */
    
    formData.append('name', productName);
   formData.append('rs', deliveryPrice); // Add selected category
   formData.append('details', productDetails); // Add product details (from Editor component)
   formData.append('rating', "4.5"); // Add delivery price
   formData.append('time', "2"); // Add product details (from Editor component)
   formData.append('status',1 ); // Add product details (from Editor component)
   formData.append('category_id', selectedCategory); // Add product details (from Editor component)
   formData.append('user_id', 1); // Add product details (from Editor component)
   
   formData.append('size_arr', JSON.stringify(size_arr)); // Add product details (from Editor component)
   //console.log()
   
   // formData.append('size_arr',JSON.stringify(size_arr) ); // Add product details (from Editor component)
    if (file) {
      file.forEach((image) => {
            formData.append('file', image);
        });
      
    }
    
    

   

    try {
      const response = await axios.post('http://localhost:3000/api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Product added successfully!');
      console.log('Product added:', response.data);
      setTimeout(() => {
        navigate('/Admin/Product'); // Redirect to /Products after success
      }, 100); // Add a delay before redirecting
    } catch (error) {
      setError('Error adding Product.');
      console.error('Error adding Product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
            Create New Product
          </h1>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Tell us your story and we’ll be in touch.
          </p>
        </div>

        <div className="mt-12">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 lg:gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label htmlFor="category" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                    Category
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  >
                    <option key={0} value="">Select category</option>
                    {categories.map((c, i) => (
                      <option key={i} value={c.Id}>{c.Name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="product-name" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="product-name"
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
              </div>

              <Add_size getdata={getdata} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label htmlFor="delivery-price" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                    Delivery Price
                  </label>
                  <input
                    type="text"
                    id="delivery-price"
                    value={deliveryPrice}
                    onChange={(e) => setDeliveryPrice(e.target.value)}
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
                <div>
                  <label htmlFor="product-image" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                    Product Image
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                     
                    id="product-image"
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="product-details" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                  Details
                </label>
                
                <textarea  onChange={(value) => setProductDetails(value.target.value)} className="py-3 h-[60vw] px-4 block w-[90vw] overflow-scroll border-2 border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                name="" id="" cols="30" rows="10">
                {productDetails}
                </textarea>

              </div>
            </div>

            <div className="mt-3 flex">
              <div className="flex">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="shrink-0 mt-1.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                />
              </div>
              <div className="ms-3">
                <label htmlFor="remember-me" className="text-sm text-gray-600 dark:text-neutral-400">
                  By submitting this form I have read and acknowledged the <a className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" href="#">Privacy policy</a>
                </label>
              </div>
            </div>
            <div className="mt-6 grid">
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Send inquiry
              </button>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                We'll get back to you in 1-2 business days.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
