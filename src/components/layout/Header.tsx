import React from 'react';
import { useTender, SheetTabId } from '../../context/TenderContext';
import {
  Search,
  Wand2,
  FileCheck2,
  Printer,
  ChevronDown,
  Building2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { OfflineSyncIndicator } from '../common/OfflineSyncIndicator';
import { PWAInstallButton } from '../common/PWAInstallButton';

export const Header: React.FC = () => {
  const {
    activeTender,
    tenders,
    setActiveTenderId,
    companyProfile,
    readinessResult,
    setActiveTab,
    setIsSetupWizardOpen,
    setIsSearchModalOpen,
  } = useTender();

  const getStatusBadge = () => {
    switch (readinessResult.readiness) {
      case 'READY':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>BID READY ({readinessResult.scorePct}%)</span>
          </div>
        );
      case 'READY_WITH_WARNINGS':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>WARNINGS ({readinessResult.scorePct}%)</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-md text-xs font-semibold">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>NOT READY ({readinessResult.scorePct}%)</span>
          </div>
        );
    }
  };

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        {/* Zone 1: Brand & Company Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-bold text-white shadow-sm text-sm">
            AM
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-white">
                TENDER PREPARATION SUITE
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                PPA 2025
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Building2 className="w-3 h-3 text-slate-400 inline" />
              <span className="truncate max-w-[240px] sm:max-w-[320px] font-medium text-slate-300">
                {companyProfile.legalName}
              </span>
              <span>·</span>
              <span className="text-amber-400 font-semibold">{companyProfile.contractorGrade.split(' ')[0]} {companyProfile.contractorGrade.split(' ')[1]}</span>
            </div>
          </div>
        </div>

        {/* Zone 2: Active Tender Selector & Search */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-4">
          <div className="relative flex-1">
            <select
              value={activeTender.tenderId}
              onChange={(e) => setActiveTenderId(e.target.value)}
              className="w-full appearance-none bg-slate-800/90 text-xs text-slate-200 border border-slate-700 rounded-md py-1.5 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 truncate cursor-pointer font-medium"
            >
              {tenders.map((t) => (
                <option key={t.tenderId} value={t.tenderId} className="bg-slate-900 text-slate-200">
                  {t.tenderRef} — {t.projectTitle.slice(0, 42)}...
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-md transition-colors shrink-0"
            title="Search projects, personnel, equipment, docs..."
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden lg:inline">Find (Ctrl+K)</span>
          </button>
        </div>

        {/* Zone 3: Actions & Readiness */}
        <div className="flex items-center gap-2 shrink-0">
          <OfflineSyncIndicator />
          {getStatusBadge()}
          <PWAInstallButton />

          <button
            onClick={() => setIsSetupWizardOpen(true)}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md text-xs font-medium transition-colors"
            title="Run 10-step setup wizard"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Setup Wizard</span>
          </button>

          <button
            onClick={() => setActiveTab('26_EXPORT')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-md text-xs transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export & Print</span>
          </button>
        </div>
      </div>
    </header>
  );
};
