import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function TabLayout() {
  return (
   <Tabs
  screenOptions={{
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#ffffff',
      elevation: 20,
      borderTopWidth: 0,
    },
    tabBarItemStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBarActiveTintColor: '#1A2138',
    tabBarInactiveTintColor: '#999',
  }}
>
  <Tabs.Screen
    name="index"
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" size={28} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="explore"
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="compass-outline" size={28} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="profile"
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person-outline" size={28} color={color} />
      ),
    }}
  />
</Tabs>

  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 20,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 35,
    height: 70,
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderTopWidth: 0,
  },

  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    width: '100%',
  },

  activePill: {
    backgroundColor: 'rgba(231, 179, 83, 0.3)', // 30% gold pill
  },

  tabText: {
    color: '#1A2138',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 13,
  },
});
