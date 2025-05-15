import React from "react";
import Link from "next/link";
import FormNewProduct from "@/ui/products/new/form";

export default function NewProduct() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row items-center justify-between lg:w-1/2 mx-auto gap-4">
        <h1 className="text-2xl font-bold">Adicionar Produto</h1>
        <Link
          href="/"
          className="flex flex-row items-center bg-red-500 px-4 py-2 rounded-md text-white"
        >
          <p>Voltar</p>
        </Link>
      </div>
      <FormNewProduct />
    </div>
  );
}
