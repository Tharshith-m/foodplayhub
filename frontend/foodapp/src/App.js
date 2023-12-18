import Register from './components/Register';
import Login from './components/Login';
import Purchase from './components/Purchase';
import Upload from './components/Upload';
import About from './components/About';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Myprofile from './components/Myprofile';
import React,{useState,createContext} from 'react';
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
export const store = createContext();
export const productstore=createContext();
export const purchasestore=createContext();
export const infostore=createContext();

function App() {
  const [token,setToken]=useState(null);
  const[details,setDetails]=useState(null);
  const[info,setInfo]=useState(null);
  const[loginfo,setloginfo]=useState(null)
  return (
    <div className="App">
    <infostore.Provider  value={[loginfo,setloginfo]}>
    <purchasestore.Provider value={[info,setInfo]}>
    <store.Provider value={[token,setToken]} >
    <productstore.Provider value={[details,setDetails]}>
      <BrowserRouter> 
      {/* <Navbar /> */}
      <Routes>
            <Route path="/signup" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/about" element={<About/>}/>
            <Route path="/main" element={<Main />}/>
            <Route path="/myprofile" element={<Myprofile />}/>
            <Route path="/purchase" element={<Purchase/>}/>
            <Route path="/upload" element={<Upload/>}/>
            <Route path="/sidebar" element={<Sidebar/>}/>

      </Routes>
      </BrowserRouter>
      </productstore.Provider>
      </store.Provider>
      </purchasestore.Provider>
      </infostore.Provider>
      


      

      
      
</div>
   
  );
}

export default App;









