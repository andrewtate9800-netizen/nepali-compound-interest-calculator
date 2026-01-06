
import React from 'react';
import { DateState, Language } from '../types';

interface DateCardProps {
  title: string;
  bgColor: string;
  state: DateState;
  onChange: (field: keyof DateState, value: string) => void;
  lang: Language;
}

const labels = {
  ne: { year: 'साल', month: 'महिना', day: 'गते', yPlaceholder: '२०८०', mPlaceholder: '०८', dPlaceholder: '१५' },
  en: { year: 'Year', month: 'Month', day: 'Day', yPlaceholder: '2024', mPlaceholder: '12', dPlaceholder: '25' }
};

const DateCard: React.FC<DateCardProps> = ({ title, bgColor, state, onChange, lang }) => {
  const l = labels[lang];

  return (
    <div className={`${bgColor} p-4 rounded-xl shadow-lg mb-4 text-white transition-colors duration-500`}>
      <h2 className="text-xl font-bold mb-3 border-b border-white/20 pb-1">{title}</h2>
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">{l.year}</label>
          <input
            type="number"
            placeholder={l.yPlaceholder}
            value={state.year}
            onChange={(e) => onChange('year', e.target.value)}
            className="bg-white/20 border border-white/30 rounded px-2 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-center font-bold"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">{l.month}</label>
          <input
            type="number"
            placeholder={l.mPlaceholder}
            min="1"
            max="12"
            value={state.month}
            onChange={(e) => onChange('month', e.target.value)}
            className="bg-white/20 border border-white/30 rounded px-2 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-center font-bold"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">{l.day}</label>
          <input
            type="number"
            placeholder={l.dPlaceholder}
            min="1"
            max="32"
            value={state.day}
            onChange={(e) => onChange('day', e.target.value)}
            className="bg-white/20 border border-white/30 rounded px-2 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-center font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default DateCard;
