import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const BookingForm = () => {
    const location = useLocation();
    const pid = location.state.id;
    console.log(pid);
    const [propertyId, setPropertyId] = useState(pid);
    const tenantId = localStorage.getItem("userId")
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const token = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();

        const bookingData = { propertyId, tenantId, startDate, endDate };
        try{
            const response = axios.post("http://localhost:8081/bookings/create", bookingData,{headers:{
                Authorization: `Bearer ${token}`
            }});
            console.log(response)
            navigate('/properties')
        }catch(error){
            console.log(error);
        }
           
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Book a Property</h2>
            <label>Property ID:</label>
            <input type="number" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} required />

            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

            <button type="submit">Book Now</button>
        </form>
    );
};

export default BookingForm;
