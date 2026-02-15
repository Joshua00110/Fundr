import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, 
  Alert, Modal, TextInput, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// FIREBASE IMPORTS
import { auth, db } from '../firebase'; 
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function ProfileScreen() {
  const router = useRouter();
  
  // --- State ---
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('Loading...');
  const [userRole, setUserRole] = useState<string | null>(null); // To store "admin" or "donor"
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [updating, setUpdating] = useState(false);

  // --- Load User Data ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        
        // Fetch specific user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setDisplayName(data.displayName || user.email?.split('@')[0]);
          setNewName(data.displayName || '');
          setUserRole(data.role); // This is where we get the "admin" status
        }
      } else {
        // Handle Guest State
        setUserEmail("Guest");
        setDisplayName("Guest User");
        setUserRole(null);
      }
    });
    return unsubscribe;
  }, []);

  // --- Update Name Logic ---
  const handleUpdateProfile = async () => {
    if (!newName.trim()) return;
    setUpdating(true);
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, "users", user.uid), { displayName: newName });
        setDisplayName(newName);
        setEditModalVisible(false);
        Alert.alert("Success", "Profile updated!");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  // --- Logout Logic ---
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Logout", 
        style: "destructive", 
        onPress: () => signOut(auth).then(() => router.replace('/auth')) 
      },
    ]);
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topNav}>
        <Text style={styles.topNavTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' }} 
            style={styles.avatar} 
          />
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userSubText}>{userEmail}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ACCOUNT SETTINGS</Text>
        </View>

        <View style={styles.menuContainer}>
          
          {/* 1. EDIT PROFILE OPTION */}
          <TouchableOpacity style={styles.menuItem} onPress={() => setEditModalVisible(true)}>
            <View style={styles.menuIconBg}>
              <Ionicons name="person-outline" size={20} color="#1A2138" />
            </View>
            <Text style={styles.menuText}>Edit Profile Name</Text>
            <Ionicons name="chevron-forward" size={18} color="#CCC" />
          </TouchableOpacity>

          {/* 2. ADMIN PANEL OPTION (Conditional) */}
          {userRole === "admin" && (
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => router.push('/admin')}
            >
              <View style={[styles.menuIconBg, { backgroundColor: '#FFD700' }]}>
                <Ionicons name="shield-checkmark" size={20} color="#000" />
              </View>
              <Text style={[styles.menuText, { fontWeight: 'bold' }]}>Open Admin Panel</Text>
              <Ionicons name="chevron-forward" size={18} color="#CCC" />
            </TouchableOpacity>
          )}

          {/* 3. LOGOUT OPTION */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
             <Ionicons name="log-out-outline" size={22} color="#FF7675" />
             <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 120 }} /> 
      </ScrollView>

      {/* EDIT MODAL */}
      <Modal visible={isEditModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Name</Text>
            <TextInput 
              style={styles.modalInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Your Name"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setEditModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.saveBtn]} onPress={handleUpdateProfile}>
                {updating ? <ActivityIndicator color="white" /> : <Text style={{color:'white', fontWeight:'bold'}}>Save</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: '#FFF' },
  topNav: { backgroundColor: '#1A2138', height: 100, justifyContent: 'center', alignItems: 'center', paddingTop: 40 },
  topNavTitle: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  scrollContent: { paddingTop: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  userName: { fontSize: 22, fontWeight: 'bold' },
  userSubText: { fontSize: 14, color: '#888' },
  sectionHeader: { paddingHorizontal: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#AAA' },
  menuContainer: { paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  menuIconBg: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F0F2FF', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  menuText: { flex: 1, fontSize: 15, color: '#333' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 30 },
  logoutText: { color: '#FF7675', fontWeight: 'bold', marginLeft: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', width: '80%', padding: 25, borderRadius: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  modalInput: { backgroundColor: '#F5F5F5', padding: 15, borderRadius: 10, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalBtn: { padding: 15, borderRadius: 10, width: '45%', alignItems: 'center' },
  cancelBtn: { backgroundColor: '#EEE' },
  saveBtn: { backgroundColor: '#1A2138' }
});