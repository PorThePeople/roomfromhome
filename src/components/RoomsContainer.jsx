import React from 'react';
import RoomItem from './RoomItem';
import { useState } from 'react';
import ModalDeleteRoom from './ModalDeleteRoom';
import ModalEditRoom from './ModalEditRoom';

function RoomsContainer(props) {
  const { rooms, filter, setQuery } = props;
  const [currentRoom, setCurrentRoom] = useState({});

  const hdlDeleteRoom = (room) => {
    // console.log(room);
    setCurrentRoom((prv) => room);
    document.getElementById('deleteRoom-modal').showModal();
  };

  const hdlEditRoom = (room) => {
    setCurrentRoom((prv) => room);
    // console.log(currentRoom);
    document.getElementById('editRoom-modal').showModal();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Status</th>
              <th>Monthly Rate</th>
              <th>A/C</th>
              <th>Furniture</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => {
              return <RoomItem key={room.id} room={room} hdlDeleteRoom={hdlDeleteRoom} hdlEditRoom={hdlEditRoom} />;
            })}
          </tbody>
        </table>
      </div>
      <dialog id="deleteRoom-modal" className="modal">
        <div className="modal-box">
          <ModalDeleteRoom room={currentRoom} setQuery={setQuery} filter={filter} />
        </div>
      </dialog>
      <dialog id="editRoom-modal" className="modal">
        <div className="modal-box">
          <ModalEditRoom room={currentRoom} setQuery={setQuery} filter={filter} />
        </div>
      </dialog>
    </>
  );
}

export default RoomsContainer;
