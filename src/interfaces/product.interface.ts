export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    //todo type: Type;
    gender: Category;
  }

export interface CartProduct {
  id: string;
  price: number;
  size: Size;
  slug: string;
  title: string;
  quantity: number;
  image: string;
}


  
  export type Category = 'men'|'women'|'kids'|'unisex';
  export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
  export type Type = 'shirts'|'pants'|'hoodies'|'hats';