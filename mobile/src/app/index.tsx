import { Text, View } from "react-native";
import "@/src/styles/global.css";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-200 ">
      <Text className="text-3xl uppercase font-bold text-justify w-11/12">
        Esse projeto é feito com nativewind, serve de template pra apenas
        copiar, renomear e usar
      </Text>
    </View>
  );
}
