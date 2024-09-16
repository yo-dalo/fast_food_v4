import Button_1 from '../Components/Button_1';
import Footer from '../Components/Footer';
import { useParams ,Link} from "react-router-dom";

import {
  CiHeart
} from "react-icons/ci";
import {
  IoLogInOutline
} from "react-icons/io5";
import {
  FaCaretRight
} from "react-icons/fa6";
function Account() {
  return (
    <div className="w-screen h-screen px-5 pt-10 flex  flex-col an ">
      <div className='flex w-full justify-between items-center'>
        <Button_1 />
        <h1 className="r3 text-xl">MY Account</h1>
        <div></div>
    </div>

      <div className="flex flex-1 flex-col items-center gap-4">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-[20vw] h-[20vw]">
            <img className="w-full rounded-[600px] h-full object-cover" src="../Img/PictureUnlock_glc_258792_user0.pictureunlock.jpg" />
      </div>
        <h1 className="r3 text-center">Sara Swift</h1>
        <h3 className="r2 text-center">kumaradarsh@gmai.com</h3>
    </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full rounded-md bg-gray-100 h-10 flex justify-between items-center border border-gray-400 px-3">
          <span className=" items-center flex r3  gap-3"><CiHeart /> <h6 className="text-[0.6rem]">your profile</h6></span>
          <FaCaretRight />
      </div>
      <Link to={`../Address/`}>
        <div className="w-full rounded-md bg-gray-100 h-10 flex justify-between items-center border border-gray-400 px-3">
          <span className=" items-center flex r3  gap-3"><CiHeart /> <h6 className="text-[0.6rem]">Manage Address</h6></span>
          <FaCaretRight />
      </div>
      </Link>
        <div className="w-full rounded-md bg-gray-100 h-10 flex justify-between items-center border border-gray-400 px-3">
          <span className=" items-center flex r3  gap-3"><CiHeart /> <h6 className="text-[0.6rem]">Setting</h6></span>
          <FaCaretRight />
      </div>
        <div className="w-full rounded-md bg-gray-100 h-10 flex justify-between items-center border border-gray-400 px-3">
          <span className=" items-center flex r3  gap-3"><CiHeart /> <h6 className="text-[0.6rem] ">Help Center</h6></span>
          <FaCaretRight />
      </div>
        <div className="w-full rounded-md bg-gray-100 h-10 flex justify-between items-center border border-gray-400 px-3">
          <span className=" items-center flex r3  gap-3"><CiHeart /> <h6 className="text-[0.6rem]">your profile</h6></span>
          <FaCaretRight />
      </div>
        <div className="w-full rounded-md bg-gray-100 h-10 flex justify-between items-center border border-gray-400 px-3">
          <span className=" items-center flex r3  gap-3"><CiHeart /> <h6 className="text-[0.6rem]">your profile</h6></span>
          <FaCaretRight />
      </div>
        <div className="w-full rounded-md bg-gray-100 h-10 flex justify-between items-center border border-gray-400 px-3">
          <span className=" items-center flex r3  gap-3"><IoLogInOutline /> <h6 className="text-[0.6rem]">Log Out</h6></span>
          <FaCaretRight />
      </div>
    </div>
    </div>


    <Footer on="4" />
  </div>


)
}

export default Account