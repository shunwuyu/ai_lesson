import { View, Text, Button } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Home() {
  const router = useRouter(); // JS 跳转方式

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24 }}>欢迎来到首页222 🚀</Text>

      {/* 方式 1: 声明式导航 */}
      <Link href="/about">
        <Text style={{ color: "blue", marginTop: 20 }}>去关于页</Text>
      </Link>

      {/* 方式 2: 命令式导航 */}
      <Button title="去用户 101 页面" onPress={() => router.push("/profile/101")} />
    </View>
  );
}
