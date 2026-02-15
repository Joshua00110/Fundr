import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView, 
  Alert, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// FIREBASE IMPORTS
import { auth, db } from './firebase'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 

export default function AuthScreen() {
  const router = useRouter();

  // --- State ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- Auth & Database Logic ---
  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      if (isRegistering) {
        // 1. Create User in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Create User Document in Firestore Database
        // We use user.uid as the document ID so it matches the Auth ID
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          createdAt: new Date().toISOString(),
          role: "donor",
          totalDonated: 0,
          displayName: email.split('@')[0], // Default name from email
        });

        Alert.alert("Success", "Account created and recorded!");
      } else {
        // Sign in existing account
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      // Redirect to home/tabs
      router.replace('/(tabs)'); 

    } catch (error: any) {
      let errorMessage = error.message;
      if (error.code === 'auth/invalid-credential') errorMessage = "Incorrect email or password.";
      if (error.code === 'auth/email-already-in-use') errorMessage = "This email is already in use.";
      
      Alert.alert("Authentication Failed", errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          
          <View style={styles.headerContainer}>
            <Text style={styles.title}>
              {isRegistering ? 'Create Account' : 'Welcome Back'}
            </Text>
            <Text style={styles.subtitle}>
              {isRegistering 
                ? 'Sign up to start your donation journey.' 
                : 'Sign in to manage your impact.'}
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
              <TextInput 
                placeholder="example@mail.com" 
                style={styles.input} 
                value={email} 
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
              <TextInput 
                placeholder="••••••••" 
                style={styles.input} 
                value={password} 
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[styles.mainButton, loading && { opacity: 0.7 }]} 
              onPress={handleAuth}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.mainButtonText}>
                  {isRegistering ? 'Register Now' : 'Sign In'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setIsRegistering(!isRegistering)}
              style={styles.toggleBtn}
            >
              <Text style={styles.toggleText}>
                {isRegistering 
                  ? "Already have an account? Sign In" 
                  : "New to Fundr? Create an account"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.guestLink} 
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.guestText}>Continue as Guest</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  closeButton: { padding: 20, marginTop: 10 },
  scrollContainer: { paddingHorizontal: 30, flexGrow: 1 },
  headerContainer: { marginBottom: 30 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', lineHeight: 22 },
  form: { flex: 1 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8, marginLeft: 4 },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f8f9fa', 
    borderRadius: 15, 
    marginBottom: 20, 
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#eee'
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 55, fontSize: 16, color: '#000' },
  mainButton: { 
    backgroundColor: '#2d3737', 
    height: 60, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10,
    elevation: 2
  },
  mainButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  toggleBtn: { marginTop: 25, alignItems: 'center' },
  toggleText: { color: '#4A90E2', fontWeight: '600' },
  guestLink: { marginTop: 40, marginBottom: 20, alignItems: 'center' },
  guestText: { color: '#999', textDecorationLine: 'underline' }
});