import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useUserStore from '../stores/userStore';
import Swal from 'sweetalert2';

import CreateLeaseStep3 from './createLeaseForm/CreateLeaseStep3';
import CreateLeaseStep4 from './createLeaseForm/CreateLeaseStep4';
import CreateLeaseStep2 from './createLeaseForm/CreateLeaseStep2';
import CreateLeaseStep1 from './createLeaseForm/CreateLeaseStep1';

const emptyLease = { startDate: '', duration: '', endDate: '', deposit: '' };

function ModalCreateLease() {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentRoom, setCurrentRoom] = useState({});
  const [leaseInfo, setLeaseInfo] = useState({});
  const [tenant, setTenant] = useState({});

  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);

  // Get All Vacant Rooms
  const getAvailableRooms = async () => {
    const results = await axios.get(`http://localhost:8000/room?status=AVAILABLE`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAvailableRooms((prv) => results?.data?.results);
  };
  // Set Vacant Rooms
  useEffect(() => {
    getAvailableRooms();
  }, []);

  const hdlCloseModal = () => {
    document.getElementById('createLease-modal').close();
    setLeaseInfo((prv) => emptyLease);
    setCurrentRoom((prv) => {});
    setCurrentStep((prv) => 1);
  };

  const hdlCreateLease = async () => {
    const leaseBody = {
      roomId: currentRoom.id,
      signDate: new Date(leaseInfo.startDate).toISOString().split('T')[0],
      startDate: new Date(leaseInfo.startDate).toISOString().split('T')[0],
      duration: Number(leaseInfo.duration),
      endDate: new Date(leaseInfo.endDate).toISOString().split('T')[0],
      deposit: Number(leaseInfo.deposit),
      employeeId: user.id,
    };
    console.log(leaseBody);
    const leaseResult = await axios.post('http://localhost:8000/lease', leaseBody, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(leaseResult);
    const tenantBody = {
      firstName: tenant.firstName,
      lastName: tenant.lastName,
      nationalId: tenant.nationalId,
      phone: tenant.phone,
      leaseId: Number(leaseResult.data.result.id),
    };
    const tenantResult = await axios.post('http://localhost:8000/tenant', tenantBody, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(tenantResult);
    if (tenantResult.status == 201) {
      hdlCloseModal();
      Swal.fire({
        title: 'Create Tenant and Lease Success!',
        icon: 'success',
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Close Button */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={hdlCloseModal}>
        ✕
      </button>
      {/* Progress Indicator */}
      <div className="flex justify-center">
        <ul className="steps">
          <li className={currentStep >= 1 ? 'step step-primary' : 'step'}>Select Room</li>
          <li className={currentStep >= 2 ? 'step step-primary' : 'step'}>Lease Info</li>
          <li className={currentStep >= 3 ? 'step step-primary' : 'step'}>Tenant Info</li>
          <li className={currentStep >= 4 ? 'step step-primary' : 'step'}>Confirmation</li>
        </ul>
      </div>
      {/* Form Content */}
      {/* Step 1 */}
      {currentStep == 1 && (
        <CreateLeaseStep1
          availableRooms={availableRooms}
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      )}
      {/* Step 2 */}
      {currentStep == 2 && (
        <CreateLeaseStep2
          setCurrentStep={setCurrentStep}
          leaseInfo={leaseInfo}
          setLeaseInfo={setLeaseInfo}
          currentRoom={currentRoom}
        />
      )}
      {/* Step 3 */}
      {currentStep == 3 && <CreateLeaseStep3 setCurrentStep={setCurrentStep} tenant={tenant} setTenant={setTenant} />}
      {/* Step 4 */}
      {currentStep == 4 && (
        <CreateLeaseStep4
          currentRoom={currentRoom}
          leaseInfo={leaseInfo}
          tenant={tenant}
          setCurrentStep={setCurrentStep}
          hdlCreateLease={hdlCreateLease}
        />
      )}
      {/* Back/Next Buttons */}
    </div>
  );
}

export default ModalCreateLease;
