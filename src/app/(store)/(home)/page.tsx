import { api } from "@/data/api";
import { Product } from "@/data/types/products";
import Image from "next/image";
import Link from "next/link";

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api("/products/featured");

  const products = await response.json();

  return products;
}

export default async function Home() {
  const [highlightedProducts, ...otherProducts] = await getFeaturedProducts();

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highlightedProducts.slug}`}
        className="group col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end relative"
      >
        <Image
          className="group-hover:scale-105 transition-transform duration-500"
          src="/1.png"
          width={860}
          height={860}
          alt="Roupa"
        />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProducts.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProducts.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => {
        return (
          <Link
            href={""}
            key={product.id}
            className="group col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end relative"
          >
            <Image
              className="group-hover:scale-105 transition-transform duration-500"
              src="/2.png" /* {product.image} */
              width={860}
              height={860}
              alt={product.title}
            />
            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
