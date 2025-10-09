import { 
  // StyleProp 是 React Native 中的一个类型定义，
  // 用于声明组件样式属性的类型，它允许开发者以类型
  // 安全的方式传递样式对象或样式数组给组件
  StyleProp, 
  View, 
  ViewStyle 
} from "react-native";

export function ChatContainer({
  children,
  style,
}: {
  children: React.ReactNode;
  // ViewStyle 是 React Native 中定义视图（
  // 如 View 组件）所有可用样式的类型，比如 flex,
  //  margin, backgroundColor 等
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          flex: 1,
          // 表示在交叉轴上拉伸子元素，使其填满容器的整个高度
          alignItems: "stretch",
        },
        // @ts-expect-error
        // 移动端（iOS/Android）默认容器高度表现与 Web 不同
        // 移动端则依赖原生布局机制
        process.env.EXPO_OS === "web" && { maxHeight: "100vh" },
      ]}
    >
      <View style={[{ flex: 1, flexGrow: 1 }, style]}>{children}</View>
    </View>
  );
}