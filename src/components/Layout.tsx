import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  User,
  Bell,
  Menu,
  X,
  Calendar,
  Users,
  Settings,
  Moon,
  Sun,
  ChevronDown,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { LogoutButton } from './auth/LogoutButton';
import { useAuth } from '../hooks/useAuth';

type MenuItem = {
  icon: React.ElementType;
  text: string;
  link: string;
  subItems?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { icon: Calendar, text: 'Citas', link: '/citas' },
  {
    icon: Users,
    text: 'Pacientes',
    link: '/pacientes',
    subItems: [
      { icon: Users, text: 'Lista de Pacientes', link: '/pacientes/lista' },
      { icon: User, text: 'Nuevo Paciente', link: '/pacientes/nuevo' },
    ],
  },
  { icon: Settings, text: 'Configuración', link: '/configuracion' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const toggleExpanded = (text: string) => {
    setExpandedItems((prev) =>
      prev.includes(text)
        ? prev.filter((item) => item !== text)
        : [...prev, text]
    );
  };

  const isActive = (link: string) => location.pathname === link;

  const renderMenuItem = (item: MenuItem) => (
    <div key={item.text}>
      <Link
        to={item.link}
        className={`flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
          isActive(item.link)
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
        onClick={(e) => {
          if (item.subItems) {
            e.preventDefault();
            toggleExpanded(item.text);
          } else {
            closeSidebar();
          }
        }}
      >
        <item.icon className="h-5 w-5 mr-3" />
        <span className="flex-grow text-base">{item.text}</span>
        {item.subItems && (
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              expandedItems.includes(item.text) ? 'transform rotate-180' : ''
            }`}
          />
        )}
      </Link>
      {item.subItems && expandedItems.includes(item.text) && (
        <div className="mt-2 ml-4 space-y-1">
          {item.subItems.map((subItem) => (
            <Link
              key={subItem.text}
              to={subItem.link}
              className={`flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
                isActive(subItem.link)
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
              onClick={closeSidebar}
            >
              <subItem.icon className="h-5 w-5 mr-3" />
              <span className="text-base">{subItem.text}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm z-20 border-b lg:border-t transition-colors duration-200 fixed w-full top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  ClinicApp
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Bell className="h-5 w-5" />
              </button>
              <div className="relative">
                <div className="flex items-center">
                  <span className="hidden sm:block mr-3 text-sm text-gray-700 dark:text-gray-300">
                    {user?.nombre} {user?.apellido}
                  </span>
                  <User className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 p-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out z-10 w-64 bg-white dark:bg-gray-800 shadow-lg lg:shadow-none lg:static lg:h-[calc(100vh-4rem)] mt-16 lg:mt-0`}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between h-16 px-4 border-b lg:hidden">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                ClinicApp
              </span>
              <button
                onClick={closeSidebar}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-2 py-4 overflow-y-auto space-y-2">
              {menuItems.map(renderMenuItem)}
            </nav>
            <div className="p-4 border-t dark:border-gray-700">
              <LogoutButton />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:px-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};