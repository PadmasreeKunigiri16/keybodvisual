import React from 'react';
import { Gauge, Target, Clock, Hash, AlertTriangle, Delete } from 'lucide-react';

interface MetricsBarProps {
  wpm: number;
  accuracy: number;
  elapsedSeconds: number;
  wordsCount: number;
  charactersCount: number;
  errorCount: number;
  backspaceCount: number;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({
  wpm,
  accuracy,
  elapsedSeconds,
  wordsCount,
  charactersCount,
  errorCount,
  backspaceCount,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const metrics = [
    {
      label: 'Speed (WPM)',
      value: wpm,
      icon: <Gauge className="w-4 h-4 text-teal-400" />,
      color: 'text-teal-400',
    },
    {
      label: 'Accuracy',
      value: `${accuracy}%`,
      icon: <Target className="w-4 h-4 text-emerald-400" />,
      color: accuracy >= 95 ? 'text-emerald-400' : accuracy >= 85 ? 'text-amber-400' : 'text-rose-400',
    },
    {
      label: 'Time',
      value: formatTime(elapsedSeconds),
      icon: <Clock className="w-4 h-4 text-blue-400" />,
      color: 'text-blue-400',
    },
    {
      label: 'Words',
      value: wordsCount,
      icon: <Hash className="w-4 h-4 text-purple-400" />,
      color: 'text-purple-400',
    },
    {
      label: 'Errors',
      value: errorCount,
      icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
      color: errorCount > 0 ? 'text-rose-400' : 'text-slate-400',
    },
    {
      label: 'Backspaces',
      value: backspaceCount,
      icon: <Delete className="w-4 h-4 text-amber-400" />,
      color: 'text-slate-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
      {metrics.map((item, idx) => (
        <div
          key={idx}
          className="glass-panel p-3 rounded-xl border border-slate-700/60 flex items-center gap-3 shadow-md"
        >
          <div className="p-2 rounded-lg bg-slate-800/80">{item.icon}</div>
          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              {item.label}
            </div>
            <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
