import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventLocation.css";
// import logo from "../logo-esbas.png";

function EventLocation() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([
    "Toplantı Salonu",
    "Bahçe",
    "İzmir",
  ]);
  const [newLocation, setNewLocation] = useState("");

  const addLocation = () => {
    if (newLocation.trim()) {
      setLocations([...locations, newLocation.trim()]);
      setNewLocation("");
    }
  };

  const deleteLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index));
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <div className="container">
      <header className="header">
        {" "}
        {
          <img
            src=/*{logo} "./logo-esbas.png"*/ {`${process.env.PUBLIC_URL}/logo-esbas.png`}
            onClick={handleLogoClick}
            className="logo"
            alt="logo"
          />
        }{" "}
      </header>{" "}
      <h2> ETKİNLİK KONUM </h2>{" "}
      <ul className="location-list">
        {" "}
        {locations.map((location, index) => (
          <li key={index} className="location-item">
            {" "}
            {index + 1} {location}{" "}
            <button
              onClick={() => deleteLocation(index)}
              className="delete-button"
            >
              🗑️
            </button>{" "}
          </li>
        ))}{" "}
      </ul>{" "}
      <div className="input-container">
        <input
          type="text"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder="Yeni Konum Yazınız"
          className="input-field"
        />
        <button onClick={addLocation} className="add-button">
          + Yeni Konumu Ekle
        </button>{" "}
      </div>{" "}
      <button className="save-button"> KAYDET </button>{" "}
    </div>
  );
}

export default EventLocation;