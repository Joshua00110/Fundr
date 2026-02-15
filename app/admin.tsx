import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, SafeAreaView, 
  TouchableOpacity, ActivityIndicator, Alert, ScrollView 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { db } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// Ensure these are installed: npx expo install expo-file-system expo-sharing
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// This Interface removes the red lines from your 'item' variables
interface Transaction {
  id: string;
  donorEmail?: string;
  donor?: string;
  amount: number;
  category: string;
  method?: string;
  phoneNumber?: string;
  timestamp?: any;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [categoryTotals, setCategoryTotals] = useState({
    Health: 0,
    Education: 0,
    "Disaster Relief": 0,
    "Food Support": 0
  });

  const categories = ['All', 'Health', 'Education', 'Disaster Relief', 'Food Support'];

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const allQ = query(collection(db, "transactions"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(allQ);
      
      const allTrans: Transaction[] = [];
      const totals = { Health: 0, Education: 0, "Disaster Relief": 0, "Food Support": 0 };

      querySnapshot.forEach((doc) => {
        const data = doc.data() as any;
        allTrans.push({ id: doc.id, ...data });
        if (data.category && totals.hasOwnProperty(data.category)) {
          totals[data.category as keyof typeof totals] += data.amount || 0;
        }
      });

      setTransactions(allTrans);
      setCategoryTotals(totals);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load records.");
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    try {
      const filtered = selectedCategory === 'All' 
        ? transactions 
        : transactions.filter(t => t.category === selectedCategory);

      if (filtered.length === 0) {
        Alert.alert("Empty", "No data to export.");
        return;
      }

      let reportContent = `FUNDR REPORT: ${selectedCategory.toUpperCase()}\n`;
      reportContent += `Generated: ${new Date().toLocaleString()}\n`;
      reportContent += `==============================\n\n`;

      filtered.forEach((item: Transaction, index: number) => {
        const dateStr = item.timestamp?.toDate ? item.timestamp.toDate().toLocaleString() : "N/A";
        reportContent += `${index + 1}. DONOR: ${item.donorEmail || 'Anonymous'}\n`;
        reportContent += `   AMOUNT: ₱${(item.amount || 0).toLocaleString()}\n`;
        reportContent += `   SOURCE: ${item.method || 'Payment'} (${item.phoneNumber || 'N/A'})\n`;
        reportContent += `   DATE: ${dateStr}\n`;
        reportContent += `------------------------------\n`;
      });

      const total = filtered.reduce((sum, item: Transaction) => sum + (item.amount || 0), 0);
      reportContent += `\nTOTAL: ₱${total.toLocaleString()}`;

      const filename = `Report_${selectedCategory.replace(/\s+/g, '_')}.txt`;

      // --- CRITICAL FIX FOR YOUR RED LINES ---
      // We cast FileSystem as 'any' to force it to see the properties it's missing
      const fs = FileSystem as any;
      const fileUri = (fs.documentDirectory || fs.cacheDirectory) + filename;
      
      await fs.writeAsStringAsync(fileUri, reportContent, { 
        encoding: "utf8" 
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Error", "Sharing is not supported on Web. Please use a physical device.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Check terminal: Could not create report.");
    }
  };

  const filteredTransactions = selectedCategory === 'All' 
    ? transactions 
    : transactions.filter(t => t.category === selectedCategory);

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View style={styles.recordCard}>
      <View style={styles.recordLeft}>
        <Text style={styles.recordEmail}>{item.donorEmail || "Anonymous"}</Text>
        <Text style={styles.recordDate}>
          {item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : "N/A"}
        </Text>
        <View style={styles.sourceBox}>
          <MaterialCommunityIcons name="wallet" size={14} color="#555" />
          <Text style={styles.sourceText}>
            {item.method} {item.phoneNumber ? `(${item.phoneNumber})` : ''}
          </Text>
        </View>
      </View>
      <View style={styles.recordRight}>
        <Text style={styles.recordAmount}>₱{item.amount?.toLocaleString()}</Text>
        <View style={[styles.catBadge, { backgroundColor: getCatColor(item.category) }]}>
          <Text style={styles.catBadgeText}>{item.category}</Text>
        </View>
      </View>
    </View>
  );

  const getCatColor = (cat: string) => {
    switch(cat) {
      case 'Health': return '#FF7675';
      case 'Education': return '#4A90E2';
      case 'Disaster Relief': return '#55E6C1';
      case 'Food Support': return '#FDCB6E';
      default: return '#1A2138';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="white" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Fund Admin</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={generateReport} style={{ marginRight: 20 }}>
            <Ionicons name="download-outline" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={fetchAdminData}><Ionicons name="refresh" size={26} color="white" /></TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
        {Object.entries(categoryTotals).map(([cat, total]) => (
          <View key={cat} style={styles.catStatBox}>
            <Text style={styles.catStatLabel}>{cat}</Text>
            <Text style={styles.catStatValue}>₱{total.toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.filterTab, selectedCategory === cat && styles.filterTabActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.filterTabText, selectedCategory === cat && styles.filterTabTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={loading ? <ActivityIndicator /> : <Text style={styles.emptyText}>No records found.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { backgroundColor: '#1A2138', padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  statsScroll: { paddingLeft: 20, paddingVertical: 15, maxHeight: 120 },
  catStatBox: { backgroundColor: 'white', width: 150, padding: 15, borderRadius: 15, marginRight: 12, elevation: 3 },
  catStatLabel: { fontSize: 10, color: '#999', fontWeight: 'bold' },
  catStatValue: { fontSize: 16, fontWeight: 'bold', color: '#1A2138', marginTop: 5 },
  filterContainer: { paddingHorizontal: 20, marginVertical: 10 },
  filterTab: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 8, backgroundColor: '#E0E0E0' },
  filterTabActive: { backgroundColor: '#1A2138' },
  filterTabText: { fontSize: 12, color: '#666' },
  filterTabTextActive: { color: 'white', fontWeight: 'bold' },
  listContent: { padding: 20 },
  recordCard: { backgroundColor: 'white', padding: 15, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, borderLeftWidth: 5, borderLeftColor: '#1A2138' },
  recordLeft: { flex: 0.7 },
  recordEmail: { fontSize: 14, fontWeight: 'bold' },
  recordDate: { fontSize: 11, color: '#999' },
  sourceBox: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  sourceText: { fontSize: 11, color: '#555', marginLeft: 5 },
  recordRight: { alignItems: 'flex-end' },
  recordAmount: { fontSize: 16, fontWeight: 'bold' },
  catBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 5, marginTop: 5 },
  catBadgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#AAA' }
});