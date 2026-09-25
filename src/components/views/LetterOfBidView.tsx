import React, { useState } from 'react';
import { useTender } from '../../context/TenderContext';
import { Mail, Printer, Edit2, Check, ShieldCheck } from 'lucide-react';

export const LetterOfBidView: React.FC = () => {
  const { companyProfile, activeTender, updateActiveTender } = useTender();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 print:hidden">
        <div>
          <h1 className="text-base font-bold text-slate-900">
            14 — Letter of Bid (PPA 2025 Standard Form)
          </h1>
          <p className="text-xs text-slate-500">
            Auto-populated from master company profile and tender parameters.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
          >
            {isEditing ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Edit2 className="w-3.5 h-3.5 text-slate-500" />}
            <span>{isEditing ? 'Done Editing' : 'Edit Text'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Letter of Bid</span>
          </button>
        </div>
      </div>

      {/* Letter of Bid Document Paper */}
      <div className="bg-white border border-slate-300 p-8 sm:p-12 shadow-sm rounded-none print:border-none print:shadow-none print:p-0 min-h-[900px] text-slate-900 text-xs leading-relaxed space-y-6">
        {/* Company Letterhead */}
        <div className="border-b-2 border-slate-900 pb-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            {companyProfile.logoUrl && (
              <img
                src={companyProfile.logoUrl}
                alt="Logo"
                className="w-14 h-14 object-contain"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="text-left">
              <h2 className="text-base font-bold uppercase tracking-tight text-slate-950 font-serif">
                {companyProfile.legalName}
              </h2>
              <div className="text-[11px] font-semibold text-amber-800 uppercase">
                {companyProfile.contractorGrade}
              </div>
              <div className="text-[10px] text-slate-600 font-mono">
                TIN: {companyProfile.tinNumber} · VAT: {companyProfile.vatNumber} · ECA Reg: {companyProfile.competenceCertNo}
              </div>
            </div>
          </div>
          <div className="text-[10px] text-slate-500">
            {companyProfile.businessAddress} · Tel: {companyProfile.mobile1} · Email: {companyProfile.email}
          </div>
        </div>

        {/* Date and Addressee */}
        <div className="flex justify-between items-start pt-2">
          <div>
            <div className="font-semibold text-slate-900">To:</div>
            <div className="font-bold text-slate-950">{activeTender.procuringEntity}</div>
            <div className="text-slate-600">{activeTender.projectLocation}</div>
            <div className="text-slate-600">Federal Democratic Republic of Ethiopia</div>
          </div>
          <div className="text-right font-mono">
            <div><strong>Date:</strong> {activeTender.preparationDate}</div>
            <div><strong>Tender Ref No:</strong> {activeTender.tenderRef}</div>
          </div>
        </div>

        {/* Subject Header */}
        <div className="py-2 px-3 bg-slate-50 border-l-4 border-slate-900 font-semibold text-slate-900">
          SUBJECT: LETTER OF BID FOR THE {activeTender.projectTitle.toUpperCase()}
        </div>

        {/* Letter Body Clauses */}
        <p>
          Gentlemen and/or Ladies,
        </p>

        <p>
          1. Having examined the Bidding Documents including Addenda Nos. <strong>NIL</strong>, the receipt of which is hereby duly acknowledged, we, the undersigned, offer to execute and complete the <strong>{activeTender.projectTitle}</strong> in conformity with the said Bidding Documents for the sum of:
        </p>

        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded font-mono font-bold text-slate-950 text-center text-sm">
          {activeTender.currency} {activeTender.bidPrice.toLocaleString()} (Ethiopian Birr Forty-Six Million Eight Hundred Twenty Thousand Five Hundred Only)
        </div>

        <p>
          2. We undertake, if our Bid is accepted, to commence the Works within <strong>14 calendar days</strong> from the receipt of the Engineer’s Notice to Commence, and to complete the whole of the Works comprised in the Contract within the time of completion stated in the Bidding Data, being <strong>{activeTender.constructionPeriodMonths} calendar months</strong>.
        </p>

        <p>
          3. We agree to abide by this Bid for a period of <strong>{activeTender.bidValidityDays} calendar days</strong> from the date fixed for receiving the same, and it shall remain binding upon us and may be accepted at any time before the expiration of that period.
        </p>

        <p>
          4. We have enclosed an unconditional Bid Security in the form of a Bank Guarantee / CPO from <strong>Commercial Bank of Ethiopia</strong> in the amount of <strong>{activeTender.currency} {activeTender.bidSecurityAmount.toLocaleString()}</strong>, valid for <strong>{activeTender.bidSecurityValidityDays} calendar days</strong> from the bid submission date.
        </p>

        <p>
          5. Unless and until a formal Contract Agreement is prepared and executed, this Bid, together with your written acceptance thereof and your notification of award, shall constitute a binding Contract between us.
        </p>

        <p>
          6. We understand that you are not bound to accept the lowest or any Bid you may receive, and we certify that our firm meets all eligibility and qualification criteria specified in Section III of the PPA 2025 Bidding Documents.
        </p>

        {/* Signature & Seal Block */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 items-end">
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Duly Authorized Representative:</div>
            <div className="font-bold text-slate-950 text-sm">{companyProfile.authorizedRepresentative}</div>
            <div className="text-slate-700 font-medium">{companyProfile.position}</div>
            <div className="text-slate-600 font-semibold">{companyProfile.legalName}</div>
            <div className="pt-2 text-[11px] text-slate-500 font-mono">
              Date: {activeTender.preparationDate}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-4 border border-dashed border-slate-300 rounded bg-slate-50/50">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-2">Company Stamp & Seal:</div>
            {companyProfile.stampUrl ? (
              <img
                src={companyProfile.stampUrl}
                alt="Stamp"
                className="w-20 h-20 object-contain opacity-90"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
                Official Seal
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
