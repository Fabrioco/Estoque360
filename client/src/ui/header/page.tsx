import { Bell, BoxArrowUp } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Notification } from "./notification";

export function Header() {
  return (
    <div className="flex flex-col items-center justify-between bg-white rounded-b-xl px-4 py-2 mb-4 w-11/12 mx-auto gap-2">
      <div className="flex flex-row  justify-between w-full gap-2">
        <h1 className="flex flex-row items-center justify-center text-2xl font-bold max-h-10">
          <BoxArrowUp size={32} weight="bold" />
          Estoque360
        </h1>
        <Notification />
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
