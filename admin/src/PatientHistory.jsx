import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import DoctorHeader from './DoctorHeader';
import './App.css'; // Adjust as per your project structure

const PatientHistory = () => {
  const [patientHistory, setPatientHistory] = useState([]);
  const [error, setError] = useState('');
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchPatientHistory = async () => {
      try {
        const userID = sessionStorage.getItem('UserID');
        const response = await axios.get(`http://localhost:8000/patient-history/${userID}`);
        setPatientHistory(response.data);
      } catch (error) {
        console.error('Error fetching patient history:', error);
        setError('Failed to fetch patient history. Please try again.');
      }
    };

    fetchPatientHistory();
  }, []);

  useEffect(() => {
    if (patientHistory.length > 0 && tableRef.current) {
      const dataTable = $(tableRef.current).DataTable({
        responsive: true,
        lengthChange: false,
        autoWidth: false,
        buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
        destroy: true, // Ensure DataTable is re-initialized correctly
      });

      return () => {
        if (dataTable) dataTable.destroy();
      };
    }
  }, [patientHistory]);

  return (
    <div className="wrapper">
      <DoctorHeader />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Patient History</h3>
                  </div>
                  <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <table ref={tableRef} id="example1" className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Patient Name</th>
                          <th>Treatment Name</th>
                          <th>Description</th>
                          <th>Cost</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patientHistory.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center">No data available</td>
                          </tr>
                        ) : (
                          patientHistory.map((record, index) => (
                            <tr key={index}>
                              <td>{record.PatientName}</td>
                              <td>{record.TreatmentName}</td>
                              <td>{record.Description}</td>
                              <td>{record.Cost}</td>
                              <td>{record.Duration}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PatientHistory;
