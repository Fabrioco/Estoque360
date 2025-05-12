import axios from "axios";
import { Product } from "../types/productType";
import React from "react";

const api = axios.create({
  baseURL: "http://192.168.10.17:3000", // Depois tem que mudar por cauda do WiFi
  timeout: 5000,
});

/**
 * @returns {Promise<Product[]>}
 */
export const useGetProducts = () => {
  const [data, setData] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchProducts = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get("/product");
      setData(response.data);
      return response.data;
    } catch (err) {
      const error = err as Error;
      setError(error);

      if (axios.isAxiosError(error)) {
        console.error(
          `Axios error: ${error.message}`,
          `Code: ${error.code}`,
          `URL: ${error.config?.url}`
        );
      } else {
        console.error("Unexpected error:", error);
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = () => {
    fetchProducts();
  };

  return { fetchProducts, data, isLoading, error, refetch };
};
