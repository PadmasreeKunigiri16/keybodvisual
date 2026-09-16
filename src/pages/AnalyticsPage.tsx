import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { BarChart3, TrendingUp, Flame, AlertTriangle, Key, Calendar } from 'lucide-react';
import { Card } from '../components/Card';
import { VirtualKeyboard } from '../features/keyboard/VirtualKeyboard';
import { TypingSession, CustomizationSettings, AccessibilitySettings } from '../types';
import { AnalyticsService } from '../services/analyticsService';

interface AnalyticsPageProps {
  sessions: TypingSession[];
  customization: CustomizationSettings;
  accessibility: AccessibilitySettings;
  heatmapData: { usage: Record<string, number>; errors: Record<string, number> };
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  sessions,
  customization,
  accessibility,
  heatmapData,
}) => {
  const [heatmapMode, setHeatmapMode] = useState<'usage' | 'errors'>('usage');

  const insights = AnalyticsService.generateInsights(sessions);

  // Recharts formatted session data
  const chartData = sessions.map((s, idx) => ({
    name: `Sess ${idx + 1}`,
    date: new Date(s.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    wpm: s.wpm,
    netWpm: s.netWpm,
    accuracy: s.accuracy,
    errors: s.errorCount,
  }));

  // Top Used & Top Error Keys List
  const usageSorted = Object.entries(heatmapData.usage)
    .filter(([k]) => k.length === 1 && /[a-z]/i.test(k))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const errorSorted = Object.entries(heatmapData.errors)
    .filter(([k]) => k.length === 1 && /[a-z]/i.test(k))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-teal-400" />
            Typing Analytics & Heatmap Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real performance telemetry derived from actual stored local typing activity
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
            <div className="text-slate-400 text-[10px] uppercase">Average WPM</div>
            <div className="text-lg font-bold text-teal-400">{insights.avgWpm}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
            <div className="text-slate-400 text-[10px] uppercase">Accuracy</div>
            <div className="text-lg font-bold text-emerald-400">{insights.avgAccuracy}%</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
            <div className="text-slate-400 text-[10px] uppercase">Total Sessions</div>
            <div className="text-lg font-bold text-purple-400">{insights.totalSessions}</div>
          </div>
        </div>
      </div>

      {sessions.length === 0 ? (
        <Card className="text-center py-12">
          <div className="w-12 h-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-200">No Analytics Recorded Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            Complete a typing session or practice test to view WPM speed curves, accuracy trends, and key error heatmaps.
          </p>
        </Card>
      ) : (
        <>
          {/* Recharts Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* WPM Trend Chart */}
            <Card title="WPM Speed Trend Over Time" icon={<TrendingUp className="w-4 h-4 text-teal-400" />}>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
                    <Line type="monotone" dataKey="wpm" stroke="#14b8a6" strokeWidth={3} dot={{ r: 4 }} name="Gross WPM" />
                    <Line type="monotone" dataKey="netWpm" stroke="#06b6d4" strokeWidth={2} strokeDasharray="4 4" name="Net WPM" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Accuracy Curve Chart */}
            <Card title="Accuracy Percentage Over Time" icon={<BarChart3 className="w-4 h-4 text-emerald-400" />}>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                    <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
                    <Bar dataKey="accuracy" fill="#10b981" radius={[4, 4, 0, 0]} name="Accuracy %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Interactive Keyboard Heatmap */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  Visual Keyboard Heatmap
                </h3>
                <p className="text-xs text-slate-400">Color gradient distribution based on real keypress logs</p>
              </div>

              <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
                <button
                  onClick={() => setHeatmapMode('usage')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    heatmapMode === 'usage' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Usage Frequency
                </button>
                <button
                  onClick={() => setHeatmapMode('errors')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    heatmapMode === 'errors' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Error Frequency
                </button>
              </div>
            </div>

            <VirtualKeyboard
              onKeyInput={() => {}}
              customization={customization}
              accessibility={accessibility}
              heatmapData={heatmapData}
              heatmapMode={heatmapMode}
            />
          </div>

          {/* Key Distribution Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Most Frequently Pressed Keys" icon={<Key className="w-4 h-4 text-teal-400" />}>
              <div className="space-y-2">
                {usageSorted.map(([key, count], idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-teal-500/20 text-teal-300 font-mono font-bold flex items-center justify-center uppercase">
                        {key}
                      </span>
                      <span className="text-slate-300 font-medium">Key &apos;{key.toUpperCase()}&apos;</span>
                    </div>
                    <span className="font-mono text-teal-400 font-bold">{count} presses</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Most Common Error Keys" icon={<AlertTriangle className="w-4 h-4 text-rose-400" />}>
              <div className="space-y-2">
                {errorSorted.length === 0 ? (
                  <div className="text-xs text-slate-400 py-4 text-center">No key errors recorded yet!</div>
                ) : (
                  errorSorted.map(([key, count], idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-rose-500/20 text-rose-300 font-mono font-bold flex items-center justify-center uppercase">
                          {key}
                        </span>
                        <span className="text-slate-300 font-medium">Key &apos;{key.toUpperCase()}&apos;</span>
                      </div>
                      <span className="font-mono text-rose-400 font-bold">{count} errors</span>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
