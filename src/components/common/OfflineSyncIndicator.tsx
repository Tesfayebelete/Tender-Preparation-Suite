import React from 'react';
import { useTender } from '../../context/TenderContext';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  HardDrive,
  Database,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  Download,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

export const OfflineSyncIndicator: React.FC = () => {
  const {
    isOnline,
    simulatedOffline,
    toggleSimulatedOffline,
    isSyncModalOpen,
    setIsSyncModalOpen,
    lastSyncedAt,
    pendingChanges,
    syncNow,
    isSyncing,
    storageMetrics,
    exportDataToJson,
  } = useTender();

  const formatLastSync = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return 'Just now';
    }
  };

  const handleExportSnapshot = () => {
    const jsonStr = exportDataToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Offline_Tender_Cache_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Header Pill Button */}
      <button
        onClick={() => setIsSyncModalOpen(true)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
          !isOnline
            ? 'bg-amber-950/40 text-amber-300 border-amber-500/40 hover:bg-amber-950/60'
            : isSyncing
              ? 'bg-blue-950/40 text-blue-300 border-blue-500/40'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
        }`}
        title="View local offline caching and synchronization status"
      >
        {!isOnline ? (
          <>
            <WifiOff className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">
              Offline {pendingChanges.length > 0 && `(${pendingChanges.length})`}
            </span>
          </>
        ) : isSyncing ? (
          <>
            <RefreshCw className="w-3.5 h-3.5 text-blue-400 animate-spin" />
            <span className="hidden sm:inline">Syncing...</span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="hidden xl:inline text-slate-300">Synced</span>
          </>
        )}
      </button>

      {/* Sync & Offline Management Modal */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh] text-slate-900">
            {/* Header */}
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <HardDrive className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold tracking-tight">
                  Offline Caching & Data Synchronization
                </h3>
              </div>
              <button
                onClick={() => setIsSyncModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              {/* Connectivity Status Card */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Network Connection:</span>
                  <div className="flex items-center gap-1.5 font-bold">
                    {isOnline ? (
                      <>
                        <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Online & Connected</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                        <span className="text-amber-800">
                          {simulatedOffline ? 'Simulated Offline Mode' : 'Offline (No Connection)'}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/60">
                  <span className="text-slate-500">Last Synced:</span>
                  <span className="font-mono text-slate-700">{formatLastSync(lastSyncedAt)}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-500">Local Cache Footprint:</span>
                  <span className="font-mono text-slate-700 font-semibold">
                    {storageMetrics.formattedSize} ({storageMetrics.keysCount} database tables)
                  </span>
                </div>
              </div>

              {/* Simulation Toggle */}
              <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between bg-white">
                <div>
                  <div className="font-semibold text-slate-900">Simulate Offline Mode</div>
                  <div className="text-[11px] text-slate-500">
                    Test editing tender schedules, documents, and calculations without an internet connection.
                  </div>
                </div>
                <button
                  onClick={toggleSimulatedOffline}
                  className="p-1 text-slate-700 hover:text-slate-950 cursor-pointer"
                  title="Toggle simulated offline mode"
                >
                  {simulatedOffline ? (
                    <ToggleRight className="w-8 h-8 text-amber-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-400" />
                  )}
                </button>
              </div>

              {/* Pending Offline Changes Queue */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">
                    Queued Offline Changes ({pendingChanges.length})
                  </span>
                  {pendingChanges.length > 0 && isOnline && (
                    <button
                      onClick={syncNow}
                      disabled={isSyncing}
                      className="text-amber-700 hover:text-amber-800 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>Sync All Changes</span>
                    </button>
                  )}
                </div>

                {pendingChanges.length === 0 ? (
                  <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>All records are fully up to date and synchronized with local cache.</span>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-lg max-h-44 overflow-y-auto divide-y divide-slate-100">
                    {pendingChanges.map((change) => (
                      <div key={change.id} className="p-2 text-[11px] flex items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold text-slate-900">{change.description}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {change.entityType} · {new Date(change.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold shrink-0">
                          {change.action}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Export Offline Snapshot */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={handleExportSnapshot}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Cache Snapshot</span>
                </button>

                {isOnline && (
                  <button
                    onClick={syncNow}
                    disabled={isSyncing}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
