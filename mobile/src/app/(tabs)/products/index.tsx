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
          {typeof products === "string" ? (
            <Text>{products}</Text>
          ) : (
            <View>
              {products.map((product) => (
                <View key={product.id}>
                  <Text>{product.name}</Text>
                  <Text>{product.description}</Text>
                  <Text>{product.currentQuantity}</Text>
                  <Text>{product.minQuantity}</Text>
                  <Text>{product.purchasePrice}</Text>
                  <Text>{product.salePrice}</Text>
                  <TouchableOpacity
                    onPress={() => router.push(`/product/${product.id}`)}
                  >
                    <Text>Ver mais</Text>
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
