import axios, { AxiosError } from "axios";
import { Product } from "../types/productType";
import React from "react";

const api = axios.create({
  baseURL: "http://192.168.10.17:3000",
  timeout: 5000,
});

type UseGetProductReturn = {
  data: Product | null;
  isLoading: boolean;
  error: AxiosError | null;
  refetch: () => Promise<void>;
};

export const useGetProduct = (id: number): UseGetProductReturn => {
  const [state, setState] = React.useState<{
    data: Product | null;
    isLoading: boolean;
    error: AxiosError | null;
  }>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchProduct = React.useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await api.get<Product>(`/product/${id}`);
      setState({
        data: response.data,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      const error = err as AxiosError;
      
      setState({
        data: null,
        isLoading: false,
        error,
      });

      console.error(
        `API Error: ${error.message}`,
        error.response?.data || 'No additional error info'
      );
    }
  }, [id]);

  React.useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    refetch: fetchProduct,
  };
};