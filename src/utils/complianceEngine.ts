import {
  CompanyProfile,
  TenderInfo,
  ProjectRecord,
  PersonnelRecord,
  EquipmentRecord,
  FinancialYearRecord,
  BankRecord,
  ChecklistItem,
  ComplianceStatus,
} from '../types/tender';

export interface FinancialMetricResult {
  metricName: string;
  tenderThreshold: number;
  companyValue: number;
  variance: number;
  variancePercent: number;
  status: ComplianceStatus;
  evidence: string;
  reason: string;
}

export interface ExperienceComplianceResult {
  generalYearsCompany: number;
  generalYearsRequired: number;
  generalStatus: ComplianceStatus;
  specificCountActual: number;
  specificCountRequired: number;
  specificValueThreshold: number;
  qualifyingProjects: ProjectRecord[];
  specificStatus: ComplianceStatus;
  overallStatus: ComplianceStatus;
  reason: string;
}

export interface PersonnelComplianceItem {
  requiredPosition: string;
  minYearsExp: number;
  minRelevantYears: number;
  minEducation: string;
  assignedPersonnel?: PersonnelRecord;
  status: ComplianceStatus;
  reason: string;
}

export interface EquipmentComplianceItem {
  requiredType: string;
  requiredQty: number;
  requiredCapacity: string;
  assignedEquipment: { equipment: EquipmentRecord; quantity: number }[];
  status: ComplianceStatus;
  reason: string;
}

export interface OverallReadinessResult {
  readiness: 'READY' | 'READY_WITH_WARNINGS' | 'NOT_READY';
  scorePct: number;
  daysRemaining: number;
  isDeadlinePassed: boolean;
  totalChecklistCount: number;
  completedChecklistCount: number;
  missingChecklistCount: number;
  expiredChecklistCount: number;
  expiringSoonChecklistCount: number;
  checklistCompletionPct: number;
  financialStatus: ComplianceStatus;
  creditFacilityStatus: ComplianceStatus;
  experienceStatus: ComplianceStatus;
  personnelStatus: ComplianceStatus;
  equipmentStatus: ComplianceStatus;
  subcontractorStatus: ComplianceStatus;
  eligibilityStatus: ComplianceStatus;
  criticalIssues: string[];
  warnings: string[];
}

export function evaluateFinancialMetrics(
  tender: TenderInfo,
  financials: FinancialYearRecord[],
  banks: BankRecord[]
): {
  metrics: FinancialMetricResult[];
  avgTurnover: number;
  latestWorkingCapital: number;
  latestLiquidAssets: number;
  latestNetWorth: number;
  totalAvailableCredit: number;
  overallFinancialStatus: ComplianceStatus;
} {
  const q = tender.qualifications;

  // Average turnover of last 3 years
  const auditedYears = financials.filter((f) => f.isAudited).slice(0, 3);
  const avgTurnover =
    auditedYears.length > 0
      ? auditedYears.reduce((sum, f) => sum + f.annualTurnover, 0) / auditedYears.length
      : 0;

  const latestFin = financials[0] || {
    annualTurnover: 0,
    workingCapital: 0,
    liquidAssets: 0,
    equity: 0,
    netAssets: 0,
    evidenceRef: 'None',
  };

  const latestWorkingCapital = latestFin.workingCapital;
  const latestLiquidAssets = latestFin.liquidAssets;
  const latestNetWorth = latestFin.equity || latestFin.netAssets;

  const totalAvailableCredit = banks.reduce((sum, b) => sum + b.availableAmount, 0);

  const metrics: FinancialMetricResult[] = [
    {
      metricName: 'Average Annual Construction Turnover (3-Year Average)',
      tenderThreshold: q.minAnnualTurnover,
      companyValue: avgTurnover,
      variance: avgTurnover - q.minAnnualTurnover,
      variancePercent: q.minAnnualTurnover > 0 ? ((avgTurnover - q.minAnnualTurnover) / q.minAnnualTurnover) * 100 : 100,
      status: avgTurnover >= q.minAnnualTurnover ? 'COMPLIANT' : 'NON_COMPLIANT',
      evidence: auditedYears.map((y) => y.financialYear).join(', ') + ' Audited Statements',
      reason:
        avgTurnover >= q.minAnnualTurnover
          ? `Exceeds minimum turnover requirement by ETB ${(avgTurnover - q.minAnnualTurnover).toLocaleString()} (+${(((avgTurnover - q.minAnnualTurnover) / q.minAnnualTurnover) * 100).toFixed(1)}%)`
          : `Deficit of ETB ${(q.minAnnualTurnover - avgTurnover).toLocaleString()} against tender threshold.`,
    },
    {
      metricName: 'Working Capital (Current Assets minus Current Liabilities)',
      tenderThreshold: q.minWorkingCapital,
      companyValue: latestWorkingCapital,
      variance: latestWorkingCapital - q.minWorkingCapital,
      variancePercent: q.minWorkingCapital > 0 ? ((latestWorkingCapital - q.minWorkingCapital) / q.minWorkingCapital) * 100 : 100,
      status: latestWorkingCapital >= q.minWorkingCapital ? 'COMPLIANT' : 'NON_COMPLIANT',
      evidence: latestFin.evidenceRef || 'Latest Audited Balance Sheet',
      reason:
        latestWorkingCapital >= q.minWorkingCapital
          ? `Positive net working capital with ETB ${(latestWorkingCapital - q.minWorkingCapital).toLocaleString()} surplus.`
          : `Working capital falls short by ETB ${(q.minWorkingCapital - latestWorkingCapital).toLocaleString()}.`,
    },
    {
      metricName: 'Liquid Assets (Cash, Bank Deposits & Immediate Equivalents)',
      tenderThreshold: q.minLiquidAssets,
      companyValue: latestLiquidAssets,
      variance: latestLiquidAssets - q.minLiquidAssets,
      variancePercent: q.minLiquidAssets > 0 ? ((latestLiquidAssets - q.minLiquidAssets) / q.minLiquidAssets) * 100 : 100,
      status: latestLiquidAssets >= q.minLiquidAssets ? 'COMPLIANT' : 'NON_COMPLIANT',
      evidence: 'Audited Statement of Cash Balances',
      reason:
        latestLiquidAssets >= q.minLiquidAssets
          ? `Liquid reserves exceed minimum required by ETB ${(latestLiquidAssets - q.minLiquidAssets).toLocaleString()}.`
          : `Liquid assets deficient by ETB ${(q.minLiquidAssets - latestLiquidAssets).toLocaleString()}.`,
    },
    {
      metricName: 'Net Worth / Total Owner Equity',
      tenderThreshold: q.minNetWorth,
      companyValue: latestNetWorth,
      variance: latestNetWorth - q.minNetWorth,
      variancePercent: q.minNetWorth > 0 ? ((latestNetWorth - q.minNetWorth) / q.minNetWorth) * 100 : 100,
      status: latestNetWorth >= q.minNetWorth ? 'COMPLIANT' : 'NON_COMPLIANT',
      evidence: 'Audited Balance Sheet Equity Section',
      reason:
        latestNetWorth >= q.minNetWorth
          ? `Robust financial health with ETB ${(latestNetWorth - q.minNetWorth).toLocaleString()} surplus equity.`
          : `Net worth below tender requirement by ETB ${(q.minNetWorth - latestNetWorth).toLocaleString()}.`,
    },
    {
      metricName: 'Available Commercial Bank Credit Facility Line',
      tenderThreshold: q.minCreditFacility,
      companyValue: totalAvailableCredit,
      variance: totalAvailableCredit - q.minCreditFacility,
      variancePercent: q.minCreditFacility > 0 ? ((totalAvailableCredit - q.minCreditFacility) / q.minCreditFacility) * 100 : 100,
      status: totalAvailableCredit >= q.minCreditFacility ? 'COMPLIANT' : 'NON_COMPLIANT',
      evidence: banks.map((b) => b.bankName).join(', ') + ' Confirmation Letters',
      reason:
        totalAvailableCredit >= q.minCreditFacility
          ? `Available credit capacity exceeds tender requirement by ETB ${(totalAvailableCredit - q.minCreditFacility).toLocaleString()}.`
          : `Available credit line deficient by ETB ${(q.minCreditFacility - totalAvailableCredit).toLocaleString()}.`,
    },
  ];

  const overallFinancialStatus: ComplianceStatus = metrics.every((m) => m.status === 'COMPLIANT')
    ? 'COMPLIANT'
    : metrics.filter((m) => m.status === 'NON_COMPLIANT').length === 1
      ? 'WARNING'
      : 'NON_COMPLIANT';

  return {
    metrics,
    avgTurnover,
    latestWorkingCapital,
    latestLiquidAssets,
    latestNetWorth,
    totalAvailableCredit,
    overallFinancialStatus,
  };
}

export function evaluateExperienceCompliance(
  tender: TenderInfo,
  company: CompanyProfile,
  projects: ProjectRecord[]
): ExperienceComplianceResult {
  const currentYear = new Date().getFullYear();
  const generalYearsCompany = currentYear - company.yearEstablished;
  const generalYearsRequired = tender.qualifications.minYearsGeneralExperience;

  const generalStatus: ComplianceStatus =
    generalYearsCompany >= generalYearsRequired ? 'COMPLIANT' : 'NON_COMPLIANT';

  const qualifyingProjects = projects.filter((p) => {
    const isCompletedOrNear = p.status === 'Completed' || (p.currentProgressPct && p.currentProgressPct >= 50);
    const meetsValue = p.contractAmount >= tender.qualifications.minSpecificProjectValue;
    return isCompletedOrNear && meetsValue;
  });

  const specificCountActual = qualifyingProjects.length;
  const specificCountRequired = tender.qualifications.minSpecificProjectsCount;

  const specificStatus: ComplianceStatus =
    specificCountActual >= specificCountRequired ? 'COMPLIANT' : 'NON_COMPLIANT';

  const overallStatus: ComplianceStatus =
    generalStatus === 'COMPLIANT' && specificStatus === 'COMPLIANT'
      ? 'COMPLIANT'
      : 'NON_COMPLIANT';

  const reason =
    overallStatus === 'COMPLIANT'
      ? `Qualified: ${generalYearsCompany} years in business (req: ${generalYearsRequired}), with ${specificCountActual} qualifying contracts ≥ ETB ${(tender.qualifications.minSpecificProjectValue / 1000000).toFixed(1)}M (req: ${specificCountRequired}).`
      : `Deficit: Found ${specificCountActual} qualifying project(s) versus ${specificCountRequired} required ≥ ETB ${(tender.qualifications.minSpecificProjectValue / 1000000).toFixed(1)}M.`;

  return {
    generalYearsCompany,
    generalYearsRequired,
    generalStatus,
    specificCountActual,
    specificCountRequired,
    specificValueThreshold: tender.qualifications.minSpecificProjectValue,
    qualifyingProjects,
    specificStatus,
    overallStatus,
    reason,
  };
}

export function evaluatePersonnelCompliance(
  tender: TenderInfo,
  personnelList: PersonnelRecord[]
): {
  items: PersonnelComplianceItem[];
  overallStatus: ComplianceStatus;
} {
  const requiredRoles = tender.qualifications.requiredKeyPersonnelPositions;
  const selectedAssignments = tender.selectedPersonnelIds;

  const items: PersonnelComplianceItem[] = requiredRoles.map((role) => {
    // Find assigned personnel
    const assignment = selectedAssignments.find(
      (a) =>
        a.proposedRole.toLowerCase().includes(role.position.toLowerCase()) ||
        role.position.toLowerCase().includes(a.proposedRole.toLowerCase())
    );

    const person = assignment
      ? personnelList.find((p) => p.personnelId === assignment.personnelId)
      : undefined;

    if (!person) {
      return {
        requiredPosition: role.position,
        minYearsExp: role.minYearsExp,
        minRelevantYears: role.minRelevantYears,
        minEducation: role.minEducation,
        assignedPersonnel: undefined,
        status: 'NON_COMPLIANT',
        reason: 'No qualified personnel assigned to this required position.',
      };
    }

    const expOk = person.yearsExperience >= role.minYearsExp;
    const relExpOk = person.relevantYears >= role.minRelevantYears;
    const cvOk = person.cvAvailable;

    if (expOk && relExpOk && cvOk) {
      return {
        requiredPosition: role.position,
        minYearsExp: role.minYearsExp,
        minRelevantYears: role.minRelevantYears,
        minEducation: role.minEducation,
        assignedPersonnel: person,
        status: 'COMPLIANT',
        reason: `${person.fullName}: ${person.yearsExperience} yrs total / ${person.relevantYears} yrs relevant exp. Signed CV attached.`,
      };
    } else if (!cvOk) {
      return {
        requiredPosition: role.position,
        minYearsExp: role.minYearsExp,
        minRelevantYears: role.minRelevantYears,
        minEducation: role.minEducation,
        assignedPersonnel: person,
        status: 'WARNING',
        reason: `${person.fullName} meets experience thresholds but CV file is pending verification.`,
      };
    } else {
      return {
        requiredPosition: role.position,
        minYearsExp: role.minYearsExp,
        minRelevantYears: role.minRelevantYears,
        minEducation: role.minEducation,
        assignedPersonnel: person,
        status: 'NON_COMPLIANT',
        reason: `${person.fullName} has ${person.yearsExperience} yrs (req: ${role.minYearsExp}) or ${person.relevantYears} relevant yrs (req: ${role.minRelevantYears}).`,
      };
    }
  });

  const overallStatus: ComplianceStatus = items.every((i) => i.status === 'COMPLIANT')
    ? 'COMPLIANT'
    : items.some((i) => i.status === 'NON_COMPLIANT')
      ? 'NON_COMPLIANT'
      : 'WARNING';

  return { items, overallStatus };
}

export function evaluateEquipmentCompliance(
  tender: TenderInfo,
  equipmentList: EquipmentRecord[]
): {
  items: EquipmentComplianceItem[];
  overallStatus: ComplianceStatus;
} {
  const reqEquipment = tender.qualifications.requiredEquipment;
  const assigned = tender.selectedEquipmentIds;

  const items: EquipmentComplianceItem[] = reqEquipment.map((req) => {
    // Find matching equipment
    const matchingAssignments = assigned
      .map((a) => {
        const eq = equipmentList.find((e) => e.equipmentId === a.equipmentId);
        return eq ? { equipment: eq, quantity: a.quantityToAssign } : null;
      })
      .filter((item): item is { equipment: EquipmentRecord; quantity: number } => {
        if (!item) return false;
        const nameMatch = item.equipment.equipmentName.toLowerCase().includes(req.type.toLowerCase().split(' ')[0]);
        const typeMatch = item.equipment.type.toLowerCase().includes(req.type.toLowerCase().split(' ')[0]);
        return nameMatch || typeMatch;
      });

    const totalAssignedQty = matchingAssignments.reduce((acc, curr) => acc + curr.quantity, 0);

    if (totalAssignedQty >= req.minQty) {
      return {
        requiredType: req.type,
        requiredQty: req.minQty,
        requiredCapacity: req.minCapacity,
        assignedEquipment: matchingAssignments,
        status: 'COMPLIANT',
        reason: `${totalAssignedQty} unit(s) assigned (${matchingAssignments.map((m) => `${m.equipment.equipmentName} [${m.equipment.ownership}]`).join(', ')}).`,
      };
    } else if (totalAssignedQty > 0) {
      return {
        requiredType: req.type,
        requiredQty: req.minQty,
        requiredCapacity: req.minCapacity,
        assignedEquipment: matchingAssignments,
        status: 'WARNING',
        reason: `Assigned ${totalAssignedQty} unit(s), but tender requires minimum ${req.minQty}.`,
      };
    } else {
      return {
        requiredType: req.type,
        requiredQty: req.minQty,
        requiredCapacity: req.minCapacity,
        assignedEquipment: [],
        status: 'NON_COMPLIANT',
        reason: `No equipment of type "${req.type}" assigned in Schedule 7.`,
      };
    }
  });

  const overallStatus: ComplianceStatus = items.every((i) => i.status === 'COMPLIANT')
    ? 'COMPLIANT'
    : items.some((i) => i.status === 'NON_COMPLIANT')
      ? 'NON_COMPLIANT'
      : 'WARNING';

  return { items, overallStatus };
}

export function evaluateChecklistHealth(
  checklist: ChecklistItem[],
  warningDaysThreshold: number = 60
): {
  totalCount: number;
  completedCount: number;
  missingCount: number;
  expiredCount: number;
  expiringSoonCount: number;
  completionPct: number;
  criticalIssues: string[];
  warnings: string[];
} {
  const now = new Date();
  const requiredDocs = checklist.filter((d) => d.isRequired);
  let completedCount = 0;
  let missingCount = 0;
  let expiredCount = 0;
  let expiringSoonCount = 0;
  const criticalIssues: string[] = [];
  const warnings: string[] = [];

  requiredDocs.forEach((doc) => {
    if (doc.expiryDate) {
      const exp = new Date(doc.expiryDate);
      const diffTime = exp.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        expiredCount++;
        criticalIssues.push(`Expired Document: "${doc.docName}" expired on ${doc.expiryDate}.`);
        return;
      } else if (diffDays <= warningDaysThreshold) {
        expiringSoonCount++;
        warnings.push(`Expiring Soon: "${doc.docName}" expires in ${diffDays} days (${doc.expiryDate}).`);
      }
    }

    if (!doc.isSubmitted || !doc.isVerified) {
      missingCount++;
      criticalIssues.push(`Missing / Unverified: "${doc.docName}" requires verification.`);
    } else {
      completedCount++;
    }
  });

  const completionPct =
    requiredDocs.length > 0 ? Math.round((completedCount / requiredDocs.length) * 100) : 100;

  return {
    totalCount: requiredDocs.length,
    completedCount,
    missingCount,
    expiredCount,
    expiringSoonCount,
    completionPct,
    criticalIssues,
    warnings,
  };
}

export function evaluateOverallTenderReadiness(
  tender: TenderInfo,
  company: CompanyProfile,
  projects: ProjectRecord[],
  personnelList: PersonnelRecord[],
  equipmentList: EquipmentRecord[],
  financials: FinancialYearRecord[],
  banks: BankRecord[],
  checklist: ChecklistItem[]
): OverallReadinessResult {
  const finEval = evaluateFinancialMetrics(tender, financials, banks);
  const expEval = evaluateExperienceCompliance(tender, company, projects);
  const perEval = evaluatePersonnelCompliance(tender, personnelList);
  const eqEval = evaluateEquipmentCompliance(tender, equipmentList);
  const checkHealth = evaluateChecklistHealth(checklist);

  // Submission deadline calculations
  const now = new Date();
  const subDate = new Date(tender.submissionDate);
  const diffTime = subDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isDeadlinePassed = daysRemaining < 0;

  const criticalIssues = [...checkHealth.criticalIssues];
  const warnings = [...checkHealth.warnings];

  if (isDeadlinePassed) {
    criticalIssues.push(`Submission deadline of ${tender.submissionDate} has passed.`);
  }

  if (finEval.overallFinancialStatus === 'NON_COMPLIANT') {
    criticalIssues.push('Financial qualification thresholds not met.');
  }

  if (expEval.overallStatus === 'NON_COMPLIANT') {
    criticalIssues.push('Experience qualification criteria not met.');
  }

  if (perEval.overallStatus === 'NON_COMPLIANT') {
    criticalIssues.push('Mandatory key personnel roles unfulfilled or underqualified.');
  }

  if (eqEval.overallStatus === 'NON_COMPLIANT') {
    criticalIssues.push('Mandatory equipment requirements not assigned.');
  }

  // Weightings for overall score
  let score = 0;
  score += checkHealth.completionPct * 0.35;
  score += (finEval.overallFinancialStatus === 'COMPLIANT' ? 100 : finEval.overallFinancialStatus === 'WARNING' ? 60 : 0) * 0.20;
  score += (expEval.overallStatus === 'COMPLIANT' ? 100 : 0) * 0.20;
  score += (perEval.overallStatus === 'COMPLIANT' ? 100 : 50) * 0.15;
  score += (eqEval.overallStatus === 'COMPLIANT' ? 100 : 50) * 0.10;

  const scorePct = Math.round(score);

  let readiness: 'READY' | 'READY_WITH_WARNINGS' | 'NOT_READY' = 'NOT_READY';
  if (criticalIssues.length === 0 && warnings.length === 0 && scorePct >= 95) {
    readiness = 'READY';
  } else if (criticalIssues.length === 0 && scorePct >= 75) {
    readiness = 'READY_WITH_WARNINGS';
  } else {
    readiness = 'NOT_READY';
  }

  return {
    readiness,
    scorePct,
    daysRemaining,
    isDeadlinePassed,
    totalChecklistCount: checkHealth.totalCount,
    completedChecklistCount: checkHealth.completedCount,
    missingChecklistCount: checkHealth.missingCount,
    expiredChecklistCount: checkHealth.expiredCount,
    expiringSoonChecklistCount: checkHealth.expiringSoonCount,
    checklistCompletionPct: checkHealth.completionPct,
    financialStatus: finEval.overallFinancialStatus,
    creditFacilityStatus: finEval.metrics[4].status,
    experienceStatus: expEval.overallStatus,
    personnelStatus: perEval.overallStatus,
    equipmentStatus: eqEval.overallStatus,
    subcontractorStatus: 'COMPLIANT',
    eligibilityStatus: 'COMPLIANT',
    criticalIssues,
    warnings,
  };
}
