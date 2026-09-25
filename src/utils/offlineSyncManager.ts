export interface OfflinePendingChange {
  id: string;
  timestamp: string;
  action: string;
  entityType: 'CompanyProfile' | 'Tender' | 'Project' | 'Personnel' | 'Equipment' | 'Financial' | 'Bank' | 'Client' | 'Subcontractor' | 'Checklist' | 'Review' | 'Methodology';
  description: string;
}

const QUEUE_STORAGE_KEY = 'ppa_tender_offline_sync_queue';
const LAST_SYNC_KEY = 'ppa_tender_last_synced_at';

export function getOfflinePendingChanges(): OfflinePendingChange[] {
  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function recordOfflineChange(
  action: string,
  entityType: OfflinePendingChange['entityType'],
  description: string
): void {
  try {
    const current = getOfflinePendingChanges();
    const newEntry: OfflinePendingChange = {
      id: `CHG-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      action,
      entityType,
      description,
    };
    const updated = [newEntry, ...current].slice(0, 50); // Keep last 50 changes
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to record offline change', e);
  }
}

export function clearOfflinePendingChanges(): void {
  try {
    localStorage.removeItem(QUEUE_STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear sync queue', e);
  }
}

export function getLastSyncedAt(): string {
  try {
    const val = localStorage.getItem(LAST_SYNC_KEY);
    return val || new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export function setLastSyncedAt(timestamp: string): void {
  try {
    localStorage.setItem(LAST_SYNC_KEY, timestamp);
  } catch (e) {
    console.warn('Failed to save sync timestamp', e);
  }
}

export function getStorageCacheMetrics(): {
  estimatedBytes: number;
  formattedSize: string;
  keysCount: number;
} {
  let totalChars = 0;
  let count = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('ppa_tender')) {
        const val = localStorage.getItem(key) || '';
        totalChars += key.length + val.length;
        count++;
      }
    }
  } catch (e) {
    console.warn('Failed to compute storage metrics', e);
  }

  const bytes = totalChars * 2; // UTF-16 characters are approx 2 bytes
  let formatted = `${bytes} B`;
  if (bytes > 1024 * 1024) {
    formatted = `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } else if (bytes > 1024) {
    formatted = `${(bytes / 1024).toFixed(1)} KB`;
  }

  return {
    estimatedBytes: bytes,
    formattedSize: formatted,
    keysCount: count,
  };
}
