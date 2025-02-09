// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import PropertyCard from "./PropertyCard";
// import "./PropertiesList.css";

// const PropertiesList = () => {
//   const [loading, setLoading] = useState(true);
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [filters, setFilters] = useState({
//     city: "",
//     minRent: "",
//     maxRent: "",
//     available: "", // "true" or "false"
//     propertyType: "", // Furnished, Unfurnished, etc.
//     amenities: [],
//   });

//   const token = localStorage.getItem("jwtToken");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const deleteProperty = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8081/landlord/properties/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchPropertiesData(); // Refresh list after deletion
//     } catch (error) {
//       console.error("Error deleting property:", error);
//     }
//   };

//   const fetchPropertiesData = async () => {
//     setLoading(true);

//     let url = `http://localhost:8081/properties/filter?`;

//     // Append filters as query params
//     if (filters.city) url += `city=${filters.city}&`;
//     if (filters.minRent) url += `minRent=${filters.minRent}&`;
//     if (filters.maxRent) url += `maxRent=${filters.maxRent}&`;
//     if (filters.available !== "") url += `available=${filters.available}&`;
//     if (filters.propertyType) url += `propertyType=${filters.propertyType}&`;
//     if (filters.amenities.length > 0) url += `amenities=${filters.amenities.join(",")}&`;

//     try {
//       const response = await axios.get(url,{headers:{Authorization: `Bearer ${token}`}});
//       if (response.status === 200) {
//         setProperties(response.data);
//         setFilteredProperties(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPropertiesData();
//   }, [location]);

//   const applyFilters = () => {
//     fetchPropertiesData();
//   };

//   if (loading) return <div className="loading">Loading properties...</div>;
//   if (properties.length === 0) return <div className="no-properties">No properties available</div>;

//   return (
//     <div className="properties-page">
//       {/* Sticky Left Panel */}
//       <div className="filter-panel">
//         <h3>Filter Properties</h3>
//         <input
//           type="text"
//           placeholder="Search by City"
//           value={filters.city}
//           onChange={(e) => setFilters({ ...filters, city: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Min Rent"
//           value={filters.minRent}
//           onChange={(e) => setFilters({ ...filters, minRent: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Max Rent"
//           value={filters.maxRent}
//           onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
//         />

//         {/* Availability Filter */}
//         <select
//           value={filters.available}
//           onChange={(e) => setFilters({ ...filters, available: e.target.value })}
//         >
//           <option value="">Availability</option>
//           <option value="true">Available</option>
//           <option value="false">Not Available</option>
//         </select>

//         {/* Property Type Filter */}
//         <select
//           value={filters.propertyType}
//           onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
//         >
//           <option value="">Property Type</option>
//           <option value="Furnished">Furnished</option>
//           <option value="Unfurnished">Unfurnished</option>
//           <option value="Semi-Furnished">Semi-Furnished</option>
//         </select>

//         {/* Amenities Filter (Checkbox) */}
//         <div className="amenities-filter">
//           <label>
//             <input
//               type="checkbox"
//               value="WiFi"
//               onChange={(e) => {
//                 const selectedAmenities = filters.amenities.includes(e.target.value)
//                   ? filters.amenities.filter((a) => a !== e.target.value)
//                   : [...filters.amenities, e.target.value];
//                 setFilters({ ...filters, amenities: selectedAmenities });
//               }}
//             />
//             WiFi
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="Parking"
//               onChange={(e) => {
//                 const selectedAmenities = filters.amenities.includes(e.target.value)
//                   ? filters.amenities.filter((a) => a !== e.target.value)
//                   : [...filters.amenities, e.target.value];
//                 setFilters({ ...filters, amenities: selectedAmenities });
//               }}
//             />
//             Parking
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="Gym"
//               onChange={(e) => {
//                 const selectedAmenities = filters.amenities.includes(e.target.value)
//                   ? filters.amenities.filter((a) => a !== e.target.value)
//                   : [...filters.amenities, e.target.value];
//                 setFilters({ ...filters, amenities: selectedAmenities });
//               }}
//             />
//             Gym
//           </label>
//         </div>

//         <button onClick={applyFilters} className="apply-filter-btn">
//           Apply Filters
//         </button>
//       </div>

//       {/* Right Panel - Vertically Scrollable List */}
//       <div className="properties-container">
//         <h2 className="title">Explore Properties</h2>
//         <div className="property-grid">
//           {filteredProperties.map((property) => (
//             <PropertyCard 
//               key={property.id} 
//               property={property} 
//               deleteProperty={() => deleteProperty(property.id)}  
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertiesList;
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import "./PropertiesList.css";
import { useAuth } from "../../Auth/AuthContext";

const PropertiesList = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  // const [propertiesg, setPropertiesg] = useAuth();
  const [filters, setFilters] = useState({
    city: "",
    minRent: "",
    maxRent: "",
    available: "", // "true" or "false"
    propertyType: "", // Furnished, Unfurnished, etc.
    amenities: [],
  });

  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const location = useLocation();

  // Function to delete a property
  const deleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/landlord/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPropertiesData(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  // Fetch properties based on filters
  const fetchPropertiesData = async () => {
    setLoading(true);
    let url = `http://localhost:8081/properties/filter?`;

    // Append filters as query params
    if (filters.city) url += `city=${filters.city}&`;
    if (filters.minRent) url += `minRent=${filters.minRent}&`;
    if (filters.maxRent) url += `maxRent=${filters.maxRent}&`;
    if (filters.available !== "") url += `available=${filters.available}&`;
    if (filters.propertyType) url += `propertyType=${filters.propertyType}&`;
    if (filters.amenities.length > 0) url += `amenities=${filters.amenities.join(",")}&`;

    try {
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 200) {
        setProperties(response.data);
        // setPropertiesg(response.data);
        setFilteredProperties(response.data);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch properties on location change
  useEffect(() => {
    fetchPropertiesData();
  }, [location]);

  // Function to apply filters manually
  const applyFilters = () => {
    fetchPropertiesData();
  };

  return (
    <div className="properties-page">
      {/* Sticky Left Panel (Filters) */}
      <div className="filter-panel">
        <h3>Filter Properties</h3>
        <input
          type="text"
          placeholder="Search by City"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Rent"
          value={filters.minRent}
          onChange={(e) => setFilters({ ...filters, minRent: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Rent"
          value={filters.maxRent}
          onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
        />

        {/* Availability Filter */}
        <select
          value={filters.available}
          onChange={(e) => setFilters({ ...filters, available: e.target.value })}
        >
          <option value="">Availability</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>

        {/* Property Type Filter */}
        <select
          value={filters.propertyType}
          onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
        >
          <option value="">Property Type</option>
          <option value="Furnished">Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
          <option value="SemiFurnished">Semi-Furnished</option>
        </select>

        {/* Amenities Filter (Checkbox) */}
        <div className="amenities-filter">
          {["WiFi", "Parking", "Gym"].map((amenity) => (
            <label key={amenity}>
              <input
                type="checkbox"
                value={amenity}
                checked={filters.amenities.includes(amenity)}
                onChange={(e) => {
                  const selectedAmenities = filters.amenities.includes(e.target.value)
                    ? filters.amenities.filter((a) => a !== e.target.value)
                    : [...filters.amenities, e.target.value];
                  setFilters({ ...filters, amenities: selectedAmenities });
                }}
              />
              {amenity}
            </label>
          ))}
        </div>

        <button onClick={applyFilters} className="apply-filter-btn">
          Apply Filters
        </button>
      </div>

      {/* Right Panel - Properties List */}
      <div className="properties-container">
        <h2 className="title">Explore Properties</h2>

        {loading ? (
          <div className="loading">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="no-properties">No properties available</div>
        ) : (
          <div className="property-grid">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                deleteProperty={() => deleteProperty(property.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesList;
