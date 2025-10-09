import React, { useState, useEffect } from 'react';
// React Native 是一个由 Facebook 开发的开源框架，允许使用 JavaScript 和 React 构建跨平台的原生移动应用。
// StyleSheet 是 React Native 中用于创建和管理样式对象的工具
// ，类似于网页中的 CSS，可提升性能并提供更清晰的样式组织方式。
// View 是 React Native 中最基本的布局容器组件，类似于网页中的
//  div，用于包裹和组织其他组件，实现界面布局和样式结构。
// FlatList 是 React Native 中用于高效渲染长列表数据的组件，
// 支持懒加载、滚动和性能优化，适合展示大量数据的垂直列表
import { StyleSheet, View, FlatList } from 'react-native';
// react-native-paper 是一个为 React Native 提供现代化、跨平台的 Material Design 组件库，让你快速构建美观一致的 App UI。
// 用来在整个应用中注入 Paper 的主题和全局设置，让所有 react-native-paper 组件（如 Button、
// TextInput 等）都能共享统一的颜色、字体、深浅模式等配置。
import { Provider as PaperProvider, DefaultTheme, TextInput, Button, Checkbox, List } from 'react-native-paper';
// AsyncStorage 是 React Native 提供的一个轻量级键值对本地存储方案，用于在设备上持久化保存少量数据（如用户设置、token 等）。
// 因为 React Native 运行在原生环境而非浏览器，没有 window 对象，也就没有 localStorage，
// 需要用 AsyncStorage 来实现跨平台本地数据持久化。
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('todos').then(data => {
      if (data) setTodos(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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
//     FlatList 已经通过 keyExtractor 或数据的 key/id 字段为每一项生成唯一 key，
// renderItem 返回的组件会自动继承这个 key，所以在 renderItem 里无需再手动写 key。
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
  
  const theme = {
  ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#6200ee',      // 主色（按钮、输入框焦点等）
      secondary: '#03dac6',    // 辅助色
      background: '#f6f6f6',   // 背景
      text: '#333333',         // 文字颜色
    },
    roundness: 8,               // 全局圆角
  };
  return (
    // 为应用中所有 React Native Paper 组件提供统
    // 一的主题样式，包括颜色、字体和间距等设计元素
    <PaperProvider theme={theme}>
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
        {/* 是的，FlatList 内置虚拟化（virtualized list），会自动只渲染可见区域的元素
        ，并在滚动时复用、回收不可见项，无需手动实现虚拟列表逻辑。 */}
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
