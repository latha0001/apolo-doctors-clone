const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');

// MongoDB Connection
mongoose
  .connect('mongodb+srv://lathakadavath0001:<db_password>@cluster0.k5yjflo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Sample doctors data
const doctorsData = [
  {
    name: 'Dr. Arun Kumar',
    qualification: 'MBBS, MD (Internal Medicine)',
    specialty: 'General Physician',
    subspecialty: 'Internal Medicine',
    experience: 15,
    hospital: 'Apollo Hospitals',
    location: 'Delhi',
    availability: ['Mon', 'Wed', 'Fri'],
    languages: ['English', 'Hindi'],
    fees: 1000,
    rating: 4.8,
    reviewCount: 120,
    profileImage: 'https://www.pexels.com/photo/man-wearing-white-dress-shirt-and-black-blazer-5412/download/?w=400',
    gender: 'Male',
    isAvailableForVideoConsult: true,
    isAvailableForHospitalVisit: true
  },
  {
    name: 'Dr. Priya Sharma',
    qualification: 'MBBS, DNB (Internal Medicine)',
    specialty: 'General Physician',
    subspecialty: 'Diabetes Management',
    experience: 10,
    hospital: 'Apollo Clinic',
    location: 'Mumbai',
    availability: ['Tue', 'Thu', 'Sat'],
    languages: ['English', 'Hindi', 'Marathi'],
    fees: 800,
    rating: 4.6,
    reviewCount: 95,
    profileImage: 'https://www.pexels.com/photo/woman-wearing-eyeglasses-3714743/download/?w=400',
    gender: 'Female',
    isAvailableForVideoConsult: true,
    isAvailableForHospitalVisit: true
  },
  {
    name: 'Dr. Rajesh Patel',
    qualification: 'MBBS, MD (General Medicine)',
    specialty: 'General Physician',
    subspecialty: 'Respiratory Medicine',
    experience: 20,
    hospital: 'Apollo Hospitals',
    location: 'Bangalore',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    languages: ['English', 'Kannada', 'Hindi'],
    fees: 1200,
    rating: 4.9,
    reviewCount: 210,
    profileImage: 'https://www.pexels.com/photo/man-wearing-white-dress-shirt-and-black-blazer-5412/download/?w=400',
    gender: 'Male',
    isAvailableForVideoConsult: true,
    isAvailableForHospitalVisit: true
  },
  {
    name: 'Dr. Ananya Reddy',
    qualification: 'MBBS, MD (Internal Medicine), DM (Endocrinology)',
    specialty: 'General Physician',
    subspecialty: 'Endocrinology',
    experience: 12,
    hospital: 'Apollo Health City',
    location: 'Hyderabad',
    availability: ['Wed', 'Thu', 'Fri', 'Sat'],
    languages: ['English', 'Telugu', 'Hindi'],
    fees: 1500,
    rating: 4.7,
    reviewCount: 150,
    profileImage: 'https://www.pexels.com/photo/woman-wearing-eyeglasses-3714743/download/?w=400',
    gender: 'Female',
    isAvailableForVideoConsult: true,
    isAvailableForHospitalVisit: false
  },
  {
    name: 'Dr. Sunil Mehta',
    qualification: 'MBBS, MD (General Medicine)',
    specialty: 'General Physician',
    subspecialty: 'Preventive Health',
    experience: 8,
    hospital: 'Apollo Spectra',
    location: 'Chennai',
    availability: ['Mon', 'Wed', 'Fri', 'Sat'],
    languages: ['English', 'Tamil', 'Hindi'],
    fees: 950,
    rating: 4.5,
    reviewCount: 78,
    profileImage: 'https://www.pexels.com/photo/man-wearing-white-dress-shirt-and-black-blazer-5412/download/?w=400',
    gender: 'Male',
    isAvailableForVideoConsult: true,
    isAvailableForHospitalVisit: true
  },
  {
    name: 'Dr. Meera Iyer',
    qualification: 'MBBS, DNB (Family Medicine)',
    specialty: 'General Physician',
    subspecialty: 'Geriatric Medicine',
    experience: 14,
    hospital: 'Apollo Hospitals',
    location: 'Kolkata',
    availability: ['Tue', 'Thu', 'Sat', 'Sun'],
    languages: ['English', 'Bengali', 'Hindi'],
    fees: 1100,
    rating: 4.8,
    reviewCount: 130,
    profileImage: 'https://www.pexels.com/photo/woman-wearing-eyeglasses-3714743/download/?w=400',
    gender: 'Female',
    isAvailableForVideoConsult: false,
    isAvailableForHospitalVisit: true
  },
  {
    name: 'Dr. Vikas Jain',
    qualification: 'MBBS, MD (General Medicine), DM (Cardiology)',
    specialty: 'General Physician',
    subspecialty: 'Cardiac Health',
    experience: 18,
    hospital: 'Apollo Heart Centre',
    location: 'Delhi',
    availability: ['Mon', 'Tue', 'Thu', 'Fri'],
    languages: ['English', 'Hindi'],
    fees: 1800,
    rating: 4.9,
    reviewCount: 220,
    profileImage: 'https://www.pexels.com/photo/man-wearing-white-dress-shirt-and-black-blazer-5412/download/?w=400',
    gender: 'Male',
    isAvailableForVideoConsult: true,
    isAvailableForHospitalVisit: true
  },
  {
    name: 'Dr. Leela Krishnan',
    qualification: 'MBBS, MD (Internal Medicine)',
    specialty: 'General Physician',
    subspecialty: 'Infectious Diseases',
    experience: 9,
    hospital: 'Apollo Clinic',
    location: 'Bangalore',
    availability: ['Wed', 'Thu', 'Sat', 'Sun'],
    languages: ['English', 'Kannada', 'Tamil'],
    fees: 900,
    rating: 4.6,
    reviewCount: 85,
    profileImage: 'https://www.pexels.com/photo/woman-wearing-eyeglasses-3714743/download/?w=400',
    gender: 'Female',
    isAvailableForVideoConsult: true,
    isAvailableForHospitalVisit: true
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Doctor.deleteMany({});
    console.log('Existing doctors data cleared');

    // Add new data
    await Doctor.insertMany(doctorsData);
    console.log('Database seeded successfully with sample doctors');

    // Close connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err.message);
    mongoose.connection.close();
  }
};

// Execute seed function
seedDatabase();