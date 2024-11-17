import { ProductCard } from "@ck/components/productCard";
import { Product } from "@ck/utils/types/product";
export const OrderInfo = async ({ products }: { products: Product[] }) => {
  return <div>
    <h2>Twój koszyk</h2>
    <div className="flex flex-row items-center gap-4">
      {products.map((produkt) => (
        <div key={produkt._id}>
          <ProductCard>{produkt}</ProductCard>
        </div>
      ))}
    </div>
  </div>
}
