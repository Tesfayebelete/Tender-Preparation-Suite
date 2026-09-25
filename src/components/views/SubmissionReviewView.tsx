import React from 'react';
import { useTender } from '../../context/TenderContext';
import {
  CheckSquare,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { SubmissionReviewItem } from '../../types/tender';

export const SubmissionReviewView: React.FC = () => {
  const { submissionReviews, updateSubmissionReview, activeTender, companyProfile } = useTender();

  const compliantCount = submissionReviews.filter((r) => r.status === 'Compliant').length;
  const nonCompliantCount = submissionReviews.filter((r) => r.status === 'Non-Compliant').length;
  const pendingCount = submissionReviews.filter((r) => r.status === 'Pending Review').length;

  const handleStatusChange = (item: SubmissionReviewItem, newStatus: SubmissionReviewItem['status']) => {
    updateSubmissionReview({
      ...item,
      status: newStatus,
      reviewDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            07 — Final Bid Submission Review (Sections A to P)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            PPA 2025 exhaustive pre-submission quality audit. Every section must be verified prior to formal tender sealing.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors shrink-0 print:hidden"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Audit Report</span>
        </button>
      </div>

      {/* Review Summary Scoreboard */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Total Audit Items</div>
          <div className="text-xl font-bold text-slate-900 font-mono mt-1">16 Sections (A-P)</div>
          <div className="text-[11px] text-slate-500 mt-0.5">All PPA compliance areas</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Compliant</div>
          <div className="text-xl font-bold text-emerald-700 font-mono mt-1">{compliantCount}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Verified & Signed-off</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Non-Compliant</div>
          <div className="text-xl font-bold text-rose-700 font-mono mt-1">{nonCompliantCount}</div>
          <div className="text-[11px] text-rose-600 font-medium mt-0.5">Disqualifying deficits</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Pending Review</div>
          <div className="text-xl font-bold text-amber-700 font-mono mt-1">{pendingCount}</div>
          <div className="text-[11px] text-amber-600 font-medium mt-0.5">Requires final check</div>
        </div>
      </div>

      {/* Audit Review Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3 w-16">Sec</th>
                <th className="p-3">Audit Area & Requirement</th>
                <th className="p-3">Verified Evidence</th>
                <th className="p-3">Assigned Lead</th>
                <th className="p-3">Audit Verdict</th>
                <th className="p-3">Comments & Corrective Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {submissionReviews.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70">
                  <td className="p-3 font-mono font-bold text-slate-900 bg-slate-50 text-center">
                    {item.sectionCode}
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{item.sectionTitle}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{item.requirement}</div>
                  </td>
                  <td className="p-3 text-slate-700 text-[11px] font-medium max-w-xs">
                    {item.evidence}
                  </td>
                  <td className="p-3 text-[11px]">
                    <div className="font-medium text-slate-900">{item.responsiblePerson}</div>
                    <div className="text-slate-400">Rev: {item.reviewer}</div>
                  </td>
                  <td className="p-3">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item, e.target.value as SubmissionReviewItem['status'])}
                      className={`text-[11px] font-semibold px-2 py-1 rounded border focus:outline-none cursor-pointer ${
                        item.status === 'Compliant'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : item.status === 'Non-Compliant'
                            ? 'bg-rose-50 text-rose-800 border-rose-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="Compliant">✓ Compliant</option>
                      <option value="Non-Compliant">✕ Non-Compliant</option>
                      <option value="Pending Review">⏳ Pending Review</option>
                      <option value="Not Applicable">— Not Applicable</option>
                    </select>
                  </td>
                  <td className="p-3 text-[11px] max-w-xs">
                    <input
                      type="text"
                      value={item.comments}
                      onChange={(e) => updateSubmissionReview({ ...item, comments: e.target.value })}
                      className="w-full px-2 py-1 border border-slate-200 rounded text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 mb-1"
                      placeholder="Audit note..."
                    />
                    {item.correctiveAction && (
                      <div className="text-[10px] text-slate-500">
                        Action: {item.correctiveAction}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Sign-off Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          SUBMISSION REVIEW SUMMARY & CERTIFICATION
        </h3>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          I hereby certify that all 16 administrative, financial, technical, and regulatory sections of this bid proposal for <strong>{activeTender.projectTitle} (Ref: {activeTender.tenderRef})</strong> have been audited in full compliance with PPA 2025 standard bidding regulations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-200 text-xs">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Senior Reviewer</div>
            <div className="font-bold text-slate-900 mt-1">{activeTender.preparedBy}</div>
            <div className="text-slate-500 text-[11px]">Bidding Directorate</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Authorized Technical Manager</div>
            <div className="font-bold text-slate-900 mt-1">{companyProfile.authorizedRepresentative}</div>
            <div className="text-slate-500 text-[11px]">{companyProfile.position}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Audit Conclusion</div>
            <div className="font-bold text-emerald-700 mt-1">APPROVED FOR TENDER BOX DEPOSIT</div>
            <div className="text-slate-500 text-[11px]">Date: {new Date().toISOString().split('T')[0]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
