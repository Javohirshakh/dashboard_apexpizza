// src/pages/Complaints.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import config from '../config';
import './Complaints.css';

const Complaints = () => {
  const [activeSection, setActiveSection] = useState('branchComplaints');
  const [branches, setBranches] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isLoadingBranches, setIsLoadingBranches] = useState(true);
  const [isLoadingComplaints, setIsLoadingComplaints] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 10;

  // Fetch branches data
  const fetchBranches = async () => {
    try {
      const response = await fetch(`${config.COMPLAINTS}?route=branchs`);
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error('Ошибка при загрузке филиалов:', error);
    } finally {
      setIsLoadingBranches(false);
    }
  };

  // Fetch complaints data
  const fetchComplaints = async () => {
    try {
      const response = await fetch(`${config.COMPLAINTS}?route=complaints`);
      const data = await response.json();
      setComplaints(data.reverse());
      setFilteredComplaints(data);
    } catch (error) {
      console.error('Ошибка при загрузке жалоб:', error);
    } finally {
      setIsLoadingComplaints(false);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchComplaints();
  }, []);

  const handleBranchChange = (selectedOption) => {
    setSelectedBranch(selectedOption);
    setFilteredComplaints(
      selectedOption.value === 'Hammasi'
        ? complaints
        : complaints.filter((item) => item.branch === selectedOption.value)
    );
    setCurrentPage(1);
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

      {activeSection === 'branchComplaints' && (
        <div className="branches-list">
          {isLoadingBranches ? (
            <div className="complaints_loader"></div>
          ) : (
            <ul>
              {branches.map((branch, index) => (
                <li key={index} className="branch-item">
                  <h3>{branch.branch}</h3>
                  <p>Base64: {branch.base64}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeSection === 'generalComplaints' && (
        <>
          <div className="filter-container">
            <label htmlFor="branchSelect">Filialni tanlang:</label>
            <Select
              id="branchSelect"
              options={[
                { value: 'Hammasi', label: `Hammasi (${complaints.length})` },
                ...branches.map((branch) => ({
                  value: branch.branch,
                  label: `${branch.branch}`,
                })),
              ]}
              value={selectedBranch}
              onChange={handleBranchChange}
              styles={customStyles}
              placeholder="Hamma filiallar"
            />
          </div>

          <div className="complaints-content complaints-wrapper">
            {isLoadingComplaints ? (
              <div className="complaints_loader"></div>
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
        </>
      )}
    </div>
  );
};

export default Complaints;
