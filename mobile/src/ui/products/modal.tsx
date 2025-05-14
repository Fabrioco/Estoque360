import { Product } from "@/src/types/productType";
import axios from "axios";
import React from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ModalProductProps = {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

export function ModalProduct({
  isModalVisible,
  setModalVisible,
}: ModalProductProps) {
  const [product, setProduct] = React.useState<Product>({
    name: "",
    description: "",
    currentQuantity: 0,
    minQuantity: 0,
    purchasePrice: 0,
    salePrice: 0,
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (field: keyof Product, value: string | number) => {
    setProduct((prev) => ({
      ...prev,
      [field]: typeof prev[field] === "number" ? Number(value) : String(value),
    }));
  };

  const handleAddProduct = async () => {
    if (
      !product.name ||
      !product.currentQuantity ||
      !product.minQuantity ||
      !product.purchasePrice ||
      !product.salePrice
    ) {
      Alert.alert("Falta de dados", "Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://192.168.1.64:3000/product",
        product
      );
      Alert.alert("Sucesso", res.data);
      setModalVisible(false);
      setProduct({
        name: "",
        description: "",
        currentQuantity: 0,
        minQuantity: 0,
        purchasePrice: 0,
        salePrice: 0,
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Falha ao adicionar produto");
      if (axios.isAxiosError(error)) {
        console.log(
          "Axios error:",
          error.code,
          error.message,
          error.config?.url
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      style={{ margin: 0 }}
      visible={isModalVisible}
      className="bg-white"
      onRequestClose={() => setModalVisible(false)}
      animationType="slide"
    >
      <ScrollView className="flex-col p-4 relative">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold">Adicionar Produto</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="bg-red-500 px-4 py-2 rounded w-fit"
          >
            <Text className="text-white w-fit">Fechar</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-col gap-4 mt-5">
          <View className="flex-col gap-2">
            <Text className="text-lg">Nome do produto</Text>
            <TextInput
              placeholder="Garrafa de água"
              keyboardType="default"
              value={product?.name}
              onChange={(e) =>
                setProduct({ ...product, name: e.nativeEvent.text })
              }
              className="border border-slate-200 bg-slate-50 rounded-full py-2 px-4 text-lg"
            />
          </View>

          <View className="flex-col gap-2">
            <Text className="text-lg">Descrição do produto</Text>
            <TextInput
              placeholder="(Opcional)"
              keyboardType="default"
              value={product?.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.nativeEvent.text })
              }
              className="border border-slate-200 bg-slate-50 rounded-full py-2 px-4 text-lg"
            />
          </View>

          <View className="flex-col gap-2">
            <Text className="text-lg">Preço de compra</Text>
            <TextInput
              placeholder="10"
              keyboardType="numeric"
              onChange={(e) =>
                handleChange("purchasePrice", e.nativeEvent.text)
              }
              className="border border-slate-200 bg-slate-50 rounded-full py-2 px-4 text-lg"
            />
          </View>

          <View className="flex-col gap-2">
            <Text className="text-lg">Preço de venda</Text>
            <TextInput
              placeholder="15"
              keyboardType="numeric"
              onChange={(e) => handleChange("salePrice", e.nativeEvent.text)}
              className="border border-slate-200 bg-slate-50 rounded-full py-2 px-4 text-lg"
            />
          </View>

          <View className="flex-col gap-2">
            <Text className="text-lg">Quantidade em estoque</Text>
            <TextInput
              placeholder="10"
              keyboardType="numeric"
              onChange={(e) =>
                handleChange("currentQuantity", e.nativeEvent.text)
              }
              className="border border-slate-200 bg-slate-50 rounded-full py-2 px-4 text-lg"
            />
          </View>

          <View className="flex-col gap-2">
            <Text className="text-lg">Quantidade mínima</Text>
            <TextInput
              placeholder="5"
              keyboardType="numeric"
              onChange={(e) => handleChange("minQuantity", e.nativeEvent.text)}
              className="border border-slate-200 bg-slate-50 rounded-full py-2 px-4 text-lg"
            />
          </View>

          <View className="flex-row items-center justify-end mb-10">
            <TouchableOpacity
              onPress={handleAddProduct}
              className="mt-4 w-fit bg-black py-4 px-8 rounded-full"
            >
              <Text className="text-white text-lg font-bold">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
