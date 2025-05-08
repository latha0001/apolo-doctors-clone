export interface Doctor {
  _id: string;
  name: string;
  qualification: string;
  specialty: string;
  subspecialty?: string;
  experience: number;
  hospital: string;
  location: string;
  availability: string[];
  languages: string[];
  fees: number;
  rating: number;
  reviewCount: number;
  profileImage: string;
  gender: 'Male' | 'Female' | 'Other';
  isAvailableForVideoConsult: boolean;
  isAvailableForHospitalVisit: boolean;
  nextAvailableSlot: string;
  createdAt: string;
}

export interface DoctorListResponse {
  doctors: Doctor[];
  pagination: {
    current: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface FilterOptions {
  specialty?: string;
  gender?: 'Male' | 'Female' | 'Other';
  minExperience?: number;
  consultType?: 'video' | 'hospital';
  hospital?: string;
  location?: string;
  language?: string;
  minFee?: number;
  maxFee?: number;
}