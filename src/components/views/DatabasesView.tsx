import React, { useState } from 'react';
import { useTender, SheetTabId } from '../../context/TenderContext';
import {
  Briefcase,
  Users,
  Wrench,
  DollarSign,
  Landmark,
  UserCheck,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  AlertTriangle,
  Search,
  ExternalLink,
} from 'lucide-react';
import {
  ProjectRecord,
  PersonnelRecord,
  EquipmentRecord,
  FinancialYearRecord,
  BankRecord,
  ClientRecord,
} from '../../types/tender';

interface DatabasesViewProps {
  initialDb?: 'PROJECTS' | 'PERSONNEL' | 'EQUIPMENT' | 'FINANCIAL' | 'BANKS' | 'CLIENTS';
}

export const DatabasesView: React.FC<DatabasesViewProps> = ({ initialDb }) => {
  const {
    activeTab,
    setActiveTab,
    projects,
    addProject,
    deleteProject,
    personnel,
    addPersonnel,
    deletePersonnel,
    equipment,
    addEquipment,
    deleteEquipment,
    financials,
    addFinancial,
    deleteFinancial,
    banks,
    addBank,
    deleteBank,
    clients,
    addClient,
    deleteClient,
    activeTender,
    toggleTenderProject,
  } = useTender();

  // Determine active view based on activeTab
  const getInitialDb = (): 'PROJECTS' | 'PERSONNEL' | 'EQUIPMENT' | 'FINANCIAL' | 'BANKS' | 'CLIENTS' => {
    switch (activeTab) {
      case '08_PROJECTS':
        return 'PROJECTS';
      case '09_PERSONNEL':
        return 'PERSONNEL';
      case '10_EQUIPMENT':
        return 'EQUIPMENT';
      case '11_FINANCIAL':
        return 'FINANCIAL';
      case '12_BANKS':
        return 'BANKS';
      case '13_CLIENTS':
        return 'CLIENTS';
      default:
        return initialDb || 'PROJECTS';
    }
  };

  const [activeDb, setActiveDb] = useState<'PROJECTS' | 'PERSONNEL' | 'EQUIPMENT' | 'FINANCIAL' | 'BANKS' | 'CLIENTS'>(
    getInitialDb()
  );

  const [searchTerm, setSearchTerm] = useState('');

  // Handle switching tabs
  const handleSwitchDb = (db: 'PROJECTS' | 'PERSONNEL' | 'EQUIPMENT' | 'FINANCIAL' | 'BANKS' | 'CLIENTS', tabId: SheetTabId) => {
    setActiveDb(db);
    setActiveTab(tabId);
  };

  // Add handlers
  const handleAddProject = () => {
    const newPrj: ProjectRecord = {
      projectId: `PRJ-${String(projects.length + 1).padStart(3, '0')}`,
      projectName: 'New Construction Project',
      clientId: 'CLI-001',
      clientName: 'New Client',
      contractNumber: 'CONT/2026/01',
      projectLocation: 'Addis Ababa',
      contractType: 'Admeasurement',
      scopeOfWork: 'General civil construction works',
      sector: 'Commercial / Residential',
      startDate: '2025-01-01',
      completionDate: '2026-06-30',
      contractAmount: 15000000,
      currency: 'ETB',
      finalAmount: 15000000,
      status: 'Completed',
      role: 'Main Contractor',
      participationPct: 100,
      similarityRelevance: 'High',
      specificExperienceCategory: 'Building Construction',
      employer: 'Client Org',
      consultant: 'Consulting Engineers',
      contactPerson: 'Lead Contact',
      contactDetails: '+251 911 000 000',
      hasCompletionCert: true,
      hasTakingOverCert: true,
      hasPerformanceCert: true,
      evidenceAvailable: true,
      docReference: 'CERT-NEW.pdf',
      remarks: 'Successfully delivered',
    };
    addProject(newPrj);
  };

  const handleAddPersonnel = () => {
    const newPer: PersonnelRecord = {
      personnelId: `PER-${String(personnel.length + 1).padStart(3, '0')}`,
      fullName: 'Eng. New Team Member',
      position: 'Site Engineer',
      profession: 'Civil Engineer',
      discipline: 'Civil & Structural Engineering',
      qualification: 'B.Sc. Civil Engineering',
      institution: 'Addis Ababa University',
      graduationYear: 2018,
      professionalRegNo: 'ECA/ENG/2026/01',
      licenseNo: 'LIC-001',
      yearsExperience: 8,
      relevantYears: 6,
      currentEmployer: 'Aklilu Misganaw Mesfin General Contractor',
      employmentType: 'Permanent',
      availability: 'Available',
      cvAvailable: true,
      cvUpdatedDate: '2026-08-01',
      idPassportNo: 'ETH-ID-001',
      contactPhone: '+251 911 000 000',
      contactEmail: 'engineer@aklilumisganaw-gc.et',
      projectAssignment: 'Site management & quality compliance',
      evidenceDocs: 'Degree & License Certificates',
      remarks: 'Ready for assignment',
    };
    addPersonnel(newPer);
  };

  const handleAddEquipment = () => {
    const newEq: EquipmentRecord = {
      equipmentId: `EQ-${String(equipment.length + 1).padStart(3, '0')}`,
      equipmentName: 'New Construction Machine',
      type: 'Heavy Plant',
      make: 'Manufacturer',
      model: 'Model 2022',
      year: 2022,
      capacity: 'Standard Capacity',
      regNumber: 'AA-EQ-NEW',
      serialNumber: 'SN-001',
      ownership: 'Owned',
      owner: 'Aklilu Misganaw Mesfin GC',
      location: 'Central Yard, Addis Ababa',
      condition: 'Excellent',
      availability: 'Available',
      operator: 'Certified Operator',
      insuranceExpiry: '2027-12-31',
      inspectionCertNo: 'INSP-2026-01',
      inspectionCertExpiry: '2027-12-31',
      evidenceDoc: 'Customs Libre / Title Deed',
      remarks: 'Ready for deployment',
    };
    addEquipment(newEq);
  };

  const handleAddFinancial = () => {
    const newFin: FinancialYearRecord = {
      financialYear: '2026 Proj',
      revenue: 52000000,
      annualTurnover: 50000000,
      currentAssets: 21000000,
      currentLiabilities: 9000000,
      netAssets: 20000000,
      workingCapital: 12000000,
      liquidAssets: 9500000,
      totalAssets: 31000000,
      totalLiabilities: 11000000,
      equity: 20000000,
      profitLoss: 5200000,
      isAudited: true,
      auditorName: 'Authorized Chartered Accountants',
      auditDate: '2026-10-30',
      evidenceRef: 'AUD-FS-2026.pdf',
    };
    addFinancial(newFin);
  };

  const handleAddBank = () => {
    const newBnk: BankRecord = {
      bankId: `BNK-${String(banks.length + 1).padStart(3, '0')}`,
      bankName: 'New Commercial Bank',
      branch: 'Addis Ababa Main',
      address: 'Addis Ababa',
      accountName: 'Aklilu Misganaw Mesfin GC',
      accountNumber: '10000000000',
      rmName: 'Relationship Manager',
      phone: '+251 11 000 0000',
      email: 'rm@bank.com.et',
      facilityType: 'Credit Facility Line',
      facilityAmount: 5000000,
      availableAmount: 5000000,
      usedAmount: 0,
      currency: 'ETB',
      issueDate: '2026-01-01',
      expiryDate: '2027-01-01',
      hasConfirmationLetter: true,
      bankRef: 'REF-001',
      evidenceDoc: 'Bank Letter.pdf',
    };
    addBank(newBnk);
  };

  const handleAddClient = () => {
    const newCli: ClientRecord = {
      clientId: `CLI-${String(clients.length + 1).padStart(3, '0')}`,
      orgName: 'New Organization',
      clientType: 'Public Authority',
      address: 'Addis Ababa',
      contactPerson: 'Contact Person',
      position: 'Project Director',
      phone: '+251 911 000 000',
      email: 'info@client.et',
      projectHistoryCount: 1,
      referenceAvailable: true,
      performanceCertCount: 1,
      remarks: 'Institutional client',
    };
    addClient(newCli);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Database Switcher Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            Master Contractor Databases
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Interconnected master repositories. Data entered here populates qualification schedules automatically.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search active database..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Database Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        <button
          onClick={() => handleSwitchDb('PROJECTS', '08_PROJECTS')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeDb === 'PROJECTS'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>08 Projects ({projects.length})</span>
        </button>

        <button
          onClick={() => handleSwitchDb('PERSONNEL', '09_PERSONNEL')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeDb === 'PERSONNEL'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>09 Personnel ({personnel.length})</span>
        </button>

        <button
          onClick={() => handleSwitchDb('EQUIPMENT', '10_EQUIPMENT')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeDb === 'EQUIPMENT'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>10 Equipment ({equipment.length})</span>
        </button>

        <button
          onClick={() => handleSwitchDb('FINANCIAL', '11_FINANCIAL')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeDb === 'FINANCIAL'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>11 Financials ({financials.length})</span>
        </button>

        <button
          onClick={() => handleSwitchDb('BANKS', '12_BANKS')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeDb === 'BANKS'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Landmark className="w-3.5 h-3.5" />
          <span>12 Banks ({banks.length})</span>
        </button>

        <button
          onClick={() => handleSwitchDb('CLIENTS', '13_CLIENTS')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-xs font-semibold transition-colors cursor-pointer ${
            activeDb === 'CLIENTS'
              ? 'bg-white border-t-2 border-t-amber-500 text-slate-900 border-x border-slate-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>13 Clients ({clients.length})</span>
        </button>
      </div>

      {/* 08 Projects Database Table */}
      {activeDb === 'PROJECTS' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Master Project Experience Register
              </h2>
              <p className="text-[11px] text-slate-500">
                15 projects loaded from company profile. Check box to include in active tender bid package.
              </p>
            </div>
            <button
              onClick={handleAddProject}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5 text-center">Bid Package</th>
                  <th className="p-2.5">ID</th>
                  <th className="p-2.5">Project Name & Location</th>
                  <th className="p-2.5">Client & Contact</th>
                  <th className="p-2.5">Scope of Work</th>
                  <th className="p-2.5">Contract Amount (ETB)</th>
                  <th className="p-2.5">Completion Date</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {projects
                  .filter((p) => p.projectName.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((p) => {
                    const isSelected = activeTender.selectedProjectIds?.includes(p.projectId);
                    return (
                      <tr key={p.projectId} className={`hover:bg-slate-50 ${isSelected ? 'bg-amber-50/30' : ''}`}>
                        <td className="p-2.5 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleTenderProject(p.projectId)}
                            className="rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                            title="Include in active tender schedule"
                          />
                        </td>
                        <td className="p-2.5 font-mono text-[11px] text-slate-600">{p.projectId}</td>
                        <td className="p-2.5 font-semibold text-slate-900 max-w-xs">
                          <div>{p.projectName}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{p.projectLocation}</div>
                        </td>
                        <td className="p-2.5 text-slate-700 max-w-xs">
                          <div>{p.clientName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{p.contactPerson} ({p.contactDetails})</div>
                        </td>
                        <td className="p-2.5 text-slate-600 max-w-xs text-[11px] line-clamp-2">{p.scopeOfWork}</td>
                        <td className="p-2.5 font-mono font-bold text-slate-900">
                          {p.contractAmount.toLocaleString()}
                        </td>
                        <td className="p-2.5 font-mono text-[11px] text-slate-600">{p.completionDate}</td>
                        <td className="p-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              p.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="p-2.5 text-right">
                          <button
                            onClick={() => deleteProject(p.projectId)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 09 Personnel Database Table */}
      {activeDb === 'PERSONNEL' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Key Professional Personnel Database
              </h2>
              <p className="text-[11px] text-slate-500">
                Engineers, technicians, and project managers available for Schedule 8 assignment.
              </p>
            </div>
            <button
              onClick={handleAddPersonnel}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Personnel</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">ID</th>
                  <th className="p-2.5">Full Name</th>
                  <th className="p-2.5">Position & Profession</th>
                  <th className="p-2.5">Educational Qualification</th>
                  <th className="p-2.5">Experience (Total / Rel)</th>
                  <th className="p-2.5">Professional Reg No.</th>
                  <th className="p-2.5">CV Status</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {personnel
                  .filter((p) => p.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((p) => (
                    <tr key={p.personnelId} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono text-[11px] text-slate-600">{p.personnelId}</td>
                      <td className="p-2.5 font-bold text-slate-900">{p.fullName}</td>
                      <td className="p-2.5">
                        <div className="font-semibold text-slate-800">{p.position}</div>
                        <div className="text-[10px] text-slate-500">{p.profession}</div>
                      </td>
                      <td className="p-2.5 text-slate-700 max-w-xs">
                        <div>{p.qualification}</div>
                        <div className="text-[10px] text-slate-400">{p.institution} ({p.graduationYear})</div>
                      </td>
                      <td className="p-2.5 font-mono text-slate-900 font-semibold">
                        {p.yearsExperience} yrs / {p.relevantYears} yrs
                      </td>
                      <td className="p-2.5 font-mono text-[11px] text-slate-600">{p.professionalRegNo}</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {p.cvAvailable ? 'CV Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-2.5 text-right">
                        <button
                          onClick={() => deletePersonnel(p.personnelId)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 10 Equipment Database Table */}
      {activeDb === 'EQUIPMENT' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Master Equipment & Plant Fleet Database
              </h2>
              <p className="text-[11px] text-slate-500">
                15 owned, leased, and rented machines registered for construction operations.
              </p>
            </div>
            <button
              onClick={handleAddEquipment}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Equipment</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">ID</th>
                  <th className="p-2.5">Equipment Name</th>
                  <th className="p-2.5">Make & Model</th>
                  <th className="p-2.5">Capacity / Specs</th>
                  <th className="p-2.5">Ownership</th>
                  <th className="p-2.5">Condition</th>
                  <th className="p-2.5">Availability</th>
                  <th className="p-2.5">Registration / Libre</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {equipment
                  .filter((e) => e.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((e) => (
                    <tr key={e.equipmentId} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono text-[11px] text-slate-600">{e.equipmentId}</td>
                      <td className="p-2.5 font-bold text-slate-900">{e.equipmentName}</td>
                      <td className="p-2.5 text-slate-700">
                        {e.make} {e.model} ({e.year})
                      </td>
                      <td className="p-2.5 text-slate-600 font-medium">{e.capacity}</td>
                      <td className="p-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            e.ownership === 'Owned'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {e.ownership}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-700">{e.condition}</td>
                      <td className="p-2.5 text-slate-700">{e.availability}</td>
                      <td className="p-2.5 font-mono text-[11px] text-slate-500">{e.regNumber}</td>
                      <td className="p-2.5 text-right">
                        <button
                          onClick={() => deleteEquipment(e.equipmentId)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 11 Financial Database Table */}
      {activeDb === 'FINANCIAL' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Audited Financial Records & Balance Sheets
              </h2>
              <p className="text-[11px] text-slate-500">
                Certified audited financial accounts used to compute Average Annual Construction Turnover and Working Capital.
              </p>
            </div>
            <button
              onClick={handleAddFinancial}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Financial Year</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Financial Year</th>
                  <th className="p-2.5">Turnover (ETB)</th>
                  <th className="p-2.5">Current Assets</th>
                  <th className="p-2.5">Current Liabilities</th>
                  <th className="p-2.5">Working Capital</th>
                  <th className="p-2.5">Liquid Assets</th>
                  <th className="p-2.5">Net Worth</th>
                  <th className="p-2.5">Auditor & Ref</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {financials.map((f) => (
                  <tr key={f.financialYear} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900 font-sans">{f.financialYear}</td>
                    <td className="p-2.5 font-bold text-slate-900">{f.annualTurnover.toLocaleString()}</td>
                    <td className="p-2.5 text-slate-700">{f.currentAssets.toLocaleString()}</td>
                    <td className="p-2.5 text-slate-700">{f.currentLiabilities.toLocaleString()}</td>
                    <td className="p-2.5 font-semibold text-emerald-700">{f.workingCapital.toLocaleString()}</td>
                    <td className="p-2.5 text-slate-700">{f.liquidAssets.toLocaleString()}</td>
                    <td className="p-2.5 text-slate-900">{f.equity.toLocaleString()}</td>
                    <td className="p-2.5 font-sans text-[11px] text-slate-600 max-w-xs">{f.auditorName}</td>
                    <td className="p-2.5 text-right font-sans">
                      <button
                        onClick={() => deleteFinancial(f.financialYear)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 12 Banks Database Table */}
      {activeDb === 'BANKS' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Banks & Credit Facility Facilities
              </h2>
              <p className="text-[11px] text-slate-500">
                Lines of credit and bid bond guarantees from Commercial Bank of Ethiopia (CBE) and private banks.
              </p>
            </div>
            <button
              onClick={handleAddBank}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Bank Facility</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Bank Name & Branch</th>
                  <th className="p-2.5">Account Number</th>
                  <th className="p-2.5">Facility Type</th>
                  <th className="p-2.5">Total Line (ETB)</th>
                  <th className="p-2.5">Available (ETB)</th>
                  <th className="p-2.5">Expiry Date</th>
                  <th className="p-2.5">Bank Reference No.</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {banks.map((b) => (
                  <tr key={b.bankId} className="hover:bg-slate-50">
                    <td className="p-2.5">
                      <div className="font-bold text-slate-900">{b.bankName}</div>
                      <div className="text-[11px] text-slate-500">{b.branch}</div>
                    </td>
                    <td className="p-2.5 font-mono text-slate-700">{b.accountNumber}</td>
                    <td className="p-2.5 text-slate-700">{b.facilityType}</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">
                      {b.facilityAmount.toLocaleString()}
                    </td>
                    <td className="p-2.5 font-mono font-bold text-emerald-700">
                      {b.availableAmount.toLocaleString()}
                    </td>
                    <td className="p-2.5 font-mono text-[11px] text-slate-600">{b.expiryDate}</td>
                    <td className="p-2.5 font-mono text-[11px] text-slate-600">{b.bankRef}</td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => deleteBank(b.bankId)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 13 Clients Database Table */}
      {activeDb === 'CLIENTS' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Institutional Clients & Reference Directory
              </h2>
              <p className="text-[11px] text-slate-500">
                Client directory with verified supervisory contact details for tender evaluation inquiries.
              </p>
            </div>
            <button
              onClick={handleAddClient}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Client</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Client Name</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Address</th>
                  <th className="p-2.5">Key Contact Person</th>
                  <th className="p-2.5">Phone & Email</th>
                  <th className="p-2.5">Project History</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {clients.map((c) => (
                  <tr key={c.clientId} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">{c.orgName}</td>
                    <td className="p-2.5 text-slate-600">{c.clientType}</td>
                    <td className="p-2.5 text-slate-600">{c.address}</td>
                    <td className="p-2.5 text-slate-800 font-medium">
                      <div>{c.contactPerson}</div>
                      <div className="text-[10px] text-slate-500">{c.position}</div>
                    </td>
                    <td className="p-2.5 font-mono text-[11px] text-slate-600">
                      <div>{c.phone}</div>
                      <div className="text-[10px] text-slate-400 font-sans">{c.email}</div>
                    </td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {c.projectHistoryCount} Projects Completed
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => deleteClient(c.clientId)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
