import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminBottomNav } from './AdminBottomNav';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <AdminSidebar />
      
      {/* Main Content - responsive margin */}
      <main className="lg:ml-64 pb-20 lg:pb-0">
        <Outlet />
      </main>
      
      {/* Mobile Bottom Navigation */}
      <AdminBottomNav />
    </div>
  );
}
