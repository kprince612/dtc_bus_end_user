import React, { useState } from 'react'
import { handleError, handleSuccess } from '../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function AdminSignup() {
    const [adminsignup, setAdminSignup] = useState ({
        admin_id: '',
        password: '',
    })

    const navigate = useNavigate ();

    const handleChange = (e) => {
        setAdminSignup ({ ...adminsignup, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault ();

        if (!adminsignup.admin_id.trim () || !adminsignup.password.trim ()) {
            handleError ("all feild are required");
            return;
        }

        console.log (adminsignup);

        try {
            const response = await axios.post ("https://dtc-bus-backend-1.onrender.com/api/adminsignup", adminsignup);
            console.log ("admin signup data saved ", response.data);

            setAdminSignup ({
                admin_id: "",
                password: "",
            })

            handleSuccess ("admin sign up successful");
            navigate ("/admindata");
        }

        catch (err) {
            console.log ("error in admin sign up");
            handleError ("error in admin sign up");
        }
    }
  return (
    <div>
      <div className="AdminSignupContainer">
        <form onSubmit={handleSubmit}>
            <label htmlFor="admin_id">Admin Id</label>
            <input type="text" name='admin_id' placeholder='enter your Admin Id' onChange={handleChange}/>

            <label htmlFor="password">Password</label>
            <input type="password" name='password' placeholder='enter password' onChange={handleChange}/>

            <button type='submit'>SignUp as Admin</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminSignup
