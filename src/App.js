import './App.css';
// import component
import ChartComponent from './component/ChartComponent';
import CountryChartComponent from './component/countryChart';
import UserDataChart from './component/GenderDataChart';
import UserDataChartage from './component/UserDataChartage';
import React, { useState, useEffect } from 'react';
import {  fetchFromS3 } from './component/awss3';
function App() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchFromS3('processed-users.json');
        setUserData(result)
        console.log(result);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    getData();
  }, []);
  return (
    <div className="App">
      <ChartComponent userData={userData}/>
      <UserDataChart userData={userData} />
      <UserDataChartage userData={userData} />
      <CountryChartComponent userData={userData} />
    </div>
  );
}
export default App;
  
// import axios from 'axios';
 // for test api 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://mocki.io/v1/11a332c3-6f7c-4010-ae22-66b8b924651f"
  //       );
  //       setUserData(response.data);
  //       console.log("Error fetching data:", response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);