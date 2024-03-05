import { Size } from "@/interfaces"
import clsx from "clsx";

interface Props {
    selectedSize: Size;
    availableSizes: Size[]
}

export const SizeSelector = ({ selectedSize, availableSizes}: Props) => {



  return (
    <div className="my-5">
        <h3 className="font-bold mb-4">Size</h3>

        <div className="flex gap-2">
            { availableSizes.map(size => (
                <button className={
                    clsx("hover:underline text-lg p-1 rounded", {
                        'bg-gray-200 ': size === selectedSize
                    })
                } key={size}>{size}</button>
            ))

            }
        </div>
    </div>
  )
}
