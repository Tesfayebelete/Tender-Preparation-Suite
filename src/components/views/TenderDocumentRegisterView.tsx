import React from 'react';
import { useTender } from '../../context/TenderContext';
import { FolderArchive, Plus, Trash2, CheckCircle2, Printer } from 'lucide-react';
import { DocumentRegisterItem } from '../../types/tender';

export const TenderDocumentRegisterView: React.FC = () => {
  const { documentRegister, updateDocumentRegisterItem, addDocumentRegisterItem, deleteDocumentRegisterItem } =
    useTender();

  const handleAddNew = () => {
    const newItem: DocumentRegisterItem = {
      docId: `REG-DOC-${String(documentRegister.length + 1).padStart(3, '0')}`,
      tenderId: 'T-2026-001',
      category: 'Technical',
      name: 'Supplementary Technical Submittal',
      version: '1.0',
      date: new Date().toISOString().split('T')[0],
      preparedBy: 'Eng. Solomon Kahel',
      reviewedBy: 'Aklilu Misganaw Mesfin',
      approvedBy: 'Aklilu Misganaw Mesfin',
      status: 'Approved',
      fileRef: '/documents/technical/SUPP-01.pdf',
      isFinal: true,
      isIncluded: true,
      remarks: 'Added to final technical binder',
    };
    addDocumentRegisterItem(newItem);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            25 — Master Tender Document Register
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Formal registry of all documents, submittals, and schedules compiled for this tender submission package.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors print:hidden"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Register</span>
          </button>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Register Entry</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Doc ID</th>
                <th className="p-3">Category</th>
                <th className="p-3">Document Title</th>
                <th className="p-3">Version</th>
                <th className="p-3">Date</th>
                <th className="p-3">Prepared By</th>
                <th className="p-3">Reviewed By</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Included</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {documentRegister.map((item) => (
                <tr key={item.docId} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-semibold text-[11px] text-slate-600">{item.docId}</td>
                  <td className="p-3 font-medium text-slate-800">{item.category}</td>
                  <td className="p-3 font-semibold text-slate-900 max-w-xs">
                    <div>{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.fileRef}</div>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-slate-700">{item.version}</td>
                  <td className="p-3 font-mono text-[11px] text-slate-600">{item.date}</td>
                  <td className="p-3 text-slate-700">{item.preparedBy}</td>
                  <td className="p-3 text-slate-700">{item.reviewedBy}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={item.isIncluded}
                      onChange={(e) => updateDocumentRegisterItem({ ...item, isIncluded: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                    />
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteDocumentRegisterItem(item.docId)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Delete entry"
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
