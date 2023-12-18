// import React from 'react'
import './Sidebar.css'
import { SidebarData } from './Sidebardata'
import React,{useContext,useState,useEffect} from 'react'
import { infostore } from '../App';


function Sidebar() { 
    const[loginfo,setloginfo]=useContext(infostore)
  return (
    <div className='Sidebar' > 
    <div className='Sidebarimg'>
    
    <img src={loginfo.photo} alt='photo' width='100' height='100' />
    <h1>{loginfo.name}</h1>

          
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
  )
}

export default Sidebar