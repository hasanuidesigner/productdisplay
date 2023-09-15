import React, { useEffect, useState } from 'react'
import { NavLink, Route, Routes, BrowserRouter, json } from 'react-router-dom'
import Home from './components/home'
import Navbar from './components/navbar'
import AboutUs from './components/aboutus'
import './components/login.css'
import UserRegiter from "./components/registration";
import ProductDetails from './components/productdetails'
import Allproducts from './components/products'
import existUser from './data/registerusers.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { createPortal } from 'react-dom'
  
function App() {
  const [loginpop, setLoginpop] = useState(false)
  const [reginpop,setReginpop] = useState(false)
  const [loginflds,setLoginflds] = useState({})
  const [userAuthentic, setUserAuthentic] = useState(false)
  const [prfl, setPrfl] = useState([])
  const [loginresp, setLoginresp] = useState(false)
  const [loginalert, setLoginalert] = useState(false)

  //const [existUserlive,setExistUserlive] = useState([]); // <<-- for fetch code
  
  //with async
  /* async function fetchuserlist() {
    const response = await fetch('https://633a8658471b8c39556ecbb5.mockapi.io/usersList');
  
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
  
      await response.json().then(userdata => setExistUserlive(userdata));
    
  }
  
  fetchuserlist().catch(error => {
    console.log(error.message); // 'An error has occurred: 404'
  }); */

  //without async
/*  fetch('https://633a8658471b8c39556ecbb5.mockapi.io/usersList').then(response => response.json())
.then(userdata => setExistUserlive(userdata)) */

 
  const openLogin = () => {
    document.body.classList.add('scrlStop')
    return setLoginpop(true)
  }

  const openReguser = () => {
    document.body.classList.add('scrlStop')
    return setReginpop(true)
  } 

  const clsReguser = () => {
    document.body.classList.remove('scrlStop')
    return setReginpop(false)
  } 
  
  const loginfldschange=(e)=>{
    setLoginflds({...loginflds,[e.target.name]:e.target.value})
  }
  
  const sessionLogout = () => {
    setUserAuthentic(false)
    setPrfl([])
    setLoginflds({})
    window.location.href="/productdisplay"
  }
  const loginSubmitted = (e) => {
    e.preventDefault();
    const currentUsrnm = existUser.filter(existusrs => existusrs.username === loginflds.usernme).map(existusr => existusr.username)
    const currentUsrpw = existUser.filter(existusrs => existusrs.password === loginflds.passwrd).map(existusr => existusr.password)
    if (currentUsrnm.includes(loginflds.usernme) && currentUsrpw.includes(loginflds.passwrd)) {
      setUserAuthentic(true)
      setPrfl(existUser.filter(existusrs => existusrs.username === loginflds.usernme))
      document.getElementById('loginresponse').classList.add('show')
      document.body.classList.remove('scrlStop')
      setLoginpop(false)
      setLoginalert(true)
      setLoginresp(true)
      setTimeout(() => {
        document.getElementById('loginresponse').classList.remove('show')
      }, 2000);
      setTimeout(() => {
        setLoginalert(false)
        setLoginresp(false)
      }, 5000);
    }
    else {
      document.getElementById('loginresponse').classList.add('show')
      setTimeout(() => {
        document.getElementById('loginresponse').classList.remove('show')
        setLoginalert(false)
        setLoginresp(false)
      }, 2000);
    }
  }

  return <>  
    <div className={"login-success " + (loginalert ? 'show' : '')} id="loginresponse">
      <div className={"alert " + (loginresp ? 'alert-success' : 'alert-danger')} role="alert">
        {(loginresp ? 'Login Success' : 'Login Failure')}
      </div>
    </div>
    {loginpop && createPortal(<div className='portalPop-bg'> 
      <div className="login-wrapper">
        <div className="login-wrapper-in">
          <h3 className='heading'>Login</h3>
          <form onSubmit={loginSubmitted}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" name="usernme" onChange={loginfldschange} required />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name="passwrd" autoComplete='off' onChange={loginfldschange}  required />
            </div>
            <div className='btn-group-align'>
            <button type="submit" className="btn btn-primary btn-color">Login</button>
            <button type="button" className="btn btn-secondary m-3 btn-color" onClick={() => { setLoginpop(false);document.body.classList.remove('scrlStop') }}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>, document.body)}

    {reginpop && createPortal(<div className="portalPop-bg"><UserRegiter clsReguser={clsReguser}/></div>,document.body)}

  
    <BrowserRouter basename='/productdisplay'>
      <Navbar openLogin={openLogin} openReguser={openReguser} prfl={prfl} userAuthentic={userAuthentic} sessionLogout={sessionLogout} />
      <div className='page-cnt-wrap'> 
      <Routes>
        <Route exact path='/' element={<Home prfl={prfl} userAuthentic={userAuthentic} />} ></Route>
        <Route path='/aboutus' element={<AboutUs/>} ></Route>
        <Route path='/product/:id' element={<ProductDetails userAuthentic={userAuthentic} />} ></Route>
        <Route path='/allproducts' element={<Allproducts/>} ></Route>
      </Routes>
      </div>
    </BrowserRouter>
    
  </>
}

export default App
