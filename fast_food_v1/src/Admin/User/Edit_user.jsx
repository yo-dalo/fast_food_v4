import { useState, useEffect } from 'react';
import Nav from "../Part/Nav";
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom'; // Import the useNavigate hook

function Edit_user() {
  const {id} = useParams();
  const [data, setData] = useState([]);
  const [size_id, setSize_id] = useState(id);
  const [size, setSize] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchUser = () => {
    setLoading(true);
    axios.get('http://localhost:3000/api/user/'+size_id)
      .then(response => {
        setData(response.data);
        setSize(response.data[0].Name)
        setPhone(response.data[0].Phone)
        setEmail(response.data[0].Email)
        setUsername(response.data[0].Username)
        setAddress(response.data[0].Address)
        
        setLoading(false);
        console.log(response.data)
      })
      .catch(error => {
        setError("Error fetching data");
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
   fetchUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(size=="") {
      setError("Enter size name")
      setSuccess(null)
      
    } else{
    setLoading(true);
    axios.put('http://localhost:3000/api/user/'+size_id, { name:size ,phone:phone,email:email,username:username,address:address})
      .then(response => {
        setSuccess("Category added successfully");
        setError(null);
        navigate("/Admin/User/")
        setLoading(false);
      })
      .catch(error => {
        setError("Error adding category");
        setSuccess(null);
        setLoading(false);
        console.log(error);
      });
    }
  };

 // if (loading) return <div>Loading...</div>;
 // if (error) return <div>There was an error fetching the data!</div>;

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
            Edit User id <span className="text-blue-700">{size_id}</span>
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
                  <label htmlFor="categoryName" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                    User Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Category Name"
                    name="categoryName"
                    id="categoryName"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
                
                 <div>
                  <label htmlFor="categoryName" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                     User Phone
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your user phone"
                    name="categoryName"
                    id="categoryName"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
                
                
                  <div>
                  <label htmlFor="categoryName" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                     User Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your user Address"
                    name="categoryName"
                    id="categoryName"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
                
                
                 <div>
                  <label htmlFor="categoryName" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                    User Email
                  </label>
                  <input
                    type="email"
                    
                    placeholder="Enter your user email"
                    name="categoryName"
                    id="categoryName"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
                
                 <div>
                  <label htmlFor="categoryName" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                    User username
                  </label>
                  <input
                    type="text"
                    
                    placeholder="Enter your user email"
                    name="categoryName"
                    id="categoryName"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
                
                
                
                
              </div>

              {error && <div className="mt-4 text-red-500">{error}</div>}
              {success && <div className="mt-4 text-green-500">{success}</div>}

              <div className="mt-6 grid">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add'}
                </button>
              </div>
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

export default Edit_user;