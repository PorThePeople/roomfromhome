import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TenantContainer from '../components/TenantContainer';
import ModalCreateTenant from '../components/ModalCreateTenant';

function Tenants() {
  const [tenants, setTenants] = useState([]);

  const getTenants = async () => {
    const response = await axios.get(`http://localhost:8000/tenant`);
    setTenants((prv) => response.data.results);
  };

  useEffect(() => {
    getTenants();
  }, []);
  return (
    <div className="w-full">
      <div className="flex">
        {/* Search Room Number */}
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="text" placeholder="Search by Room" name="contains" />
        </label>
        {/* Search Name */}
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="text" placeholder="Search by Name" name="contains" />
        </label>
        {/* Add New Room */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => document.getElementById('createTenant-modal').showModal()}
        >
          Add New Tenant
        </button>
      </div>
      <TenantContainer tenants={tenants} getTenants={getTenants} />
      <dialog id="createTenant-modal" className="modal">
        <div className="modal-box">
          <ModalCreateTenant />
        </div>
      </dialog>
    </div>
  );
}

export default Tenants;
