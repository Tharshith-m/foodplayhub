import React from 'react'
// import bgImg from '../assets/img1.jpg';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import  { useState } from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


export default function Register() { 
  const {register,handleSubmit,watch,formState:{errors}}=useForm() 
  const [image,setImg]=useState(null);
  const [signupStatus, setSignupStatus] = useState(null);
  const navigate = useNavigate();

  // upload photo 
  const UploadFile = async (type) =>{
    const data=new FormData
    // data.append("file",type==='image' );
    if (type === 'image') {
      data.append("file", image);
      console.log(image+"jjjjjj");
    }

    data.append("upload_preset",type=="image" ? "images_preset":"video_preset");

    try{
      let cloudName="df8alcjaw"
      let resourceType=type==='image' ? 'image':'video';
      let api=`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res=await axios.post(api,data);
      const {secure_url}=res.data;
      console.log(secure_url);
      return secure_url;

    }catch(error){
      console.error(error)
    }
  }
// const onSubmit =data =>console.log(data) 
  const onSubmit = async (data) => {
    try {  

      const photoUrl= await UploadFile('image'); 
      data.photo=photoUrl
      // data.video=videoUrl
      // console.log(data.photo+"----------------------------------")
      console.log("data sent:",data);

      const url='http://localhost:5000/signup';
      axios.post(url,data,{
        headers:{
          'Content-Type':'application/json',
        }
      })
      .then(response =>{
        console.log('Response:',response.data)
        setSignupStatus('success');
        navigate('/');

      })
      .catch(error =>{
        console.log('Error:',error);
        setSignupStatus('error');
      });

      

      
    }
    catch (error) {
        console.error('An error occurred:', error);
        setSignupStatus('error');
      }
  };
  
  // console.log(watch('username'));

   

    // console.log(watch('username'));
    
  return (
    <section>
    <div>
    {/* <Navbar/> */}
        <div className="register">
            <div className="colly1">
                <h2>Sign In</h2>
                <span>register and enjoy the service</span>

                <form id='form' className='flexy flexy-col' onSubmit={handleSubmit(onSubmit)}   >

                         {/* form inputs */}
                        <input type="text" {...register("name",{required:true , pattern: /^[A-Za-z]+$/i })}     placeholder='username'/>
                        <input  type='email'{...register("email",{required:true})} placeholder='email'/>
                        {/* <input type="text"{...register("photo")} placeholder='photo'/> */}
                        <input type="file"           onChange={(e)=>setImg((prev) => e.target.files[0])}  placeholder='photo'/>
                        <input type="text"{...register("place")} placeholder='place'/>
                        <input type="password" {...register("password",{required:true})}placeholder='password'/>
                        <input type="password"{...register("confirmpassword",{required:true})} placeholder='confirmpassword'/>
                        {/* <input type="number"{...register("mobile",{required:true,maxLength:10})} placeholder='mobilenumber'/> */}
        
                        {/* form inputs  */}


                        {/* validation */}
                        {/* {errors.mobile?.type === "required"  &&  "Mobilenumber is required"}
                        {errors.mobile?.type === "maxLength"  &&  "Mobile nuber has exceeded maxlength"} */}
                        {errors.name?.type === "required" && (
                          <p role="alert">Username is required</p>
                        )}
                        {errors.name?.type === "pattern" && (
                          <p role="alert">Check the username</p>
                        )}
                        
                        {errors.email?.type === "required" && (
                          <p role="alert">email is required</p>
                        )}
                        {errors.password?.type === "required" && (
                          <p role="alert">password is required</p>
                        )}

                        {/* signup page to login page route  */} 
                        {signupStatus === 'success' && (
                        <p role="alert">Successfully signed up! Go to login page </p>
            )}
                        {signupStatus === 'error' && (
                        <p role="alert">Signup failed! Please try again and go to login page </p>
            )}


                        {/* Validation complete */}
                    <button className='btny'>Sign In</button>
                </form>

            </div>
            <div className="colly2">
                <img src="https://images.unsplash.com/photo-1632203171982-cc0df6e9ceb4?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhbWJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
            </div>
        </div>
        </div>
    </section>
  )
}