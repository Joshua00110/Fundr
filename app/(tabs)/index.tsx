import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // 1. Import useRouter

const { width } = Dimensions.get('window');

// 2. Pass navigate function to FeaturedCard
const FeaturedCard = ({ onDonate }: { onDonate: () => void }) => (
  <View style={styles.card}>
    <Image source={{ uri: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1' }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <View style={styles.tag}><Text style={styles.tagText}>Animals & Rescue</Text></View>
      <Text style={styles.cardTitle}>Vet Bills for Mayari Rescue Center Injured Animals</Text>
      <View style={styles.progressLabel}>
        <Text style={styles.progressText}>₱6480 of ₱16000 raised</Text>
        <Text style={styles.progressText}>40%</Text>
      </View>
      <View style={styles.progressBar}><View style={[styles.progressFill, { width: '40%' }]} /></View>
      <View style={styles.cardFooter}>
        <Text style={styles.readMore}>Read More</Text>
        {/* 3. Add onPress here */}
        <TouchableOpacity 
          style={styles.donateBtn} 
          onPress={onDonate}
        >
          <Text style={styles.donateBtnText}>Donate</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function Home() {
  const router = useRouter(); // 4. Initialize router

  // Helper function to navigate
  const handleDonatePress = () => {
    router.push('/payment' as any); // Use 'as any' to avoid the TS error we discussed
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topNav}><Text style={styles.topNavTitle}>Fundr</Text></View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello User!</Text>
          <Text style={styles.subGreeting}>Every contribution counts, start changing lives with fundr!</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FEATURED GOALS</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={width * 0.8 + 20} decelerationRate="fast" contentContainerStyle={{ paddingHorizontal: 20 }}>
          {/* 5. Pass the function to the cards */}
          <FeaturedCard onDonate={handleDonatePress} />
          <FeaturedCard onDonate={handleDonatePress} />
        </ScrollView>

        <View style={styles.banner}>
          <Ionicons name="heart-circle" size={40} color="#81ecec" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.bannerTitle}>Support a cause today</Text>
            <Text style={styles.bannerSub}>Make a difference for people who need it most</Text>
          </View>
        </View>

        <View style={styles.exploreBar}>
            <Text style={styles.sectionTitle}>NOT SURE WHERE TO HELP?</Text>
            {/* 6. Navigate to Explore Tab */}
            <TouchableOpacity 
               style={styles.miniExplore} 
               onPress={() => router.push('/explore' as any)}
            >
              <Text>Explore</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.largeCard}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c' }} style={styles.largeCardImg} />
          <View style={styles.largeCardOverlay}>
            <Text style={styles.largeCardTitle}>Support Families and Communities in Need</Text>
            {/* 7. Add onPress to Large Card */}
            <TouchableOpacity 
              style={styles.largeDonate} 
              onPress={handleDonatePress}
            >
              <Text style={styles.donateBtnText}>Donate</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inviteCard}>
          <Ionicons name="people" size={50} color="#333" />
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.bannerTitle}>Invite your friends</Text>
            <Text style={styles.bannerSub}>Help more people by sharing Fundr</Text>
            <TouchableOpacity style={styles.inviteBtn}><Text>Invite Friends</Text></TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: '#FFF' },
  topNav: { backgroundColor: '#1A2138', height: 100, justifyContent: 'center', alignItems: 'center', paddingTop: 40 },
  topNavTitle: { color: 'white', fontSize: 30, fontWeight: 'bold' },
  header: { backgroundColor: '#F9F1D0', padding: 25 },
  greeting: { fontSize: 28, fontWeight: 'bold' },
  subGreeting: { fontSize: 14, color: '#666', marginTop: 5 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', margin: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold' },
  badge: { backgroundColor: '#1A2138', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  badgeText: { color: 'white', fontSize: 12 },
  card: { width: width * 0.8, marginRight: 20, borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: '#eee', overflow: 'hidden' },
  cardImage: { width: '100%', height: 180 },
  cardContent: { padding: 15 },
  tag: { backgroundColor: '#1A2138', alignSelf: 'flex-start', padding: 4, borderRadius: 5, marginBottom: 10 },
  tagText: { color: 'white', fontSize: 10 },
  cardTitle: { fontWeight: 'bold', fontSize: 15, marginBottom: 10 },
  progressLabel: { flexDirection: 'row', justifyContent: 'space-between' },
  progressText: { fontSize: 12, color: '#888' },
  progressBar: { height: 6, backgroundColor: '#eee', borderRadius: 3, marginVertical: 10 },
  progressFill: { height: '100%', backgroundColor: '#FF9F43', borderRadius: 3 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  readMore: { fontSize: 12, color: '#888', textDecorationLine: 'underline' },
  donateBtn: { backgroundColor: '#FF9F43', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 10 },
  donateBtnText: { color: 'white', fontWeight: 'bold' },
  banner: { margin: 20, backgroundColor: '#DFF9FB', borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center' },
  bannerTitle: { fontWeight: 'bold', fontSize: 16 },
  bannerSub: { fontSize: 12, color: '#666' },
  exploreBar: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center' },
  miniExplore: { borderWidth: 1, borderColor: '#81ecec', padding: 5, borderRadius: 8 },
  largeCard: { margin: 20, height: 300, borderRadius: 20, overflow: 'hidden' },
  largeCardImg: { width: '100%', height: '100%' },
  largeCardOverlay: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: 'rgba(0,0,0,0.3)' },
  largeCardTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  largeDonate: { backgroundColor: '#FF9F43', padding: 15, borderRadius: 15, alignItems: 'center' },
  inviteCard: { margin: 20, backgroundColor: '#DFF9FB', borderRadius: 15, padding: 20, flexDirection: 'row' },
  inviteBtn: { backgroundColor: 'white', borderWidth: 1, borderColor: '#81ecec', padding: 8, borderRadius: 10, marginTop: 10, width: 120, alignItems: 'center' }
});