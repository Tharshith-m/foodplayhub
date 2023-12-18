import React,{useContext,useState,useEffect} from 'react'
import {store} from '../App';
import { productstore } from '../App';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { infostore } from '../App';
import Video from './Video';
import Sidebar from './Sidebar';
// ---
import ReactPlayer from "react-player";
// import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { SidebarData } from './Sidebardata'
import Carousel from 'react-bootstrap/Carousel';
import './Sidebar.css'
import { blue } from '@mui/material/colors';







const Myprofile = () => {
  const navigate = useNavigate();
  const [token,setToken]=useContext(store);
  const [video, setVideo] = useState(null);
  const [data,setData]=useState(null);
  const[details,setDetails]=useContext(productstore);
  const[loginfo,setloginfo]=useContext(infostore)
  
  const [isPlaying, setPlaying] = useState({});
 
  useEffect(()=>{
    axios.get('http://localhost:5000/myprofile',{
      headers:{
        'x-token':token
      }
    }).then(res =>{
      console.log(res.data.exist+"111111111111111111111111111111111111111111111");
      setVideo(res.data.videousers); 
      setData(res.data.exist);
      
    }).catch  ((err)=>{
      console.log(err)
    })

  },[]) 
  if(!token){
    console.log("token not found");
    return navigate('/');
  }

  
  const handlePurchase = (videoItem)=>{
    console.log(videoItem.hotel+"------------")
    setDetails(videoItem)
    // console.log(details);
    navigate('/purchase')
  }
  const handleupload =()=>{
    navigate('/upload')
  }
  const handlesidebar =()=>{
    navigate('/sidebar')
  }

  return (
    <div> 
        {setloginfo(data)}
        {/* <Sidebar/> */}
        {/* ----------------------------------------------------------------------------- */}
     
        {/* ---------------------------------------------------------------------------------- */}
         {/* {console.log(data.photo+"7823487632874798234789432792834")} */}
         {/* <img src={data.photo} alt='photo' width='100' height='100' /> */}
        { 
      
          data && 
          <center>
          {/* <Carousel> */}
          {/* <div   className='description'>
            welcome user :{data.name}
            <Navbar /> 
            <button onClick={() => handleupload()}>
                       upload
            </button>
            </div> */}
                    {/* Render videos */}
            {/* {video && (
            <div>
              <h3 className='mt_3'>Videos:</h3> */}
              {/* <ul>
                {video.map((videoItem, _id) => (
                  <li key={_id}>
                    <video width="640" height="240" controls>
                      <source src={videoItem.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <button onClick={() => handlePurchase(videoItem)}>
                       Purchase
                    </button>
                    
                  </li>
                ))}
              </ul> */}
              {/* <div className="video-container" id="video-container"   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {video.map((videoItem, index) => (
                <div key={index} className="video-item">
                <Video
                  key={videoItem._id}
                  url={videoItem.video}
                 />
                <button onClick={() => handlePurchase(videoItem)}>
                    Purchase
                </button>
                <button onClick={() => handleupload()}>
                       upload
            </button> 
                </div>
                
               ))}
              </div> */}
          {/* -----------------------------------------------------------      */}
         {/* {video.map((videoItem, index) => {
          return ( 
            <Carousel.Item key={videoItem._id}>
              <ReactPlayer
                url={videoItem.video}
                pip={true}
                controls={true}
                playing={true}
              />
              <Carousel.Caption>
                <h3>Food</h3>
                <p>more food</p>
                <button onClick={() => handlePurchase(videoItem)}>
                    Purchase
                </button>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}  */}
  

      


            
      <div className="video-container" > 
    
           
      <div className="video-container" >
      <Carousel data-bs-theme="dark"   showIndicators={false}>
        {video.map((videoItem, index) => (
          <Carousel.Item key={videoItem._id}> 
               <div  className="video-item" onClick={() =>
                      setPlaying({
                        ...isPlaying,
                        [videoItem._id]: !isPlaying[videoItem._id],
                      })
                    }
                    >
            <ReactPlayer
              url={videoItem.video}
              pip={true}
              controls={true}
              // playing={true}
              width="75%"
              height="10%"
            />
             </div>
            <Carousel.Caption>
            <div  className='details'  style={{ position: 'absolute', bottom: '70px', left: '0.0005px', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff', padding: '10px' }}>
            {/* <img
  src={data.photo}
  alt='photo'
  style={{
    width: '120px',
    height: '120px',
    borderRadius: '50%',  // Set to 50% for a complete circle shape
    border: '2px solid #fff',
    transition: 'width 0.3s ease',
  }}
/> */}
              <p>📌{videoItem.hotel}</p>
              <p>⏺️{videoItem.place}</p>
            </div>
            <button
    onClick={() => handlePurchase(videoItem)}
    style={{
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      padding: '10px 20px', // Adjust padding as needed
      backgroundColor: 'blue', // Dark blue color similar to a jeans pant
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    }}
  >
    Purchase
  </button>
            
           
             
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
    <div>
    <div >
        <div className='Sidebar' >
        <h3 className='ProjectName' style={{ fontFamily: 'Roboto',  fontSize: '24px', color: 'white' }}>
                    Food Blog Play Hub⚡
        </h3>
    <div className='Sidebarimg'>
    
    <img src={data.photo} alt='photo' width='100' height='100' />
    <h1>{data.name}</h1>
       
          
    </div>
    <ul  className='SidebarList'>
        {SidebarData.map((val,key)=>{
            return (
                <li  key={key}  
                  className='row'
                 onClick={()=>{window.location.pathname=val.link}}> 
                {" "}
                
                    <div id="icon">{val.icon}</div>{" "}
                    <div  id="title">
                         {val.title}
                    </div>
                </li>
            )

        })}
          
    </ul>
    </div>

        </div> 
    </div>
    </div>  
        





          {/* </Carousel> */}
          </center>

        }
    </div>
  )
}

export default Myprofile