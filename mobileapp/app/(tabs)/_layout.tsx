import React from 'react';
import { Tabs } from 'expo-router';
import { LayoutDashboard, CheckSquare, FileText, Users, Calendar } from 'lucide-react-native';
import { colors, radius, shadows } from '../../src/data/mockData';
import { View, Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 72,
          paddingBottom: Platform.OS === 'ios' ? 24 : 12,
          paddingTop: 10,
          marginHorizontal: 16,
          marginBottom: Platform.OS === 'ios' ? 8 : 12,
          borderRadius: radius['3xl'],
          position: 'absolute',
          ...shadows.soft,
        },
        tabBarItemStyle: {
          borderRadius: radius.xl,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '900',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          marginTop: 2,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          fontWeight: '900',
          fontSize: 22,
          color: colors.textPrimary,
          letterSpacing: -0.5,
        },
        headerShadowVisible: false,
        headerTitleAlign: 'left',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={LayoutDashboard} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: 'Attendance',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={CheckSquare} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="tests"
        options={{
          title: 'Tests',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={FileText} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          title: 'Students',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={Users} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="timetable"
        options={{
          title: 'Timetable',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={Calendar} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const TabIcon = ({ Icon, color, focused }: { Icon: any; color: string; focused: boolean }) => (
  <View
    style={{
      width: 36,
      height: 36,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: focused ? colors.primaryMuted : 'transparent',
    }}
  >
    <Icon size={20} color={color} strokeWidth={focused ? 2.5 : 1.8} />
  </View>
);
