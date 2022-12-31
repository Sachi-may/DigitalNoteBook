import React from 'react'
import { useState } from 'react';
import { useNavigate} from "react-router-dom"

const Login = (props) => {
    const [creds, setcreds] = useState({ email: "", password: "" })
    let navigate= useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },body: JSON.stringify({email: creds.email,password:creds.password})
          });
          const json=await response.json()
          console.log(json)
          if(json.success){
            //Saving the auth token and redirecting to home page after successfull login.
            localStorage.setItem('token',json.authtoken);
            navigate("/")
            props.showAlert("Login Successful","success")
            
          }
          else{
            props.showAlert("Wrong Information","danger");
          }

    }
    const onChange = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h1 className='mt-1'>D-Note Book Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={creds.email} aria-describedby="emailHelp" onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={creds.password} onChange={onChange}/>
                </div>
            
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
