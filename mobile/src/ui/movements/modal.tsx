import { Movement } from "@/src/app/(tabs)/movements";
import { useGetProducts } from "@/src/hooks/useGetProducts";
import { Product } from "@/src/types/productType";
import axios from "axios";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface ModalMovementsProps {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalMovements({
  isModalVisible,
  setModalVisible,
}: ModalMovementsProps) {
  const {
    data: productsData = [],
    isLoading,
    error,
    refetch,
  } = useGetProducts();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [movements, setMovements] = React.useState<Movement>({
    productId: 0,
    quantity: 0,
    reason: "",
    type: "",
  });

  const handleChange = (field: keyof Movement, value: string | number) => {
    setMovements((prev) => ({
      ...prev,
      [field]: typeof prev[field] === "number" ? Number(value) : String(value),
    }));
  };

  const handleAddMovement = async () => {
    try {
      const res = await axios.post(`http://192.168.1.64:3000/movement`, {
        productId: movements.productId,
        type: movements.type,
        quantity: movements.quantity,
        reason: movements.reason,
      });
      setModalVisible(false);
      Alert.alert("Sucesso", res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
          "Axios error:",
          error.code,
          error.message,
          error.config?.url
        );
      }
      console.error("Erro ao adicionar movimentação:", error);
    }
  };

  React.useEffect(() => {
    refetch();
  }, [isModalVisible]);

  if (isLoading) {
    return (
      <Modal visible={isModalVisible} animationType="slide">
        <View className="flex-1 items-center justify-center bg-slate-200">
          <ActivityIndicator size="large" color="#000" />
        </View>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal visible={isModalVisible} animationType="slide">
        <View className="flex-1 items-center justify-center bg-slate-200">
          <Text>Erro ao carregar produtos</Text>
          <TouchableOpacity
            onPress={() => refetch()}
            className="mt-4 bg-white rounded-full px-4 py-2"
          >
            <Text className="text-xl font-bold text-black">Recarregar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={isModalVisible} animationType="slide">
      <ScrollView className="flex-1 bg-slate-200">
        <View className="w-full items-center p-4">
          <View className="flex-row justify-between items-center w-full">
            <Text className="text-2xl font-bold">Adicionar Movimentação</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-red-500 rounded-md px-4 py-2"
            >
              <Text className="text-xl font-bold text-white">Fechar</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-4 w-full mt-4">
            <View className="w-full flex-col gap-2">
              <Text className="font-bold text-lg">Produto</Text>
              <View className="w-full bg-slate-50 rounded-full">
                <RNPickerSelect
                  placeholder={{ label: "Selecione um produto", value: null }}
                  onValueChange={(e) => handleChange("productId", e)}
                  items={productsData.map((product) => ({
                    label: product.name,
                    value: product.id,
                  }))}
                />
              </View>
            </View>

            <View className="w-full flex-col gap-2">
              <Text className="font-bold text-lg">Tipo</Text>
              <View className="w-full bg-slate-50 rounded-full">
                <RNPickerSelect
                  placeholder={{ label: "Selecione o tipo", value: null }}
                  items={[
                    { label: "Entrada", value: "ENTRADA" },
                    { label: "Saida", value: "SAIDA" },
                  ]}
                  onValueChange={(e) => handleChange("type", e)}
                />
              </View>
            </View>

            <View className="w-full flex-col gap-2">
              <Text className="font-bold text-lg">Quantidade</Text>
              <TextInput
                placeholder="10"
                keyboardType="numeric"
                onChangeText={(e) => handleChange("quantity", e)}
                className="border border-slate-50 bg-slate-50 rounded-full p-4 text-lg"
              />
            </View>

            <View className="w-full flex-col gap-2">
              <Text className="font-bold text-lg">Motivo</Text>
              <TextInput
                placeholder="(Opcional)"
                keyboardType="default"
                onChangeText={(e) => handleChange("reason", e)}
                className="border border-slate-50 bg-slate-50 rounded-full p-4 text-lg"
              />
            </View>

            <View className="w-full flex-row items-center justify-end mt-4">
              <TouchableOpacity
                onPress={handleAddMovement}
                className="bg-black rounded-full px-4 py-2"
              >
                <Text className="text-xl font-bold text-white">Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
