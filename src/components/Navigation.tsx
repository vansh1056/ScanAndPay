import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Users, MessageSquare, Phone } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', name: 'Home', icon: FileText },
    { path: '/team', name: 'Team', icon: Users },
    { path: '/feedback', name: 'Feedback', icon: MessageSquare },
    { path: '/contact', name: 'Contact', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-800">Public Printer</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;