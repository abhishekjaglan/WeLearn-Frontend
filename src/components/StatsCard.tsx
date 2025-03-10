import React from 'react';
import { StatsCardProps } from '../types';

const StatsCard: React.FC<StatsCardProps> = React.memo(
  ({ title, value, icon }) => {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-[#8D5524] uppercase tracking-wide">{title}</h4>
            <p className="text-3xl font-bold text-[#2B2D42] mt-1">{value}</p>
          </div>
          <div className="text-4xl text-[#C3447A]">{icon}</div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => 
    prevProps.value === nextProps.value && 
    prevProps.title === nextProps.title
);

StatsCard.displayName = 'StatsCard';

export default StatsCard;