import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Movement } from "../(tabs)/movements";
import RNPickerSelect from "react-native-picker-select";

export default function MovementDetail() {
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [movement, setMovement] = React.useState<Movement>();
  const [isEditable, setIsEditable] = React.useState<boolean>(false);

  const handleChange = (field: keyof Movement, value: string | number) => {
    setMovement((prev: Movement | undefined) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]:
          typeof prev[field] === "number" ? Number(value) : String(value),
      };
    });
  };

  const fetchMovement = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`http://192.168.10.17:3000/movement/${id}`);
      setMovement(res.data);
      const name = await fetchNameProduct(res.data.productId);
      setMovement({ ...res.data, name });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
          "Axios error:",
          error.code,
          error.message,
          error.config?.url
        );
      }
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

  const handleEditMovement = async () => {
    try {
      const { name, ...movementWithoutName } = movement as Movement;
      const res = await axios.patch(
        `http://192.168.10.17:3000/movement/${id}`,
        movementWithoutName
      );

      setMovement(movementWithoutName as Movement);
      router.back();
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
          onChangeText={(value) => handleChange("quantity", value)}
          editable={isEditable}
          keyboardType="numeric"
        />
      </View>

      <View>
        <Text>Motivo: {movement?.reason}</Text>
        <TextInput
          value={String(movement?.reason)}
          onChangeText={(value) => handleChange("reason", value)}
          editable={isEditable}
          keyboardType="default"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          placeholder="(Opcional)"
        />
      </View>

      <View>
        <Text>
          Data: {movement?.date?.split("T")[0].split("-").reverse().join("/")}
        </Text>
      </View>

      <View>
        <Text>
          Hora: {movement?.date?.split("T")[1].split(".")[0].slice(0, 5)}
        </Text>
      </View>

      <View>
        <Text>Tipo: </Text>
        <RNPickerSelect
          value={movement?.type}
          onValueChange={(value) => handleChange("type", value)}
          disabled={!isEditable}
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

      <TouchableOpacity
        onPress={isEditable ? handleEditMovement : () => setIsEditable(true)}
      >
        <Text>{isEditable ? "Salvar" : "Editar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}
