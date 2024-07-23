import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

const ScheduleShow = () => {
  const [result, setResult] = useState([]);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const deleteRecord = async (id) => {
    if (window.confirm(`Do you really want to delete ${id}?`)) {
      try {
        await axios.delete(`http://localhost:8000/schedules/${id}`);
        getData(); // Refresh data after deletion
      } catch (error) {
        console.error("There was an error deleting the record!", error);
      }
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/schedules');
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
                    <h3 className="card-title">Schedule</h3>
                  </div>
                  <div className="card-body">
                    <table ref={tableRef} id="example1" className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Schedule Id</th>
                          <th>Dentist Name</th>
                          <th>Day</th>
                          <th>Start Time</th>
                          <th>End Time</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.map((data) => (
                          <tr key={data.ScheduleID}>
                            <td>{data.ScheduleID}</td>
                            <td>{data.FirstName + " " + data.LastName}</td>
                            <td>{data.DayOfWeek}</td>
                            <td>{data.StartTime}</td>
                            <td>{data.EndTime}</td>
                            <td>
                              <div className="d-flex gap-1">
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => deleteRecord(data.ScheduleID)}
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                                <Link to={`/ScheduleUpdate/${data.ScheduleID}`}>
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

export default ScheduleShow;
