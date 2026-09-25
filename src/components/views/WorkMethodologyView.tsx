import React, { useState } from 'react';
import { useTender } from '../../context/TenderContext';
import { BookOpen, Printer, Edit3, Check, Search, ChevronRight } from 'lucide-react';
import { WorkMethodologySection } from '../../types/tender';

export const WorkMethodologyView: React.FC = () => {
  const { methodologySections, updateMethodologySection, activeTender, companyProfile } = useTender();
  const [activeSectionId, setActiveSectionId] = useState<string>('METH-01');
  const [searchTerm, setSearchTerm] = useState('');

  const currentSection =
    methodologySections.find((s) => s.id === activeSectionId) || methodologySections[0];

  const filteredSections = methodologySections.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">
              24 — Construction Work Methodology & Technical Approach
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
              25 PPA Sections
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprehensive civil engineering execution strategy, resource logistics, and quality assurance plan.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors shrink-0 print:hidden"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Methodology Volume</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 25 Sections Table of Contents */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden flex flex-col max-h-[750px]">
          <div className="p-3 border-b border-slate-200 bg-slate-50">
            <input
              type="text"
              placeholder="Search methodology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
            {filteredSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`w-full p-2.5 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  activeSectionId === sec.id
                    ? 'bg-amber-50 text-amber-950 font-bold border-l-3 border-amber-500'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="truncate mr-2">
                  <span className="font-mono text-slate-400 mr-1.5 text-[11px]">
                    {String(sec.sectionNumber).padStart(2, '0')}.
                  </span>
                  <span>{sec.title}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Section Editor & Parameters */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Section {String(currentSection.sectionNumber).padStart(2, '0')} of 25
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-2">
              {currentSection.title}
            </h2>
          </div>

          {/* Rich Content Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Methodology Narrative & Technical Specifications:
            </label>
            <textarea
              rows={8}
              value={currentSection.content}
              onChange={(e) => updateMethodologySection({ ...currentSection, content: e.target.value })}
              className="w-full text-xs p-3 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none leading-relaxed text-slate-800"
            />
          </div>

          {/* Structured Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Lead Responsible Person</label>
              <input
                type="text"
                value={currentSection.responsiblePerson}
                onChange={(e) => updateMethodologySection({ ...currentSection, responsiblePerson: e.target.value })}
                className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Planned Duration / Milestone</label>
              <input
                type="text"
                value={currentSection.plannedDuration}
                onChange={(e) => updateMethodologySection({ ...currentSection, plannedDuration: e.target.value })}
                className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Key Plant & Equipment Deployed</label>
              <input
                type="text"
                value={currentSection.equipment}
                onChange={(e) => updateMethodologySection({ ...currentSection, equipment: e.target.value })}
                className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Designated Personnel & Labor</label>
              <input
                type="text"
                value={currentSection.personnel}
                onChange={(e) => updateMethodologySection({ ...currentSection, personnel: e.target.value })}
                className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Identified Engineering Risk</label>
              <input
                type="text"
                value={currentSection.risks}
                onChange={(e) => updateMethodologySection({ ...currentSection, risks: e.target.value })}
                className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Proactive Mitigation & Control Measures</label>
              <input
                type="text"
                value={currentSection.mitigationMeasures}
                onChange={(e) => updateMethodologySection({ ...currentSection, mitigationMeasures: e.target.value })}
                className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
