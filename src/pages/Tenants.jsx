import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TenantContainer from '../components/TenantContainer';
import ModalCreateTenant from '../components/ModalCreateTenant';
import useUserStore from '../stores/userStore';
import Paginate from '../components/Paginate';
import { useDebouncedCallback } from 'use-debounce';

const initialQuery = { contains: '', status: '', orderBySort: '', take: '10', skip: '' };

function Tenants() {
  const token = useUserStore((state) => state.token);
  const [tenants, setTenants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(initialQuery);

  const filter = useDebouncedCallback(async () => {
    const queryString = `${query.contains ? `contains=${query.contains}` : ''}${query.status}${
      query.orderBySort
    }&take=${query.take}${query.skip ? `&skip=${query.skip}` : ''}`;
    const response = await axios.get(`http://localhost:8000/tenant?${queryString}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTenants((prv) => response.data.results);
    setTotalCount((prv) => response.data.count);
  }, 500);

  const hdlChange = (e) => {
    setQuery((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const removeAllFilters = () => {
    setQuery(initialQuery);
  };

  useEffect(() => {
    filter();
  }, []);

  useEffect(() => {
    filter();
    setCurrentPage((prv) => 1);
    setQuery((prv) => ({ ...prv, skip: '' }));
  }, [query.contains, query.status, query.orderBySort]);

  return (
    <div className="w-full">
      <div className="flex">
        {/* Add New Tenant */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => document.getElementById('createTenant-modal').showModal()}
        >
          Add New Tenant
        </button>
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
          <input type="text" placeholder="Search by Name" name="contains" onChange={hdlChange} />
        </label>
        {/* Remove filters */}
        <button type="button" className="btn" onClick={removeAllFilters}>
          Remove All Filters
        </button>
      </div>
      <TenantContainer tenants={tenants} filter={filter} />
      {/* Pagination */}
      <Paginate
        setQuery={setQuery}
        filter={filter}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <dialog id="createTenant-modal" className="modal">
        <div className="modal-box">
          <ModalCreateTenant filter={filter} />
        </div>
      </dialog>
    </div>
  );
}

export default Tenants;
