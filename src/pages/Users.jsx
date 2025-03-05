import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useUserStore from '../stores/userStore';
import { CashIcon, HashtagIcon, PhoneIcon, RoleIcon, SettingsIcon, TrashIcon } from '../icons';
import ModalCreateUser from '../components/ModalCreateUser';
import ModalEditUser from '../components/ModalEditUser';
import ModalDeleteUser from '../components/ModalDeleteUser';

function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const [currentUser, setCurrentUser] = useState();
  const [createModalState, setCreateModalState] = useState(false);
  const [editModalState, setEditModalState] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);

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
    setCreateModalState((prv) => true);
    document.getElementById('createUser-modal').showModal();
  };

  const hdlEditUser = (user) => {
    setCurrentUser((prv) => user);
    setEditModalState((prv) => true);
    document.getElementById('editUser-modal').showModal();
  };

  const hdlDeleteUser = (user) => {
    setCurrentUser((prv) => user);
    setDeleteModalState((prv) => true);
    document.getElementById('deleteUser-modal').showModal();
  };

  return (
    <div className="flex flex-wrap p-4 gap-4 w-full">
      <div className="card bg-base-100 shadow-sm hover:bg-gray-100 w-[250px] cursor-pointer" onClick={hdlCreateUser}>
        <div className="card-body items-center justify-center">
          <h2 className="card-title text-center">Create a new user</h2>
          <h2 className="card-title text-center text-5xl">+</h2>
        </div>
      </div>
      {allUsers.map((user) => {
        return (
          <div className="card bg-base-100 shadow-sm w-[250px]">
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
              <div className="card-actions flex justify-center">
                <button className="btn btn-ghost" onClick={() => hdlEditUser(user)}>
                  <SettingsIcon className="w-6" />
                </button>
                <button className="btn btn-ghost" onClick={() => hdlDeleteUser(user)}>
                  <TrashIcon className="w-6" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {/* Modal */}
      <dialog id="createUser-modal" className="modal">
        <div className="modal-box max-w-[1000px]">
          {createModalState && <ModalCreateUser setModalState={setCreateModalState} getUsers={getUsers} />}
        </div>
      </dialog>
      <dialog id="editUser-modal" className="modal">
        <div className="modal-box">
          {editModalState && (
            <ModalEditUser
              setEditModalState={setEditModalState}
              getUsers={getUsers}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        </div>
      </dialog>
      <dialog id="deleteUser-modal" className="modal">
        <div className="modal-box">
          {deleteModalState && (
            <ModalDeleteUser
              setCurrentUser={setCurrentUser}
              setDeleteModalState={setDeleteModalState}
              getUsers={getUsers}
              currentUser={currentUser}
            />
          )}
        </div>
      </dialog>
    </div>
  );
}

export default Users;
