import React, { useState } from 'react';
import { MoveInIcon, MoveOutIcon, SettingsIcon } from '../icons';
import useUserStore from '../stores/userStore';
import dayjs from 'dayjs';

function Dashboard() {
  const user = useUserStore((state) => state.user);
  const todayDate = dayjs().format('dddd, DD MMMM YYYY');

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-4">
      <div className="text-3xl">Hello, {user.firstName}!</div>
      <div className="text-2xl">{todayDate}</div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <MoveInIcon className="w-11" />
          </div>
          <div className="stat-title">Moving In Today</div>
          <div className="stat-value">#</div>
          <div className="stat-desc">Feature In Development</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <MoveOutIcon className="w-11" />
          </div>
          <div className="stat-title">Lease Ending Soon</div>
          <div className="stat-value">#</div>
          <div className="stat-desc">Feature In Development</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <SettingsIcon className="w-11" />
          </div>
          <div className="stat-title">Maintenance</div>
          <div className="stat-value">#</div>
          <div className="stat-desc">Feature In Development</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
