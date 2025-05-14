import ModalMovements from "@/src/ui/movements/modal";
import axios from "axios";
import { router } from "expo-router";
import { PlusCircle } from "phosphor-react-native";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type Movement = {
  id?: number;
  name?: string;
  productId: number;
  type: string;
  quantity: number;
  date?: string;
  reason: string;
};

export type MovementType = "ENTRADA" | "SAIDA";

export default function Movements() {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [movements, setMovements] = React.useState<Movement[]>([]);

  React.useEffect(() => {
    const fetchMovements = async () => {
      try {
        const res = await axios.get("http://192.168.1.64:3000/movement");
        const data = await res.data;
        setMovements(data as Movement[]);
        const names = await Promise.all(
          data.map((movement: Movement) => fetchNameProduct(movement.productId))
        );
        setMovements(
          data.map((movement: Movement, index: number) => ({
            ...movement,
            name: names[index],
          }))
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(
            "Axios error:",
            error.code,
            error.message,
            error.config?.url
          );
        }
      }
    };
    fetchMovements();
  }, [isModalOpen]);

  const fetchNameProduct = async (id: number) => {
    try {
      const res = await axios.get(`http://192.168.1.64:3000/product/${id}`);
      const data = await res.data;
      return data.name;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
          "Axios error:",
          error.code,
          error.message,
          error.config?.url
        );
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-slate-200">
      <View className="flex-col gap-2 w-11/12 mx-auto">
        <View className="flex-row items-center justify-start">
          <Text className="font-bold text-2xl uppercase w-full">
            Movimentações
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => setIsModalOpen(true)}
            className="flex-row items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md"
          >
            <Text className="text-xl font-bold text-black">
              Novo <PlusCircle size={20} weight="bold" />
            </Text>
          </TouchableOpacity>
        </View>

        {typeof movements === "string" ? (
          <View className="flex-col items-center justify-center mt-10">
            <Text className="text-2xl w-full text-center">Você não possui movimentações</Text>
          </View>
        ) : (
          <ScrollView className="w-full h-full">
            <View className="flex-col gap-4 mt-4">
              {movements.map((movement) => (
                <View
                  key={movement.id}
                  className="flex-row gap-2 items-center justify-between bg-white rounded-full px-4 py-2 shadow-md "
                >
                  <View className="flex-col w-2/12">
                    <Text className="font-bold text-lg">Produto</Text>
                    <Text>{movement.name}</Text>
                  </View>

                  <View className="flex-col">
                    <View className="flex-row gap-1">
                      <Text className="font-bold">Tipo:</Text>
                      <Text>
                        {movement.type === "ENTRADA" ? "Entrada" : "Saida"}
                      </Text>
                    </View>

                    <View className="flex-row gap-1">
                      <Text className="font-bold">Quantidade:</Text>
                      <Text>{movement.quantity}</Text>
                    </View>
                  </View>

                  <View className="flex-col">
                    <View className="flex-row gap-1">
                      <Text className="font-bold">Data:</Text>
                      <Text>
                        {movement?.date
                          ?.split("T")[0]
                          .split("-")
                          .reverse()
                          .join("/") || ""}
                      </Text>
                    </View>

                    <View className="flex-row gap-1">
                      <Text className="font-bold">Hora:</Text>
                      <Text>
                        {movement.date
                          ?.split("T")[1]
                          .split(".")[0]
                          .slice(0, 5) || ""}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => router.push(`/movement/${movement.id}`)}
                    className="flex-row items-center gap-2 bg-black rounded-full px-4 py-2 shadow-md"
                  >
                    <Text className="text-xl font-bold text-white">
                      Ver mais
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        <ModalMovements
          isModalVisible={isModalOpen}
          setModalVisible={setIsModalOpen}
        />
      </View>
    </SafeAreaView>
  );
}
