import { motion } from 'motion/react';
import { MapPin, Phone, Navigation, Star, Clock, Stethoscope, Filter } from 'lucide-react';
import { useState } from 'react';

interface HealthService {
  id: string;
  name: string;
  type: 'clinic' | 'hospital' | 'vet';
  specializations: string[];
  address: string;
  distance: string;
  rating: number;
  phone: string;
  openNow: boolean;
  hours: string;
  image: string;
}

const mockServices: HealthService[] = [
  {
    id: '1',
    name: 'City General Hospital',
    type: 'hospital',
    specializations: ['Emergency Care', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Surgery'],
    address: '123 Medical Center Dr, Downtown',
    distance: '0.5 km',
    rating: 4.8,
    phone: '+1 (555) 100-2000',
    openNow: true,
    hours: '24/7',
    image: 'hospital',
  },
  {
    id: '2',
    name: 'HealthFirst Clinic',
    type: 'clinic',
    specializations: ['General Medicine', 'Family Practice', 'Vaccinations', 'Health Checkups'],
    address: '456 Wellness Ave, Midtown',
    distance: '1.2 km',
    rating: 4.6,
    phone: '+1 (555) 200-3000',
    openNow: true,
    hours: '8 AM - 8 PM',
    image: 'clinic',
  },
  {
    id: '3',
    name: 'PetCare Veterinary Hospital',
    type: 'vet',
    specializations: ['Small Animals', 'Surgery', 'Dental Care', 'Emergency Pet Care', 'Vaccinations'],
    address: '789 Pet Lane, Uptown',
    distance: '1.8 km',
    rating: 4.9,
    phone: '+1 (555) 300-4000',
    openNow: true,
    hours: '7 AM - 10 PM',
    image: 'vet',
  },
  {
    id: '4',
    name: 'Metro Medical Clinic',
    type: 'clinic',
    specializations: ['Dermatology', 'Internal Medicine', 'Allergy Testing', 'Lab Services'],
    address: '321 Care Street, East Side',
    distance: '2.3 km',
    rating: 4.5,
    phone: '+1 (555) 400-5000',
    openNow: false,
    hours: '9 AM - 6 PM',
    image: 'clinic',
  },
  {
    id: '5',
    name: 'Animal Care Vet Clinic',
    type: 'vet',
    specializations: ['Exotic Pets', 'Behavioral Therapy', 'Nutrition Counseling', 'Grooming'],
    address: '654 Animal Ave, West District',
    distance: '2.7 km',
    rating: 4.7,
    phone: '+1 (555) 500-6000',
    openNow: true,
    hours: '8 AM - 7 PM',
    image: 'vet',
  },
  {
    id: '6',
    name: 'Regional Specialty Hospital',
    type: 'hospital',
    specializations: ['Neurology', 'Oncology', 'Radiology', 'ICU', 'Maternity'],
    address: '987 Healthcare Blvd, North End',
    distance: '3.1 km',
    rating: 4.9,
    phone: '+1 (555) 600-7000',
    openNow: true,
    hours: '24/7',
    image: 'hospital',
  },
];

export function LocateServices() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'clinic' | 'hospital' | 'vet'>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');

  const filteredServices = mockServices
    .filter((service) => selectedFilter === 'all' || service.type === selectedFilter)
    .sort((a, b) => {
      if (sortBy === 'distance') {
        return parseFloat(a.distance) - parseFloat(b.distance);
      } else {
        return b.rating - a.rating;
      }
    });

  const handleGetDirections = (address: string) => {
    // In a real app, this would open Google Maps or similar
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(address)}`, '_blank');
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="space-y-6">
      {/* Filter and Sort Controls */}
      <div className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-3xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-blue-50 text-[#64748B] hover:bg-blue-100'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setSelectedFilter('clinic')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedFilter === 'clinic'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-blue-50 text-[#64748B] hover:bg-blue-100'
              }`}
            >
              Clinics
            </button>
            <button
              onClick={() => setSelectedFilter('hospital')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedFilter === 'hospital'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-blue-50 text-[#64748B] hover:bg-blue-100'
              }`}
            >
              Hospitals
            </button>
            <button
              onClick={() => setSelectedFilter('vet')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedFilter === 'vet'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-blue-50 text-[#64748B] hover:bg-blue-100'
              }`}
            >
              Veterinary
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#64748B]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating')}
              className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-[#1E293B] font-medium focus:outline-none focus:border-blue-500 transition-all"
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Service Icon/Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Service Details */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-[#1E293B]">{service.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          service.type === 'hospital'
                            ? 'bg-red-100 text-red-700'
                            : service.type === 'clinic'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {service.type.charAt(0).toUpperCase() + service.type.slice(1)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B] mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{service.distance} away</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-[#1E293B]">{service.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className={service.openNow ? 'text-green-600 font-medium' : 'text-red-600'}>
                          {service.openNow ? `Open • ${service.hours}` : `Closed • Opens at ${service.hours.split('-')[0]}`}
                        </span>
                      </div>
                    </div>

                    <p className="text-[#64748B] mb-3">{service.address}</p>

                    {/* Specializations */}
                    <div>
                      <p className="text-sm font-semibold text-[#1E293B] mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-2">
                        {service.specializations.map((spec, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={() => handleGetDirections(service.address)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg"
                  >
                    <Navigation className="w-5 h-5" />
                    Get Directions
                  </button>
                  <button
                    onClick={() => handleCall(service.phone)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-200 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-3xl p-12 shadow-lg text-center">
          <MapPin className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[#1E293B] mb-2">No services found</h3>
          <p className="text-[#64748B]">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
