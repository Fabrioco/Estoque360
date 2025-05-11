import { Movement, MovementType } from "@/src/app/(tabs)/movements";
import { useGetProducts } from "@/src/hooks/useGetProducts";
import { Product } from "@/src/types/productType";
import axios from "axios";
import React from "react";
import {
  Alert,
  Modal,
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
      const res = await axios.post(`http://192.168.10.17:3000/movement`, {
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
    const fetchProducts = async () => {
      try {
        const res = await useGetProducts();
        setProducts(res as Product[] | []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Modal visible={isModalVisible} animationType="slide">
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <Text>Fechar</Text>
      </TouchableOpacity>
      <RNPickerSelect
        placeholder={{ label: "Selecione um produto", value: null }}
        onValueChange={(e) => handleChange("productId", e)}
        items={products.map((product) => ({
          label: product.name,
          value: product.id,
        }))}
      />

      <RNPickerSelect
        placeholder={{ label: "Selecione o tipo", value: null }}
        items={[
          { label: "Entrada", value: "ENTRADA" },
          { label: "Saida", value: "SAIDA" },
        ]}
        onValueChange={(e) => handleChange("type", e)}
      />

      <View>
        <Text>Quantidade</Text>
        <TextInput
          placeholder="10"
          keyboardType="numeric"
          onChangeText={(e) => handleChange("quantity", e)}
        />
      </View>

      <View>
        <Text>Motivo</Text>
        <TextInput
          placeholder="(Opcional)"
          keyboardType="default"
          onChangeText={(e) => handleChange("reason", e)}
        />
      </View>

      <TouchableOpacity onPress={handleAddMovement}>
        <Text>Salvar</Text>
      </TouchableOpacity>
    </Modal>
  );
}
