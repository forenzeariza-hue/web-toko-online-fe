import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar.jsx';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-[1100px] flex-1 px-4 pt-6 pb-12">
        <Outlet />
      </main>
    </div>
  );
}
