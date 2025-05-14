import axios from "axios";
import { Product } from "../types/productType";
import React from "react";

const api = axios.create({
  baseURL: "http://192.168.1.64:3000",
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
      const dataOrganized = response.data.sort((a: Product, b: Product) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setData(dataOrganized);
      return dataOrganized;
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
