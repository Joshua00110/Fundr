import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

// Reusable swipeable card component
const CampaignCard = ({ title, raised, goal, percent, image, tag }) => (
  <View style={styles.card}>
    <Image source={{ uri: image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <View style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
      <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
      <View style={styles.progressLabel}>
        <Text style={styles.progressText}>₱{raised} of ₱{goal} raised</Text>
        <Text style={styles.progressText}>{percent}%</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percent}%` }]} />
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity><Text style={styles.readMoreText}>Read More</Text></TouchableOpacity>
        <TouchableOpacity style={styles.donateBtn}><Text style={styles.donateBtnText}>Donate</Text></TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function ExploreScreen() {
  const categories = ['All', 'Emergency', 'Health', 'Children', 'Environment'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topNav}>
        <Text style={styles.topNavTitle}>Fundr</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.headerSection}>
          <Text style={styles.mainTitle}>Choose where to donate</Text>
          <Text style={styles.subTitle}>Fundr connects you to verified donation drives that need your help.</Text>
        </View>

        {/* Horizontal Category Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
          {categories.map((cat, index) => (
            <TouchableOpacity key={index} style={[styles.catBtn, index === 0 && styles.catBtnActive]}>
              <Text style={[styles.catText, index === 0 && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section 1: Ongoing Fundraising Campaigns */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>ONGOING FUNDRAISING CAMPAIGNS</Text>
          <View style={styles.countBadge}><Text style={styles.countText}>4</Text></View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={width * 0.75 + 20} decelerationRate="fast" contentContainerStyle={styles.horizontalScroll}>
          <CampaignCard 
            tag="Health" 
            title="Medical Aid for PWDs of Barangay Kalayaan" 
            raised="6900" goal="18000" percent="38" 
            image="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8" 
          />
          <CampaignCard 
            tag="Emergency" 
            title="Fire Relief Funds for Manila Area" 
            raised="4500" goal="10000" percent="45" 
            image="https://images.unsplash.com/photo-1542831371-29b0f74f9713" 
          />
        </ScrollView>

        {/* Section 2: Needs Some Love */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>NEEDS SOME LOVE</Text>
          <View style={styles.countBadge}><Text style={styles.countText}>2</Text></View>
        </View>
        <Text style={styles.sectionSubLabel}>Fundraising goals with low progress, help show them some support!</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={width * 0.75 + 20} decelerationRate="fast" contentContainerStyle={styles.horizontalScroll}>
          <CampaignCard 
            tag="Health" 
            title="Community Clean Water Project Sitio Bagong Silang" 
            raised="1620" goal="9000" percent="18" 
            image="https://images.unsplash.com/photo-1541516166103-3ad24017393a" 
          />
          <CampaignCard 
            tag="Children" 
            title="School Supplies for Remote Schools" 
            raised="500" goal="5000" percent="10" 
            image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b" 
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  topNav: { backgroundColor: '#1A2138', height: 100, justifyContent: 'center', alignItems: 'center', paddingTop: 40 },
  topNavTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  headerSection: { padding: 20 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  subTitle: { fontSize: 14, color: '#666', marginTop: 8, lineHeight: 20 },
  
  // Categories
  categoryBar: { paddingLeft: 20, marginVertical: 10 },
  catBtn: { backgroundColor: '#1A2138', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 10, marginRight: 10, height: 40 },
  catBtnActive: { backgroundColor: '#1A2138' },
  catText: { color: '#FFF', fontWeight: '500' },

  // Cards
  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 25 },
  sectionLabel: { fontSize: 13, fontWeight: 'bold', letterSpacing: 1 },
  sectionSubLabel: { fontSize: 13, color: '#888', paddingHorizontal: 20, marginTop: 5, marginBottom: 15 },
  countBadge: { backgroundColor: '#1A2138', borderRadius: 10, width: 22, height: 22, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  countText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  horizontalScroll: { paddingLeft: 20, paddingBottom: 10 },
  card: { width: width * 0.75, marginRight: 15, borderRadius: 15, backgroundColor: 'white', borderWidth: 1, borderColor: '#eee', overflow: 'hidden' },
  cardImage: { width: '100%', height: 150 },
  cardContent: { padding: 12 },
  tag: { backgroundColor: '#1A2138', alignSelf: 'flex-start', paddingVertical: 2, paddingHorizontal: 8, borderRadius: 5, marginBottom: 8 },
  tagText: { color: 'white', fontSize: 10 },
  cardTitle: { fontWeight: 'bold', fontSize: 15, height: 40 },
  progressLabel: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  progressText: { fontSize: 11, color: '#888' },
  progressBar: { height: 6, backgroundColor: '#eee', borderRadius: 3, marginVertical: 8 },
  progressFill: { height: '100%', backgroundColor: '#1A2138', borderRadius: 3 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  readMoreText: { fontSize: 12, color: '#888', textDecorationLine: 'underline' },
  donateBtn: { backgroundColor: '#FF9F43', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 10 },
  donateBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
});