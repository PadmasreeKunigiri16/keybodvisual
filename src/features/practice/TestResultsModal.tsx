import React from 'react';
import { Trophy, RotateCcw, Home, Gauge, Target, Clock, AlertTriangle } from 'lucide-react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';

interface TestResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  onGoHome: () => void;
  wpm: number;
  accuracy: number;
  errors: number;
  characters: number;
  durationSeconds: number;
}

export const TestResultsModal: React.FC<TestResultsModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  onGoHome,
  wpm,
  accuracy,
  errors,
  characters,
  durationSeconds,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Typing Test Complete!"
      footer={
        <>
          <Button variant="secondary" icon={<Home className="w-4 h-4" />} onClick={onGoHome}>
            Back to Dashboard
          </Button>
          <Button variant="primary" icon={<RotateCcw className="w-4 h-4" />} onClick={onRetry}>
            Try Again
          </Button>
        </>
      }
    >
      <div className="text-center space-y-6 py-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-teal-500/20">
          <Trophy className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-slate-100">Great Job!</h3>
          <p className="text-xs text-slate-400">Here is your typing test breakdown</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl glass-panel border border-slate-700/80">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Gauge className="w-4 h-4 text-teal-400" /> Typing Speed
            </div>
            <div className="text-3xl font-extrabold text-teal-400">{wpm} <span className="text-xs font-normal">WPM</span></div>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-slate-700/80">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Target className="w-4 h-4 text-emerald-400" /> Accuracy
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">{accuracy}%</div>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-slate-700/80">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> Errors
            </div>
            <div className="text-2xl font-extrabold text-rose-400">{errors}</div>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-slate-700/80">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Clock className="w-4 h-4 text-blue-400" /> Time Taken
            </div>
            <div className="text-2xl font-extrabold text-blue-400">{durationSeconds}s</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
