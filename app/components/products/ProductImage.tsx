"use client";

import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="grid grid-cols-6  gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      {/* ///////////////////////////// LEFT  SMALL IMAGES */}
      <div className="flex flex-col items-center justify-center h-full max-h-[500px] min-h-[300px] gap-4  border sm:min-h-[400px]">
        {product.images.map((image: SelectedImgType, index: number) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`flex-col relative w-[80%] aspect-square rounded border-teal-300  cursor-pointer  ${
                cartProduct.selectedImg.color === image.color
                  ? "border-[1.5px] "
                  : "border-none"
              } `}
            >
              <Image
                priority
                src={image.image}
                alt={image.color}
                fill
                sizes="100%"
                className="object-contain p-1"
              />
            </div>
          );
        })}
      </div>

      {/* ///////////////////////////// */}

      <div className="col-span-5 relative aspect-square">
        <Image
          priority
          sizes="100%"
          fill
          alt="product image"
          src={cartProduct.selectedImg.image}
          className="w-full  h-full
          object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
        />
      </div>
    </div>
  );
};

export default ProductImage;
