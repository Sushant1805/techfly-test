'use client';

// --- Interfaces ---

export interface InstituteProfile {
  name: string;
  ownerName: string;
  type: "Coaching Class" | "School" | "College" | "Tuition Center";
  establishedYear: number;
  registrationNumber: string | null;
  gstNumber: string | null;
  description: string;
  phone: string;
  secondaryPhone: string | null;
  email: string;
  website: string | null;
  address: {
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    pinCode: string;
    country: string;
  };
  social: {
    whatsapp: string | null;
    facebook: string | null;
    instagram: string | null;
    youtube: string | null;
  };
}

export interface Branding {
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  receiptHeader: string;
  receiptTagline: string;
  receiptFooter: string;
  showLogoOnReceipts: boolean;
  showLogoOnReports: boolean;
  showLogoOnTimetable: boolean;
}

export interface Holiday {
  id: string;
  date: string;
  name: string;
  type: "National" | "State" | "Institute" | "Other";
  description?: string;
}

export interface Term {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Completed" | "Upcoming";
}

export interface AcademicYear {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Completed" | "Upcoming";
  terms: Term[];
  workingDays: string[];
  instituteOpenTime: string;
  instituteCloseTime: string;
  holidays: Holiday[];
}

export interface StaffMember {
  id: string;
  name: string;
  gender: "Male" | "Female" | "Other";
  dob: string | null;
  role: "Teacher" | "Admin" | "Reception" | "Support";
  subjects: string[];
  phone: string;
  email: string;
  address: string | null;
  qualification: string | null;
  experienceYears: number | null;
  joiningDate: string;
  salary: number | null;
  status: "Active" | "Inactive";
  username: string;
  emergencyContact: string | null;
}

export interface NotificationSettings {
  attendance: {
    notifyParentOnAbsent: boolean;
    notifyParentOnLate: boolean;
    summaryFrequency: "Daily" | "Weekly" | "Monthly" | "Never";
    summaryDay: string;
    summaryTime: string;
  };
  fees: {
    reminderEnabled: boolean;
    reminderDaysBefore: number;
    overdueReminderEnabled: boolean;
    overdueFrequencyDays: number;
    paymentConfirmation: boolean;
  };
  tests: {
    upcomingTestReminder: boolean;
    testReminderDaysBefore: number;
    resultsNotification: boolean;
    resultsWithinHours: number;
  };
  assignments: {
    createdNotification: boolean;
    dueReminder: boolean;
    dueReminderHoursBefore: number;
    lateSubmissionAlert: boolean;
  };
  channels: {
    inApp: boolean;
    sms: boolean;
    whatsapp: boolean;
    email: boolean;
  };
}

export interface MessageTemplate {
  id: string;
  name: string;
  channel: "SMS" | "WhatsApp" | "Both";
  smsTemplate: string;
  whatsappTemplate: string;
  variables: string[];
  lastEdited: string;
}

export interface Permission {
  feature: string;
  teacher: boolean;
  admin: boolean;
  reception: boolean;
  support: boolean;
}

export interface Subject {
  id: string;
  name: string;
  shortName: string;
  color: string;
  status: "Active" | "Inactive";
  batchesCount: number;
}

export interface GradeScale {
  id: string;
  grade: string;
  minPercent: number;
  maxPercent: number;
  label: string;
  color: string;
  isPass: boolean;
}

export interface BillingInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  plan: string;
  status: "Paid" | "Pending";
}

export interface BillingInfo {
  currentPlan: "Free" | "Basic" | "Pro";
  status: "Active" | "Trial" | "Expired";
  billingCycle: "Monthly" | "Annual";
  amount: number;
  renewalDate: string;
  daysRemaining: number;
  invoices: BillingInvoice[];
}

// --- Mock Data ---

export const initialProfile: InstituteProfile = {
  name: "Raj Science Classes",
  ownerName: "Rajesh Mehta",
  type: "Coaching Class",
  establishedYear: 2018,
  registrationNumber: "REG-2018-MH-04521",
  gstNumber: "27AABCR1234M1Z5",
  description: "Excellence in science education for secondary and higher secondary students since 2018. Specializing in NEET and JEE preparation.",
  phone: "9876543210",
  secondaryPhone: "9876543211",
  email: "raj@rajscienceclasses.in",
  website: "www.rajscienceclasses.in",
  address: {
    line1: "15, Shivaji Nagar",
    line2: "Near Civil Hospital",
    city: "Pune",
    state: "Maharashtra",
    pinCode: "411005",
    country: "India"
  },
  social: {
    whatsapp: "9876543210",
    facebook: "facebook.com/rajscienceclasses",
    instagram: "@rajscienceclasses",
    youtube: "youtube.com/@rajscienceclasses"
  }
};

export const initialBranding: Branding = {
  logoUrl: null,
  primaryColor: "#5E4E99",
  secondaryColor: "#2A2A37",
  accentColor: "#1D9E75",
  receiptHeader: "Raj Science Classes",
  receiptTagline: "Excellence in Education Since 2018",
  receiptFooter: "Confidential — For Internal Use Only",
  showLogoOnReceipts: true,
  showLogoOnReports: true,
  showLogoOnTimetable: false
};

export const initialAcademicYear: AcademicYear = {
  id: "ay-2025",
  label: "2025 – 2026",
  startDate: "2025-06-01",
  endDate: "2026-05-31",
  status: "Active",
  terms: [
    { id: "term-1", label: "First Term", startDate: "2025-06-01", endDate: "2025-11-30", status: "Completed" },
    { id: "term-2", label: "Second Term", startDate: "2025-12-01", endDate: "2026-05-31", status: "Active" }
  ],
  workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  instituteOpenTime: "07:30",
  instituteCloseTime: "20:30",
  holidays: [
    { id: "h1", date: "2026-01-26", name: "Republic Day", type: "National" },
    { id: "h2", date: "2026-04-14", name: "Ambedkar Jayanti", type: "National" },
    { id: "h3", date: "2026-05-01", name: "Maharashtra Day", type: "State" },
    { id: "h4", date: "2026-08-15", name: "Independence Day", type: "National" },
    { id: "h5", date: "2026-10-02", name: "Gandhi Jayanti", type: "National" }
  ]
};

export const mockStaff: StaffMember[] = [
  { 
    id: "TCH001", name: "Priya Sharma", gender: "Female", dob: "1992-05-15", 
    role: "Teacher", subjects: ["Maths", "Physics"], 
    phone: "9845001001", email: "priya@ezzy.in", address: "12, Model Colony, Pune",
    qualification: "M.Sc Mathematics, B.Ed", experienceYears: 8, joiningDate: "2022-06-10",
    salary: 45000, status: "Active", username: "priya.sharma", emergencyContact: "Rajesh Sharma (Husband) — 9845009001"
  },
  { 
    id: "TCH002", name: "Rahul Joshi", gender: "Male", dob: "1990-08-22", 
    role: "Teacher", subjects: ["Physics", "Chem"], 
    phone: "9845001002", email: "rahul@ezzy.in", address: null,
    qualification: "M.Sc Physics", experienceYears: 10, joiningDate: "2022-08-01",
    salary: 50000, status: "Active", username: "rahul.joshi", emergencyContact: null
  },
  { 
    id: "TCH003", name: "Sunita Rao", gender: "Female", dob: "1988-11-10", 
    role: "Teacher", subjects: ["Biology", "Chem"], 
    phone: "9845001003", email: "sunita@ezzy.in", address: null,
    qualification: "M.Sc Biology", experienceYears: 12, joiningDate: "2023-01-15",
    salary: 48000, status: "Active", username: "sunita.rao", emergencyContact: null
  },
  { 
    id: "STF001", name: "Kavita Nair", gender: "Female", dob: "1995-03-25", 
    role: "Reception", subjects: [], 
    phone: "9845002001", email: "kavita@ezzy.in", address: null,
    qualification: null, experienceYears: 3, joiningDate: "2024-01-10",
    salary: 25000, status: "Active", username: "kavita.nair", emergencyContact: null
  },
  { 
    id: "STF002", name: "Suresh Patil", gender: "Male", dob: "1985-12-12", 
    role: "Admin", subjects: [], 
    phone: "9845002002", email: "suresh@ezzy.in", address: null,
    qualification: "MBA", experienceYears: 15, joiningDate: "2022-06-01",
    salary: 60000, status: "Active", username: "suresh.patil", emergencyContact: null
  }
];

export const initialNotifications: NotificationSettings = {
  attendance: {
    notifyParentOnAbsent: true,
    notifyParentOnLate: false,
    summaryFrequency: "Weekly",
    summaryDay: "Monday",
    summaryTime: "08:00"
  },
  fees: {
    reminderEnabled: true,
    reminderDaysBefore: 7,
    overdueReminderEnabled: true,
    overdueFrequencyDays: 3,
    paymentConfirmation: true
  },
  tests: {
    upcomingTestReminder: true,
    testReminderDaysBefore: 2,
    resultsNotification: true,
    resultsWithinHours: 24
  },
  assignments: {
    createdNotification: true,
    dueReminder: true,
    dueReminderHoursBefore: 24,
    lateSubmissionAlert: true
  },
  channels: {
    inApp: true,
    sms: true,
    whatsapp: false,
    email: false
  }
};

export const mockTemplates: MessageTemplate[] = [
  {
    id: "temp-1",
    name: "Absent Notification",
    channel: "Both",
    smsTemplate: "Dear {parent_name}, {student_name} was absent on {date}. Contact us: {institute_phone} — {institute_name}",
    whatsappTemplate: "Dear {parent_name},\n\nWe wanted to inform you that *{student_name}* was marked *absent* on {date} for {subject}.\n\nIf this is an error, please contact us at {institute_phone}.\n\nRegards,\n{institute_name}",
    variables: ["{student_name}", "{parent_name}", "{date}", "{subject}", "{institute_name}", "{institute_phone}"],
    lastEdited: "2026-04-05"
  },
  {
    id: "temp-2",
    name: "Fee Due Reminder",
    channel: "Both",
    smsTemplate: "Dear {parent_name}, fee of ₹{amount} for {student_name} is due on {due_date}. — {institute_name}",
    whatsappTemplate: "Dear {parent_name},\n\nPayment reminder for *{student_name}*.\nAmount: *₹{amount}*\nDue Date: *{due_date}*\n\nPlease ignore if already paid.\n\nRegards,\n{institute_name}",
    variables: ["{student_name}", "{parent_name}", "{amount}", "{due_date}", "{institute_name}"],
    lastEdited: "2026-04-01"
  }
];

export const initialPermissions: Permission[] = [
  { feature: "VIEW STUDENTS", teacher: true, admin: true, reception: true, support: true },
  { feature: "ADD / EDIT STUDENTS", teacher: false, admin: true, reception: true, support: false },
  { feature: "MARK ATTENDANCE", teacher: true, admin: true, reception: false, support: false },
  { feature: "COLLECT FEES", teacher: false, admin: true, reception: true, support: false },
  { feature: "CREATE TESTS", teacher: true, admin: true, reception: false, support: false },
  { feature: "VIEW ANALYTICS", teacher: true, admin: true, reception: false, support: false },
  { feature: "MANAGE STAFF", teacher: false, admin: true, reception: false, support: false }
];

export const initialSubjects: Subject[] = [
  { id: "sub-1", name: "Mathematics", shortName: "Maths", color: "#8B5CF6", status: "Active", batchesCount: 5 },
  { id: "sub-2", name: "Physics", shortName: "Physics", color: "#10B981", status: "Active", batchesCount: 4 },
  { id: "sub-3", name: "Chemistry", shortName: "Chem", color: "#F59E0B", status: "Active", batchesCount: 4 },
  { id: "sub-4", name: "Biology", shortName: "Bio", color: "#3B82F6", status: "Active", batchesCount: 3 },
  { id: "sub-5", name: "English", shortName: "Eng", color: "#FBBF24", status: "Active", batchesCount: 4 }
];

export const initialGradeScale: GradeScale[] = [
  { id: "g1", grade: "A+", minPercent: 90, maxPercent: 100, label: "Outstanding", color: "#10B981", isPass: true },
  { id: "g2", grade: "A", minPercent: 80, maxPercent: 89, label: "Excellent", color: "#10B981", isPass: true },
  { id: "g3", grade: "B+", minPercent: 70, maxPercent: 79, label: "Very Good", color: "#8B5CF6", isPass: true },
  { id: "g4", grade: "B", minPercent: 60, maxPercent: 69, label: "Good", color: "#3B82F6", isPass: true },
  { id: "g5", grade: "C", minPercent: 50, maxPercent: 59, label: "Average", color: "#FBBF24", isPass: true },
  { id: "g6", grade: "D", minPercent: 40, maxPercent: 49, label: "Below Average", color: "#F59E0B", isPass: true },
  { id: "g7", grade: "F", minPercent: 0, maxPercent: 39, label: "Fail", color: "#EF4444", isPass: false }
];

export const initialBilling: BillingInfo = {
  currentPlan: "Pro",
  status: "Active",
  billingCycle: "Annual",
  amount: 10000,
  renewalDate: "2026-12-31",
  daysRemaining: 264,
  invoices: [
    { id: "inv-1", invoiceNumber: "INV-2026-001", date: "2026-01-01", amount: 10000, plan: "Pro", status: "Paid" },
    { id: "inv-2", invoiceNumber: "INV-2025-004", date: "2025-01-01", amount: 10000, plan: "Pro", status: "Paid" }
  ]
};
