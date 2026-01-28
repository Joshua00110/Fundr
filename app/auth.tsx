import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const router = useRouter();

  const AuthButton = ({ title, icon, color, textColor, bgColor, borderColor }: any) => (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: bgColor, borderColor: borderColor || 'transparent', borderWidth: borderColor ? 1 : 0 }]}
      onPress={() => router.replace('/(tabs)')} // Temporary navigation to Home
    >
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Ionicons name="close" size={28} color="black" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Create an account or Sign in</Text>
        <Text style={styles.subtitle}>
          Keep track of your donations, collect achievements and follow your impact.
        </Text>
      </View>

      <View style={styles.buttonGroup}>
        <AuthButton 
          title="Continue with Apple" 
          icon={<AntDesign name="apple" size={20} color="white" />} 
          bgColor="black" textColor="white" 
        />
        <AuthButton 
          title="Continue with Google" 
          icon={<AntDesign name="google" size={20} color="#EA4335" />} 
          bgColor="white" textColor="black" borderColor="#DDD"
        />
        <AuthButton 
          title="Continue with Facebook" 
          icon={<FontAwesome name="facebook" size={20} color="white" />} 
          bgColor="#1877F2" textColor="white" 
        />
        <AuthButton 
          title="Continue with Email" 
          icon={<Ionicons name="mail" size={20} color="#4A90E2" />} 
          bgColor="white" textColor="#4A90E2" borderColor="#DDD"
        />
      </View>

      {/* Background Illustration Placeholder */}
      <View style={styles.illustrationContainer}>
         <Text style={styles.guestText} onPress={() => router.replace('/(tabs)')}>Browse as Guest</Text>
         {/* Insert your character PNG here */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 25 },
  closeButton: { alignSelf: 'flex-end', marginTop: 10 },
  headerContainer: { alignItems: 'center', marginTop: 30, marginBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 20 },
  buttonGroup: { gap: 15 },
  button: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 55, 
    borderRadius: 12,
    // Shadow for iOS/Android
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: { marginRight: 10 },
  buttonText: { fontSize: 16, fontWeight: '600' },
  illustrationContainer: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20 },
  guestText: { color: '#333', textDecorationLine: 'underline', fontWeight: '500' }
});