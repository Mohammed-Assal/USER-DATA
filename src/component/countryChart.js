import React from "react";
import Chart from "react-apexcharts";

const CountryChartComponent = ({ userData }) => {
  const prepareCountryChartData = () => {
    if (!userData || !userData.countryCount) {
      return { options: {}, series: [] };
    }

    const countries = Object.keys(userData.countryCount);
    const usersCount = countries.map(country => userData.countryCount[country]);

    return {
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: countries
        },
        yaxis: {
          title: {
            text: 'Number of Users'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: val => val
          }
        }
      },
      series: [{
        name: 'Users',
        data: usersCount
      }]
    };
  };

  const chartData = prepareCountryChartData();

  return (
    <div>
      <h1>Number of Users by Country:</h1>
      <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default CountryChartComponent;