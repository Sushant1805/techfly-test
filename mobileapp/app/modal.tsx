import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { colors, typography, radius, shadows } from '@/src/data/mockData';
import { Card } from '@/src/components/ui/Card';
import { Info, ExternalLink as ExternalLinkIcon } from 'lucide-react-native';

export default function ModalScreen() {
  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.header}>
          <View style={s.iconCircle}>
            <Info size={24} color={colors.primary} strokeWidth={2.5} />
          </View>
          <Text style={s.title}>Help & Information</Text>
          <Text style={s.subtitle}>Learn more about EzzyCoach Mobile</Text>
        </View>

        <Card style={s.infoCard}>
          <Text style={s.cardTitle}>Quick Guide</Text>
          <Text style={s.cardText}>
            This mobile application is designed for teachers to manage their daily schedules, 
            track student attendance, and create tests on the go.
          </Text>
          <View style={s.divider} />
          <View style={s.linkItem}>
            <Text style={s.linkText}>View Documentation</Text>
            <ExternalLinkIcon size={14} color={colors.primary} />
          </View>
        </Card>

        <View style={s.versionBox}>
          <Text style={s.versionText}>Version 1.0.0 (Build 2026.04.12)</Text>
          <Text style={s.copyrightText}>© 2026 TechFly. All rights reserved.</Text>
        </View>
      </ScrollView>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: 24,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: typography.black,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: typography.medium,
    color: colors.textMuted,
    marginTop: 4,
  },
  infoCard: {
    width: '100%',
    padding: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: typography.black,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    fontWeight: typography.regular,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 20,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  linkText: {
    fontSize: 14,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  versionBox: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  versionText: {
    fontSize: 12,
    fontWeight: typography.medium,
    color: colors.textMuted,
  },
  copyrightText: {
    fontSize: 10,
    fontWeight: typography.medium,
    color: colors.textMuted,
    marginTop: 4,
  },
});
