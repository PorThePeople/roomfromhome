import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useUserStore from '../stores/userStore';
import { CashIcon, HashtagIcon, PhoneIcon, RoleIcon, SettingsIcon } from '../icons';
import ModalCreateUser from '../components/ModalCreateUser';

function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const [currentUser, setCurrentUser] = useState();
  const [modalState, setModalState] = useState(false);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUsers((prv) => response.data.results);
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, []);

  const hdlCreateUser = () => {
    setModalState((prv) => true);
    document.getElementById('createUser-modal').showModal();
  };

  return (
    <div className="flex flex-wrap p-4 gap-4 w-full">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body items-center justify-center">
          <h2 className="card-title text-center">Create a new user</h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={hdlCreateUser}>
              +
            </button>
          </div>
        </div>
      </div>
      {allUsers.map((user) => {
        return (
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center">
                {user.firstName} {user.lastName}
              </h2>
              <div className="flex gap-4">
                <HashtagIcon className="w-5" />
                {user.username}
              </div>
              <div className="flex gap-4">
                <PhoneIcon className="w-5" /> {user.phone}
              </div>
              <div className="flex gap-4">
                <RoleIcon className="w-5" />
                {user.role}
              </div>
              <div className="flex gap-4">
                <CashIcon className="w-5" />
                {user.salary}
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-ghost">
                  <SettingsIcon className="w-6" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {/* Modal */}
      <dialog id="createUser-modal" className="modal">
        <div className="modal-box max-w-[1000px]">
          {modalState && <ModalCreateUser setModalState={setModalState} getUsers={getUsers} />}
        </div>
      </dialog>
      {/* {<pre>{JSON.stringify(allUsers, null, 2)}</pre>} */}
    </div>
  );
}

export default Users;
