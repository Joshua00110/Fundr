import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, SafeAreaView, 
  TouchableOpacity, ActivityIndicator, Alert 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { db, auth } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPool, setTotalPool] = useState(0);

  useEffect(() => {
    fetchDonationData();
  }, []);

  const fetchDonationData = async () => {
    try {
      const q = query(collection(db, "users"), orderBy("totalDonated", "desc"));
      const querySnapshot = await getDocs(q);
      
      let total = 0;
      const fetchedUsers = querySnapshot.docs.map(doc => {
        const data = doc.data();
        total += data.totalDonated || 0;
        return { id: doc.id, ...data };
      });

      setUsers(fetchedUsers);
      setTotalPool(total);
    } catch (error) {
      console.error(error);
      Alert.alert("Access Denied", "You do not have permission to view this data.");
      router.replace('/(tabs)');
    } finally {
      setLoading(false);
    }
  };

  const renderUserItem = ({ item }: any) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userRole}>{item.role?.toUpperCase() || 'DONOR'}</Text>
      </View>
      <View style={styles.donationInfo}>
        <Text style={styles.donationAmount}>₱{item.totalDonated?.toLocaleString()}</Text>
        <Text style={styles.donationLabel}>Total Given</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingCenter}>
        <ActivityIndicator size="large" color="#2d3737" />
        <Text>Loading Fundr Records...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Panel</Text>
        <TouchableOpacity onPress={fetchDonationData}>
          <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Summary Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <MaterialCommunityIcons name="finance" size={24} color="#2d3737" />
          <Text style={styles.statValue}>₱{totalPool.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Raised</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="people" size={24} color="#2d3737" />
          <Text style={styles.statValue}>{users.length}</Text>
          <Text style={styles.statLabel}>Total Donors</Text>
        </View>
      </View>

      <Text style={styles.listHeader}>Donor Rankings</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F7' },
  loadingCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { 
    backgroundColor: '#1A2138', 
    padding: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingTop: 50
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  statsRow: { flexDirection: 'row', padding: 20, gap: 15 },
  statBox: { 
    flex: 1, 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 15, 
    elevation: 3,
    alignItems: 'center'
  },
  statValue: { fontSize: 20, fontWeight: 'bold', marginVertical: 5 },
  statLabel: { color: '#888', fontSize: 12 },
  listHeader: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 25, marginVertical: 10 },
  listContent: { paddingHorizontal: 20, paddingBottom: 30 },
  userCard: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 10
  },
  userInfo: { flex: 0.7 },
  userEmail: { fontSize: 14, fontWeight: '600', color: '#333' },
  userRole: { fontSize: 10, color: '#4A90E2', fontWeight: 'bold', marginTop: 3 },
  donationInfo: { alignItems: 'flex-end' },
  donationAmount: { fontSize: 16, fontWeight: 'bold', color: '#2d3737' },
  donationLabel: { fontSize: 10, color: '#999' }
});