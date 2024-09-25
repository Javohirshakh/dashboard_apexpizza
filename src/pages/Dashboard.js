import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  // Мок данные для показателей
  const branches = 12;
  const employees = 150;
  const totalOrders = 10000;
  const averageRating = 4.8;
  const totalRevenue = 75000; // Общая выручка
  const profit = 25000; // Прибыль

  // Мок данные для графика продаж
  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [5000, 8000, 4000, 9000, 12000, 7000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Overview',
      },
    },
  };

  // Мок данные для второго графика продаж (внизу)
  const secondarySalesData = {
    labels: ['July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Sales',
        data: [6000, 9000, 5000, 10000, 13000, 8000],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const secondarySalesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Overview (Second Half)',
      },
    },
  };

  // Мок данные для распределения заказов по каналам
  const ordersData = {
    labels: ['Website', 'Mobile App', 'Call Center', 'Branches'],
    datasets: [
      {
        label: 'Orders',
        data: [4000, 3000, 2000, 1000],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
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
        text: 'Orders by Source',
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      
      {/* Карточки с KPI */}
      <div className="kpi-cards">
        <div className="kpi-card">
          <h2>{branches}</h2>
          <p>Branches</p>
        </div>
        <div className="kpi-card">
          <h2>{employees}</h2>
          <p>Employees</p>
        </div>
        <div className="kpi-card">
          <h2>{totalOrders}</h2>
          <p>Total Orders</p>
        </div>
        <div className="kpi-card">
          <h2>${totalRevenue}</h2>
          <p>Total Revenue</p>
        </div>
        <div className="kpi-card">
          <h2>${profit}</h2>
          <p>Profit</p>
        </div>
        <div className="kpi-card">
          <h2>{averageRating}</h2>
          <p>Average Rating</p>
        </div>
      </div>

      {/* Графики с использованием CSS Grid */}
      <div className="grid-container">
        <div className="grid-item">
          <Bar data={salesData} options={salesOptions} />
        </div>
        <div className="grid-item">
          <Bar data={secondarySalesData} options={secondarySalesOptions} />
        </div>
        <div className="grid-item large-chart">
          <Pie data={ordersData} options={ordersOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
