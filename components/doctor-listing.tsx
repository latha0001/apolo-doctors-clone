"use client";

import React, { useState, useEffect } from 'react';
import { getDoctors } from '@/lib/api';
import { Doctor, FilterOptions } from '@/app/types/doctor';
import DoctorCard from '@/components/doctor-card';
import FilterSidebar from '@/components/filter-sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/pagination';

const DoctorListing: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalDoctors, setTotalDoctors] = useState<number>(0);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const result = await getDoctors(currentPage, 5, filters);
      setDoctors(result.doctors);
      setTotalPages(result.pagination.pages);
      setTotalDoctors(result.pagination.total);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [currentPage, filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <Button 
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            variant="outline"
            className="w-full"
          >
            {isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {/* Filter Sidebar - Mobile */}
        <div className={`md:hidden ${isMobileFilterOpen ? 'block' : 'hidden'}`}>
          <FilterSidebar onChange={handleFilterChange} />
        </div>

        {/* Filter Sidebar - Desktop */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          <FilterSidebar onChange={handleFilterChange} />
        </div>

        {/* Doctor Listing */}
        <div className="flex-1">
          {/* Result Summary */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {loading ? 'Finding doctors...' : `${totalDoctors} Doctors found`}
            </h2>
            <p className="text-gray-600 text-sm">General Physician / Internal Medicine specialists</p>
          </div>

          {/* Doctor Cards */}
          <div className="space-y-6">
            {loading ? (
              // Loading skeletons
              Array(5).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex gap-2 mt-4">
                        <Skeleton className="h-8 w-28" />
                        <Skeleton className="h-8 w-28" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : doctors.length > 0 ? (
              doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No doctors found</h3>
                <p className="text-gray-600">Try adjusting your filters to find more doctors.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-8">
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;