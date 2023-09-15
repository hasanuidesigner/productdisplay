import React, { useRef, useState } from "react";
import './registration.css'
import userdata from '../data/registerusers.json' 

function UserRegiter({clsReguser}) {    
    const userIndv={
        "id":"",
        "firstname":'',
        "username":'',
        "password":'',
        "privilege":''
    }
    const [users,setUsers]=useState(userdata)
    const [registeralert, setRegisteralert] = useState(false)
    const [adduser,setAdduser] = useState({})
    const confirmpasswordRef = useRef()
    const newaddRef = useRef()
    const regformSubmitted =(e)=>{
        e.preventDefault();
        if(adduser.password!==e.target.confirmpassword.value){
            confirmpasswordRef.current.style.border='red solid 1px' 
            confirmpasswordRef.current.focus()
    }
    else{ 
        setUsers([...users,adduser])
        setRegisteralert(true)
        document.getElementById('regresponse').classList.add('show')
        setAdduser(userIndv)
        newaddRef.current.focus()
        setTimeout(() => {
            document.getElementById('regresponse').classList.remove('show')
          }, 2000);
    }
    }

    const regfldHandle=(e)=>{
        setAdduser({...adduser,[e.target.name]:e.target.value})
    }

    return <>     
    <div className="reg-success" id="regresponse">
      <div className="alert alert-success" role="alert">
         You are registerd successfully
      </div>
    </div>
        <div className="reg-wrapper">
            <div className="reg-wrapper-in">
                <h3 className="heading">Registration</h3>
                <form onSubmit={regformSubmitted}>
                <div className="mb-3">
                        <label className="form-label">Id</label>
                        <input type="number" ref={newaddRef} name="id" className="form-control" required value={setAdduser.id} onChange={regfldHandle} />
                    </div>
                <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" name="firstname" className="form-control" required value={setAdduser.firstname} onChange={regfldHandle}  />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input type="text" name="username" className="form-control" required onChange={regfldHandle} value={setAdduser.username} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type="password" name="password" className="form-control" required onChange={regfldHandle}  autoComplete="off"  value={setAdduser.password} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input ref={confirmpasswordRef} type="password" name="confirmpassword" className="form-control" autoComplete="off" required value={setAdduser.confirmpassword} />
                    </div>
                    <div>            
                    <label className="form-label">User type:</label>             
                        <select name="privilege" className="form-control" required onChange={regfldHandle}  value={setAdduser.privilege} >
                            <option value=''>Select</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className='btn-group-align'>
                    <button type="submit" className="btn btn-primary btn-color">Register</button>
                    <button type="button" className="btn btn-secondary m-3 btn-color" onClick={clsReguser}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default UserRegiter