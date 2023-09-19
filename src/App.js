import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from './Component/NavBar/Navigation';
import MainPage from './Component/HomePage/MainPage';
//port newnav from './Component/newnav/Newnav';
import NewNav from './Component/newnav/Newnav';
import MainComp from './Component/home/Maincomp';
import Footer from './Component/footer/Footer';
import SignUp from './Component/signup_sign/SignUp';
import Sign_in from './Component/signup_sign/Sign_in';
import Cart from './Component/cart/Cart';
import Buynow from './Component/buynow/Buynow';

function App() {
  return (
    <div className="app">
     <NavBar/>
     <NewNav/>
    
     <Routes>
      <Route path='/' element={<MainComp/>} />
      <Route path='/login' element={<Sign_in/>} />
      <Route path='/register' element={<SignUp/>} />
      <Route path='/getproductsone/:id' element={<Cart/>} />
      <Route path='/buynow' element={  <Buynow /> } /> 
     </Routes>
    
     <MainPage/>
     <Footer/>
     
     
    

      
  </div>
  );
}


export default App;
