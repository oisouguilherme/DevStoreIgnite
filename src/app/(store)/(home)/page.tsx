import { api } from "@/data/api";
import { Product } from "@/data/types/products";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await api("/products/featured", {
    next: {
      revalidate: 60 * 60,
    },
  });

  const products = await response.json();

  return products;
}

export const metadata: Metadata = {
  title: {
    template: "%s | DevStore",
    default: "DevStore",
  },
};

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
          src={highlightedProducts.image}
          width={860}
          height={860}
          alt="Roupa"
        />
        <div className="absolute bottom-16 right-16 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
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
            href={`/product/${product.slug}`}
            key={product.id}
            className="group col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end relative"
          >
            <Image
              className="group-hover:scale-105 transition-transform duration-500"
              src={product.image}
              width={860}
              height={860}
              alt={product.title}
            />
            <div className="absolute bottom-4 right-4 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
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
