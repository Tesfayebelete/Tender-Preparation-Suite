import React, { useState } from 'react';
import { useTender } from '../../context/TenderContext';
import {
  Building2,
  ShieldCheck,
  Landmark,
  FileCheck,
  Save,
  Check,
  Plus,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { CertificationItem } from '../../types/tender';

export const CompanyProfileView: React.FC = () => {
  const { companyProfile, updateCompanyProfile } = useTender();
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const handleSaveNotice = () => {
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const handleAddCert = () => {
    const newCert: CertificationItem = {
      id: `CERT-${Date.now().toString().slice(-4)}`,
      certType: 'Additional Qualification Certificate',
      certNumber: 'AA/NEW/001',
      issuingOrg: 'Competent Authority',
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: '2027-12-31',
      status: 'Valid',
      attachmentRef: 'DOC-NEW.pdf',
    };
    updateCompanyProfile({
      certifications: [...companyProfile.certifications, newCert],
    });
  };

  const handleDeleteCert = (id: string) => {
    updateCompanyProfile({
      certifications: companyProfile.certifications.filter((c) => c.id !== id),
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header and Master Source banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">
              04 — Company Master Profile (Update Center)
            </h1>
            <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
              MASTER SOURCE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Single master repository. Information entered here automatically synchronizes across all PPA schedules, cover pages, and Letter of Bid.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSavedNotice && (
            <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold animate-fade-in">
              <Check className="w-3.5 h-3.5" /> Changes Saved Automatically
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: General Information & Official Credentials */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building2 className="w-4 h-4 text-slate-700" />
              <h2 className="text-sm font-bold text-slate-900">
                General Company & Statutory Registration
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Legal Corporate Name (As registered on Trade License)
                </label>
                <input
                  type="text"
                  value={companyProfile.legalName}
                  onChange={(e) => {
                    updateCompanyProfile({ legalName: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Trading Name / Contractor Brand
                </label>
                <input
                  type="text"
                  value={companyProfile.tradingName}
                  onChange={(e) => {
                    updateCompanyProfile({ tradingName: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Taxpayer Identification Number (TIN)
                </label>
                <input
                  type="text"
                  value={companyProfile.tinNumber}
                  onChange={(e) => {
                    updateCompanyProfile({ tinNumber: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 font-mono font-bold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Value Added Tax (VAT) Registration No.
                </label>
                <input
                  type="text"
                  value={companyProfile.vatNumber}
                  onChange={(e) => {
                    updateCompanyProfile({ vatNumber: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 font-mono font-bold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Principal Trade Registration Number
                </label>
                <input
                  type="text"
                  value={companyProfile.principalRegNo}
                  onChange={(e) => {
                    updateCompanyProfile({ principalRegNo: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Active Business License Number
                </label>
                <input
                  type="text"
                  value={companyProfile.licenseNumber}
                  onChange={(e) => {
                    updateCompanyProfile({ licenseNumber: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Professional Contractor Grade
                </label>
                <input
                  type="text"
                  value={companyProfile.contractorGrade}
                  onChange={(e) => {
                    updateCompanyProfile({ contractorGrade: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 font-semibold text-amber-800 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Authorized Bidding Capacity (ETB per Contract)
                </label>
                <input
                  type="number"
                  value={companyProfile.authorizedBiddingCapacity}
                  onChange={(e) => {
                    updateCompanyProfile({ authorizedBiddingCapacity: parseFloat(e.target.value) || 0 });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 font-mono font-bold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Official Registered Capital (ETB)
                </label>
                <input
                  type="number"
                  value={companyProfile.officialCapital}
                  onChange={(e) => {
                    updateCompanyProfile({ officialCapital: parseFloat(e.target.value) || 0 });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Competence Certificate Number
                </label>
                <input
                  type="text"
                  value={companyProfile.competenceCertNo}
                  onChange={(e) => {
                    updateCompanyProfile({ competenceCertNo: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Contact & Physical Address Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <h2 className="text-sm font-bold text-slate-900">
                Contact Coordinates & Office Location
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">
                  Business Address (Street / Landmark)
                </label>
                <input
                  type="text"
                  value={companyProfile.businessAddress}
                  onChange={(e) => {
                    updateCompanyProfile({ businessAddress: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Sub-City / Zone</label>
                <input
                  type="text"
                  value={companyProfile.subCity}
                  onChange={(e) => {
                    updateCompanyProfile({ subCity: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Woreda & House No.</label>
                <input
                  type="text"
                  value={companyProfile.woreda}
                  onChange={(e) => {
                    updateCompanyProfile({ woreda: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Primary Mobile (VAT Register)</label>
                <input
                  type="text"
                  value={companyProfile.mobile1}
                  onChange={(e) => {
                    updateCompanyProfile({ mobile1: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Secondary Mobile (License)</label>
                <input
                  type="text"
                  value={companyProfile.mobile2}
                  onChange={(e) => {
                    updateCompanyProfile({ mobile2: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Official Corporate Email</label>
                <input
                  type="email"
                  value={companyProfile.email}
                  onChange={(e) => {
                    updateCompanyProfile({ email: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">P.O. Box & Postal Code</label>
                <input
                  type="text"
                  value={companyProfile.poBox}
                  onChange={(e) => {
                    updateCompanyProfile({ poBox: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authorized Signatory, Seal & Assets */}
        <div className="space-y-6">
          {/* Authorized Management Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Legal & Authorized Signatory
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  General Manager & Technical Lead *
                </label>
                <input
                  type="text"
                  value={companyProfile.generalManager}
                  onChange={(e) => {
                    updateCompanyProfile({ generalManager: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 font-semibold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Authorized Signatory (Letter of Bid) *
                </label>
                <input
                  type="text"
                  value={companyProfile.authorizedRepresentative}
                  onChange={(e) => {
                    updateCompanyProfile({ authorizedRepresentative: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 font-semibold text-slate-900 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Official Title</label>
                <input
                  type="text"
                  value={companyProfile.position}
                  onChange={(e) => {
                    updateCompanyProfile({ position: e.target.value });
                    handleSaveNotice();
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Signature Status</label>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-700">
                  {companyProfile.signatureInfo}
                </div>
              </div>
            </div>
          </div>

          {/* Official Branding & Stamp Assets */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Official Seal & Branding Assets
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {companyProfile.logoUrl && (
                  <img
                    src={companyProfile.logoUrl}
                    alt="Corporate Emblem"
                    className="w-16 h-16 rounded border border-slate-200 object-contain p-1"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div>
                  <div className="text-xs font-bold text-slate-900">Corporate Logo</div>
                  <div className="text-[11px] text-slate-500">Vector high-res architectural mark</div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
                {companyProfile.stampUrl && (
                  <img
                    src={companyProfile.stampUrl}
                    alt="Official Seal"
                    className="w-16 h-16 rounded border border-slate-200 object-contain p-1"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div>
                  <div className="text-xs font-bold text-slate-900">Official Blue Rubber Seal</div>
                  <div className="text-[11px] text-slate-500">Addis Ababa Trade Bureau verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Table */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Statutory Certifications & Regulatory Filings
            </h2>
            <p className="text-[11px] text-slate-500">
              Active licenses registered with Ethiopian Construction Authority and Addis Ababa Trade Bureau
            </p>
          </div>
          <button
            onClick={handleAddCert}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certificate</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 font-semibold">
              <tr>
                <th className="p-2.5 border-b border-slate-200">Certificate Type</th>
                <th className="p-2.5 border-b border-slate-200">Certificate Number</th>
                <th className="p-2.5 border-b border-slate-200">Issuing Organization</th>
                <th className="p-2.5 border-b border-slate-200">Issue Date</th>
                <th className="p-2.5 border-b border-slate-200">Expiry Date</th>
                <th className="p-2.5 border-b border-slate-200">Status</th>
                <th className="p-2.5 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {companyProfile.certifications.map((cert) => (
                <tr key={cert.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-semibold text-slate-900">{cert.certType}</td>
                  <td className="p-2.5 font-mono text-slate-700">{cert.certNumber}</td>
                  <td className="p-2.5 text-slate-600">{cert.issuingOrg}</td>
                  <td className="p-2.5 font-mono text-slate-600">{cert.issueDate}</td>
                  <td className="p-2.5 font-mono text-slate-600">{cert.expiryDate}</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {cert.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-right">
                    <button
                      onClick={() => handleDeleteCert(cert.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Delete certification"
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
