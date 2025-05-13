import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
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

  const handleDeleteMovement = async () => {
    try {
      const res = await axios.delete(
        `http://192.168.10.17:3000/movement/${id}`
      );
      Alert.alert("Sucesso", res.data);
      router.back();
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
      <View className="flex-1 items-center justify-center bg-slate-200">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="flex-1 items-center p-4">
        <View className="w-full flex-row justify-end">
          <TouchableOpacity
            onPress={() => router.back()}
            className="my-4 bg-black px-4 py-2 rounded-full"
          >
            <Text className="text-lg text-white font-bold">Voltar</Text>
          </TouchableOpacity>
        </View>
        <View className="my-4 w-full">
          <Text className="text-2xl font-bold text-center">
            Detalhes do movimento
          </Text>
        </View>
        <View className="w-11/12 items-center justify-center bg-slate-200">
          <View className="my-4 w-full flex-row items-center gap-2">
            <Text className="text-2xl font-bold">Produto:</Text>
            <Text className="text-2xl">{movement?.name}</Text>
          </View>

          <View className="my-4 w-full flex-col  gap-2">
            <Text className="text-2xl font-bold">Quantidade:</Text>
            <TextInput
              value={String(movement?.quantity)}
              onChangeText={(value) => handleChange("quantity", value)}
              editable={isEditable}
              keyboardType="numeric"
              className="border border-slate-50 bg-slate-50 rounded-full p-4 text-lg"
            />
          </View>

          <View className="my-4 w-full flex-col gap-2">
            <Text className="text-2xl font-bold">
              Motivo: {movement?.reason}
            </Text>
            <TextInput
              value={String(movement?.reason)}
              onChangeText={(value) => handleChange("reason", value)}
              editable={isEditable}
              keyboardType="default"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholder="(Opcional)"
              className="border border-slate-50 bg-slate-50 rounded-full p-4 text-lg"
            />
          </View>

          <View className="my-4 w-full flex-row items-center gap-2">
            <Text className="text-2xl font-bold">Data:</Text>
            <Text className="text-2xl">
              {movement?.date?.split("T")[0].split("-").reverse().join("/")}
            </Text>
          </View>

          <View className="my-4 w-full flex-row items-center gap-2">
            <Text className="text-2xl font-bold">Hora:</Text>
            <Text className="text-2xl">
              {movement?.date?.split("T")[1].split(".")[0].slice(0, 5)}
            </Text>
          </View>

          <View className="my-4 w-full flex-col gap-2">
            <Text className="text-2xl font-bold">Tipo:</Text>
            <View className="w-full bg-slate-50 rounded-full">
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
          </View>

          <View className="my-4 w-full flex-row justify-between">
            <TouchableOpacity
              className="my-4 bg-white px-4 py-2 rounded-md"
              onPress={
                isEditable ? handleEditMovement : () => setIsEditable(true)
              }
            >
              <Text className="text-lg text-black font-bold">
                {isEditable ? "Salvar" : "Editar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDeleteMovement}
              className="my-4 bg-white px-4 py-2 rounded-md"
            >
              <Text className="text-lg text-black font-bold">Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
