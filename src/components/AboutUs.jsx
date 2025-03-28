"use client";

import React from "react";
import { Button } from "./ui/button.jsx";
import { useNavigate } from "react-router-dom";
import TMTLogo from "/assets/logo3.png"; // Adjust path if different

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us">
      <header className="about-header">
        <img src={TMTLogo} alt="TMT Coconut Cruisers Logo" className="about-logo" />
        <h1 className="about-title">About TMT’s Coconut Cruisers</h1>
      </header>

      <section className="about-mission">
        <h2 className="mission-title">Our Mission</h2>
        <p className="mission-text">
          At TMT’s Coconut Cruisers, we’re dedicated to providing hassle-free and exceptional car rental experiences. Our mission is to offer a diverse fleet of well-maintained vehicles, paired with top-notch customer service, to ensure seamless journeys and unforgettable adventures across the islands.
        </p>
      </section>

      

      <section className="about-cta">
        <h2 className="cta-title">Ready to Explore?</h2>
        <p className="cta-text">
          Join us today and experience the freedom of the open road with TMT’s Coconut Cruisers.
        </p>
        <Button
          className="cta-button"
          onClick={() => navigate("/rental")}
        >
          Book Now
        </Button>
      </section>
    </div>
  );
};

export default AboutUs;