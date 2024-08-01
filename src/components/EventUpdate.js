import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EventUpdate.css";

const UpdateEvent = () => {
  const {EventID} = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    EventName: "",
    EventType: "",
    Location: "",
    EventDateTime: "",
    status: 0
  });

  useEffect(() => {
    axios.get(`http://localhost:5043/api/events`)
      .then(response => {
        const event = response.data.find(event => event.eventID === parseInt(EventID));
        if (event) {
          setEvent(event);
        } else {
          console.error('Event not found');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [EventID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get('http://localhost:5043/api/events')
      .then(response => {
        const eventToUpdate = response.data.find(event => event.eventID === parseInt(EventID));
        if (eventToUpdate) {
          axios.put(`http://localhost:5043/api/events/${EventID}`, event)
            .then(response => {
              console.log("Event updated:", response.data);
              navigate("/");
            })
            .catch(error => {
              console.error('Error updating event:', error);
            });
        } else {
          console.error('Event not found');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }; 
   const handleLoGoClick=()=>{
    navigate("/");
   }

  return (
    <div className="update-container">
      <div><header className="header">
        <img src={`${process.env.PUBLIC_URL}/logo-esbas.png`} onClick={handleLoGoClick} className="logo" alt="logo" />
      </header></div>
      <h2>Update Event</h2>
      {event ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              name="EventName"
              value={event.eventName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Event Type</label>
            <input
              type="text"
              name="EventType"
              value={event.eventType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="Location"
              value={event.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date and Time</label>
            <input
              type="text"
              name="EventDateTime"
              value={event.eventDateTime}
              onChange={handleChange}
              required
            />
          </div>
          <button onClick={handleSubmit} type="submit" className="save-button">Update Event</button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UpdateEvent;