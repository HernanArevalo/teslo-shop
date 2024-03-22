'use client';

import { QuantitySelector, SizeSelector } from '@/components';
import { Product, Size } from '@/interfaces';
import { useState } from 'react';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const AddToCart = () => {
    setPosted(true);
    if (!size) return;

    console.log({ size, quantity });
    setSize(undefined);
    setQuantity(1);
    setPosted(false);
  };

  return (
    <>
      {/* Size picker */}
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={size}
        onSizeChanged={setSize}
      />
      {posted && !size && 
        <p className='text-red-500'>Select a size</p>
      }

      {/* Quantity picker */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Button */}
      <button className='btn-primary my-5' onClick={AddToCart}>
        Add to shopping cart
      </button>
    </>
  );
};
