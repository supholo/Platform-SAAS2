import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  Bell, 
  Sun, 
  Moon,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Search,
  Activity,
  Shield,
  Users,
  Layout as LayoutIcon,
  FileText
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const menuItems = [
    { path: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/cicd', icon: <GitBranch size={20} />, label: 'CI/CD' },
    { path: '/logging', icon: <Search size={20} />, label: 'Logging' },
    { path: '/metrics', icon: <Activity size={20} />, label: 'Metrics' },
    { path: '/identity', icon: <Shield size={20} />, label: 'Identity' },
    { path: '/roles', icon: <Users size={20} />, label: 'Roles' },
    { path: '/page-builder', icon: <LayoutIcon size={20} />, label: 'Page Builder' },
    { path: '/audit-log', icon: <FileText size={20} />, label: 'Audit Log' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <aside 
          className={`${
            sidebarCollapsed ? 'w-20' : 'w-64'
          } transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
              {!sidebarCollapsed && (
                <span className="text-xl font-semibold text-gray-800 dark:text-white">Admin</span>
              )}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-2 px-3">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center ${
                        sidebarCollapsed ? 'justify-center' : 'justify-start'
                      } px-3 py-2 rounded-lg transition-all duration-200 ${
                        location.pathname === item.path
                          ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="flex items-center">
                        {item.icon}
                      </span>
                      {!sidebarCollapsed && (
                        <span className="ml-3 text-sm font-medium">{item.label}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top navbar */}
          <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <Link 
                  to="/notifications"
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Bell size={20} />
                </Link>
                <Link 
                  to="/settings"
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Settings size={20} />
                </Link>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;