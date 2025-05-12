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
        const res = await axios.get("http://192.168.10.17:3000/movement");
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
      const res = await axios.get(`http://192.168.10.17:3000/product/${id}`);
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
    <SafeAreaView>
      <View>
        <Text>Movimentações</Text>
      </View>

      <View>
        <Text>Lista de movimentações</Text>
        <TouchableOpacity onPress={() => setIsModalOpen(true)}>
          <Text>
            Novo <PlusCircle size={20} />
          </Text>
        </TouchableOpacity>
      </View>

      {typeof movements === "string" ? (
        <Text>{movements}</Text>
      ) : (
        <ScrollView>
          {movements.map((movement) => (
            <View key={movement.id}>
              <Text>Produto: {movement.name}</Text>

              <View>
                <Text>Tipo</Text>
                <TextInput
                  value={movement.type}
                  keyboardType="default"
                  editable={false}
                />
              </View>

              <View>
                <Text>Quantidade</Text>
                <Text>{movement.quantity}</Text>
              </View>

              <View>
                <Text>Data</Text>
                <Text>{movement.date?.split("T")[0] || ""}</Text>
              </View>

              <View>
                <Text>Hora</Text>
                <Text>
                  {movement.date?.split("T")[1].split(".")[0].slice(0, 5) || ""}
                </Text>
              </View>

              <View>
                <Text>Motivo</Text>
                <Text>{movement.reason ? movement.reason : "(Opcional)"}</Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push(`/movement/${movement.id}`)}
              >
                <Text>Ver mais</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <ModalMovements
        isModalVisible={isModalOpen}
        setModalVisible={setIsModalOpen}
      />
    </SafeAreaView>
  );
}
