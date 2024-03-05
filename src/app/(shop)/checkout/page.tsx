import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";


const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-start mb-72 px-10 sm:px-10">
      
      <div className="flex flex-col w-[1000px]">
        <Title title="Verify order"/>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Adjust elements</span>
            <Link href='/cart' className="mb-5 underline">
            Edit checkout
            </Link>

          { productsInCart.map( product => (
            <div className="flex gap-5 mb-2" key={product.slug}>
              <Image
                src={`/products/${ product.images[0]}`}
                width={ 100 }
                height={ 100 }
                alt={ product.title}
                className="rounded"
              />
              <div>
                <p>{product.title}</p>
                <p>{product.price} x 3</p>
                <p className="font-bold">Subtotal: ${ product.price * 3 }</p>

                <button className="underline mt-1">Delete</button>
              </div>
              
            </div>
          ))

          }
          </div>



          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">

            <h2 className="text-2xl mb-2">Adress Delivry</h2>
            <div className="mb-10">
              <p>Fernando Herrera</p>
              <p>Av. Siempre viva 123</p>
              <p>Col. Centro</p>
              <p>Alcaldía Cuauhtémoc</p>
              <p>CP 6565</p>
              <p>Tel 54 35 545 765</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-300 mb-10" />

            <h2 className="text-2xl mb-2">Order resume</h2>

            <div className="grid grid-cols-2">

              <span>Products</span>
              <span className="text-right">3 articles</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Taxes (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>

            </div>

            <div className="mt-5 mb-2 w-full">

              {/* Disclaimer */}
              <p className="mb-1">
                <span className="text-xs">
                  Al hacer clic en &quot;Make Order&quot;, acepté <a href="#" className="underline">términos y condiciones</a>
                </span>
              </p>

              <Link href="/orders/123"
                    className="flex btn-primary justify-center">
                Make order
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}