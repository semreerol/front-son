import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function Plist() {
    const [datas, setDatas] = useState([]);
    const { eventID } = useParams();
    const [filteredData, setFilteredDatas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7282/Events_UsersDTO/${eventID}`);
                setDatas(response.data); // API'den gelen veriyi state'e kaydet
                setFilteredDatas(response.data); // Filtrelenmiş veriyi state'e kaydet
                console.log(response.data);
            } catch (err) {
                setError(err); // Hata varsa error state'ine kaydet
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const columns = [
        { headerName: "Ad Soyad", field: "fullName" },
        { headerName: "Doğum Tarihi", field: "dateOfBirth" },
        { headerName: "Email Adresi", field: "mailAddress" },
        { headerName: "Personel Sicil No", field: "userRegistrationID" },
        { headerName: "Departman-Masraf Merkezi", field: "departmentID" },
        { headerName: "Telefon Numarası", field: "phoneNumber" },
        { headerName: "İşe Giriş Tarihi", field: "hireDate" },
        { headerName: "Cinsiyet", field: "g_ID" },  // Cinsiyet ID'si olduğunu varsayıyorum
        { headerName: "Ana-Çalışma Şekli", field: "mC_ID" }, // Ana Çalışma Şekli ID'si olduğunu varsayıyorum
        { headerName: "Ana-Tehlike Türü", field: "oC_ID" },  // Ana Tehlike Türü ID'si olduğunu varsayıyorum
        { headerName: "Ana-Çalışma Alanı", field: "mainWorkingMethod" }, // Başka bir Response'dan alan
        { headerName: "Diğer-Eğitim Durumu", field: "educationalStatus" },  // Başka bir Response'dan alan
    ];

    const tableRows=[];
    datas.array.forEach(EventUsers => {
        tableRows.push(
            <tr key={EventUsers.cardID.fullname}>
                <td>{EventUsers.dateOfBirth}</td>
                <td>{EventUsers.mailAddress}</td>
                {/* <td>{EventUsers.cardID.userRegistrationID	}</td> */}
                <td>{EventUsers}</td>

            </tr>
        );
        
    });

    const defaultColDef = {
        sortable: true,
        editable: false,
        filter: true,
        floatingFilter: true,
        flex: 1
    };

    let gridApi;
    const onGridReady = params => {
        gridApi = params.api;
    };

    const onExportClick = () => {
        if (gridApi) {
            gridApi.exportDataAsCsv();
        } else {
            console.error("Grid API'si ayarlanmadı");
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>React-App</h1>
            <button onClick={onExportClick}>Export to CSV</button>
            <div id="myGrid" className="ag-theme-alpine grid-container">
                <AgGridReact
                    rowData={filteredData}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    );
}

export default Plist;
