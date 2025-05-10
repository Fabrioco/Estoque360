import { useLocalSearchParams } from "expo-router/build/hooks";
import { Text, View } from "react-native";

export default function Product() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
}
