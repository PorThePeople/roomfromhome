import React from 'react';
import TimeAgo from 'react-timeago';
import { SettingsIcon, TrashIcon } from '../icons';

function LeaseItem(props) {
  const { lease } = props;

  // const useTimeAgo = Date.now() - new Date(room.updatedAt) < 4 * 24 * 60 * 60 * 1000 ? true : false;

  return (
    <tr className="hover:bg-base-300">
      <th>{lease.id}</th>
      <td>{lease.roomId}</td>
      <td>{lease.status}</td>
      <td>{new Date(lease.startDate).toISOString().split('T')[0]}</td>
      <td>{lease.duration} Months</td>
      <td>{new Date(lease.endDate).toISOString().split('T')[0]}</td>
      <td>{lease.deposit}</td>
      {/* <td>
        {useTimeAgo ? <TimeAgo date={room.updatedAt} /> : `${new Date(room.updatedAt).toISOString().split('T')[0]}`}
      </td> */}
      <td className="flex gap-4">
        <button type="button" className="btn btn-xs">
          <SettingsIcon className="w-5" />
        </button>
        <button type="button" className="btn btn-xs">
          <TrashIcon className="w-5" />
        </button>
      </td>
    </tr>
  );
}

export default LeaseItem;
