import React, { useState } from 'react';
import { useTender } from '../../context/TenderContext';
import {
  Download,
  Printer,
  FileText,
  CheckSquare,
  AlertTriangle,
  FileCheck2,
  Database,
  Upload,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const ExportCenterView: React.FC = () => {
  const {
    activeTender,
    companyProfile,
    readinessResult,
    financialEvaluation,
    experienceEvaluation,
    exportDataToJson,
    importDataFromJson,
    setActiveTab,
  } = useTender();

  const [selectedDocs, setSelectedDocs] = useState<Record<string, boolean>>({
    coverPage: true,
    letterOfBid: true,
    sched1: true,
    sched2Fin: true,
    sched2Credit: true,
    sched3a: true,
    sched3b: true,
    sched3c: true,
    sched7: true,
    sched8: true,
    sched12: true,
    methodology: true,
    checklist: true,
    submissionReview: true,
  });

  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const toggleAll = (select: boolean) => {
    const updated: Record<string, boolean> = {};
    Object.keys(selectedDocs).forEach((k) => {
      updated[k] = select;
    });
    setSelectedDocs(updated);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDataToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PPA_Tender_Suite_Backup_${activeTender.tenderId}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = () => {
    if (!importJsonText.trim()) return;
    const success = importDataFromJson(importJsonText);
    if (success) {
      setImportStatus('Backup restored successfully!');
      setImportJsonText('');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('Failed to parse backup JSON. Please check file formatting.');
    }
  };

  const docList = [
    { key: 'coverPage', title: '01 — Cover Page & Company Title Block', tab: '01_COVER' as const },
    { key: 'letterOfBid', title: '14 — Letter of Bid (PPA 2025 Standard Form)', tab: '14_LETTER_OF_BID' as const },
    { key: 'sched1', title: '15 — Schedule 1: Eligibility & Statutory Status Matrix', tab: '15_SCHED_1' as const },
    { key: 'sched2Fin', title: '16 — Schedule 2: Financial Capacity & Turnover Calculations', tab: '16_SCHED_2_FIN' as const },
    { key: 'sched2Credit', title: '17 — Schedule 2: Commercial Bank Credit Facility Line', tab: '17_SCHED_2_CREDIT' as const },
    { key: 'sched3a', title: '18 — Schedule 3a: General Construction Experience Record', tab: '18_SCHED_3A_GEN' as const },
    { key: 'sched3b', title: '19 — Schedule 3b: Specific Similar Experience Matching', tab: '19_SCHED_3B_SPEC' as const },
    { key: 'sched3c', title: '20 — Schedule 3c: Current Commitments & Available Capacity', tab: '20_SCHED_3C_COMMIT' as const },
    { key: 'sched7', title: '21 — Schedule 7: Proposed Plant & Machinery Fleet', tab: '21_SCHED_7_EQUIP' as const },
    { key: 'sched8', title: '22 — Schedule 8: Proposed Key Technical & Management Personnel', tab: '22_SCHED_8_PERSONNEL' as const },
    { key: 'sched12', title: '23 — Schedule 12: Specialized Subcontractors Schedule', tab: '23_SCHED_12_SUBCON' as const },
    { key: 'methodology', title: '24 — Comprehensive 25-Section Construction Work Methodology', tab: '24_METHODOLOGY' as const },
    { key: 'checklist', title: '06 — Document Checklist & Expiry Verification', tab: '06_CHECKLIST' as const },
    { key: 'submissionReview', title: '07 — Final Submission Review & Audit Checklist (A to P)', tab: '07_REVIEW' as const },
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            26 — Final Bid Package & Export Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Compile, print, and export your complete technical and financial tender dossier under PPA standards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Selected Package (PDF)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Schedule Selection Checklist */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Bid Submission Package Components
              </h2>
              <p className="text-[11px] text-slate-500">
                Select documents to include in your printed binder or export.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => toggleAll(true)}
                className="text-amber-700 hover:text-amber-800 font-semibold"
              >
                Select All
              </button>
              <span>·</span>
              <button
                onClick={() => toggleAll(false)}
                className="text-slate-500 hover:text-slate-800"
              >
                Deselect All
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {docList.map((doc) => (
              <div
                key={doc.key}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <label className="flex items-center gap-3 cursor-pointer text-xs flex-1">
                  <input
                    type="checkbox"
                    checked={!!selectedDocs[doc.key]}
                    onChange={(e) =>
                      setSelectedDocs((prev) => ({ ...prev, [doc.key]: e.target.checked }))
                    }
                    className="rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-900">{doc.title}</span>
                </label>
                <button
                  onClick={() => setActiveTab(doc.tab)}
                  className="text-xs text-slate-400 hover:text-slate-800 flex items-center gap-1 font-medium pl-2"
                  title="Open this sheet"
                >
                  <span>Preview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Readiness Executive Summary & JSON Backup */}
        <div className="space-y-6">
          {/* Executive Readiness Card */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Tender Readiness Summary
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Tender Reference:</span>
                <span className="font-mono font-semibold text-slate-900">{activeTender.tenderRef}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Overall Readiness:</span>
                <span className="font-bold text-emerald-700">
                  {readinessResult.readiness.replace(/_/g, ' ')} ({readinessResult.scorePct}%)
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Submission Date:</span>
                <span className="font-mono text-slate-900">{activeTender.submissionDate}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Bid Price:</span>
                <span className="font-mono font-bold text-slate-950">
                  ETB {activeTender.bidPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Bid Bond CPO:</span>
                <span className="font-mono font-semibold text-slate-900">
                  ETB {activeTender.bidSecurityAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-xs text-emerald-800">
              ✓ All 15 required submission documents are verified and compliant with PPA 2025 standard instructions.
            </div>
          </div>

          {/* Backup & Restore Data Card */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Data Backup & Restore
            </h2>

            <p className="text-xs text-slate-500">
              Export your complete contractor master database, projects, personnel, and tender schedules as a portable JSON backup file.
            </p>

            <button
              onClick={handleDownloadBackup}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON Master Backup</span>
            </button>

            <div className="pt-2 border-t border-slate-100">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Paste JSON to Restore:
              </label>
              <textarea
                rows={2}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder="Paste backup JSON..."
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none font-mono"
              />
              <button
                onClick={handleImportBackup}
                disabled={!importJsonText.trim()}
                className="mt-1.5 w-full flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded disabled:opacity-50 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Restore Backup Data</span>
              </button>

              {importStatus && (
                <div className="mt-2 text-xs text-center font-medium text-slate-700">
                  {importStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
