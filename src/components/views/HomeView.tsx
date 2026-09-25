import React from 'react';
import { useTender, SheetTabId } from '../../context/TenderContext';
import {
  FileText,
  LayoutDashboard,
  Building,
  Info,
  ListCheck,
  CheckSquare,
  Briefcase,
  Users,
  Wrench,
  DollarSign,
  Landmark,
  UserCheck,
  Mail,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  History,
  Target,
  Clock,
  Truck,
  HardHat,
  Network,
  BookOpen,
  FolderArchive,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Calendar,
  Layers,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    companyProfile,
    activeTender,
    tenders,
    setActiveTenderId,
    setActiveTab,
    readinessResult,
    resetToDefaultData,
  } = useTender();

  const navCategories = [
    {
      title: 'Tender Management & Governance',
      items: [
        { id: '01_COVER' as SheetTabId, code: '01', title: 'Cover Page', desc: 'Official bid cover sheet', icon: FileText },
        { id: '03_DASHBOARD' as SheetTabId, code: '03', title: 'Executive Dashboard', desc: 'KPI cards & readiness tracker', icon: LayoutDashboard },
        { id: '04_PROFILE' as SheetTabId, code: '04', title: 'Company Master Profile', desc: 'TIN, VAT, licenses & bank info', icon: Building },
        { id: '05_TENDER_INFO' as SheetTabId, code: '05', title: 'Tender Information', desc: 'Requirements & thresholds', icon: Info },
        { id: '06_CHECKLIST' as SheetTabId, code: '06', title: 'Document Checklist', desc: 'Expiry alerts & verification', icon: ListCheck },
        { id: '07_REVIEW' as SheetTabId, code: '07', title: 'Submission Review', desc: 'Section A to P audit check', icon: CheckSquare },
      ],
    },
    {
      title: 'Master Contractor Databases',
      items: [
        { id: '08_PROJECTS' as SheetTabId, code: '08', title: 'Projects Database', desc: 'Track record & certificates', icon: Briefcase },
        { id: '09_PERSONNEL' as SheetTabId, code: '09', title: 'Personnel Database', desc: 'Engineers, CVs & registration', icon: Users },
        { id: '10_EQUIPMENT' as SheetTabId, code: '10', title: 'Equipment Database', desc: 'Machinery fleet & inspection', icon: Wrench },
        { id: '11_FINANCIAL' as SheetTabId, code: '11', title: 'Financial Database', desc: 'Audited balance sheets & turnover', icon: DollarSign },
        { id: '12_BANKS' as SheetTabId, code: '12', title: 'Banks & Credit DB', desc: 'CBE & commercial credit lines', icon: Landmark },
        { id: '13_CLIENTS' as SheetTabId, code: '13', title: 'Clients Database', desc: 'Institutional contacts & refs', icon: UserCheck },
      ],
    },
    {
      title: 'PPA 2025 Tender Bid Schedules',
      items: [
        { id: '14_LETTER_OF_BID' as SheetTabId, code: '14', title: 'Letter of Bid', desc: 'Standard PPA bid declaration', icon: Mail },
        { id: '15_SCHED_1' as SheetTabId, code: '15', title: 'Sched 1: Eligibility', desc: 'Legal and administrative matrix', icon: ShieldCheck },
        { id: '16_SCHED_2_FIN' as SheetTabId, code: '16', title: 'Sched 2: Financial Capacity', desc: 'Turnover & working capital', icon: TrendingUp },
        { id: '17_SCHED_2_CREDIT' as SheetTabId, code: '17', title: 'Sched 2: Credit Facility', desc: 'Bank letter compliance', icon: CreditCard },
        { id: '18_SCHED_3A_GEN' as SheetTabId, code: '18', title: 'Sched 3a: General Experience', desc: 'Years in construction sector', icon: History },
        { id: '19_SCHED_3B_SPEC' as SheetTabId, code: '19', title: 'Sched 3b: Specific Experience', desc: 'Similar contracts matching', icon: Target },
        { id: '20_SCHED_3C_COMMIT' as SheetTabId, code: '20', title: 'Sched 3c: Commitments', desc: 'Active workload & capacity', icon: Clock },
        { id: '21_SCHED_7_EQUIP' as SheetTabId, code: '21', title: 'Sched 7: Equipment Fleet', desc: 'Assigned plant & ownership', icon: Truck },
        { id: '22_SCHED_8_PERSONNEL' as SheetTabId, code: '22', title: 'Sched 8: Key Personnel', desc: 'Site team & qualifications', icon: HardHat },
        { id: '23_SCHED_12_SUBCON' as SheetTabId, code: '23', title: 'Sched 12: Subcontractors', desc: 'Specialized trades (<25%)', icon: Network },
      ],
    },
    {
      title: 'Technical Submission & Export',
      items: [
        { id: '24_METHODOLOGY' as SheetTabId, code: '24', title: 'Work Methodology', desc: '25 construction sections & CPM', icon: BookOpen },
        { id: '25_DOC_REGISTER' as SheetTabId, code: '25', title: 'Document Register', desc: 'Formal document tracking', icon: FolderArchive },
        { id: '26_EXPORT' as SheetTabId, code: '26', title: 'Export & Print Center', desc: 'Batch PDF & bundle printing', icon: Download },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Active Tender Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              ACTIVE TENDER WORKSPACE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Ref: {activeTender.tenderRef}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
            {activeTender.projectTitle}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
            <span>Procuring Entity: <strong className="text-white">{activeTender.procuringEntity}</strong></span>
            <span>·</span>
            <span>Bid Price: <strong className="text-amber-400 font-mono">ETB {activeTender.bidPrice.toLocaleString()}</strong></span>
            <span>·</span>
            <span>Deadline: <strong className="text-white font-mono">{activeTender.submissionDate}</strong></span>
          </div>
        </div>

        {/* Quick Readiness Card & Deadline Counter */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          <div className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700 min-w-[130px] text-center">
            <div className="text-[11px] text-slate-400 font-medium">Days Remaining</div>
            <div className={`text-2xl font-extrabold font-mono mt-0.5 ${readinessResult.daysRemaining <= 7 ? 'text-rose-400' : 'text-amber-400'}`}>
              {readinessResult.daysRemaining > 0 ? readinessResult.daysRemaining : '0'}d
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Until 10:00 AM EAT</div>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700 min-w-[150px] text-center">
            <div className="text-[11px] text-slate-400 font-medium">Readiness Score</div>
            <div className="text-2xl font-extrabold text-white font-mono mt-0.5">
              {readinessResult.scorePct}%
            </div>
            <div className="text-[10px] font-semibold text-emerald-400 mt-0.5">
              {readinessResult.readiness.replace(/_/g, ' ')}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('03_DASHBOARD')}
            className="px-4 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shadow"
          >
            <span>Open Dashboard</span>
            <LayoutDashboard className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Documents Complete</span>
            <ListCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-2 font-mono">
            {readinessResult.completedChecklistCount} / {readinessResult.totalChecklistCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {readinessResult.checklistCompletionPct}% verified
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Turnover Compliance</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-2 font-mono">
            {readinessResult.financialStatus}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
            Avg: ETB 41.2M (Req: 35M)
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Key Personnel Assigned</span>
            <HardHat className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-2 font-mono">
            {readinessResult.personnelStatus}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            4 certified site leads
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Assigned Equipment</span>
            <Truck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-2 font-mono">
            {readinessResult.equipmentStatus}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            5 required plant types ready
          </div>
        </div>
      </div>

      {/* Module Navigation Cards */}
      <div className="space-y-6">
        {navCategories.map((cat, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {cat.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg text-left transition-all duration-150 shadow-2xs hover:shadow-xs group flex items-start gap-3 cursor-pointer"
                  >
                    <div className="p-2 rounded bg-slate-100 text-slate-700 group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                          {item.title}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 group-hover:text-slate-600">
                          {item.code}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Demo Data & Reset Helper */}
      <div className="p-4 bg-slate-100 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div>
          <span className="font-semibold text-slate-900">Ethiopian GC-5 Sample Data Active:</span> Loaded with verified records for Aklilu Misganaw Mesfin General Contractor (TIN 0043565139).
        </div>
        <button
          onClick={() => {
            if (window.confirm('Reset all databases and active tender to default Ethiopian GC-5 sample data?')) {
              resetToDefaultData();
            }
          }}
          className="text-xs text-slate-700 hover:text-slate-950 font-medium px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
        >
          Reload Sample Data
        </button>
      </div>
    </div>
  );
};
