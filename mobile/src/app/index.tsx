import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { PlusCircle } from "phosphor-react-native";
import { ModalProduct } from "../ui/home/modal";
import { useGetProducts } from "../hooks/useGetProducts";
import { Product } from "../types/productType";


export default function Index() {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    useGetProducts().then((res) => setProducts(res as Product[]));
  }, []);

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
          {products?.map((product) => (
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
                <Text>Ver mais</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <ModalProduct
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </SafeAreaView>
  );
}
