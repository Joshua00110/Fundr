import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, TextInput, 
  SafeAreaView, Alert, ScrollView, Modal, Image, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { auth, db } from './firebase'; 
import { doc, updateDoc, increment, arrayUnion, collection, addDoc, serverTimestamp } from 'firebase/firestore';


export default function PaymentScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  // --- ADDED: Category State ---
  const [selectedCategory, setSelectedCategory] = useState('Education');
  const categories = ['Education', 'Health', 'Environment', 'Food'];

  // 1. Open Wallet Selection
  const validateAndOpenWallets = () => {
    if (!auth.currentUser) {
      Alert.alert("Sign In Required", "Login to donate.", [{ text: "Sign In", onPress: () => router.push('/auth') }]);
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount.");
      return;
    }
    setShowWalletModal(true);
  };

  // 2. Show QR for selected wallet
  const handleSelectWallet = (wallet: string) => {
    setSelectedWallet(wallet);
    setShowWalletModal(false);
    setShowQRModal(true);
  };

  // 3. Simulate "Receiving" the payment
  const handleConfirmSent = async () => {
    setIsVerifying(true);
    
    // Simulate a 2-second check
    setTimeout(async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const donationAmount = parseFloat(amount);
          const userRef = doc(db, "users", user.uid);

          // UPDATE: Records the specific category in user history
          await updateDoc(userRef, {
            totalDonated: increment(donationAmount),
            donationHistory: arrayUnion({
              amount: donationAmount,
              method: selectedWallet,
              category: selectedCategory, // Added category here
              date: new Date().toISOString(),
            })
          });

          // ADDED: Create a separate transaction record for the Admin Panel
          await addDoc(collection(db, "transactions"), {
            donorEmail: user.email,
            donorUid: user.uid,
            amount: donationAmount,
            category: selectedCategory,
            method: selectedWallet,
            status: "completed",
            timestamp: serverTimestamp()
          });

          setIsVerifying(false);
          setShowQRModal(false);
          Alert.alert("Success!", `₱${amount} received for ${selectedCategory}. Thank you!`, [{ text: "Done", onPress: () => router.back() }]);
        }
      } catch (error) {
        setIsVerifying(false);
        Alert.alert("Error", "Could not update database.");
      }
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="black" /></TouchableOpacity>
          <Text style={styles.headerTitle}>Donation</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* --- ADDED: Category Selection --- */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionLabel}>Select Cause</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((cat) => (
              <TouchableOpacity 
                key={cat} 
                style={[styles.categoryTab, selectedCategory === cat && styles.categoryTabActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.categoryTabText, selectedCategory === cat && styles.categoryTabTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Amount (PHP)</Text>
          <TextInput style={styles.input} placeholder="0.00" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
        </View>

        <TouchableOpacity style={styles.payButton} onPress={validateAndOpenWallets}>
          <Text style={styles.payButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* --- WALLET SELECTION --- */}
      <Modal visible={showWalletModal} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <Text style={styles.modalTitle}>Choose E-Wallet</Text>
            <TouchableOpacity style={styles.walletBtn} onPress={() => handleSelectWallet('GCash')}>
              <View style={[styles.dot, { backgroundColor: '#007DFE' }]} /><Text style={styles.walletText}>GCash</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.walletBtn} onPress={() => handleSelectWallet('Maya')}>
              <View style={[styles.dot, { backgroundColor: '#36D13F' }]} /><Text style={styles.walletText}>Maya</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowWalletModal(false)}><Text>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* --- QR CODE MODAL --- */}
      <Modal visible={showQRModal} animationType="slide">
        <SafeAreaView style={styles.qrContainer}>
          <Text style={styles.qrTitle}>Scan to Pay via {selectedWallet}</Text>
          <Text style={styles.qrAmount}>₱{amount}</Text>
          
          <View style={styles.qrPlaceholder}>
             <Image 
                source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=FundrDonation' }} 
                style={styles.qrImage} 
             />
          </View>

          <Text style={styles.qrInstruction}>Payment for: <Text style={{fontWeight:'bold'}}>{selectedCategory}</Text></Text>
          <Text style={styles.qrInstructionSub}>Please scan the QR code above and complete the payment in your {selectedWallet} app.</Text>

          <TouchableOpacity 
            style={styles.confirmBtn} 
            onPress={handleConfirmSent}
            disabled={isVerifying}
          >
            {isVerifying ? <ActivityIndicator color="white" /> : <Text style={styles.confirmBtnText}>I have sent the payment</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowQRModal(false)} style={styles.backLink}>
            <Text style={{ color: '#666' }}>Go Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  
  // Added Styles for Categories
  categorySection: { marginBottom: 25 },
  sectionLabel: { fontSize: 14, fontWeight: 'bold', color: '#888', marginBottom: 10, marginLeft: 5 },
  categoryScroll: { flexDirection: 'row' },
  categoryTab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#eee', marginRight: 10 },
  categoryTabActive: { backgroundColor: '#2d3737' },
  categoryTabText: { color: '#666', fontWeight: '600' },
  categoryTabTextActive: { color: '#fff' },

  card: { backgroundColor: 'white', padding: 25, borderRadius: 20, elevation: 4, marginBottom: 25 },
  label: { fontSize: 14, color: '#888', marginBottom: 5 },
  input: { fontSize: 36, fontWeight: 'bold', color: '#2d3737' },
  payButton: { backgroundColor: '#2d3737', padding: 20, borderRadius: 15, alignItems: 'center' },
  payButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: 'white', padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  walletBtn: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#F8F9FA', borderRadius: 12, marginBottom: 10 },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 15 },
  walletText: { fontSize: 16, fontWeight: '600' },
  closeBtn: { marginTop: 10, alignItems: 'center', padding: 10 },

  qrContainer: { flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 30 },
  qrTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  qrAmount: { fontSize: 32, fontWeight: '900', color: '#2d3737', marginBottom: 30 },
  qrPlaceholder: { padding: 20, backgroundColor: '#F8F9FA', borderRadius: 20, marginBottom: 30 },
  qrImage: { width: 250, height: 250 },
  qrInstruction: { textAlign: 'center', color: '#2d3737', fontSize: 16, marginBottom: 5 },
  qrInstructionSub: { textAlign: 'center', color: '#666', marginBottom: 40, lineHeight: 20 },
  confirmBtn: { backgroundColor: '#2d3737', width: '100%', padding: 20, borderRadius: 15, alignItems: 'center' },
  confirmBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  backLink: { marginTop: 20 }
});