import { Text, View } from "react-native";
import { Notification } from "./notification";
import { BoxArrowUp } from "phosphor-react-native";

export function Header() {
  return (
    <View className="w-11/12 mx-auto flex-row items-center justify-between bg-white rounded-b-xl px-4 py-2 mb-4">
      <View className="flex-row items-center">
        <BoxArrowUp size={32} />
        <Text className="font-bold text-2xl">Estoque360</Text>
      </View>
      <Notification />
    </View>
  );
}
