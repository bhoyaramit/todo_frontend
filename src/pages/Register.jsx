import React, { useState} from 'react';
import  { useContext } from 'react';
import { Context } from '../main';

import {Link, Navigate} from "react-router-dom";
import Login from './Login.jsx';
import axios from "axios";
import { server } from '../main.jsx';
import { toast } from 'react-hot-toast';


const Register = () => {


const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const {isAuthenticated,setIsAuthenticated ,loading,setLoading} = useContext(Context);


const submitHandler =async(e)=>{
e.preventDefault();
setLoading(true);

try {
  //console.log(name,email,password);
const {data} = await axios.post(`${server}/users/new`,{
  name,email,password
},{
  headers:{
    "Content-Type":"application/json",
  },
  withCredentials:true,
}
);

toast.success(data.message);
setIsAuthenticated(true);
setLoading(false)
}
 catch (error) {
  toast.error(error.response.data.message);
  setIsAuthenticated(false);
  setLoading(false)

  
  
}
}



if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className='login'>
    <section>
      <form onSubmit={submitHandler}>
      <input type="text" value={name} name='name'
      onChange={(e) => setName(e.target.value)} placeholder='Name' />

      <input type="email" value={email} name='email'
      onChange={(e) => setEmail(e.target.value)} placeholder='Email' />

      <input type="password"  value={password} name='password'
      onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>

      <button type='submit' disabled={loading}>Register</button>
      <h4>Or</h4>
        <Link to="/login" element={<Login/>}>Login</Link>

      </form>    
    </section> 
  </div>
  )
}

export default Register;
