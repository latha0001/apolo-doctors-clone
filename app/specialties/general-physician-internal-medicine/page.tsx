import { Metadata } from 'next';
import DoctorHeader from '@/components/doctor-header';
import DoctorListing from '@/components/doctor-listing';

export const metadata: Metadata = {
  title: 'General Physician & Internal Medicine Specialists - Apollo Healthcare',
  description: 'Consult with Apollo\'s top General Physician and Internal Medicine specialists. Book online appointments or hospital visits with experienced doctors.',
  keywords: 'general physician, internal medicine, doctor consultation, Apollo healthcare, medical specialists',
};

export default function GeneralPhysicianPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <DoctorHeader specialtyName="General Physician / Internal Medicine" />
      <DoctorListing />
    </main>
  );
}