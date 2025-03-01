import React, { useState } from 'react'
import { handleError, handleSuccess } from '../utils';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Addbus() {
    const [addbus, setAddBus] = useState ({
        bus_name: "",
        from: "",
        to: "",
        time: "",
    })

    const navigate = useNavigate ();

    const handleChange = (e) => {
        setAddBus ({ ...addbus, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault ();

        if (!addbus.bus_name.trim () || !addbus.from.trim () || !addbus.to.trim () || !addbus.time.trim ()) {
            handleError ("all field are required");
            return;
        }

        try {
            const response = await axios.post ("http://127.0.0.1:5000/api/addbusdata", addbus);
            console.log ("add bus data saved:", response.data);

            setAddBus ({
                bus_name: "",
                from: "",
                to: "",
                time: "",
            })

            handleSuccess ("bus add successfully");
            navigate ("/admindata");
        }

        catch (err) {
            handleError ("error in adding bus");
            console.log ("error in adding bus:", err);
        }
    }
  return (
    <div>
      <div className="AddbusContainer">
        <form onSubmit={handleSubmit}>
            <label htmlFor="bus_name">Bus Name</label>
            <input type="text" name='bus_name' placeholder='enter bus name' onChange={handleChange}/>

            <label htmlFor="from">From: </label>
            <select name="from" id="from" onChange={handleChange}>
                <option>Arrival From</option>
                <option value="Anand_Vihar_ISBT">Anand Vihar ISBT</option>
                <option value="Ashok_Vihar">Ashok Vihar</option>
                <option value="Badarpur">Badarpur</option>
                <option value="Central_Secretariat">Central Secretariat</option>
                <option value="Chandni_Chowk">Chandni Chowk</option>
                <option value="Connaught_Place">Connaught Place</option>
                <option value="Dwarka">Dwarka</option>
                <option value="Gokalpur">Gokalpur</option>
                <option value="Hauz_Khas">Hauz Khas</option>
                <option value="India_Gate">India Gate</option>
                <option value="ISBT_Kashmere_Gate">ISBT Kashmere Gate</option>
                <option value="Janakpuri">Janakpuri</option>
                <option value="Karol_Bagh">Karol Bagh</option>
                <option value="Lajpat_Nagar">Lajpat Nagar</option>
                <option value="Mandi_House">Mandi House</option>
                <option value="Munirka">Munirka</option>
                <option value="Nehru_Place">Nehru Place</option>
                <option value="New_Delhi_Railway_Station">New Delhi Railway Station</option>
                <option value="Okhla">Okhla</option>
                <option value="Palam">Palam</option>
                <option value="Pitampura">Pitampura</option>
                <option value="Rajouri_Garden">Rajouri Garden</option>
                <option value="Rohini">Rohini</option>
                <option value="Saket">Saket</option>
                <option value="Sarita_Vihar">Sarita Vihar</option>
                <option value="Shahdara">Shahdara</option>
                <option value="Vasant_Kunj">Vasant Kunj</option>
                <option value="Vikas_Puri">Vikas Puri</option>
            </select>

            <label htmlFor="to">To: </label>
            <select name="to" id="to" onChange={handleChange}>
                <option>Destination To</option>
                <option value="Anand_Vihar_ISBT">Anand Vihar ISBT</option>
                <option value="Ashok_Vihar">Ashok Vihar</option>
                <option value="Badarpur">Badarpur</option>
                <option value="Central_Secretariat">Central Secretariat</option>
                <option value="Chandni_Chowk">Chandni Chowk</option>
                <option value="Connaught_Place">Connaught Place</option>
                <option value="Dwarka">Dwarka</option>
                <option value="Gokalpur">Gokalpur</option>
                <option value="Hauz_Khas">Hauz Khas</option>
                <option value="India_Gate">India Gate</option>
                <option value="ISBT_Kashmere_Gate">ISBT Kashmere Gate</option>
                <option value="Janakpuri">Janakpuri</option>
                <option value="Karol_Bagh">Karol Bagh</option>
                <option value="Lajpat_Nagar">Lajpat Nagar</option>
                <option value="Mandi_House">Mandi House</option>
                <option value="Munirka">Munirka</option>
                <option value="Nehru_Place">Nehru Place</option>
                <option value="New_Delhi_Railway_Station">New Delhi Railway Station</option>
                <option value="Okhla">Okhla</option>
                <option value="Palam">Palam</option>
                <option value="Pitampura">Pitampura</option>
                <option value="Rajouri_Garden">Rajouri Garden</option>
                <option value="Rohini">Rohini</option>
                <option value="Saket">Saket</option>
                <option value="Sarita_Vihar">Sarita Vihar</option>
                <option value="Shahdara">Shahdara</option>
                <option value="Vasant_Kunj">Vasant Kunj</option>
                <option value="Vikas_Puri">Vikas Puri</option>
            </select>

            <label htmlFor="time">Time</label>
            <input type="time" name='time' onChange={handleChange}/>

            <button>Add Bus</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Addbus
