import { ProductCard } from "@ck/components/productCard";
import { Product } from "@ck/utils/types/product";
export const OrderInfo = async ({ products }: { products: Product[] }) => {
  return <div>
    <h2 className="font-bold text-xl">Twój koszyk</h2>
    <h2 className="mb-4">Suma: {products.map(prod => prod.price).reduce((a, b) => a + b).toFixed(2)} zł</h2>

    <div className="flex flex-row items-center gap-4">
      {products.map((produkt) => (
        <div key={produkt._id}>
          <ProductCard button={{ text: "Usuń z koszyka", url: `/api/order/${produkt._id}/del`, init: { method: "POST" } }} >{produkt}</ProductCard>
        </div>
      ))}
    </div>
  </div>
}
