import React, { useState } from 'react';
import { useTender } from '../../context/TenderContext';
import {
  Info,
  Sliders,
  Plus,
  Trash2,
  Copy,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { TenderInfo, TenderRequirementItem } from '../../types/tender';

export const TenderInfoView: React.FC = () => {
  const {
    activeTender,
    updateActiveTender,
    tenders,
    addNewTender,
    deleteTender,
    setActiveTenderId,
    setActiveTab,
  } = useTender();

  const [activeSubTab, setActiveSubTab] = useState<'DETAILS' | 'THRESHOLDS' | 'REQUIREMENTS'>('DETAILS');

  const handleCreateTender = () => {
    const newId = `T-2026-00${tenders.length + 1}`;
    const newTender: TenderInfo = {
      ...activeTender,
      tenderId: newId,
      tenderRef: `TENDER/${newId}/2026`,
      projectTitle: 'New Construction Tender Project',
      projectLocation: 'Addis Ababa, Ethiopia',
      procuringEntity: 'Public Procurement Entity',
      employerClient: 'Government Agency',
      consultant: 'Consulting Engineers',
      estimatedContractValue: 25000000,
      bidPrice: 24500000,
      bidSecurityAmount: 300000,
      submissionDate: '2026-11-30',
      version: 'Draft Rev 0.1',
      preparationDate: new Date().toISOString().split('T')[0],
      selectedProjectIds: [],
      selectedSubcontractorIds: [],
    };
    addNewTender(newTender);
  };

  const handleAddLineRequirement = () => {
    const newReq: TenderRequirementItem = {
      id: `REQ-${Date.now().toString().slice(-4)}`,
      category: 'Technical / Methodology',
      title: 'Site Quality Management Plan',
      exactRequirement: 'Specific concrete mix design and certified testing regimen',
      sourceDoc: 'Section V Special Conditions',
      pageRef: 'Page 45',
      threshold: 'Pass',
      unit: 'Report',
      requiredEvidence: 'Quality Plan Document',
      isRequired: true,
      verificationStatus: 'COMPLIANT',
      remarks: 'Standard QA/QC manual to be provided',
    };

    updateActiveTender({
      lineRequirements: [...(activeTender.lineRequirements || []), newReq],
    });
  };

  const q = activeTender.qualifications;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Bar with Multi-Tender Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">
              05 — Tender Information & PPA 2025 Configuration
            </h1>
            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 font-mono rounded">
              {activeTender.tenderId}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure tender specifications, PPA qualification thresholds, and project parameters.
          </p>
        </div>

        {/* Multi-Tender Control Panel */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-semibold">Switch Tender:</span>
            <select
              value={activeTender.tenderId}
              onChange={(e) => setActiveTenderId(e.target.value)}
              className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium cursor-pointer"
            >
              {tenders.map((t) => (
                <option key={t.tenderId} value={t.tenderId}>
                  {t.tenderId} ({t.tenderRef})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCreateTender}
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Tender</span>
          </button>

          {tenders.length > 1 && (
            <button
              onClick={() => {
                if (window.confirm(`Delete tender ${activeTender.tenderId}?`)) {
                  deleteTender(activeTender.tenderId);
                }
              }}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
              title="Delete this tender"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveSubTab('DETAILS')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'DETAILS'
              ? 'border-amber-500 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          General Tender Parameters
        </button>
        <button
          onClick={() => setActiveSubTab('THRESHOLDS')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'THRESHOLDS'
              ? 'border-amber-500 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          PPA 2025 Qualification Thresholds
        </button>
        <button
          onClick={() => setActiveSubTab('REQUIREMENTS')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'REQUIREMENTS'
              ? 'border-amber-500 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Line Item Requirements ({activeTender.lineRequirements?.length || 0})
        </button>
      </div>

      {/* Sub-tab 1: Details */}
      {activeSubTab === 'DETAILS' && (
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Tender Reference Number *
              </label>
              <input
                type="text"
                value={activeTender.tenderRef}
                onChange={(e) => updateActiveTender({ tenderRef: e.target.value })}
                className="w-full px-3 py-2 font-mono font-semibold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-600 font-semibold mb-1">
                Project Title *
              </label>
              <input
                type="text"
                value={activeTender.projectTitle}
                onChange={(e) => updateActiveTender({ projectTitle: e.target.value })}
                className="w-full px-3 py-2 font-semibold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Project Site Location
              </label>
              <input
                type="text"
                value={activeTender.projectLocation}
                onChange={(e) => updateActiveTender({ projectLocation: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Procuring Entity (Client Organization) *
              </label>
              <input
                type="text"
                value={activeTender.procuringEntity}
                onChange={(e) => updateActiveTender({ procuringEntity: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Supervising Consultant Engineer
              </label>
              <input
                type="text"
                value={activeTender.consultant}
                onChange={(e) => updateActiveTender({ consultant: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Procurement Method
              </label>
              <input
                type="text"
                value={activeTender.procurementMethod}
                onChange={(e) => updateActiveTender({ procurementMethod: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Contract Type
              </label>
              <input
                type="text"
                value={activeTender.contractType}
                onChange={(e) => updateActiveTender({ contractType: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Estimated Contract Value (ETB)
              </label>
              <input
                type="number"
                value={activeTender.estimatedContractValue}
                onChange={(e) => updateActiveTender({ estimatedContractValue: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Company Bid Price (Excl / Incl VAT) *
              </label>
              <input
                type="number"
                value={activeTender.bidPrice}
                onChange={(e) => updateActiveTender({ bidPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 font-mono font-bold text-amber-900 bg-amber-50/50 border border-amber-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Bid Security Amount (ETB) *
              </label>
              <input
                type="number"
                value={activeTender.bidSecurityAmount}
                onChange={(e) => updateActiveTender({ bidSecurityAmount: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 font-mono font-semibold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Bid Security Validity (Days)
              </label>
              <input
                type="number"
                value={activeTender.bidSecurityValidityDays}
                onChange={(e) => updateActiveTender({ bidSecurityValidityDays: parseInt(e.target.value) || 120 })}
                className="w-full px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Bid Validity Period (Days)
              </label>
              <input
                type="number"
                value={activeTender.bidValidityDays}
                onChange={(e) => updateActiveTender({ bidValidityDays: parseInt(e.target.value) || 90 })}
                className="w-full px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Submission Date *
              </label>
              <input
                type="date"
                value={activeTender.submissionDate}
                onChange={(e) => updateActiveTender({ submissionDate: e.target.value })}
                className="w-full px-3 py-2 font-semibold text-rose-800 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Submission Time
              </label>
              <input
                type="text"
                value={activeTender.submissionTime}
                onChange={(e) => updateActiveTender({ submissionTime: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Construction Period (Months)
              </label>
              <input
                type="number"
                value={activeTender.constructionPeriodMonths}
                onChange={(e) => updateActiveTender({ constructionPeriodMonths: parseInt(e.target.value) || 12 })}
                className="w-full px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Defects Liability Period (Months)
              </label>
              <input
                type="number"
                value={activeTender.defectsLiabilityPeriodMonths}
                onChange={(e) => updateActiveTender({ defectsLiabilityPeriodMonths: parseInt(e.target.value) || 12 })}
                className="w-full px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: PPA Thresholds */}
      {activeSubTab === 'THRESHOLDS' && (
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-5">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
            <strong>PPA 2025 Configurable Standards:</strong> Set the exact qualification thresholds stated in Section III of the Bidding Document. The Smart Compliance Engine will measure your company's audited figures against these numbers.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Minimum Average Annual Turnover (ETB)
              </label>
              <input
                type="number"
                value={q.minAnnualTurnover}
                onChange={(e) =>
                  updateActiveTender({
                    qualifications: { ...q, minAnnualTurnover: parseFloat(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-2 font-mono font-bold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Minimum Working Capital (ETB)
              </label>
              <input
                type="number"
                value={q.minWorkingCapital}
                onChange={(e) =>
                  updateActiveTender({
                    qualifications: { ...q, minWorkingCapital: parseFloat(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-2 font-mono font-bold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Minimum Liquid Assets (ETB)
              </label>
              <input
                type="number"
                value={q.minLiquidAssets}
                onChange={(e) =>
                  updateActiveTender({
                    qualifications: { ...q, minLiquidAssets: parseFloat(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-2 font-mono font-bold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Minimum Net Worth (ETB)
              </label>
              <input
                type="number"
                value={q.minNetWorth}
                onChange={(e) =>
                  updateActiveTender({
                    qualifications: { ...q, minNetWorth: parseFloat(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-2 font-mono font-bold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Minimum Unconditional Credit Facility (ETB)
              </label>
              <input
                type="number"
                value={q.minCreditFacility}
                onChange={(e) =>
                  updateActiveTender({
                    qualifications: { ...q, minCreditFacility: parseFloat(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-2 font-mono font-bold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Years of General Construction Experience
              </label>
              <input
                type="number"
                value={q.minYearsGeneralExperience}
                onChange={(e) =>
                  updateActiveTender({
                    qualifications: { ...q, minYearsGeneralExperience: parseInt(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-2 font-mono font-bold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Required Number of Similar Specific Projects
              </label>
              <input
                type="number"
                value={q.minSpecificProjectsCount}
                onChange={(e) =>
                  updateActiveTender({
                    qualifications: { ...q, minSpecificProjectsCount: parseInt(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-2 font-mono font-bold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Minimum Value per Specific Project (ETB)
              </label>
              <input
                type="number"
                value={q.minSpecificProjectValue}
                onChange={(e) =>
                  updateActiveTender({
                    qualifications: { ...q, minSpecificProjectValue: parseFloat(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-2 font-mono font-bold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Maximum Allowed Subcontractor %
              </label>
              <input
                type="number"
                value={q.maxSubcontractorPercentage}
                onChange={(e) =>
                  updateActiveTender({
                    qualifications: { ...q, maxSubcontractorPercentage: parseFloat(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-2 font-mono font-bold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Line Requirements */}
      {activeSubTab === 'REQUIREMENTS' && (
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Tender-Specific Line Requirements Register
              </h2>
              <p className="text-[11px] text-slate-500">
                Itemized compliance requirements extracted directly from this tender's instructions to bidders.
              </p>
            </div>
            <button
              onClick={handleAddLineRequirement}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Requirement</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold">
                <tr>
                  <th className="p-2.5 border-b border-slate-200">Category</th>
                  <th className="p-2.5 border-b border-slate-200">Title</th>
                  <th className="p-2.5 border-b border-slate-200">Exact Tender Requirement</th>
                  <th className="p-2.5 border-b border-slate-200">Source / Page</th>
                  <th className="p-2.5 border-b border-slate-200">Evidence Required</th>
                  <th className="p-2.5 border-b border-slate-200">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(activeTender.lineRequirements || []).map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50">
                    <td className="p-2.5 font-semibold text-slate-800">{req.category}</td>
                    <td className="p-2.5 font-medium text-slate-900">{req.title}</td>
                    <td className="p-2.5 text-slate-600 max-w-xs">{req.exactRequirement}</td>
                    <td className="p-2.5 font-mono text-slate-500">{req.sourceDoc} ({req.pageRef})</td>
                    <td className="p-2.5 text-slate-600">{req.requiredEvidence}</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {req.verificationStatus}
                      </span>
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
