import React, { useState } from 'react';
import useUserStore from '../stores/userStore';
import { Link, useNavigate } from 'react-router';
import ModalProfile from './ModalProfile';

function Header() {
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);
  const user = useUserStore((state) => state.user);

  const hdlClickLogout = () => {
    navigate('/');
    logout();
  };

  const hdlProfile = () => {
    setModalState((prv) => true);
    document.getElementById('profile-modal').showModal();
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            RoomFromHome
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 items-center">
            <li>
              <Link to="/rooms">Rooms</Link>
            </li>
            <li>
              <Link to="/tenants">Tenants</Link>
            </li>
            <li>
              <Link to="/leases">Leases</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                {user.firstName} ⬇️
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li onClick={hdlProfile}>
                  <a>My Profile</a>
                </li>
                <li onClick={hdlClickLogout}>
                  <a>Log out</a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
      <dialog id="profile-modal" className="modal">
        <div className="modal-box">{modalState && <ModalProfile setModalState={setModalState} />}</div>
      </dialog>
    </div>
  );
}

export default Header;
