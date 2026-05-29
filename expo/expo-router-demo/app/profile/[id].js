import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Profile() {
  const { id } = useLocalSearchParams(); // 获取动态参数
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>用户详情页：{id}</Text>
    </View>
  );
}
