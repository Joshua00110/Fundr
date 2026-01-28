import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Page 1: Splash */}
        <Stack.Screen name="index" /> 
        
        {/* Page 2: Onboarding */}
        <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
        
        {/* Auth Pop-up - Keep this one */}
        <Stack.Screen 
          name="auth" 
          options={{ 
            presentation: 'modal', 
            animation: 'slide_from_bottom' 
          }} 
        />
        
        {/* Home Tabs */}
        <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
        
        {/* The duplicate 'auth' screen that was here has been removed */}
      </Stack>
    </GestureHandlerRootView>
  );
}