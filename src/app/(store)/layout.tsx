import { Header } from "@/components/header";

export default function StoreLayout({ children }: any) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-rows-[min-content_max-content] gap-5 p-8">
      <Header />
      {children}
    </div>
  );
}
