"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";

const SmallCarCards = () => {
    const [carCards, setCarCards] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchCars = async () => {
        try {
          const response = await fetch(`http://localhost:4000/cars`);
          const data = await response.json();
          setCarCards(data);
        } catch (error) {
          console.error("Error fetching cars:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCars();
    }, []);
  
    if (loading) {
      return <p>Loading cars...</p>;
    }
  
    return (
      <div>
        <h2 className="small-car-cards-title">Select a vehicle class</h2>
        <div className="car-cards">
            {carCards.map((car) => (
                <Card key={car.id} className='small-car-card'>
                    <img src={car.image} alt={car.title}  className="small-car-image"/>
                    <div>
                        <CardHeader className="small-car-header">
                            <CardTitle className="small-car-title">{car.title}</CardTitle>
                            <CardDescription className="small-car-subtitle">{car.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="car-container">
                            <p className="small-car-rate">${car.rate}<br></br><span className="small-car-subrate">+Tax Daily</span></p>
                        </CardContent>
                        <CardFooter>
                        </CardFooter>
                    </div>
                </Card>
            ))}
            </div>
      </div>
    );
  };
  
  export default SmallCarCards;