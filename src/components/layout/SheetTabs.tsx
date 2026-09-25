import React, { useRef } from 'react';
import { useTender, SheetTabId } from '../../context/TenderContext';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
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
} from 'lucide-react';

interface TabDefinition {
  id: SheetTabId;
  code: string;
  name: string;
  category: 'General' | 'Management' | 'Database' | 'Schedule' | 'Technical';
  icon: React.ElementType;
  badge?: number;
}

const TABS: TabDefinition[] = [
  { id: '01_COVER', code: '01', name: 'Cover Page', category: 'General', icon: FileText },
  { id: '02_HOME', code: '02', name: 'Home Launchpad', category: 'General', icon: Home },
  { id: '03_DASHBOARD', code: '03', name: 'Dashboard', category: 'General', icon: LayoutDashboard },
  { id: '04_PROFILE', code: '04', name: 'Company Profile', category: 'Management', icon: Building },
  { id: '05_TENDER_INFO', code: '05', name: 'Tender Info', category: 'Management', icon: Info },
  { id: '06_CHECKLIST', code: '06', name: 'Document Checklist', category: 'Management', icon: ListCheck },
  { id: '07_REVIEW', code: '07', name: 'Submission Review', category: 'Management', icon: CheckSquare },
  { id: '08_PROJECTS', code: '08', name: 'Projects DB', category: 'Database', icon: Briefcase },
  { id: '09_PERSONNEL', code: '09', name: 'Personnel DB', category: 'Database', icon: Users },
  { id: '10_EQUIPMENT', code: '10', name: 'Equipment DB', category: 'Database', icon: Wrench },
  { id: '11_FINANCIAL', code: '11', name: 'Financial DB', category: 'Database', icon: DollarSign },
  { id: '12_BANKS', code: '12', name: 'Banks DB', category: 'Database', icon: Landmark },
  { id: '13_CLIENTS', code: '13', name: 'Clients DB', category: 'Database', icon: UserCheck },
  { id: '14_LETTER_OF_BID', code: '14', name: 'Letter of Bid', category: 'Schedule', icon: Mail },
  { id: '15_SCHED_1', code: '15', name: 'Sched 1 Eligibility', category: 'Schedule', icon: ShieldCheck },
  { id: '16_SCHED_2_FIN', code: '16', name: 'Sched 2 Financial', category: 'Schedule', icon: TrendingUp },
  { id: '17_SCHED_2_CREDIT', code: '17', name: 'Sched 2 Credit Line', category: 'Schedule', icon: CreditCard },
  { id: '18_SCHED_3A_GEN', code: '18', name: 'Sched 3a Gen Exp', category: 'Schedule', icon: History },
  { id: '19_SCHED_3B_SPEC', code: '19', name: 'Sched 3b Spec Exp', category: 'Schedule', icon: Target },
  { id: '20_SCHED_3C_COMMIT', code: '20', name: 'Sched 3c Commitments', category: 'Schedule', icon: Clock },
  { id: '21_SCHED_7_EQUIP', code: '21', name: 'Sched 7 Equipment', category: 'Schedule', icon: Truck },
  { id: '22_SCHED_8_PERSONNEL', code: '22', name: 'Sched 8 Personnel', category: 'Schedule', icon: HardHat },
  { id: '23_SCHED_12_SUBCON', code: '23', name: 'Sched 12 Subcontractors', category: 'Schedule', icon: Network },
  { id: '24_METHODOLOGY', code: '24', name: 'Work Methodology', category: 'Technical', icon: BookOpen },
  { id: '25_DOC_REGISTER', code: '25', name: 'Doc Register', category: 'Technical', icon: FolderArchive },
  { id: '26_EXPORT', code: '26', name: 'Export Center', category: 'Technical', icon: Download },
];

export const SheetTabs: React.FC = () => {
  const { activeTab, setActiveTab, readinessResult } = useTender();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getCategoryColor = (cat: TabDefinition['category'], isActive: boolean) => {
    if (isActive) {
      return 'bg-white text-slate-900 border-t-2 border-t-amber-500 shadow-sm font-semibold';
    }
    switch (cat) {
      case 'General':
        return 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border-b border-transparent';
      case 'Management':
        return 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border-b border-transparent';
      case 'Database':
        return 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border-b border-transparent';
      case 'Schedule':
        return 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border-b border-transparent';
      case 'Technical':
        return 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border-b border-transparent';
    }
  };

  return (
    <div className="bg-slate-100 border-b border-slate-300 select-none print:hidden">
      <div className="max-w-7xl mx-auto px-2 flex items-center">
        {/* Scroll Left Button */}
        <button
          onClick={() => scroll('left')}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded transition-colors shrink-0 mr-1"
          aria-label="Scroll tabs left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Tab strip container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-0.5 overflow-x-auto no-scrollbar py-1 scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const hasAlert =
              (tab.id === '06_CHECKLIST' && readinessResult.missingChecklistCount > 0) ||
              (tab.id === '03_DASHBOARD' && readinessResult.criticalIssues.length > 0);

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-t whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer ${getCategoryColor(
                  tab.category,
                  isActive
                )}`}
              >
                <span className="font-mono text-[10px] opacity-60">{tab.code}</span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'opacity-70'}`} />
                <span>{tab.name}</span>
                {hasAlert && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scroll('right')}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded transition-colors shrink-0 ml-1"
          aria-label="Scroll tabs right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
