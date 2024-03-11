import { getPaginatedProductsWithImages } from '@/actions';
import { ProductsGrid, Title } from '@/components';


export default async function Home() {

  const {products} = await getPaginatedProductsWithImages();

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductsGrid 
        products={ products }
      />
      
    </>
  );
}