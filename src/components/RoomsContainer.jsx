import React from 'react';
import RoomItem from './RoomItem';
import { useState } from 'react';
import ModalDeleteRoom from './ModalDeleteRoom';
import ModalEditRoom from './ModalEditRoom';
import ModalRoomDetails from './ModalRoomDetails';

function RoomsContainer(props) {
  const { rooms, filter, setQuery } = props;
  const [currentRoom, setCurrentRoom] = useState({});
  const [deleteModalState, setDeleteModalState] = useState(false);

  const hdlDeleteRoom = (e, room) => {
    e.stopPropagation();
    setDeleteModalState((prv) => true);
    setCurrentRoom((prv) => room);
    document.getElementById('deleteRoom-modal').showModal();
  };

  const hdlEditRoom = (e, room) => {
    e.stopPropagation();
    setCurrentRoom((prv) => room);
    // console.log(currentRoom);
    document.getElementById('editRoom-modal').showModal();
  };

  const hdlDetailRoom = (room) => {
    setCurrentRoom((prv) => room);
    document.getElementById('detailRoom-modal').showModal();
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
              return (
                <RoomItem
                  key={room.id}
                  room={room}
                  hdlDetailRoom={hdlDetailRoom}
                  hdlDeleteRoom={hdlDeleteRoom}
                  hdlEditRoom={hdlEditRoom}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Modal 1 */}
      <dialog id="deleteRoom-modal" className="modal">
        <div className="modal-box">
          {deleteModalState && (
            <ModalDeleteRoom
              room={currentRoom}
              setQuery={setQuery}
              filter={filter}
              setDeleteModalState={setDeleteModalState}
            />
          )}
        </div>
      </dialog>
      {/* Modal 2 */}
      <dialog id="editRoom-modal" className="modal">
        <div className="modal-box">
          <ModalEditRoom room={currentRoom} setQuery={setQuery} filter={filter} />
        </div>
      </dialog>
      {/* Modal 3 */}
      <dialog id="detailRoom-modal" className="modal">
        <div className="modal-box max-w-[1000px]">
          <ModalRoomDetails
            room={currentRoom}
            setCurrentRoom={setCurrentRoom}
            hdlDeleteRoom={hdlDeleteRoom}
            hdlEditRoom={hdlEditRoom}
          />
        </div>
      </dialog>
    </>
  );
}

export default RoomsContainer;
