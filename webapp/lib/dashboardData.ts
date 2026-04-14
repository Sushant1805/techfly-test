// lib/dashboardData.ts
// Today's date for mock purposes: 11 Apr 2026 (Saturday)

export interface StatCard {
  title: string;
  value: string;
  sub: string;
  icon: string | any;
  color: string;
  bg: string;
  trend?: string;
  isProgress?: boolean;
  progressValue?: number;
}

export interface ScheduleItem {
  id: string;
  time: string;
  subject: string;
  batch: string;
  teacher: string;
  room: string;
  color: string;
  isOngoing?: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'attendance' | 'fee' | 'test' | 'assignment' | 'crm' | 'system';
  desc: string;
  time: string;
  user?: string;
}

export interface BatchSummary {
  id: string;
  name: string;
  standard: string;
  strength: number;
  capacity: number;
  attendance: number;
  status: 'Critical' | 'Healthy' | 'Moderate';
}

export interface DashboardData {
  institute: {
    name: string;
    ownerName: string;
    plan: string;
  };
  metrics: StatCard[];
  schedule: ScheduleItem[];
  activity: ActivityItem[];
  attendanceTrend: { day: string; percentage: number }[];
  feeSnapshot: {
    totalTarget: string;
    collected: string;
    collectedPercent: number;
    pending: string;
    overdue: string;
  };
  batchSummaries: BatchSummary[];
  upcomingTests: { id: string; subject: string; date: string; time: string; color: string; urgency: 'high' | 'medium' | 'low' }[];
  pendingTasks: { id: string; task: string; priority: 'High' | 'Medium' | 'Low'; due: string }[];
  revenueData: { month: string; target: number; collected: number; pending: number }[];
  topStudents: { id: string; name: string; rank: number; score: string; avatar?: string }[];
}

import { 
  Users, CheckSquare, IndianRupee, FileText, 
  MessageSquare, UserCheck, BookOpen, Clock, 
  AlertCircle, CheckCircle2, TrendingUp, Star
} from 'lucide-react';

export const dashboardData: DashboardData = {
  institute: {
    name: "Raj Science Classes",
    ownerName: "Rajesh Mehta",
    plan: "Pro",
  },
  metrics: [
    { title: "Total Students", value: "348", sub: "+12 from last month", icon: Users, color: "text-brand-blue", bg: "bg-brand-blue/10", trend: "+3.2%" },
    { title: "Today's Attendance", value: "87%", sub: "302/348 present", icon: CheckSquare, color: "text-green-500", bg: "bg-green-50", isProgress: true, progressValue: 87 },
    { title: "Pending Fees", value: "₹1.42L", sub: "42 students pending", icon: IndianRupee, color: "text-red-500", bg: "bg-red-50" },
    { title: "Fee Collection", value: "78%", sub: "₹8.2L collected", icon: CheckCircle2, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Active Batches", value: "12", sub: "8 capacity full", icon: BookOpen, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Upcoming Tests", value: "6", sub: "Next in 18 hours", icon: FileText, color: "text-cyan-600", bg: "bg-cyan-50" },
  ],
  schedule: [
    { id: "1", time: "08:00 AM", subject: "Maths", batch: "Batch A - Std 10", teacher: "Priya Sharma", room: "Room 101", color: "bg-purple-600" },
    { id: "2", time: "10:00 AM", subject: "Physics", batch: "Batch C - Std 12", teacher: "Rahul Joshi", room: "Room 103", color: "bg-green-500", isOngoing: true },
    { id: "3", time: "04:00 PM", subject: "Chemistry", batch: "Batch D - Std 9", teacher: "Sunita Rao", room: "Room 104", color: "bg-orange-400" },
    { id: "4", time: "05:00 PM", subject: "Biology", batch: "Batch E - Foundation", teacher: "Amit Kapoor", room: "Room 101", color: "bg-cyan-500" },
    { id: "5", time: "06:30 PM", subject: "Maths", batch: "Batch B - Std 11", teacher: "Priya Sharma", room: "Room 102", color: "bg-purple-600" },
  ],
  activity: [
    { id: "1", type: "attendance", desc: "Priya Sharma marked attendance for Batch A", time: "10 mins ago", user: "Priya Sharma" },
    { id: "2", type: "test", desc: "Amit Kumar scheduled a Mid-Term Physics test", time: "1 hour ago", user: "Amit Kumar" },
    { id: "3", type: "fee", desc: "Fee payment of ₹2500 received from Aarav Patel", time: "2 hours ago", user: "Finance Dept" },
    { id: "4", type: "crm", desc: "New lead 'Alpha Academy' added to CRM", time: "3 hours ago", user: "System" },
    { id: "5", type: "assignment", desc: "Neha Gupta uploaded Biology assignment", time: "5 hours ago", user: "Neha Gupta" },
    { id: "6", type: "system", desc: "System backup completed successfully", time: "8 hours ago", user: "Auto-System" },
    { id: "7", type: "test", desc: "Results published for Chemistry Unit Test", time: "Yesterday", user: "Sunita Rao" },
    { id: "8", type: "attendance", desc: "3 Students sent auto-absent SMS alerts", time: "Yesterday", user: "System" },
  ],
  attendanceTrend: [
    { day: 'Mon', percentage: 92 },
    { day: 'Tue', percentage: 88 },
    { day: 'Wed', percentage: 95 },
    { day: 'Thu', percentage: 85 },
    { day: 'Fri', percentage: 90 },
    { day: 'Sat', percentage: 82 },
  ],
  feeSnapshot: {
    totalTarget: "₹12.5L",
    collected: "₹9.8L",
    collectedPercent: 78,
    pending: "₹1.4L",
    overdue: "₹1.3L",
  },
  batchSummaries: [
    { id: "1", name: "Batch A", standard: "Std 10", strength: 48, capacity: 50, attendance: 92, status: 'Healthy' },
    { id: "2", name: "Batch B", standard: "Std 11", strength: 32, capacity: 45, attendance: 84, status: 'Moderate' },
    { id: "3", name: "Batch C", standard: "Std 12", strength: 38, capacity: 40, attendance: 78, status: 'Critical' },
    { id: "4", name: "Batch D", standard: "Std 9", strength: 24, capacity: 40, attendance: 95, status: 'Healthy' },
  ],
  upcomingTests: [
    { id: "t1", subject: "Maths", date: "16 Apr", time: "09:00 AM", color: "bg-purple-600", urgency: 'high' },
    { id: "t2", subject: "Physics", date: "18 Apr", time: "10:30 AM", color: "bg-green-500", urgency: 'medium' },
    { id: "t3", subject: "Chemistry", date: "20 Apr", time: "11:00 AM", color: "bg-orange-400", urgency: 'low' },
  ],
  pendingTasks: [
    { id: "p1", task: "Review Staff Payroll for March", priority: "High", due: "Today" },
    { id: "p2", task: "Update GST details in Settings", priority: "Medium", due: "In 2 days" },
    { id: "p3", task: "Call 5 inactive student parents", priority: "High", due: "Today" },
    { id: "p4", task: "Prepare Annual Day Schedule", priority: "Low", due: "Next week" },
  ],
  revenueData: [
    { month: 'Jan', target: 800000, collected: 750000, pending: 50000 },
    { month: 'Feb', target: 850000, collected: 820000, pending: 30000 },
    { month: 'Mar', target: 900000, collected: 880000, pending: 20000 },
    { month: 'Apr', target: 1000000, collected: 780000, pending: 220000 },
  ],
  topStudents: [
    { id: "s1", name: "Arjun Mehta", rank: 1, score: "98.4%", avatar: "S" },
    { id: "s2", name: "Sneha Patel", rank: 2, score: "96.2%", avatar: "S" },
    { id: "s3", name: "Rohan Desai", rank: 3, score: "94.8%", avatar: "R" },
    { id: "s4", name: "Ananya Singh", rank: 4, score: "93.1%", avatar: "A" },
    { id: "s5", name: "Vivek Nair", rank: 5, score: "91.5%", avatar: "V" },
  ],
};
