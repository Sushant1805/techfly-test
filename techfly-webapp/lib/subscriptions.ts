export type SubscriptionHealth = "Healthy" | "At Risk" | "New" | "Churned";
export type SubscriptionStatus = "Active" | "Trial" | "Expired" | "Pending" | "Suspended" | "Cancelled";

export interface Subscription {
  id: string;
  customerId: string;
  customerName: string;
  ownerName: string;
  ownerAvatar: string;
  city: string;
  plan: "Free" | "Basic" | "Pro";
  previousPlan: "Free" | "Basic" | "Pro" | null;
  planStatus: SubscriptionStatus;
  billingCycle: "Monthly" | "Annual" | null;
  mrr: number;
  arr: number;
  startDate: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialStartDate: string | null;
  trialEndDate: string | null;
  trialDaysRemaining: number | null;
  daysUntilExpiry: number | null;
  daysActive: number;
  autoRenew: boolean;
  cancelledAt: string | null;
  cancelReason: string | null;
  suspendedAt: string | null;
  suspendReason: string | null;
  paymentMode: string | null;
  lastPaymentDate: string | null;
  lastPaymentAmount: number | null;
  nextBillingDate: string | null;
  nextBillingAmount: number | null;
  totalPaid: number;
  failedPayments: number;
  assignedTo: string;
  health: SubscriptionHealth;
}

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface PlanConfig {
  id: string;
  name: "Free" | "Basic" | "Pro";
  color: string;
  monthlyPrice: number;
  annualPrice: number;
  annualDiscount: number;
  maxStudents: number | "Unlimited";
  maxBatches: number | "Unlimited";
  maxTeachers: number | "Unlimited";
  features: PlanFeature[];
  isPopular: boolean;
  customersCount: number;
  mrr: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  ownerName: string;
  customerEmail: string;
  customerAddress: string;
  customerGst: string | null;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  plan: string;
  billingCycle: string;
  description: string;
  periodFrom: string;
  periodTo: string;
  baseAmount: number;
  cgst: number;
  sgst: number;
  totalAmount: number;
  status: "Paid" | "Pending" | "Overdue";
  paymentDate: string | null;
  paymentMode: string | null;
  transactionId: string | null;
  sentToCustomer: boolean;
  generatedBy: string;
  createdAt: string;
}

export interface SubscriptionHistoryEvent {
  id: string;
  subscriptionId: string;
  type: "created" | "renewed" | "upgraded" | "downgraded" | "cancelled" | "suspended" | "reactivated" | "extended";
  fromPlan: string | null;
  toPlan: string | null;
  amount: number | null;
  performedBy: string;
  notes: string | null;
  timestamp: string;
}

export const plans: PlanConfig[] = [
  {
    id: "PLAN001",
    name: "Free",
    color: "#888780",
    monthlyPrice: 0,
    annualPrice: 0,
    annualDiscount: 0,
    maxStudents: 50,
    maxBatches: 1,
    maxTeachers: 2,
    features: [
      { name: "Student Management",    included: true  },
      { name: "Attendance Marking",    included: true  },
      { name: "Basic Fee Records",     included: true  },
      { name: "1 Batch",               included: true  },
      { name: "Fee Management",        included: false },
      { name: "Test & Exam Module",    included: false },
      { name: "Timetable",             included: false },
      { name: "Assignments",           included: false },
      { name: "Analytics",             included: false },
      { name: "AI Timetable Gen",      included: false },
      { name: "SMS Notifications",     included: false },
      { name: "WhatsApp Notifications",included: false },
      { name: "Data Export",           included: false },
      { name: "Priority Support",      included: false },
      { name: "Custom Branding",       included: false },
    ],
    isPopular: false,
    customersCount: 2,
    mrr: 0,
  },
  {
    id: "PLAN002",
    name: "Basic",
    color: "#185FA5",
    monthlyPrice: 500,
    annualPrice: 5000,
    annualDiscount: 17,
    maxStudents: 200,
    maxBatches: 5,
    maxTeachers: 5,
    features: [
      { name: "Student Management",    included: true  },
      { name: "Attendance Marking",    included: true  },
      { name: "Basic Fee Records",     included: true  },
      { name: "Up to 5 Batches",       included: true  },
      { name: "Fee Management",        included: true  },
      { name: "Test & Exam Module",    included: true  },
      { name: "Timetable",             included: true  },
      { name: "Assignments",           included: true  },
      { name: "Analytics",             included: false },
      { name: "AI Timetable Gen",      included: false },
      { name: "SMS Notifications",     included: true  },
      { name: "WhatsApp Notifications",included: false },
      { name: "Data Export",           included: true  },
      { name: "Priority Support",      included: false },
      { name: "Custom Branding",       included: false },
    ],
    isPopular: true,
    customersCount: 5,
    mrr: 2000,
  },
  {
    id: "PLAN003",
    name: "Pro",
    color: "#5E4E99",
    monthlyPrice: 1000,
    annualPrice: 10000,
    annualDiscount: 17,
    maxStudents: "Unlimited",
    maxBatches: "Unlimited",
    maxTeachers: "Unlimited",
    features: [
      { name: "Student Management",    included: true  },
      { name: "Attendance Marking",    included: true  },
      { name: "Basic Fee Records",     included: true  },
      { name: "Unlimited Batches",     included: true  },
      { name: "Fee Management",        included: true  },
      { name: "Test & Exam Module",    included: true  },
      { name: "Timetable",             included: true  },
      { name: "Assignments",           included: true  },
      { name: "Full Analytics",        included: true  },
      { name: "AI Timetable Gen",      included: true  },
      { name: "SMS Notifications",     included: true  },
      { name: "WhatsApp Notifications",included: true  },
      { name: "Data Export",           included: true  },
      { name: "Priority Support",      included: true  },
      { name: "Custom Branding",       included: true  },
    ],
    isPopular: false,
    customersCount: 6,
    mrr: 6000,
  },
];

export const subscriptions: Subscription[] = [
  {
    id: "SUB001",
    customerId: "CUS001",
    customerName: "Raj Science Classes",
    ownerName: "Rajesh Mehta",
    ownerAvatar: "RM",
    city: "Pune",
    plan: "Pro",
    previousPlan: "Basic",
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 1000,
    arr: 12000,
    startDate: "2025-01-01",
    currentPeriodStart: "2026-01-01",
    currentPeriodEnd: "2026-12-31",
    trialStartDate: null,
    trialEndDate: null,
    trialDaysRemaining: null,
    daysUntilExpiry: 264,
    daysActive: 466,
    autoRenew: true,
    cancelledAt: null,
    cancelReason: null,
    suspendedAt: null,
    suspendReason: null,
    paymentMode: "Bank Transfer",
    lastPaymentDate: "2026-01-01",
    lastPaymentAmount: 10000,
    nextBillingDate: "2027-01-01",
    nextBillingAmount: 10000,
    totalPaid: 22000,
    failedPayments: 0,
    assignedTo: "Vikram Shah",
    health: "Healthy"
  },
  {
    id: "SUB002",
    customerId: "CUS002",
    customerName: "Mentor IIT Academy",
    ownerName: "Sumit Singh",
    ownerAvatar: "SS",
    city: "Delhi",
    plan: "Basic",
    previousPlan: null,
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 500,
    arr: 6000,
    startDate: "2025-03-01",
    currentPeriodStart: "2026-03-01",
    currentPeriodEnd: "2027-02-28",
    trialStartDate: null,
    trialEndDate: null,
    trialDaysRemaining: null,
    daysUntilExpiry: 323,
    daysActive: 407,
    autoRenew: true,
    cancelledAt: null,
    cancelReason: null,
    suspendedAt: null,
    suspendReason: null,
    paymentMode: "Bank Transfer",
    lastPaymentDate: "2026-03-01",
    lastPaymentAmount: 6000,
    nextBillingDate: "2027-03-01",
    nextBillingAmount: 6000,
    totalPaid: 9000,
    failedPayments: 0,
    assignedTo: "Vikram Shah",
    health: "Healthy"
  },
  {
    id: "SUB003",
    customerId: "CUS003",
    customerName: "Bright Future Coaching",
    ownerName: "Amit Verma",
    ownerAvatar: "AV",
    city: "Mumbai",
    plan: "Pro",
    previousPlan: null,
    planStatus: "Trial",
    billingCycle: null,
    mrr: 0,
    arr: 0,
    startDate: "2026-04-11",
    currentPeriodStart: "2026-04-11",
    currentPeriodEnd: "2026-04-25",
    trialStartDate: "2026-04-11",
    trialEndDate: "2026-04-25",
    trialDaysRemaining: 14,
    daysUntilExpiry: 14,
    daysActive: 1,
    autoRenew: false,
    cancelledAt: null,
    cancelReason: null,
    suspendedAt: null,
    suspendReason: null,
    paymentMode: null,
    lastPaymentDate: null,
    lastPaymentAmount: null,
    nextBillingDate: null,
    nextBillingAmount: null,
    totalPaid: 0,
    failedPayments: 0,
    assignedTo: "Vikram Shah",
    health: "New"
  },
  {
    id: "SUB004",
    customerId: "CUS004",
    customerName: "Excel Study Hub",
    ownerName: "Neelam Kher",
    ownerAvatar: "NK",
    city: "Bangalore",
    plan: "Free",
    previousPlan: null,
    planStatus: "Expired",
    billingCycle: null,
    mrr: 0,
    arr: 0,
    startDate: "2024-08-01",
    currentPeriodStart: "2024-08-01",
    currentPeriodEnd: "2026-01-31",
    trialStartDate: null,
    trialEndDate: null,
    trialDaysRemaining: null,
    daysUntilExpiry: -90,
    daysActive: 619,
    autoRenew: false,
    cancelledAt: null,
    cancelReason: null,
    suspendedAt: null,
    suspendReason: null,
    paymentMode: null,
    lastPaymentDate: null,
    lastPaymentAmount: null,
    nextBillingDate: null,
    nextBillingAmount: null,
    totalPaid: 0,
    failedPayments: 0,
    assignedTo: "Vikram Shah",
    health: "Churned"
  },
  {
    id: "SUB005",
    customerId: "CUS005",
    customerName: "Pinnacle Tutorials",
    ownerName: "Meena Kulkarni",
    ownerAvatar: "MK",
    city: "Pune",
    plan: "Basic",
    previousPlan: null,
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 500,
    arr: 6000,
    startDate: "2025-09-01",
    currentPeriodStart: "2025-09-01",
    currentPeriodEnd: "2026-08-31",
    trialStartDate: null,
    trialEndDate: null,
    trialDaysRemaining: null,
    daysUntilExpiry: 142,
    daysActive: 223,
    autoRenew: true,
    cancelledAt: null,
    cancelReason: null,
    suspendedAt: null,
    suspendReason: null,
    paymentMode: "Card",
    lastPaymentDate: "2025-09-01",
    lastPaymentAmount: 4500,
    nextBillingDate: "2026-09-01",
    nextBillingAmount: 6000,
    totalPaid: 4500,
    failedPayments: 0,
    assignedTo: "Vikram Shah",
    health: "Healthy"
  },
  {
    id: "SUB006",
    customerId: "CUS006",
    customerName: "Vidya Mandir Classes",
    ownerName: "Sanjay Joshi",
    ownerAvatar: "SJ",
    city: "Nashik",
    plan: "Pro",
    previousPlan: null,
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 1000,
    arr: 12000,
    startDate: "2024-11-01",
    currentPeriodStart: "2025-11-01",
    currentPeriodEnd: "2026-10-31",
    trialStartDate: null,
    trialEndDate: null,
    trialDaysRemaining: null,
    daysUntilExpiry: 203,
    daysActive: 527,
    autoRenew: true,
    cancelledAt: null,
    cancelReason: null,
    suspendedAt: null,
    suspendReason: null,
    paymentMode: "Bank Transfer",
    lastPaymentDate: "2025-11-01",
    lastPaymentAmount: 10000,
    nextBillingDate: "2026-11-01",
    nextBillingAmount: 10000,
    totalPaid: 18000,
    failedPayments: 0,
    assignedTo: "Vikram Shah",
    health: "Healthy"
  },
  {
    id: "SUB007",
    customerId: "CUS007",
    customerName: "Lakshya Institute",
    ownerName: "Deepak Rawat",
    ownerAvatar: "DR",
    city: "Dehradun",
    plan: "Basic",
    previousPlan: null,
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 500,
    arr: 6000,
    startDate: "2025-02-01",
    currentPeriodStart: "2026-02-01",
    currentPeriodEnd: "2027-01-31",
    trialStartDate: null,
    trialEndDate: null,
    trialDaysRemaining: null,
    daysUntilExpiry: 295,
    daysActive: 435,
    autoRenew: false,
    cancelledAt: null,
    cancelReason: null,
    suspendedAt: null,
    suspendReason: null,
    paymentMode: "UPI",
    lastPaymentDate: "2026-02-01",
    lastPaymentAmount: 4000,
    nextBillingDate: "2027-02-01",
    nextBillingAmount: 6000,
    totalPaid: 4000,
    failedPayments: 0,
    assignedTo: "Vikram Shah",
    health: "At Risk"
  },
  {
    id: "SUB008",
    customerId: "CUS008",
    customerName: "Vision Coaching",
    ownerName: "Anjali Gupta",
    ownerAvatar: "AG",
    city: "Jaipur",
    plan: "Free",
    previousPlan: null,
    planStatus: "Active",
    billingCycle: null,
    mrr: 0,
    arr: 0,
    startDate: "2026-01-01",
    currentPeriodStart: "2026-01-01",
    currentPeriodEnd: "2026-12-31",
    trialStartDate: null,
    trialEndDate: null,
    trialDaysRemaining: null,
    daysUntilExpiry: 264,
    daysActive: 102,
    autoRenew: false,
    cancelledAt: null,
    cancelReason: null,
    suspendedAt: null,
    suspendReason: null,
    paymentMode: null,
    lastPaymentDate: null,
    lastPaymentAmount: null,
    nextBillingDate: null,
    nextBillingAmount: null,
    totalPaid: 0,
    failedPayments: 0,
    assignedTo: "Vikram Shah",
    health: "New"
  },
  {
    id: "SUB009",
    customerId: "CUS009",
    customerName: "Focus Academy",
    ownerName: "Rahul Bansal",
    ownerAvatar: "RB",
    city: "Chandigarh",
    plan: "Pro",
    previousPlan: null,
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 1000,
    arr: 12000,
    startDate: "2024-10-01",
    currentPeriodStart: "2025-10-01",
    currentPeriodEnd: "2026-09-30",
    trialStartDate: null,
    trialEndDate: null,
    trialDaysRemaining: null,
    daysUntilExpiry: 172,
    daysActive: 558,
    autoRenew: true,
    cancelledAt: null,
    cancelReason: null,
    suspendedAt: null,
    suspendReason: null,
    paymentMode: "Card",
    lastPaymentDate: "2025-10-01",
    lastPaymentAmount: 10000,
    nextBillingDate: "2026-10-01",
    nextBillingAmount: 10000,
    totalPaid: 16000,
    failedPayments: 0,
    assignedTo: "Vikram Shah",
    health: "Healthy"
  },
  {
    id: "SUB010",
    customerId: "CUS10",
    customerName: "Star Coaching Centre",
    ownerName: "Pooja Hegde",
    ownerAvatar: "PH",
    city: "Mysore",
    plan: "Basic",
    previousPlan: null,
    planStatus: "Pending",
    billingCycle: null,
    mrr: 500,
    arr: 6000,
    startDate: "2026-04-10",
    currentPeriodStart: "2026-04-10",
    currentPeriodEnd: "2027-04-09",
    trialStartDate: null,
    trialEndDate: null,
    trialDaysRemaining: null,
    daysUntilExpiry: 363,
    daysActive: 2,
    autoRenew: false,
    cancelledAt: null,
    cancelReason: null,
    suspendedAt: null,
    suspendReason: null,
    paymentMode: null,
    lastPaymentDate: null,
    lastPaymentAmount: null,
    nextBillingDate: null,
    nextBillingAmount: null,
    totalPaid: 0,
    failedPayments: 0,
    assignedTo: "Vikram Shah",
    health: "New"
  },
  {
    id: "SUB011",
    customerId: "CUS11",
    customerName: "NextGen Academy",
    ownerName: "Karan Johar",
    ownerAvatar: "KJ",
    city: "Lucknow",
    plan: "Pro",
    previousPlan: null,
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 1000,
    arr: 12000,
    startDate: "2024-12-01",
    currentPeriodStart: "2025-12-01",
    currentPeriodEnd: "2026-11-30",
    trialStartDate: null,
    trialEndDate: null,
    trialDaysRemaining: null,
    daysUntilExpiry: 233,
    daysActive: 497,
    autoRenew: true,
    cancelledAt: null,
    cancelReason: null,
    suspendedAt: null,
    suspendReason: null,
    paymentMode: "UPI",
    lastPaymentDate: "2025-12-01",
    lastPaymentAmount: 10000,
    nextBillingDate: "2026-12-01",
    nextBillingAmount: 10000,
    totalPaid: 16000,
    failedPayments: 0,
    assignedTo: "Vikram Shah",
    health: "Healthy"
  },
  {
    id: "SUB012",
    customerId: "CUS12",
    customerName: "Gurukripa Classes",
    ownerName: "Lalit Modi",
    ownerAvatar: "LM",
    city: "Indore",
    plan: "Basic",
    previousPlan: null,
    planStatus: "Expired",
    billingCycle: null,
    mrr: 0,
    arr: 0,
    startDate: "2024-05-01",
    currentPeriodStart: "2024-05-01",
    currentPeriodEnd: "2025-05-01",
    trialStartDate: null,
    trialEndDate: null,
    trialDaysRemaining: null,
    daysUntilExpiry: -346,
    daysActive: 711,
    autoRenew: false,
    cancelledAt: null,
    cancelReason: null,
    suspendedAt: null,
    suspendReason: null,
    paymentMode: null,
    lastPaymentDate: "2024-05-01",
    lastPaymentAmount: 6000,
    nextBillingDate: null,
    nextBillingAmount: null,
    totalPaid: 6000,
    failedPayments: 0,
    assignedTo: "Vikram Shah",
    health: "Churned"
  }
];

export const invoices: Invoice[] = [
  {
    id: "INV001",
    customerId: "CUS001",
    customerName: "Raj Science Classes",
    ownerName: "Rajesh Mehta",
    customerEmail: "raj@rajclasses.in",
    customerAddress: "15, Shivaji Nagar, Pune, Maharashtra – 411005",
    customerGst: "27AABCR1234M1Z5",
    invoiceNumber: "INV-2026-001",
    date: "2026-01-01",
    dueDate: "2026-01-10",
    plan: "Pro",
    billingCycle: "Annual",
    description: "EzzyCoach Pro Plan — Annual Subscription",
    periodFrom: "2026-01-01",
    periodTo: "2026-12-31",
    baseAmount: 10000,
    cgst: 900,
    sgst: 900,
    totalAmount: 11800,
    status: "Paid",
    paymentDate: "2026-01-02",
    paymentMode: "Bank Transfer",
    transactionId: "TXN2026001234",
    sentToCustomer: true,
    generatedBy: "System",
    createdAt: "2026-01-01T10:00:00Z"
  },
  {
    id: "INV002",
    customerId: "CUS007",
    customerName: "Lakshya Institute",
    ownerName: "Deepak Rawat",
    customerEmail: "deepak@lakshya.in",
    customerAddress: "Rajpur Road, Dehradun",
    customerGst: null,
    invoiceNumber: "INV-2026-002",
    date: "2026-02-01",
    dueDate: "2026-02-10",
    plan: "Basic",
    billingCycle: "Annual",
    description: "EzzyCoach Basic Plan — Annual Subscription",
    periodFrom: "2026-02-01",
    periodTo: "2027-01-31",
    baseAmount: 4000,
    cgst: 360,
    sgst: 360,
    totalAmount: 4720,
    status: "Paid",
    paymentDate: "2026-02-01",
    paymentMode: "UPI",
    transactionId: "TXN2026001235",
    sentToCustomer: true,
    generatedBy: "System",
    createdAt: "2026-02-01T11:00:00Z"
  },
  {
    id: "INV003",
    customerId: "CUS010",
    customerName: "Star Coaching Centre",
    ownerName: "Pooja Hegde",
    customerEmail: "pooja@starcoaching.com",
    customerAddress: "Mysore Palace Rd, Mysore",
    customerGst: null,
    invoiceNumber: "INV-2026-003",
    date: "2026-04-10",
    dueDate: "2026-04-20",
    plan: "Basic",
    billingCycle: "Annual",
    description: "EzzyCoach Basic Plan — Annual Subscription",
    periodFrom: "2026-04-10",
    periodTo: "2027-04-09",
    baseAmount: 5000,
    cgst: 450,
    sgst: 450,
    totalAmount: 5900,
    status: "Pending",
    paymentDate: null,
    paymentMode: null,
    transactionId: null,
    sentToCustomer: true,
    generatedBy: "Vikram Shah",
    createdAt: "2026-04-10T09:30:00Z"
  }
];

export const historyItems: SubscriptionHistoryEvent[] = [
  {
    id: "HIST001",
    subscriptionId: "SUB001",
    type: "renewed",
    fromPlan: "Pro",
    toPlan: "Pro",
    amount: 10000,
    performedBy: "System",
    notes: "Auto-renewal successful",
    timestamp: "2026-01-01T00:00:01Z"
  },
  {
    id: "HIST002",
    subscriptionId: "SUB001",
    type: "upgraded",
    fromPlan: "Basic",
    toPlan: "Pro",
    amount: 10000,
    performedBy: "Vikram Shah",
    notes: "Upgraded from Basic to Pro Annual",
    timestamp: "2025-03-01T15:30:00Z"
  }
];
