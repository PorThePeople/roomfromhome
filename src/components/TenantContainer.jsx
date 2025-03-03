import React, { useState } from 'react';
import TenantItem from './TenantItem';
import ModalEditTenant from './ModalEditTenant';
import ModalDeleteTenant from './ModalDeleteTenant';

function TenantContainer(props) {
  const { tenants, getTenants } = props;
  const [currentTenant, setCurrentTenant] = useState({});

  const hdlEditTenant = (tenant) => {
    setCurrentTenant((prv) => tenant);
    document.getElementById('editTenant-modal').showModal();
  };

  const hdlDeleteTenant = (tenant) => {
    setCurrentTenant((prv) => tenant);
    document.getElementById('deleteTenant-modal').showModal();
  };

  return (
    <div>
      <>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Tenant ID</th>
                <th>Room Number</th>
                <th>Lease ID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => {
                return (
                  <TenantItem
                    key={tenant.id}
                    tenant={tenant}
                    hdlEditTenant={hdlEditTenant}
                    hdlDeleteTenant={hdlDeleteTenant}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <dialog id="deleteTenant-modal" className="modal">
          <div className="modal-box">
            <ModalDeleteTenant tenant={currentTenant} getTenants={getTenants} />
          </div>
        </dialog>
        <dialog id="editTenant-modal" className="modal">
          <div className="modal-box">
            <ModalEditTenant tenant={currentTenant} getTenants={getTenants} />
          </div>
        </dialog>
      </>
    </div>
  );
}

export default TenantContainer;
