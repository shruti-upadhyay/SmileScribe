import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import './App.css'; // Adjust as per your project structure

const ChargeShow = () => {
  const [result, setResult] = useState([]);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const deleteRecord = async (id) => {
    if (window.confirm(`Do you really want to delete ${id}?`)) {
      try {
        await axios.delete(`http://localhost:8000/charge/${id}`);
        getData(); // Refresh data after deletion
      } catch (error) {
        console.error("There was an error deleting the record!", error);
      }
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/charge');
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
                    <h3 className="card-title">Services</h3>
                  </div>
                  <div className="card-body">
                    <table ref={tableRef} id="example1" className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Cost</th>
                          <th>Image</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.map((data) => (
                          <tr key={data.chargeID}>
                            <td>{data.chargeName}</td>
                            <td>{data.Cost}</td>
                            <td>
                              <img
                                src={`http://localhost:8000/images/${data.ServiceImage}`}
                                width="50"
                                height="50"
                                alt="Profile"
                              />
                            </td>
                            <td>{data.Description}</td>
                            <td>
                              <div className="d-flex justify-content-between">
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => deleteRecord(data.chargeID)}
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                                <Link to={`/ChargeUpdate/${data.chargeID}`}>
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

export default ChargeShow;
