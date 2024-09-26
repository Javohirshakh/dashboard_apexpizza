import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './Analytics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Analytics = () => {
  // Мок данные для сводки KPI
  const totalOrders = 14500;
  const totalRevenue = 120000;
  const averageCheck = 45;
  const returningCustomers = 3200;

  // Мок данные для графика динамики заказов
  const ordersData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [2000, 2500, 2200, 2700, 2900, 3000, 3200],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const ordersOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Orders Dynamics (Last 7 Days)',
      },
    },
  };

  // Мок данные для круговой диаграммы (источники заказов)
  const sourcesData = {
    labels: ['Website', 'Mobile App', 'Call Center', 'Branches'],
    datasets: [
      {
        label: 'Orders by Source',
        data: [5000, 4000, 2000, 3500],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const sourcesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Orders by Source',
      },
    },
  };

  // Мок данные для таблицы по филиалам
  const branchesData = [
    { name: 'Branch 1', orders: 5000, revenue: 45000 },
    { name: 'Branch 2', orders: 4000, revenue: 32000 },
    { name: 'Branch 3', orders: 3000, revenue: 25000 },
    { name: 'Branch 4', orders: 2000, revenue: 18000 },
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

      {/* Графики */}
      <div className="charts-row">
        <div className="chart-container">
          <Bar data={ordersData} options={ordersOptions} />
        </div>
        <div className="chart-container">
          <Pie data={sourcesData} options={sourcesOptions} />
        </div>
      </div>

      {/* Таблица с филиалами */}
      <div className="branches-table">
        <h3>Branch Performance</h3>
        <table>
          <thead>
            <tr>
              <th>Branch</th>
              <th>Orders</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {branchesData.map((branch, index) => (
              <tr key={index}>
                <td>{branch.name}</td>
                <td>{branch.orders}</td>
                <td>${branch.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
