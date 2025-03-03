import React, { useState } from 'react';
import axios from 'axios';
import CreateTenantStep1 from './createTenantForm/CreateTenantStep1';
import CreateTenantStep2 from './createTenantForm/CreateTenantStep2';
import useUserStore from '../stores/userStore';
import Swal from 'sweetalert2';

function ModalCreateTenant() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentLease, setCurrentLease] = useState({});
  const [newTenant, setNewTenant] = useState({});

  const token = useUserStore((state) => state.token);

  const hdlCloseModal = () => {
    document.getElementById('createTenant-modal').close();
    setCurrentStep((prv) => 1);
    setCurrentLease((prv) => {});
  };

  const hdlCreateTenant = async () => {
    const body = {
      leaseId: currentLease.id,
      firstName: newTenant.firstName,
      lastName: newTenant.lastName,
      nationalId: newTenant.nationalId,
      phone: newTenant.phone,
    };
    const response = await axios.post('http://localhost:8000/tenant', body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status == 201) {
      hdlCloseModal();
      Swal.fire({
        title: 'Create Tenant Successful!',
        icon: 'success',
      });
    }
  };

  return (
    <div>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={hdlCloseModal}>
        ✕
      </button>
      {/* Steps */}
      {/* Step 1 */}
      {currentStep == 1 && (
        <CreateTenantStep1
          currentLease={currentLease}
          setCurrentLease={setCurrentLease}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      )}
      {/* Step 2 */}
      {currentStep == 2 && (
        <CreateTenantStep2
          currentLease={currentLease}
          setCurrentStep={setCurrentStep}
          newTenant={newTenant}
          setNewTenant={setNewTenant}
          hdlCreateTenant={hdlCreateTenant}
        />
      )}
    </div>
  );
}

export default ModalCreateTenant;
