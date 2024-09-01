import React from "react";
import Chart from "react-apexcharts";

const ChartComponent = ({ userData }) => {
  const prepareChartData = () => {
    if (!userData || !userData.dailyViews) {
      return { options: {}, series: [] };
    }

    const dailyViews = userData?.dailyViews;

    // استخراج أسماء المستخدمين وأيام المشاهدات
    const users = Object.keys(dailyViews);
    const days = dailyViews[users[0]].map(day => `day-${day.day}`);

    const series = users.map(user => ({
      name: user,
      data: dailyViews[user].map(day => parseInt(day.views || 0))
    }));

    return {
      options: {
        chart: {
          type: 'line'
        },
        xaxis: {
          categories: days
        },
        yaxis: {
          title: {
            text: 'Views'
          }
        }
      },
      series: series
    };
  };

  const chartData = prepareChartData();

  return (
    <div>
      <h1>Views Distribution:</h1>
      <Chart options={chartData.options} series={chartData.series} type="line" height={400} />
    </div>
  );
};

export default ChartComponent;