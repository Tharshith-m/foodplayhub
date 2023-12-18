import React from 'react'
import  { createContext, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Main from './Main';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { store } from '../App';
import { purchasestore } from '../App';

export default function Login() { 
  const {register,handleSubmit,watch,formState:{errors}}=useForm() 
  const [token,setToken]=useContext(store)
  const [info,setInfo]=useContext(purchasestore)
  
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      console.log("data sent:",data.email)
      setInfo(data.email)
      const response = await fetch('http://localhost:5000/login', {
      
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      // const response = await axios.post('http://localhost:5000/login', data, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      });
  
      if (response.ok) {
        // Data sent successfully
        const result = await response.json();
        console.log(result+"@@@@@@@@@@@@@@@@@");
        setToken(result.token);
        navigate('/myprofile');


      } else {
        // Handle errors if the request was not successful
        window.alert('check the credentials entered');
        console.error('Failed to send data to the backend');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    // <UserContext.Provider value={userData}>-----------------------------
    <section>
    <div>
         
        <div className="register">
            <div className="colly1">
                <h2>Log In</h2>
                <span>Login to witness the food world</span>

                <form id='form' className='flexy flexy-col' onSubmit={handleSubmit(onSubmit)}   >

                         {/* form inputs */}
                        {/* <input type="text" {...register("name",{required:true , pattern: /^[A-Za-z]+$/i })}     placeholder='username'/> */}
                        <input  type='email'{...register("email",{required:true})} placeholder='email'/>
               
                        <input type="password" {...register("password",{required:true})} placeholder='password'/>
                        
                        {errors.email?.type === "required" && (
                          <p role="alert">email is required</p>
                        )}
                        {errors.password?.type === "required" && (
                          <p role="alert">password is required</p>
                        )}

                        {/* Validation complete */}
                        {/* links to sign up  */}
                        <Link to="/signup">Don't have an account? Sign up here</Link>
                        {/* <a href="/signup" style="background-color: blue; padding: 10px; color: white; text-decoration: none; display: inline-block;">Don't have an account? Sign up here</a> */}
                        

                    <button className='btny'>Log In</button>
                </form>

            </div>
            <div className="colly2">
                <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8yM190aGVfcGljdHVyZV9vZl9jaGlja2VuX2JyaXlhbmlfbm9fbG9nb3NfdG9wX19hNWY4YThhZi1hZGE2LTQ1YjktYTdkZC0zYzk3OTVhNGVmZjgtMDAxLWQuanBn.jpg" alt="" />
            </div>
        </div>
        </div>
    </section>
    // </UserContext.Provider>------------------------------------------------------------
  )
}
// export const useUserContext = () => useContext(UserContext);-----------------