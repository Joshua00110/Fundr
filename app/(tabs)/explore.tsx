import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router'; // Added useRouter

const { width } = Dimensions.get('window');

const CAMPAIGNS = [
  {
    id: '1',
    category: 'Health',
    title: 'Medical Aid for PWDs of Barangay Kalayaan',
    raised: 6900,
    goal: 18000,
    percent: 38,
    image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8',
    urgent: true,
  },
  {
    id: '2',
    category: 'Emergency',
    title: 'Relief Goods for Typhoon Victims',
    raised: 12400,
    goal: 50000,
    percent: 24,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
    urgent: false,
  }
];

const CATEGORIES = ['All', 'Emergency', 'Health', 'Children', 'Education'];

export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const router = useRouter(); // Initialize Router

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        
        <View style={styles.headerSection}>
          <Text style={styles.mainHeading}>Choose where to donate</Text>
          <Text style={styles.subHeading}>
            Fundr connects you to verified donation drives that need your help.
          </Text>
        </View>

        <View style={styles.categoryScrollWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.categoryContent}
          >
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat} 
                href={`/explore/${cat.toLowerCase()}` as any} 
                asChild
              >
                <TouchableOpacity 
                  onPress={() => setActiveTab(cat)}
                  style={StyleSheet.flatten([
                    styles.categoryPill, 
                    activeTab === cat && styles.categoryPillActive
                  ])}
                >
                  <Text style={StyleSheet.flatten([
                    styles.categoryLabel, 
                    activeTab === cat && styles.categoryLabelActive
                  ])}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>ONGOING FUNDRAISING CAMPAIGNS</Text>
          <View style={styles.countBadge}><Text style={styles.countText}>4</Text></View>
        </View>
        <Text style={styles.sectionSubtitle}>Donation drives that need continuous community support.</Text>

        <FlatList
          horizontal
          data={CAMPAIGNS}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width * 0.8 + 20}
          decelerationRate="fast"
          contentContainerStyle={styles.cardList}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                {item.urgent && (
                  <View style={styles.urgentBadge}><Text style={styles.urgentText}>Urgent</Text></View>
                )}
                <View style={styles.imageOverlayText}>
                  <Text style={styles.overlayTitle}>{item.title}</Text>
                </View>
              </View>
              
              <View style={styles.cardInfo}>
                <View style={styles.categoryBadge}><Text style={styles.badgeText}>{item.category}</Text></View>
                <View style={styles.progressRow}>
                  <Text style={styles.progressText}>₱{item.raised} of ₱{item.goal} raised</Text>
                  <Text style={styles.percentText}>{item.percent}%</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${item.percent}%` }]} />
                </View>
                <View style={styles.cardFooter}>
                  <TouchableOpacity onPress={() => router.push('/donation' as any)}>
                    <Text style={styles.readMore}>Read More</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.donateBtn}
                    onPress={() => router.push('/payment' as any)} // Added Navigation
                  >
                    <Text style={styles.donateBtnText}>Donate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        <View style={[styles.sectionTitleRow, { marginTop: 30 }]}>
          <Text style={styles.sectionTitle}>NEEDS SOME LOVE</Text>
          <View style={styles.countBadge}><Text style={styles.countText}>2</Text></View>
        </View>
        <Text style={styles.sectionSubtitle}>Fundraising goals with low progress, help show them some support!</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollPadding: { paddingTop: 60, paddingBottom: 120 },
  headerSection: { paddingHorizontal: 20 },
  mainHeading: { fontSize: 26, fontWeight: '800', color: '#000', marginBottom: 8 },
  subHeading: { fontSize: 15, color: '#666', lineHeight: 22, width: '90%' },
  categoryScrollWrapper: { marginTop: 25, height: 45 },
  categoryContent: { paddingHorizontal: 20 },
  categoryPill: { backgroundColor: '#F0F2F5', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, marginRight: 10 },
  categoryPillActive: { backgroundColor: '#1A2138' },
  categoryLabel: { color: '#1A2138', fontWeight: '600', fontSize: 14 },
  categoryLabelActive: { color: '#FFF' },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 30 },
  sectionTitle: { fontSize: 13, fontWeight: '900', color: '#1A2138', letterSpacing: 0.5 },
  countBadge: { backgroundColor: '#1A2138', width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  countText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  sectionSubtitle: { paddingHorizontal: 20, fontSize: 14, color: '#888', marginTop: 5, lineHeight: 20 },
  cardList: { paddingLeft: 20, marginTop: 20 },
  card: { width: width * 0.8, backgroundColor: '#FFF', borderRadius: 20, marginRight: 15, borderWidth: 1, borderColor: '#EEE', overflow: 'hidden' },
  imageWrapper: { height: 180, position: 'relative' },
  cardImage: { width: '100%', height: '100%' },
  urgentBadge: { position: 'absolute', top: 15, left: 15, backgroundColor: '#FF5A5F', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  urgentText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  imageOverlayText: { position: 'absolute', bottom: 15, left: 15, right: 15 },
  overlayTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  cardInfo: { padding: 15 },
  categoryBadge: { backgroundColor: '#1A2138', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 5, marginBottom: 10 },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressText: { fontSize: 12, color: '#666' },
  percentText: { fontSize: 12, color: '#999' },
  progressTrack: { height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, marginVertical: 10 },
  progressFill: { height: '100%', backgroundColor: '#1A2138', borderRadius: 3 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  readMore: { fontSize: 13, color: '#888', textDecorationLine: 'underline' },
  donateBtn: { backgroundColor: '#FF9F43', paddingHorizontal: 25, paddingVertical: 10, borderRadius: 12 },
  donateBtnText: { color: 'white', fontWeight: 'bold', fontSize: 14 }
});