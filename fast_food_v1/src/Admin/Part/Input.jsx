
import { useState } from 'react';
const Input = () => {
const [value, setValue] = useState("");
  return (
    <>
     <div>
            <label htmlFor={`product-price-$`} className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">
              Product price
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              id={`product-price-`}
              className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            />
          </div>
    </>
  )
}

export default Input