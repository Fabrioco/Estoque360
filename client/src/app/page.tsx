import Link from "next/link";
import { PlusCircle } from "@phosphor-icons/react/dist/ssr";

type Product = {
  id: number;
  name: string;
  currentQuantity: number;
  minQuantity: number;
  purchasePrice: number;
  salePrice: number;
};

export default async function Home() {
  const res = await fetch("http://localhost:3000/product", {
    cache: "no-cache",
  });
  const products: Product[] = await res.json();

  return (
    <div className="flex flex-col items-center p-2">
      <h1 className="text-2xl font-bold uppercase">Produtos em estoque</h1>
      <div className="w-full flex justify-start mt-4">
        <Link
          href="/products/new"
          className="border border-white px-4 py-2 rounded-full bg-white"
        >
          <p className="flex flex-row items-center gap-2">
            Adicionar <PlusCircle size={32} weight="bold" />
          </p>
        </Link>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white px-4 py-2 rounded-full flex flex-row h-auto items-center justify-between text-sm w-full gap-1"
          >
            <h2 className="text-lg font-bold w-2/12">{product.name}</h2>
            <div className="flex flex-col justify-between items-center gap-2">
              <p className="flex flex-col">
                Atual:
                <span className="font-bold">{product.currentQuantity}</span>
              </p>
              <p className="flex flex-col ">
                Mín.:<span className="font-bold">{product.minQuantity}</span>
              </p>
            </div>

            <div className="flex flex-col justify-between items-center gap-2">
              <p className="flex flex-col">
                Compra:
                <span className="font-bold">R$ {product.purchasePrice}</span>
              </p>
              <p className="flex flex-col">
                Venda:<span className="font-bold">R$ {product.salePrice}</span>
              </p>
            </div>

            <Link
              href={`/products/${product.id}`}
              className="bg-black text-white px-4 py-2 rounded-full text-center font-bold"
            >
              Ver mais
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
