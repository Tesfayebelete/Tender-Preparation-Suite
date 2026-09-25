import React from 'react';
import { useTender, SheetTabId } from '../../context/TenderContext';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  FileCheck2,
  TrendingUp,
  HardHat,
  Truck,
  ShieldCheck,
  CreditCard,
  Briefcase,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    activeTender,
    companyProfile,
    readinessResult,
    financialEvaluation,
    experienceEvaluation,
    personnelEvaluation,
    equipmentEvaluation,
    setActiveTab,
  } = useTender();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLIANT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            COMPLIANT
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            WARNING
          </span>
        );
      case 'NON_COMPLIANT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" />
            NON-COMPLIANT
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            PENDING
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Title & Readiness Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">
              03 — Tender Readiness Dashboard
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
              {activeTender.tenderRef}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time qualification verification against PPA 2025 standard criteria for Ethiopian construction contractors.
          </p>
        </div>

        {/* Big Verdict Pill */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              OVERALL STATUS
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              {readinessResult.readiness === 'READY'
                ? 'BID READY FOR SUBMISSION'
                : readinessResult.readiness === 'READY_WITH_WARNINGS'
                  ? 'READY WITH ADVISORY WARNINGS'
                  : 'NOT READY — DEFICITS DETECTED'}
            </div>
          </div>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono shadow-xs ${
              readinessResult.readiness === 'READY'
                ? 'bg-emerald-600 text-white'
                : readinessResult.readiness === 'READY_WITH_WARNINGS'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-rose-600 text-white'
            }`}
          >
            {readinessResult.scorePct}%
          </div>
        </div>
      </div>

      {/* Main KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: Documents */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between">
            <span>Documents</span>
            <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 mt-1 font-mono">
            {readinessResult.checklistCompletionPct}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {readinessResult.completedChecklistCount}/{readinessResult.totalChecklistCount} verified
          </div>
        </div>

        {/* Card 2: Financial Turnover */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between">
            <span>Turnover</span>
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 mt-1 font-mono">
            ETB 41.2M
          </div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
            Req: ETB 35M (+17%)
          </div>
        </div>

        {/* Card 3: Experience */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between">
            <span>Specific Exp</span>
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 mt-1 font-mono">
            {experienceEvaluation.specificCountActual} Projects
          </div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
            Req: {experienceEvaluation.specificCountRequired} contracts ≥ ETB 15M
          </div>
        </div>

        {/* Card 4: Personnel */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between">
            <span>Key Personnel</span>
            <HardHat className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 mt-1 font-mono">
            4 / 4 Roles
          </div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
            All CVs & degrees active
          </div>
        </div>

        {/* Card 5: Equipment */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between">
            <span>Equipment</span>
            <Truck className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 mt-1 font-mono">
            5 / 5 Fleet
          </div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
            Owned & leased ready
          </div>
        </div>

        {/* Card 6: Deadline */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between">
            <span>Days Remaining</span>
            <Clock className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 mt-1 font-mono">
            {readinessResult.daysRemaining} Days
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Due {activeTender.submissionDate}
          </div>
        </div>
      </div>

      {/* Critical Issues & Warnings Callouts */}
      {(readinessResult.criticalIssues.length > 0 || readinessResult.warnings.length > 0) && (
        <div className="space-y-3">
          {readinessResult.criticalIssues.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Critical Items Requiring Resolution Before Submission ({readinessResult.criticalIssues.length})</span>
              </div>
              <ul className="space-y-1 text-xs text-rose-900 list-disc list-inside">
                {readinessResult.criticalIssues.map((issue, idx) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            </div>
          )}

          {readinessResult.warnings.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Advisory Warnings ({readinessResult.warnings.length})</span>
              </div>
              <ul className="space-y-1 text-xs text-amber-900 list-disc list-inside">
                {readinessResult.warnings.map((warn, idx) => (
                  <li key={idx}>{warn}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Detailed Compliance Matrices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Financial Qualification Variance Matrix */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Financial Capacity Variance Analysis
              </h2>
              <p className="text-[11px] text-slate-500">
                PPA 2025 Schedule 2 Qualification Thresholds vs Audited Company Values
              </p>
            </div>
            <button
              onClick={() => setActiveTab('16_SCHED_2_FIN')}
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
            >
              <span>View Sched 2</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {financialEvaluation.metrics.map((metric, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{metric.metricName}</span>
                  {getStatusBadge(metric.status)}
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-slate-500">Threshold: </span>
                    <span className="font-mono text-slate-700">
                      ETB {metric.tenderThreshold.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Company Value: </span>
                    <span className="font-mono font-semibold text-slate-900">
                      ETB {metric.companyValue.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Variance: </span>
                    <span className={`font-mono font-bold ${metric.variance >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {metric.variance >= 0 ? '+' : ''}ETB {metric.variance.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 italic mt-0.5">
                  Reason: {metric.reason}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Experience & Technical Compliance */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Experience & Technical Compliance
              </h2>
              <p className="text-[11px] text-slate-500">
                PPA Schedule 3, 7 and 8 verification against master databases
              </p>
            </div>
            <button
              onClick={() => setActiveTab('19_SCHED_3B_SPEC')}
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
            >
              <span>View Sched 3b</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Experience Box */}
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">General & Specific Construction Experience</span>
                {getStatusBadge(experienceEvaluation.overallStatus)}
              </div>
              <p className="text-[11px] text-slate-600">{experienceEvaluation.reason}</p>
              <div className="text-[10px] text-slate-500 pt-1">
                Qualifying Contracts: {experienceEvaluation.qualifyingProjects.map((p) => p.projectName).join(' · ')}
              </div>
            </div>

            {/* Personnel Box */}
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Key Personnel Staffing (Schedule 8)</span>
                {getStatusBadge(personnelEvaluation.overallStatus)}
              </div>
              <div className="space-y-1 mt-1">
                {personnelEvaluation.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] py-0.5 border-b border-slate-200/50 last:border-0">
                    <span className="text-slate-700">{item.requiredPosition}</span>
                    <span className="font-medium text-slate-900">
                      {item.assignedPersonnel?.fullName || 'Not Assigned'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment Box */}
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Equipment Fleet Allocation (Schedule 7)</span>
                {getStatusBadge(equipmentEvaluation.overallStatus)}
              </div>
              <div className="space-y-1 mt-1">
                {equipmentEvaluation.items.map((eq, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] py-0.5 border-b border-slate-200/50 last:border-0">
                    <span className="text-slate-700">{eq.requiredType} (Req: {eq.requiredQty})</span>
                    <span className="font-medium text-emerald-700">Assigned & Verified</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
