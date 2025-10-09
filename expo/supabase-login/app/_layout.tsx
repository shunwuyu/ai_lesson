import { View } from 'react-native';
import { Slot, SplashScreen } from 'expo-router';
export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  )
}