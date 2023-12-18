import React from 'react'
// import bgImg from '../assets/img1.jpg';
import { useForm } from 'react-hook-form';
import  { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() { 
  const {register,handleSubmit,watch,formState:{errors}}=useForm()
  // const onSubmit =data =>console.log(data) 
  const [video,setVideo]=useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const UploadFile = async (type) =>{
    const data=new FormData
    // data.append("file",type==='video' );
    if (type === 'video') {
      data.append("file", video);
      console.log(video+"jjjjjj");
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

  const onSubmit = async (data) => {
    try {
      // data.url="www.google.com";
      const videoUrl= await UploadFile('video'); 
      data.video=videoUrl
      // data.video=videoUrl
      console.log("data sent:",data);
      const url = 'http://localhost:5000/upload';
      axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
      })
        .then(response => {
          // Handle the success here
          console.log('Response:', response.data);
          setUploadSuccess(true);
        })
        .catch(error => {
          // Handle errors here
          console.error('Error:', error);
        });
    
  
    }
    catch (error) {
        console.error('An error occurred:', error);
      }
  };
  
  // console.log(watch('username'));

   

    // console.log(watch('username'));
    
  return (
    <section>
        <div className="register">
            <div className="colly1">
                <h2>Upload</h2>
                <span>Feed stomach with videos</span>

                <form id='form' className='flexy flexy-col'  onSubmit={handleSubmit(onSubmit)}   >
                {/* onSubmit={handleSubmit(onSubmit)}  */}

                         {/* form inputs */}
                        {/* <input type="text" {...register("hotel",{required:true , pattern: /^[A-Za-z]+$/i })}     placeholder='hotelname'/> */}
                        <input  type="text" {...register("hotel", { required: true,pattern: /^[A-Za-z]{2,}( [A-Za-z]{2,})*$/i,})}placeholder="hotelname"/>
                        <input  type='number'{...register("price",{required:true})} placeholder='price'/>
                        <input type="file"           onChange={(e)=>setVideo((prev) => e.target.files[0])}  placeholder='video'/>
                        <input type="text"{...register("place", { required: true,pattern: /^[A-Za-z]{2,}( [A-Za-z]{2,})*$/i,})} placeholder='place'/>
                        <input type="number"{...register("rating",{required:true})} placeholder='rating'/>
                        {/* <input type="password" {...register("password",{required:true})}placeholder='password'/>
                        <input type="password"{...register("confirmpassword",{required:true})} placeholder='confirmpassword'/> */}
                        {/* <input type="number"{...register("mobile",{required:true,maxLength:10})} placeholder='mobilenumber'/> */}
        
                        {/* form inputs  */}


                        {/* validation */}
                        {/* {errors.mobile?.type === "required"  &&  "Mobilenumber is required"}
                        {errors.mobile?.type === "maxLength"  &&  "Mobile nuber has exceeded maxlength"} */}
                        {errors.hotel?.type === "required" && (
                          <p role="alert">hotelname is required</p>
                        )}
                        {errors.hotel?.type === "pattern" && (
                          <p role="alert">Check the hotelname</p>
                        )}
                        {errors.place?.type === "required" && (
                          <p role="alert">place is required</p>
                        )}
                        {errors.place?.type === "pattern" && (
                          <p role="alert">Check the place entered</p>
                        )}
                        {(errors.video?.type === "required"  ||  video===null) && (
                          <p role="alert">video is required</p>
                        )}
                        
                        {errors.price?.type === "required" && (
                          <p role="alert">price is required</p>
                        )}
                        {errors.rating?.type === "required" && (
                          <p role="alert">Rating is required</p>
                        )}

                        {/* Validation complete */}
                    <button className='btny'>Upload</button>
                </form>
                {uploadSuccess && (
            <div className="success-message">
              <p>Upload successful! Go back to <Link to="/myprofile">profile page</Link></p>
            </div>
          )}

            </div>
            <div className="colly2">
                <img src="https://kidseatincolor.com/wp-content/uploads/2022/06/Self-Feeding-Baby-with-Baby-Utensil.jpg" alt="" />
            </div>
        </div>
    </section>
  )
}