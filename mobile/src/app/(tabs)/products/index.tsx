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
  },[isModalVisible])

  if (isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>Erro ao carregar produtos</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Produtos</Text>

        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text>Adicionar</Text>
            <PlusCircle size={30} weight="bold" />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {products.length === 0 ? (
            <Text>Nenhum produto cadastrado</Text>
          ) : (
            products.map((product) => (
              <View key={product.id}>
                <Text>{product.name}</Text>
                <View>
                  <Text>Compra: R${product.purchasePrice}</Text>
                  <Text>Venda: R${product.salePrice}</Text>
                </View>
                <View>
                  <Text>Estoque: {product.currentQuantity}</Text>
                  <Text>Min: {product.minQuantity}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.push(`/product/${product.id}`)}
                >
                  <Text>Ver mais</Text>
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
