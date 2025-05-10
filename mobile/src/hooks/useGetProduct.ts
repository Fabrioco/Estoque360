import axios from "axios";
import { Product } from "../types/productType";

export async function useGetProduct(
  id: number
): Promise<Product | string | undefined> {
  try {
    const response = await axios.get(`http://192.168.1.64:3000/product/${id}`);
    const data = await response;
    return data.data;
  } catch (error) {
    error = error;
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", error.code, error.message, error.config?.url);
    }
  }
}
