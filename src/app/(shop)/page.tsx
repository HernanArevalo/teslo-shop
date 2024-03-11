import { getPaginatedProductsWithImages } from '@/actions';
import { ProductsGrid, Title } from '@/components';

interface Props {
  searchParams: {
    page?: string
  }
}


export default async function Home({ searchParams  }: Props) {

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const {products} = await getPaginatedProductsWithImages({page});

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
