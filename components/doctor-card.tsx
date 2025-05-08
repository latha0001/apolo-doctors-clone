"use client";

import React from 'react';
import Image from 'next/image';
import { Star, MapPin, CheckCircle, Clock, Video, Hospital } from 'lucide-react';
import { Doctor } from '@/app/types/doctor';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden relative">
              <Image
                src={doctor.profileImage}
                alt={doctor.name}
                width={112}
                height={112}
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-center mt-2">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{doctor.rating}</span>
              <span className="text-gray-500 text-xs ml-1">({doctor.reviewCount})</span>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
              <p className="text-gray-600 text-sm">{doctor.qualification}</p>
              <p className="text-gray-600 text-sm">{doctor.specialty} {doctor.subspecialty ? `• ${doctor.subspecialty}` : ''}</p>
              <p className="text-gray-600 text-sm">{doctor.experience} years experience</p>
            </div>

            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1 text-gray-400" />
              <span>{doctor.hospital}, {doctor.location}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1 text-gray-400" />
              <span>Next available: Today, 2:00 PM</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <div className={cn(
                "flex items-center px-3 py-1 rounded-full text-sm",
                doctor.isAvailableForVideoConsult 
                  ? "bg-blue-50 text-blue-700" 
                  : "bg-gray-100 text-gray-500"
              )}>
                <Video className="w-3 h-3 mr-1" />
                <span>Video Consult</span>
              </div>
              <div className={cn(
                "flex items-center px-3 py-1 rounded-full text-sm",
                doctor.isAvailableForHospitalVisit 
                  ? "bg-green-50 text-green-700" 
                  : "bg-gray-100 text-gray-500"
              )}>
                <Hospital className="w-3 h-3 mr-1" />
                <span>Hospital Visit</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              {doctor.languages.map((language, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          {/* Booking Actions */}
          <div className="flex flex-col items-center justify-between md:items-end space-y-4 mt-4 md:mt-0">
            <div className="text-right">
              <p className="text-gray-500 text-sm">Consultation fee</p>
              <p className="text-lg font-semibold text-gray-800">₹{doctor.fees}</p>
            </div>

            <div className="flex flex-col w-full md:w-auto gap-2">
              {doctor.isAvailableForVideoConsult && (
                <Button className="bg-[#3959c3] hover:bg-[#304db3] text-white">
                  Book Video Consult
                </Button>
              )}
              {doctor.isAvailableForHospitalVisit && (
                <Button variant="outline" className="border-[#3959c3] text-[#3959c3] hover:bg-blue-50">
                  Book Hospital Visit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;