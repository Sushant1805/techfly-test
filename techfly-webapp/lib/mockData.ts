export const customers = [
  { id: 1, name: "Raj Science Classes", contact: "Rajesh Mehta", phone: "9876540001", email: "raj@classes.in", plan: "Pro", status: "Active", city: "Pune", startDate: "Jan 2025", expiry: "Dec 2026", mrr: 12000, activeStudents: 850, batches: 12, lastLogin: "Today, 10:30 AM", notes: [] },
  { id: 2, name: "Mentor IIT Academy", contact: "Suresh Kumar", phone: "9876540002", email: "mentor@iit.in", plan: "Basic", status: "Active", city: "Mumbai", startDate: "Mar 2025", expiry: "Jun 2026", mrr: 6000, activeStudents: 150, batches: 4, lastLogin: "Yesterday", notes: [] },
  { id: 3, name: "Bright Future Coaching", contact: "Anita Desai", phone: "9876540003", email: "bright@future.in", plan: "Pro", status: "Trial", city: "Nagpur", startDate: "Apr 2026", expiry: "Apr 2026", mrr: 0, activeStudents: 55, batches: 2, lastLogin: "Today, 08:15 AM", notes: [] },
  { id: 4, name: "Excel Study Hub", contact: "Prakash Jain", phone: "9876540004", email: "excel@study.in", plan: "Free", status: "Expired", city: "Nashik", startDate: "Aug 2024", expiry: "Jan 2026", mrr: 0, activeStudents: 45, batches: 1, lastLogin: "2 Weeks ago", notes: [] },
  { id: 5, name: "Pinnacle Tutorials", contact: "Meena Kulkarni", phone: "9876540005", email: "pinnacle@tut.in", plan: "Basic", status: "Active", city: "Pune", startDate: "Sep 2025", expiry: "Sep 2026", mrr: 6000, activeStudents: 120, batches: 3, lastLogin: "Today, 12:00 PM", notes: [] },
  { id: 6, name: "Vidya Mandir Classes", contact: "Arun Patil", phone: "9876540006", email: "vidya@mandir.in", plan: "Pro", status: "Active", city: "Aurangabad", startDate: "Nov 2024", expiry: "Nov 2026", mrr: 12000, activeStudents: 400, batches: 10, lastLogin: "Yesterday", notes: [] },
  { id: 7, name: "Lakshya Institute", contact: "Priya Sharma", phone: "9876540007", email: "lakshya@inst.in", plan: "Basic", status: "Active", city: "Solapur", startDate: "Feb 2025", expiry: "Feb 2026", mrr: 6000, activeStudents: 180, batches: 5, lastLogin: "2 Days ago", notes: [] },
  { id: 8, name: "Vision Coaching", contact: "Sunil Rao", phone: "9876540008", email: "vision@coach.in", plan: "Free", status: "Active", city: "Mumbai", startDate: "Jan 2026", expiry: "—", mrr: 0, activeStudents: 40, batches: 1, lastLogin: "Today, 11:45 AM", notes: [] },
  { id: 9, name: "Focus Academy", contact: "Rahul Shah", phone: "9876540009", email: "focus@acad.in", plan: "Pro", status: "Active", city: "Pune", startDate: "Oct 2024", expiry: "Oct 2026", mrr: 12000, activeStudents: 600, batches: 15, lastLogin: "Today, 09:20 AM", notes: [] },
  { id: 10, name: "Star Coaching Centre", contact: "Ramesh Patil", phone: "9876540010", email: "star@coaching.in", plan: "Basic", status: "Pending", city: "Kolhapur", startDate: "—", expiry: "—", mrr: 6000, activeStudents: 0, batches: 0, lastLogin: "Never", notes: [] },
  { id: 11, name: "NextGen Academy", contact: "Anil Thakur", phone: "9876540011", email: "nextgen@acad.in", plan: "Pro", status: "Active", city: "Hyderabad", startDate: "Dec 2024", expiry: "Dec 2026", mrr: 12000, activeStudents: 350, batches: 8, lastLogin: "Yesterday", notes: [] },
  { id: 12, name: "Gurukripa Classes", contact: "Sunita Jain", phone: "9876540012", email: "guru@kripa.in", plan: "Basic", status: "Expired", city: "Nagpur", startDate: "May 2024", expiry: "May 2025", mrr: 0, activeStudents: 190, batches: 5, lastLogin: "1 Month ago", notes: [] }
];

export const invoices = [
  { id: "INV-2026-001", institute: "Raj Science Classes", date: "01 Apr 2026", dueDate: "15 Apr 2026", amount: 12000, plan: "Pro", status: "Paid" },
  { id: "INV-2026-002", institute: "Mentor IIT Academy", date: "05 Apr 2026", dueDate: "20 Apr 2026", amount: 6000, plan: "Basic", status: "Pending" },
  { id: "INV-2026-003", institute: "Focus Academy", date: "15 Mar 2026", dueDate: "30 Mar 2026", amount: 12000, plan: "Pro", status: "Overdue" },
  { id: "INV-2026-004", institute: "Pinnacle Tutorials", date: "10 Apr 2026", dueDate: "25 Apr 2026", amount: 6000, plan: "Basic", status: "Pending" },
  { id: "INV-2026-005", institute: "NextGen Academy", date: "01 Mar 2026", dueDate: "15 Mar 2026", amount: 12000, plan: "Pro", status: "Paid" },
];

export const crmLeads = [
  { id: "l1", institute: "Alpha Classes", contact: "Mohit", phone: "9876541111", city: "Delhi", planInterest: "Pro", dateAdded: "10 Apr 2026", note: "Requested a demo for tomorrow.", assigned: "Vikram", stage: "New Lead", daysInStage: 1, expectedMrr: 12000, source: "Website" },
  { id: "l2", institute: "Beta Institute", contact: "Rohit", phone: "9876542222", city: "Bangalore", planInterest: "Basic", dateAdded: "09 Apr 2026", note: "Sent pricing PDF, waiting for reply.", assigned: "Neha", stage: "Contacted", daysInStage: 3, expectedMrr: 6000, source: "Google Ad" },
  { id: "l3", institute: "Gamma Academy", contact: "Sonal", phone: "9876543333", city: "Chennai", planInterest: "Pro", dateAdded: "05 Apr 2026", note: "Demo completed, very interested in CRM feature.", assigned: "Pooja", stage: "Demo Done", daysInStage: 2, expectedMrr: 12000, source: "Referral" },
  { id: "l4", institute: "Delta Coaching", contact: "Amit", phone: "9876544444", city: "Pune", planInterest: "Basic", dateAdded: "01 Apr 2026", note: "Asked for a 10% discount.", assigned: "Ravi", stage: "Negotiation", daysInStage: 4, expectedMrr: 6000, source: "Cold Call" },
  { id: "l5", institute: "Sigma Tutorials", contact: "Priya", phone: "9876545555", city: "Mumbai", planInterest: "Free", dateAdded: "08 Apr 2026", note: "Signed up for free trial.", assigned: "Neha", stage: "Converted", daysInStage: 0, expectedMrr: 0, source: "Website" },
];

export const teamMembers = [
  { name: "Vikram Shah", email: "vikram@techfly.in", role: "Super Admin", status: "Active", lastActive: "Just now" },
  { name: "Neha Gupta", email: "neha@techfly.in", role: "Admin", status: "Active", lastActive: "2 hrs ago" },
  { name: "Ravi Tiwari", email: "ravi@techfly.in", role: "Sales Executive", status: "Active", lastActive: "1 day ago" },
  { name: "Pooja Mehta", email: "pooja@techfly.in", role: "Sales Executive", status: "Active", lastActive: "3 hrs ago" },
  { name: "Sanjay More", email: "sanjay@techfly.in", role: "Support", status: "Inactive", lastActive: "10 days ago" },
];

export const followups = [
  { id: "f1", institute: "Delta Coaching", contact: "Amit", date: "Today", type: "Call", status: "Pending" },
  { id: "f2", institute: "Beta Institute", contact: "Rohit", date: "Today", type: "Email", status: "Pending" },
  { id: "f3", institute: "Focus Academy", contact: "Rahul Shah", date: "Overdue", type: "Demo", status: "Overdue" },
];

export const revenueTrend = [
  { name: "Nov", val: 180000 },
  { name: "Dec", val: 200000 },
  { name: "Jan", val: 220000 },
  { name: "Feb", val: 240000 },
  { name: "Mar", val: 260000 },
  { name: "Apr", val: 280000 },
];
