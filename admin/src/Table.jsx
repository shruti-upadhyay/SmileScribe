import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import $ from 'jquery';
import './App.css'; // Adjust as per your project structure

const Table = () => {
  const [result, setResult] = useState([]);
  const tableRef = useRef(null);
  const navigate = useNavigate();



  

  

  useEffect(() => {
    if (result.length > 0) {
      const table = $(tableRef.current).DataTable({
        responsive: true,
        lengthChange: false,
        autoWidth: false,
        buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
        destroy: true, // Ensure DataTable is re-initialized correctly
      });
      table.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

      // Cleanup function to destroy DataTables instance on component unmount
      return () => {
        table.destroy();
      };
    }
  }, [result]);

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
                    <h3 className="card-title">DataTable with default features</h3>
                  </div>
                  <div className="card-body">
                    <table ref={tableRef} id="example1" className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>DentistID</th>
                          <th>FirstName</th>
                          <th>LastName</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <td>1</td>
                            <td>Kaivan</td>
                            <td>Taswala</td>
                          </tr>

                          <tr>
                            <td>1</td>
                            <td>Kaivan</td>
                            <td>Taswala</td>
                          </tr>

                          <tr>
                            <td>1</td>
                            <td>Kaivan</td>
                            <td>Taswala</td>
                          </tr>

                          <tr>
                            <td>1</td>
                            <td>Kaivan</td>
                            <td>Taswala</td>
                          </tr>

                          <tr>
                            <td>1</td>
                            <td>Kaivan</td>
                            <td>Taswala</td>
                          </tr>

                          <tr>
                            <td>1</td>
                            <td>Kaivan</td>
                            <td>Taswala</td>
                          </tr>

                          <tr>
                            <td>1</td>
                            <td>Kaivan</td>
                            <td>Taswala</td>
                          </tr>

                          <tr>
                            <td>1</td>
                            <td>Kaivan</td>
                            <td>Taswala</td>
                          </tr>

                          <tr>
                            <td>1</td>
                            <td>Kaivan</td>
                            <td>Taswala</td>
                          </tr>

                          <tr>
                            <td>1</td>
                            <td>Kaivan</td>
                            <td>Taswala</td>
                          </tr>

                          <tr>
                            <td>1</td>
                            <td>Jainam</td>
                            <td>Taswala</td>
                          </tr>
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

export default Table;
