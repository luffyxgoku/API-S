import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const handleLatChange = (event) => {
    setLat(event.target.value);
  };

  const handleLongChange = (event) => {
    setLong(event.target.value);
  };

  const getWeatherDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=93da636a681168af6af9c21d7e68f897`
      );
      // console.log(response);
      setWeatherDetails(response.data);
    } catch (err) {
      console.log("Error fetching the weather:", err);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Weather API </h1>
      <input
        type="number"
        value={lat}
        placeholder="latitude"
        onChange={handleLatChange}
      />
      <input
        type="number"
        value={long}
        placeholder="longitude"
        onChange={handleLongChange}
      />

      <button onClick={getWeatherDetails}>Show Weather</button>

      {weatherDetails && (
        <div style={{ textAlign: "center" }}>
          <p>Latitude: {weatherDetails.coord.lat}</p>
          <p>Longitude: {weatherDetails.coord.lon}</p>
          <p>Temperature: {Math.trunc(+weatherDetails.main.temp - 273)}C</p>
          <p>Weather: {weatherDetails.weather[0].description}</p>
          <p>Geological Name: {weatherDetails.name || "Can not locate"}</p>
        </div>
      )}
    </>
  );
}
