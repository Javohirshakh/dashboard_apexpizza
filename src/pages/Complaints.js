import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import config from '../config';
import './Complaints.css';

const Complaints = () => {
  const [activeSection, setActiveSection] = useState('branchComplaints');
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 10;

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`${config.COMPLAINTS}?route=complaints`);
      const data = await response.json();
      setComplaints(data.reverse());

      const branchesSet = Array.from(new Set(data.map(item => item.branch)));
      const uniqueBranches = [
        { value: 'Hammasi', label: `Hammasi (${data.length})` },
        ...branchesSet.map(branch => ({
          value: branch,
          label: `${branch} (${data.filter(item => item.branch === branch).length})`,
        })),
      ];

      setBranches(uniqueBranches);
      setFilteredComplaints(data);
    } catch (error) {
      console.error('Ошибка при загрузке жалоб:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleBranchChange = (selectedOption) => {
    setSelectedBranch(selectedOption);
    setFilteredComplaints(
      selectedOption.value === 'Hammasi'
        ? complaints
        : complaints.filter(item => item.branch === selectedOption.value)
    );
    setCurrentPage(1); // Сброс страницы при смене филиала
  };

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  );

  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: '#f8f9fa',
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? '#161a2d' : isFocused ? '#e0e0e0' : null,
      color: isSelected ? 'white' : 'black',
      cursor: 'pointer',
    }),
  };

  return (
    <div className="complaints-page">
      <h1 className="complaints-title">Shikoyatlar</h1>

      <div className="complaints-tabs">
        <button
          className={`complaints-tab ${activeSection === 'branchComplaints' ? 'active' : ''}`}
          onClick={() => setActiveSection('branchComplaints')}
        >
          Filiallar
        </button>
        <button
          className={`complaints-tab ${activeSection === 'generalComplaints' ? 'active' : ''}`}
          onClick={() => setActiveSection('generalComplaints')}
        >
          Shikoyatlar
        </button>
      </div>

      {activeSection === 'generalComplaints' && (
        <div className="filter-container">
          <label htmlFor="branchSelect">Filialni tanlang:</label>
          <Select
            id="branchSelect"
            options={branches}
            value={selectedBranch}
            onChange={handleBranchChange}
            className="branch-select"
            placeholder="Hamma filiallar"
            styles={customStyles}
          />
        </div>
      )}

      <div className="complaints-content">
        {activeSection === 'branchComplaints' && (
          <div className="complaints-section">
            <h2>Filiallar</h2>
            <p>Filiallar qo'shish, nazorat qilish, kuzatish.</p>
          </div>
        )}

        {activeSection === 'generalComplaints' && (
          <div className="complaints-section complaints-wrapper">
            {isLoading ? (
              <div className="loader"></div>
            ) : currentComplaints.length > 0 ? (
              <div className="complaints-list">
                {currentComplaints.map((item, index) => (
                  <div key={index} className="complaint-item shadow-lg">
                    <h3>{item.branch}</h3>
                    <p>{item.complaint}</p>
                  </div>
                ))}
                <div className="pagination">
                  {[...Array(totalPages).keys()].map((number) => (
                    <button
                      key={number + 1}
                      onClick={() => paginate(number + 1)}
                      className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p>Shikoyatlar mavjud emas.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;
