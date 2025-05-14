import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetProducts } from "../hooks/useGetProducts";
import React from "react";
import { Bell } from "phosphor-react-native";

export function Notification() {
  const { data: products = [], refetch } = useGetProducts();
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [animation] = React.useState(new Animated.Value(40));

  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const lowStockProducts = React.useMemo(() => {
    return products.filter(
      (product) => product.currentQuantity <= product.minQuantity
    );
  }, [products]);

  const shouldShowNotification = lowStockProducts.length > 0;

  const verifyMinQuantity = () => {
    if (
      products.some((product) => product.currentQuantity <= product.minQuantity)
    ) {
      return true;
    }
    return false;
  };

  const toggleSideBar = () => {
    const toValue = isModalVisible ? 40 : 160;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsModalVisible(!isModalVisible);
  };

  if (verifyMinQuantity()) {
    return (
      <Animated.View style={[{ height: animation }]} className="flex-col">
        <View className="flex-row items-center justify-end">
          <TouchableOpacity onPress={toggleSideBar} className="relative">
            <Bell size={30} weight="bold" />
            {shouldShowNotification && (
              <View className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                <Text className="text-sm text-white">
                  {lowStockProducts.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {isModalVisible && shouldShowNotification && (
          <ScrollView className="flex-1">
            <View className="flex-col gap-2">
              {lowStockProducts.map((product) => (
                <View
                  key={product.id}
                  className="flex-col border-b border-gray-400"
                >
                  <Text className="font-bold text-lg">{product.name}</Text>
                  <Text>
                    Atual: {product.currentQuantity} (Min: {product.minQuantity}
                    )
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[{ height: animation }]} className="flex-col">
      <View className="flex-row items-center justify-end">
        <TouchableOpacity onPress={toggleSideBar} className="relative">
          <Bell size={30} weight="bold" />
        </TouchableOpacity>
      </View>

      {isModalVisible && (
        <View className="w-11/12 mx-auto mt-5">
          <Text className="text-lg text-right">
            Nenhum produto em estoque baixo
          </Text>
        </View>
      )}
    </Animated.View>
  );
}
