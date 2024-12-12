// import React, { useState, useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// export default function Map() {
//   const [lat, setLat] = useState(22);
//   const [long, setLong] = useState(44);
//   const [enable, setEnable] = useState(false);
//   const mapRef = useRef(null);

//   const handleLatitudeChange = (event) => {
//     setLat(event.target.value);
//   };

//   const handleLongitudeChange = (event) => {
//     setLong(event.target.value);
//   };

//   const showMap = () => {
//     if (!mapRef.current) {
//       // Initialize the map only once
//       const map = L.map("map").setView([lat, long], 15);

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "© OpenStreetMap contributors",
//       }).addTo(map);

//       const marker = L.marker([lat, long])
//         .addTo(map)
//         .bindPopup("Testing Marker")
//         .openPopup();

//       // Store the map instance in the ref
//       mapRef.current = map;
//       mapRef.current.marker = marker; // Store the marker for later updates
//     } else {
//       // Update the map's view and marker position if map is already initialized
//       mapRef.current.setView([lat, long], 15);
//       mapRef.current.marker.setLatLng([lat, long]);
//     }
//     setEnable((prev) => !prev);
//   };

//   useEffect(() => {
//     showMap();
//   }, [enable]);

//   return (
//     <>
//       <input
//         type="number"
//         placeholder="latitude"
//         value={lat}
//         onChange={handleLatitudeChange}
//       />
//       <input
//         type="number"
//         placeholder="longitude"
//         value={long}
//         onChange={handleLongitudeChange}
//       />
//       <button onClick={showMap}>Submit</button>
//       <div id="map" style={{ height: "100vh", width: "100%" }} />
//     </>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const [lat, setLat] = useState(22); // Default latitude
  const [long, setLong] = useState(44); // Default longitude
  const [showMapState, setShowMapState] = useState(false); // Controls when to show the map
  const mapRef = useRef(null); // Reference to store the map instance

  const handleLatitudeChange = (event) => {
    setLat(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLong(event.target.value);
  };

  const handleSubmit = () => {
    setShowMapState(true); // Trigger map rendering when the button is clicked
  };

  const showMap = () => {
    if (showMapState && !mapRef.current) {
      // Initialize the map only once when showMapState is true
      const map = L.map("map").setView([lat, long], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const marker = L.marker([lat, long])
        .addTo(map)
        .bindPopup("Testing Marker")
        .openPopup();

      // Store the map and marker instances in the ref
      mapRef.current = map;
      mapRef.current.marker = marker;
    } else if (showMapState) {
      // Update the map's view and marker position if map is already initialized
      mapRef.current.setView([lat, long], 15);
      mapRef.current.marker.setLatLng([lat, long]);
    }
  };

  useEffect(() => {
    if (showMapState) {
      showMap();
    }
  }, [showMapState, lat, long]); // Only update when lat, long, or showMapState changes

  return (
    <>
      <input
        type="number"
        placeholder="Latitude"
        value={lat}
        onChange={handleLatitudeChange}
      />
      <input
        type="number"
        placeholder="Longitude"
        value={long}
        onChange={handleLongitudeChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div id="map" style={{ height: "100vh", width: "100%" }} />
    </>
  );
}
