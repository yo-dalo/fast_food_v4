import React, {
  useState
} from 'react';
import axios from 'axios';
import {
  Outlet,
  Link
} from "react-router-dom";
import Button_1 from '../Components/Button_1';

import {
  HiArrowLeft
} from 'react-icons/hi';

function Otp() {
  const [name,
    setName] = useState('');
  const [phone,
    setPhone] = useState('');
  const [email,
    setEmail] = useState('');
  const [password,
    setPassword] = useState('');
  const [agree,
    setAgree] = useState(false);
  const [data,
    setData] = useState("");
  const [err,
    setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agree) {
      try {
        const response = await axios.post(`http://localhost:3000/register`, {
          name,
          phone,
          email,
          password
        });
        console.log(response.data);
        setName("")
        setEmail("")
        setPhone("")
        setPassword("")
        setData("")
        setData(response.data)
        setAgree(false)
      } catch (error) {
        console.error(error);
        setErr(error)
      }
    } else {
      alert('You must agree to the terms and conditions.');
    }
  };

  return (
    <div className="h-screen w-screen min-h-screen flex justify-center items-center an">
      <div className="w-full h-full px-10 sm:w-2/4 flex flex-col justify-center">
        <Button_1 className="mb-5" />
        <div className="flex flex-col gap-1">
          <h3 className="r4 font-[20] text-2xl">Emai varification</h3>
          <h3 className="r2 font-medium text-sm leading-tight">
            Create an account to unlock exclusive benefits with your order
          </h3>
          {data?<h3 className="text-xs text-green-600">{data}</h3>: ''}
          {err?<h3 className="text-xs text-red-600">Error</h3>: ''}
        </div>
        <form id="rg_id" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 py-4">
            <div className="w-full h-full">
              <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Email OTP"
              className="w-full text-sm h-full outline-0 border-1 rounded-[7px] px-4 py-3 bg-gray-100"
              required
              />
          </div>
        </div>
        <div className="py-2 px-4">
          <button type="submit" className="r2 w-full font-extralight main_bg border-0 outline-0 rounded-3xl block text-center px-1.5 py-2">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default Otp;