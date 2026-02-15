import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const FeaturedCard = ({ title, category, image, goal, raised, description, onDonate, onReadMore }: any) => (
  <View style={styles.card}>
    <Image source={{ uri: image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <View style={styles.tag}><Text style={styles.tagText}>{category}</Text></View>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.progressLabel}>
        <Text style={styles.progressText}>₱{raised.toLocaleString()} of ₱{goal.toLocaleString()} raised</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(raised / goal) * 100}%` }]} />
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity onPress={() => onReadMore({ title, category, image, goal, raised, description })}>
          <Text style={styles.readMore}>Read More</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.donateBtn} 
          onPress={() => onDonate(category)} 
        >
          <Text style={styles.donateBtnText}>Donate</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function Home() {
  const router = useRouter();

  const handleDonatePress = (category: string) => {
    router.push({
      pathname: '/payment',
      params: { category: category } 
    } as any);
  };

  const handleReadMorePress = (project: any) => {
    router.push({
      pathname: '/details',
      params: project 
    } as any);
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topNav}><Text style={styles.topNavTitle}>Fundr</Text></View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello Donor!</Text>
          <Text style={styles.subGreeting}>Support your chosen cause today.</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ACTIVE PROJECTS</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
        >
          {/* PROJECT 1: UPDATED TO HEALTH */}
          <FeaturedCard 
            title="Medical Assistance for Senior Citizens" 
            category="Health" 
            image="https://images.unsplash.com/photo-1583777458845-047acbeb7d21?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            goal={16000}
            raised={6480}
            description="We are providing essential medicines, vitamins, and regular check-ups for elderly members of the community who cannot afford private healthcare services."
            onDonate={handleDonatePress}
            onReadMore={handleReadMorePress}
          />

          {/* PROJECT 2: EDUCATION */}
          <FeaturedCard 
            title="Educational Fund for Local Scholars" 
            category="Education" 
            image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
            goal={25000}
            raised={12000}
            description="This project aims to provide school supplies, uniforms, and tuition assistance for 15 underprivileged students in our local community."
            onDonate={handleDonatePress}
            onReadMore={handleReadMorePress}
          />

          {/* PROJECT 3: DISASTER RELIEF */}
          <FeaturedCard 
            title="Relief Packs for Flood Victims" 
            category="Disaster Relief" 
            image="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7"
            goal={30000}
            raised={18500}
            description="Emergency relief operation for families affected by recent flooding. Funds used for rice, clean water, and hygiene kits."
            onDonate={handleDonatePress}
            onReadMore={handleReadMorePress}
          />

          {/* PROJECT 4: UPDATED TO FOOD */}
          <FeaturedCard 
            title="Community Soup Kitchen and Pantries" 
            category="Food Support" 
            image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
            goal={20000}
            raised={4000}
            description="Support our daily soup kitchen that serves warm meals to homeless individuals and low-income families in the urban centers."
            onDonate={handleDonatePress}
            onReadMore={handleReadMorePress}
          />
        </ScrollView>

        {/* LARGE BOTTOM CARD */}
        <View style={styles.largeCard}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d' }} style={styles.largeCardImg} />
          <View style={styles.largeCardOverlay}>
            <Text style={styles.largeCardTitle}>Hunger Relief Program</Text>
            <TouchableOpacity 
              style={styles.largeDonate} 
              onPress={() => handleDonatePress("Food Support")}
            >
              <Text style={styles.donateBtnText}>Donate to Food Support</Text>
            </TouchableOpacity>
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
  topNavTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  header: { backgroundColor: '#F9F1D0', padding: 25 },
  greeting: { fontSize: 28, fontWeight: 'bold' },
  subGreeting: { fontSize: 14, color: '#666', marginTop: 5 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', margin: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold' },
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
  largeCard: { margin: 20, height: 250, borderRadius: 20, overflow: 'hidden' },
  largeCardImg: { width: '100%', height: '100%' },
  largeCardOverlay: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: 'rgba(0,0,0,0.5)' },
  largeCardTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  largeDonate: { backgroundColor: '#FF9F43', padding: 15, borderRadius: 15, alignItems: 'center' },
});