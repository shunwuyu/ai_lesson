import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Provider as PaperProvider, TextInput, Button, Checkbox, List } from 'react-native-paper';

export default function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!task.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text: task, done: false }]);
    setTask('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={item.text}
      left={() => (
        <Checkbox
          status={item.done ? 'checked' : 'unchecked'}
          onPress={() => toggleTodo(item.id)}
        />
      )}
      right={() => (
        <Button onPress={() => deleteTodo(item.id)}>删除</Button>
      )}
    />
  );

  return (
    // 为应用中所有 React Native Paper 组件提供统
    // 一的主题样式，包括颜色、字体和间距等设计元素
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          label="输入待办事项"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <Button mode="contained" onPress={addTodo} style={styles.addButton}>
          添加
        </Button>

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.list}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  input: { marginBottom: 10 },
  addButton: { marginBottom: 20 },
  list: { flex: 1 },
});
