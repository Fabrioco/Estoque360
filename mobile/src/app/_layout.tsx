import { Slot } from "expo-router";
import "@/src/styles/global.css";
import { Text, View } from "react-native";
import { Notification } from "../components/notification";

export default function RootLayout() {
  return (
    <View className="flex-1 bg-slate-200">
      <Text>Meu App</Text>
      <Notification />

      <Slot screenOptions={{ headerShown: false }} />

      <Text>@ 2025 - Todos os direitos reservados</Text>
    </View>
  );
}
