import { Slot } from "expo-router";
import "@/src/styles/global.css";
import { Text, View } from "react-native";
import { Notification } from "../components/notification";
import { AnimatedScreen } from "../hooks/animatedScreen";
import { Header } from "../components/header";
import React from "react";
import { SimpleSplash } from "../hooks/simpleSplash";

export default function RootLayout() {
  const [loading, setLoading] = React.useState<boolean>(true);

  if(loading) {
    return <SimpleSplash onAnimationComplete={() => setLoading(false)} />
  }

  return (
    <AnimatedScreen>
      <View className="flex-1 bg-slate-200">
        <Header />

        <Slot screenOptions={{ headerShown: false }} />
      </View>
    </AnimatedScreen>
  );
}
