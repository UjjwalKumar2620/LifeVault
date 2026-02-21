import { motion } from 'motion/react';
import { Users, Plus, Heart, AlertTriangle, TrendingUp, User } from 'lucide-react';
import { useState } from 'react';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  healthScore: number;
  riskFactors: string[];
  avatar: string;
}

const familyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'You',
    relation: 'Self',
    age: 32,
    healthScore: 78,
    riskFactors: ['Slightly elevated LDL'],
    avatar: '👤',
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    relation: 'Spouse',
    age: 30,
    healthScore: 85,
    riskFactors: [],
    avatar: '👩',
  },
  {
    id: '3',
    name: 'Emma Mitchell',
    relation: 'Daughter',
    age: 5,
    healthScore: 92,
    riskFactors: [],
    avatar: '👧',
  },
];

const sharedRisks = [
  { condition: 'Type 2 Diabetes', risk: 'medium', affected: ['Father', 'Grandmother'] },
  { condition: 'Hypertension', risk: 'low', affected: ['Grandfather'] },
  { condition: 'High Cholesterol', risk: 'medium', affected: ['You', 'Father'] },
];

export function FamilyHealthNetwork() {
  const [selectedMember, setSelectedMember] = useState<string>('1');

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-3xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-[#333333] flex items-center gap-3">
          <Users className="w-7 h-7 text-[#FF4444]" />
          Family Health Network
        </h3>
        <button className="px-4 py-2 bg-gradient-to-r from-[#FF4444] to-[#CC3333] text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* Family Members */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {familyMembers.map((member) => (
          <motion.div
            key={member.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedMember(member.id)}
            className={`cursor-pointer rounded-2xl p-5 transition-all ${
              selectedMember === member.id
                ? 'bg-gradient-to-br from-[#FF4444]/10 to-[#CC3333]/10 border-2 border-[#FF4444] shadow-lg'
                : 'bg-[#F5F5F5] border-2 border-transparent hover:border-[#999999]/30'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF4444] to-[#CC3333] flex items-center justify-center text-3xl shadow-lg">
                {member.avatar}
              </div>
              <div>
                <h4 className="font-bold text-[#333333]">{member.name}</h4>
                <p className="text-sm text-[#999999]">{member.relation} • {member.age}y</p>
              </div>
            </div>

            {/* Health Score */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#666666]">Health Score</span>
                <span className="text-lg font-bold text-[#FF4444]">{member.healthScore}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#FF4444] to-[#CC3333] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${member.healthScore}%` }}
                />
              </div>
            </div>

            {/* Risk Factors */}
            {member.riskFactors.length > 0 ? (
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  {member.riskFactors.map((risk, i) => (
                    <p key={i} className="text-xs text-[#666666]">{risk}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <Heart className="w-4 h-4" />
                <p className="text-xs">All clear</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Shared Genetic Risks */}
      <div className="bg-gradient-to-r from-[#999999]/10 to-[#666666]/10 border border-[#999999]/20 rounded-2xl p-6 mb-6">
        <h4 className="font-bold text-[#333333] mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#FF4444]" />
          Family Disease Heatmap
        </h4>
        <div className="space-y-3">
          {sharedRisks.map((risk, index) => (
            <div key={index} className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-[#333333]">{risk.condition}</h5>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  risk.risk === 'high' ? 'bg-red-100 text-red-700' :
                  risk.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {risk.risk.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-[#666666]">
                Family history: {risk.affected.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Preventive Recommendations */}
      <div className="bg-gradient-to-r from-[#FF4444]/10 to-[#CC3333]/10 border border-[#FF4444]/20 rounded-2xl p-6">
        <h4 className="font-bold text-[#333333] mb-4">Preventive Recommendations</h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FF4444] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">1</span>
            </div>
            <div>
              <p className="font-medium text-[#333333]">Regular Cholesterol Screening</p>
              <p className="text-sm text-[#666666]">Due to family history, annual lipid panel recommended</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FF4444] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">2</span>
            </div>
            <div>
              <p className="font-medium text-[#333333]">Diabetes Risk Assessment</p>
              <p className="text-sm text-[#666666]">Consider glucose tolerance test every 2 years</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FF4444] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">3</span>
            </div>
            <div>
              <p className="font-medium text-[#333333]">Heart Health Monitoring</p>
              <p className="text-sm text-[#666666]">Blood pressure checks recommended every 6 months</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
