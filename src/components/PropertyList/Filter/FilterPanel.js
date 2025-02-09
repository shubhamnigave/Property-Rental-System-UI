// import React from 'react';

// const FilterPanel = ({ filters, setFilters, applyFilters, clearFilters }) => {
//   return (
//     <div className="card p-4 mb-4">
//       <h3 className="card-title mb-3">Filter Properties</h3>
      
//       {/* Search by City */}
//       <div className="mb-3">
//         <input
//           type="text"
//           placeholder="Search by City"
//           className="form-control"
//           value={filters.city}
//           onChange={(e) => setFilters({ ...filters, city: e.target.value })}
//         />
//       </div>

//       {/* Rent Range */}
//       <div className="row mb-3">
//         <div className="col-md-6 mb-2">
//           <input
//             type="number"
//             placeholder="Min Rent"
//             className="form-control"
//             value={filters.minRent}
//             onChange={(e) => setFilters({ ...filters, minRent: e.target.value })}
//           />
//         </div>
//         <div className="col-md-6 mb-2">
//           <input
//             type="number"
//             placeholder="Max Rent"
//             className="form-control"
//             value={filters.maxRent}
//             onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
//           />
//         </div>
//       </div>

//       {/* Availability Filter */}
//       <div className="mb-3">
//         <select
//           className="form-select"
//           value={filters.available}
//           onChange={(e) => setFilters({ ...filters, available: e.target.value })}
//         >
//           <option value="">Availability</option>
//           <option value="true">Available</option>
//           <option value="false">Not Available</option>
//         </select>
//       </div>

//       {/* Property Type Filter */}
//       <div className="mb-3">
//         <select
//           className="form-select"
//           value={filters.propertyType}
//           onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
//         >
//           <option value="">Property Type</option>
//           <option value="Furnished">Furnished</option>
//           <option value="Unfurnished">Unfurnished</option>
//           <option value="SemiFurnished">Semi-Furnished</option>
//         </select>
//       </div>

//       {/* Amenities Filter (Checkboxes) */}
//       <div className="mb-3">
//         <label className="form-label d-block">Amenities</label>
//         {["WiFi", "Parking", "Gym"].map((amenity) => (
//           <div className="form-check form-check-inline" key={amenity}>
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id={`amenity-${amenity}`}
//               value={amenity}
//               checked={filters.amenities.includes(amenity)}
//               onChange={(e) => {
//                 const selectedAmenities = filters.amenities.includes(e.target.value)
//                   ? filters.amenities.filter((a) => a !== e.target.value)
//                   : [...filters.amenities, e.target.value];
//                 setFilters({ ...filters, amenities: selectedAmenities });
//               }}
//             />
//             <label className="form-check-label" htmlFor={`amenity-${amenity}`}>
//               {amenity}
//             </label>
//           </div>
//         ))}
//       </div>

//       {/* Action Buttons */}
//       <div className="d-flex justify-content-end gap-2">
//         <button onClick={applyFilters} className="btn btn-primary">
//           Apply Filters
//         </button>
//         <button onClick={clearFilters} className="btn btn-secondary">
//           Clear Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterPanel;
import React from 'react';

const FilterPanel = ({ filters, setFilters, applyFilters, clearFilters }) => {
  return (
    <div className="d-flex flex-row align-items-center gap-3  p-3 mb-4 rounded flex-wrap">
      {/* <h3 className="mb-0 me-3">Filter Properties</h3> */}
      
      {/* Search by City */}
      <div className="d-flex align-items-center">
        <input
          type="text"
          placeholder="City"
          className="form-control form-control-sm"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
      </div>

      {/* Rent Range */}
      <div className="d-flex align-items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          className="form-control form-control-sm"
          style={{ width: '100px' }}
          value={filters.minRent}
          onChange={(e) => setFilters({ ...filters, minRent: e.target.value })}
        />
        <span>-</span>
        <input
          type="number"
          placeholder="Max"
          className="form-control form-control-sm"
          style={{ width: '100px' }}
          value={filters.maxRent}
          onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
        />
      </div>

      {/* Availability Filter */}
      <select
        className="form-select form-select-sm"
        style={{ width: '150px' }}
        value={filters.available}
        onChange={(e) => setFilters({ ...filters, available: e.target.value })}
      >
        <option value="">Availability</option>
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>

      {/* Property Type Filter */}
      <select
        className="form-select form-select-sm"
        style={{ width: '160px' }}
        value={filters.propertyType}
        onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
      >
        <option value="">Property Type</option>
        <option value="Furnished">Furnished</option>
        <option value="Unfurnished">Unfurnished</option>
        <option value="SemiFurnished">Semi-Furnished</option>
      </select>

      {/* Amenities Filter */}
      <div className="d-flex align-items-center gap-2">
        <label className="form-label mb-0">Amenities:</label>
        <div className="d-flex gap-2">
          {["WiFi", "Parking", "Gym"].map((amenity) => (
            <div className="form-check form-check-inline" key={amenity}>
              <input
                type="checkbox"
                className="form-check-input"
                id={`amenity-${amenity}`}
                value={amenity}
                checked={filters.amenities.includes(amenity)}
                onChange={(e) => {
                  const selectedAmenities = filters.amenities.includes(e.target.value)
                    ? filters.amenities.filter((a) => a !== e.target.value)
                    : [...filters.amenities, e.target.value];
                  setFilters({ ...filters, amenities: selectedAmenities });
                }}
              />
              <label className="form-check-label" htmlFor={`amenity-${amenity}`}>
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex align-items-center gap-2 ms-auto">
        <button onClick={applyFilters} className="btn btn-primary btn-sm">
          Apply
        </button>
        <button onClick={clearFilters} className="btn btn-secondary btn-sm">
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;