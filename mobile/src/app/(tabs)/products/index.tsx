import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { PlusCircle } from "phosphor-react-native";
import { router } from "expo-router";
import { ModalProduct } from "@/src/ui/products/modal";
import { useGetProducts } from "@/src/hooks/useGetProducts";

export default function ProductList() {
  const { data: products = [], isLoading, error, refetch } = useGetProducts();
  const [isModalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    refetch();
  }, [isModalVisible]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-200">
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-200">
        <Text className="text-2xl uppercase w-full text-center">
          Erro ao carregar produtos
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          className="mt-4 bg-white rounded-full px-4 py-2 "
        >
          <Text className="text-xl font-bold text-black">Recarregar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-slate-200">
      <View className="w-full h-full flex-col gap-4 justify-between">
        <Text className="text-2xl uppercase w-full text-center mt-8 font-bold">
          Produtos em estoque
        </Text>

        <View className="flex-row items-center justify-between w-full px-4">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="flex-row items-center gap-2 bg-white rounded-full px-4 py-2 border border-white border-solid shadow-sm active:shadow-lg active:scale-95"
          >
            <Text className="text-xl font-bold text-black">Adicionar</Text>
            <PlusCircle size={30} weight="bold" color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-col gap-4 h-auto">
          {typeof products === "string" ? (
            <Text className="text-2xl uppercase w-full text-center mt-8 font-bold">
              {products}
            </Text>
          ) : (
            <View className="gap-4 w-11/12 mx-auto ">
              {products.map((product) => (
                <View
                  key={product.id}
                  className="flex-row items-center justify-between w-full bg-white rounded-full px-4 py-2 border border-white border-solid shadow-lg"
                >
                  <Text className="font-bold text-xl w-1/6">
                    {product.name}
                  </Text>
                  <View className="w-1/6">
                    <Text>Atual: {product.currentQuantity}</Text>
                    <Text>Min.: {product.minQuantity}</Text>
                  </View>
                  <View className="w-fit">
                    <Text>Compra: R$ {product.purchasePrice}</Text>
                    <Text>Venda: R$ {product.salePrice}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => router.push(`/product/${product.id}`)}
                    className="bg-black rounded-full px-4 py-2 border border-black border-solid shadow-sm active:shadow-lg active:scale-95"
                  >
                    <Text className="text-xl font-bold text-white">
                      Ver mais
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
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
