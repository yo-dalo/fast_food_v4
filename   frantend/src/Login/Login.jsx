import {
  useState
} from 'react';
import '../App.css';
import Button_1 from '../Components/Button_1';
import axios from 'axios';
import {
  Outlet,
  Link,useNavigate
  
} from "react-router-dom";

function Login() {
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
  const [loading,
    setLoading] = useState(false);

const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agree) {
      setLoading(true);
      try {
        const response = await axios.post('/login', {
          email,
          password,
          
        },{withCredentials: true});
        console.log(response.data);
        setEmail("");
        setPassword("");
        setData(response.data);
        setAgree(false);
        navigate("/")
        
        setErr("");
      } catch (error) {
        console.error(error);
        setErr(error.response?.data?.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    } else {
      alert('You must agree to the terms and conditions.');
    }
  };

  return (
    <div className="h-screen w-screen min-h-screen flex justify-center items-center an">
      <div className="w-full h-full px-10 sm:w-2/4 flex flex-col justify-center ">
        <Button_1 className="mb-5" />
        <div className="flex flex-col gap-1">
          <h3 className="r4 font-[20] text-2xl">Log in</h3>
          <h3 className="font-medium text-sm leading-tight">
            Sign in to your account to enjoy special perks with your order
          </h3>
        </div>
        <form id="rg_id" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 py-4">
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
            placeholder="Enter  Password"
            className="w-full text-sm h-full outline-0 border-1 rounded-[7px] px-4 py-3 bg-gray-100"
            required
            />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full items-center ">
          <div>
            <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="main_bg outline-[#32B68F]"
            />
          I agree to the <a className="main_color" href="#">terms</a> & <a className="main_color" href="#">conditions</a>
        </div>
        <div>
          <a href="#" className="main_color text-right">Forgot password?</a>
        </div>
      </div>
    </div>
    <div className="py-10 px-4">
      <button type="submit" className="r2 w-full font-extralight main_bg border-0 outline-0 rounded-3xl block text-center px-1.5 py-2" disabled={loading}>
        {loading ? 'Logging in...': 'Login'}
      </button>
    </div>
    {err && <div className="text-red-500 text-center">
      {err}
    </div>
    }
  </form>
  <div className="flex justify-center items-center gap-2 r2">
    <hr className="inline w-full"></hr>or<hr className="inline w-full"></hr>
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
<h4>New here? <Link to="/Registration" className="main_color">Create an account</Link></h4>
</div>
</div>
</div>
);
}

export default Login;