
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const UserDataChartage = ({ userData }) => {

    // const totalUsers = userData.length;
    const boyeUsers = userData?.ageCount?.["10-20"]//.filter(user => user.age >= 10 && user.age < 20).length;
    const smallUsers = userData?.ageCount?.["21-30"] //.filter(user =>  user.age >= 20 && user.age < 30 ).length;
    const femaleUsers = userData?.ageCount?.["31-40"] //.filter(user => user.age >= 30 && user.age < 40).length;
  
  
    const chartData = [smallUsers, femaleUsers,boyeUsers];
    
    const chartOptions = {
      labels: ['10-20', '21-30','31-40'],
      colors: ['#3498db', '#e3423c','rgb(162, 190, 214)'],
      legend: {
        show: true,
        position: 'bottom',
      },
    };
    return (
      <div className="pie-chart">
        <h1> Age distribution : </h1>
        <ReactApexChart options={chartOptions} series={chartData} type="pie" height={350} />
      </div>
    );
 
};

export default UserDataChartage;