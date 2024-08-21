import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import "./ParticipantList.css";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { Cascader } from 'antd';

const ParticipantList = () => {
    const { EventID } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]); // Tüm kullanıcıları tutmak için ek state
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]); // Seçilen kategorileri tutmak için state

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user events and users
                const [eventsUsersResponse, usersResponse] = await Promise.all([
                     await axios.get(`https://localhost:7282/Events_UsersDTO/${EventID}`),
                    axios.get('https://localhost:7282/UsersDTO')
                ]);

                // Create a map for Events_Users
                const eventsUsersMap = eventsUsersResponse.data.reduce((map, item) => {
                    if (!map[item.eventID]) {
                        map[item.eventID] = [];
                    }
                    map[item.eventID].push(item.UserID);
                    return map;
                }, {});

                // Get the list of users for the selected event
                const updatedUsers = usersResponse.data.filter(user =>
                    (eventsUsersMap[EventID] || []).includes(user.ID)
                );
                console.log("Filtered Users: ", updatedUsers);

                setAllUsers(updatedUsers); // Tüm kullanıcıları saklayın
                setUsers(updatedUsers); // Filtrelenmemiş kullanıcıları saklayın
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [EventID]);

    const deleteUser = async (userID) => {
        console.log('Deleting user with ID:', userID); // Bu satırı ekleyin
        try {
            // Kullanıcıyı veritabanından sil
            await axios.delete(`https://localhost:7282/UsersDTO/${userID}`);

            // Kullanıcıyı etkinlikten sil (optional, eğer ilişkiyi de kaldırmak istiyorsanız)
            await axios.delete(`https://localhost:7282/Events_UsersDTO/${EventID}/${userID}`);

            // Kullanıcıyı state'den kaldır
            setUsers((prevUsers) => prevUsers.filter(user => user.ID !== userID));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

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
    };

    const options = [  //Kategoriler
        {
            label: 'Ad Soyad',
            value: 'ad-soyad',
        },
        {
            label: 'Doğum Tarihi',
            value: 'dogum-tarihi',
        },
        {
            label: 'Email',
            value: 'email',
        },
        {
            label: 'Personel Sicil No',
            value: 'personel-sicil-no',
        },
        {
            label: 'İşe Giriş Tarihi',
            value: 'ise-giris-tarihi',
        },
        {
            label: 'Masraf Merkezi',
            value: 'masraf-merkezi',
        },
        {
            label: 'Çalıştığı Birim',
            value: 'çalıştığı-birim',
        },
        {
            label: 'Görevi',
            value: 'görevi',
        },
        {
            label: 'Telefonu',
            value: 'telefonu',
        },
        {
            label: 'Ana Nitelik',
            value: 'ana-nitelik',
            children: [
                {
                    label: 'Çalışma Şekli',
                    value: 'çalışma-şekli',
                },
                {
                    label: 'Personel Tipi',
                    value: 'personel-tipi',
                },
                {
                    label: 'Tehlike Tipi',
                    value: 'tehlike-tipi',
                },
            ],
        },
        {
            label: 'Diğer Nitelik',
            value: 'diğer-nitelik',
            children: [
                {
                    label: 'Eğitim Durumu',
                    value: 'eğitim-durumu',
                },

            ],
        },

    ];

    const handleCategoryChange = (value) => {
        setSelectedCategories(value);
        filterUsers(value);
    };

    const filterUsers = (categories) => {
        if (categories.length === 0) {
            setUsers(allUsers);
            
            return;
        }
        console.log(allUsers);
        const filteredUsers = allUsers.filter(user => {
            return categories.every(category => {
                return Object.keys(user).some(key => {
                    return user[key].toString().toLowerCase().includes(category.toLowerCase());
                });
            });
        });

        setUsers(filteredUsers);
    };

    return (
        <div className="container">
            <header className="header">
                <img src={`${process.env.PUBLIC_URL}/logo-esbas.png`} onClick={handleLoGoClick} alt="ESBAŞ Logo" className="logo" />
            </header>
            <div className="participant-list">
                <div className="toolbar">
                    <Cascader
                        className="Cascader"
                        placeholder="Kategori Seçin..."
                        options={options}
                        onChange={handleCategoryChange}
                        multiple
                        maxTagCount="responsive"
                    />
                    <button className="excel-button" onClick={exportToExcel}>
                        Excel'e Aktar
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
                                            <button className="delete-button" onClick={() => deleteUser(user.ID)}>
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



// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { FaTrashAlt } from "react-icons/fa";
// import "./ParticipantList.css";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import axios from 'axios';
// import { Cascader } from 'antd';

// const ParticipantList = () => {
//     const { EventID } = useParams();
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch user events and users
//                 const [eventsUsersResponse, usersResponse] = await Promise.all([
//                     axios.get('https://localhost:7282/Events_UsersDTO'),
//                     axios.get('https://localhost:7282/UsersDTO')
//                 ]);

//                 // Create a map for Events_Users
//                 const eventsUsersMap = eventsUsersResponse.data.reduce((map, item) => {
//                     if (!map[item.eventID]) {
//                         map[item.eventID] = [];
//                     }
//                     map[item.eventID].push(item.UserID);
//                     return map;
//                 }, {});

//                 // Get the list of users for the selected event
//                 const updatedUsers = usersResponse.data.filter(user =>
//                     (eventsUsersMap[EventID] || []).includes(user.ID)
//                 );
//                 console.log("Filtered Users: ",updatedUsers);

//                 setUsers(updatedUsers);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [EventID]);

//     const deleteUser = async (userID) => {
//         console.log('Deleting user with ID:', userID); // Bu satırı ekleyin
//         try {
//             // Kullanıcıyı veritabanından sil
//             await axios.delete(`https://localhost:7282/UsersDTO/${userID}`);

//             // Kullanıcıyı etkinlikten sil (optional, eğer ilişkiyi de kaldırmak istiyorsanız)
//             await axios.delete(`https://localhost:7282/Events_UsersDTO/${EventID}/${userID}`);

//             // Kullanıcıyı state'den kaldır
//             setUsers((prevUsers) => prevUsers.filter(user => user.ID !== userID));
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(users);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Katılımcılar");
//         const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//         const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//         saveAs(blob, 'katilimci-listesi.xlsx');
//     };

//     const handleLoGoClick = () => {
//         navigate("/");
//     };

//     const options = [
//         {
//             label: 'Ad Soyad',
//             value: 'ad-soyad',
//         },
//         {
//             label: 'Doğum Tarihi',
//             value: 'dogum-tarihi',
//         },
//         {
//             label: 'Email',
//             value: 'email',
//         },
//         {
//             label: 'Personel Sicil No',
//             value: 'personel-sicil-no',
//         },
//         {
//             label: 'İşe Giriş Tarihi',
//             value: 'ise-giris-tarihi',
//         },
//         {
//             label: 'Masraf Merkezi',
//             value: 'masraf-merkezi',
//         },
//         {
//             label: 'Çalıştığı Birim',
//             value: 'çalıştığı-birim',
//         },
//         {
//             label: 'Görevi',
//             value: 'görevi',
//         },
//         {
//             label: 'Telefonu',
//             value: 'telefonu',
//         },
//         {
//             label: 'Ana Nitelik',
//             value: 'ana-nitelik',
//             children: [
//                 {
//                     label: 'Çalışma Şekli',
//                     value: 'çalışma-şekli',
//                 },
//                 {
//                     label: 'Personel Tipi',
//                     value: 'personel-tipi',
//                 },
//                 {
//                     label: 'Tehlike Tipi',
//                     value: 'tehlike-tipi',
//                 },
//             ],
//         },
//         {
//             label: 'Diğer Nitelik',
//             value: 'diğer-nitelik',
//             children: [
//                 {
//                     label: 'Eğitim Durumu',
//                     value: 'eğitim-durumu',
//                 },

//             ],
//         },
//     ];
//     const onChange = (value) => {
//         console.log(value);
//     };

//     return (
//         <div className="container">
//             <header className="header">
//                 <img src={`${process.env.PUBLIC_URL}/logo-esbas.png`} onClick={handleLoGoClick} alt="ESBAŞ Logo" className="logo" />
//             </header>
//             <div className="participant-list">
//                 <div className="toolbar">
//                     <Cascader
//                         className="Cascader"
//                         placeholder="Kategori Seçin..."
//                         options={options}
//                         onChange={onChange}
//                         multiple
//                         maxTagCount="responsive"
//                     />
//                     <button className="excel-button" onClick={exportToExcel}>
//                         +Excel'e Aktar
//                     </button>
//                 </div>
//                 <h2> Katılımcı Listesi </h2>
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <div className="participants">
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th> # </th>
//                                     <th> Ad Soyad </th>
//                                     <th> ID </th>
//                                     <th> Departman </th>
//                                     <th> Konum </th>
//                                     <th> Cinsiyet </th>
//                                     <th> İşlemler</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.map((user, index) => (
//                                     <tr key={user.ID}>
//                                         <td> {index + 1} </td>
//                                         <td> {user.fullName} </td>
//                                         <td> {user.userID} </td>
//                                         <td> {user.department} </td>
//                                         <td> {user.isOfficeEmployee} </td>
//                                         <td> {user.gender} </td>
//                                         <td>
//                                             <button className="delete-button" onClick={() => deleteUser(user.ID)}>
//                                                 <FaTrashAlt />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//                 <Link to={`/add-new-participant/${EventID}`} className="add-button">
//                     Yeni Katılımcı
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default ParticipantList;





// datas filtereldatas 
// selectedfield listesi aç 
// seçilen alanları bu listeye ekle 
