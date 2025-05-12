import { Slot } from "expo-router";
import "@/src/styles/global.css";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <View className="flex-1">
      <Text>Meu App</Text>

      <Slot screenOptions={{ headerShown: false }} />

      <Text>@ 2025 - Todos os direitos reservados</Text>
    </View>
  );
}
