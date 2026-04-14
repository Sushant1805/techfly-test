import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import {
  colors, typography, radius, shadows, testsMock,
} from '../../src/data/mockData';
import { Card } from '../../src/components/ui/Card';
import { Badge } from '../../src/components/ui/Badge';
import { Button } from '../../src/components/ui/Button';
import { FilePlus, Calendar, Award, ChevronRight, X } from 'lucide-react-native';

export default function TestsScreen() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <View style={s.container}>
      {/* ── CTA Header ── */}
      <View style={s.ctaBar}>
        <Button
          title="Create New Test"
          icon={<FilePlus size={18} color="#FFF" strokeWidth={2.2} />}
          onPress={() => setShowCreate(true)}
          fullWidth
          size="lg"
        />
      </View>

      {/* ── Section label ── */}
      <View style={s.sectionHeader}>
        <Text style={s.sectionLabel}>Upcoming Tests</Text>
        <Badge label={`${testsMock.length} Tests`} variant="info" />
      </View>

      {/* ── Tests list ── */}
      <ScrollView
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
      >
        {testsMock.map(test => (
          <Card key={test.id} style={s.testCard}>
            {/* Card Header */}
            <View style={s.testHeader}>
              <View style={s.subjectTag}>
                <Text style={s.subjectTagText}>{test.subject}</Text>
              </View>
              <View style={s.marksBadge}>
                <Award size={12} color={colors.warning} strokeWidth={2.5} />
                <Text style={s.marksText}>{test.totalMarks} Marks</Text>
              </View>
            </View>

            {/* Test name */}
            <Text style={s.testName}>{test.name}</Text>
            <Text style={s.batchText}>{test.batch}</Text>

            <View style={s.divider} />

            {/* Footer */}
            <View style={s.testFooter}>
              <View style={s.dateRow}>
                <Calendar size={12} color={colors.textMuted} strokeWidth={2} />
                <Text style={s.dateText}>{test.date}</Text>
              </View>
              <TouchableOpacity style={s.enterMarksBtn} activeOpacity={0.8}>
                <Text style={s.enterMarksText}>Enter Marks</Text>
                <ChevronRight size={14} color={colors.primary} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          </Card>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Create Test Modal ── */}
      <Modal
        visible={showCreate}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCreate(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={s.modal}
        >
          {/* Modal Header */}
          <View style={s.modalHeader}>
            <View>
              <Text style={s.modalTitle}>Create Test</Text>
              <Text style={s.modalSub}>Fill in the details below</Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowCreate(false)}
              style={s.closeBtn}
            >
              <X size={20} color={colors.textPrimary} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={s.modalContent}>
            <FormField label="Test Name" placeholder="e.g. Mid-Term Maths" />
            <FormField label="Subject" placeholder="e.g. Maths" />
            <FormField label="Batch" placeholder="e.g. Batch A" />
            <FormField label="Date" placeholder="e.g. 20 Apr 2026" />
            <FormField label="Total Marks" placeholder="e.g. 50" keyboardType="numeric" />

            <View style={{ marginTop: 8 }}>
              <Button
                title="Create Test"
                onPress={() => setShowCreate(false)}
                fullWidth
                size="lg"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const FormField = ({
  label, placeholder, keyboardType,
}: {
  label: string;
  placeholder: string;
  keyboardType?: any;
}) => (
  <View style={ff.wrap}>
    <Text style={ff.label}>{label}</Text>
    <TextInput
      style={ff.input}
      placeholder={placeholder}
      placeholderTextColor={colors.textMuted}
      keyboardType={keyboardType}
    />
  </View>
);

const ff = StyleSheet.create({
  wrap: { marginBottom: 16 },
  label: {
    fontSize: 9,
    fontWeight: typography.black,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 14,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
});

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // CTA bar
  ctaBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
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
    gap: 14,
  },

  // Test card
  testCard: {
    padding: 20,
    gap: 8,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  subjectTag: {
    backgroundColor: colors.primaryMuted,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  subjectTagText: {
    fontSize: 10,
    fontWeight: typography.black,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  marksBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.warningBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  marksText: {
    fontSize: 11,
    fontWeight: typography.black,
    color: colors.warning,
  },
  testName: {
    fontSize: 17,
    fontWeight: typography.black,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  batchText: {
    fontSize: 12,
    fontWeight: typography.medium,
    color: colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  testFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    fontWeight: typography.medium,
    color: colors.textMuted,
  },
  enterMarksBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryMuted,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.xl,
  },
  enterMarksText: {
    fontSize: 12,
    fontWeight: typography.black,
    color: colors.primary,
  },

  // Modal
  modal: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: typography.black,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  modalSub: {
    fontSize: 13,
    fontWeight: typography.medium,
    color: colors.textMuted,
    marginTop: 2,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    padding: 24,
  },
});
