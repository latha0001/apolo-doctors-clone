const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  qualification: {
    type: String,
    required: true,
    trim: true
  },
  specialty: {
    type: String,
    required: true,
    trim: true
  },
  subspecialty: {
    type: String,
    trim: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  hospital: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  availability: {
    type: [String],
    required: true
  },
  languages: {
    type: [String],
    default: ['English']
  },
  fees: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  profileImage: {
    type: String,
    default: 'https://www.apollo247.com/doctors/defaultDoctor.png'
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  isAvailableForVideoConsult: {
    type: Boolean,
    default: true
  },
  isAvailableForHospitalVisit: {
    type: Boolean,
    default: true
  },
  nextAvailableSlot: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema);