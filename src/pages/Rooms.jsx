import React, { useEffect, useState } from 'react';
import RoomsContainer from '../components/RoomsContainer';
import axios from 'axios';

import { useDebouncedCallback } from 'use-debounce';
import Paginate from '../components/Paginate';
import useUserStore from '../stores/userStore';
import ModalCreateRoom from '../components/ModalCreateRoom';
import ModalRoomDetails from '../components/ModalRoomDetails';

const initialQuery = {
  contains: '',
  status: '',
  airCon: '',
  orderBySort: '&orderBy=updatedAt&sort=desc',
  take: '10',
  skip: '',
};

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [query, setQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(1);

  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);

  // Fetch all data on initial page load
  useEffect(() => {
    filter();
  }, []);

  // Update state when input changes
  const hdlChange = (e) => {
    setQuery((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    filter();
    setCurrentPage((prv) => 1);
    setQuery((prv) => ({ ...prv, skip: '' }));
  }, [query.contains, query.status, query.airCon, query.orderBySort]);

  // Debounce before calling Axios
  const filter = useDebouncedCallback(async () => {
    const queryString = `${query.contains ? `contains=${query.contains}` : ''}${query.status}${query.airCon}${
      query.orderBySort
    }&take=${query.take}${query.skip ? `&skip=${query.skip}` : ''}`;
    const results = await axios.get(`http://localhost:8000/room?${queryString}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRooms((prv) => results?.data?.results);
    setTotalCount((prv) => results?.data?.count);
  }, 500);

  const removeAllFilters = () => {
    setQuery(initialQuery);
  };

  return (
    <div className="w-full p-4">
      <form className="flex">
        {/* Add New Room */}
        {user.role == 'ADMIN' && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => document.getElementById('createRoom-modal').showModal()}
          >
            Create New Room
          </button>
        )}
        {/* Search Room Number */}
        <label className="input flex-grow-1">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="number" placeholder="Search" name="contains" onChange={hdlChange} value={query.contains} />
        </label>
        {/* Status */}
        <select defaultValue="" className="select" name="status" onChange={hdlChange} value={query.status}>
          <option disabled={true}>Room Status:</option>
          <option value="&status=AVAILABLE">Available</option>
          <option value="&status=OCCUPIED">Occupied</option>
          <option value="">Show All Rooms</option>
        </select>
        {/* AirCon */}
        <select defaultValue="" className="select" name="airCon" onChange={hdlChange} value={query.airCon}>
          <option disabled={true}>AirCon?</option>
          <option value="&airCon=1">AirCon</option>
          <option value="&airCon=0">No AirCon</option>
          <option value="">Show All Rooms</option>
        </select>
        {/* Sort By */}
        <select className="select" name="orderBySort" onChange={hdlChange} value={query.orderBySort}>
          <option disabled={true}>Sort By:</option>
          <option value="&orderBy=updatedAt&sort=desc">Recently Updated</option>
          <option value="&orderBy=id&sort=asc">Room Number ASC</option>
          <option value="&orderBy=monthlyRate&sort=asc">Monthly Rate ASC</option>
          <option value="&orderBy=monthlyRate&sort=desc">Monthly Rate DESC</option>
        </select>
        {/* Remove filters */}
        <button type="button" className="btn" onClick={removeAllFilters}>
          Remove All Filters
        </button>
      </form>
      {/* Render all rooms */}
      <RoomsContainer rooms={rooms} setQuery={setQuery} filter={filter} />
      {/* Pagination */}
      <Paginate
        setQuery={setQuery}
        filter={filter}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {/* Modal */}
      <dialog id="createRoom-modal" className="modal">
        <div className="modal-box">
          <ModalCreateRoom setQuery={setQuery} filter={filter} />
        </div>
      </dialog>
    </div>
  );
}

export default Rooms;
