export type Step = { title: string; body: string };
export type Item = { title: string; body: string; icon: IconName };
export type Faq = { q: string; a: string };

export type IconName =
  | "document"
  | "check"
  | "location"
  | "phone"
  | "lock"
  | "clock"
  | "list"
  | "user"
  | "home"
  | "plus"
  | "info"
  | "chevron"
  | "arrow"
  | "menu"
  | "close"
  | "camera"
  | "alert"
  | "eye"
  | "shield"
  | "layers"
  | "store"
  | "history"
  | "route";

export type LeadFieldName = "business" | "contact" | "mobile" | "email" | "type" | "message";

export type LeadFormCopy = {
  title: string;
  intro: string;
  labels: Record<LeadFieldName, string>;
  placeholders: Partial<Record<LeadFieldName, string>>;
  typePlaceholder: string;
  typeOptions: { value: string; label: string }[];
  optional: string;
  requiredNote: string;
  submit: string;
  submitting: string;
  privacy: string;
  close: string;
  success: { title: string; body: string; done: string };
  errors: {
    required: string;
    email: string;
    mobile: string;
    type: string;
    tooLong: string;
    fixFields: string;
    unavailable: string;
    rateLimited: string;
    generic: string;
  };
};

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Paragraph shown after the bullets. */
  after?: string[];
};

export type LegalDoc = {
  eyebrow: string;
  title: string;
  intro: string;
  /** Human-readable effective date, or empty for a placeholder page. */
  effectiveDate: string;
  /** Machine-readable date (YYYY-MM-DD) for the <time> element. */
  effectiveDateIso: string;
  sections: LegalSection[];
  /** Official contact email shown in the contact section; empty to hide. */
  contactEmail: string;
  /** True while the document is still a placeholder (hidden from search engines). */
  placeholder: boolean;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
    siteName: string;
    keywords: string[];
  };
  brand: {
    name: string;
    tagline1: string;
    tagline2: string;
    taglineFull: string;
  };
  nav: {
    home: string;
    how: string;
    customers: string;
    business: string;
    faq: string;
    switchLabel: string;
    switchTo: string;
    cta: string;
    openMenu: string;
    closeMenu: string;
    skip: string;
  };
  hero: {
    eyebrow: string;
    supporting: string;
    primaryCta: string;
    secondaryCta: string;
    points: string[];
    screenLabel: string;
  };
  why: {
    eyebrow: string;
    title: string;
    intro: string;
    beforeTitle: string;
    afterTitle: string;
    pains: Step[];
    gains: Step[];
  };
  how: {
    eyebrow: string;
    title: string;
    intro: string;
    stagesTitle: string;
    stages: string[];
    customerTitle: string;
    customerSub: string;
    customer: Step[];
    merchantTitle: string;
    merchantSub: string;
    merchant: Step[];
  };
  customers: {
    eyebrow: string;
    title: string;
    intro: string;
    benefits: Item[];
  };
  business: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Item[];
    cta: string;
  };
  product: {
    eyebrow: string;
    title: string;
    intro: string;
    labels: {
      offer: string;
      contract: string;
      receipt: string;
      status: string;
      dispute: string;
    };
  };
  trust: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Item[];
    note: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Faq[];
  };
  businessCta: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    form: LeadFormCopy;
  };
  footer: {
    description: string;
    privacy: string;
    terms: string;
    contact: string;
    copyright: string;
    madeIn: string;
  };
  legal: {
    privacy: LegalDoc;
    terms: LegalDoc;
    back: string;
    contentsLabel: string;
    effectiveLabel: string;
    contactLabel: string;
  };
  notFound: { title: string; body: string; back: string };
  /** Copy used inside the product mockups. Kept factual and small. */
  mock: {
    offerTitle: string;
    offerNo: string;
    awaitingReview: string;
    merchant: string;
    customer: string;
    item: string;
    rentalValue: string;
    originalValue: string;
    duration: string;
    start: string;
    returnDate: string;
    branch: string;
    currency: string;
    days: string;
    reviewApprove: string;
    decline: string;
    activity: string;
    actIssued: string;
    actSent: string;
    actAwaiting: string;
    now: string;
    contractTitle: string;
    contractBetween: string;
    contractSubject: string;
    contractSubjectBody: string;
    contractTerm: string;
    contractTermBody: string;
    contractLiability: string;
    contractLiabilityBody: string;
    readNext: string;
    prev: string;
    documented: string;
    documentedOn: string;
    contractNote: string;
    viewContract: string;
    confirmReceipt: string;
    receivedFromCustomer: string;
    itemCondition: string;
    conditionGood: string;
    conditionNotes: string;
    handoverTime: string;
    closeRental: string;
    statusActive: string;
    rentalDetails: string;
    stageOf: string;
    readyToReturn: string;
    caseTitle: string;
    caseBanner: string;
    caseType: string;
    caseDamage: string;
    caseNoReturn: string;
    caseDesc: string;
    caseDescBody: string;
    evidence: string;
    claim: string;
    caseOpened: string;
    caseUnderReview: string;
    caseEvidenceAdded: string;
    caseStatus: string;
    approvedTitle: string;
    approvedBody: string;
    requestNo: string;
    dashboardTitle: string;
    dashboardStore: string;
    verifiedStore: string;
    statActive: string;
    statAwaiting: string;
    statReturns: string;
    statCases: string;
    needsAttention: string;
    issueNew: string;
    tagCustomerReview: string;
    tagLate: string;
    tagReturnTomorrow: string;
    sampleItem1: string;
    sampleItem2: string;
    sampleItem3: string;
    sampleStore: string;
    sampleBranch: string;
    sampleCustomer: string;
    contractApproved: string;
    customerConfirmed: string;
    customerPhone: string;
  };
};
