import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { PlusCircle } from "phosphor-react-native";
import { ModalProduct } from "../ui/home/modal";
import { useGetProducts } from "../hooks/useGetProducts";
import { Product } from "../types/productType";
import { Link } from "expo-router";

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const res = await useGetProducts();
        setProducts(res as Product[] | []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [isModalVisible]);

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-col">
        <Text className="text-3xl uppercase font-bold text-justify w-11/12">
          Produtos
        </Text>

        <View className="flex-row justify-start w-11/12">
          <TouchableOpacity
            className="flex-row gap-2 items-center bg-blue-700 px-4 py-2 rounded"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-white text-xl">Adicionar</Text>
            <PlusCircle size={30} weight="bold" color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView className="w-11/12">
          {typeof products === "string" ? (
            <Text className="text-center py-10">Nenhum produto cadastrado</Text>
          ) : (
            products.map((product) => (
              <View
                key={product.id}
                className="flex-row justify-between items-center border-b border-gray-400 p-2"
              >
                <Text className="text-xl uppercase">{product.name}</Text>
                <View>
                  <Text>Compra: R${product.purchasePrice}</Text>
                  <Text>Venda: R${product.salePrice}</Text>
                </View>
                <View>
                  <Text>Estoque: {product.currentQuantity}</Text>
                  <Text>Min: {product.minQuantity}</Text>
                </View>
                <TouchableOpacity>
                  <Link
                    href={
                      product.id !== undefined ? `/product/${product.id}` : "/"
                    }
                  >
                    Ver mais
                  </Link>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
        <ModalProduct
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </SafeAreaView>
  );
}
