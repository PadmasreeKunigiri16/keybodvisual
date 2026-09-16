import React, { useState } from 'react';
import { ShieldCheck, Download, Trash2, CheckCircle2, Lock, FileJson, AlertTriangle } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { ExportManager } from '../services/exportManager';
import { TypingSession, AccessibilitySettings, CustomizationSettings } from '../types';

interface PrivacyPageProps {
  sessions: TypingSession[];
  accessibility: AccessibilitySettings;
  customization: CustomizationSettings;
  customWords: string[];
  onClearAllData: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
  sessions,
  accessibility,
  customization,
  customWords,
  onClearAllData,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleExport = () => {
    ExportManager.exportUserData(sessions, accessibility, customization, customWords);
  };

  const handleConfirmDelete = () => {
    onClearAllData();
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-teal-400" />
            Privacy Center & Data Sovereignty
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Local-first guarantees, JSON data backups, and complete user data deletion control.
          </p>
        </div>

        <Button variant="primary" icon={<Download className="w-4 h-4" />} onClick={handleExport}>
          Download My Typing Data
        </Button>
      </div>

      {/* Privacy Guarantees */}
      <Card title="Privacy & Security Guarantees" icon={<Lock className="w-5 h-5 text-teal-400" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-200">100% Local Browser Storage</div>
              <div className="text-[11px] text-slate-400">
                All typing sessions, keystroke counters, and key error maps reside strictly inside your browser&apos;s LocalStorage.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-200">Zero Keystroke Telemetry</div>
              <div className="text-[11px] text-slate-400">
                No passwords, sensitive typed texts, or raw keystrokes are ever sent to remote cloud servers or analytics endpoints.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-200">Full Offline Autonomy</div>
              <div className="text-[11px] text-slate-400">
                The smart word suggestion engine, spell checker, and audio synthesizer function 100% offline without internet connection.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-200">User Data Export & Erase</div>
              <div className="text-[11px] text-slate-400">
                You possess full ownership of your data. Export your full history as a JSON file or purge it instantly at any time.
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Management Actions */}
      <Card title="Data Management & Storage Actions" icon={<FileJson className="w-5 h-5 text-purple-400" />}>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="text-sm font-bold text-slate-200">Export All Data as JSON</div>
              <div className="text-xs text-slate-400">
                Export your saved typing sessions, custom dictionaries, accessibility preferences, and customization settings.
              </div>
            </div>
            <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />} onClick={handleExport}>
              Export Backup
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-rose-500/5 border border-rose-500/20">
            <div>
              <div className="text-sm font-bold text-rose-300">Delete All Application Data</div>
              <div className="text-xs text-slate-400">
                Permanently delete all session history, statistics, custom words, and reset settings back to default.
              </div>
            </div>
            <Button variant="danger" size="sm" icon={<Trash2 className="w-4 h-4" />} onClick={() => setShowDeleteModal(true)}>
              Purge All Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Data Purge"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" icon={<Trash2 className="w-4 h-4" />} onClick={handleConfirmDelete}>
              Yes, Delete Everything
            </Button>
          </>
        }
      >
        <div className="space-y-3 py-2 text-slate-300 text-sm">
          <div className="flex items-center gap-2 text-rose-400 font-bold">
            <AlertTriangle className="w-5 h-5" />
            Warning: This action cannot be undone!
          </div>
          <p>
            Are you sure you want to permanently erase all local typing sessions, custom dictionary words, key accuracy heatmaps, and settings?
          </p>
        </div>
      </Modal>
    </div>
  );
};
