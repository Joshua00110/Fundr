import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
    <ImageBackground 
        source={require('../assets/images/onboarding.png')} // Path to your local file
        style={styles.image}
>
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.gradient}>
          <Text style={styles.title}>FUNDR</Text>
          <Text style={styles.subtitle}>Donate. Support. Make an Impact.</Text>
          
          
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => router.push('/auth')} // Use .push so they can go back if they want
>
             <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { flex: 1, justifyContent: 'flex-end' },
  gradient: { padding: 40, height: '50%', justifyContent: 'center', alignItems: 'center' },
  title: { color: 'white', fontSize: 42, fontWeight: 'bold', letterSpacing: 2 },
  subtitle: { color: 'white', fontSize: 18, textAlign: 'center', marginTop: 10, opacity: 0.8 },
  button: { backgroundColor: '#FF9500', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, marginTop: 30 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});