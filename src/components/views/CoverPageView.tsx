import React from 'react';
import { useTender } from '../../context/TenderContext';
import { Printer, Building2, Calendar, ShieldCheck, UserCheck } from 'lucide-react';

export const CoverPageView: React.FC = () => {
  const { companyProfile, activeTender, setActiveTab } = useTender();

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 print:hidden">
        <div>
          <h1 className="text-base font-bold text-slate-900">01 — Official Bid Cover Page</h1>
          <p className="text-xs text-slate-500">
            Auto-populated from Company Profile & Tender Information. Formatted for tender binding.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('05_TENDER_INFO')}
            className="px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
          >
            Edit Tender Info
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Cover Page</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Frame */}
      <div className="bg-white border-2 border-slate-800 p-8 sm:p-12 shadow-sm rounded-none print:border-none print:shadow-none print:p-0 min-h-[900px] flex flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative Ethiopian corner pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none" />

        {/* Company Header Block */}
        <div className="text-center pb-8 border-b-2 border-slate-900">
          <div className="flex items-center justify-center gap-4 mb-4">
            {companyProfile.logoUrl && (
              <img
                src={companyProfile.logoUrl}
                alt="Company Logo"
                className="w-16 h-16 object-contain rounded border border-slate-200 shadow-sm"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="text-left">
              <h2 className="text-xl font-bold tracking-tight text-slate-950 uppercase font-serif">
                {companyProfile.legalName}
              </h2>
              <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                {companyProfile.contractorGrade}
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5 font-mono">
                TIN: {companyProfile.tinNumber} · VAT: {companyProfile.vatNumber} · Reg: {companyProfile.principalRegNo}
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 max-w-xl mx-auto">
            {companyProfile.businessAddress} · Tel: {companyProfile.mobile1} / {companyProfile.mobile2} · Email: {companyProfile.email}
          </p>
        </div>

        {/* Tender Core Information */}
        <div className="my-10 text-center space-y-6">
          <div className="inline-block px-4 py-1.5 bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest rounded-none">
            TECHNICAL & FINANCIAL BID PROPOSAL
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Procuring Entity / Employer:
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {activeTender.procuringEntity}
            </h3>
            {activeTender.consultant && (
              <p className="text-xs text-slate-600">
                Supervising Consultant: <span className="font-semibold">{activeTender.consultant}</span>
              </p>
            )}
          </div>

          <div className="py-6 px-8 bg-slate-50 border border-slate-300 rounded max-w-2xl mx-auto space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Project Title:
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 leading-snug">
              {activeTender.projectTitle}
            </h1>
            <div className="text-xs text-slate-600">
              Location: <span className="font-medium text-slate-800">{activeTender.projectLocation}</span>
            </div>
          </div>

          {/* Tender Metadata Table */}
          <div className="max-w-xl mx-auto border border-slate-300 text-left text-xs">
            <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-100/70 p-2 font-semibold text-slate-700">
              <span>Tender Reference Number:</span>
              <span className="font-mono text-slate-950">{activeTender.tenderRef}</span>
            </div>
            <div className="grid grid-cols-2 border-b border-slate-200 p-2">
              <span className="text-slate-600">Procurement Method:</span>
              <span className="text-slate-900 font-medium">{activeTender.procurementMethod}</span>
            </div>
            <div className="grid grid-cols-2 border-b border-slate-200 p-2 bg-slate-50">
              <span className="text-slate-600">Contract Type:</span>
              <span className="text-slate-900 font-medium">{activeTender.contractType}</span>
            </div>
            <div className="grid grid-cols-2 border-b border-slate-200 p-2">
              <span className="text-slate-600">Bid Validity Period:</span>
              <span className="text-slate-900 font-medium">{activeTender.bidValidityDays} Calendar Days</span>
            </div>
            <div className="grid grid-cols-2 border-b border-slate-200 p-2 bg-slate-50">
              <span className="text-slate-600">Bid Security Amount:</span>
              <span className="font-mono font-semibold text-slate-900">
                {activeTender.currency} {activeTender.bidSecurityAmount.toLocaleString()} ({activeTender.bidSecurityValidityDays} Days Validity)
              </span>
            </div>
            <div className="grid grid-cols-2 p-2 font-semibold">
              <span className="text-slate-700">Submission Deadline:</span>
              <span className="text-rose-700 font-mono">
                {activeTender.submissionDate} @ {activeTender.submissionTime}
              </span>
            </div>
          </div>
        </div>

        {/* Verification & Signatures Block */}
        <div className="pt-6 border-t-2 border-slate-900">
          <div className="grid grid-cols-3 gap-6 text-center text-xs">
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">Prepared By:</div>
              <div className="font-semibold text-slate-900">{activeTender.preparedBy}</div>
              <div className="text-[11px] text-slate-500">Bidding Engineer</div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">Authorized Signatory:</div>
              <div className="font-bold text-slate-950">{activeTender.approvedBy}</div>
              <div className="text-[11px] text-slate-600 font-medium">{companyProfile.position}</div>
            </div>

            <div className="space-y-1 flex flex-col items-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Official Company Seal:</div>
              {companyProfile.stampUrl ? (
                <img
                  src={companyProfile.stampUrl}
                  alt="Official Seal"
                  className="w-16 h-16 object-contain opacity-90"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-16 h-16 border-2 border-dashed border-slate-300 rounded-full flex items-center justify-center text-[10px] text-slate-400">
                  Seal Area
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-200">
            <span>DOCUMENT VERSION: {activeTender.version}</span>
            <span>SUBMISSION DATE: {activeTender.preparationDate}</span>
            <span>ADDIS ABABA, ETHIOPIA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
