import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated ,loading,setLoading} =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;







































// import React,{useState} from 'react';
// import  { useContext } from 'react';
// import {Link , Navigate} from "react-router-dom";
// import axios from "axios";
// import { toast } from 'react-hot-toast';
// import Register from './Register.jsx';
// import { server } from '../main.jsx';
// import { Context } from '../main';


// const Login = () => {

//   const [email,setEmail]=useState("");
//   const [password,setPassword]=useState("");
//   const {isAuthenticated,setIsAuthenticated} = useContext(Context);

//   // if (isAuthenticated) return <Navigate to={"/"} />;

// const submitHandler =async(e)=>{
//   e.preventDefault();
// try {

//       const { data } = await axios.post(
//         `${server}/users/login`,
//         {
//           email,
//           password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       toast.success(data.message);
//       setIsAuthenticated(true);
//       setLoading(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setLoading(false);
//       setIsAuthenticated(false);
//     }
//   };

//   if (isAuthenticated) return <Navigate to={"/"} />;

//   return (
//     <div className='login'>
//       <section>
//       <form onSubmit={submitHandler}>
//         <input type="email" value={email} name='email'
//           onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
//         <input type="password"  value={password} name='password'
//         onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>

//         <button type='submit'>Login</button>
        
//         <h4>Or</h4>
//         <Link to="/register" element={<Register/>}>Register</Link>

//         </form>    
//       </section> 
//     </div>
//   )
// }

// export default Login
