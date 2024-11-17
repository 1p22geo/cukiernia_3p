import { Product } from "@ck/utils/types/product";

export const ProductCard = ({ children }: { children: Product }) => {
  return (
    <a className="cursor-pointer" href={`/product/${children._id}`}>
      <div className="w-72 h-[300px] bg-red-300 rounded-xl p-4 hover:outline outline-red-400 rounded-xl">
        <h2 className="text-xl font-bold">{children.name}</h2>
        <div
          className="w-full h-24 bg-cover bg-center bg-[url(https://picsum.photos/400)]"
          title="losowy obrazek, przepraszam z góry za jego treść"
        />
        <p className="text-md">{children.description}</p>
      </div>
    </a>
  );
};
