export type CustomerPlan = "Free" | "Basic" | "Pro";
export type CustomerStatus = "Active" | "Trial" | "Expired" | "Pending" | "Suspended";
export type CustomerSource = "Google Ad" | "Referral" | "Website" | "Cold Call" | "Exhibition" | "Social Media";
export type CustomerTag = "VIP" | "Champion" | "At Risk" | "Trial" | "New" | "Churned";
export type ActivityType = "signup" | "plan_change" | "payment" | "login" | "support" | "feature_use" | "renewal" | "expiry" | "note";
export type NoteCategory = "General" | "Sales" | "Technical" | "Billing" | "Follow-up";
export type NotePriority = "Normal" | "Important" | "Urgent";
export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
export type TicketPriority = "Low" | "Medium" | "High" | "Critical";

export interface TicketMessage {
  id: string;
  sender: string;
  senderType: "Customer" | "TechFly";
  message: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  resolvedAt: string | null;
  assignedTo: string;
  messages: TicketMessage[];
}

export interface CustomerInvoice {
  id: string;
  customerId: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  gstPercent: number;
  gstAmount: number;
  totalWithGst: number;
  plan: string;
  billingCycle: string;
  status: "Paid" | "Pending" | "Overdue";
  paymentDate: string | null;
  paymentMode: string | null;
  transactionId: string | null;
}

export interface CustomerNote {
  id: string;
  customerId: string;
  text: string;
  category: NoteCategory;
  priority: NotePriority;
  addedBy: string;
  addedByAvatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerActivity {
  id: string;
  customerId: string;
  type: ActivityType;
  title: string;
  description: string;
  performedBy: string;
  timestamp: string;
}

export interface Customer {
  id: string;
  instituteName: string;
  ownerName: string;
  ownerAvatar: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  address: string;
  website: string | null;
  gstNumber: string | null;
  plan: CustomerPlan;
  planStatus: CustomerStatus;
  billingCycle: "Monthly" | "Annual";
  mrr: number;
  totalRevenue: number;
  startDate: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialEndDate: string | null;
  daysUntilExpiry: number | null;
  autoRenew: boolean;
  paymentMode: "UPI" | "Bank Transfer" | "Cheque" | "Card" | null;
  source: CustomerSource;
  referredBy: string | null;
  assignedTo: string;
  totalStudents: number;
  totalBatches: number;
  totalTeachers: number;
  lastLoginDate: string;
  lastLoginBy: string;
  activeFeatures: string[];
  supportTicketsOpen: number;
  supportTicketsTotal: number;
  npsScore: number | null;
  notes: string;
  tags: CustomerTag[];
  createdAt: string;
  updatedAt: string;
}

export const teamMembers = [
  { id: "TM001", name: "Vikram Shah", role: "Super Admin", avatar: "VS" },
  { id: "TM002", name: "Neha Gupta", role: "Admin", avatar: "NG" },
  { id: "TM003", name: "Ravi Tiwari", role: "Sales Executive", avatar: "RT" },
  { id: "TM004", name: "Pooja Mehta", role: "Sales Executive", avatar: "PM" },
  { id: "TM005", name: "Sanjay More", role: "Support", avatar: "SM" },
];

export const customers: Customer[] = [
  {
    id: "CUS001",
    instituteName: "Raj Science Classes",
    ownerName: "Rajesh Mehta",
    ownerAvatar: "RM",
    phone: "9876540001",
    email: "raj@rajclasses.in",
    city: "Pune",
    state: "MH",
    address: "15, Shivaji Nagar, Pune - 411005",
    website: "www.rajscienceclasses.in",
    gstNumber: "27AABCR1234M1Z5",
    plan: "Pro",
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 1000,
    totalRevenue: 22000,
    startDate: "05 Jan 2025",
    currentPeriodStart: "01 Jan 2026",
    currentPeriodEnd: "31 Dec 2026",
    trialEndDate: null,
    daysUntilExpiry: 264,
    autoRenew: true,
    paymentMode: "Bank Transfer",
    source: "Google Ad",
    referredBy: null,
    assignedTo: "Vikram Shah",
    totalStudents: 348,
    totalBatches: 5,
    totalTeachers: 5,
    lastLoginDate: "11 Apr 2026",
    lastLoginBy: "Admin",
    activeFeatures: ["Attendance", "Fees", "Tests", "Timetable", "AI Generator", "Analytics"],
    supportTicketsOpen: 1,
    supportTicketsTotal: 12,
    npsScore: 9,
    notes: "Owner very satisfied, upsell opportunity for multi-branch",
    tags: ["VIP", "Champion"],
    createdAt: "2025-01-05T10:00:00Z",
    updatedAt: "2026-04-11T09:42:00Z"
  },
  {
    id: "CUS002",
    instituteName: "Mentor IIT Academy",
    ownerName: "Suresh Kumar",
    ownerAvatar: "SK",
    phone: "9876540002",
    email: "mentor@iit.in",
    city: "Mumbai",
    state: "MH",
    address: "Bandra West, Mumbai",
    website: "www.mentoriit.in",
    gstNumber: null,
    plan: "Basic",
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 500,
    totalRevenue: 9000,
    startDate: "10 Mar 2025",
    currentPeriodStart: "10 Mar 2026",
    currentPeriodEnd: "09 Mar 2027",
    trialEndDate: null,
    daysUntilExpiry: 330,
    autoRenew: true,
    paymentMode: "UPI",
    source: "Referral",
    referredBy: "CUS001",
    assignedTo: "Neha Gupta",
    totalStudents: 210,
    totalBatches: 4,
    totalTeachers: 3,
    lastLoginDate: "10 Apr 2026",
    lastLoginBy: "Admin",
    activeFeatures: ["Attendance", "Fees"],
    supportTicketsOpen: 0,
    supportTicketsTotal: 5,
    npsScore: 8,
    notes: "",
    tags: ["Champion"],
    createdAt: "2025-03-10T11:00:00Z",
    updatedAt: "2026-04-10T12:00:00Z"
  },
  {
    id: "CUS003",
    instituteName: "Bright Future Coaching",
    ownerName: "Anita Desai",
    ownerAvatar: "AD",
    phone: "9876540003",
    email: "bright@future.in",
    city: "Nagpur",
    state: "MH",
    address: "Nagpur Road, Nagpur",
    website: null,
    gstNumber: null,
    plan: "Pro",
    planStatus: "Trial",
    billingCycle: "Monthly",
    mrr: 0,
    totalRevenue: 0,
    startDate: "01 Apr 2026",
    currentPeriodStart: "01 Apr 2026",
    currentPeriodEnd: "15 Apr 2026",
    trialEndDate: "25 Apr 2026",
    daysUntilExpiry: 14,
    autoRenew: false,
    paymentMode: null,
    source: "Referral",
    referredBy: "CUS002",
    assignedTo: "Ravi Tiwari",
    totalStudents: 0,
    totalBatches: 0,
    totalTeachers: 0,
    lastLoginDate: "05 Apr 2026",
    lastLoginBy: "Customer",
    activeFeatures: [],
    supportTicketsOpen: 0,
    supportTicketsTotal: 0,
    npsScore: null,
    notes: "",
    tags: ["Trial"],
    createdAt: "2026-04-01T09:00:00Z",
    updatedAt: "2026-04-05T08:00:00Z"
  },
  {
    id: "CUS004",
    instituteName: "Excel Study Hub",
    ownerName: "Prakash Jain",
    ownerAvatar: "PJ",
    phone: "9876540004",
    email: "excel@study.in",
    city: "Nashik",
    state: "MH",
    address: "College Road, Nashik",
    website: null,
    gstNumber: null,
    plan: "Free",
    planStatus: "Expired",
    billingCycle: "Monthly",
    mrr: 0,
    totalRevenue: 0,
    startDate: "15 Aug 2024",
    currentPeriodStart: "15 Jan 2026",
    currentPeriodEnd: "15 Feb 2026",
    trialEndDate: null,
    daysUntilExpiry: 0,
    autoRenew: false,
    paymentMode: null,
    source: "Website",
    referredBy: null,
    assignedTo: "Pooja Mehta",
    totalStudents: 45,
    totalBatches: 1,
    totalTeachers: 1,
    lastLoginDate: "20 Jan 2026",
    lastLoginBy: "Admin",
    activeFeatures: [],
    supportTicketsOpen: 0,
    supportTicketsTotal: 2,
    npsScore: 5,
    notes: "",
    tags: ["At Risk"],
    createdAt: "2024-08-15T10:00:00Z",
    updatedAt: "2026-01-20T10:00:00Z"
  },
  {
    id: "CUS005",
    instituteName: "Pinnacle Tutorials",
    ownerName: "Meena Kulkarni",
    ownerAvatar: "MK",
    phone: "9876540005",
    email: "pinnacle@tut.in",
    city: "Pune",
    state: "MH",
    address: "Kothrud, Pune",
    website: null,
    gstNumber: null,
    plan: "Basic",
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 500,
    totalRevenue: 4500,
    startDate: "05 Sep 2025",
    currentPeriodStart: "05 Sep 2025",
    currentPeriodEnd: "04 Sep 2026",
    trialEndDate: null,
    daysUntilExpiry: 145,
    autoRenew: true,
    paymentMode: "UPI",
    source: "Referral",
    referredBy: "CUS001",
    assignedTo: "Neha Gupta",
    totalStudents: 189,
    totalBatches: 3,
    totalTeachers: 4,
    lastLoginDate: "11 Apr 2026",
    lastLoginBy: "Admin",
    activeFeatures: ["Attendance", "Fees", "Timetable"],
    supportTicketsOpen: 0,
    supportTicketsTotal: 3,
    npsScore: 7,
    notes: "",
    tags: [],
    createdAt: "2025-09-05T12:00:00Z",
    updatedAt: "2026-04-11T12:00:00Z"
  },
  {
    id: "CUS006",
    instituteName: "Vidya Mandir Classes",
    ownerName: "Arun Patil",
    ownerAvatar: "AP",
    phone: "9876540006",
    email: "vidya@mandir.in",
    city: "Aurangabad",
    state: "MH",
    address: "Cidco, Aurangabad",
    website: null,
    gstNumber: null,
    plan: "Pro",
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 1000,
    totalRevenue: 18000,
    startDate: "01 Nov 2024",
    currentPeriodStart: "01 Nov 2025",
    currentPeriodEnd: "31 Oct 2026",
    trialEndDate: null,
    daysUntilExpiry: 202,
    autoRenew: true,
    paymentMode: "Bank Transfer",
    source: "Cold Call",
    referredBy: null,
    assignedTo: "Ravi Tiwari",
    totalStudents: 295,
    totalBatches: 6,
    totalTeachers: 6,
    lastLoginDate: "10 Apr 2026",
    lastLoginBy: "Admin",
    activeFeatures: ["Attendance", "Fees", "Tests"],
    supportTicketsOpen: 0,
    supportTicketsTotal: 8,
    npsScore: 8,
    notes: "",
    tags: ["VIP"],
    createdAt: "2024-11-01T09:00:00Z",
    updatedAt: "2026-04-10T09:00:00Z"
  },
  {
    id: "CUS007",
    instituteName: "Lakshya Institute",
    ownerName: "Priya Desai",
    ownerAvatar: "PD",
    phone: "9876540007",
    email: "lakshya@inst.in",
    city: "Solapur",
    state: "MH",
    address: "Solapur City",
    website: null,
    gstNumber: null,
    plan: "Basic",
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 500,
    totalRevenue: 4000,
    startDate: "15 Feb 2025",
    currentPeriodStart: "15 Feb 2026",
    currentPeriodEnd: "14 Feb 2027",
    trialEndDate: null,
    daysUntilExpiry: 308,
    autoRenew: true,
    paymentMode: "UPI",
    source: "Google Ad",
    referredBy: null,
    assignedTo: "Ravi Tiwari",
    totalStudents: 156,
    totalBatches: 3,
    totalTeachers: 2,
    lastLoginDate: "08 Apr 2026",
    lastLoginBy: "Admin",
    activeFeatures: ["Attendance"],
    supportTicketsOpen: 0,
    supportTicketsTotal: 4,
    npsScore: 6,
    notes: "",
    tags: [],
    createdAt: "2025-02-15T11:00:00Z",
    updatedAt: "2026-04-08T11:00:00Z"
  },
  {
    id: "CUS008",
    instituteName: "Vision Coaching",
    ownerName: "Sunil Rao",
    ownerAvatar: "SR",
    phone: "9876540008",
    email: "vision@coach.in",
    city: "Mumbai",
    state: "MH",
    address: "Dharavi, Mumbai",
    website: null,
    gstNumber: null,
    plan: "Free",
    planStatus: "Active",
    billingCycle: "Monthly",
    mrr: 0,
    totalRevenue: 0,
    startDate: "01 Jan 2026",
    currentPeriodStart: "01 Jan 2026",
    currentPeriodEnd: "—",
    trialEndDate: null,
    daysUntilExpiry: null,
    autoRenew: false,
    paymentMode: null,
    source: "Website",
    referredBy: null,
    assignedTo: "Pooja Mehta",
    totalStudents: 38,
    totalBatches: 1,
    totalTeachers: 1,
    lastLoginDate: "11 Apr 2026",
    lastLoginBy: "Admin",
    activeFeatures: ["Attendance"],
    supportTicketsOpen: 0,
    supportTicketsTotal: 1,
    npsScore: null,
    notes: "",
    tags: [],
    createdAt: "2026-01-01T10:00:00Z",
    updatedAt: "2026-04-11T10:00:00Z"
  },
  {
    id: "CUS009",
    instituteName: "Focus Academy",
    ownerName: "Rahul Shah",
    ownerAvatar: "RS",
    phone: "9876540009",
    email: "focus@acad.in",
    city: "Pune",
    state: "MH",
    address: "Hinjewadi, Pune",
    website: null,
    gstNumber: null,
    plan: "Pro",
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 1000,
    totalRevenue: 16000,
    startDate: "20 Oct 2024",
    currentPeriodStart: "20 Oct 2025",
    currentPeriodEnd: "19 Oct 2026",
    trialEndDate: null,
    daysUntilExpiry: 190,
    autoRenew: true,
    paymentMode: "Bank Transfer",
    source: "Referral",
    referredBy: "CUS001",
    assignedTo: "Vikram Shah",
    totalStudents: 268,
    totalBatches: 5,
    totalTeachers: 4,
    lastLoginDate: "10 Apr 2026",
    lastLoginBy: "Admin",
    activeFeatures: ["Attendance", "Fees", "Tests", "Timetable", "Analytics"],
    supportTicketsOpen: 0,
    supportTicketsTotal: 9,
    npsScore: 9,
    notes: "",
    tags: ["Champion", "VIP"],
    createdAt: "2024-10-20T10:00:00Z",
    updatedAt: "2026-04-10T10:00:00Z"
  },
  {
    id: "CUS010",
    instituteName: "Star Coaching Centre",
    ownerName: "Ramesh Patil",
    ownerAvatar: "RP",
    phone: "9876540010",
    email: "star@coaching.in",
    city: "Kolhapur",
    state: "MH",
    address: "Kolhapur Road",
    website: null,
    gstNumber: null,
    plan: "Basic",
    planStatus: "Pending",
    billingCycle: "Monthly",
    mrr: 500,
    totalRevenue: 0,
    startDate: "—",
    currentPeriodStart: "—",
    currentPeriodEnd: "—",
    trialEndDate: null,
    daysUntilExpiry: null,
    autoRenew: false,
    paymentMode: null,
    source: "Social Media",
    referredBy: null,
    assignedTo: "Pooja Mehta",
    totalStudents: 0,
    totalBatches: 0,
    totalTeachers: 0,
    lastLoginDate: "Never",
    lastLoginBy: "N/A",
    activeFeatures: [],
    supportTicketsOpen: 0,
    supportTicketsTotal: 0,
    npsScore: null,
    notes: "Demo done",
    tags: ["New"],
    createdAt: "2026-04-10T15:00:00Z",
    updatedAt: "2026-04-10T15:00:00Z"
  },
  {
    id: "CUS011",
    instituteName: "NextGen Academy",
    ownerName: "Anil Thakur",
    ownerAvatar: "AT",
    phone: "9876540011",
    email: "nextgen@acad.in",
    city: "Hyderabad",
    state: "TS",
    address: "Hyderabad Tech Park",
    website: null,
    gstNumber: null,
    plan: "Pro",
    planStatus: "Active",
    billingCycle: "Annual",
    mrr: 1000,
    totalRevenue: 16000,
    startDate: "01 Dec 2024",
    currentPeriodStart: "01 Dec 2025",
    currentPeriodEnd: "30 Nov 2026",
    trialEndDate: null,
    daysUntilExpiry: 232,
    autoRenew: true,
    paymentMode: "Card",
    source: "Exhibition",
    referredBy: null,
    assignedTo: "Ravi Tiwari",
    totalStudents: 312,
    totalBatches: 6,
    totalTeachers: 5,
    lastLoginDate: "09 Apr 2026",
    lastLoginBy: "Admin",
    activeFeatures: ["Attendance", "Fees", "Tests", "Timetable"],
    supportTicketsOpen: 0,
    supportTicketsTotal: 6,
    npsScore: 7,
    notes: "",
    tags: [],
    createdAt: "2024-12-01T09:00:00Z",
    updatedAt: "2026-04-09T10:00:00Z"
  },
  {
    id: "CUS012",
    instituteName: "Gurukripa Classes",
    ownerName: "Sunita Jain",
    ownerAvatar: "SJ",
    phone: "9876540012",
    email: "guru@kripa.in",
    city: "Nagpur",
    state: "MH",
    address: "Nagpur South",
    website: null,
    gstNumber: null,
    plan: "Basic",
    planStatus: "Expired",
    billingCycle: "Monthly",
    mrr: 0,
    totalRevenue: 6000,
    startDate: "10 May 2024",
    currentPeriodStart: "10 May 2025",
    currentPeriodEnd: "09 Jun 2025",
    trialEndDate: null,
    daysUntilExpiry: 0,
    autoRenew: false,
    paymentMode: null,
    source: "Website",
    referredBy: null,
    assignedTo: "Neha Gupta",
    totalStudents: 88,
    totalBatches: 2,
    totalTeachers: 2,
    lastLoginDate: "15 Jun 2025",
    lastLoginBy: "Admin",
    activeFeatures: [],
    supportTicketsOpen: 0,
    supportTicketsTotal: 3,
    npsScore: 4,
    notes: "",
    tags: ["At Risk", "Churned"],
    createdAt: "2024-05-10T10:00:00Z",
    updatedAt: "2025-06-15T12:00:00Z"
  }
];

export const activities: CustomerActivity[] = [
  { id: "ACT001", customerId: "CUS001", type: "signup", title: "Account created", description: "Raj Science Classes signed up via Google Ad", performedBy: "System", timestamp: "05 Jan 2025, 10:00 AM" },
  { id: "ACT002", customerId: "CUS001", type: "payment", title: "Payment Received", description: "₹6,000 — Basic Annual Plan", performedBy: "System", timestamp: "06 Jan 2025, 09:00 AM" },
  { id: "ACT003", customerId: "CUS001", type: "plan_change", title: "Plan Upgraded", description: "Upgraded from Basic to Pro (Annual)", performedBy: "Vikram Shah", timestamp: "01 Mar 2025, 10:00 AM" },
  { id: "ACT004", customerId: "CUS001", type: "payment", title: "Payment Received", description: "₹10,000 — Pro Annual Plan", performedBy: "System", timestamp: "01 Mar 2025, 11:00 AM" },
  { id: "ACT005", customerId: "CUS001", type: "renewal", title: "Subscription Renewed", description: "Pro Annual renewed — ₹10,000 received", performedBy: "System", timestamp: "01 Jan 2026, 12:00 AM" },
  { id: "ACT006", customerId: "CUS001", type: "note", title: "Note Added by Vikram Shah", description: "Owner very satisfied. Upsell opportunity for multi-branch.", performedBy: "Vikram Shah", timestamp: "01 Apr 2026, 10:00 AM" },
  { id: "ACT007", customerId: "CUS001", type: "support", title: "Support Ticket #104 Resolved", description: "Sanjay More resolved \"Can't export attendance PDF\"", performedBy: "Sanjay More", timestamp: "08 Apr 2026, 11:00 AM" },
  { id: "ACT008", customerId: "CUS001", type: "feature_use", title: "AI Timetable Generated", description: "Feature used by customer", performedBy: "Customer", timestamp: "10 Apr 2026, 03:15 PM" },
  { id: "ACT009", customerId: "CUS001", type: "login", title: "Login", description: "Admin logged in from Pune", performedBy: "System", timestamp: "11 Apr 2026, 09:42 AM" },
];

export const invoices: CustomerInvoice[] = [
  { id: "INV001", customerId: "CUS001", invoiceNumber: "INV-2026-001", date: "01 Jan 2026", dueDate: "10 Jan 2026", amount: 10000, gstPercent: 18, gstAmount: 1800, totalWithGst: 11800, plan: "Pro", billingCycle: "Annual", status: "Paid", paymentDate: "02 Jan 2026", paymentMode: "Bank Transfer", transactionId: "TXN2026001234" },
  { id: "INV002", customerId: "CUS001", invoiceNumber: "INV-2025-002", date: "01 Mar 2025", dueDate: "10 Mar 2025", amount: 10000, gstPercent: 18, gstAmount: 1800, totalWithGst: 11800, plan: "Pro", billingCycle: "Annual", status: "Paid", paymentDate: "02 Mar 2025", paymentMode: "Bank Transfer", transactionId: "TXN2025002456" },
  { id: "INV003", customerId: "CUS001", invoiceNumber: "INV-2025-001", date: "05 Jan 2025", dueDate: "15 Jan 2025", amount: 6000, gstPercent: 18, gstAmount: 1080, totalWithGst: 7080, plan: "Basic", billingCycle: "Annual", status: "Paid", paymentDate: "06 Jan 2025", paymentMode: "UPI", transactionId: "TXN2025001789" },
];

export const tickets: SupportTicket[] = [
  {
    id: "TKT001",
    customerId: "CUS001",
    ticketNumber: "#104",
    subject: "Can't export attendance PDF",
    description: "When I try to export attendance PDF, it shows an error 'File not found'. Please help.",
    status: "Resolved",
    priority: "Medium",
    createdAt: "05 Apr 2026, 02:30 PM",
    resolvedAt: "08 Apr 2026, 11:00 AM",
    assignedTo: "Sanjay More",
    messages: [
      { id: "MSG001", sender: "Rajesh Mehta", senderType: "Customer", message: "When I try to export attendance PDF, it shows an error 'File not found'. Please help.", timestamp: "05 Apr 2026, 02:30 PM" },
      { id: "MSG002", sender: "Sanjay More", senderType: "TechFly", message: "Hi Rajesh, we've identified the issue. There was a bug in the PDF generator. We've pushed a fix. Please try again and let us know.", timestamp: "06 Apr 2026, 10:00 AM" },
      { id: "MSG003", sender: "Rajesh Mehta", senderType: "Customer", message: "It's working now! Thank you.", timestamp: "08 Apr 2026, 08:00 AM" },
      { id: "MSG004", sender: "Sanjay More", senderType: "TechFly", message: "Great! Marking as resolved. Feel free to reach out anytime.", timestamp: "08 Apr 2026, 11:00 AM" }
    ]
  }
];

export const customerNotes: CustomerNote[] = [
  { id: "NOTE001", customerId: "CUS001", text: "Owner very satisfied, upsell opportunity for multi-branch. Schedule a call next week.", category: "General", priority: "Important", addedBy: "Vikram Shah", addedByAvatar: "VS", createdAt: "01 Apr 2026, 10:00 AM", updatedAt: "01 Apr 2026, 10:00 AM" },
  { id: "NOTE002", customerId: "CUS001", text: "Called Rajesh re: WhatsApp notifications. He'll enable it next month.", category: "Follow-up", priority: "Normal", addedBy: "Ravi Tiwari", addedByAvatar: "RT", createdAt: "15 Mar 2026, 02:00 PM", updatedAt: "15 Mar 2026, 02:00 PM" },
];
