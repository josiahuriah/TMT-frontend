import React, { useEffect, useState } from "react";
import { getCars } from "../api";

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getCars();
      setCars(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Available Cars</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.name} ({car.model}) - ${car.price_per_day}/day
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
