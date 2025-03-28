"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel.jsx";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import Autoplay from "embla-carousel-autoplay";

const carouselData = [
  {
    id: 1,
    bannertitle: "Cruise carefree, Explore endlessly",
    bannersubtitle: "With our wide range of well maintained vehicles",
    image: "/assets/carousel1.jpeg", 
  },
  {
    id: 2,
    bannertitle: "Vacation in Paradise",
    bannersubtitle: "Ride in Style",
    image: "/assets/carousel2.jpeg",
  },
  {
    id: 3,
    bannertitle: "Stressfree Consignment",
    bannersubtitle: "Coming Soon",
    image: "/assets/carousel3.jpeg",
  },
];

const CarouselComponent = () => {
  const [carCards] = useState(carouselData); 

  

  return (
    <div>
      <h2 className="banner1">Your Island's Ultimate Stop for Car Rentals, Stays and more!</h2>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {carCards.map((carousel) => (
            <CarouselItem key={carousel.id}>
              <Card
                className="carousel"
                style={{ "--bg-image": `url(${carousel.image})` }}
              >
                <div className="overlay"></div>
                <CardHeader className="carousel-text-content">
                  <CardTitle className="carousel-text-title">{carousel.bannertitle}</CardTitle>
                  <CardDescription className="bannersubtitle">
                    {carousel.bannersubtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div></div>
                </CardContent>
                <CardFooter>
                  <Button>Book Now</Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;