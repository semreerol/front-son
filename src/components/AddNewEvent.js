import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddNewEvent.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';


const AddNewEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");


  const navigate = useNavigate();


  const handleSave = () => {
    const newEvent = {
      Name: eventName,
      Type: eventType,
      Location: location,
      EventDateTime: time,
    };

    axios.post('http://localhost:5043/api/events', newEvent)
      .then(response => {
        console.log('Event added successfully:', response.data);//olmadı .data ekle
        // Optionally, you can reset the form or navigate to another page
        setEventName("");
        setEventType("");
        setLocation("");
        setTime("");

        navigate("/");
      })
      .catch(error => {
        console.error('There was an error adding the event!', error);
      });
  };

  const handleIconClick = (path) => {
    navigate(path);
  };

  return (
    <div className="add-new-event-container">
      <header className="header">
        <img src="./logo-esbas.png" className="logo" alt="logo" />
      </header>
      <div className="add-new-event">
        <h1>Yeni Etkinlik Oluşturma</h1>
        <div className="form-group">
          <label>Etkinlik Adı</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Yazınız"
          />
        </div>
        <div className="form-group">
          <label>Etkinlik Türü
          <FontAwesomeIcon
            icon = {faCog}
            onClick={() => handleIconClick('/add-new-event/event-type')}
            className="icon"
            />
          </label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="">Seçiniz</option>
            <option value="Konferans">Konferans</option>
            <option value="Webinar">Webinar</option>
            <option value="Toplantı">Toplantı</option>
            <option value="Atölye">Atölye</option>
            <option value="Parti">Parti</option>
            <option value="Gezi">Gezi</option>

          </select>
        </div>
        <div className="form-group">
          <label>Konum
          <FontAwesomeIcon
            icon = {faCog}
            onClick={() => handleIconClick('/add-new-event/event-location')}
            className="icon"
            />
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Seçiniz</option>
            <option value="Toplantı Salonu">Toplantı Salonu</option>
            <option value="Bahçe">Bahçe</option>
            <option value="İzmir">İzmir</option>
          </select>
        </div>
        <div className="form-group">
          <label>Zaman</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Yazınız"
          />
        </div>
        <button onClick={handleSave}>Kaydet</button>
      </div>
    </div>
  );
};

export default AddNewEvent;

