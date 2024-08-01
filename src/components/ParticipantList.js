//participantlist.js
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import "./ParticipantList.css";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { Cascader } from 'antd';


const ParticipantList = () => {
    const { EventID } = useParams(); // Correctly destructuring to get EventID  
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user events and users
                const [eventsUsersResponse, usersResponse] = await Promise.all([
                    axios.get('http://localhost:5043/api/eventsusers'),
                    axios.get('http://localhost:5043/api/users')
                ]);
                console.log('EventsUsersResponse:', eventsUsersResponse.data);
                console.log('UsersResponse:', usersResponse.data);

                // Create a map for Events_Users
                const eventsUsersMap = eventsUsersResponse.data.reduce((map, item) => {
                    if (!map[item.eventID]) {
                        map[item.eventID] = [];
                    }
                    map[item.eventID].push(item.UserID);
                    return map;
                }, {});

                console.log('Events Users Map:', eventsUsersMap);
                console.log('Current Event ID:', EventID);
                console.log('User IDs for current event:', eventsUsersMap[EventID]);


                // Get the list of users for the selected event
                const updatedUsers = usersResponse.data.filter(user =>
                    (eventsUsersMap[EventID] || []).includes(user.ID)
                );

                console.log('Filtered Users:', updatedUsers);

                setUsers(updatedUsers);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [EventID]); // Re-fetch when EventID changes


    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Katılımcılar");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'katilimci-listesi.xlsx');
    };
    const handleLoGoClick = () => {
        navigate("/");
    }

    const options = [
        {
            label: 'Light',
            value: 'light',
        },

        {
            label: 'Bamboo',
            value: 'bamboo',

        },
    ];
    const onChange = (value) => {
        console.log(value);
    };


    return (
        <div className="container">
            <header className="header">
                <img src={`${process.env.PUBLIC_URL}/logo-esbas.png`} onClick={handleLoGoClick} alt="ESBAŞ Logo" className="logo" />
            </header>
            <div className="participant-list">

                <div className="toolbar">
                    {/* <select
            
            >
            <option value="">Seçiniz</option>
            <option value="">Seçiniz</option>
            <option value="">Seçiniz</option>
            <option value="">Seçiniz</option>
            <option value="">Seçiniz</option>
            <option value="">Seçiniz</option>
            <option value="">Seçiniz</option>

            </select> */}
                    <Cascader
                        className="Cascader"
                       
                        options={options}
                        onChange={onChange}
                        multiple
                        maxTagCount="responsive"
                    />
                    <button className="excel-button" onClick={exportToExcel}>
                        +Excel'e Aktar
                    </button>
                </div>
                <h2> Katılımcı Listesi </h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="participants">
                        <table>
                            <thead>
                                <tr>
                                    <th> # </th>
                                    <th> Ad Soyad </th>
                                    <th> ID </th>
                                    <th> Departman </th>
                                    <th> Konum </th>
                                    <th> Cinsiyet </th>
                                    <th> İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.ID}>
                                        <td> {index + 1} </td>
                                        <td> {user.fullName} </td>
                                        <td> {user.userID} </td>
                                        <td> {user.department} </td>
                                        <td> {user.isOfficeEmployee} </td>
                                        <td> {user.gender} </td>
                                        <td>

                                            <button className="delete-button">
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <Link to={`/add-new-participant/${EventID}`} className="add-button">
                    Yeni Katılımcı
                </Link>

            </div>
        </div>
    );
};

export default ParticipantList;

/*
import React from 'react';
import { Cascader } from 'antd';
const options = [
  {
    label: 'Light',
    value: 'light',
    
    })),
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    
  },
];
const onChange = (value) => {
  console.log(value);
};
const App = () => (
  <Cascader
    style={{
      width: '100%',
    }}
    options={options}
    onChange={onChange}
    multiple
    maxTagCount="responsive"
  />
);
export default App;
*/