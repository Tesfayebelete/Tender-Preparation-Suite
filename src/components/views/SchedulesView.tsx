import React, { useState } from 'react';
import { useTender, SheetTabId } from '../../context/TenderContext';
import {
  ShieldCheck,
  TrendingUp,
  CreditCard,
  History,
  Target,
  Clock,
  Truck,
  HardHat,
  Network,
  Printer,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
} from 'lucide-react';

interface SchedulesViewProps {
  initialSchedule?: 'SCHED_1' | 'SCHED_2_FIN' | 'SCHED_2_CREDIT' | 'SCHED_3A' | 'SCHED_3B' | 'SCHED_3C' | 'SCHED_7' | 'SCHED_8' | 'SCHED_12';
}

export const SchedulesView: React.FC<SchedulesViewProps> = ({ initialSchedule }) => {
  const {
    activeTab,
    setActiveTab,
    companyProfile,
    activeTender,
    projects,
    personnel,
    equipment,
    financials,
    banks,
    subcontractors,
    financialEvaluation,
    experienceEvaluation,
    personnelEvaluation,
    equipmentEvaluation,
  } = useTender();

  const getInitialSchedule = () => {
    switch (activeTab) {
      case '15_SCHED_1':
        return 'SCHED_1';
      case '16_SCHED_2_FIN':
        return 'SCHED_2_FIN';
      case '17_SCHED_2_CREDIT':
        return 'SCHED_2_CREDIT';
      case '18_SCHED_3A_GEN':
        return 'SCHED_3A';
      case '19_SCHED_3B_SPEC':
        return 'SCHED_3B';
      case '20_SCHED_3C_COMMIT':
        return 'SCHED_3C';
      case '21_SCHED_7_EQUIP':
        return 'SCHED_7';
      case '22_SCHED_8_PERSONNEL':
        return 'SCHED_8';
      case '23_SCHED_12_SUBCON':
        return 'SCHED_12';
      default:
        return initialSchedule || 'SCHED_1';
    }
  };

  const [activeSched, setActiveSched] = useState(getInitialSchedule());

  const handleSwitchSched = (sched: typeof activeSched, tabId: SheetTabId) => {
    setActiveSched(sched);
    setActiveTab(tabId);
  };

  // Schedule 3c: Filter active projects
  const activeCommitments = projects.filter(
    (p) => p.status === 'Ongoing' || (p.currentProgressPct && p.currentProgressPct < 100)
  );

  const totalRemainingWorkload = activeCommitments.reduce(
    (acc, p) => acc + (p.remainingWorkValue || 0),
    0
  );

  const availableBiddingCapacity = companyProfile.authorizedBiddingCapacity - totalRemainingWorkload;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header & Sub-Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            PPA 2025 Tender Bid Qualification Schedules
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Official standardized submission schedules auto-populated from master company databases.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors shrink-0 print:hidden"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Schedule</span>
        </button>
      </div>

      {/* Schedule Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        <button
          onClick={() => handleSwitchSched('SCHED_1', '15_SCHED_1')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeSched === 'SCHED_1'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Sched 1: Eligibility</span>
        </button>

        <button
          onClick={() => handleSwitchSched('SCHED_2_FIN', '16_SCHED_2_FIN')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeSched === 'SCHED_2_FIN'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Sched 2: Financial</span>
        </button>

        <button
          onClick={() => handleSwitchSched('SCHED_2_CREDIT', '17_SCHED_2_CREDIT')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeSched === 'SCHED_2_CREDIT'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Sched 2: Credit Facility</span>
        </button>

        <button
          onClick={() => handleSwitchSched('SCHED_3A', '18_SCHED_3A_GEN')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeSched === 'SCHED_3A'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Sched 3a: General Exp</span>
        </button>

        <button
          onClick={() => handleSwitchSched('SCHED_3B', '19_SCHED_3B_SPEC')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeSched === 'SCHED_3B'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Sched 3b: Specific Exp</span>
        </button>

        <button
          onClick={() => handleSwitchSched('SCHED_3C', '20_SCHED_3C_COMMIT')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeSched === 'SCHED_3C'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Sched 3c: Commitments</span>
        </button>

        <button
          onClick={() => handleSwitchSched('SCHED_7', '21_SCHED_7_EQUIP')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeSched === 'SCHED_7'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Sched 7: Equipment</span>
        </button>

        <button
          onClick={() => handleSwitchSched('SCHED_8', '22_SCHED_8_PERSONNEL')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeSched === 'SCHED_8'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HardHat className="w-3.5 h-3.5" />
          <span>Sched 8: Personnel</span>
        </button>

        <button
          onClick={() => handleSwitchSched('SCHED_12', '23_SCHED_12_SUBCON')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeSched === 'SCHED_12'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>Sched 12: Subcontractors</span>
        </button>
      </div>

      {/* SCHEDULE 1 — ELIGIBILITY */}
      {activeSched === 'SCHED_1' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              SCHEDULE 1 — ELIGIBILITY & REGULATORY STATUS MATRIX
            </h2>
            <p className="text-[11px] text-slate-500">
              Compliance verification under PPA 2025 Clause 4 (Eligibility Criteria).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Criteria Code</th>
                  <th className="p-2.5">Statutory Eligibility Requirement</th>
                  <th className="p-2.5">Company Data / Value</th>
                  <th className="p-2.5">Supporting Evidence Document</th>
                  <th className="p-2.5">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2.5 font-mono text-slate-600">ELIG-01</td>
                  <td className="p-2.5 font-semibold text-slate-900">Commercial Registration in Ethiopia</td>
                  <td className="p-2.5 font-mono text-slate-800">{companyProfile.principalRegNo}</td>
                  <td className="p-2.5 text-slate-600">Addis Ababa Trade Bureau Certificate (DOC-REG-01.pdf)</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      COMPLIANT
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono text-slate-600">ELIG-02</td>
                  <td className="p-2.5 font-semibold text-slate-900">Renewed Principal Trade License (2018 E.C.)</td>
                  <td className="p-2.5 font-mono text-slate-800">{companyProfile.licenseNumber} (Exp: {companyProfile.licenseExpiryDate})</td>
                  <td className="p-2.5 text-slate-600">Official Renewed Trade License with 3/4/2018 Stamp</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      COMPLIANT
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono text-slate-600">ELIG-03</td>
                  <td className="p-2.5 font-semibold text-slate-900">Certificate of Competence for Contractor</td>
                  <td className="p-2.5 text-slate-800">{companyProfile.contractorGrade} · ECA: {companyProfile.competenceCertNo}</td>
                  <td className="p-2.5 text-slate-600">Ethiopian Construction Authority Certificate CON/30805</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      COMPLIANT
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono text-slate-600">ELIG-04</td>
                  <td className="p-2.5 font-semibold text-slate-900">Tax Identification & Active VAT Registration</td>
                  <td className="p-2.5 font-mono text-slate-800">TIN: {companyProfile.tinNumber} · VAT: {companyProfile.vatNumber}</td>
                  <td className="p-2.5 text-slate-600">Revenue Authority Certificates No. 17382828360823 & 21946910823</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      COMPLIANT
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono text-slate-600">ELIG-05</td>
                  <td className="p-2.5 font-semibold text-slate-900">Current Tax Clearance for Public Tenders</td>
                  <td className="p-2.5 text-slate-800">Certificate Ref: TC-AA-2026/09-182</td>
                  <td className="p-2.5 text-slate-600">Addis Ababa City Revenue Authority (Valid through Nov 2026)</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      COMPLIANT
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono text-slate-600">ELIG-06</td>
                  <td className="p-2.5 font-semibold text-slate-900">Debarment & Non-Performance Check</td>
                  <td className="p-2.5 text-slate-800">Clean legal standing, no blacklisting</td>
                  <td className="p-2.5 text-slate-600">PPA National Debarred Bidders List Checked (Clear)</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      COMPLIANT
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SCHEDULE 2 — FINANCIAL CAPACITY */}
      {activeSched === 'SCHED_2_FIN' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              SCHEDULE 2 — FINANCIAL CAPACITY & HISTORICAL TURNOVER
            </h2>
            <p className="text-[11px] text-slate-500">
              Calculations derived from certified audited balance sheets.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Qualification Parameter</th>
                  <th className="p-2.5">PPA Tender Threshold</th>
                  <th className="p-2.5">Company Certified Value</th>
                  <th className="p-2.5">Net Variance</th>
                  <th className="p-2.5">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {financialEvaluation.metrics.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 font-semibold text-slate-900">
                      <div>{m.metricName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{m.evidence}</div>
                    </td>
                    <td className="p-2.5 font-mono text-slate-700">
                      ETB {m.tenderThreshold.toLocaleString()}
                    </td>
                    <td className="p-2.5 font-mono font-bold text-slate-950">
                      ETB {m.companyValue.toLocaleString()}
                    </td>
                    <td className="p-2.5 font-mono font-bold">
                      <span className={m.variance >= 0 ? 'text-emerald-700' : 'text-rose-700'}>
                        {m.variance >= 0 ? '+' : ''}ETB {m.variance.toLocaleString()} ({m.variancePercent.toFixed(1)}%)
                      </span>
                    </td>
                    <td className="p-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          m.status === 'COMPLIANT'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SCHEDULE 2 — CREDIT FACILITY */}
      {activeSched === 'SCHED_2_CREDIT' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              SCHEDULE 2 — BANK CREDIT FACILITY CONFIRMATION
            </h2>
            <p className="text-[11px] text-slate-500">
              Unconditional line of credit commitment letters from reputable commercial banks.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Financial Institution</th>
                  <th className="p-2.5">Facility Type</th>
                  <th className="p-2.5">Approved Limit (ETB)</th>
                  <th className="p-2.5">Available Balance (ETB)</th>
                  <th className="p-2.5">Letter Reference & Date</th>
                  <th className="p-2.5">Tender Threshold</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {banks.map((b) => (
                  <tr key={b.bankId} className="hover:bg-slate-50">
                    <td className="p-2.5 font-sans font-bold text-slate-900">{b.bankName}</td>
                    <td className="p-2.5 font-sans text-slate-700">{b.facilityType}</td>
                    <td className="p-2.5 text-slate-700">{b.facilityAmount.toLocaleString()}</td>
                    <td className="p-2.5 font-bold text-emerald-700">{b.availableAmount.toLocaleString()}</td>
                    <td className="p-2.5 text-[11px] text-slate-600 font-sans">{b.bankRef} ({b.issueDate})</td>
                    <td className="p-2.5 text-slate-600">{activeTender.qualifications.minCreditFacility.toLocaleString()}</td>
                    <td className="p-2.5 font-sans">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        CONFIRMED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SCHEDULE 3a — GENERAL EXPERIENCE */}
      {activeSched === 'SCHED_3A' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              SCHEDULE 3a — GENERAL CONSTRUCTION EXPERIENCE
            </h2>
            <p className="text-[11px] text-slate-500">
              Company established in {companyProfile.yearEstablished} ({new Date().getFullYear() - companyProfile.yearEstablished} years in business vs {activeTender.qualifications.minYearsGeneralExperience} years required).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Starting Year</th>
                  <th className="p-2.5">Ending Year</th>
                  <th className="p-2.5">Contract Identification & Client</th>
                  <th className="p-2.5">Scope of Works</th>
                  <th className="p-2.5">Value (ETB)</th>
                  <th className="p-2.5">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {projects.map((p) => (
                  <tr key={p.projectId} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono text-slate-600">{p.startDate.slice(0, 4)}</td>
                    <td className="p-2.5 font-mono text-slate-600">{p.completionDate.slice(0, 4)}</td>
                    <td className="p-2.5">
                      <div className="font-bold text-slate-900">{p.projectName}</div>
                      <div className="text-[11px] text-slate-500">{p.clientName}</div>
                    </td>
                    <td className="p-2.5 text-slate-600 max-w-xs text-[11px]">{p.scopeOfWork}</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{p.contractAmount.toLocaleString()}</td>
                    <td className="p-2.5 font-semibold text-slate-800">{p.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SCHEDULE 3b — SPECIFIC EXPERIENCE */}
      {activeSched === 'SCHED_3B' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              SCHEDULE 3b — SPECIFIC CONSTRUCTION EXPERIENCE
            </h2>
            <p className="text-[11px] text-slate-500">
              Contracts of similar nature and complexity (Tender Requirement: {activeTender.qualifications.minSpecificProjectsCount} contracts ≥ ETB {(activeTender.qualifications.minSpecificProjectValue / 1000000).toFixed(1)}M).
            </p>
          </div>

          <div className="space-y-4">
            {experienceEvaluation.qualifyingProjects.map((p, idx) => (
              <div key={p.projectId} className="p-4 bg-slate-50 border border-slate-300 rounded text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 text-sm">
                    Specific Contract #{idx + 1}: {p.projectName}
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded font-bold font-mono">
                    ETB {p.contractAmount.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div><strong>Client:</strong> {p.clientName}</div>
                  <div><strong>Location:</strong> {p.projectLocation}</div>
                  <div><strong>Contract No:</strong> {p.contractNumber}</div>
                  <div><strong>Supervising Consultant:</strong> {p.consultant}</div>
                  <div><strong>Client Contact:</strong> {p.contactPerson} ({p.contactDetails})</div>
                  <div><strong>Evidence Attached:</strong> {p.docReference}</div>
                </div>
                <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded border border-slate-200">
                  <strong>Scope Details:</strong> {p.scopeOfWork}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCHEDULE 3c — CURRENT COMMITMENTS */}
      {activeSched === 'SCHED_3C' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              SCHEDULE 3c — CURRENT CONTRACT COMMITMENTS & WORKS IN PROGRESS
            </h2>
            <p className="text-[11px] text-slate-500">
              Live contracts demonstrating remaining capacity under company GC-5 ceiling of ETB 180,000,000.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 font-mono">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 font-sans">
                <tr>
                  <th className="p-2.5">Project Name & Client</th>
                  <th className="p-2.5">Total Contract (ETB)</th>
                  <th className="p-2.5">Progress %</th>
                  <th className="p-2.5">Remaining Work (ETB)</th>
                  <th className="p-2.5">Est. Monthly Invoicing</th>
                  <th className="p-2.5">Planned Completion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {activeCommitments.map((p) => (
                  <tr key={p.projectId} className="hover:bg-slate-50">
                    <td className="p-2.5 font-sans">
                      <div className="font-bold text-slate-900">{p.projectName}</div>
                      <div className="text-[11px] text-slate-500">{p.clientName}</div>
                    </td>
                    <td className="p-2.5 text-slate-800">{p.contractAmount.toLocaleString()}</td>
                    <td className="p-2.5 font-bold text-blue-700">{p.currentProgressPct || 50}%</td>
                    <td className="p-2.5 font-bold text-amber-900">
                      {(p.remainingWorkValue || p.contractAmount * 0.4).toLocaleString()}
                    </td>
                    <td className="p-2.5 text-slate-700">
                      {(p.monthlyWorkload || (p.contractAmount * 0.4) / 10).toLocaleString()}
                    </td>
                    <td className="p-2.5 text-slate-700">{p.completionDate}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t-2 border-slate-300">
                <tr>
                  <td className="p-2.5 font-sans">TOTAL COMMITMENTS:</td>
                  <td className="p-2.5">—</td>
                  <td className="p-2.5">—</td>
                  <td className="p-2.5 text-rose-800">ETB {totalRemainingWorkload.toLocaleString()}</td>
                  <td className="p-2.5" colSpan={2}>
                    <span className="font-sans font-semibold text-emerald-800">
                      Available Capacity: ETB {availableBiddingCapacity.toLocaleString()}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* SCHEDULE 7 — EQUIPMENT */}
      {activeSched === 'SCHED_7' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              SCHEDULE 7 — PROPOSED CONSTRUCTION PLANT & EQUIPMENT
            </h2>
            <p className="text-[11px] text-slate-500">
              Assigned equipment to meet technical specifications of this tender.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Equipment Description</th>
                  <th className="p-2.5">Make, Model & Year</th>
                  <th className="p-2.5">Capacity / Rating</th>
                  <th className="p-2.5">Ownership Status</th>
                  <th className="p-2.5">Current Location</th>
                  <th className="p-2.5">Assigned Role on Site</th>
                  <th className="p-2.5">Evidence Doc</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {activeTender.selectedEquipmentIds.map((item, idx) => {
                  const eq = equipment.find((e) => e.equipmentId === item.equipmentId);
                  if (!eq) return null;
                  return (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900">{eq.equipmentName}</td>
                      <td className="p-2.5 text-slate-700">{eq.make} {eq.model} ({eq.year})</td>
                      <td className="p-2.5 font-medium text-slate-800">{eq.capacity}</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {eq.ownership}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-600">{eq.location}</td>
                      <td className="p-2.5 font-semibold text-slate-800">{item.proposedRole}</td>
                      <td className="p-2.5 font-mono text-[10px] text-slate-500">{eq.evidenceDoc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SCHEDULE 8 — PERSONNEL */}
      {activeSched === 'SCHED_8' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              SCHEDULE 8 — KEY TECHNICAL & MANAGEMENT PERSONNEL
            </h2>
            <p className="text-[11px] text-slate-500">
              Proposed on-site engineering leadership for the contract.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Proposed Position</th>
                  <th className="p-2.5">Candidate Name</th>
                  <th className="p-2.5">Qualifications & University</th>
                  <th className="p-2.5">Total Exp</th>
                  <th className="p-2.5">Relevant Exp</th>
                  <th className="p-2.5">Professional Reg</th>
                  <th className="p-2.5">CV Attached</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {activeTender.selectedPersonnelIds.map((item, idx) => {
                  const person = personnel.find((p) => p.personnelId === item.personnelId);
                  if (!person) return null;
                  return (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900">{item.proposedRole}</td>
                      <td className="p-2.5 font-semibold text-slate-900">{person.fullName}</td>
                      <td className="p-2.5 text-slate-700">
                        <div>{person.qualification}</div>
                        <div className="text-[10px] text-slate-400">{person.institution} ({person.graduationYear})</div>
                      </td>
                      <td className="p-2.5 font-mono font-bold text-slate-900">{person.yearsExperience} yrs</td>
                      <td className="p-2.5 font-mono font-bold text-emerald-700">{person.relevantYears} yrs</td>
                      <td className="p-2.5 font-mono text-[11px] text-slate-600">{person.professionalRegNo}</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          YES (Signed)
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SCHEDULE 12 — SUBCONTRACTORS */}
      {activeSched === 'SCHED_12' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              SCHEDULE 12 — PROPOSED SUBCONTRACTORS & SPECIALIZED TRADES
            </h2>
            <p className="text-[11px] text-slate-500">
              PPA Subcontracting Ceiling: Max {activeTender.qualifications.maxSubcontractorPercentage}% of total contract price.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Subcontractor Firm Name</th>
                  <th className="p-2.5">Specialized Scope of Work</th>
                  <th className="p-2.5">Trade License / Reg</th>
                  <th className="p-2.5">Contact Person</th>
                  <th className="p-2.5">Subcontract Value (ETB)</th>
                  <th className="p-2.5">% of Bid Price</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {subcontractors.map((s) => (
                  <tr key={s.subcontractorId} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">{s.companyName}</td>
                    <td className="p-2.5 text-slate-700 max-w-xs">{s.scope}</td>
                    <td className="p-2.5 font-mono text-[11px] text-slate-600">{s.licenseNo}</td>
                    <td className="p-2.5 text-slate-700">{s.contactPerson} ({s.phone})</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{s.contractValue.toLocaleString()}</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{s.percentage.toFixed(2)}%</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {s.eligibilityStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                <tr>
                  <td className="p-2.5" colSpan={4}>TOTAL SUBCONTRACTING PERCENTAGE:</td>
                  <td className="p-2.5 font-mono">
                    ETB {subcontractors.reduce((a, b) => a + b.contractValue, 0).toLocaleString()}
                  </td>
                  <td className="p-2.5 font-mono text-emerald-700">
                    {subcontractors.reduce((a, b) => a + b.percentage, 0).toFixed(2)}%
                  </td>
                  <td className="p-2.5 text-emerald-700 text-[10px]">
                    ✓ WITHIN {activeTender.qualifications.maxSubcontractorPercentage}% LIMIT
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
