
"use client";

import { Category, Product } from "@/interfaces";

interface Props {
  product: Product;
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories=[] }: Props) => {
  return (
    <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border rounded-md bg-gray-200">
            <option selected hidden>[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select className="p-2 border rounded-md bg-gray-200">
            <option selected hidden>[Select]</option>
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
        {/* As checkboxes */}
        <div className="flex flex-col gap-2">

          <div>
            <span>Sizes</span>
            <div className="flex flex-wrap">
              
              {
                sizes.map( size => (
                  // bg-blue-500 text-white <--- si está seleccionado
                  <div key={ size } className="flex  items-center justify-center w-10 h-10 mr-2 border rounded-md">
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

        </div>
      </div>
    </form>
  );
};