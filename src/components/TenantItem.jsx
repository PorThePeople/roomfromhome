import React from 'react';
import { SettingsIcon, TrashIcon } from '../icons';

function TenantItem(props) {
  const { tenant, hdlEditTenant, hdlDeleteTenant } = props;

  return (
    <tr className="hover:bg-base-300">
      <th>{tenant.id}</th>
      <td>{tenant.lease.roomId}</td>
      <td>{tenant.leaseId}</td>
      <td>{tenant.firstName}</td>
      <td>{tenant.lastName}</td>
      <td>{tenant.phone}</td>
      <td>{tenant.status}</td>
      <td className="flex gap-4">
        <button type="button" className="btn btn-xs" onClick={() => hdlEditTenant(tenant)}>
          <SettingsIcon className="w-5" />
        </button>
        <button type="button" className="btn btn-xs" onClick={() => hdlDeleteTenant(tenant)}>
          <TrashIcon className="w-5" />
        </button>
      </td>
    </tr>
  );
}

export default TenantItem;
