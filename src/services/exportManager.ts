import { TypingSession, AccessibilitySettings, CustomizationSettings } from '../types';

export interface ExportDataPayload {
  version: string;
  exportDate: string;
  sessions: TypingSession[];
  accessibility: AccessibilitySettings;
  customization: CustomizationSettings;
  customWords: string[];
}

export class ExportManager {
  public static exportUserData(
    sessions: TypingSession[],
    accessibility: AccessibilitySettings,
    customization: CustomizationSettings,
    customWords: string[]
  ): void {
    const data: ExportDataPayload = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      sessions,
      accessibility,
      customization,
      customWords,
    };

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `keybod_visual_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  public static parseImportData(jsonString: string): Partial<ExportDataPayload> | null {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed as Partial<ExportDataPayload>;
      }
      return null;
    } catch {
      return null;
    }
  }

  public static clearAllData(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }
}
