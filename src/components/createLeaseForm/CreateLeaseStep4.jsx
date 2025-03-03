import React, { useState } from 'react';

function CreateLeaseStep4(props) {
  // Props
  const { currentRoom, leaseInfo, tenant, setCurrentStep, hdlCreateLease } = props;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Room Details</legend>

          <label className="fieldset-label">Room Number</label>
          <input type="text" className="input" value={currentRoom.id} disabled />

          <label className="fieldset-label">Monthly Rate</label>
          <input type="text" className="input" value={currentRoom.monthlyRate} disabled />

          <label className="fieldset-label">AirCon</label>
          <input type="text" className="input" value={currentRoom.airCon} disabled />

          <label className="fieldset-label">Furniture</label>
          <input type="text" className="input" value={currentRoom.furniture} disabled />
        </fieldset>
        {/* Lease */}
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Lease Details</legend>

          <label className="fieldset-label">Start Date</label>
          <input type="text" className="input" value={leaseInfo.startDate} disabled />

          <label className="fieldset-label">Duration</label>
          <input type="text" className="input" value={leaseInfo.duration} disabled />

          <label className="fieldset-label">End Date</label>
          <input type="text" className="input" value={leaseInfo.endDate} disabled />

          <label className="fieldset-label">Deposit</label>
          <input type="text" className="input" value={leaseInfo.deposit} disabled />
        </fieldset>
        {/* Tenant */}
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Tenant Details</legend>

          <label className="fieldset-label">Firstname</label>
          <input type="text" className="input" value={tenant.firstName} disabled />

          <label className="fieldset-label">Lastname</label>
          <input type="text" className="input" value={tenant.lastName} disabled />

          <label className="fieldset-label">National Id</label>
          <input type="text" className="input" value={tenant.nationalId} disabled />

          <label className="fieldset-label">Phone Number</label>
          <input type="text" className="input" value={tenant.phone} disabled />
        </fieldset>
      </div>
      <div className="flex justify-center gap-4">
        <button className="btn" onClick={() => setCurrentStep((prv) => prv - 1)}>
          Back
        </button>
        <button className="btn btn-primary" onClick={hdlCreateLease}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default CreateLeaseStep4;
