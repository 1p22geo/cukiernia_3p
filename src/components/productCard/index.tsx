"use client"
import { ProductSanitized } from "@ck/utils/types/product";
import './productCard.css';

export const ProductCard = ({ children, button }: { children: ProductSanitized, button?: { text: string, url: string, init?: RequestInit } }) => {
  return (
    <a className="cursor-pointer" href={`/product/${children._id}`}>
      <div className="w-72 h-[300px] bg-red-300 rounded-xl p-4 hover:outline outline-red-400 rounded-xl flex flex-col items-start item-card">
        <h2 className="font-bold">{children.name} - {children.price.toFixed(2)} zł</h2>
        <div
          className="w-full h-24 mb-4 bg-cover bg-center bg-[url(https://picsum.photos/400)]"
          title="losowy obrazek, przepraszam z góry za jego treść"
        />
        <p className="text-md">{children.description}</p>
        {
          button ?
            <button onClick={async (e) => {
              e.preventDefault()
              e.stopPropagation()
              await fetch(button.url, button.init)
              window.location.reload()
            }} className="bg-red-500 mt-auto hover:bg-red-600 p-1 rounded-md cursor-pointer">{button.text}</button>
            : <></>
        }
      </div>
    </a >
  );
};
