import { Text, View } from "react-native";
import { useGetProducts } from "../hooks/useGetProducts";
import React from "react";
import { Bell } from "phosphor-react-native";

export function Notification() {
  const { data: products, refetch } = useGetProducts();

  React.useEffect(() => {
    refetch();
  }, [products]);

  const verifyMinQuantity = () => {
    if (
      products.some((product) => product.currentQuantity <= product.minQuantity)
    ) {
      return true;
    }
    return false;
  };

  if (verifyMinQuantity()) {
    return (
      <View>
        <Bell size={30} weight="bold" />
        <Text>{products.length}</Text>
        <Text>Notification</Text>
      </View>
    );
  }

  return (
    <View>
      <Bell size={30} weight="bold" />
      <Text>Notification</Text>
    </View>
  );
}
