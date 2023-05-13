import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import {Link} from "react-router-dom"
import axios from "axios";
import { Context, server } from "../main";



const Header = () => {


// const data =useContext(Context)// console.log(data);
const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);
// console.log(isAuthenticated);
const logOutHandler = async () => {
  setLoading(true);

  try {
    await axios.get(  `${server}/users/logout`,{
        withCredentials: true,
      }
    );

    toast.success("Logged Out Successfully");
    setIsAuthenticated(false);
    setLoading(false);

  } catch (error) {
    toast.error(error.response.data.message);
    setIsAuthenticated(true);
    setLoading(false);

  }
};

  return (
    <nav className='header'>
        <div>
            <h2>Todo App.</h2>
        </div>
        <article>
            <Link to={"/"}>Home </Link>
            <Link to={"/profile"}>Profile </Link>
            {
              isAuthenticated? (
              <button disabled={loading} className='btn' onClick={logOutHandler}>LogOut</button>
              ):(
              <Link to={"/login"}>Login </Link>
              )

            }

            {/* <Link to={"/register"}>Register </Link> */}
            
        </article>
    </nav>
  )
}

export default Header
