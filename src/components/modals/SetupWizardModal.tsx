import React, { useState } from 'react';
import { useTender } from '../../context/TenderContext';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Building,
  User,
  ShieldCheck,
  DollarSign,
  Landmark,
  Users,
  Wrench,
  Briefcase,
  UserCheck,
  Award,
} from 'lucide-react';

export const SetupWizardModal: React.FC = () => {
  const {
    isSetupWizardOpen,
    setIsSetupWizardOpen,
    companyProfile,
    updateCompanyProfile,
    activeTender,
    updateActiveTender,
  } = useTender();

  const [currentStep, setCurrentStep] = useState<number>(1);

  if (!isSetupWizardOpen) return null;

  const totalSteps = 10;

  const stepsList = [
    { num: 1, title: 'Company Information', icon: Building },
    { num: 2, title: 'Authorized Representative', icon: User },
    { num: 3, title: 'License & Competence', icon: ShieldCheck },
    { num: 4, title: 'Financial Information', icon: DollarSign },
    { num: 5, title: 'Bank Accounts & Credit', icon: Landmark },
    { num: 6, title: 'Key Personnel', icon: Users },
    { num: 7, title: 'Equipment Fleet', icon: Wrench },
    { num: 8, title: 'Track Record & Projects', icon: Briefcase },
    { num: 9, title: 'Client References', icon: UserCheck },
    { num: 10, title: 'Active Tender Details', icon: Award },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm">
              {currentStep}
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">
                Tender Suite Setup Wizard — Step {currentStep} of {totalSteps}
              </h2>
              <p className="text-xs text-slate-300">
                {stepsList[currentStep - 1].title}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSetupWizardOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 flex">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full transition-all duration-300 ${
                i + 1 <= currentStep ? 'bg-amber-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800">
          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Enter your company's master legal registration. All other schedules, letters, and qualification forms will automatically draw from this master record.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Legal Name *
                  </label>
                  <input
                    type="text"
                    value={companyProfile.legalName}
                    onChange={(e) => updateCompanyProfile({ legalName: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Trading Name / Grade *
                  </label>
                  <input
                    type="text"
                    value={companyProfile.tradingName}
                    onChange={(e) => updateCompanyProfile({ tradingName: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business Entity Type
                  </label>
                  <input
                    type="text"
                    value={companyProfile.companyType}
                    onChange={(e) => updateCompanyProfile({ companyType: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Year Established
                  </label>
                  <input
                    type="number"
                    value={companyProfile.yearEstablished}
                    onChange={(e) => updateCompanyProfile({ yearEstablished: parseInt(e.target.value) || 2015 })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tax Identification Number (TIN) *
                  </label>
                  <input
                    type="text"
                    value={companyProfile.tinNumber}
                    onChange={(e) => updateCompanyProfile({ tinNumber: e.target.value })}
                    className="w-full text-xs px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Value Added Tax (VAT) Number *
                  </label>
                  <input
                    type="text"
                    value={companyProfile.vatNumber}
                    onChange={(e) => updateCompanyProfile({ vatNumber: e.target.value })}
                    className="w-full text-xs px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Identify the sole proprietor, managing director, or technical director authorized to sign the Letter of Bid and execute contracts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Authorized Representative Name *
                  </label>
                  <input
                    type="text"
                    value={companyProfile.authorizedRepresentative}
                    onChange={(e) => updateCompanyProfile({ authorizedRepresentative: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Position *
                  </label>
                  <input
                    type="text"
                    value={companyProfile.position}
                    onChange={(e) => updateCompanyProfile({ position: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Contact Mobile *
                  </label>
                  <input
                    type="text"
                    value={companyProfile.mobile1}
                    onChange={(e) => updateCompanyProfile({ mobile1: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Corporate Email *
                  </label>
                  <input
                    type="email"
                    value={companyProfile.email}
                    onChange={(e) => updateCompanyProfile({ email: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Registered Office Physical Address
                  </label>
                  <input
                    type="text"
                    value={companyProfile.businessAddress}
                    onChange={(e) => updateCompanyProfile({ businessAddress: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Specify official contractor licensing and competence certificates issued by the Ethiopian Construction Authority and Addis Ababa Trade Bureau.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contractor Category & Grade *
                  </label>
                  <input
                    type="text"
                    value={companyProfile.contractorGrade}
                    onChange={(e) => updateCompanyProfile({ contractorGrade: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business License Number *
                  </label>
                  <input
                    type="text"
                    value={companyProfile.licenseNumber}
                    onChange={(e) => updateCompanyProfile({ licenseNumber: e.target.value })}
                    className="w-full text-xs px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    National Competence Cert No. (ECA) *
                  </label>
                  <input
                    type="text"
                    value={companyProfile.competenceCertNo}
                    onChange={(e) => updateCompanyProfile({ competenceCertNo: e.target.value })}
                    className="w-full text-xs px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Authorized Bidding Capacity (ETB) *
                  </label>
                  <input
                    type="number"
                    value={companyProfile.authorizedBiddingCapacity}
                    onChange={(e) => updateCompanyProfile({ authorizedBiddingCapacity: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    License Renewal Expiry Date
                  </label>
                  <input
                    type="date"
                    value={companyProfile.licenseExpiryDate}
                    onChange={(e) => updateCompanyProfile({ licenseExpiryDate: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Competence Expiry Date
                  </label>
                  <input
                    type="date"
                    value={companyProfile.competenceExpiryDate}
                    onChange={(e) => updateCompanyProfile({ competenceExpiryDate: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Review verified financial balances. Audited financial statements provide the basis for Average Annual Turnover and Working Capital calculations.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <div className="text-[11px] text-slate-500">3-Yr Avg Turnover</div>
                    <div className="text-sm font-bold text-slate-900 font-mono">ETB 41,200,000</div>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <div className="text-[11px] text-slate-500">Latest Working Capital</div>
                    <div className="text-sm font-bold text-slate-900 font-mono">ETB 11,400,000</div>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <div className="text-[11px] text-slate-500">Liquid Assets</div>
                    <div className="text-sm font-bold text-slate-900 font-mono">ETB 8,950,000</div>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <div className="text-[11px] text-slate-500">Net Worth</div>
                    <div className="text-sm font-bold text-slate-900 font-mono">ETB 18,200,000</div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded border border-emerald-200">
                ✓ Financial records from 2023, 2024, and 2025 are loaded and certified by AABE authorized chartered auditors.
              </p>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Bank accounts and credit facilities in Ethiopian commercial banks. Lines of credit will auto-populate Schedule 2 (Credit Facility).
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Commercial Bank of Ethiopia (CBE)</div>
                    <div className="text-[11px] text-slate-500">Revolving Line of Credit: ETB 15,000,000 (Available: ETB 13,500,000)</div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Active
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Awash Bank S.C.</div>
                    <div className="text-[11px] text-slate-500">Bank Guarantee Facility: ETB 10,000,000 (Available: ETB 8,500,000)</div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Key technical personnel records. These engineers and specialists are automatically matched against tender qualification requirements in Schedule 8.
              </p>
              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">
                Currently 6 certified professionals registered in the personnel database:
                <ul className="list-disc list-inside mt-2 space-y-1 text-[11px]">
                  <li>Ato Aklilu Misganaw Mesfin — General Manager & Technical Lead (15 yrs exp)</li>
                  <li>Eng. Ermias Tadesse Bekele — Senior Resident Engineer (11 yrs exp)</li>
                  <li>Eng. Bethlehem Hailu Girma — Office Engineer & Quantity Surveyor (8 yrs exp)</li>
                  <li>Ato Yohannes Kebede Worku — Safety Officer & QA/QC Inspector (7 yrs exp)</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Equipment register reflecting owned, leased, and rented machinery. Pre-configured for PPA 2025 Schedule 7.
              </p>
              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">
                15 verified items in equipment fleet, including:
                <ul className="list-disc list-inside mt-2 space-y-1 text-[11px]">
                  <li>2x Concrete Mixers 350L Diesel (Owned)</li>
                  <li>5x High-Frequency Vibrators (Owned)</li>
                  <li>Plate Compactor 5.5 HP (Owned)</li>
                  <li>Theodolite / Total Station Survey Instrument (Owned)</li>
                  <li>Dump Truck 15 Ton (Framework Lease)</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 8 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Project track record database. Past contracts populate Schedule 3a (General Experience) and Schedule 3b (Specific Experience).
              </p>
              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">
                15 real executed/active contracts on record:
                <ul className="list-disc list-inside mt-2 space-y-1 text-[11px]">
                  <li>Low-Cost Residential Building G+3 (ETB 23,832,226.86) — Ongoing</li>
                  <li>3B+G+2+ Terrace Mixed-Use Complex (ETB 18,300,000.00) — Ongoing</li>
                  <li>G+3 Residential Building Addis Ketema (ETB 7,542,562.00) — Completed</li>
                  <li>Messalemia Commercial Center (ETB 6,750,579.53) — Ongoing</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 9 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Client directory with verified supervisory contact details for tender evaluation inquiries.
              </p>
              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">
                7 institutional clients linked to your project database:
                <ul className="list-disc list-inside mt-2 space-y-1 text-[11px]">
                  <li>St. Mary's University (Mr. Solomon Kahel)</li>
                  <li>Selam Children's Village (Eng. Assefa / Eng. Tibebu Leta)</li>
                  <li>Addis Ketema Sub City Design & Construction Office (Miss Alemtsehay)</li>
                  <li>WSG Evangelical Ministry (Mr. YOUM)</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 10 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Active Tender Configuration. Specify the tender reference, project title, and bid price.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tender Reference Number *
                  </label>
                  <input
                    type="text"
                    value={activeTender.tenderRef}
                    onChange={(e) => updateActiveTender({ tenderRef: e.target.value })}
                    className="w-full text-xs px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={activeTender.projectTitle}
                    onChange={(e) => updateActiveTender({ projectTitle: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Procuring Entity *
                  </label>
                  <input
                    type="text"
                    value={activeTender.procuringEntity}
                    onChange={(e) => updateActiveTender({ procuringEntity: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bid Price (ETB) *
                  </label>
                  <input
                    type="number"
                    value={activeTender.bidPrice}
                    onChange={(e) => updateActiveTender({ bidPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bid Security Amount (ETB) *
                  </label>
                  <input
                    type="number"
                    value={activeTender.bidSecurityAmount}
                    onChange={(e) => updateActiveTender({ bidSecurityAmount: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Submission Deadline *
                  </label>
                  <input
                    type="date"
                    value={activeTender.submissionDate}
                    onChange={(e) => updateActiveTender({ submissionDate: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-300 rounded disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="text-xs text-slate-400 font-medium">
            {currentStep} / {totalSteps}
          </div>

          {currentStep < totalSteps ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
              className="flex items-center gap-1 px-4 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsSetupWizardOpen(false)}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-600 rounded transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Complete Setup</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
