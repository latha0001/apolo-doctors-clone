"use client";

import React, { useState, useEffect } from 'react';
import { FilterOptions } from '@/app/types/doctor';
import { getSpecialties, getHospitals, getLocations } from '@/lib/api';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface FilterSidebarProps {
  onChange: (filters: FilterOptions) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onChange }) => {
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [hospitals, setHospitals] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [filters, setFilters] = useState<FilterOptions>({});
  const [experienceValue, setExperienceValue] = useState<number[]>([0]);
  const [feeRange, setFeeRange] = useState<number[]>([500]);

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoading(true);
      try {
        const [specialtiesData, hospitalsData, locationsData] = await Promise.all([
          getSpecialties(),
          getHospitals(),
          getLocations()
        ]);
        
        setSpecialties(specialtiesData);
        setHospitals(hospitalsData);
        setLocations(locationsData);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFilterOptions();
  }, []);

  // Apply filters
  const applyFilters = () => {
    onChange({
      ...filters,
      minExperience: experienceValue[0] > 0 ? experienceValue[0] : undefined,
      minFee: undefined,
      maxFee: feeRange[0] > 500 ? feeRange[0] : undefined,
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({});
    setExperienceValue([0]);
    setFeeRange([500]);
    onChange({});
  };

  // Update filter state
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => {
      // If the same value is clicked again, remove it (toggle behavior)
      if (prev[key] === value) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          className="text-[#3959c3] hover:text-[#304db3] text-sm"
        >
          Reset All
        </Button>
      </div>
      
      <Separator className="my-4" />
      
      {/* Consultation Type */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Consultation Type</h4>
        <RadioGroup 
          value={filters.consultType} 
          onValueChange={(value) => updateFilter('consultType', value as 'video' | 'hospital')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="video" 
              id="consultType-video" 
              className="text-[#3959c3]" 
            />
            <Label htmlFor="consultType-video" className="text-sm cursor-pointer">
              Video Consultation
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="hospital" 
              id="consultType-hospital" 
              className="text-[#3959c3]" 
            />
            <Label htmlFor="consultType-hospital" className="text-sm cursor-pointer">
              Hospital Visit
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <Separator className="my-4" />
      
      {/* Gender */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Gender</h4>
        <RadioGroup 
          value={filters.gender} 
          onValueChange={(value) => updateFilter('gender', value as 'Male' | 'Female' | 'Other')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="Male" 
              id="gender-male" 
              className="text-[#3959c3]" 
            />
            <Label htmlFor="gender-male" className="text-sm cursor-pointer">
              Male Doctor
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="Female" 
              id="gender-female" 
              className="text-[#3959c3]" 
            />
            <Label htmlFor="gender-female" className="text-sm cursor-pointer">
              Female Doctor
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <Separator className="my-4" />
      
      {/* Experience Slider */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Experience (years)</h4>
        <div className="px-2">
          <Slider
            defaultValue={[0]}
            max={30}
            step={1}
            value={experienceValue}
            onValueChange={setExperienceValue}
            className="my-5"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">
              {experienceValue[0]}+ years
            </span>
            {experienceValue[0] > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExperienceValue([0])}
                className="text-[#3959c3] hover:text-[#304db3] text-xs h-6 px-2"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      {/* Fee Range Slider */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Fee Range</h4>
        <div className="px-2">
          <Slider
            defaultValue={[500]}
            min={500}
            max={5000}
            step={100}
            value={feeRange}
            onValueChange={setFeeRange}
            className="my-5"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">
              Up to ₹{feeRange[0]}
            </span>
            {feeRange[0] > 500 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setFeeRange([500])}
                className="text-[#3959c3] hover:text-[#304db3] text-xs h-6 px-2"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      {/* Location */}
      {locations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3">Location</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox 
                  id={`location-${location}`} 
                  className="text-[#3959c3] rounded-sm"
                  checked={filters.location === location}
                  onCheckedChange={(checked) => {
                    if (checked) updateFilter('location', location);
                    else updateFilter('location', undefined);
                  }}
                />
                <Label 
                  htmlFor={`location-${location}`}
                  className="text-sm cursor-pointer"
                >
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Separator className="my-4" />
      
      {/* Hospitals */}
      {hospitals.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3">Hospital</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {hospitals.map((hospital) => (
              <div key={hospital} className="flex items-center space-x-2">
                <Checkbox 
                  id={`hospital-${hospital}`} 
                  className="text-[#3959c3] rounded-sm"
                  checked={filters.hospital === hospital}
                  onCheckedChange={(checked) => {
                    if (checked) updateFilter('hospital', hospital);
                    else updateFilter('hospital', undefined);
                  }}
                />
                <Label 
                  htmlFor={`hospital-${hospital}`}
                  className="text-sm cursor-pointer"
                >
                  {hospital}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Separator className="my-4" />
      
      {/* Languages */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Languages</h4>
        <div className="space-y-2">
          {['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Marathi'].map((language) => (
            <div key={language} className="flex items-center space-x-2">
              <Checkbox 
                id={`language-${language}`} 
                className="text-[#3959c3] rounded-sm"
                checked={filters.language === language}
                onCheckedChange={(checked) => {
                  if (checked) updateFilter('language', language);
                  else updateFilter('language', undefined);
                }}
              />
              <Label 
                htmlFor={`language-${language}`}
                className="text-sm cursor-pointer"
              >
                {language}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <Button 
          onClick={applyFilters} 
          className="w-full bg-[#3959c3] hover:bg-[#304db3]"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;