import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./AvailableBus.css";
import { ToastContainer } from 'react-toastify';

function AvailableBus() {
    const [busData, setBusData] = useState ([]);
    const [bustrue, setBusTrue] = useState (false);

    const fetchBusData = async (e) => {
        // e.preventDefault ();

        try {
            const response = await axios.post ("http://127.0.0.1:5000/api/fetchbusdata");

            if (response.status === 200) {
                handleSuccess ("this is the available buses");
                console.log ("hello")
                setBusData (response.data);
                console.log (busData);
                setBusTrue (true);
            }
        }

        catch (err) {
            handleError ("error in fetching buses");
            console.log ("error in fetching bus:", err);
        }
    }

    const navigate = useNavigate ();

    const handleBusClick = (bus) => {
        setTimeout (() => {
            navigate ("/booking", {state: { from: bus.from, to: bus.to, time: bus.time} })
        }, 1000)
    }

    useEffect (() => {
        fetchBusData ();
    }, [])
  return (
    <div>
        <nav>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/availablebus">Available Buses</Link></li>
                <li><Link to="/account">My Account</Link></li>
                <li><Link to="/review">Reviews</Link></li>
                <li> <Link onClick={fetchBusData} id='fetchbutton'>click to check availability</Link></li>
            </ul>
        </nav>

        { bustrue === false && (
            <h2 id='heading2'>Please click on check availability button to for the buses present in the navigation bar</h2>
        )}

        {/* <button onClick={fetchBusData} id='fetchbutton'>click to check availability</button> */}
      {busData.length > 0 &&  (
        <ul id='list'>
            {busData.map ((bus) => (
                <>
                <li key={bus.id}>
                <div className="imageContainer">
                    
                    </div>
                    
                    <div>
                    <p><strong>Name: </strong>{bus.bus_name}</p>
                    <p><strong>From: </strong>{bus.from}</p>
                    <p><strong>To: </strong>{bus.to}</p>
                    <p><strong>Time: </strong>{bus.time}</p>
                    
                    <button onClick={() => handleBusClick (bus)}>Book Now</button>
                    </div>
                    <hr />
                </li>
                </>
            ))}
        </ul>
      )}

      {busData.length <= 0 && bustrue === true && (
        <h2>No Bus is available</h2>
      )}
      <ToastContainer />
    </div>
  )
}

export default AvailableBus
