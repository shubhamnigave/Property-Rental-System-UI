import React, { useState, useEffect } from "react";

function FeedbackReports() {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedbacks from the API
  useEffect(() => {
    fetch("API_URL/feedbacks")
      .then(response => response.json())
      .then(data => setFeedbacks(data))
      .catch(error => console.error("Error fetching feedbacks:", error));
  }, []);

  return (
    <div>
      <h3>Feedback & Reports</h3>
      <h5>Tenant Feedback</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tenant</th>
            <th>Property</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(feedback => (
            <tr key={feedback.id}>
              <td>{feedback.tenant}</td>
              <td>{feedback.property}</td>
              <td>{feedback.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5 className="mt-3">Generate Reports</h5>
      <button className="btn btn-primary">Generate Booking Report</button>
      <button className="btn btn-primary">Generate Revenue Report</button>
    </div>
  );
}

export default FeedbackReports;
