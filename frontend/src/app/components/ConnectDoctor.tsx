import { motion } from 'motion/react';
import { Video, Phone, MessageSquare, User, Star, Calendar, Clock, CheckCircle, Wifi } from 'lucide-react';
import { useState } from 'react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  patients: number;
  languages: string[];
  availability: 'available' | 'busy' | 'offline';
  nextAvailable: string;
  image: string;
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'General Physician',
    experience: '12 years',
    rating: 4.9,
    patients: 1520,
    languages: ['English', 'Mandarin', 'Spanish'],
    availability: 'available',
    nextAvailable: 'Now',
    image: 'doctor1',
  },
  {
    id: '2',
    name: 'Dr. Michael Johnson',
    specialty: 'Cardiologist',
    experience: '15 years',
    rating: 4.8,
    patients: 980,
    languages: ['English', 'French'],
    availability: 'available',
    nextAvailable: 'Now',
    image: 'doctor2',
  },
  {
    id: '3',
    name: 'Dr. Emily Roberts',
    specialty: 'Pediatrician',
    experience: '10 years',
    rating: 4.9,
    patients: 1340,
    languages: ['English', 'German'],
    availability: 'busy',
    nextAvailable: 'In 15 mins',
    image: 'doctor3',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Dermatologist',
    experience: '8 years',
    rating: 4.7,
    patients: 750,
    languages: ['English', 'Italian'],
    availability: 'available',
    nextAvailable: 'Now',
    image: 'doctor4',
  },
  {
    id: '5',
    name: 'Dr. Priya Sharma',
    specialty: 'Psychiatrist',
    experience: '14 years',
    rating: 4.9,
    patients: 1120,
    languages: ['English', 'Hindi', 'Urdu'],
    availability: 'offline',
    nextAvailable: 'Tomorrow 9 AM',
    image: 'doctor5',
  },
  {
    id: '6',
    name: 'Dr. Robert Martinez',
    specialty: 'Orthopedic Surgeon',
    experience: '18 years',
    rating: 4.8,
    patients: 890,
    languages: ['English', 'Spanish', 'Portuguese'],
    availability: 'busy',
    nextAvailable: 'In 30 mins',
    image: 'doctor6',
  },
];

export function ConnectDoctor() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [connectionType, setConnectionType] = useState<'video' | 'audio' | 'chat' | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = (doctor: Doctor, type: 'video' | 'audio' | 'chat') => {
    setSelectedDoctor(doctor);
    setConnectionType(type);
    setIsConnecting(true);

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} call initiated with ${doctor.name}!`);
    }, 2000);
  };

  const handleSchedule = (doctor: Doctor) => {
    alert(`Opening scheduler for ${doctor.name}. Select your preferred time slot.`);
  };

  return (
    <div className="space-y-6">
      {/* Connection Status Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
            <Wifi className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-green-900 text-lg">You're Online</h3>
            <p className="text-green-700 text-sm">
              {mockDoctors.filter((d) => d.availability === 'available').length} doctors available for instant consultation
            </p>
          </div>
        </div>
      </div>

      {/* Connecting Modal */}
      {isConnecting && selectedDoctor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
                {connectionType === 'video' && <Video className="w-10 h-10 text-white" />}
                {connectionType === 'audio' && <Phone className="w-10 h-10 text-white" />}
                {connectionType === 'chat' && <MessageSquare className="w-10 h-10 text-white" />}
              </div>
              <h3 className="text-2xl font-bold text-[#1E293B] mb-2">Connecting...</h3>
              <p className="text-[#64748B] mb-4">
                Connecting you with {selectedDoctor.name}
              </p>
              <div className="flex gap-2 justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Doctors List */}
      <div className="grid grid-cols-1 gap-6">
        {mockDoctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Doctor Avatar */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  {/* Online Status */}
                  <div
                    className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white ${
                      doctor.availability === 'available'
                        ? 'bg-green-500'
                        : doctor.availability === 'busy'
                        ? 'bg-yellow-500'
                        : 'bg-gray-400'
                    }`}
                  />
                </div>
              </div>

              {/* Doctor Details */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-[#1E293B]">{doctor.name}</h3>
                      {doctor.availability === 'available' && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          Available Now
                        </span>
                      )}
                    </div>

                    <p className="text-blue-600 font-semibold mb-3">{doctor.specialty}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B] mb-3">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span>{doctor.experience} experience</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-[#1E293B]">{doctor.rating}</span>
                        <span>({doctor.patients}+ patients)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Next: {doctor.nextAvailable}</span>
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-[#1E293B] mb-2">Languages:</p>
                      <div className="flex flex-wrap gap-2">
                        {doctor.languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {doctor.availability === 'available' && (
                    <>
                      <button
                        onClick={() => handleConnect(doctor, 'video')}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg"
                      >
                        <Video className="w-5 h-5" />
                        Video Call
                      </button>
                      <button
                        onClick={() => handleConnect(doctor, 'audio')}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-200 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                      >
                        <Phone className="w-5 h-5" />
                        Audio Call
                      </button>
                      <button
                        onClick={() => handleConnect(doctor, 'chat')}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-200 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                      >
                        <MessageSquare className="w-5 h-5" />
                        Chat
                      </button>
                    </>
                  )}
                  {doctor.availability === 'busy' && (
                    <button
                      onClick={() => handleSchedule(doctor)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg"
                    >
                      <Calendar className="w-5 h-5" />
                      Schedule for {doctor.nextAvailable}
                    </button>
                  )}
                  {doctor.availability === 'offline' && (
                    <button
                      onClick={() => handleSchedule(doctor)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg"
                    >
                      <Calendar className="w-5 h-5" />
                      Schedule Appointment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-3xl p-6 shadow-lg">
        <h3 className="font-bold text-[#1E293B] text-lg mb-2">How It Works</h3>
        <ul className="space-y-2 text-[#64748B]">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>Choose a doctor based on specialty and availability</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>Connect instantly via video, audio, or chat</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>Schedule appointments if doctor is busy</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>All consultations are secure and HIPAA compliant</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
