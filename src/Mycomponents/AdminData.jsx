// import React, { useState } from 'react'
// import { handleError, handleSuccess } from '../utils';
// import axios from 'axios';
// import { ToastContainer } from 'react-toastify';

// function AdminData() {
//     const [selectedOption, setSelectedOption] = useState ("");

//     const [booking, setBooking] = useState ([]);

//     const [books, setBooks] = useState (false);

//     const handleChange = (e) => {
//         setSelectedOption (e.target.value)
//     }

//     const handleSubmit = async (e) => {
//       e.preventDefault ();

//       if (!selectedOption) {
//         handleError ("select option");
//         return;
//       }

//       try {
//         setBooks (true);
//         if (selectedOption === "name") {
//           const response = await axios.post ("http://127.0.0.1:5000/api/fetchData/name", selectedOption);

//           if (response.status === 200) {
//             handleSuccess ("booking fetch successfully");
//             setBooking (response.data);
//           }
//         }

//         else if (selectedOption === "email") {
//           const response = await axios.post ("http://127.0.0.1:5000/api/fetchData/email", selectedOption);

//           if (response.status === 200) {
//             handleSuccess ("booking fetch successfully");
//             setBooking (response.data);
//           }
//         }

//         else if (selectedOption === "phone") {
//           const response = await axios.post ("http://127.0.0.1:5000/api/fetchData/phone", selectedOption);

//           if (response.status === 200) {
//             handleSuccess ("booking fetch successfully");
//             setBooking (response.data);
//           }
//         }

//         else if (selectedOption === "date") {
//           const response = await axios.post ("http://127.0.0.1:5000/api/fetchData/date", selectedOption);

//           if (response.status === 200) {
//             handleSuccess ("booking fetch successfully");
//             setBooking (response.data);
//           }
//         }
//       }

//       catch (error) {
//         console.error ("error fetching booking", error);
//         handleError ("failed to fetch booking");
//       }
//     }
//   return (
//     <div>
//       <div className="AdminContainer">
//         <form>
//             <label htmlFor="input">select input type</label>
//             <select name="option" id="option" onChange={handleChange}>
//                 <option value="">select</option>
//                 <option value="name">Name</option>
//                 <option value="email">Email</option>
//                 <option value="phone">Phone</option>
//                 <option value="date">Date</option>
//             </select>
//         </form>
//       </div>

//       {selectedOption && (
//         <>
//         <input
//         type={selectedOption === "name" ? "text"
//             : selectedOption === "email" ? "email"
//             : selectedOption === "phone" ? "tel"
//             : "date"
//         }
//         placeholder={
//             selectedOption.charAt (0).toUpperCase () + selectedOption.slice (1)
//         }
//          />

//          <button onClick={handleSubmit}>Fetch Details</button>
//          </>
//       )}

//       {booking.length > 0 && (
//         <ul>
//           {booking.map ((item) => (
//             <li key={item.id}>
//               <p><strong>name: </strong>{item.name}</p>
//               <p><strong>email: </strong>{item.email}</p>
//               <p><strong>phone: </strong>{item.phone}</p>
//               <p><strong>From:</strong> {item.from} <strong>To:</strong> {item.to}</p>
//               <p><strong>Date:</strong> {item.date} <strong>Time:</strong> {item.time}</p>
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}

//       {books === true && booking.length <= 0 && (
//         <p>No previous booking found</p>
//       )}
//       <ToastContainer />
//     </div>
//   )
// }

// export default AdminData

import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "./AdminData.css";
import { Link } from "react-router-dom";

function AdminData() {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState(false);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setInputValue(""); // Reset input when option changes
    setBooking([]);
    setBooks (false);
  };

  setBooks 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOption || !inputValue) {
      handleError("Please select an option and enter a value");
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching data for:", selectedOption, inputValue);
      setBooks(true);

      const response = await axios.post(
        `http://127.0.0.1:5000/api/fetchData/${selectedOption}`,
        { [selectedOption]: inputValue }
      );

      if (response.status === 200) {
        handleSuccess("Booking fetched successfully");
        setBooking(response.data);
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
      handleError("Failed to fetch booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AdminBox">
      <nav>
        <ul>
          <li>
            <Link to="/addbus">Add Bus</Link>
          </li>
        </ul>
      </nav>
      <div className="AdminContainer">
        <form>
          <label htmlFor="option">Select Input Type:</label>
          <select name="option" id="option" onChange={handleChange}>
            <option value="">Select</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="date">Date</option>
            <option value="id">TicketId</option>
          </select>
        </form>
      </div>

      {selectedOption && (
        <div className="AdminInput">
          <input
            type={
              selectedOption === "name"
                ? "text"
                : selectedOption === "email"
                ? "email"
                : selectedOption === "phone"
                ? "tel"
                : selectedOption === "id"
                ? "text"
                : "date"
            }
            placeholder={`Enter ${selectedOption}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Fetching..." : "Fetch Details"}
          </button>
        </div>
      )}

      {booking.length > 0 && (
        <ul id="ul">
          {booking.map((item) => (
            <li key={item.id}>
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>TicketId: </strong> {item.id}
              </p>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Phone:</strong> {item.phone}
              </p>
              <p>
                <strong>From:</strong> {item.from} <strong>To:</strong>{" "}
                {item.to}
              </p>
              <p>
                <strong>Date:</strong> {item.date} <strong>Time:</strong>{" "}
                {item.time}
              </p>
              <hr />
            </li>
          ))}
        </ul>
      )}

      {books === true && booking.length <= 0 && <p>No booking Found</p>}

      <ToastContainer />
    </div>
  );
}

export default AdminData;
