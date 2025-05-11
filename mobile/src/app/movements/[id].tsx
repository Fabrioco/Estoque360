import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Movement } from "../(tabs)/movements";
import RNPickerSelect from "react-native-picker-select";

export default function MovementDetail() {
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [movement, setMovement] = React.useState<Movement>();

  const fetchMovement = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`http://192.168.10.17:3000/movement/${id}`);
      setMovement(res.data);
      const name = await fetchNameProduct(res.data.productId);
      setMovement({ ...res.data, name });
    } catch (error) {
      Alert.alert("Error", "Falha ao buscar movimento");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNameProduct = async (id: number) => {
    try {
      const res = await axios.get(`http://192.168.10.17:3000/product/${id}`);
      const data = await res.data;
      return data.name;
    } catch (error) {
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

  React.useEffect(() => {
    fetchMovement();
  }, [id]);

  if (isLoading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View>
      <View>
        <Text>Produto: {movement?.name}</Text>
      </View>

      <View>
        <Text>Quantidade: </Text>
        <TextInput
          value={String(movement?.quantity)}
          editable={false}
          keyboardType="numeric"
        />
      </View>

      <View>
        <Text>Motivo: {movement?.reason}</Text>
        <TextInput
          value={String(movement?.reason)}
          editable={false}
          keyboardType="default"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          placeholder="(Opcional)"
        />
      </View>

      <View>
        <Text>Tipo: </Text>
        <RNPickerSelect
          value={movement?.type}
          onValueChange={(value) => console.log(value)}
          placeholder={{
            label: "Selecione um tipo",
            value: null,
          }}
          items={[
            { label: "Entrada", value: "ENTRADA" },
            { label: "Saída", value: "SAIDA" },
          ]}
        />
      </View>

      <TouchableOpacity>
        <Text>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}
