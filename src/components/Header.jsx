import React from 'react';
import useUserStore from '../stores/userStore';
import { Link } from 'react-router';

function Header() {
  const logout = useUserStore((state) => state.logout);
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
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                User ⬇️
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={logout}>
                  <a>Log out</a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
