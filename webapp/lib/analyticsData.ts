import {
  students,
  attendanceRecords,
  feeRecords,
  assignmentsMock,
  studentSubmissions
} from './mockData';

// --- Interfaces ---

export interface GlobalFilter {
  dateRange: 'thisWeek' | 'thisMonth' | 'lastMonth' | 'last3Months' | 'thisYear' | 'custom';
  dateFrom: string;
  dateTo: string;
  batchId: string | 'all';
  standard: string | 'all';
}

export interface KPICardData {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  changeLabel: string;
  icon: string;
  iconBgColor: string;
  sparklineData: number[]; // 5 points
}

export interface MonthlyTrend {
  month: string;
  students: number;
  revenue: number;
  target: number;
  shortMonth?: string;
}

export interface AttendanceStats {
  overallRate: number;
  bestDay: string;
  worstDay: string;
  bestBatch: string;
  belowThresholdCount: number;
}

export interface FeeAnalytics {
  totalRevenue: number;
  mrr: number;
  collectionRate: number;
  pending: number;
  overdue: number;
  concessions: number;
}

export interface AcademicAnalytics {
  testsConducted: number;
  avgScore: number;
  passRate: number;
  assignmentsCount: number;
  submissionRate: number;
}

export interface HealthScore {
  overall: number;
  grade: 'Excellent' | 'Good' | 'Average' | 'Needs Attention';
  components: {
    name: string;
    score: number;
    grade: string;
    weight: number;
    value: string;
  }[];
  insight: string;
}

// --- Data Aggregation Helpers ---

// Mock historical trend (Jan - Apr 2026)
export const monthlyTrends: MonthlyTrend[] = [
  { month: 'Jan 2026', shortMonth: 'Jan', students: 250, revenue: 162000, target: 180000 },
  { month: 'Feb 2026', shortMonth: 'Feb', students: 290, revenue: 174000, target: 180000 },
  { month: 'Mar 2026', shortMonth: 'Mar', students: 330, revenue: 186000, target: 180000 },
  { month: 'Apr 2026', shortMonth: 'Apr', students: 348, revenue: 189000, target: 200000 },
];

export const studentGrowthData = [
  { month: 'Oct 2025', students: 198 },
  { month: 'Nov 2025', students: 210 },
  { month: 'Dec 2025', students: 228 },
  { month: 'Jan 2026', students: 250 },
  { month: 'Feb 2026', students: 290 },
  { month: 'Mar 2026', students: 330 },
  { month: 'Apr 2026', students: 348 },
];

// Subject breakdown stats
export const subjectStats = [
  { subject: 'Maths', score: 72, color: '#5E4E99' },
  { subject: 'Physics', score: 68, color: '#1D9E75' },
  { subject: 'Chemistry', score: 61, color: '#D85A30' },
  { subject: 'Biology', score: 77, color: '#378ADD' },
  { subject: 'English', score: 84, color: '#BA7517' },
];

// Mock health score
export const instituteHealth: HealthScore = {
  overall: 82,
  grade: 'Good',
  components: [
    { name: 'Enrollment Growth', score: 85, grade: 'A', weight: 0.20, value: '+10.1%/mo' },
    { name: 'Attendance Rate', score: 88, grade: 'A-', weight: 0.25, value: '88.4%' },
    { name: 'Fee Collection', score: 78, grade: 'B+', weight: 0.25, value: '78% collected' },
    { name: 'Academic Performance', score: 74, grade: 'B+', weight: 0.20, value: '74.2% avg' },
    { name: 'Assignment Rate', score: 74, grade: 'B', weight: 0.10, value: '74% submitted' },
  ],
  insight: "Good performance overall. Focus area: Chemistry scores and pending fee collection."
};

// Top Performing Batches
export const topBatches = [
  { id: 'BAT001', name: 'Batch A', standard: 'Std 10', attendance: 91, avgScore: 76, feeCollection: 94, insight: 'Best' },
  { id: 'BAT003', name: 'Batch C', standard: 'Std 12', attendance: 88, avgScore: 74, feeCollection: 91, insight: '' },
  { id: 'BAT002', name: 'Batch B', standard: 'Std 11', attendance: 84, avgScore: 71, feeCollection: 88, insight: '' },
  { id: 'BAT004', name: 'Batch D', standard: 'Std 9', attendance: 87, avgScore: 79, feeCollection: 87, insight: '' },
  { id: 'BAT005', name: 'Batch E', standard: 'Std 10', attendance: 80, avgScore: 68, feeCollection: 63, insight: '' },
];

// Student counts
export const studentSummaryStats = {
  total: 348,
  newThisMonth: 12,
  inactive: 8,
  left: 3,
  genderRatio: "58:42",
};

// Fee stats summary
export const feeAnalytics: FeeAnalytics = {
  totalRevenue: 861000,
  mrr: 189000,
  collectionRate: 78,
  pending: 112750,
  overdue: 44000,
  concessions: 14400,
};

// Academic summary
export const academicAnalytics: AcademicAnalytics = {
  testsConducted: 6,
  avgScore: 74.2,
  passRate: 82,
  assignmentsCount: 8,
  submissionRate: 74,
};

// Attendance stats
export const attendanceAnalytics: AttendanceStats = {
  overallRate: 88.4,
  bestDay: 'Wednesday',
  worstDay: 'Saturday',
  bestBatch: 'Batch A',
  belowThresholdCount: 14,
};

// --- Helpers to derive dynamic data based on filter ---

export const getKpiData = (filter: GlobalFilter): KPICardData[] => {
  // Mock filter logic
  return [
    { id: 'students', label: 'Total Students', value: 348, change: 12, changeType: 'increase', changeLabel: 'this mo', icon: 'Users', iconBgColor: 'bg-purple-100 text-purple-600', sparklineData: [310, 325, 318, 335, 348] },
    { id: 'batches', label: 'Active Batches', value: 5, change: 0, changeType: 'neutral', changeLabel: 'this mo', icon: 'LayoutGrid', iconBgColor: 'bg-blue-100 text-blue-600', sparklineData: [5, 5, 5, 5, 5] },
    { id: 'attendance', label: 'Avg Attendance', value: '88.4%', change: 2.1, changeType: 'increase', changeLabel: 'vs last mo', icon: 'Calendar', iconBgColor: 'bg-green-100 text-green-600', sparklineData: [85, 87, 86, 88, 88.4] },
    { id: 'revenue', label: 'Fee Collection', value: '₹1.89L', change: 14, changeType: 'increase', changeLabel: 'vs last mo', icon: 'CreditCard', iconBgColor: 'bg-amber-100 text-amber-600', sparklineData: [160, 175, 170, 185, 189] },
    { id: 'tests', label: 'Tests Conducted', value: 6, change: 1, changeType: 'increase', changeLabel: 'this month', icon: 'FileText', iconBgColor: 'bg-pink-100 text-pink-600', sparklineData: [4, 6, 5, 7, 6] },
    { id: 'assignments', label: 'Assignments', value: 8, change: 2, changeType: 'increase', changeLabel: 'active', icon: 'Send', iconBgColor: 'bg-indigo-100 text-indigo-600', sparklineData: [5, 6, 8, 7, 8] },
  ];
};

export const getInsights = (filter: GlobalFilter) => [
  { text: "Student enrollment grew 10.1% — highest growth in 6 months", type: 'positive' },
  { text: "Batch A is the top performer across all metrics", type: 'positive' },
  { text: "Chemistry average (61%) is below the 70% target", type: 'warning' },
  { text: "Batch E has the lowest fee collection rate (63%)", type: 'warning' },
  { text: "14 students have attendance below 75%", type: 'warning' },
  { text: "Consider extra class for Chemistry in Batch B and C", type: 'suggestion' },
  { text: "Send fee reminders to Batch E parents this week", type: 'suggestion' },
];

export const studentFunnelData = [
  { name: 'Total Enrolled', count: 348, percent: 100, color: 'bg-purple-600' },
  { name: 'Active', count: 332, percent: 95, color: 'bg-purple-500' },
  { name: 'Regularly Attending', count: 298, percent: 85, color: 'bg-purple-400' },
  { name: 'Fees Paid', count: 261, percent: 75, color: 'bg-purple-300' },
  { name: 'Academically Good', count: 218, percent: 62, color: 'bg-indigo-300' },
];

export const dayPatternData = [
  { day: 'Mon', rate: 91 },
  { day: 'Tue', rate: 86 },
  { day: 'Wed', rate: 89 },
  { day: 'Thu', rate: 84 },
  { day: 'Fri', rate: 88 },
  { day: 'Sat', rate: 74 },
];

export const subjectDifficultyData = [
  { subject: 'Chemistry', failRate: 39, label: 'Hardest' },
  { subject: 'Physics', failRate: 28, label: '' },
  { subject: 'Mathematics', failRate: 18, label: '' },
  { subject: 'Biology', failRate: 12, label: '' },
  { subject: 'Hindi', failRate: 10, label: '' },
  { subject: 'English', failRate: 8, label: 'Easiest' },
];
