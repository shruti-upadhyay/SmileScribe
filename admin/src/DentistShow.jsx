import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import './App.css'; // Adjust as per your project structure

const DentistShow = () => {
  const [result, setResult] = useState([]);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const deleteRecord = async (id) => {
    if (window.confirm(`Do you really want to delete ${id}?`)) {
      try {
        await axios.delete(`http://localhost:8000/dentist/${id}`);
        getData(); // Refresh data after deletion
      } catch (error) {
        console.error("There was an error deleting the record!", error);
      }
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/dentist');
      setResult(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  useEffect(() => {
    getData(); // Fetch data when component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    if (result.length > 0) {
      $(document).ready(() => {
        const dataTable = $(tableRef.current).DataTable({
          responsive: true,
          lengthChange: false,
          autoWidth: false,
          buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
          destroy: true, // Ensure DataTable is re-initialized correctly
        });

        // Cleanup function to destroy DataTables instance on component unmount
        return () => {
          if (dataTable != null) dataTable.destroy();
        };
      });
    }
  }, [result]); // Re-run when result changes

  return (
    <div className="wrapper">
      <AdminHeader />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Dentist</h3>
                  </div>
                  <div className="card-body">
                    <table ref={tableRef} id="example1" className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          {/* <th>DentistID</th> */}
                          <th>FirstName</th>
                          <th>LastName</th>
                          <th>Specialty</th>
                          <th>PhoneNumber</th>
                          <th>Email</th>
                          <th>Gender</th>
                          <th>ProfileImage</th>
                          <th>Qualifications</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.map((data) => (
                          <tr key={data.DentistID}>
                            {/* <td>{data.DentistID}</td> */}
                            <td>{data.FirstName}</td>
                            <td>{data.LastName}</td>
                            <td>{data.Specialty}</td>
                            <td>{data.PhoneNumber}</td>
                            <td>{data.Email}</td>
                            <td>{data.Gender}</td>
                            <td>
                              <img
                                src={`http://localhost:8000/images/${data.ProfileImage}`}
                                width="50"
                                height="50"
                                alt="Profile"
                                className="rounded-circle"
                              />
                            </td>
                            <td>{data.Qualifications}</td>
                            <td>
                              <div className="d-flex justify-content-between">
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => deleteRecord(data.DentistID)}
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                                <Link to={`/DentistUpdate/${data.DentistID}`}>
                                  <button className="btn btn-primary btn-sm">
                                    <i className="fas fa-edit"></i>
                                  </button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
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
};

export default DentistShow;
