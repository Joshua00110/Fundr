import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PAYMENT_METHODS = [
  { id: 'gcash', name: 'GCash', icon: 'wallet', color: '#007dfe', provider: 'Ionicons' },
  { id: 'maya', name: 'Maya', icon: 'alpha-m-circle', color: '#00d084', provider: 'MaterialCommunityIcons' },
  { id: 'card', name: 'Credit/Debit Card', icon: 'card', color: '#1A2138', provider: 'Ionicons' },
  { id: 'bank', name: 'Bank Transfer', icon: 'business', color: '#FF9F43', provider: 'Ionicons' },
];
/** */
export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('gcash');

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="close" size={28} color="#1A2138" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>SELECT PROVIDER</Text>
        
        {PAYMENT_METHODS.map((method) => (
          <TouchableOpacity 
            key={method.id}
            style={[
              styles.methodCard,
              selectedMethod === method.id && styles.selectedCard
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <View style={styles.methodInfo}>
              <View style={[styles.iconCircle, { backgroundColor: method.color + '15' }]}>
                {method.provider === 'Ionicons' ? (
                  <Ionicons name={method.icon as any} size={24} color={method.color} />
                ) : (
                  <MaterialCommunityIcons name={method.icon as any} size={24} color={method.color} />
                )}
              </View>
              <Text style={styles.methodName}>{method.name}</Text>
            </View>
            <View style={[
              styles.radio, 
              selectedMethod === method.id && { borderColor: '#1A2138' }
            ]}>
              {selectedMethod === method.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.donationSummary}>
          <Text style={styles.summaryLabel}>Amount to Donate</Text>
          <Text style={styles.amountText}>₱ 1,000.00</Text>
          <Text style={styles.feeText}>+ ₱ 0.00 processing fee</Text>
        </View>
      </ScrollView>

      {/* FOOTER BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.confirmBtn}
          onPress={() => alert('Proceeding to ' + selectedMethod)}
        >
          <Text style={styles.confirmBtnText}>Continue to Secure Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 15,
    backgroundColor: '#FFF'
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A2138' },
  backBtn: { padding: 5 },
  content: { padding: 20 },
  sectionLabel: { fontSize: 12, fontWeight: 'bold', color: '#999', letterSpacing: 1, marginBottom: 15 },
  methodCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  selectedCard: { borderColor: '#1A2138' },
  methodInfo: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  methodName: { fontSize: 16, fontWeight: '600', color: '#1A2138' },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#1A2138' },
  donationSummary: { marginTop: 30, backgroundColor: '#1A2138', borderRadius: 20, padding: 25, alignItems: 'center' },
  summaryLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 5 },
  amountText: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
  feeText: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 5 },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE' },
  confirmBtn: { backgroundColor: '#FF9F43', padding: 18, borderRadius: 16, alignItems: 'center' },
  confirmBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});