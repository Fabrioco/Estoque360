import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { PlusCircle } from "phosphor-react-native";

type Product = {
  id: number;
  name: string;
  description?: string;
  currentQuantity: number;
  minQuantity: number;
  purchasePrice: number;
  salePrice: number;
};

export default function Index() {
  const [products, setProducts] = useState<Product[] | null>(null);

  const getProducts = async () => {
    try {
      const res = await axios.get(`http://192.168.1.64:3000/product`, {
        timeout: 5000,
      });
      setProducts(res.data);
    } catch (error) {
      error = error;
      if (axios.isAxiosError(error)) {
        console.log(
          "Axios error:",
          error.code, // Ex: 'ERR_NETWORK'
          error.message, // Ex: 'Network Error'
          error.config?.url // URL da requisição
        );
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <Text className="text-3xl uppercase font-bold text-justify w-11/12">
        Produtos
      </Text>

      <View className="flex-row justify-start w-11/12">
        <TouchableOpacity className="flex-row gap-2 items-center bg-blue-700 px-4 py-2 rounded">
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
    </View>
  );
}
