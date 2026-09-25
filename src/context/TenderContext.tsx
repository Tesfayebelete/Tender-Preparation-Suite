import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  CompanyProfile,
  TenderInfo,
  ProjectRecord,
  PersonnelRecord,
  EquipmentRecord,
  FinancialYearRecord,
  BankRecord,
  ClientRecord,
  SubcontractorRecord,
  ChecklistItem,
  SubmissionReviewItem,
  WorkMethodologySection,
  DocumentRegisterItem,
} from '../types/tender';
import { initialCompanyProfile, initialTenders } from '../data/initialData';
import { initialProjects } from '../data/databaseRecords';
import {
  initialPersonnel,
  initialEquipment,
  initialClients,
  initialSubcontractors,
} from '../data/personnelAndEquipment';
import { initialFinancials, initialBanks } from '../data/financialAndBanks';
import {
  initialChecklist,
  initialSubmissionReviews,
  initialMethodologySections,
  initialDocumentRegister,
} from '../data/checklistAndMethodology';
import {
  evaluateOverallTenderReadiness,
  evaluateFinancialMetrics,
  evaluateExperienceCompliance,
  evaluatePersonnelCompliance,
  evaluateEquipmentCompliance,
  OverallReadinessResult,
} from '../utils/complianceEngine';
import {
  OfflinePendingChange,
  recordOfflineChange,
  getOfflinePendingChanges,
  clearOfflinePendingChanges,
  getLastSyncedAt,
  setLastSyncedAt,
  getStorageCacheMetrics,
} from '../utils/offlineSyncManager';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export type SheetTabId =
  | '01_COVER'
  | '02_HOME'
  | '03_DASHBOARD'
  | '04_PROFILE'
  | '05_TENDER_INFO'
  | '06_CHECKLIST'
  | '07_REVIEW'
  | '08_PROJECTS'
  | '09_PERSONNEL'
  | '10_EQUIPMENT'
  | '11_FINANCIAL'
  | '12_BANKS'
  | '13_CLIENTS'
  | '14_LETTER_OF_BID'
  | '15_SCHED_1'
  | '16_SCHED_2_FIN'
  | '17_SCHED_2_CREDIT'
  | '18_SCHED_3A_GEN'
  | '19_SCHED_3B_SPEC'
  | '20_SCHED_3C_COMMIT'
  | '21_SCHED_7_EQUIP'
  | '22_SCHED_8_PERSONNEL'
  | '23_SCHED_12_SUBCON'
  | '24_METHODOLOGY'
  | '25_DOC_REGISTER'
  | '26_EXPORT';

interface TenderContextType {
  activeTab: SheetTabId;
  setActiveTab: (tab: SheetTabId) => void;
  activeTenderId: string;
  setActiveTenderId: (id: string) => void;
  activeTender: TenderInfo;
  companyProfile: CompanyProfile;
  tenders: TenderInfo[];
  projects: ProjectRecord[];
  personnel: PersonnelRecord[];
  equipment: EquipmentRecord[];
  financials: FinancialYearRecord[];
  banks: BankRecord[];
  clients: ClientRecord[];
  subcontractors: SubcontractorRecord[];
  checklist: ChecklistItem[];
  submissionReviews: SubmissionReviewItem[];
  methodologySections: WorkMethodologySection[];
  documentRegister: DocumentRegisterItem[];
  isSetupWizardOpen: boolean;
  setIsSetupWizardOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  expiryWarningDays: number;
  setExpiryWarningDays: (days: number) => void;

  // Offline & Synchronization state
  isOnline: boolean;
  rawIsOnline: boolean;
  simulatedOffline: boolean;
  toggleSimulatedOffline: () => void;
  isSyncModalOpen: boolean;
  setIsSyncModalOpen: (open: boolean) => void;
  lastSyncedAt: string;
  pendingChanges: OfflinePendingChange[];
  syncNow: () => Promise<void>;
  isSyncing: boolean;
  storageMetrics: { estimatedBytes: number; formattedSize: string; keysCount: number };

  // Evaluated compliance calculations
  readinessResult: OverallReadinessResult;
  financialEvaluation: ReturnType<typeof evaluateFinancialMetrics>;
  experienceEvaluation: ReturnType<typeof evaluateExperienceCompliance>;
  personnelEvaluation: ReturnType<typeof evaluatePersonnelCompliance>;
  equipmentEvaluation: ReturnType<typeof evaluateEquipmentCompliance>;

  // Actions
  updateCompanyProfile: (profile: Partial<CompanyProfile>) => void;
  updateActiveTender: (tender: Partial<TenderInfo>) => void;
  addNewTender: (tender: TenderInfo) => void;
  deleteTender: (tenderId: string) => void;
  addProject: (p: ProjectRecord) => void;
  updateProject: (p: ProjectRecord) => void;
  deleteProject: (id: string) => void;
  addPersonnel: (p: PersonnelRecord) => void;
  updatePersonnel: (p: PersonnelRecord) => void;
  deletePersonnel: (id: string) => void;
  addEquipment: (eq: EquipmentRecord) => void;
  updateEquipment: (eq: EquipmentRecord) => void;
  deleteEquipment: (id: string) => void;
  addFinancial: (f: FinancialYearRecord) => void;
  updateFinancial: (f: FinancialYearRecord) => void;
  deleteFinancial: (year: string) => void;
  addBank: (b: BankRecord) => void;
  updateBank: (b: BankRecord) => void;
  deleteBank: (id: string) => void;
  addClient: (c: ClientRecord) => void;
  updateClient: (c: ClientRecord) => void;
  deleteClient: (id: string) => void;
  addSubcontractor: (s: SubcontractorRecord) => void;
  updateSubcontractor: (s: SubcontractorRecord) => void;
  deleteSubcontractor: (id: string) => void;
  updateChecklistItem: (item: ChecklistItem) => void;
  addChecklistItem: (item: ChecklistItem) => void;
  deleteChecklistItem: (id: string) => void;
  updateSubmissionReview: (item: SubmissionReviewItem) => void;
  updateMethodologySection: (section: WorkMethodologySection) => void;
  updateDocumentRegisterItem: (item: DocumentRegisterItem) => void;
  addDocumentRegisterItem: (item: DocumentRegisterItem) => void;
  deleteDocumentRegisterItem: (id: string) => void;
  toggleTenderProject: (projectId: string) => void;
  toggleTenderSubcontractor: (subId: string) => void;
  resetToDefaultData: () => void;
  clearAllData: () => void;
  exportDataToJson: () => string;
  importDataFromJson: (jsonStr: string) => boolean;
}

const TenderContext = createContext<TenderContextType | undefined>(undefined);

const STORAGE_KEY = 'ppa_tender_suite_state_v1';

export const TenderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<SheetTabId>('02_HOME');
  const [activeTenderId, setActiveTenderId] = useState<string>('T-2026-001');
  const [isSetupWizardOpen, setIsSetupWizardOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [expiryWarningDays, setExpiryWarningDays] = useState<number>(60);

  // Offline & Synchronization state
  const {
    isOnline,
    rawIsOnline,
    simulatedOffline,
    toggleSimulatedOffline,
  } = useOnlineStatus();

  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<OfflinePendingChange[]>(() => getOfflinePendingChanges());
  const [lastSyncedAtState, setLastSyncedAtState] = useState<string>(() => getLastSyncedAt());
  const [storageMetrics, setStorageMetrics] = useState(() => getStorageCacheMetrics());

  const refreshStorageAndQueue = () => {
    setPendingChanges(getOfflinePendingChanges());
    setStorageMetrics(getStorageCacheMetrics());
  };

  const syncNow = async () => {
    setIsSyncing(true);
    // Simulate real bidirectional validation & sync to cloud
    await new Promise((resolve) => setTimeout(resolve, 800));
    const nowIso = new Date().toISOString();
    setLastSyncedAt(nowIso);
    setLastSyncedAtState(nowIso);
    clearOfflinePendingChanges();
    setPendingChanges([]);
    setStorageMetrics(getStorageCacheMetrics());
    setIsSyncing(false);
  };

  // Auto-sync when restoring connectivity with pending changes
  useEffect(() => {
    if (isOnline && pendingChanges.length > 0 && !isSyncing) {
      syncNow();
    }
  }, [isOnline]);

  // Core databases
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_company`);
      return saved ? JSON.parse(saved) : initialCompanyProfile;
    } catch {
      return initialCompanyProfile;
    }
  });

  const [tenders, setTenders] = useState<TenderInfo[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_tenders`);
      return saved ? JSON.parse(saved) : initialTenders;
    } catch {
      return initialTenders;
    }
  });

  const [projects, setProjects] = useState<ProjectRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [personnel, setPersonnel] = useState<PersonnelRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_personnel`);
      return saved ? JSON.parse(saved) : initialPersonnel;
    } catch {
      return initialPersonnel;
    }
  });

  const [equipment, setEquipment] = useState<EquipmentRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_equipment`);
      return saved ? JSON.parse(saved) : initialEquipment;
    } catch {
      return initialEquipment;
    }
  });

  const [financials, setFinancials] = useState<FinancialYearRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_financials`);
      return saved ? JSON.parse(saved) : initialFinancials;
    } catch {
      return initialFinancials;
    }
  });

  const [banks, setBanks] = useState<BankRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_banks`);
      return saved ? JSON.parse(saved) : initialBanks;
    } catch {
      return initialBanks;
    }
  });

  const [clients, setClients] = useState<ClientRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_clients`);
      return saved ? JSON.parse(saved) : initialClients;
    } catch {
      return initialClients;
    }
  });

  const [subcontractors, setSubcontractors] = useState<SubcontractorRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_subcontractors`);
      return saved ? JSON.parse(saved) : initialSubcontractors;
    } catch {
      return initialSubcontractors;
    }
  });

  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_checklist`);
      return saved ? JSON.parse(saved) : initialChecklist;
    } catch {
      return initialChecklist;
    }
  });

  const [submissionReviews, setSubmissionReviews] = useState<SubmissionReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_reviews`);
      return saved ? JSON.parse(saved) : initialSubmissionReviews;
    } catch {
      return initialSubmissionReviews;
    }
  });

  const [methodologySections, setMethodologySections] = useState<WorkMethodologySection[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_methodology`);
      return saved ? JSON.parse(saved) : initialMethodologySections;
    } catch {
      return initialMethodologySections;
    }
  });

  const [documentRegister, setDocumentRegister] = useState<DocumentRegisterItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_register`);
      return saved ? JSON.parse(saved) : initialDocumentRegister;
    } catch {
      return initialDocumentRegister;
    }
  });

  // LocalStorage sync
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_company`, JSON.stringify(companyProfile));
      localStorage.setItem(`${STORAGE_KEY}_tenders`, JSON.stringify(tenders));
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
      localStorage.setItem(`${STORAGE_KEY}_personnel`, JSON.stringify(personnel));
      localStorage.setItem(`${STORAGE_KEY}_equipment`, JSON.stringify(equipment));
      localStorage.setItem(`${STORAGE_KEY}_financials`, JSON.stringify(financials));
      localStorage.setItem(`${STORAGE_KEY}_banks`, JSON.stringify(banks));
      localStorage.setItem(`${STORAGE_KEY}_clients`, JSON.stringify(clients));
      localStorage.setItem(`${STORAGE_KEY}_subcontractors`, JSON.stringify(subcontractors));
      localStorage.setItem(`${STORAGE_KEY}_checklist`, JSON.stringify(checklist));
      localStorage.setItem(`${STORAGE_KEY}_reviews`, JSON.stringify(submissionReviews));
      localStorage.setItem(`${STORAGE_KEY}_methodology`, JSON.stringify(methodologySections));
      localStorage.setItem(`${STORAGE_KEY}_register`, JSON.stringify(documentRegister));
    } catch (e) {
      console.warn('Failed to persist to localStorage', e);
    }
  }, [
    companyProfile,
    tenders,
    projects,
    personnel,
    equipment,
    financials,
    banks,
    clients,
    subcontractors,
    checklist,
    submissionReviews,
    methodologySections,
    documentRegister,
  ]);

  // Active tender resolution
  const activeTender = useMemo(() => {
    return tenders.find((t) => t.tenderId === activeTenderId) || tenders[0] || initialTenders[0];
  }, [tenders, activeTenderId]);

  // Evaluated compliance calculations
  const financialEvaluation = useMemo(() => {
    return evaluateFinancialMetrics(activeTender, financials, banks);
  }, [activeTender, financials, banks]);

  const experienceEvaluation = useMemo(() => {
    return evaluateExperienceCompliance(activeTender, companyProfile, projects);
  }, [activeTender, companyProfile, projects]);

  const personnelEvaluation = useMemo(() => {
    return evaluatePersonnelCompliance(activeTender, personnel);
  }, [activeTender, personnel]);

  const equipmentEvaluation = useMemo(() => {
    return evaluateEquipmentCompliance(activeTender, equipment);
  }, [activeTender, equipment]);

  const readinessResult = useMemo(() => {
    return evaluateOverallTenderReadiness(
      activeTender,
      companyProfile,
      projects,
      personnel,
      equipment,
      financials,
      banks,
      checklist
    );
  }, [
    activeTender,
    companyProfile,
    projects,
    personnel,
    equipment,
    financials,
    banks,
    checklist,
  ]);

  // Actions
  const updateCompanyProfile = (profile: Partial<CompanyProfile>) => {
    setCompanyProfile((prev) => ({ ...prev, ...profile }));
    if (!isOnline) {
      recordOfflineChange('UPDATE', 'CompanyProfile', 'Updated company master profile');
      refreshStorageAndQueue();
    }
  };

  const updateActiveTender = (tenderUpdate: Partial<TenderInfo>) => {
    setTenders((prev) =>
      prev.map((t) => (t.tenderId === activeTenderId ? { ...t, ...tenderUpdate } : t))
    );
    if (!isOnline) {
      recordOfflineChange('UPDATE', 'Tender', 'Modified active tender parameters / thresholds');
      refreshStorageAndQueue();
    }
  };

  const addNewTender = (tender: TenderInfo) => {
    setTenders((prev) => [...prev, tender]);
    setActiveTenderId(tender.tenderId);
    if (!isOnline) {
      recordOfflineChange('CREATE', 'Tender', `Created new tender ${tender.tenderId}`);
      refreshStorageAndQueue();
    }
  };

  const deleteTender = (tenderId: string) => {
    if (tenders.length <= 1) return;
    setTenders((prev) => prev.filter((t) => t.tenderId !== tenderId));
    if (activeTenderId === tenderId) {
      const remaining = tenders.filter((t) => t.tenderId !== tenderId);
      setActiveTenderId(remaining[0].tenderId);
    }
    if (!isOnline) {
      recordOfflineChange('DELETE', 'Tender', `Deleted tender ${tenderId}`);
      refreshStorageAndQueue();
    }
  };

  const addProject = (p: ProjectRecord) => {
    setProjects((prev) => [p, ...prev]);
    if (!isOnline) {
      recordOfflineChange('CREATE', 'Project', `Added project ${p.projectName}`);
      refreshStorageAndQueue();
    }
  };
  const updateProject = (p: ProjectRecord) => {
    setProjects((prev) => prev.map((item) => (item.projectId === p.projectId ? p : item)));
    if (!isOnline) {
      recordOfflineChange('UPDATE', 'Project', `Updated project ${p.projectName}`);
      refreshStorageAndQueue();
    }
  };
  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((item) => item.projectId !== id));
    if (!isOnline) {
      recordOfflineChange('DELETE', 'Project', `Removed project ${id}`);
      refreshStorageAndQueue();
    }
  };

  const addPersonnel = (p: PersonnelRecord) => {
    setPersonnel((prev) => [p, ...prev]);
    if (!isOnline) {
      recordOfflineChange('CREATE', 'Personnel', `Added personnel ${p.fullName}`);
      refreshStorageAndQueue();
    }
  };
  const updatePersonnel = (p: PersonnelRecord) => {
    setPersonnel((prev) => prev.map((item) => (item.personnelId === p.personnelId ? p : item)));
    if (!isOnline) {
      recordOfflineChange('UPDATE', 'Personnel', `Updated personnel ${p.fullName}`);
      refreshStorageAndQueue();
    }
  };
  const deletePersonnel = (id: string) => {
    setPersonnel((prev) => prev.filter((item) => item.personnelId !== id));
    if (!isOnline) {
      recordOfflineChange('DELETE', 'Personnel', `Removed personnel ${id}`);
      refreshStorageAndQueue();
    }
  };

  const addEquipment = (eq: EquipmentRecord) => {
    setEquipment((prev) => [eq, ...prev]);
    if (!isOnline) {
      recordOfflineChange('CREATE', 'Equipment', `Added equipment ${eq.equipmentName}`);
      refreshStorageAndQueue();
    }
  };
  const updateEquipment = (eq: EquipmentRecord) => {
    setEquipment((prev) => prev.map((item) => (item.equipmentId === eq.equipmentId ? eq : item)));
    if (!isOnline) {
      recordOfflineChange('UPDATE', 'Equipment', `Updated equipment ${eq.equipmentName}`);
      refreshStorageAndQueue();
    }
  };
  const deleteEquipment = (id: string) => {
    setEquipment((prev) => prev.filter((item) => item.equipmentId !== id));
    if (!isOnline) {
      recordOfflineChange('DELETE', 'Equipment', `Removed equipment ${id}`);
      refreshStorageAndQueue();
    }
  };

  const addFinancial = (f: FinancialYearRecord) => {
    setFinancials((prev) => [f, ...prev]);
    if (!isOnline) {
      recordOfflineChange('CREATE', 'Financial', `Added financial year ${f.financialYear}`);
      refreshStorageAndQueue();
    }
  };
  const updateFinancial = (f: FinancialYearRecord) => {
    setFinancials((prev) => prev.map((item) => (item.financialYear === f.financialYear ? f : item)));
    if (!isOnline) {
      recordOfflineChange('UPDATE', 'Financial', `Updated financial year ${f.financialYear}`);
      refreshStorageAndQueue();
    }
  };
  const deleteFinancial = (year: string) => {
    setFinancials((prev) => prev.filter((item) => item.financialYear !== year));
    if (!isOnline) {
      recordOfflineChange('DELETE', 'Financial', `Deleted financial year ${year}`);
      refreshStorageAndQueue();
    }
  };

  const addBank = (b: BankRecord) => {
    setBanks((prev) => [b, ...prev]);
    if (!isOnline) {
      recordOfflineChange('CREATE', 'Bank', `Added bank ${b.bankName}`);
      refreshStorageAndQueue();
    }
  };
  const updateBank = (b: BankRecord) => {
    setBanks((prev) => prev.map((item) => (item.bankId === b.bankId ? b : item)));
    if (!isOnline) {
      recordOfflineChange('UPDATE', 'Bank', `Updated bank ${b.bankName}`);
      refreshStorageAndQueue();
    }
  };
  const deleteBank = (id: string) => {
    setBanks((prev) => prev.filter((item) => item.bankId !== id));
    if (!isOnline) {
      recordOfflineChange('DELETE', 'Bank', `Removed bank ${id}`);
      refreshStorageAndQueue();
    }
  };

  const addClient = (c: ClientRecord) => {
    setClients((prev) => [c, ...prev]);
    if (!isOnline) {
      recordOfflineChange('CREATE', 'Client', `Added client ${c.orgName}`);
      refreshStorageAndQueue();
    }
  };
  const updateClient = (c: ClientRecord) => {
    setClients((prev) => prev.map((item) => (item.clientId === c.clientId ? c : item)));
    if (!isOnline) {
      recordOfflineChange('UPDATE', 'Client', `Updated client ${c.orgName}`);
      refreshStorageAndQueue();
    }
  };
  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((item) => item.clientId !== id));
    if (!isOnline) {
      recordOfflineChange('DELETE', 'Client', `Removed client ${id}`);
      refreshStorageAndQueue();
    }
  };

  const addSubcontractor = (s: SubcontractorRecord) => {
    setSubcontractors((prev) => [s, ...prev]);
    if (!isOnline) {
      recordOfflineChange('CREATE', 'Subcontractor', `Added subcontractor ${s.companyName}`);
      refreshStorageAndQueue();
    }
  };
  const updateSubcontractor = (s: SubcontractorRecord) => {
    setSubcontractors((prev) =>
      prev.map((item) => (item.subcontractorId === s.subcontractorId ? s : item))
    );
    if (!isOnline) {
      recordOfflineChange('UPDATE', 'Subcontractor', `Updated subcontractor ${s.companyName}`);
      refreshStorageAndQueue();
    }
  };
  const deleteSubcontractor = (id: string) => {
    setSubcontractors((prev) => prev.filter((item) => item.subcontractorId !== id));
    if (!isOnline) {
      recordOfflineChange('DELETE', 'Subcontractor', `Removed subcontractor ${id}`);
      refreshStorageAndQueue();
    }
  };

  const updateChecklistItem = (item: ChecklistItem) => {
    setChecklist((prev) => prev.map((d) => (d.docId === item.docId ? item : d)));
    if (!isOnline) {
      recordOfflineChange('UPDATE', 'Checklist', `Updated checklist doc ${item.docName}`);
      refreshStorageAndQueue();
    }
  };
  const addChecklistItem = (item: ChecklistItem) => {
    setChecklist((prev) => [item, ...prev]);
    if (!isOnline) {
      recordOfflineChange('CREATE', 'Checklist', `Added checklist doc ${item.docName}`);
      refreshStorageAndQueue();
    }
  };
  const deleteChecklistItem = (id: string) => {
    setChecklist((prev) => prev.filter((d) => d.docId !== id));
    if (!isOnline) {
      recordOfflineChange('DELETE', 'Checklist', `Removed checklist doc ${id}`);
      refreshStorageAndQueue();
    }
  };

  const updateSubmissionReview = (item: SubmissionReviewItem) => {
    setSubmissionReviews((prev) => prev.map((r) => (r.id === item.id ? item : r)));
    if (!isOnline) {
      recordOfflineChange('UPDATE', 'Review', `Updated audit item ${item.sectionCode} (${item.status})`);
      refreshStorageAndQueue();
    }
  };

  const updateMethodologySection = (section: WorkMethodologySection) => {
    setMethodologySections((prev) => prev.map((s) => (s.id === section.id ? section : s)));
    if (!isOnline) {
      recordOfflineChange('UPDATE', 'Methodology', `Edited methodology section ${section.sectionNumber}`);
      refreshStorageAndQueue();
    }
  };

  const updateDocumentRegisterItem = (item: DocumentRegisterItem) => {
    setDocumentRegister((prev) => prev.map((d) => (d.docId === item.docId ? item : d)));
  };
  const addDocumentRegisterItem = (item: DocumentRegisterItem) => {
    setDocumentRegister((prev) => [item, ...prev]);
  };
  const deleteDocumentRegisterItem = (id: string) => {
    setDocumentRegister((prev) => prev.filter((d) => d.docId !== id));
  };

  const toggleTenderProject = (projectId: string) => {
    const current = activeTender.selectedProjectIds || [];
    const exists = current.includes(projectId);
    const updated = exists ? current.filter((id) => id !== projectId) : [...current, projectId];
    updateActiveTender({ selectedProjectIds: updated });
  };

  const toggleTenderSubcontractor = (subId: string) => {
    const current = activeTender.selectedSubcontractorIds || [];
    const exists = current.includes(subId);
    const updated = exists ? current.filter((id) => id !== subId) : [...current, subId];
    updateActiveTender({ selectedSubcontractorIds: updated });
  };

  const resetToDefaultData = () => {
    setCompanyProfile(initialCompanyProfile);
    setTenders(initialTenders);
    setActiveTenderId('T-2026-001');
    setProjects(initialProjects);
    setPersonnel(initialPersonnel);
    setEquipment(initialEquipment);
    setFinancials(initialFinancials);
    setBanks(initialBanks);
    setClients(initialClients);
    setSubcontractors(initialSubcontractors);
    setChecklist(initialChecklist);
    setSubmissionReviews(initialSubmissionReviews);
    setMethodologySections(initialMethodologySections);
    setDocumentRegister(initialDocumentRegister);
    refreshStorageAndQueue();
  };

  const clearAllData = () => {
    setProjects([]);
    setPersonnel([]);
    setEquipment([]);
    setFinancials([]);
    setBanks([]);
    setClients([]);
    setSubcontractors([]);
    setChecklist([]);
    setDocumentRegister([]);
    refreshStorageAndQueue();
  };

  const exportDataToJson = () => {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      companyProfile,
      tenders,
      projects,
      personnel,
      equipment,
      financials,
      banks,
      clients,
      subcontractors,
      checklist,
      submissionReviews,
      methodologySections,
      documentRegister,
    };
    return JSON.stringify(backup, null, 2);
  };

  const importDataFromJson = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.companyProfile) setCompanyProfile(data.companyProfile);
      if (data.tenders) setTenders(data.tenders);
      if (data.projects) setProjects(data.projects);
      if (data.personnel) setPersonnel(data.personnel);
      if (data.equipment) setEquipment(data.equipment);
      if (data.financials) setFinancials(data.financials);
      if (data.banks) setBanks(data.banks);
      if (data.clients) setClients(data.clients);
      if (data.subcontractors) setSubcontractors(data.subcontractors);
      if (data.checklist) setChecklist(data.checklist);
      if (data.submissionReviews) setSubmissionReviews(data.submissionReviews);
      if (data.methodologySections) setMethodologySections(data.methodologySections);
      if (data.documentRegister) setDocumentRegister(data.documentRegister);
      refreshStorageAndQueue();
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  return (
    <TenderContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeTenderId,
        setActiveTenderId,
        activeTender,
        companyProfile,
        tenders,
        projects,
        personnel,
        equipment,
        financials,
        banks,
        clients,
        subcontractors,
        checklist,
        submissionReviews,
        methodologySections,
        documentRegister,
        isSetupWizardOpen,
        setIsSetupWizardOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        expiryWarningDays,
        setExpiryWarningDays,
        isOnline,
        rawIsOnline,
        simulatedOffline,
        toggleSimulatedOffline,
        isSyncModalOpen,
        setIsSyncModalOpen,
        lastSyncedAt: lastSyncedAtState,
        pendingChanges,
        syncNow,
        isSyncing,
        storageMetrics,
        readinessResult,
        financialEvaluation,
        experienceEvaluation,
        personnelEvaluation,
        equipmentEvaluation,
        updateCompanyProfile,
        updateActiveTender,
        addNewTender,
        deleteTender,
        addProject,
        updateProject,
        deleteProject,
        addPersonnel,
        updatePersonnel,
        deletePersonnel,
        addEquipment,
        updateEquipment,
        deleteEquipment,
        addFinancial,
        updateFinancial,
        deleteFinancial,
        addBank,
        updateBank,
        deleteBank,
        addClient,
        updateClient,
        deleteClient,
        addSubcontractor,
        updateSubcontractor,
        deleteSubcontractor,
        updateChecklistItem,
        addChecklistItem,
        deleteChecklistItem,
        updateSubmissionReview,
        updateMethodologySection,
        updateDocumentRegisterItem,
        addDocumentRegisterItem,
        deleteDocumentRegisterItem,
        toggleTenderProject,
        toggleTenderSubcontractor,
        resetToDefaultData,
        clearAllData,
        exportDataToJson,
        importDataFromJson,
      }}
    >
      {children}
    </TenderContext.Provider>
  );
};

export const useTender = () => {
  const context = useContext(TenderContext);
  if (!context) {
    throw new Error('useTender must be used within a TenderProvider');
  }
  return context;
};
