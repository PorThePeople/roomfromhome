import React, { useState } from 'react';
import axios from 'axios';

function CreateTenantStep1(props) {
  const { currentLease, setCurrentLease, currentStep, setCurrentStep } = props;
  const [roomSearch, setRoomSearch] = useState('');
  const [leases, setLeases] = useState([]);
  const [currentTenants, setCurrentTenants] = useState([]);

  const hdlChange = (e) => {
    setRoomSearch((prv) => e.target.value);
  };

  const getLeases = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:8000/lease?roomId=${roomSearch}`);
    setLeases((prv) => response?.data?.results);
  };

  const hdlSelectLease = async (lease) => {
    setCurrentLease((prv) => lease);
    const response = await axios.get(`http://localhost:8000/tenant?leaseId=${lease.id}`);
    setCurrentTenants((prv) => response?.data?.results);
  };
  return (
    <div>
      <div>
        {/* Search Room Number */}
        <form onSubmit={getLeases}>
          <label className="input">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="text" placeholder="Room Number" name="roomId" onChange={hdlChange} value={roomSearch} />
          </label>
          <button className="btn" type="submit">
            Search
          </button>
        </form>
      </div>
      <div>
        {leases.map((lease) => {
          return (
            <button
              className={lease?.id == currentLease?.id ? 'btn btn-primary btn-sm' : 'btn btn-sm'}
              key={lease.id}
              onClick={() => hdlSelectLease(lease)}
            >
              Room: {lease.roomId}, Lease ID: {lease.id}, Status: {lease.status}
            </button>
          );
        })}
      </div>
      <div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {currentTenants.map((tenant) => {
              return (
                <tr>
                  <td>{tenant.firstName}</td>
                  <td>{tenant.lastName}</td>
                  <td>{tenant.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="btn"
          onClick={() => setCurrentStep((prv) => prv - 1)}
          disabled={currentStep == 1 ? true : false}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentStep((prv) => prv + 1)}
          disabled={!currentLease?.id ? true : false}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default CreateTenantStep1;
