import { motion } from 'motion/react';
import { AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';

interface BodyArea {
  id: string;
  name: string;
  risk: 'low' | 'medium' | 'high';
  conditions: string[];
  x: number;
  y: number;
}

const bodyAreas: BodyArea[] = [
  { id: 'brain', name: 'Brain', risk: 'low', conditions: ['No known issues'], x: 50, y: 8 },
  { id: 'heart', name: 'Heart', risk: 'medium', conditions: ['Slightly elevated LDL', 'Family history of hypertension'], x: 50, y: 28 },
  { id: 'liver', name: 'Liver', risk: 'low', conditions: ['Healthy liver function'], x: 60, y: 40 },
  { id: 'stomach', name: 'Stomach', risk: 'low', conditions: ['No digestive issues'], x: 50, y: 50 },
  { id: 'kidneys', name: 'Kidneys', risk: 'low', conditions: ['Normal kidney function'], x: 40, y: 50 },
  { id: 'joints', name: 'Joints', risk: 'medium', conditions: ['Occasional knee discomfort'], x: 50, y: 70 },
];

const riskColors = {
  low: { fill: '#22C55E', opacity: 0.3, stroke: '#16A34A' },
  medium: { fill: '#F59E0B', opacity: 0.4, stroke: '#D97706' },
  high: { fill: '#EF4444', opacity: 0.5, stroke: '#DC2626' },
};

export function RiskHeatmap() {
  const [selectedArea, setSelectedArea] = useState<BodyArea | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-[#999999]/20 rounded-3xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-[#333333] mb-6 flex items-center gap-3">
        <AlertTriangle className="w-7 h-7 text-[#FF4444]" />
        Predictive Risk Heatmap
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Body Visualization */}
        <div className="bg-[#F5F5F5] rounded-2xl p-6">
          <h4 className="font-bold text-[#333333] mb-4 text-center">Risk-Prone Areas</h4>
          
          <div className="relative w-full aspect-[3/4] bg-white rounded-xl overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Body outline */}
              <g opacity="0.2" stroke="#999999" strokeWidth="0.5" fill="none">
                {/* Head */}
                <circle cx="50" cy="8" r="7" />
                {/* Neck */}
                <line x1="50" y1="15" x2="50" y2="20" />
                {/* Torso */}
                <rect x="42" y="20" width="16" height="28" rx="2" />
                {/* Arms */}
                <line x1="42" y1="22" x2="30" y2="40" strokeWidth="3" strokeLinecap="round" />
                <line x1="58" y1="22" x2="70" y2="40" strokeWidth="3" strokeLinecap="round" />
                {/* Lower body */}
                <rect x="44" y="48" width="12" height="18" rx="2" />
                {/* Legs */}
                <line x1="47" y1="66" x2="44" y2="90" strokeWidth="3" strokeLinecap="round" />
                <line x1="53" y1="66" x2="56" y2="90" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Risk zones */}
              {bodyAreas.map((area) => {
                const colors = riskColors[area.risk];
                const isHovered = hoveredArea === area.id;
                const isSelected = selectedArea?.id === area.id;

                return (
                  <g key={area.id}>
                    <motion.circle
                      cx={area.x}
                      cy={area.y}
                      r={isHovered || isSelected ? 8 : 6}
                      fill={colors.fill}
                      fillOpacity={colors.opacity}
                      stroke={colors.stroke}
                      strokeWidth={isSelected ? 2 : 1}
                      className="cursor-pointer"
                      onClick={() => setSelectedArea(area)}
                      onMouseEnter={() => setHoveredArea(area.id)}
                      onMouseLeave={() => setHoveredArea(null)}
                      animate={{
                        scale: isHovered ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: isHovered ? Infinity : 0,
                      }}
                    />
                    {(isHovered || isSelected) && (
                      <motion.text
                        x={area.x}
                        y={area.y - 12}
                        textAnchor="middle"
                        className="text-xs font-bold"
                        fill="#333333"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {area.name}
                      </motion.text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 opacity-50" />
              <span className="text-xs text-[#666666]">Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-50" />
              <span className="text-xs text-[#666666]">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 opacity-50" />
              <span className="text-xs text-[#666666]">High Risk</span>
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div>
          {selectedArea ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className={`rounded-2xl p-6 ${
                selectedArea.risk === 'high' ? 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200' :
                selectedArea.risk === 'medium' ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200' :
                'bg-gradient-to-r from-green-50 to-green-100 border border-green-200'
              }`}>
                <h4 className="text-2xl font-bold text-[#333333] mb-2">{selectedArea.name}</h4>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  selectedArea.risk === 'high' ? 'bg-red-500 text-white' :
                  selectedArea.risk === 'medium' ? 'bg-yellow-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  {selectedArea.risk.toUpperCase()} RISK
                </span>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h5 className="font-bold text-[#333333] mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#FF4444]" />
                  Related Conditions
                </h5>
                <ul className="space-y-2">
                  {selectedArea.conditions.map((condition, index) => (
                    <li key={index} className="flex items-start gap-2 text-[#666666]">
                      <span className="w-1.5 h-1.5 bg-[#FF4444] rounded-full mt-2 flex-shrink-0" />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-[#FF4444]/10 to-[#CC3333]/10 border border-[#FF4444]/20 rounded-2xl p-6">
                <h5 className="font-bold text-[#333333] mb-3">Recommended Actions</h5>
                {selectedArea.risk === 'medium' || selectedArea.risk === 'high' ? (
                  <ul className="space-y-2 text-sm text-[#666666]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF4444]">•</span>
                      Schedule follow-up examination
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF4444]">•</span>
                      Monitor symptoms regularly
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF4444]">•</span>
                      Consider preventive lifestyle changes
                    </li>
                  </ul>
                ) : (
                  <p className="text-sm text-[#666666]">No immediate action needed. Continue healthy habits!</p>
                )}
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-[#FF4444] to-[#CC3333] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                View Medical Records
              </button>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-8">
              <div>
                <AlertTriangle className="w-16 h-16 text-[#999999] mx-auto mb-4" />
                <p className="text-[#666666]">Click on any area to see detailed risk analysis</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
