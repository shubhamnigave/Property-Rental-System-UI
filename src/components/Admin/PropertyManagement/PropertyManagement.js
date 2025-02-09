import React, { useState, useEffect } from "react";

function PropertyManagement() {
  const [properties, setProperties] = useState([]);

  // Fetch properties from the API
  useEffect(() => {
    fetch("http://localhost:8081/properties")
      .then(response => response.json())
      .then(data => {console.log(data);setProperties(data)})
      .catch(error => console.error("Error fetching properties:", error));
  }, []);

  return (
    <div>
      <h3>Property Management</h3>
      <button className="btn btn-primary mb-3">Add Property</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <tr key={property.id}>
              <td>{property.title}</td>
              <td>{property.owner.name}</td>
              <td>{property.available===true?"Available":"Booked"}</td>
              <td>
              {property.available===true?(<>
                <button className="btn btn-success btn-sm">Approve</button>
                <button className="btn btn-danger btn-sm">Reject</button>
              </>
                ):null}
                {/* <button className="btn btn-info btn-sm">Edit</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropertyManagement;
