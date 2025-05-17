"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MovementType } from "@/types/movementType";
import { PlusCircle } from "@phosphor-icons/react";
import { Product } from "@/types/productType";
import Link from "next/link";

export default function NewMovement() {
  const [movement, setMovement] = useState<MovementType>({
    productId: 0,
    type: "ENTRADA",
    quantity: 0,
    reason: "",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/movement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movement),
      });

      if (response.ok) {
        router.push("/movements");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`http://localhost:3000/product`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (field: keyof MovementType, value: string | number) => {
    setMovement((prev) => ({
      ...prev,
      [field]: typeof prev[field] === "number" ? Number(value) : String(value),
    }));
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="w-full flex flex-row items-center justify-between lg:w-1/2 mx-auto">
        <h1 className="text-2xl font-bold w-fit">Adicionar Movimentação</h1>
        <Link
          href="/movements"
          className="bg-red-500 px-4 py-2 rounded-md text-white w-fit"
        >
          Voltar
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-lg">
          <label htmlFor="product" className="font-bold">
            Produto
          </label>
          <select
            id="product"
            onChange={(e) => handleChange("productId", e.target.value)}
            className="border border-white bg-white rounded-full px-4 py-2 text-lg cursor-pointer"
          >
            <option value="" className="text-gray-400">
              Selecione o produto
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 text-lg">
          <label htmlFor="type" className="font-bold">
            Tipo
          </label>
          <select
            id="type"
            onChange={(e) => handleChange("type", e.target.value)}
            className="border border-white bg-white rounded-full px-4 py-2 text-lg cursor-pointer"
          >
            <option value="">Selecione o tipo</option>
            <option value="ENTRADA">Entrada</option>
            <option value="SAIDA">Saida</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 text-lg">
          <label htmlFor="quantity" className="font-bold">
            Quantidade
          </label>
          <input
            type="number"
            placeholder="Quantity"
            value={movement.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            className="border border-white bg-white rounded-full px-4 py-2 text-lg"
          />
        </div>

        <div className="flex flex-col gap-2 text-lg">
          <label htmlFor="reason" className="font-bold">
            Motivo
          </label>
          <input
            type="text"
            placeholder="(Opcional)"
            value={movement.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
            className="border border-white bg-white rounded-full px-4 py-2 text-lg"
          />
        </div>

        <div className="w-full flex flex-row justify-end mt-4">
          <button
            type="submit"
            className="flex items-center bg-black text-white px-4 py-2 rounded-full"
          >
            <span className="flex flex-row items-center font-bold">Salvar</span>
          </button>
        </div>
      </form>
    </div>
  );
}
