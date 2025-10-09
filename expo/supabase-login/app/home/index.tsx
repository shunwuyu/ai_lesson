import { Text, View } from 'react-native';
export default function Home() {
  async function signUpWithEmail() {
    console.log('dddd')
    // const { error } = await supabaseClient.auth.signOut();
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        className="text-red-500 font-bold text-xl"
        onPress={signUpWithEmail}
      >
        Sign Out2
      </Text>
    </View>
  )
}