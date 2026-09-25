import React, { useState } from 'react';
import { useTender } from '../../context/TenderContext';
import {
  ListCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  Trash2,
  Calendar,
  FileText,
  Search,
} from 'lucide-react';
import { ChecklistItem, DocStatus } from '../../types/tender';

export const DocumentChecklistView: React.FC = () => {
  const {
    checklist,
    updateChecklistItem,
    addChecklistItem,
    deleteChecklistItem,
    expiryWarningDays,
    setExpiryWarningDays,
    readinessResult,
  } = useTender();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories = [
    'ALL',
    'Legal',
    'License',
    'Tax',
    'Financial',
    'Bank',
    'Bid Security',
    'Experience',
    'Personnel',
    'Equipment',
    'Technical',
    'Methodology',
    'Forms',
  ];

  const handleAddNew = () => {
    const newItem: ChecklistItem = {
      docId: `DOC-${Date.now().toString().slice(-4)}`,
      category: 'Legal',
      docName: 'New Tender Document',
      tenderRequirement: 'Required by Bidding Document',
      isRequired: true,
      source: 'Company Records',
      docNumber: 'REF-001',
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: '',
      requiredFormat: 'Certified Copy',
      fileName: 'document.pdf',
      fileLocation: '/documents/document.pdf',
      isSubmitted: true,
      isVerified: true,
      responsiblePerson: 'Document Controller',
      status: 'COMPLETE',
      remarks: 'Verified complete',
    };
    addChecklistItem(newItem);
  };

  const filteredItems = checklist.filter((item) => {
    const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchSearch =
      item.docName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.docNumber.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.tenderRequirement.toLowerCase().includes(searchFilter.toLowerCase());
    return matchCat && matchSearch;
  });

  const getDocStatusBadge = (status: DocStatus) => {
    switch (status) {
      case 'COMPLETE':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            COMPLETE
          </span>
        );
      case 'EXPIRING_SOON':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            EXPIRING SOON
          </span>
        );
      case 'EXPIRED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            EXPIRED
          </span>
        );
      case 'MISSING':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            MISSING
          </span>
        );
      case 'PENDING_VERIFICATION':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            PENDING VERIFICATION
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Title & Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            06 — Document Verification Checklist
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track mandatory submission documents, expiration dates, and verification readiness.
          </p>
        </div>

        {/* Expiry Warning Selector & Add Document */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-300 rounded px-2.5 py-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Expiry Warning:</span>
            <select
              value={expiryWarningDays}
              onChange={(e) => setExpiryWarningDays(parseInt(e.target.value))}
              className="font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value={30}>30 Days</option>
              <option value={60}>60 Days</option>
              <option value={90}>90 Days</option>
            </select>
          </div>

          <button
            onClick={handleAddNew}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Document</span>
          </button>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
          <span className="text-slate-500">Verified & Complete</span>
          <div className="text-lg font-bold text-emerald-700 font-mono mt-1">
            {readinessResult.completedChecklistCount}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
          <span className="text-slate-500">Missing / Unverified</span>
          <div className="text-lg font-bold text-rose-700 font-mono mt-1">
            {readinessResult.missingChecklistCount}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
          <span className="text-slate-500">Expiring Within {expiryWarningDays}d</span>
          <div className="text-lg font-bold text-amber-700 font-mono mt-1">
            {readinessResult.expiringSoonChecklistCount}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
          <span className="text-slate-500">Expired</span>
          <div className="text-lg font-bold text-rose-700 font-mono mt-1">
            {readinessResult.expiredChecklistCount}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200 text-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter checklist..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-8 pr-3 py-1 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Checklist Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Doc ID</th>
                <th className="p-3">Category</th>
                <th className="p-3">Document Title</th>
                <th className="p-3">Tender Requirement</th>
                <th className="p-3">Doc No.</th>
                <th className="p-3">Expiry Date</th>
                <th className="p-3">Format</th>
                <th className="p-3">Submitted</th>
                <th className="p-3">Verified</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredItems.map((item) => (
                <tr key={item.docId} className="hover:bg-slate-50/70">
                  <td className="p-3 font-mono text-[11px] text-slate-500 font-semibold">{item.docId}</td>
                  <td className="p-3">
                    <span className="font-semibold text-slate-800">{item.category}</span>
                  </td>
                  <td className="p-3 font-medium text-slate-900 max-w-xs">
                    <div>{item.docName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.fileName}</div>
                  </td>
                  <td className="p-3 text-slate-600 max-w-xs text-[11px]">{item.tenderRequirement}</td>
                  <td className="p-3 font-mono text-[11px] text-slate-700">{item.docNumber || '—'}</td>
                  <td className="p-3 font-mono text-[11px] text-slate-700">{item.expiryDate || 'N/A'}</td>
                  <td className="p-3 text-slate-600">{item.requiredFormat}</td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={item.isSubmitted}
                      onChange={(e) => updateChecklistItem({ ...item, isSubmitted: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={item.isVerified}
                      onChange={(e) => updateChecklistItem({ ...item, isVerified: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                  </td>
                  <td className="p-3">{getDocStatusBadge(item.status)}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteChecklistItem(item.docId)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Remove from checklist"
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
    </div>
  );
};
