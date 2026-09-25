import React, { useEffect } from 'react';
import { TenderProvider, useTender } from './context/TenderContext';
import { Header } from './components/layout/Header';
import { SheetTabs } from './components/layout/SheetTabs';
import { SetupWizardModal } from './components/modals/SetupWizardModal';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { OfflineBanner } from './components/common/OfflineBanner';

// Views
import { CoverPageView } from './components/views/CoverPageView';
import { HomeView } from './components/views/HomeView';
import { DashboardView } from './components/views/DashboardView';
import { CompanyProfileView } from './components/views/CompanyProfileView';
import { TenderInfoView } from './components/views/TenderInfoView';
import { DocumentChecklistView } from './components/views/DocumentChecklistView';
import { SubmissionReviewView } from './components/views/SubmissionReviewView';
import { DatabasesView } from './components/views/DatabasesView';
import { LetterOfBidView } from './components/views/LetterOfBidView';
import { SchedulesView } from './components/views/SchedulesView';
import { WorkMethodologyView } from './components/views/WorkMethodologyView';
import { TenderDocumentRegisterView } from './components/views/TenderDocumentRegisterView';
import { ExportCenterView } from './components/views/ExportCenterView';

const MainContent: React.FC = () => {
  const { activeTab, setIsSearchModalOpen } = useTender();

  // Keyboard shortcut Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  const renderActiveView = () => {
    switch (activeTab) {
      case '01_COVER':
        return <CoverPageView />;
      case '02_HOME':
        return <HomeView />;
      case '03_DASHBOARD':
        return <DashboardView />;
      case '04_PROFILE':
        return <CompanyProfileView />;
      case '05_TENDER_INFO':
        return <TenderInfoView />;
      case '06_CHECKLIST':
        return <DocumentChecklistView />;
      case '07_REVIEW':
        return <SubmissionReviewView />;
      case '08_PROJECTS':
      case '09_PERSONNEL':
      case '10_EQUIPMENT':
      case '11_FINANCIAL':
      case '12_BANKS':
      case '13_CLIENTS':
        return <DatabasesView />;
      case '14_LETTER_OF_BID':
        return <LetterOfBidView />;
      case '15_SCHED_1':
      case '16_SCHED_2_FIN':
      case '17_SCHED_2_CREDIT':
      case '18_SCHED_3A_GEN':
      case '19_SCHED_3B_SPEC':
      case '20_SCHED_3C_COMMIT':
      case '21_SCHED_7_EQUIP':
      case '22_SCHED_8_PERSONNEL':
      case '23_SCHED_12_SUBCON':
        return <SchedulesView />;
      case '24_METHODOLOGY':
        return <WorkMethodologyView />;
      case '25_DOC_REGISTER':
        return <TenderDocumentRegisterView />;
      case '26_EXPORT':
        return <ExportCenterView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      <SheetTabs />
      <main className="flex-1 pb-16">
        {renderActiveView()}
      </main>
      <SetupWizardModal />
      <GlobalSearchModal />
      <OfflineBanner />
    </div>
  );
};

export default function App() {
  return (
    <TenderProvider>
      <MainContent />
    </TenderProvider>
  );
}
