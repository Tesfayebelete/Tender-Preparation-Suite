import React, { useState } from 'react';
import { useTender } from '../../context/TenderContext';
import { WifiOff, RefreshCw, X, HardDrive } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOnline, pendingChanges, setIsSyncModalOpen } = useTender();
  const [dismissed, setDismissed] = useState(false);

  if (isOnline || dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-md bg-slate-900 text-white rounded-lg shadow-xl border border-slate-700 p-3.5 flex items-start gap-3 animate-fade-in print:hidden">
      <div className="p-2 rounded bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
        <WifiOff className="w-4 h-4" />
      </div>

      <div className="flex-1 text-xs">
        <div className="font-bold text-slate-100 flex items-center gap-2">
          <span>Working Offline</span>
          {pendingChanges.length > 0 && (
            <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 font-bold rounded text-[10px]">
              {pendingChanges.length} local changes
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-400 mt-1 leading-normal">
          Tender documents and schedules are fully accessible and editable offline. Changes are saved locally and will auto-sync when reconnected.
        </p>
        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={() => setIsSyncModalOpen(true)}
            className="text-amber-400 hover:text-amber-300 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
          >
            <HardDrive className="w-3 h-3" />
            <span>Manage Sync Queue</span>
          </button>
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="text-slate-400 hover:text-white p-1 rounded"
        title="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
