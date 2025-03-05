import React from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header';

function App() {
  return (
    <>
      <div className="min-h-screen bg-lime-100">
        <Header />
        <main className="flex bg-gray-100">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
