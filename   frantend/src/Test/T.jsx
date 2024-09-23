import { useState, useEffect } from 'react';
import axios from 'axios';

function T(data_) {
  
  const [sizePricePairs, setSizePricePairs] = useState([{ size: '', price: '' }]);
  const [size, setSize] = useState([]);

data_.getdata(sizePricePairs)


  const fetchSize = async () => {
    try {
      const response = await axios.get('/api/Size');
      setSize(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching sizes:', error);
    }
  };

  useEffect(() => {
    fetchSize();
  }, []);

  const handleSizeChange = (index, value) => {
    const updatedPairs = [...sizePricePairs];
    updatedPairs[index].size = value;
    setSizePricePairs(updatedPairs);
    data_.getdata(updatedPairs);
  };

  const handlePriceChange = (index, value) => {
    const updatedPairs = [...sizePricePairs];
    updatedPairs[index].price = value;
    setSizePricePairs(updatedPairs);
    data_.getdata(updatedPairs);
  };

  const addSizePricePair = () => {
    setSizePricePairs([...sizePricePairs, { size: '', price: '' }]);
  };

  return (
    <>
      {sizePricePairs.map((pair, index) => (
        <div key={index} className="w-full flex gap-1.5">
          <div>
            <label htmlFor={`product-size-${index}`} className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
              Product size
            </label>
            <select
              id={`product-size-${index}`}
              value={pair.size}
              onChange={(e) => handleSizeChange(index, e.target.value)}
              className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            >
              <option value="">Select size</option>
              {size.map((s, i) => (
                <option key={i} value={s.Name}>{s.Name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`product-price-${index}`} className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
              Product price
            </label>
            <input
              type="number"
              value={pair.price}
              onChange={(e) => handlePriceChange(index, e.target.value)}
              id={`product-price-${index}`}
              className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addSizePricePair}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        Add More Size
      </button>
    </>
  );
}

export default T;