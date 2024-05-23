'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
interface Props {
  orderId: string;
  amount: number
}

export const PayPalButton = ({orderId, amount}: Props ) => {

  const [{ isPending }] = usePayPalScriptReducer()

  const roundedAmount = (Math.round(amount * 100)) / 100


  if (isPending) {
    return (
      <div className="animate-pulse pb-12">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 bg-gray-300 rounded mt-3"></div>
      </div>
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [

        {
          // invoice_id ó reference_id: 'order_id'
          amount: {
            value: roundedAmount.toString(),
            currency_code: 'USD',
            
          }
        }
      ]
    })

    // console.log({transactionId});
    const { ok } = await setTransactionId(orderId, transactionId)
    if ( !ok){
      throw new Error(`No se pudo actualizar la orden`)
    }

    return transactionId
  }

  return (
      createOrder={ createOrder }
  )
}
