import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import "./PList.css";  // Update to match the actual file name
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Plist() {  
    const [datas, setDatas] = useState([]);  
    const [filteredData, setFilteredDatas] = useState([]);  
    const [error, setError] = useState(null);  
    const { EventID } = useParams();  

    useEffect(() => {  
      const fetchData = async () => {  

        try {  
            console.log("EventID",EventID);
       
          if (EventID) {  
            const response = await axios.get(`https://localhost:7282/Events_UsersDTO/${EventID}`);  
            setDatas(response.data);  
            setFilteredDatas(response.data);  
            console.log("Response data:", response.data);  
            console.log("Filtered data:", filteredData);  
          }  
        } catch (err) {  
          setError(err);  
          console.error('Error fetching data:', err);  
        }  
      };  
      fetchData();  
    }, [EventID]);  
  
    // Rest of the code remains the same  


    const columns = [
        { headerName: "Ad Soyad", field: "fullName" },
        { headerName: "Doğum Tarihi", field: "dateOfBirth" },
        { headerName: "Email Adresi", field: "mailAddress" },
        { headerName: "Personel Sicil No", field: "userRegistrationID" },
        { headerName: "İşe Giriş Tarihi", field: "hireDate" },
        { headerName: "Telefon Numarası", field: "phoneNumber" },
        { headerName: "Cinsiyet", field: "Gender.name" },
        { headerName: "Ana-Çalışma Şekli", field: "MainCharacteristicts.workingMethod" },
        { headerName: "Ana-Çalışma Alanı", field: "MainCharacteristicts.isOfficeEmployee" },
        { headerName: "Ana-Tehlike Türü", field: "MainCharacteristicts.typeOfHazard" },
        { headerName: "Diğer-Eğitim Durumu", field: "OtherCharacteristicts.educationalStatus" },
        { headerName: "Departman", field: "Department.name" },
        { headerName: "Görev", field: "Tasks.name" },
        { headerName: "Masraf Merkezi", field: "CostCenters.name" },
        { headerName: "Masraf Merkezi", field: "CostCenters.budget" },
    ];  
    console.log("Columns:", columns); 
   
    const tableRows = [];
    datas.forEach(EventUsers => {
        console.log("Event User", EventUsers.cardID);  
        tableRows.push(
            <tr key={EventUsers.cardID}>
                <td>{EventUsers.fullName}</td> 
                <td>{EventUsers.dateOfBirth}</td> 
                <td>{EventUsers.mailAddress}</td> 
                <td>{EventUsers.userRegistrationID}</td> 
                <td>{EventUsers.hireDate}</td> 
                <td>{EventUsers.phoneNumber}</td> 
                <td>{EventUsers.Gender.name}</td> 
    /           <td>{EventUsers.MainCharacteristictsworkingMethod}</td> 
                <td>{EventUsers.MainCharacteristicts.isOfficeEmployee}</td> 
                <td>{EventUsers.MainCharacteristicts.typeOfHazard}</td> 
                <td>{EventUsers.OtherCharacteristicts.educationalStatus}</td> 
                <td>{EventUsers.Department.name}</td> 
                <td>{EventUsers.TasksDTO.name}</td> 
                <td>{EventUsers.CostCenters.name}</td> 
                <td>{EventUsers.CostCenter.budget}</td> 
                
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
                    columnDefs={columns}    // Sütunları doğru isimlendirin
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    );
}

export default Plist;
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import "./PList.css";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import { Cascader } from 'antd';

// function Plist() {
//     const { EventID } = useParams();
//     const navigate = useNavigate();
//     const [datas, setDatas] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [selectedCategories, setSelectedCategories] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`https://localhost:7282/Events_UsersDTO/${EventID}`);
//                 setDatas(response.data);
//                 setFilteredData(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err);
//                 console.error('Error fetching data:', err);
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [EventID]);

//     const columns = [
//         { headerName: "Ad Soyad", field: "fullName" },
//         { headerName: "Doğum Tarihi", field: "dateOfBirth" },
//         { headerName: "Email Adresi", field: "mailAddress" },
//         { headerName: "Personel Sicil No", field: "userRegistrationID" },
//         { headerName: "İşe Giriş Tarihi", field: "hireDate" },
//         { headerName: "Telefon Numarası", field: "phoneNumber" },
//         { headerName: "Cinsiyet", field: "Gender.name" },
//         { headerName: "Çalışma Şekli", field: "MainCharacteristics.workingMethod" },
//         { headerName: "Ofis Çalışanı", field: "MainCharacteristics.isOfficeEmployee" },
//         { headerName: "Tehlike Türü", field: "MainCharacteristics.typeOfHazard" },
//         { headerName: "Eğitim Durumu", field: "OtherCharacteristics.educationalStatus" },
//         { headerName: "Departman", field: "Department.name" },
//         { headerName: "Görev", field: "Tasks.name" },
//         { headerName: "Masraf Merkezi", field: "CostCenters.name" },
//         { headerName: "Bütçe", field: "CostCenters.budget" },
//     ];

//     const options = [
//         { label: 'Ad Soyad', value: 'fullName' },
//         { label: 'Doğum Tarihi', value: 'dateOfBirth' },
//         { label: 'Email', value: 'mailAddress' },
//         { label: 'Personel Sicil No', value: 'userRegistrationID' },
//         { label: 'İşe Giriş Tarihi', value: 'hireDate' },
//         { label: 'Telefon', value: 'phoneNumber' },
//         { label: 'Cinsiyet', value: 'Gender.name' },
//         { label: 'Çalışma Şekli', value: 'MainCharacteristics.workingMethod' },
//         { label: 'Tehlike Tipi', value: 'MainCharacteristics.typeOfHazard' },
//         { label: 'Eğitim Durumu', value: 'OtherCharacteristics.educationalStatus' },
//     ];

//     const handleCategoryChange = (value) => {
//         setSelectedCategories(value);
//         filterUsers(value);
//     };

//     const filterUsers = (categories) => {
//         if (categories.length === 0) {
//             setFilteredData(datas);
//             return;
//         }

//         const filteredUsers = datas.filter(user => {
//             return categories.every(category => {
//                 return Object.keys(user).some(key => {
//                     return user[key]?.toString().toLowerCase().includes(category.toLowerCase());
//                 });
//             });
//         });

//         setFilteredData(filteredUsers);
//     };

//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(filteredData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Katılımcılar");
//         const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//         const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//         saveAs(blob, 'katilimci-listesi.xlsx');
//     };

//     const defaultColDef = {
//         sortable: true,
//         editable: false,
//         filter: true,
//         floatingFilter: true,
//         flex: 1
//     };

//     let gridApi;
//     const onGridReady = params => {
//         gridApi = params.api;
//     };

//     const onExportClick = () => {
//         if (gridApi) {
//             gridApi.exportDataAsCsv();
//         } else {
//             console.error("Grid API is not set");
//         }
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div>
//             <header className="header">
//                 <img src={`${process.env.PUBLIC_URL}/logo-esbas.png`} onClick={() => navigate("/")} alt="ESBAŞ Logo" className="logo" />
//             </header>
//             <div className="toolbar">
//                 <Cascader
//                     className="Cascader"
//                     placeholder="Kategori Seçin..."
//                     options={options}
//                     onChange={handleCategoryChange}
//                     multiple
//                     maxTagCount="responsive"
//                 />
//                 <button className="excel-button" onClick={exportToExcel}>
//                     Excel'e Aktar
//                 </button>
//                 <button onClick={onExportClick}>Export to CSV</button>
//             </div>
//             <div id="myGrid" className="ag-theme-alpine grid-container">
//                 <AgGridReact
//                     rowData={filteredData}
//                     columnDefs={columns}
//                     defaultColDef={defaultColDef}
//                     onGridReady={onGridReady}
//                 />
//             </div>
//         </div>
//     );
// }

// export default Plist;
