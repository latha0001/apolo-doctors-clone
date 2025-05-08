import React from 'react';
import Link from 'next/link';
import { Search, Menu, ShoppingCart, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DoctorHeaderProps {
  specialtyName: string;
}

const DoctorHeader: React.FC<DoctorHeaderProps> = ({ specialtyName }) => {
  return (
    <div className="w-full">
      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-[#3959c3] font-bold text-2xl">
                Apollo <span className="text-[#ff6640]">247</span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search doctors, specialties, symptoms..."
                  className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Nav Items */}
            <div className="flex items-center space-x-5">
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/doctors" className="text-gray-700 hover:text-[#3959c3] text-sm font-medium">
                  Doctors
                </Link>
                <Link href="/pharmacy" className="text-gray-700 hover:text-[#3959c3] text-sm font-medium">
                  Pharmacy
                </Link>
                <Link href="/lab-tests" className="text-gray-700 hover:text-[#3959c3] text-sm font-medium">
                  Lab Tests
                </Link>
              </div>

              {/* Icons */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <ShoppingCart size={20} className="text-gray-600" />
                </Button>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <Bell size={20} className="text-gray-600" />
                </Button>
                <Button variant="ghost" size="sm">
                  <User size={20} className="text-gray-600" />
                </Button>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu size={24} className="text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb & Title */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-2">
            <div className="text-sm breadcrumbs text-gray-500">
              <ul className="flex space-x-2">
                <li><Link href="/">Home</Link></li>
                <li className="flex items-center before:content-['/'] before:mx-2">
                  <Link href="/specialties">Specialties</Link>
                </li>
                <li className="flex items-center before:content-['/'] before:mx-2">
                  <span className="text-[#3959c3]">{specialtyName}</span>
                </li>
              </ul>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{specialtyName}</h1>
            <p className="text-gray-600 max-w-3xl">
              Consult with the best General Physicians and Internal Medicine specialists for diagnosis and treatment of various health conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHeader;