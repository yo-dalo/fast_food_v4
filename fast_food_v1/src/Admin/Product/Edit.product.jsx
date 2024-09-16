import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import T from "../../Test/T";
import Editor from "../../Components/Editor";
import Add_size from "../Part/Add_size";

function EditProduct() {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState(''); 
  const [deliveryPrice, setDeliveryPrice] = useState(''); 
  const [productDetails, setProductDetails] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 
  
  







  const navigate = useNavigate();
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product/2`);
        const product = response.data;
        setProductName(product.Name);
        setSelectedCategory(product.category);
        setDeliveryPrice(product.Rs);
        setProductDetails(product.Details);
        alert(response.data.Name);
        // Assuming the product image is returned and handled as needed
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product data.');
      }
    };
    
  useEffect(() => {


    fetchCategories();
    fetchProduct();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('category', selectedCategory);
    formData.append('deliveryPrice', deliveryPrice);
    formData.append('details', productDetails);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Product updated successfully!');
      console.log('Product updated:', response.data);
      setTimeout(() => {
        navigate('/Admin/Products'); // Redirect to /Products after success
      }, 100);
    } catch (error) {
      setError('Error updating product.');
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
            Edit Product
          </h1>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Update your product details below.
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
                      <option key={i} value={c.Name}>{c.Name}</option>
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

              <Add_size getdata={(data) => console.log(data)} />

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
                    id="product-image"
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="product-details" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                  Details
                </label>
                <Editor
                  value={productDetails}
                  onChange={(value) => setProductDetails(value)}
                  className="py-3 h-[60vw] px-4 block w-[90vw] overflow-scroll border-2 border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
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
                Update Product
              </button>
            </div>
            <div className="mt-3 text-center">
              {loading && <p className="text-sm text-gray-500 dark:text-neutral-500">Updating product...</p>}
              {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
              {success && <p className="text-sm text-green-500 dark:text-green-400">{success}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
