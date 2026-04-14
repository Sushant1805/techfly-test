import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { colors, typography, radius, shadows, students } from '../../src/data/mockData';
import { Card } from '../../src/components/ui/Card';
import { Avatar } from '../../src/components/ui/Avatar';
import { Badge } from '../../src/components/ui/Badge';
import { Search, Phone, Mail } from 'lucide-react-native';

export default function StudentsScreen() {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? students.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.batch.toLowerCase().includes(query.toLowerCase()) ||
        s.class.toLowerCase().includes(query.toLowerCase())
      )
    : students;

  return (
    <View style={s.container}>
      {/* ── Search Bar ── */}
      <View style={s.searchWrap}>
        <View style={s.searchBar}>
          <Search size={18} color={colors.textMuted} strokeWidth={2} />
          <TextInput
            style={s.searchInput}
            placeholder="Search students…"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <View style={s.countPill}>
          <Text style={s.countText}>{filtered.length}</Text>
        </View>
      </View>

      {/* ── List ── */}
      <ScrollView
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map(student => {
          const attColor =
            student.attendancePerc >= 90
              ? colors.success
              : student.attendancePerc >= 75
              ? colors.warning
              : colors.danger;
          const attBg =
            student.attendancePerc >= 90
              ? colors.successBg
              : student.attendancePerc >= 75
              ? colors.warningBg
              : colors.dangerBg;

          return (
            <Card key={student.id} style={s.card}>
              {/* Top row */}
              <View style={s.topRow}>
                <Avatar name={student.name} size={48} />
                <View style={s.info}>
                  <Text style={s.name}>{student.name}</Text>
                  <Text style={s.meta}>{student.class} · {student.batch}</Text>
                </View>
                <View style={[s.attBadge, { backgroundColor: attBg }]}>
                  <Text style={[s.attText, { color: attColor }]}>
                    {student.attendancePerc}%
                  </Text>
                </View>
              </View>

              {/* Divider */}
              <View style={s.divider} />

              {/* Contact row */}
              <View style={s.contactRow}>
                <View style={s.contactItem}>
                  <Phone size={12} color={colors.textMuted} strokeWidth={2} />
                  <Text style={s.contactText}>{student.parentPhone}</Text>
                </View>
                <View style={s.contactItem}>
                  <Mail size={12} color={colors.textMuted} strokeWidth={2} />
                  <Text style={s.contactText} numberOfLines={1}>{student.email}</Text>
                </View>
              </View>
            </Card>
          );
        })}
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

  // Search bar
  searchWrap: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: radius['2xl'],
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...shadows.card,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: typography.medium,
    color: colors.textPrimary,
  },
  countPill: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 13,
    fontWeight: typography.black,
    color: colors.primary,
  },

  // List
  list: {
    paddingHorizontal: 20,
    gap: 12,
  },

  // Card
  card: {
    padding: 16,
    gap: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: typography.black,
    color: colors.textPrimary,
    letterSpacing: -0.2,
    marginBottom: 3,
  },
  meta: {
    fontSize: 12,
    fontWeight: typography.medium,
    color: colors.textMuted,
  },
  attBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  attText: {
    fontSize: 12,
    fontWeight: typography.black,
    letterSpacing: 0.2,
  },

  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },

  contactRow: {
    gap: 6,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 12,
    fontWeight: typography.medium,
    color: colors.textMuted,
    flex: 1,
  },
});
