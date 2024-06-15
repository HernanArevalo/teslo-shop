
"use client";

import { createUpdateProduct } from "@/actions";
import { Category, Product, ProductImage, Size } from "@/interfaces";
import clsx from "clsx";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImage[]};
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  categoryId: string;
  description: string;
  gender: 'men'|'women'|'kids'|'unisex';
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string;
  title: string; 

  // TODO: images
}


export const ProductForm = ({ product, categories=[] }: Props) => {

  const { 
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch

   } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '),
      sizes: product.sizes ?? [],

      // TODO: images
    }
   });

   watch('sizes');

   const onSizeChanged = (size: string) => {

    const sizes = new Set(getValues('sizes'))

    sizes.has(size) ? sizes.delete(size) : sizes.add(size)
    
    setValue('sizes', Array.from( sizes ));
   }

   const onSubmit = async(data: FormInputs ) => {
    
    const formData = new FormData();

    const { ...productToSave } = data

    if (product.id) {
      formData.append('id', product.id ?? '');
    }
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender);

    const { ok } = await createUpdateProduct(formData)

   }


  return (
    <form onSubmit={ handleSubmit(onSubmit) } className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('title', {required: true}) }/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('slug', {required: true}) }/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            { ...register('description', {required: true}) }
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" { ...register('price', {required: true, min: 0}) }/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('tags', {required: true}) }/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border rounded-md bg-gray-200" { ...register('gender', {required: true}) }> 
            <option hidden>[Select]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select className="p-2 border rounded-md bg-gray-200" { ...register('categoryId', {required: true}) }>
            <option hidden >[Select]</option>
            { categories.map(category => (
              <option value={category.id} key={category.id}>{category.name}</option>
            ))
            }
          </select>
        </div>

        <button className="btn-primary w-full">
          Save
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">

        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" { ...register('inStock', {required: true, min: 0}) }/>
        </div>

        {/* As checkboxes */}
        <div className="flex flex-col gap-2">

          <div>
            <span>Sizes</span>
            <div className="flex flex-wrap">
              
              {
                sizes.map( size => (
                  // bg-blue-500 text-white <--- si está seleccionado
                  <div key={ size }
                       onClick={() => onSizeChanged(size)}
                       className={clsx("p-2 cursor-pointer border rounded-md mr-2 mb-2 w-14 transition-all text-center",
                                       { "bg-blue-500 text-white": getValues('sizes').includes(size)

                                       }
                       )}
                       
                       >
                    <span>{ size }</span>
                  </div>
                ))
              }

            </div>

          </div>


          <div className="flex flex-col mb-2">

            <span>Pictures</span>
            <input 
              type="file"
              multiple 
              className="p-2 border rounded-md bg-gray-200" 
              accept="image/png, image/jpeg"
            />

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            { product.ProductImage?.map(image => (

              <div key={image.id} className="">
                <Image
                  alt={ product.title ?? ''}
                  src={`/products/${image.url}`}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />

                <button className="btn-danger w-full rounded-b-xl" 
                        type="button"
                        onClick={()=>{console.log(image.id, image.url);}}
                        >
                  Delete
                </button>
              </div>

            ))

            }
          </div>


        </div>
      </div>
    </form>
  );
};