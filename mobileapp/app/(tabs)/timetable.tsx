import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import {
  colors, typography, radius, shadows, timetableMock,
} from '../../src/data/mockData';
import { Card } from '../../src/components/ui/Card';
import { Clock, DoorOpen } from 'lucide-react-native';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function TimetableScreen() {
  const [selectedDay, setSelectedDay] = useState('Mon');

  const dayClasses = timetableMock.filter(t => t.day === selectedDay);

  return (
    <View style={s.container}>

      {/* ── Day Selector ── */}
      <View style={s.daySelectorWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.dayScroll}
        >
          {DAYS.map(day => {
            const isActive = selectedDay === day;
            return (
              <TouchableOpacity
                key={day}
                style={[s.dayPill, isActive && s.dayPillActive]}
                onPress={() => setSelectedDay(day)}
                activeOpacity={0.75}
              >
                <Text style={[s.dayText, isActive && s.dayTextActive]}>{day}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Class count badge ── */}
      <View style={s.sectionHeader}>
        <Text style={s.sectionLabel}>
          {dayClasses.length} Class{dayClasses.length !== 1 ? 'es' : ''} Scheduled
        </Text>
      </View>

      {/* ── Classes list ── */}
      <ScrollView
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
      >
        {dayClasses.length === 0 ? (
          <View style={s.emptyState}>
            <Text style={s.emptyEmoji}>📭</Text>
            <Text style={s.emptyTitle}>No Classes Today</Text>
            <Text style={s.emptySubtitle}>Enjoy your free day!</Text>
          </View>
        ) : (
          dayClasses.map((cls, idx) => (
            <Card key={idx} style={s.classCard}>
              {/* Colored left accent */}
              <View style={[s.accentBar, { backgroundColor: cls.color }]} />

              <View style={s.classContent}>
                {/* Top: subject + batch */}
                <View style={s.classTop}>
                  <Text style={s.classSubject}>{cls.subject}</Text>
                  <View style={[s.subjectPill, { backgroundColor: cls.color + '18' }]}>
                    <Text style={[s.subjectPillText, { color: cls.color }]}>{cls.batch}</Text>
                  </View>
                </View>

                {/* Bottom: time + room */}
                <View style={s.classMeta}>
                  <View style={s.metaItem}>
                    <Clock size={11} color={colors.primary} strokeWidth={2.5} />
                    <Text style={[s.metaText, { color: colors.primary }]}>{cls.time}</Text>
                  </View>
                  <View style={s.metaItem}>
                    <DoorOpen size={11} color={colors.textMuted} strokeWidth={2.5} />
                    <Text style={s.metaText}>{cls.room}</Text>
                  </View>
                </View>
              </View>
            </Card>
          ))
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Day selector
  daySelectorWrap: {
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dayScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  dayPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radius.full,
    backgroundColor: '#F1F5F9',
    minWidth: 60,
    alignItems: 'center',
  },
  dayPillActive: {
    backgroundColor: colors.primary,
    ...shadows.glow,
  },
  dayText: {
    fontSize: 13,
    fontWeight: typography.black,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  dayTextActive: {
    color: '#FFFFFF',
  },

  // Section header
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: typography.black,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  // List
  list: {
    paddingHorizontal: 20,
    gap: 12,
  },

  // Class card
  classCard: {
    flexDirection: 'row',
    padding: 0,
    overflow: 'hidden',
    alignItems: 'stretch',
  },
  accentBar: {
    width: 6,
    borderTopLeftRadius: radius['2xl'],
    borderBottomLeftRadius: radius['2xl'],
  },
  classContent: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  classTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  classSubject: {
    fontSize: 17,
    fontWeight: typography.black,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  subjectPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  subjectPillText: {
    fontSize: 10,
    fontWeight: typography.black,
    letterSpacing: 0.5,
  },
  classMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    fontWeight: typography.bold,
    color: colors.textMuted,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 72,
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: typography.black,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  emptySubtitle: {
    fontSize: 13,
    fontWeight: typography.medium,
    color: colors.textMuted,
  },
});
