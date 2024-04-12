import { auth } from "@/auth.config";

export default async function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {

  const session = await auth();
  
  console.log({session});

  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">
        {children}
      </div>
    </main>
  );
}