import React from "react";
// import Navbar from "../Navbar/Navbar";
import { FaSearch, FaBuilding, FaUsers, FaHandshake, FaArrowRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css"; 

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center text-white text-center">
        <div className="container">
          <h1 className="display-3 fw-bold">Find Your Perfect Home</h1>
          <p className="lead">Explore premium properties with ease and confidence.</p>
          <div className="input-group search-bar mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search by city, landmark..."
            />
            <button className="btn btn-warning">
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Why Choose Us?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow h-100">
                <div className="card-body">
                  <FaBuilding className="display-4 text-primary mb-3" />
                  <h4 className="fw-bold">Wide Range of Listings</h4>
                  <p>Choose from a variety of verified properties.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow h-100">
                <div className="card-body">
                  <FaUsers className="display-4 text-success mb-3" />
                  <h4 className="fw-bold">Trusted by Thousands</h4>
                  <p>Join a community of happy homeowners.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow h-100">
                <div className="card-body">
                  <FaHandshake className="display-4 text-danger mb-3" />
                  <h4 className="fw-bold">Hassle-Free Process</h4>
                  <p>Simplified buying and renting experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="cta-section py-5 bg-dark text-white text-center">
        <div className="container">
          <h2 className="fw-bold">Start Your Search Today!</h2>
          <p className="lead">Discover homes that match your lifestyle.</p>
          <button className="btn btn-warning btn-lg mt-3">
            Get Started <FaArrowRight className="ms-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer text-center py-3 bg-light">
        <div className="container">
          <p className="mb-0">&copy; 2025 PropertyFinder. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
