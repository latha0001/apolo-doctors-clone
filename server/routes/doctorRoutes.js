const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

/**
 * @route   POST /api/doctors
 * @desc    Add a new doctor
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const doctor = await newDoctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    console.error('Error adding doctor:', err);
    res.status(500).json({ 
      message: 'Failed to add doctor',
      error: err.message 
    });
  }
});

/**
 * @route   GET /api/doctors
 * @desc    Get list of doctors with filters
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build filter query
    const filterQuery = {};
    
    // Specialty filter
    if (req.query.specialty) {
      filterQuery.specialty = req.query.specialty;
    }
    
    // Experience filter
    if (req.query.minExperience) {
      filterQuery.experience = { $gte: parseInt(req.query.minExperience) };
    }
    
    // Gender filter
    if (req.query.gender) {
      filterQuery.gender = req.query.gender;
    }
    
    // Availability filter (Video consult or Hospital visit)
    if (req.query.consultType === 'video') {
      filterQuery.isAvailableForVideoConsult = true;
    } else if (req.query.consultType === 'hospital') {
      filterQuery.isAvailableForHospitalVisit = true;
    }
    
    // Hospital filter
    if (req.query.hospital) {
      filterQuery.hospital = req.query.hospital;
    }
    
    // Location filter
    if (req.query.location) {
      filterQuery.location = req.query.location;
    }
    
    // Language filter
    if (req.query.language) {
      filterQuery.languages = { $in: [req.query.language] };
    }
    
    // Fee range filter
    if (req.query.minFee && req.query.maxFee) {
      filterQuery.fees = { 
        $gte: parseInt(req.query.minFee), 
        $lte: parseInt(req.query.maxFee) 
      };
    } else if (req.query.minFee) {
      filterQuery.fees = { $gte: parseInt(req.query.minFee) };
    } else if (req.query.maxFee) {
      filterQuery.fees = { $lte: parseInt(req.query.maxFee) };
    }
    
    // Execute query with pagination
    const [doctors, total] = await Promise.all([
      Doctor.find(filterQuery)
        .sort({ rating: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Doctor.countDocuments(filterQuery)
    ]);
    
    res.status(200).json({
      doctors,
      pagination: {
        current: page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ 
      message: 'Failed to fetch doctors',
      error: err.message 
    });
  }
});

/**
 * @route   GET /api/doctors/specialties
 * @desc    Get all specialties for filters
 * @access  Public
 */
router.get('/specialties', async (req, res) => {
  try {
    const specialties = await Doctor.distinct('specialty');
    if (!specialties) {
      return res.status(404).json({ 
        message: 'No specialties found' 
      });
    }
    res.status(200).json(specialties);
  } catch (err) {
    console.error('Error fetching specialties:', err);
    res.status(500).json({ 
      message: 'Failed to fetch specialties',
      error: err.message 
    });
  }
});

/**
 * @route   GET /api/doctors/hospitals
 * @desc    Get all hospitals for filters
 * @access  Public
 */
router.get('/hospitals', async (req, res) => {
  try {
    const hospitals = await Doctor.distinct('hospital');
    if (!hospitals) {
      return res.status(404).json({ 
        message: 'No hospitals found' 
      });
    }
    res.status(200).json(hospitals);
  } catch (err) {
    console.error('Error fetching hospitals:', err);
    res.status(500).json({ 
      message: 'Failed to fetch hospitals',
      error: err.message 
    });
  }
});

/**
 * @route   GET /api/doctors/locations
 * @desc    Get all locations for filters
 * @access  Public
 */
router.get('/locations', async (req, res) => {
  try {
    const locations = await Doctor.distinct('location');
    if (!locations) {
      return res.status(404).json({ 
        message: 'No locations found' 
      });
    }
    res.status(200).json(locations);
  } catch (err) {
    console.error('Error fetching locations:', err);
    res.status(500).json({ 
      message: 'Failed to fetch locations',
      error: err.message 
    });
  }
});

module.exports = router;