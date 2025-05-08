import { Doctor, DoctorListResponse, FilterOptions } from '@/app/types/doctor';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3000/api'; // Updated port to match Next.js server

/**
 * Fetches doctors list with optional filters and pagination
 */
export async function getDoctors(
  page: number = 1,
  limit: number = 10,
  filters: FilterOptions = {}
): Promise<DoctorListResponse> {
  try {
    // Construct URL with query parameters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
      ),
    });

    const response = await fetch(`${API_BASE_URL}/doctors?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in getDoctors:', error);
    return {
      doctors: [],
      pagination: {
        current: 1,
        limit: 10,
        total: 0,
        pages: 0
      }
    };
  }
}

/**
 * Fetches list of specialties for filters
 */
export async function getSpecialties(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors/specialties`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in getSpecialties:', error);
    return [];
  }
}

/**
 * Fetches list of hospitals for filters
 */
export async function getHospitals(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors/hospitals`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in getHospitals:', error);
    return [];
  }
}

/**
 * Fetches list of locations for filters
 */
export async function getLocations(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors/locations`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in getLocations:', error);
    return [];
  }
}

/**
 * Adds a new doctor
 */
export async function addDoctor(doctorData: Omit<Doctor, '_id' | 'createdAt'>): Promise<Doctor> {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctorData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in addDoctor:', error);
    throw error;
  }
}