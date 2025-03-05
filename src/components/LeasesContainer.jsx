import React, { useState } from 'react';
import LeaseItem from './LeaseItem';
import ModalDeleteLease from './ModalDeleteLease';

function LeasesContainer(props) {
  const { leases, filter } = props;
  const [currentLease, setCurrentLease] = useState();

  const hdlDeleteLease = (lease) => {
    setCurrentLease((prv) => lease);
    document.getElementById('deleteLease-modal').showModal();
  };

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
              return <LeaseItem key={lease.id} lease={lease} hdlDeleteLease={hdlDeleteLease} />;
            })}
          </tbody>
        </table>
      </div>

      <dialog id="deleteLease-modal" className="modal">
        <div className="modal-box">{currentLease && <ModalDeleteLease lease={currentLease} filter={filter} />}</div>
      </dialog>
    </>
  );
}

export default LeasesContainer;
