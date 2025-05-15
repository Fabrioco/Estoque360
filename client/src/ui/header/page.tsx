import { Bell, BoxArrowUp } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export function Header() {
  return (
    <div className="flex flex-col items-center justify-between bg-white rounded-b-xl px-4 py-2 mb-4 w-11/12 mx-auto gap-2">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="flex flex-row items-center justify-center text-2xl font-bold">
          <BoxArrowUp size={32} weight="bold" />
          Estoque360
        </h1>
        <button>
          <Bell size={32} weight="bold" />
        </button>
      </div>
      <nav>
        <ul className="flex flex-row gap-4">
          <li>
            <Link href="/">
              <p>Produtos</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <p>Movimentações</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
