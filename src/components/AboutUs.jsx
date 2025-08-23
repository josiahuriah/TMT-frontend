"use client";

import React from "react";
import { Button } from "./ui/button.jsx";
import { useNavigate } from "react-router-dom";
import TMTLogo from "/assets/logo3.png";
import { Car, Shield, Users, Award, MapPin, Clock } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <img src={TMTLogo} alt="TMT Coconut Cruisers Logo" className="hero-logo" />
          <h1 className="hero-title">TMT's Coconut Cruisers</h1>
          <p className="hero-subtitle">Your Island Adventure Starts Here</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <div className="mission-content">
            <p className="mission-text">
              At TMT's Coconut Cruisers, we're dedicated to providing hassle-free and exceptional car rental experiences. 
              Our mission is to offer a diverse fleet of well-maintained vehicles, paired with top-notch customer service, 
              to ensure seamless journeys and unforgettable adventures across the beautiful islands of the Bahamas.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Car />
              </div>
              <h3>Premium Fleet</h3>
              <p>Wide selection of well-maintained vehicles from economy to luxury options</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Shield />
              </div>
              <h3>Safe & Reliable</h3>
              <p>All vehicles undergo regular safety checks and maintenance</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Users />
              </div>
              <h3>Local Expertise</h3>
              <p>Our team knows the islands and can help plan your perfect journey</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Award />
              </div>
              <h3>Best Value</h3>
              <p>Competitive rates with no hidden fees and free additional driver</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="about-experience">
        <div className="container">
          <div className="experience-content">
            <div className="experience-text">
              <h2>Experience Island Life</h2>
              <p>
                With years of experience serving locals and visitors alike, we understand what makes 
                a perfect island adventure. From the pristine beaches of Long Island to the vibrant 
                streets of Nassau, our vehicles will take you there in comfort and style.
              </p>
              <div className="stats-grid">
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Vehicles Available</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Years of Service</span>
                </div>
              </div>
            </div>
            <div className="experience-image">
              <img src="/assets/banner2-img.png" alt="Our Fleet" />
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="about-location">
        <div className="container">
          <h2 className="section-title">Find Us</h2>
          <div className="location-grid">
            <div className="location-info">
              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <h4>Main Office</h4>
                  <p>Deadman's Cay, Long Island, Bahamas</p>
                </div>
              </div>
              <div className="info-item">
                <Clock className="info-icon" />
                <div>
                  <h4>Operating Hours</h4>
                  <p>Mon-Sat: 8:00 AM - 6:00 PM</p>
                  <p>Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
            <div className="map-placeholder">
              <img src="/assets/carousel3.jpeg" alt="Bahamas Location" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Adventure?</h2>
          <p className="cta-text">
            Book your perfect vehicle today and explore the islands with confidence.
          </p>
          <div className="cta-buttons">
            <Button
              className="cta-button primary"
              onClick={() => navigate("/rental")}
            >
              Book Now
            </Button>
            <Button
              className="cta-button secondary"
              variant="outline"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;