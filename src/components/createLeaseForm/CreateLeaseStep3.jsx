import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TrashIcon } from '../../icons';

function CreateLeaseStep3() {
  // State to lift
  const [tenant, setTenant] = useState({ firstName: '', lastName: '', nationalId: '', phone: '' });
  //
  const hdlSubmit = (value) => {
    console.log(value);
  };

  const hdlChange = () => {
    // setTenant((prv) =>{...prv, e.target.name: e.target.value});
    console.log(tenant);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Primary Tenant</legend>
          <form className="flex flex-col gap-4 p-4 w-[400px] mx-auto">
            {/* Tenant Name */}
            <label className="input w-full">
              <input
                type="input"
                className="grow"
                placeholder="Firstname"
                name="firstName"
                required
                onChange={(e) => hdlChange(e, 0)}
              />
            </label>
            <label className="input w-full">
              <input type="input" className="grow" placeholder="Lastname" required />
            </label>
            {/* National Id */}
            <label className="input w-full">
              <input type="number" className="grow" placeholder="National ID Number" required />
            </label>
            {/*  Phone */}
            <label className="input w-full">
              <input type="number" className="grow" placeholder="Phone Number" required />
            </label>
          </form>
        </fieldset>
      </div>
    </div>
  );
}

export default CreateLeaseStep3;
