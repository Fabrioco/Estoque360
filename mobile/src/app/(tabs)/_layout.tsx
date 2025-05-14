import { Tabs } from "expo-router";
import { Basket, ChartDonut } from "phosphor-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "#9ca3af",
        tabBarActiveTintColor: "#000",
        tabBarStyle: {
          backgroundColor: "#fff",
          width: "50%",
          flexDirection: "row",
          margin: "auto",
          marginBottom: 16,
          borderRadius: 50,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIconStyle: {
          margin: 0,
          width: 24,
          backgroundColor: "transparent",
        },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tabs.Screen
        name="products/index"
        options={{
          title: "Produtos",
          tabBarIcon: ({ color, focused }) => (
            <Basket
              size={24}
              color={color}
              weight={focused ? "bold" : "light"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="movements/index"
        options={{
          title: "Movimentação",
          tabBarIcon: ({ color, focused }) => (
            <ChartDonut
              size={24}
              color={color}
              weight={focused ? "bold" : "light"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
