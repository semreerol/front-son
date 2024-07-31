import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import "./EventList.css";

const EventList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      // Promise.all kullanılmasına gerek yok çünkü sadece bir istek yapılıyor
      const response = await axios.get(`http://localhost:5043/api/events`);
      // Tek bir istek olduğu için direkt response.data kullanılabilir
      console.log(response.data);
      setEvents(response.data);
      //console.log(events);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);



  const handleParticipantClick = (EventID) => {
    navigate(`/participant-list/${EventID}`);
  };

  const handleStartClick = (EventID) => {
    navigate(`/card-reader/${EventID}`);
  };

  const handleYeniEtkinlik = () => {
    navigate("/add-new-event");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.Name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <div className="logo-container">
          <img src="./logo-esbas.png" alt="ESBAŞ Logo" className="logo" />
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="ARA"
            className="search-bar"
            value={searchTerm}
            onChange={handleSearchChange}
            name="searchTerm"
            id="searchTerm"
          />
          <button onClick={handleYeniEtkinlik} className="new-event-button">
            +YENİ ETKİNLİK
          </button>
        </div>
      </header>
      <div className="App">
        <table>
          <thead>
            <tr>
              <th >#</th>
              <th>ETKİNLİK ADI</th>
              <th>ETKİNLİK TİPİ</th>
              <th>KONUM</th>
              <th>ZAMAN</th>
              <th></th>
              <th></th>

            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.eventID}>
                <td >{event.eventID}</td>
                <td>{event.name}</td>
                <td>{event.type}</td>
                <td>{event.location}</td>
                <td>{event.eventDateTime}</td>

                <td>
                  {event.button === "Katılımcı Listesi" ? (
                    <button
                      className="katilimci-butonu"
                      onClick={() => handleParticipantClick(event.eventID)}
                    >
                      Katılımcı Listesi
                    </button>
                  ) : (
                    <button
                      className="baslat-butonu"
                      onClick={() => handleStartClick(event.eventID)}
                    >
                      Başlat
                    </button>
                  )}
                </td>
                <td>
                  <button className="update-button">
                    <FaEdit />
                  </button>
                  <button className="delete-button">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;
