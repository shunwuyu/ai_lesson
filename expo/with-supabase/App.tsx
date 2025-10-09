import {
  useState,
} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
// 确保内容在 iPhone 等设备的安全区域内显示，避免被刘海、底部指示条等遮挡
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  addTodo
} from './utils/SupaLegend';

const NewTodo = () => {
  const [text, setText] = useState('');
  const handleSubmitEditing = ({ nativeEvent: { text } }) => {
    setText('');
    addTodo(text);
  };
  return (
    <TextInput
      value={text}
      onChangeText={(text) => setText(text)}
      onSubmitEditing={handleSubmitEditing}
      placeholder="What do you want to do today?"
      style={styles.input}
    />
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Legend-State Example</Text>
        <NewTodo />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderColor: '#999',
    borderRadius: 8,
    borderWidth: 2,
    flex: 0,
    height: 64,
    marginTop: 16,
    padding: 16,
    fontSize: 20,
  },
});
