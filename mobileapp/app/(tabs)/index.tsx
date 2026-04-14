import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../src/components/ui/Card';
import { Avatar } from '../../src/components/ui/Avatar';
import { colors, typography, radius, shadows, teacherProfile, dashboardStats, todaysClasses } from '../../src/data/mockData';
import { CheckSquare, FilePlus, Users, Calendar, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const QUICK_ACTIONS = [
  { label: 'Attendance', sublabel: 'Mark Today', icon: CheckSquare, route: '/attendance', bg: colors.primaryMuted, color: colors.primary },
  { label: 'Tests',      sublabel: 'Create New',  icon: FilePlus,   route: '/tests',      bg: '#FEF3C7',          color: colors.warning },
  { label: 'Students',  sublabel: 'View All',    icon: Users,      route: '/students',   bg: '#DCFCE7',          color: colors.success },
  { label: 'Timetable', sublabel: 'This Week',   icon: Calendar,   route: '/timetable',  bg: '#F3E8FF',          color: '#7C3AED' },
];

export default function HomeScreen() {
  const router = useRouter();
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.greeting}>Good morning,</Text>
            <Text style={s.name}>{teacherProfile.name.split(' ')[0]} 👋</Text>
            <Text style={s.date}>{today}</Text>
          </View>
          <Avatar name={teacherProfile.name} size={52} />
        </View>

        {/* ── Stats Carousel ── */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionLabel}>Overview</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.statsScroll}
        >
          {dashboardStats.map((stat) => (
            <View key={stat.label} style={[s.statCard, { backgroundColor: stat.bg }]}>
              <Text style={[s.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={[s.statLabel, { color: stat.color }]}>{stat.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* ── Quick Actions ── */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionLabel}>Quick Actions</Text>
        </View>
        <View style={s.actionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={s.actionBtn}
              activeOpacity={0.75}
              onPress={() => router.push(action.route as any)}
            >
              <Card style={s.actionCard}>
                <View style={[s.actionIconCircle, { backgroundColor: action.bg }]}>
                  <action.icon size={22} color={action.color} strokeWidth={2.2} />
                </View>
                <Text style={s.actionTitle}>{action.label}</Text>
                <Text style={s.actionSub}>{action.sublabel}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Today's Classes ── */}
        <View style={[s.sectionHeader, { marginTop: 8 }]}>
          <Text style={s.sectionLabel}>Today's Classes</Text>
          <TouchableOpacity onPress={() => router.push('/timetable')} style={s.seeAll}>
            <Text style={s.seeAllText}>See All</Text>
            <ArrowRight size={13} color={colors.primary} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
        <View style={s.classesList}>
          {todaysClasses.map((cls) => (
            <Card key={cls.id} style={s.classCard}>
              <View style={[s.accentBar, { backgroundColor: cls.color }]} />
              <View style={s.classBody}>
                <View>
                  <Text style={s.classSubject}>{cls.subject}</Text>
                  <Text style={s.classBatch}>{cls.batch}</Text>
                </View>
                <View style={[s.timePill, { backgroundColor: cls.color + '18' }]}>
                  <Text style={[s.classTime, { color: cls.color }]}>{cls.time}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Bottom padding for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
    marginTop: 8,
  },
  headerLeft: { flex: 1 },
  greeting: {
    fontSize: 14,
    fontWeight: typography.medium,
    color: colors.textMuted,
    letterSpacing: 0.2,
  },
  name: {
    fontSize: 28,
    fontWeight: typography.black,
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 34,
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    fontWeight: typography.medium,
    color: colors.textMuted,
    marginTop: 4,
    letterSpacing: 0.2,
  },

  // Section heading
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: typography.black,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  seeAllText: {
    fontSize: 11,
    fontWeight: typography.bold,
    color: colors.primary,
  },

  // Stats
  statsScroll: {
    gap: 12,
    paddingRight: 4,
    marginBottom: 28,
  },
  statCard: {
    width: 130,
    borderRadius: radius['2xl'],
    padding: 20,
    justifyContent: 'space-between',
    gap: 10,
  },
  statValue: {
    fontSize: 30,
    fontWeight: typography.black,
    letterSpacing: -1,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: typography.bold,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },

  // Quick Actions
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  actionBtn: {
    width: '47%',
  },
  actionCard: {
    padding: 16,
    gap: 10,
  },
  actionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: typography.black,
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  actionSub: {
    fontSize: 11,
    fontWeight: typography.medium,
    color: colors.textMuted,
  },

  // Classes
  classesList: {
    gap: 10,
  },
  classCard: {
    flexDirection: 'row',
    padding: 0,
    overflow: 'hidden',
    alignItems: 'stretch',
  },
  accentBar: {
    width: 5,
    borderTopLeftRadius: radius['2xl'],
    borderBottomLeftRadius: radius['2xl'],
  },
  classBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  classSubject: {
    fontSize: 16,
    fontWeight: typography.black,
    color: colors.textPrimary,
    marginBottom: 3,
    letterSpacing: -0.2,
  },
  classBatch: {
    fontSize: 12,
    fontWeight: typography.medium,
    color: colors.textMuted,
  },
  timePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.xl,
  },
  classTime: {
    fontSize: 12,
    fontWeight: typography.black,
    letterSpacing: 0.2,
  },
});
