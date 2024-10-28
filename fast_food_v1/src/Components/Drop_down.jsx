
import { useState,useEffect,useContext } from 'react';
import { AuthContext } from '../AuthContext';
import {
  Link ,useNavigate
} from "react-router-dom";
const Drop_down = (data) => {
  const {chack,logOut} = useContext(AuthContext);

  const [on_, setOn_] = useState(null);
  const [log, setLog] = useState(null);

const navigate = useNavigate();
useEffect(()=>{
  setOn_(data.on)
  chack().then((e)=>{
    setLog(e)
  })
  
  setLog(data.on)
},[data])
  
  
  return (
    <div className={`${on_?"scale-1":'scale-0'} absolute top-16 left-1.5  ring-1 rounded-xl p-1 bg-white`}>
  
    <ui className="list-none r1 bg-amber-100 bg-amber-500">
 {!log && <Link to="/login"> <li className=" rounded-xl pl-4 pr-10 hover:bg-gray-400 py-0.5 w-full">LogIn </li></Link>}
  {log ?  <li onClick={async()=>{ await logOut();navigate("/login")} } className=" rounded-xl pl-4 pr-10 hover:bg-gray-400 py-0.5 w-full">LogOut</li>:""}
    </ui>
    </div>
  )
}

export default Drop_down