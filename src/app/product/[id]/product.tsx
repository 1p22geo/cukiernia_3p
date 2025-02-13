import { ProductDataWithAverage } from "@ck/lib/loadProduct";
import Image from "next/image";
import Link from "next/link";
import img1 from "./obrazki/ciasto1.jpg"
import img2 from "./obrazki/cukierki1.webp"
import img3 from "./obrazki/ciasto2.jpg"
import img4 from "./obrazki/cukierki2.jpg"
import img5 from "./obrazki/ciasto3.webp"
import img6 from "./obrazki/naton.webp"
import img7 from "./obrazki/cukierki3.jpg"
import img8 from "./obrazki/ciasto4.webp"
import img9 from "./obrazki/cukierki4.jpg"
import './product.css';

export const ProductInfo = ({ product }: { product: ProductDataWithAverage }) => {
  return (
    <div>
      <Link href="/" className="back block hover:underline font-semibold ">
        Wróć do produktów
      </Link>
      <h1 className="prod text-2xl mb-8">{product.name} - {product.price.toFixed(2)} zł</h1>
      <h2 className="text-lg font-semibold mb-2">Zdjęcia produktu</h2>
      <div className="flex flex-row w-full overflow-x-scroll">
          <Image
            src={img1}
            width={200}
            height={200}
            className="rounded-xl p-2"
            alt={`product image`}
          />
          <Image
            src={img2}
            width={200}
            height={200}
            className="rounded-xl p-2"
            alt={`product image`}
          />
          <Image
            src={img3}
            width={200}
            height={200}
            className="rounded-xl p-2"
            alt={`product image`}
          />
          <Image
            src={img4}
            width={200}
            height={200}
            className="rounded-xl p-2"
            alt={`product image`}
          />
          <Image
            src={img5}
            width={200}
            height={200}
            className="rounded-xl p-2"
            alt={`product image`}
          />
          <Image
            src={img6}
            width={200}
            height={200}
            className="rounded-xl p-2"
            alt={`product image`}
          />
          <Image
            src={img7}
            width={200}
            height={200}
            className="rounded-xl p-2"
            alt={`product image`}
          />
          <Image
            src={img8}
            width={200}
            height={200}
            className="rounded-xl p-2"
            alt={`product image`}
          />
          <Image
            src={img9}
            width={200}
            height={200}
            className="rounded-xl p-2"
            alt={`product image`}
          />
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
