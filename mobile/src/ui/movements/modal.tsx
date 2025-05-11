import { Movement, MovementType } from "@/src/app/(tabs)/movements";
import { useGetProducts } from "@/src/hooks/useGetProducts";
import { Product } from "@/src/types/productType";
import React from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
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
  const [productId, setProductId] = React.useState<number>(0);
  const [typeMovement, setTypeMovement] = React.useState<MovementType | null>(
    null
  );

  React.useEffect(() => {
    const fetchMovements = async () => {
      try {
        const res = await useGetProducts();
        setProducts(res as Product[] | []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setProducts([]);
      }
    };

    fetchMovements();
  }, []);

  return (
    <Modal visible={isModalVisible} animationType="slide">
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <Text>Fechar</Text>
      </TouchableOpacity>
      <RNPickerSelect
        placeholder={{ label: "Selecione um produto", value: null }}
        onValueChange={setProductId}
        items={products.map((product) => ({
          label: product.name,
          value: product.id,
        }))}
      />

      <RNPickerSelect
        placeholder={{ label: "Selecione o tipo", value: null }}
        items={[
          { label: "Entrada", value: "SAIDA" },
          { label: "Saida", value: "SAIDA" },
        ]}
        onValueChange={setTypeMovement}
      />

      <View>
        <Text>Quantidade</Text>
        <TextInput placeholder="10" keyboardType="numeric" />
      </View>

      <View>
        <Text>Motivo</Text>
        <TextInput placeholder="(Opcional)" keyboardType="default" />
      </View>

      <TouchableOpacity>
        <Text>Salvar</Text>
      </TouchableOpacity>
    </Modal>
  );
}
