import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: 'blue' | 'green' | 'amber' | 'red';
}

export default function StatCard({ label, value, icon, trend, trendUp, color = 'blue' }: StatCardProps) {
  const colorMap = {
    blue: 'bg-blue/10 text-blue',
    green: 'bg-green/10 text-green',
    amber: 'bg-amber/10 text-amber',
    red: 'bg-red/10 text-red',
  };

  return (
    <div className="bg-white rounded-2xl border border-line p-6 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-head font-bold px-2 py-0.5 rounded-full ${trendUp ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <div className="font-head font-extrabold text-3xl text-ink mb-1">{value}</div>
      <div className="text-sm text-muted font-medium">{label}</div>
    </div>
  );
}
