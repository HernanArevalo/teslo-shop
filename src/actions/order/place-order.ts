'use server';

import { auth } from '@/auth.config';
import type { Address, Size } from '@/interfaces';
import prisma from '@/lib/prisma';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productsIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  // check user session
  if (!userId) {
    return {
      ok: false,
      message: 'No hay sesión de usuario',
    };
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsIds.map((p) => p.productId),
      },
    },
  });

  // calculate amount
  const itemsInOrder = productsIds.reduce((count, p) => count + p.quantity, 0);

  // totals: tax, subtotal, and total
  const { subtotal, tax, total } = productsIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subtotal = product.price * productQuantity;

      totals.subtotal += subtotal;
      totals.tax += subtotal * 0.15;
      totals.total += subtotal * 1.15;

      return totals;
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  // create transaction

  const prismaTx = await prisma.$transaction(async (tx) => {
    // 1. update products stock

    // 2. create order - header - details
    const order = await tx.order.create({
      data: {
        userId: userId,
        items: itemsInOrder,
        subTotal: subtotal,
        tax: tax,
        total: total,
        OrderItems: {
          createMany: {
            data: productsIds.map((p) => ({
              quantity: p.quantity,
              size: p.size,
              productId: p.productId,
              price:
                products.find((product) => product.id === p.productId)?.price ??
                  0,
              })),
            },
          },
        },
    });

    // Validate prize zero, and send error

    // 3. create order address
    const { country, ...restAddress } = address;
    const orderAddress = await tx.orderAddress.create({
      data: {
        ...restAddress,
        countryId: country,
        orderId: order.id,
      },
    });

    return {
      ok: true,
      order: order,
      updatedProducts: [],
      OrderAddress: orderAddress,
    };
  });

  console.log(prismaTx);
};
