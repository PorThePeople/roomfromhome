import React from 'react';
import LeaseItem from './LeaseItem';

function LeasesContainer(props) {
  const { leases } = props;
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Lease ID</th>
              <th>Room Number</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>Duration</th>
              <th>End Date</th>
              <th>Deposit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Map Items */}
            {leases.map((lease) => {
              return <LeaseItem key={lease.id} lease={lease} />;
            })}
          </tbody>
        </table>
      </div>
      <dialog id="deleteRoom-modal" className="modal">
        <div className="modal-box"></div>
      </dialog>
      <dialog id="editRoom-modal" className="modal">
        <div className="modal-box"></div>
      </dialog>
    </>
  );
}

export default LeasesContainer;
