import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function Add_poster() {
  const [categoryName, setCategoryName] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!categoryName || !file) {
      setError('Please provide both category name and an image file.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("url", url);
    formData.append('file', file);

    try {
      const response = await axios.post('/api/poster', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Category added successfully!');
      console.log('Category added:', response.data);
      setTimeout(() => {
        navigate('/Admin/Poster'); // Redirect to /Category after success
      }, 100); // Add a 1-second delay before redirecting
    } catch (error) {
      setError('Error adding category.');
      console.error('Error adding category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
            Create New Category
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
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Category Name"
                    name="categoryName"
                    id="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
                <div>
                  <label htmlFor="categoryName" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your url Name"
                    name="categoryName"
                    id="categoryName"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>

                <div>
                  <label htmlFor="file" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
                    Upload File
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="file"
                    id="file"
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
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

export default Add_poster;
