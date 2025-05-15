"use client";
import { useState, useEffect, useMemo } from "react";
import { Bell } from "@phosphor-icons/react";
import { Product } from "@/types/productType";

export function Notification() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:3000/product");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const lowStockProducts = useMemo(() => {
    return products.filter(
      (product) => product.currentQuantity <= product.minQuantity
    );
  }, [products]);

  const shouldShowNotification = lowStockProducts.length > 0;

  const verifyMinQuantity = () => {
    if (
      products.some((product) => product.currentQuantity <= product.minQuantity)
    ) {
      return true;
    }
    return false;
  };
  const toggleSideBar = () => {
    setIsModalVisible(!isModalVisible);
  };

  if (verifyMinQuantity()) {
    return (
      <div className="flex-row items-center justify-end w-full">
        <div className="w-full flex justify-end">
          <button onClick={toggleSideBar} className="cursor-pointer relative">
            <Bell size={30} weight="bold" />
            {shouldShowNotification && (
              <div className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                <p className="text-white text-xs">{lowStockProducts.length}</p>
              </div>
            )}
          </button>
        </div>
        {isModalVisible && (
          <div className="bg-white rounded-b-xl">
            <p className="text-lg mb-4 text-end">Produtos em baixo estoque</p>
            <ul className="pl-8 overflow-y-auto max-h-48">
              {lowStockProducts.map((product) => (
                <li
                  key={product.id}
                  className="w-full border-b border-gray-300 flex-col flex gap-2"
                >
                  <span>{product.name}</span>
                  <span className="">
                    Atual: {product.currentQuantity} (Mín.:{" "}
                    {product.minQuantity})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-end w-full">
      <div className="w-full flex justify-end">
        <button onClick={toggleSideBar} className="relative cursor-pointer">
          <Bell size={30} weight="bold" />
        </button>
      </div>
      {isModalVisible && (
        <div className="bg-white rounded-b-xl w-full">
          <p className="font-bold text-lg mb-4">
            Não há produtos em baixo estoque
          </p>
        </div>
      )}
    </div>
  );
}
