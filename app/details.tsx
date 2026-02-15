import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DetailsScreen() {
  const params = useLocalSearchParams(); // Catches title, image, description, etc.
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Project Image */}
        <Image source={{ uri: params.image as string }} style={styles.image} />
        
        {/* Floating Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.content}>
          {/* Category Tag */}
          <View style={styles.tag}>
            <Text style={styles.tagText}>{params.category}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{params.title}</Text>
          
          {/* Progress Mini-Stats */}
          <View style={styles.statsRow}>
            <Text style={styles.raisedAmt}>₱{params.raised}</Text>
            <Text style={styles.goalAmt}> raised of ₱{params.goal}</Text>
          </View>

          <View style={styles.divider} />

          {/* Description Section */}
          <Text style={styles.aboutTitle}>About this project</Text>
          <Text style={styles.description}>
            {params.description || "No description provided for this project."}
          </Text>

          {/* Space for scrolling */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Sticky Bottom Donate Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerBtn}
          onPress={() => router.push({ pathname: '/payment', params: { category: params.category } } as any)}
        >
          <Text style={styles.footerBtnText}>Donate Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  image: { width: width, height: 350 },
  backBtn: { 
    position: 'absolute', 
    top: 50, 
    left: 20, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    padding: 10, 
    borderRadius: 25 
  },
  content: { 
    padding: 25, 
    backgroundColor: 'white', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    marginTop: -30 
  },
  tag: { 
    backgroundColor: '#1A2138', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 6, 
    marginBottom: 15 
  },
  tagText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1A2138', lineHeight: 32 },
  statsRow: { flexDirection: 'row', alignItems: 'baseline', marginVertical: 15 },
  raisedAmt: { fontSize: 22, fontWeight: 'bold', color: '#FF9F43' },
  goalAmt: { fontSize: 14, color: '#888' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 20 },
  aboutTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  description: { fontSize: 16, color: '#555', lineHeight: 26 },
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    padding: 20, 
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEE'
  },
  footerBtn: { 
    backgroundColor: '#FF9F43', 
    padding: 18, 
    borderRadius: 15, 
    alignItems: 'center' 
  },
  footerBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});