import React from 'react';
import { SLOKAS } from '../data/slokas';

export default function SlokaBanner() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const todaySloka = SLOKAS[dayOfYear % SLOKAS.length];

  return (
    <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 text-white rounded-2xl p-6 shadow-lg mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="bg-amber-800/40 text-amber-100 text-xs font-semibold uppercase px-3 py-1 rounded-full border border-amber-300/30">
          🪔 Sloka of the Day
        </span>
        <span className="text-xs text-amber-200">
          {now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </span>
      </div>
      
      <h2 className="text-2xl font-bold font-serif mb-1 tracking-wide">
        {todaySloka.sloka}
      </h2>
      <p className="text-sm italic text-amber-100 mb-3">
        "{todaySloka.transliteration}"
      </p>
      
      <div className="border-t border-amber-400/30 pt-3">
        <p className="text-base font-medium">
          <strong className="text-amber-200">Meaning:</strong> {todaySloka.meaning}
        </p>
        <p className="text-xs text-amber-100 mt-1">
          💡 <em>{todaySloka.takeaway}</em>
        </p>
      </div>
    </div>
  );
}
<div className="animate-glow-pulse glow-border-amber bg-gradient-to-r from-amber-900/40 via-orange-900/30 to-amber-950/60 rounded-2xl p-6 shadow-xl mb-8">
  <span className="animate-float inline-block">🪔 Sloka of the Day</span>
</div>