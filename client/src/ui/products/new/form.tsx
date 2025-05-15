"use client";

import { Product } from "@/app/page";
import { CircleNotch, PlusCircle } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React from "react";
import { ProductField } from "./productField";

export default function FormNewProduct() {
  const [product, setProduct] = React.useState<Product>({
    name: "",
    description: "",
    currentQuantity: 0,
    minQuantity: 0,
    purchasePrice: 0,
    salePrice: 0,
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Product, value: string | number) => {
    setProduct((prev) => ({
      ...prev,
      [field]: typeof prev[field] === "number" ? Number(value) : String(value),
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 lg:w-1/2 mx-auto"
    >
      <ProductField
        label="Nome do produto"
        value={product.name}
        onChange={(value) => handleChange("name", value)}
        nameId="name"
        placeholder="Garrafa de água"
      />
      <ProductField
        label="Descrição"
        value={product.description || ""}
        onChange={(value) => handleChange("description", value)}
        nameId="description"
        placeholder="(Opcional)"
      />
      <ProductField
        label="Quantidade atual"
        value={product.currentQuantity}
        onChange={(value) => handleChange("currentQuantity", value)}
        nameId="currentQuantity"
        placeholder="10"
        type="number"
      />
      <ProductField
        label="Quantidade minima"
        value={product.minQuantity}
        onChange={(value) => handleChange("minQuantity", value)}
        nameId="minQuantity"
        placeholder="5"
        type="number"
      />
      <ProductField
        label="Preço de compra"
        value={product.purchasePrice}
        onChange={(value) => handleChange("purchasePrice", value)}
        nameId="purchasePrice"
        placeholder="5.99"
        type="number"
      />
      <ProductField
        label="Preço de venda"
        value={product.salePrice}
        onChange={(value) => handleChange("salePrice", value)}
        nameId="salePrice"
        placeholder="9.99"
        type="number"
      />
      <div className="flex flex-row justify-end mt-4">
        <button
          type="submit"
          className="flex flex-row items-center bg-black text-white rounded-full px-4 py-2 font-bold cursor-pointer"
        >
          {loading ? "Salvando" : "Salvar"}
          {loading && (
            <CircleNotch size={24} weight="bold" className="animate-spin" />
          )}
        </button>
      </div>
    </form>
  );
}
