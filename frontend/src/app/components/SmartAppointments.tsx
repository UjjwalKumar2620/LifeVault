import { motion } from 'motion/react';
import { Calendar, Clock, User, MapPin, Bell, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface TimeSlot {
  time: string;
  available: boolean;
  waitTime?: number;
  recommended?: boolean;
}

const timeSlots: TimeSlot[] = [
  { time: '09:00 AM', available: true, waitTime: 5, recommended: true },
  { time: '10:00 AM', available: true, waitTime: 15 },
  { time: '11:00 AM', available: false },
  { time: '02:00 PM', available: true, waitTime: 8, recommended: true },
  { time: '03:00 PM', available: true, waitTime: 20 },
  { time: '04:00 PM', available: true, waitTime: 12 },
];

const upcomingAppointment = {
  doctor: 'Dr. Sarah Chen',
  specialty: 'Primary Care',
  date: 'February 20, 2026',
  time: '2:30 PM',
  location: 'LifeVault Medical Center, Room 305',
  type: 'Annual Physical',
};

const preAppointmentChecklist = [
  { task: 'Fast for 8 hours before appointment', completed: false },
  { task: 'Bring insurance card', completed: true },
  { task: 'List current medications', completed: true },
  { task: 'Note symptoms to discuss', completed: false },
];

export function SmartAppointments() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [checklist, setChecklist] = useState(preAppointmentChecklist);

  const toggleChecklistItem = (index: number) => {
    setChecklist(prev => prev.map((item, i) => 
      i === index ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Appointment */}
      <div className="bg-gradient-to-br from-[#FF4444]/10 to-[#CC3333]/10 border border-[#FF4444]/20 rounded-3xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-[#333333] mb-6 flex items-center gap-3">
          <Calendar className="w-7 h-7 text-[#FF4444]" />
          Next Appointment
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF4444] to-[#CC3333] flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-[#333333] text-lg">{upcomingAppointment.doctor}</h4>
                <p className="text-[#666666]">{upcomingAppointment.specialty}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#666666]">
                <Calendar className="w-5 h-5 text-[#FF4444]" />
                <span>{upcomingAppointment.date}</span>
              </div>
              <div className="flex items-center gap-3 text-[#666666]">
                <Clock className="w-5 h-5 text-[#FF4444]" />
                <span>{upcomingAppointment.time} • Estimated wait: 8 mins</span>
              </div>
              <div className="flex items-center gap-3 text-[#666666]">
                <MapPin className="w-5 h-5 text-[#FF4444]" />
                <span>{upcomingAppointment.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-white rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Bell className={`w-5 h-5 ${remindersEnabled ? 'text-[#FF4444]' : 'text-[#999999]'}`} />
                <span className="text-[#333333] font-medium">Reminders</span>
              </div>
              <button
                onClick={() => setRemindersEnabled(!remindersEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  remindersEnabled ? 'bg-[#FF4444]' : 'bg-[#999999]'
                }`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg"
                  animate={{ x: remindersEnabled ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>

          {/* Pre-appointment Checklist */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h5 className="font-bold text-[#333333] mb-4">Pre-Appointment Checklist</h5>
            <div className="space-y-3">
              {checklist.map((item, index) => (
                <div
                  key={index}
                  onClick={() => toggleChecklistItem(index)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    item.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-[#999999] group-hover:border-[#FF4444]'
                  }`}>
                    {item.completed && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`text-sm ${
                    item.completed ? 'text-[#999999] line-through' : 'text-[#333333]'
                  }`}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#999999]/20">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666666]">Completion</span>
                <span className="font-bold text-[#FF4444]">
                  {checklist.filter(item => item.completed).length}/{checklist.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-[#FF4444] to-[#CC3333] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(checklist.filter(item => item.completed).length / checklist.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book New Appointment */}
      <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-3xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-[#333333] mb-6">Book New Appointment</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar Heatmap */}
          <div>
            <h4 className="font-bold text-[#333333] mb-4">Available This Week</h4>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div key={day} className="text-center">
                  <p className="text-xs text-[#999999] mb-2">{day}</p>
                  <div className={`aspect-square rounded-lg ${
                    i === 5 || i === 6 ? 'bg-gray-200' : 
                    i === 1 || i === 3 ? 'bg-green-200 hover:bg-green-300 cursor-pointer' :
                    'bg-yellow-200 hover:bg-yellow-300 cursor-pointer'
                  } flex items-center justify-center text-sm font-medium`}>
                    {17 + i}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-200" />
                <span className="text-[#666666]">High Availability</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-yellow-200" />
                <span className="text-[#666666]">Limited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gray-200" />
                <span className="text-[#666666]">Unavailable</span>
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <h4 className="font-bold text-[#333333] mb-4">AI Suggested Time Slots</h4>
            <div className="space-y-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && setSelectedSlot(slot.time)}
                  disabled={!slot.available}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    !slot.available
                      ? 'bg-gray-100 text-[#999999] cursor-not-allowed'
                      : selectedSlot === slot.time
                      ? 'bg-gradient-to-r from-[#FF4444] to-[#CC3333] text-white shadow-lg'
                      : slot.recommended
                      ? 'bg-green-50 border-2 border-green-300 hover:border-green-400'
                      : 'bg-[#F5F5F5] hover:bg-white border-2 border-transparent hover:border-[#FF4444]/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-bold ${selectedSlot === slot.time ? 'text-white' : 'text-[#333333]'}`}>
                        {slot.time}
                      </p>
                      {slot.available && slot.waitTime !== undefined && (
                        <p className={`text-sm ${selectedSlot === slot.time ? 'text-white/80' : 'text-[#666666]'}`}>
                          Est. wait: {slot.waitTime} mins
                        </p>
                      )}
                    </div>
                    {slot.recommended && selectedSlot !== slot.time && (
                      <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                        AI Pick
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            {selectedSlot && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mt-4 py-3 bg-gradient-to-r from-[#FF4444] to-[#CC3333] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Confirm Appointment
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
