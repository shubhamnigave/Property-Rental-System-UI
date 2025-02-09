import React from 'react';

const HomePage = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
        minHeight: '100vh',
      }}
    >
      {/* Carousel Section */}
      <div id="homepageCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#homepageCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#homepageCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#homepageCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
             height={600}
             width={1920}
              src='../../../images/slide1.jpeg'
              className="d-block w-100"
              alt="Slide 1"
            />
          </div>
          <div className="carousel-item">
            <img
            height={600}
            width={1920}
              src="../../../images/slide2.jpeg"
              className="d-block w-100"
              alt="Slide 2"
            />
          </div>
          <div className="carousel-item">
            <img
             height={600}
             width={1920}
              src="../../../images/slide3.jpeg"
              className="d-block w-100"
              alt="Slide 3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homepageCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homepageCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Main Content */}
      <div
        className="container text-center mt-5"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '800px',
          marginBottom: '2rem',
        }}
      >
        <h1 className="fw-bold mb-3 text-dark">Find Your Perfect Rental in Pune</h1>

        {/* Search Section */}
        <div className="d-flex justify-content-center my-3">
          <input
            type="text"
            className="form-control w-50 p-2 shadow-sm border-secondary"
            placeholder="Search for locality, landmark, or project"
          />
          <button className="btn btn-secondary ms-2 px-4">Search</button>
        </div>

        {/* Popular Rental Areas */}
        <h4 className="fw-semibold mt-4 text-secondary">Popular Rental Areas</h4>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
          {['Wakad', 'Baner', 'Kothrud', 'Hadapsar', 'Kharadi'].map((area) => (
            <span
              key={area}
              className="badge bg-light text-dark p-3 shadow-sm border border-secondary"
            >
              {area}
            </span>
          ))}
        </div>

        {/* Curated Rental Picks */}
        <div className="d-flex flex-column align-items-center mt-5">
          <h4 className="fw-semibold text-dark">Curated Rental Picks</h4>
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
            <button className="btn btn-outline-secondary px-4 py-2">
              🏡 Explore premium rental properties
            </button>
            <button className="btn btn-outline-secondary px-4 py-2">
              🌿 Affordable and luxury options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


