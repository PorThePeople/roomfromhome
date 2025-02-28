import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useDebouncedCallback } from 'use-debounce';
import LeasesContainer from '../components/LeasesContainer';
import ModalCreateLease from '../components/ModalCreateLease';

const initialQuery = { contains: '', status: '', orderBySort: '' };

function Leases() {
  const [leases, setLeases] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [query, setQuery] = useState(initialQuery);

  // Update state when input changes
  const hdlChange = (e) => {
    setQuery((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const removeAllFilters = () => {
    setQuery(initialQuery);
  };

  const filter = async () => {
    const results = await axios.get(`http://localhost:8000/lease`);
    // console.log(results);
    setLeases((prv) => results?.data?.results);
  };
  useEffect(() => {
    filter();
  }, []);

  return (
    <div className="w-full">
      {/* <pre>{JSON.stringify(leases, null, 2)}</pre> */}
      {/* Create New Lease */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={(e) => document.getElementById('createLease-modal').showModal()}
      >
        Create New Lease
      </button>
      {/* Filter Leases */}
      <label className="input flex-grow-1">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="number" placeholder="Search" name="contains" onChange={hdlChange} value={query.contains} />
      </label>
      {/* Lease Status */}
      <select defaultValue="" className="select" name="status" onChange={hdlChange} value={query.status}>
        <option disabled={true}>Lease Status:</option>
        <option value="&status=ACTIVE">Active</option>
        <option value="&status=INACTIVE">Inactive</option>
        <option value="">Show All Leases</option>
      </select>
      {/* Sort By */}
      <select className="select" name="orderBySort" onChange={hdlChange} value={query.orderBySort}>
        <option disabled={true}>Sort By:</option>
        <option value="&orderBy=updatedAt&sort=desc">Recently Updated</option>
        <option value="&orderBy=endDate&sort=desc">End date DESC</option>
        <option value="&orderBy=startDate&sort=desc">Start date DESC</option>
      </select>
      {/* Remove filters */}
      <button type="button" className="btn" onClick={removeAllFilters}>
        Remove All Filters
      </button>
      {/* Lease Container */}
      <LeasesContainer leases={leases} />
      {/* Modal */}
      <dialog id="createLease-modal" className="modal">
        <div className="modal-box max-w-[1000px]">
          <ModalCreateLease />
        </div>
      </dialog>
    </div>
  );
}

export default Leases;
