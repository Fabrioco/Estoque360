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
      <Animated.View style={[{ height: animation }]}>
        <TouchableOpacity onPress={toggleSideBar}>
          <Bell size={30} weight="bold" />
          {shouldShowNotification && (
            <View>
              <Text>{lowStockProducts.length}</Text>
            </View>
          )}
        </TouchableOpacity>

        {isModalVisible && shouldShowNotification && (
          <ScrollView>
            {lowStockProducts.map((product) => (
              <View key={product.id}>
                <Text>{product.name}</Text>
                <Text>
                  Stock: {product.currentQuantity} (Min: {product.minQuantity})
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[{ height: animation }]}>
      <TouchableOpacity onPress={toggleSideBar}>
        <Bell size={30} weight="bold" />
      </TouchableOpacity>
      <View>
        {isModalVisible && <Text>Não há produtos com estoque baixo</Text>}
      </View>
    </Animated.View>
  );
}
