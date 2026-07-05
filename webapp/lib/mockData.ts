export type StatusType = "Active" | "Inactive" | "On Leave" | "Pending" | "Paid" | "Partial" | "Trial" | "default";
export type FeesStatus = "Paid" | "Pending" | "Partial";
export type AttendanceStatus = "Present" | "Absent" | "Late" | "Leave" | "Unmarked";
export type FeeStatus = "Paid" | "Pending" | "Partial" | "Overdue" | "Waived";
export type PaymentMode = "Cash" | "UPI" | "Bank Transfer" | "Cheque";
export type FeeType = "Monthly" | "Admission" | "Exam" | "Other";
export type TestStatus = "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
export type TestType = "Chapter Test" | "Unit Test" | "Mid-term" | "Final Exam" | "Quiz" | "Practice Test";

export interface StudentTestScore {
  subject: string;
  score: number;
  total: number;
}

export interface Student {
  id: string;
  name: string;
  photo: string | null;
  gender: "Male" | "Female" | "Other";
  dob: string;
  standard: string;
  batch: string;
  batchId?: string;
  rollNumber: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  parentRelation: string;
  email: string;
  address: string;
  joiningDate: string;
  status: "Active" | "Inactive" | "On Leave";
  feesStatus: FeesStatus;
  totalFeesDue: number;
  attendancePercent: number;
  subjects: string[];
  lastTestScore: StudentTestScore;
  notes: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  batchId: string;
  batchName: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  arrivalTime?: string; // only for "Late"
  note?: string;
  markedBy: string;
  markedAt: string;
}

export interface Holiday {
  id: string;
  date: string;
  name: string;
  type: "National" | "State" | "Institute" | "Other";
  appliesTo: "all" | string[]; // batch IDs or "all"
}

export interface AttendanceSettings {
  workingDays: string[];
  warningThreshold: number;
  alertThreshold: number;
  autoReminderEnabled: boolean;
  autoReminderThreshold: number;
  allowPastDays: number;
  lateWindowMinutes: number;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  batchId: string;
  batchName: string;
  standard: string;
  month: string;
  monthYear: string;
  feeType: FeeType;
  amount: number;
  amountPaid: number;
  balance: number;
  dueDate: string;
  paidDate: string | null;
  paymentMode: PaymentMode | null;
  transactionId: string | null;
  chequeNumber: string | null;
  chequeDate: string | null;
  status: FeeStatus;
  receiptNumber: string | null;
  collectedBy: string;
  notes: string | null;
  reminderSentAt: string | null;
  reminderCount: number;
}

export interface FeeStructure {
  batchId: string;
  batchName: string;
  standard: string;
  monthlyFee: number;
  admissionFee: number;
  examFee: number;
  lateFeePerDay: number;
  concessionPercent: number;
  effectiveFrom: string;
}

export interface Concession {
  id: string;
  studentId: string;
  studentName: string;
  batchId: string;
  type: "Percentage" | "Fixed";
  value: number;
  reason: "Merit" | "Financial" | "Staff Ward" | "Other";
  validFrom: string;
  validUntil: string | null;
  notes: string | null;
  grantedBy: string;
}

export interface Test {
  id: string;
  title: string;
  subject: string;
  subjectColor: string;
  batchId: string;
  batchName: string;
  standard: string;
  teacherId: string;
  teacherName: string;
  testType: TestType;
  totalMarks: number;
  passingMarks: number;
  duration: number;
  scheduledDate: string;
  scheduledTime: string;
  venue: string;
  status: TestStatus;
  instructions: string;
  syllabus: string;
  createdAt: string;
  marksEntryDone: boolean;
  averageScore: number | null;
  highestScore: number | null;
  lowestScore: number | null;
  passCount: number | null;
  failCount: number | null;
}

export interface StudentMark {
  id: string;
  testId: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  batchId: string;
  marksObtained: number | null;
  isAbsent: boolean;
  percentage: number | null;
  grade: string | null;
  rank: number | null;
  remarks: string | null;
  enteredBy: string;
  enteredAt: string;
}

export interface GradeScale {
  grade: string;
  minPercent: number;
  maxPercent: number;
  color: string;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  available: boolean;
}

export interface TeacherAvailability {
  teacherId: string;
  teacherName: string;
  subjects: string[];
  availableDays: string[];
  availableTimeStart: string;
  availableTimeEnd: string;
  maxPeriodsPerDay: number;
  maxPeriodsPerWeek: number;
  preferredBatches: string[];
  unavailableDates: string[];
}

export interface SubjectRequirement {
  name: string;
  color: string;
  teacherId: string;
  periodsPerWeek: number;
  periodDuration: number; // in minutes
}

export interface SubjectsPerBatch {
  batchId: string;
  batchName: string;
  subjects: SubjectRequirement[];
}

export interface TimetableEntry {
  id: string;
  slotId: string;
  day: string;
  startTime: string;
  endTime: string;
  batchId: string;
  batchName: string;
  subject: string;
  subjectColor: string;
  teacherId: string;
  teacherName: string;
  roomId: string;
  roomName: string;
  type: "Regular" | "Extra Class" | "Revision" | "Doubt Session";
  weekStartDate: string;
}

export interface TimetableConflict {
  type: "TeacherDoubleBooked" | "RoomDoubleBooked" | "BatchDoubleBooked";
  day: string;
  time: string;
  description: string;
  affectedEntries: string[];
}

export interface GenerationStats {
  totalPeriodsScheduled: number;
  teacherUtilization: Record<string, number>;
  roomUtilization: Record<string, number>;
  unscheduledSubjects: string[];
}

export interface GeneratedTimetable {
  version: number;
  generatedAt: string;
  status: "Draft" | "Active" | "Archived";
  batches: string[];
  entries: TimetableEntry[];
  conflicts: TimetableConflict[];
  warnings: string[];
  stats: GenerationStats;
}

export type AssignmentType = "Homework" | "Project" | "Practice" | "Research" | "Reading" | "Lab Work"
export type AssignmentDifficulty = "Easy" | "Medium" | "Hard"
export type AssignmentStatus = "Draft" | "Active" | "Closed" | "Graded"
export type SubmissionStatus = "Submitted" | "Graded" | "Missing" | "Late"

export interface Attachment {
  id: string
  fileName: string
  fileType: "pdf" | "docx" | "xlsx" | "pptx" | "image" | "zip"
  fileSize: string
  uploadedAt: string
}

export interface Assignment {
  id: string
  title: string
  description: string
  instructions: string[]
  subject: string
  subjectColor: string
  batchId: string
  batchName: string
  standard: string
  teacherId: string
  teacherName: string
  type: AssignmentType
  difficulty: AssignmentDifficulty
  assignedDate: string
  dueDate: string
  dueTime: string
  totalMarks: number | null
  passingMarks: number | null
  isGraded: boolean
  status: AssignmentStatus
  attachments: Attachment[]
  totalStudents: number
  submittedCount: number
  gradedCount: number
  viewedCount: number
  lateSubmissions: number
  averageScore: number | null
  allowLateSubmission: boolean
  latePenaltyPercent: number
  notifyStudents: boolean
  notifyOnSubmission: boolean
  reminderEnabled: boolean
  reminderSentAt: string | null
  createdAt: string
  publishedAt: string | null
  closedAt: string | null
}

export interface SubmissionFile {
  id: string
  fileName: string
  fileType: string
  fileSize: string
  uploadedAt: string
}

export interface Submission {
  id: string
  assignmentId: string
  studentId: string
  studentName: string
  rollNumber: string
  batchId: string
  submittedAt: string
  isLate: boolean
  latePenaltyApplied: number
  files: SubmissionFile[]
  marksObtained: number | null
  maxMarks: number | null
  percentage: number | null
  grade: string | null
  feedback: string | null
  status: SubmissionStatus
  gradedAt: string | null
  gradedBy: string | null
}

export interface AssignmentAnalytics {
  assignmentId: string
  submissionRate: number
  onTimeRate: number
  lateRate: number
  missingRate: number
  averageScore: number | null
  gradeDistribution: Record<string, number>
  subjectLoad: Record<string, Record<string, number>>
}

export interface TimetableConstraints {
  batches: {
    id: string;
    name: string;
    standard: string;
    preferredDays: string[];
    preferredTimeStart: string;
    preferredTimeEnd: string;
    roomId: string;
  }[];
  teachers: TeacherAvailability[];
  rooms: Room[];
  subjectsPerBatch: SubjectsPerBatch[];
  rules: {
    slotDuration: number;
    breakAfterSlots: number;
    breakDuration: number;
    maxConsecutivePeriodsPerBatch: number;
    maxConsecutivePeriodsPerTeacher: number;
    avoidSubjectRepeatSameDay: boolean;
    workingDays: string[];
    holidayDates: string[];
  };
}

export const students: Student[] = [
  {
    id: "STU001",
    name: "Arjun Mehta",
    photo: null,
    gender: "Male",
    dob: "2008-05-14",
    standard: "Std 10",
    batch: "Batch A",
    rollNumber: "A-01",
    phone: "9876543210",
    parentName: "Suresh Mehta",
    parentPhone: "9876543210",
    parentRelation: "Father",
    email: "arjun@gmail.com",
    address: "12, Shivaji Nagar, Pune - 411005",
    joiningDate: "2024-06-10",
    status: "Active",
    feesStatus: "Paid",
    totalFeesDue: 0,
    attendancePercent: 91,
    subjects: ["Maths", "Physics", "Chemistry"],
    lastTestScore: { subject: "Maths", score: 44, total: 50 },
    notes: "Consistent performer. Needs help in Organic Chemistry.",
  },
  {
    id: "STU002",
    name: "Sneha Patel",
    photo: null,
    gender: "Female",
    dob: "2007-09-22",
    standard: "Std 11",
    batch: "Batch B",
    rollNumber: "B-04",
    phone: "9876543211",
    parentName: "Vijay Patel",
    parentPhone: "9876543211",
    parentRelation: "Father",
    email: "sneha@gmail.com",
    address: "45, Satellite, Ahmedabad - 380015",
    joiningDate: "2024-05-15",
    status: "Active",
    feesStatus: "Pending",
    totalFeesDue: 4500,
    attendancePercent: 84,
    subjects: ["Maths", "Physics", "Chemistry", "English"],
    lastTestScore: { subject: "Physics", score: 38, total: 50 },
    notes: "Very diligent. Improving in Calculus.",
  },
  {
    id: "STU003",
    name: "Rohan Desai",
    photo: null,
    gender: "Male",
    dob: "2006-11-10",
    standard: "Std 12",
    batch: "Batch C",
    rollNumber: "C-12",
    phone: "9876543212",
    parentName: "Dinesh Desai",
    parentPhone: "9876543212",
    parentRelation: "Father",
    email: "rohan@gmail.com",
    address: "B-201, Kothrud, Pune - 411038",
    joiningDate: "2023-06-01",
    status: "Active",
    feesStatus: "Paid",
    totalFeesDue: 0,
    attendancePercent: 78,
    subjects: ["Physics", "Chemistry", "Biology"],
    lastTestScore: { subject: "Biology", score: 71, total: 100 },
    notes: "Skilled in diagrams. Weak in chemical equations.",
  },
  {
    id: "STU004",
    name: "Pooja Sharma",
    photo: null,
    gender: "Female",
    dob: "2009-02-28",
    standard: "Std 9",
    batch: "Batch D",
    rollNumber: "D-05",
    phone: "9876543213",
    parentName: "Rakesh Sharma",
    parentPhone: "9876543213",
    parentRelation: "Father",
    email: "pooja@gmail.com",
    address: "8, model Town, Delhi - 110009",
    joiningDate: "2025-01-10",
    status: "Active",
    feesStatus: "Paid",
    totalFeesDue: 0,
    attendancePercent: 95,
    subjects: ["Maths", "English", "Science"],
    lastTestScore: { subject: "English", score: 34, total: 40 },
    notes: "Excellent command over language.",
  },
  {
    id: "STU005",
    name: "Karan Verma",
    photo: null,
    gender: "Male",
    dob: "2008-01-05",
    standard: "Std 10",
    batch: "Batch A",
    rollNumber: "A-02",
    phone: "9876543214",
    parentName: "Sunil Verma",
    parentPhone: "9876543214",
    parentRelation: "Father",
    email: "karan@gmail.com",
    address: "15, Civil Lines, Jaipur - 302006",
    joiningDate: "2024-06-15",
    status: "Inactive",
    feesStatus: "Pending",
    totalFeesDue: 12000,
    attendancePercent: 42,
    subjects: ["Maths", "Science"],
    lastTestScore: { subject: "Maths", score: 12, total: 50 },
    notes: "Repeatedly absent. Parent not responding.",
  },
  {
    id: "STU006",
    name: "Ananya Singh",
    photo: null,
    gender: "Female",
    dob: "2007-07-15",
    standard: "Std 11",
    batch: "Batch B",
    rollNumber: "B-03",
    phone: "9876543215",
    parentName: "Abhay Singh",
    parentPhone: "9876543215",
    parentRelation: "Father",
    email: "ananya@gmail.com",
    address: "102, Gomti Nagar, Lucknow - 226010",
    joiningDate: "2024-05-10",
    status: "Active",
    feesStatus: "Paid",
    totalFeesDue: 0,
    attendancePercent: 88,
    subjects: ["Biology", "Chemistry", "English"],
    lastTestScore: { subject: "Chemistry", score: 82, total: 100 },
    notes: "Strong in theory. Good laboratory skills.",
  },
  {
    id: "STU007",
    name: "Vivek Nair",
    photo: null,
    gender: "Male",
    dob: "2006-05-01",
    standard: "Std 12",
    batch: "Batch C",
    rollNumber: "C-08",
    phone: "9876543216",
    parentName: "Prashant Nair",
    parentPhone: "9876543216",
    parentRelation: "Father",
    email: "vivek@gmail.com",
    address: "Shivaji Park, Mumbai - 400028",
    joiningDate: "2023-06-05",
    status: "Active",
    feesStatus: "Partial",
    totalFeesDue: 8000,
    attendancePercent: 73,
    subjects: ["Physics", "Maths"],
    lastTestScore: { subject: "Physics", score: 32, total: 50 },
    notes: "Needs regular practice in Mechanics.",
  },
  {
    id: "STU008",
    name: "Tanya Mishra",
    photo: null,
    gender: "Female",
    dob: "2009-12-10",
    standard: "Std 9",
    batch: "Batch D",
    rollNumber: "D-02",
    phone: "9876543217",
    parentName: "Alok Mishra",
    parentPhone: "9876543217",
    parentRelation: "Father",
    email: "tanya@gmail.com",
    address: "14, Salt Lake, Kolkata - 700091",
    joiningDate: "2025-01-05",
    status: "Active",
    feesStatus: "Paid",
    totalFeesDue: 0,
    attendancePercent: 90,
    subjects: ["Maths", "Science", "Social"],
    lastTestScore: { subject: "Science", score: 45, total: 50 },
    notes: "Participation in class is excellent.",
  },
  {
    id: "STU009",
    name: "Mohit Gupta",
    photo: null,
    gender: "Male",
    dob: "2008-04-18",
    standard: "Std 10",
    batch: "Batch A",
    rollNumber: "A-03",
    phone: "9876543218",
    parentName: "Sanjay Gupta",
    parentPhone: "9876543218",
    parentRelation: "Father",
    email: "mohit@gmail.com",
    address: "22, Anna Nagar, Chennai - 600040",
    joiningDate: "2024-06-20",
    status: "Active",
    feesStatus: "Pending",
    totalFeesDue: 6000,
    attendancePercent: 66,
    subjects: ["Maths", "Physics"],
    lastTestScore: { subject: "Maths", score: 28, total: 50 },
    notes: "Distracted by sports. Needs better focus on studies.",
  },
  {
    id: "STU010",
    name: "Riya Shah",
    photo: null,
    gender: "Female",
    dob: "2007-03-30",
    standard: "Std 11",
    batch: "Batch B",
    rollNumber: "B-01",
    phone: "9876543219",
    parentName: "Nitin Shah",
    parentPhone: "9876543219",
    parentRelation: "Father",
    email: "riya@gmail.com",
    address: "Malabar Hill, Mumbai - 400006",
    joiningDate: "2024-05-01",
    status: "Active",
    feesStatus: "Paid",
    totalFeesDue: 0,
    attendancePercent: 93,
    subjects: ["Chemistry", "Biology", "Maths"],
    lastTestScore: { subject: "Biology", score: 92, total: 100 },
    notes: "Top performer in Biology.",
  },
  {
    id: "STU011",
    name: "Dev Kapoor",
    photo: null,
    gender: "Male",
    dob: "2006-08-15",
    standard: "Std 12",
    batch: "Batch C",
    rollNumber: "C-05",
    phone: "9876543220",
    parentName: "Anil Kapoor",
    parentPhone: "9876543220",
    parentRelation: "Father",
    email: "dev@gmail.com",
    address: "Banjara Hills, Hyderabad - 500034",
    joiningDate: "2023-06-10",
    status: "On Leave",
    feesStatus: "Paid",
    totalFeesDue: 0,
    attendancePercent: 58,
    subjects: ["Physics", "Chemistry"],
    lastTestScore: { subject: "Physics", score: 34, total: 100 },
    notes: "On medical leave for two weeks.",
  },
  {
    id: "STU012",
    name: "Priti Joshi",
    photo: null,
    gender: "Female",
    dob: "2009-06-05",
    standard: "Std 9",
    batch: "Batch D",
    rollNumber: "D-03",
    phone: "9876543221",
    parentName: "Deepak Joshi",
    parentPhone: "9876543221",
    parentRelation: "Father",
    email: "priti@gmail.com",
    address: "Sector 17, Chandigarh - 160017",
    joiningDate: "2025-01-15",
    status: "Active",
    feesStatus: "Paid",
    totalFeesDue: 0,
    attendancePercent: 87,
    subjects: ["Maths", "Science"],
    lastTestScore: { subject: "Maths", score: 35, total: 50 },
    notes: "Attentive but shy. Good homework completion.",
  },
  {
    id: "STU013",
    name: "Sahil Bhat",
    photo: null,
    gender: "Male",
    dob: "2008-02-14",
    standard: "Std 10",
    batch: "Batch E",
    rollNumber: "E-01",
    phone: "9876543222",
    parentName: "Vikram Bhat",
    parentPhone: "9876543222",
    parentRelation: "Father",
    email: "sahil@gmail.com",
    address: "Srinagar Colony, Pune - 411016",
    joiningDate: "2024-06-05",
    status: "Active",
    feesStatus: "Partial",
    totalFeesDue: 5000,
    attendancePercent: 71,
    subjects: ["Foundation Maths", "Physics"],
    lastTestScore: { subject: "Physics", score: 26, total: 50 },
    notes: "Conceptual clarity is decent, needs speed.",
  },
  {
    id: "STU014",
    name: "Nisha Rao",
    photo: null,
    gender: "Female",
    dob: "2007-10-10",
    standard: "Std 11",
    batch: "Batch B",
    rollNumber: "B-02",
    phone: "9876543223",
    parentName: "Prabhu Rao",
    parentPhone: "9876543223",
    parentRelation: "Father",
    email: "nisha@gmail.com",
    address: "Indiranagar, Bangalore - 560038",
    joiningDate: "2024-05-05",
    status: "Active",
    feesStatus: "Paid",
    totalFeesDue: 0,
    attendancePercent: 96,
    subjects: ["Maths", "Physics", "Chemistry"],
    lastTestScore: { subject: "Chemistry", score: 48, total: 50 },
    notes: "Always tops the chemistry unit tests.",
  },
  {
    id: "STU015",
    name: "Aman Dubey",
    photo: null,
    gender: "Male",
    dob: "2006-01-01",
    standard: "Std 12",
    batch: "Batch C",
    rollNumber: "C-01",
    phone: "9876543224",
    parentName: "Gopal Dubey",
    parentPhone: "9876543224",
    parentRelation: "Father",
    email: "aman@gmail.com",
    address: "18, Kanpur Road, Allahabad - 211001",
    joiningDate: "2023-06-01",
    status: "Active",
    feesStatus: "Pending",
    totalFeesDue: 15000,
    attendancePercent: 63,
    subjects: ["Maths", "Physics"],
    lastTestScore: { subject: "Maths", score: 55, total: 100 },
    notes: "Parent says student is stressed about exams.",
  },
  {
    id: "STU016",
    name: "Kavya Iyer",
    photo: null,
    gender: "Female",
    dob: "2009-04-22",
    standard: "Std 9",
    batch: "Batch D",
    rollNumber: "D-01",
    phone: "9876543225",
    parentName: "Mani Iyer",
    parentPhone: "9876543225",
    parentRelation: "Father",
    email: "kavya@gmail.com",
    address: "Mylapore, Chennai - 600004",
    joiningDate: "2025-01-02",
    status: "Active",
    feesStatus: "Paid",
    totalFeesDue: 0,
    attendancePercent: 89,
    subjects: ["Science", "Maths", "English"],
    lastTestScore: { subject: "English", score: 38, total: 40 },
    notes: "Enthusiastic learner.",
  },
  {
    id: "STU017",
    name: "Rahul Joshi",
    photo: null,
    gender: "Male",
    dob: "2008-07-20",
    standard: "Std 10",
    batch: "Batch A",
    rollNumber: "A-04",
    phone: "9876543226",
    parentName: "Harish Joshi",
    parentPhone: "9876543226",
    parentRelation: "Father",
    email: "rahul.j@gmail.com",
    address: "Vikas Nagar, Pune - 411052",
    joiningDate: "2024-06-25",
    status: "Inactive",
    feesStatus: "Pending",
    totalFeesDue: 9000,
    attendancePercent: 38,
    subjects: ["Maths", "Science"],
    lastTestScore: { subject: "Science", score: 21, total: 100 },
    notes: "Considering withdrawal from this session.",
  },
  {
    id: "STU018",
    name: "Simran Kaur",
    photo: null,
    gender: "Female",
    dob: "2007-05-12",
    standard: "Std 11",
    batch: "Batch B",
    rollNumber: "B-05",
    phone: "9876543227",
    parentName: "Gurpreet Kaur",
    parentPhone: "9876543227",
    parentRelation: "Mother",
    email: "simran@gmail.com",
    address: "Model Town, Ludhiana - 141002",
    joiningDate: "2024-05-20",
    status: "Active",
    feesStatus: "Paid",
    totalFeesDue: 0,
    attendancePercent: 92,
    subjects: ["Maths", "Physics", "English"],
    lastTestScore: { subject: "Maths", score: 46, total: 50 },
    notes: "Very competitive attitude.",
  },
  {
    id: "STU019",
    name: "Yash Agarwal",
    photo: null,
    gender: "Male",
    dob: "2006-02-18",
    standard: "Std 12",
    batch: "Batch C",
    rollNumber: "C-02",
    phone: "9876543228",
    parentName: "Manoj Agarwal",
    parentPhone: "9876543228",
    parentRelation: "Father",
    email: "yash@gmail.com",
    address: "24, MG Road, Indore - 452001",
    joiningDate: "2023-06-01",
    status: "Active",
    feesStatus: "Paid",
    totalFeesDue: 0,
    attendancePercent: 77,
    subjects: ["Chemistry", "Biology"],
    lastTestScore: { subject: "Biology", score: 77, total: 100 },
    notes: "Needs improvement in organic mechanisms.",
  },
  {
    id: "STU020",
    name: "Disha Pandey",
    photo: null,
    gender: "Female",
    dob: "2009-08-30",
    standard: "Std 9",
    batch: "Batch E",
    rollNumber: "E-02",
    phone: "9876543229",
    parentName: "Suresh Pandey",
    parentPhone: "9876543229",
    parentRelation: "Father",
    email: "disha@gmail.com",
    address: "Dehradun, Uttarakhand - 248001",
    joiningDate: "2025-01-20",
    status: "Active",
    feesStatus: "Partial",
    totalFeesDue: 2500,
    attendancePercent: 82,
    subjects: ["Science", "Social"],
    lastTestScore: { subject: "Social", score: 41, total: 50 },
    notes: "Strong in History and Civics.",
  },
];

export interface AttendanceHistory {
  studentId: string;
  month: string;
  present: number;
  absent: number;
  total: number;
  percent: number;
}

export const attendanceHistory: AttendanceHistory[] = students.flatMap(s => [
  { studentId: s.id, month: "Jan 2026", present: 22, absent: 2, total: 24, percent: 92 },
  { studentId: s.id, month: "Feb 2026", present: 20, absent: 3, total: 23, percent: 87 },
  { studentId: s.id, month: "Mar 2026", present: 24, absent: 1, total: 25, percent: 96 },
  { studentId: s.id, month: "Apr 2026", present: 16, absent: 2, total: 18, percent: 89 },
]);

export interface PaymentRecord {
  studentId: string;
  month: string;
  amount: number;
  paidOn: string | null;
  mode: string | null;
  status: "Paid" | "Pending" | "Partial";
}

export const paymentHistory: PaymentRecord[] = students.flatMap(s => [
  { studentId: s.id, month: "Jan 2026", amount: 4000, paidOn: "5 Jan 2026", mode: "Cash", status: "Paid" },
  { studentId: s.id, month: "Feb 2026", amount: 4000, paidOn: "3 Feb 2026", mode: "UPI", status: "Paid" },
  { studentId: s.id, month: "Mar 2026", amount: 4000, paidOn: "7 Mar 2026", mode: "Bank Transfer", status: "Paid" },
  { studentId: s.id, month: "Apr 2026", amount: 4000, paidOn: null, mode: null, status: s.feesStatus },
]);

export const gradeScale: GradeScale[] = [
  { minPercent: 90, maxPercent: 100, grade: "A+", color: "#1D9E75" },
  { minPercent: 80, maxPercent: 89,  grade: "A",  color: "#1a7a4a" },
  { minPercent: 70, maxPercent: 79,  grade: "B+", color: "#5E4E99" },
  { minPercent: 60, maxPercent: 69,  grade: "B",  color: "#378ADD" },
  { minPercent: 50, maxPercent: 59,  grade: "C",  color: "#BA7517" },
  { minPercent: 40, maxPercent: 49,  grade: "D",  color: "#D85A30" },
  { minPercent: 0,  maxPercent: 39,  grade: "F",  color: "#c0392b" },
];

export const subjectsMock = [
  { id: "SUB001", name: "Maths",     color: "#5E4E99", shortName: "Maths" },
  { id: "SUB002", name: "Physics",   color: "#1D9E75", shortName: "Physics" },
  { id: "SUB003", name: "Chemistry", color: "#D85A30", shortName: "Chem" },
  { id: "SUB004", name: "Biology",   color: "#378ADD", shortName: "Bio" },
  { id: "SUB005", name: "English",   color: "#BA7517", shortName: "Eng" },
  { id: "SUB006", name: "Hindi",     color: "#9E1D6A", shortName: "Hindi" },
];

export const tests: Test[] = [
  {
    id: "TST001", title: "Algebra Unit 3", subject: "Maths", subjectColor: "#5E4E99",
    batchId: "BAT001", batchName: "Batch A", standard: "Std 10", teacherId: "TCH001", teacherName: "Priya Sharma",
    testType: "Chapter Test", totalMarks: 50, passingMarks: 20, duration: 60,
    scheduledDate: "2026-04-16", scheduledTime: "09:00 AM", venue: "Room 101",
    status: "Upcoming", instructions: "No calculators allowed", syllabus: "Algebra Chapter 3",
    createdAt: "2026-04-01", marksEntryDone: false, averageScore: null, highestScore: null, lowestScore: null, passCount: null, failCount: null
  },
  {
    id: "TST002", title: "Organic Chemistry", subject: "Chemistry", subjectColor: "#D85A30",
    batchId: "BAT003", batchName: "Batch C", standard: "Std 12", teacherId: "TCH003", teacherName: "Sunita Rao",
    testType: "Chapter Test", totalMarks: 100, passingMarks: 40, duration: 90,
    scheduledDate: "2026-04-15", scheduledTime: "10:00 AM", venue: "Room 103",
    status: "Upcoming", instructions: "Bring your lab manual", syllabus: "Organic Chemistry Chapter 1-2",
    createdAt: "2026-04-02", marksEntryDone: false, averageScore: null, highestScore: null, lowestScore: null, passCount: null, failCount: null
  },
  {
    id: "TST003", title: "Newton's Laws Quiz", subject: "Physics", subjectColor: "#1D9E75",
    batchId: "BAT002", batchName: "Batch B", standard: "Std 11", teacherId: "TCH002", teacherName: "Rahul Joshi",
    testType: "Quiz", totalMarks: 25, passingMarks: 10, duration: 30,
    scheduledDate: "2026-04-14", scheduledTime: "11:00 AM", venue: "Room 102",
    status: "Upcoming", instructions: "Multiple choice questions only", syllabus: "Newton's Laws of Motion",
    createdAt: "2026-04-05", marksEntryDone: false, averageScore: null, highestScore: null, lowestScore: null, passCount: null, failCount: null
  },
  {
    id: "TST004", title: "Chapter 4 Test", subject: "Physics", subjectColor: "#1D9E75",
    batchId: "BAT002", batchName: "Batch B", standard: "Std 11", teacherId: "TCH002", teacherName: "Rahul Joshi",
    testType: "Chapter Test", totalMarks: 50, passingMarks: 20, duration: 60,
    scheduledDate: "2026-04-05", scheduledTime: "09:00 AM", venue: "Room 102",
    status: "Completed", instructions: "", syllabus: "Kinematics",
    createdAt: "2026-03-25", marksEntryDone: true, averageScore: 38.5, highestScore: 49, lowestScore: 22, passCount: 32, failCount: 6
  },
  {
    id: "TST005", title: "English Grammar", subject: "English", subjectColor: "#BA7517",
    batchId: "BAT004", batchName: "Batch D", standard: "Std 9", teacherId: "TCH004", teacherName: "Amit Kapoor",
    testType: "Chapter Test", totalMarks: 40, passingMarks: 16, duration: 45,
    scheduledDate: "2026-04-10", scheduledTime: "02:00 PM", venue: "Room 104",
    status: "Completed", instructions: "", syllabus: "Nouns & Verbs",
    createdAt: "2026-03-30", marksEntryDone: true, averageScore: 31.2, highestScore: 39, lowestScore: 14, passCount: 22, failCount: 6
  },
  {
    id: "TST006", title: "Mid-term Biology", subject: "Biology", subjectColor: "#378ADD",
    batchId: "BAT003", batchName: "Batch C", standard: "Std 12", teacherId: "TCH003", teacherName: "Sunita Rao",
    testType: "Mid-term", totalMarks: 100, passingMarks: 40, duration: 120,
    scheduledDate: "2026-03-15", scheduledTime: "09:00 AM", venue: "Room 103",
    status: "Completed", instructions: "", syllabus: "Full Biology Syllabus",
    createdAt: "2026-03-01", marksEntryDone: true, averageScore: 68.4, highestScore: 94, lowestScore: 38, passCount: 28, failCount: 7
  },
  {
    id: "TST007", title: "Algebra Mid-term", subject: "Maths", subjectColor: "#5E4E99",
    batchId: "BAT001", batchName: "Batch A", standard: "Std 10", teacherId: "TCH001", teacherName: "Priya Sharma",
    testType: "Mid-term", totalMarks: 100, passingMarks: 40, duration: 120,
    scheduledDate: "2026-03-10", scheduledTime: "09:00 AM", venue: "Room 101",
    status: "Completed", instructions: "", syllabus: "Full Maths Syllabus",
    createdAt: "2026-02-25", marksEntryDone: true, averageScore: 72.1, highestScore: 96, lowestScore: 31, passCount: 36, failCount: 6
  },
  {
    id: "TST008", title: "Hindi Unit 2", subject: "Hindi", subjectColor: "#9E1D6A",
    batchId: "BAT004", batchName: "Batch D", standard: "Std 9", teacherId: "TCH004", teacherName: "Amit Kapoor",
    testType: "Unit Test", totalMarks: 50, passingMarks: 20, duration: 60,
    scheduledDate: "2026-03-20", scheduledTime: "11:00 AM", venue: "Room 104",
    status: "Completed", instructions: "", syllabus: "Literature Unit 2",
    createdAt: "2026-03-05", marksEntryDone: true, averageScore: 41.5, highestScore: 48, lowestScore: 18, passCount: 24, failCount: 4
  },
  {
    id: "TST009", title: "Chemistry Chapter 3", subject: "Chemistry", subjectColor: "#D85A30",
    batchId: "BAT002", batchName: "Batch B", standard: "Std 11", teacherId: "TCH002", teacherName: "Rahul Joshi",
    testType: "Chapter Test", totalMarks: 50, passingMarks: 20, duration: 60,
    scheduledDate: "2026-03-25", scheduledTime: "10:00 AM", venue: "Room 102",
    status: "Completed", instructions: "", syllabus: "Atomic Structure",
    createdAt: "2026-03-10", marksEntryDone: true, averageScore: 35.8, highestScore: 47, lowestScore: 12, passCount: 28, failCount: 10
  },
  {
    id: "TST010", title: "Final Exam \u2014 Physics", subject: "Physics", subjectColor: "#1D9E75",
    batchId: "BAT003", batchName: "Batch C", standard: "Std 12", teacherId: "TCH003", teacherName: "Sunita Rao",
    testType: "Final Exam", totalMarks: 100, passingMarks: 40, duration: 180,
    scheduledDate: "2026-04-30", scheduledTime: "09:00 AM", venue: "Room 103",
    status: "Upcoming", instructions: "Full syllabus exam", syllabus: "Physics Full Course",
    createdAt: "2026-04-05", marksEntryDone: false, averageScore: null, highestScore: null, lowestScore: null, passCount: null, failCount: null
  },
  {
    id: "TST011", title: "Practice Quiz \u2014 Maths", subject: "Maths", subjectColor: "#5E4E99",
    batchId: "BAT005", batchName: "Batch E", standard: "Std 10", teacherId: "TCH005", teacherName: "Meena Gupta",
    testType: "Practice Test", totalMarks: 30, passingMarks: 12, duration: 30,
    scheduledDate: "2026-04-18", scheduledTime: "04:00 PM", venue: "Room 101",
    status: "Upcoming", instructions: "Optional but recommended", syllabus: "Algebra Basics",
    createdAt: "2026-04-08", marksEntryDone: false, averageScore: null, highestScore: null, lowestScore: null, passCount: null, failCount: null
  },
  {
    id: "TST012", title: "Biology Chapter 5", subject: "Biology", subjectColor: "#378ADD",
    batchId: "BAT001", batchName: "Batch A", standard: "Std 10", teacherId: "TCH001", teacherName: "Priya Sharma",
    testType: "Chapter Test", totalMarks: 50, passingMarks: 20, duration: 60,
    scheduledDate: "2026-04-20", scheduledTime: "08:00 AM", venue: "Room 101",
    status: "Upcoming", instructions: "Read Chapter 5 thoroughly", syllabus: "Photosynthesis",
    createdAt: "2026-04-10", marksEntryDone: false, averageScore: null, highestScore: null, lowestScore: null, passCount: null, failCount: null
  },
  {
    id: "TST013", title: "English Literature", subject: "English", subjectColor: "#BA7517",
    batchId: "BAT003", batchName: "Batch C", standard: "Std 12", teacherId: "TCH003", teacherName: "Sunita Rao",
    testType: "Unit Test", totalMarks: 50, passingMarks: 20, duration: 60,
    scheduledDate: "2026-04-02", scheduledTime: "11:00 AM", venue: "Room 103",
    status: "Completed", instructions: "", syllabus: "Shakespearean Plays",
    createdAt: "2026-03-20", marksEntryDone: false, averageScore: null, highestScore: null, lowestScore: null, passCount: null, failCount: null
  },
  {
    id: "TST014", title: "Full Syllabus Mock", subject: "Maths", subjectColor: "#5E4E99",
    batchId: "BAT002", batchName: "Batch B", standard: "Std 11", teacherId: "TCH002", teacherName: "Rahul Joshi",
    testType: "Practice Test", totalMarks: 100, passingMarks: 40, duration: 120,
    scheduledDate: "2026-04-08", scheduledTime: "09:00 AM", venue: "Room 102",
    status: "Completed", instructions: "", syllabus: "Full Syllabus",
    createdAt: "2026-03-28", marksEntryDone: true, averageScore: 64.5, highestScore: 91, lowestScore: 28, passCount: 30, failCount: 8
  },
  {
    id: "TST015", title: "Std 12 Board Mock Exam", subject: "Chemistry", subjectColor: "#D85A30",
    batchId: "BAT003", batchName: "Batch C", standard: "Std 12", teacherId: "TCH003", teacherName: "Sunita Rao",
    testType: "Final Exam", totalMarks: 70, passingMarks: 28, duration: 180,
    scheduledDate: "2026-05-05", scheduledTime: "09:00 AM", venue: "Hall",
    status: "Upcoming", instructions: "Carry boards exam kit", syllabus: "Full Chemistry",
    createdAt: "2026-04-11", marksEntryDone: false, averageScore: null, highestScore: null, lowestScore: null, passCount: null, failCount: null
  }
];

const generateStudentMarks = () => {
  const marks: StudentMark[] = [];
  tests.filter(t => t.marksEntryDone).forEach(test => {
    const batchStudents = students.filter(s => s.batch === test.batchName);
    
    batchStudents.forEach((student, index) => {
      const rand = Math.random();
      const isAbsent = rand < 0.05;
      let marksObtained = null;
      let percentage = null;
      let grade = null;
      
      if (!isAbsent) {
        // Base score around average score with some variance
        const base = (test.averageScore || (test.totalMarks * 0.7));
        const variance = (Math.random() - 0.5) * (test.totalMarks * 0.4);
        marksObtained = Math.min(test.totalMarks, Math.max(0, Math.round(base + variance)));
        percentage = Math.round((marksObtained / test.totalMarks) * 100);
        
        const gRow = gradeScale.find(g => percentage! >= g.minPercent && percentage! <= g.maxPercent);
        grade = gRow ? gRow.grade : "F";
      }

      marks.push({
        id: `MRK-${test.id}-${student.id}`,
        testId: test.id,
        studentId: student.id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        batchId: test.batchId,
        marksObtained,
        isAbsent,
        percentage,
        grade,
        rank: null, // calculated later
        remarks: marksObtained && marksObtained < test.passingMarks ? "Need Improvement" : (marksObtained && marksObtained > test.totalMarks * 0.9 ? "Excellent" : null),
        enteredBy: test.teacherName,
        enteredAt: "2026-04-11T19:00:00"
      });
    });

    // Calculate ranks for this test
    const testMarks = marks.filter(m => m.testId === test.id && !m.isAbsent);
    testMarks.sort((a, b) => (b.marksObtained || 0) - (a.marksObtained || 0));
    testMarks.forEach((m, idx) => { m.rank = idx + 1; });
  });
  return marks;
};

export const studentMarks = generateStudentMarks();

export interface StudentNote {
  id: string;
  studentId: string;
  category: "Academic" | "Behaviour" | "Fee" | "General";
  text: string;
  author: string;
  timestamp: string;
}

export const studentNotes: StudentNote[] = students.flatMap(s => [
  { id: `n1-${s.id}`, studentId: s.id, category: "Academic", text: "Needs extra attention in Organic Chemistry. Suggested extra class.", author: "Admin", timestamp: "9 Apr 2026" },
  { id: `n2-${s.id}`, studentId: s.id, category: "Fee", text: "Parent called. Will pay April fees by 15th.", author: "Admin", timestamp: "2 Apr 2026" },
  { id: `n3-${s.id}`, studentId: s.id, category: "General", text: "Consistent performer. Parents very cooperative.", author: "Admin", timestamp: "15 Mar 2026" },
]);

export const subjectColors: Record<string, { bg: string; text: string; border: string }> = {
  Maths: { bg: "#F3E8FF", text: "#7E22CE", border: "#D8B4FE" },
  Physics: { bg: "#DCFCE7", text: "#15803D", border: "#86EFAC" },
  Chemistry: { bg: "#FFEDD5", text: "#C2410C", border: "#FDBA74" },
  Biology: { bg: "#DBEAFE", text: "#1D4ED8", border: "#93C5FD" },
  English: { bg: "#FEF3C7", text: "#B45309", border: "#FCD34D" },
  Hindi: { bg: "#FDF2F8", text: "#BE185D", border: "#F9A8D4" },
};

export interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Teacher {
  id: string;
  name: string;
  phone: string;
  email: string;
  subjects: string[];
  photo: string | null;
}

export interface Batch {
  id: string;
  name: string;
  standard: string;
  subjects: string[];
  teacher: Teacher;
  teacherId?: string;
  capacity: number;
  totalStudents: number;
  schedule: Schedule[];
  room: string;
  status: "Active" | "Full" | "Upcoming" | "Inactive";
  startDate: string;
  fees: number;
  color: string;
  attendanceToday: number;
  averageAttendance: number;
  lastClassDate: string;
  upcomingTest: { name: string; date: string } | null;
  notes: string;
}

export const teachers: Teacher[] = [
  { id: "TCH001", name: "Priya Sharma", phone: "9845001001", email: "priya@ezzycoach.in", subjects: ["Maths", "Physics"], photo: null },
  { id: "TCH002", name: "Rahul Joshi", phone: "9845001002", email: "rahul@ezzycoach.in", subjects: ["Physics", "Chemistry"], photo: null },
  { id: "TCH003", name: "Sunita Rao", phone: "9845001003", email: "sunita@ezzycoach.in", subjects: ["Biology", "Chemistry"], photo: null },
  { id: "TCH004", name: "Amit Kapoor", phone: "9845001004", email: "amit@ezzycoach.in", subjects: ["Maths", "English"], photo: null },
  { id: "TCH005", name: "Meena Gupta", phone: "9845001005", email: "meena@ezzycoach.in", subjects: ["English", "Hindi"], photo: null },
];

export const batches: Batch[] = [
  {
    id: "BAT001",
    name: "Batch A",
    standard: "Std 10",
    subjects: ["Maths", "Physics", "Chemistry"],
    teacher: teachers[0],
    capacity: 50,
    totalStudents: 42,
    schedule: [
      { day: "Monday", startTime: "08:00", endTime: "10:00" },
      { day: "Wednesday", startTime: "08:00", endTime: "10:00" },
      { day: "Friday", startTime: "08:00", endTime: "10:00" },
    ],
    room: "Room 101",
    status: "Active",
    startDate: "2024-06-10",
    fees: 4500,
    color: "#5E4E99",
    attendanceToday: 38,
    averageAttendance: 91,
    lastClassDate: "2026-04-11",
    upcomingTest: { name: "Algebra Unit 3", date: "2026-04-16" },
    notes: "Top performing batch. Board exam preparation ongoing.",
  },
  {
    id: "BAT002",
    name: "Batch B",
    standard: "Std 11",
    subjects: ["Physics", "Chemistry"],
    teacher: teachers[1],
    capacity: 45,
    totalStudents: 38,
    schedule: [
      { day: "Tuesday", startTime: "10:00", endTime: "12:00" },
      { day: "Thursday", startTime: "10:00", endTime: "12:00" },
      { day: "Saturday", startTime: "10:00", endTime: "12:00" },
    ],
    room: "Room 102",
    status: "Active",
    startDate: "2024-06-10",
    fees: 5000,
    color: "#1D9E75",
    attendanceToday: 35,
    averageAttendance: 88,
    lastClassDate: "2026-04-11",
    upcomingTest: { name: "Organic Basics", date: "2026-04-18" },
    notes: "Needs focus on chemical bonding.",
  },
  {
    id: "BAT003",
    name: "Batch C",
    standard: "Std 12",
    subjects: ["Biology", "Chemistry"],
    teacher: teachers[2],
    capacity: 40,
    totalStudents: 35,
    schedule: [
      { day: "Monday", startTime: "12:00", endTime: "14:00" },
      { day: "Tuesday", startTime: "12:00", endTime: "14:00" },
      { day: "Wednesday", startTime: "12:00", endTime: "14:00" },
      { day: "Thursday", startTime: "12:00", endTime: "14:00" },
      { day: "Friday", startTime: "12:00", endTime: "14:00" },
      { day: "Saturday", startTime: "12:00", endTime: "14:00" },
    ],
    room: "Room 103",
    status: "Active",
    startDate: "2024-06-10",
    fees: 5500,
    color: "#D85A30",
    attendanceToday: 32,
    averageAttendance: 85,
    lastClassDate: "2026-04-11",
    upcomingTest: { name: "Human Anatomy", date: "2026-04-20" },
    notes: "Highly disciplined students.",
  },
  {
    id: "BAT004",
    name: "Batch D",
    standard: "Std 9",
    subjects: ["Maths", "English"],
    teacher: teachers[3],
    capacity: 40,
    totalStudents: 28,
    schedule: [
      { day: "Monday", startTime: "16:00", endTime: "18:00" },
      { day: "Wednesday", startTime: "16:00", endTime: "18:00" },
      { day: "Friday", startTime: "16:00", endTime: "18:00" },
    ],
    room: "Room 104",
    status: "Active",
    startDate: "2025-01-10",
    fees: 3500,
    color: "#378ADD",
    attendanceToday: 26,
    averageAttendance: 92,
    lastClassDate: "2026-04-11",
    upcomingTest: null,
    notes: "Foundation level batch.",
  },
  {
    id: "BAT005",
    name: "Batch E",
    standard: "Std 10",
    subjects: ["English", "Hindi"],
    teacher: teachers[4],
    capacity: 40,
    totalStudents: 15,
    schedule: [
      { day: "Tuesday", startTime: "18:00", endTime: "20:00" },
      { day: "Thursday", startTime: "18:00", endTime: "20:00" },
    ],
    room: "Room 101",
    status: "Active",
    startDate: "2024-06-15",
    fees: 4500,
    color: "#BA7517",
    attendanceToday: 12,
    averageAttendance: 80,
    lastClassDate: "2026-04-11",
    upcomingTest: null,
    notes: "Evening slot batch.",
  },
  {
    id: "BAT006",
    name: "Batch F",
    standard: "Std 11",
    subjects: ["Physics", "Chemistry"],
    teacher: teachers[1],
    capacity: 40,
    totalStudents: 40,
    schedule: [
      { day: "Monday", startTime: "10:00", endTime: "12:00" },
      { day: "Wednesday", startTime: "10:00", endTime: "12:00" },
      { day: "Friday", startTime: "10:00", endTime: "12:00" },
    ],
    room: "Room 102",
    status: "Full",
    startDate: "2024-05-10",
    fees: 5000,
    color: "#1D9E75",
    attendanceToday: 38,
    averageAttendance: 95,
    lastClassDate: "2026-04-11",
    upcomingTest: null,
    notes: "Batch limit reached.",
  },
  {
    id: "BAT007",
    name: "Batch G",
    standard: "Std 12",
    subjects: ["Biology", "Chemistry"],
    teacher: teachers[2],
    capacity: 35,
    totalStudents: 0,
    schedule: [
      { day: "Tuesday", startTime: "14:00", endTime: "16:00" },
      { day: "Thursday", startTime: "14:00", endTime: "16:00" },
      { day: "Saturday", startTime: "14:00", endTime: "16:00" },
    ],
    room: "Room 103",
    status: "Upcoming",
    startDate: "2026-05-01",
    fees: 5500,
    color: "#D85A30",
    attendanceToday: 0,
    averageAttendance: 0,
    lastClassDate: "—",
    upcomingTest: null,
    notes: "New session batch.",
  },
  {
    id: "BAT008",
    name: "Batch H",
    standard: "Std 9",
    subjects: ["Maths", "English"],
    teacher: teachers[3],
    capacity: 40,
    totalStudents: 12,
    schedule: [
      { day: "Saturday", startTime: "08:00", endTime: "12:00" },
    ],
    room: "Room 104",
    status: "Inactive",
    startDate: "2025-01-05",
    fees: 3500,
    color: "#888780",
    attendanceToday: 0,
    averageAttendance: 70,
    lastClassDate: "2026-03-25",
    upcomingTest: null,
    notes: "Suspended until further notice.",
  },
];

export const attendanceMock = students.slice(0, 10).map((s, index) => ({
  studentId: s.id,
  name: s.name,
  status: index % 4 === 0 ? "Absent" : "Present"
}));


export const feeStructures: FeeStructure[] = [
  { batchId: "BAT001", batchName: "Batch A", standard: "Std 10", monthlyFee: 4500, admissionFee: 2000, examFee: 500, lateFeePerDay: 50, concessionPercent: 0, effectiveFrom: "2024-06-10" },
  { batchId: "BAT002", batchName: "Batch B", standard: "Std 11", monthlyFee: 5000, admissionFee: 2000, examFee: 500, lateFeePerDay: 50, concessionPercent: 0, effectiveFrom: "2024-06-10" },
  { batchId: "BAT003", batchName: "Batch C", standard: "Std 12", monthlyFee: 5500, admissionFee: 2000, examFee: 500, lateFeePerDay: 50, concessionPercent: 0, effectiveFrom: "2024-06-10" },
  { batchId: "BAT004", batchName: "Batch D", standard: "Std 9",  monthlyFee: 3500, admissionFee: 1500, examFee: 500, lateFeePerDay: 50, concessionPercent: 0, effectiveFrom: "2025-01-10" },
  { batchId: "BAT005", batchName: "Batch E", standard: "Std 10", monthlyFee: 4500, admissionFee: 2000, examFee: 500, lateFeePerDay: 50, concessionPercent: 0, effectiveFrom: "2024-06-15" },
];

export const concessions: Concession[] = [
  { id: "CON001", studentId: "STU005", studentName: "Karan Verma", batchId: "BAT001", type: "Percentage", value: 20, reason: "Merit", validFrom: "2024-06-10", validUntil: null, notes: "Top ranker in entrance", grantedBy: "Admin" },
  { id: "CON002", studentId: "STU011", studentName: "Dev Kapoor", batchId: "BAT003", type: "Percentage", value: 50, reason: "Financial", validFrom: "2023-06-10", validUntil: null, notes: "Scholarship applicant", grantedBy: "Admin" },
];

const generateFeeRecords = () => {
  const records: FeeRecord[] = [];
  const months = ["January 2026", "February 2026", "March 2026", "April 2026"];
  const monthYears = ["2026-01", "2026-02", "2026-03", "2026-04"];
  const dueDates = ["10", "10", "10", "10"];

  students.forEach((student, sIdx) => {
    const batch = batches.find(b => b.name === student.batch);
    if (!batch) return;
    const structure = feeStructures.find(f => f.batchId === batch.id);
    if (!structure) return;

    months.forEach((month, mIdx) => {
      const isCurrentMonth = mIdx === 3;
      const amount = structure.monthlyFee;
      let amountPaid = amount;
      let status: FeeStatus = "Paid";
      let paidDate: string | null = `2026-0${mIdx + 1}-05`;
      let mode: PaymentMode | null = "UPI";
      
      // Implement the specific requirements from the prompt
      // Student specific logic (Arjun, Sneha, Rohan, etc.)
      if (student.name === "Arjun Mehta") { status = "Paid"; }
      else if (student.name === "Sneha Patel" && isCurrentMonth) { status = "Pending"; amountPaid = 0; paidDate = null; mode = null; }
      else if (student.name === "Rohan Desai" && mIdx > 0) { status = "Pending"; amountPaid = 0; paidDate = null; mode = null; }
      else if (student.name === "Karan Verma" && mIdx > 0) { status = "Pending"; amountPaid = 0; paidDate = null; mode = null; }
      else if (student.name === "Vivek Nair" && isCurrentMonth) { status = "Partial"; amountPaid = amount / 2; }
      else if (student.name === "Dev Kapoor" && mIdx === 2) { status = "Overdue"; amountPaid = 0; paidDate = null; mode = null; }
      else if (student.name === "Aman Dubey" && mIdx > 0) { status = "Overdue"; amountPaid = 0; paidDate = null; mode = null; }
      else if (student.name === "Rahul Joshi") { status = "Pending"; amountPaid = 0; paidDate = null; mode = null; }
      else if (student.name === "Yash Agarwal" && isCurrentMonth) { status = "Partial"; amountPaid = amount / 2; }
      else if (student.name === "Disha Pandey" && mIdx === 1) { status = "Partial"; amountPaid = 1000; }

      // Auto-set Overdue if Pending and past date
      if (status === "Pending" && mIdx < 3) status = "Overdue";

      records.push({
        id: `FEE-${student.id}-${mIdx}`,
        studentId: student.id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        batchId: batch.id,
        batchName: batch.name,
        standard: student.standard,
        month,
        monthYear: monthYears[mIdx],
        feeType: "Monthly",
        amount,
        amountPaid,
        balance: amount - amountPaid,
        dueDate: `2026-0${mIdx + 1}-${dueDates[mIdx]}`,
        paidDate,
        paymentMode: mode,
        transactionId: mode ? `TXN${Math.random().toString(36).substring(7).toUpperCase()}` : null,
        chequeNumber: null,
        chequeDate: null,
        status,
        receiptNumber: status === "Paid" || status === "Partial" ? `RCP-2026-${String(records.length + 1).padStart(3, '0')}` : null,
        collectedBy: "Admin",
        notes: null,
        reminderSentAt: status !== "Paid" && Math.random() > 0.5 ? "2026-04-05" : null,
        reminderCount: status !== "Paid" ? Math.floor(Math.random() * 3) : 0,
      });
    });
  });
  return records;
};

export const feeRecords = generateFeeRecords();

export const assignmentsMock: Assignment[] = [
  {
    id: "ASN001", title: "Quadratic Equations", description: "Solve the problems related to quadratic formulas and their applications.",
    instructions: ["Solve all 10 problems", "Show full working", "Submit scanned PDF"],
    subject: "Maths", subjectColor: "#7E22CE", batchId: "BAT001", batchName: "Batch A", standard: "Std 10",
    teacherId: "TCH001", teacherName: "Priya Sharma", type: "Homework", difficulty: "Medium",
    assignedDate: "2026-04-01", dueDate: "2026-04-15", dueTime: "23:59", totalMarks: 10, passingMarks: 4,
    isGraded: true, status: "Active", attachments: [], totalStudents: 42, submittedCount: 38,
    gradedCount: 0, viewedCount: 42, lateSubmissions: 2, averageScore: null,
    allowLateSubmission: true, latePenaltyPercent: 10, notifyStudents: true, notifyOnSubmission: false,
    reminderEnabled: true, reminderSentAt: "2026-04-13", createdAt: "2026-04-01", publishedAt: "2026-04-01", closedAt: null
  },
  {
    id: "ASN002", title: "Newton's Laws Problems", description: "Problems based on Newton's laws of motion and friction.",
    instructions: ["Use SI units only", "Draw free body diagrams where applicable"],
    subject: "Physics", subjectColor: "#15803D", batchId: "BAT002", batchName: "Batch B", standard: "Std 11",
    teacherId: "TCH002", teacherName: "Rahul Joshi", type: "Homework", difficulty: "Hard",
    assignedDate: "2026-04-02", dueDate: "2026-04-16", dueTime: "23:59", totalMarks: 15, passingMarks: 6,
    isGraded: true, status: "Active", attachments: [], totalStudents: 38, submittedCount: 22,
    gradedCount: 0, viewedCount: 35, lateSubmissions: 0, averageScore: null,
    allowLateSubmission: true, latePenaltyPercent: 10, notifyStudents: true, notifyOnSubmission: false,
    reminderEnabled: true, reminderSentAt: null, createdAt: "2026-04-02", publishedAt: "2026-04-02", closedAt: null
  },
  {
    id: "ASN003", title: "Organic Compounds Report", description: "Research and report on various organic compounds and their structures.",
    instructions: ["Report should be 5-10 pages", "Include chemical diagrams"],
    subject: "Chemistry", subjectColor: "#C2410C", batchId: "BAT003", batchName: "Batch C", standard: "Std 12",
    teacherId: "TCH003", teacherName: "Sunita Rao", type: "Research", difficulty: "Hard",
    assignedDate: "2026-03-01", dueDate: "2026-03-20", dueTime: "23:59", totalMarks: 20, passingMarks: 8,
    isGraded: true, status: "Graded", attachments: [], totalStudents: 35, submittedCount: 35,
    gradedCount: 35, viewedCount: 35, lateSubmissions: 1, averageScore: 16.2,
    allowLateSubmission: false, latePenaltyPercent: 0, notifyStudents: true, notifyOnSubmission: true,
    reminderEnabled: false, reminderSentAt: null, createdAt: "2026-03-01", publishedAt: "2026-03-01", closedAt: "2026-03-21"
  },
  {
    id: "ASN004", title: "Essay \u2014 My Role Model", description: "Write an essay about your role model.",
    instructions: ["Minimum 500 words", "Focus on their impact on your life"],
    subject: "English", subjectColor: "#B45309", batchId: "BAT004", batchName: "Batch D", standard: "Std 9",
    teacherId: "TCH004", teacherName: "Amit Kapoor", type: "Homework", difficulty: "Easy",
    assignedDate: "2026-04-05", dueDate: "2026-04-18", dueTime: "23:59", totalMarks: 10, passingMarks: 4,
    isGraded: true, status: "Active", attachments: [], totalStudents: 28, submittedCount: 10,
    gradedCount: 0, viewedCount: 20, lateSubmissions: 0, averageScore: null,
    allowLateSubmission: true, latePenaltyPercent: 5, notifyStudents: true, notifyOnSubmission: false,
    reminderEnabled: true, reminderSentAt: null, createdAt: "2026-04-05", publishedAt: "2026-04-05", closedAt: null
  },
  {
    id: "ASN005", title: "Biology Cell Structure", description: "Complete the lab report on cell structure observation.",
    instructions: ["Include sketches of plant and animal cells"],
    subject: "Biology", subjectColor: "#1D4ED8", batchId: "BAT003", batchName: "Batch C", standard: "Std 12",
    teacherId: "TCH003", teacherName: "Sunita Rao", type: "Lab Work", difficulty: "Medium",
    assignedDate: "2026-03-05", dueDate: "2026-03-25", dueTime: "23:59", totalMarks: 25, passingMarks: 10,
    isGraded: true, status: "Graded", attachments: [], totalStudents: 35, submittedCount: 33,
    gradedCount: 33, viewedCount: 35, lateSubmissions: 2, averageScore: 20.4,
    allowLateSubmission: false, latePenaltyPercent: 0, notifyStudents: true, notifyOnSubmission: true,
    reminderEnabled: false, reminderSentAt: null, createdAt: "2026-03-05", publishedAt: "2026-03-05", closedAt: "2026-03-26"
  },
  {
    id: "ASN006", title: "Algebra Practice Sheet", description: "Additional practice for algebra basics.",
    instructions: ["Solve all problems", "Optional submission"],
    subject: "Maths", subjectColor: "#7E22CE", batchId: "BAT005", batchName: "Batch E", standard: "Std 10",
    teacherId: "TCH005", teacherName: "Meena Gupta", type: "Practice", difficulty: "Easy",
    assignedDate: "2026-04-08", dueDate: "2026-04-14", dueTime: "23:59", totalMarks: null, passingMarks: null,
    isGraded: false, status: "Active", attachments: [], totalStudents: 15, submittedCount: 12,
    gradedCount: 0, viewedCount: 15, lateSubmissions: 0, averageScore: null,
    allowLateSubmission: true, latePenaltyPercent: 0, notifyStudents: true, notifyOnSubmission: false,
    reminderEnabled: false, reminderSentAt: null, createdAt: "2026-04-08", publishedAt: "2026-04-08", closedAt: null
  },
  {
    id: "ASN007", title: "Hindi Story Writing", description: "Write a story in Hindi targeting moral values.",
    instructions: ["Use simple Hindi", "Minimum 1 page"],
    subject: "Hindi", subjectColor: "#BE185D", batchId: "BAT004", batchName: "Batch D", standard: "Std 9",
    teacherId: "TCH004", teacherName: "Amit Kapoor", type: "Homework", difficulty: "Easy",
    assignedDate: "2026-04-01", dueDate: "2026-04-10", dueTime: "23:59", totalMarks: 10, passingMarks: 4,
    isGraded: true, status: "Closed", attachments: [], totalStudents: 28, submittedCount: 25,
    gradedCount: 0, viewedCount: 28, lateSubmissions: 3, averageScore: null,
    allowLateSubmission: false, latePenaltyPercent: 0, notifyStudents: true, notifyOnSubmission: false,
    reminderEnabled: false, reminderSentAt: null, createdAt: "2026-04-01", publishedAt: "2026-04-01", closedAt: "2026-04-11"
  },
  {
    id: "ASN008", title: "Physics Lab Report", description: "Lab report on mechanics experiments.",
    instructions: ["Data analysis should be detailed"],
    subject: "Physics", subjectColor: "#15803D", batchId: "BAT003", batchName: "Batch C", standard: "Std 12",
    teacherId: "TCH002", teacherName: "Rahul Joshi", type: "Lab Work", difficulty: "Hard",
    assignedDate: "2026-03-10", dueDate: "2026-04-01", dueTime: "23:59", totalMarks: 30, passingMarks: 12,
    isGraded: true, status: "Graded", attachments: [], totalStudents: 35, submittedCount: 34,
    gradedCount: 34, viewedCount: 35, lateSubmissions: 0, averageScore: 24.1,
    allowLateSubmission: false, latePenaltyPercent: 0, notifyStudents: true, notifyOnSubmission: true,
    reminderEnabled: false, reminderSentAt: null, createdAt: "2026-03-10", publishedAt: "2026-03-10", closedAt: "2026-04-02"
  },
  {
    id: "ASN009", title: "Maths Project \u2014 Statistics", description: "Group project on real-world statistics application.",
    instructions: ["Group size: 3-4", "Prepare a PPT"],
    subject: "Maths", subjectColor: "#7E22CE", batchId: "BAT002", batchName: "Batch B", standard: "Std 11",
    teacherId: "TCH001", teacherName: "Priya Sharma", type: "Project", difficulty: "Hard",
    assignedDate: "2026-04-01", dueDate: "2026-04-30", dueTime: "23:59", totalMarks: 50, passingMarks: 20,
    isGraded: true, status: "Active", attachments: [], totalStudents: 38, submittedCount: 5,
    gradedCount: 0, viewedCount: 15, lateSubmissions: 0, averageScore: null,
    allowLateSubmission: true, latePenaltyPercent: 10, notifyStudents: true, notifyOnSubmission: false,
    reminderEnabled: true, reminderSentAt: null, createdAt: "2026-04-01", publishedAt: "2026-04-01", closedAt: null
  },
  {
    id: "ASN010", title: "Reading \u2014 Ch 5 Summary", description: "Summarize Chapter 5 of English reader.",
    instructions: ["Focus on characters and plot"],
    subject: "English", subjectColor: "#B45309", batchId: "BAT001", batchName: "Batch A", standard: "Std 10",
    teacherId: "TCH001", teacherName: "Priya Sharma", type: "Reading", difficulty: "Easy",
    assignedDate: "2026-04-09", dueDate: "2026-04-13", dueTime: "23:59", totalMarks: null, passingMarks: null,
    isGraded: false, status: "Active", attachments: [], totalStudents: 42, submittedCount: 30,
    gradedCount: 0, viewedCount: 40, lateSubmissions: 0, averageScore: null,
    allowLateSubmission: true, latePenaltyPercent: 0, notifyStudents: true, notifyOnSubmission: false,
    reminderEnabled: false, reminderSentAt: null, createdAt: "2026-04-09", publishedAt: "2026-04-09", closedAt: null
  },
  {
    id: "ASN011", title: "Chem Periodic Table Sheet", description: "Fill in the periodic table properties sheet.",
    instructions: ["Include atomic mass and Valency"],
    subject: "Chemistry", subjectColor: "#C2410C", batchId: "BAT001", batchName: "Batch A", standard: "Std 10",
    teacherId: "TCH003", teacherName: "Sunita Rao", type: "Practice", difficulty: "Medium",
    assignedDate: "2026-03-15", dueDate: "2026-03-25", dueTime: "23:59", totalMarks: 15, passingMarks: 6,
    isGraded: true, status: "Graded", attachments: [], totalStudents: 42, submittedCount: 41,
    gradedCount: 41, viewedCount: 42, lateSubmissions: 1, averageScore: 12.3,
    allowLateSubmission: false, latePenaltyPercent: 0, notifyStudents: true, notifyOnSubmission: true,
    reminderEnabled: false, reminderSentAt: null, createdAt: "2026-03-15", publishedAt: "2026-03-15", closedAt: "2026-03-26"
  },
  {
    id: "ASN012", title: "Bio Diagram Drawing", description: "Draw detailed diagrams for Chapter 6.",
    instructions: ["Label all parts correctly"],
    subject: "Biology", subjectColor: "#1D4ED8", batchId: "BAT002", batchName: "Batch B", standard: "Std 11",
    teacherId: "TCH003", teacherName: "Sunita Rao", type: "Homework", difficulty: "Medium",
    assignedDate: "2026-04-05", dueDate: "2026-04-19", dueTime: "23:59", totalMarks: 10, passingMarks: 4,
    isGraded: true, status: "Active", attachments: [], totalStudents: 38, submittedCount: 8,
    gradedCount: 0, viewedCount: 20, lateSubmissions: 0, averageScore: null,
    allowLateSubmission: true, latePenaltyPercent: 5, notifyStudents: true, notifyOnSubmission: false,
    reminderEnabled: true, reminderSentAt: null, createdAt: "2026-04-05", publishedAt: "2026-04-05", closedAt: null
  },
  {
    id: "ASN013", title: "English Reading Passage", description: "Read the assigned passage and answer questions.",
    instructions: ["Complete all 5 questions"],
    subject: "English", subjectColor: "#B45309", batchId: "BAT002", batchName: "Batch B", standard: "Std 11",
    teacherId: "TCH002", teacherName: "Rahul Joshi", type: "Reading", difficulty: "Easy",
    assignedDate: "2026-03-01", dueDate: "2026-03-08", dueTime: "23:59", totalMarks: null, passingMarks: null,
    isGraded: false, status: "Closed", attachments: [], totalStudents: 38, submittedCount: 36,
    gradedCount: 0, viewedCount: 38, lateSubmissions: 2, averageScore: null,
    allowLateSubmission: false, latePenaltyPercent: 0, notifyStudents: true, notifyOnSubmission: false,
    reminderEnabled: false, reminderSentAt: null, createdAt: "2026-03-01", publishedAt: "2026-03-01", closedAt: "2026-03-09"
  },
  {
    id: "ASN014", title: "Physics Numericals Set 2", description: "Advanced problems in Kinematics.",
    instructions: ["Use calculus where needed"],
    subject: "Physics", subjectColor: "#15803D", batchId: "BAT001", batchName: "Batch A", standard: "Std 10",
    teacherId: "TCH002", teacherName: "Rahul Joshi", type: "Homework", difficulty: "Hard",
    assignedDate: "2026-04-10", dueDate: "2026-04-20", dueTime: "23:59", totalMarks: 20, passingMarks: 8,
    isGraded: true, status: "Active", attachments: [], totalStudents: 42, submittedCount: 3,
    gradedCount: 0, viewedCount: 10, lateSubmissions: 0, averageScore: null,
    allowLateSubmission: true, latePenaltyPercent: 10, notifyStudents: true, notifyOnSubmission: false,
    reminderEnabled: true, reminderSentAt: null, createdAt: "2026-04-10", publishedAt: "2026-04-10", closedAt: null
  },
  {
    id: "ASN015", title: "Chemistry Reactions Draft", description: "Preliminary work on chemical reactions project.",
    instructions: ["Draft only, no grading yet"],
    subject: "Chemistry", subjectColor: "#C2410C", batchId: "BAT002", batchName: "Batch B", standard: "Std 11",
    teacherId: "TCH003", teacherName: "Sunita Rao", type: "Homework", difficulty: "Medium",
    assignedDate: "2026-04-11", dueDate: "2026-04-25", dueTime: "23:59", totalMarks: 15, passingMarks: 6,
    isGraded: true, status: "Draft", attachments: [], totalStudents: 38, submittedCount: 0,
    gradedCount: 0, viewedCount: 0, lateSubmissions: 0, averageScore: null,
    allowLateSubmission: true, latePenaltyPercent: 0, notifyStudents: false, notifyOnSubmission: false,
    reminderEnabled: false, reminderSentAt: null, createdAt: "2026-04-11", publishedAt: null, closedAt: null
  },
  {
    id: "ASN016", title: "Std 12 Board Practice Paper", description: "Full length mock paper for board exam preparation.",
    instructions: ["Time limit: 3 hours", "Standard marking system"],
    subject: "Maths", subjectColor: "#7E22CE", batchId: "BAT003", batchName: "Batch C", standard: "Std 12",
    teacherId: "TCH001", teacherName: "Priya Sharma", type: "Practice", difficulty: "Hard",
    assignedDate: "2026-04-05", dueDate: "2026-04-25", dueTime: "23:59", totalMarks: 100, passingMarks: 33,
    isGraded: true, status: "Active", attachments: [], totalStudents: 35, submittedCount: 14,
    gradedCount: 0, viewedCount: 25, lateSubmissions: 0, averageScore: null,
    allowLateSubmission: true, latePenaltyPercent: 0, notifyStudents: true, notifyOnSubmission: false,
    reminderEnabled: true, reminderSentAt: null, createdAt: "2026-04-05", publishedAt: "2026-04-05", closedAt: null
  }
];

const generateSubmissions = () => {
  const submissions: Submission[] = [];
  
  // Only generate submissions for assignments that have submissions in the mock list
  // Specifically focused on ASN003, ASN005, ASN008, ASN011 as they are "Graded"
  const gradedAssignments = assignmentsMock.filter(a => a.status === "Graded" || a.submittedCount > 0);
  
  gradedAssignments.forEach(assignment => {
    const batchStudents = students.filter(s => s.batch === assignment.batchName);
    
    // Simple logic: first 'assignment.submittedCount' students have submitted
    batchStudents.slice(0, assignment.submittedCount).forEach((student, index) => {
      const isLate = index < assignment.lateSubmissions;
      const submittedAtDate = new Date(assignment.assignedDate);
      submittedAtDate.setDate(submittedAtDate.getDate() + 5); // 5 days after assigned
      if (isLate) submittedAtDate.setDate(new Date(assignment.dueDate).getDate() + 1); // 1 day late

      const marksObtained = assignment.status === "Graded" ? (assignment.averageScore ? Math.round(assignment.averageScore + (Math.random() * 4 - 2)) : null) : null;
      let percentage = null;
      let grade = null;

      if (marksObtained !== null && assignment.totalMarks !== null) {
        percentage = Math.round((marksObtained / assignment.totalMarks) * 100);
        const gRow = gradeScale.find(g => percentage! >= g.minPercent && percentage! <= g.maxPercent);
        grade = gRow ? gRow.grade : "F";
      }

      submissions.push({
        id: `SUB-${assignment.id}-${student.id}`,
        assignmentId: assignment.id,
        studentId: student.id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        batchId: assignment.batchId,
        submittedAt: submittedAtDate.toISOString().split('T')[0] + " 10:34 PM",
        isLate,
        latePenaltyApplied: isLate ? assignment.latePenaltyPercent : 0,
        files: [
          { id: `file-1-${student.id}`, fileName: `${student.name.replace(' ', '_')}_Solution.pdf`, fileType: "pdf", fileSize: "2.4 MB", uploadedAt: submittedAtDate.toISOString() }
        ],
        marksObtained,
        maxMarks: assignment.totalMarks,
        percentage,
        grade,
        feedback: assignment.status === "Graded" ? "Good work, keep it up!" : null,
        status: assignment.status === "Graded" ? "Graded" : "Submitted",
        gradedAt: assignment.status === "Graded" ? new Date(assignment.dueDate).toISOString() : null,
        gradedBy: assignment.teacherName
      });
    });

    // Add missing students
    batchStudents.slice(assignment.submittedCount).forEach(student => {
      submissions.push({
        id: `SUB-${assignment.id}-${student.id}`,
        assignmentId: assignment.id,
        studentId: student.id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        batchId: assignment.batchId,
        submittedAt: "",
        isLate: false,
        latePenaltyApplied: 0,
        files: [],
        marksObtained: null,
        maxMarks: assignment.totalMarks,
        percentage: null,
        grade: null,
        feedback: null,
        status: "Missing",
        gradedAt: null,
        gradedBy: null
      });
    });
  });

  return submissions;
};

export const studentSubmissions: Submission[] = generateSubmissions();

export const timetableMock = [
  { day: "Mon", time: "8:00 AM", subject: "Maths", batch: "Batch A" },
  { day: "Mon", time: "10:00 AM", subject: "Physics", batch: "Batch C" },
  { day: "Tue", time: "10:00 AM", subject: "Maths", batch: "Batch B" },
  { day: "Wed", time: "8:00 AM", subject: "Maths", batch: "Batch A" },
  { day: "Thu", time: "4:00 PM", subject: "Chemistry", batch: "Batch D" },
  { day: "Fri", time: "8:00 AM", subject: "Maths", batch: "Batch A" },
  { day: "Sat", time: "10:00 AM", subject: "Maths", batch: "Batch B" }
];

export const crmLeadsMock = {
  "New Leads": [
    { institute: "Alpha Academy", contact: "Ravi Teja", phone: "9876543001", note: "Call back next week" },
    { institute: "Summit Classes", contact: "Poonam Das", phone: "9876543002", note: "Interested in Pro" },
    { institute: "Apex Tutors", contact: "Rakesh Sen", phone: "9876543003", note: "Need demo" },
    { institute: "Bright Minds", contact: "Sunil Roy", phone: "9876543004", note: "Pricing too high" },
  ],
  "Contacted": [
    { institute: "Vision Tutorials", contact: "Deepa Ahuja", phone: "9876543005", note: "Checking with partner" },
    { institute: "Pioneer Institute", contact: "Anil Kumar", phone: "9876543006", note: "Follow up Mon" },
    { institute: "Horizon Coaching", contact: "Geeta Singh", phone: "9876543007", note: "Sent email" }
  ],
  "Demo Done": [
    { institute: "A1 Classes", contact: "Vikram Batra", phone: "9876543008", note: "Liked attendance module" },
    { institute: "Excel Point", contact: "Neeraj Chop", phone: "9876543009", note: "Awaiting approval" }
  ],
  "Converted": [
    { institute: "Success Academy", contact: "Manish Raj", phone: "9876543010", note: "Onboarded details" },
    { institute: "Career Makers", contact: "Nidhi Shah", phone: "9876543011", note: "Training ongoing" }
  ]
};

export const adminCustomersMock = [
  { institute: "Success Academy", contact: "+91 9876543010", plan: "Pro", status: "Active", expiry: "12 May 2027" },
  { institute: "Career Makers", contact: "+91 9876543011", plan: "Basic", status: "Active", expiry: "28 Feb 2027" },
  { institute: "Newton Tutorials", contact: "+91 9872223334", plan: "Free", status: "Active", expiry: "N/A" },
  { institute: "Toppers Point", contact: "+91 9873334445", plan: "Pro", status: "Active", expiry: "15 Jan 2027" },
  { institute: "Elite Coaching", contact: "+91 9874445556", plan: "Pro", status: "Expired", expiry: "01 Mar 2026" }
];

// --- Attendance Mock Data Generation ---

export const attendanceSettings: AttendanceSettings = {
  workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  warningThreshold: 75,
  alertThreshold: 60,
  autoReminderEnabled: true,
  autoReminderThreshold: 75,
  allowPastDays: 7,
  lateWindowMinutes: 30,
};

export const holidays: Holiday[] = [
  { id: "HOL001", date: "2026-01-26", name: "Republic Day", type: "National", appliesTo: "all" },
  { id: "HOL002", date: "2026-04-14", name: "Ambedkar Jayanti", type: "National", appliesTo: "all" },
  { id: "HOL003", date: "2026-05-01", name: "Maharashtra Day", type: "State", appliesTo: "all" },
];

const BATCH_SCHEDULES: Record<string, string[]> = {
  "Batch A": ["Monday", "Wednesday", "Friday"],
  "Batch B": ["Tuesday", "Thursday", "Saturday"],
  "Batch C": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  "Batch D": ["Monday", "Wednesday", "Friday"],
  "Batch E": ["Tuesday", "Thursday"],
  "Batch F": ["Monday", "Wednesday", "Friday"],
  "Batch G": ["Tuesday", "Thursday", "Saturday"],
  "Batch H": ["Saturday"],
};

const generateAttendance = () => {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const dayName = dayNames[date.getDay()];

    if (dayName === "Sunday") continue;

    batches.forEach((batch) => {
      const schedule = BATCH_SCHEDULES[batch.name];
      if (!schedule || !schedule.includes(dayName)) return;

      // Find students in this batch
      const batchStudents = students.filter((s) => s.batch === batch.name);

      batchStudents.forEach((student) => {
        const rand = Math.random() * 100;
        let status: AttendanceStatus = "Present";
        let arrivalTime: string | undefined = undefined;

        if (rand < 5) status = "Absent";
        else if (rand < 8) status = "Late";
        else if (rand < 10) status = "Leave";

        if (status === "Late") arrivalTime = "08:15 AM";

        records.push({
          id: `ATT-${batch.id}-${student.id}-${dateStr}`,
          studentId: student.id,
          studentName: student.name,
          rollNumber: student.rollNumber,
          batchId: batch.id,
          batchName: batch.name,
          date: dateStr,
          status,
          arrivalTime,
          markedBy: batch.teacher.name,
          markedAt: `${dateStr}T09:15:00`,
        });
      });
    });
  }
  return records;
};

export const attendanceRecords = generateAttendance();

export const rooms: Room[] = [
  { id: "RM001", name: "Room 101", capacity: 50, available: true },
  { id: "RM002", name: "Room 102", capacity: 45, available: true },
  { id: "RM003", name: "Room 103", capacity: 40, available: true },
  { id: "RM004", name: "Room 104", capacity: 40, available: true },
  { id: "RM005", name: "Hall",     capacity: 150, available: true },
];

export const teacherAvailability: TeacherAvailability[] = [
  {
    teacherId: "TCH001", teacherName: "Priya Sharma",
    subjects: ["Maths", "Physics"],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    availableTimeStart: "08:00", availableTimeEnd: "14:00",
    maxPeriodsPerDay: 3, maxPeriodsPerWeek: 14,
    preferredBatches: ["BAT001", "BAT005"],
    unavailableDates: ["2026-04-15"]
  },
  {
    teacherId: "TCH002", teacherName: "Rahul Joshi",
    subjects: ["Physics", "Chemistry"],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    availableTimeStart: "10:00", availableTimeEnd: "18:00",
    maxPeriodsPerDay: 3, maxPeriodsPerWeek: 14,
    preferredBatches: ["BAT002", "BAT006"],
    unavailableDates: []
  },
  {
    teacherId: "TCH003", teacherName: "Sunita Rao",
    subjects: ["Biology", "Chemistry"],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableTimeStart: "09:00", availableTimeEnd: "15:00",
    maxPeriodsPerDay: 2, maxPeriodsPerWeek: 10,
    preferredBatches: ["BAT003", "BAT007"],
    unavailableDates: []
  },
  {
    teacherId: "TCH004", teacherName: "Amit Kapoor",
    subjects: ["Maths", "English"],
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    availableTimeStart: "16:00", availableTimeEnd: "20:00",
    maxPeriodsPerDay: 2, maxPeriodsPerWeek: 8,
    preferredBatches: ["BAT004", "BAT008"],
    unavailableDates: []
  },
  {
    teacherId: "TCH005", teacherName: "Meena Gupta",
    subjects: ["English", "Hindi"],
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    availableTimeStart: "14:00", availableTimeEnd: "20:00",
    maxPeriodsPerDay: 2, maxPeriodsPerWeek: 6,
    preferredBatches: ["BAT005"],
    unavailableDates: []
  },
];

export const subjectsPerBatch: SubjectsPerBatch[] = [
  {
    batchId: "BAT001", batchName: "Batch A",
    subjects: [
      { name: "Mathematics", color: "#5E4E99", teacherId: "TCH001", periodsPerWeek: 3, periodDuration: 120 },
      { name: "Physics",     color: "#1D9E75", teacherId: "TCH002", periodsPerWeek: 2, periodDuration: 120 },
      { name: "Chemistry",   color: "#D85A30", teacherId: "TCH003", periodsPerWeek: 2, periodDuration: 120 },
    ]
  },
  {
    batchId: "BAT002", batchName: "Batch B",
    subjects: [
      { name: "Physics",     color: "#1D9E75", teacherId: "TCH002", periodsPerWeek: 3, periodDuration: 120 },
      { name: "Chemistry",   color: "#D85A30", teacherId: "TCH002", periodsPerWeek: 2, periodDuration: 120 },
      { name: "Mathematics", color: "#5E4E99", teacherId: "TCH001", periodsPerWeek: 2, periodDuration: 120 },
    ]
  },
  {
    batchId: "BAT003", batchName: "Batch C",
    subjects: [
      { name: "Biology",     color: "#378ADD", teacherId: "TCH003", periodsPerWeek: 3, periodDuration: 120 },
      { name: "Chemistry",   color: "#D85A30", teacherId: "TCH003", periodsPerWeek: 2, periodDuration: 120 },
      { name: "Physics",     color: "#1D9E75", teacherId: "TCH002", periodsPerWeek: 2, periodDuration: 120 },
    ]
  },
  {
    batchId: "BAT004", batchName: "Batch D",
    subjects: [
      { name: "English",     color: "#BA7517", teacherId: "TCH004", periodsPerWeek: 3, periodDuration: 120 },
      { name: "Mathematics", color: "#5E4E99", teacherId: "TCH004", periodsPerWeek: 2, periodDuration: 120 },
      { name: "Hindi",       color: "#9E1D6A", teacherId: "TCH005", periodsPerWeek: 2, periodDuration: 120 },
    ]
  },
];

export const activeTimetable: GeneratedTimetable = {
  version: 1,
  generatedAt: "2026-04-11T19:00:00",
  status: "Active",
  batches: ["BAT001", "BAT002", "BAT003", "BAT004"],
  entries: [
    { id: "E001", slotId: "S1", day: "Monday", startTime: "08:00", endTime: "10:00", batchId: "BAT001", batchName: "Batch A", subject: "Mathematics", subjectColor: "#5E4E99", teacherId: "TCH001", teacherName: "Priya Sharma", roomId: "RM001", roomName: "Room 101", type: "Regular", weekStartDate: "2026-04-07" },
    { id: "E002", slotId: "S2", day: "Monday", startTime: "10:00", endTime: "12:00", batchId: "BAT001", batchName: "Batch A", subject: "Physics", subjectColor: "#1D9E75", teacherId: "TCH002", teacherName: "Rahul Joshi", roomId: "RM001", roomName: "Room 101", type: "Regular", weekStartDate: "2026-04-07" },
    { id: "E003", slotId: "S1", day: "Tuesday", startTime: "08:00", endTime: "10:00", batchId: "BAT002", batchName: "Batch B", subject: "Physics", subjectColor: "#1D9E75", teacherId: "TCH002", teacherName: "Rahul Joshi", roomId: "RM002", roomName: "Room 102", type: "Regular", weekStartDate: "2026-04-07" },
    { id: "E004", slotId: "S2", day: "Tuesday", startTime: "10:00", endTime: "12:00", batchId: "BAT002", batchName: "Batch B", subject: "Chemistry", subjectColor: "#D85A30", teacherId: "TCH003", teacherName: "Sunita Rao", roomId: "RM002", roomName: "Room 102", type: "Regular", weekStartDate: "2026-04-07" },
    { id: "E005", slotId: "S3", day: "Wednesday", startTime: "12:00", endTime: "14:00", batchId: "BAT003", batchName: "Batch C", subject: "Biology", subjectColor: "#378ADD", teacherId: "TCH003", teacherName: "Sunita Rao", roomId: "RM003", roomName: "Room 103", type: "Regular", weekStartDate: "2026-04-07" },
  ],
  conflicts: [],
  warnings: [],
  stats: {
    totalPeriodsScheduled: 5,
    teacherUtilization: { "TCH001": 20, "TCH002": 40, "TCH003": 40 },
    roomUtilization: { "RM001": 40, "RM002": 40, "RM003": 20 },
    unscheduledSubjects: []
  }
};
