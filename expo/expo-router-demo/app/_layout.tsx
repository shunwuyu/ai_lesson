import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown:false
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{
          title:"首页",
          tabBarIcon:({color, size }) => (
            <Ionicons name="home-outline" size={size} color={color}/>
          )
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "关于",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/[id]"
        options={{
          title: "我们",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
