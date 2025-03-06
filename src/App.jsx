import React from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header';

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 ">
        <Header />
        <main className="flex ">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
