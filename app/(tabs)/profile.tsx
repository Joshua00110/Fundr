import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topNav}>
        <Text style={styles.topNavTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' }} 
            style={styles.avatar} 
          />
          <Text style={styles.userName}>Juan Dela Cruz</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgeScroll}>
          <View style={styles.badgeCard}>
            <View style={styles.badgeIconBg}>
              <Ionicons name="ribbon" size={32} color="#FF9F43" />
            </View>
            <Text style={styles.badgeName}>First Donor</Text>
          </View>

          <View style={styles.badgeCard}>
            <View style={[styles.badgeIconBg, { backgroundColor: 'rgba(129, 236, 236, 0.3)' }]}>
              <Ionicons name="flash" size={32} color="#00cec9" />
            </View>
            <Text style={styles.badgeName}>Quick Giver</Text>
          </View>

          <View style={styles.badgeCard}>
            <View style={[styles.badgeIconBg, { backgroundColor: 'rgba(231, 179, 83, 0.3)' }]}>
              <Ionicons name="heart" size={32} color="#e7b353" />
            </View>
            <Text style={styles.badgeName}>Life Saver</Text>
          </View>
        </ScrollView>

        <View style={styles.menuContainer}>
          <MenuOption icon="person-outline" title="Edit Profile" />
          <MenuOption icon="notifications-outline" title="Notifications" />
          <TouchableOpacity style={styles.logoutBtn}>
             <Ionicons name="log-out-outline" size={22} color="#FF7675" />
             <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Padding to ensure content isn't hidden by the floating tab bar */}
        <View style={{ height: 120 }} /> 
      </ScrollView>
    </View>
  );
}

// Sub-component for Menu Rows with TypeScript types
const MenuOption = ({ icon, title }: { icon: any; title: string }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuIconBg}>
      <Ionicons name={icon} size={20} color="#1A2138" />
    </View>
    <Text style={styles.menuText}>{title}</Text>
    <Ionicons name="chevron-forward" size={18} color="#CCC" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  mainWrapper: { 
    flex: 1, 
    backgroundColor: '#FFF' 
  },
  topNav: { 
    backgroundColor: '#1A2138', 
    height: 100, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 40 
  },
  topNavTitle: { 
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 18
  },
  scrollContent: { 
    paddingTop: 20 
  },
  profileHeader: { 
    alignItems: 'center', 
    marginBottom: 30 
  },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    marginBottom: 10 
  },
  userName: { 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  sectionHeader: { 
    paddingHorizontal: 20, 
    marginBottom: 15 
  },
  sectionTitle: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#888' 
  },
  badgeScroll: { 
    paddingLeft: 20 
  },
  badgeCard: { 
    alignItems: 'center', 
    marginRight: 20, 
    width: 90 
  },
  badgeIconBg: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: 'rgba(255, 159, 67, 0.2)', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 8
  },
  badgeName: { 
    fontSize: 11, 
    fontWeight: '600', 
    textAlign: 'center' 
  },
  menuContainer: { 
    paddingHorizontal: 20, 
    marginTop: 30 
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F5F5F5' 
  },
  menuIconBg: { 
    width: 36, 
    height: 36, 
    borderRadius: 10, 
    backgroundColor: '#F0F2FF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  menuText: { 
    flex: 1, 
    fontSize: 15, 
    fontWeight: '500', 
    color: '#333' 
  },
  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 30 
  },
  logoutText: { 
    color: '#FF7675', 
    fontWeight: 'bold', 
    marginLeft: 10 
  },
});