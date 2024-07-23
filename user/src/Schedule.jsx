import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';

const Schedule = () => {
    const { DentistID } = useParams();
    const [schedule, setSchedule] = useState([]);
    const [dentist, setDentist] = useState({});

    const fetchSchedule = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/doctorSchedule/${DentistID}`);
            setSchedule(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching schedule', error);
        }
    };

    const fetchDentistDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/dentist/${DentistID}`);
            setDentist(response.data);
        } catch (error) {
            console.error('Error fetching dentist details', error);
        }
    };

    useEffect(() => {
        fetchSchedule();
        fetchDentistDetails();
    }, [DentistID]);

    return (
        <div>
            <UserHeader />
            <section className="ftco-section">
                <div className="container">
                <div className="row justify-content-center mb-3"> {/* Reduce mb-5 to mb-4 */}
    <div className="col-md-7 text-center heading-section">
        <h2 className="mb-3">{dentist.FirstName} {dentist.LastName} Schedule</h2>
    </div>
</div>
<div className="row justify-content-center mb-3"> {/* Reduce mb-5 to mb-4 */}
    <div className="col-md-4 text-center">
        <div className="staff">
            <div className="img mb-4">
                <img
                    src={`http://localhost:8000/images/${dentist.ProfileImage}`}
                    alt={`${dentist.FirstName} ${dentist.LastName}`}
                    className="img-fluid rounded-circle"
                    style={{ width: '150px', height: '150px' }}
                />
            </div>
            <div className="info text-center">
                <h3>{dentist.FirstName} {dentist.LastName}</h3>
                <p className="position">{dentist.Specialty}</p>
            </div>
        </div>
    </div>
</div>

                    <div className="row">
                        {schedule.length > 0 ? (
                            <div className="col-md-12">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Day of Week</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedule.map((slot) => (
                                            <tr key={slot.ScheduleID}>
                                                <td>{slot.DayOfWeek}</td>
                                                <td>{slot.StartTime}</td>
                                                <td>{slot.EndTime}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center">No schedule available</p>
                        )}
                    </div>
                </div>
            </section>
            <UserFooter />
        </div>
    );
    
};

export default Schedule;
