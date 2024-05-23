'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

export const PayPalButton = ({orderId, amount}: Props ) => {

  const [{ isPending }] = usePayPalScriptReducer()

  if (isPending) {
    return (
      <div className="animate-pulse pb-12">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 bg-gray-300 rounded mt-3"></div>
      </div>
    )
  }

  return (
    <PayPalButtons />
  )
}
