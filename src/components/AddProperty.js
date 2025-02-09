
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AddProperty.css";
// import { useLocation, useNavigate } from "react-router-dom";

// const AddProperty = () => {
//   const location = useLocation();
//   const updateproperty = location.state || {};
//   updateproperty.amenities = updateproperty.amenities?.map(a=>a.id) || [];
//   console.log(updateproperty.amenities)

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     address: "",
//     city: "",
//     rent: "",
//     selectedAmenities: [],
//     newAmenity: ""
//   });
//   // formData.selectedAmenities = updateproperty.amenities
//   // console.log("form",formData)
//   const [images, setImages] = useState([]);
//   const navigate = useNavigate();
//   const [amenities, setAmenities] = useState([...updateproperty?.amenities]);
//   const token = localStorage.getItem("jwtToken");


//   const fetchAmenities = async () => {
//     console.log(token)
//     try {
//       const response = await axios.get("http://localhost:8081/landlord/all", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(response.data)
//       setAmenities(response.data);
//     } catch (error) {
//       console.error("Error fetching amenities:", error);
//       navigate("/login");
//     }
//   };
//   useEffect(() => {
   

//     fetchAmenities();
//   }, [token]);

//   const handleAmenityAdd = async () => {
//     if (!formData.newAmenity.trim()) return;
//     try {
//       const response = await axios.post(
//         "http://localhost:8081/landlord/addAmenities",
//         { name: formData.newAmenity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setAmenities([...amenities, response.data]);
//       fetchAmenities();
      
//       setFormData((prevState) => ({ ...prevState, newAmenity: "" }));
//     } catch (error) {
//       console.error("Error adding amenity:", error);
//     }
//   };


//   const handleImageUpload = (event) => {
//     setImages((prevState) => [...prevState, ...event.target.files]);
//   };


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const { title, description, address, city, rent, selectedAmenities } = formData;

//     const form = new FormData();
//     const property = {
//       title,
//       description,
//       address,
//       city,
//       rent,
//       ownerId: 1, // Replace with actual userId
//       amenityIds: selectedAmenities
//     };
//     console.log(property)
   

//     form.append("property", JSON.stringify(property));
//     images.forEach((image) => form.append("images", image));

//     try {
//       await axios.post("http://localhost:8081/landlord/properties/add", form, {
//         headers: { 
//           "Content-Type": "multipart/form-data", 
//           Authorization: `Bearer ${token}` 
//         },
//       });
//       alert("Property added successfully!");
//     } catch (error) {
//       console.error("Error adding property:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="add-property-container">
//       <h2>Add New Property</h2>
//       <form onSubmit={handleSubmit} className="property-form">
//         <input 
//           type="text" 
//           placeholder="Title" 
//           name="title" 
//           value={formData.title} 
//           onChange={handleInputChange} 
//           required 
//         />
//         <textarea 
//           placeholder="Description" 
//           name="description" 
//           value={formData.description} 
//           onChange={handleInputChange} 
//           required 
//         />
//         <input 
//           type="text" 
//           placeholder="Address" 
//           name="address" 
//           value={formData.address} 
//           onChange={handleInputChange} 
//           required 
//         />
//         <input 
//           type="text" 
//           placeholder="City" 
//           name="city" 
//           value={formData.city} 
//           onChange={handleInputChange} 
//           required 
//         />
//         <input 
//           type="number" 
//           placeholder="Rent (₹)" 
//           name="rent" 
//           value={formData.rent} 
//           onChange={handleInputChange} 
//           required 
//         />

//         <label>Amenities:</label>
//         <div className="amenities-checkboxes">
//           {amenities.map((amenity) => (
//             <div key={amenity.id} className="amenity-checkbox">
//               <input
//                 type="checkbox"
//                 id={`amenity-${amenity.id}`}
//                 name="selectedAmenities"
//                 value={amenity.id}
//                 checked={formData.selectedAmenities.includes(amenity.id)}
//                 onChange={(e) => {
//                   const { checked, value } = e.target;
//                   const amenityId = Number(value);
//                   setFormData((prevState) => ({
//                     ...prevState,
//                     selectedAmenities: checked
//                       ? [...prevState.selectedAmenities, amenityId]
//                       : prevState.selectedAmenities.filter((id) => id !== amenityId)
//                   }));
//                 }}
//               />
//               <label htmlFor={`amenity-${amenity.id}`}>{amenity.name}</label>
//             </div>
//           ))}
//         </div>

//         <div className="amenity-add">
//           <input 
//             type="text" 
//             placeholder="New Amenity" 
//             value={formData.newAmenity} 
//             onChange={(e) => setFormData({ ...formData, newAmenity: e.target.value })} 
//           />
//           <button type="button" onClick={handleAmenityAdd}>Add</button>
//         </div>

//         <label>Upload Images:</label>
//         <input 
//           type="file" 
//           multiple 
//           accept="image/*" 
//           onChange={handleImageUpload} 
//         />

//         <button type="submit" className="submit-btn">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddProperty;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProperty.css";
import { useLocation, useNavigate } from "react-router-dom";

const AddProperty = () => {
  const location = useLocation();
  const updateproperty = location.state || {};
  updateproperty.amenities = updateproperty.amenities?.map(a => a.id) || [];
  console.log(updateproperty.amenities);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    rent: "",
    propertyType: "", // New State for Dropdown
    selectedAmenities: [],
    newAmenity: "",
  });

  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState([...updateproperty?.amenities]);
  const token = localStorage.getItem("jwtToken");

  const fetchAmenities = async () => {
    console.log(token);
    try {
      const response = await axios.get("http://localhost:8081/landlord/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setAmenities(response.data);
    } catch (error) {
      console.error("Error fetching amenities:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, [token]);

  const handleAmenityAdd = async () => {
    if (!formData.newAmenity.trim()) return;
    try {
      const response = await axios.post(
        "http://localhost:8081/landlord/addAmenities",
        { name: formData.newAmenity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAmenities([...amenities, response.data]);
      fetchAmenities();
      setFormData((prevState) => ({ ...prevState, newAmenity: "" }));
    } catch (error) {
      console.error("Error adding amenity:", error);
    }
  };

  const handleImageUpload = (event) => {
    setImages((prevState) => [...prevState, ...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, description, address, city, rent, propertyType, selectedAmenities } = formData;

    const form = new FormData();
    const property = {
      title,
      description,
      address,
      city,
      rent,
      propertyType, // Include property type
      ownerId: 1, // Replace with actual userId
      amenityIds: selectedAmenities,
    };
    console.log(property);

    form.append("property", JSON.stringify(property));
    images.forEach((image) => form.append("images", image));

    try {
      await axios.post("http://localhost:8081/landlord/properties/add", form, {
        headers: { 
          "Content-Type": "multipart/form-data", 
          Authorization: `Bearer ${token}` 
        },
      });
      alert("Property added successfully!");
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="add-property-container">
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit} className="property-form">
        <input 
          type="text" 
          placeholder="Title" 
          name="title" 
          value={formData.title} 
          onChange={handleInputChange} 
          required 
        />
        <textarea 
          placeholder="Description" 
          name="description" 
          value={formData.description} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="text" 
          placeholder="Address" 
          name="address" 
          value={formData.address} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="text" 
          placeholder="City" 
          name="city" 
          value={formData.city} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="number" 
          placeholder="Rent (₹)" 
          name="rent" 
          value={formData.rent} 
          onChange={handleInputChange} 
          required 
        />

        {/* New Dropdown for Property Type */}
        <label>Property Type:</label>
        <select 
          name="propertyType" 
          value={formData.propertyType} 
          onChange={handleInputChange} 
          required
        >
          <option value="">Select Property Type</option>
          <option value="FURNISHED">Furnished</option>
          <option value="SEMIFURNISHED">Semifurnished</option>
          <option value="UNFURNISHED">Unfurnished</option>
        </select>

        <label>Amenities:</label>
        <div className="amenities-checkboxes">
          {amenities.map((amenity) => (
            <div key={amenity.id} className="amenity-checkbox">
              <input
                type="checkbox"
                id={`amenity-${amenity.id}`}
                name="selectedAmenities"
                value={amenity.id}
                checked={formData.selectedAmenities.includes(amenity.id)}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  const amenityId = Number(value);
                  setFormData((prevState) => ({
                    ...prevState,
                    selectedAmenities: checked
                      ? [...prevState.selectedAmenities, amenityId]
                      : prevState.selectedAmenities.filter((id) => id !== amenityId)
                  }));
                }}
              />
              <label htmlFor={`amenity-${amenity.id}`}>{amenity.name}</label>
            </div>
          ))}
        </div>

        <div className="amenity-add">
          <input 
            type="text" 
            placeholder="New Amenity" 
            value={formData.newAmenity} 
            onChange={(e) => setFormData({ ...formData, newAmenity: e.target.value })} 
          />
          <button type="button" onClick={handleAmenityAdd}>Add</button>
        </div>

        <label>Upload Images:</label>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleImageUpload} 
        />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default AddProperty;
