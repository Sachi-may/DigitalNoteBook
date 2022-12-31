import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { useNavigate,Link } from "react-router-dom"
const About = () => {
  let navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {

    }
    else {
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])
  const sachi={
    github:"https://github.com/Sachi-may",
    linkedin:"linkedin.com/in/sachi-shome-a388b5236/"
  }
  

  return (
    <>

      <div className="container">
        <h1>D-NoteBook</h1>
        <div className='my-2'>
          <p style={{ "display": "block", "width": "100%", "borderRadius": "10px", "border": "3px solid blue" }} name="aboutus" id="aboutus" readOnly cols="30" rows="10">D-Note Book or Digital Note Book is a web app where you can store your important notes safely and also you can update them when ever you want. First time when you are using this app you have to make an account using your email,name and you have to set your password. After successfully creating the account next time you just have to login with your email and password then only you can see your notes.--- It is a practice website made by Sachi shome (with react js,MongoDB,Express Js,and Node js)</p>
        </div>
      </div>
      <div className="footer-dark">
        <footer id='footer'>
            <div className="container ">
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-6 col-md-3 item">
                        <h3>SACHI SHOME</h3>
                        <ul>
                            <li>Email :</li>
                            <li>sachishome26@gmail.com</li>
                            <li>Contact: +8801790561106/+918132017092</li>
                            <li><a href={sachi.github} target="_blank">My Git Hub Profile</a></li>
                            <li><a href={sachi.linkedin} target="_blank">My Linked In Profile</a></li>
                        </ul>
                    </div>
                    
                </div>
                <p className="copyright">Company Name © 2018</p>
            </div>
        </footer>
    </div>
    </>
  )
}

export default About
