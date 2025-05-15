"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Product } from "@/types/productType";
import { ProductField } from "@/ui/products/new/productField";
import Link from "next/link";

export default function ProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product>({} as Product);
  const [editable, setEditable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/product/${id}`);
        if (!res.ok) {
          const erroData = await res.text();
          throw new Error(erroData);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Resposta não é JSON");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log("Erro ao buscar produto:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleEditProduct = async () => {
    try {
      setLoading(true);

      const productCorrect = {
        ...product,
        currentQuantity: Number(product.currentQuantity),
        minQuantity: Number(product.minQuantity),
        purchasePrice: Number(product.purchasePrice),
        salePrice: Number(product.salePrice),
      };

      const res = await fetch(`http://localhost:3000/product/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(productCorrect),
      });

      if (!res.ok) {
        const erroData = await res.text();
        throw new Error(erroData);
      }
      setProduct(productCorrect);

      setEditable(false);
      alert("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro completo:", error);
      alert(
        error instanceof Error ? error.message : "Erro ao atualizar produto"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await fetch(`http://localhost:3000/product/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row items-center justify-end w-full lg:w-1/2 mx-auto gap-4">
        <Link
          href="/"
          className="flex flex-row bg-black px-4 py-2 rounded-full text-white font-bold"
        >
          <p>Voltar</p>
        </Link>
      </div>
      <ProductField
        label="Nome"
        value={product.name}
        onChange={(value) => setProduct({ ...product, name: String(value) })}
        nameId="name"
        placeholder="Digite o nome do produto"
        disabled={!editable}
      />
      <ProductField
        label="Preço de Compra"
        value={product.purchasePrice}
        onChange={(value) =>
          setProduct({ ...product, purchasePrice: Number(value) })
        }
        nameId="purchasePrice"
        placeholder="0.00"
        type="number"
        disabled={!editable}
      />
      <ProductField
        label="Preço de Venda"
        value={product.salePrice}
        onChange={(value) =>
          setProduct({ ...product, salePrice: Number(value) })
        }
        nameId="salePrice"
        placeholder="0.00"
        type="number"
        disabled={!editable}
      />
      <ProductField
        label="Quantidade Atual"
        value={product.currentQuantity}
        onChange={(value) =>
          setProduct({ ...product, currentQuantity: Number(value) })
        }
        nameId="currentQuantity"
        placeholder="0"
        type="number"
        disabled={!editable}
      />
      <ProductField
        label="Quantidade Minima"
        value={product.minQuantity}
        onChange={(value) =>
          setProduct({ ...product, minQuantity: Number(value) })
        }
        nameId="minQuantity"
        placeholder="0"
        type="number"
        disabled={!editable}
      />
      <ProductField
        label="Descrição"
        value={product.description || ""}
        onChange={(value) =>
          setProduct({ ...product, description: String(value) })
        }
        nameId="description"
        placeholder="(Opcional)"
        disabled={!editable}
      />
      <div className="flex flex-row gap-4 mt-4">
        <button
          onClick={editable ? handleEditProduct : () => setEditable(true)}
          className="bg-white text-black font-bold py-2 px-4 rounded-full cursor-pointer"
        >
          {!editable && "Editar"}
          {editable && !loading && "Salvar"}
          {loading && "Carregando..."}
        </button>
        <button
          onClick={handleDeleteProduct}
          className="bg-white text-black font-bold py-2 px-4 rounded-full cursor-pointer"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
