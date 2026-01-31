import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ALL_CAMPAIGNS = [
  {
    id: '1',
    category: 'Health',
    title: 'Medical Aid for PWDs of Barangay Kalayaan',
    raised: 6900,
    goal: 18000,
    percent: 38,
    image: require('../../assets/images/health.jpg'), 
    description: 'This donation drive focuses on providing wheelchairs and medical kits for PWDs in Barangay Kalayaan. Your help provides mobility and dignity.' 
  },
  {
    id: '2',
    category: 'Emergency',
    title: 'Relief Goods for Typhoon Victims',
    raised: 12400,
    goal: 50000,
    percent: 24,
    image: require('../../assets/images/emergency.jpg'),
    description: 'Urgent! Families have lost their homes in the recent storm. We are collecting funds for food packs, blankets, and clean water.'
  },
  {
    id: '3',
    category: 'Children',
    title: 'School Supplies for Rural Students',
    raised: 5000,
    goal: 15000,
    percent: 33,
    image: require('../../assets/images/children.jpg'),
    description: 'Help children in remote areas get the bags, notebooks, and pencils they need for the upcoming school year.'
  },
  {
    id: '4',
    category: 'Education',
    title: 'Scholarship Fund for Senior High Students',
    raised: 8500,
    goal: 30000,
    percent: 28,
    image: require('../../assets/images/education.jpg'), 
    description: 'This content is all about Education. We are raising funds to cover the tuition and laboratory fees for deserving students in our community.'
  }
];

export default function CategoryDetailScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter(); // Initialize Router

  const currentCategory = (category as string) || 'All';
  
  const filteredCampaigns = currentCategory.toLowerCase() === 'all'
    ? ALL_CAMPAIGNS
    : ALL_CAMPAIGNS.filter(
        item => item.category.toLowerCase() === currentCategory.toLowerCase()
      );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#1A2138" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentCategory}</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <FlatList
        data={filteredCampaigns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listPadding}
        
        ListHeaderComponent={() => (
          <View style={styles.infoBox}>
            <Ionicons 
              name={currentCategory.toLowerCase() === 'health' ? 'medical' : 
                    currentCategory.toLowerCase() === 'education' ? 'book' : 'heart'} 
              size={24} 
              color="#FF5A5F" 
            />
            <Text style={styles.infoTitle}>
              {currentCategory.toLowerCase() === 'all' ? 'All Donation Drives' : `Verified ${currentCategory} Drives`}
            </Text>
            <Text style={styles.infoSubtitle}>
              {currentCategory.toLowerCase() === 'all' 
                ? 'Explore all active verified donation drives across all sectors.' 
                : `You are viewing donation drives specifically for ${currentCategory}.`}
            </Text>
          </View>
        )}

        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageWrapper}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.categoryTag}>
                <Text style={styles.tagText}>{item.category}</Text>
              </View>
            </View>
            
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>

              <View style={styles.progressRow}>
                <Text style={styles.progressText}>₱{item.raised} of ₱{item.goal} raised</Text>
                <Text style={styles.percentText}>{item.percent}%</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={StyleSheet.flatten([styles.progressFill, { width: `${item.percent}%` }])} />
              </View>

              <View style={styles.footerRow}>
                <TouchableOpacity onPress={() => router.push('/donation' as any)}>
                  <Text style={styles.readMore}>View Story</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.donateBtn}
                  onPress={() => router.push('/payment' as any)} // Added Navigation
                >
                  <Text style={styles.donateBtnText}>Donate Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={60} color="#EEE" />
            <Text style={styles.emptyText}>No {currentCategory} campaigns found yet.</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingTop: 60 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 15 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1A2138', textTransform: 'capitalize' },
  backBtn: { padding: 5 },
  listPadding: { paddingBottom: 50 },
  infoBox: { padding: 25, backgroundColor: '#F9FAFB', marginHorizontal: 20, borderRadius: 20, marginBottom: 25, alignItems: 'center' },
  infoTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A2138', marginTop: 10 },
  infoSubtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 8, lineHeight: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 24, marginHorizontal: 20, marginBottom: 25, borderWidth: 1, borderColor: '#F0F0F0', overflow: 'hidden' },
  imageWrapper: { position: 'relative' },
  cardImage: { width: '100%', height: 180 },
  categoryTag: { position: 'absolute', bottom: 12, left: 12, backgroundColor: '#1A2138', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  tagText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  cardBody: { padding: 20 },
  cardTitle: { fontSize: 19, fontWeight: 'bold', color: '#1A2138', marginBottom: 8 },
  cardDescription: { fontSize: 14, color: '#888', lineHeight: 20, marginBottom: 18 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressText: { fontSize: 13, color: '#666' },
  percentText: { fontSize: 13, color: '#1A2138', fontWeight: 'bold' },
  progressTrack: { height: 8, backgroundColor: '#F0F2F5', borderRadius: 4, marginTop: 8, marginBottom: 20 },
  progressFill: { height: '100%', backgroundColor: '#1A2138', borderRadius: 4 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  readMore: { fontSize: 14, color: '#888', textDecorationLine: 'underline' },
  donateBtn: { backgroundColor: '#FF9F43', paddingHorizontal: 30, paddingVertical: 14, borderRadius: 14 },
  donateBtnText: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  emptyState: { marginTop: 100, alignItems: 'center' },
  emptyText: { color: '#CCC', marginTop: 10, fontSize: 16 }
});