/*
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CardReader.css";

const sendEventData = async (data) => {
  try {
    await axios.post('http://localhost:7282/api/events', data);
  } catch (error) {
    throw new Error('Error sending data');
  }
};

function CardReader() {
  const navigate = useNavigate();
  const{ EventID } =useParams();
  const [cardInput, setCardInput] = useState("");

  const handleEndEvent = () => {
    navigate(`/event-ended/${EventID}`);
  };

  const handleManualEntry = () => {
    navigate(`/add-new-participant/${EventID}`);
  };

  const handleChange = (event) => {
    setCardInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Formun varsayılan davranışını engelle
    try {
      await sendEventData({ data: cardInput });
      console.log("Veri başarıyla gönderildi.");
      setCardInput(""); //Reset the input file
    } catch (error) {
      console.error("Veri gönderilirken bir hata oluştu:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="CardReader">
      <header className="header">
        <img src={"./logo-esbas.png"} className="logo" alt="logo" />
      </header>{" "}
      <div className="card-reader">
        <h1> ETKİNLİĞE HOŞGELDİNİZ </h1> <p> LÜTFEN KARTINIZI OKUTUNUZ! </p>
        <p> Etkinlik ID: {EventID} </p>
        <input
          autoFocus
          type="text"
          className="card-input"
          value={cardInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="buttons">
          <button
            type="primary"
            onClick={handleManualEntry}
            className="manual-entry"
          >
            MANUEL GİRİŞ{" "}
          </button>{" "}
          <button type="danger" onClick={handleEndEvent} className="end-event">
            ETKİNLİĞİ BİTİR{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default CardReader; */

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "./CardReader.css";

const sendUserEvent = async (eventUser) => {
  try {
    await axios.post('http://localhost:7282/api/eventsusers',  eventUser);
  } catch (error) {
    throw new Error('Error sending user event');
  }
};

const fetchUserByCardId = async (cardId) => {
  try {
    const response = await axios.get(`http://localhost:7282/api/users?UserID=${cardId}`);
    return response.data[0]; // Assuming the card ID is unique and returns a single user
  } catch (error) {
    throw new Error('Error fetching user by card ID');
  }
};

function CardReader() {
  const navigate = useNavigate();
  const {EventID} = useParams();
  const [cardInput, setCardInput] = useState("");

  const handleEndEvent = () => {
    navigate(`/event-ended/${EventID}`);
  };

  const handleManualEntry = () => {
    navigate(`/add-new-participant/${EventID}`);
  };

  const handleChange = (event) => {
    setCardInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Formun varsayılan davranışını engelle
    try {
      const user = await fetchUserByCardId(cardInput);
      if (user) {
        await sendUserEvent({ EventID: EventID, UserID: user.ID });

        console.log("Kullanıcı başarıyla etkinliğe eklendi.");
        message.success("Etkinliğe Katılımınız Başarıyla Gerçekleşti");
      } else {
        console.error("Kullanıcı bulunamadı.");
        message.error("Etkinliğe Kaydınız Oluşturulamadı!");
      }
      setCardInput(""); //Reset the input file
    } catch (error) {
      console.error("Kullanıcı eklenirken bir hata oluştu:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="CardReader">
      <header className="header">
        <img src={"./logo-esbas.png"} className="logo" alt="logo" />
      </header>
      <div className="card-reader">
        <h1> ETKİNLİĞE HOŞGELDİNİZ </h1>
        <p> LÜTFEN KARTINIZI OKUTUNUZ! </p>
        <p> Etkinlik ID: {EventID} </p>
        <input
          autoFocus
          type="text"
          className="card-input"
          value={cardInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="buttons">
          <button
            type="primary"
            onClick={handleManualEntry}
            className="manual-entry"
          >
            MANUEL GİRİŞ
          </button>
          <button type="danger" onClick={handleEndEvent} className="end-event">
            ETKİNLİĞİ BİTİR
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardReader;



