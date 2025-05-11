import axios from "axios";
import { Product } from "../types/productType";

export async function useGetProducts(): Promise<
  Product[] | []
> {
  try {
    const res = await axios.get(`http://192.168.10.17:3000/product`, {
      timeout: 5000,
    });
    return res.data;
  } catch (error) {
    error = error;
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", error.code, error.message, error.config?.url);
    }
    return []
  }
}
