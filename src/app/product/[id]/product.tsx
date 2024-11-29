import { ProductDataWithAverage } from "@ck/lib/loadProduct";
import Image from "next/image";
import Link from "next/link";

export const ProductInfo = ({ product }: { product: ProductDataWithAverage }) => {
  return (
    <div>
      <Link href="/" className="text-right w-full block hover:underline font-semibold">
        Wróć do produktów
      </Link>
      <h1 className="text-2xl mb-8">{product.name} - {product.price.toFixed(2)} zł</h1>
      <h2 className="text-lg font-semibold mb-2">Zdjęcia produktu</h2>
      <div className="flex flex-row w-full overflow-x-scroll">
        {Array.from(Array(10).keys()).map((k) => (
          <Image
            src={`https://picsum.photos/400?${k}`}
            width={200}
            height={200}
            key={k}
            className="rounded-xl p-2"
            alt={`product image #${k}`}
            loading="eager"
          />
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-2 mt-8">Opis produktu</h2>
      <p className="p-2">{product.description}</p>

      <h2 className="text-lg font-semibold mb-2 mt-8">Dodatkowe informacje</h2>
      <ul className="list-disc p-2 px-4">
        <li>Kategoria: {product.category}</li>
        <li>Producent: {product.supplier}</li>
        <li>Średnia ocen: {(product.avgRating ?? 0).toFixed(2)}</li>
        <li>Dodano: {new Date(product.added).toISOString()}</li>
      </ul>

    </div>
  );
};
