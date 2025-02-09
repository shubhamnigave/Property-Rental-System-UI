// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import StripePayment from "../PaymentCheckout/CheckoutForm";
// import { useLocation, useNavigate } from "react-router-dom";

// const BookingRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("jwtToken");
//   // Simulate fetching booking requests from an API
//   const fetchRequests = async () => {
//     setLoading(true);
//     const response = await axios.get(
//       `http://localhost:8081/bookings/${userId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log(response.data);
//     setLoading(false);
//     setRequests(response.data);
//     // Mock request data
//   };

//   const navigate = useNavigate();
//   const location = useLocation();
//   const [status,setStatus] = useState();
//   const fetchPayment = async (id) => {
//     const response =  await axios.get(`http://localhost:8081/payments/${id}`,{headers:{Authorization: `Bearer ${token}`}})
//     // setStatus(response.data.paymentStatus);
//     return response.data.paymentStatus;
//   }

//   const payment = location.state?.paymentStatus
//     ? location.state?.paymentStatus
//     : "Pending";
//   console.log(payment.paymentStatus);
//   useEffect(() => {
//     // This is a mock function simulating data fetching
//     // fetchPayment
//     fetchRequests();
//   }, []);

//   const handlePayment = (id, amount) => {
//     // Logic to handle payment
//     navigate("/payment", {
//       state: { request: { requestId: id, amount: amount } },
//     });
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Booking Requests</h2>
//       {loading ? (
//         <p>Loading requests...</p>
//       ) : (
//         <ul className="list-group">
//           {requests.map((request) => (
//             <li
//               key={request.id}
//               className="list-group-item d-flex justify-content-between align-items-center"
//             >
//               <div>
//                 <strong>{request.id}</strong>
//                 <p>Booking Status: {request.status}</p>
//               </div>
//               <div>
//                 <p>Payment Status: {payment ? fetchPayment(request.id) : fetchPayment(request.id)}</p>
//               </div>
//               <div>
//                 {request.status === "APPROVED" &&
//                   (payment === "succeeded" ? null : (
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => handlePayment(request.id, request.amount)}
//                     >
//                       Payment
//                     </button>
//                   ))}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default BookingRequests;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [paymentStatuses, setPaymentStatuses] = useState({});
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch Booking Requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8081/bookings/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  // Fetch Payment Status for Each Booking
  const fetchPaymentStatus = async (bookingId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/payments/${bookingId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.paymentStatus; // Return status
    } catch (error) {
      console.error("Error fetching payment status:", error);
      return "Pending"; // Default to pending if error occurs
    }
  };

  // Fetch all payment statuses and update state
  const updatePaymentStatuses = async () => {
    const statuses = {};
    for (let request of requests) {
      statuses[request.id] = await fetchPaymentStatus(request.id);
    }
    setPaymentStatuses(statuses);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Update Payment Status when returning from Payment Page
  useEffect(() => {
    if (requests.length > 0) {
      updatePaymentStatuses();
    }
  }, [requests, location]); // Runs when location changes (redirect from payment)

  // Handle Payment Navigation
  const handlePayment = (id, amount) => {
    navigate("/payment", {
      state: { request: { requestId: id, amount: amount } },
    });
  };

  return (
    <div className="container mt-5">
      <h2>Booking Requests</h2>
      {loading ? (
        <p>Loading requests...</p>
      ) : (
        <ul className="list-group">
          {requests.map((request) => (
            <li
              key={request.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>Booking ID: {request.id}</strong>
                <p>Status: {request.status}</p>
              </div>
              <div>
                <p>
                  Payment Status: {paymentStatuses[request.id] || "Fetching..."}
                </p>
              </div>
              <div>
                {request.status === "APPROVED" &&
                  paymentStatuses[request.id] !== "succeeded" &&
                  paymentStatuses[request.id] !== "COMPLETED" && ( // Hide button for succeeded or completed payments
                    <button
                      className="btn btn-primary"
                      onClick={() => handlePayment(request.id, request.amount)}
                    >
                      Pay Now
                    </button>
                  )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingRequests;
