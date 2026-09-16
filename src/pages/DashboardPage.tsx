import React from 'react';
import {
  Keyboard,
  BookOpen,
  BarChart3,
  Sliders,
  Eye,
  Gauge,
  Target,
  Clock,
  AlertCircle,
  TrendingUp,
  PlusCircle,
  Hash,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ActivePage } from '../components/Navbar';
import { TypingSession } from '../types';
import { AnalyticsService } from '../services/analyticsService';

interface DashboardPageProps {
  sessions: TypingSession[];
  setActivePage: (page: ActivePage) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ sessions, setActivePage }) => {
  const insights = AnalyticsService.generateInsights(sessions);

  // Today's aggregated metrics
  const todayStr = new Date().toISOString().slice(0, 10);
  const todaySessions = sessions.filter(s => s.date.slice(0, 10) === todayStr);

  const todayWords = todaySessions.reduce((acc, s) => acc + s.wordsCount, 0);
  const todayChars = todaySessions.reduce((acc, s) => acc + s.charactersCount, 0);
  const todayTimeSecs = todaySessions.reduce((acc, s) => acc + s.durationSeconds, 0);
  const todayErrors = todaySessions.reduce((acc, s) => acc + s.errorCount, 0);
  const todayAvgWpm = todaySessions.length
    ? Math.round(todaySessions.reduce((acc, s) => acc + s.wpm, 0) / todaySessions.length)
    : 0;
  const todayAvgAcc = todaySessions.length
    ? Math.round(todaySessions.reduce((acc, s) => acc + s.accuracy, 0) / todaySessions.length)
    : 0;

  const lastSession = sessions.length ? sessions[sessions.length - 1] : null;

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Typing Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time overview of your typing speed, accuracy, and practice progress.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            icon={<Keyboard className="w-4 h-4" />}
            onClick={() => setActivePage('keyboard')}
          >
            Open Keyboard
          </Button>

          <Button
            variant="secondary"
            icon={<BookOpen className="w-4 h-4" />}
            onClick={() => setActivePage('practice')}
          >
            Start Practice
          </Button>
        </div>
      </div>

      {/* Today's Metrics Overview */}
      <div>
        <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
          <Gauge className="w-5 h-5 text-teal-400" />
          Today&apos;s Typing Performance
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="text-center">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Words Typed</div>
            <div className="text-2xl font-extrabold text-teal-400">{todayWords}</div>
          </Card>

          <Card className="text-center">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Characters</div>
            <div className="text-2xl font-extrabold text-slate-100">{todayChars}</div>
          </Card>

          <Card className="text-center">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Avg WPM</div>
            <div className="text-2xl font-extrabold text-emerald-400">{todayAvgWpm}</div>
          </Card>

          <Card className="text-center">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Accuracy</div>
            <div className="text-2xl font-extrabold text-cyan-400">{todayAvgAcc}%</div>
          </Card>

          <Card className="text-center">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Errors</div>
            <div className="text-2xl font-extrabold text-rose-400">{todayErrors}</div>
          </Card>

          <Card className="text-center">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Typing Time</div>
            <div className="text-2xl font-extrabold text-blue-400">{Math.round(todayTimeSecs / 60)}m</div>
          </Card>
        </div>
      </div>

      {/* Quick Actions & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-200">Quick Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => setActivePage('keyboard')}
              className="w-full flex items-center justify-between p-4 rounded-xl glass-panel border border-slate-700/80 hover:border-teal-500/50 hover:bg-slate-800/80 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400">
                  <Keyboard className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-200 group-hover:text-teal-300">Open Virtual Keyboard</div>
                  <div className="text-xs text-slate-400">Free typing workspace with smart suggestions</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActivePage('practice')}
              className="w-full flex items-center justify-between p-4 rounded-xl glass-panel border border-slate-700/80 hover:border-purple-500/50 hover:bg-slate-800/80 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-200 group-hover:text-purple-300">Start Practice Test</div>
                  <div className="text-xs text-slate-400">Lessons for common words, sentences, and code</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActivePage('analytics')}
              className="w-full flex items-center justify-between p-4 rounded-xl glass-panel border border-slate-700/80 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-200 group-hover:text-blue-300">View Detailed Analytics</div>
                  <div className="text-xs text-slate-400">Heatmaps, accuracy curves & key error rates</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActivePage('accessibility')}
              className="w-full flex items-center justify-between p-4 rounded-xl glass-panel border border-slate-700/80 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-200 group-hover:text-emerald-300">Accessibility Settings</div>
                  <div className="text-xs text-slate-400">Dyslexia fonts, high contrast, one-hand mode</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Session & Insights */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-200">Recent Activity</h2>
            {sessions.length > 0 && (
              <button
                onClick={() => setActivePage('analytics')}
                className="text-xs text-teal-400 hover:underline"
              >
                View full history →
              </button>
            )}
          </div>

          {sessions.length === 0 ? (
            /* Proper Empty State */
            <div className="glass-panel p-10 rounded-2xl border border-dashed border-slate-700 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-200">No typing data yet. Start your first session.</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Practice typing with our virtual keyboard or practice test lessons to unlock live metrics, WPM speed trends, and key accuracy heatmaps.
              </p>
              <Button
                variant="primary"
                icon={<PlusCircle className="w-4 h-4" />}
                onClick={() => setActivePage('keyboard')}
              >
                Start First Session
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Last Session Highlight Card */}
              {lastSession && (
                <div className="glass-panel p-5 rounded-xl border border-teal-500/30 bg-teal-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-1">
                      Last Session Breakdown
                    </div>
                    <div className="text-sm font-bold text-slate-100">
                      {new Date(lastSession.date).toLocaleDateString()} — {lastSession.category || 'Free Typing'}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Duration: {lastSession.durationSeconds}s | Characters: {lastSession.charactersCount}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-700/80 pt-3 sm:pt-0 sm:pl-4">
                    <div>
                      <div className="text-xs text-slate-400">WPM</div>
                      <div className="text-xl font-bold text-teal-300">{lastSession.wpm}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Accuracy</div>
                      <div className="text-xl font-bold text-emerald-300">{lastSession.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Errors</div>
                      <div className="text-xl font-bold text-rose-400">{lastSession.errorCount}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Insights Card */}
              <div className="glass-panel p-5 rounded-xl border border-slate-700/80">
                <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                  Typing Insights Summary
                </h3>
                <ul className="space-y-2">
                  {insights.insights.map((text, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-teal-400 font-bold">•</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
