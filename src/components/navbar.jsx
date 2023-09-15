import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom' 

function Navbar({openLogin,userAuthentic,sessionLogout,prfl,openReguser}) {
    return <>
        <nav className="navbar navbar-expand-lg navbar-cstm">
            <div className="container-fluid">
            <Link className="navbar-brand" to='/'>Product Displayer</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/'>Home</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to='/aboutus'>About Us</NavLink>
                        </li> 
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/allproducts'>All Products</NavLink>
                        </li>  */}                       
                        </ul>
                        <ul className="navbar-nav d-flex">
                        {
                            userAuthentic ? <><li className="nav-item">
                            <NavLink className="nav-link" onClick={sessionLogout}>Logout</NavLink>
                        </li>
                        <li className="nav-link">Welcome {prfl.map(user=>user.firstname)}  </li></> : 
                        
                        <><li className="nav-item">
                            <NavLink className="nav-link" onClick={openLogin}>Login</NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink className="nav-link" onClick={openReguser}>Register</NavLink>
                        </li></>
                        }
                        
                    </ul>

                </div>
            </div>
        </nav>
          
    </>
}
export default Navbar