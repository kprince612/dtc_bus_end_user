import React, { useState } from 'react'
import { handleError, handleSuccess } from '../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "./AdminLogin.css"

function AdminLogin() {
    const [adminLoginData, setAdminLoginData] = useState ({
        admin_id: "",
        password: "",
    })

    const navigate = useNavigate ();

    const handleChange = (e) => {
        setAdminLoginData ({ ...adminLoginData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault ();

        if (!adminLoginData.admin_id.trim() || !adminLoginData.password.trim()) {
            handleError ("all field are required");
            return;
        }

        try {
            const response = await axios.post ("http://127.0.0.1:5000/api/loginData", adminLoginData);

            if (response.data) {
                handleSuccess ("Admin Login Successful");

                setTimeout (() => {
                    navigate ("/admindata");
                }, 1000)
            }

            setAdminLoginData ({
                admin_id: "",
                password: "",
            })
        }

        catch (err) {
            console.log ("error in login:", err);
            handleError ("error in login, or invaild admin id or password");
        }
    }
  return (
    <div>
      <div className="AdminLoginContainer">
        <form onSubmit={handleSubmit}>
            <h2>Login for Admin</h2>
            <label htmlFor="admin_id">Admin Id</label>
            <input type="text" name='admin_id' placeholder='enter your Admin Id' onChange={handleChange} value={adminLoginData.admin_id}/>

            <label htmlFor="password">Password</label>
            <input type="password" name='password' placeholder='enter password' onChange={handleChange} value={adminLoginData.password}/>

            <button>Login</button>
        </form>
      </div>

      <ToastContainer />
    </div>
  )
}

export default AdminLogin
