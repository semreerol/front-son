import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddNewEvent.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const AddNewEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState(""); // Bu ID olacak
  const [eventLocation, setEventLocation] = useState(""); // Bu ID olacak
  const [eventDateTime, setEventDateTime] = useState("");
<<<<<<< HEAD
  const [eventTypes, setEventTypes] = useState([]); // Dinamik seçenekler için state
  const [locations, setLocations] = useState([]); // Dinamik seçenekler için state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventTypesAndLocations = async () => {
      try {
        const eventTypeResponse = await axios.get('https://localhost:7282/Event_TypeDTO');
        const locationResponse = await axios.get('https://localhost:7282/Event_LocationDTO');
        
        setEventTypes(eventTypeResponse.data); // Dinamik veriyi state'e kaydet
        setLocations(locationResponse.data); // Dinamik veriyi state'e kaydet
      } catch (error) {
        console.error("Error fetching event types or locations", error);
      }
    };

    fetchEventTypesAndLocations();
  }, []);
=======
 // const [l_ID, setL_ID] = useState("");
  //const [t_ID, setT_ID] = useState("");

  const navigate = useNavigate();

  const handleSave = async () => {
    // Boş alan kontrolü
    if (!eventName || !eventType || !location || !eventDateTime /*|| !l_ID || !t_ID*/) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
>>>>>>> 4cb33403359dea332c271cc42594eef85abc7025

  const handleSave = async () => {
    const newEvent = {
<<<<<<< HEAD
      Name: eventName,
      t_ID: eventType, // Burada Type ID gönderilecek
      l_ID: eventLocation, // Burada Location ID gönderilecek
      EventDateTime: eventDateTime,
     Status: true,
      Event_Status: true,
=======
      name: eventName, // DTO'da küçük harfle "name" olarak tanımlı
      t_id: eventType, 
      l_id: location,
      eventDateTime: eventDateTime,
    //  l_ID: parseInt(l_ID), // ID değerlerini integer olarak gönderiyoruz
      //t_ID: parseInt(t_ID), // ID değerlerini integer olarak gönderiyoruz
>>>>>>> 4cb33403359dea332c271cc42594eef85abc7025
    };

    console.log(newEvent);

    await axios.post('https://localhost:7282/EventsDTO', newEvent)
      .then(response => {
        console.log('Event added successfully:', response.data);
<<<<<<< HEAD

        setEventName("");
        setEventType("");
        setEventLocation("");
        setEventDateTime("");
=======
        // Formu sıfırlama veya başka bir sayfaya yönlendirme
        setEventName("");
        setEventType("");
        setLocation("");
        setEventDateTime("");
        //setL_ID("");
        //setT_ID("");
>>>>>>> 4cb33403359dea332c271cc42594eef85abc7025

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
<<<<<<< HEAD
          <select
            value={eventType} // Seçilen ID burada saklanacak
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="">Seçiniz</option>
            {eventTypes.map((type) => (
              <option key={type.t_ID} value={type.t_ID}>
                {type.name}
              </option>
            ))}
          </select>
=======
          <select value={eventType} onChange={handleEventTypeChange}>
        <option value="">Seçiniz</option>
        <option value="1">Konferans</option>
        <option value="2">Webinar</option>
        <option value="3">Toplantı</option>
        <option value="4">Atölye</option>
        <option value="5">Parti</option>
        <option value="6">Gezi</option>
      </select>
>>>>>>> 4cb33403359dea332c271cc42594eef85abc7025
        </div>

        <div className="form-group">
          <label>Konum
            <FontAwesomeIcon
              icon={faCog}
              onClick={() => handleIconClick('/add-new-event/event-location')}
              className="icon"
            />
          </label>
<<<<<<< HEAD
          <select
            value={eventLocation} // Seçilen ID burada saklanacak
            onChange={(e) => setEventLocation(e.target.value)}
          >
            <option value="">Seçiniz</option>
            {locations.map((location) => (
              <option key={location.l_ID} value={location.l_ID}>
                {location.name}
              </option>
            ))}
=======
          <select value={location} onChange={handleEventLocationChange}>
            <option value="">Seçiniz</option>
            <option value="1">Toplantı Salonu</option>
            <option value="2">Bahçe</option>
            <option value="3">İzmir</option>
>>>>>>> 4cb33403359dea332c271cc42594eef85abc7025
          </select>
        </div>

        <div className="form-group">
<<<<<<< HEAD
          <label>Tarih ve Saat</label>
          <input
            type="datetime-local"
            name="eventDateTime"
            value={eventDateTime}
            onChange={(e) => setEventDateTime(e.target.value)}
=======
          <label>Date and Time</label>
          <input
            type="datetime-local" 
            name="eventDateTime"
            value={eventDateTime}
            onChange={(e) => setEventDateTime(e.target.value)} 
>>>>>>> 4cb33403359dea332c271cc42594eef85abc7025
            required
          />
        </div>

        <button onClick={handleSave}>Kaydet</button>
      </div>
    </div>
  );
};

export default AddNewEvent;
