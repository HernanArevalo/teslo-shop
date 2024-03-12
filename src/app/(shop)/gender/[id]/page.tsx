import { ProductsGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id:string
  }
}

const seedProducts = initialData.products

export default function CategoryPage({ params }: Props ) {
  
  const { id } = params 
  const products = seedProducts.filter(item => item.gender == id)



  return (
    <>
      <Title
        title="Store"
        subtitle={id}
        className="mb-2 capitalize"
      />

      <ProductsGrid products={products}/>
    </>)
}