import { ProductField } from "@/src/components/productField";
import { useGetProduct } from "@/src/hooks/useGetProduct";
import { Product } from "@/src/types/productType";
import axios from "axios";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScreenProduct() {
  const { id } = useLocalSearchParams();
  const { data: productData, isLoading } = useGetProduct(Number(id));

  const [product, setProduct] = React.useState<Product>({
    name: productData?.name || "",
    description: productData?.description || "",
    currentQuantity: productData?.currentQuantity || 0,
    minQuantity: productData?.minQuantity || 0,
    purchasePrice: productData?.purchasePrice || 0,
    salePrice: productData?.salePrice || 0,
  });
  const [editable, setEditable] = React.useState(false);

  React.useEffect(() => {
    if (productData) {
      setProduct(productData);
    }
  }, [productData, id]);

  const handleChange = (field: keyof Product, value: string | number) => {
    if (editable) {
      setProduct((prev: Product) => {
        if (!prev) return prev;
        return {
          ...prev,
          [field]:
            typeof prev[field] === "number" ? Number(value) : String(value),
        };
      });
    }
  };

  const handleEditProduct = async () => {
    try {
      const res = await axios.patch(
        `http://192.168.1.64:3000/product/${id}`,
        product
      );
      setProduct(product as Product);
      Alert.alert("Sucesso", res.data);
      setEditable(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Falha ao atualizar produto");
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

  const handleDeleteProduct = async () => {
    try {
      const res = await axios.delete(`http://192.168.1.64:3000/product/${id}`);
      Alert.alert("Sucesso", res.data);
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Falha ao deletar produto");
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

  if (isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-200">
        <Text className="text-2xl uppercase w-full text-center">
          Produto não encontrado
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-white rounded-full px-4 py-2 "
        >
          <Text className="text-xl font-bold text-black">Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 items-center">
      <ScrollView className="flex-1 w-full">
        <View className="flex-row justify-end w-11/12 items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-black rounded-full px-4 py-2 w-fit"
          >
            <Text className="text-xl font-bold text-white">Voltar</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-col gap-4 w-11/12 mx-auto mt-4">
          <ProductField
            label="Nome do produto"
            value={product.name}
            onChange={(text) => handleChange("name", text)}
            editable={editable}
            keyboardType="default"
          />

          <ProductField
            label="Descrição do produto"
            value={product.description || ""}
            onChange={(text) => handleChange("description", text)}
            editable={editable}
            keyboardType="default"
          />

          <ProductField
            label="Quantidade atual"
            value={product.currentQuantity}
            onChange={(number) => handleChange("currentQuantity", number)}
            editable={editable}
            keyboardType="numeric"
          />

          <ProductField
            label="Quantidade minima"
            value={product.minQuantity}
            onChange={(number) => handleChange("minQuantity", number)}
            editable={editable}
            keyboardType="numeric"
          />

          <ProductField
            label="Preço de compra"
            value={product.purchasePrice}
            onChange={(number) => handleChange("purchasePrice", number)}
            editable={editable}
            keyboardType="numeric"
          />

          <ProductField
            label="Preço de venda"
            value={product.salePrice}
            onChange={(number) => handleChange("salePrice", number)}
            editable={editable}
            keyboardType="numeric"
          />

          <View className="flex-row gap-4 w-11/12 mx-auto mt-4">
            <TouchableOpacity
              className="bg-white rounded-full px-4 py-2 "
              onPress={editable ? handleEditProduct : () => setEditable(true)}
            >
              <Text className="text-xl font-bold text-black">
                {editable ? "Salvar" : "Editar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-full px-4 py-2 "
              onPress={handleDeleteProduct}
            >
              <Text className="text-xl font-bold text-black">Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
