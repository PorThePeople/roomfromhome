import React from 'react';

function CreateTenantStep2(props) {
  const { setCurrentStep, newTenant, setNewTenant, hdlCreateTenant } = props;
  const hdlChange = (e) => {
    setNewTenant((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <form className="flex flex-col gap-4 p-4 w-[400px] mx-auto">
          {/* Tenant Name */}
          <label className="input w-full">
            <input
              type="input"
              className="grow"
              placeholder="Firstname"
              name="firstName"
              required
              onChange={(e) => hdlChange(e)}
            />
          </label>
          <label className="input w-full">
            <input
              type="input"
              className="grow"
              placeholder="Lastname"
              name="lastName"
              required
              onChange={(e) => hdlChange(e)}
            />
          </label>
          {/* National Id */}
          <label className="input w-full">
            <input
              type="number"
              className="grow"
              placeholder="National ID Number"
              name="nationalId"
              required
              onChange={(e) => hdlChange(e)}
            />
          </label>
          {/*  Phone */}
          <label className="input w-full">
            <input
              type="number"
              className="grow"
              placeholder="Phone Number"
              name="phone"
              required
              onChange={(e) => hdlChange(e)}
            />
          </label>
        </form>
      </div>
      <div className="flex justify-center gap-4">
        <button className="btn" onClick={() => setCurrentStep((prv) => prv - 1)}>
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={hdlCreateTenant}
          disabled={!newTenant.firstName || !newTenant.lastName || !newTenant.nationalId || !newTenant.phone || false}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CreateTenantStep2;
