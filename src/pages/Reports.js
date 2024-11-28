import React from 'react';
import './Reports.css';
import { Link } from 'react-router-dom';

const Reports = () => {
  const reports = [
    { title: 'HR', description: 'Отчеты отдела HR', icon: 'group', link: '/hr-reports' },
    { title: 'Финансы', description: 'Отчеты отдела Финансов', icon: 'attach_money', link: '/finance-reports' },
    { title: 'Курьеры', description: 'Отчеты Курьерской службы', icon: 'local_shipping', link: 'https://lookerstudio.google.com/reporting/b57320b7-5740-4d0e-992c-6a815c79e1e1/page/VXTUE?s=oXJ5xxKlon8' },
    { title: 'Безопасность', description: 'Отчеты отдела Безопасности', icon: 'security', link: '/security-reports' },
    { title: 'Колл-центр', description: 'Отчеты колл-центра', icon: 'call', link: '/call-center-reports' },
    { title: 'Контроль качества', description: 'Отчеты Контроля качества', icon: 'check_circle', link: 'https://lookerstudio.google.com/reporting/488858a3-da63-4013-bdb9-0be042c9ab20/page/ceLWE' },
    { title: 'Франшизы', description: 'Отчеты Франшизы', icon: 'business', link: '/franchise-reports' },
    { title: 'Сеть филиалов', description: 'Отчеты Директора сети филиалов', icon: 'store', link: '/branch-network-reports' },
  ];

  return (
    <div className="reports-page">
      <h1 className="reports-title">Barcha hisobotlar</h1>
      <div className="reports-grid modern-style">
        {reports.map((report, index) => (
          <Link to={report.link} key={index} className="report-card modern-report-card">
            <div className="icon-container">
              <span className="material-icons">{report.icon}</span>
            </div>
            <div className="report-details">
              <h3>{report.title}</h3>
              <p>{report.description}</p>
            </div>
            <div className="element"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Reports;
