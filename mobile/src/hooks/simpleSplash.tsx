import { BoxArrowUp } from "phosphor-react-native";
import { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";

type Props = {
  onAnimationComplete: () => void;
};

export const SimpleSplash = ({ onAnimationComplete }: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        delay: 500,
        useNativeDriver: true,
      }).start(() => {
        onAnimationComplete();
      });
    });
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <Text className="font-bold text-2xl">
        Estoque360<BoxArrowUp size={42} weight="bold" />
      </Text>
    </Animated.View>
  );
};
