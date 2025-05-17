import Link from "next/link";
import { PlusCircle } from "@phosphor-icons/react/dist/ssr";
import { MovementType } from "@/types/movementType";
import { Product } from "@/types/productType";

export default async function MovementsPage() {
  let movements: MovementType[] = [];
  let errorMessage: string | null = null;

  try {
    const res = await fetch("http://localhost:3000/movement", {
      cache: "no-cache",
    });

    const data = await res.text();
    try {
      const parsedData = JSON.parse(data);

      if (Array.isArray(parsedData)) {
        movements = parsedData;
        const products = await fetch("http://localhost:3000/product", {
          cache: "no-cache",
        }).then((res) => res.json());

        movements = movements.map((movement) => {
          const product = products.find(
            (product: Product) => product.id === movement.productId
          );
          return {
            ...movement,
            name: product?.name || "",
          };
        });
      } else if (typeof parsedData === "string") {
        errorMessage = parsedData;
      }
    } catch {
      errorMessage = data;
    }

    if (!res.ok) {
      throw new Error(errorMessage || "Erro ao carregar movimentações");
    }
  } catch (error) {
    console.error("Erro ao carregar movimentos:", error);
    errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col w-full">
        <h1 className="text-3xl font-bold text-center">Movimentos</h1>
        <Link
          href="/movements/new"
          className="flex flex-row items-center gap-2 p-2 mt-4 bg-white rounded-full text-black font-bold w-fit"
        >
          <span>Novo</span>
          <PlusCircle size={24} color="#000" weight="bold" />
        </Link>
      </div>

      <div className="w-full mt-4 overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Produto</th>
              <th className="px-4 py-2">Quantidade</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Hora</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {errorMessage ? (
              <tr>
                <td colSpan={5} className="border px-4 py-2 text-center">
                  {errorMessage}
                </td>
              </tr>
            ) : movements.length === 0 ? (
              <tr>
                <td colSpan={5} className="border px-4 py-2 text-center">
                  Nenhum movimento encontrado
                </td>
              </tr>
            ) : (
              movements.map((movement) => (
                <tr key={movement.id} className="even:bg-gray-100 odd:bg-white">
                  <td className="border px-4 py-2">
                    <Link
                      href={`/movements/${movement.id}`}
                      className="underline hover:text-blue-500"
                    >
                      {movement.name}
                    </Link>
                  </td>
                  <td className="border px-4 py-2">{movement.quantity}</td>
                  <td className="border px-4 py-2">
                    {movement.type === "ENTRADA" ? "Entrada" : "Saída"}
                  </td>
                  <td className="border px-4 py-2">
                    {movement.date
                      ? new Date(movement.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {movement.date
                      ? new Date(movement.date).toLocaleTimeString().slice(0, 5)
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
