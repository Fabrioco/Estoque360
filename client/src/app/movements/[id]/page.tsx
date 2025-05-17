"use client";
import { MovementType } from "@/types/movementType";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@phosphor-icons/react";

export default function MovementIdPage() {
  const { id } = useParams();
  const router = useRouter();
  const [movement, setMovement] = React.useState<MovementType>({
    productId: 0,
    type: "ENTRADA",
    quantity: 0,
    date: "",
    reason: "",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isEditable, setIsEditable] = React.useState<boolean>(false);

  const handleChange = (field: keyof MovementType, value: string | number) => {
    setMovement((prev) => ({
      ...prev,
      [field]: typeof prev[field] === "number" ? Number(value) : String(value),
    }));
  };

  const fetchMovement = async (id: number) => {
    if (!id) return;
    try {
      const res = await fetch(`http://localhost:3000/movement/${id}`, {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const resClone = res.clone();
      if (!res.ok) {
        const erroData = await resClone.text();
        throw new Error(erroData);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        router.push("/movements");
        throw new Error("Movimentação não encontrada");
      }
      const data = await res.json();
      setMovement(data);
      setMovement({ ...data, name: await fetchNameProduct(data.productId) });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNameProduct = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/product/${id}`);
      const data = await res.json();
      return data.name;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (id) {
      fetchMovement(Number(id));
    }
  }, [id]);

  const handleEditMovement = async () => {
    const { name, ...movementWithoutName } = movement;
    try {
      const res = await fetch(`http://localhost:3000/movement/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movementWithoutName),
      });
      if (!res.ok) {
        const erroData = await res.text();
        throw new Error(erroData);
      }

      if (res.status === 200) {
        alert("Movimentação atualizada com sucesso!");
      }

      setIsEditable(false);
      router.push("/movements");
    } catch (error) {
      if (error instanceof Error) {
        alert(error);
      }
      console.error(error);
    }
  };

  const handleDeleteMovement = async () => {
    try {
      const res = await fetch(`http://localhost:3000/movement/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const erroData = await res.text();
        throw new Error(erroData);
      }

      if (res.ok) {
        router.push("/movements");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center h-full w-full">
        <Spinner size={32} weight="bold" className="animate-spin" />
      </div>
    );
  }

  if (!movement.name) {
    return (
      <div className="flex flex-row items-center justify-center h-full w-full">
        <Spinner size={32} weight="bold" className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-end gap-4 justify-center">
        <Link
          href="/movements"
          className="text-white bg-black rounded-full font-bold px-4 py-2"
        >
          Voltar
        </Link>
        <h1 className="text-center w-full font-bold text-2xl">
          Detalhes da movimentação
        </h1>
      </div>

      <div className="flex flex-col gap-4 text-lg">
        <div className="flex flex-row">
          <span>
            <strong>Produto:</strong> {movement.name}
          </span>
        </div>

        <div className="flex flex-col">
          <label htmlFor="quantity" className="font-bold">
            Quantidade:
          </label>
          <input
            type="number"
            placeholder="10"
            value={movement.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            className="w-full bg-slate-50 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed"
            disabled={!isEditable}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="reason" className="font-bold">
            Motivo:
          </label>
          <input
            type="text"
            placeholder="(Opcional)"
            value={movement.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
            className="w-full bg-slate-50 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed"
            disabled={!isEditable}
          />
        </div>

        <div className="flex flex-row">
          <span>
            <strong>Data:</strong>{" "}
            {new Date(movement.date || "").toLocaleDateString()}
          </span>
        </div>

        <div className="flex flex-row">
          <span>
            <strong>Hora:</strong>{" "}
            {new Date(movement.date || "").toLocaleTimeString().slice(0, 5)}
          </span>
        </div>

        <div>
          <label htmlFor="type" className="font-bold">
            Tipo:
          </label>
          <select
            name="type"
            id="type"
            value={movement.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="w-full bg-slate-50 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed"
            disabled={!isEditable}
          >
            <option value="ENTRADA">Entrada</option>
            <option value="SAIDA">Saída</option>
          </select>
        </div>

        <div className="w-full flex flex-row justify-between items-center">
          <button
            className="bg-white rounded-md text-black font-bold px-4 py-2 cursor-pointer"
            onClick={
              isEditable ? handleEditMovement : () => setIsEditable(true)
            }
          >
            {isEditable ? "Salvar" : "Editar"}
          </button>
          <button className="bg-white rounded-md text-black font-bold px-4 py-2 cursor-pointer" onClick={handleDeleteMovement}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
