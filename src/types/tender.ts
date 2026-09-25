export type ComplianceStatus = 'COMPLIANT' | 'WARNING' | 'NON_COMPLIANT' | 'NOT_APPLICABLE' | 'PENDING';

export type DocStatus = 'COMPLETE' | 'MISSING' | 'EXPIRED' | 'EXPIRING_SOON' | 'NOT_REQUIRED' | 'PENDING_VERIFICATION';

export interface CertificationItem {
  id: string;
  certType: string;
  certNumber: string;
  issuingOrg: string;
  issueDate: string;
  expiryDate: string;
  status: 'Valid' | 'Expired' | 'Expiring Soon' | 'Pending Renewal';
  attachmentRef: string;
}

export interface CompanyProfile {
  companyId: string;
  legalName: string;
  tradingName: string;
  companyType: string;
  yearEstablished: number;
  tinNumber: string;
  vatNumber: string;
  principalRegNo: string;
  licenseNumber: string;
  contractorGrade: string;
  licenseIssueDate: string;
  licenseExpiryDate: string;
  competenceCertNo: string;
  competenceIssueDate: string;
  competenceExpiryDate: string;
  competenceAuthority: string;
  authorizedBiddingCapacity: number;
  officialCapital: number;
  businessAddress: string;
  city: string;
  subCity: string;
  woreda: string;
  houseNo: string;
  country: string;
  telephone: string;
  mobile1: string;
  mobile2: string;
  email: string;
  website: string;
  poBox: string;
  managingDirector: string;
  generalManager: string;
  technicalManager: string;
  authorizedRepresentative: string;
  position: string;
  signatureInfo: string;
  logoUrl?: string;
  stampUrl?: string;
  heroUrl?: string;
  certifications: CertificationItem[];
}

export interface TenderQualificationRequirements {
  minAnnualTurnover: number;
  minFinancialCapacity: number;
  minLiquidAssets: number;
  minWorkingCapital: number;
  minNetWorth: number;
  minCreditFacility: number;
  minYearsGeneralExperience: number;
  minSpecificProjectsCount: number;
  minSpecificProjectValue: number;
  specificProjectType: string;
  requiredKeyPersonnelPositions: { position: string; minYearsExp: number; minRelevantYears: number; minEducation: string }[];
  requiredEquipment: { type: string; minQty: number; minCapacity: string }[];
  maxSubcontractorPercentage: number;
  isJvAllowed: boolean;
  notes: string;
}

export interface TenderRequirementItem {
  id: string;
  category: 'Legal / Administrative' | 'Financial' | 'Experience' | 'Personnel' | 'Equipment' | 'Technical / Methodology' | 'Other';
  title: string;
  exactRequirement: string;
  sourceDoc: string;
  pageRef: string;
  threshold: string;
  unit: string;
  requiredEvidence: string;
  isRequired: boolean;
  verificationStatus: ComplianceStatus;
  remarks: string;
}

export interface TenderInfo {
  tenderId: string;
  tenderRef: string;
  projectTitle: string;
  projectLocation: string;
  procuringEntity: string;
  employerClient: string;
  consultant: string;
  procurementMethod: string;
  tenderCategory: string;
  contractType: string;
  estimatedContractValue: number;
  bidPrice: number;
  currency: string;
  bidSecurityAmount: number;
  bidSecurityValidityDays: number;
  bidValidityDays: number;
  tenderDocFee: number;
  submissionDate: string;
  submissionTime: string;
  openingDate: string;
  clarificationDeadline: string;
  siteVisitDate: string;
  preBidMeetingDate: string;
  constructionPeriodMonths: number;
  defectsLiabilityPeriodMonths: number;
  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
  version: string;
  preparationDate: string;
  qualifications: TenderQualificationRequirements;
  lineRequirements: TenderRequirementItem[];
  // Selected IDs for this specific tender bid package
  selectedProjectIds: string[];
  selectedPersonnelIds: { personnelId: string; proposedRole: string }[];
  selectedEquipmentIds: { equipmentId: string; proposedRole: string; quantityToAssign: number }[];
  selectedSubcontractorIds: string[];
}

export interface ProjectRecord {
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  contractNumber: string;
  projectLocation: string;
  contractType: string;
  scopeOfWork: string;
  sector: string;
  startDate: string;
  completionDate: string;
  contractAmount: number;
  currency: string;
  finalAmount: number;
  status: 'Completed' | 'Ongoing' | 'Suspended' | 'Terminated';
  role: 'Main Contractor' | 'JV Partner' | 'Subcontractor';
  participationPct: number;
  similarityRelevance: 'High' | 'Medium' | 'Low';
  specificExperienceCategory: string;
  employer: string;
  consultant: string;
  contactPerson: string;
  contactDetails: string;
  hasCompletionCert: boolean;
  hasTakingOverCert: boolean;
  hasPerformanceCert: boolean;
  evidenceAvailable: boolean;
  docReference: string;
  remarks: string;
  currentProgressPct?: number;
  remainingWorkValue?: number;
  monthlyWorkload?: number;
}

export interface PersonnelRecord {
  personnelId: string;
  fullName: string;
  position: string;
  profession: string;
  discipline: string;
  qualification: string;
  institution: string;
  graduationYear: number;
  professionalRegNo: string;
  licenseNo: string;
  yearsExperience: number;
  relevantYears: number;
  currentEmployer: string;
  employmentType: 'Permanent' | 'Contract' | 'Project-Based';
  availability: 'Available' | 'Assigned' | 'Committed';
  cvAvailable: boolean;
  cvUpdatedDate: string;
  idPassportNo: string;
  contactPhone: string;
  contactEmail: string;
  projectAssignment: string;
  evidenceDocs: string;
  remarks: string;
}

export interface EquipmentRecord {
  equipmentId: string;
  equipmentName: string;
  type: string;
  make: string;
  model: string;
  year: number;
  capacity: string;
  regNumber: string;
  serialNumber: string;
  ownership: 'Owned' | 'Leased' | 'Rented';
  owner: string;
  location: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Under Maintenance';
  availability: 'Available' | 'In Use' | 'Under Maintenance';
  operator: string;
  insuranceExpiry: string;
  inspectionCertNo: string;
  inspectionCertExpiry: string;
  evidenceDoc: string;
  remarks: string;
}

export interface FinancialYearRecord {
  financialYear: string;
  revenue: number;
  annualTurnover: number;
  currentAssets: number;
  currentLiabilities: number;
  netAssets: number;
  workingCapital: number;
  liquidAssets: number;
  totalAssets: number;
  totalLiabilities: number;
  equity: number;
  profitLoss: number;
  isAudited: boolean;
  auditorName: string;
  auditDate: string;
  evidenceRef: string;
}

export interface BankRecord {
  bankId: string;
  bankName: string;
  branch: string;
  address: string;
  accountName: string;
  accountNumber: string;
  rmName: string;
  phone: string;
  email: string;
  facilityType: string;
  facilityAmount: number;
  availableAmount: number;
  usedAmount: number;
  currency: string;
  issueDate: string;
  expiryDate: string;
  hasConfirmationLetter: boolean;
  bankRef: string;
  evidenceDoc: string;
}

export interface ClientRecord {
  clientId: string;
  orgName: string;
  clientType: 'Public Authority' | 'Higher Education' | 'NGO / Development' | 'Private Commercial' | 'Religious / Community';
  address: string;
  contactPerson: string;
  position: string;
  phone: string;
  email: string;
  projectHistoryCount: number;
  referenceAvailable: boolean;
  performanceCertCount: number;
  remarks: string;
}

export interface SubcontractorRecord {
  subcontractorId: string;
  companyName: string;
  scope: string;
  specialty: string;
  registrationNo: string;
  licenseNo: string;
  yearsExperience: number;
  contactPerson: string;
  phone: string;
  email: string;
  contractValue: number;
  percentage: number;
  docStatus: 'Valid' | 'Pending' | 'Incomplete';
  eligibilityStatus: 'Qualified' | 'Under Review' | 'Not Qualified';
  evidence: string;
}

export interface ChecklistItem {
  docId: string;
  category: 'Legal' | 'Registration' | 'Tax' | 'License' | 'Financial' | 'Bank' | 'Experience' | 'Personnel' | 'Equipment' | 'Bid Security' | 'Technical' | 'Methodology' | 'Forms' | 'Subcontractor' | 'Other';
  docName: string;
  tenderRequirement: string;
  isRequired: boolean;
  source: string;
  docNumber: string;
  issueDate: string;
  expiryDate: string;
  requiredFormat: 'Original' | 'Certified Copy' | 'Copy';
  originalCopy?: string;
  fileName: string;
  fileLocation: string;
  isSubmitted: boolean;
  isVerified: boolean;
  responsiblePerson: string;
  status: DocStatus;
  remarks: string;
}

export interface SubmissionReviewItem {
  id: string;
  sectionCode: string;
  sectionTitle: string;
  requirement: string;
  status: 'Compliant' | 'Non-Compliant' | 'Pending Review' | 'Not Applicable';
  evidence: string;
  responsiblePerson: string;
  reviewer: string;
  reviewDate: string;
  comments: string;
  correctiveAction: string;
}

export interface WorkMethodologySection {
  id: string;
  sectionNumber: number;
  title: string;
  content: string;
  responsiblePerson: string;
  plannedDuration: string;
  resources: string;
  equipment: string;
  personnel: string;
  materials: string;
  risks: string;
  mitigationMeasures: string;
}

export interface DocumentRegisterItem {
  docId: string;
  tenderId: string;
  category: string;
  name: string;
  version: string;
  date: string;
  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
  status: 'Approved' | 'Draft' | 'Under Review' | 'Superseded';
  fileRef: string;
  isFinal: boolean;
  isIncluded: boolean;
  remarks: string;
}
