import { useSegments } from "expo-router";
import React, { useEffect } from "react";
import { Animated } from "react-native";

export const AnimatedScreen: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(20)).current;
  const segments = useSegments();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      fadeAnim.setValue(0);
      slideAnim.setValue(20);
    };
  }, [segments]);

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      className="flex-1 bg-slate-200"
    >
      {children}
    </Animated.View>
  );
};
