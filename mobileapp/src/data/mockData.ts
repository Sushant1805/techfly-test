// ─── Design Tokens (mirrors webapp design system) ───────────────────────────
export const colors = {
  // Brand — matches webapp's #0052FF
  primary: '#0052FF',
  primaryLight: '#337AFF',
  primaryMuted: '#EAF0FF',
  primaryGlow: 'rgba(0, 82, 255, 0.12)',

  // Backgrounds
  background: '#F0F4F9',   // webapp bg-soft
  surface: '#FFFFFF',
  surfaceSoft: '#F8FAFC',  // webapp slate-soft

  // Text
  textPrimary: '#1E293B',  // webapp text-slate
  textSecondary: '#64748B',
  textMuted: '#94A3B8',

  // Status
  success: '#16A34A',
  successBg: '#DCFCE7',
  warning: '#D97706',
  warningBg: '#FEF3C7',
  danger: '#DC2626',
  dangerBg: '#FEE2E2',

  // Borders
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
};

// Legacy alias — keeps backward compatibility with existing screens
export const brandColors = {
  primary: colors.primary,
  background: colors.background,
  card: colors.surface,
  text: colors.textPrimary,
  textMuted: colors.textMuted,
};

// ─── Shadow tokens ───────────────────────────────────────────────────────────
export const shadows = {
  soft: {
    shadowColor: '#0032FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  glow: {
    shadowColor: '#0052FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.32,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    shadowColor: '#0032FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
};

// ─── Typography tokens ───────────────────────────────────────────────────────
export const typography = {
  black: '900' as const,
  bold: '700' as const,
  semibold: '600' as const,
  medium: '500' as const,
  regular: '400' as const,
};

// ─── Spacing / Radius tokens ─────────────────────────────────────────────────
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  full: 9999,
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
export const teacherProfile = {
  name: 'Priya Sharma',
  subject: 'Maths',
  initials: 'PS',
};

export const todaysClasses = [
  { id: 'c1', subject: 'Maths', batch: 'Batch A — Std 10', time: '08:00 AM', color: '#0052FF' },
  { id: 'c2', subject: 'Physics', batch: 'Batch C — Std 12', time: '10:00 AM', color: '#16A34A' },
  { id: 'c3', subject: 'Maths', batch: 'Batch B — Std 11', time: '06:30 PM', color: '#7C3AED' },
];

export const students = [
  { id: 's1', name: 'Aarav Patel',   class: 'Std 10', batch: 'Batch A', parentPhone: '+91 98765 43210', email: 'aarav.p@example.com', attendancePerc: 92, status: 'Active' },
  { id: 's2', name: 'Diya Sharma',   class: 'Std 11', batch: 'Batch A', parentPhone: '+91 98765 43211', email: 'diya.s@example.com',  attendancePerc: 85, status: 'Active' },
  { id: 's3', name: 'Ishaan Gupta',  class: 'Std 12', batch: 'Batch C', parentPhone: '+91 98765 43212', email: 'ishaan.g@example.com', attendancePerc: 98, status: 'Active' },
  { id: 's4', name: 'Ananya Singh',  class: 'Std 9',  batch: 'Batch D', parentPhone: '+91 98765 43213', email: 'ananya.s@example.com', attendancePerc: 75, status: 'Active' },
  { id: 's5', name: 'Rohan Verma',   class: 'Foundation', batch: 'Batch E', parentPhone: '+91 98765 43214', email: 'rohan.v@example.com', attendancePerc: 88, status: 'Active' },
];

export const timetableMock = [
  { day: 'Mon', time: '8:00 AM',  subject: 'Maths',   batch: 'Batch A', room: 'Room 101', color: '#0052FF' },
  { day: 'Mon', time: '10:00 AM', subject: 'Physics',  batch: 'Batch C', room: 'Room 102', color: '#16A34A' },
  { day: 'Tue', time: '10:00 AM', subject: 'Maths',   batch: 'Batch B', room: 'Room 101', color: '#0052FF' },
  { day: 'Wed', time: '9:00 AM',  subject: 'Chemistry', batch: 'Batch C', room: 'Room 103', color: '#7C3AED' },
  { day: 'Thu', time: '8:00 AM',  subject: 'Maths',   batch: 'Batch B', room: 'Room 101', color: '#0052FF' },
  { day: 'Fri', time: '11:00 AM', subject: 'Physics',  batch: 'Batch A', room: 'Room 102', color: '#16A34A' },
];

export const testsMock = [
  { id: 't1', name: 'Mid-Term Physics', subject: 'Physics', batch: 'Batch C', date: '15 Apr 2026', totalMarks: 50 },
  { id: 't2', name: 'Maths Unit Test',  subject: 'Maths',   batch: 'Batch A', date: '10 Apr 2026', totalMarks: 25 },
  { id: 't3', name: 'Chemistry Quiz',   subject: 'Chemistry', batch: 'Batch C', date: '20 Apr 2026', totalMarks: 20 },
];

export const dashboardStats = [
  { label: "Today's Classes", value: '3',   color: '#0052FF', bg: '#EAF0FF' },
  { label: 'Students Present', value: '87%', color: '#16A34A', bg: '#DCFCE7' },
  { label: 'Tests This Week',  value: '2',   color: '#D97706', bg: '#FEF3C7' },
  { label: 'Low Attendance',   value: '4',   color: '#DC2626', bg: '#FEE2E2' },
];
