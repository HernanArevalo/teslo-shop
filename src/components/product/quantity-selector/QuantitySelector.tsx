"use client"
import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
    quantity: number
}

export const QuantitySelector = ({quantity}: Props) => {

    const [count, setCount] = useState(quantity)

    const onQuantityChange = (value:number)=>{
        if (count + value < 1) return;

        setCount(count + value)
    }

  return (
    <div className="my-5">
        <h3 className="font-bold mb-4">Quantity</h3>
        <div className="flex gap-3">
            <button onClick={() => onQuantityChange(-1)}>
                <IoRemoveCircleOutline size={30}/>
            </button>

            <span className="px-5 bg-gray-200 text-center flex items-center rounded">
                {count}
            </span>

            <button onClick={() => onQuantityChange(+1)}>
                <IoAddCircleOutline size={30}/>
            </button>
        </div>
    </div>
  )
}
