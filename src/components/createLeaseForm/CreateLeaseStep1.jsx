import React from 'react';

function CreateLeaseStep1(props) {
  const { availableRooms, currentRoom, setCurrentRoom, currentStep, setCurrentStep } = props;
  // Select a vacant room
  const hdlSelectRoom = (room) => {
    setCurrentRoom((prv) => room);
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        {/* Available Rooms */}
        <div className="flex flex-wrap justify-start items-start p-4 gap-4 flex-1">
          {/* <pre>{JSON.stringify(availableRooms, null, 2)}</pre> */}
          {availableRooms.map((room) => {
            return (
              <button className="btn w-[50px]" key={room.id} onClick={() => hdlSelectRoom(room)}>
                {room.id}
              </button>
            );
          })}
        </div>
        <form className="flex flex-col gap-4 p-4 w-[400px] mx-auto">
          {/* Room Id */}
          <label className="input w-full">
            <input type="input" className="grow" placeholder="Room Number" required value={currentRoom?.id} disabled />
          </label>
          {/* MonthlyRate */}
          <label className="input w-full">
            <input
              type="number"
              className="grow"
              placeholder="Monthly Rate"
              required
              value={currentRoom?.monthlyRate}
              disabled
            />
          </label>
          {/* AirCon */}
          <label className="flex justify-between px-3">
            <div>Air Conditioning</div>
            <label className="toggle text-base-content">
              <input type="checkbox" checked={currentRoom?.airCon} disabled />
              <svg
                aria-label="disabled"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <svg aria-label="enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" fill="none" stroke="currentColor">
                  <path d="M20 6 9 17l-5-5"></path>
                </g>
              </svg>
            </label>
          </label>

          {/* Furniture */}
          <label className="input w-full">
            <input type="input" className="grow" placeholder="Furniture" value={currentRoom?.furniture} />
          </label>
        </form>
      </div>
      <div className="flex justify-center gap-4">
        <button
          className="btn"
          onClick={() => setCurrentStep((prv) => prv - 1)}
          disabled={currentStep == 1 ? true : false}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentStep((prv) => prv + 1)}
          disabled={!currentRoom?.id ? true : false}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CreateLeaseStep1;
