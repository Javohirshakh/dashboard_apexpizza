import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Analytics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  // Мок данные для сводки KPI
  const totalOrders = 14500;
  const totalRevenue = 120000;
  const averageCheck = 45;
  const returningCustomers = 3200;

  // Мок данные для статистики блогеров
  const bloggersData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
    datasets: [
      {
        label: 'Tashkent',
        data: [300, 400, 350, 380, 410, 420, 390, 400, 450, 480],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Andijan',
        data: [200, 250, 230, 270, 290, 280, 300, 320, 340, 360],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Samarkand',
        data: [150, 180, 160, 170, 190, 200, 220, 230, 250, 270],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const bloggersOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blogger Statistics for the Last 10 Days',
      },
    },
  };

  // Мок данные для таблицы по филиалам
  const branchesData = [
    { name: 'Telegram', orders: "70% / 300 ta", revenue: "30% / 100 ta" },
    { name: 'App', orders: "70% / 300 ta", revenue: "30% / 100 ta" },
    { name: 'Web site', orders: "70% / 300 ta", revenue: "30% / 100 ta" },
    { name: 'Call center', orders: "70% / 300 ta", revenue: "30% / 100 ta" },
    { name: 'Filiallar', orders: "70% / 300 ta", revenue: "30% / 100 ta" },
  ];

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Analytics</h1>
      
      {/* KPI блоки */}
      <div className="kpi-cards">
        <div className="kpi-card">
          <h2>{totalOrders}</h2>
          <p>Total Orders</p>
        </div>
        <div className="kpi-card">
          <h2>${totalRevenue}</h2>
          <p>Total Revenue</p>
        </div>
        <div className="kpi-card">
          <h2>${averageCheck}</h2>
          <p>Average Check</p>
        </div>
        <div className="kpi-card">
          <h2>{returningCustomers}</h2>
          <p>Returning Customers</p>
        </div>
      </div>

      {/* График блогеров на всю ширину */}
      <div className="chart-container full-width">
        <Bar data={bloggersData} options={bloggersOptions} />
      </div>

      {/* Таблица с филиалами */}
      <div className="branches-table">
        <h3>Mijoz sodiqligi</h3>
        <table>
          <thead>
            <tr>
              <th>Manba</th>
              <th>Yangi mijoz</th>
              <th>Eski mijoz</th>
            </tr>
          </thead>
          <tbody>
            {branchesData.map((branch, index) => (
              <tr key={index}>
                <td>{branch.name}</td>
                <td>{branch.orders}</td>
                <td>{branch.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
