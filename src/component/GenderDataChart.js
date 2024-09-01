
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const UserDataChart = ({ userData }) => {

    // const totalUsers = userData.length;
    let maleUsers = userData?.genderCount?.man
    //.filter(user => user.gender === 'man').length;
    let femaleUsers = userData?.genderCount?.woman
    //.filter(user => user.gender === 'woman').length;
  
  
    const chartData = [maleUsers, femaleUsers];
  
    
    const chartOptions = {
      labels: ['man', 'woman'],
      colors: ['#3498db', '#e74c3c'],
      legend: {
        show: true,
        position: 'bottom',
      },
    };
  
    return (
      <div className="pie-chart">
         <h1> Gender distribution : </h1>
        <ReactApexChart options={chartOptions} series={chartData} type="pie" height={350} />
      </div>
    );
 
};

export default UserDataChart;