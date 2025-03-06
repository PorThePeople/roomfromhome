import React from 'react';
import TimeAgo from 'react-timeago';
import { SettingsIcon, TrashIcon } from '../icons';

function RoomItem(props) {
  const { room, hdlDeleteRoom, hdlEditRoom, hdlDetailRoom } = props;

  const useTimeAgo = Date.now() - new Date(room.updatedAt) < 4 * 24 * 60 * 60 * 1000 ? true : false;

  return (
    <tr className="hover:bg-base-300" onClick={() => hdlDetailRoom(room)}>
      <th>{room.id}</th>
      <td>{room.status}</td>
      <td>{room.monthlyRate}</td>
      <td>{room.airCon ? 'Yes' : 'No'}</td>
      <td>{room.furniture}</td>
      <td>
        {useTimeAgo ? <TimeAgo date={room.updatedAt} /> : `${new Date(room.updatedAt).toISOString().split('T')[0]}`}
      </td>
      <td className="flex gap-4">
        <button type="button" className="btn btn-xs" onClick={(e) => hdlEditRoom(e, room)}>
          <SettingsIcon className="w-5 z-10" />
        </button>
        <button type="button" className="btn btn-xs" onClick={(e) => hdlDeleteRoom(e, room)}>
          <TrashIcon className="w-5" />
        </button>
      </td>
    </tr>
  );
}

export default RoomItem;
