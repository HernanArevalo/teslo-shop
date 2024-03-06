import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CartPage() {

  if (productsInCart.length < 1) {
    redirect("/empty")
  }


  return (
    <div className="flex justify-center items-start mb-72 px-10 sm:px-10">
      
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart"/>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add items</span>
            <Link href='/' className="mb-5 underline">
              Keep buying
            </Link>

          { productsInCart.map( product => (
            <div className="flex gap-5 mb-2" key={product.slug}>
              <Image
                src={`/products/${ product.images[0]}`}
                width={ 100 }
                height={ 100 }
                style={{width: '90px', height: '120px'}}
                alt={ product.title}
                className="rounded"
              />
              <div className="">
                <p>{product.title}</p>
                <p>{product.price}</p>
                <QuantitySelector quantity={3}/>

                <button className="underline mt-1">Delete</button>
              </div>
              
            </div>
          ))

          }
          </div>



          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
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
              <Link href="/checkout/adress"
                    className="flex btn-primary justify-center">Checkout</Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}