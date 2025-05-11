import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { View } from "react-native";

export default function Movement() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Teste {id}</Text>
    </View>
  );
}
