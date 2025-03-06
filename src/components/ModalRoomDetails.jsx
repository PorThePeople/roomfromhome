import React from 'react';

function ModalRoomDetails(props) {
  const { room, hdlDeleteRoom, hdlEditRoom } = props;

  const hdlCloseModal = () => {
    document.getElementById('detailRoom-modal').close();
  };

  const hdlDelete = (e, room) => {
    hdlCloseModal();
    hdlDeleteRoom(e, room);
  };

  const hdlEdit = (e, room) => {
    hdlCloseModal();
    hdlEditRoom(e, room);
  };

  return (
    <div className="flex gap-4">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={hdlCloseModal}>
        ✕
      </button>
      {/* Carousel */}
      <div className="w-1/2 h-3/6 my-auto">
        <div className="carousel rounded-md">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide4" className="btn btn-circle" disabled>
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle ">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://images.pexels.com/photos/18470965/pexels-photo-18470965/free-photo-of-a-table-in-a-dining-room.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="https://images.pexels.com/photos/20277194/pexels-photo-20277194/free-photo-of-presidential-suite-living-room-presidential-serviced-apartments-kensington.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle" disabled>
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 w-1/2 justify-between">
        <fieldset className="fieldset border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Room Info</legend>
          <div>Room Number: {room.id}</div>
          <div>Monthly Rate: {room.monthlyRate}</div>
          <div>Status: {room.status}</div>
        </fieldset>

        {room?.Lease?.length > 0 && (
          <>
            <fieldset className="fieldset flex-1 border border-base-300 p-4 rounded-box">
              <legend className="fieldset-legend">Lease Info</legend>
              <div> Lease ID: {room.Lease[0].id}</div>
              <div> Start Date: {room.Lease[0].startDate.split('T')[0]}</div>
              <div> Duration: {room.Lease[0].duration} Months</div>
              <div> End Date: {room.Lease[0].endDate.split('T')[0]}</div>
            </fieldset>
            <fieldset className="fieldset flex-1 border border-base-300 p-4 rounded-box">
              <legend className="fieldset-legend">Tenant Info</legend>
              {room.Lease[0].Tenant.map((tenant) => {
                return (
                  <div>
                    {tenant.firstName} {tenant.lastName}
                  </div>
                );
              })}
            </fieldset>
          </>
        )}
        <div className="flex gap-4 justify-center">
          <button className="btn btn-primary" onClick={(e) => hdlEdit(e, room)}>
            Edit Room
          </button>
          <button className="btn btn-error text-white" onClick={(e) => hdlDelete(e, room)}>
            Delete Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalRoomDetails;
