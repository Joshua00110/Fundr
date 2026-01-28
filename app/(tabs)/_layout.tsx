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
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.activePill]}>
              <Ionicons name="home" size={22} color={focused ? '#1A2138' : '#999'} />
              {focused && <Text style={styles.tabText}>Home</Text>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.activePill]}>
              <Ionicons name="compass-outline" size={24} color={focused ? '#1A2138' : '#999'} />
              {focused && <Text style={styles.tabText}>Explore</Text>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.activePill]}>
              <Ionicons name={focused ? "person" : "person-outline"} size={24} color={focused ? '#1A2138' : '#999'} />
              {focused && <Text style={styles.tabText}>Profile</Text>}
            </View>
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
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderTopWidth: 0,
    zIndex: 1000,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activePill: {
    backgroundColor: 'rgba(231, 179, 83, 0.3)', // 30% Gold Pill
  },
  tabText: {
    color: '#1A2138',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 13,
  },
});