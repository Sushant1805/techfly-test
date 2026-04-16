import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import {
  colors, typography, radius, shadows, students,
} from '../../src/data/mockData';
import { Avatar } from '../../src/components/ui/Avatar';
import { Button } from '../../src/components/ui/Button';
import { Check, X, ChevronDown } from 'lucide-react-native';

const BATCHES = ['Batch A', 'Batch B', 'Batch C', 'Batch D', 'Batch E'];

export default function AttendanceScreen() {
  const [selectedBatch, setSelectedBatch] = useState('Batch A');
  const [selectedDate] = useState('Sat, 12 Apr 2026');
  const [showBatchPicker, setShowBatchPicker] = useState(false);

  const batchStudents = students.filter(s => s.batch === selectedBatch);

  const [attendance, setAttendance] = useState<Record<string, boolean | null>>(() =>
    batchStudents.reduce((acc, s) => ({ ...acc, [s.id]: null }), {} as Record<string, boolean | null>)
  );

  useEffect(() => {
    const fresh = students
      .filter(s => s.batch === selectedBatch)
      .reduce((acc, s) => ({ ...acc, [s.id]: null }), {} as Record<string, boolean | null>);
    setAttendance(fresh);
  }, [selectedBatch]);

  const toggle = (id: string, val: boolean) => {
    setAttendance(prev => ({ ...prev, [id]: prev[id] === val ? null : val }));
  };

  const presentCount = Object.values(attendance).filter(v => v === true).length;
  const absentCount = Object.values(attendance).filter(v => v === false).length;
  const unmarked = batchStudents.length - presentCount - absentCount;

  return (
    <View style={s.container}>

      {/* ── Selectors ── */}
      <View style={s.selectorsRow}>
        {/* Batch selector */}
        <TouchableOpacity
          style={s.selectorPill}
          onPress={() => setShowBatchPicker(p => !p)}
          activeOpacity={0.8}
        >
          <Text style={s.selectorText}>{selectedBatch}</Text>
          <ChevronDown size={14} color={colors.primary} strokeWidth={2.5} />
        </TouchableOpacity>

        {/* Date pill */}
        <View style={[s.selectorPill, s.datePill]}>
          <Text style={s.selectorText}>{selectedDate}</Text>
        </View>
      </View>

      {/* Batch picker dropdown */}
      {showBatchPicker && (
        <View style={s.batchDropdown}>
          {BATCHES.map(b => (
            <TouchableOpacity
              key={b}
              style={[s.batchOption, selectedBatch === b && s.batchOptionActive]}
              onPress={() => { setSelectedBatch(b); setShowBatchPicker(false); }}
            >
              <Text style={[s.batchOptionText, selectedBatch === b && s.batchOptionTextActive]}>
                {b}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ── Summary Chips ── */}
      <View style={s.summaryRow}>
        <View style={s.chip}>
          <Text style={s.chipLabel}>Total</Text>
          <Text style={s.chipValue}>{batchStudents.length}</Text>
        </View>
        <View style={[s.chip, { backgroundColor: colors.successBg }]}>
          <Text style={[s.chipLabel, { color: colors.success }]}>Present</Text>
          <Text style={[s.chipValue, { color: colors.success }]}>{presentCount}</Text>
        </View>
        <View style={[s.chip, { backgroundColor: colors.dangerBg }]}>
          <Text style={[s.chipLabel, { color: colors.danger }]}>Absent</Text>
          <Text style={[s.chipValue, { color: colors.danger }]}>{absentCount}</Text>
        </View>
        <View style={[s.chip, { backgroundColor: colors.warningBg }]}>
          <Text style={[s.chipLabel, { color: colors.warning }]}>Unmarked</Text>
          <Text style={[s.chipValue, { color: colors.warning }]}>{unmarked}</Text>
        </View>
      </View>

      {/* ── Student List ── */}
      <ScrollView
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
      >
        {batchStudents.map(student => {
          const isPresent = attendance[student.id] === true;
          const isAbsent = attendance[student.id] === false;

          return (
            <View key={student.id} style={s.studentRow}>
              <View style={s.studentLeft}>
                <Avatar name={student.name} size={44} />
                <View>
                  <Text style={s.studentName}>{student.name}</Text>
                  <Text style={s.studentClass}>{student.class}</Text>
                </View>
              </View>

              {/* P / A toggle */}
              <View style={s.toggleWrap}>
                <TouchableOpacity
                  style={[s.toggleBtn, isPresent && s.togglePresent]}
                  onPress={() => toggle(student.id, true)}
                  activeOpacity={0.8}
                >
                  <Check size={18} color={isPresent ? '#FFF' : colors.textMuted} strokeWidth={2.5} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[s.toggleBtn, isAbsent && s.toggleAbsent]}
                  onPress={() => toggle(student.id, false)}
                  activeOpacity={0.8}
                >
                  <X size={18} color={isAbsent ? '#FFF' : colors.textMuted} strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ── Sticky Save ── */}
      <View style={s.stickyBottom}>
        <Button
          title="Save Attendance"
          onPress={() => {}}
          size="lg"
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Selectors
  selectorsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  selectorPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: radius['2xl'],
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...shadows.card,
  },
  datePill: {
    borderColor: colors.primaryMuted,
    backgroundColor: colors.primaryMuted,
  },
  selectorText: {
    fontSize: 13,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },

  // Batch picker dropdown
  batchDropdown: {
    position: 'absolute',
    top: 78,
    left: 20,
    right: '52%',
    backgroundColor: '#FFF',
    borderRadius: radius.xl,
    zIndex: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
  },
  batchOption: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  batchOptionActive: {
    backgroundColor: colors.primaryMuted,
  },
  batchOptionText: {
    fontSize: 13,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  batchOptionTextActive: {
    color: colors.primary,
    fontWeight: typography.black,
  },

  // Summary chips
  summaryRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  chip: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: radius.xl,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  chipLabel: {
    fontSize: 8,
    fontWeight: typography.black,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.textMuted,
    marginBottom: 4,
  },
  chipValue: {
    fontSize: 18,
    fontWeight: typography.black,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },

  // Student list
  list: {
    paddingHorizontal: 20,
    gap: 10,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: radius['2xl'],
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...shadows.card,
  },
  studentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  studentName: {
    fontSize: 14,
    fontWeight: typography.black,
    color: colors.textPrimary,
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  studentClass: {
    fontSize: 11,
    fontWeight: typography.medium,
    color: colors.textMuted,
  },

  // Toggle
  toggleWrap: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: radius.lg,
    padding: 4,
    gap: 4,
  },
  toggleBtn: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  togglePresent: {
    backgroundColor: colors.success,
    ...shadows.card,
  },
  toggleAbsent: {
    backgroundColor: colors.danger,
    ...shadows.card,
  },

  // Sticky bottom
  stickyBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: '#FFFFFFEE',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
});
