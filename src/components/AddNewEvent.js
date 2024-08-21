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
  const [eventDateTime, setEventDateTime] = useState("");
 // const [l_ID, setL_ID] = useState("");
  //const [t_ID, setT_ID] = useState("");

  const navigate = useNavigate();

  const handleSave = async () => {
    // Boş alan kontrolü
    if (!eventName || !eventType || !location || !eventDateTime /*|| !l_ID || !t_ID*/) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    const newEvent = {
      name: eventName, // DTO'da küçük harfle "name" olarak tanımlı
      t_id: eventType, 
      l_id: location,
      eventDateTime: eventDateTime,
    //  l_ID: parseInt(l_ID), // ID değerlerini integer olarak gönderiyoruz
      //t_ID: parseInt(t_ID), // ID değerlerini integer olarak gönderiyoruz
    };

    console.log(newEvent);

    await axios.post('https://localhost:7282/EventsDTO', newEvent)
      .then(response => {
        console.log('Event added successfully:', response.data);
        // Formu sıfırlama veya başka bir sayfaya yönlendirme
        setEventName("");
        setEventType("");
        setLocation("");
        setEventDateTime("");
        //setL_ID("");
        //setT_ID("");

        navigate("/");
      })
      .catch(error => {
        console.error('There was an error adding the event!', error);
      });
  };
  
  const handleEventTypeChange = (e) => {
    setEventType(parseInt(e.target.value)); 
  };
  const handleEventLocationChange = (e) => {
    setLocation(parseInt(e.target.value)); 
  };
  

  const handleIconClick = (path) => {
    navigate(path);
  };

  const handleLoGoClick = () => {
    navigate("/");
  };

  return (
    <div className="add-new-event-container">
      <header className="header">
        <img src="./logo-esbas.png" onClick={handleLoGoClick} className="logo" alt="logo" />
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
              icon={faCog}
              onClick={() => handleIconClick('/add-new-event/event-type')}
              className="icon"
            />
          </label>
          <select value={eventType} onChange={handleEventTypeChange}>
        <option value="">Seçiniz</option>
        <option value="1">Konferans</option>
        <option value="2">Webinar</option>
        <option value="3">Toplantı</option>
        <option value="4">Atölye</option>
        <option value="5">Parti</option>
        <option value="6">Gezi</option>
      </select>
        </div>
        <div className="form-group">
          <label>Konum
            <FontAwesomeIcon
              icon={faCog}
              onClick={() => handleIconClick('/add-new-event/event-location')}
              className="icon"
            />
          </label>
          <select value={location} onChange={handleEventLocationChange}>
            <option value="">Seçiniz</option>
            <option value="1">Toplantı Salonu</option>
            <option value="2">Bahçe</option>
            <option value="3">İzmir</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date and Time</label>
          <input
            type="datetime-local" 
            name="eventDateTime"
            value={eventDateTime}
            onChange={(e) => setEventDateTime(e.target.value)} 
            required
          />
        </div>
        <button onClick={handleSave}>Kaydet</button>
      </div>
    </div>
  );
};

export default AddNewEvent;
