import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-[#3959c3]">
          Apollo <span className="text-[#ff6640]">247</span> Clone
        </h1>
        <p className="text-xl text-gray-600">
          Find the best doctors for your health needs
        </p>
        <div className="pt-6">
          <Link href="/specialties/general-physician-internal-medicine">
            <Button className="bg-[#3959c3] hover:bg-[#304db3] text-white text-lg py-6 px-8">
              View General Physician Listing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}