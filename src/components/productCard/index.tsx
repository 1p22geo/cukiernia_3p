import { Product } from "@ck/utils/types/product";
import { ReactNode } from "react";
import "server-only"

export const ProductCard = ({ children, button }: { children: Product, button?: { action?: (() => Promise<void>), node: ReactNode } }) => {
  return (
    <a className="cursor-pointer" href={`/product/${children._id}`}>
      <div className="w-72 h-[300px] bg-red-300 rounded-xl p-4 hover:outline outline-red-400 rounded-xl flex flex-col items-start">
        <h2 className="font-bold">{children.name} - {children.price.toFixed(2)} zł</h2>
        <div
          className="w-full h-24 bg-cover bg-center bg-[url(https://picsum.photos/400)]"
          title="losowy obrazek, przepraszam z góry za jego treść"
        />
        <p className="text-md">{children.description}</p>

        {
          button ?
            <form action={button?.action} className=" mt-auto">
              <input type="submit" id="submit" className="sr-only" />
              <label htmlFor="submit" className="bg-red-500 hover:bg-red-600 p-1 rounded-md cursor-pointer">{button?.node}</label>
            </form>
            :
            <></>
        }

      </div>
    </a >
  );
};
