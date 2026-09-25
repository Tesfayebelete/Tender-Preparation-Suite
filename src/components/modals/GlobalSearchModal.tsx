import React, { useState, useMemo } from 'react';
import { useTender, SheetTabId } from '../../context/TenderContext';
import {
  Search,
  X,
  Briefcase,
  Users,
  Wrench,
  FileText,
  Landmark,
  UserCheck,
  ChevronRight,
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    projects,
    personnel,
    equipment,
    checklist,
    banks,
    clients,
    setActiveTab,
  } = useTender();

  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matchedProjects = projects
      .filter(
        (p) =>
          p.projectName.toLowerCase().includes(q) ||
          p.scopeOfWork.toLowerCase().includes(q) ||
          p.clientName.toLowerCase().includes(q) ||
          p.projectLocation.toLowerCase().includes(q)
      )
      .map((p) => ({
        type: 'Project',
        title: p.projectName,
        subtitle: `${p.clientName} · ETB ${p.contractAmount.toLocaleString()} · ${p.status}`,
        tab: '08_PROJECTS' as SheetTabId,
        icon: Briefcase,
      }));

    const matchedPersonnel = personnel
      .filter(
        (p) =>
          p.fullName.toLowerCase().includes(q) ||
          p.position.toLowerCase().includes(q) ||
          p.profession.toLowerCase().includes(q) ||
          p.qualification.toLowerCase().includes(q)
      )
      .map((p) => ({
        type: 'Personnel',
        title: p.fullName,
        subtitle: `${p.position} · ${p.yearsExperience} yrs exp · ${p.qualification}`,
        tab: '09_PERSONNEL' as SheetTabId,
        icon: Users,
      }));

    const matchedEquipment = equipment
      .filter(
        (e) =>
          e.equipmentName.toLowerCase().includes(q) ||
          e.type.toLowerCase().includes(q) ||
          e.make.toLowerCase().includes(q) ||
          e.capacity.toLowerCase().includes(q)
      )
      .map((e) => ({
        type: 'Equipment',
        title: e.equipmentName,
        subtitle: `${e.type} · ${e.capacity} · [${e.ownership}]`,
        tab: '10_EQUIPMENT' as SheetTabId,
        icon: Wrench,
      }));

    const matchedDocs = checklist
      .filter(
        (d) =>
          d.docName.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.tenderRequirement.toLowerCase().includes(q)
      )
      .map((d) => ({
        type: 'Document',
        title: d.docName,
        subtitle: `${d.category} · Status: ${d.status} · Expiry: ${d.expiryDate || 'N/A'}`,
        tab: '06_CHECKLIST' as SheetTabId,
        icon: FileText,
      }));

    const matchedBanks = banks
      .filter((b) => b.bankName.toLowerCase().includes(q) || b.facilityType.toLowerCase().includes(q))
      .map((b) => ({
        type: 'Bank Facility',
        title: b.bankName,
        subtitle: `${b.facilityType} · Available: ETB ${b.availableAmount.toLocaleString()}`,
        tab: '12_BANKS' as SheetTabId,
        icon: Landmark,
      }));

    const matchedClients = clients
      .filter((c) => c.orgName.toLowerCase().includes(q) || c.contactPerson.toLowerCase().includes(q))
      .map((c) => ({
        type: 'Client',
        title: c.orgName,
        subtitle: `${c.contactPerson} · ${c.phone}`,
        tab: '13_CLIENTS' as SheetTabId,
        icon: UserCheck,
      }));

    return [
      ...matchedProjects,
      ...matchedPersonnel,
      ...matchedEquipment,
      ...matchedDocs,
      ...matchedBanks,
      ...matchedClients,
    ].slice(0, 20);
  }, [query, projects, personnel, equipment, checklist, banks, clients]);

  if (!isSearchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 backdrop-blur-sm p-4 pt-16 sm:pt-24">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, engineers, equipment, tender docs, banks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Type keywords to search across all databases and tender schedules...
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching records found for "{query}".
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((res, i) => {
                const Icon = res.icon;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveTab(res.tab);
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between text-left transition-colors group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded bg-slate-100 text-slate-600 group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-900">{res.title}</span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 text-slate-500 bg-slate-100 rounded">
                            {res.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{res.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
