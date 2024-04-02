"use client";

import Heading from "@/app/components/products/Heading";
import { Avatar, Rating } from "@mui/material";
import moment from "moment";

interface ListRaitingProps {
  product: any;
}

const ListRaiting: React.FC<ListRaitingProps> = ({ product }) => {
  return (
    <div>
      <Heading title="Product Review" />
      <div className="text-sm mt-2">
        {product.reviews.map((review: any, index: any) => (
          <div key={index} className="max-w-[300px]">
            <div className="flex gap-2">
              <Avatar src={review?.user.image} />
              <div className="font-semibold">{review.user?.name}</div>
              <div className="font-light">
                {moment(review.createdDate).fromNow()}
              </div>
            </div>
            <div>
              <Rating key={review.rating} value={review.rating} readOnly />
              <div className="ml-2">{review.comment}</div>
              <hr className="mt-4 mb-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRaiting;
