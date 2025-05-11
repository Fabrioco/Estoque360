import { Tabs } from "expo-router";
import { Basket, ChartDonut } from "phosphor-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "#9ca3af",
        tabBarActiveTintColor: "#000",
      }}
    >
      <Tabs.Screen
        name="products"
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
        name="movements"
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
