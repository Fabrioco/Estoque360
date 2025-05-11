import { useGetProduct } from "@/src/hooks/useGetProduct";
import { Product } from "@/src/types/productType";
import axios from "axios";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScreenProduct() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [editProduct, setEditProduct] = React.useState<Partial<Product>>({});
  const [editable, setEditable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await useGetProduct(Number(id));
        setProduct(res as Product);
        setEditProduct(res as Product);
      } catch (error) {
        Alert.alert("Error", "Falha ao buscar produto");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (field: keyof Product, value: string | number) => {
    if (editable) {
      setEditProduct((prev) => ({
        ...prev,
        [field]:
          typeof product?.[field] === "number" ? Number(value) : String(value),
      }));
    }
  };

  const handleEditProduct = async () => {
    try {
      const res = await axios.patch(
        `http://192.168.1.64:3000/product/${id}`,
        editProduct
      );
      setProduct(editProduct as Product);
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
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (!product) {
    router.back();
    return (
      <SafeAreaView>
        <TouchableOpacity onPress={() => router.back()}>
          Voltar
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <View>
          <Text>Nome do produto</Text>
          <TextInput
            value={editable ? editProduct.name : product.name}
            onChangeText={(text) => handleChange("name", text)}
            editable={editable}
            keyboardType="default"
          />
        </View>

        <View>
          <Text>Descrição do produto</Text>
          <TextInput
            value={editable ? editProduct.description : product.description}
            onChangeText={(text) => handleChange("description", text)}
            editable={editable}
            keyboardType="default"
          />
        </View>

        <View>
          <Text>Quantidade atual</Text>
          <TextInput
            value={String(
              editable ? editProduct.currentQuantity : product.currentQuantity
            )}
            onChangeText={(text) => handleChange("currentQuantity", text)}
            editable={editable}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text>Quantidade mínima</Text>
          <TextInput
            value={String(
              editable ? editProduct.minQuantity : product.minQuantity
            )}
            onChangeText={(text) => handleChange("minQuantity", text)}
            editable={editable}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text>Preço de compra</Text>
          <TextInput
            value={String(
              editable ? editProduct.purchasePrice : product.purchasePrice
            )}
            onChangeText={(text) => handleChange("purchasePrice", text)}
            editable={editable}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text>Preço de venda</Text>
          <TextInput
            value={String(editable ? editProduct.salePrice : product.salePrice)}
            onChangeText={(text) => handleChange("salePrice", text)}
            editable={editable}
            keyboardType="numeric"
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={editable ? handleEditProduct : () => setEditable(true)}
          >
            <Text>{editable ? "Salvar" : "Editar"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDeleteProduct}>
            <Text>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
