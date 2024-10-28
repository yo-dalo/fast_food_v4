import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {
  Link,useNavigate
} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const navigate =useNavigate();
    const [user, setUser] = useState(null);
    const [check_login_loading,setCheck_login_loading]= useState(true)
    const [my_card_items, setMy_card_items] = useState(0);
    const [logIn_popUp, setLogIn_popUp] = useState(false);
    const [logIn, setLogIn] = useState(false);
    
    
    
    const logOut = async () => {
    try {
      const response = await axios.get('/api/f/logout/', {
        withCredentials: true
      });
      navigate('/')
    } catch (error) {}
  };
    
    
    
    
      const check_login_1 = async ()=>{ 
   fetch("http://127.0.0.1:3000/api/f/chack_login/")
     .then((data)=>{
      return data.json()
      setCheck_login_loading(false)
     }).then((data)=>{
       console.log(data)
       setUser(data);
     })
  
  
  
  
}
      const chack = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/f/chack_login/', { withCredentials: true });
                //setUser(response.data);
                return response.data;
                
               // alert("fetchUser run",user)
               // console.log("fetchUser run",user)
            } catch (error) {
                //setUser(null);
                return 0;
            }
        };
      const chack_admin = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/f/chack_admin_login/', { withCredentials: true });
                //setUser(response.data);
                return response.data;
                
               // alert("fetchUser run",user)
               // console.log("fetchUser run",user)
            } catch (error) {
                //setUser(null);
                return 0;
            }
        };
        
    useEffect(() => {
      setUser(user+1)
    


    },[]);

    


    return (
        <AuthContext.Provider value={{ 
        logOut,
        user
        ,setUser,
        chack,
        chack_admin ,
        my_card_items,
        setMy_card_items,
        logIn_popUp,
        setLogIn_popUp
        }}>
            {children}
        </AuthContext.Provider>
    );
};