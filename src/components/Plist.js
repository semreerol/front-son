import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import "./Plist.css"; // Stil dosyanızı içe aktarın
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

function Plist() {
    const [datas, setDatas] = useState([]);
    const [filteredData, setFilteredDatas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // API URL'sini buraya ekleyin
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7282/Events_UsersDTO/${EventID}');
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
        { headerName: "Ad Soyad", field: "fullname" },
        { headerName: "Doğum Tarihi", field: "dateOfBirth" },
        { headerName: "Email Adresi", field: "mailAddress" },
        { headerName: "Personel Sicil No", field: "userRegistrationID" },
        { headerName: "Departman-Masraf Merkezi", field: "Departman-Masraf Merkezi" },
        { headerName: "Telefon Numarası", field: "Telefon Numarası" },
        { headerName: "İşe Giriş Tarihi", field: "İşe Giriş Tarihi" },
        { headerName: "Cinsiyet", field: "Cinsiyet" },
        { headerName: "Ana-Çalışma Şekli", field: "Ana-Çalışma Şekli" },
        { headerName: "Ana-Tehlike Türü", field: "Ana-Tehlike Türü" },
        { headerName: "Ana-Çalışma Alanı", field: "Ana-Çalışma Alanı" },
        { headerName: "Diğer-Eğitim Durumu", field: "Diğer-Eğitim Durumu" },
    ];

    const tableRows=[];
    data.array.forEach(EventUsers => {
        tableRows.push(
            <tr key={EventUsers.cardID.fullname}>
                <td>{EventUsers.dateOfBirth}</td>
                <td>{EventUsers.mailAddress}</td>
                <td>{cardID.userRegistrationID	}</td>
                <td>{EventUsers}</td>

            </tr>
        );
        
    });

    const defaultColDef = {
        sortable: true,
        editable: false,  // Varsayılan olarak düzenlenemez
        filter: true,
        floatingFilter: true,
        flex: 1 // Flex özelliği ile sütun genişliği dinamik olabilir
    };

    let gridApi;
    const onGridReady = params => {
        gridApi = params.api;
    };

    const onExportClick = () => {
        if (gridApi) {
            gridApi.exportDataAsCsv();
        } else {
            console.error("Grid API is not set");
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>React-App</h1>
            <button onClick={onExportClick}>Export to CSV</button>
            <div id="myGrid" className="ag-theme-alpine grid-container">
                <AgGridReact
                    rowData={filteredData}  // Filtrelenmiş veriyi göster
                    columnDefs={sutunlar}  // Sütunları doğru isimlendirin
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    );
}

export default Plist;
