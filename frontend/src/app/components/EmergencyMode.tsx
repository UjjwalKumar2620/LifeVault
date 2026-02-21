import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Heart, Car, Phone, AlertTriangle, CheckCircle, X, MapPin, Bell } from 'lucide-react';

type EmergencyType = 'blood' | 'attack' | 'accident' | null;
type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

interface BloodDonor {
  id: string;
  name: string;
  bloodType: BloodType;
  phone: string;
  location: string;
  distance: string;
  lastDonation: string;
}

const mockDonors: BloodDonor[] = [
  { id: '1', name: 'John Smith', bloodType: 'O+', phone: '+1 (555) 123-4567', location: 'Downtown Medical', distance: '0.8 km', lastDonation: '3 months ago' },
  { id: '2', name: 'Sarah Johnson', bloodType: 'O+', phone: '+1 (555) 234-5678', location: 'City Hospital', distance: '1.2 km', lastDonation: '5 months ago' },
  { id: '3', name: 'Michael Chen', bloodType: 'O+', phone: '+1 (555) 345-6789', location: 'Health Center', distance: '1.5 km', lastDonation: '4 months ago' },
  { id: '4', name: 'Emily Davis', bloodType: 'O+', phone: '+1 (555) 456-7890', location: 'Community Clinic', distance: '2.1 km', lastDonation: '6 months ago' },
];

const cprSteps = [
  { step: 1, title: 'Call for Help', description: 'Ensure ambulance is on the way (112). Get an AED if available.' },
  { step: 2, title: 'Check Responsiveness', description: 'Tap shoulders and shout. If no response, begin CPR immediately.' },
  { step: 3, title: 'Position Hands', description: 'Place heel of hand on center of chest. Place other hand on top, interlace fingers.' },
  { step: 4, title: 'Chest Compressions', description: 'Push hard and fast - at least 2 inches deep, 100-120 compressions per minute.' },
  { step: 5, title: 'Give Rescue Breaths', description: 'After 30 compressions, give 2 rescue breaths. Tilt head back, lift chin, pinch nose.' },
  { step: 6, title: 'Continue CPR', description: 'Repeat 30 compressions and 2 breaths until help arrives or person responds.' },
];

export function EmergencyMode() {
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyType>(null);
  const [selectedBloodType, setSelectedBloodType] = useState<BloodType | null>(null);
  const [ambulanceCalled, setAmbulanceCalled] = useState(false);
  const [policeCalled, setPoliceCalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [emergencyAlertSent, setEmergencyAlertSent] = useState(false);

  const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Emergency contacts
  const emergencyContacts = [
    { name: 'Family - John Doe', phone: '+1 (555) 111-2222' },
    { name: 'Spouse - Jane Doe', phone: '+1 (555) 333-4444' },
    { name: 'Friend - Mike Smith', phone: '+1 (555) 555-6666' },
    { name: 'Doctor - Dr. Sarah Chen', phone: '+1 (555) 777-8888' },
  ];

  const handleSendEmergencyAlert = () => {
    setEmergencyAlertSent(true);
    // In a real app, this would send SMS/notification to all emergency contacts
    alert(`Emergency Alert sent to ${emergencyContacts.length} contacts:\n\n${emergencyContacts.map(c => `${c.name}: ${c.phone}`).join('\n')}\n\nMessage: "Emergency! I need immediate help. Please contact me or emergency services."`);
  };

  const handleCallAmbulance = () => {
    setAmbulanceCalled(true);
    // In a real app, this would trigger actual emergency call
    window.open('tel:112', '_self');
  };

  const handleCallPolice = () => {
    setPoliceCalled(true);
    window.open('tel:100', '_self');
  };

  const handleCallDonor = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const resetEmergency = () => {
    setSelectedEmergency(null);
    setSelectedBloodType(null);
    setAmbulanceCalled(false);
    setPoliceCalled(false);
    setShowInstructions(false);
    setEmergencyAlertSent(false);
  };

  return (
    <div className="space-y-6">
      {/* Emergency Type Selection */}
      {!selectedEmergency && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-bold text-red-900">Emergency Services</h3>
            </div>
            <p className="text-red-700">
              Select the type of emergency you're experiencing. This is for real emergencies only.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blood Need */}
            <motion.button
              onClick={() => setSelectedEmergency('blood')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-red-100 hover:border-red-300 hover:shadow-xl transition-all text-left group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Droplet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E293B] mb-2">Urgent Blood Need</h3>
              <p className="text-[#64748B]">
                Find blood donors near you immediately
              </p>
            </motion.button>

            {/* Heart Attack */}
            <motion.button
              onClick={() => setSelectedEmergency('attack')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-red-100 hover:border-red-300 hover:shadow-xl transition-all text-left group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E293B] mb-2">Heart/Panic Attack</h3>
              <p className="text-[#64748B]">
                Get emergency help and CPR instructions
              </p>
            </motion.button>

            {/* Accident */}
            <motion.button
              onClick={() => setSelectedEmergency('accident')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-red-100 hover:border-red-300 hover:shadow-xl transition-all text-left group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E293B] mb-2">Accident</h3>
              <p className="text-[#64748B]">
                Call ambulance and police immediately
              </p>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Blood Need Flow */}
      <AnimatePresence>
        {selectedEmergency === 'blood' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-[#1E293B]">Urgent Blood Request</h2>
              <button
                onClick={resetEmergency}
                className="w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>
            </div>

            {!selectedBloodType ? (
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-[#1E293B] mb-6">Select Blood Type Needed</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bloodTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedBloodType(type)}
                      className="py-6 px-4 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl font-bold text-2xl hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-bold text-green-900">Blood Type: {selectedBloodType}</p>
                      <p className="text-sm text-green-700">Found {mockDonors.length} available donors nearby</p>
                    </div>
                  </div>
                </div>

                {mockDonors.map((donor) => (
                  <motion.div
                    key={donor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold">
                            {donor.bloodType}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#1E293B]">{donor.name}</h4>
                            <p className="text-sm text-[#64748B]">Last donation: {donor.lastDonation}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-[#64748B] mt-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {donor.location} • {donor.distance}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCallDonor(donor.phone)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
                      >
                        <Phone className="w-5 h-5" />
                        Call Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart/Panic Attack Flow */}
      <AnimatePresence>
        {selectedEmergency === 'attack' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-[#1E293B]">Heart/Panic Attack Emergency</h2>
              <button
                onClick={resetEmergency}
                className="w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>
            </div>

            {/* Call Ambulance Button */}
            <motion.button
              onClick={handleCallAmbulance}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-8 rounded-3xl font-bold text-2xl shadow-2xl transition-all ${
                ambulanceCalled
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-red-500/50'
              }`}
            >
              {ambulanceCalled ? (
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle className="w-8 h-8" />
                  <span>Ambulance Called - Help is on the way!</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Phone className="w-8 h-8" />
                  <span>Call Ambulance (112)</span>
                </div>
              )}
            </motion.button>

            {/* Alert Emergency Contacts Button */}
            <motion.button
              onClick={handleSendEmergencyAlert}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-6 rounded-2xl font-bold text-xl shadow-xl transition-all ${
                emergencyAlertSent
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-orange-500/50'
              }`}
            >
              {emergencyAlertSent ? (
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  <span>Alert Sent to {emergencyContacts.length} Contacts</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Bell className="w-6 h-6 animate-pulse" />
                  <span>Alert Emergency Contacts</span>
                </div>
              )}
            </motion.button>

            {ambulanceCalled && !showInstructions && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setShowInstructions(true)}
                className="w-full py-6 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold text-lg transition-colors"
              >
                Show CPR Instructions
              </motion.button>
            )}

            {/* CPR Instructions */}
            <AnimatePresence>
              {showInstructions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-3xl p-8 shadow-xl"
                >
                  <h3 className="text-2xl font-bold text-[#1E293B] mb-6 flex items-center gap-3">
                    <Heart className="w-7 h-7 text-red-500" />
                    CPR Instructions - While Waiting for Ambulance
                  </h3>
                  <div className="space-y-4">
                    {cprSteps.map((instruction, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                          {instruction.step}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#1E293B] mb-1">{instruction.title}</h4>
                          <p className="text-[#64748B]">{instruction.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <p className="text-yellow-900 font-semibold">
                      ⚠️ Continue CPR until ambulance arrives or person shows signs of life
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accident Flow */}
      <AnimatePresence>
        {selectedEmergency === 'accident' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-[#1E293B]">Accident Emergency</h2>
              <button
                onClick={resetEmergency}
                className="w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Call Ambulance */}
              <motion.button
                onClick={handleCallAmbulance}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`py-8 rounded-2xl font-bold text-xl shadow-xl transition-all ${
                  ambulanceCalled
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-red-500/50'
                }`}
              >
                {ambulanceCalled ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="w-10 h-10" />
                    <span>Ambulance Called</span>
                    <span className="text-sm font-normal">Help is on the way</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Phone className="w-10 h-10" />
                    <span>Call Ambulance</span>
                    <span className="text-sm font-normal">Emergency: 112</span>
                  </div>
                )}
              </motion.button>

              {/* Call Police */}
              <motion.button
                onClick={handleCallPolice}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`py-8 rounded-2xl font-bold text-xl shadow-xl transition-all ${
                  policeCalled
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-blue-600/50'
                }`}
              >
                {policeCalled ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="w-10 h-10" />
                    <span>Police Called</span>
                    <span className="text-sm font-normal">Assistance dispatched</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Phone className="w-10 h-10" />
                    <span>Call Police</span>
                    <span className="text-sm font-normal">Emergency: 100</span>
                  </div>
                )}
              </motion.button>
            </div>

            {/* Alert Emergency Contacts Button - Full Width */}
            <motion.button
              onClick={handleSendEmergencyAlert}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-6 rounded-2xl font-bold text-xl shadow-xl transition-all ${
                emergencyAlertSent
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-orange-500/50'
              }`}
            >
              {emergencyAlertSent ? (
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  <span>Alert Sent to {emergencyContacts.length} Contacts</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Bell className="w-6 h-6 animate-pulse" />
                  <span>Alert Emergency Contacts</span>
                </div>
              )}
            </motion.button>

            {/* Safety Instructions */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-[#1E293B] mb-6 flex items-center gap-3">
                <AlertTriangle className="w-7 h-7 text-yellow-500" />
                Accident Safety Guidelines
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <h4 className="font-bold text-red-900 mb-2">1. Ensure Your Safety First</h4>
                  <p className="text-red-700">Move to a safe location away from traffic or danger</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <h4 className="font-bold text-orange-900 mb-2">2. Check for Injuries</h4>
                  <p className="text-orange-700">Do not move anyone seriously injured unless there's immediate danger</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <h4 className="font-bold text-yellow-900 mb-2">3. Turn On Hazard Lights</h4>
                  <p className="text-yellow-700">Make the accident scene visible to other drivers</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-2">4. Document the Scene</h4>
                  <p className="text-blue-700">Take photos if safe to do so, exchange information with others</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}