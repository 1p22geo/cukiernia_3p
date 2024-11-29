"use client"
import { Product } from "@ck/utils/types/product";
import { ReactNode } from "react";

export const ProductCard = ({ children, button }: { children: Product, button?: ReactNode }) => {
  return (
    <a className="cursor-pointer" href={`/product/${children._id}`}>
      <div className="w-72 h-[300px] bg-red-300 rounded-xl p-4 hover:outline outline-red-400 rounded-xl flex flex-col items-start">
        <h2 className="font-bold">{children.name} - {children.price.toFixed(2)} zł</h2>
        <div
          className="w-full h-24 bg-cover bg-center bg-[url(https://picsum.photos/400)]"
          title="losowy obrazek, przepraszam z góry za jego treść"
        />
        <p className="text-md">{children.description}</p>
        {button}
      </div>
    </a >
  );
};
