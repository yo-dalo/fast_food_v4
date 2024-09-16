import React, { useState } from 'react';
import axios from 'axios';
import { HiArrowLeft } from 'react-icons/hi';

function Registration() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (agree) {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:3000/register', {
          name,
          phone,
          email,
          password
        },{withCredentials: true});
        console.log(response.data);
        // Handle success (e.g., show success message, redirect, etc.)
      } catch (error) {
        console.error(error);
        setError('Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('You must agree to the terms and conditions.');
    }
  };

  return (
    <div className="h-screen w-screen min-h-screen flex justify-center items-center an">
      <div className="w-full h-full px-10 sm:w-2/4 flex flex-col justify-center">
        <div className="w-[10vw] h-[10vw] sm:w-[6vw] sm:h-[6vw] bg_2 p-1.5 sm:p-4 rounded-[100px] mb-5">
          <HiArrowLeft className="w-full h-full" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="r4 font-[20] text-2xl">Sign Up</h3>
          <h3 className="r2 font-medium text-sm leading-tight">
            Create an account to unlock exclusive benefits with your order
          </h3>
        </div>
        <form id="rg_id" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 py-4">
            <div className="w-full h-full">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full text-sm h-full outline-0 border-1 rounded-[7px] px-4 py-3 bg-gray-100"
                required
              />
            </div>
            <div className="w-full h-full">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your Phone Number"
                className="w-full text-sm h-full outline-0 border-1 rounded-[7px] px-4 py-3 bg-gray-100"
                required
              />
            </div>
            <div className="w-full h-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="w-full text-sm h-full outline-0 border-1 rounded-[7px] px-4 py-3 bg-gray-100"
                required
              />
            </div>
            <div className="w-full h-full">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create Password"
                className="w-full text-sm h-full outline-0 border-1 rounded-[7px] px-4 py-3 bg-gray-100"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-1.5">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="main_bg outline-[#32B68F]"
              />
              I agree to the <a className="main_color" href="#">terms</a> & <a className="main_color" href="#">conditions</a>
            </div>
          </div>
          <div className="py-10 px-4">
            <button
              type="submit"
              className="r2 w-full font-extralight main_bg border-0 outline-0 rounded-3xl block text-center px-1.5 py-2"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
        {error && <div className="text-red-500 text-center py-2">{error}</div>}
        <div className="flex justify-center items-center gap-2 r2">
          <hr className="inline w-full" />or<hr className="inline w-full" />
        </div>
        <div className="flex justify-center items-center gap-3 py-5">
          <div className="w-9 h-9">
            <img className="w-full h-full object-fill" src="./Img/Logo/pngwing.com.png" alt="Logo 1" />
          </div>
          <div className="w-10 h-10">
            <img className="w-full h-full object-fill" src="./Img/Logo/pngwing.com (1).png" alt="Logo 2" />
          </div>
        </div>
        <div className="text-center r2 text-sm">
          <h4>Already Have An Account? <span className="main_color ">Sign In</span></h4>
        </div>
      </div>
    </div>
  );
}

export default Registration;
