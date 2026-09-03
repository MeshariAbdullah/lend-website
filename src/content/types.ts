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
    placeholder: {
      title: string;
      body: string;
      listTitle: string;
      list: string[];
      note: string;
      close: string;
    };
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
    privacy: { title: string; body: string; updated: string };
    terms: { title: string; body: string; updated: string };
    back: string;
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
